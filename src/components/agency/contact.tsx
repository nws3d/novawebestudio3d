"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PAGE_TYPES, PLANS } from "./data";
import { Loader2, Send, ShieldCheck, Clock, MessageCircle } from "lucide-react";

const BUDGETS = [
  "Menos de $200",
  "$200 – $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "Más de $5,000",
  "Aún no lo defino",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  pageType: string;
  budget: string;
  message: string;
  planName: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  pageType: "",
  budget: "",
  message: "",
  planName: "",
};

export function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Escucha cuando el usuario elige un plan o tipo de página en otra sección
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        planName?: string;
        pageType?: string;
      };
      setForm((prev) => ({
        ...prev,
        planName: detail.planName ?? prev.planName,
        pageType: detail.pageType ?? prev.pageType,
      }));
    };
    window.addEventListener("nw:select-plan", handler);
    return () => window.removeEventListener("nw:select-plan", handler);
  }, []);

  const set = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const generateMessageBody = () => {
    return `¡Hola NovaWebEstudio3D! Mi nombre es ${form.name}.

Me interesa una página tipo: ${form.pageType} ${form.planName ? `(Plan: ${form.planName})` : ""}
Presupuesto estimado: ${form.budget || "No definido"}
${form.phone ? `Mi número de contacto es: ${form.phone}` : ""}

Detalles de mi proyecto:
${form.message || "Quiero más información para empezar."}`;
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.pageType || !form.email) {
      toast({
        title: "Faltan datos",
        description: "Por favor llena tu nombre, correo y tipo de página antes de enviar.",
        variant: "destructive",
      });
      return;
    }
    
    const text = encodeURIComponent(generateMessageBody());
    const whatsappNumber = "584121058021"; 
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
    
    toast({ title: "¡Solicitud registrada! 🚀", description: "Te estamos redirigiendo a WhatsApp para charlar." });
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.pageType || !form.email) {
      toast({
        title: "Faltan datos",
        description: "Por favor llena tu nombre, correo y tipo de página antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    const body = encodeURIComponent(generateMessageBody());
    window.location.href = `mailto:novawebestudio3d@gmail.com?subject=Nuevo Proyecto: ${encodeURIComponent(form.name)}&body=${body}`;
    toast({ title: "¡Registrado! Abriendo tu correo...", description: "Revisa tu app de email." });
  };

  return (
    <section
      id="contacto"
      className="nw-grid-bg relative scroll-mt-20 overflow-hidden bg-white dark:bg-zinc-950 py-20 lg:py-28"
      aria-label="Contacto y cotización"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-emerald-100/50 dark:bg-emerald-500/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Columna informativa */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-500/30 bg-emerald-100/50 dark:bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-700 dark:text-emerald-300">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Cotización gratis
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Cuéntanos tu idea y recibe tu presupuesto hoy
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Llena el formulario o escríbenos directo por WhatsApp. Te
              respondemos en menos de 24 horas con una propuesta clara de
              precio y tiempos, sin compromiso.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: Clock,
                  title: "Respuesta en 24 horas",
                  text: "Sin esperas eternas ni formularios que se pierden.",
                },
                {
                  icon: ShieldCheck,
                  title: "Sin compromiso",
                  text: "El presupuesto es gratis y no te obliga a nada.",
                },
                {
                  icon: Send,
                  title: "Pago 50/50",
                  text: "La mitad al empezar, la otra mitad al aprobar el resultado.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-100/50 dark:bg-emerald-500/10">
                    <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            {form.planName && (
              <div className="mt-8 rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-100/50 dark:bg-emerald-500/10 p-4 text-sm text-emerald-200">
                <strong>Plan seleccionado:</strong> {form.planName}
                <button
                  type="button"
                  className="ml-2 text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-700 dark:text-emerald-300"
                  onClick={() => set("planName")("")}
                >
                  (quitar)
                </button>
              </div>
            )}
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-6 shadow-2xl shadow-emerald-950/20 backdrop-blur sm:p-8"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-800 dark:text-zinc-200">
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    placeholder="Ej. María Pérez"
                    required
                    className="border-zinc-300 dark:border-zinc-700 bg-white dark:bg-white dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-800 dark:text-zinc-200">
                    Correo electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                    placeholder="tu@correo.com"
                    required
                    className="border-zinc-300 dark:border-zinc-700 bg-white dark:bg-white dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-800 dark:text-zinc-200">
                    WhatsApp (opcional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    placeholder="+58 412 000 0000"
                    className="border-zinc-300 dark:border-zinc-700 bg-white dark:bg-white dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pageType" className="text-zinc-800 dark:text-zinc-200">
                    Tipo de página *
                  </Label>
                  <Select
                    value={form.pageType}
                    onValueChange={set("pageType")}
                    required
                  >
                    <SelectTrigger
                      id="pageType"
                      className="w-full border-zinc-300 dark:border-zinc-700 bg-white dark:bg-white dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 focus-visible:ring-emerald-500/50"
                    >
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent className="border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-900 dark:text-zinc-100">
                      {PAGE_TYPES.map((t) => (
                        <SelectItem key={t.id} value={t.name}>
                          {t.name} · {t.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="budget" className="text-zinc-800 dark:text-zinc-200">
                    Presupuesto estimado
                  </Label>
                  <Select value={form.budget} onValueChange={set("budget")}>
                    <SelectTrigger
                      id="budget"
                      className="w-full border-zinc-300 dark:border-zinc-700 bg-white dark:bg-white dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 focus-visible:ring-emerald-500/50"
                    >
                      <SelectValue placeholder="Selecciona un rango (opcional)" />
                    </SelectTrigger>
                    <SelectContent className="border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-900 dark:text-zinc-100">
                      {BUDGETS.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message" className="text-zinc-800 dark:text-zinc-200">
                    Cuéntanos sobre tu proyecto
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => set("message")(e.target.value)}
                    placeholder="Ej. Tengo un restaurante y quiero una página con el menú, fotos y pedidos por WhatsApp…"
                    rows={4}
                    className="resize-none border-zinc-300 dark:border-zinc-700 bg-white dark:bg-white dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </div>

              {errors.length > 0 && (
                <ul className="mt-4 space-y-1 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                  {errors.map((err) => (
                    <li key={err}>• {err}</li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={handleWhatsApp}
                  disabled={sending}
                  size="lg"
                  className="flex-1 h-12 bg-emerald-400 text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-300 disabled:opacity-60"
                >
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
                  Enviar por WhatsApp
                </Button>
                
                <Button
                  type="button"
                  onClick={handleEmail}
                  disabled={sending}
                  size="lg"
                  variant="outline"
                  className="flex-1 h-12 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:border-emerald-500/50 hover:bg-zinc-50 dark:bg-zinc-900 hover:text-emerald-700 dark:text-emerald-300 disabled:opacity-60"
                >
                  <Send className="mr-2 h-5 w-5" aria-hidden />
                  Enviar por Correo
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-zinc-900 dark:text-zinc-500 dark:text-zinc-400">
                Al enviar aceptas que te contactemos sobre tu proyecto. Nunca
                compartimos tus datos.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
