'use client'

import { type RefObject, useEffect } from 'react'

export type VideoViewportPlayPauseOptions = {
  threshold?: number
  rootMargin?: string
  /** Try unmuted playback when visible; fall back to muted if the browser blocks autoplay */
  preferUnmuted?: boolean
  enabled?: boolean
}

/**
 * Pauses when the video leaves the viewport; plays when it enters.
 * With preferUnmuted, attempts audible playback first, then muted if play() rejects.
 */
export function useVideoViewportPlayPause(
  videoRef: RefObject<HTMLVideoElement | null>,
  options?: VideoViewportPlayPauseOptions
) {
  const { threshold = 0.2, rootMargin = '0px', preferUnmuted = true, enabled = true } = options ?? {}

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return

    let observer: IntersectionObserver | null = null
    let cancelled = false

    const tryPlay = (video: HTMLVideoElement) => {
      if (!preferUnmuted) {
        void video.play().catch(() => {})
        return
      }
      video.muted = false
      void video.play().catch(() => {
        video.muted = true
        void video.play().catch(() => {})
      })
    }

    const attach = () => {
      if (cancelled) return
      const video = videoRef.current
      if (!video) {
        requestAnimationFrame(attach)
        return
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) tryPlay(video)
            else video.pause()
          }
        },
        { threshold, rootMargin }
      )
      observer.observe(video)
    }

    attach()
    return () => {
      cancelled = true
      observer?.disconnect()
    }
  }, [enabled, videoRef, threshold, rootMargin, preferUnmuted])
}
