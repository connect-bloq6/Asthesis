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

export default function HousingSection() {
  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Exploded Product View (Housing Focus) */}
          <div className="relative flex items-center justify-center lg:justify-start order-2 lg:order-1">
            {/* Exploded Product Placeholder - Housing Focus */}
            <div className="relative z-10 w-[280px] h-[450px] sm:w-[340px] sm:h-[550px] md:w-[400px] md:h-[650px] lg:w-[450px] lg:h-[700px] flex flex-col items-center justify-center gap-6">
              {/* Aluminum Frame/Housing (hollow, lifted) */}
              <div className="relative w-[60%] h-[35%] transform -rotate-6 translate-x-2">
                {/* Frame outline */}
                <div className="w-full h-full rounded-2xl border-[6px] border-accent-gold/60 bg-transparent shadow-lg">
                  {/* Inner cutout for screen area */}
                  <div className="absolute inset-4 rounded-xl border-2 border-accent-gold/30" />
                </div>
              </div>

              {/* Dial/Knob (attached to frame) */}
              <div className="absolute top-[42%] left-[45%] w-[18%] aspect-square">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-gold/50 to-accent-gold/30 border-4 border-accent-gold/40 shadow-md">
                  {/* Knurled texture indication */}
                  <div className="w-full h-full rounded-full border-2 border-dashed border-accent-gold/20" />
                </div>
              </div>

              {/* Circuit Board Layer (below) */}
              <div className="w-[55%] h-[15%] bg-gradient-to-br from-green-800/30 to-green-900/20 rounded-lg transform rotate-3 -translate-x-4 flex items-center justify-center">
                <div className="w-[85%] h-[70%] border border-green-600/20 rounded flex items-center gap-1 px-2">
                  <div className="w-3 h-3 rounded-sm bg-green-600/30" />
                  <div className="w-6 h-2 rounded-sm bg-yellow-600/30" />
                  <div className="w-4 h-3 rounded-sm bg-gray-600/30" />
                </div>
              </div>

              {/* Base/Back plate */}
              <div className="w-[58%] h-[25%] bg-gradient-to-br from-accent-gold/30 to-accent-gold/15 rounded-2xl transform rotate-2 translate-x-1" />

              {/* Label */}
              <span className="absolute bottom-0 text-foreground/20 text-xs">Housing View</span>
            </div>
          </div>

          {/* Right Side - Content with Arrow and Diamond */}
          <div className="relative order-1 lg:order-2">
            {/* Diamond Shape with Arrow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] translate-x-4 md:translate-x-8">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Diamond shape */}
                  <path 
                    d="M50 10 L90 50 L50 90 L10 50 Z" 
                    fill="none" 
                    stroke="#D1D1D3" 
                    strokeWidth="0.25"
                  />
                  {/* Arrow pointing right */}
                  <path 
                    d="M50 50 L85 50" 
                    fill="none" 
                    stroke="#D1D1D3" 
                    strokeWidth="0.4"
                  />
                  <path 
                    d="M80 46 L88 50 L80 54" 
                    fill="none" 
                    stroke="#D1D1D3" 
                    strokeWidth="0.4"
                  />
                </svg>
                
                {/* Cross icons on diamond corners */}
                <CrossIcon className="absolute top-[10%] left-1/2 -translate-x-1/2 opacity-30" />
                <CrossIcon className="absolute bottom-[10%] left-1/2 -translate-x-1/2 opacity-30" />
                <CrossIcon className="absolute left-[10%] top-1/2 -translate-y-1/2 opacity-30" />
                <CrossIcon className="absolute right-[10%] top-1/2 -translate-y-1/2 opacity-30" />
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 max-w-lg">
              {/* Label */}
              <span className="text-sm md:text-base font-medium text-foreground/40 uppercase tracking-wider">
                The Interface
              </span>

              {/* Heading */}
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase leading-tight">
                Aluminum Housing
              </h2>

              {/* Description */}
              <p className="mt-6 text-sm md:text-base text-foreground/60 leading-relaxed">
                The main body is crafted from anodized aluminum, chosen for its strength, 
                longevity, and reassuring weight. Its form avoids the cold language of medical 
                devices, instead feeling familiar, stable, and intentional—designed to belong in 
                the home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

