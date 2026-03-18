import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, ScanFace, Fingerprint, Crosshair, X } from "lucide-react";

// ─── BASE DE DATOS DE FOTOS ───
const declassifiedFiles = [
  {
    id: "001",
    title: "Agente en Entrenamiento",
    date: "REGISTRO: 2018-2026",
    src: "/luana02.jpeg",
    color: "from-[#ff00de]/40 to-transparent",
    border: "border-[#ff00de]/50",
    shadow: "shadow-[0_0_30px_rgba(255,0,222,0.4)]",
    text: "text-[#ff00de]",
  },
  {
    id: "002",
    title: "Traje de Despliegue",
    date: "ESTADO: Aprobado",
    src: "/luana03.jpg",
    color: "from-[#00e5ff]/40 to-transparent",
    border: "border-[#00e5ff]/50",
    shadow: "shadow-[0_0_30px_rgba(0,229,255,0.4)]",
    text: "text-[#00e5ff]",
  },
  {
    id: "003",
    title: "Prueba de Sonido",
    date: "NIVEL VOCAL: Máximo",
    src: "/luana01.jpeg",
    color: "from-[#ffd700]/40 to-transparent",
    border: "border-[#ffd700]/50",
    shadow: "shadow-[0_0_30px_rgba(255,215,0,0.4)]",
    text: "text-[#ffd700]",
  },
];

export const PhotocardSection: React.FC = () => {
  // ─── ESTADO PARA EL MODAL ───
  // Guarda el ID de la carta seleccionada. Si es null, el modal está cerrado.
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  // Encontramos los datos del archivo que el usuario haya seleccionado
  const selectedFile = declassifiedFiles.find(
    (file) => file.id === selectedFileId,
  );

  return (
    <section className="py-24 bg-[#0d0614] relative overflow-hidden font-sans border-b border-[#00e5ff]/20">
      {/* Fondo Ciber-Cuadrícula */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        {/* Cabecera */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 bg-[#1e0a3c] border border-[#00e5ff]/50 px-4 py-2 rounded-full mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          >
            <FolderOpen className="w-4 h-4 text-[#00e5ff]" />
            <span className="text-[#00e5ff] text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
              Base de Datos Desencriptada
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-pop text-white uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mb-4"
          >
            Archivos <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#ff00de] to-[#ffd700]">
              Desclasificados
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-light max-w-lg"
          >
            Evidencia fotográfica de la Agente Luana recuperada tras el ataque.
            Identidad visual confirmada.
          </motion.p>
        </div>

        {/* Galería de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {declassifiedFiles.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
              className="relative group cursor-pointer"
              // ─── EVENTO CLIC PARA ABRIR MODAL ───
              onClick={() => setSelectedFileId(file.id)}
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-b ${file.color} rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div
                className={`relative bg-[#0b0410] border ${file.border} rounded-2xl overflow-hidden shadow-2xl`}
              >
                <div className="absolute inset-0 bg-[#00e5ff]/10 -translate-y-full group-hover:translate-y-full transition-transform duration-[1.5s] ease-in-out z-20 pointer-events-none border-b-2 border-[#00e5ff] opacity-0 group-hover:opacity-100" />

                <div className="absolute top-0 inset-x-0 bg-black/60 backdrop-blur-md border-b border-white/10 p-3 flex justify-between items-center z-10">
                  <div className="flex items-center gap-2">
                    <ScanFace className={`w-4 h-4 ${file.text}`} />
                    <span className="text-white text-[9px] font-sans font-black tracking-widest uppercase">
                      FILE_ID: {file.id}
                    </span>
                  </div>
                  <Crosshair className="w-4 h-4 text-gray-500 opacity-50 animate-pulse" />
                </div>

                <div className="relative aspect-[3/4] overflow-hidden bg-[#1e0a3c]">
                  <img
                    src={file.src}
                    alt={file.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0410] via-transparent to-transparent opacity-90" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 z-10 bg-gradient-to-t from-[#0b0410] to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <p
                        className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${file.text}`}
                      >
                        {file.date}
                      </p>
                      <h3 className="font-pop text-lg md:text-xl text-white uppercase tracking-wider leading-tight">
                        {file.title}
                      </h3>
                    </div>
                    <Fingerprint
                      className={`w-8 h-8 ${file.text} opacity-20 group-hover:opacity-80 transition-opacity duration-500`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── MODAL VISOR DE ARCHIVO (Overlay) ─── */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Al hacer clic en el fondo oscuro, cerramos el modal
            onClick={() => setSelectedFileId(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            {/* Contenedor principal de la foto ampliada */}
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // Evita que un clic DENTRO de la foto cierre el modal
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-sm md:max-w-md bg-[#0b0410] border-2 ${selectedFile.border} rounded-2xl overflow-hidden ${selectedFile.shadow}`}
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setSelectedFileId(null)}
                className="absolute top-4 right-4 z-50 bg-black/50 backdrop-blur-md border border-white/20 p-2 rounded-full text-white hover:text-red-500 hover:border-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cabecera del Modal */}
              <div className="absolute top-0 inset-x-0 bg-black/70 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <ScanFace className={`w-5 h-5 ${selectedFile.text}`} />
                  <span className="text-white text-[10px] md:text-xs font-sans font-black tracking-widest uppercase">
                    EXPEDIENTE: {selectedFile.id}
                  </span>
                </div>
              </div>

              {/* Imagen a pantalla completa */}
              <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-[#1e0a3c]">
                <img
                  src={selectedFile.src}
                  alt={selectedFile.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0410] via-transparent to-transparent opacity-90" />
              </div>

              {/* Textos inferiores del Modal */}
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 z-10 bg-gradient-to-t from-[#0b0410] to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-2 ${selectedFile.text}`}
                    >
                      {selectedFile.date}
                    </motion.p>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-pop text-2xl md:text-3xl text-white uppercase tracking-wider leading-tight drop-shadow-lg"
                    >
                      {selectedFile.title}
                    </motion.h3>
                  </div>
                  <Crosshair
                    className={`w-10 h-10 ${selectedFile.text} opacity-50 animate-[spin_4s_linear_infinite]`}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
