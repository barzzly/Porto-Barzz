import { useEffect, useState, useRef, useCallback } from 'react'

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

  const getRandomCells = useCallback(() => {
    const set = new Set()
    const count = Math.floor(Math.random() * 14) + 8
    while (set.size < count) set.add(Math.floor(Math.random() * grid.total))
    return set
  }, [grid.total])

  const [active, setActive] = useState(() => getRandomCells(160))
  const [isLight, setIsLight] = useState(() => document.documentElement.classList.contains('light'))

  useEffect(() => {
    if (isMobile) return

    const id = setInterval(() => setActive(getRandomCells()), 2600)
    return () => clearInterval(id)
  }, [getRandomCells, isMobile])

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsLight(document.documentElement.classList.contains('light'))
    )
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const orbRef = useRef(null)
  useEffect(() => {
    if (isMobile) return

    const fn = (e) => {
      if (orbRef.current)
        orbRef.current.style.transform = `translate(${e.clientX - 260}px,${e.clientY - 260}px)`
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [isMobile])

  const GAP = isLight ? '#aaa9a3' : '#1e1e1e'
  const BASE = isLight ? '#f5f4f0' : '#0a0a0a'
  const ACTIVE = isLight ? '#c5c3bc' : '#252525'

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
        transition: 'transform 0.18s ease-out, opacity 0.3s ease, background 0.3s ease',
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
          <div key={i} style={{
            width: CELL,
            height: CELL,
            backgroundColor: active.has(i) ? ACTIVE : BASE,
            transition: active.has(i) ? 'background-color 300ms ease' : 'background-color 1000ms ease',
          }}/>
        ))}
      </div>
    </>
  )
}
