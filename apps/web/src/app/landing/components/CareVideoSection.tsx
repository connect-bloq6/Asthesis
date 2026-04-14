'use client'

import type React from 'react'
import type { RefObject } from 'react'
import Footer from '@/components/ui/Footer'
import { useVideoViewportPlayPause } from '@/hooks/useVideoViewportPlayPause'

const ASSETS_BASE = (process.env.NEXT_PUBLIC_ASSETS_BASE_URL || '').replace(/\/$/, '')
const assetUrl = (path: string) => (ASSETS_BASE ? `${ASSETS_BASE}${path.startsWith('/') ? path : `/${path}`}` : path)

type Props = {
  careSectionRef: RefObject<HTMLElement | null>
  careVideoRef: RefObject<HTMLVideoElement | null>
  /** When false, omit footer (render footer once after the frame sequence). */
  showFooter?: boolean
}

export function CareVideoSection({ careSectionRef, careVideoRef, showFooter = true }: Props) {
  useVideoViewportPlayPause(careVideoRef, { threshold: 0.25, preferUnmuted: true })

  return (
    <section
      ref={careSectionRef as React.RefObject<HTMLElement>}
      className="relative w-full bg-white border-0 border-none flex flex-col items-center px-4 md:px-8 lg:px-12 pt-8 pb-10 md:pt-10 md:pb-12 text-center overflow-visible z-[6]"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div
          className="w-full overflow-hidden border border-white/30 bg-[#1a1a1a] shadow-xl"
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.2)' }}
        >
          <div className="relative aspect-video w-full min-h-[280px] sm:min-h-[320px] md:min-h-[420px]">
            <video
              ref={careVideoRef as React.LegacyRef<HTMLVideoElement>}
              className="absolute inset-0 w-full h-full object-cover"
              src={assetUrl('/videos/landing_page_video.mp4')}
              playsInline
              muted={false}
              loop
              preload="auto"
            />
            <div className="absolute inset-0 flex flex-col pointer-events-none">
              <div
                className="absolute left-1/2 flex justify-center items-center"
                style={{ top: '8%', transform: 'translate(-50%, -50%) scale(1)' }}
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
      {showFooter && (
        <div
          className="relative z-20 w-full mt-12 md:mt-16"
          style={{ paddingBottom: 24 }}
        >
          <Footer />
        </div>
      )}
    </section>
  )
}
