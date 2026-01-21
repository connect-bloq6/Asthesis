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

// Thermal camera icon
function ThermalCameraIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="12" y="8" width="24" height="18" rx="2" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      <path d="M16 16 Q20 12 24 18 Q28 22 32 16" stroke="#1D1D1F" strokeWidth="1" fill="none" />
      <path d="M24 26 L24 38" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" />
      <rect x="18" y="36" width="12" height="6" rx="1" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
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
      <path 
        d="M12 32 C6 32 4 26 8 22 C6 16 12 12 18 14 C20 8 30 6 36 12 C42 10 46 16 44 24 C48 28 44 34 38 32 Z" 
        stroke="#1D1D1F" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M18 28 L18 24" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 28 L24 20" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 28 L30 22" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="36" r="5" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
      <path d="M40 40 L44 44" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Motion person icon for screen
function MotionPersonIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 80 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle cx="40" cy="16" r="8" stroke="white" strokeWidth="2" fill="none" />
      {/* Body in motion */}
      <path 
        d="M40 24 L40 45" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      {/* Arms */}
      <path 
        d="M40 32 L28 40 M40 32 L52 28" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      {/* Arm joints */}
      <circle cx="28" cy="40" r="2" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="52" cy="28" r="2" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Legs in running pose */}
      <path 
        d="M40 45 L30 62 M40 45 L52 58" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      {/* Leg joints/feet */}
      <circle cx="30" cy="62" r="2" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="52" cy="58" r="2" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export default function MotionSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="relative flex items-center justify-center">
          
          {/* Left Side - Feature Icon */}
          <div className="absolute left-4 sm:left-8 md:left-16 lg:left-24 xl:left-32 flex items-center">
            <RadarIcon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-70" />
          </div>

          {/* Right Side - Feature Icons */}
          <div className="absolute right-4 sm:right-8 md:right-16 lg:right-24 xl:right-32 flex items-center gap-8 md:gap-12">
            <ThermalCameraIcon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-70" />
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
                {/* Motion Person Icon */}
                <MotionPersonIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                
                {/* Label */}
                <span className="text-white text-sm md:text-base lg:text-lg font-medium mt-4">
                  Motion
                </span>
              </div>

              {/* Bottom Section with Dial */}
              <div className="h-[35%] flex items-center justify-center pb-4 md:pb-6 relative">
                <div className="w-[45%] aspect-square rounded-full bg-gradient-to-br from-accent-gold/80 to-accent-gold/60 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-2 border-accent-gold/40 flex items-center justify-center">
                    <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-accent-gold/90 to-accent-gold/70 flex items-center justify-center">
                      <div className="w-[70%] h-[70%] rounded-full bg-gradient-to-b from-accent-gold to-yellow-700/80" />
                    </div>
                  </div>
                </div>
                <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-8 h-2 md:w-10 md:h-2.5 bg-accent-gold/60 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

