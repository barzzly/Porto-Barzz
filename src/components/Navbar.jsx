import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import logoNoBg from '../assets/images/Logo_No_Backround.png'

const NAV_SECTIONS = ['home', 'about', 'projects', 'tech-stack', 'testimonials', 'contact']

export function Navbar({ isDark, toggleTheme, lang, toggleLang, t }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)

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
    const sections = NAV_SECTIONS
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return undefined

    let ticking = false

    const update = () => {
      ticking = false
      const line = window.innerHeight * 0.35 // detection line near upper third
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

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const navLinks = [
    { label: t.home, href: '#home' },
    { label: t.about, href: '#about' },
    { label: t.projects, href: '#projects' },
    { label: t.skills, href: '#tech-stack' },
    { label: t.testimonials, href: '#testimonials' },
    { label: t.contact, href: '#contact' },
  ]

  const handleNavClick = (event, href) => {
    event.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setIsMobileMenuOpen(false)
  }

  return (
    <header 
      className={`
        fixed inset-x-0 top-0 z-50 flex justify-center items-center px-4 transition-all duration-500
        ${isScrolled ? 'top-4' : 'top-0'}
      `}
    >
      <nav 
        className={`
          flex items-center justify-between w-full transition-all duration-500
          ${isScrolled 
            ? 'max-w-4xl rounded-full border border-card-border bg-surface/82 backdrop-blur-2xl px-5 py-2.5 shadow-[0_12px_46px_rgba(0,0,0,0.34)]' 
            : 'max-w-6xl border-b border-border/20 bg-transparent px-4 py-5 md:px-8'
          }
        `}
      >
        {/* Logo */}
        <a href="#home" onClick={(event) => handleNavClick(event, '#home')} className="navbar-brand flex items-center gap-2 font-mono font-bold tracking-tight text-sm text-text transition-all duration-300 group">
          <img src={logoNoBg} alt="Barzz Logo" width="24" height="24" decoding="async" className="w-6 h-6 object-contain brand-logo" />
          <span>BARZZ<span className="text-muted">.LY</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                aria-current={isActive ? 'true' : undefined}
                className={`navbar-link rounded-full px-2.5 py-2 font-mono text-[10px] lg:text-[11px] tracking-[0.08em] lg:tracking-[0.1em] uppercase font-medium transition-colors duration-200 ${isActive ? 'is-active text-text' : 'text-muted'}`}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Right Action Area */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Language Toggle */}
          <button 
            onClick={toggleLang}
            className="navbar-action font-mono text-[10px] font-semibold px-3 py-2 rounded-xl border border-border bg-surface/40 text-muted transition-all duration-200 cursor-pointer tracking-widest"
            aria-label="Toggle language"
          >
            {lang.toUpperCase()}
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="navbar-action p-2 rounded-xl border border-border bg-surface/40 text-muted transition-all duration-200 cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Navbar Buttons */}
        <div className="flex items-center gap-2.5 md:hidden">
          {/* Language Toggle for Mobile */}
          <button 
            onClick={toggleLang}
            className="font-mono text-[10px] font-semibold px-2.5 py-2 rounded-xl border border-border bg-surface/40 hover:border-primary/45 transition-all cursor-pointer text-text"
            aria-label="Toggle language"
          >
            {lang.toUpperCase()}
          </button>

          {/* Theme Toggle for Mobile */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border bg-surface/40 hover:border-primary/45 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl border border-border bg-surface/40 hover:border-primary/45 transition-all text-text cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
          fixed inset-x-0 top-[72px] mx-4 rounded-2xl border border-card-border bg-surface/95 backdrop-blur-3xl p-6 shadow-2xl transition-all duration-300 md:hidden z-40
          ${isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }
        `}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              onClick={(event) => handleNavClick(event, link.href)}
              className="font-sans font-bold text-base tracking-wide text-text/80 hover:text-primary transition-colors py-2 border-b border-border/20"
            >
              {link.label}
            </a>
          ))}

        </div>
      </div>
    </header>
  )
}
