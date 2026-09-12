"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PLANS, PLAN_ACCENTS, PLAN_TO_TYPE, ACCENT_FALLBACK } from "./data";
import { PricingList } from "./pricing";
import {
  Check,
  Crown,
  EyeOff,
  LayoutList,
  MousePointerClick,
  Send,
  TrendingUp,
  LayoutTemplate
} from "lucide-react";

// Mapeo inverso aproximado de nombre a ID de mockup para los planes
const PLAN_MOCKUPS: Record<string, string> = {
  esencial: "landing",
  animada: "landing",
  corporativa: "corporativa",
  ecommerce: "ecommerce",
  premium: "corporativa",
  medida: "saas",
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
          novaweb.studio/planes
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

export function Pricing3D() {
  const [selected, setSelected] = useState(1); // por defecto: el plan popular
  const [showList, setShowList] = useState(false);

  const plan = PLANS[selected];
  const accent = PLAN_ACCENTS[plan.id] ?? ACCENT_FALLBACK;
  const mockupId = PLAN_MOCKUPS[plan.id] || "landing";

  const goToContact = () => {
    window.dispatchEvent(
      new CustomEvent("nw:select-plan", {
        detail: { planName: plan.name, pageType: PLAN_TO_TYPE[plan.id] },
      })
    );
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="precios"
      className="nw-grid-bg relative scroll-mt-20 overflow-hidden bg-white dark:bg-zinc-950 py-20 lg:py-28"
      aria-label="Planes y precios"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-100/50 dark:bg-emerald-500/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <LayoutTemplate className="mr-1 h-4 w-4" aria-hidden />
            Planes y Precios Reales
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            Todos los planes, a tu alcance
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Explora las opciones desde la más económica hasta la más premium.
            Haz clic en cualquier miniatura para ver cómo lucen los resultados.
          </p>
        </motion.div>

        {/* Escala visual de precios */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-2xl items-center gap-3"
          aria-hidden
        >
          <span className="text-xs font-semibold text-lime-300">Económico</span>
          <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-600 dark:from-lime-400 via-emerald-600 dark:via-emerald-400 via-50% to-orange-400" />
          <span className="text-xs font-semibold text-orange-300">Premium</span>
        </motion.div>

        {/* Ayudas de interacción */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
        >
          {[
            { icon: MousePointerClick, text: "Clic en un plan para ver detalles" },
          ].map((hint) => (
            <span
              key={hint.text}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              <hint.icon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
              {hint.text}
            </span>
          ))}
        </motion.div>

        {/* Mockup Principal + panel de detalle */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <motion.div
            key={`pricing-mockup-${plan.id}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-[420px] lg:col-span-2 group"
          >
            <BrowserFrame accent={accent}>
              <Image
                src={`/mockups/${mockupId}.jpg`}
                alt={`Mockup de ${plan.name}`}
                fill
                className="object-cover object-top transition-transform duration-[10s] ease-linear group-hover:-translate-y-1/4"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </BrowserFrame>
            <span className="pointer-events-none absolute left-4 top-14 z-10 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-500 dark:text-zinc-400 backdrop-blur">
              Plantilla base · {PLANS.length} niveles
            </span>
          </motion.div>

          {/* Panel del plan seleccionado */}
          <motion.aside
            key={`pricing-panel-${plan.id}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col overflow-hidden rounded-2xl border bg-zinc-50 dark:bg-zinc-900/60 p-6 backdrop-blur"
            style={{ borderColor: `${accent}59` }}
            aria-live="polite"
          >
            {plan.popular && (
              <Badge className="w-fit bg-emerald-400 font-bold text-zinc-950 hover:bg-emerald-400">
                ★ La más popular
              </Badge>
            )}

            <header className="mt-3 flex items-center justify-between gap-3">
              <h3 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                {plan.name}
              </h3>
              {plan.id === "medida" && (
                <Crown className="h-6 w-6 shrink-0 text-orange-300" aria-hidden />
              )}
            </header>

            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{plan.description}</p>

            <p className="mt-4 flex items-baseline gap-2">
              <span
                className="text-4xl font-extrabold tracking-tight"
                style={{ color: accent }}
              >
                {plan.price}
              </span>
              <span className="text-sm text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">{plan.period}</span>
            </p>

            <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
              {plan.delivery}
            </p>

            <ul className="nw-scroll mt-5 max-h-56 flex-1 space-y-2.5 overflow-y-auto border-t border-zinc-200 dark:border-zinc-800/80 pt-5 lg:max-h-none">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <Check className="h-3 w-3" style={{ color: accent }} aria-hidden />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Button
              onClick={goToContact}
              size="lg"
              className="mt-6 w-full font-semibold text-zinc-950 shadow-lg hover:brightness-110 active:scale-95 transition-all"
              style={{
                background: accent,
                boxShadow: `0 10px 30px -10px ${accent}80`,
              }}
            >
              <Send className="mr-2 h-4 w-4" aria-hidden />
              Quiero el plan {plan.name}
            </Button>

            <p className="mt-3 text-center text-[11px] text-zinc-600">
              Plan {selected + 1} de {PLANS.length}
            </p>
          </motion.aside>
        </div>

        {/* Selector rápido (Miniaturas) */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-4 snap-x">
          {PLANS.map((p, idx) => {
            const isSelected = selected === idx;
            const pAccent = PLAN_ACCENTS[p.id] ?? ACCENT_FALLBACK;
            const pMockup = PLAN_MOCKUPS[p.id] || "landing";
            return (
              <button
                key={p.id}
                onClick={() => setSelected(idx)}
                className={`relative h-20 w-32 shrink-0 snap-center flex flex-col overflow-hidden rounded-xl border-2 transition-all ${
                  isSelected ? "opacity-100" : "opacity-50 hover:opacity-80 border-zinc-200 dark:border-zinc-800"
                }`}
                style={{ borderColor: isSelected ? pAccent : "" }}
              >
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={`/mockups/${pMockup}.jpg`}
                    alt={p.name}
                    fill
                    className="object-cover object-top"
                    sizes="128px"
                  />
                  <div className={`absolute inset-0 bg-white/70 dark:bg-zinc-950/60 transition-opacity ${isSelected ? "opacity-0" : "opacity-100"}`} />
                </div>
                <div className={`relative z-10 mt-auto w-full p-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${isSelected ? "bg-zinc-900/90 dark:bg-zinc-950/80 text-white" : "bg-white/90 dark:bg-zinc-950/90 text-zinc-600 dark:text-zinc-400"}`}>
                  {p.name}
                </div>
              </button>
            )
          })}
        </div>

        {/* Alternador de vista de lista */}
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            onClick={() => setShowList((v) => !v)}
            className="border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/40 hover:bg-zinc-50 dark:bg-zinc-900 hover:text-emerald-700 dark:text-emerald-300"
            aria-expanded={showList}
          >
            {showList ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" aria-hidden />
                Ocultar lista detallada
              </>
            ) : (
              <>
                <LayoutList className="mr-2 h-4 w-4" aria-hidden />
                Ver lista detallada de todos los planes
              </>
            )}
          </Button>
        </div>

        {showList && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <PricingList />
          </motion.div>
        )}
      </div>
    </section>
  );
}
