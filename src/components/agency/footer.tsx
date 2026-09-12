"use client";
import Link from "next/link";

import { Mail, MessageCircle, ArrowUp } from "lucide-react";
import { Logo3D } from "./logo-3d";

const NAV = [
  { href: "#tipos", label: "Tipos de páginas" },
  { href: "#precios", label: "Planes y precios" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#faq", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2" aria-label="NovaWebEstudio3D — Inicio">
              <Logo3D />
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                NovaWeb<span className="text-emerald-600 dark:text-emerald-400">Estudio3D</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Creamos páginas web de todos los tipos y presupuestos — de la
              landing más económica a la aplicación más premium — con diseño
              moderno, animaciones de alta gama e inteligencia artificial.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">
              Explora
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 transition-colors hover:text-emerald-700 dark:text-emerald-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link
                  href="mailto:novawebestudio3d@gmail.com"
                  className="flex items-center gap-2.5 transition-colors hover:text-emerald-700 dark:text-emerald-300"
                >
                  <Mail className="h-4 w-4 text-emerald-400" aria-hidden />
                  novawebestudio3d@gmail.com
                </Link>
              </li>
              <li>
                <Link
                  href="/#contacto"
                  className="flex items-center gap-2.5 transition-colors hover:text-emerald-700 dark:text-emerald-300"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden />
                  WhatsApp directo desde el formulario
                </Link>
              </li>
            </ul>
            <p className="mt-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 text-xs leading-relaxed text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">
              Horario de atención: lunes a sábado, 9:00 – 19:00. Respondemos
              todos los mensajes en menos de 24 horas.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800/80 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} NovaWebEstudio3D. Todos los derechos
            reservados.
          </p>
          <Link
            href="/#inicio"
            className="flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:text-emerald-300"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden />
            Volver arriba
          </Link>
        </div>
      </div>
    </footer>
  );
}
