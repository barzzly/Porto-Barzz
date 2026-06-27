import { useEffect } from 'react'

const TOUCH_QUERY = '(hover: none), (pointer: coarse)'
const TAP_SELECTOR = [
  '.mobile-card-press',
  '.about-info-card',
  '.testimonial-card',
  '.contact-link-card',
  '.skill-card',
  '.about-quality-card',
].join(', ')

const TAP_DURATION = 1200

export function useMobileTapHover() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const media = window.matchMedia(TOUCH_QUERY)
    const timers = new WeakMap()

    const handlePointerDown = (event) => {
      if (!media.matches && event.pointerType !== 'touch') return

      const card = event.target.closest(TAP_SELECTOR)
      if (!card) return

      window.clearTimeout(timers.get(card))
      card.classList.add('is-tapped')

      const timer = window.setTimeout(() => {
        card.classList.remove('is-tapped')
        timers.delete(card)
      }, TAP_DURATION)

      timers.set(card, timer)
    }

    document.addEventListener('pointerdown', handlePointerDown, { passive: true })

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])
}
