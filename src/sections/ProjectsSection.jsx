import { useState } from 'react'
import { projects } from '../data/projects'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Github } from '../components/ui/BrandIcons'
import { ExternalLink, Filter } from 'lucide-react'

export function ProjectsSection({ t }) {
  const [filter, setFilter] = useState('all')

  // Get all unique tags from projects
  const allTags = ['all', ...new Set(projects.flatMap(p => p.tags))]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.tags.includes(filter))

  return (
    <section 
      id="projects" 
      className="max-w-6xl mx-auto px-6 py-20 w-full"
    >
      {/* Section Header */}
      <div className="reveal-up flex flex-col items-center md:items-start mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-widest mb-2">{t.badge}</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text tracking-tighter">
              {t.heading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t.headingAccent}</span>
            </h2>
            <div className="w-12 h-[2px] bg-primary mt-4" />
          </div>

          {/* Project Filters */}
          <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0 font-mono text-xs">
            <Filter className="w-3.5 h-3.5 text-muted mr-1" />
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`
                  px-3 py-1.5 rounded-lg border transition-all cursor-pointer
                  ${filter === tag 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-border bg-surface/30 text-text/80 hover:border-primary/45 hover:text-primary'
                  }
                `}
              >
                {tag === 'all' ? t.filterAll.toLowerCase() : tag.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => {
          const localItem = t.items.find(item => item.id === project.id)
          const title = localItem ? localItem.title : project.title
          const description = localItem ? localItem.description : project.description

          return (
            <Card 
              key={project.id}
              className="reveal-scale flex flex-col h-full bg-surface/40 overflow-hidden"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image Wrapper */}
              <div className="relative aspect-video overflow-hidden rounded-xl border border-border/30 bg-black/20 group mb-5">
                <img 
                  src={project.image} 
                  alt={title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:filter group-hover:brightness-95"
                  loading="lazy"
                />
                {/* Visual Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-60 transition-opacity" />
              </div>

              {/* Title & Description */}
              <h3 className="font-mono text-base font-bold text-text mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-6 flex-grow">
                {description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="glass" className="text-[10px] py-0.5 px-2 bg-surface border-border/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-border/30">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="ghost" className="w-full text-xs py-2 h-9 border border-border hover:border-primary/45">
                    <Github className="w-4 h-4 mr-1.5" /> {t.source}
                  </Button>
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="secondary" className="w-full text-xs py-2 h-9">
                    {t.demo} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </a>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
