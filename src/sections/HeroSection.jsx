import { ArrowRight, Code, Database, Cpu, Layout, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

export function HeroSection() {
  const headingText = "CREATIVE"
  const headingAccent = "DEVELOPER"

  // Floating chips configuration
  const chips = [
    { icon: <Code className="w-5 h-5 text-primary" />, label: 'React', className: 'top-1/4 left-10 md:left-20 animate-[chipFloat_6s_ease-in-out_infinite]' },
    { icon: <Database className="w-5 h-5 text-secondary" />, label: 'SQL/NoSQL', className: 'bottom-1/4 left-16 md:left-24 animate-[chipFloat_7s_ease-in-out_infinite_1s]' },
    { icon: <Cpu className="w-5 h-5 text-primary" />, label: 'APIs', className: 'top-1/3 right-12 md:right-24 animate-[chipFloat_5s_ease-in-out_infinite_0.5s]' },
    { icon: <Layout className="w-5 h-5 text-secondary" />, label: 'UI/UX', className: 'bottom-1/3 right-8 md:right-20 animate-[chipFloat_8s_ease-in-out_infinite_1.5s]' },
  ]

  return (
    <section 
      id="home" 
      className="relative min-h-[90svh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 overflow-hidden max-w-6xl mx-auto w-full"
    >
      {/* Background Decorative Glow Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full bg-primary/8 blur-[100px] -z-10 animate-idle-glow pointer-events-none" />

      {/* Floating Interactive Chips (Hidden on Mobile for Performance) */}
      {chips.map((chip, i) => (
        <div 
          key={i}
          className={`hidden md:flex items-center gap-2 p-3 rounded-2xl border border-card-border bg-surface/50 backdrop-blur-md shadow-lg absolute pointer-events-none ${chip.className}`}
        >
          {chip.icon}
          <span className="font-mono text-xs text-text">{chip.label}</span>
        </div>
      ))}


      {/* 2. Status / Availability Badge */}
      <div className="mb-6 reveal-element animate-fade-in">
        <Badge variant="glass" className="border-primary/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-dot-pulse absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-text/90 tracking-wider">AVAILABLE FOR FREELANCE & CONTRACTS</span>
        </Badge>
      </div>

      {/* 3. Main Title (Fluid clamp typography + Stagger character reveal) */}
      <h1 className="font-display font-black tracking-tight text-text leading-[0.9] select-none flex flex-col items-center gap-1">
        {/* Word 1: CREATIVE */}
        <span className="text-[2.6rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] xl:text-[8.5rem] flex gap-x-[0.02em] overflow-hidden py-1">
          {headingText.split("").map((char, index) => (
            <span 
              key={index} 
              className="animate-hero-letter inline-block"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {char}
            </span>
          ))}
        </span>
        
        {/* Word 2: DEVELOPER */}
        <span className="text-[3.2rem] sm:text-[4.8rem] md:text-[7.2rem] lg:text-[8.2rem] xl:text-[10rem] text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/95 to-secondary flex gap-x-[0.02em] overflow-hidden py-2">
          {headingAccent.split("").map((char, index) => (
            <span 
              key={index} 
              className="animate-hero-letter inline-block"
              style={{ animationDelay: `${(headingText.length + index) * 60}ms` }}
            >
              {char}
            </span>
          ))}
        </span>
      </h1>

      {/* 3. Subheading / Short Description */}
      <p className="mt-8 text-base md:text-lg text-muted max-w-2xl leading-relaxed reveal-element animate-[fadeIn_1s_ease-out_1s_both]">
        I design and build premium web applications with clean code, elegant interface patterns, and fluid responsiveness.
      </p>

      {/* 4. Action Buttons (CTAs) */}
      <div className="mt-10 flex flex-wrap gap-4 justify-center reveal-element animate-[fadeIn_1s_ease-out_1.2s_both]">
        <Button variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView()}>
          Explore Projects <ArrowRight className="w-4.5 h-4.5 ml-1.5" />
        </Button>
        <Button variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
          Start a Conversation <Sparkles className="w-4 h-4 ml-1.5 text-secondary" />
        </Button>
      </div>
    </section>
  )
}
