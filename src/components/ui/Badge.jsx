
export function Badge({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) {
  const baseStyle = 'inline-flex items-center gap-1.5 font-mono text-xs font-medium px-3 py-1 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] cursor-pointer'
  
  const variants = {
    default: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20',
    secondary: 'bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20',
    outline: 'border border-text/20 text-text/80 hover:border-primary/50 hover:text-primary',
    glass: 'bg-surface/50 backdrop-blur-md border border-border text-text'
  }

  return (
    <span 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
