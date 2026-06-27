import { useTheme } from './hooks/useTheme'
import { useScrollReveal } from './hooks/useScrollReveal'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { SkillsSection } from './sections/SkillsSection'
import { ContactSection } from './sections/ContactSection'

function App() {
  const { toggleTheme, isDark } = useTheme()
  
  // Register scroll reveal animation handler globally on layout mount
  useScrollReveal()

  return (
    <div className={`min-h-screen text-text bg-bg transition-colors duration-300 relative selection:bg-primary/20 selection:text-primary`}>
      {/* Interactive Neon-Green Matrix Cyber Background */}
      <div className="cyber-bg" />

      {/* Navigation Bar */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Sections */}
      <main className="flex flex-col relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer Details */}
      <Footer />
    </div>
  )
}

export default App
