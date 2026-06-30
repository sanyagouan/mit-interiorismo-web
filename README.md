# MIT Interiorismo — Web Profesional

Web oficial del estudio de interiorismo boutique **MIT Interiorismo**, Madrid.

## Stack

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | Astro 5.x | Zero JS default, Islands architecture, SSG nativo → Lighthouse 98-100 |
| Estilos | Tailwind CSS 3.4 | Utility-first + design tokens custom (paleta teal + earth tones) |
| Animaciones | GSAP + ScrollTrigger + Lenis | Estándar Awwwards 2025-2026, reemplaza a Locomotive |
| Tipografía | Instrument Serif Variable + Inter Variable | Combinación editorial award-winning, gratis Google Fonts |
| Hosting | Coolify + nginx + Traefik | Self-hosted en VPS, wildcard DNS `*.mitinteriorismo.studio` |
| SEO | @astrojs/sitemap + Schema.org | Native sitemap, structured data para `InteriorDesignService` |

## Estructura

```
mit-interiorismo-web/
├── public/                    # Assets estáticos (favicon, OG images)
├── src/
│   ├── components/            # Componentes Astro (.astro)
│   │   ├── Hero.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProcessStep.astro
│   │   ├── About.astro
│   │   ├── ContactForm.astro
│   │   └── Footer.astro
│   ├── content/               # Content collections (Markdown/MDX)
│   │   └── projects/          # Proyectos del portfolio
│   ├── data/                  # Datos estáticos (servicios, claims)
│   ├── islands/               # Componentes interactivos (GSAP, Lenis)
│   │   ├── HeroAnimation.tsx
│   │   └── SmoothScroll.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   # Layout principal con SEO + meta
│   ├── pages/
│   │   ├── index.astro        # Home
│   │   ├── proyectos/
│   │   │   ├── index.astro    # Galería completa
│   │   │   └── [slug].astro   # Página individual proyecto
│   │   ├── sobre.astro        # Sobre María
│   │   ├── proceso.astro      # El proceso de trabajo
│   │   ├── contacto.astro     # Contacto
│   │   └── 404.astro
│   └── styles/
│       └── globals.css        # Design tokens + reset + accesibilidad
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── Dockerfile                 # Para deploy en Coolify
```

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo local (http://localhost:4321)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Tests E2E con Playwright
npm test

# Lint + format
npm run lint
npm run format
```

## Convenciones

- **Componentes Astro** (`.astro`) para contenido estático + layouts
- **Islands** (`.tsx` con `client:visible` o `client:idle`) solo para componentes interactivos
- **Cero CSS-in-JS** — todo via Tailwind + design tokens
- **Tipografía**: Display serif para títulos, sans para cuerpo
- **Imágenes**: siempre `<picture>` con AVIF + WebP + fallback JPG, `loading="lazy"` salvo hero

## Performance Targets

- Lighthouse Performance: **95+** (desktop y mobile)
- LCP: **< 1.8s**
- CLS: **< 0.05**
- TBT: **< 100ms**
- Bundle JS inicial: **< 15KB gzipped**

## Accesibilidad

- `prefers-reduced-motion` desactiva animaciones de scroll
- Skip-to-content como primer elemento focusable
- Focus visible con outline teal
- Schema.org `InteriorDesignService` + `LocalBusiness` Madrid
- HTML semántico (`<header>`, `<main>`, `<article>`, `<nav>`, `<footer>`)

## Deploy

Ver `COOLIFY_DEPLOY.md` (próximamente) para instrucciones detalladas.

```bash
# Build de imagen Docker (Coolify lo hace automáticamente con webhook)
docker build -t mit-interiorismo-web .

# O servir el build estático directamente:
npm run build && nginx serve dist/
```

## Licencia

Código propietario de MIT Interiorismo. Todos los derechos reservados.