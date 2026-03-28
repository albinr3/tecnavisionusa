# TecnaVision - Next.js Application

Aplicación web de TecnaVision convertida de HTML a Next.js, manteniendo el diseño exacto original.

## 🚀 Inicio Rápido

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 📁 Estructura del Proyecto

```
tecnovision-nextjs/
├── app/
│   ├── globals.css              # Tema personalizado con colores TecnaVision
│   ├── layout.tsx               # Layout raíz con fuentes de Google
│   ├── page.tsx                 # Landing page principal
│   └── products/
│       └── bullet-cam-pro-ai/   # Páginas de productos
│           └── page.tsx
```

## 🔧 Páginas Disponibles

- **Landing Page**: http://localhost:3000
- **Producto - Bullet Cam Pro AI**: http://localhost:3000/products/bullet-cam-pro-ai

## ⚠️ IMPORTANTE: Configuración de Fuentes de Íconos

### Problema Común y Solución

**PROBLEMA**: Los íconos de Material Icons/Symbols no se visualizan correctamente.

**CAUSA**: En Next.js, las fuentes de íconos de Google DEBEN cargarse mediante tags `<link>` en el `<head>` del HTML, NO mediante `@import` en CSS.

**SOLUCIÓN CORRECTA**: 

Las fuentes están configuradas en [`app/layout.tsx`](file:///c:/Users/Albin%20Rodriguez/Videos/Nueva%20carpeta/tecnovision-nextjs/app/layout.tsx) dentro del tag `<head>`:

```tsx
<head>
  {/* Fuente principal Inter */}
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
  
  {/* Material Symbols Outlined - para landing page */}
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  
  {/* Material Icons Outlined - para página de producto */}
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
    rel="stylesheet"
  />
</head>
```

### ❌ NO HACER:

```css
/* ❌ NO usar @import en globals.css */
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
```

### Por qué este problema ocurre:

1. Next.js usa Server-Side Rendering (SSR)
2. Los `@import` en CSS se cargan después de que el HTML inicial se renderiza
3. Los íconos requieren que la fuente esté disponible durante el render inicial
4. Los tags `<link>` en el `<head>` garantizan que las fuentes se carguen antes del render

### Diferencia entre Material Icons y Material Symbols:

- **Material Icons Outlined**: Fuente clásica, usa clase `material-icons-outlined`
- **Material Symbols Outlined**: Fuente nueva, usa clase `material-symbols-outlined`
- Este proyecto usa **AMBAS** porque las diferentes páginas fueron convertidas de diferentes HTMLs originales

### Si agregas nuevas páginas:

1. **NO** crees un `layout.tsx` anidado solo para metadata
2. Exporta la metadata directamente en el `page.tsx`:
   ```tsx
   export const metadata: Metadata = {
     title: "Tu Título",
     description: "Tu descripción",
   };
   ```
3. Las fuentes del layout raíz se heredarán automáticamente

## 🎨 Tema y Colores

**Consulte el documento completo: [Sistema de Diseño (DESIGN_SYSTEM.md)](DESIGN_SYSTEM.md)**

Los colores personalizados están definidos en `app/globals.css` usando Tailwind CSS v4 con sintaxis `@theme inline`:

- **Primary**: `#1301b2`
- **Primary Dark**: `#0e018a`
- **Surface Light**: `#f8f9fa`
- **Surface Dark**: `#1a1d24`

## 🛠️ Tecnologías

- **Next.js 16.1.6** (App Router)
- **React 19.2.3**
- **Tailwind CSS v4** (PostCSS)
- **TypeScript**
- **Google Fonts**: Inter, Material Symbols Outlined, Material Icons Outlined

## 📦 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar ESLint
```

## 🔍 Solución de Problemas

### Los íconos no aparecen

1. Verificar que las fuentes estén en `app/layout.tsx` dentro del `<head>`
2. Hacer hard refresh del navegador: `Ctrl+Shift+R` (Windows) o `Cmd+Shift+R` (Mac)
3. Abrir DevTools (F12) → Network → Verificar que los archivos de fuentes de Google se carguen (status 200)
4. Verificar la consola del navegador por errores

### Error "Cannot use `<head>` in layout"

- En layouts anidados, NO puedes agregar un tag `<head>` manualmente
- Solo el layout raíz (`app/layout.tsx`) puede tener `<head>`
- Para metadata en páginas anidadas, exportar `metadata` directamente

## 📝 Notas de Desarrollo

- El proyecto usa Tailwind CSS v4 (sintaxis moderna con `@theme inline`)
- Las fuentes se cargan en el `<head>` del layout raíz
- Todos los enlaces de navegación interna usan rutas relativas simples (`href="/ruta"`)
- Los links externos/placeholder usan `href="#"`

---

**Documentación creada**: Enero 2026  
**Framework**: Next.js 16.1.6
