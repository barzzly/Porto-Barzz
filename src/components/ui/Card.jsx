
export function Card({ 
  children, 
  className = '', 
  hoverable = true,
  ...props 
}) {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl border border-card-border bg-surface 
        backdrop-blur-xl p-6 shadow-lg transition-all duration-300
        ${hoverable ? 'hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/45 hover:shadow-primary-glow/10' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Decorative reflection line inside the card top boundary */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      {children}
    </div>
  )
}
