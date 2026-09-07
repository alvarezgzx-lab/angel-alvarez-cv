# Jesús Álvarez — CV Digital (ES/EN)

CV digital interactivo, bilingüe (español/inglés), de una sola página. Construido en
[Lovable](https://lovable.dev) sobre TanStack Start + React + Tailwind CSS, con
renderizado en servidor (SSR) vía Nitro.

**Live:** https://angel-alvarez-cv.vercel.app · **Repo:** https://github.com/alvarezgzx-lab/angel-alvarez-cv

Conectado a Vercel vía el proyecto `angel-alvarez-cv` (equipo "Jesús Ángel"): cada
push a `master` dispara un deploy automático.

## Historia

Este repo reemplazó una versión anterior (Vite + React SPA, sin SSR, sin toggle de
idioma) que vivía en el mismo dominio. La versión anterior se conserva en
[`angel-alvarez-cv-passport`](https://github.com/alvarezgzx-lab/angel-alvarez-cv-passport)
como referencia — es el mismo código que este repo, previo a la fusión.

## Correr localmente

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

Genera el sitio en `.vercel/output/` (formato Build Output API de Vercel — el preset
de Nitro está fijado a `"vercel"` en `vite.config.ts`; sin eso, cae por defecto al
preset de Cloudflare dentro del sandbox de Lovable).

`npx vite preview` **no** sirve para previsualizar este build localmente — asume el
layout de salida por defecto de TanStack Start (`dist/server/server.js`), no el
formato de Vercel que generamos aquí. Para previsualizar de verdad, usa
`vercel dev` o simplemente revisa el deploy de Vercel.

## Idioma (ES/EN)

Todo el contenido vive en `src/data/content.ts`, como dos objetos completos (`es` y
`en`) más un mapa `copyByLang`. El toggle (`src/lib/language.tsx`) guarda la
preferencia en `localStorage` y, al cambiar, actualiza `document.title`,
`<meta name="description">` y `document.documentElement.lang` en el cliente.

**Importante:** el `<head>` que ven los buscadores y los scrapers de redes sociales
(Facebook, LinkedIn, Twitter) es el que se renderiza en el servidor en
`src/routes/__root.tsx` — ese no cambia con el toggle, porque esos scrapers no
ejecutan JavaScript. Está fijado en español (el idioma por defecto del sitio) a
propósito. Si agregas contenido nuevo, actualízalo en ambos idiomas dentro de
`content.ts`, y si cambia el título/descripción principal del sitio, actualiza
también `__root.tsx` para que el `<head>` estático quede sincronizado.

## Estructura

```
src/
  data/content.ts          # única fuente de verdad: contenido ES y EN
  lib/language.tsx          # contexto + toggle de idioma
  routes/__root.tsx          # documento HTML raíz: <head> SEO/OG/JSON-LD (estático, en ES)
  routes/index.tsx            # única página real del sitio
  components/cv/              # Nav.tsx, Sections.tsx — todas las secciones del CV
  components/ui/                # componentes shadcn/ui (Radix + Tailwind)
public/
  CV-Jesus-Alvarez-ES.pdf     # CV descargable en español (botón "Ver CV en PDF")
  CV-Jesus-Alvarez-EN.pdf     # CV descargable en inglés (botón "View CV (PDF)")
  Constancia-Taller-IA.pdf    # constancia del taller de IA (Reconocimiento Institucional)
  images/angel-photo.webp     # foto de perfil
  og-image.png                 # imagen 1200×630 para redes sociales
  favicon.svg / favicon-32.png / apple-touch-icon.png
scripts/
  generate_cv_pdf.py           # regenera los dos PDF de arriba (reportlab) — sin teléfono
                                 ni correo; el contacto es siempre vía el botón de Contacto
                                 del sitio. No lee content.ts (es Python) — mantener el
                                 contenido de ambos en sync manualmente.
```

## Privacidad

El sitio solo publica correo electrónico y LinkedIn como medios de contacto. No
incluye teléfono ni datos de referencias personales o profesionales.
