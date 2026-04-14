'use client'

import { useRef } from 'react'
import { useVideoViewportPlayPause } from '@/hooks/useVideoViewportPlayPause'

const ASSETS_BASE = (process.env.NEXT_PUBLIC_ASSETS_BASE_URL || '').replace(/\/$/, '')
const assetUrl = (path: string) => (ASSETS_BASE ? `${ASSETS_BASE}${path.startsWith('/') ? path : `/${path}`}` : path)

/** s3://asthesis-prod-assets/videos/About_Us.mp4 */
const ABOUT_VIDEO_SRC = assetUrl('/videos/About_Us.mp4')

/**
 * About page – Section 2: Hero video
 * Figma: image "Peaceful home environment"
 * Layout: full content width × 16:9 video
 */

/** Hero video: max content width, 16:9 */
export default function AboutSection2() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useVideoViewportPlayPause(videoRef, { threshold: 0.2, preferUnmuted: true })

  return (
    <section
      className="relative w-full bg-background"
      aria-label="Peaceful home environment"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 pb-12 sm:pb-16 md:pb-24">
        <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl max-w-[1440px] aspect-video min-h-[260px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[480px] mx-auto">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={ABOUT_VIDEO_SRC}
            playsInline
            muted={false}
            loop
            preload="auto"
            aria-label="About Asthesis video"
          />
        </div>
      </div>
    </section>
  )
}
