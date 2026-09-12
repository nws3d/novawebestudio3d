// ===== Datos compartidos del sitio NovaWebEstudio3D =====

export const TECH_STACK = [
  "Next.js",
  "React 19",
  "Motion for React",
  "Claude AI",
  "UI/UX Pro Max",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Prisma",
  "Animaciones 120 fps",
  "Three.js",
  "Escena 3D interactiva",
];

// Mapeo de plan → tipo de página (para pre-seleccionar el formulario)
export const PLAN_TO_TYPE: Record<string, string> = {
  esencial: "Landing Page",
  animada: "Landing Page",
  corporativa: "Web Corporativa",
  ecommerce: "Tienda Online",
  premium: "Web Corporativa",
  medida: "Aplicación Web / SaaS",
};

// ===== Paleta "vida y color" (del verde económico al fucsia premium) =====
// Sin azul/índigo: lima → esmeralda → teal → amarillo → ámbar → naranja → rosa → fucsia
export const TYPE_ACCENTS: Record<string, string> = {
  landing: "#a3e635", // lima
  "negocio-local": "#34d399", // esmeralda
  portafolio: "#2dd4bf", // teal
  corporativa: "#facc15", // amarillo
  blog: "#fbbf24", // ámbar
  eventos: "#fb923c", // naranja
  ecommerce: "#fb7185", // rosa
  saas: "#e879f9", // fucsia
};

export const PLAN_ACCENTS: Record<string, string> = {
  esencial: "#a3e635",
  animada: "#34d399",
  corporativa: "#2dd4bf",
  ecommerce: "#fbbf24",
  premium: "#fb923c",
  medida: "#e879f9",
};

export const ACCENT_FALLBACK = "#34d399";

// Arcoíris de acentos para decoración (cinta de tecnologías, blobs, etc.)
export const RAINBOW_ACCENTS = [
  "#a3e635",
  "#34d399",
  "#2dd4bf",
  "#facc15",
  "#fbbf24",
  "#fb923c",
  "#fb7185",
  "#e879f9",
];

// Catálogo de tipos de páginas web — ordenado del más económico al más premium
export interface PageType {
  id: string;
  name: string;
  price: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string; // nombre del icono lucide resuelto en el componente
  level: "Económica" | "Estándar" | "Profesional" | "Premium" | "Elite";
}

