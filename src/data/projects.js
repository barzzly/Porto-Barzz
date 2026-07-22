import aetheriumImage from '../assets/images/aetherium.webp'
import noesantaraImage from '../assets/images/noesantara.webp'
import rebelImage from '../assets/images/rebel.webp'
import deluxeMenuImage from '../assets/images/deluxemenu.webp'
import shopGuiImage from '../assets/images/shopgui.webp'

export const projects = [
  {
    id: 1,
    title: "Aetherium Network",
    role: "Developer, Owner",
    description: "Server network yang saya bangun pada tahun 2023 sebagai project kedua setelah BarzzSMP pada 2021. Aetherium pernah mencapai 150 pemain aktif dengan mode RPG, faction, ekonomi, Slimefun, dan vanilla survival.",
    image: aetheriumImage,
    tags: ["RPG", "Faction", "Eco", "Slimefun"],
    status: "eol",
    joinIp: null
  },
  {
    id: 2,
    title: "Noesantara Network",
    role: "Developer, Owner",
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
  }
]