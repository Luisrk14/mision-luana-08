import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#0d0614] border-t border-[#ff00de]/20 text-center flex flex-col items-center justify-center relative overflow-hidden">
      {/* Resplandor de fondo para darle el toque neón final */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-[#00e5ff]/10 blur-[50px] pointer-events-none" />

      <motion.div
        className="flex flex-col items-center gap-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Nombre con iconos de destellos */}
        <div className="flex items-center gap-3 text-[#ffd700]">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="font-pop text-2xl md:text-3xl tracking-widest uppercase drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
            Luana Alondra
          </span>
          <Sparkles
            className="w-4 h-4 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        {/* Fecha con estilo técnico / pase VIP */}
        <p className="text-[#00e5ff] text-[10px] md:text-xs font-sans font-black tracking-[0.4em] uppercase drop-shadow-[0_0_5px_rgba(0,229,255,0.4)]">
          20 · 03 · 2026
        </p>

        {/* Mensaje de cierre temático */}
        <p className="text-gray-500 text-[9px] font-sans tracking-[0.2em] mt-4 uppercase">
          Misión Huntrix • Acceso Exclusivo VIP
        </p>
      </motion.div>
    </footer>
  );
};
