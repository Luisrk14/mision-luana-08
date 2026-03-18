"use client";

import { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Ghost } from "lucide-react";

interface NoteData {
  id: number;
  x: number;
  rotate: number;
  icon: string;
  duration: number;
  color: string;
}

const neonColors = ["#ff00de", "#00e5ff", "#ffd700", "#9d00ff"];

const FloatingNote = memo(
  ({ x, rotate, icon, duration, color }: Omit<NoteData, "id">) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 0, x: 0, scale: 0.5, rotate: 0 }}
        animate={{
          opacity: [0, 1, 0],
          y: -120,
          x: x,
          scale: [0.8, 1.4, 0.8],
          rotate: rotate,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: duration, ease: "easeOut" }}
        className="absolute bottom-14 left-1/2 text-2xl font-pop pointer-events-none select-none z-0"
        style={{
          marginLeft: "-10px",
          color: color,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {icon}
      </motion.div>
    );
  },
);

// NUEVO: Ahora recibe el estado isUnlocked como prop
export const MusicPlayer = ({ isUnlocked }: { isUnlocked: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [notes, setNotes] = useState<NoteData[]>([]);

  // NUEVO: Estado para mostrar el mensaje de error del Demonio
  const [showDemonMessage, setShowDemonMessage] = useState(false);

  const audioSrc = "/audio/Golden_KPop_Demon_Hunters.m4a";
  const hasStartedRef = useRef(false);

  // 1. Lógica del botón (Con bloqueo del Demonio)
  const togglePlay = () => {
    // Si la misión no se ha completado, no dejamos que toque la música
    if (!isUnlocked) {
      setShowDemonMessage(true);
      setTimeout(() => setShowDemonMessage(false), 2500);
      return;
    }

    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setNotes([]);
    } else {
      if (!hasStartedRef.current) {
        audio.currentTime = 18;
        hasStartedRef.current = true;
      }
      audio.play().catch((err) => console.error("Error audio:", err));
    }
    setIsPlaying((prev) => !prev);
  };

  // 2. Lógica de Autoplay (Solo cuando resuelven la misión)
  useEffect(() => {
    if (isUnlocked && audioRef.current && !hasStartedRef.current) {
      hasStartedRef.current = true;

      const audio = audioRef.current;
      audio.currentTime = 18;
      audio.volume = 0; // Empezamos en silencio para el fade-in

      // Un pequeño retraso para que inicie justo después del sonido de la puerta
      setTimeout(() => {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);

            // Efecto Fade-In del volumen
            let vol = 0;
            const fade = setInterval(() => {
              vol += 0.05;
              if (vol >= 0.6) {
                audio.volume = 0.6;
                clearInterval(fade);
              } else {
                audio.volume = vol;
              }
            }, 200);
          })
          .catch((err) =>
            console.log("Autoplay bloqueado por el navegador", err),
          );
      }, 500); // 500ms de retraso estratégico
    }
  }, [isUnlocked]); // Se ejecuta exactamente cuando isUnlocked cambia a true

  // 3. Generador de Notas Musicales
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        const icons = ["♪", "♫", "★", "♬"];
        const newNote: NoteData = {
          id: Date.now(),
          x: Math.random() * 60 - 30,
          rotate: Math.random() * 40 - 20,
          icon: icons[Math.floor(Math.random() * icons.length)],
          duration: 1.5 + Math.random(),
          color: neonColors[Math.floor(Math.random() * neonColors.length)],
        };
        setNotes((prev) => [...prev.slice(-8), newNote]);
      }, 600);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // 4. Limpiador de Notas Antiguas
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setNotes((prev) => prev.filter((note) => now - note.id < 2500));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-center transition-all duration-500">
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {/* NUEVO: Mensaje de Alerta del Demonio */}
      <AnimatePresence>
        {showDemonMessage && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            // 1. Agregamos `w-max` para que se estire a lo largo de las 2 líneas.
            // 2. Aumentamos el padding en PC (md:px-6 md:py-4) para que respire.
            className="absolute bottom-16 left-0 ml-2 mb-2 bg-[#0b0410]/90 backdrop-blur-md border border-red-500 rounded-xl px-4 py-3 md:px-6 md:py-4 flex items-center gap-3 md:gap-4 shadow-[0_0_15px_rgba(255,0,0,0.5)] w-max max-w-[85vw] md:max-w-[600px]"
          >
            {/* Ícono un poco más grande en PC */}
            <Ghost className="w-5 h-5 md:w-7 md:h-7 text-red-500 animate-pulse shrink-0" />

            {/* Letra más grande en PC (md:text-sm) para que no se pierda en monitores grandes */}
            <p className="font-sans text-[12px] md:text-sm font-black uppercase tracking-widest text-red-400 leading-snug">
              Bloqueado por el Demonio.
              {/* Esta etiqueta "block" garantiza que siempre sean exactamente 2 líneas perfectas */}
              <span className="block text-[10px] md:text-xs text-red-500/80 mt-1 md:mt-1.5">
                Completa la misión para desbloquear la música.
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full h-0 flex justify-center">
        <AnimatePresence>
          {notes.map((note) => (
            <FloatingNote key={note.id} {...note} />
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={togglePlay}
        whileTap={{ scale: 0.9 }}
        className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center overflow-hidden cursor-pointer group transition-all duration-300 ${isPlaying ? "bg-[#ff00de] shadow-[0_0_20px_rgba(255,0,222,0.6)] border-none" : "bg-[#1e0a3c] border-2 border-[#00e5ff] shadow-lg"}`}
      >
        <Music
          className={`w-6 h-6 md:w-8 md:h-8 ${isPlaying ? "text-white" : "text-[#00e5ff]"}`}
        />

        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: [0, 0.5, 0], scale: [1, 1.4, 1.8] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 border-2 border-white rounded-full -z-10"
          />
        )}
      </motion.button>
    </div>
  );
};
