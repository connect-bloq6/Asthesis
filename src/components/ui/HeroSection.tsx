'use client'

import { useEffect, useState, useRef } from 'react'

interface HeroSectionProps {
  isLoaded?: boolean
}

export default function HeroSection({ isLoaded = false }: HeroSectionProps) {
  const [diamondsVisible, setDiamondsVisible] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [extendedScrollProgress, setExtendedScrollProgress] = useState(0)
  const [thirdScrollProgress, setThirdScrollProgress] = useState(0)
  const [fourthScrollProgress, setFourthScrollProgress] = useState(0)
  const [fifthScrollProgress, setFifthScrollProgress] = useState(0)
  const [sixthScrollProgress, setSixthScrollProgress] = useState(0)
  const [seventhScrollProgress, setSeventhScrollProgress] = useState(0)
  const [eighthScrollProgress, setEighthScrollProgress] = useState(0)
  const [ninthScrollProgress, setNinthScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollAtCenterRef = useRef<number | null>(null)

  useEffect(() => {
    if (isLoaded) {
      // Start diamond animation after a short delay to ensure smooth transition
      const timer = setTimeout(() => {
        setDiamondsVisible(true)
        // Mark animation as complete after animation duration (1.6s)
        setTimeout(() => {
          setAnimationComplete(true)
        }, 1600)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress based on window scroll position
      // Animation 1: Start animating when user starts scrolling, complete after scrolling 800px
      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const maxScroll = 800 // pixels to scroll for full animation 1
      const scrollDelay = windowHeight * 0.10 // 10% of viewport height delay
      const extendedScrollStart = maxScroll + scrollDelay // Start animation 2 after animation 1 + 10% delay
      const extendedScrollRange = 800 // Additional pixels for animation 2
      
      // Animation 1 progress (0 to 800px)
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
      setScrollProgress(progress)
      
      // Animation 2 progress (starts after 800px + 10% delay, completes after additional 800px)
      // This creates a smooth transition from animation 1 to animation 2 with a 10% scroll delay
      let extendedProgress = 0
      if (scrollY >= extendedScrollStart) {
        extendedProgress = Math.min(1, (scrollY - extendedScrollStart) / extendedScrollRange)
      }
      setExtendedScrollProgress(extendedProgress)
      
      // Animation 3: Starts when StyleSection reaches center + 10% delay
      // Find StyleSection element to track when it reaches center
      const styleSection = document.querySelector('[data-style-section]') as HTMLElement
      let thirdProgress = 0
      
      if (styleSection) {
        const rect = styleSection.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2
        
        // Track when section center first reaches viewport center
        if (sectionCenter <= viewportCenter && scrollAtCenterRef.current === null) {
          // Calculate scroll position when section center is at viewport center
          const distanceFromCenter = sectionCenter - viewportCenter
          scrollAtCenterRef.current = scrollY + distanceFromCenter
        }
        
        // If we've tracked when it reached center, calculate third animation progress
        if (scrollAtCenterRef.current !== null) {
          const thirdScrollDelay = windowHeight * 0.10 // 10% delay
          const thirdAnimationStart = scrollAtCenterRef.current + thirdScrollDelay
          const thirdScrollRange = 800 // pixels for full animation 3 (20% faster - reduced from 1000px)
          
          if (scrollY >= thirdAnimationStart) {
            thirdProgress = Math.min(1, (scrollY - thirdAnimationStart) / thirdScrollRange)
          }
        }
      }
      
      setThirdScrollProgress(thirdProgress)
      
      // Animation 4: Starts when animation 3 completes + 10% delay
      let fourthProgress = 0
      if (scrollAtCenterRef.current !== null) {
        const thirdScrollDelay = windowHeight * 0.10
        const thirdAnimationStart = scrollAtCenterRef.current + thirdScrollDelay
        const thirdScrollRange = 800
        const fourthAnimationStart = thirdAnimationStart + thirdScrollRange + (windowHeight * 0.10) // Animation 3 end + 10% delay
        const fourthScrollRange = 800 // pixels for full animation 4
        
        if (scrollY >= fourthAnimationStart) {
          fourthProgress = Math.min(1, (scrollY - fourthAnimationStart) / fourthScrollRange)
        }
      }
      
      setFourthScrollProgress(fourthProgress)
      
      // Animation 5: Starts when animation 4 completes + 10% delay
      let fifthProgress = 0
      if (scrollAtCenterRef.current !== null) {
        const thirdScrollDelay = windowHeight * 0.10
        const thirdAnimationStart = scrollAtCenterRef.current + thirdScrollDelay
        const thirdScrollRange = 800
        const fourthAnimationStart = thirdAnimationStart + thirdScrollRange + (windowHeight * 0.10)
        const fourthScrollRange = 800
        const fifthAnimationStart = fourthAnimationStart + fourthScrollRange + (windowHeight * 0.10) // Animation 4 end + 10% delay
        const fifthScrollRange = 800 // pixels for full animation 5
        
        if (scrollY >= fifthAnimationStart) {
          fifthProgress = Math.min(1, (scrollY - fifthAnimationStart) / fifthScrollRange)
        }
      }
      
      setFifthScrollProgress(fifthProgress)
      
      // Animation 6: Starts when animation 5 completes + 10% delay
      let sixthProgress = 0
      if (scrollAtCenterRef.current !== null) {
        const thirdScrollDelay = windowHeight * 0.10
        const thirdAnimationStart = scrollAtCenterRef.current + thirdScrollDelay
        const thirdScrollRange = 800
        const fourthAnimationStart = thirdAnimationStart + thirdScrollRange + (windowHeight * 0.10)
        const fourthScrollRange = 800
        const fifthAnimationStart = fourthAnimationStart + fourthScrollRange + (windowHeight * 0.10)
        const fifthScrollRange = 800
        const sixthAnimationStart = fifthAnimationStart + fifthScrollRange + (windowHeight * 0.10) // Animation 5 end + 10% delay
        const sixthScrollRange = 800 // pixels for full animation 6
        
        if (scrollY >= sixthAnimationStart) {
          sixthProgress = Math.min(1, (scrollY - sixthAnimationStart) / sixthScrollRange)
        }
      }
      
      setSixthScrollProgress(sixthProgress)
      
      // Animation 7: Starts when animation 6 completes + 10% delay
      let seventhProgress = 0
      if (scrollAtCenterRef.current !== null) {
        const thirdScrollDelay = windowHeight * 0.10
        const thirdAnimationStart = scrollAtCenterRef.current + thirdScrollDelay
        const thirdScrollRange = 800
        const fourthAnimationStart = thirdAnimationStart + thirdScrollRange + (windowHeight * 0.10)
        const fourthScrollRange = 800
        const fifthAnimationStart = fourthAnimationStart + fourthScrollRange + (windowHeight * 0.10)
        const fifthScrollRange = 800
        const sixthAnimationStart = fifthAnimationStart + fifthScrollRange + (windowHeight * 0.10)
        const sixthScrollRange = 800
        const seventhAnimationStart = sixthAnimationStart + sixthScrollRange + (windowHeight * 0.10) // Animation 6 end + 10% delay
        const seventhScrollRange = 800 // pixels for full animation 7
        
        if (scrollY >= seventhAnimationStart) {
          seventhProgress = Math.min(1, (scrollY - seventhAnimationStart) / seventhScrollRange)
        }
      }
      
      setSeventhScrollProgress(seventhProgress)
      
      // Animation 8: Starts when animation 7 completes + 10% delay
      let eighthProgress = 0
      if (scrollAtCenterRef.current !== null) {
        const thirdScrollDelay = windowHeight * 0.10
        const thirdAnimationStart = scrollAtCenterRef.current + thirdScrollDelay
        const thirdScrollRange = 800
        const fourthAnimationStart = thirdAnimationStart + thirdScrollRange + (windowHeight * 0.10)
        const fourthScrollRange = 800
        const fifthAnimationStart = fourthAnimationStart + fourthScrollRange + (windowHeight * 0.10)
        const fifthScrollRange = 800
        const sixthAnimationStart = fifthAnimationStart + fifthScrollRange + (windowHeight * 0.10)
        const sixthScrollRange = 800
        const seventhAnimationStart = sixthAnimationStart + sixthScrollRange + (windowHeight * 0.10)
        const seventhScrollRange = 800
        const eighthAnimationStart = seventhAnimationStart + seventhScrollRange + (windowHeight * 0.01) // Animation 8 starts at 30% of animation 7 (earlier)
        const eighthScrollRange = 800 // pixels for full animation 8
        
        if (scrollY >= eighthAnimationStart) {
          eighthProgress = Math.min(1, (scrollY - eighthAnimationStart) / eighthScrollRange)
        }
      }
      
      setEighthScrollProgress(eighthProgress)
      
      // Animation 9: Starts when animation 8 completes + 10% delay
      let ninthProgress = 0
      if (scrollAtCenterRef.current !== null) {
        const thirdScrollDelay = windowHeight * 0.10
        const thirdAnimationStart = scrollAtCenterRef.current + thirdScrollDelay
        const thirdScrollRange = 800
        const fourthAnimationStart = thirdAnimationStart + thirdScrollRange + (windowHeight * 0.10)
        const fourthScrollRange = 800
        const fifthAnimationStart = fourthAnimationStart + fourthScrollRange + (windowHeight * 0.10)
        const fifthScrollRange = 800
        const sixthAnimationStart = fifthAnimationStart + fifthScrollRange + (windowHeight * 0.10)
        const sixthScrollRange = 800
        const seventhAnimationStart = sixthAnimationStart + sixthScrollRange + (windowHeight * 0.10)
        const seventhScrollRange = 800
        const eighthAnimationStart = seventhAnimationStart + seventhScrollRange + (windowHeight * 0.10)
        const eighthScrollRange = 800
        const ninthAnimationStart = eighthAnimationStart + eighthScrollRange + (windowHeight * 0.10) // Animation 8 end + 10% delay
        const ninthScrollRange = 800 // pixels for full animation 9
        
        if (scrollY >= ninthAnimationStart) {
          ninthProgress = Math.min(1, (scrollY - ninthAnimationStart) / ninthScrollRange)
        }
      }
      
      setNinthScrollProgress(ninthProgress)
      
      // Debug log (remove in production)
      // console.log('Scroll Y:', scrollY, 'Progress 1:', progress, 'Progress 2:', extendedProgress, 'Progress 3:', thirdProgress, 'Progress 4:', fourthProgress, 'Progress 5:', fifthProgress, 'Progress 6:', sixthProgress, 'Progress 7:', seventhProgress, 'Progress 8:', eighthProgress, 'Progress 9:', ninthProgress)
    }

    // Use requestAnimationFrame for smoother updates
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
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col bg-background">
      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-32 pb-20 md:pt-32 md:pb-20">
        {/* Main Headline */}
        <h1 
          className="text-foreground mb-6 text-center"
          style={{
            fontFamily: 'var(--font-unbounded), Unbounded, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 8vw, 54px)',
            lineHeight: 'clamp(34px, 9vw, 63px)',
            letterSpacing: '0px',
            textAlign: 'center',
          }}
        >
          A NEW STANDARD OF CARE
        </h1>
        
        {/* Sub-headline */}
        <p 
          className="text-center max-w-2xl px-4"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(12px, 3vw, 14px)',
            lineHeight: 'clamp(18px, 4vw, 24px)',
            letterSpacing: '0px',
            textAlign: 'center',
            color: '#878787',
          }}
        >
          Designed to support life—without getting in the way.
        </p>
      </div>

      {/* Geometric Pattern Container - Fixed position so diamonds stay in place */}
      <div className="fixed bottom-0 left-0 right-0 w-full h-[50vh] min-h-[300px] md:h-[60vh] md:min-h-[400px] pointer-events-none z-10">
        {/* Corner Plus Signs */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 w-4 h-4 md:w-6 md:h-6 text-foreground/60 pointer-events-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8 w-4 h-4 md:w-6 md:h-6 text-foreground/60 pointer-events-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-4 h-4 md:w-6 md:h-6 text-foreground/60 pointer-events-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-4 h-4 md:w-6 md:h-6 text-foreground/60 pointer-events-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Diamond Pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Left Diamond */}
          <svg
            className={`absolute ${diamondsVisible ? (animationComplete ? '' : 'animate-diamond-from-left') : 'opacity-0'} w-[280px] h-[280px] md:w-[540px] md:h-[540px]`}
            viewBox="0 0 500 500"
            style={{ 
              transform: animationComplete 
                ? `translateX(calc(-20% - ${thirdScrollProgress * 125}% + ${fourthScrollProgress * 150}% - ${fifthScrollProgress * 150}% + ${sixthScrollProgress * 125}%)) translateY(calc(-10% + ${scrollProgress * 15}% - ${extendedScrollProgress * 30}% + ${thirdScrollProgress * 15}%)) rotate(${extendedScrollProgress * 90 - thirdScrollProgress * 45 - fourthScrollProgress * 45 - fifthScrollProgress * 45 - sixthScrollProgress * 45 + seventhScrollProgress * 90}deg)`
                : undefined,
              transformOrigin: 'center center',
              willChange: 'transform',
              opacity: eighthScrollProgress > 0 ? 0 : undefined,
              transition: eighthScrollProgress > 0 ? 'opacity 0.3s ease-out' : undefined,
              ...(animationComplete && { animation: 'none' })
            }}
          >
            {/* Diamond Shape */}
            <polygon
              points="250,50 450,250 250,450 50,250"
              fill="none"
              stroke="#D1D1D1"
              strokeWidth="1.5"
            />
            {/* Plus signs at vertices */}
            <g className="text-foreground/60">
              <g transform="translate(250, 50)">
                <path d="M0,-3V3M-3,0H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
              <g transform="translate(450, 250)">
                <path d="M0,-3V3M-3,0H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
              <g transform="translate(250, 450)">
                <path d="M0,-3V3M-3,0H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
              <g transform="translate(50, 250)">
                <path d="M0,-3V3M-3,0H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
            </g>
          </svg>

          {/* Right Diamond */}
          <svg
            className={`absolute ${diamondsVisible ? (animationComplete ? '' : 'animate-diamond-from-right') : 'opacity-0'} w-[280px] h-[280px] md:w-[540px] md:h-[540px]`}
            viewBox="0 0 500 500"
            style={{ 
              transform: animationComplete
                ? `translateX(calc(20% + ${thirdScrollProgress * 125}% - ${fourthScrollProgress * 140}% + ${fifthScrollProgress * 140}% - ${sixthScrollProgress * 125}%)) translateY(calc(-10% + ${seventhScrollProgress * 15}%)) rotate(${scrollProgress * 90 - extendedScrollProgress * 90 + thirdScrollProgress * 45 - sixthScrollProgress * 45}deg)`
                : undefined,
              transformOrigin: 'center center',
              willChange: 'transform',
              opacity: eighthScrollProgress > 0 ? 0 : undefined,
              transition: eighthScrollProgress > 0 ? 'opacity 0.3s ease-out' : undefined,
              ...(animationComplete && { animation: 'none' })
            }}
          >
            {/* Diamond Shape */}
            <polygon
              points="250,50 450,250 250,450 50,250"
              fill="none"
              stroke="#D1D1D1"
              strokeWidth="1.5"
            />
            {/* Plus signs at vertices */}
            <g className="text-foreground/60">
              <g transform="translate(250, 50)">
                <path d="M0,-3V3M-3,0H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
              <g transform="translate(450, 250)">
                <path d="M0,-3V3M-3,0H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
              <g transform="translate(250, 450)">
                <path d="M0,-3V3M-3,0H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
              <g transform="translate(50, 250)">
                <path d="M0,-3V3M-3,0H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
            </g>
          </svg>
        </div>

        {/* Device Image - comes from bottom over diamonds */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {/* First Image - Adobe Express */}
          <img
            src="/images/Adobe Express - file(9)_upscayl_5x_high-fidelity-4x 2.png"
            alt="Device"
            className={`max-w-[90vw] max-h-[50vh] md:max-w-[800px] md:max-h-[800px] object-contain absolute pointer-events-none`}
            style={{
              opacity: diamondsVisible ? Math.max(0, 1 - thirdScrollProgress) : 0,
              marginTop: '-5%',
              willChange: 'transform, opacity',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              ...(animationComplete 
                ? {
                    animation: 'none',
                    transform: `translateY(0) translateX(calc(${scrollProgress * 30}% - ${extendedScrollProgress * 75}%)) scaleX(${1 - extendedScrollProgress * 2})`
                  }
                : diamondsVisible 
                  ? {
                      animation: 'image-from-bottom 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }
                  : {}
              )
            }}
          />
          {/* Second Image - Group 101127 (appears with scroll progress 3, fades out with scroll progress 4) */}
          <img
            src="/images/Group 101127.png"
            alt="Device Exploded"
            className={`max-w-[85vw] max-h-[45vh] md:max-w-[700px] md:max-h-[700px] object-contain absolute pointer-events-none`}
            style={{
              opacity: diamondsVisible ? Math.max(0, Math.min(1, thirdScrollProgress) * (1 - fourthScrollProgress)) : 0,
              marginTop: '-5%',
              willChange: 'transform, opacity',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              ...(animationComplete 
                ? {
                    animation: 'none',
                    transform: `translateY(0) translateX(calc(${scrollProgress * 30}% - ${extendedScrollProgress * 75}%)) scaleX(1)`
                  }
                : {}
              )
            }}
          />
          {/* Third Image - Group 101128 (appears with scroll progress 4, fades out with scroll progress 5) */}
          <img
            src="/images/Group 101128.png"
            alt="Device Exploded View 2"
            className={`max-w-[85vw] max-h-[45vh] md:max-w-[700px] md:max-h-[700px] object-contain absolute pointer-events-none`}
            style={{
              opacity: diamondsVisible ? Math.max(0, Math.min(1, fourthScrollProgress) * (1 - fifthScrollProgress)) : 0,
              marginTop: '-5%',
              willChange: 'transform, opacity',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              ...(animationComplete 
                ? {
                    animation: 'none',
                    transform: `translateY(0) translateX(calc(${scrollProgress * 30}% - ${extendedScrollProgress * 75}%)) scaleX(1)`
                  }
                : {}
              )
            }}
          />
          {/* Fourth Image - Group 101129 (appears with scroll progress 5, fades out with scroll progress 6) */}
          <img
            src="/images/Group 101129.png"
            alt="Device Exploded View 3"
            className={`max-w-[85vw] max-h-[45vh] md:max-w-[700px] md:max-h-[700px] object-contain absolute pointer-events-none`}
            style={{
              opacity: diamondsVisible ? Math.max(0, Math.min(1, fifthScrollProgress) * (1 - sixthScrollProgress)) : 0,
              marginTop: '-5%',
              willChange: 'transform, opacity',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              ...(animationComplete 
                ? {
                    animation: 'none',
                    transform: `translateY(0) translateX(calc(${scrollProgress * 30}% - ${extendedScrollProgress * 75}%)) scaleX(1)`
                  }
                : {}
              )
            }}
          />
          {/* Fifth Image - Group 101130 (appears with scroll progress 6, fades out with scroll progress 7) */}
          <img
            src="/images/Group 101130.png"
            alt="Device Exploded View 4"
            className={`max-w-[85vw] max-h-[45vh] md:max-w-[700px] md:max-h-[700px] object-contain absolute pointer-events-none`}
            style={{
              opacity: diamondsVisible ? Math.max(0, Math.min(1, sixthScrollProgress) * (1 - seventhScrollProgress)) : 0,
              marginTop: '-5%',
              willChange: 'transform, opacity',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              ...(animationComplete 
                ? {
                    animation: 'none',
                    transform: `translateY(0) translateX(calc(${scrollProgress * 30}% - ${extendedScrollProgress * 75}%)) scaleX(1)`
                  }
                : {}
              )
            }}
          />
          {/* Sixth Image - Adobe Express - file 1 (appears with scroll progress 7, moves to center, fades out with scroll progress 8) */}
          <img
            src="/images/Adobe Express - file 1.png"
            alt="Device Final"
            className={`max-w-[85vw] max-h-[45vh] md:max-w-[700px] md:max-h-[700px] object-contain absolute pointer-events-none`}
            style={{
              opacity: diamondsVisible ? Math.max(0, Math.min(1, seventhScrollProgress) * (1 - eighthScrollProgress)) : 0,
              marginTop: '-5%',
              willChange: 'transform, opacity',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              ...(animationComplete 
                ? {
                    animation: 'none',
                    transform: `translateY(0) translateX(calc((${scrollProgress * 30}% - ${extendedScrollProgress * 75}%) * (1 - ${seventhScrollProgress}))) scaleX(1)`
                  }
                : {}
              )
            }}
          />
          {/* Seventh Image - Adobe Express - file(9)_upscayl_5x_high-fidelity-4x 2 (1) (appears with scroll progress 8, moves to right) */}
          <img
            src="/images/Adobe Express - file(9)_upscayl_5x_high-fidelity-4x 2 (1).png"
            alt="Device Final 2"
            className={`max-w-[85vw] max-h-[45vh] md:max-w-[700px] md:max-h-[700px] object-contain absolute pointer-events-none`}
            style={{
              opacity: diamondsVisible ? Math.min(1, Math.max(0, eighthScrollProgress)) : 0,
              marginTop: '-5%',
              willChange: 'transform, opacity',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              ...(animationComplete 
                ? {
                    animation: 'none',
                    transform: `translateY(0) translateX(${eighthScrollProgress * 30}%) scaleX(1)`
                  }
                : {}
              )
            }}
          />
        </div>
      </div>
      
      {/* Spacer to maintain section height */}
      <div className="w-full h-[50vh] min-h-[300px] md:h-[60vh] md:min-h-[400px]" />
    </section>
  )
}
