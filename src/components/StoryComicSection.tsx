import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  VolumeX,
  Crosshair,
  ChevronRight,
  ChevronLeft,
  Music,
  X,
  Swords,
  Lock,
  Bug,
} from "lucide-react";

const comicPanels = [
  {
    id: 1,
    title: "La Interferencia",
    text: "Estaba sincronizando las pistas para mi celebración de 8 años cuando una anomalía masiva hackeó los servidores. ¡El sonido desapareció de mi habitación en un instante!",
    image: "/luana06.jpg",
    icon: <Music className="w-5 h-5 text-[#00e5ff]" />,
    theme: "border-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.3)]",
    textHighlight: "text-[#00e5ff]",
    gradient: "from-[#00e5ff]/20",
  },
  {
    id: 2,
    title: "El Origen",
    text: "Los radares confirmaron lo peor: ¡El Demonio del Silencio ha saboteado la red! Descubrimos que este ser oscuro nació de un código corrupto en el abismo digital.",
    image: "/luana09.jpg",
    icon: <Bug className="w-5 h-5 text-purple-500" />, // Bug representa un virus/anomalía informática
    theme: "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    textHighlight: "text-purple-500",
    gradient: "from-purple-500/20",
  },
  {
    id: 3,
    title: "La Propagación", // Mejor que "La amenaza" repetido
    text: "Se hace más fuerte devorando la alegría y convirtiendo las notas musicales en polvo gris. Su objetivo es robar la música del mundo, pero no se lo vamos a permitir.",
    image: "/luana10.jpg",
    icon: <VolumeX className="w-5 h-5 text-red-500" />,
    theme: "border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.3)]",
    textHighlight: "text-red-500",
    gradient: "from-red-500/20",
  },
  {
    id: 4,
    title: "El Duelo", // Más épico que "El encuentro"
    text: "¡Lo enfrenté cara a cara para salvar la música! Logró escapar, pero durante la batalla descubrió la inmensa energía que tendrá mi cumpleaños.",
    image: "/luana07.jpg",
    icon: <Swords className="w-5 h-5 text-green-500" />, // Espadas cruzadas para el combate
    theme: "border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3)]",
    textHighlight: "text-green-500",
    gradient: "from-green-500/20",
  },
  {
    id: 5,
    title: "El Sabotaje", // Mejor que "El engaño"
    text: "Para evitar que pida refuerzos, el Demonio encriptó nuestras comunicaciones. Ahora se dirige a la Zona Cero con un solo propósito: cancelar mi concierto y sumirnos en el silencio.",
    image: "/luana12.jpg",
    icon: <Lock className="w-5 h-5 text-blue-500" />, // Candado cerrado porque bloqueó los mensajes
    theme: "border-blue-500 shadow-[0_0_20px_rgba(0,0,255,0.3)]",
    textHighlight: "text-blue-500",
    gradient: "from-blue-500/20",
  },
  {
    id: 6,
    title: "El Reclutamiento",
    text: "¡No puedo vencerlo sola! Te convoco oficialmente al Escuadrón Huntrix. Prepárate para el asalto final en la Zona Cero, necesitamos tu energía para recuperar el sonido.",
    image: "/luana08.jpg",
    icon: <Crosshair className="w-5 h-5 text-[#ffd700]" />, // Mira táctica para el reclutamiento
    theme: "border-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.3)]",
    textHighlight: "text-[#ffd700]",
    gradient: "from-[#ffd700]/20",
  },
];

