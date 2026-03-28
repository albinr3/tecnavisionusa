# Sistema de Diseño TecnaVision

Este documento define las especificaciones visuales y de UI para el proyecto TecnaVision. Todas las nuevas páginas y componentes deben adherirse a estos lineamientos para asegurar consistencia.

## 🎨 Paleta de Colores

Los colores están configurados en `app/globals.css` como variables CSS y extendidos en la configuración de Tailwind v4.

### Colores Principales (Brand)

| Nombre | Variable Tailwind | Hex | Uso |
|--------|-------------------|-----|-----|
| Primary | `bg-primary` / `text-primary` | `#1301b2` | Botones principales, enlaces, iconos destacados, acentos |
| Primary Dark | `bg-primary-dark` | `#0e018a` | Estados hover, bordes oscuros |

### Superficies (Backgrounds)

| Nombre | Variable Tailwind | Hex | Uso |
|--------|-------------------|-----|-----|
| Background Light | `bg-background-light` | `#ffffff` | Fondo principal (Modo Claro) |
| Background Subtle | `bg-background-subtle` | `#f8f8fc` | Secciones alternas, fondos suaves |
| Background Dark | `bg-background-dark` | `#110f23` | Fondo principal (Modo Oscuro/Invertido) |
| Surface Light | `bg-surface-light` | `#f8f9fa` | Tarjetas, contenedores (Modo Claro) |
| Surface Dark | `bg-surface-dark` | `#1a1d24` | Tarjetas, contenedores (Modo Oscuro) |

### Texto

| Nombre | Variable Tailwind | Hex | Uso |
|--------|-------------------|-----|-----|
| Text Main | `text-text-main` | `#0e0c1d` | Títulos, texto principal |
| Text Secondary | `text-text-secondary` | `#4e45a1` | Subtítulos, descripciones |
| Text Main Light | `text-text-main-light` | `#111827` | Texto principal en fondos claros |
| Text Main Dark | `text-text-main-dark` | `#f9fafb` | Texto principal en fondos oscuros |
| Text Sec Light | `text-text-sec-light` | `#4b5563` | Texto secundario en fondos claros |
| Text Sec Dark | `text-text-sec-dark` | `#9ca3af` | Texto secundario en fondos oscuros |

---

## ✒️ Tipografía

**Fuente Principal**: `Inter` (Google Fonts)
- Variable CSS: `--font-sans`

### Pesos Comunes
- **Regular (400)**: Cuerpo de texto normal
- **Medium (500)**: Enlaces, items de menú, botones secundarios
- **Semibold (600)**: Subtítulos, botones importantes
- **Bold (700)**: Encabezados (H2, H3)
- **Extra Bold (800)**: Títulos principales (Hero H1)

---

## 🔮 Iconografía

El proyecto utiliza dos familias de íconos de Google Fonts. Ambas deben cargarse en el `<head>` del layout raíz.

1. **Material Symbols Outlined**
   - Clase: `material-symbols-outlined`
   - Uso: General UI, Landing Page
   - Ejemplo: `<span className="material-symbols-outlined">videocam</span>`

2. **Material Icons Outlined**
   - Clase: `material-icons-outlined`
   - Uso: Específico de páginas de producto (legacy support)
   - Ejemplo: `<span className="material-icons-outlined">search</span>`

---

## 🧩 Componentes y Formas

### Bordes (Radius)

La identidad visual utiliza bordes muy redondeados para transmitir modernidad y amigabilidad.

| Tamaño | Clase Tailwind | Valor | Uso |
|--------|----------------|-------|-----|
| Standard | `rounded-lg` | `0.5rem` | Icon wrappers pequeños |
| Large | `rounded-xl` | `1rem` | Botones, inputs, tarjetas simples |
| X-Large | `rounded-2xl` | `2rem` | Tarjetas de producto, contenedores destacados |
| 3X-Large | `rounded-3xl` | `2.5rem` | Secciones grandes, contenedores principales |
| Full | `rounded-full` | `9999px` | Badges, botones circulares, avatares |

### Sombras y Efectos

- **Glassmorphism**: Usado en headers y overlays
  - `bg-white/80 backdrop-blur-md`
- **Sombras Suaves**:
  - `shadow-sm`: Tarjetas base
  - `shadow-lg`: Estados hover o elementos flotantes
  - `shadow-primary/25`: Sombras coloreadas para botones primarios

---

## 📐 Patrones Comunes

### Botón Primario (Pill / Shop Style)
```tsx
<button className="h-10 rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/20">
  Ver Detalles
</button>
```

### Botón Primario (Standard)
```tsx
<button className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/20">
  Texto del Botón
</button>
```

### Botón Secundario / Outline
```tsx
<button className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-text-main transition-all hover:bg-gray-50">
  Texto del Botón
</button>
```

### Tarjeta (Card)
```tsx
<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
  {/* Contenido */}
</div>
```

### Badge / Chip
```tsx
<span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
  Texto Badge
</span>
```
