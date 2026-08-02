import { useEffect, useState, useRef } from 'react'

const CELL = 96
const MOBILE_QUERY = '(max-width: 767px)'

export function GlowGrid({ contained = false }) {
  const [grid, setGrid] = useState({ cols: 16, rows: 10, total: 160 })
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY)
    const sync = () => setIsMobile(query.matches)

    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const calc = () => {
      const cols = Math.ceil(window.innerWidth / CELL) + 1
      const rows = Math.ceil(window.innerHeight / CELL) + 1
      setGrid({ cols, rows, total: cols * rows })
    }

    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [isMobile])

  const [isLight, setIsLight] = useState(() => document.documentElement.classList.contains('light'))

  // Cell DOM nodes tracked by ref so the pulse never re-renders React
  const cellRefs = useRef([])
  const activeRef = useRef(new Set())

  // Drop stale refs/active indices when the grid count changes
  useEffect(() => {
    cellRefs.current.length = grid.total
    activeRef.current = new Set()
  }, [grid.total])

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsLight(document.documentElement.classList.contains('light'))
    )
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const orbRef = useRef(null)
  useEffect(() => {
    if (isMobile) return undefined

    const moveOrb = (x, y) => {
      if (!orbRef.current) return
      orbRef.current.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`
      orbRef.current.style.opacity = isLight ? '0.62' : '0.78'
    }

    moveOrb(window.innerWidth / 2, window.innerHeight / 2)

    // Coalesce pointer events to one style write per frame (rAF)
    let rafId = 0
    let pendingX = 0
    let pendingY = 0
    const flush = () => {
      rafId = 0
      moveOrb(pendingX, pendingY)
    }
    const schedule = (event) => {
      pendingX = event.clientX
      pendingY = event.clientY
      if (!rafId) rafId = requestAnimationFrame(flush)
    }

    const handlePointerLeave = () => {
      if (orbRef.current) orbRef.current.style.opacity = isLight ? '0.38' : '0.46'
    }

    window.addEventListener('pointermove', schedule, { passive: true })
    window.addEventListener('pointerenter', schedule, { passive: true })
    document.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', schedule)
      window.removeEventListener('pointerenter', schedule)
      document.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [isMobile, isLight])

  const GAP = isLight ? '#aaa9a3' : '#1e1e1e'
  const BASE = isLight ? '#f5f4f0' : '#0a0a0a'
  const ACTIVE = isLight ? '#c5c3bc' : '#252525'

  // Pulse random cells via direct DOM writes — no React reconcile of 200 nodes
  useEffect(() => {
    if (isMobile) return undefined

    const paint = () => {
      const nodes = cellRefs.current
      if (!nodes.length) return
      const next = new Set()
      const count = Math.floor(Math.random() * 14) + 8
      while (next.size < count) next.add(Math.floor(Math.random() * nodes.length))

      activeRef.current.forEach((i) => {
        const el = nodes[i]
        if (el && !next.has(i)) {
          el.style.backgroundColor = BASE
          el.style.transition = 'background-color 1000ms ease'
        }
      })
      next.forEach((i) => {
        const el = nodes[i]
        if (el) {
          el.style.backgroundColor = ACTIVE
          el.style.transition = 'background-color 300ms ease'
        }
      })
      activeRef.current = next
    }

    paint()
    const id = setInterval(paint, 2600)
    return () => clearInterval(id)
  }, [isMobile, BASE, ACTIVE])

  if (isMobile) {
    return (
      <div
        style={{
          position: contained ? 'absolute' : 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundColor: BASE,
          backgroundImage: `linear-gradient(${GAP} 1px, transparent 1px), linear-gradient(90deg, ${GAP} 1px, transparent 1px), radial-gradient(circle at 50% 10%, ${ACTIVE}, transparent 58%)`,
          backgroundSize: '72px 72px, 72px 72px, 100% 100%',
          opacity: isLight ? 0.78 : 0.92,
        }}
      />
    )
  }

  return (
    <>
      <div ref={orbRef} style={{
        position: contained ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        width: 520,
        height: 520,
        borderRadius: '50%',
        background: isLight
          ? 'radial-gradient(circle, rgba(0,0,0,0.13) 0%, rgba(0,0,0,0.075) 24%, rgba(0,0,0,0.035) 45%, transparent 72%)'
          : 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.065) 25%, rgba(255,255,255,0.026) 48%, transparent 74%)',
        filter: 'blur(10px)',
        opacity: isLight ? 0.62 : 0.78,
        mixBlendMode: isLight ? 'multiply' : 'screen',
        pointerEvents: 'none',
        zIndex: 1,
        transform: 'translate3d(calc(50vw - 260px), calc(50vh - 260px), 0)',
        transition: 'transform 0.14s ease-out, opacity 0.3s ease, background 0.3s ease',
        willChange: 'transform',
      }}/>

      <div style={{
        position: contained ? 'absolute' : 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: GAP,
        display: 'grid',
        gridTemplateColumns: `repeat(${grid.cols},${CELL}px)`,
        gridTemplateRows: `repeat(${grid.rows},${CELL}px)`,
        gap: '1.5px',
      }}>
        {Array.from({ length: grid.total }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { cellRefs.current[i] = el }}
            style={{
              width: CELL,
              height: CELL,
              backgroundColor: BASE,
              transition: 'background-color 1000ms ease',
            }}
          />
        ))}
      </div>
    </>
  )
}
