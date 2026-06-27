import { useEffect } from 'react'

export function useScrollReveal(dependency) {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // trigger slightly before entry
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          // Unobserve to run animation only once
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Select all elements that want reveal styling
    const elements = document.querySelectorAll('.reveal-element')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [dependency]) // Re-run when dependencies change (e.g., loaded mock data)
}
