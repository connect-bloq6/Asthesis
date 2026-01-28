'use client'

import { useRef, useState, useEffect } from 'react'

interface PowerReliabilitySectionProps {
  scrollProgress: number
}

export default function PowerReliabilitySection({ scrollProgress }: PowerReliabilitySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Only start appearing after animation 6 has progressed 50%
  // This ensures it syncs with the animation completion and doesn't appear too early
  const startThreshold = 0.5
  const adjustedProgress = scrollProgress > startThreshold 
    ? Math.min(1, (scrollProgress - startThreshold) / (1 - startThreshold))
    : 0
  const opacity = adjustedProgress

  return (
    <section 
      ref={sectionRef} 
      data-power-reliability-section
      className="relative min-h-screen bg-background px-8 md:px-16 lg:px-24 py-32 flex flex-col justify-center"
      style={{
        opacity: opacity,
        transform: `translateY(${(1 - adjustedProgress) * 50}px)`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
        marginTop: '20vh'
      }}
    >
      <div 
        className="max-w-xl w-full px-4 md:px-0" 
        style={{ 
          marginTop: '3vh',
          position: 'relative',
          left: isMobile ? '50%' : `calc(50% + ${adjustedProgress * 25}%)`,
          transform: 'translateX(-50%)',
          transition: 'left 0.1s ease-out'
        }}
      >
        {/* THE INTERFACE Label */}
        <div 
          className="mb-4"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(18px, 4vw, 24px)',
            lineHeight: 'clamp(20px, 4vw, 20px)',
            letterSpacing: '0px',
            textTransform: 'uppercase',
            color: '#999999',
            textAlign: 'left'
          }}
        >
          THE INTERFACE
        </div>

        {/* Main Headline */}
        <h2 
          className="mb-8"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(24px, 6vw, 32px)',
            lineHeight: 'clamp(28px, 7vw, 38px)',
            letterSpacing: '0px',
            textTransform: 'uppercase',
            color: '#1D1D1F',
            textAlign: 'left'
          }}
        >
          POWER, DESIGNED FOR RELIABILITY
        </h2>

        {/* Body Paragraphs */}
        <p 
          className="mb-6 max-w-3xl"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(14px, 3vw, 16px)',
            lineHeight: 'clamp(20px, 4vw, 24px)',
            letterSpacing: '0px',
            color: '#6F6F6F',
            textAlign: 'left'
          }}
        >
          The internal battery is optimized for long-term stability and consistent performance.
        </p>

        <p 
          className="mb-8 max-w-3xl"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(14px, 3vw, 16px)',
            lineHeight: 'clamp(20px, 4vw, 24px)',
            letterSpacing: '0px',
            color: '#6F6F6F',
            textAlign: 'left'
          }}
        >
          Designed to support continuous operation, it ensures Asthesis remains present and dependable—day and night, without interruption.
        </p>
      </div>
    </section>
  )
}

