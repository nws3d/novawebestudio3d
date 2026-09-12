"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PAGE_TYPES, TYPE_ACCENTS, ACCENT_FALLBACK } from "./data";
import { handleGlowMove } from "./glow";
import {
  Rocket,
  Store,
  Briefcase,
  Building2,
  Newspaper,
  CalendarDays,
  ShoppingCart,
  Cpu,
  ArrowRight,
  Check,
  MousePointerClick,
  Send,
  LayoutTemplate
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Rocket,
  Store,
  Briefcase,
  Building2,
  Newspaper,
  CalendarDays,
  ShoppingCart,
  Cpu,
};

// Componente para simular la ventana del navegador
function BrowserFrame({ children, accent }: { children: React.ReactNode, accent: string }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
      {/* Barra superior del navegador */}
      <div className="flex h-10 items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className="mx-auto flex h-5 w-1/2 items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800/50 text-[10px] text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">
          novaweb.studio
        </div>
      </div>
      {/* Contenido (Imagen) */}
      <div className="relative flex-1 overflow-hidden">
        {children}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
          style={{ background: `linear-gradient(to bottom, transparent, ${accent})` }}
        />
      </div>
    </div>
  );
}

export function TypesShowroom() {
  const [selected, setSelected] = useState(0);
  const tipo = PAGE_TYPES[selected];
  const accent = TYPE_ACCENTS[tipo.id] ?? ACCENT_FALLBACK;

  const goToContact = () => {
    window.dispatchEvent(
      new CustomEvent("nw:select-plan", {
        detail: { pageType: tipo.name },
      })
    );
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-12">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5">
        {[
          { icon: MousePointerClick, text: "Selecciona una plantilla para ver el detalle" },
        ].map((hint) => (
          <span
            key={hint.text}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            <hint.icon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
            {hint.text}
          </span>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mockup del navegador */}
        <motion.div
          key={`mockup-main-${tipo.id}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-[380px] lg:col-span-2 group"
        >
          <BrowserFrame accent={accent}>
            <Image
              src={`/mockups/${tipo.id}.jpg`}
              alt={`Mockup de ${tipo.name}`}
              fill
              className="object-cover object-top transition-transform duration-[10s] ease-linear group-hover:-translate-y-1/4"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </BrowserFrame>
          <span className="pointer-events-none absolute left-4 top-14 z-10 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-500 dark:text-zinc-400 backdrop-blur">
            <LayoutTemplate className="h-3.5 w-3.5" style={{ color: accent }} aria-hidden />
            Plantilla Real · {PAGE_TYPES.length} tipos a color
          </span>
        </motion.div>

        {/* Panel del tipo seleccionado */}
        <motion.aside
          key={`panel-main-${tipo.id}`}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative flex flex-col overflow-hidden rounded-2xl border bg-zinc-50 dark:bg-zinc-900/60 p-6 backdrop-blur"
          style={{ borderColor: `${accent}59` }}
          aria-live="polite"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[70px]"
            style={{ background: `${accent}26` }}
          />
          <Badge
            variant="outline"
            className="w-fit px-3 py-1 text-[11px]"
            style={{
              borderColor: `${accent}66`,
              background: `${accent}1a`,
              color: accent,
            }}
          >
            {tipo.level}
          </Badge>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {tipo.name}
          </h3>
          <p className="mt-1 text-sm italic text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">{tipo.tagline}</p>
          <p
            className="mt-3 text-3xl font-extrabold tracking-tight"
            style={{ color: accent }}
          >
            {tipo.price}
          </p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {tipo.description}
          </p>
          <ul className="mt-4 space-y-2 border-t border-zinc-200 dark:border-zinc-800/80 pt-4">
            {tipo.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  style={{ color: accent }}
                  aria-hidden
                />
                {f}
              </li>
            ))}
          </ul>
          <Button
            onClick={goToContact}
            size="lg"
            className="mt-5 w-full font-semibold text-zinc-950 shadow-lg transition-transform active:scale-95"
            style={{
              background: accent,
              boxShadow: `0 10px 30px -10px ${accent}80`,
            }}
          >
            <Send className="mr-2 h-4 w-4" aria-hidden />
            Me interesa esta página
          </Button>
          <p className="mt-3 text-center text-[11px] text-zinc-600">
            Tipo {selected + 1} de {PAGE_TYPES.length}
          </p>
        </motion.aside>
      </div>
      
      {/* Selector rápido (Miniaturas) */}
      <div className="mt-6 flex gap-3 overflow-x-auto pb-4 snap-x">
        {PAGE_TYPES.map((t, idx) => {
          const isSelected = selected === idx;
          const tAccent = TYPE_ACCENTS[t.id] ?? ACCENT_FALLBACK;
          return (
            <button
              key={t.id}
              onClick={() => setSelected(idx)}
              className={`relative h-20 w-32 shrink-0 snap-center overflow-hidden rounded-xl border-2 transition-all ${
                isSelected ? "opacity-100" : "opacity-50 hover:opacity-80 border-zinc-200 dark:border-zinc-800"
              }`}
              style={{ borderColor: isSelected ? tAccent : "" }}
            >
              <Image 
                src={`/mockups/${t.id}.jpg`}
                alt={t.name}
                fill
                className="object-cover object-top"
                sizes="128px"
              />
              <div className={`absolute inset-0 bg-white/70 dark:bg-zinc-950/60 transition-opacity ${isSelected ? "opacity-0" : "opacity-100"}`} />
            </button>
          )
        })}
      </div>
    </div>
  );
}

const LEVEL_STYLES: Record<string, string> = {
  Económica: "border-lime-500/30 bg-lime-500/10 text-lime-300",
  Estándar: "border-emerald-300 dark:border-emerald-500/30 bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Profesional: "border-teal-500/30 bg-teal-500/10 text-teal-300",
  Premium: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  Elite: "border-orange-500/30 bg-orange-500/10 text-orange-300",
};

export function PageTypes() {
  return (
    <section id="tipos" className="scroll-mt-20 bg-white dark:bg-zinc-950 py-20 lg:py-28" aria-label="Tipos de páginas web">
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
            Catálogo completo
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            ¿Qué tipo de página necesita tu negocio?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Trabajamos con <strong className="text-zinc-800 dark:text-zinc-200">todos los tipos de páginas web</strong>,
            ordenados aquí del más económico al más avanzado. Revisa cómo se ven nuestras 
            <strong className="text-zinc-800 dark:text-zinc-200"> plantillas reales</strong>:
            a mayor inversión, mayor nivel de diseño y funcionalidades.
          </p>
        </motion.div>

        {/* Showcase Principal */}
        <TypesShowroom />

        {/* Tarjetas detalladas */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAGE_TYPES.map((tipo, i) => {
            const Icon = ICONS[tipo.icon] ?? Rocket;
            const accent = TYPE_ACCENTS[tipo.id] ?? ACCENT_FALLBACK;
            return (
              <motion.article
                key={tipo.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                onMouseMove={handleGlowMove}
                className="nw-glow-card group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-zinc-50 dark:bg-zinc-900"
              >
                <span className="nw-glow-spot" aria-hidden />
                
                {/* Mini mockup en tarjeta */}
                <div className="relative mb-6 h-36 w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <Image 
                    src={`/mockups/${tipo.id}.jpg`}
                    alt={`Preview de ${tipo.name}`}
                    fill
                    className="object-cover object-top transition-transform duration-[8s] ease-linear group-hover:-translate-y-1/3"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />
                  <span
                    className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg border shadow-lg backdrop-blur"
                    style={{
                      borderColor: `${accent}40`,
                      background: `linear-gradient(135deg, ${accent}30, ${accent}10)`,
                    }}
                  >
                    <Icon
                      className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: accent }}
                      aria-hidden
                    />
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <Badge
                    variant="outline"
                    className={`text-[11px] ${LEVEL_STYLES[tipo.level] ?? LEVEL_STYLES.Económica}`}
                  >
                    {tipo.level}
                  </Badge>
                </div>

                <h3 className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">{tipo.name}</h3>
                <p className="mt-1 text-sm font-semibold" style={{ color: accent }}>
                  {tipo.price}
                </p>
                <p className="mt-1 text-xs italic text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">{tipo.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {tipo.description}
                </p>

                <ul className="mt-4 space-y-2 border-t border-zinc-200 dark:border-zinc-800/80 pt-4">
                  {tipo.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="mt-5 w-full justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/50 dark:bg-emerald-500/10 hover:text-emerald-700 dark:text-emerald-300"
                >
                  <a
                    href="#contacto"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("nw:select-plan", {
                          detail: { pageType: tipo.name },
                        })
                      );
                    }}
                  >
                    Me interesa
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                  </a>
                </Button>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center text-sm text-zinc-900 dark:text-zinc-500 dark:text-zinc-400"
        >
          ¿No estás seguro de cuál necesitas?{" "}
          <a href="#contacto" className="font-semibold text-emerald-600 dark:text-emerald-400 underline-offset-4 hover:underline">
            Escríbenos y te asesoramos gratis
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
