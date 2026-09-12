"use client";

// Registro de demos 3D por tarjeta + marco visual (TypeSceneFrame).
// Cada tipo de página recibe su propia demo temática; el acento de color
// proviene de TYPE_ACCENTS (lima económico → fucsia premium) y la barra
// "Diseño n/8" comunica que la complejidad escala con el precio.

import type { ComponentType } from "react";
import { ComidaScene, MotoScene, PortafolioScene, CasaScene } from "./type-scenes-1";
import { BarcosScene, EventosScene, TiendaScene, AgentesIAScene } from "./type-scenes-2";
import { MiniScene } from "./mini-scene";
import { PAGE_TYPES, TYPE_ACCENTS, ACCENT_FALLBACK } from "./data";

interface TypeSceneMeta {
  badge: string;
  caption: string;
  Scene: ComponentType;
}

const META: Record<string, TypeSceneMeta> = {
  landing: {
    badge: "3D · Comida",
    caption: "Demo: landing de restaurante con pedidos",
    Scene: ComidaScene,
  },
  "negocio-local": {
    badge: "3D · Motos",
    caption: "Demo: taller y concesionaria de motos",
    Scene: MotoScene,
  },
  portafolio: {
    badge: "3D · Creativo",
    caption: "Demo: portafolio de fotógrafo con galería flotante",
    Scene: PortafolioScene,
  },
  corporativa: {
    badge: "3D · Inmobiliaria",
    caption: "Demo: web de bienes raíces con casas en 3D",
    Scene: CasaScene,
  },
  blog: {
    badge: "3D · Yates",
    caption: "Demo: blog de viajes y charters náuticos",
    Scene: BarcosScene,
  },
  eventos: {
    badge: "3D · Conciertos",
    caption: "Demo: festival con escenario, vinilo y luces",
    Scene: EventosScene,
  },
  ecommerce: {
    badge: "3D · Moda",
    caption: "Demo: tienda de moda con carrito y descuentos",
    Scene: TiendaScene,
  },
  saas: {
    badge: "3D · Agentes IA",
    caption: "Demo: plataforma de agentes de IA a medida",
    Scene: AgentesIAScene,
  },
};

export function TypeSceneFrame({ id, index }: { id: string; index: number }) {
  const meta = META[id] ?? META.landing;
  const accent = TYPE_ACCENTS[id] ?? ACCENT_FALLBACK;
  const Scene = meta.Scene;

  return (
    <div className="mb-5">
      {/* Panel con la demo 3D en vivo */}
      <div
        className="relative h-36 overflow-hidden rounded-xl border sm:h-40"
        style={{
          borderColor: `${accent}2e`,
          backgroundImage: `radial-gradient(circle at 50% 118%, ${accent}42, transparent 62%), linear-gradient(180deg, #131316 0%, #0a0a0c 100%)`,
        }}
      >
        <MiniScene>
          <Scene />
        </MiniScene>
        <span
          className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-100 backdrop-blur-sm"
          style={{ borderColor: `${accent}59`, background: `${accent}24` }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent }} />
          {meta.badge}
        </span>
        <span className="pointer-events-none absolute bottom-2 right-2.5 text-[9px] uppercase tracking-wider text-zinc-600">
          Demo 3D en vivo
        </span>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">{meta.caption}</p>
      {/* La calidad del diseño escala con el precio: barra n/8 */}
      <div
        className="mt-1.5 flex items-center gap-1"
        role="img"
        aria-label={`Nivel de diseño ${index + 1} de ${PAGE_TYPES.length}`}
      >
        {PAGE_TYPES.map((_, j) => (
          <span
            key={j}
            className="h-1 flex-1 rounded-full"
            style={{ background: j <= index ? accent : "rgba(255,255,255,0.08)" }}
          />
        ))}
        <span className="ml-1.5 whitespace-nowrap text-[9px] font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">
          Diseño {index + 1}/{PAGE_TYPES.length}
        </span>
      </div>
    </div>
  );
}
