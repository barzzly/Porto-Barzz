# 🎮 BarzzLy Portfolio - Minecraft Server Developer

Repository ini berisi kode sumber untuk website portofolio **BarzzLy**, seorang Minecraft Server Developer profesional yang berpengalaman dalam melakukan setup server (Paper, Spigot, Velocity), konfigurasi plugin, sistem gameplay, optimasi performa, dan maintenance.

Website ini dibangun menggunakan **React**, **Vite**, dan **Tailwind CSS v4** dengan desain bernuansa modern, interaktif, dan premium.

---

## 🚀 Fitur Utama

- **Desain Glassmorphism Modern & Premium**: Terinspirasi dari estetika antarmuka modern dengan transisi halus dan micro-animations.
- **Dark/Light Mode**: Dukungan penuh untuk mode gelap dan terang dengan kontras yang nyaman bagi mata.
- **Responsif & Ringan**: Dioptimalkan untuk perangkat mobile, tablet, hingga desktop menggunakan Vite.
- **Typography Premium**: Menggunakan font *Plus Jakarta Sans* untuk keterbacaan tinggi dan *JetBrains Mono* untuk nuansa developer/programmer.

---

## 🛠️ Stack Teknologi

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: *Plus Jakarta Sans* & *JetBrains Mono* (via Google Fonts)

---

## 📋 Tutorial Instalasi & Pengembangan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda:

### 1. Prasyarat (Prerequisites)

Pastikan Anda sudah menginstal aplikasi berikut di perangkat Anda:
- [Node.js](https://nodejs.org/) (versi **18.x** atau lebih baru sangat disarankan)
- Package Manager seperti **npm** (bawaan Node.js) atau **yarn**

### 2. Langkah Instalasi

1. **Clone Repository**
   Clone repository ini ke komputer lokal Anda menggunakan Git:
   ```bash
   git clone https://github.com/barzzly/Porto-Barzz.git
   ```
   *(Atau unduh file ZIP dan ekstrak ke direktori pilihan Anda)*

2. **Masuk ke Direktori Proyek**
   Buka terminal atau command prompt, lalu arahkan ke folder proyek:
   ```bash
   cd Porto-Barzz
   ```

3. **Instal Dependensi**
   Instal semua library/package yang dibutuhkan dengan menjalankan perintah:
   ```bash
   npm install
   ```
   *(Atau `yarn install` jika Anda menggunakan Yarn)*

### 3. Menjalankan Server Pengembangan (Development Server)

Untuk menjalankan proyek dalam mode pengembangan dengan fitur Hot Module Replacement (HMR):
```bash
npm run dev
```
Setelah server berjalan, buka browser Anda dan akses:
👉 **[http://localhost:5173](http://localhost:5173)**

### 4. Build untuk Produksi (Production Build)

Jika proyek sudah siap dideploy ke server produksi (seperti Vercel, Netlify, atau GitHub Pages), kompilasi kode sumber dengan perintah:
```bash
npm run build
```
Perintah ini akan menghasilkan folder `/dist` yang berisi file HTML, JS, dan CSS statis yang telah dioptimalkan dan siap di-hosting.

Untuk menguji hasil build produksi secara lokal sebelum melakukan deploy:
```bash
npm run preview
```

---

## 📁 Struktur Proyek

Berikut adalah gambaran singkat mengenai struktur direktori dalam proyek ini:

```text
Porto-Barzz/
├── public/              # Aset statis (favicon, gambar, sitemap, dll.)
├── src/
│   ├── components/      # Komponen UI reusable (Card, Button, dll.)
│   ├── sections/        # Bagian-bagian halaman utama (Hero, Projects, dll.)
│   ├── App.jsx          # Komponen utama aplikasi
│   ├── index.css        # Konfigurasi styling & utility Tailwind
│   └── main.jsx         # Entry point aplikasi React
├── index.html           # File template HTML utama
├── package.json         # Konfigurasi proyek & daftar dependensi
└── vite.config.js       # Konfigurasi Vite
```

---

## 📬 Hubungi BarzzLy

Jika Anda tertarik untuk berkolaborasi atau memesan jasa setup server Minecraft:
- **Discord**: [@barzzly](https://discord.com/users/1189813545018347580)
- **Website**: [barzz.noesantara.id](https://barzz.noesantara.id/)
