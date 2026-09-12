"use client";

import type { MouseEvent } from "react";

/** GlowCard: borde luminoso que rota siguiendo el cursor + foco radial
 *  (técnica del portfolio 3D de Adrian Hajdin, adaptada a esmeralda).
 *  Actualiza las variables CSS --nw-start, --nw-mx y --nw-my del elemento. */
export function handleGlowMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const angle =
    (Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180) / Math.PI;
  el.style.setProperty("--nw-start", `${(angle + 360) % 360}deg`);
  el.style.setProperty("--nw-mx", `${x}px`);
  el.style.setProperty("--nw-my", `${y}px`);
}
