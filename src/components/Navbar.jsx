import { useState, useEffect, useRef, useCallback } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import logoNoBg from '../assets/images/Logo_No_Backround.png'

const NAV_SECTIONS = ['home', 'about', 'projects', 'tech-stack', 'testimonials', 'contact']
// While a smooth scroll from a nav click is in flight, trust the clicked target
// instead of the sections flying past the detection line. The lock releases as
// soon as the target actually settles, with a hard cap for interrupted scrolls.
const CLICK_LOCK_MAX_MS = 2200
const SETTLE_TOLERANCE = 8

export function Navbar({ isDark, toggleTheme, lang, toggleLang, t }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredSection, setHoveredSection] = useState(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })
  const linkRefs = useRef({})
  const lockRef = useRef(null)

  useEffect(() => {
    // Cache doc height; reading it inside scroll forces a synchronous reflow every frame
    let docHeight = document.documentElement.scrollHeight - window.innerHeight
    let ticking = false

    const update = () => {
      ticking = false
      setIsScrolled(window.scrollY > 60)
      setScrollProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0)
    }
    const handleScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }
    const recalc = () => { docHeight = document.documentElement.scrollHeight - window.innerHeight }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', recalc, { passive: true })
    // Doc height grows as lazy sections mount
    const ro = new ResizeObserver(recalc)
    ro.observe(document.documentElement)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', recalc)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    // Below-the-fold sections are lazy chunks — they are NOT in the DOM on mount.
    // Resolving them once would pin the active link to the last eager section
    // (about) forever, so the list is refreshed whenever the DOM grows.
    let sections = []
    let ticking = false

    const collect = () => {
      sections = NAV_SECTIONS
        .map((id) => document.getElementById(id))
        .filter(Boolean)
    }

    const update = () => {
      ticking = false
      const line = window.innerHeight * 0.35 // detection line near upper third
      const lock = lockRef.current
      if (lock) {
        const target = document.getElementById(lock.id)
        // scrollIntoView parks the target's top at the viewport top, so "arrived"
        // means top ~= 0. A short trailing section can never reach it — bottom counts too.
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
        const arrived = !target
          || atBottom
          || Math.abs(target.getBoundingClientRect().top) <= SETTLE_TOLERANCE

        if (arrived || Date.now() >= lock.until) {
          lockRef.current = null
        } else {
          setActiveSection(lock.id)
          return
        }
      }
      if (!sections.length) return

      let current = sections[0].id
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id
      }
      // Snap last section active when scrolled to bottom
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1].id
      }
      setActiveSection(current)
    }

    const schedule = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }

    collect()
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    // Lazy sections mount later — re-resolve ids and re-evaluate on arrival
    const mo = new MutationObserver(() => {
      if (sections.length === NAV_SECTIONS.length) return
      collect()
      schedule()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mo.disconnect()
    }
  }, [])

  const navLinks = [
    { id: 'home', label: t.home, href: '#home' },
    { id: 'about', label: t.about, href: '#about' },
    { id: 'projects', label: t.projects, href: '#projects' },
    { id: 'tech-stack', label: t.skills, href: '#tech-stack' },
    { id: 'testimonials', label: t.testimonials, href: '#testimonials' },
    { id: 'contact', label: t.contact, href: '#contact' },
  ]

  // Sliding pill that glides between links — follows hover, falls back to active
  const syncIndicator = useCallback(() => {
    const target = hoveredSection || activeSection
    const el = linkRefs.current[target]
    if (!el) return
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true })
  }, [hoveredSection, activeSection])

  useEffect(() => {
    syncIndicator()
    // The pill shell animates its own width/padding — measure again once it lands
    const settle = window.setTimeout(syncIndicator, 620)
    return () => window.clearTimeout(settle)
  }, [syncIndicator, lang, isScrolled])

  useEffect(() => {
    const onResize = () => syncIndicator()
    window.addEventListener('resize', onResize, { passive: true })
    if (document.fonts?.ready) document.fonts.ready.then(onResize).catch(() => {})
    return () => window.removeEventListener('resize', onResize)
  }, [syncIndicator])

  const handleNavClick = (event, href) => {
    event.preventDefault()
    const id = href.slice(1)
    lockRef.current = { id, until: Date.now() + CLICK_LOCK_MAX_MS }
    setActiveSection(id)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setIsMobileMenuOpen(false)
  }

  // Cursor-reactive pull on the pill controls (magnetic buttons)
  const handleMagnetMove = (event) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--mx', `${x * 5}px`)
    el.style.setProperty('--my', `${y * 5}px`)
  }
  const handleMagnetLeave = (event) => {
    event.currentTarget.style.setProperty('--mx', '0px')
    event.currentTarget.style.setProperty('--my', '0px')
  }

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50 flex justify-center items-center px-4
        transition-[top] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
        ${isScrolled ? 'top-4' : 'top-0'}
      `}
    >
      <nav
        className={`
          navbar-shell flex items-center justify-between w-full
          ${isScrolled
            ? 'is-floating max-w-4xl rounded-full border border-card-border bg-surface/82 backdrop-blur-2xl px-5 py-2.5 shadow-[0_12px_46px_rgba(0,0,0,0.34)]'
            : 'max-w-6xl border-b border-border/20 bg-transparent px-4 py-5 md:px-8'
          }
        `}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, '#home')}
          onMouseMove={handleMagnetMove}
          onMouseLeave={handleMagnetLeave}
          className="navbar-brand magnetic group flex items-center gap-2 font-mono font-bold tracking-tight text-sm text-text cursor-pointer"
        >
          <img src={logoNoBg} alt="Barzz Logo" width="24" height="24" decoding="async" className="w-6 h-6 object-contain brand-logo" />
          <span className="navbar-brand-text">BARZZ<span className="text-muted transition-colors duration-300 group-hover:text-text">.LY</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <div
          className="navbar-links hidden md:flex relative items-center gap-2 lg:gap-3"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {/* Gliding highlight — one element that travels instead of six that fade */}
          <span
            aria-hidden="true"
            className="navbar-indicator"
            style={{
              transform: `translate3d(${indicator.left}px, 0, 0)`,
              width: `${indicator.width}px`,
              opacity: indicator.ready ? 1 : 0,
            }}
          />
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                ref={(node) => { linkRefs.current[link.id] = node }}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                onMouseEnter={() => setHoveredSection(link.id)}
                onFocus={() => setHoveredSection(link.id)}
                onBlur={() => setHoveredSection(null)}
                aria-current={isActive ? 'true' : undefined}
                className={`navbar-link relative z-10 rounded-full px-2.5 py-2 font-mono text-[10px] lg:text-[11px] tracking-[0.08em] lg:tracking-[0.1em] uppercase font-medium ${isActive ? 'is-active text-text' : 'text-muted'}`}
              >
                <span className="navbar-link-label">{link.label}</span>
              </a>
            )
          })}
        </div>

        {/* Right Action Area */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
            className="navbar-action font-mono text-[10px] font-semibold px-3 py-2 rounded-xl border border-border bg-surface/40 text-muted cursor-pointer tracking-widest"
            aria-label="Toggle language"
          >
            <span key={lang} className="navbar-action-flip inline-block">{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={(event) => toggleTheme(event)}
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
            className="navbar-action navbar-theme p-2 rounded-xl border border-border bg-surface/40 text-muted cursor-pointer"
            aria-label="Toggle theme"
          >
            <span key={isDark ? 'dark' : 'light'} className="navbar-icon-swap block">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </span>
          </button>
        </div>

        {/* Mobile Navbar Buttons */}
        <div className="flex items-center gap-2.5 md:hidden">
          {/* Language Toggle for Mobile */}
          <button
            onClick={toggleLang}
            className="font-mono text-[10px] font-semibold px-2.5 py-2 rounded-xl border border-border bg-surface/40 transition-transform duration-200 active:scale-90 cursor-pointer text-text"
            aria-label="Toggle language"
          >
            {lang.toUpperCase()}
          </button>

          {/* Theme Toggle for Mobile */}
          <button
            onClick={(event) => toggleTheme(event)}
            className="p-2 rounded-xl border border-border bg-surface/40 transition-transform duration-200 active:scale-90 cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="navbar-burger p-2 rounded-xl border border-border bg-surface/40 transition-transform duration-200 active:scale-90 text-text cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span key={isMobileMenuOpen ? 'x' : 'menu'} className="navbar-icon-swap block">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </span>
          </button>
        </div>
        {/* Scroll progress bar — hairline under the pill when scrolled */}
        <div
          className={`pointer-events-none absolute inset-x-8 -bottom-px h-[2px] overflow-hidden rounded-full transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          <div
            className="h-full origin-left rounded-full bg-gradient-to-r from-text/40 via-text to-text/40"
            style={{ transform: `scaleX(${scrollProgress})`, transition: 'transform 0.1s linear' }}
          />
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`
          navbar-drawer fixed inset-x-0 top-[72px] mx-4 rounded-2xl border border-card-border bg-surface/95 backdrop-blur-3xl p-6 shadow-2xl md:hidden z-40
          ${isMobileMenuOpen ? 'is-open' : ''}
        `}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              style={{ transitionDelay: isMobileMenuOpen ? `${60 + index * 45}ms` : '0ms' }}
              className={`navbar-drawer-link font-sans font-bold text-base tracking-wide py-2 border-b border-border/20 ${activeSection === link.id ? 'is-active text-text' : 'text-text/80'}`}
            >
              <span>{link.label}</span>
            </a>
          ))}

        </div>
      </div>
    </header>
  )
}
