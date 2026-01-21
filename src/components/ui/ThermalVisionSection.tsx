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
      {/* Outer circle */}
      <circle cx="24" cy="24" r="18" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      {/* Middle circle */}
      <circle cx="24" cy="24" r="12" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      {/* Inner circle */}
      <circle cx="24" cy="24" r="6" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      {/* Center dot */}
      <circle cx="24" cy="24" r="2" fill="#1D1D1F" />
      {/* Radar waves */}
      <path d="M24 6 C26 6 28 7 29 8" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M32 10 C34 12 35 14 35 16" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Cross lines */}
      <path d="M24 6 L24 42 M6 24 L42 24" stroke="#1D1D1F" strokeWidth="0.5" opacity="0.5" />
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
      <circle cx="24" cy="10" r="5" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      {/* Body - running pose */}
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

// Cloud Analytics icon
function CloudIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cloud */}
      <path 
        d="M12 32 C6 32 4 26 8 22 C6 16 12 12 18 14 C20 8 30 6 36 12 C42 10 46 16 44 24 C48 28 44 34 38 32 Z" 
        stroke="#1D1D1F" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinejoin="round"
      />
      {/* Chart bars */}
      <path d="M18 28 L18 24" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 28 L24 20" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 28 L30 22" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" />
      {/* Magnifying glass */}
      <circle cx="36" cy="36" r="5" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      <path d="M40 40 L44 44" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Thermal Vision icon for screen
function ThermalIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 80 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Thermal camera body */}
      <rect x="20" y="12" width="40" height="36" rx="4" stroke="white" strokeWidth="2" fill="none" />
      {/* Screen inside */}
      <rect x="26" y="18" width="28" height="20" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Thermal pattern lines */}
      <path d="M30 24 Q35 20 40 26 Q45 32 50 28" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M30 30 Q35 26 40 32 Q45 36 50 32" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Handle */}
      <path d="M40 48 L40 62" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Grip */}
      <rect x="34" y="58" width="12" height="10" rx="2" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  )
}

export default function ThermalVisionSection() {
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
          <div className="absolute left-4 sm:left-8 md:left-16 lg:left-24 xl:left-32 flex flex-col gap-16 md:gap-24">
            <RadarIcon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-70" />
            <PersonIcon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-70" />
          </div>

          {/* Right Side - Feature Icon */}
          <div className="absolute right-4 sm:right-8 md:right-16 lg:right-24 xl:right-32 flex items-center">
            <CloudIcon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-70" />
          </div>

          {/* Diamond Shape Behind Product */}
          <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[520px] md:h-[520px] lg:w-[620px] lg:h-[620px]">
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
            
            {/* Cross icons on diamond corners */}
            <CrossIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
            <CrossIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-40" />
            <CrossIcon className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
            <CrossIcon className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 opacity-40" />
          </div>

          {/* Center - Product with Screen Content */}
          <div className="relative z-10 w-[220px] h-[340px] sm:w-[280px] sm:h-[430px] md:w-[320px] md:h-[490px] lg:w-[360px] lg:h-[550px]">
            {/* Device Body */}
            <div className="w-full h-full bg-gradient-to-b from-accent-gold/50 to-accent-gold/70 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
              
              {/* Screen Area */}
              <div className="flex-1 m-3 md:m-4 bg-gradient-to-br from-gray-900 to-black rounded-[1.25rem] md:rounded-[1.5rem] relative flex flex-col items-center justify-center">
                {/* Thermal Vision Icon */}
                <ThermalIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                
                {/* Label */}
                <span className="text-white text-sm md:text-base lg:text-lg font-medium mt-4">
                  Thermal Vision
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

