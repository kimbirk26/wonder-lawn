// Image optimisation script for Wonder Lawn
// Usage:
//   node scripts/compress-images.js          → compress JPEGs/PNGs in-place
//   node scripts/compress-images.js --webp   → also produce .webp alongside each image

import sharp from 'sharp'
import { statSync, writeFileSync } from 'fs'
import { resolve, dirname, extname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '../public')
const WEBP_MODE = process.argv.includes('--webp')

const IMAGES = [
  // Root
  'tea.jpg',
  'garden.jpg',
  'roses.jpg',
  'dodo.jpg',
  'whiterabbit.jpeg',
  'McDonald.jpg',
  'Dayne.jpeg',
  'Phelo.png',
  'kim.png',
  // Stories
  'stories/scented1.jpeg',
  'stories/story.jpeg',
  // Night garden
  'night-garden/bigmoth.jpeg',
  'night-garden/night.jpeg',
  'night-garden/moths.jpeg',
  'night-garden/flowers.jpg',
  'night-garden/hydrangea.png',
  'night-garden/moth5.jpeg',
  'night-garden/giant.jpeg',
  // Plants
  'plants/botanical1.jpeg',
  'plants/honeysuckle.jpg',
  'plants/gardenia.jpg',
  'plants/herbs.jpg',
  'plants/succulentpot.jpg',
  'plants/lonicera.jpg',
]

const MAX_PX = 1800
const JPEG_QUALITY = 82
const WEBP_QUALITY = 80

async function compress(rel) {
  const path = resolve(PUBLIC, rel)
  let before
  try { before = statSync(path).size }
  catch { console.log(`  SKIP  ${rel} (not found)`); return }

  const img = sharp(path)
  const meta = await img.metadata()
  const pipeline = (meta.width > MAX_PX || meta.height > MAX_PX)
    ? img.resize({ width: MAX_PX, height: MAX_PX, fit: 'inside', withoutEnlargement: true })
    : img

  // ── WebP output ──────────────────────────────────────────────────────────
  if (WEBP_MODE) {
    const webpPath = path.replace(/\.(jpe?g|png)$/i, '.webp')
    const webpBuf = await pipeline.clone().webp({ quality: WEBP_QUALITY }).toBuffer()
    writeFileSync(webpPath, webpBuf)
    const rel2 = rel.replace(/\.(jpe?g|png)$/i, '.webp')
    console.log(`  ✓ webp  ${rel2.padEnd(42)} ${(before/1024).toFixed(0)}KB → ${(webpBuf.length/1024).toFixed(0)}KB  (-${((before-webpBuf.length)/1024).toFixed(0)}KB, ${(((before-webpBuf.length)/before)*100).toFixed(0)}%)`)
  }

  // ── In-place JPEG/PNG compression ────────────────────────────────────────
  const fmt = meta.format
  const buf = fmt === 'png'
    ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
    : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()

  if (buf.length < before) {
    writeFileSync(path, buf)
    console.log(`  ✓ orig  ${rel.padEnd(42)} ${(before/1024).toFixed(0)}KB → ${(buf.length/1024).toFixed(0)}KB  (-${((before-buf.length)/1024).toFixed(0)}KB, ${(((before-buf.length)/before)*100).toFixed(0)}%)`)
  }
}

console.log(WEBP_MODE ? 'Converting to WebP + compressing originals...\n' : 'Compressing images...\n')
for (const img of IMAGES) await compress(img)
console.log('\nDone.')
