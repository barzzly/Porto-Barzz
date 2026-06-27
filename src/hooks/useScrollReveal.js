import { useEffect } from 'react'

const REVEAL_SELECTOR = '.reveal-element, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale'
const MOBILE_QUERY = '(max-width: 767px)'

export function useScrollReveal(dependency) {
  useEffect(() => {
    const elements = document.querySelectorAll(REVEAL_SELECTOR)
    const isMobile = window.matchMedia(MOBILE_QUERY).matches

    if (isMobile) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.08,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  }, [dependency])
}