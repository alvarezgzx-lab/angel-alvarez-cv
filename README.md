# Ángel Álvarez — CV Digital

CV digital interactivo de una sola página, construido en React + TypeScript + Vite + Tailwind CSS. Sitio 100% estático, sin backend.

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
  Angel-Alvarez-CV.pdf   # CV descargable (botón "Ver CV en PDF")
  og-image.png           # imagen 1200×630 para redes sociales
  favicon.svg / favicon-32.png / apple-touch-icon.png
src/
  data/content.ts         # única fuente de verdad del contenido (espeja el JSON del brief)
  components/              # una sección = un componente
  App.tsx                  # ensambla las secciones
scripts/
  generate-og-image.mjs    # regenera public/og-image.png (usa sharp)
  generate-favicons.mjs    # regenera los favicons (usa sharp)
```

Para editar el contenido del CV, modifica únicamente [`src/data/content.ts`](src/data/content.ts) — todos los componentes leen de ahí.

Si cambias el diseño de la imagen social o el favicon, edita el SVG dentro de `scripts/generate-og-image.mjs` o `scripts/generate-favicons.mjs` y vuelve a correr:

```bash
node scripts/generate-og-image.mjs
node scripts/generate-favicons.mjs
```

## Desplegar

### Vercel (recomendado)

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

- **Actualiza las URLs absolutas**: `index.html` usa `https://angelalvarez.vercel.app/` como placeholder en `canonical`, `og:url` y `og:image`. Reemplázalas por el dominio real una vez desplegado (búscalas con `grep -n "angelalvarez.vercel.app" index.html`).
- Valida los meta tags de Open Graph con el [Sharing Debugger de Meta](https://developers.facebook.com/tools/debug/) y el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/).
- Corre Lighthouse (Chrome DevTools → Lighthouse) y confirma ≥90 en Performance, Accessibility, Best Practices y SEO.

## Privacidad

El sitio solo publica correo electrónico y LinkedIn como medios de contacto (ver sección Contacto). No incluye teléfono ni datos de referencias personales o profesionales, conforme al contenido fuente.