export const StoryComicSection: React.FC = () => {
  const [selectedPanel, setSelectedPanel] = useState<
    (typeof comicPanels)[0] | null
  >(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ─── LÓGICA DE FLECHAS CON LOOP INFINITO (Solo en Móvil) ───
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.85; // Cantidad a deslizar
      const maxScroll = current.scrollWidth - current.clientWidth;

      if (direction === "right") {
        if (current.scrollLeft >= maxScroll - 15) {
          // Si estamos al final, regresa al inicio (1)
          current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      } else {
        if (current.scrollLeft <= 15) {
          // Si estamos al inicio, ve al final (6)
          current.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <section className="py-20 bg-[#0d0614] relative overflow-hidden font-sans border-b border-[#ff00de]/20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        {/* CABECERA */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-[#1e0a3c] border border-[#ff00de] px-4 py-1.5 rounded-full mb-4 shadow-[0_0_15px_rgba(255,0,222,0.4)]"
          >
            <span className="text-[#ff00de] text-[10px] font-black tracking-[0.3em] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff00de] animate-ping" />{" "}
              Transmisión Entrante
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-pop text-white uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          >
            EL ORIGEN DE LA MISIÓN
          </motion.h2>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            className="md:hidden absolute left-0 top-[250px] z-40 bg-[#1e0a3c]/90 border border-[#00e5ff] w-9 h-9 rounded-full flex items-center justify-center text-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.8)]"
          >
            <ChevronLeft className="w-5 h-5 ml-[-2px]" />
          </button>

          {/* 🔴 EL CONTENEDOR MÁGICO: Flex en móvil, Grid 2 en tablet, Grid 3 en PC. overflow-visible en md elimina el bug de tarjetas delgadas */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-8 snap-x snap-mandatory md:snap-none scrollbar-hide px-4 md:px-0 -mx-4 md:mx-0 scroll-smooth items-center md:items-stretch"
          >
            {comicPanels.map((panel, index) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                onClick={() => setSelectedPanel(panel)}
                /* 🔴 SOLUCIÓN MÓVIL: max-w-[340px] mantiene la carta con proporciones bonitas y verticales en celular. md:w-auto restaura el comportamiento Grid en PC */
                className={`w-[85vw] max-w-[340px] md:w-auto flex-shrink-0 snap-center mx-auto md:mx-0 bg-[#0b0410] rounded-2xl border-2 ${panel.theme} overflow-hidden flex flex-col cursor-pointer hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300`}
              >
                {/* 🔴 ALTURA RESTAURADA A TU DISEÑO ORIGINAL (h-64 / h-72) */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden bg-[#1e0a3c]">
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-700">
                    {panel.icon}
                  </div>
                  <img
                    src={panel.image}
                    alt={panel.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 z-10"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0410] to-transparent z-20" />
                  <div className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-sm border border-white/20 w-8 h-8 rounded-full flex items-center justify-center font-pop text-white text-sm">
                    {panel.id}
                  </div>
                </div>

                <div
                  className={`p-6 flex-1 bg-gradient-to-b ${panel.gradient} to-transparent`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {panel.icon}
                    <h3
                      className={`font-pop text-xl uppercase tracking-wide ${panel.textHighlight}`}
                    >
                      {panel.title}
                    </h3>
                  </div>
                  <p className="font-sans text-gray-300 text-sm leading-relaxed font-light">
                    {panel.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="md:hidden absolute right-0 top-[250px] z-40 bg-[#1e0a3c]/90 border border-[#00e5ff] w-9 h-9 rounded-full flex items-center justify-center text-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.8)]"
          >
            <ChevronRight className="w-5 h-5 mr-[-2px]" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-2 mt-2 md:hidden text-gray-500 animate-pulse">
          <span className="text-[10px] uppercase tracking-widest font-bold">
            Toca o desliza para leer
          </span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* ─── MODAL VISOR DE CÓMIC AMPLIADO ─── */}
      <AnimatePresence>
        {selectedPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPanel(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md md:max-w-4xl bg-[#0b0410] border-2 ${selectedPanel.theme.split(" ")[0]} rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col md:flex-row my-8`}
            >
              <button
                onClick={() => setSelectedPanel(null)}
                className="absolute top-4 right-4 z-50 bg-black/50 backdrop-blur-md border border-white/20 p-2 rounded-full text-white hover:text-red-500 hover:border-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full md:w-1/2 min-h-[350px] md:min-h-[500px] bg-[#1e0a3c]">
                <img
                  src={selectedPanel.image}
                  alt={selectedPanel.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0410] via-transparent to-transparent opacity-50 md:hidden" />
                <div className="absolute top-4 left-4 z-30 bg-black/80 backdrop-blur-md border border-white/20 w-8 h-8 rounded-full flex items-center justify-center font-pop text-white text-sm shadow-lg">
                  {selectedPanel.id}
                </div>
              </div>

              <div
                className={`p-8 md:p-10 w-full md:w-1/2 flex flex-col justify-center bg-gradient-to-b ${selectedPanel.gradient} to-[#0b0410]`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {selectedPanel.icon}
                  <span
                    className={`text-[10px] md:text-xs font-black uppercase tracking-[0.3em] ${selectedPanel.textHighlight}`}
                  >
                    Archivo Desencriptado
                  </span>
                </div>
                <h3
                  className={`font-pop text-3xl md:text-4xl uppercase tracking-wider mb-6 ${selectedPanel.textHighlight}`}
                >
                  {selectedPanel.title}
                </h3>
                <p className="font-sans text-gray-300 text-base md:text-lg leading-relaxed font-light">
                  {selectedPanel.text}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};
