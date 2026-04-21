'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const ASSETS_BASE = (process.env.NEXT_PUBLIC_ASSETS_BASE_URL || '').replace(/\/$/, '')
const assetUrl = (path: string) => (ASSETS_BASE ? `${ASSETS_BASE}${path.startsWith('/') ? path : `/${path}`}` : path)

/** s3://asthesis-prod-assets/videos/Feature_1.mp4, Feature_2.mp4 */
const FEATURE_VIDEO_MOTION = assetUrl('/videos/Feature_1.mp4')
const FEATURE_VIDEO_GAIT = assetUrl('/videos/Feature_2.mp4')
const FEATURE_VIDEO_LAST = assetUrl('/videos/last_video.mp4')

const CAROUSEL_TRANSITION_MS = 400

const FEATURES = [
  {
    id: 1,
    category: 'Safety',
    videoSrc: FEATURE_VIDEO_GAIT,
    title: 'Seizure Detection',
    description:
      'Detects sudden and gradual changes in movement patterns that may indicate a seizure, helping to provide early intervention and support.',
  },
  {
    id: 2,
    category: 'Mobility',
    videoSrc: FEATURE_VIDEO_MOTION,
    title: 'LiDAR gait mapping',
    description:
      'Supports insight into walking patterns and mobility change, helping identify possible early indicators of deterioration or falls risk.',
  },
  {
    id: 3,
    category: 'Privacy',
    videoSrc: FEATURE_VIDEO_LAST,
    title: 'Thermal sensing',
    description:
      'Detects heat signatures and presence without cameras or recorded images, supporting a more privacy conscious approach to remote monitoring.',
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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

export type ProductFeatureCarouselVariant = 'default' | 'hero'

export function ProductFeatureVideoCarousel({ variant = 'default' }: { variant?: ProductFeatureCarouselVariant }) {
  const isHero = variant === 'hero'
  const slideCount = FEATURES.length
  const [index, setIndex] = useState(0)
  const [carouselInView, setCarouselInView] = useState(true)
  const reducedMotion = usePrefersReducedMotion()
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const carouselRootRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ startX: number; pointerId: number } | null>(null)
  const transitionMs = reducedMotion ? 0 : CAROUSEL_TRANSITION_MS

  useEffect(() => {
    const el = carouselRootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([e]) => setCarouselInView(e?.isIntersecting ?? false),
      { threshold: 0.12, rootMargin: '0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const goTo = useCallback(
    (i: number) => {
      const next = ((i % slideCount) + slideCount) % slideCount
      setIndex(next)
    },
    [slideCount],
  )

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])
  const goNext = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    FEATURES.forEach((item, i) => {
      const el = videoRefs.current[i]
      if (!el) return
      if (!carouselInView) {
        el.pause()
        return
      }
      if (i === index) {
        el.muted = false
        void el.play().catch(() => {
          el.muted = true
          void el.play().catch(() => {})
        })
      } else {
        el.pause()
      }
    })
  }, [index, carouselInView])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(slideCount - 1)
      }
    },
    [goPrev, goNext, goTo, slideCount],
  )

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return
    dragRef.current = { startX: e.clientX, pointerId: e.pointerId }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const d = dragRef.current
      if (!d || d.pointerId !== e.pointerId) return
      dragRef.current = null
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        /* already released */
      }
      const delta = e.clientX - d.startX
      const threshold = 50
      if (delta > threshold) goPrev()
      else if (delta < -threshold) goNext()
    },
    [goPrev, goNext],
  )

  const onPointerCancel = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current
    if (d?.pointerId === e.pointerId) dragRef.current = null
  }, [])

  return (
    <div ref={carouselRootRef} className="w-full">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={isHero ? 'product-features-available-heading' : undefined}
        aria-label={isHero ? undefined : 'Product features'}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={
          isHero
            ? 'overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_24px_80px_-20px_rgba(0,0,0,0.18)] outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:rounded-[28px]'
            : 'rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white'
        }
      >
        <p className="sr-only" aria-live="polite">
          Slide {index + 1} of {slideCount}: {FEATURES[index].title}
        </p>

        {isHero && (
          <header className="relative overflow-hidden rounded-t-[24px] border-b border-[#ECEEF1] bg-[#FAFBFC] sm:rounded-t-[28px]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.55]"
              aria-hidden
              style={{
                background:
                  'radial-gradient(120% 90% at 0% 0%, rgba(246,239,224,0.35) 0%, transparent 52%), radial-gradient(80% 70% at 100% 0%, rgba(10,10,10,0.04) 0%, transparent 45%)',
              }}
            />
            <div className="relative px-5 py-8 sm:px-8 sm:py-9 lg:px-11 lg:py-10 xl:px-14 xl:py-11">
              <p
                className="mb-3 text-[13px] font-medium uppercase tracking-[0.14em] text-[#8B9199]"
                style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
              >
                Product
              </p>
              <h2
                id="product-features-available-heading"
                className="max-w-[18ch] text-[clamp(1.875rem,4.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0A0A0A] sm:max-w-none"
                style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
              >
                Features Available
              </h2>
              <p
                className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#5C6370] sm:text-base sm:leading-relaxed"
                style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontWeight: 400 }}
              >
                Intelligent sensing, thoughtful interaction, and dependable safety, without demanding constant attention.
              </p>
            </div>
          </header>
        )}

        <div
          className={`overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y ${isHero ? '' : 'rounded-[24px]'}`}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <div
            className="flex motion-reduce:transition-none"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          >
            {FEATURES.map((item, i) => (
              <div
                key={item.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slideCount}: ${item.title}`}
                aria-hidden={i !== index}
                className={
                  isHero
                    ? 'min-w-full w-full flex-shrink-0 bg-white px-5 pb-9 pt-7 sm:px-8 sm:pb-10 sm:pt-8 lg:px-11 lg:pb-12 lg:pt-9 xl:px-14 xl:pb-14 xl:pt-10'
                    : 'min-w-full w-full flex-shrink-0 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10'
                }
              >
                <div
                  className={
                    isHero
                      ? 'flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-14'
                      : 'flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10 xl:gap-12'
                  }
                >
                  <div
                    className={
                      isHero
                        ? 'relative w-full lg:w-[min(72%,920px)] lg:max-w-none lg:flex-shrink-0'
                        : 'relative w-full lg:w-[62%] lg:max-w-none lg:flex-shrink-0'
                    }
                  >
                    <div
                      className={
                        isHero
                          ? 'relative w-full aspect-video overflow-hidden rounded-[20px] bg-[#0A0A0A] ring-1 ring-black/[0.08] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] sm:rounded-[22px] lg:shadow-[0_28px_70px_-18px_rgba(0,0,0,0.4)]'
                          : 'relative w-full aspect-video overflow-hidden rounded-[20px] bg-[#0A0A0A] ring-1 ring-black/[0.06]'
                      }
                    >
                      <video
                        ref={(el) => {
                          videoRefs.current[i] = el
                        }}
                        className="absolute inset-0 h-full w-full object-cover"
                        src={item.videoSrc}
                        controls
                        muted={false}
                        playsInline
                        controlsList="nofullscreen noremoteplayback"
                        preload={isHero && i === 0 ? 'auto' : 'metadata'}
                        aria-label={`${item.title} demonstration video`}
                      />
                    </div>
                  </div>

                  <div
                    className={
                      isHero
                        ? 'flex min-w-0 flex-1 flex-col justify-center lg:max-w-md xl:max-w-xl'
                        : 'flex min-w-0 flex-1 flex-col justify-center lg:max-w-md xl:max-w-lg'
                    }
                  >
                    <span
                      className="mb-3 inline-flex w-fit rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#636363]"
                      style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
                    >
                      {item.category}
                    </span>
                    <p
                      className="mb-2 text-sm font-medium tabular-nums text-[#9CA3AF]"
                      style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
                    >
                      <span className="sr-only">Feature </span>
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3
                      className={
                        isHero
                          ? 'mb-3 text-2xl font-semibold text-[#0A0A0A] sm:text-3xl lg:text-[1.85rem] lg:leading-snug xl:text-[2rem]'
                          : 'mb-3 text-xl font-semibold text-[#0A0A0A] sm:text-2xl lg:text-[1.65rem] lg:leading-snug'
                      }
                      style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={
                        isHero
                          ? 'max-w-prose text-[#4A5565] text-base leading-relaxed sm:text-lg sm:leading-relaxed'
                          : 'max-w-prose text-[#4A5565] text-base leading-relaxed sm:text-[17px] sm:leading-relaxed'
                      }
                      style={{
                        fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                        fontWeight: 400,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={
            isHero
              ? 'flex flex-col items-center gap-5 border-t border-[#F3F4F6] px-4 py-5 sm:flex-row sm:justify-between sm:px-7 lg:px-10 xl:px-12'
              : 'flex flex-col items-center gap-5 border-t border-[#F3F4F6] px-5 py-5 sm:flex-row sm:justify-between sm:px-8 lg:px-10'
          }
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0A0A0A] shadow-sm transition-colors hover:border-[#D1D5DB] hover:bg-[#F9FAFB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]/30"
              aria-label="Previous feature"
              onClick={goPrev}
            >
              <NavArrowLeft />
            </button>
            <button
              type="button"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0A0A0A] shadow-sm transition-colors hover:border-[#D1D5DB] hover:bg-[#F9FAFB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]/30"
              aria-label="Next feature"
              onClick={goNext}
            >
              <NavArrowRight />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Feature slides">
            {FEATURES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-current={i === index ? 'true' : undefined}
                aria-label={`Go to slide ${i + 1}: ${item.title}`}
                className={`h-2.5 rounded-full transition-all motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]/30 ${
                  i === index ? 'w-8 bg-[#0A0A0A]' : 'w-2.5 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                }`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Product page – Section 4: "FEATURES AVAILABLE".
 * Intro copy; feature carousel lives at page top (see ProductFeatureVideoCarousel on product page).
 */
export default function ProductSection4() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="Features available"
    >
      <div className="max-w-[1280px] mx-auto w-full px-3 sm:px-4 lg:px-4 xl:px-6 pt-20 sm:pt-24 lg:pt-28 xl:pt-32 pb-20 sm:pb-24 lg:pb-28 xl:pb-32">
        {/* Intro: heading, description, button */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:gap-10">
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
              Asthesis is designed to quietly support daily life through intelligent sensing, thoughtful interaction, and dependable safety, all without demanding constant attention from the user.
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

      </div>
    </section>
  )
}
