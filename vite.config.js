import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve dirname since ES module is used
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Auto-generate logos and favicons from root images
try {
  const rootDir = __dirname
  
  // 1. Generate page logo (BarzzLy-Black-NoBackround.png -> src/assets/images/Logo_No_Backround.png)
  const logoPath = path.join(rootDir, 'BarzzLy-Black-NoBackround.png')
  if (fs.existsSync(logoPath)) {
    const logoBuffer = fs.readFileSync(logoPath)
    const assetsDir = path.join(rootDir, 'src', 'assets', 'images')
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true })
    }
    fs.writeFileSync(path.join(assetsDir, 'Logo_No_Backround.png'), logoBuffer)
  }
  
  // 2. Generate static favicon (BarzzLy.png -> public/favicon.png)
  const faviconPath = path.join(rootDir, 'BarzzLy.png')
  if (fs.existsSync(faviconPath)) {
    const faviconBuffer = fs.readFileSync(faviconPath)
    fs.writeFileSync(path.join(rootDir, 'public', 'favicon.png'), faviconBuffer)
  }

  // 3. Clean up old SVG favicons to keep it clean
  const cleanFiles = ['favicon.svg', 'favicon-light.svg', 'favicon-dark.svg']
  cleanFiles.forEach(file => {
    const filePath = path.join(rootDir, 'public', file)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  })
} catch (err) {
  console.error('Error generating logos/favicons:', err)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
