import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaWebEstudio3D — Páginas web animadas de todos los tipos y presupuestos",
  description:
    "De la landing más económica al proyecto más ambicioso. Creamos páginas web modernas, con animaciones premium y la potencia de la Inteligencia Artificial.",
  keywords: [
    "diseño web",
    "páginas web",
    "desarrollo web",
    "landing page",
    "tienda online",
    "económica",
    "premium",
    "animaciones web",
    "Motion",
    "Claude AI",
  ],
  authors: [{ name: "NovaWebEstudio3D" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "NovaWebEstudio3D — Páginas web de todos los tipos y presupuestos",
    description:
      "Desde la más económica hasta la más premium: landings, corporativas, tiendas online y apps web animadas con IA.",
    siteName: "NovaWebEstudio3D",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
