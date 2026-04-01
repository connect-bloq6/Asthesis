'use client'

import type React from 'react'
import type { RefObject } from 'react'
import Footer from '@/components/ui/Footer'
import { VIDEO_STICK_TOP_OFFSET_PX, VIDEO_STICKY_SCROLL_VH_DESKTOP, VIDEO_STICKY_SCROLL_VH_MOBILE } from '../constants'

const ASSETS_BASE = (process.env.NEXT_PUBLIC_ASSETS_BASE_URL || '').replace(/\/$/, '')
const assetUrl = (path: string) => (ASSETS_BASE ? `${ASSETS_BASE}${path.startsWith('/') ? path : `/${path}`}` : path)

function divRef(r: RefObject<HTMLDivElement | null>): React.LegacyRef<HTMLDivElement> {
  return r as React.LegacyRef<HTMLDivElement>
}

type RefBundle = {
  careSectionRef: RefObject<HTMLElement | null>
  careVideoStickyRef: RefObject<HTMLDivElement | null>
  videoStickSentinelRef: RefObject<HTMLDivElement | null>
  videoStickyWrapperRef: RefObject<HTMLDivElement | null>
  videoStickyCardRef: RefObject<HTMLDivElement | null>
  videoPlaceholderRef: RefObject<HTMLDivElement | null>
  careVideoBrandingRef: RefObject<HTMLDivElement | null>
  careVideoSensingRef: RefObject<HTMLSpanElement | null>
  careVideoRef: RefObject<HTMLVideoElement | null>
}

type Props = {
  refs: RefBundle
  videoAfterTopPxRef: RefObject<number>
  videoStickyMode: 'before' | 'stuck' | 'after'
  isDesktopViewport: boolean
  onKnowMore: () => void
}

export function CareVideoSection({ refs, videoAfterTopPxRef, videoStickyMode, isDesktopViewport, onKnowMore }: Props) {
  const {
    careSectionRef,
    careVideoStickyRef,
    videoStickSentinelRef,
    videoStickyWrapperRef,
    videoStickyCardRef,
    videoPlaceholderRef,
    careVideoBrandingRef,
    careVideoSensingRef,
    careVideoRef,
  } = refs

  const spacerVh = isDesktopViewport ? VIDEO_STICKY_SCROLL_VH_DESKTOP : VIDEO_STICKY_SCROLL_VH_MOBILE

  return (
    <section
      ref={careSectionRef as React.RefObject<HTMLElement>}
      className="relative w-full min-h-screen bg-white border-0 border-none flex flex-col items-center justify-start px-4 md:px-8 lg:px-12 pt-12 pb-0 text-center overflow-visible z-[6]"
    >
      <div ref={divRef(careVideoStickyRef)} className="relative w-full flex flex-col items-center bg-white pt-12">
        <div className="max-w-2xl mx-auto w-full">
          <h2
            className="mb-6 md:mb-8 font-bold text-black tracking-tight"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontSize: 'clamp(1.35rem, 3.5vw, 2rem)',
              lineHeight: 1.2,
            }}
          >
            Proactive, person centred care at home
          </h2>
          <button
            type="button"
            onClick={onKnowMore}
            className="inline-block px-6 py-3 rounded-2xl font-bold text-black transition-opacity hover:opacity-90 cursor-pointer border-0"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontSize: 'clamp(0.875rem, 1.25vw, 1rem)',
              backgroundColor: '#F5E6D3',
            }}
          >
            Know more
          </button>
        </div>
        <div className="h-4 md:h-5 shrink-0" aria-hidden />
        <div ref={divRef(videoStickSentinelRef)} style={{ height: 1 }} aria-hidden />
        <div ref={divRef(videoPlaceholderRef)} aria-hidden style={{ minHeight: 0 }} />
        <div
          ref={divRef(videoStickyWrapperRef)}
          className="w-full flex justify-center items-start bg-white min-h-0 z-10"
          style={{
            position: videoStickyMode === 'stuck' ? 'fixed' : videoStickyMode === 'after' ? 'absolute' : 'relative',
            top:
              videoStickyMode === 'stuck'
                ? VIDEO_STICK_TOP_OFFSET_PX
                : videoStickyMode === 'after'
                  ? (videoAfterTopPxRef.current ?? 0)
                  : undefined,
            left: videoStickyMode === 'stuck' ? 0 : undefined,
            right: videoStickyMode === 'stuck' ? 0 : undefined,
            width: videoStickyMode === 'stuck' ? '100%' : undefined,
          }}
        >
          <div
            ref={divRef(videoStickyCardRef)}
            className="w-full max-w-7xl mx-auto overflow-hidden border border-white/30 bg-[#1a1a1a] shadow-xl will-change-transform"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.2)' }}
          >
            <div className="relative aspect-video w-full min-h-[280px] sm:min-h-[320px] md:min-h-[420px]">
              <video
                ref={careVideoRef as React.LegacyRef<HTMLVideoElement>}
                className="absolute inset-0 w-full h-full object-cover"
                src={assetUrl('/videos/landing_page_video.mp4')}
                playsInline
                muted
                loop
                autoPlay
              />
              <div className="absolute inset-0 flex flex-col pointer-events-none">
                <div
                  ref={divRef(careVideoBrandingRef)}
                  className="absolute left-1/2 flex justify-center items-center"
                  style={{ top: '8%', transform: 'translate(-50%, -50%) scale(1)', transition: 'none' }}
                >
                  <span
                    className="text-white font-bold tracking-tight uppercase whitespace-nowrap"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                      textShadow: '0 0 20px rgba(0,0,0,0.5)',
                    }}
                  >
                    ASTHESIS
                  </span>
                </div>
                <div className="flex-1" />
                <div className="flex justify-end pr-4 pb-4 md:pr-6 md:pb-6">
                  <span
                    ref={careVideoSensingRef as React.LegacyRef<HTMLSpanElement>}
                    className="text-white font-semibold tracking-wide uppercase"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                      textShadow: '0 0 12px rgba(0,0,0,0.5)',
                    }}
                  >
                    SENSING WHAT MATTERS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full bg-white shrink-0"
        style={{
          height: `${spacerVh}vh`,
          minHeight: isDesktopViewport ? undefined : 280,
        }}
        aria-hidden
      />
      <div
        className="relative z-20 w-full"
        style={isDesktopViewport ? undefined : { paddingBottom: 24 }}
      >
        <Footer />
      </div>
    </section>
  )
}
