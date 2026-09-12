"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Visibilidad de escenas 3D (rendimiento):
 * - `mountedOnce`: monta el Canvas la primera vez que la sección se acerca al viewport.
 * - `visible`: mientras está en viewport → frameloop "always"; fuera → "never".
 * Así tres escenas WebGL conviven sin agotar la GPU.
 */
export function useSceneVisibility<T extends HTMLElement>(rootMargin = "160px") {
  const ref = useRef<T>(null);
  const [mountedOnce, setMountedOnce] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          setMountedOnce(true);
        } else {
          setVisible(false);
        }
      },
      { rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, mountedOnce, visible };
}
