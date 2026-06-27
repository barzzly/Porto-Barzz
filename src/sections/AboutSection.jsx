import { Card } from '../components/ui/Card'
import renderSkin from '../assets/images/renderskin.png'
import { User, MapPin, Coffee, Code2, Globe, Server, Users } from 'lucide-react'

function MinecraftSkinRender() {
  return (
    <div className="reveal-right delay-200 relative min-h-[520px] overflow-hidden rounded-2xl border border-card-border/70 bg-surface/25 backdrop-blur-xl shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.10),transparent_32%),linear-gradient(180deg,transparent,rgba(0,0,0,0.34))]" />
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />

      <div className="absolute right-6 top-24 z-20 flex items-center gap-2 rounded-2xl border border-card-border bg-surface/85 px-4 py-3 backdrop-blur-xl shadow-xl animate-chip-float">
        <Users className="h-4 w-4 text-text/70" />
        <div className="text-left font-mono leading-tight">
          <span className="block text-[9px] uppercase tracking-[0.14em] text-muted">Focus</span>
          <span className="text-xs font-bold text-text">Players</span>
        </div>
      </div>

      <div className="absolute left-7 top-[58%] z-20 flex items-center gap-2 rounded-2xl border border-card-border bg-surface/85 px-4 py-3 backdrop-blur-xl shadow-xl animate-chip-float" style={{ animationDelay: '1.1s' }}>
        <Code2 className="h-4 w-4 text-text/70" />
        <div className="text-left font-mono leading-tight">
          <span className="block text-[9px] uppercase tracking-[0.14em] text-muted">Hobby</span>
          <span className="text-xs font-bold text-text">Coding</span>
        </div>
      </div>

      <div className="absolute bottom-12 right-7 z-20 flex items-center gap-2 rounded-2xl border border-card-border bg-surface/85 px-4 py-3 backdrop-blur-xl shadow-xl animate-chip-float" style={{ animationDelay: '1.8s' }}>
        <Server className="h-4 w-4 text-text/70" />
        <div className="text-left font-mono leading-tight">
          <span className="block text-[9px] uppercase tracking-[0.14em] text-muted">Builder</span>
          <span className="text-xs font-bold text-text">Servers</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg/80 to-transparent" />
      <div className="absolute left-1/2 top-[52%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text/[0.06] blur-3xl" />

      <div className="absolute left-1/2 top-[52%] z-10 -translate-x-1/2 -translate-y-1/2">
        <img
          src={renderSkin}
          alt="Minecraft skin render of BarzzLy"
          loading="lazy"
          className="h-[490px] w-auto max-w-none object-contain animate-skin-breathe drop-shadow-[0_38px_54px_rgba(0,0,0,0.58)] transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>
    </div>
  )
}
export function AboutSection({ t }) {
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
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center">
        {/* Left Column: Story and Details */}
        <div className="reveal-left flex flex-col gap-6 text-center md:text-left">
          <p className="text-text/90 leading-relaxed text-base md:text-lg">
            {t.desc1}
          </p>
          <p className="text-muted leading-relaxed text-sm md:text-base">
            {t.desc2}
          </p>

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-mono text-xs md:text-sm text-left">
            <div className="about-info-card group flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/30 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-surface/50 hover:shadow-lg">
              <User className="about-info-icon w-4 h-4 text-primary" />
              <div>
                <span className="text-muted block text-[10px]">{t.labelName}</span>
                <span className="text-text font-medium">BarzzLy</span>
              </div>
            </div>
            <div className="about-info-card group flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/30 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-surface/50 hover:shadow-lg">
              <MapPin className="about-info-icon w-4 h-4 text-secondary" />
              <div>
                <span className="text-muted block text-[10px]">{t.labelLocation}</span>
                <span className="text-text font-medium">Indonesia (Remote)</span>
              </div>
            </div>
            <div className="about-info-card group flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/30 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-surface/50 hover:shadow-lg">
              <Coffee className="about-info-icon w-4 h-4 text-primary" />
              <div>
                <span className="text-muted block text-[10px]">{t.labelFuel}</span>
                <span className="text-text font-medium">Americano & Latte</span>
              </div>
            </div>
            <div className="about-info-card group flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/30 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-surface/50 hover:shadow-lg">
              <Globe className="about-info-icon w-4 h-4 text-secondary" />
              <div>
                <span className="text-muted block text-[10px]">{t.labelPortfolio}</span>
                <span className="text-text font-medium">barzz.ly</span>
              </div>
            </div>
          </div>

          {/* Qualities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7 text-left">
            {t.qualities.map((item, i) => {
              const delays = ['delay-75', 'delay-150', 'delay-300']
              return (
                <Card
                  key={i}
                  hoverable={true}
                  tilt={true}
                  className={`about-quality-card min-h-[190px] p-6 bg-surface/45 reveal-up ${delays[i] || ''}`}
                >
                  <div className="flex h-full flex-col gap-4">
                    <h3 className="font-mono text-[15px] font-semibold text-text flex items-center gap-3 leading-snug">
                      <span className="about-quality-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-text/[0.04] text-primary transition-all duration-300 group-hover:border-primary/35 group-hover:bg-text/[0.08]">
                        <Code2 className="w-4.5 h-4.5" />
                      </span>
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-sm text-muted leading-7 md:text-[13px]">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
        <MinecraftSkinRender />
      </div>
    </section>
  )
}
