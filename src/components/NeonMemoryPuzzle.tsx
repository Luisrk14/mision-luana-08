import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Star,
  Headphones,
  Music,
  Ghost,
  Lock,
  Unlock,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";

// ─── 1. DEFINIMOS LAS CARTAS ───
const PAIR_TYPES = [
  {
    type: "mic",
    icon: <Mic className="w-8 h-8 md:w-10 md:h-10" />,
    color: "text-[#ff00de]",
  },
  {
    type: "star",
    icon: <Star className="w-8 h-8 md:w-10 md:h-10" />,
    color: "text-[#ffd700]",
  },
  {
    type: "headphones",
    icon: <Headphones className="w-8 h-8 md:w-10 md:h-10" />,
    color: "text-[#00e5ff]",
  },
  {
    type: "music",
    icon: <Music className="w-8 h-8 md:w-10 md:h-10" />,
    color: "text-[#00ff9d]",
  },
];

const DEMON_CARD = {
  type: "demon",
  icon: <Ghost className="w-8 h-8 md:w-10 md:h-10" />,
  color: "text-red-500",
};

interface Card {
  id: number;
  type: string;
  icon: React.ReactNode;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface NeonMemoryPuzzleProps {
  onUnlock: () => void;
}

// ─── FUNCIÓN REPRODUCTORA DE SONIDO ───
const playSound = (src: string, volume = 0.5, durationMs?: number) => {
  const audio = new Audio(src);
  audio.volume = volume;
  audio
    .play()
    .catch((err) => console.log("Audio bloqueado por el navegador:", err));

  if (durationMs) {
    setTimeout(() => {
      audio.pause();
    }, durationMs);
  }
};

const getShuffledCards = (): Card[] => {
  const deck = [...PAIR_TYPES, ...PAIR_TYPES, DEMON_CARD];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.map((card, index) => ({
    ...card,
    id: index,
    isFlipped: false,
    isMatched: false,
  }));
};

export const NeonMemoryPuzzle: React.FC<NeonMemoryPuzzleProps> = ({
  onUnlock,
}) => {
  const [cards, setCards] = useState<Card[]>(() => getShuffledCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [demonScare, setDemonScare] = useState(false);

  // ─── NUEVOS ESTADOS DE TRANSICIÓN ───
  const [isGameWon, setIsGameWon] = useState(false); // Cambia a la pantalla de carga
  const [isFullyRestored, setIsFullyRestored] = useState(false); // Termina la carga
  const [progress, setProgress] = useState(0); // Porcentaje del 0 al 100

  // Efecto que controla la barra de progreso y el desbloqueo real
  useEffect(() => {
    if (isGameWon && !isFullyRestored) {
      const duration = 3000; // 3 segundos
      const start = Date.now();

      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const currentProgress = Math.min(
          Math.floor((elapsed / duration) * 100),
          100,
        );
        setProgress(currentProgress);

        // Cuando llega a 3 segundos (100%)
        if (elapsed >= duration) {
          clearInterval(interval);
          setIsFullyRestored(true);
          playSound("/audio/door.mp3", 1.0); // Suena la puerta
          onUnlock(); // ¡AQUÍ RECIÉN AVISAMOS A LA APP QUE MUESTRE LO DEMÁS!
        }
      }, 30); // Se actualiza cada 30ms para que los números corran rápido y suave

      return () => clearInterval(interval);
    }
  }, [isGameWon, isFullyRestored, onUnlock]);

