'use client'

import { useEffect, useState, useRef } from 'react'

export default function SystemSection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Start fading in when section enters viewport
      // Complete when section is 30% scrolled through viewport
      const startTrigger = windowHeight
      const endTrigger = windowHeight * 0.7
      
      let progress = 0
      if (rect.top < startTrigger && rect.top > endTrigger) {
        progress = (startTrigger - rect.top) / (startTrigger - endTrigger)
      } else if (rect.top <= endTrigger) {
        progress = 1
      }
      
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-background px-8 md:px-16 lg:px-24 py-32 flex flex-col justify-center"
      style={{
        opacity: scrollProgress,
        transform: `translateY(${(1 - scrollProgress) * 30}px)`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
      }}
    >
      <div className="max-w-4xl w-full px-4 md:px-0" style={{ marginTop: '-7vh' }}>
        {/* SYSTEM Label */}
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
          SYSTEM
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
          A COMPLETE WELFARE INTELLIGENCE SYSTEM
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
          Asthesis goes beyond emergency response. It continuously learns, adapts, and responds to subtle changes in daily life — helping protect people before situations escalate.
        </p>

        {/* Bullet Points */}
        <ul className="space-y-4">
          {[
            'Wellness & behavior insights',
            'Safety & risk monitoring',
            'Mobility & environmental awareness',
            'Intelligent response & alerts'
          ].map((item, index) => (
            <li 
              key={index}
              className="flex items-start"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(14px, 3vw, 16px)',
                lineHeight: 'clamp(20px, 4vw, 24px)',
                letterSpacing: '0px',
                color: '#757575'
              }}
            >
              <span className="mr-3" style={{ color: '#757575' }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
