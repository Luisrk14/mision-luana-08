import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ChevronDown,
  ShieldAlert,
  Cpu,
  Crosshair,
} from "lucide-react";

// ─── DATOS DE LAS FASES DE LA MISIÓN ───
const missionPhases = [
  {
    id: "01",
    time: "07:00 PM",
    title: "Infiltración",
    subtitle: "INGRESO A LA ZONA CERO",
    description:
      "Validación de identidad en la entrada. El escuadrón toma posiciones estratégicas en el perímetro sin alertar a la entidad.",
    color: "#00e5ff",
  },
  {
    id: "02",
    time: "07:30 PM",
    title: "El Asalto",
    subtitle: "SHOW CENTRAL HUNTRIX",
    description:
      "Nuestra Agente Principal entra en acción. Inicia el ataque musical con coreografías de alto impacto para debilitar al Demonio del Silencio.",
    color: "#ff00de",
  },
  {
    id: "03",
    time: "08:00 PM",
    title: "Recarga",
    subtitle: "RECARGA TÁCTICA",
    description:
      "Banquete especial de recuperación. Los agentes pausan el ataque para recargar energía vital antes del enfrentamiento definitivo.",
    color: "#ffd700",
  },
  {
    id: "04",
    time: "08:30 PM",
    title: "Golpe Final",
    subtitle: "CÁNTICO DE VICTORIA",
    description:
      "El canto unísono del 'Feliz Cumpleaños' dará el golpe de gracia. La meta es destruir al Demonio y liberar el sonido por completo.",
    color: "#00e5ff",
  },
  {
    id: "05",
    time: "09:00 PM",
    title: "Modo Libre",
    subtitle: "ZONA ASEGURADA",
    description:
      "Si el plan resulta, la amenaza será neutralizada al 100%. Pista de baile libre de interferencias para celebrar el éxito de la misión.",
    color: "#ff00de",
  },
];

