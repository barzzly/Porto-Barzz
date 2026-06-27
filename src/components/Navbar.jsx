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
    { label: t.contact, href: '#contact' },
  ]

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
            ? 'max-w-3xl rounded-full border border-card-border bg-surface/75 backdrop-blur-2xl px-6 py-2.5 shadow-xl' 
            : 'max-w-6xl border-b border-border/30 bg-transparent px-4 py-5 md:px-8'
          }
        `}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 font-mono font-bold tracking-tight text-lg text-text hover:text-primary transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 group">
          <img src={logoNoBg} alt="Barzz Logo" className="w-6.5 h-6.5 object-contain transition-transform duration-300 group-hover:scale-105 brand-logo" />
          <span>BARZZ<span className="text-primary">.LY</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="font-mono text-sm text-text/80 hover:text-primary transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Action Area */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <button 
            onClick={toggleLang}
            className="font-mono text-xs font-semibold px-2.5 py-2.5 rounded-xl border border-border bg-surface/40 hover:border-primary/45 hover:text-primary transition-all duration-200 cursor-pointer"
            aria-label="Toggle language"
          >
            {lang.toUpperCase()}
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-border bg-surface/40 hover:border-primary/40 hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
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
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-base text-text/80 hover:text-primary transition-colors py-2 border-b border-border/20"
            >
              {link.label}
            </a>
          ))}

        </div>
      </div>
    </header>
  )
}
