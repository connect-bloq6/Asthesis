'use client'

import { useRef } from 'react'

export default function ComingSoonSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section 
      ref={sectionRef} 
      data-coming-soon-section
      className="relative min-h-screen px-8 md:px-16 lg:px-24 py-32 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #242424 100%)',
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 
          className="text-white text-center px-4"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 8vw, 48px)',
            lineHeight: 'clamp(40px, 9vw, 56px)',
            letterSpacing: '0px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Coming Soon
        </h2>
        <p 
          className="text-white/60 text-center max-w-2xl px-4"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(14px, 3vw, 18px)',
            lineHeight: 'clamp(20px, 4vw, 24px)',
            letterSpacing: '0px',
          }}
        >
          More features and updates are on the way
        </p>
      </div>
    </section>
  )
}

