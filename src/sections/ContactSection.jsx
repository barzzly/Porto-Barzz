import { Card } from '../components/ui/Card'
import { Github, Discord } from '../components/ui/BrandIcons'
import { ExternalLink } from 'lucide-react'

export function ContactSection({ t }) {
  const contactLinks = [
    {
      label: 'GitHub',
      value: 'barzzly',
      href: 'https://github.com/barzzly/',
      Icon: Github,
    },
    {
      label: 'Discord',
      value: 'BarzzLy',
      href: 'https://discord.com/users/1189813545018347580',
      Icon: Discord,
    },
  ]

  return (
    <section 
      id="contact" 
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

      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
        <div className="reveal-left flex flex-col gap-4 text-center md:text-left">
          <h3 className="font-mono text-lg md:text-xl font-bold leading-8 text-text">
            {t.subheading}
          </h3>
          <p className="text-sm md:text-base text-muted leading-8 max-w-xl">
            {t.desc}
          </p>
        </div>

        <div className="reveal-right delay-150 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {contactLinks.map((item) => {
            const Icon = item.Icon

            return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <Card hoverable={true} className="contact-link-card h-full bg-surface/35 border-border/40 p-6">
                <Icon
                  aria-hidden="true"
                  className="contact-card-watermark pointer-events-none absolute -right-10 -bottom-11 z-0 h-40 w-40 -rotate-12 text-text/[0.04] transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:scale-105 group-hover:text-text/[0.075]"
                />

                <div className="relative z-10 flex h-full min-h-[170px] flex-col justify-between gap-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="contact-link-icon flex h-13 w-13 items-center justify-center rounded-2xl border border-border bg-text/[0.04]">
                      <Icon className="w-6 h-6 text-text/85" />
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
                  </div>

                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      {item.label}
                    </p>
                    <p className="mt-2 break-all font-mono text-sm md:text-base font-bold text-text">
                      {item.value}
                    </p>
                  </div>
                </div>
              </Card>
            </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}