import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { projects, tools, websites } from '../data/projects'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Server, Users, ExternalLink, Copy, X } from 'lucide-react'

export function ProjectsSection({ t }) {
  const [serverStatus, setServerStatus] = useState({})
  const [copiedProjectId, setCopiedProjectId] = useState(null)
  const [shouldLoadStatus, setShouldLoadStatus] = useState(false)
  const [activeTab, setActiveTab] = useState('server')
  const [preview, setPreview] = useState(null)
  const sectionRef = useRef(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const tabRefs = useRef({})
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0, ready: false })
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

  // Sliding pill behind the active tab
  const syncTabIndicator = useCallback(() => {
    const el = tabRefs.current[activeTab]
    if (!el) return
    setTabIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true })
  }, [activeTab])

  useEffect(() => {
    syncTabIndicator()
    const onResize = () => syncTabIndicator()
    window.addEventListener('resize', onResize, { passive: true })
    if (document.fonts?.ready) document.fonts.ready.then(onResize).catch(() => {})
    return () => window.removeEventListener('resize', onResize)
  }, [syncTabIndicator, t.tabServer, t.tabTools, t.tabWebsite])

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

  useEffect(() => {
    if (!preview) return undefined

    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setPreview(null)
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()
    }
  }, [preview])

  const openPreview = (project, tabType) => setPreview({ project, tabType })

  const previewTranslation = preview && (
    preview.tabType === 'tools'
      ? t.toolItems?.find(item => item.id === preview.project.id)
      : preview.tabType === 'website'
      ? t.websiteItems?.find(item => item.id === preview.project.id)
      : t.items?.find(item => item.id === preview.project.id)
  )
  const previewTitle = previewTranslation?.title || preview?.project.title
  const previewDescription = previewTranslation?.description || preview?.project.description
  const previewRole = previewTranslation?.role || preview?.project.role

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="max-w-6xl mx-auto px-6 py-20 w-full"
    >
      <div className="reveal-up flex flex-col items-center md:items-start mb-12">
        <span className="section-eyebrow font-mono text-xs text-primary uppercase tracking-widest mb-2">{t.badge}</span>
        <div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text tracking-tighter">
            {activeTab === 'tools' ? t.toolsHeading : activeTab === 'website' ? t.websiteHeading : t.heading} <span className="title-accent text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">{t.headingAccent}</span>
          </h2>
          <div className="section-divider w-12 h-[2px] bg-primary mt-4" />
        </div>

        <div className="tab-switch mt-8 inline-flex items-center gap-1 rounded-full border border-card-border bg-surface/50 p-1 font-mono text-xs backdrop-blur-md">
          <span
            aria-hidden="true"
            className="tab-indicator"
            style={{
              transform: `translate3d(${tabIndicator.left}px, 0, 0)`,
              width: `${tabIndicator.width}px`,
              opacity: tabIndicator.ready ? 1 : 0,
            }}
          />
          {[
            { key: 'server', label: t.tabServer },
            { key: 'tools', label: t.tabTools },
            { key: 'website', label: t.tabWebsite },
          ].map((tab) => (
            <button
              key={tab.key}
              ref={(node) => { tabRefs.current[tab.key] = node }}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
              className={`tab-button rounded-full px-4 py-2 font-semibold uppercase tracking-widest ${
                activeTab === tab.key ? 'is-active text-bg' : 'text-muted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {((activeTab === 'tools' && tools.length === 0) || (activeTab === 'website' && websites.length === 0)) ? (
        <div className="reveal-up flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-border/50 bg-surface/20 font-mono text-sm text-muted">
          {activeTab === 'tools' ? t.emptyTools : t.emptyWebsite}
        </div>
      ) : (
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${
        activeTab === 'website' && websites.length <= 2
          ? 'lg:grid-cols-2 max-w-3xl'
          : 'lg:grid-cols-4'
      } gap-8 items-start mx-auto`}>
        {(activeTab === 'tools' ? tools : activeTab === 'website' ? websites : projects).map((project, index, activeList) => {
          const localItem = activeTab === 'tools'
            ? t.toolItems?.find(item => item.id === project.id)
            : activeTab === 'website'
            ? t.websiteItems?.find(item => item.id === project.id)
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
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`${t.previewLabel} ${title}`}
                onClick={() => openPreview(project, activeTab)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openPreview(project, activeTab)
                  }
                }}
              >
                <div className="relative aspect-video overflow-visible rounded-xl border border-border/30 bg-black/20 mb-6">
                  <div className="project-media relative h-full overflow-hidden rounded-xl">
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
                  <div className="project-counter absolute right-2.5 top-2.5 z-30 rounded-lg border border-card-border bg-bg/55 px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-text/80 backdrop-blur-md">
                    {String(index + 1).padStart(2, '0')}
                    <span className="text-text/35"> / {String(activeList.length).padStart(2, '0')}</span>
                  </div>
                </div>

                <h3 className="mb-3 font-mono text-base font-bold text-text">
                  <span className="project-title transition-colors duration-300 group-hover:text-primary">{title}</span>
                </h3>
                <p className="project-description mb-4 min-h-[4.5rem] text-xs leading-relaxed text-muted">
                  {description}
                </p>

                <div className="mb-4 flex min-h-[2rem] flex-wrap content-start gap-1.5">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tag}
                      variant="glass"
                      className="project-tag text-[10px] py-0.5 px-2 bg-surface border-border/50 hover:border-primary/30 hover:text-primary"
                      style={{ '--tag-delay': `${tagIndex * 45}ms` }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto border-t border-border/30 pt-3">
                  {activeTab === 'website' ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="open-row flex min-h-11 items-center justify-center gap-2 rounded-xl border border-card-border bg-surface/35 px-3 py-2 text-center font-mono text-xs font-semibold text-text hover:border-primary/40 hover:text-primary"
                    >
                      <ExternalLink className="open-icon h-4 w-4 text-text/70" />
                      {t.openWebsiteLabel}
                    </a>
                  ) : activeTab === 'tools' ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="open-row flex min-h-11 items-center justify-center gap-2 rounded-xl border border-card-border bg-surface/35 px-3 py-2 text-center font-mono text-xs font-semibold text-text hover:border-primary/40 hover:text-primary"
                    >
                      <ExternalLink className="open-icon h-4 w-4 text-text/70" />
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
                        onClick={(event) => {
                          event.stopPropagation()
                          handleCopyIp(project)
                        }}
                        className={`copy-row group/ip flex min-h-11 w-full items-center gap-2.5 rounded-xl border border-card-border bg-surface/35 px-3 py-2 text-left hover:border-primary/40 hover:bg-surface ${isCopied ? 'is-copied' : ''}`}
                        aria-label={`${t.copyLabel} ${project.joinIp}`}
                      >
                        <Server className="h-4 w-4 shrink-0 text-text/60 transition-colors group-hover/ip:text-primary" />
                        <span className="block min-w-0 flex-1 truncate text-xs font-semibold text-text">{displayIp}</span>
                        <Copy className="copy-icon h-3.5 w-3.5 shrink-0 text-text/40 group-hover/ip:text-primary" />
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

      {preview && createPortal(
        <div
          className="project-preview-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPreview(null)
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-preview-title"
            aria-describedby="project-preview-description"
            className="project-preview-dialog relative grid max-h-[90svh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-card-border bg-surface shadow-2xl lg:grid-cols-[1.35fr_1fr]"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setPreview(null)}
              aria-label={t.closePreviewLabel}
              className="absolute right-3 top-3 z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-card-border bg-bg/80 text-text shadow-lg backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-video overflow-hidden bg-black/40 lg:aspect-auto lg:min-h-[520px]">
              <img
                src={preview.project.image}
                alt={previewTitle}
                width="1280"
                height="720"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <div className="mb-5 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {previewRole}
              </div>
              <h3 id="project-preview-title" className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                {previewTitle}
              </h3>
              <p id="project-preview-description" className="mt-5 text-sm leading-7 text-muted sm:text-base">
                {previewDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {preview.project.tags.map((tag) => (
                  <Badge key={tag} variant="glass" className="px-3 py-1 text-[11px]">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto pt-8">
                {preview.tabType === 'website' ? (
                  <a
                    href={preview.project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-sm font-bold text-bg transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t.openWebsiteLabel}
                  </a>
                ) : preview.tabType === 'tools' ? (
                  <a
                    href={preview.project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-sm font-bold text-bg transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t.openLabel}
                  </a>
                ) : preview.project.status === 'eol' ? (
                  <div className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-card-border bg-bg/30 px-5 py-3 font-mono text-sm font-semibold text-muted">
                    <Server className="h-4 w-4" />
                    {t.eolLabel}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCopyIp(preview.project)}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-sm font-bold text-bg transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedProjectId === preview.project.id ? t.copiedLabel : `${t.copyLabel} ${preview.project.joinIp}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}



