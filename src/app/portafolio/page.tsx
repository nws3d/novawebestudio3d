"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/agency/navbar";
import { Footer } from "@/components/agency/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";

const PROJECTS = [
  {
    title: "E-Commerce Premium",
    category: "Tienda Online",
    image: "/mockups/ecommerce.jpg",
    description: "Plataforma de ventas con carrito dinámico y pasarela de pagos.",
  },
  {
    title: "App SaaS",
    category: "Aplicación Web",
    image: "/mockups/saas.jpg",
    description: "Panel de control interactivo con gráficos en tiempo real.",
  },
  {
    title: "Landing Page Startup",
    category: "Landing Page",
    image: "/mockups/landing.jpg",
    description: "Página de aterrizaje de alta conversión para captación de leads.",
  },
  {
    title: "Agencia Corporativa",
    category: "Sitio Corporativo",
    image: "/mockups/corporativa.jpg",
    description: "Diseño elegante y profesional para empresas modernas.",
  },
  {
    title: "Sitio de Eventos",
    category: "Eventos",
    image: "/mockups/eventos.jpg",
    description: "Plataforma de registro y compra de tickets para conferencias.",
  },
  {
    title: "Negocio Local",
    category: "PyME",
    image: "/mockups/negocio-local.jpg",
    description: "Presencia digital optimizada para SEO local y reservas.",
  },
];

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Navbar />
      
      <main className="flex-1 pb-20 pt-32 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
              Nuestro <span className="text-emerald-600 dark:text-emerald-400">Portafolio</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Explora algunos de nuestros proyectos más recientes. Diseñamos experiencias web 
              que combinan estética moderna con un rendimiento excepcional.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-zinc-900/0 transition-colors group-hover:bg-zinc-900/20" />
                  <div className="absolute right-4 top-4 translate-x-8 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg">
                      <ExternalLink className="h-5 w-5" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 flex justify-center"
          >
            <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300">
              <a href="/#contacto">
                Comienza tu proyecto <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