  const handleCardClick = (id: number) => {
    if (disabled || isGameWon) return;

    const clickedCard = cards.find((c) => c.id === id);
    if (clickedCard?.isFlipped || clickedCard?.isMatched) return;

    playSound("/audio/flip.wav", 0.3);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    setCards(cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)));

    if (clickedCard?.type === "demon") {
      setDisabled(true);
      setDemonScare(true);
      playSound("/audio/demon.wav", 0.7);

      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.isMatched ? c : { ...c, isFlipped: false })),
        );
        setFlippedCards([]);
        setDemonScare(false);
        setDisabled(false);
      }, 1200);
      return;
    }

    if (newFlippedCards.length === 2) {
      setDisabled(true);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (currentFlipped: number[]) => {
    const card1 = cards.find((c) => c.id === currentFlipped[0]);
    const card2 = cards.find((c) => c.id === currentFlipped[1]);

    if (card1?.type === card2?.type) {
      playSound("/audio/match.mp3", 0.6);

      const updatedCards = cards.map((c) => {
        if (c.id === card1?.id || c.id === card2?.id) {
          return { ...c, isMatched: true, isFlipped: true };
        }
        return c;
      });

      setCards(updatedCards);
      setFlippedCards([]);
      setDisabled(false);

      if (updatedCards.filter((c) => c.isMatched).length === 8) {
        setTimeout(() => {
          playSound("/audio/win.mp3", 0.8, 3000); // Cortado a los 3 seg.
          setIsGameWon(true); // Cambia de las cartas a la pantalla de carga (pero no revela el resto aún)
        }, 800);
      }
    } else {
      playSound("/audio/error.mp3", 0.6);

      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => {
            if (c.id === card1?.id || c.id === card2?.id) {
              return { ...c, isFlipped: false };
            }
            return c;
          }),
        );
        setFlippedCards([]);
        setDisabled(false);
      }, 1000);
    }
  };

  return (
    <section className="py-20 bg-[#0d0614] relative overflow-hidden font-sans border-b border-[#00e5ff]/20">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(transparent_50%,#000_50%)] bg-[length:100%_4px] pointer-events-none"></div>

      {demonScare && (
        <div className="absolute inset-0 z-20 pointer-events-none mix-blend-color-burn">
          <motion.div
            className="w-full h-full bg-red-600/40"
            animate={{ opacity: [0, 1, 0, 0.8, 0], x: [-10, 10, -5, 5, 0] }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.6)_2px,rgba(0,0,0,0.6)_4px)]" />
        </div>
      )}

      <div className="container mx-auto px-6 max-w-md relative z-10">
        <motion.div
          animate={demonScare ? { x: [-8, 8, -5, 5, 0] } : { x: 0 }}
          className={`bg-[#1e0a3c]/80 backdrop-blur-md border shadow-[0_0_30px_rgba(0,229,255,0.15)] rounded-3xl p-6 md:p-8 transition-colors duration-500 ${
            isFullyRestored
              ? "border-[#ffd700]"
              : demonScare
                ? "border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.4)]"
                : "border-[#00e5ff]/40"
          }`}
        >
          {/* ─── PANTALLA DE LAS CARTAS ─── */}
          {!isGameWon ? (
            <>
              <div className="flex flex-col items-center justify-center mb-6 text-center">
                {demonScare ? (
                  <div className="flex flex-col items-center">
                    <Ghost className="w-10 h-10 text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] mb-3 animate-bounce" />
                    <h2 className="font-pop text-xl text-red-500 tracking-wider uppercase">
                      ¡INTERFERENCIA!
                    </h2>
                    <p className="text-white text-xs font-bold mt-2">
                      El Demonio robó tu turno...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <ShieldAlert className="w-10 h-10 text-[#ff00de] drop-shadow-[0_0_10px_rgba(255,0,222,0.8)] mb-3" />
                    <h2 className="font-pop text-xl text-white tracking-wider uppercase">
                      RESTAURA EL SISTEMA
                    </h2>
                    <p className="text-gray-400 text-xs font-light mt-2 leading-relaxed">
                      Encuentra los 4 pares de artefactos.{" "}
                      <strong className="text-red-400">
                        ¡Cuidado con el Demonio!
                      </strong>
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 perspective-1000">
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    className="relative w-full aspect-square cursor-pointer preserve-3d"
                    onClick={() => handleCardClick(card.id)}
                    animate={{
                      rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 backface-hidden bg-[#0b0410] border border-[#ff00de]/40 rounded-xl shadow-[0_0_15px_rgba(255,0,222,0.2)] flex items-center justify-center hover:bg-[#ff00de]/10 transition-colors">
                      <Lock className="w-5 h-5 md:w-6 md:h-6 text-[#ff00de]/50" />
                    </div>

                    <div
                      className={`absolute inset-0 backface-hidden bg-white/10 backdrop-blur-sm border-2 rounded-xl flex items-center justify-center ${
                        card.isMatched
                          ? "border-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                          : card.type === "demon"
                            ? "border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)] bg-red-900/20"
                            : "border-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                      }`}
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span className={card.color}>{card.icon}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            /* ─── PANTALLA DE CARGA Y ÉXITO ─── */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center min-h-[430px] md:min-h-[465px] py-4"
            >
              {isFullyRestored ? (
                <Unlock className="w-16 h-16 text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] mb-6 animate-pulse" />
              ) : (
                <Lock className="w-16 h-16 text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] mb-6 animate-pulse" />
              )}

              <h2
                className={`font-pop text-2xl md:text-3xl tracking-wider uppercase mb-2 text-center transition-colors duration-500 ${isFullyRestored ? "text-white" : "text-gray-400"}`}
              >
                {isFullyRestored ? "ENERGÍA RESTAURADA" : "RESTAURANDO..."}
              </h2>

              <p
                className={`text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-10 text-center transition-colors duration-500 ${isFullyRestored ? "text-[#00e5ff]" : "text-red-500"}`}
              >
                {isFullyRestored
                  ? "Sistemas Desbloqueados"
                  : "Sistemas Bloqueados"}
              </p>

              {/* BARRA DE PROGRESO Y TEXTO DE PORCENTAJE */}
              <div className="w-3/4 mb-10">
                <div className="flex justify-between items-end mb-2">
                  <span
                    className={`text-[9px] uppercase tracking-widest font-bold ${isFullyRestored ? "text-[#00e5ff]" : "text-gray-400"}`}
                  >
                    {isFullyRestored ? "Carga Completa" : "Descifrando..."}
                  </span>
                  <span
                    className={`font-pop text-lg leading-none ${isFullyRestored ? "text-[#ffd700]" : "text-white"}`}
                  >
                    {progress}%
                  </span>
                </div>

                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#ffd700] to-[#00e5ff]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center h-16">
                {isFullyRestored ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm md:text-base text-white font-bold tracking-widest uppercase">
                      Misión Revelada
                    </p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                      Desliza para continuar
                    </p>
                    <ChevronDown className="w-6 h-6 text-[#00e5ff] mt-2 animate-bounce mx-auto" />
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-sm md:text-base text-gray-500 font-bold tracking-widest uppercase mt-4">
                      Misión Oculta
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
    </section>
  );
};
