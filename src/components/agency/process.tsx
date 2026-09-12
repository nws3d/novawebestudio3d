"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { PROCESS_STEPS } from "./data";
import {
  MessagesSquare,
  Palette,
  Sparkles,
  Rocket,
  Bot,
  Gauge,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  MessagesSquare,
  Palette,
  Sparkles,
  Rocket,
};

const DIFFS = [
  {
    icon: Bot,
    title: "Diseño asistido por Claude AI",
    text: "Usamos IA para iterar decenas de propuestas en minutos y quedarnos con la mejor para tu marca. Más creatividad, menos horas facturadas.",
  },
  {
    icon: Gauge,
    title: "Animaciones Motion de 120 fps",
    text: "Trabajamos con Motion for React, la librería usada por Framer y Figma: más de 30 millones de descargas semanales y fluidez cinematográfica.",
  },
  {
    icon: Layers,
    title: "Sistema UI/UX Pro Max",
    text: "79 estilos de interfaz, 192 paletas y 74 combinaciones tipográficas profesionales aplicadas a tu página según tu sector y tu audiencia.",
  },
];

export function Process() {
  return (
    <section
      id="proceso"
      className="scroll-mt-20 bg-white dark:bg-zinc-950 py-20 lg:py-28"
      aria-label="Cómo trabajamos"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge
            variant="outline"
            className="mb-4 border-emerald-300 dark:border-emerald-500/30 bg-emerald-100/50 dark:bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-700 dark:text-emerald-300"
          >
            Nuestra ventaja
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            Tecnología de punta, proceso simple
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Combinamos inteligencia artificial, el mejor sistema de diseño y
            animaciones de alto rendimiento para entregarte páginas que se
            sienten de otro nivel — a precio de mercado local.
          </p>
        </motion.div>

        {/* Diferenciales tecnológicos */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {DIFFS.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 transition-colors hover:border-emerald-300 dark:border-emerald-500/30"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 to-teal-500/10">
                <d.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{d.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Pasos del proceso */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            De la idea al lanzamiento en 4 pasos
          </motion.h3>

          <ol className="relative mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {/* Línea conectora en escritorio */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent xl:block"
            />
            {PROCESS_STEPS.map((paso, i) => {
              const Icon = ICONS[paso.icon] ?? Rocket;
              return (
                <motion.li
                  key={paso.step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.14 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 font-mono text-lg font-bold text-zinc-950 shadow-lg shadow-emerald-500/25">
                      {paso.step}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                      <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden />
                    </span>
                  </div>
                  <h4 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {paso.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {paso.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
