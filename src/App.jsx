import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { useScrollReveal } from './hooks/useScrollReveal'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { SkillsSection } from './sections/SkillsSection'
import { ContactSection } from './sections/ContactSection'
import { GlowGrid } from './components/ui/GlowGrid'
import { translations } from './data/translations'

function App() {
  const { toggleTheme, isDark } = useTheme()
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('porto-lang') || 'en'
  })

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'id' : 'en'
    setLang(nextLang)
    localStorage.setItem('porto-lang', nextLang)
  }

  // Register scroll reveal animation handler globally on layout mount
  useScrollReveal(lang) // re-trigger on language switch to update positions

  const t = translations[lang]

  return (
    <div className={`min-h-screen text-text bg-bg transition-colors duration-300 relative selection:bg-primary/20 selection:text-primary`}>

      {/* Interactive Neon-Green Matrix Cyber Background */}
      <div className="cyber-bg" />
      <GlowGrid />

      {/* Navigation Bar */}
      <Navbar 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        lang={lang} 
        toggleLang={toggleLang} 
        t={t.nav} 
      />

      {/* Main Sections */}
      <main className="flex flex-col relative z-10">
        <HeroSection t={t.hero} />
        <AboutSection t={t.about} />
        <ProjectsSection t={t.projects} />
        <SkillsSection t={t.skills} />
        <ContactSection t={t.contact} />
      </main>

      {/* Footer Details */}
      <Footer t={t.footer} />
    </div>
  )
}

export default App
