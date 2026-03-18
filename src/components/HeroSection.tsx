import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Unlock,
  Crosshair,
  Fingerprint,
  Activity,
  ChevronDown,
  Terminal,
  X,
} from "lucide-react";

interface HeroSectionProps {
  isOpened: boolean;
  BirthdayDate: Date;
}

// ─── ANIMACIONES ───
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.8 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  isOpened,
  BirthdayDate,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // ─── ESTADO DEL MODAL ───
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#05010a] flex items-center pt-16 pb-36 lg:pt-8 lg:pb-12 border-b border-[#ffd700]/20"
    >
      {/* ─── FONDO TÁCTICO ─── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 opacity-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e0a3c_0%,transparent_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd70005_1px,transparent_1px),linear-gradient(to_bottom,#ffd70005_1px,transparent_1px)] bg-[size:50px_50px]" />
      </motion.div>

      <motion.div
        className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isOpened ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          {/* ─── COLUMNA IZQUIERDA: EXPEDIENTE DESBLOQUEADO (7/12) ─── */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 z-20">
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 bg-[#00e5ff]/10 border border-[#00e5ff]/30 w-fit px-4 py-2 rounded-sm mb-6 relative overflow-hidden group"
            >
              <Unlock className="text-[#00e5ff] w-5 h-5 animate-pulse" />
              <span className="text-[#00e5ff] font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase font-black">
                Acceso Autorizado - Agente VIP
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="relative mb-6">
              <h2 className="font-sans text-[#ffd700] text-xs md:text-sm font-black tracking-[0.5em] uppercase mb-3 ml-1">
                Expediente:
              </h2>
              <h1 className="font-pop text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.85] tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                LUANA
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#ff00de]">
                  ALONDRA
                </span>
              </h1>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 bg-[#1e0a3c] border border-[#ff00de]/50 px-5 py-2.5 rounded-full mb-8 shadow-[0_0_15px_rgba(255,0,222,0.2)] w-fit"
            >
              <Terminal className="w-5 h-5 text-[#ff00de]" />
              <p className="text-[#ff00de] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] font-sans">
                Nivel de Agente:{" "}
                <strong className="text-white text-base">08</strong>
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-start gap-4 mb-10 max-w-2xl border-l-2 border-[#00e5ff]/50 pl-6 py-1"
            >
              <p className="font-sans text-gray-300 text-sm md:text-base font-light leading-relaxed pr-4">
                Identidad confirmada al 100%.{" "}
                <strong className="text-[#00e5ff] font-bold">
                  El sonido ha sido restaurado provisionalmente en el sistema.
                </strong>{" "}
                Esta es la última transmisión informativa. Prepárate para el
                asalto final en la Zona Cero contra el Demonio del Silencio. El
                Escuadrón Huntrix te espera.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="relative z-30">
              <CountdownTactical targetDate={BirthdayDate} />
            </motion.div>
          </div>

          {/* ─── COLUMNA DERECHA: FOTO HOLOGRÁFICA (5/12) ─── */}
          <motion.div
            variants={slideInRight}
            className="lg:col-span-5 flex justify-center order-2 z-10"
          >
            <div
              // Añadimos cursor-pointer y la acción de abrir el modal
              className="relative w-full max-w-[320px] lg:max-w-[360px] xl:max-w-[400px] aspect-[3/4] group cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="absolute inset-0 border-2 border-[#00e5ff]/30 rounded-2xl transform rotate-3 scale-105 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-100 z-0" />
              <div className="absolute inset-0 border-2 border-[#ff00de]/30 rounded-2xl transform -rotate-3 scale-105 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-100 z-0" />

              <div className="relative w-full h-full bg-[#1e0a3c]/80 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.2)] z-10 group-hover:border-[#00e5ff] transition-colors duration-500">
                <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-[#ffd700]" />
                    <span className="text-[#ffd700] text-[8px] font-black tracking-widest uppercase">
                      ID VERIFICADA
                    </span>
                  </div>
                  <Crosshair className="w-5 h-5 text-[#00e5ff] animate-[spin_4s_linear_infinite]" />
                </div>

                <img
                  src="/luana05.jpg"
                  alt="Agente Luana Alondra"
                  className="w-full h-full object-cover object-center filter contrast-110 saturate-110 group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#05010a] via-transparent to-transparent opacity-90 z-10" />
                <div className="absolute inset-0 mix-blend-color-dodge bg-[#00e5ff] opacity-10 z-10" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff00de] to-transparent shadow-[0_0_15px_#ff00de] animate-[scan_3s_ease-in-out_infinite] z-20" />

                <div className="absolute bottom-0 inset-x-0 p-6 z-20 bg-gradient-to-t from-[#05010a] to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[#ffd700] text-[9px] font-black uppercase tracking-[0.3em] mb-1">
                        Status
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                        <span className="text-white text-sm font-bold tracking-widest uppercase">
                          Activa
                        </span>
                      </div>
                      <h4 className="font-pop text-lg text-white uppercase tracking-wider drop-shadow-md leading-none">
                        Luana Alondra
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── SCROLL INDICATOR ─── */}
      <motion.div
        style={{ opacity: opacityFade }}
        initial={{ opacity: 0 }}
        animate={isOpened ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-sans font-black">
          Desliza para continuar
        </span>
        <ChevronDown className="w-5 h-5 text-[#00e5ff] animate-bounce" />
      </motion.div>

      {/* ─── MODAL VISOR DE EVIDENCIA ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm md:max-w-md bg-[#0b0410] border-2 border-[#00e5ff]/50 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.3)]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-4 z-50 bg-black/50 backdrop-blur-md border border-white/20 p-2 rounded-full text-white hover:text-red-500 hover:border-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-0 inset-x-0 bg-black/70 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-[#00e5ff]" />
                  <span className="text-white text-[10px] md:text-xs font-sans font-black tracking-widest uppercase">
                    AMPLIACIÓN DE EVIDENCIA
                  </span>
                </div>
              </div>

              <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-[#1e0a3c]">
                <img
                  src="/luana05.jpg"
                  alt="Luana Alondra Ampliada"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0410] via-transparent to-transparent opacity-80" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 z-10 bg-gradient-to-t from-[#0b0410] to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-[#00e5ff] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-2"
                    >
                      Agente VIP - Nivel 08
                    </motion.p>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-pop text-3xl md:text-4xl text-white uppercase tracking-wider leading-tight drop-shadow-lg"
                    >
                      Luana Alondra
                    </motion.h3>
                  </div>
                  <Crosshair className="w-10 h-10 text-[#00e5ff] opacity-50 animate-[spin_4s_linear_infinite]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan { 
          0% { transform: translateY(-10px); opacity: 0; } 
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(350px); opacity: 0; } 
        }
      `}</style>
    </section>
  );
};

// ─── COUNTDOWN TÁCTICO RE-DISEÑADO (CLEAN) ───
const CountdownTactical: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const update = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "Días", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
    <div className="bg-[#0b0410]/80 border border-white/10 p-5 rounded-2xl w-fit relative overflow-hidden group shadow-xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffd700] via-[#ff00de] to-transparent" />

      <p className="text-[#ffd700] text-[10px] md:text-xs font-sans font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
        <Crosshair className="w-4 h-4 text-[#ffd700]" />
        Tiempo para el Despliegue en Zona Cero
      </p>

      <div className="flex items-center gap-2.5 md:gap-4">
        {units.map((unit, i) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center min-w-[50px] md:min-w-[65px]">
              <span className="font-pop text-3xl md:text-4xl lg:text-5xl text-white leading-none tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-gray-400 font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase mt-1.5 font-bold">
                {unit.label}
              </span>
            </div>
            {i < 3 && (
              <span className="font-pop text-[#ff00de] text-2xl md:text-4xl pb-4 opacity-50 animate-pulse">
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
