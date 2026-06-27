import { Github, Linkedin, Twitter } from './ui/BrandIcons'
import { Mail, ArrowUp } from 'lucide-react'
import logoNoBg from '../assets/images/Logo_No_Backround.png'

export function Footer({ t }) {
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:hidayathulfikri.biz@gmail.com', label: 'Email' }
  ]

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full max-w-6xl mx-auto px-6 py-12 md:py-16">
      {/* Animated Pulse Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-12 animate-divider-pulse" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Branding & Tagline */}
        <div className="text-center md:text-left">
          <p className="font-mono font-bold text-lg text-text flex items-center justify-center md:justify-start gap-2 hover:scale-[1.02] hover:translate-x-0.5 transition-all duration-300">
            <img src={logoNoBg} alt="Barzz Logo" className="w-5.5 h-5.5 object-contain brand-logo" />
            <span>BARZZ<span className="text-primary">.LY</span></span>
          </p>
          <p className="text-sm text-muted mt-2">
            {t.tagline}
          </p>
        </div>

        {/* Middle: Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a 
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-border bg-surface/30 text-text/80 hover:text-primary hover:border-primary/45 hover:-translate-y-1 transition-all duration-200"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Right: Scroll to Top & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <button 
            onClick={handleScrollTop}
            className="group p-2.5 rounded-xl border border-border bg-surface/30 text-text/80 hover:text-primary hover:border-primary/45 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Porto Barzz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
