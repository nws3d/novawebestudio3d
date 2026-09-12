"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import { Logo3D } from "./logo-3d";
import { ModeToggle } from "@/components/mode-toggle";

const LINKS = [
  { href: "/#tipos", label: "Tipos de páginas" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/#precios", label: "Precios" },
  { href: "/#proceso", label: "Cómo trabajamos" },
  { href: "/#faq", label: "Preguntas" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="NovaWebEstudio3D — Inicio">
          <Logo3D />
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            NovaWeb<span className="text-emerald-600 dark:text-emerald-400">Estudio3D</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-emerald-600 dark:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <ModeToggle />
          <Button
            asChild
            className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300 shadow-lg shadow-emerald-500/25"
          >
            <Link href="/#contacto">Cotizar gratis</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-expanded={open}
          >
            <span className="sr-only">Abrir menú principal</span>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-50 dark:bg-zinc-900 hover:text-emerald-700 dark:text-emerald-300"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-2 w-full bg-emerald-400 font-semibold text-zinc-950 hover:bg-emerald-300"
              >
                <a href="/#contacto" onClick={() => setOpen(false)}>
                  Cotizar gratis
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
