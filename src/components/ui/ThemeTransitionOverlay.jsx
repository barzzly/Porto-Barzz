import { useEffect, useRef } from 'react'

export function ThemeTransitionOverlay({ isTransitioning, targetTheme, onComplete }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!isTransitioning) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    // Set canvas dimensions to viewport
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const isDarkTarget = targetTheme === 'dark'
    // Pure black flame (#0a0a0c) for dark mode | Pure white flame (#ffffff) for light mode
    const flameColor = isDarkTarget ? '#0a0a0c' : '#ffffff'

    const startTime = performance.now()
    const duration = 850 // 850ms fluid flame sweep

    const render = (now) => {
      const elapsed = now - startTime
      const currentProgress = Math.min(elapsed / duration, 1)

      ctx.clearRect(0, 0, width, height)

      // Calculate rising & receding flame curtain height
      // Progress 0 -> 0.5: flames rise from bottom up to top (covering screen)
      // Progress 0.5 -> 1.0: flames recede upward off the top
      let coverage
      if (currentProgress <= 0.5) {
        const p = currentProgress / 0.5
        coverage = p * p * (3 - 2 * p) // smoothstep rise
      } else {
        const p = (currentProgress - 0.5) / 0.5
        coverage = 1 - p * p // acceleration exit
      }

      const curtainY = height * (1 - coverage * 1.2)

      // Draw 3 layered organic liquid flame paths with distinct tendril spikes
      const layers = [
        { color: flameColor, opacity: 0.75, offsetH: 140, frequency: 1.1, speed: 10 },
        { color: flameColor, opacity: 0.9, offsetH: 80, frequency: 1.5, speed: 14 },
        { color: flameColor, opacity: 1.0, offsetH: 0, frequency: 1.8, speed: 18 },
      ]

      layers.forEach((layer) => {
        ctx.save()
        ctx.globalAlpha = layer.opacity
        ctx.fillStyle = layer.color
        ctx.beginPath()

        // Anchor at bottom of viewport
        ctx.moveTo(-50, height + 100)
        ctx.lineTo(width + 50, height + 100)

        // Draw organic liquid flame spikes across screen width
        const numSegments = 24
        const segmentWidth = (width + 100) / numSegments

        ctx.lineTo(width + 50, curtainY + layer.offsetH)

        for (let i = numSegments; i >= 0; i--) {
          const x = i * segmentWidth - 50
          const timeOffset = currentProgress * layer.speed
          // Sinusoidal organic flame tendril heights & liquid drip curls
          const spike1 = Math.sin(i * layer.frequency + timeOffset) * 90
          const spike2 = Math.cos(i * 0.7 - timeOffset * 0.8) * 60
          const spike3 = (i % 3 === 0 ? 110 : i % 2 === 0 ? -70 : 40)

          const tendrilY = curtainY + layer.offsetH + spike1 + spike2 + spike3

          // Bezier control points for smooth fluid liquid curves (matching reference photo)
          const cp1x = x + segmentWidth * 0.6
          const cp1y = tendrilY - 80
          const cp2x = x + segmentWidth * 0.3
          const cp2y = tendrilY + 60

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, tendrilY)
        }

        ctx.closePath()
        ctx.fill()
        ctx.restore()
      })

      if (currentProgress < 1) {
        animRef.current = requestAnimationFrame(render)
      } else {
        if (onComplete) onComplete()
      }
    }

    animRef.current = requestAnimationFrame(render)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [isTransitioning, targetTheme, onComplete])

  if (!isTransitioning) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none select-none w-full h-full"
    />
  )
}
