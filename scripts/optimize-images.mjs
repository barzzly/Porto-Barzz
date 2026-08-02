import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMG_DIR = path.join(__dirname, '..', 'src', 'assets', 'images')

// Target render widths (retina 2x). Cards show ~360px, skin ~870px.
const PLAN = {
  'aetherium.webp':  { width: 760, quality: 74 },
  'deluxemenu.webp': { width: 760, quality: 74 },
  'noesantara.webp': { width: 760, quality: 74 },
  'rebel.webp':      { width: 760, quality: 74 },
  'shopgui.webp':    { width: 760, quality: 74 },
  'renderskin.webp': { width: 960, quality: 72 },
}

const kb = (n) => `${(n / 1024).toFixed(1)}KB`
let before = 0
let after = 0

for (const [file, opts] of Object.entries(PLAN)) {
  const src = path.join(IMG_DIR, file)
  if (!fs.existsSync(src)) { console.log(`skip (missing): ${file}`); continue }

  const input = fs.readFileSync(src)
  const orig = input.length
  const buf = await sharp(input)
    .resize({ width: opts.width, withoutEnlargement: true })
    .webp({ quality: opts.quality, effort: 6 })
    .toBuffer()

  fs.writeFileSync(src, buf)
  before += orig
  after += buf.length
  console.log(`${file.padEnd(20)} ${kb(orig).padStart(9)} -> ${kb(buf.length).padStart(9)}  (-${(100 - (buf.length / orig) * 100).toFixed(0)}%)`)
}

// Logo PNG: displayed at ~24px, keep small transparent PNG at 96px
const logo = path.join(IMG_DIR, 'Logo_No_Backround.png')
if (fs.existsSync(logo)) {
  const input = fs.readFileSync(logo)
  const orig = input.length
  const buf = await sharp(input)
    .resize({ width: 96, withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 9, palette: true })
    .toBuffer()
  fs.writeFileSync(logo, buf)
  before += orig
  after += buf.length
  console.log(`${'Logo_No_Backround.png'.padEnd(20)} ${kb(orig).padStart(9)} -> ${kb(buf.length).padStart(9)}  (-${(100 - (buf.length / orig) * 100).toFixed(0)}%)`)
}

// Social share image (public/) — recompress jpeg
const og = path.join(__dirname, '..', 'public', 'og-image.jpg')
if (fs.existsSync(og)) {
  const input = fs.readFileSync(og)
  const orig = input.length
  const buf = await sharp(input).jpeg({ quality: 80, mozjpeg: true }).toBuffer()
  if (buf.length < orig) {
    fs.writeFileSync(og, buf)
    before += orig
    after += buf.length
    console.log(`${'og-image.jpg'.padEnd(20)} ${kb(orig).padStart(9)} -> ${kb(buf.length).padStart(9)}  (-${(100 - (buf.length / orig) * 100).toFixed(0)}%)`)
  }
}

console.log('─'.repeat(52))
console.log(`TOTAL ${kb(before)} -> ${kb(after)}  saved ${kb(before - after)}`)