export const PAGE_TYPES: PageType[] = [
  {
    id: "landing",
    name: "Landing Page",
    price: "Desde $149",
    tagline: "La más económica, ideal para empezar",
    description:
      "Una sola página larga que convierte visitas en clientes. Perfecta para promocionar un producto, servicio u oferta puntual con un diseño moderno y directo al grano.",
    features: [
      "1 página con hasta 5 bloques",
      "Diseño responsive",
      "Botón de WhatsApp",
      "Formulario de contacto",
    ],
    icon: "Rocket",
    level: "Económica",
  },
  {
    id: "negocio-local",
    name: "Web de Negocio Local",
    price: "Desde $199",
    tagline: "Restaurantes, barberías, tiendas físicas",
    description:
      "Tu negocio en el mapa: menú o catálogo de servicios, horarios, ubicación con Google Maps, galería de fotos y botón directo para que te escriban por WhatsApp.",
    features: [
      "Menú o catálogo de servicios",
      "Google Maps y horarios",
      "Galería de fotos",
      "WhatsApp y redes sociales",
    ],
    icon: "Store",
    level: "Económica",
  },
  {
    id: "portafolio",
    name: "Portafolio / CV Digital",
    price: "Desde $249",
    tagline: "Para creativos, freelancers y profesionales",
    description:
      "Muestra tu trabajo con estilo: galerías animadas, casos de estudio, testimonios y contacto directo. Tu mejor carta de presentación en internet, siempre disponible.",
    features: [
      "Galería animada de proyectos",
      "Sección de testimonios",
      "CV descargable",
      "Enlaces a redes profesionales",
    ],
    icon: "Briefcase",
    level: "Estándar",
  },
  {
    id: "corporativa",
    name: "Web Corporativa",
    price: "Desde $599",
    tagline: "Empresas que necesitan presencia sólida",
    description:
      "Sitio multipágina completo: quiénes somos, servicios, equipo, blog y contacto. Con panel de administración para que actualices el contenido sin tocar código.",
    features: [
      "Hasta 6 páginas",
      "Blog integrado",
      "Panel de administración",
      "SEO avanzado + Analytics",
    ],
    icon: "Building2",
    level: "Profesional",
  },
  {
    id: "blog",
    name: "Blog / Medio Digital",
    price: "Desde $649",
    tagline: "Publica contenido y haz crecer tu audiencia",
    description:
      "Plataforma editorial con categorías, buscador, autores y boletín de suscripción. Optimizada para posicionarse en Google y monetizar con publicidad o afiliados.",
    features: [
      "Editor de artículos fácil",
      "Categorías y buscador",
      "Boletín de suscripción",
      "Preparada para SEO y Ads",
    ],
    icon: "Newspaper",
    level: "Profesional",
  },
  {
    id: "eventos",
    name: "Web de Eventos",
    price: "Desde $799",
    tagline: "Conciertos, conferencias, lanzamientos",
    description:
      "Página de evento con cuenta regresiva animada, programa del día, perfiles de ponentes y venta o registro de entradas. Todo con animaciones que impresionan.",
    features: [
      "Cuenta regresiva animada",
      "Programa y ponentes",
      "Registro de asistentes",
      "Integración con tickets",
    ],
    icon: "CalendarDays",
    level: "Premium",
  },
  {
    id: "ecommerce",
    name: "Tienda Online",
    price: "Desde $1,199",
    tagline: "Vende 24/7 con tu propio e-commerce",
    description:
      "Tienda completa: catálogo con filtros, carrito, pasarela de pago, gestión de inventario, cupones de descuento y cálculo de envíos. Tu negocio abierto todo el día.",
    features: [
      "Catálogo con filtros",
      "Carrito y pasarela de pago",
      "Gestión de inventario",
      "Cupones y envíos",
    ],
    icon: "ShoppingCart",
    level: "Premium",
  },
  {
    id: "saas",
    name: "Aplicación Web / SaaS",
    price: "Desde $4,999",
    tagline: "El nivel más alto: hecho a tu medida",
    description:
      "Software a medida: usuarios con roles, base de datos, panel de control, notificaciones en tiempo real e incluso funciones de inteligencia artificial integradas.",
    features: [
      "Usuarios, roles y suscripciones",
      "Base de datos y API",
      "Tiempo real (WebSocket)",
      "Funciones con IA integrada",
    ],
    icon: "Cpu",
    level: "Elite",
  },
];

// Planes de precios — ordenados del más económico al más caro
export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  delivery: string;
  popular?: boolean;
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: "esencial",
    name: "Esencial",
    price: "$149",
    period: "pago único",
    description: "Tu primera página web, sin complicaciones.",
    features: [
      "Landing page de 1 página",
      "Diseño moderno y responsive",
      "Formulario de contacto",
      "Botón de WhatsApp",
      "Optimización de velocidad",
      "1 ronda de cambios",
    ],
    delivery: "Entrega en 5 días",
    cta: "Empezar con Esencial",
  },
  {
    id: "animada",
    name: "Animada Pro",
    price: "$299",
    period: "pago único",
    description: "La favorita: animaciones que impresionan.",
    popular: true,
    features: [
      "Todo lo del plan Esencial",
      "Animaciones premium con Motion (120 fps)",
      "Hasta 8 bloques de contenido",
      "SEO básico para Google",
      "Google Maps + redes sociales",
      "2 rondas de cambios",
    ],
    delivery: "Entrega en 7 días",
    cta: "Quiero mi página animada",
  },
  {
    id: "corporativa",
    name: "Corporativa",
    price: "$599",
    period: "pago único",
    description: "Presencia profesional completa para tu empresa.",
    features: [
      "Hasta 6 páginas a medida",
      "Blog integrado",
      "Panel de administración",
      "SEO avanzado + Analytics",
      "Dominio y hosting 1 año",
      "3 rondas de cambios",
    ],
    delivery: "Entrega en 14 días",
    cta: "Escalar mi empresa",
  },
  {
    id: "ecommerce",
    name: "Tienda Online",
    price: "$1,199",
    period: "pago único",
    description: "Tu e-commerce listo para vender desde el día 1.",
    features: [
      "Catálogo hasta 50 productos",
      "Carrito y pasarela de pago",
      "Gestión de inventario",
      "Cupones de descuento",
      "Emails automáticos de pedido",
      "Capacitación para tu equipo",
    ],
    delivery: "Entrega en 21 días",
    cta: "Vender en línea",
  },
  {
    id: "premium",
    name: "Premium Elite",
    price: "$2,499",
    period: "pago único",
    description: "Diseño exclusivo que te diferencia de todos.",
    features: [
      "Diseño 100% exclusivo",
      "Animaciones avanzadas personalizadas",
      "Dashboard con métricas",
      "Integraciones a medida",
      "Dominio, hosting y email 1 año",
      "Soporte prioritario 3 meses",
    ],
    delivery: "Entrega en 30 días",
    cta: "Destacar entre la competencia",
  },
  {
    id: "medida",
    name: "A Medida / SaaS",
    price: "Desde $4,999",
    period: "según proyecto",
    description: "El cielo es el límite: software web completo.",
    features: [
      "Aplicación web completa",
      "Usuarios, roles y suscripciones",
      "Base de datos y API propia",
      "Notificaciones en tiempo real",
      "Funciones de IA integradas",
      "Acompañamiento continuo",
    ],
    delivery: "Planificación conjunta",
    cta: "Cotizar mi proyecto",
  },
];

