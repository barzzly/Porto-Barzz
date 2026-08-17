import { useEffect, useRef, useState } from 'react'
import { projects, tools } from '../data/projects'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Server, Users, ExternalLink, Copy } from 'lucide-react'

export function ProjectsSection({ t }) {
  const [serverStatus, setServerStatus] = useState({})
  const [copiedProjectId, setCopiedProjectId] = useState(null)
  const [shouldLoadStatus, setShouldLoadStatus] = useState(false)
  const [activeTab, setActiveTab] = useState('server')
  const sectionRef = useRef(null)
  const tiltAngles = ['-rotate-1', 'rotate-[0.5deg]', '-rotate-[0.8deg]', 'rotate-1', '-rotate-[0.4deg]', 'rotate-[1.2deg]']

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setShouldLoadStatus(true)
      observer.disconnect()
    }, { rootMargin: '420px 0px' })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoadStatus) return undefined
    let cancelled = false

    async function loadStatus(project) {
      if (project.status === 'eol') {
        return { id: project.id, state: 'eol' }
      }

      if (!project.statusAddress) {
        return { id: project.id, state: 'unknown' }
      }

      const endpoint = project.statusType === 'bedrock'
        ? `https://api.mcsrvstat.us/bedrock/3/${project.statusAddress}`
        : `https://api.mcsrvstat.us/3/${project.statusAddress}`

      try {
        const response = await fetch(endpoint)
        const data = await response.json()

        return {
          id: project.id,
          state: data.online ? 'online' : 'offline',
          online: data.players?.online ?? 0,
          max: data.players?.max,
        }
      } catch {
        return { id: project.id, state: 'offline' }
      }
    }

    Promise.all(projects.map(loadStatus)).then((statuses) => {
      if (cancelled) return
      setServerStatus(Object.fromEntries(statuses.map((item) => [item.id, item])))
    })

    return () => {
      cancelled = true
    }
  }, [shouldLoadStatus])

  const didMountTab = useRef(false)
  useEffect(() => {
    if (!didMountTab.current) {
      didMountTab.current = true
      return
    }
    const section = sectionRef.current
    if (!section) return
    section
      .querySelectorAll('.reveal-scale, .reveal-up')
      .forEach((el) => el.classList.add('is-visible'))
  }, [activeTab])

  const handleCopyIp = async (project) => {
    if (!project.joinIp) return

    try {
      await navigator.clipboard.writeText(project.joinIp)
      setCopiedProjectId(project.id)
      setTimeout(() => setCopiedProjectId(null), 1400)
    } catch {
      setCopiedProjectId(null)
    }
  }

  const getStatusText = (project) => {
    const status = serverStatus[project.id]

    if (project.status === 'eol' || status?.state === 'eol') return t.eolLabel
    if (!status) return t.loadingPlayers
    if (status.state !== 'online') return t.offlineLabel

    return `${status.online}`
  }

  const isOnline = (project) => serverStatus[project.id]?.state === 'online'

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="max-w-6xl mx-auto px-6 py-20 w-full"
    >
      <div className="reveal-up flex flex-col items-center md:items-start mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-widest mb-2">{t.badge}</span>
        <div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text tracking-tighter">
            {activeTab === 'tools' ? t.toolsHeading : t.heading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t.headingAccent}</span>
          </h2>
          <div className="w-12 h-[2px] bg-primary mt-4 animate-divider-pulse" />
        </div>

        <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-card-border bg-surface/50 p-1 font-mono text-xs backdrop-blur-md">
          {[
            { key: 'server', label: t.tabServer },
            { key: 'tools', label: t.tabTools },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-2 font-semibold uppercase tracking-widest transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-primary to-secondary text-bg shadow'
                  : 'text-muted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'tools' && tools.length === 0 ? (
        <div className="reveal-up flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-border/50 bg-surface/20 font-mono text-sm text-muted">
          {t.emptyTools}
        </div>
      ) : (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 items-start mx-auto ${
        activeTab === 'server'
          ? 'lg:grid-cols-4 lg:max-w-none'
          : 'lg:grid-cols-3 lg:max-w-5xl'
      }`}>
        {(activeTab === 'server' ? projects : tools).map((project, index, activeList) => {
          const isTools = activeTab === 'tools'
          const localItem = isTools
            ? t.toolItems?.find(item => item.id === project.id)
            : t.items.find(item => item.id === project.id)
          const title = localItem ? localItem.title : project.title
          const description = localItem ? localItem.description : project.description
          const role = localItem?.role || project.role
          const tiltClass = tiltAngles[index % tiltAngles.length]
          const isCopied = copiedProjectId === project.id
          const displayIp = project.joinIp ? project.joinIp.replace(/:\d+$/, '') : project.joinIp

          return (
            <div
              key={`${activeTab}-${project.id}`}
              className={`reveal-scale transition-transform duration-500 ${tiltClass} hover:rotate-0`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="animate-tab-card h-full"
                style={{ animationDelay: `${index * 90}ms` }}
              >
              <Card
                tilt={true}
                hoverable={true}
                className="flex h-full flex-col bg-surface/40 overflow-hidden"
              >
                <div className="relative aspect-video overflow-visible rounded-xl border border-border/30 bg-black/20 group-inner mb-6">
                  <div className="relative h-full overflow-hidden rounded-xl">
                    <img
                      src={project.image}
                      alt={title}
                      width="1280"
                      height="720"
                      className="w-full h-full object-cover brightness-95 saturate-110 contrast-105 transition-all duration-700 group-hover:scale-105 group-hover:brightness-105 group-hover:saturate-125"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-55" />
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)' }} />
                  </div>
                  {role && (
                    <div className="project-role-stamp absolute -left-3 -top-4 z-30 inline-flex items-center gap-2 rounded-full border border-card-border bg-surface/85 px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-text shadow-xl backdrop-blur-xl">
                      <span className="h-1.5 w-1.5 rounded-full bg-text/70" />
                      <span>{role}</span>
                    </div>
                  )}
                  <div className="absolute right-2.5 top-2.5 z-30 rounded-lg border border-card-border bg-bg/55 px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-text/80 backdrop-blur-md">
                    {String(index + 1).padStart(2, '0')}
                    <span className="text-text/35"> / {String(activeList.length).padStart(2, '0')}</span>
                  </div>
                </div>

                <h3 className="font-mono text-base font-bold text-text mb-3 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="project-description mb-4 min-h-[4.5rem] text-xs leading-relaxed text-muted">
                  {description}
                </p>

                <div className="mb-4 flex min-h-[2rem] flex-wrap content-start gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="glass" className="text-[10px] py-0.5 px-2 bg-surface border-border/50 hover:border-primary/30 hover:text-primary transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto border-t border-border/30 pt-3">
                  {isTools ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-card-border bg-surface/35 px-3 py-2 text-center font-mono text-xs font-semibold text-text transition-all duration-200 hover:border-primary/40 hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4 text-text/70" />
                      {t.openLabel}
                    </a>
                  ) : project.status === 'eol' ? (
                    <div className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface/35 px-3 py-2 text-center font-mono text-xs font-semibold text-text">
                      <Server className="h-4 w-4 text-text/70" />
                      {t.eolLabel}
                    </div>
                  ) : (
                    <div className="relative flex flex-col gap-2 font-mono">
                      {isCopied && (
                        <div className="copy-toast absolute -top-9 right-2 z-30 whitespace-nowrap rounded-full border border-card-border bg-surface/95 px-3 py-1.5 font-mono text-[10px] font-semibold text-text shadow-xl backdrop-blur-xl">
                          {t.copiedLabel}
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-2 text-[11px] text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            {isOnline(project) && (
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                            )}
                            <span className={`relative inline-flex h-2 w-2 rounded-full ${isOnline(project) ? 'bg-emerald-400' : 'bg-text/30'}`} />
                          </span>
                          <span className="uppercase tracking-widest">{isOnline(project) ? t.onlineLabel : t.offlineLabel}</span>
                        </span>
                        {isOnline(project) && (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-text">
                            <Users className="h-3.5 w-3.5 text-text/70" />
                            {getStatusText(project)}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyIp(project)}
                        className="group/ip flex min-h-11 w-full items-center gap-2.5 rounded-xl border border-card-border bg-surface/35 px-3 py-2 text-left transition-all duration-200 hover:border-primary/40 hover:bg-surface"
                        aria-label={`${t.copyLabel} ${project.joinIp}`}
                      >
                        <Server className="h-4 w-4 shrink-0 text-text/60 transition-colors group-hover/ip:text-primary" />
                        <span className="block min-w-0 flex-1 truncate text-xs font-semibold text-text">{displayIp}</span>
                        <Copy className="h-3.5 w-3.5 shrink-0 text-text/40 transition-colors group-hover/ip:text-primary" />
                      </button>
                    </div>
                  )}
                </div>
              </Card>
              </div>
            </div>
          )
        })}
      </div>
      )}
    </section>
  )
}



