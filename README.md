# BarzzLy Portfolio - Minecraft Server Developer

Repository ini berisi kode sumber untuk website portofolio **BarzzLy**, seorang Minecraft Server Developer profesional yang berpengalaman dalam melakukan setup server (Paper, Spigot, Velocity), konfigurasi plugin, sistem gameplay, optimasi performa, dan maintenance.

Website ini dibangun menggunakan **React**, **Vite**, dan **Tailwind CSS v4** dengan desain modern, interaktif, dan ringan.

---

## Fitur Utama

- **Desain Modern & Premium**: Estetika antarmuka bersih dengan transisi halus dan micro-animations.
- **Dark/Light Mode**: Dukungan penuh mode gelap dan terang dengan kontras nyaman bagi mata.
- **Responsif & Ringan**: Dioptimalkan untuk mobile, tablet, hingga desktop. Aset gambar di-resize dan dikompres, section di-lazy-load, font self-hosted.
- **Typography Premium**: *Plus Jakarta Sans* untuk keterbacaan dan *JetBrains Mono* untuk nuansa developer.

---

## Stack Teknologi

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: *Plus Jakarta Sans* & *JetBrains Mono* (self-hosted woff2, subset latin)

---

## Optimasi Performa

Website ini dioptimalkan untuk skor Lighthouse tinggi:

- **Gambar**: Di-resize ke ukuran render (2x retina) dan dikompres ke WebP. Jalankan `npm run optimize:images`.
- **Font**: Self-hosted woff2 (subset latin), preload dua font kritis. Ambil ulang dengan `npm run fetch:fonts`.
- **Code-splitting**: Section below-the-fold di-lazy-load; vendor, React, dan ikon dipisah jadi chunk terpisah.
- **Grid background**: Animasi ditulis langsung ke DOM (tanpa re-render React) dan pointer di-throttle via rAF.
- **CLS**: Semua gambar punya atribut `width`/`height` eksplisit.

---

## Instalasi & Pengembangan

### 1. Prasyarat

- [Node.js](https://nodejs.org/) versi **18.x** atau lebih baru
- Package Manager **npm** (bawaan Node.js) atau **yarn**

### 2. Instalasi

Clone repository:

```bash
git clone https://github.com/barzzly/Porto-Barzz.git
cd Porto-Barzz
npm install
```

### 3. Development Server

Menjalankan mode pengembangan dengan Hot Module Replacement (HMR):

```bash
npm run dev
```

Akses di browser: **[http://localhost:5173](http://localhost:5173)**

### 4. Production Build

Kompilasi kode ke folder `/dist` yang siap di-hosting (Vercel, Netlify, GitHub Pages):

```bash
npm run build
```

Menguji hasil build secara lokal:

```bash
npm run preview
```

---

## Script Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Development server dengan HMR |
| `npm run build` | Build produksi ke `/dist` |
| `npm run preview` | Preview hasil build lokal |
| `npm run lint` | Cek kode dengan ESLint |
| `npm run optimize:images` | Resize dan kompres aset gambar |
| `npm run fetch:fonts` | Ambil dan generate font self-hosted |

---

## Struktur Proyek

```text
Porto-Barzz/
├── public/
│   ├── fonts/           # Font woff2 self-hosted
│   ├── favicon.png      # Favicon
│   ├── og-image.jpg     # Social share preview
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── optimize-images.mjs  # Resize + kompres gambar
│   └── fetch-fonts.mjs      # Ambil font Google, generate CSS lokal
├── src/
│   ├── components/      # Komponen UI reusable (Card, Button, Navbar, dll.)
│   ├── sections/        # Bagian halaman (Hero, Projects, Skills, dll.)
│   ├── hooks/           # Custom hooks (theme, scroll reveal, dll.)
│   ├── data/            # Data statis (projects, skills, translations)
│   ├── styles/          # Animasi CSS
│   ├── fonts.css        # Deklarasi @font-face self-hosted
│   ├── App.jsx          # Komponen utama
│   ├── index.css        # Styling & utility Tailwind
│   └── main.jsx         # Entry point React
├── index.html           # Template HTML utama
├── package.json         # Konfigurasi proyek & dependensi
└── vite.config.js       # Konfigurasi Vite
```

---

## Hubungi BarzzLy

Jika Anda tertarik berkolaborasi atau memesan jasa setup server Minecraft:

- **Discord**: [@barzzly](https://discord.com/users/1189813545018347580)
- **Website**: [barzzly.com](https://barzzly.com/)
