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

// Lidar/Radar icon for screen
function LidarIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 80 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="40" cy="40" r="28" stroke="white" strokeWidth="2" fill="none" />
      {/* Middle circle */}
      <circle cx="40" cy="40" r="20" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Inner circle */}
      <circle cx="40" cy="40" r="12" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Center circle */}
      <circle cx="40" cy="40" r="4" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Cross lines */}
      <path d="M40 10 L40 70 M10 40 L70 40" stroke="white" strokeWidth="1" opacity="0.6" />
      {/* Signal waves */}
      <path d="M58 22 Q62 26 62 32" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M62 18 Q68 24 68 32" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Detection points */}
      <circle cx="30" cy="30" r="2" fill="white" />
      <circle cx="50" cy="35" r="2" fill="white" />
      <circle cx="35" cy="52" r="2" fill="white" />
    </svg>
  )
}

export default function LidarSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="relative flex items-center justify-center">
          
          {/* Left Side - Technical Lines */}
          <div className="absolute left-[10%] md:left-[15%] lg:left-[18%] top-1/2 -translate-y-1/2 hidden sm:block">
            <svg 
              width="80" 
              height="400" 
              viewBox="0 0 80 400" 
              fill="none"
              className="opacity-40"
            >
              <path d="M0 0 L0 400" stroke="#D1D1D3" strokeWidth="1" />
              <path d="M0 100 L80 100" stroke="#D1D1D3" strokeWidth="1" />
              <path d="M0 200 L80 200" stroke="#D1D1D3" strokeWidth="1" />
              <path d="M0 300 L80 300" stroke="#D1D1D3" strokeWidth="1" />
            </svg>
          </div>

          {/* Right Side - Feature Icons */}
          <div className="absolute right-4 sm:right-8 md:right-16 lg:right-24 xl:right-32 flex items-center gap-8 md:gap-12">
            <PersonIcon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-70" />
            <ThermalCameraIcon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-70" />
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
              <path d="M80 0 L80 400" stroke="#D1D1D3" strokeWidth="1" />
              <path d="M0 120 L80 120" stroke="#D1D1D3" strokeWidth="1" />
              <path d="M0 280 L80 280" stroke="#D1D1D3" strokeWidth="1" />
            </svg>
          </div>

          {/* Center - Product with Screen Content */}
          <div className="relative z-10 w-[220px] h-[340px] sm:w-[280px] sm:h-[430px] md:w-[320px] md:h-[490px] lg:w-[360px] lg:h-[550px]">
            {/* Device Body */}
            <div className="w-full h-full bg-gradient-to-b from-accent-gold/50 to-accent-gold/70 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
              
              {/* Screen Area */}
              <div className="flex-1 m-3 md:m-4 bg-gradient-to-br from-gray-900 to-black rounded-[1.25rem] md:rounded-[1.5rem] relative flex flex-col items-center justify-center">
                {/* Lidar Icon */}
                <LidarIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                
                {/* Label */}
                <span className="text-white text-sm md:text-base lg:text-lg font-medium mt-4">
                  Lidar Mapping
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

