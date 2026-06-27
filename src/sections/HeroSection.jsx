import { useState, useEffect } from 'react'
import { ArrowRight, Code, Database, Cpu, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

export function HeroSection({ t }) {
  const headingText = "DEVELOPER"
  const headingAccent = "SERVER MINECRAFT"

  const [typedLine1, setTypedLine1] = useState("")
  const [typedLine2, setTypedLine2] = useState("")

  useEffect(() => {
    let index1 = 0
    let index2 = 0
    let interval;

    const typeLine1 = () => {
      interval = setInterval(() => {
        if (index1 < headingText.length) {
          setTypedLine1(headingText.substring(0, index1 + 1))
          index1++
        } else {
          clearInterval(interval)
          typeLine2()
        }
      }, 70) // speed of typing (70ms per letter)
    }

    const typeLine2 = () => {
      interval = setInterval(() => {
        if (index2 < headingAccent.length) {
          setTypedLine2(headingAccent.substring(0, index2 + 1))
          index2++
        } else {
          clearInterval(interval)
        }
      }, 75)
    }

    typeLine1()

    return () => clearInterval(interval)
  }, [])

  // Floating chips configuration (Minecraft Server Developer themed)
  const chips = [
    { icon: <Code className="w-5 h-5 text-primary" />, label: 'Java', className: 'top-1/4 left-10 md:left-20 animate-[chipFloat_6s_ease-in-out_infinite]' },
    { icon: <Database className="w-5 h-5 text-secondary" />, label: 'MySQL', className: 'bottom-1/4 left-16 md:left-24 animate-[chipFloat_7s_ease-in-out_infinite_1s]' },
    { icon: <Cpu className="w-5 h-5 text-primary" />, label: 'Velocity Proxy', className: 'top-1/3 right-12 md:right-24 animate-[chipFloat_5s_ease-in-out_infinite_0.5s]' },
    { icon: <Sparkles className="w-5 h-5 text-secondary" />, label: 'Paper/Spigot API', className: 'bottom-1/3 right-8 md:right-20 animate-[chipFloat_8s_ease-in-out_infinite_1.5s]' },
  ]

  return (
    <section 
      id="home" 
      className="relative min-h-[90svh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 overflow-hidden max-w-6xl mx-auto w-full"
    >
      {/* Decorative top grid boxes & gradient aura (Premium AxzyHub look) */}
      <div className="absolute top-0 inset-x-0 h-[650px] overflow-hidden pointer-events-none -z-15">

        
        {/* Colorful Gradient Auras */}
        <div className="absolute top-[-10%] left-[20%] w-[45%] aspect-square rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-[110px] animate-idle-glow" />
        <div className="absolute top-[15%] right-[10%] w-[35%] aspect-square rounded-full bg-gradient-to-br from-secondary/15 via-secondary/5 to-transparent blur-[100px] animate-[pulse_10s_infinite_2s]" />
        <div className="absolute top-[-5%] left-[60%] w-[30%] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.15),transparent_60%)] blur-[90px]" />

        {/* Abstract floating outlined squares */}
        <div className="absolute top-[20%] left-[12%] w-16 h-16 border border-primary/25 rounded-lg rotate-12 [mask-image:linear-gradient(to_bottom_right,black,transparent)]" />
        <div className="absolute top-[45%] left-[8%] w-24 h-24 border border-dashed border-primary/15 rounded-xl -rotate-6" />
        <div className="absolute top-[15%] right-[15%] w-20 h-20 border border-secondary/20 rounded-lg rotate-45 [mask-image:linear-gradient(to_bottom_left,black,transparent)]" />
        <div className="absolute top-[50%] right-[8%] w-32 h-32 border border-dashed border-secondary/10 rounded-2xl rotate-12" />
        <div className="absolute top-[35%] left-[45%] w-12 h-12 border border-primary/20 rounded-md -rotate-12 [mask-image:linear-gradient(to_top,black,transparent)]" />
      </div>

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
          <span className="text-text/90 tracking-wider">{t.status}</span>
        </Badge>
      </div>

      {/* 3. Main Title (Fluid clamp typography + Stagger character reveal) */}
      <h1 className="font-display font-black tracking-[-0.04em] text-text leading-[0.9] flex flex-col items-center gap-1">
        {/* Word 1: DEVELOPER */}
        <div 
          style={{
            maskImage: 'linear-gradient(to right, black 50%, rgba(0,0,0,0.4) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 50%, rgba(0,0,0,0.4) 100%)'
          }}
          className="flex justify-center w-full"
        >
          <span className="text-[2.6rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] xl:text-[8.5rem] py-1 tracking-[-0.03em] font-extrabold text-text flex items-center">
            {typedLine1}
            {typedLine1.length > 0 && typedLine1.length < headingText.length && (
              <span className="animate-pulse ml-1 text-text font-light text-[0.8em]">|</span>
            )}
          </span>
        </div>
        
        {/* Word 2: SERVER MINECRAFT */}
        <div 
          style={{
            maskImage: 'linear-gradient(to right, black 35%, rgba(0,0,0,0.15) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 35%, rgba(0,0,0,0.15) 100%)'
          }}
          className="flex justify-center w-full"
        >
          <span className="text-[2.2rem] sm:text-[3.6rem] md:text-[5.4rem] lg:text-[6.5rem] xl:text-[8rem] text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/95 to-secondary py-2 tracking-[-0.03em] font-extrabold flex items-center">
            {typedLine2}
            {typedLine1.length === headingText.length && (
              <span className="animate-pulse ml-1 text-primary font-light text-[0.8em] select-none">|</span>
            )}
          </span>
        </div>
      </h1>

      {/* 3. Subheading / Short Description */}
      <p className="mt-8 text-base md:text-lg text-muted max-w-2xl leading-relaxed reveal-element animate-[fadeIn_1s_ease-out_1s_both]">
        {t.desc}
      </p>

      {/* 4. Action Buttons (CTAs) */}
      <div className="mt-10 flex flex-wrap gap-4 justify-center reveal-element animate-[fadeIn_1s_ease-out_1.2s_both]">
        <Button variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView()}>
          {t.ctaProjects} <ArrowRight className="w-4.5 h-4.5 ml-1.5" />
        </Button>
        <Button variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
          {t.ctaContact} <Sparkles className="w-4 h-4 ml-1.5 text-secondary" />
        </Button>
      </div>
    </section>
  )
}
