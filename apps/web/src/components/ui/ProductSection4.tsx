'use client'

import Image from 'next/image'
import { useCallback, useRef } from 'react'

const ASSETS_BASE = (process.env.NEXT_PUBLIC_ASSETS_BASE_URL || '').replace(/\/$/, '')
const assetUrl = (path: string) => (ASSETS_BASE ? `${ASSETS_BASE}${path.startsWith('/') ? path : `/${path}`}` : path)

/** s3://asthesis-prod-assets/videos/Feature_1.mp4, Feature_2.mp4 */
const FEATURE_VIDEO_MOTION = assetUrl('/videos/Feature_1.mp4')
const FEATURE_VIDEO_GAIT = assetUrl('/videos/Feature_2.mp4')

function toggleVideoFullscreen(el: HTMLVideoElement) {
  if (document.fullscreenElement) {
    void document.exitFullscreen()
    return
  }
  const req =
    el.requestFullscreen?.() ??
    (el as HTMLVideoElement & { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen?.()
  if (req && typeof (req as Promise<void>).then === 'function') {
    void (req as Promise<void>).catch(() => {})
  }
}

/** Same outer size for every feature: 16:9, full column width */
const FEATURE_MEDIA_SHELL =
  'relative w-full aspect-video rounded-xl overflow-hidden mb-5 sm:mb-6 ring-1 ring-black/[0.06] shrink-0'

function FeatureVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const onOpenFullscreen = useCallback(() => {
    const el = videoRef.current
    if (el) toggleVideoFullscreen(el)
  }, [])

  return (
    <div className={`${FEATURE_MEDIA_SHELL} bg-[#0A0A0A]`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
      />
      <button
        type="button"
        className="absolute inset-0 z-10 cursor-pointer bg-transparent p-0 border-0"
        aria-label={`View ${title} video in fullscreen`}
        onClick={onOpenFullscreen}
      />
    </div>
  )
}

/**
 * Product page – Section 4: "FEATURES AVAILABLE".
 * Intro: heading, description, Explore the Device button, separator line.
 * Then 3 feature cards at once with left/right nav icons (Figma: 31×31 circle, arrow #636363).
 */

const FEATURES = [
  {
    videoSrc: FEATURE_VIDEO_GAIT,
    title: 'Seizure Detection',
    description:
      'Detects sudden and gradual changes in movement patterns that may indicate a seizure, helping to provide early intervention and support.',
  },
  {
    videoSrc: FEATURE_VIDEO_MOTION,
    title: 'LiDAR gait mapping',
    description:
      'Supports insight into walking patterns and mobility change, helping identify possible early indicators of deterioration or falls risk.',
  },
  {
    image: '/images/thermal.png',
    title: 'Thermal sensing',
    description:
      'Detects heat signatures and presence without cameras or recorded images, supporting a more privacy-conscious approach to remote monitoring.',
  },
] as const

/** Figma: left arrow vector, color #636363, ~6.5×11px in 31×31 circle */
function NavArrowLeft() {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" className="flex-shrink-0" aria-hidden>
      <path d="M6 1L1 5.5L6 10" stroke="#636363" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Figma: right arrow, same specs */
function NavArrowRight() {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" className="flex-shrink-0" aria-hidden>
      <path d="M1 1L6 5.5L1 10" stroke="#636363" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ProductSection4() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="Features available"
    >
      <div className="max-w-[1280px] mx-auto w-full px-3 sm:px-4 lg:px-4 xl:px-6 pt-16 sm:pt-20 lg:pt-24 xl:pt-28">
        {/* Intro: heading, description, button */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:gap-10 mb-10 sm:mb-12">
          <div className="min-w-0 lg:flex-1 lg:min-w-[720px] lg:pr-8">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] uppercase tracking-tight mb-4 sm:mb-5"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              }}
            >
              Features Available
            </h2>
            <p
              className="text-[#4A5565] text-base sm:text-lg leading-relaxed"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
              }}
            >
              Asthesis is designed to quietly support daily life through intelligent sensing, thoughtful interaction, and dependable safety — all without demanding constant attention from the user.
            </p>
          </div>
          <div className="mt-6 lg:mt-0 lg:flex-shrink-0">
            {/* <Link
              href="#explore"
              className="inline-flex items-center gap-2 w-fit px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full bg-[#F6EFE0] border border-[#E5D9C8] hover:bg-[#EBDCC8] transition-colors text-[#1D1D1F] text-[14px] sm:text-[15px] font-medium"
              style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
            >
              Explore the Device
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link> */}
          </div>
        </div>

        {/* Horizontal separator */}
        <div className="border-b border-[#E5E7EB] w-full mb-12 sm:mb-16" />

        {/* 3 feature cards at once, with left/right nav icons (Figma: outline circle 31×31, arrow #636363) */}
        <div className="relative flex items-center gap-4 sm:gap-6 lg:gap-8 pb-16 sm:pb-20 lg:pb-24 xl:pb-28">
          {/* Left icon – outline circle, dark grey arrow #636363 */}
          {/* <button
            type="button"
            className="flex-shrink-0 w-[31px] h-[31px] rounded-full border-2 border-[#636363] bg-transparent hover:bg-[#636363]/10 flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <NavArrowLeft />
          </button> */}

          {/* Three cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 flex-1 min-w-0 md:items-stretch">
            {FEATURES.map((item) => (
              <div key={item.title} className="flex flex-col h-full min-w-0">
                {'videoSrc' in item ? (
                  <FeatureVideo src={item.videoSrc} title={item.title} />
                ) : (
                  <div className={`${FEATURE_MEDIA_SHELL} bg-[#F9FAFB]`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 767px) 100vw, (max-width: 1024px) 33vw, 400px"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 min-h-0">
                  <h3
                    className="text-lg sm:text-xl font-semibold text-[#0A0A0A] mb-2"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#4A5565] text-sm sm:text-base leading-relaxed flex-1"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontWeight: 400,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right icon – outline circle, dark grey arrow #636363 */}
          {/* <button
            type="button"
            className="flex-shrink-0 w-[31px] h-[31px] rounded-full border-2 border-[#636363] bg-transparent hover:bg-[#636363]/10 flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <NavArrowRight />
          </button> */}
        </div>
      </div>
    </section>
  )
}
