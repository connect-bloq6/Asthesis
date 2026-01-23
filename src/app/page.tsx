'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/ui/Navbar'
import HeroSection from '@/components/ui/HeroSection'
import SystemSection from '@/components/ui/SystemSection'
import StyleSection from '@/components/ui/StyleSection'
import InterfaceSection from '@/components/ui/InterfaceSection'
import HousingSection from '@/components/ui/HousingSection'
import ProcessingCoreSection from '@/components/ui/ProcessingCoreSection'
import PowerReliabilitySection from '@/components/ui/PowerReliabilitySection'
import FutureSection from '@/components/ui/FutureSection'
import FeaturesSection from '@/components/ui/FeaturesSection'
import ComingSoonSection from '@/components/ui/ComingSoonSection'
import LoadingScreen from '@/components/ui/LoadingScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [extendedScrollProgress, setExtendedScrollProgress] = useState(0)
  const [thirdScrollProgress, setThirdScrollProgress] = useState(0)
  const [fourthScrollProgress, setFourthScrollProgress] = useState(0)
  const [fifthScrollProgress, setFifthScrollProgress] = useState(0)
  const [sixthScrollProgress, setSixthScrollProgress] = useState(0)
  const [seventhScrollProgress, setSeventhScrollProgress] = useState(0)
  const [eighthScrollProgress, setEighthScrollProgress] = useState(0)
  const [ninthScrollProgress, setNinthScrollProgress] = useState(0)
  const scrollAtCenterRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const maxScroll = 800
      const scrollDelay = windowHeight * 0.10
      const extendedScrollStart = maxScroll + scrollDelay
      const extendedScrollRange = 800
      
      let extendedProgress = 0
      if (scrollY >= extendedScrollStart) {
        extendedProgress = Math.min(1, (scrollY - extendedScrollStart) / extendedScrollRange)
      }
      setExtendedScrollProgress(extendedProgress)
      
      // Track third scroll progress (same logic as HeroSection)
      const styleSection = document.querySelector('[data-style-section]') as HTMLElement
      let thirdProgress = 0
      
      if (styleSection) {
        const rect = styleSection.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2
        
        // Track when section center first reaches viewport center
        if (sectionCenter <= viewportCenter && scrollAtCenterRef.current === null) {
          const distanceFromCenter = sectionCenter - viewportCenter
          scrollAtCenterRef.current = scrollY + distanceFromCenter
        }
        
        // If we've tracked when it reached center, calculate third animation progress
        if (scrollAtCenterRef.current !== null) {
          const thirdScrollDelay = windowHeight * 0.10
          const thirdAnimationStart = scrollAtCenterRef.current + thirdScrollDelay
          const thirdScrollRange = 800 // pixels for full animation 3 (20% faster - reduced from 1000px)
          
          if (scrollY >= thirdAnimationStart) {
            thirdProgress = Math.min(1, (scrollY - thirdAnimationStart) / thirdScrollRange)
          }
        }
      }
      
      setThirdScrollProgress(thirdProgress)
      
      // Track fourth scroll progress (animation 4)
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
      
      // Track fifth scroll progress (animation 5)
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
      
      // Track sixth scroll progress (animation 6)
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
      
      // Track seventh scroll progress (animation 7)
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
      
      // Track eighth scroll progress (animation 8)
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
        const eighthAnimationStart = seventhAnimationStart + seventhScrollRange +(windowHeight * 0.1) // Animation 8 starts at 30% of animation 7 (earlier)
        const eighthScrollRange = 800 // pixels for full animation 8
        
        if (scrollY >= eighthAnimationStart) {
          eighthProgress = Math.min(1, (scrollY - eighthAnimationStart) / eighthScrollRange)
        }
      }
      
      setEighthScrollProgress(eighthProgress)
      
      // Track ninth scroll progress (animation 9)
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
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      <main style={{ overflowY: 'hidden' }} className={`relative bg-background transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection isLoaded={!isLoading} />

        {/* System Section - appears with scroll */}
        <SystemSection />

        {/* Style Section - appears during scroll animation 2 */}
        <StyleSection scrollProgress={extendedScrollProgress} />

        {/* Interface Section - appears during scroll animation 3 */}
        <InterfaceSection scrollProgress={thirdScrollProgress} />

        {/* Housing Section - appears during scroll animation 4 */}
        <HousingSection scrollProgress={fourthScrollProgress} />

        {/* Processing Core Section - appears during scroll animation 5 */}
        <ProcessingCoreSection scrollProgress={fifthScrollProgress} />

        {/* Power Reliability Section - appears during scroll animation 6 */}
        <PowerReliabilitySection scrollProgress={sixthScrollProgress} />

        {/* Future Section - appears during scroll animation 7 */}
        <FutureSection scrollProgress={seventhScrollProgress} />

        {/* Features Section - appears during scroll animation 8 */}
        <FeaturesSection scrollProgress={eighthScrollProgress} ninthScrollProgress={ninthScrollProgress} />

        {/* Coming Soon Section */}
        <ComingSoonSection />

        {/* Minimal spacer to ensure animation 4 can complete */}
        <section className="h-[0px] bg-background">
          {/* Spacer for animation 4 completion (800px for fourthScrollRange) */}
        </section>

        {/* Spacer to ensure animation 5 can complete */}
        <section className="h-[0px] bg-background">
          {/* Spacer for animation 5 completion (800px for fifthScrollRange) */}
        </section>

        {/* Spacer to ensure animation 6 can complete */}
        <section className="h-[0px] bg-background">
          {/* Spacer for animation 6 completion (800px for sixthScrollRange) */}
        </section>

        {/* Spacer to ensure animation 7 can complete */}
        <section className="h-[0px] bg-background">
          {/* Spacer for animation 7 completion (800px for seventhScrollRange) */}
        </section>

        {/* Spacer to ensure animation 8 can complete */}
        {/* <section 
          className="h-[800px]"
          style={{
            background: 'linear-gradient(180deg, #000000 0%, #242424 100%)'
          }}
        >
          {/* Spacer for animation 8 completion (800px for eighthScrollRange) 
        </section> */}

        {/* Spacer to ensure animation 9 can complete */}
     {/*}   <section 
          className="h-[800px]"
          style={{
            background: 'linear-gradient(180deg, #000000 0%, #242424 100%)'
          }}
        >
          {/* Spacer for animation 9 completion (800px for ninthScrollRange) 
        </section> */}
      </main>
    </>
  )
}
