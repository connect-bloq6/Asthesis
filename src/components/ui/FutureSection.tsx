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

export default function FutureSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      {/* Heading */}
      <h2 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground uppercase tracking-tight text-center z-10"
        style={{ 
          fontStretch: 'condensed',
          letterSpacing: '-0.02em'
        }}
      >
        The Future
      </h2>

      {/* Product with Diamond */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center mt-4 md:mt-8">
        {/* Diamond Border */}
        <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px]">
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <path 
              d="M50 3 L97 50 L50 97 L3 50 Z" 
              fill="none" 
              stroke="#D1D1D3" 
              strokeWidth="0.25"
            />
          </svg>
          
          {/* Cross icons on diamond corners */}
          <CrossIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
          <CrossIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-40" />
          <CrossIcon className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
          <CrossIcon className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 opacity-40" />
        </div>

        {/* Product Placeholder - Front View */}
        <div className="relative z-10 w-[220px] h-[340px] sm:w-[280px] sm:h-[430px] md:w-[340px] md:h-[520px] lg:w-[380px] lg:h-[580px] mt-8">
          {/* Device Body */}
          <div className="w-full h-full bg-gradient-to-b from-accent-gold/50 to-accent-gold/70 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
            
            {/* Screen Area */}
            <div className="flex-1 m-3 md:m-4 bg-gradient-to-br from-gray-900 to-black rounded-[1.25rem] md:rounded-[1.5rem] relative">
              {/* Screen reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[1.25rem] md:rounded-[1.5rem]" />
            </div>

            {/* Bottom Section with Dial */}
            <div className="h-[35%] flex items-center justify-center pb-4 md:pb-6 relative">
              {/* Dial */}
              <div className="w-[45%] aspect-square rounded-full bg-gradient-to-br from-accent-gold/80 to-accent-gold/60 shadow-lg flex items-center justify-center">
                {/* Inner dial ring */}
                <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-accent-gold/90 to-accent-gold/70 flex items-center justify-center">
                  {/* Center */}
                  <div className="w-[70%] h-[70%] rounded-full bg-gradient-to-b from-accent-gold to-yellow-700/80" />
                </div>
              </div>

              {/* Small indicator/button on right */}
              <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-8 h-2 md:w-10 md:h-2.5 bg-accent-gold/60 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

