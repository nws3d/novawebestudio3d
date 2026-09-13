"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/agency/navbar";
import { Hero } from "@/components/agency/hero";
import { PageTypes } from "@/components/agency/page-types";
import { Pricing3D } from "@/components/agency/pricing-3d";
import { Process } from "@/components/agency/process";
import { Faq } from "@/components/agency/faq";
import { Contact } from "@/components/agency/contact";
import { Footer } from "@/components/agency/footer";
import { handleGlowMove } from "@/components/agency/glow";
import { Zap, CheckCircle2 } from "lucide-react";
import { Logo3D } from "@/components/agency/logo-3d";

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-zinc-950 pb-20 lg:pb-28" aria-label="Llamado final a la acción">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          onMouseMove={handleGlowMove}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="nw-glow-card relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white px-6 py-14 text-center shadow-xl shadow-emerald-500/10 sm:px-12 dark:border-emerald-500/25 dark:from-emerald-950/50 dark:via-zinc-900 dark:to-zinc-900 dark:shadow-2xl dark:shadow-emerald-950/40"
        >
          <span className="nw-glow-spot hidden dark:block" aria-hidden />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-16 h-56 w-56 rounded-full bg-amber-500/10 blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-[90px]"
          />
          <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 shadow-xl shadow-emerald-500/20">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h2 className="relative text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Tu próxima página web está a un mensaje de distancia
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            De la landing más económica al proyecto más ambicioso: hay un plan
            perfecto para ti. Pide tu cotización gratis hoy y ten tu página
            funcionando esta misma semana.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-emerald-400 px-8 text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-300"
            >
              <a href="#contacto">Pedir cotización gratis</a>
            </Button>
            <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
              Respuesta en menos de 24 horas
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PageTypes />
        <Pricing3D />
        <Process />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
