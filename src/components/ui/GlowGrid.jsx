import { useEffect, useState } from 'react'

export function GlowGrid() {
  const totalCells = 48
  const getRandomCells = () => {
    const count = Math.floor(Math.random() * 6) + 4 // 4 to 10 active cells
    const indices = []
    for (let i = 0; i < count; i++) {
      indices.push(Math.floor(Math.random() * totalCells))
    }
    return indices
  }

  const [activeCells, setActiveCells] = useState(() => getRandomCells())

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCells(getRandomCells())
    }, 5000) // change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 -z-20 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-[1.5px] opacity-40 pointer-events-none">
      {Array.from({ length: 96 }).map((_, i) => {
        const isActive = activeCells.includes(i % 48)
        return (
          <div 
            key={i} 
            className={`
              aspect-square transition-all duration-[2000ms] border-[0.5px] border-border/10
              ${isActive ? 'bg-primary/5 shadow-[inset_0_0_15px_rgba(0,255,136,0.08)] border-primary/25' : 'bg-transparent'}
            `}
          />
        )
      })}
    </div>
  )
}
