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

// Decorative plus icon component
function PlusIcon({ className }: { className?: string }) {
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
        d="M7 0V14M0 7H14" 
        stroke="#1D1D1F" 
        strokeWidth="1" 
        strokeLinecap="round"
      />
    </svg>
  )
}

// Technical bracket lines component
function TechnicalBracket({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="40" 
      height="200" 
      viewBox="0 0 40 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M35 0 L35 200" stroke="#D1D1D3" strokeWidth="0.5" />
      <path d="M35 30 L20 30" stroke="#D1D1D3" strokeWidth="0.5" />
      <path d="M35 70 L20 70" stroke="#D1D1D3" strokeWidth="0.5" />
      <path d="M35 120 L20 120" stroke="#D1D1D3" strokeWidth="0.5" />
      <path d="M35 170 L20 170" stroke="#D1D1D3" strokeWidth="0.5" />
      <path d="M20 30 L20 70" stroke="#D1D1D3" strokeWidth="0.5" />
      <path d="M20 120 L20 170" stroke="#D1D1D3" strokeWidth="0.5" />
    </svg>
  )
}

export default function ProcessingSection() {
  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />
      
      {/* Plus icon on right side */}
      <PlusIcon className="absolute top-1/2 right-12 md:right-20 -translate-y-1/2 opacity-40" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Exploded Product View (Circuit Board Focus) */}
          <div className="relative flex items-center justify-center lg:justify-start order-2 lg:order-1">
            {/* Technical Bracket Lines */}
            <TechnicalBracket 
              className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 opacity-60 hidden sm:block" 
            />
            
            {/* Exploded Product Placeholder - Circuit Board Focus */}
            <div className="relative z-10 w-[280px] h-[480px] sm:w-[340px] sm:h-[580px] md:w-[400px] md:h-[680px] lg:w-[450px] lg:h-[720px] flex flex-col items-center justify-center gap-3">
              
              {/* Main Circuit Board (top) */}
              <div className="w-[70%] h-[20%] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg transform -rotate-12 translate-x-6 shadow-xl relative overflow-hidden">
                {/* PCB details */}
                <div className="absolute inset-2 flex flex-col gap-1">
                  {/* Chips */}
                  <div className="flex gap-2">
                    <div className="w-8 h-6 bg-gray-600 rounded-sm" />
                    <div className="w-12 h-6 bg-gray-700 rounded-sm" />
                  </div>
                  {/* Connectors */}
                  <div className="flex gap-1 mt-1">
                    <div className="w-4 h-3 bg-yellow-600/60 rounded-sm" />
                    <div className="w-4 h-3 bg-yellow-600/60 rounded-sm" />
                    <div className="w-6 h-3 bg-gray-500 rounded-sm" />
                  </div>
                  {/* Traces */}
                  <div className="absolute bottom-2 left-2 right-2 h-[1px] bg-green-500/30" />
                  <div className="absolute bottom-4 left-4 right-6 h-[1px] bg-green-500/20" />
                </div>
                {/* Gold corner connectors */}
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-yellow-500/70" />
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-500/70" />
              </div>

              {/* Secondary Circuit Board */}
              <div className="w-[60%] h-[18%] bg-gradient-to-br from-green-900/80 to-green-950 rounded-lg transform -rotate-6 -translate-x-2 shadow-lg relative">
                {/* PCB components */}
                <div className="absolute inset-2 flex items-center gap-2">
                  <div className="w-10 h-8 bg-gray-300/80 rounded-sm" /> {/* Heat sink */}
                  <div className="w-6 h-6 bg-gray-800 rounded-sm" />
                  <div className="flex flex-col gap-1">
                    <div className="w-4 h-2 bg-red-500/50 rounded-sm" />
                    <div className="w-4 h-2 bg-blue-500/50 rounded-sm" />
                  </div>
                </div>
                {/* Ribbon cable */}
                <div className="absolute -bottom-4 left-1/3 w-8 h-6 bg-gradient-to-b from-orange-400/60 to-orange-600/40 rounded-b-sm" />
              </div>

              {/* Tertiary Board (smaller) */}
              <div className="w-[45%] h-[12%] bg-gradient-to-br from-gray-700 to-gray-800 rounded-md transform rotate-3 translate-x-8 shadow-md relative">
                <div className="absolute inset-1 flex items-center justify-around">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <div className="w-5 h-4 bg-gray-600 rounded-sm" />
                  <div className="w-4 h-4 bg-yellow-600/50 rounded-sm" />
                </div>
              </div>

              {/* Base/Housing (partial view) */}
              <div className="w-[55%] h-[28%] bg-gradient-to-br from-accent-gold/35 to-accent-gold/20 rounded-2xl transform rotate-2 -translate-x-2 relative">
                {/* Dial indication */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[40%] aspect-square rounded-full bg-accent-gold/30 border-2 border-accent-gold/20" />
              </div>

              {/* Label */}
              <span className="absolute bottom-0 text-foreground/20 text-xs">Processing Core View</span>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="relative order-1 lg:order-2 max-w-lg">
            {/* Label */}
            <span className="text-sm md:text-base font-medium text-foreground/40 uppercase tracking-wider">
              The Interface
            </span>

            {/* Heading */}
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase leading-tight">
              Processing Core
            </h2>

            {/* Description - Multiple paragraphs */}
            <div className="mt-6 space-y-4">
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                At the center of Asthesis is a custom electronics board responsible for 
                sensing, learning, and decision-making.
              </p>
              
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                It processes information locally, enabling fast, thoughtful responses while 
                reducing unnecessary data transmission.
              </p>
              
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                Quiet intelligence, working continuously.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

