import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingLink from "./components/LoadingLink";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "TecnaVision - Smart security for home and business",
  description:
    "IP cameras, NVR, and professional surveillance solutions with real-time monitoring, AI, and local support across the United States.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TecnaVision - Smart security for home and business",
    description:
      "IP cameras, NVR, and professional surveillance solutions with real-time monitoring, AI, and local support across the United States.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/cameraHome.webp",
        width: 1200,
        height: 630,
        alt: "TecnaVision smart security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TecnaVision - Smart security for home and business",
    description:
      "IP cameras, NVR, and professional surveillance solutions with real-time monitoring, AI, and local support across the United States.",
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
  telephone: "9083386650",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TecnaVision",
  url: siteUrl,
  inLanguage: "en-US",
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
      name: "What kind of solutions does TecnaVision offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TecnaVision offers IP cameras, NVR recorders, and PoE switches for homes and businesses.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I buy TecnaVision products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Through authorized installers and distributors across the United States. To find the nearest partner, visit our \"Where to buy\" section or contact us and we will gladly guide you.",
      },
    },
    {
      "@type": "Question",
      name: "Do the cameras work without internet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The cameras record directly to the NVR, even without an internet connection. The internet is only needed for remote access from a mobile phone or computer.",
      },
    },
    {
      "@type": "Question",
      name: "Can I view the cameras from my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The systems allow real-time remote viewing from mobile devices and computers through secure applications.",
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
                New generation of cameras
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-app-text sm:text-5xl lg:text-6xl mb-6">
                Smart security for your home and business
              </h1>
              <p className="text-lg leading-relaxed text-app-text-sec mb-8 max-w-lg">
                Protect what matters most with our next-generation smart security cameras. Real-time monitoring, advanced detection, and instant access from your phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <LoadingLink
                  href="/products"
                  pendingLabel="Opening catalog..."
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-blue-900/20 disabled:cursor-wait disabled:opacity-90"
                >
                  View products
                </LoadingLink>
                <Link href="/where-to-buy" className="h-12 rounded-xl bg-app-surface border border-app-border px-8 text-base font-bold text-app-text dark:text-white transition-all hover:bg-app-bg-subtle flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-primary dark:text-white text-on-dark-surface">storefront</span>
                  View distributors
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-medium text-app-text-sec">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full border-2 border-app-surface bg-app-border bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150')" }}></div>
                  <div className="size-8 rounded-full border-2 border-app-surface bg-app-border bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150')" }}></div>
                  <div className="size-8 rounded-full border-2 border-app-surface bg-app-border bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150')" }}></div>
                </div>
                <p>Trusted by over 100+ clients</p>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 lg:h-auto">
              {/* Abstract Background Blob */}
              <div className="absolute -right-20 -top-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-70 blur-3xl"></div>
              <div className="relative rounded-2xl bg-app-surface p-4 shadow-2xl ring-1 ring-app-border aspect-[4/3] flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <Image
                    alt="Real-time security monitoring"
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
                    <span className="text-xs font-bold text-app-text shrink-0">Backyard</span>
                    <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                  </div>
                  <div className="relative h-24 w-full overflow-hidden rounded-lg bg-app-bg-subtle">
                    <Image
                      alt="Exterior view"
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
              <h2 className="text-3xl font-bold tracking-tight text-app-text sm:text-4xl">Why choose TecnaVision</h2>
              <p className="mt-4 text-app-text-sec">Enterprise-grade security features designed for everyday use.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">motion_sensor_active</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">Smart Motion Detection</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">Advanced algorithms differentiate between moving leaves and actual intruders, reducing false alarms.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">cloud_upload</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">24/7 Cloud Recording</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">Secure and encrypted offsite storage ensures your footage is safe even if the camera is damaged.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">night_sight_max</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">Color Night Vision</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">See clearly in total darkness with our advanced starlight sensor technology.</p>
                </div>
              </div>
              {/* Feature 4 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">graphic_eq</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">Two-Way Audio</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">Listen to what is happening and respond through the camera with noise cancellation.</p>
                </div>
              </div>
              {/* Feature 5 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">encrypted</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">Privacy Encryption</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">Military-grade end-to-end encryption keeps your personal moments private.</p>
                </div>
              </div>
              {/* Feature 6 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-app-border bg-app-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">smart_toy</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-app-text">AI Recognition</h3>
                  <p className="mt-2 text-sm leading-relaxed text-app-text-sec">Instantly distinguish between people, pets, vehicles, and packages.</p>
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
                <h2 className="text-3xl font-bold tracking-tight text-app-text">Featured Products</h2>
                <p className="mt-2 text-app-text-sec">Professional-grade hardware for every scenario.</p>
              </div>
              {/* Chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-white shadow-md">
                  All
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-app-border px-5 text-sm font-medium text-app-text hover:bg-app-border">
                  Home
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-app-border px-5 text-sm font-medium text-app-text hover:bg-app-border">
                  Business
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-app-border px-5 text-sm font-medium text-app-text hover:bg-app-border">
                  Indoor
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-app-border px-5 text-sm font-medium text-app-text hover:bg-app-border">
                  Outdoor
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
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-app-text-sec">IP CAMERAS</div>
                  <h3 className="text-xl font-bold text-app-text">Active Deterrence Turret Camera</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-app-text-sec">Security you can see and hear. Combines ultra-clear imaging with lights and deterrent alerts to protect your space at all times.</p>
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
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-app-text-sec">IP CAMERAS</div>
                  <h3 className="text-xl font-bold text-app-text">Bullet Camera</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-app-text-sec">Next-generation surveillance with advanced AI, EXIR night vision, and IP67 protection.</p>
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
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-app-text-sec">RECORDERS</div>
                  <h3 className="text-xl font-bold text-app-text">NVR Pro</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-app-text-sec">Stands out for its high performance, stable recording, and smart camera management, ensuring every detail is protected without interruption.</p>
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
            <h2 className="text-3xl font-bold tracking-tight text-app-text">Tailored Solutions</h2>
            <p className="mt-2 text-app-text-sec">Comprehensive security designed for your specific needs.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Solution 1: Hogar */}
            <div className="relative overflow-hidden rounded-3xl bg-app-surface shadow-lg transition-transform hover:scale-[1.01]">
              <div className="grid h-full lg:grid-cols-2">
                <div className="order-2 flex flex-col justify-center p-8 lg:order-1">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-blue-100 text-primary">
                    <span className="material-symbols-outlined">home</span>
                  </div>
                  <h3 className="text-2xl font-bold text-app-text">Home Security</h3>
                  <p className="mt-4 text-sm leading-relaxed text-app-text-sec">Protect what matters most with discreet cameras, smart locks, and sensors that blend with your decor while providing military-grade protection.</p>
                  <LoadingLink
                    className="mt-6 inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10 hover:no-underline dark:border dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                    href="/products"
                    pendingLabel="Opening catalog..."
                  >
                    Explore our products <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
                  <h3 className="text-2xl font-bold text-app-text">Business Surveillance</h3>
                  <p className="mt-4 text-sm leading-relaxed text-app-text-sec">Scale your security from a single location to a multi-site enterprise.</p>
                  <LoadingLink
                    className="mt-6 inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10 hover:no-underline dark:border dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                    href="/products"
                    pendingLabel="Opening catalog..."
                  >
                    Explore our products <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
            <h2 className="text-3xl font-bold tracking-tight text-app-text">Professional Quality and Support</h2>
            <p className="mt-2 text-app-text-sec">Robust video surveillance solutions, built to last. The preferred choice of installers and demanding individuals for protecting their homes and businesses.</p>
          </div>
          <div className="relative grid gap-12 md:grid-cols-3">
            {/* Connecting Line (Desktop) */}
            <div className="absolute left-0 top-12 hidden h-0.5 w-full -translate-y-1/2 border-t-2 border-dashed border-app-border md:block lg:w-[80%] lg:left-[10%]"></div>
            {/* Value 1 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-app-surface border-4 border-app-border text-primary dark:text-white shadow-lg z-10">
                <span className="material-symbols-outlined text-4xl text-on-dark-surface">devices</span>
              </div>
              <h3 className="text-xl font-bold text-app-text">Premium Hardware</h3>
              <p className="mt-2 max-w-xs text-sm text-app-text-sec">IP cameras and NVRs with industrial-grade components, designed to operate 24/7 without interruption.</p>
            </div>
            {/* Value 2 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-app-surface border-4 border-app-border text-primary dark:text-white shadow-lg z-10">
                <span className="material-symbols-outlined text-4xl text-on-dark-surface">storefront</span>
              </div>
              <h3 className="text-xl font-bold text-app-text">Available at Distributors</h3>
              <p className="mt-2 max-w-xs text-sm text-app-text-sec">Find our products at major technology stores and security wholesalers nationwide.</p>
            </div>
            {/* Value 3 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-app-surface border-4 border-app-border text-primary dark:text-white shadow-lg z-10">
                <span className="material-symbols-outlined text-4xl text-on-dark-surface">shield_with_heart</span>
              </div>
              <h3 className="text-xl font-bold text-app-text">Factory Support</h3>
              <p className="mt-2 max-w-xs text-sm text-app-text-sec">Direct technical support, constant firmware updates, and guaranteed local warranty.</p>
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
              <h2 className="mb-8 text-2xl font-bold text-app-text">Trusted by thousands</h2>
              <div className="grid gap-6">
                <div className="rounded-xl bg-app-surface p-6 shadow-sm border border-app-border">
                  <div className="flex gap-1 text-yellow-400 mb-3">
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                  </div>
                  <p className="text-app-text italic">&quot;It has been one of the best purchases for my house. The smart detection really works and doesn't keep sending me alerts for just anything.&quot;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-app-border bg-cover bg-center" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/women/63.jpg')" }}></div>
                    <div>
                      <p className="text-sm font-bold text-app-text">Yudelka Pérez</p>
                      <p className="text-xs text-app-text-sec">Business Owner</p>
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
                  <p className="text-app-text italic">&quot;The image looks super crisp, even at night. I check my store from my phone and everything runs fast, no hassle.&quot;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-app-border bg-cover bg-center" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/men/52.jpg')" }}></div>
                    <div>
                      <p className="text-sm font-bold text-app-text">Rafael de la Cruz</p>
                      <p className="text-xs text-app-text-sec">Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-app-text">Frequently Asked Questions</h2>
              <div className="flex flex-col gap-4">
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>What kind of solutions does TecnaVision offer?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    TecnaVision offers professional IP video surveillance solutions, including IP cameras, NVRs, and PoE switches, designed for homes, shops, offices, and businesses requiring reliable, high-performance security.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>Where can I buy TecnaVision products?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    TecnaVision sells its products through authorized installers and distributors across the United States. To find the nearest partner, visit our &quot;Where to buy&quot; section or contact us and we will gladly guide you.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>Does TecnaVision install the equipment?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    No. TecnaVision is exclusively dedicated to the manufacture and sale of video surveillance equipment. Installation should be performed by professional installers, ensuring correct system configuration and performance.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>Is the equipment compatible with other brands?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    Yes. Our equipment complies with open standards like ONVIF, allowing integration with other compatible devices and systems on the market.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>What do I need to install an IP camera system?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <div className="mt-3 text-sm text-app-text-sec">
                    <p>A typical system may include:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      <li>IP Cameras</li>
                      <li>NVR Recorder</li>
                      <li>PoE Switch</li>
                      <li>Network cabling (UTP)</li>
                      <li>Hard drive for recording</li>
                    </ul>
                    <p className="mt-2 text-xs opacity-75">An installer can help you define the ideal solution according to your needs.</p>
                  </div>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>Do the cameras work without internet?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    Yes. The cameras record directly to the NVR, even without an internet connection. The internet is only needed for remote access from a mobile phone or computer.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>Can I view the cameras from my phone?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    Yes. The systems allow real-time remote viewing from mobile devices and computers through secure applications.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>What are the advantages of an IP system with an NVR over WiFi cameras?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <div className="mt-3 text-sm text-app-text-sec">
                    <p>IP systems with an NVR offer:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      <li>Continuous 24/7 recording</li>
                      <li>Greater stability</li>
                      <li>Better image quality</li>
                      <li>Greater information security</li>
                    </ul>
                    <p className="mt-2">Ideal for homes and businesses requiring reliability.</p>
                  </div>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>Does the equipment support PoE technology?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    Yes. Our IP cameras and switches are designed under the PoE (Power over Ethernet) standard, allowing transmission of power and data through a single cable, achieving cleaner and more professional installations.
                  </p>
                </details>
                <details className="group rounded-xl bg-app-surface p-4 shadow-sm border border-app-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-app-text">
                    <span>Do the products come with a warranty?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-app-text-sec">
                    Yes. All TecnaVision products come with an official 3-year warranty, backed by our authorized distributors in the United States.
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

