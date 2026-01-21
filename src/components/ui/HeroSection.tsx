'use client'

import dynamic from 'next/dynamic'

// Dynamically import the 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/canvas/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground/60 rounded-full animate-spin" />
    </div>
  ),
})

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

interface HeroSectionProps {
  isLoaded?: boolean
}

export default function HeroSection({ isLoaded = false }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 overflow-hidden">
      {/* Decorative Plus Icons */}
      <PlusIcon className="absolute top-28 left-8 md:left-16 opacity-60" />
      <PlusIcon className="absolute top-28 right-8 md:right-16 opacity-60" />
      <PlusIcon className="absolute bottom-20 left-8 md:left-16 opacity-60" />
      <PlusIcon className="absolute bottom-20 right-8 md:right-16 opacity-60" />

      {/* Hero Text Content */}
      <div className="text-center px-4 mb-8 md:mb-12 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tight uppercase">
          A New Standard of Care
        </h1>
        <p className="mt-4 md:mt-6 text-sm md:text-base text-foreground/60 max-w-md mx-auto">
          Designed to support life—without getting in the way.
        </p>
      </div>

      {/* Diamond Shape with 3D Product */}
      <div className="relative w-full max-w-3xl mx-auto flex items-center justify-center mt-4">
        {/* Two Diamonds Meeting at Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Left Diamond - comes from left */}
          <div 
            className={`absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] ${
              isLoaded ? 'animate-diamond-from-left' : 'opacity-0 -translate-x-[100vw]'
            }`}
          >
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
            
            {/* Plus icons on diamond corners */}
            <PlusIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
            <PlusIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-40" />
            <PlusIcon className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
            <PlusIcon className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 opacity-40" />
          </div>

          {/* Right Diamond - comes from right */}
          <div 
            className={`absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] ${
              isLoaded ? 'animate-diamond-from-right' : 'opacity-0 translate-x-[100vw]'
            }`}
          >
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
            
            {/* Plus icons on diamond corners */}
            <PlusIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
            <PlusIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-40" />
            <PlusIcon className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
            <PlusIcon className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 opacity-40" />
          </div>
        </div>

        {/* 3D Product Canvas */}
        <div className="relative z-10 w-[300px] h-[400px] sm:w-[350px] sm:h-[480px] md:w-[400px] md:h-[550px] lg:w-[450px] lg:h-[600px]">
          <HeroScene />
        </div>
      </div>
    </section>
  )
}
