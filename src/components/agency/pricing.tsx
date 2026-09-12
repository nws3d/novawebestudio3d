"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PLANS, PLAN_TO_TYPE } from "./data";
import { Check, Crown } from "lucide-react";

// Lista clásica de planes — se muestra bajo la escena 3D como detalle
// completo y como alternativa accesible si el navegador no soporta WebGL.
export function PricingList() {
  const goToContact = (planId: string, planName: string) => {
    window.dispatchEvent(
      new CustomEvent("nw:select-plan", {
        detail: { planName, pageType: PLAN_TO_TYPE[planId] },
      })
    );
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Tarjetas de planes */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PLANS.map((plan, i) => (
          <motion.article
            key={plan.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.12 }}
            className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5 sm:p-7 ${
              plan.popular
                ? "border-emerald-400/60 bg-gradient-to-b from-emerald-950/40 to-zinc-900 shadow-2xl shadow-emerald-950/40"
                : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:border-zinc-300 dark:border-zinc-700"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-400 px-4 py-1 text-xs font-bold text-zinc-950 shadow-lg shadow-emerald-500/30">
                ★ La más popular
              </span>
            )}

            <header className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{plan.name}</h3>
              {plan.id === "medida" && (
                <Crown className="h-5 w-5 text-orange-300" aria-hidden />
              )}
            </header>

            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">{plan.description}</p>

            <p className="mt-5 flex items-baseline gap-2">
              <span
                className={`text-4xl font-extrabold tracking-tight ${
                  plan.popular ? "text-emerald-700 dark:text-emerald-300" : "text-zinc-900 dark:text-zinc-50"
                }`}
              >
                {plan.price}
              </span>
              <span className="text-sm text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">{plan.period}</span>
            </p>

            <p className="mt-2 inline-flex w-fit rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              ⏱ {plan.delivery}
            </p>

            <ul className="mt-6 flex-1 space-y-3 border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <span
                    className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${
                      plan.popular ? "bg-emerald-400/20" : "bg-zinc-200 dark:bg-zinc-800"
                    }`}
                  >
                    <Check
                      className={`h-3 w-3 ${plan.popular ? "text-emerald-700 dark:text-emerald-300" : "text-emerald-600 dark:text-emerald-400"}`}
                      aria-hidden
                    />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => goToContact(plan.id, plan.name)}
              size="lg"
              className={`mt-7 w-full font-semibold ${
                plan.popular
                  ? "bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-300"
                  : "border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800/80 text-zinc-100 hover:border-emerald-500/40 hover:bg-zinc-200 dark:bg-zinc-800 hover:text-emerald-700 dark:text-emerald-300"
              }`}
            >
              {plan.cta}
            </Button>
          </motion.article>
        ))}
      </div>

      {/* Nota de garantía */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="mx-auto mt-12 max-w-3xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-6 text-center"
      >
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <strong className="text-zinc-100">Pago 50/50 y sin letra pequeña:</strong>{" "}
          la mitad para empezar y la otra mitad al aprobar el resultado final.
          Todos los planes incluyen diseño responsive, optimización de
          velocidad y explicación de uso al entregar.
        </p>
      </motion.div>
    </div>
  );
}
