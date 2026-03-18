import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, CalendarDays, Crosshair, Radar } from "lucide-react";
import MapInner from "./Map/MapInner";

const eventData = {
  nombres: "Luana Alondra",
  tipo: "Zona Cero", // Cambiado para temática espía
  fecha: "Viernes, 20 de Marzo del 2026",
  hora: "7:00 PM",
  direccion: "Mz. I Lt. 8 Upis La Libertad, Ventanilla - Callao",
  coords: [-11.849256, -77.135875] as [number, number],
  mensaje:
    "¡Trae toda tu energía! El escuadrón te espera para el despliegue musical.",
};

export const LocationSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#0d0614] relative overflow-hidden font-sans border-b border-[#ffd700]/20">
      {/* ─── FONDO TÁCTICO CIBERNÉTICO ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5ff08_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Brillo de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00e5ff]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        {/* ─── CABECERA ─── */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#1e0a3c] border border-[#00e5ff]/50 px-5 py-2 rounded-full mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          >
            <Radar className="w-4 h-4 text-[#00e5ff] animate-[spin_3s_linear_infinite]" />
            <span className="text-[#00e5ff] text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">
              Rastreo Satelital Activo
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-pop text-white drop-shadow-[0_0_15px_rgba(0,229,255,0.3)] text-center uppercase tracking-wider"
          >
            Coordenadas
          </motion.h2>
        </div>

        {/* ─── GRID DE 12 COLUMNAS (Tu diseño original) ─── */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch">
          {/* COLUMNA 1: DATOS DE LA MISIÓN (5/12) */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div className="bg-[#1e0a3c]/60 backdrop-blur-md h-full rounded-3xl shadow-[0_0_30px_rgba(0,229,255,0.15)] border border-[#00e5ff]/40 flex flex-col overflow-hidden relative group">
                {/* Línea de escaneo láser */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff00de]/10 to-transparent h-[200%] w-full animate-[scan_4s_ease-in-out_infinite] pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00e5ff] via-[#ff00de] to-[#ffd700]" />

                <div className="p-8 md:p-10 flex-1 relative z-10">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#ff00de]/20 border border-[#ff00de]/50 text-[#ff00de] text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-[0_0_15px_rgba(255,0,222,0.3)]">
                    {eventData.tipo}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-pop text-white mb-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] leading-tight uppercase">
                    El Escenario <br /> Principal
                  </h3>
                  <p className="text-[#00e5ff] text-sm md:text-base font-light mb-10">
                    {eventData.mensaje}
                  </p>

                  <div className="space-y-6">
                    <div className="flex gap-5 items-center group/item">
                      <div className="w-12 h-12 rounded-full bg-[#0d0614] border border-[#00e5ff]/40 flex items-center justify-center shrink-0 group-hover/item:border-[#00e5ff] group-hover/item:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300">
                        <CalendarDays className="w-5 h-5 text-[#00e5ff]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#00e5ff] uppercase tracking-widest mb-1">
                          Día de Despliegue
                        </p>
                        <p className="text-white font-bold tracking-wide">
                          {eventData.fecha}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5 items-center group/item">
                      <div className="w-12 h-12 rounded-full bg-[#0d0614] border border-[#ff00de]/40 flex items-center justify-center shrink-0 group-hover/item:border-[#ff00de] group-hover/item:shadow-[0_0_15px_rgba(255,0,222,0.4)] transition-all duration-300">
                        <Clock className="w-5 h-5 text-[#ff00de]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#ff00de] uppercase tracking-widest mb-1">
                          Hora de Invocación
                        </p>
                        <p className="text-white font-bold tracking-wide">
                          {eventData.hora}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5 items-start group/item">
                      <div className="w-12 h-12 rounded-full bg-[#0d0614] border border-[#ffd700]/40 flex items-center justify-center shrink-0 group-hover/item:border-[#ffd700] group-hover/item:shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all duration-300">
                        <MapPin className="w-5 h-5 text-[#ffd700]" />
                      </div>
                      <div className="pt-1">
                        <p className="text-[10px] font-black text-[#ffd700] uppercase tracking-widest mb-1">
                          Ubicación Exacta
                        </p>
                        <p className="text-white font-bold leading-relaxed text-sm">
                          {eventData.direccion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTÓN INFERIOR DE NAVEGACIÓN */}
                <div className="p-6 bg-[#0d0614]/90 border-t border-[#00e5ff]/30 relative z-10">
                  <div className="flex gap-3 w-full">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${eventData.coords[0]},${eventData.coords[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative w-full flex items-center justify-center gap-3 bg-[#081220] hover:bg-[#00e5ff] border border-[#00e5ff]/50 text-[#00e5ff] hover:text-black py-4 rounded-xl transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(0,229,255,0.1)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)]"
                    >
                      <Crosshair className="w-5 h-5 group-hover/btn:animate-spin" />
                      <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                        Fijar Ruta en GPS
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* COLUMNA 2: MAPA INTERACTIVO (7/12) */}
          <div className="order-1 lg:order-2 lg:col-span-7 w-full h-[400px] lg:h-auto min-h-[450px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,0,222,0.2)] border-2 border-[#ff00de]/40 relative bg-[#0d0614] p-1 group">
            {/* Esquinas tácticas decorativas */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#00e5ff] z-20 pointer-events-none rounded-tl-lg" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#00e5ff] z-20 pointer-events-none rounded-br-lg" />

            <div className="w-full h-full rounded-[22px] overflow-hidden relative">
              <MapInner
                coords={eventData.coords}
                titulo={eventData.tipo}
                direccion={eventData.direccion}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animación del Escáner */}
      <style>{`
        @keyframes scan { 
          0% { transform: translateY(-100%); } 
          50% { transform: translateY(50%); } 
          100% { transform: translateY(-100%); } 
        }
      `}</style>
    </section>
  );
};
