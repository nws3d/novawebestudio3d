"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TECH_STACK, RAINBOW_ACCENTS } from "./data";
import { AnimatedNumber } from "./animated-number";
import { ArrowDown, Bot, Boxes, Gauge, Orbit, Play, Wand2 } from "lucide-react";

// Escena 3D profesional cargada solo en el cliente (WebGL)
const Hero3DScene = dynamic(() => import("./hero-3d-scene"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center"
      aria-hidden
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-14 w-14 animate-spin rounded-full border-2 border-zinc-200 dark:border-zinc-800 border-t-emerald-400" />
        <p className="text-xs font-medium tracking-wide text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">
          Cargando escena 3D…
        </p>
      </div>
    </div>
  ),
});

const STATS = [
  { value: 120, suffix: " fps", label: "Animaciones fluidas" },
  { value: 79, suffix: "", label: "Estilos de diseño UI" },
  { value: 192, suffix: "", label: "Paletas profesionales" },
  { value: 30, suffix: " M+", label: "Descargas/semana de Motion" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.12 * i, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="nw-grid-bg relative overflow-hidden bg-white dark:bg-zinc-950 pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40"
      aria-label="Presentación"
    >
      {/* Resplandores decorativos */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-emerald-500/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="nw-float-slow pointer-events-none absolute -right-32 top-40 h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Columna de texto */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
              <Badge
                variant="outline"
                className="mb-6 gap-2 border-emerald-300 dark:border-emerald-500/30 bg-emerald-100/50 dark:bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-700 dark:text-emerald-300"
              >
                <Bot className="h-4 w-4" aria-hidden />
                Diseño potenciado con Claude AI + Motion
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl"
            >
              Páginas web de{" "}
              <span className="nw-gradient-text">todos los tipos</span>, del
              presupuesto más ajustado al{" "}
              <span className="nw-gradient-text">más premium</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              En <strong className="text-zinc-800 dark:text-zinc-200">NovaWebEstudio3D</strong>{" "}
              creamos landings económicas, webs corporativas, tiendas online y
              aplicaciones a medida — todas con diseño moderno, animaciones de
              alta gama y la potencia de la inteligencia artificial.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                asChild
                size="lg"
                className="h-12 bg-emerald-400 px-7 text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-300"
              >
                <a href="#precios">
                  <Boxes className="mr-2 h-5 w-5" aria-hidden />
                  Explorar planes en 3D
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 px-7 text-base font-medium text-zinc-800 dark:text-zinc-200 hover:border-emerald-500/50 hover:bg-zinc-50 dark:bg-zinc-900 hover:text-emerald-700 dark:text-emerald-300"
              >
                <a href="#tipos">
                  <Play className="mr-2 h-4 w-4" aria-hidden />
                  Explorar tipos de páginas
                </a>
              </Button>
            </motion.div>

            {/* Estadísticas */}
            <motion.dl
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-12 grid grid-cols-2 gap-6 border-t border-zinc-200 dark:border-zinc-800/80 pt-8 sm:grid-cols-4"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 sm:text-3xl">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </dd>
                  <dd className="mt-1 text-xs leading-snug text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Escena 3D interactiva (técnicas de three-d-portfolio-2025) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
            aria-hidden
          >
            <div className="relative h-[300px] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/40 shadow-2xl shadow-emerald-950/30 sm:h-[400px] lg:h-[520px]">
              <Hero3DScene />

              {/* Etiqueta superior */}
              <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-600 dark:text-zinc-400 backdrop-blur">
                WebGL · React Three Fiber
              </div>
            </div>

            {/* Chips flotantes */}
            <motion.div
              className="nw-float absolute left-3 top-14 flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 px-3.5 py-2 shadow-xl backdrop-blur sm:top-8 sm:-left-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Wand2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Claude AI</span>
            </motion.div>
            <motion.div
              className="nw-float-slow absolute right-3 top-24 flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 px-3.5 py-2 shadow-xl backdrop-blur sm:top-28 sm:-right-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Gauge className="h-4 w-4 text-teal-400" />
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">120 fps Motion</span>
            </motion.div>
            <motion.div
              className="nw-float absolute bottom-4 left-3 flex items-center gap-2 rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-white dark:bg-zinc-950/85 px-3.5 py-2 shadow-xl shadow-emerald-950/40 backdrop-blur"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <Orbit className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Arrastra para explorar la escena
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-16 flex justify-center lg:mt-20"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-500 dark:text-zinc-400"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Cinta de tecnologías con puntos multicolor */}
      <div className="relative mt-14 overflow-hidden border-y border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/40 py-4">
        <div className="nw-marquee flex w-max items-center gap-10 px-6">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap text-sm font-medium tracking-wide text-zinc-900 dark:text-zinc-500 dark:text-zinc-400"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: RAINBOW_ACCENTS[i % RAINBOW_ACCENTS.length],
                  boxShadow: `0 0 8px ${RAINBOW_ACCENTS[i % RAINBOW_ACCENTS.length]}99`,
                }}
                aria-hidden
              />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
