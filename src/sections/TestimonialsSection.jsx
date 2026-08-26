import { Quote, Star } from 'lucide-react'

function initialsFromName(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function TestimonialCard({ item }) {
  return (
    <article className="testimonial-card testimonial-slide-card w-[min(360px,84vw)] shrink-0 rounded-2xl border border-card-border bg-surface/35 p-5 shadow-lg backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="testimonial-avatar flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-text/[0.05] font-mono text-xs font-bold text-text">
            {initialsFromName(item.name)}
          </div>
          <div className="min-w-0">
            <h3 className="font-mono text-sm font-bold text-text leading-tight">{item.name}</h3>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.16em] text-muted leading-tight">{item.project}</p>
          </div>
        </div>
        <Quote className="testimonial-quote-icon h-5 w-5 shrink-0 text-text/35" />
      </div>

      <div className="testimonial-rating mt-4 inline-flex items-center gap-1 rounded-full border border-border/60 bg-text/[0.03] px-2.5 py-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-current text-text/70" strokeWidth={0} aria-hidden="true" />
        ))}
        <span className="sr-only">5 out of 5 stars</span>
      </div>

      <p className="mt-4 min-h-[7.5rem] text-sm leading-7 text-text/78">
        {item.text}
      </p>
    </article>
  )
}

export function TestimonialsSection({ t }) {
  const firstRow = t.items.filter((_, index) => index % 2 === 0)
  const secondRow = t.items.filter((_, index) => index % 2 === 1)
  const rows = [
    { items: [...firstRow, ...firstRow], reverse: false },
    { items: [...secondRow, ...secondRow], reverse: true },
  ]

  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-6 py-20 w-full overflow-hidden">
      <div className="reveal-up mb-12 flex flex-col items-center md:items-start">
        <span className="section-eyebrow font-mono text-xs text-primary uppercase tracking-widest mb-2">{t.badge}</span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-text tracking-tighter">
          {t.heading} <span className="title-accent text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">{t.headingAccent}</span>
        </h2>
        <div className="section-divider w-12 h-[2px] bg-primary mt-4" />
      </div>

      <div className="testimonial-marquee-wrap reveal-scale relative -mx-6 space-y-5 overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-bg to-transparent" />
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`testimonial-track flex w-max gap-5 px-6 ${row.reverse ? 'testimonial-track-reverse' : ''}`}
          >
            {row.items.map((item, index) => (
              <TestimonialCard key={`${item.name}-${rowIndex}-${index}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}