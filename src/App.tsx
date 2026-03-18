import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Importamos los componentes de la nueva Misión K-Pop
import { WelcomeScreen } from "./components/WelcomeScreen";
import { HeroSection } from "./components/HeroSection";
import { LocationSection } from "./components/LocationSection";
import { PhotocardSection } from "./components/PhotocardSection";
import { Footer } from "./components/Footer";
import { MusicPlayer } from "./components/MusicPlayer";
import { guestsData } from "./components/data/guests";
import { StoryComicSection } from "./components/StoryComicSection";
import { NeonMemoryPuzzle } from "./components/NeonMemoryPuzzle";
import { ItinerarySection } from "./components/ItinerarySection";

export default function App() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false); // Controla el hackeo

  const BirthdayDate = new Date("2026-03-20T19:00:00");

  const { invitado } = useParams();
  const navigate = useNavigate();

  const guestKey = invitado ?? "";
  const guest = guestsData[guestKey];

  // Nombre solo si existe invitado válido
  const guestName = invitado ? guest?.name : "";

  // ⚡ Redirige automáticamente al "/" si el invitado no existe
  useEffect(() => {
    if (invitado && !guest) {
      navigate("/", { replace: true });
    }
  }, [invitado, guest, navigate]);

  // Mientras se decide si existe invitado válido, no renderiza nada
  if (invitado && !guest) {
    return null;
  }

  return (
    // 1. ACTUALIZAMOS LOS COLORES AL TEMA OSCURO NEÓN K-POP
    <div className="bg-[#0d0614] min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#ff00de] selection:text-white">
      <WelcomeScreen
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        guestName={guestName}
      />

      <MusicPlayer isUnlocked={isUnlocked} />

      {/* 2. MANTENEMOS TU LÓGICA DE OCULTAMIENTO ANTES DE ABRIR */}
      <div
        className={isOpened ? "block" : "invisible h-screen overflow-hidden"}
      >
        {/* LA HISTORIA / CÓMIC: Lo primero que ven al "desencriptar" el pase */}
        <StoryComicSection />

        <NeonMemoryPuzzle onUnlock={() => setIsUnlocked(true)} />

        {/* 3. ESTAS SECCIONES SOLO APARECEN SI PASAN EL JUEGO (isUnlocked = true) */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* El HeroSection rediseñado ahora es la recompensa y está al principio de lo revelado */}
              <HeroSection isOpened={isOpened} BirthdayDate={BirthdayDate} />
              <PhotocardSection />
              <ItinerarySection />
              <LocationSection />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
