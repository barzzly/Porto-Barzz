import cyberDashboard from '../assets/cyber_dashboard.png'
import terminalApp from '../assets/terminal_app.png'

export const projects = [
  {
    id: 1,
    title: "Aether OS Terminal",
    description: "An interactive in-browser shell emulator with a virtual file system, system telemetry simulations, and keyboard shortcut overrides.",
    image: terminalApp,
    tags: ["React", "TypeScript", "Tailwind CSS", "WebSockets"],
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    id: 2,
    title: "NeoMetrics Analytics",
    description: "Futuristic system monitoring portal featuring real-time stream graphs, server health trackers, database loads, and custom notification systems.",
    image: cyberDashboard,
    tags: ["Vite", "React", "Chart.js", "Tailwind v4"],
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    id: 3,
    title: "Synapse Code Link",
    description: "A collaborative terminal-inspired markdown editor and execution sandboxing tool for secure remote pairing sessions.",
    image: terminalApp, // Reuse or fallback
    tags: ["React", "Express", "Node.js", "Docker"],
    github: "https://github.com",
    demo: "https://example.com"
  }
]