export const ItinerarySection: React.FC = () => {
  // Estado general (Inicia en 0 para que en PC siempre haya uno abierto por defecto)
  const [activePhase, setActivePhase] = useState<number | null>(0);

  // Lógica para el celular (Permite cerrar la pestaña si la vuelves a tocar)
  const toggleMobilePhase = (index: number) => {
    setActivePhase(activePhase === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#0d0614] relative overflow-hidden font-sans border-b border-[#ff00de]/20">
      {/* ─── FONDO DE SISTEMA ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e0a3c_0%,transparent_70%)] opacity-50" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)] pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        {/* ─── CABECERA ─── */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 bg-[#1e0a3c] border border-[#00e5ff]/50 px-4 py-2 rounded-full mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          >
            <Terminal className="w-4 h-4 text-[#00e5ff]" />
            <span className="text-[#00e5ff] text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
              Terminal de Operaciones
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-pop text-white uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          >
            Plan de <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#ff00de] to-[#ffd700]">
              Despliegue
            </span>
          </motion.h2>
        </div>

        {/* =========================================================
            VERSIÓN 1: MÓVILES Y TABLETS (ACORDEÓN VERTICAL)
            Solo visible en pantallas menores a 'lg' (1024px)
            ========================================================= */}
        <div className="flex flex-col gap-4 lg:hidden max-w-3xl mx-auto">
          {missionPhases.map((phase, index) => {
            const isActive = activePhase === index;

            return (
              <motion.div
                key={`mobile-${phase.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col border border-white/10 bg-[#0b0410]/80 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-lg"
                style={{
                  borderLeft: isActive
                    ? `4px solid ${phase.color}`
                    : "4px solid transparent",
                  boxShadow: isActive ? `0 0 20px ${phase.color}30` : "none",
                }}
              >
                {/* BOTÓN MÓVIL */}
                <button
                  onClick={() => toggleMobilePhase(index)}
                  className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span
                      className={`font-pop text-3xl md:text-4xl transition-colors duration-300 ${isActive ? "text-white drop-shadow-md" : "text-gray-600 group-hover:text-gray-400"}`}
                      style={{ color: isActive ? phase.color : undefined }}
                    >
                      {phase.id}
                    </span>
                    <div>
                      <p
                        className={`text-[10px] md:text-xs font-black tracking-widest uppercase mb-1 transition-colors ${isActive ? "text-white" : "text-gray-500"}`}
                      >
                        {phase.time}
                      </p>
                      <h3
                        className={`font-sans text-sm md:text-lg font-bold uppercase tracking-widest transition-colors ${isActive ? "text-white" : "text-gray-400"}`}
                      >
                        {phase.title}
                      </h3>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-600"}`}
                      style={{ color: isActive ? phase.color : undefined }}
                    />
                  </motion.div>
                </button>

                {/* CONTENIDO DESPLEGABLE MÓVIL */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-6 pt-0 border-t border-white/5 relative">
                        <div className="absolute right-4 bottom-4 text-[100px] font-pop font-black opacity-[0.03] pointer-events-none select-none leading-none">
                          {phase.id}
                        </div>

                        <div className="flex items-center gap-3 mb-4 mt-4">
                          <ShieldAlert
                            className="w-5 h-5"
                            style={{ color: phase.color }}
                          />
                          <span
                            className="font-sans text-[10px] font-black tracking-[0.4em] uppercase"
                            style={{ color: phase.color }}
                          >
                            Directiva Desencriptada
                          </span>
                        </div>

                        <h4 className="font-pop text-2xl text-white uppercase tracking-wider mb-3 leading-none">
                          {phase.subtitle}
                        </h4>

                        <p className="font-sans text-gray-300 text-sm font-light leading-relaxed mb-8">
                          {phase.description}
                        </p>

                        {/* Motor de Procesamiento Móvil */}
                        <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Cpu
                                className="w-4 h-4"
                                style={{ color: phase.color }}
                              />
                              <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">
                                Estado
                              </span>
                            </div>
                            <span
                              className="text-[9px] font-mono tracking-widest animate-pulse"
                              style={{ color: phase.color }}
                            >
                              PROCESANDO...
                            </span>
                          </div>

                          <div className="flex gap-1 h-2">
                            {[...Array(12)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="flex-1 rounded-sm opacity-20"
                                style={{ backgroundColor: phase.color }}
                                animate={{ opacity: [0.1, 1, 0.1] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "linear",
                                  delay: ((i * 7) % 20) * 0.1,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================
            VERSIÓN 2: COMPUTADORAS WEB (TABS + PANTALLA GIGANTE)
            Solo visible en pantallas 'lg' (1024px) o mayores
            ========================================================= */}
        <div className="hidden lg:flex flex-row gap-10">
          {/* COLUMNA IZQUIERDA: PESTAÑAS */}
          <div className="flex flex-col gap-3 w-1/3 shrink-0">
            {missionPhases.map((phase, index) => {
              const isActive = activePhase === index;
              return (
                <button
                  key={`desktop-${phase.id}`}
                  onClick={() => setActivePhase(index)}
                  className={`relative flex items-center gap-6 p-5 text-left transition-all duration-300 group ${
                    isActive
                      ? "bg-[#1e0a3c]/80"
                      : "bg-[#0b0410]/60 hover:bg-[#1e0a3c]/40"
                  }`}
                  style={{
                    clipPath:
                      "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                    borderLeft: isActive
                      ? `4px solid ${phase.color}`
                      : "4px solid transparent",
                  }}
                >
                  <div
                    className={`font-pop text-2xl lg:text-3xl transition-colors ${isActive ? "text-white" : "text-gray-600 group-hover:text-gray-400"}`}
                  >
                    {phase.id}
                  </div>
                  <div>
                    <div
                      className={`text-[10px] font-black tracking-widest uppercase transition-colors ${isActive ? "" : "text-gray-500"}`}
                      style={{ color: isActive ? phase.color : undefined }}
                    >
                      {phase.time}
                    </div>
                    <div
                      className={`font-sans text-base font-bold uppercase tracking-wider transition-colors ${isActive ? "text-white" : "text-gray-400"}`}
                    >
                      {phase.title}
                    </div>
                  </div>
                  {isActive && (
                    <Crosshair
                      className="absolute right-4 w-5 h-5 opacity-50 animate-[spin_4s_linear_infinite]"
                      style={{ color: phase.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* COLUMNA DERECHA: PANTALLA CIBERNÉTICA */}
          <div className="flex-1 min-h-[480px]">
            <AnimatePresence mode="wait">
              {activePhase !== null && (
                <motion.div
                  key={`desktop-view-${activePhase}`}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    filter: "blur(10px) hue-rotate(90deg)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px) hue-rotate(0deg)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.05,
                    filter: "blur(10px) hue-rotate(-90deg)",
                  }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="relative w-full h-full bg-[#0b0410] border border-white/10 p-10 flex flex-col justify-center"
                  style={{
                    clipPath:
                      "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
                    boxShadow: `inset 0 0 50px ${missionPhases[activePhase].color}20`,
                  }}
                >
                  {/* Detalles decorativos */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
                  <div className="absolute right-6 bottom-6 text-[200px] font-pop font-black opacity-[0.03] pointer-events-none select-none leading-none">
                    {missionPhases[activePhase].id}
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <ShieldAlert
                        className="w-6 h-6"
                        style={{ color: missionPhases[activePhase].color }}
                      />
                      <span
                        className="font-sans text-sm font-black tracking-[0.4em] uppercase"
                        style={{ color: missionPhases[activePhase].color }}
                      >
                        Fase Autorizada
                      </span>
                    </div>

                    <h3 className="font-pop text-5xl lg:text-6xl text-white uppercase tracking-wider mb-4 leading-none">
                      {missionPhases[activePhase].subtitle}
                    </h3>

                    <div className="flex items-center gap-4 my-6">
                      <div
                        className="h-[2px] w-12"
                        style={{
                          backgroundColor: missionPhases[activePhase].color,
                        }}
                      />
                      <span className="font-sans text-white text-xl font-bold tracking-widest uppercase">
                        [ {missionPhases[activePhase].time} ]
                      </span>
                    </div>

                    <p className="font-sans text-gray-300 text-lg font-light leading-relaxed max-w-xl mb-10">
                      {missionPhases[activePhase].description}
                    </p>

                    {/* Motor de Procesamiento PC */}
                    <div className="bg-black/40 rounded-lg p-5 border border-white/5 mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Cpu
                            className="w-5 h-5"
                            style={{ color: missionPhases[activePhase].color }}
                          />
                          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                            Estado del Sistema
                          </span>
                        </div>
                        <span
                          className="text-[10px] font-mono tracking-widest animate-pulse"
                          style={{ color: missionPhases[activePhase].color }}
                        >
                          PROCESANDO...
                        </span>
                      </div>

                      <div className="flex gap-1.5 h-3">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-sm opacity-20"
                            style={{
                              backgroundColor: missionPhases[activePhase].color,
                            }}
                            animate={{ opacity: [0.1, 1, 0.1] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear",
                              delay: ((i * 7) % 20) * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
