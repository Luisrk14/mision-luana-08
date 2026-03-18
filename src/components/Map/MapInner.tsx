"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";
import { Navigation, MapPin, Hand } from "lucide-react";

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(map.getContainer());
    return () => resizeObserver.disconnect();
  }, [map]);
  return null;
}

function MapInteractionManager({
  isActive,
  onActivate,
}: {
  isActive: boolean;
  onActivate: () => void;
}) {
  const map = useMap();
  useEffect(() => {
    if (isActive) {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
    } else {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
    }
  }, [map, isActive]);

  useEffect(() => {
    map.on("click", onActivate);
    map.on("touchstart", onActivate);
    return () => {
      map.off("click", onActivate);
      map.off("touchstart", onActivate);
    };
  }, [map, onActivate]);
  return null;
}

// Ícono: Estrella con colores K-Pop
const customIcon = L.divIcon({
  className: "custom-map-icon",
  html: `
    <div class="relative flex h-14 w-14 items-center justify-center -translate-x-[20px] -translate-y-[20px]">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-40"></span>
      <div class="relative flex items-center justify-center h-8 w-8 bg-[#1e0a3c] border-[3px] border-[#00e5ff] rounded-full shadow-[0_0_15px_rgba(0,229,255,0.8)]">
         <span style="color: #ffd700; font-size: 16px; text-shadow: 0 0 5px #ffd700;">★</span>
      </div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

interface MapInnerProps {
  coords: [number, number];
  titulo: string;
  direccion: string;
}

export default function MapInner({ coords, titulo, direccion }: MapInnerProps) {
  const markerRef = useRef<L.Marker>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMapInteractive, setIsMapInteractive] = useState(false);

  // LOGICA 1: Activar el mapa
  const handleActivate = () => {
    setIsMapInteractive(true);
  };

  // LOGICA 3: Al pasar el mouse, mostrar el modal
  const handleMouseEnter = () => {
    if (!isMapInteractive) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    markerRef.current?.openPopup();
  };

  // LOGICA 4: Al retirar el mouse, ocultar el modal
  const handleMouseLeave = () => {
    if (!isMapInteractive) return;

    timeoutRef.current = setTimeout(() => {
      markerRef.current?.closePopup();
    }, 400);
  };

  // 👇 AQUÍ VA EL NUEVO useEffect
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const mapElement = document.querySelector(".leaflet-container");

      if (mapElement && !mapElement.contains(e.target as Node)) {
        setIsMapInteractive(false);
        markerRef.current?.closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative h-full w-full group overflow-hidden"
      // LOGICA 5: Al salir de toda la sección, se bloquea el mapa
      onMouseLeave={() => {
        setIsMapInteractive(false);
        handleMouseLeave();
      }}
    >
      {/* BOTÓN "TOCA PARA EXPLORAR" (Ubicado abajo para no estorbar el modal) */}
      {!isMapInteractive && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
          <button
            onClick={handleActivate}
            className="bg-[#1e0a3c]/95 border border-[#ff00de]/50 text-[#ff00de] px-6 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(255,0,222,0.4)] flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Hand className="w-4 h-4 animate-bounce text-[#00e5ff]" />
            <span>Toca para explorar mapa</span>
          </button>
        </div>
      )}

      {/* LOGICA 2: zoomControl={false} elimina el + y - */}
      <MapContainer
        center={coords}
        zoom={16}
        className="h-full w-full"
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
      >
        <MapResizer />
        <MapInteractionManager
          isActive={isMapInteractive}
          onActivate={handleActivate}
        />

        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution="&copy; Maps"
        />

        <Marker
          ref={markerRef}
          position={coords}
          icon={customIcon}
          eventHandlers={{
            mouseover: handleMouseEnter,
            mouseout: handleMouseLeave,
            click: () => {
              handleActivate();
              markerRef.current?.openPopup();
            },
          }}
        >
          <Popup
            className="custom-neon-popup"
            closeButton={false}
            autoPanPadding={[40, 40]}
          >
            <div
              className="w-[280px] bg-[#1e0a3c]/95 backdrop-blur-md rounded-2xl shadow-[0_0_25px_rgba(255,0,222,0.4)] border-2 border-[#ff00de]/60 overflow-hidden p-5 font-sans"
              // Esto asegura que el modal no se cierre si el mouse está encima del cuadro
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <h3 className="font-pop text-white text-xl text-center mb-3 drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
                {titulo}
              </h3>

              <div className="flex items-center gap-3 text-gray-200 mb-5 bg-[#0d0614]/60 py-2 px-4 rounded-xl border border-[#ff00de]/40">
                <MapPin className="w-6 h-6 shrink-0 text-[#00e5ff]" />
                <p className="text-[13px] font-light leading-relaxed">
                  {direccion}
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#081220] hover:bg-[#0c1a2e] border border-[#00e5ff]/40 hover:border-[#00e5ff] text-[#00e5ff] py-4 rounded-xl transition-all no-underline uppercase tracking-widest"
                >
                  <Navigation className="w-4 h-4 text-[#00e5ff]" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#00e5ff]">
                    Ver Mapa
                  </span>
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-neon-popup .leaflet-popup-content-wrapper { background: transparent !important; box-shadow: none !important; padding: 0 !important; border-radius: 0 !important; }
        .custom-neon-popup .leaflet-popup-content { margin: 0 !important; width: auto !important; }
        .custom-neon-popup .leaflet-popup-tip-container { display: none !important; }
        .leaflet-container { font-family: 'Nunito', sans-serif; background: #0d0614 !important; }
      `,
        }}
      />
    </div>
  );
}
