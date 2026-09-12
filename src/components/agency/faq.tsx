"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "./data";
import { HelpCircle } from "lucide-react";

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-white dark:bg-zinc-950 py-20 lg:py-28"
      aria-label="Preguntas frecuentes"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge_ />
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Todo lo que necesitas saber antes de arrancar tu proyecto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="nw-scroll space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-5 transition-colors data-[state=open]:border-emerald-500/40"
              >
                <AccordionTrigger className="py-4 text-left text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-300 hover:no-underline [&[data-state=open]>svg]:text-emerald-600 dark:[&[data-state=open]>svg]:text-emerald-400">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-4.5 w-4.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function Badge_() {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-500/30 bg-emerald-100/50 dark:bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-700 dark:text-emerald-300">
      <HelpCircle className="h-4 w-4" aria-hidden />
      Resolvemos tus dudas
    </span>
  );
}
