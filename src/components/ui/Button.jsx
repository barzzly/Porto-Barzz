
export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyle = 'inline-flex items-center justify-center font-mono font-medium rounded-xl px-5 py-3 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm tracking-wide cursor-pointer'
  
  const variants = {
    primary: 'bg-primary text-bg shadow-[0_4px_20px_rgba(0,255,136,0.25)] hover:shadow-[0_12px_30px_rgba(0,255,136,0.45)] hover:-translate-y-1 hover:rotate-1 border border-primary/20',
    secondary: 'border border-primary text-primary bg-primary/5 hover:bg-primary/10 hover:-translate-y-1 hover:rotate-[-1deg]',
    ghost: 'text-text hover:text-primary hover:bg-primary/5 hover:-translate-y-0.5 hover:rotate-1'
  }

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
