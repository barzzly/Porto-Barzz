import { useEffect, useState, useRef, useCallback } from 'react'

const CELL = 96

export function GlowGrid({ contained = false }) {
  const [grid, setGrid] = useState({ cols: 16, rows: 10, total: 160 })

  useEffect(() => {
    const calc = () => {
      const cols = Math.ceil(window.innerWidth / CELL) + 1
      const rows = Math.ceil(window.innerHeight / CELL) + 1
      setGrid({ cols, rows, total: cols * rows })
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const getRandomCells = useCallback(() => {
    const set = new Set()
    const count = Math.floor(Math.random() * 14) + 8
    while (set.size < count) set.add(Math.floor(Math.random() * grid.total))
    return set
  }, [grid.total])

  const [active, setActive] = useState(() => new Set())
  const [isLight, setIsLight] = useState(() => document.documentElement.classList.contains('light'))

  useEffect(() => { setActive(getRandomCells()) }, [getRandomCells])
  useEffect(() => {
    const id = setInterval(() => setActive(getRandomCells()), 2000)
    return () => clearInterval(id)
  }, [getRandomCells])

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsLight(document.documentElement.classList.contains('light'))
    )
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const orbRef = useRef(null)
  useEffect(() => {
    const fn = (e) => {
      if (orbRef.current)
        orbRef.current.style.transform = `translate(${e.clientX - 200}px,${e.clientY - 200}px)`
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  const GAP    = isLight ? '#aaa9a3' : '#1e1e1e'
  const BASE   = isLight ? '#f5f4f0' : '#0a0a0a'
  const ACTIVE = isLight ? '#c5c3bc' : '#252525'

  return (
    <>
      <div ref={orbRef} style={{
        position: contained ? 'absolute' : 'fixed',
        top:0,left:0,width:400,height:400,borderRadius:'50%',
        background: isLight
          ? 'radial-gradient(circle,rgba(0,0,0,0.05) 0%,transparent 65%)'
          : 'radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 65%)',
        pointerEvents:'none',zIndex:1,
        transition:'transform 0.2s ease-out',willChange:'transform',
      }}/>

      <div style={{
        position: contained ? 'absolute' : 'fixed',
        inset:0,zIndex:0,pointerEvents:'none',
        backgroundColor: GAP,
        display:'grid',
        gridTemplateColumns:`repeat(${grid.cols},${CELL}px)`,
        gridTemplateRows:`repeat(${grid.rows},${CELL}px)`,
        gap:'1.5px',
      }}>
        {Array.from({length: grid.total}).map((_,i) => (
          <div key={i} style={{
            width:CELL, height:CELL,
            backgroundColor: active.has(i) ? ACTIVE : BASE,
            transition: active.has(i) ? 'background-color 300ms ease' : 'background-color 1000ms ease',
          }}/>
        ))}
      </div>
    </>
  )
}
