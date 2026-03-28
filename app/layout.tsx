import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToasterRegistry from "./components/ToasterRegistry";
import { ThemeProvider } from "./components/ThemeProvider";
import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TecnaVision - Seguridad inteligente",
  description: "Monitoreo avanzado con AI, resolución 4K ultra nítida e integración perfecta con la app para una tranquilidad total, estés donde estés.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "TecnaVision",
    locale: "es_DO",
    title: "TecnaVision - Seguridad inteligente",
    description: "Monitoreo avanzado con AI, resolución 4K ultra nítida e integración perfecta con la app para una tranquilidad total, estés donde estés.",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "TecnaVision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TecnaVision - Seguridad inteligente",
    description: "Monitoreo avanzado con AI, resolución 4K ultra nítida e integración perfecta con la app para una tranquilidad total, estés donde estés.",
    images: ["/web-app-manifest-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "TecnaVision",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}})();`,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-app-bg text-app-text overflow-x-hidden`}
      >
        <ThemeProvider>
          {children}
          <ToasterRegistry />
        </ThemeProvider>
      </body>
    </html>
  );
}


