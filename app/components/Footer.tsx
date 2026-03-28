"use client";

import Link from "next/link";
import ThemeLogo from "./ThemeLogo";
import LoadingLink from "./LoadingLink";

export default function Footer() {
  return (
    <footer className="bg-app-surface pt-20 pb-10 border-t border-app-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-20 -mb-20 blur-3xl" />
          <h2 className="relative text-3xl font-bold text-white md:text-4xl">
            ¿Listo para proteger tu mundo?
          </h2>
          <p className="relative mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Únete a más de 100+ clientes que confían en TecnaVision para sus
            necesidades de seguridad. Comienza hoy con nuestra garantía de
            devolución de dinero de 30 días.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LoadingLink
              href="/products"
              pendingLabel="Abriendo catálogo..."
              className="flex h-12 w-full items-center justify-center min-w-[160px] rounded-xl bg-app-surface px-6 font-bold text-primary dark:text-white transition hover:bg-app-bg-subtle sm:w-auto disabled:opacity-90 disabled:cursor-wait"
            >
              Comenzar
            </LoadingLink>
            <Link
              href="/contacto"
              className="flex h-12 w-full items-center justify-center min-w-[160px] rounded-xl border border-white/30 bg-primary/20 px-6 font-bold text-white transition hover:bg-primary/30 sm:w-auto"
            >
              Contactar ventas
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4">
              <ThemeLogo className="h-10 w-auto" />
            </div>
            <p className="mb-6 max-w-xs text-sm text-app-text-sec">
              Seguridad inteligente para casas y negocios con cámaras
              confiables, monitoreo en tiempo real y control total desde tu
              celular.
            </p>
            <div className="flex gap-4">
              <a
                className="text-app-text-sec hover:text-primary transition-colors"
                href="https://www.facebook.com/Tecnavision"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                className="text-app-text-sec hover:text-primary transition-colors"
                href="https://www.instagram.com/tecnavision"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold text-app-text">Productos</h3>
            <ul className="flex flex-col gap-2 text-sm text-app-text-sec">
              <li>
                <LoadingLink href="/products" className="hover:text-primary">
                  Cámaras
                </LoadingLink>
              </li>
              <li>
                <LoadingLink href="/products" className="hover:text-primary">
                  NVR
                </LoadingLink>
              </li>
              <li>
                <LoadingLink href="/products" className="hover:text-primary">
                  Cerraduras inteligentes
                </LoadingLink>
              </li>
              <li>
                <LoadingLink href="/products" className="hover:text-primary">
                  Accesorios
                </LoadingLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold text-app-text">Empresa</h3>
            <ul className="flex flex-col gap-2 text-sm text-app-text-sec">
              <li>
                <a className="hover:text-primary" href="/sobre-nosotros">
                  Sobre nosotros
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold text-app-text">Soporte</h3>
            <ul className="flex flex-col gap-2 text-sm text-app-text-sec">
              <li>
                <a className="hover:text-primary" href="#">
                  Centro de ayuda
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="/contacto">
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-app-border pt-8 text-sm text-app-text-sec md:flex-row md:gap-0">
          <p className="text-center md:text-left">© {new Date().getFullYear()} TecnaVision Inc. Todos los derechos reservados.</p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-4 md:mt-0 md:justify-end md:gap-6">
            <a className="hover:text-app-text" href="/privacidad">
              Política de privacidad
            </a>
            <a className="hover:text-app-text" href="/terminos">
              Términos del servicio
            </a>
            <a className="hover:text-app-text" href="/cookies">
              Cookies
            </a>
            <a className="hover:text-app-text" href="/sitemap.xml">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
