'use client'

import { useRef, useEffect, useState } from 'react'

interface FeaturesSectionProps {
  scrollProgress: number
  ninthScrollProgress?: number
}

export default function FeaturesSection({ scrollProgress, ninthScrollProgress = 0 }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const firstButtonRef = useRef<HTMLButtonElement>(null)
  const [buttonWidth, setButtonWidth] = useState<number | null>(null)
  
  // Start appearing as animation 8 progresses, then stay fully visible and static during animation 9
  const sectionOpacity = scrollProgress >= 1 ? 1 : scrollProgress // Fully visible once animation 8 completes
  const sectionTransform = scrollProgress >= 1 ? 0 : (1 - scrollProgress) * 50 // Stop moving once animation 8 completes

  // Capture initial button width
  useEffect(() => {
    if (firstButtonRef.current && buttonWidth === null) {
      const width = firstButtonRef.current.offsetWidth
      setButtonWidth(width)
    }
  }, [buttonWidth])

  const features = [
    { name: 'Lidar gait mapping', hasChevron: false },
    { name: 'Thermal vision', hasChevron: false },
    { name: 'Dual HD cameras', hasChevron: 'up' },
    { name: 'CO2 +', hasChevron: false },
    { name: 'One-touch', hasChevron: 'down' },
    { name: 'Cloud analytics', hasChevron: false },
    { name: 'Immutable log', hasChevron: false }
  ]

  return (
    <section 
      ref={sectionRef} 
      data-features-section
      className="relative px-8 md:px-16 lg:px-24 py-32 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #242424 100%)',
        minHeight: '100vh',
        opacity: sectionOpacity,
        transform: `translateY(${sectionTransform}px)`,
        transition: scrollProgress < 1 ? 'opacity 0.1s ease-out, transform 0.1s ease-out' : 'none',
      }}
    >
      <div 
        style={{
          width: '1288px',
          height: '586px',
          padding: '40px',
          paddingTop: '70px',
          position: 'absolute',
          top: '171px',
          left: '112px',
          opacity: 1,
          backgroundColor: '#000000',
          borderRadius:'40px'
        }}
      >
        {/* Features List */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Chevron arrow on the left side */}
              {feature.hasChevron && (
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {feature.hasChevron === 'up' && (
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                  {feature.hasChevron === 'down' && (
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              )}
              {!feature.hasChevron && <div className="flex-shrink-0 w-6 h-6" />}

              {/* Feature Button */}
              <button
                ref={index === 0 ? firstButtonRef : null}
                className={`inline-flex rounded-lg transition-all duration-500 ease-out text-left group items-start ${
                  index === 0 && ninthScrollProgress > 0 ? 'flex-col' : 'items-center'
                } gap-4 px-4`}
                style={{
                  backgroundColor: '#1E1E20',
                  borderRadius: '40px',
                  paddingTop: '12px',
                  paddingBottom: index === 0 ? `${12 + ninthScrollProgress * 20}px` : '12px',
                  width: index === 0 && buttonWidth ? `${buttonWidth}px` : 'fit-content',
                  transition: 'padding-bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2a2a2a'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1E1E20'
                }}
              >
                {index === 0 ? (
                  // Option 1: Title fades out, description fades in
                  <div className="relative w-full" style={{ minHeight: ninthScrollProgress > 0 ? 'auto' : '44px' }}>
                    {/* Plus icon in circle - stays visible */}
                    <div 
                      className="flex-shrink-0 rounded-full flex items-center justify-center absolute"
                      style={{
                        width: '21px',
                        height: '21px',
                        border: '2.5px solid #FFFFFF',
                        opacity: 1,
                        left: 0,
                        top: '12px',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path 
                          d="M7 3V11M3 7H11" 
                          stroke="white" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    
                    {/* Title text - fades out */}
                    <div
                      className="flex items-center"
                      style={{
                        opacity: 1 - ninthScrollProgress,
                        paddingLeft: '37px', // Align with icon (21px + 16px gap)
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        position: ninthScrollProgress > 0 ? 'absolute' : 'relative',
                        width: '100%',
                        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        pointerEvents: 'none',
                      }}
                    >
                      <span 
                        className="text-white"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 600,
                          fontSize: '20px',
                          lineHeight: '20px',
                          letterSpacing: '0px',
                        }}
                      >
                        {feature.name}
                      </span>
                    </div>

                    {/* Description text - fades in */}
                    <div
                      style={{
                        opacity: ninthScrollProgress,
                        paddingLeft: '37px', // Align with icon (21px + 16px gap)
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <p
                        className="text-white"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '20px',
                          letterSpacing: '0px',
                          margin: 0,
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                        }}
                      >
                        Understands daily movement patterns to identify changes without constant attention
                      </p>
                    </div>
                  </div>
                ) : (
                  // Other options: Normal display
                  <div className="flex items-center gap-4">
                    {/* Plus icon in circle */}
                    <div 
                      className="flex-shrink-0 rounded-full flex items-center justify-center"
                      style={{
                        width: '21px',
                        height: '21px',
                        border: '2.5px solid #FFFFFF',
                        opacity: 1,
                      }}
                    >
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
                      className="text-white"
                      style={{
                        fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '20px',
                        letterSpacing: '0px',
                      }}
                    >
                      {feature.name}
                    </span>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

