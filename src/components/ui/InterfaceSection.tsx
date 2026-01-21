'use client'

// Decorative X icon component
function CrossIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="14" 
      height="14" 
      viewBox="0 0 14 14" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M1 1L13 13M13 1L1 13" 
        stroke="#1D1D1F" 
        strokeWidth="1" 
        strokeLinecap="round"
      />
    </svg>
  )
}

// Technical bracket lines component
function TechnicalBracket({ className, side = 'left' }: { className?: string; side?: 'left' | 'right' }) {
  return (
    <svg 
      className={className}
      width="40" 
      height="200" 
      viewBox="0 0 40 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {side === 'left' ? (
        <>
          {/* Left bracket */}
          <path d="M35 0 L35 200" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M35 20 L20 20" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M35 80 L20 80" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M35 140 L20 140" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M35 180 L20 180" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M20 20 L20 80" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M20 140 L20 180" stroke="#D1D1D3" strokeWidth="0.5" />
        </>
      ) : (
        <>
          {/* Right bracket */}
          <path d="M5 0 L5 200" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M5 20 L20 20" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M5 80 L20 80" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M5 140 L20 140" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M5 180 L20 180" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M20 20 L20 80" stroke="#D1D1D3" strokeWidth="0.5" />
          <path d="M20 140 L20 180" stroke="#D1D1D3" strokeWidth="0.5" />
        </>
      )}
    </svg>
  )
}

export default function InterfaceSection() {
  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Exploded Product View */}
          <div className="relative flex items-center justify-center lg:justify-start order-2 lg:order-1">
            {/* Technical Bracket Lines */}
            <TechnicalBracket 
              className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 opacity-60 hidden sm:block" 
              side="left" 
            />
            
            {/* Exploded Product Placeholder */}
            <div className="relative z-10 w-[280px] h-[450px] sm:w-[340px] sm:h-[550px] md:w-[400px] md:h-[650px] lg:w-[450px] lg:h-[700px] flex flex-col items-center justify-center gap-4">
              {/* Screen/Display Layer */}
              <div className="w-[65%] h-[18%] bg-gradient-to-br from-foreground/90 to-foreground/70 rounded-xl shadow-lg transform -rotate-12 translate-x-4">
                <div className="w-full h-full rounded-xl border-4 border-accent-gold/30" />
              </div>

              {/* Circuit Board Layer */}
              <div className="w-[55%] h-[12%] bg-gradient-to-br from-green-800/40 to-green-900/30 rounded-lg transform -rotate-6 -translate-x-2 flex items-center justify-center">
                <div className="w-[80%] h-[60%] border border-green-600/30 rounded" />
              </div>

              {/* Main Body/Shell Layer */}
              <div className="w-[60%] h-[45%] bg-gradient-to-br from-accent-gold/40 to-accent-gold/20 rounded-3xl transform rotate-3 flex flex-col items-center justify-between py-6">
                <div className="w-[70%] h-[40%] bg-foreground/10 rounded-xl" />
                <div className="w-[35%] aspect-square rounded-full bg-accent-gold/40 border-4 border-accent-gold/20" />
              </div>

              {/* Label */}
              <span className="absolute bottom-0 text-foreground/20 text-xs">Exploded View</span>
            </div>

            {/* Technical Bracket Lines - Right side of product */}
            <TechnicalBracket 
              className="absolute right-[20%] lg:right-[15%] top-1/2 -translate-y-1/2 opacity-60 hidden sm:block" 
              side="right" 
            />
          </div>

          {/* Right Side - Content */}
          <div className="relative order-1 lg:order-2 max-w-lg">
            {/* Label */}
            <span className="text-sm md:text-base font-medium text-foreground/40 uppercase tracking-wider">
              The Interface
            </span>

            {/* Heading */}
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase leading-tight">
              Protective Glass
            </h2>

            {/* Description */}
            <p className="mt-6 text-sm md:text-base text-foreground/60 leading-relaxed">
              A durable, precision-cut glass layer protects the display while maintaining 
              warmth and clarity. Its subtle finish reduces glare and fingerprints, allowing 
              the device to remain visually calm in everyday environments.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

