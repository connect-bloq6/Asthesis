/**
 * Landing timeline architecture:
 * - Passive scroll updates scrollYRef only (no animation logic on scroll events).
 * - A single requestAnimationFrame loop reads scrollYRef, computes raw section progress (timeline.ts),
 *   advances the displayed global frame toward the scroll target (canvas sync), and applies all text
 *   transforms + opacities from that same displayed frame (fixes fast upward scroll text flicker).
 * - Final care video: sticky bounds from layout; on mode enter, transition progress snaps to scroll target;
 *   while stuck, one smoothed progress drives width, radius, scale, height, placeholder, and branding via refs.
 */
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { GRADIENT_DURATION_MS, GRADIENT_START_TIME } from './constants'
import { useLandingScrollTimeline } from './hooks/useLandingScrollTimeline'
import { HeroSection } from './components/HeroSection'
import { FrameSequenceSection } from './components/FrameSequenceSection'
import { CareVideoSection } from './components/CareVideoSection'
import { useKnowMoreModal } from './components/KnowMoreModal'

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showChampagneGradient, setShowChampagneGradient] = useState(false)
  const [gradientTransitionComplete, setGradientTransitionComplete] = useState(false)
  const [isDesktopViewport, setIsDesktopViewport] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const animEnabled = gradientTransitionComplete && !isLoading
  const anim = useLandingScrollTimeline(animEnabled, isDesktopViewport, videoRef)

  const { openKnowMore, portal: knowMorePortal } = useKnowMoreModal()

  useEffect(() => {
    const m = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)')
    if (!m) return
    setIsDesktopViewport(m.matches)
    const h = () => setIsDesktopViewport(m.matches)
    m.addEventListener('change', h)
    return () => m.removeEventListener('change', h)
  }, [])

  useEffect(() => {
    if (!isLoading && videoRef.current) {
      const v = videoRef.current
      if (v.currentTime < 0.1) v.currentTime = 0.1
      v.play().catch(() => {})
    }
  }, [isLoading])

  const onTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (video && video.currentTime >= GRADIENT_START_TIME) {
      setShowChampagneGradient(true)
    }
  }, [])

  useEffect(() => {
    if (!showChampagneGradient) return
    const timer = setTimeout(() => setGradientTransitionComplete(true), GRADIENT_DURATION_MS)
    return () => clearTimeout(timer)
  }, [showChampagneGradient])

  const careVideoRef = anim.refs.careVideoRef
  useEffect(() => {
    if (!gradientTransitionComplete) return
    let observer: IntersectionObserver | null = null
    let cancelled = false
    const attach = () => {
      if (cancelled) return
      const video = careVideoRef.current
      if (!video) {
        requestAnimationFrame(attach)
        return
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) video.play().catch(() => {})
          })
        },
        { threshold: 0.25, rootMargin: '0px' }
      )
      observer.observe(video)
    }
    attach()
    return () => {
      cancelled = true
      observer?.disconnect()
    }
  }, [gradientTransitionComplete, careVideoRef])

  const { refs: r, ...rest } = anim

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      <main
        ref={r.mainRef}
        style={{
          overflowX: 'hidden',
          overflowY: showChampagneGradient && !gradientTransitionComplete ? 'hidden' : 'visible',
          border: 'none',
          outline: 'none',
        }}
        className={`relative min-h-screen bg-white transition-opacity duration-700 border-0 border-none outline-none ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <Navbar solid={rest.navbarSolid} />

        {!isLoading && (
          <div className="fixed inset-0 pointer-events-none z-40" aria-hidden>
            <div
              className="absolute left-6 top-[6.5rem] w-[16.8px] h-[16.8px] text-black transition-transform duration-300 ease-out"
              style={{ transform: rest.heroCrossed ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="w-full h-full">
                <path d="M8 1v14M1 8h14" />
              </svg>
            </div>
            <div
              className="absolute right-6 top-[6.5rem] w-[16.8px] h-[16.8px] text-black transition-transform duration-300 ease-out"
              style={{ transform: rest.heroCrossed ? 'rotate(-45deg)' : 'rotate(0deg)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="w-full h-full">
                <path d="M8 1v14M1 8h14" />
              </svg>
            </div>
            <div
              className="absolute left-6 bottom-6 w-[16.8px] h-[16.8px] text-black transition-transform duration-300 ease-out"
              style={{ transform: rest.heroCrossed ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="w-full h-full">
                <path d="M8 1v14M1 8h14" />
              </svg>
            </div>
            <div
              className="absolute right-6 bottom-6 w-[16.8px] h-[16.8px] text-black transition-transform duration-300 ease-out"
              style={{ transform: rest.heroCrossed ? 'rotate(-45deg)' : 'rotate(0deg)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="w-full h-full">
                <path d="M8 1v14M1 8h14" />
              </svg>
            </div>
          </div>
        )}

        {!isLoading && (
          <HeroSection videoRef={videoRef} showChampagneGradient={showChampagneGradient} onTimeUpdate={onTimeUpdate} />
        )}

        {gradientTransitionComplete && (
          <FrameSequenceSection
            refs={{
              frameSectionRef: r.frameSectionRef,
              canvasRef: r.canvasRef,
              v1Ref: r.v1Ref,
              v2Ref: r.v2Ref,
              v3Ref: r.v3Ref,
              v4Ref: r.v4Ref,
              systemTextRef: r.systemTextRef,
              styleTextRef: r.styleTextRef,
              designTextRef: r.designTextRef,
              careTextRef: r.careTextRef,
              insideTextRef: r.insideTextRef,
            }}
            alphaPlaybackMode={rest.alphaPlaybackMode}
            isDesktopViewport={isDesktopViewport}
            frameStickyMode={rest.frameStickyMode}
            frameScrollOutProgress={rest.frameScrollOutProgress}
            polygonOpacity={rest.polygonOpacity}
          />
        )}

        {gradientTransitionComplete && (
          <CareVideoSection
            refs={{
              careSectionRef: r.careSectionRef,
              careVideoStickyRef: r.careVideoStickyRef,
              videoStickSentinelRef: r.videoStickSentinelRef,
              videoStickyWrapperRef: r.videoStickyWrapperRef,
              videoStickyCardRef: r.videoStickyCardRef,
              videoPlaceholderRef: r.videoPlaceholderRef,
              careVideoBrandingRef: r.careVideoBrandingRef,
              careVideoSensingRef: r.careVideoSensingRef,
              careVideoRef: r.careVideoRef,
            }}
            videoAfterTopPxRef={anim.videoAfterTopPxRef}
            videoStickyMode={rest.videoStickyMode}
            isDesktopViewport={isDesktopViewport}
            onKnowMore={openKnowMore}
          />
        )}
      </main>
      {knowMorePortal}
    </>
  )
}
