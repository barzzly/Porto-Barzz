import { Card } from '../components/ui/Card'
import { User, MapPin, Coffee, Code2, Globe } from 'lucide-react'

export function AboutSection({ t }) {
  const terminalLines = [
    { type: 'input', text: 'neofetch' },
    { type: 'output', label: 'OS', val: 'BarzzOS v2.4.0 x86_64' },
    { type: 'output', label: 'Host', val: 'Creative-Terminal-Vite' },
    { type: 'output', label: 'Kernel', val: 'React-Fiber-Engine' },
    { type: 'output', label: 'Uptime', val: '24 days, 7 hours' },
    { type: 'output', label: 'Shell', val: 'zsh 5.8.1' },
    { type: 'output', label: 'Resolution', val: 'Responsive Fluid Viewports' },
    { type: 'output', label: 'Theme', val: 'Cyberpunk Neon (Dark/Light)' },
    { type: 'output', label: 'Terminal', val: 'Glassmorphic Web UI' },
    { type: 'json', val: { "status": "Available", "freelance": true, "coffee_intake": "high" } }
  ]

  return (
    <section 
      id="about" 
      className="max-w-6xl mx-auto px-6 py-20 w-full"
    >
      {/* Section Header */}
      <div className="reveal-up flex flex-col items-center md:items-start mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-widest mb-2">{t.badge}</span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-text tracking-tighter">
          {t.heading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t.headingAccent}</span>
        </h2>
        <div className="w-12 h-[2px] bg-primary mt-4" />
      </div>

      {/* Main Grid: Asymmetrical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
        {/* Left Column: Story and Details */}
        <div className="reveal-left flex flex-col gap-6 text-center md:text-left">
          <p className="text-text/90 leading-relaxed text-base md:text-lg">
            Hello! I'm <span className="text-primary font-semibold font-mono">BarzzLy</span>, {t.desc1.replace("Hello! I'm BarzzLy, ", "")}
          </p>
          <p className="text-muted leading-relaxed text-sm md:text-base">
            {t.desc2}
          </p>

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-mono text-xs md:text-sm text-left">
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/30">
              <User className="w-4 h-4 text-primary" />
              <div>
                <span className="text-muted block text-[10px]">{t.labelName}</span>
                <span className="text-text font-medium">Hidayathul Fikri (Barzz)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/30">
              <MapPin className="w-4 h-4 text-secondary" />
              <div>
                <span className="text-muted block text-[10px]">{t.labelLocation}</span>
                <span className="text-text font-medium">Indonesia (Remote)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/30">
              <Coffee className="w-4 h-4 text-primary" />
              <div>
                <span className="text-muted block text-[10px]">{t.labelFuel}</span>
                <span className="text-text font-medium">Espresso & Coding</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/30">
              <Globe className="w-4 h-4 text-secondary" />
              <div>
                <span className="text-muted block text-[10px]">{t.labelPortfolio}</span>
                <span className="text-text font-medium">barzz.ly</span>
              </div>
            </div>
          </div>

          {/* Qualities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-left">
            {t.qualities.map((item, i) => {
              const delays = ['delay-75', 'delay-150', 'delay-300']
              return (
                <Card key={i} hoverable={true} className={`p-5 flex flex-col gap-2 bg-surface/40 reveal-up ${delays[i] || ''}`}>
                  <h3 className="font-mono text-sm font-semibold text-text flex items-center gap-2">
                    <Code2 className="w-4.5 h-4.5 text-primary" />
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Right Column: Code Terminal Illustration (Highly Premium) */}
        <div className="reveal-right delay-200">
          <div className="rounded-2xl border border-card-border bg-surface/60 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border/40 font-mono text-[11px] text-muted">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span>zsh — creative-terminal</span>
              <span className="w-10" />
            </div>

            {/* Terminal Output Body */}
            <div className="p-5 font-mono text-xs text-left leading-relaxed max-h-[360px] overflow-y-auto">
              {terminalLines.map((line, i) => {
                if (line.type === 'input') {
                  return (
                    <div key={i} className="mb-2.5">
                      <span className="text-primary font-bold">~ ➜</span>{' '}
                      <span className="text-text">{line.text}</span>
                    </div>
                  )
                } else if (line.type === 'output') {
                  return (
                    <div key={i} className="flex gap-2 pl-4 text-text/80 text-[11px]">
                      <span className="text-secondary font-medium">{line.label}:</span>
                      <span className="text-muted">{line.val}</span>
                    </div>
                  )
                } else {
                  return (
                    <pre key={i} className="pl-4 text-[#00ff88] text-[11px] bg-primary/5 p-2 rounded-lg border border-primary/10 mt-1 mb-2.5 overflow-x-auto">
                      {JSON.stringify(line.val, null, 2)}
                    </pre>
                  )
                }
              })}
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-primary font-bold">~ ➜</span>
                <span className="w-2 h-4 bg-primary animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