// Proceso de trabajo
export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Cuéntanos tu idea",
    description:
      "Escríbenos o agenda una llamada de 15 minutos. Definimos juntos el objetivo, el estilo y el presupuesto de tu página. Sin tecnicismos, en español claro.",
    icon: "MessagesSquare",
  },
  {
    step: "02",
    title: "Diseñamos con IA + UI/UX Pro Max",
    description:
      "Usamos Claude AI junto al sistema UI/UX Pro Max: 79 estilos de diseño y 192 paletas profesionales para elegir la combinación perfecta para tu marca.",
    icon: "Palette",
  },
  {
    step: "03",
    title: "Animamos con Motion",
    description:
      "Damos vida a tu página con Motion for React, la librería de animaciones con más de 30 millones de descargas semanales y rendimiento de 120 fps.",
    icon: "Sparkles",
  },
  {
    step: "04",
    title: "Lanzamos y medimos",
    description:
      "Publicamos tu página, configuramos SEO y analítica, y te acompañamos con soporte. Tu negocio online, listo para crecer desde el primer día.",
    icon: "Rocket",
  },
];

// Preguntas frecuentes
export const FAQS = [
  {
    q: "¿Cuánto tarda mi página web en estar lista?",
    a: "Depende del plan: una landing económica está lista en 5 días, una corporativa en unas 2 semanas y una tienda online en 3 semanas. Los proyectos a medida se planifican por fases con fechas claras desde el inicio. Siempre te entregamos un calendario antes de empezar.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Solo tu idea y, si tienes, tu logo, textos y fotos. Si no los tienes, no te preocupes: te ayudamos a redactar los textos y usamos imágenes de alta calidad incluidas en el precio. El proceso arranca con una conversación de 15 minutos.",
  },
  {
    q: "¿El dominio y el hosting están incluidos?",
    a: "En los planes Corporativa, Tienda Online y Premium Elite incluimos dominio y hosting gratis el primer año. En los planes económicos puedes usar tu propio hosting o te recomendamos opciones desde $3 al mes. Tú decides, sin letra pequeña.",
  },
  {
    q: "¿Puedo pagar en cuotas?",
    a: "Sí. Trabajamos con un esquema 50/50: la mitad para arrancar el proyecto y la otra mitad al aprobar la versión final antes de publicar. En proyectos a medida dividimos el pago por hitos entregados, para que pagues conforme ves resultados.",
  },
  {
    q: "¿Qué pasa si no me gusta el diseño?",
    a: "Cada plan incluye rondas de cambios (desde 1 hasta ilimitadas según el plan). Trabajamos sobre maquetas visibles antes de programar, así que apruebas el diseño antes de la fase final. El 100% de nuestros clientes queda satisfecho con el resultado.",
  },
  {
    q: "¿Puedo actualizar mi página después del lanzamiento?",
    a: "Claro. Los planes con panel de administración te permiten cambiar textos, fotos y precios tú mismo, sin tocar código. También ofrecemos planes de mantenimiento mensual desde $25 si prefieres que lo hagamos nosotros por ti.",
  },
];
