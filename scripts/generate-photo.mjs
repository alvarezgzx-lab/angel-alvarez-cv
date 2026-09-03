import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { unlinkSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, '../public/images')
const source = resolve(outDir, '_angel-photo-source.jpg')

await sharp(source)
  .resize(480, 480, { fit: 'cover' })
  .webp({ quality: 88 })
  .toFile(resolve(outDir, 'angel-photo.webp'))

unlinkSync(source)

console.log('Photo processed at public/images/angel-photo.webp')
