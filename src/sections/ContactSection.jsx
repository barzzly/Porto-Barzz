import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Github, Linkedin, Twitter } from '../components/ui/BrandIcons'
import { Mail, Send, Copy, Check, Sparkles } from 'lucide-react'

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const emailAddress = "barzzly@gmail.com"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return
    
    setIsSending(true)
    // Simulate API call
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => setIsSent(false), 5000)
    }, 1500)
  }

  return (
    <section 
      id="contact" 
      className="max-w-6xl mx-auto px-6 py-20 w-full"
    >
      {/* Section Header */}
      <div className="reveal-element flex flex-col items-center md:items-start mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-widest mb-2">// 04. GET IN TOUCH</span>
        <h2 className="font-mono font-bold text-3xl md:text-4xl text-text">
          Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Project</span>
        </h2>
        <div className="w-12 h-[2px] bg-primary mt-4" />
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
        {/* Left Column: Direct Info & Socials */}
        <div className="reveal-element flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h3 className="font-mono text-lg font-bold text-text">
              Let's build something exceptional.
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              If you have a concept, project, or full-time opportunity you'd like to discuss, feel free to drop a message or reach out directly via email.
            </p>
          </div>

          {/* Quick Copy Email Card */}
          <Card hoverable={false} className="bg-surface/30 border-border/40 p-5 flex flex-col gap-3">
            <span className="font-mono text-[10px] text-muted block">// DIRECT MAIL</span>
            <div className="flex items-center justify-between gap-3 bg-surface/50 border border-border/40 p-3 rounded-xl">
              <div className="flex items-center gap-2 overflow-hidden">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="font-mono text-xs text-text truncate">{emailAddress}</span>
              </div>
              <button 
                onClick={handleCopyEmail}
                className="p-2 rounded-lg border border-border hover:border-primary/45 hover:text-primary transition-colors cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-mono text-muted">Average response time: &lt; 12 hours</span>
            </div>
          </Card>

          {/* Social Links Cards */}
          <div className="flex gap-3 justify-center md:justify-start">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 max-w-[100px] text-center"
            >
              <Card hoverable={true} className="bg-surface/20 border-border/20 hover:border-primary/45 p-3 flex flex-col items-center gap-1">
                <Github className="w-4 h-4 text-text/80" />
                <span className="font-mono text-[9px] text-muted">GitHub</span>
              </Card>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 max-w-[100px] text-center"
            >
              <Card hoverable={true} className="bg-surface/20 border-border/20 hover:border-primary/45 p-3 flex flex-col items-center gap-1">
                <Linkedin className="w-4 h-4 text-text/80" />
                <span className="font-mono text-[9px] text-muted">LinkedIn</span>
              </Card>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 max-w-[100px] text-center"
            >
              <Card hoverable={true} className="bg-surface/20 border-border/20 hover:border-primary/45 p-3 flex flex-col items-center gap-1">
                <Twitter className="w-4 h-4 text-text/80" />
                <span className="font-mono text-[9px] text-muted">Twitter</span>
              </Card>
            </a>
          </div>
        </div>

        {/* Right Column: Glassmorphic Contact Form */}
        <Card hoverable={false} className="reveal-element bg-surface/40 border-border/40 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="form-name" className="font-mono text-xs text-text/80 font-medium">
                  Name <span className="text-primary">*</span>
                </label>
                <input 
                  type="text" 
                  id="form-name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full font-mono text-xs px-4 py-3 rounded-xl border border-border bg-surface/50 text-text placeholder-muted/60 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-all"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="form-email" className="font-mono text-xs text-text/80 font-medium">
                  Email <span className="text-primary">*</span>
                </label>
                <input 
                  type="email" 
                  id="form-email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full font-mono text-xs px-4 py-3 rounded-xl border border-border bg-surface/50 text-text placeholder-muted/60 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-all"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="form-message" className="font-mono text-xs text-text/80 font-medium">
                Message <span className="text-primary">*</span>
              </label>
              <textarea 
                id="form-message"
                required
                rows="5"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Hi, I'd like to work with you on a custom analytics dashboard..."
                className="w-full font-mono text-xs px-4 py-3 rounded-xl border border-border bg-surface/50 text-text placeholder-muted/60 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-all resize-none"
              />
            </div>

            {/* Form Submit & Feedback Message */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
              <div>
                {isSent && (
                  <p className="text-xs font-mono text-primary flex items-center gap-1.5 animate-pulse text-left">
                    <Sparkles className="w-4 h-4 text-secondary" /> 
                    Message received! I'll get back to you shortly.
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isSending || isSent}
                className="w-full md:w-auto min-w-[150px] gap-2 h-11"
              >
                {isSending ? (
                  <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Send Message <Send className="w-3.5 h-3.5" /></>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}
