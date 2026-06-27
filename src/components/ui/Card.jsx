import { useRef } from 'react'

export function Card({ 
  children, 
  className = '', 
  hoverable = true,
  tilt = false,
  glowColor = 'primary',
  ...props 
}) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!hoverable || !tilt) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`
    // Move glow
    const glowEl = card.querySelector('.card-glow-spot')
    if (glowEl) {
      glowEl.style.left = `${x}px`
      glowEl.style.top = `${y}px`
      glowEl.style.opacity = '1'
    }
  }

  const handleMouseLeave = () => {
    if (!hoverable || !tilt) return
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    const glowEl = card.querySelector('.card-glow-spot')
    if (glowEl) glowEl.style.opacity = '0'
  }

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden rounded-2xl border border-card-border bg-surface 
        backdrop-blur-xl p-6 shadow-lg
        ${hoverable ? 'cursor-pointer group' : ''}
        ${hoverable && !tilt ? 'transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:border-primary/45' : ''}
        ${tilt ? 'tilt-card' : ''}
        ${className}
      `}
      style={{ willChange: 'transform', transition: tilt ? 'box-shadow 0.3s ease, border-color 0.3s ease' : undefined }}
      {...props}
    >
      {/* Reflection line top */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />
      
      {/* Shimmer sweep on hover */}
      {hoverable && (
        <div className="card-shimmer absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      )}

      {/* Cursor glow spot */}
      {tilt && (
        <div 
          className="card-glow-spot absolute w-40 h-40 rounded-full pointer-events-none opacity-0 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ background: glowColor === 'secondary' 
            ? 'radial-gradient(circle, rgba(255,77,109,0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(232,232,232,0.12) 0%, transparent 70%)' 
          }}
        />
      )}

      {/* Card inner border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{ boxShadow: 'inset 0 0 30px rgba(232,232,232,0.04)' }} />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
