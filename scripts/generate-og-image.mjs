import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, '../public')
mkdirSync(outDir, { recursive: true })

const NAVY = '#17324D'
const CREAM = '#F4EFE6'
const RUST = '#B85C38'
const SAGE = '#6F8F72'

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .display { font-family: Georgia, 'Times New Roman', serif; font-weight: 700; }
      .body { font-family: 'Segoe UI', Arial, sans-serif; }
      .mono { font-family: 'Courier New', monospace; }
    </style>
  </defs>

  <rect width="1200" height="630" fill="${NAVY}" />

  <rect x="0" y="0" width="10" height="630" fill="${RUST}" />
  <circle cx="1120" cy="90" r="130" fill="${RUST}" opacity="0.12" />
  <circle cx="1050" cy="540" r="90" fill="${SAGE}" opacity="0.18" />

  <text x="90" y="230" class="mono" font-size="22" letter-spacing="4" fill="${SAGE}">NUEVO LEÓN, MÉXICO</text>

  <text x="88" y="330" class="display" font-size="76" fill="${CREAM}">Ángel Álvarez</text>

  <text x="90" y="390" class="body" font-size="24" fill="${CREAM}" opacity="0.9">Learning Analyst (Associate) &#183; Workforce Enablement &amp; Business Strategy</text>
  <text x="90" y="424" class="body" font-size="24" fill="${CREAM}" opacity="0.9">Cross-Functional HR Operations &#183; Data &amp; Metrics</text>

  <rect x="90" y="480" width="220" height="46" rx="23" fill="${RUST}" />
  <text x="200" y="509" class="mono" font-size="20" fill="${CREAM}" text-anchor="middle">CV DIGITAL</text>
</svg>
`.trim()

await sharp(Buffer.from(svg)).resize(1200, 630).png().toFile(resolve(outDir, 'og-image.png'))

console.log('OG image generated at public/og-image.png')
