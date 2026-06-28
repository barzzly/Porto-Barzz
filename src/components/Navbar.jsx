import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import logoNoBg from '../assets/images/Logo_No_Backround.png'

export function Navbar({ isDark, toggleTheme, lang, toggleLang, t }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
          <img src={logoNoBg} alt="Barzz Logo" className="w-6 h-6 object-contain brand-logo" />
          <span>BARZZ<span className="text-muted">.LY</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              onClick={(event) => handleNavClick(event, link.href)}
              className="navbar-link rounded-full px-2.5 py-2 font-mono text-[10px] lg:text-[11px] tracking-[0.08em] lg:tracking-[0.1em] uppercase font-medium text-muted transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
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
