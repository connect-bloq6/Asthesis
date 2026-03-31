'use client'

import { useCallback, useRef } from 'react'

const ASSETS_BASE = (process.env.NEXT_PUBLIC_ASSETS_BASE_URL || '').replace(/\/$/, '')
const assetUrl = (path: string) => (ASSETS_BASE ? `${ASSETS_BASE}${path.startsWith('/') ? path : `/${path}`}` : path)

/** s3://asthesis-prod-assets/videos/About_Us.mp4 */
const ABOUT_VIDEO_SRC = assetUrl('/videos/About_Us.mp4')

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

/**
 * About page – Section 2: Hero video
 * Figma: image "Peaceful home environment"
 * Layout: full content width × 16:9 video
 */

/** Hero video: max content width, 16:9 */
export default function AboutSection2() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const onOpenFullscreen = useCallback(() => {
    const el = videoRef.current
    if (el) toggleVideoFullscreen(el)
  }, [])

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
            muted
            loop
            autoPlay
            preload="auto"
          />
          <button
            type="button"
            className="absolute inset-0 z-10 cursor-pointer bg-transparent p-0 border-0"
            aria-label="View video in fullscreen"
            onClick={onOpenFullscreen}
          />
        </div>
      </div>
    </section>
  )
}
