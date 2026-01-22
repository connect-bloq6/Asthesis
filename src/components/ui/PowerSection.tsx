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

export default function PowerSection() {
  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Exploded Product View (Battery Focus) */}
          <div className="relative flex items-center justify-center lg:justify-start order-2 lg:order-1">
            {/* Exploded Product Placeholder - Battery Focus */}
            <div className="relative z-10 w-[280px] h-[450px] sm:w-[340px] sm:h-[550px] md:w-[400px] md:h-[620px] lg:w-[450px] lg:h-[680px] flex flex-col items-center justify-center gap-4">
              
              {/* Top Cover/Board with wires */}
              <div className="w-[65%] h-[15%] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg transform -rotate-6 translate-x-4 shadow-lg relative">
                {/* Wire connectors */}
                <div className="absolute bottom-0 left-1/4 w-1 h-8 bg-red-500/70 rounded-full transform rotate-12" />
                <div className="absolute bottom-0 left-1/3 w-1 h-6 bg-gray-700 rounded-full transform rotate-6" />
                {/* Small components */}
                <div className="absolute top-2 right-3 w-6 h-4 bg-gray-600 rounded-sm" />
                <div className="absolute top-3 left-3 w-4 h-3 bg-gray-700 rounded-sm" />
              </div>

              {/* Li-Po Battery (main focus) */}
              <div className="w-[70%] h-[28%] relative transform -rotate-3 -translate-x-2">
                {/* Battery body */}
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-xl relative overflow-hidden">
                  {/* Yellow/gold edge tape (typical LiPo) */}
                  <div className="absolute inset-0 border-4 border-yellow-500/60 rounded-lg" />
                  {/* Battery label area */}
                  <div className="absolute inset-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded" />
                  {/* Connector tab */}
                  <div className="absolute -top-2 left-1/4 w-8 h-4 bg-gray-500 rounded-t-sm" />
                </div>
                {/* Wire from battery */}
                <div className="absolute -top-6 left-[30%] flex gap-1">
                  <div className="w-1 h-8 bg-red-500/80 rounded-full" />
                  <div className="w-1 h-8 bg-black/60 rounded-full" />
                </div>
              </div>

              {/* Secondary component */}
              <div className="w-[50%] h-[10%] bg-gradient-to-br from-gray-700 to-gray-800 rounded-md transform rotate-2 translate-x-6 shadow-md">
                <div className="absolute inset-1 flex items-center justify-around">
                  <div className="w-4 h-4 bg-gray-600 rounded-sm" />
                  <div className="w-6 h-3 bg-gray-500 rounded-sm" />
                </div>
              </div>

              {/* Base/Housing (partial view) */}
              <div className="w-[60%] h-[25%] bg-gradient-to-br from-accent-gold/40 to-accent-gold/20 rounded-2xl transform rotate-1 -translate-x-1 relative">
                {/* Screw holes indication */}
                <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-gray-400/50" />
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gray-400/50" />
                <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-gray-400/50" />
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-gray-400/50" />
              </div>

              {/* Label */}
              <span className="absolute bottom-0 text-foreground/20 text-xs">Battery View</span>
            </div>
          </div>

          {/* Right Side - Content with Double Diamond */}
          <div className="relative order-1 lg:order-2">
            {/* Two Overlapping Diamond Shapes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* First Diamond (larger) */}
              <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] -translate-x-4">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path 
                    d="M50 8 L92 50 L50 92 L8 50 Z" 
                    fill="none" 
                    stroke="#D1D1D3" 
                    strokeWidth="0.25"
                  />
                </svg>
                {/* Plus icons on first diamond corners */}
                <PlusIcon className="absolute top-[8%] left-1/2 -translate-x-1/2 opacity-30" />
                <PlusIcon className="absolute bottom-[8%] left-1/2 -translate-x-1/2 opacity-30" />
                <PlusIcon className="absolute left-[8%] top-1/2 -translate-y-1/2 opacity-30" />
                <PlusIcon className="absolute right-[8%] top-1/2 -translate-y-1/2 opacity-30" />
              </div>

              {/* Second Diamond (smaller, offset) */}
              <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] lg:w-[400px] lg:h-[400px] translate-x-8 translate-y-16">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path 
                    d="M50 8 L92 50 L50 92 L8 50 Z" 
                    fill="none" 
                    stroke="#D1D1D3" 
                    strokeWidth="0.3"
                  />
                </svg>
                {/* Plus icons on second diamond corners */}
                <PlusIcon className="absolute top-[8%] left-1/2 -translate-x-1/2 opacity-30" />
                <PlusIcon className="absolute bottom-[8%] left-1/2 -translate-x-1/2 opacity-30" />
                <PlusIcon className="absolute left-[8%] top-1/2 -translate-y-1/2 opacity-30" />
                <PlusIcon className="absolute right-[8%] top-1/2 -translate-y-1/2 opacity-30" />
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 max-w-lg">
              {/* Label */}
              <span className="text-sm md:text-base font-medium text-foreground/40 uppercase tracking-wider">
                The Interface
              </span>

              {/* Heading */}
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground uppercase leading-tight">
                Power, Designed for Reliability
              </h2>

              {/* Description - Multiple paragraphs */}
              <div className="mt-6 space-y-4">
                <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                  The internal battery is optimized for long-term stability and consistent 
                  performance.
                </p>
                
                <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                  Designed to support continuous operation, it ensures Asthesis remains 
                  present and dependable—day and night, without interruption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

