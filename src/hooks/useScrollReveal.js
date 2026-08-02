import { useEffect } from 'react'

const REVEAL_SELECTOR = '.reveal-element, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale'
const MOBILE_QUERY = '(max-width: 767px)'

export function useScrollReveal(dependency) {
  useEffect(() => {
    const isMobile = window.matchMedia(MOBILE_QUERY).matches

    // Pull reveal elements out of a freshly-added subtree (lazy-loaded sections)
    const collect = (node, out) => {
      if (node.nodeType !== 1) return
      if (node.matches?.(REVEAL_SELECTOR)) out.push(node)
      node.querySelectorAll?.(REVEAL_SELECTOR).forEach((el) => out.push(el))
    }

    if (isMobile) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add('is-visible'))
      // Lazy sections mount after this runs — reveal them on arrival
      const mo = new MutationObserver((mutations) => {
        const added = []
        mutations.forEach((m) => m.addedNodes.forEach((n) => collect(n, added)))
        added.forEach((el) => el.classList.add('is-visible'))
      })
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.08 })

    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => observer.observe(el))

    // Observe reveal elements inside lazily-mounted sections too
    const mo = new MutationObserver((mutations) => {
      const added = []
      mutations.forEach((m) => m.addedNodes.forEach((n) => collect(n, added)))
      added.forEach((el) => observer.observe(el))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mo.disconnect()
    }
  }, [dependency])
}
