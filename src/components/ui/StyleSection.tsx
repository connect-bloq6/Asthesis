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

export default function StyleSection() {
  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Product Image Area */}
          <div className="relative flex items-center justify-center lg:justify-start order-2 lg:order-1">
            {/* Product Placeholder - Will be replaced with 3D model later */}
            <div className="relative z-10 w-[250px] h-[350px] sm:w-[300px] sm:h-[420px] md:w-[350px] md:h-[500px] lg:w-[400px] lg:h-[560px] flex items-center justify-center">
              {/* Placeholder box representing the product */}
              <div className="w-full h-full bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 rounded-3xl flex items-center justify-center border border-accent-gold/10">
                <span className="text-foreground/30 text-sm">3D Product</span>
              </div>
            </div>
          </div>

          {/* Right Side - Content with Diamond Shapes */}
          <div className="relative order-1 lg:order-2">
            {/* Two Overlapping Diamond Shapes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* First Diamond (larger, behind) */}
              <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[520px] lg:h-[520px] -translate-x-8 md:-translate-x-12">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path 
                    d="M50 5 L95 50 L50 95 L5 50 Z" 
                    fill="none" 
                    stroke="#D1D1D3" 
                    strokeWidth="0.25"
                  />
                </svg>
                {/* Cross icons on first diamond corners */}
                <CrossIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
                <CrossIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-30" />
                <CrossIcon className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
                <CrossIcon className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 opacity-30" />
              </div>

              {/* Second Diamond (smaller, in front, offset) */}
              <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px] translate-x-8 md:translate-x-16 translate-y-12 md:translate-y-20">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path 
                    d="M50 5 L95 50 L50 95 L5 50 Z" 
                    fill="none" 
                    stroke="#D1D1D3" 
                    strokeWidth="0.3"
                  />
                </svg>
                {/* Cross icons on second diamond corners */}
                <CrossIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
                <CrossIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-30" />
                <CrossIcon className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
                <CrossIcon className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 opacity-30" />
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 max-w-lg lg:ml-auto">
              {/* Label */}
              <span className="text-sm md:text-base font-medium text-foreground/40 uppercase tracking-wider">
                Style
              </span>

              {/* Heading */}
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground uppercase leading-tight">
                Awareness Without Surveillance
              </h2>

              {/* Description */}
              <p className="mt-6 text-sm md:text-base text-foreground/60 leading-relaxed">
                Asthesis understands patterns, not people. By observing rhythms of daily life 
                — movement, presence, and environmental context — it builds an 
                understanding of what is normal, and recognizes when something changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

