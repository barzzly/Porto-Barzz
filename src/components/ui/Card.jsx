import { useRef, useState, useSyncExternalStore } from 'react'

const TOUCH_QUERY = '(hover: none), (pointer: coarse)'

function subscribeToTouch(callback) {
  const query = window.matchMedia(TOUCH_QUERY)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

function getTouchSnapshot() {
  return window.matchMedia(TOUCH_QUERY).matches
}

function getServerSnapshot() {
  return true
}

export function Card({
  children,
  className = '',
  hoverable = true,
  tilt = false,
  glowColor = 'primary',
  ...props
}) {
  const cardRef = useRef(null)
  const tapTimeoutRef = useRef(null)
  const [isTapped, setIsTapped] = useState(false)
  const isTouch = useSyncExternalStore(subscribeToTouch, getTouchSnapshot, getServerSnapshot)
  const canTilt = hoverable && tilt && !isTouch

  const handleMouseEnter = () => {
    if (!canTilt) return
    const card = cardRef.current
    if (!card) return

    card.style.transition = 'transform 0.14s ease-out, box-shadow 0.42s ease, border-color 0.42s ease'
  }

  const handleMouseMove = (e) => {
    if (!canTilt) return
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -7
    const rotateY = ((x - centerX) / centerX) * 7

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`

    const glowEl = card.querySelector('.card-glow-spot')
    if (glowEl) {
      glowEl.style.left = `${x}px`
      glowEl.style.top = `${y}px`
      glowEl.style.opacity = '1'
    }
  }

  const handleTouchStart = () => {
    if (!hoverable || !isTouch) return
    window.clearTimeout(tapTimeoutRef.current)
    setIsTapped(true)
    tapTimeoutRef.current = window.setTimeout(() => setIsTapped(false), 1200)
  }

  const handleMouseLeave = () => {
    if (!canTilt) return
    const card = cardRef.current
    if (!card) return

    card.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.42s ease, border-color 0.42s ease'
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    const glowEl = card.querySelector('.card-glow-spot')
    if (glowEl) glowEl.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      className={`
        relative overflow-hidden rounded-2xl border border-card-border bg-surface
        backdrop-blur-xl p-6 shadow-lg
        ${hoverable ? 'cursor-pointer group mobile-card-press' : ''}
        ${isTapped ? 'is-tapped' : ''}
        ${hoverable && !tilt ? 'transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:border-primary/45' : ''}
        ${canTilt ? 'tilt-card' : ''}
        ${className}
      `}
      style={{ willChange: canTilt ? 'transform' : undefined, transition: canTilt ? 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.42s ease, border-color 0.42s ease' : undefined }}
      {...props}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />

      {hoverable && !isTouch && (
        <div className="card-shimmer absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      )}

      {canTilt && (
        <div
          className="card-glow-spot absolute w-40 h-40 rounded-full pointer-events-none opacity-0 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ background: glowColor === 'secondary'
            ? 'radial-gradient(circle, rgba(255,77,109,0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(232,232,232,0.12) 0%, transparent 70%)'
          }}
        />
      )}

      {!isTouch && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{ boxShadow: 'inset 0 0 30px rgba(232,232,232,0.04)' }}
        />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
