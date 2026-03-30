'use client'

import { useRef } from 'react'

interface FutureSectionProps {
  scrollProgress: number
}

export default function FutureSection({ scrollProgress }: FutureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Only start appearing after animation 7 has progressed 50%
  // This ensures it syncs with the animation completion and doesn't appear too early
  const startThreshold = 0.5
  const adjustedProgress = scrollProgress > startThreshold 
    ? Math.min(1, (scrollProgress - startThreshold) / (1 - startThreshold))
    : 0
  const opacity = adjustedProgress

  return (
    <section 
      ref={sectionRef} 
      data-future-section
      className="relative min-h-screen bg-background px-8 md:px-16 lg:px-24 py-32 flex flex-col items-center justify-center"
      style={{
        opacity: opacity,
        transform: `translateY(${(1 - adjustedProgress) * 50}px)`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Main Headline */}
        <h1 
          className="text-foreground text-center px-4"
          style={{
            marginTop: '40vh',
            fontFamily: 'var(--font-unbounded), Unbounded, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 8vw, 54px)',
            lineHeight: 'clamp(38px, 9vw, 63px)',
            letterSpacing: '0px',
            textAlign: 'center',
            color: '#1D1D1F',
            textTransform: 'uppercase',
          }}
        >
          THE FUTURE
        </h1>
      </div>
    </section>
  )
}
