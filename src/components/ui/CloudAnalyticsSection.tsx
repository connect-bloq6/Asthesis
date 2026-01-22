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

// Person/Activity icon
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
      {/* Head */}
      <circle cx="20" cy="10" r="5" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      {/* Body */}
      <path 
        d="M20 15 L20 28 M20 20 L12 26 M20 20 L28 14 M20 28 L14 40 M20 28 L28 38" 
        stroke="#1D1D1F" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

// Medical/IV Stand icon
function MedicalIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Monitor/Screen */}
      <rect x="12" y="8" width="24" height="18" rx="2" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      {/* Screen content - chart */}
      <path d="M16 20 L20 16 L24 19 L28 14 L32 17" stroke="#1D1D1F" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Stand */}
      <path d="M24 26 L24 38" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Base */}
      <path d="M18 38 L30 38" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Cable */}
      <path d="M24 38 L24 42 L20 42" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// Cloud Analytics icon for screen
function CloudAnalyticsIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 80 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cloud */}
      <path 
        d="M20 50 C10 50 6 42 10 35 C8 28 14 22 22 22 C24 14 34 10 44 14 C54 10 64 16 64 26 C72 28 74 38 68 45 C72 52 66 58 58 56 L20 56 C14 56 10 52 12 48" 
        stroke="white" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chart bars inside cloud */}
      <rect x="28" y="36" width="4" height="12" stroke="white" strokeWidth="1.5" fill="none" />
      <rect x="36" y="32" width="4" height="16" stroke="white" strokeWidth="1.5" fill="none" />
      <rect x="44" y="38" width="4" height="10" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Magnifying glass */}
      <circle cx="54" cy="52" r="8" stroke="white" strokeWidth="2" fill="none" />
      <path d="M60 58 L66 64" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function CloudAnalyticsSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="relative flex items-center justify-center">
          
          {/* Left Side - Feature Icons */}
          <div className="absolute left-0 md:left-8 lg:left-16 xl:left-24 flex flex-col gap-12 md:gap-16">
            <div className="flex items-center gap-4">
              <PersonIcon className="w-10 h-10 md:w-12 md:h-12 opacity-70" />
            </div>
            <div className="flex items-center gap-4">
              <MedicalIcon className="w-10 h-10 md:w-12 md:h-12 opacity-70" />
            </div>
          </div>

          {/* Technical Connection Lines */}
          <div className="absolute left-[15%] md:left-[20%] lg:left-[25%] top-1/2 -translate-y-1/2 hidden sm:block">
            <svg 
              width="120" 
              height="300" 
              viewBox="0 0 120 300" 
              fill="none"
              className="opacity-40"
            >
              {/* Vertical line */}
              <path d="M0 0 L0 300" stroke="#D1D1D3" strokeWidth="1" />
              {/* Horizontal connectors */}
              <path d="M0 100 L120 100" stroke="#D1D1D3" strokeWidth="1" />
              <path d="M0 200 L120 200" stroke="#D1D1D3" strokeWidth="1" />
            </svg>
          </div>

          {/* Right Side Technical Lines */}
          <div className="absolute right-[10%] md:right-[15%] lg:right-[20%] top-1/2 -translate-y-1/2 hidden sm:block">
            <svg 
              width="80" 
              height="400" 
              viewBox="0 0 80 400" 
              fill="none"
              className="opacity-40"
            >
              {/* Vertical line */}
              <path d="M80 0 L80 400" stroke="#D1D1D3" strokeWidth="1" />
              {/* Horizontal connectors */}
              <path d="M0 80 L80 80" stroke="#D1D1D3" strokeWidth="1" />
              <path d="M0 200 L80 200" stroke="#D1D1D3" strokeWidth="1" />
              <path d="M0 320 L80 320" stroke="#D1D1D3" strokeWidth="1" />
            </svg>
          </div>

          {/* Center - Product with Screen Content */}
          <div className="relative z-10 w-[220px] h-[340px] sm:w-[280px] sm:h-[430px] md:w-[320px] md:h-[490px] lg:w-[360px] lg:h-[550px]">
            {/* Device Body */}
            <div className="w-full h-full bg-gradient-to-b from-accent-gold/50 to-accent-gold/70 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
              
              {/* Screen Area */}
              <div className="flex-1 m-3 md:m-4 bg-gradient-to-br from-gray-900 to-black rounded-[1.25rem] md:rounded-[1.5rem] relative flex flex-col items-center justify-center">
                {/* Cloud Analytics Icon */}
                <CloudAnalyticsIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                
                {/* Label */}
                <span className="text-white text-sm md:text-base lg:text-lg font-medium mt-4">
                  Cloud Analytics
                </span>
              </div>

              {/* Bottom Section with Dial */}
              <div className="h-[35%] flex items-center justify-center pb-4 md:pb-6 relative">
                {/* Dial */}
                <div className="w-[45%] aspect-square rounded-full bg-gradient-to-br from-accent-gold/80 to-accent-gold/60 shadow-lg flex items-center justify-center">
                  {/* Knurled edge effect */}
                  <div className="w-full h-full rounded-full border-2 border-accent-gold/40 flex items-center justify-center">
                    {/* Inner dial ring */}
                    <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-accent-gold/90 to-accent-gold/70 flex items-center justify-center">
                      {/* Center */}
                      <div className="w-[70%] h-[70%] rounded-full bg-gradient-to-b from-accent-gold to-yellow-700/80" />
                    </div>
                  </div>
                </div>

                {/* Small indicator/button on right */}
                <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-8 h-2 md:w-10 md:h-2.5 bg-accent-gold/60 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

