import { useEffect, useState } from 'react'

export function GlowGrid() {
  const totalCells = 80
  const staticFilledCells = [3, 12, 19, 28, 35, 47, 54, 62, 71, 78] // Aligned abstract boxes to fill 80 cells

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
    }, 6000) // change every 6 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="absolute inset-x-0 top-0 h-[850px] -z-20 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-[1px] opacity-100 pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to bottom, black 35%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 35%, transparent 100%)'
      }}
    >
      {Array.from({ length: totalCells }).map((_, i) => {
        const isActive = activeCells.includes(i)
        const isStaticFilled = staticFilledCells.includes(i)

        return (
          <div 
            key={i} 
            className={`
              aspect-square transition-all duration-[2000ms] border-[0.5px]
              ${isActive 
                ? 'bg-gradient-to-br from-primary/12 to-secondary/6 border-primary/45 shadow-[inset_0_0_20px_rgba(0,255,136,0.15)]' 
                : isStaticFilled 
                ? 'bg-grid-fill border-grid-line' 
                : 'bg-transparent border-grid-line'
              }
            `}
          />
        )
      })}
    </div>
  )
}
