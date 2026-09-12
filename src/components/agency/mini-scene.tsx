"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import { useSceneVisibility } from "./use-scene-visibility";

/**
 * Mini-escena 3D para las tarjetas del catálogo:
 * - Monta el Canvas solo cuando la tarjeta se acerca al viewport (rootMargin amplio).
 * - Pausa el frameloop ("never") cuando sale de vista → 8 demos conviven sin agotar la GPU.
 * - Canvas transparente con DPR limitado y cámara fija enmarcando la escena.
 */
export function MiniScene({ children }: { children: ReactNode }) {
  const { ref, mountedOnce, visible } = useSceneVisibility<HTMLDivElement>("260px");

  return (
    <div ref={ref} className="absolute inset-0">
      {mountedOnce ? (
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.9, 5.6], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          {children}
        </Canvas>
      ) : (
        <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-widest text-zinc-700">
          Demo 3D
        </div>
      )}
    </div>
  );
}
