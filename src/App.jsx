import { useState, lazy, Suspense } from 'react'
import { useTheme } from './hooks/useTheme'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useMobileTapHover } from './hooks/useMobileTapHover'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { GlowGrid } from './components/ui/GlowGrid'
import { translations } from './data/translations'

// Below-the-fold sections split into async chunks — loaded as user scrolls
const ProjectsSection = lazy(() =>
  import('./sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection })))
const SkillsSection = lazy(() =>
  import('./sections/SkillsSection').then((m) => ({ default: m.SkillsSection })))
const TestimonialsSection = lazy(() =>
  import('./sections/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection })))
const ContactSection = lazy(() =>
  import('./sections/ContactSection').then((m) => ({ default: m.ContactSection })))

function App() {
  const { toggleTheme, isDark } = useTheme()
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('porto-lang') || 'en'
  })

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'id' : 'en'
    const applyLanguage = () => {
      setLang(nextLang)
      localStorage.setItem('porto-lang', nextLang)
    }

    if (document.startViewTransition) {
      document.startViewTransition(applyLanguage)
      return
    }

    applyLanguage()
  }

  // Register scroll reveal animation handler globally on layout mount
  useScrollReveal(lang) // re-trigger on language switch to update positions
  useMobileTapHover()

  const t = translations[lang]

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300 relative overflow-x-hidden">

      {/* Grid background — z-index 0, behind everything */}
      <div className="absolute inset-x-0 top-0 h-[112svh] overflow-hidden" style={{ zIndex: 0 }}>
        <GlowGrid contained />
        <div className="absolute inset-x-0 bottom-0 h-[38svh] bg-gradient-to-b from-transparent via-bg/85 to-bg" />
      </div>

      {/* Navigation Bar — z-index 50 */}
      <Navbar 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        lang={lang} 
        toggleLang={toggleLang} 
        t={t.nav} 
      />

      {/* Main Sections — z-index 10, above grid */}
      <main className="flex flex-col relative" style={{ zIndex: 10 }}>
        <HeroSection t={t.hero} />
        <AboutSection t={t.about} />
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <ProjectsSection t={t.projects} />
          <SkillsSection t={t.skills} />
          <TestimonialsSection t={t.testimonials} />
          <ContactSection t={t.contact} />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer t={t.footer} />
    </div>
  )
}

export default App
