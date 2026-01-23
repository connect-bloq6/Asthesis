'use client'

import { useRef, useEffect, useState } from 'react'

interface FeaturesSectionProps {
  scrollProgress: number
  featureScrollProgress?: number
}

export default function FeaturesSection({ scrollProgress, featureScrollProgress = 0 }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [localScrollProgress, setLocalScrollProgress] = useState(0)
  
  // Start appearing as animation 8 progresses
  const sectionOpacity = scrollProgress >= 1 ? 1 : scrollProgress
  const sectionTransform = scrollProgress >= 1 ? 0 : (1 - scrollProgress) * 50

  const features = [
    { 
      name: 'Lidar gait mapping', 
      hasChevron: false,
      description: 'Understands daily movement patterns to identify changes without constant attention'
    },
    { 
      name: 'Thermal vision', 
      hasChevron: false,
      description: 'Detects temperature variations for health monitoring and environmental awareness'
    },
    { 
      name: 'Dual HD cameras', 
      hasChevron: 'up',
      description: 'Provides visual context when permitted using physical privacy shutter controls'
    },
    { 
      name: 'CO2 +', 
      hasChevron: false,
      description: 'Monitors air quality and environmental conditions in real-time'
    },
    { 
      name: 'One-touch', 
      hasChevron: 'down',
      description: 'Instant emergency alerts and quick access to essential functions'
    },
    { 
      name: 'Cloud analytics', 
      hasChevron: false,
      description: 'Advanced data processing and insights powered by secure cloud infrastructure'
    },
    { 
      name: 'Immutable log', 
      hasChevron: false,
      description: 'Tamper-proof record keeping ensures data integrity and compliance'
    }
  ]

  // Reference to the features list container
  const featuresListRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position relative to the features list for instant feature switching
  useEffect(() => {
    const handleScroll = () => {
      if (!featuresListRef.current) return
      
      const rect = featuresListRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // FIXED: Progress starts when list top reaches 80% of viewport (visible area)
      // Progress ends when list bottom reaches 20% of viewport
      // This ensures features cycle while the list is actually visible on screen
      
      const startTrigger = windowHeight * 0.8 // List top at 80% of viewport height
      const endTrigger = windowHeight * 0.2   // List bottom at 20% of viewport height
      
      const listHeight = rect.height
      
      // Calculate progress based on where the list is in the viewport
      // Progress = 0 when rect.top = startTrigger (list just becoming visible)
      // Progress = 1 when rect.bottom = endTrigger (list about to leave)
      
      const totalScrollDistance = (startTrigger - endTrigger) + listHeight
      const currentPosition = startTrigger - rect.top
      
      let progress = currentPosition / totalScrollDistance
      progress = Math.max(0, Math.min(1, progress))
      
      setLocalScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate which feature is currently active based on scroll progress
  // Instant snap - like three.js scroll animations
  const getActiveFeatureIndex = (): number => {
    const totalFeatures = features.length
    // Map scroll progress (0-1) directly to feature index (0-6)
    // No multiplier - features cycle exactly through the section scroll
    const activeIndex = Math.floor(localScrollProgress * totalFeatures)
    return Math.min(activeIndex, totalFeatures - 1)
  }
  
  const activeFeatureIndex = getActiveFeatureIndex()
  
  // Check if a feature is the active one (instant, no interpolation)
  // First feature is active when progress is 0 (section just entered)
  const isFeatureActive = (index: number): boolean => {
    // Special case: when progress is exactly 0, first feature should be active
    if (localScrollProgress === 0 && index === 0) return false // Not started yet
    if (localScrollProgress > 0 && index === activeFeatureIndex) return true
    return false
  }

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
        <div ref={featuresListRef} className="space-y-4">
          {features.map((feature, index) => {
            const isActive = isFeatureActive(index)
            
            return (
              <div key={index} className="flex items-start gap-3">
                {/* Chevron arrow on the left side */}
                {feature.hasChevron && (
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-2.5">
                    {feature.hasChevron === 'up' && (
                      <svg 
                        className="w-4 h-4 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                    {feature.hasChevron === 'down' && (
                      <svg 
                        className="w-4 h-4 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                )}
                {!feature.hasChevron && <div className="flex-shrink-0 w-5 h-5" />}

                {/* Feature Button - INSTANT state change, no transitions */}
                <div
                  className="inline-flex flex-col text-left"
                  style={{
                    backgroundColor: '#1E1E20',
                    borderRadius: '24px',
                    padding: isActive ? '12px 16px' : '10px 16px',
                    minWidth: isActive ? '420px' : 'fit-content',
                    maxWidth: '450px',
                  }}
                >
                  {/* Content container with plus icon */}
                  <div className="flex items-start gap-3">
                    {/* Plus icon in circle */}
                    <div 
                      className="flex-shrink-0 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid #FFFFFF',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                        <path 
                          d="M7 3V11M3 7H11" 
                          stroke="white" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    
                    {/* Text content - INSTANT switch between title and description */}
                    <div className="flex-1">
                      {isActive ? (
                        /* Description - shown instantly when active */
                        <p
                          className="text-white"
                          style={{
                            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '0px',
                            margin: 0,
                          }}
                        >
                          {feature.description}
                        </p>
                      ) : (
                        /* Feature title - shown when not active */
                        <span 
                          className="text-white"
                          style={{
                            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                            fontWeight: 500,
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '0px',
                          }}
                        >
                          {feature.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

