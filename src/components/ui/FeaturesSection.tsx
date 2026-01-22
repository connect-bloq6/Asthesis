'use client'

import { useRef } from 'react'

interface FeaturesSectionProps {
  scrollProgress: number
}

export default function FeaturesSection({ scrollProgress }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Start appearing as animation 8 progresses
  const opacity = scrollProgress

  const features = [
    'Lidar gait mapping',
    'Thermal vision',
    'Dual HD cameras',
    'CO₂ +',
    'One-touch',
    'Cloud analytics',
    'Immutable log'
  ]

  return (
    <section 
      ref={sectionRef} 
      data-features-section
      className="relative min-h-screen px-8 md:px-16 lg:px-24 py-32 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #242424 100%)',
        opacity: opacity,
        transform: `translateY(${(1 - scrollProgress) * 50}px)`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
      }}
    >
      <div className="w-full max-w-2xl">
        {/* Main Container - Dark rounded panel */}
        <div 
          className="rounded-2xl p-8 md:p-12 relative"
          style={{
            backgroundColor: '#000000',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Close button (X icon) */}
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                d="M15 5L5 15M5 5L15 15" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Features List */}
          <div className="space-y-4 mt-4">
            {features.map((feature, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-4 px-4 py-3 bg-[#2a2a2a] hover:bg-[#333333] rounded-lg transition-colors text-left group"
              >
                {/* Plus icon in circle */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/50 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path 
                      d="M7 3V11M3 7H11" 
                      stroke="white" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                
                {/* Feature text */}
                <span 
                  className="text-white text-base font-medium"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  }}
                >
                  {feature}
                </span>

                {/* Chevron icons for specific items */}
                {feature === 'Dual HD cameras' && (
                  <svg 
                    className="ml-auto w-5 h-5 text-white/40" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
                {feature === 'One-touch' && (
                  <svg 
                    className="ml-auto w-5 h-5 text-white/40" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

