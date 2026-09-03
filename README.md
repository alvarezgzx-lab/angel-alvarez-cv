# Ángel Álvarez — CV Digital

CV digital interactivo de una sola página, construido en React + TypeScript + Vite + Tailwind CSS. Sitio 100% estático, sin backend.

**Live:** https://angel-alvarez-cv.vercel.app · **Repo:** https://github.com/alvarezgzx-lab/angel-alvarez-cv

Conectado a Vercel vía el proyecto `angel-alvarez-cv` (equipo "Jesús Ángel"): cada push a `master` dispara un deploy automático.

## Correr localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview
```

`npm run build` compila TypeScript y genera el sitio estático en `dist/`.

## Estructura

```
index.html               # SEO: meta tags, Open Graph, Twitter Card, JSON-LD, favicon
public/
  Angel-Alvarez-CV.pdf    # CV descargable (botón "Ver CV en PDF"), sin teléfono
  og-image.png             # imagen 1200×630 para redes sociales
  favicon.svg / favicon-32.png / apple-touch-icon.png
  images/angel-photo.webp  # foto de perfil (Hero + avatar del nav)
src/
  data/content.ts         # única fuente de verdad del contenido (espeja el JSON del brief)
  components/              # una sección = un componente
    RevealCard.tsx          # tarjeta cubierta por un bloque de color que se desliza al hacer scroll
  App.tsx                  # ensambla las secciones
scripts/
  generate-og-image.mjs    # regenera public/og-image.png (usa sharp)
  generate-favicons.mjs    # regenera los favicons (usa sharp)
  generate-photo.mjs       # optimiza public/images/angel-photo.webp desde un source (usa sharp)
  generate_cv_pdf.py       # regenera public/Angel-Alvarez-CV.pdf (usa reportlab, sin teléfono)
