'use client'

import { useEffect, useState, useRef } from 'react'

interface StyleSectionProps {
  scrollProgress: number
}

export default function StyleSection({ scrollProgress }: StyleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section 
      ref={sectionRef} 
      data-style-section
      className="relative min-h-screen bg-background px-8 md:px-16 lg:px-24 py-32 flex flex-col justify-center"
      style={{
        opacity: scrollProgress,
        transform: `translateY(${(1 - scrollProgress) * 50}px)`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
        marginTop: '-7vh'
      }}
    >
      <div className="max-w-4xl w-full px-4 md:px-0 md:ml-auto" style={{ marginTop: '-7vh' }}>
        {/* STYLE Label */}
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
          STYLE
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
          AWARENESS WITHOUT SURVEILLANCE
        </h2>

        {/* Body Paragraph */}
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
          Asthesis understands patterns, not people. By observing rhythms of daily life — movement, presence, and environmental context — it builds an understanding of what is normal, and recognizes when something changes.
        </p>
      </div>
    </section>
  )
}
