# NovaWeb Studio — Proyecto Completo

Sitio web de marketing en 3D para agencia de diseño web, construido con
**Next.js 16 + TypeScript + Tailwind CSS 4 + three.js (React Three Fiber)**.

Incluye: escena 3D cinematográfica en el hero, escena 3D de precios (podio
circular con 6 planes), 8 mini-escenas 3D temáticas en las tarjetas de tipos
de web (comida, moto, restaurante, casa, barcos, e-commerce, blog, agentes IA),
efecto Bloom, partículas, GlowCard con brillo que sigue el ratón, contadores
animados y formulario de contacto con base de datos SQLite (Prisma).

---

## Requisitos

- Node.js 20 o superior (recomendado 20 LTS) — https://nodejs.org
- npm (viene incluido con Node.js)
- Opcional: bun (más rápido) — https://bun.sh

## Instalación (3 pasos)

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
# 1) Instalar dependencias (crea la carpeta node_modules)
npm install

# 2) Generar el cliente de Prisma y crear la base de datos SQLite
npm run db:generate
npm run db:push

# 3) Arrancar el servidor de desarrollo
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

> Nota: los archivos `node_modules` y `.next` NO vienen incluidos en este
> paquete porque pesan más de 1.8 GB y se regeneran automáticamente con
> `npm install` y `npm run dev`.

## Producción (opcional)

```bash
npm run build
npm run start
```

## Estructura del proyecto

```
src/
  app/
    page.tsx                  Página principal (ensambla todas las secciones)
    layout.tsx                Layout raíz + fuentes
    globals.css               Estilos globales, GlowCard, animaciones CSS
    api/leads/route.ts        API del formulario de contacto (POST/GET con zod)
  components/
    agency/
      data.ts                 Datos: 8 tipos de web, 6 planes, precios, niveles
      hero.tsx                Sección hero + contadores animados
      hero-3d-scene.tsx       Escena 3D del hero (ventana del navegador, luces cinematográficas, partículas, Bloom)
      page-types.tsx          Las 8 tarjetas de tipos de web con GlowCard
      type-scenes.tsx         Mini-escenas 3D (comida, moto, ...)
      type-scenes-1.tsx       Mini-escenas 3D (casa, barcos, ...)
      type-scenes-2.tsx       Mini-escenas 3D (agentes IA, ...)
      mini-scene.tsx          Contenedor reutilizable de mini-escenas
      use-scene-visibility.ts Hook: pausa el render 3D cuando la tarjeta no está visible (rendimiento)
      showroom-3d-scene.tsx   Escena showroom de las tarjetas
      pricing.tsx / pricing-3d.tsx / pricing-3d-scene.tsx
                              Sección de precios con podio 3D circular
      process.tsx             Sección proceso de trabajo
      contact.tsx             Formulario de contacto (pre-selección desde tarjetas)
      faq.tsx                 Preguntas frecuentes
      footer.tsx / navbar.tsx Navegación y pie de página
      glow.ts / animated-number.tsx
  components/ui/              Componentes shadcn/ui
  lib/                        Utilidades y cliente Prisma
prisma/schema.prisma          Modelo Lead (base de datos SQLite)
db/custom.db                  Base de datos SQLite (ya creada)
```

## Personalización rápida

- **Precios y planes**: `src/components/agency/data.ts`
- **Colores**: `src/app/globals.css` (variables Tailwind) y las luces/punto de
  color dentro de cada escena 3D (`*-3d-scene.tsx`, `type-scenes*.tsx`)
- **Textos en español**: cada componente tiene los textos como constantes al inicio
- **Base de datos**: edita `prisma/schema.prisma` y ejecuta `npm run db:push`

## Solución de problemas

| Problema | Solución |
|---|---|
| `npm install` falla por versiones | Borra `package-lock.json` y vuelve a ejecutar |
| Error de Prisma al arrancar | Ejecuta `npm run db:generate && npm run db:push` |
| Puerto 3000 ocupado | Cambia el puerto: `npx next dev -p 3001` |
| Las escenas 3D van lentas | Es normal en portátiles sin GPU dedicada; baja `dpr` en los Canvas (`dpr={[1, 1.5]}`) |