```

Para editar el contenido del CV, modifica únicamente [`src/data/content.ts`](src/data/content.ts) — todos los componentes leen de ahí.

Si cambias el diseño de la imagen social o el favicon, edita el SVG dentro de `scripts/generate-og-image.mjs` o `scripts/generate-favicons.mjs` y vuelve a correr:

```bash
node scripts/generate-og-image.mjs
node scripts/generate-favicons.mjs
```

Para reemplazar la foto de perfil: coloca el nuevo archivo en `public/images/_angel-photo-source.jpg`, ajusta la ruta en `scripts/generate-photo.mjs` si hace falta, y corre `node scripts/generate-photo.mjs` (recorta a 480×480 y la convierte a WebP; borra el archivo fuente al terminar).

## Sistema de color

El fondo de página es `navy` en todas las secciones (definido en `src/App.tsx` y `body` en `src/index.css`); las tarjetas de contenido (Formación, Proyectos, Habilidades, Experiencia, Perfil, embeds) mantienen su `bg-cream` de siempre, así que se leen como piezas claras flotando sobre el fondo oscuro. Cada tarjeta usa `shadow-bevel` (definido en `tailwind.config.js`): un highlight interior de 1px en el borde superior más una sombra suave con tinte navy — el "biselado" sutil que le da profundidad sin bordes ni degradados llamativos.

Como el texto que antes vivía directamente sobre `cream` ahora puede estar directamente sobre `navy` (fuera de las tarjetas — títulos de sección, el Hero, etiquetas de Reconocimiento Institucional), se agregaron dos tokens calibrados para AA sobre navy: `rust-light` y `sage-light` (>=4.5:1), hermanos de los `-ink` que ya existían para texto sobre cream. Nunca mezclar: `-ink` es para texto dentro de una tarjeta cream, `-light` es para texto que cae directo sobre el fondo navy.

## Efectos de scroll

- **Reveal por tarjeta** (`RevealCard.tsx`, hook compartido `useInView`): cada tarjeta/entrada arranca cubierta por un bloque de color sólido (rotando entre `rust-ink` y `sage-ink` según su índice — `navy` se excluyó del ciclo porque ahora es el color de fondo de la página, sería invisible); al entrar en el viewport (`IntersectionObserver`), el bloque se desliza hacia afuera revelando el contenido. Umbral calibrado (`threshold: 0.3`, `rootMargin: -20%`) para que la tarjeta ya esté bien entrada en pantalla cuando se dispara — si se revela demasiado pronto (justo al asomar por el borde inferior), el usuario nunca alcanza a percibir el barrido. Respeta `prefers-reduced-motion`.
- **Perfil/Objetivo** (`Perfil.tsx`): a propósito NO son tarjetas — funcionan como una continuación editorial del Hero (mismo fondo navy, sin caja), con tipografía serif itálica más grande que el resto del sitio para distinguirse, un `text-shadow` suave que les da sensación de flotar, y un fundido sutil (opacidad + `rotateX` leve) al entrar en viewport vía el mismo `useInView`.
- **Nav activo (scrollspy)** (`Nav.tsx`): un segundo `IntersectionObserver` detecta qué sección está más cerca del top del viewport y subraya el link correspondiente en el nav.
- **Línea de tiempo animada** (`Experiencia.tsx`): la línea vertical de la timeline se "dibuja" (`scaleY`) en proporción a cuánto has scrolleado la sección, vía un listener de scroll + `requestAnimationFrame`.

Ninguno de estos agrega dependencias nuevas — todo usa APIs nativas del navegador.

**Descartado:** se probó `scroll-snap-type: y` en mobile (para que cada swipe "pagine" a la siguiente sección). Confirmado con Lighthouse en A/B que rompía por completo la medición de Performance (LCP/TBT/TTI quedaban en `null` y la categoría caía a 0) — Chrome headless no logra calcular esas métricas con scroll-snap activo en el `<html>`. Se revirtió; solo quedó el encabezado centrado en mobile (`text-center sm:text-left` en cada `<h2>`), que sí es seguro.

## Desplegar

Ya está desplegado y conectado (ver arriba) — un `git push` a `master` re-despliega automáticamente. Lo demás queda como referencia si alguna vez necesitas migrarlo a otra cuenta/proveedor.

### Vercel

1. Sube este repositorio a GitHub/GitLab/Bitbucket.
2. En [vercel.com](https://vercel.com), "Add New Project" → importa el repo.
3. Vercel detecta Vite automáticamente (build command `npm run build`, output `dist`). No requiere variables de entorno.
4. Deploy.

### Netlify

1. Sube el repo a tu proveedor de Git.
2. "Add new site" → "Import an existing project".
3. Build command: `npm run build` · Publish directory: `dist`.

### GitHub Pages

1. Instala `gh-pages`: `npm install -D gh-pages`.
2. Agrega a `package.json`: `"deploy": "npm run build && gh-pages -d dist"`.
3. Ajusta `base` en `vite.config.ts` si el sitio no vive en la raíz del dominio (p. ej. `base: '/nombre-repo/'`).
4. `npm run deploy`.

## Después del deploy

- Si en algún momento conectas un dominio propio, actualiza las URLs absolutas en `index.html`, `public/robots.txt` y `public/sitemap.xml` (canonical, `og:url`, `og:image`, sitemap) — búscalas con `grep -rn "angel-alvarez-cv.vercel.app" index.html public/`.
- Valida los meta tags de Open Graph con el [Sharing Debugger de Meta](https://developers.facebook.com/tools/debug/) y el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/).
- Lighthouse en el build de producción: 97 Performance / 100 Accessibility / 75 Best Practices / 100 SEO (medido localmente contra `npm run preview`; los números del servidor de `npm run dev` no son representativos). El Best Practices quedó en 75 (antes 100) porque los embeds de LinkedIn cargan por defecto y ponen sus propias cookies de terceros apenas carga la página — decisión explícita para que las publicaciones se vean sin necesidad de un clic.

## Privacidad

El sitio solo publica correo electrónico y LinkedIn como medios de contacto (ver sección Contacto). No incluye teléfono ni datos de referencias personales o profesionales, conforme al contenido fuente.
