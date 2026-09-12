"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

/**
 * Contador animado estilo AnimatedCounter del portfolio 3D.
 * Usa IntersectionObserver propio (determinista) + animate() de
 * framer-motion para contar de 0 a `value` al entrar en viewport.
 */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !numRef.current) return;
    const node = numRef.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString("es-ES");
      },
    });
    return () => controls.stop();
  }, [visible, value]);

  return (
    <span ref={wrapRef}>
      {prefix}
      <span ref={numRef}>0</span>
      {suffix}
    </span>
  );
}
