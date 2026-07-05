import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

// -- Chip icons as minimal SVG --
const JavaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573"/>
    <path d="M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118"/>
    <path d="M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.542 1.644-2.469 6.197-3.665 5.19-7.624"/>
    <path d="M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
  </svg>
)

const VelocityIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DBIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)

const PaperIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
)

const WORDS = ["OWNER", "DEVELOPER"]
const MOBILE_QUERY = '(max-width: 767px)'

function subscribeToMobile(callback) {
  const query = window.matchMedia(MOBILE_QUERY)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

function getMobileSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches
}

function getServerSnapshot() {
  return false
}

export function HeroSection({ t }) {
  const [wordIdx, setWordIdx] = useState(0)
  const [displayText, setDisplayText] = useState("S")
  const [phase, setPhase] = useState('typing')
  const timeoutRef = useRef(null)
  const isMobile = useSyncExternalStore(subscribeToMobile, getMobileSnapshot, getServerSnapshot)

  useEffect(() => {
    if (isMobile) return undefined

    const current = WORDS[wordIdx]
    clearTimeout(timeoutRef.current)

    if (phase === 'typing') {
      if (displayText.length < current.length) {
        timeoutRef.current = setTimeout(() =>
          setDisplayText(current.slice(0, displayText.length + 1)), 80)
      } else {
        timeoutRef.current = setTimeout(() => setPhase('deleting'), 2400)
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() =>
          setDisplayText(current.slice(0, displayText.length - 1)), 45)
      } else {
        timeoutRef.current = setTimeout(() => {
          setWordIdx(i => (i + 1) % WORDS.length)
          setPhase('typing')
        }, 0)
      }
    }
    return () => clearTimeout(timeoutRef.current)
  }, [displayText, phase, wordIdx, isMobile])

  // -- Floating chips --
  const chips = [
    {
      icon: <JavaIcon />,
      label: 'Java',
      sub: 'Runtime',
      pos: 'top-[22%] left-[4%] md:left-[7%]',
      delay: '0s',
      dur: '7s',
    },
    {
      icon: <DBIcon />,
      label: 'MySQL',
      sub: 'Player Data',
      pos: 'bottom-[26%] left-[3%] md:left-[6%]',
      delay: '1.2s',
      dur: '8.5s',
    },
    {
      icon: <VelocityIcon />,
      label: 'Velocity',
      sub: 'Network Proxy',
      pos: 'top-[18%] right-[3%] md:right-[7%]',
      delay: '0.6s',
      dur: '6s',
    },
    {
      icon: <PaperIcon />,
      label: 'PaperMC',
      sub: 'Core Server',
      pos: 'bottom-[28%] right-[2%] md:right-[5%]',
      delay: '1.8s',
      dur: '9s',
    },
  ]
  const serverSignals = t.stats || [
    { label: 'FAST', value: 'RESPONSE' },
    { label: 'FRIENDLY', value: 'SERVICE' },
    { label: 'DETAIL', value: 'ORIENTED' },
  ]
  const descriptionLines = t.descLines || [t.desc]
  const languageMotionKey = [
    ...descriptionLines,
    ...serverSignals.map((item) => `${item.label}-${item.value}`),
    t.ctaProjects,
    t.ctaContact,
  ].join('|')
  return (
    <section
      id="home"
      className="relative isolate min-h-[95svh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden max-w-6xl mx-auto w-full"
    >
      <div
        className="absolute left-1/2 top-[56%] h-[66%] w-[min(980px,94vw)] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--color-bg) 96%, transparent) 0%, color-mix(in srgb, var(--color-bg) 80%, transparent) 44%, transparent 76%)',
          filter: 'blur(18px)',
        }}
      />
      <div className="absolute inset-x-6 top-[30%] hidden h-[42%] pointer-events-none -z-10 md:block">
        <div className="absolute left-[14%] right-[14%] top-1/2 h-px bg-gradient-to-r from-transparent via-text/18 to-transparent animate-server-scan" />
        <div className="absolute left-[25%] top-[18%] h-2 w-2 rounded-full bg-text/50 shadow-[0_0_24px_rgba(232,232,232,0.35)] animate-node-pulse" />
        <div className="absolute right-[24%] top-[30%] h-2 w-2 rounded-full bg-text/45 shadow-[0_0_24px_rgba(232,232,232,0.28)] animate-node-pulse delay-300" />
        <div className="absolute left-[47%] bottom-[16%] h-2 w-2 rounded-full bg-text/40 shadow-[0_0_24px_rgba(232,232,232,0.22)] animate-node-pulse delay-600" />
      </div>
      {/* -- Background: large ambient light top -- */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[70%] h-[500px] pointer-events-none -z-10">
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/[0.055] to-transparent blur-[120px] animate-idle-glow" />
      </div>
      {/* Light mode warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[300px] pointer-events-none -z-10
        hidden [html.light_&]:block"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.04) 0%, transparent 70%)' }}
      />

      {/* -- Decorative corner lines (monochrome geo) -- */}
      <div className="absolute top-24 left-6 md:left-10 w-16 h-16 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-5 h-[1px] bg-text" />
        <div className="absolute top-0 left-0 h-5 w-[1px] bg-text" />
      </div>
      <div className="absolute top-24 right-6 md:right-10 w-16 h-16 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-5 h-[1px] bg-text" />
        <div className="absolute top-0 right-0 h-5 w-[1px] bg-text" />
      </div>
      <div className="absolute bottom-16 left-6 md:left-10 w-16 h-16 pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-0 w-5 h-[1px] bg-text" />
        <div className="absolute bottom-0 left-0 h-5 w-[1px] bg-text" />
      </div>
      <div className="absolute bottom-16 right-6 md:right-10 w-16 h-16 pointer-events-none opacity-20">
        <div className="absolute bottom-0 right-0 w-5 h-[1px] bg-text" />
        <div className="absolute bottom-0 right-0 h-5 w-[1px] bg-text" />
      </div>

      {/* -- Floating tech chips -- */}
      {chips.map((chip, i) => (
        <div
          key={i}
          className={`hidden md:flex items-center gap-2.5 absolute pointer-events-none ${chip.pos}`}
          style={{ animation: `chipFloat ${chip.dur} ease-in-out ${chip.delay} infinite` }}
        >
          <div className="
            flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl
            bg-surface border border-card-border backdrop-blur-xl
            shadow-[0_4px_24px_rgba(0,0,0,0.35)]
            group
          ">
            {/* icon container */}
            <div className="w-8 h-8 rounded-xl bg-text/6 border border-border flex items-center justify-center text-text/70 shrink-0">
              {chip.icon}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-mono text-[11px] font-semibold text-text leading-none">{chip.label}</span>
              <span className="font-mono text-[9px] text-muted mt-0.5 leading-none">{chip.sub}</span>
            </div>
          </div>
        </div>
      ))}

      {/* -- Status badge -- */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-card-border bg-surface/60 backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-dot-pulse absolute inline-flex h-full w-full rounded-full bg-text opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-text/80" />
          </span>
          <span className="font-mono text-[10px] text-muted tracking-[0.18em] uppercase">{t.status}</span>
        </div>
      </div>

      {/* -- Main heading -- */}
      <div className="flex flex-col items-center" style={{ animation: 'fadeIn 0.9s ease-out 0.2s both' }}>

        {/* Eyebrow label */}
        <p className="font-mono text-xs text-text/50 tracking-[0.3em] uppercase mb-5 border border-border/40 px-4 py-1.5 rounded-full inline-block">
          {t.eyebrow}
        </p>

        {/* Giant typewriter word */}
        <div className="relative">
          <h1
            className="font-display font-black tracking-normal md:tracking-[-0.025em] leading-none select-none text-text"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10.5rem)',
              textShadow: isMobile ? '0 5px 22px var(--color-bg)' : '0 8px 38px var(--color-bg), 0 1px 0 rgba(255,255,255,0.12)',
            }}
          >
            <span>{isMobile ? 'DEVELOPER' : displayText}</span>
            {!isMobile && (
              <span
                className="inline-block w-[3px] h-[0.85em] bg-text ml-1 align-middle"
                style={{ animation: 'cursorBlink 1s step-end infinite' }}
              />
            )}
          </h1>
        </div>

        {/* Secondary line â€” static, slightly faded */}
        <div
          className="mt-3 font-display font-black tracking-normal md:tracking-[-0.025em] leading-none text-text/36 select-none"
          style={{ fontSize: 'clamp(2.8rem, 9vw, 7.8rem)', textShadow: '0 8px 32px var(--color-bg)' }}
          aria-hidden="true"
        >
          BARZZ.LY
        </div>
      </div>

      {/* -- Divider line -- */}
      <div className="mt-8 w-px h-10 bg-gradient-to-b from-border to-transparent" />

      {/* -- Description -- */}
      <p
        key={`desc-${languageMotionKey}`}
        className="animate-lang-content mt-6 min-h-[7.5rem] max-w-[46rem] px-2 text-[15px] md:min-h-[6.75rem] md:text-lg font-medium leading-8 md:leading-9 text-text/76"
        style={{
          animationDelay: '0.5s',
          textWrap: 'balance',
          textShadow: '0 2px 18px var(--color-bg)',
        }}
      >
        {descriptionLines.map((line, index) => (
          <span key={line} className="md:block">
            {line}
            {index < descriptionLines.length - 1 ? <span className="md:hidden"> </span> : null}
          </span>
        ))}
      </p>
      <div
        key={`signals-${languageMotionKey}`}
        className="animate-lang-content mt-7 hidden flex-wrap items-center justify-center gap-2.5 sm:flex"
        style={{ animationDelay: '0.58s' }}
      >
        {serverSignals.map((item, index) => (
          <div
            key={`${item.label}-${item.value}`}
            className="hero-signal-pill group inline-flex items-center gap-2 rounded-full border border-card-border bg-surface/55 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-text/20 hover:text-text"
            style={{ animationDelay: `${index * 0.18}s` }}
          >
            <span className="hero-signal-dot h-1.5 w-1.5 rounded-full bg-text/55 group-hover:bg-text" />
            <span>{item.label}</span>
            <span className="text-text/80">{item.value}</span>
          </div>
        ))}
      </div>

      {/* -- CTA Buttons -- */}
      <div
        key={`cta-${languageMotionKey}`}
        className="animate-lang-content mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center"
        style={{ animationDelay: '0.65s' }}
      >
        <button
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="hero-cta-button hero-cta-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-semibold
            bg-text text-bg hover:bg-text/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
            shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
        >
          <span className="relative z-10">{t.ctaProjects}</span>
          <ArrowRight className="hero-cta-icon relative z-10 w-4 h-4" />
        </button>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="hero-cta-button hero-cta-secondary inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-semibold
            bg-transparent text-text border border-card-border hover:bg-surface hover:border-text/20
            transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative z-10">{t.ctaContact}</span>
          <Sparkles className="hero-cta-icon relative z-10 w-4 h-4 opacity-70" />
        </button>
      </div>

      {/* -- Scroll indicator -- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-scroll-bounce pointer-events-none">
        <span className="font-mono text-[8px] text-muted/40 tracking-[0.25em] uppercase">scroll</span>
        <div className="w-px h-7 bg-gradient-to-b from-text/25 to-transparent" />
      </div>
    </section>
  )
}


