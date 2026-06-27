import { skillCategories } from '../data/skills'
import { Card } from '../components/ui/Card'
import { Code2, Settings, Terminal } from 'lucide-react'

export function SkillsSection() {
  const marqueeTech = [
    "React", "Tailwind CSS", "Vite", "Node.js", "Express", "TypeScript", 
    "PostgreSQL", "Docker", "Git", "GitHub", "REST APIs", "GraphQL", 
    "MongoDB", "WebSockets", "Next.js", "JavaScript"
  ]

  // Double the list to make the loop seamless
  const marqueeList = [...marqueeTech, ...marqueeTech]

  const getCategoryIcon = (title) => {
    if (title.includes("Frontend")) return <Code2 className="w-5 h-5 text-primary" />
    if (title.includes("Backend")) return <Terminal className="w-5 h-5 text-secondary" />
    return <Settings className="w-5 h-5 text-primary" />
  }

  return (
    <section 
      id="tech-stack" 
      className="max-w-6xl mx-auto px-6 py-20 w-full overflow-hidden"
    >
      {/* Section Header */}
      <div className="reveal-element flex flex-col items-center md:items-start mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-widest mb-2">// 03. CAPABILITIES</span>
        <h2 className="font-mono font-bold text-3xl md:text-4xl text-text">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Stack</span>
        </h2>
        <div className="w-12 h-[2px] bg-primary mt-4" />
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="reveal-element relative w-full mb-16 py-4 border-y border-border/20 bg-surface/20 backdrop-blur-sm overflow-hidden rounded-xl">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee gap-8">
          {marqueeList.map((tech, index) => (
            <span 
              key={index} 
              className="font-mono font-semibold text-sm md:text-base text-text/70 hover:text-primary transition-colors select-none tracking-wider px-4 flex items-center gap-2"
            >
              <span className="text-primary font-bold">&lt;</span>
              {tech}
              <span className="text-primary font-bold">/&gt;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, catIndex) => (
          <Card 
            key={catIndex} 
            className="reveal-element bg-surface/30 border-border/40 hover:border-primary/45 flex flex-col h-full"
            style={{ transitionDelay: `${catIndex * 100}ms` }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/20">
              {getCategoryIcon(category.title)}
              <h3 className="font-mono text-base font-bold text-text">
                {category.title}
              </h3>
            </div>

            {/* List of Skills */}
            <div className="flex flex-col gap-5 flex-grow">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-text/90 font-medium">{skill.name}</span>
                    <span className="text-muted">{skill.level}</span>
                  </div>
                  {/* Progress Bar Container */}
                  <div className="w-full h-1.5 bg-border/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                      style={{ width: skill.level }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
