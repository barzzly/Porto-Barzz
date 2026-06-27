import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('porto-theme')
    if (savedTheme) return savedTheme

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

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

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme, isDark: theme === 'dark' }
}
