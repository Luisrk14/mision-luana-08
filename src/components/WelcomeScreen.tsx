import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Fingerprint, Lock, AlertTriangle } from "lucide-react";

// ─── IMPORTAMOS TU BASE DE DATOS DE INVITADOS ORIGINAL ───
import { guestsData } from "./data/guests";
import type { GuestInfo } from "./data/guests";

// ─── GENERADOR DE PARTÍCULAS "MAGIA NEÓN" ───
interface Particle {
  id: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  scale: number;
  size: string;
  color: string;
  driftX: number;
}

const neonColors = ["#ff00de", "#00e5ff", "#ffd700", "#9d00ff"];

function generateParticles(): Particle[] {
  return Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 2,
    scale: Math.random() * 0.6 + 0.4,
    size: `${Math.random() * 6 + 4}px`,
    color: neonColors[Math.floor(Math.random() * neonColors.length)],
    driftX: (Math.random() - 0.5) * 80,
  }));
}

const NeonDust = React.memo(() => {
  const [particles] = useState<Particle[]>(generateParticles);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 12px 3px ${p.color}`,
          }}
          animate={{
            y: [0, -150, -300],
            x: [0, p.driftX, 0],
            opacity: [0, 0.8, 0],
            scale: [0, p.scale, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

interface WelcomeScreenProps {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  guestName?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  isOpened,
  setIsOpened,
  guestName: propGuestName,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isHacked, setIsHacked] = useState(false);

  // ─── CONTROLADOR DEL AUDIO DE EMERGENCIA ───
  const warningAudioRef = useRef<HTMLAudioElement | null>(null);

  // Precargamos el audio cuando el componente se monta
  useEffect(() => {
    warningAudioRef.current = new Audio("/audio/warning.mp3");
    warningAudioRef.current.volume = 0.6; // Ajusta el volumen si lo notas muy fuerte

    // Función de limpieza: Si el componente se desmonta, el audio se calla obligatoriamente
    return () => {
      if (warningAudioRef.current) {
        warningAudioRef.current.pause();
        warningAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  const guestInfo = React.useMemo(() => {
    if (propGuestName)
      return { name: propGuestName, mode: "single" } as GuestInfo;

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      let key = params.get("para");

      if (!key) {
        key = window.location.pathname.replace("/", "");
      }

      return guestsData[key || ""] || null;
    }
    return null;
  }, [propGuestName]);

  const handleOpen = () => {
    setIsScanning(true);

    setTimeout(() => {
      setIsHacked(true);

      // ─── REPRODUCIMOS LA ALARMA EXACTAMENTE AL HACKEARSE ───
      if (warningAudioRef.current) {
        warningAudioRef.current
          .play()
          .catch((e) => console.log("Audio bloqueado:", e));
      }

      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          // ─── SILENCIAMOS LA ALARMA JUSTO ANTES DE ABRIR EL CÓMIC ───
          if (warningAudioRef.current) {
            warningAudioRef.current.pause();
          }
          setIsOpened(true);
        }, 1200);
      }, 3500);
    }, 1000);
  };

  if (isOpened) return null;

  return (
    <motion.section
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0d0614]"
      animate={
        isExiting
          ? { opacity: 0 }
          : isHacked
            ? { opacity: [1, 0.8, 1, 0.9, 1] }
            : { opacity: 1 }
      }
      transition={{ duration: 1, delay: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15 }}
        animate={
          isHacked
            ? { filter: "grayscale(100%)", opacity: 0.2, scale: 1 }
            : { filter: "grayscale(0%)", opacity: 1, scale: 1 }
        }
        transition={{ duration: isHacked ? 0.2 : 12, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0614] via-[#1e0a3c]/80 to-transparent" />
      </motion.div>

      {!isHacked && <NeonDust />}

      {isHacked && (
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-color-burn">
          <motion.div
            className="w-full h-full bg-red-600/40"
            animate={{ opacity: [0, 1, 0, 0.8, 0], x: [-10, 10, -5, 5, 0] }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.5)_2px,rgba(0,0,0,0.5)_4px)]" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={
          isExiting
            ? { opacity: 0, y: -80, scale: 0.9 }
            : isHacked
              ? {
                  scale: [1, 1.05, 0.95, 1.1, 0],
                  rotate: [0, -2, 2, -5, 0],
                  filter: [
                    "hue-rotate(0deg)",
                    "hue-rotate(90deg)",
                    "hue-rotate(-90deg)",
                    "blur(10px)",
                  ],
                  opacity: [1, 1, 0.5, 0],
                }
              : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{
          duration: isHacked ? 2 : 1,
          ease: isHacked ? "linear" : [0.22, 1, 0.36, 1],
        }}
        className="relative z-20 w-[90%] max-w-[400px]"
      >
        <div className="absolute inset-0 bg-[#ff00de]/20 blur-[50px] rounded-full transform scale-90 -z-10"></div>

        <div className="bg-[#1e0a3c]/60 backdrop-blur-xl border border-[#00e5ff]/40 shadow-[0_0_30px_rgba(255,0,222,0.2)] rounded-3xl p-8 md:p-10 relative text-center overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#00e5ff] via-[#ff00de] to-[#ffd700]"></div>

          <div className="mb-6 flex justify-center gap-4">
            <Sparkles className="w-5 h-5 text-[#00e5ff] animate-pulse" />
            <Lock className="w-7 h-7 text-[#ffd700]" />
            <Sparkles
              className="w-5 h-5 text-[#00e5ff] animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          <span className="font-sans text-[#00e5ff] text-[10px] md:text-xs tracking-[0.4em] uppercase font-black mb-4 block drop-shadow-[0_0_5px_rgba(0,229,255,0.6)]">
            Transmisión Confidencial
          </span>

          <h2 className="font-pop text-4xl md:text-5xl text-white mb-2 uppercase leading-none drop-shadow-[0_0_10px_rgba(255,0,222,0.6)]">
            Archivo
            <br />
            Secreto
          </h2>

          <div className="flex items-center justify-center gap-4 my-5">
            <div className="h-px w-6 bg-gradient-to-r from-transparent to-[#ffd700]"></div>
            <p className="text-[#ffd700] font-sans text-xs md:text-sm font-black tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
              OPERACIÓN: 08
            </p>
            <div className="h-px w-6 bg-gradient-to-l from-transparent to-[#ffd700]"></div>
          </div>

          {guestInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0d0614]/50 rounded-xl p-3 mb-6 border border-[#00e5ff]/20"
            >
              <span className="text-gray-400 font-sans text-[9px] uppercase tracking-[0.2em] block mb-1">
                Agente Asignado:
              </span>
              <h3 className="text-xl text-white font-pop tracking-widest drop-shadow-[0_0_5px_rgba(0,229,255,0.5)] uppercase">
                {guestInfo.name}
              </h3>
            </motion.div>
          )}

          <p className="font-sans text-gray-200 text-[13px] leading-relaxed mb-8 font-light">
            Se ha detectado una anomalía en el sector principal.{" "}
            <span className="text-white font-bold">
              Valida tu huella digital
            </span>{" "}
            para desencriptar el mensaje de la estrella mágica.
          </p>

          <button
            onClick={handleOpen}
            disabled={isScanning || isHacked}
            className={`group/btn relative w-full py-4 rounded-xl transition-all font-sans font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 overflow-hidden ${isScanning ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.8)]" : "bg-[#ff00de] hover:bg-[#d600ba] text-white shadow-[0_0_20px_rgba(255,0,222,0.4)] hover:shadow-[0_0_30px_rgba(255,0,222,0.6)] hover:-translate-y-1"}`}
          >
            {isScanning ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Desencriptando...</span>
              </motion.div>
            ) : (
              <>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                <Fingerprint className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Revelar Misión</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {isHacked && (
        <motion.div
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          className="absolute z-50 flex flex-col items-center justify-center text-center px-4"
        >
          <AlertTriangle className="w-24 h-24 text-red-500 mb-6 animate-pulse drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]" />
          <h1 className="font-pop text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] mb-4">
            SISTEMA
            <br />
            INTERCEPTADO
          </h1>
          <p className="text-red-400 font-sans text-xs md:text-sm font-black tracking-[0.3em] uppercase bg-black/80 p-3 rounded border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.5)]">
            Por el Demonio del Silencio
          </p>
        </motion.div>
      )}
    </motion.section>
  );
};
