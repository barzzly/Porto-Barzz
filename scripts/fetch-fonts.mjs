import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const FONT_DIR = path.join(ROOT, 'public', 'fonts')
const CSS_OUT = path.join(ROOT, 'src', 'fonts.css')

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const GF_URL = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'

// Only ship latin — site is Indonesian/English
const KEEP_SUBSETS = new Set(['latin'])

fs.mkdirSync(FONT_DIR, { recursive: true })

const css = await (await fetch(GF_URL, { headers: { 'User-Agent': UA } })).text()

// Split into @font-face blocks, each preceded by a /* subset */ comment
const blocks = css.split('@font-face').slice(1)
let subset = null
// Recover subset labels by scanning comments before each block
const parts = css.split(/(?=\/\* [a-z0-9-]+ \*\/)/)

const out = []
const seen = new Set()
let fetched = 0

for (const part of parts) {
  const subMatch = part.match(/\/\* ([a-z0-9-]+) \*\//)
  if (subMatch) subset = subMatch[1]
  if (!part.includes('@font-face')) continue
  if (!KEEP_SUBSETS.has(subset)) continue

  const family = part.match(/font-family: '([^']+)'/)?.[1]
  const weight = part.match(/font-weight: (\d+)/)?.[1]
  const url = part.match(/url\((https:[^)]+\.woff2)\)/)?.[1]
  if (!family || !weight || !url) continue

  const slug = family.toLowerCase().replace(/\s+/g, '-')
  const fname = `${slug}-${weight}.woff2`
  const dest = path.join(FONT_DIR, fname)

  if (!seen.has(fname)) {
    const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer())
    fs.writeFileSync(dest, buf)
    seen.add(fname)
    fetched++
    console.log(`${fname.padEnd(28)} ${(buf.length / 1024).toFixed(1)}KB`)
  }

  const range = part.match(/unicode-range: ([^;]+);/)?.[1]
  out.push(
    `@font-face {\n` +
    `  font-family: '${family}';\n` +
    `  font-style: normal;\n` +
    `  font-weight: ${weight};\n` +
    `  font-display: swap;\n` +
    `  src: url('/fonts/${fname}') format('woff2');\n` +
    (range ? `  unicode-range: ${range};\n` : '') +
    `}`
  )
}

fs.writeFileSync(CSS_OUT, out.join('\n\n') + '\n')
console.log('─'.repeat(40))
console.log(`fetched ${fetched} woff2 -> public/fonts`)
console.log(`wrote ${path.relative(ROOT, CSS_OUT)}`)
