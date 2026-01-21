'use client'

import dynamic from 'next/dynamic'

// Dynamically import the 3D scene to avoid SSR issues
const ExplodedDeviceScene = dynamic(
  () => import('@/components/canvas/ExplodedDeviceScene'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground/60 rounded-full animate-spin" />
      </div>
    ),
  }
)

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

// Radar/Sensor icon
function RadarIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="18" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="12" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="6" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="2" fill="#1D1D1F" />
      <path d="M24 6 C26 6 28 7 29 8" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M32 10 C34 12 35 14 35 16" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M24 6 L24 42 M6 24 L42 24" stroke="#1D1D1F" strokeWidth="0.5" opacity="0.5" />
    </svg>
  )
}

// Person icon
function PersonIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="10" r="5" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      <path 
        d="M24 15 L24 28 M24 20 L16 26 M24 20 L32 16 M24 28 L18 40 M24 28 L32 38" 
        stroke="#1D1D1F" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function DeviceShowcaseSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight uppercase">
            Precision Engineering
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-foreground/60 max-w-lg mx-auto">
            Every component designed with purpose. Every layer crafted for performance.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          
          {/* Right Side - Feature Icons */}
          <div className="absolute right-4 sm:right-8 md:right-16 lg:right-24 xl:right-32 flex items-center gap-8 md:gap-12 z-20">
            <RadarIcon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-70" />
            <PersonIcon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-70" />
          </div>

          {/* Technical Rectangle Frame */}
          <div className="absolute w-[320px] h-[480px] sm:w-[400px] sm:h-[600px] md:w-[500px] md:h-[700px] lg:w-[600px] lg:h-[800px] pointer-events-none">
            <svg 
              viewBox="0 0 100 150" 
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Rectangle outline */}
              <rect 
                x="5" 
                y="5" 
                width="90" 
                height="140" 
                fill="none" 
                stroke="#D1D1D3" 
                strokeWidth="0.3"
              />
              {/* Corner marks */}
              <path d="M5 15 L5 5 L15 5" stroke="#D1D1D3" strokeWidth="0.4" fill="none" />
              <path d="M85 5 L95 5 L95 15" stroke="#D1D1D3" strokeWidth="0.4" fill="none" />
              <path d="M95 135 L95 145 L85 145" stroke="#D1D1D3" strokeWidth="0.4" fill="none" />
              <path d="M15 145 L5 145 L5 135" stroke="#D1D1D3" strokeWidth="0.4" fill="none" />
            </svg>
          </div>

          {/* Center - 3D Exploded Device */}
          <div className="relative z-10 w-[320px] h-[480px] sm:w-[400px] sm:h-[600px] md:w-[500px] md:h-[700px] lg:w-[600px] lg:h-[800px]">
            <ExplodedDeviceScene 
              exploded={true} 
              autoRotate={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
