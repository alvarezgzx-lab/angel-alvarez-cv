import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, '../public')

const NAVY = '#17324D'
const CREAM = '#F4EFE6'
const RUST = '#B85C38'

const iconSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="96" fill="${NAVY}" />
  <circle cx="256" cy="256" r="150" fill="none" stroke="${RUST}" stroke-width="16" />
  <text x="256" y="300" font-family="Georgia, serif" font-weight="700" font-size="200" fill="${CREAM}" text-anchor="middle">A</text>
</svg>
`.trim()

await sharp(Buffer.from(iconSvg)).resize(512, 512).png().toFile(resolve(outDir, 'apple-touch-icon-source.png'))
await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile(resolve(outDir, 'apple-touch-icon.png'))
await sharp(Buffer.from(iconSvg)).resize(32, 32).png().toFile(resolve(outDir, 'favicon-32.png'))

console.log('Favicons generated')
