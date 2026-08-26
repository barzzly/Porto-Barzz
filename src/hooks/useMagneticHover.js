import { useEffect } from 'react'

// Elements opted in with .magnetic get a cursor-follow pull.
// One delegated pointermove for the whole page instead of a listener per node.
const MAGNET_SELECTOR = '.magnetic'
const HOVER_QUERY = '(hover: hover) and (pointer: fine)'
const STRENGTH = 6 // max px of travel

export function useMagneticHover() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    if (!window.matchMedia(HOVER_QUERY).matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let current = null
    let rafId = 0
    let pending = null

    const flush = () => {
      rafId = 0
      if (!current || !pending) return
      // Rect read once per frame, together with the write, to avoid layout thrash
      const rect = current.getBoundingClientRect()
      const x = (pending.x - rect.left) / rect.width - 0.5
      const y = (pending.y - rect.top) / rect.height - 0.5
      current.style.setProperty('--mx', `${(x * STRENGTH).toFixed(2)}px`)
      current.style.setProperty('--my', `${(y * STRENGTH).toFixed(2)}px`)
    }

    const reset = (el) => {
      if (!el) return
      el.style.setProperty('--mx', '0px')
      el.style.setProperty('--my', '0px')
    }

    const handleMove = (event) => {
      const target = event.target.closest?.(MAGNET_SELECTOR) || null

      if (target !== current) {
        reset(current)
        current = target
      }
      if (!current) return

      pending = { x: event.clientX, y: event.clientY }
      if (!rafId) rafId = requestAnimationFrame(flush)
    }

    const handleLeave = () => {
      reset(current)
      current = null
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerleave', handleLeave, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      reset(current)
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerleave', handleLeave)
    }
  }, [])
}
