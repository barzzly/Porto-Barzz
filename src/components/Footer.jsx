import { Github, Discord } from './ui/BrandIcons'
import { ArrowUp } from 'lucide-react'
import logoNoBg from '../assets/images/Logo_No_Backround.png'

export function Footer({ t }) {
  const footerLinks = [
    { label: t.links.about, href: '#about' },
    { label: t.links.projects, href: '#projects' },
    { label: t.links.skills, href: '#tech-stack' },
    { label: t.links.testimonials, href: '#testimonials' },
    { label: t.links.contact, href: '#contact' },
  ]

  const socialLinks = [
    { icon: <Github className="w-4.5 h-4.5" />, href: 'https://github.com/barzzly/', label: 'GitHub' },
    { icon: <Discord className="w-4.5 h-4.5" />, href: 'https://discord.com/users/1189813545018347580', label: 'Discord' },
  ]

  const scrollTo = (event, href) => {
    event.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  return (
    <footer className="w-full max-w-6xl mx-auto px-6 pb-10 pt-8 md:pb-12">
      <div className="footer-panel rounded-2xl border border-card-border bg-surface/25 px-5 py-6 backdrop-blur-xl md:px-7">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <button
              type="button"
              onClick={handleScrollTop}
              className="footer-brand mx-auto flex items-center justify-center gap-2 font-mono text-base font-bold tracking-tight text-text transition-all duration-300 md:mx-0"
            >
              <img src={logoNoBg} alt="Barzz Logo" width="22" height="22" decoding="async" className="h-5.5 w-5.5 object-contain brand-logo" />
              <span>BARZZ<span className="text-muted">.LY</span></span>
            </button>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
              {t.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => scrollTo(event, link.href)}
                className="footer-link rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-7 flex flex-col gap-5 border-t border-border/20 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:text-left">
            {t.copyright}
          </p>

          <div className="flex items-center justify-center gap-3 md:justify-end">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social magnetic flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-bg/20 text-text/80"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
            <button
              type="button"
              onClick={handleScrollTop}
              className="footer-social magnetic group flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-bg/20 text-text/80"
              aria-label={t.backToTop}
            >
              <ArrowUp className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}