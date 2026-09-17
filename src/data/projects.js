import aetheriumImage from '../assets/images/aetherium.webp'
import noesantaraImage from '../assets/images/noesantara.webp'
import rebelImage from '../assets/images/rebel.webp'
import legacyImage from '../assets/images/legacy.webp'
import deluxeMenuImage from '../assets/images/deluxemenu.webp'
import shopGuiImage from '../assets/images/shopgui.webp'
import prefixRankImage from '../assets/images/prefixrank.webp'
import megConverterImage from '../assets/images/megconverter.webp'
import webStoreImage from '../assets/images/webstore.webp'
import webPortoImage from '../assets/images/webporto.webp'

export const projects = [
  {
    id: 1,
    title: "Aetherium Network",
    role: "Founder",
    description: "Server network yang saya bangun pada tahun 2023 sebagai project kedua setelah BarzzSMP pada 2021. Aetherium pernah mencapai 150 pemain aktif dengan mode RPG, faction, ekonomi, Slimefun, dan vanilla survival.",
    image: aetheriumImage,
    tags: ["RPG", "Faction", "Eco", "Slimefun"],
    status: "eol",
    joinIp: null
  },
  {
    id: 2,
    title: "Noesantara Network",
    role: "Founder",
    description: "Server network hasil rebranding dari Aetherium Network pada awal tahun 2025. Noesantara berkembang dengan identitas yang lebih matang dan pernah mencapai 250 pemain aktif melalui sistem RPG, faction, dan ekonomi.",
    image: noesantaraImage,
    tags: ["RPG", "Faction", "Eco"],
    statusAddress: "noesantara.id",
    statusType: "java",
    joinIp: "noesantara.id"
  },
  {
    id: 3,
    title: "Rebel Roleplay",
    role: "Owner",
    description: "Server roleplay bersama Rebel yang baru baru ini saya join sebagai owner. Project ini berfokus pada pengalaman city roleplay yang rapi, ekonomi aktif, sistem race, dan komunitas yang nyaman dimainkan.",
    image: rebelImage,
    tags: ["Roleplay", "City", "Eco", "Race"],
    statusAddress: "216.163.186.39:19022",
    statusType: "java",
    joinIp: "rebel.noesantara.id"
  },
  {
    id: 4,
    title: "Legacy School",
    role: "Developer",
    description: "Server roleplay bertema sekolahan tempat saya bergabung sebagai developer sejak Juli 2026. Saya mengurus sistem, plugin, dan pengalaman roleplay agar tetap rapi dan nyaman dimainkan.",
    image: legacyImage,
    tags: ["Roleplay", "School", "Eco"],
    statusAddress: "legacyschool.my.id:25040",
    statusType: "java",
    joinIp: "legacyschool.my.id:25040"
  }
]

export const tools = [
  {
    id: 1,
    title: "DeluxeMenu Editor",
    role: "Developer",
    description: "Editor visual untuk DeluxeMenus. Susun layout menu, slot, item, dan aksi tanpa menulis YAML manual, lalu export config siap pakai.",
    image: deluxeMenuImage,
    tags: ["DeluxeMenus", "Editor", "YAML", "GUI"],
    url: "https://dmenu.barzzly.com/"
  },
  {
    id: 2,
    title: "ShopGUI+ Editor",
    role: "Developer",
    description: "Editor visual untuk ShopGUI+. Atur kategori, item, harga, dan tampilan shop dengan mudah lalu export config yang rapi.",
    image: shopGuiImage,
    tags: ["ShopGUI+", "Editor", "Shop", "Config"],
    url: "https://shop-editor.barzzly.com/"
  },
  {
    id: 3,
    title: "Prefix Rank Editor",
    role: "Developer",
    description: "Editor visual untuk prefix dan rank. Atur nama rank, prefix, warna, dan ikon dengan mudah lalu export config siap pakai.",
    image: prefixRankImage,
    tags: ["Prefix", "Rank", "Editor", "Config"],
    url: "https://prefixrank.barzzly.com/"
  },
  {
    id: 4,
    title: "MEGConverter",
    role: "Contributor",
    description: "Converter model engine Java agar kompatibel dengan Minecraft Bedrock. Konversi model dan aset untuk dipakai lintas platform.",
    image: megConverterImage,
    tags: ["Model Engine", "Java", "Bedrock", "Converter"],
    url: "https://megconverter.barzzly.com/"
  }
]

export const websites = [
  {
    id: 1,
    title: "Web Store Noesantara",
    role: "Developer",
    description: "Website resmi dan web store server Noesantara Network. Menampilkan informasi server, leaderboard, galeri, serta sistem pembelian item dan rank online.",
    image: webStoreImage,
    tags: ["Website", "Store", "Noesantara", "E-Commerce"],
    url: "https://store.noesantara.id/"
  },
  {
    id: 2,
    title: "Portfolio BarzzLy",
    role: "Developer",
    description: "Website portfolio BarzzLy khusus ekosistem server Minecraft, menampilkan showcase project, tools konfigurasi, dan keahlian teknis tanpa menyangkut data pribadi IRL.",
    image: webPortoImage,
    tags: ["Portfolio", "React", "Tailwind CSS", "Vite"],
    url: "https://barzzly.com/"
  }
]
