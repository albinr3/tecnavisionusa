import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingLink from "./components/LoadingLink";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "TecnaVision - Seguridad inteligente para hogar y negocio",
  description:
    "Cámaras IP, NVR y soluciones de vigilancia profesional con monitoreo en tiempo real, AI y soporte local en República Dominicana.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TecnaVision - Seguridad inteligente para hogar y negocio",
    description:
      "Cámaras IP, NVR y soluciones de vigilancia profesional con monitoreo en tiempo real, AI y soporte local en República Dominicana.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/cameraHome.webp",
        width: 1200,
        height: 630,
        alt: "TecnaVision seguridad inteligente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TecnaVision - Seguridad inteligente para hogar y negocio",
    description:
      "Cámaras IP, NVR y soluciones de vigilancia profesional con monitoreo en tiempo real, AI y soporte local en República Dominicana.",
    images: ["/cameraHome.webp"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TecnaVision",
  url: siteUrl,
  logo: `${siteUrl}/web-app-manifest-512x512.png`,
  email: "Tecnavision1@gmail.com",
  telephone: "+1-829-796-0509",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TecnaVision",
  url: siteUrl,
  inLanguage: "es-DO",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/products?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué tipo de soluciones ofrece TecnaVision?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TecnaVision ofrece cámaras IP, grabadores NVR y switches PoE para hogares y negocios.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde puedo comprar los productos TecnaVision?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A través de distribuidores e instaladores autorizados en República Dominicana.",
      },
    },
    {
      "@type": "Question",
      name: "¿Las cámaras funcionan sin internet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Graban en el NVR sin internet. La conexión se requiere para acceso remoto.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo ver las cámaras desde mi celular?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Puedes ver video en tiempo real y revisar grabaciones desde apps seguras.",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="bg-app-bg text-app-text antialiased selection:bg-primary selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Top Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-[35px] lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="max-w-2xl order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary mb-6 border border-blue-100">
                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                Nueva generación de camaras
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-app-text sm:text-5xl lg:text-6xl mb-6">
                Seguridad inteligente para tu hogar y negocio
              </h1>
              <p className="text-lg leading-relaxed text-app-text-sec mb-8 max-w-lg">
                Protege lo que más importa con nuestras cámaras de seguridad inteligentes de última generación. Monitoreo en tiempo real, detección avanzada y acceso inmediato desde tu celular.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <LoadingLink
                  href="/products"
                  pendingLabel="Abriendo catálogo..."
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-blue-900/20 disabled:cursor-wait disabled:opacity-90"
                >
                  Ver productos
                </LoadingLink>
                <Link href="/donde-comprar" className="h-12 rounded-xl bg-app-surface border border-app-border px-8 text-base font-bold text-app-text dark:text-white transition-all hover:bg-app-bg-subtle flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-primary dark:text-white text-on-dark-surface">storefront</span>
                  Ver distribuidores
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-medium text-app-text-sec">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full border-2 border-app-surface bg-app-border bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150')" }}></div>
                  <div className="size-8 rounded-full border-2 border-app-surface bg-app-border bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150')" }}></div>
                  <div className="size-8 rounded-full border-2 border-app-surface bg-app-border bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150')" }}></div>
                </div>
                <p>Con la confianza de más de 100+ clientes</p>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 lg:h-auto">
              {/* Abstract Background Blob */}
              <div className="absolute -right-20 -top-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-70 blur-3xl"></div>
              <div className="relative rounded-2xl bg-app-surface p-4 shadow-2xl ring-1 ring-app-border aspect-[4/3] flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <Image
                    alt="Monitoreo de seguridad en tiempo real"
                    className="object-cover"
                    fetchPriority="high"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src="/cameraHome.webp"
                  />
                </div>
                {/* Floating UI Element Mockup */}
                <div className="absolute -bottom-6 -left-6 hidden w-52 min-w-0 rounded-xl bg-app-surface p-3 shadow-xl ring-1 ring-app-border animate-bounce sm:block" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-app-text shrink-0">Patio Trasero</span>
                    <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                  </div>
                  <div className="relative h-24 w-full overflow-hidden rounded-lg bg-app-bg-subtle">
                    <Image
                      alt="Vista exterior"
                      className="object-cover"
                      fetchPriority="low"
                      fill
                      loading="lazy"
                      sizes="208px"
                      src="/outview.webp"
                    />
                    <div className="absolute bottom-1 right-2 text-[10px] font-medium text-white drop-shadow-md">
                      08/02/2026 14:30:22
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <div className="h-1.5 w-1/2 rounded-full bg-app-border"></div>
                    <div className="h-1.5 w-1/3 rounded-full bg-primary/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Why Choose Us */}
      < section className="bg-app-bg-subtle py-20" >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-app-text sm:text-4xl">Por qué elegir TecnaVision</h2>
              <p className="mt-4 text-app-text-sec">Funciones de seguridad de nivel empresarial diseñadas para el uso diario.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">motion_sensor_active</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">Detección inteligente de movimiento</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">Algoritmos avanzados diferencian entre hojas moviéndose y verdaderos intrusos, reduciendo las falsas alarmas.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">cloud_upload</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">Grabación en la nube 24/7</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">El almacenamiento externo seguro y cifrado garantiza que tus grabaciones estén a salvo incluso si la cámara se daña.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">night_sight_max</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">Visión nocturna a color</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">Ve con claridad en la oscuridad total con nuestra avanzada tecnología de sensor starlight.</p>
                </div>
              </div>
              {/* Feature 4 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">graphic_eq</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">Audio bidireccional</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">Escucha lo que sucede y responde a través de la cámara con cancelación de ruido.</p>
                </div>
              </div>
              {/* Feature 5 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">encrypted</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">Cifrado de privacidad</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">El cifrado de extremo a extremo de grado militar mantiene privados tus momentos personales.</p>
                </div>
              </div>
              {/* Feature 6 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">smart_toy</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">Reconocimiento con AI</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">Distingue al instante entre personas, mascotas, vehículos y paquetes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Products Section */}
      < section className="py-20" >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-app-text">Productos destacados</h2>
                <p className="mt-2 text-app-text-sec">Hardware de nivel profesional para cada escenario.</p>
              </div>
              {/* Chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-white shadow-md">
                  Todos
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-app-border px-5 text-sm font-medium text-app-text hover:bg-app-border">
                  Hogar
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-app-border px-5 text-sm font-medium text-app-text hover:bg-app-border">
                  Negocio
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-app-border px-5 text-sm font-medium text-app-text hover:bg-app-border">
                  Interior
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-app-border px-5 text-sm font-medium text-app-text hover:bg-app-border">
                  Exterior
                </button>
              </div>
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              {/* Product 1 */}
              <div className="group relative flex flex-col rounded-2xl border border-app-border bg-app-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-app-bg-subtle">
                  <div className="absolute right-3 top-3 z-10 rounded-md bg-app-surface/90 px-2 py-1 text-xs font-bold text-primary dark:text-white backdrop-blur-sm">3K HD</div>
                  <div className="h-full w-full bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/turrethome.webp')" }}></div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-app-text-sec">CAMARAS IP</div>
                  <h3 className="text-xl font-bold text-app-text">Camara Active Deterrence Turret</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-app-text-sec">Seguridad que se ve y se escucha. Combina imagen ultra nítida con luces y alertas disuasorias para proteger tu espacio en todo momento.</p>
                  <div className="mt-auto flex items-center justify-end pt-6">
                    <button className="flex size-10 items-center justify-center rounded-full bg-app-border text-primary dark:text-white font-semibold transition-colors hover:bg-primary hover:text-white">
                      <span className="material-symbols-outlined text-on-dark-surface">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product 2 */}
              <Link href="/products/bullet-cam-pro-ai" className="group relative flex flex-col rounded-2xl border border-app-border bg-app-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-app-bg-subtle">
                  <div className="absolute right-3 top-3 z-10 rounded-md bg-app-surface/90 px-2 py-1 text-xs font-bold text-primary dark:text-white backdrop-blur-sm">WEATHERPROOF</div>
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/bullethome.webp')" }}></div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-app-text-sec">CAMARAS IP</div>
                  <h3 className="text-xl font-bold text-app-text">Camara Bullet</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-app-text-sec">Vigilancia de última generación con AI avanzada, visión nocturna EXIR y protección IP67.</p>
                  <div className="mt-auto flex items-center justify-end pt-6">
                    <button className="flex size-10 items-center justify-center rounded-full bg-app-border text-primary dark:text-white font-semibold transition-colors hover:bg-primary hover:text-white">
                      <span className="material-symbols-outlined text-on-dark-surface">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </Link>
              {/* Product 3 */}
              <div className="group relative flex flex-col rounded-2xl border border-app-border bg-app-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-app-bg-subtle">
                  <div className="absolute right-3 top-3 z-10 rounded-md bg-app-surface/90 px-2 py-1 text-xs font-bold text-primary dark:text-white backdrop-blur-sm">HDMI</div>
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/nvrhome.webp')" }}></div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-app-text-sec">GRABADORES</div>
                  <h3 className="text-xl font-bold text-app-text">NVR Pro</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-app-text-sec">Destaca por su alto rendimiento, grabación estable y gestión inteligente de cámaras, asegurando que cada detalle quede protegido sin interrupciones.</p>
                  <div className="mt-auto flex items-center justify-end pt-6">
                    <button className="flex size-10 items-center justify-center rounded-full bg-app-border text-primary dark:text-white font-semibold transition-colors hover:bg-primary hover:text-white">
                      <span className="material-symbols-outlined text-on-dark-surface">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Solutions Section */}
      < section className="bg-app-bg-subtle py-20" >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-app-text">Soluciones a medida</h2>
            <p className="mt-2 text-app-text-sec">Seguridad integral diseñada para tus necesidades específicas.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Solution 1: Hogar */}
            <div className="relative overflow-hidden rounded-3xl bg-app-surface shadow-lg transition-transform hover:scale-[1.01]">
              <div className="grid h-full lg:grid-cols-2">
                <div className="order-2 flex flex-col justify-center p-8 lg:order-1">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-blue-100 text-primary">
                    <span className="material-symbols-outlined">home</span>
                  </div>
                  <h3 className="text-2xl font-bold text-app-text">Seguridad para el hogar</h3>
                  <p className="mt-4 text-sm leading-relaxed text-app-text-sec">Protege lo que más importa con cámaras discretas, cerraduras inteligentes y sensores que se integran con tu decoración, mientras brindan protección de grado militar.</p>
                  <LoadingLink
                    className="mt-6 inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10 hover:no-underline dark:border dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                    href="/products"
                    pendingLabel="Abriendo catálogo..."
                  >
                    Explora nuestros productos <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </LoadingLink>
                </div>
                <div className="order-1 h-64 w-full bg-cover bg-center lg:order-2 lg:h-auto" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByTf9LYbkROr_ZScXqQP1EBVH10c_4n2U43qi1LIZIIMX590KEetED9S8ZghVd5YCxPhv7RtPn99DOBdAIbBcb5HrKpfGgnImTBjEyQEc_4hLReSaX_TzgfbUdAVcmm9T2EOFx5rOXTYT-KGPmCvyIFe_RlHFNeQX_FluhR4hdKSMIRa5hzbT4zkByRXcgc_bKf-ZI785zUuzo82Y_BoMQ3gqQuib_xSAXwY306V6Pb9EaSaal0oFKTutxW89_Zeljt3SuM8-dakud')" }}></div>
              </div>
            </div>
            {/* Solution 2: Negocio */}
            <div className="relative overflow-hidden rounded-3xl bg-app-surface shadow-lg transition-transform hover:scale-[1.01]">
              <div className="grid h-full lg:grid-cols-2">
                <div className="order-2 flex flex-col justify-center p-8 lg:order-1">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-blue-100 text-primary">
                    <span className="material-symbols-outlined">business</span>
                  </div>
                  <h3 className="text-2xl font-bold text-app-text">Vigilancia para negocios</h3>
                  <p className="mt-4 text-sm leading-relaxed text-app-text-sec">Escala tu seguridad desde un solo local hasta una empresa con múltiples sedes.</p>
                  <LoadingLink
                    className="mt-6 inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10 hover:no-underline dark:border dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                    href="/products"
                    pendingLabel="Abriendo catálogo..."
                  >
                    Explora nuestros productos <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </LoadingLink>
                </div>
                <div className="order-1 h-64 w-full bg-cover bg-center lg:order-2 lg:h-auto" style={{ backgroundImage: "url('/business-hero.jpg')" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* How It Works */}
      {/* Professional Value Proposition */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-app-text">Calidad y Respaldo Profesional</h2>
            <p className="mt-2 text-app-text-sec">Soluciones robustas de videovigilancia, diseñadas para durar. La opción favorita de instaladores y personas exigentes para proteger sus hogares y negocios.</p>
          </div>
          <div className="relative grid gap-12 md:grid-cols-3">
            {/* Connecting Line (Desktop) */}
            <div className="absolute left-0 top-12 hidden h-0.5 w-full -translate-y-1/2 border-t-2 border-dashed border-app-border md:block lg:w-[80%] lg:left-[10%]"></div>
            {/* Value 1 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-app-surface border-4 border-app-border text-primary dark:text-white shadow-lg z-10">
                <span className="material-symbols-outlined text-4xl text-on-dark-surface">devices</span>
              </div>
              <h3 className="text-xl font-bold text-app-text">Hardware Premium</h3>
              <p className="mt-2 max-w-xs text-sm text-app-text-sec">Cámaras IP y NVRs con componentes de grado industrial, diseñados para operar 24/7 sin interrupciones.</p>
            </div>
            {/* Value 2 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-app-surface border-4 border-app-border text-primary dark:text-white shadow-lg z-10">
                <span className="material-symbols-outlined text-4xl text-on-dark-surface">storefront</span>
              </div>
              <h3 className="text-xl font-bold text-app-text">Disponible en Distribuidores</h3>
              <p className="mt-2 max-w-xs text-sm text-app-text-sec">Encuentra nuestros productos en las principales tiendas de tecnología y mayoristas de seguridad del país.</p>
            </div>
            {/* Value 3 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-app-surface border-4 border-app-border text-primary dark:text-white shadow-lg z-10">
                <span className="material-symbols-outlined text-4xl text-on-dark-surface">shield_with_heart</span>
              </div>
              <h3 className="text-xl font-bold text-app-text">Soporte de Fábrica</h3>
              <p className="mt-2 max-w-xs text-sm text-app-text-sec">Respaldo técnico directo, actualizaciones de firmware constantes y garantía local asegurada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & FAQ */}
      <section className="bg-app-bg-subtle py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Testimonials */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-app-text">Con la confianza de miles</h2>
              <div className="grid gap-6">
                <div className="rounded-xl bg-app-surface p-6 shadow-sm border border-app-border">
                  <div className="flex gap-1 text-yellow-400 mb-3">
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                  </div>
                  <p className="text-app-text italic">&quot;Ha sido de las mejores compras para mi casa. La detección inteligente funciona de verdad y no me vive mandando alertas por cualquier cosa.&quot;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-app-border bg-cover bg-center" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/women/63.jpg')" }}></div>
                    <div>
                      <p className="text-sm font-bold text-app-text">Yudelka Pérez</p>
                      <p className="text-xs text-app-text-sec">Dueña de negocio</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-app-surface p-6 shadow-sm border border-app-border">
                  <div className="flex gap-1 text-yellow-400 mb-3">
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                  </div>
                  <p className="text-app-text italic">&quot;La imagen se ve nítida durísimo, hasta de noche. Yo reviso mi colmado desde el celular y todo corre rápido, sin lío.&quot;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-app-border bg-cover bg-center" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/men/52.jpg')" }}></div>
                    <div>
                      <p className="text-sm font-bold text-app-text">Rafael de la Cruz</p>
                      <p className="text-xs text-app-text-sec">Propietario</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-app-text">Preguntas frecuentes</h2>
              <div className="flex flex-col gap-4">
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>¿Qué tipo de soluciones ofrece TecnaVision?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    TecnaVision ofrece soluciones profesionales de videovigilancia IP, incluyendo cámaras IP, grabadores NVR y switches PoE, diseñadas para hogares, comercios, oficinas y empresas que requieren seguridad confiable y de alto rendimiento.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>¿Dónde puedo comprar los productos TecnaVision?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    TecnaVision comercializa sus productos a través de instaladores y distribuidores autorizados a nivel nacional en República Dominicana. Para conocer el distribuidor más cercano, visita nuestra sección &quot;Donde comprar&quot; o contáctanos a través de la página de contacto y con gusto te orientaremos.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>¿TecnaVision instala los equipos?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    No. TecnaVision se dedica exclusivamente a la fabricación y venta de equipos de videovigilancia. La instalación debe ser realizada por instaladores profesionales, lo que garantiza una correcta configuración y desempeño del sistema.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>¿Los equipos son compatibles con otras marcas?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    Sí. Nuestros equipos cumplen con estándares abiertos como ONVIF, permitiendo integrarse con otros dispositivos y sistemas compatibles del mercado.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>¿Qué necesito para instalar un sistema de cámaras IP?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <div className="mt-3 text-sm text-app-text-sec">
                    <p>Un sistema típico puede incluir:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      <li>Cámaras IP</li>
                      <li>Grabador NVR</li>
                      <li>Switch PoE</li>
                      <li>Cableado de red (UTP)</li>
                      <li>Disco duro para grabación</li>
                    </ul>
                    <p className="mt-2 text-xs opacity-75">Un instalador puede ayudarte a definir la solución ideal según tu necesidad.</p>
                  </div>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>¿Las cámaras funcionan sin internet?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    Sí. Las cámaras graban directamente en el NVR, incluso sin conexión a internet. El internet solo es necesario para el acceso remoto desde celular o computadora.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>¿Puedo ver las cámaras desde mi celular?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    Sí. Los sistemas permiten visualización remota en tiempo real desde dispositivos móviles y computadoras mediante aplicaciones seguras.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>¿Qué ventajas tiene un sistema IP con NVR frente a cámaras WiFi?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <div className="mt-3 text-sm text-app-text-sec">
                    <p>Los sistemas IP con NVR ofrecen:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      <li>Grabación continua 24/7</li>
                      <li>Mayor estabilidad</li>
                      <li>Mejor calidad de imagen</li>
                      <li>Mayor seguridad de la información</li>
                    </ul>
                    <p className="mt-2">Ideal para hogares y negocios que requieren confiabilidad.</p>
                  </div>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>¿Los equipos soportan tecnología PoE?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    Sí. Nuestras cámaras IP y switches están diseñados bajo el estándar PoE (Power over Ethernet), permitiendo transmitir energía y datos por un solo cable, logrando instalaciones más limpias y profesionales.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>¿Los productos cuentan con garantía?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    Sí. Todos los productos TecnaVision cuentan con garantía oficial de 3 años, respaldada por nuestros distribuidores autorizados en República Dominicana.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
