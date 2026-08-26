import { useState, useEffect, useCallback } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('porto-theme')
    if (savedTheme) return savedTheme

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove both classes to avoid conflicts
    root.classList.remove('light', 'dark')
    root.classList.remove('theme-light', 'theme-dark')
    
    // Add correct class
    root.classList.add(theme)
    // Add theme-xxx class for double safety as defined in variables
    root.classList.add(`theme-${theme}`)
    
    localStorage.setItem('porto-theme', theme)
  }, [theme])

  const toggleTheme = useCallback((event) => {
    if (event && event.clientX !== undefined) {
      setClickPos({ x: event.clientX, y: event.clientY })
    } else {
      setClickPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    }

    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setIsTransitioning(true)

    // Switch theme DOM halfway through liquid overlay animation (400ms)
    setTimeout(() => {
      setTheme(nextTheme)
    }, 380)
  }, [theme])

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isTransitioning,
    clickPos,
    handleTransitionComplete,
  }
}

