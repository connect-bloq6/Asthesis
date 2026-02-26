'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import LoadingScreen from '@/components/ui/LoadingScreen'

const ASSETS = process.env.NEXT_PUBLIC_ASSETS_BASE_URL || ''
const assetUrl = (p: string) => (ASSETS ? `${ASSETS}${p}` : p)

const DEBUG_FRAME = false

const GRADIENT_START_TIME = 3.2 // seconds into the 5s video (start a bit early)
const GRADIENT_DURATION_MS = 2800 // match landing-gradient-fade animation

const HERO_HEIGHT_THRESHOLD = 0.12 // start rotation early while still in hero, before reaching frame

const DAVINICI_FRAME_START = 86400 // sequence files: davinci00086400 .. davinci00086520 (121 frames)
const DAVINICI_FRAME_COUNT = 121
const DAVINICI_PART2_END_INDEX = 55 // Part 2 reverse ends at frame index 55 (davinci00086455)
const SEQUENCE_SCROLL_VH = 250 // vh of scroll for Part 1 (121 frames); more scroll = smoother transition
const PART2_SCROLL_VH = 125 // vh of scroll for Part 2 (reverse); more scroll = smoother frame changes
const SEQUENCE02_FRAME_START = 86400 // sequence02 files: davinci00086400 .. davinci00086520 (121 frames)
const SEQUENCE02_FRAME_COUNT = 121
const PART3_SCROLL_VH = 100 // match total section height to frames so frame isn’t removed too early or with extra scroll
const PART3_SCALE_START = 1.32 // scaleX at Part 3 start (match Part 1/2)
const PART3_SCALE_END = 1 // scaleX at Part 3 end (reduces over scroll)
const SEQUENCE03_FRAME_START = 86400 // sequence03: davinci00086400 .. davinci00086520 (121 frames)
const SEQUENCE03_FRAME_COUNT = 121
const PART4_SCROLL_VH = 170 // longer scroll = smoother, fewer frame changes per vh
const PART4_FRAME_EASING = 0.72 // ease frame progress so last frame lands when "inside" text reaches center (exponent < 1 = slower late frames)
const FRAME_SCROLL_OUT_VH = 28 // scroll-out phase; shorter = video section appears sooner (frame moves up by same vh as scroll)

// ——— Last section video transition (sticky video, footer scrolls up as video shrinks) ———
const VIDEO_STICK_TOP_OFFSET_PX = 56 // when stuck, video sits this many px from viewport top (increased distance from top)
const VIDEO_STICKY_SCROLL_VH = 100 // vh of scroll while video is sticky (footer appears below during this)
const VIDEO_TRANSITION_LERP = 0.08 // smooth follow (higher = snappier)
const VIDEO_TRANSITION_WIDTH_END_PCT = 80 // width at progress 1 (%)
const VIDEO_TRANSITION_BORDER_RADIUS_PX = 24 // border radius at progress 1
const VIDEO_TRANSITION_SCALE_END = 0.9 // scale X at progress 1 (1 → 0.9)
const VIDEO_TRANSITION_HEIGHT_SCALE_END = 0.35 // height at progress 1 (1 → 0.35); frame shrinks to 35% with scroll

const PART4_SMOOTH_LERP = 0.035 // lower = smoother scroll-driven progress and scale
const PART4_SCALE_START = 1 // match Part 3 end
const PART4_SCALE_END = 1 // keep 1 or reduce slightly
const SYSTEM_TEXT_SCROLL_VH = 82 // Part 1: system text moves up (vh)
const SYSTEM_TEXT_PART2_VH = 70 // Part 2: system text continues scrolling up (vh)
const STYLE_TEXT_DELAY = 0.22 // delay before style text starts (0–1, fraction of sequence progress)
const STYLE_TEXT_EASING = 1.45
const STYLE_TEXT_PART2_VH = 95 // Part 2: style (and design) scroll up by this much so they go fully off-screen
const DESIGN_FROM_BOTTOM_VH = 95 // design: Part 2 bottom→center, Part 3 center→top
const DESIGN_SCROLL_UP_VH = 95 // how far design scrolls up from center (off screen)
const DESIGN_VERTICAL_OFFSET_VH = 2 // negative = design rests a little above center
const CARE_FROM_BOTTOM_VH = 95 // care: Part 3 bottom→right center, Part 4 center→top
const CARE_SCROLL_UP_VH = 95
const CARE_VERTICAL_OFFSET_VH = 4
const INSIDE_FROM_BOTTOM_VH = 95 // inside: right bottom to right center over full Part 4 (like design, care)
const INSIDE_VERTICAL_OFFSET_VH = 2
// Frame-rate independent smoothing: delta-time so 60Hz/90Hz/120Hz feel the same; no frame skips on fast scroll.
const SMOOTHING_TIME_CONSTANT = 0.06 // seconds for progress/transition to catch up (exponential smoothing)
const SMOOTHING_TIME_CONSTANT_MOBILE = 0.06
const SMOOTHED_PROGRESS_THROTTLE_DELTA = 0.002
const SMOOTHED_PROGRESS_THROTTLE_MS = 80
const ALPHA_COMMIT_THRESHOLD = 0.03
/** Part 1–4: scroll-driven VP9 alpha video scrub (glide/smooth). */
const SEEK_MIN_INTERVAL_MS_DESKTOP = 0
const SEEK_MIN_INTERVAL_MS_MOBILE = 16
const FOLLOW_TC_DESKTOP = 0.085
const FOLLOW_TC_MOBILE = 0.1
const MAX_SPEED_DESKTOP = 10
const MAX_SPEED_MOBILE = 7
const SEEK_EPS_DESKTOP = 0.008
const SEEK_EPS_MOBILE = 0.012

function daviniciFramePath(index: number): string {
  return `/sequence/davinci${String(DAVINICI_FRAME_START + index).padStart(8, '0')}.png`
}

function sequence02FramePath(index: number): string {
  return `/sequence02/davinci${String(SEQUENCE02_FRAME_START + index).padStart(8, '0')}.png`
}

function sequence03FramePath(index: number): string {
  return `/sequence03/davinci${String(SEQUENCE03_FRAME_START + index).padStart(8, '0')}.png`
}

// Crop top/bottom black bars: uniform zoom (no stretch) so middle ~30% fills frame
const FRAME_CROP_SCALE = 100 / 70
const DESKTOP_VIDEO_SCALE = 1.15 // reduced from FRAME_CROP_SCALE (~1.43) for desktop view
const PART4_ZOOM_OUT_END = 0.50 // scale factor at end of Part 4 (1 = no zoom, 0.66 = 34% zoom out)

const frameImgStyle: React.CSSProperties = {
  border: 'none',
  outline: 'none',
  width: '100%',
  height: '100%',
  margin: 0,
  display: 'block',
  transformOrigin: 'center center',
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

const roundToDprPx = (px: number) => {
  const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
  return Math.round(px * dpr) / dpr
}

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

function isAndroid(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Android/.test(navigator.userAgent)
}

function supportsVp9Webm(): boolean {
  if (typeof document === 'undefined') return true
  const v = document.createElement('video')
  return v.canPlayType('video/webm; codecs="vp9"') !== ''
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  source: HTMLVideoElement,
  dw: number,
  dh: number
) {
  const sw = source.videoWidth || 1
  const sh = source.videoHeight || 1

  const sAspect = sw / sh
  const dAspect = dw / dh

  let sx = 0,
    sy = 0,
    sWidth = sw,
    sHeight = sh

  if (sAspect > dAspect) {
    sWidth = sh * dAspect
    sx = (sw - sWidth) / 2
  } else {
    sHeight = sw / dAspect
    sy = (sh - sHeight) / 2
  }

  ctx.drawImage(source, sx, sy, sWidth, sHeight, 0, 0, dw, dh)
}

function nearestLoadedForward(loaded: Set<number>, target: number, maxIndex: number): number {
  const t = Math.round(target)
  for (let i = Math.min(t, maxIndex); i >= 0; i--) {
    if (loaded.has(i)) return i
  }
  return 0
}

function nearestLoadedReverse(loaded: Set<number>, target: number, minIndex: number, maxIndex: number): number {
  const t = Math.round(target)
  for (let i = Math.max(t, minIndex); i <= maxIndex; i++) {
    if (loaded.has(i)) return i
  }
  return maxIndex
}

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showChampagneGradient, setShowChampagneGradient] = useState(false)
  const [gradientTransitionComplete, setGradientTransitionComplete] = useState(false)
  const [heroCrossed, setHeroCrossed] = useState(false)
  const [polygonOpacity, setPolygonOpacity] = useState(0)
  const [sequenceProgress, setSequenceProgress] = useState(0)
  const [part2Progress, setPart2Progress] = useState(0)
  const [smoothedPart2Progress, setSmoothedPart2Progress] = useState(0)
  const [frameStickyMode, setFrameStickyMode] = useState<'before' | 'stuck' | 'after'>('before')
  const [frameScrollOutProgress, setFrameScrollOutProgress] = useState(0)
  const [smoothedVideoTransitionProgress, setSmoothedVideoTransitionProgress] = useState(0)
  const [videoStickyMode, setVideoStickyMode] = useState<'before' | 'stuck' | 'after'>('before')
  const [part3Progress, setPart3Progress] = useState(0)
  const [smoothedPart3Progress, setSmoothedPart3Progress] = useState(0)
  const [smoothedPart4Progress, setSmoothedPart4Progress] = useState(0)
  const [isDesktopViewport, setIsDesktopViewport] = useState(true)
  const [alphaPlaybackMode, setAlphaPlaybackMode] = useState<'webm' | 'mp4' | 'png'>('webm')
  const videoRef = useRef<HTMLVideoElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const frameSectionRef = useRef<HTMLElement>(null)
  const careSectionRef = useRef<HTMLElement>(null)
  const careVideoStickyRef = useRef<HTMLDivElement>(null)
  const careVideoRef = useRef<HTMLVideoElement>(null)
  const videoStickSentinelRef = useRef<HTMLDivElement>(null)
  const videoStickyWrapperRef = useRef<HTMLDivElement>(null)
  const videoPlaceholderHeightRef = useRef<number>(0)
  const videoStickyModeRef = useRef<'before' | 'stuck' | 'after'>('before')
  const videoTransitionTargetRef = useRef(0)
  const smoothedVideoTransitionRef = useRef(0)
  const smoothedPart2Ref = useRef(0)
  const part2TargetRef = useRef(0)
  const smoothedPart3Ref = useRef(0)
  const part3TargetRef = useRef(0)
  const smoothedPart4Ref = useRef(0)
  const part4TargetRef = useRef(0)
  const lastTickTimeRef = useRef<number>(0)
  const scrollWhenInsideAtCenterRef = useRef<number | null>(null)
  const isMobileRef = useRef(false)
  const isIOSRef = useRef(false)
  const systemTextRef = useRef<HTMLDivElement>(null)
  const styleTextRef = useRef<HTMLDivElement>(null)
  const designTextRef = useRef<HTMLDivElement>(null)
  const designImageRef = useRef<HTMLDivElement>(null)
  const careTextRef = useRef<HTMLDivElement>(null)
  const insideTextRef = useRef<HTMLDivElement>(null)
  const stableVhRef = useRef(800)
  const lastSmoothedProgressStateTimeRef = useRef(0)
  const lastSmoothedPart2StateRef = useRef(0)
  const lastSmoothedPart3StateRef = useRef(0)
  const lastSmoothedPart4StateRef = useRef(0)
  const lastSmoothedVideoStateRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const dprRef = useRef(1)
  const canvasRectRef = useRef({ w: 0, h: 0 })
  const v1Ref = useRef<HTMLVideoElement>(null)
  const v2Ref = useRef<HTMLVideoElement>(null)
  const v3Ref = useRef<HTMLVideoElement>(null)
  const v4Ref = useRef<HTMLVideoElement>(null)
  const dur1Ref = useRef(0)
  const dur2Ref = useRef(0)
  const dur3Ref = useRef(0)
  const dur4Ref = useRef(0)
  const targetPartRef = useRef<1 | 2 | 3 | 4>(1)
  const displayPartRef = useRef<1 | 2 | 3 | 4>(1)
  const targetTimeRef = useRef(0)
  const displayTimeRef = useRef(0)
  const pendingSeekRef = useRef<number | null>(null)
  const lastSeekCommitMsRef = useRef(0)
  const lastTickRef = useRef(0)
  const seekRafScheduledRef = useRef(false)
  const isScrubbingRef = useRef(false)
  const drawRafRef = useRef<number | null>(null)
  const vfcHandleRef = useRef<number | null>(null)
  const part4ZoomRef = useRef(1) // mobile-only: zoom applied to video draw, not canvas

  const getScrollY = useCallback(
    () => (typeof window !== 'undefined' ? window.scrollY || document.documentElement.scrollTop || 0 : 0),
    []
  )

  useEffect(() => {
    const m = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)')
    if (!m) return
    setIsDesktopViewport(m.matches)
    const h = () => setIsDesktopViewport(m.matches)
    m.addEventListener('change', h)
    return () => m.removeEventListener('change', h)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ios = isIOS()
    const vp9Ok = supportsVp9Webm()
    if (ios) setAlphaPlaybackMode('mp4')
    else if (vp9Ok) setAlphaPlaybackMode('webm')
    else setAlphaPlaybackMode('png')
  }, [])

  // Stable viewport height (avoids mobile address bar collapse/expand shifting section boundaries).
  useEffect(() => {
    const updateVh = () => {
      if (typeof window === 'undefined') return
      stableVhRef.current = window.visualViewport?.height ?? window.innerHeight
    }
    updateVh()
    window.addEventListener('resize', updateVh)
    window.visualViewport?.addEventListener('resize', updateVh)
    return () => {
      window.removeEventListener('resize', updateVh)
      window.visualViewport?.removeEventListener('resize', updateVh)
    }
  }, [])

  // Mobile: touch or narrow viewport — use stricter frame caps for smooth scroll (no skip).
  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const narrow = window.innerWidth < 1024
      isMobileRef.current = touch || narrow
      isIOSRef.current = isIOS()
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (!isLoading && videoRef.current) {
      const v = videoRef.current
      if (v.currentTime < 0.1) v.currentTime = 0.1
      v.play().catch(() => {
        // Autoplay may be blocked; user can tap to play
      })
    }
  }, [isLoading])

  const onTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (video && video.currentTime >= GRADIENT_START_TIME) {
      setShowChampagneGradient(true)
    }
  }, [])

  // Allow scroll only after gradient transition (2.8s) is complete
  useEffect(() => {
    if (!showChampagneGradient) return
    const timer = setTimeout(() => {
      setGradientTransitionComplete(true)
    }, GRADIENT_DURATION_MS)
    return () => clearTimeout(timer)
  }, [showChampagneGradient])

  // Care section video: play automatically when it enters the viewport
  useEffect(() => {
    if (!gradientTransitionComplete) return
    const video = careVideoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px' }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [gradientTransitionComplete])

  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas?.parentElement) return
    const rect = canvas.parentElement.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return
    const rawDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    const dpr = isMobileRef.current ? Math.min(rawDpr, 1.5) : Math.min(rawDpr, 2)
    dprRef.current = dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: false, willReadFrequently: false }) || canvas.getContext('2d')
    ctxRef.current = ctx
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    canvasRectRef.current = { w: rect.width, h: rect.height }
  }, [])

  useEffect(() => {
    if (!gradientTransitionComplete) return
    syncCanvasSize()
    const onResize = () => syncCanvasSize()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    window.visualViewport?.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      window.visualViewport?.removeEventListener('resize', onResize)
    }
  }, [gradientTransitionComplete, syncCanvasSize])

  // Alpha videos: load metadata, store duration, warm decoder (muted+playsInline), attach seeked handlers once
  useEffect(() => {
    if (!gradientTransitionComplete) return
    const getActiveVideo = () =>
      displayPartRef.current === 1 ? v1Ref.current
        : displayPartRef.current === 2 ? v2Ref.current
        : displayPartRef.current === 3 ? v3Ref.current
        : v4Ref.current
    const onSeeked = (v: HTMLVideoElement) => {
      if (getActiveVideo() !== v || v.readyState < 2) return
      const ctx = ctxRef.current
      const rect = canvasRectRef.current
      if (ctx && rect.w > 0 && rect.h > 0) {
        ctx.clearRect(0, 0, rect.w, rect.h)
        ctx.globalCompositeOperation = 'source-over'
        const zoom = part4ZoomRef.current
        if (isMobileRef.current && zoom < 1) {
          ctx.save()
          ctx.translate(rect.w / 2, rect.h / 2)
          ctx.scale(zoom, zoom)
          ctx.translate(-rect.w / 2, -rect.h / 2)
          drawCover(ctx, v, rect.w, rect.h)
          ctx.restore()
        } else {
          drawCover(ctx, v, rect.w, rect.h)
        }
      }
      const pending = pendingSeekRef.current
      if (pending !== null) {
        const EPS = isMobileRef.current ? 0.03 : 0.02
        if (Math.abs((v.currentTime || 0) - pending) > EPS && !v.seeking) {
          v.currentTime = pending
        }
      }
    }
    const videos = [v1Ref, v2Ref, v3Ref, v4Ref] as const
    const durRefs = [dur1Ref, dur2Ref, dur3Ref, dur4Ref] as const
    const warm = (v: HTMLVideoElement, durRef: { current: number }) => {
      durRef.current = v.duration || 0
      v.currentTime = 0
      v.play()
        .then(() => v.pause())
        .catch(() => {})
    }
    const cleanups: (() => void)[] = []
    videos.forEach((ref, i) => {
      const v = ref.current
      if (!v) return
      const onMeta = () => warm(v, durRefs[i])
      v.addEventListener('loadedmetadata', onMeta)
      if (v.readyState >= 1) onMeta()
      cleanups.push(() => v.removeEventListener('loadedmetadata', onMeta))
      const boundSeeked = () => onSeeked(v)
      v.addEventListener('seeked', boundSeeked)
      cleanups.push(() => v.removeEventListener('seeked', boundSeeked))
    })
    return () => cleanups.forEach((c) => c())
  }, [gradientTransitionComplete])

  useEffect(() => {
    if (!gradientTransitionComplete) return
    const getActiveVideo = () =>
      displayPartRef.current === 1 ? v1Ref.current
        : displayPartRef.current === 2 ? v2Ref.current
        : displayPartRef.current === 3 ? v3Ref.current
        : v4Ref.current

    const draw = () => {
      const v = getActiveVideo()
      const ctx = ctxRef.current
      const rect = canvasRectRef.current
      if (v && ctx && rect.w > 0 && rect.h > 0 && v.readyState >= 2 && v.videoWidth > 0 && v.videoHeight > 0) {
        ctx.clearRect(0, 0, rect.w, rect.h)
        ctx.globalCompositeOperation = 'source-over'
        const zoom = part4ZoomRef.current
        if (isMobileRef.current && zoom < 1) {
          ctx.save()
          ctx.translate(rect.w / 2, rect.h / 2)
          ctx.scale(zoom, zoom)
          ctx.translate(-rect.w / 2, -rect.h / 2)
          drawCover(ctx, v, rect.w, rect.h)
          ctx.restore()
        } else {
          drawCover(ctx, v, rect.w, rect.h)
        }
      }
    }

    const vfcLoop = () => {
      const v = getActiveVideo()
      if (!v || typeof (v as any).requestVideoFrameCallback !== 'function') {
        vfcHandleRef.current = null
        return
      }
      vfcHandleRef.current = (v as any).requestVideoFrameCallback(() => {
        draw()
        vfcLoop()
      })
    }

    const rafLoop = () => {
      if (isScrubbingRef.current) draw()
      drawRafRef.current = requestAnimationFrame(rafLoop)
    }

    const v0 = getActiveVideo()
    const hasVFC = !!v0 && typeof (v0 as any).requestVideoFrameCallback === 'function'
    if (hasVFC) vfcLoop()
    drawRafRef.current = requestAnimationFrame(rafLoop)

    return () => {
      if (drawRafRef.current !== null) cancelAnimationFrame(drawRafRef.current)
      drawRafRef.current = null
      const v = getActiveVideo()
      const h = vfcHandleRef.current
      if (v && h !== null && typeof (v as any).cancelVideoFrameCallback === 'function') {
        ;(v as any).cancelVideoFrameCallback(h)
      }
      vfcHandleRef.current = null
    }
  }, [gradientTransitionComplete])

  // Update only target refs from current scroll position (no setState). Single scroll source (window) + stable vh for deterministic mobile behavior.
  const updateTargetsFromScroll = useCallback(() => {
    const effectiveScroll = getScrollY()
    const vh = stableVhRef.current
    const sequenceStart = vh
    const part1Height = (SEQUENCE_SCROLL_VH / 100) * vh
    const part2Start = sequenceStart + part1Height
    const part2Height = (PART2_SCROLL_VH / 100) * vh
    const part3StartPx = sequenceStart + part1Height + part2Height
    const part3HeightPx = (PART3_SCROLL_VH / 100) * vh
    const part4StartPx = part3StartPx + part3HeightPx
    const part4HeightPx = (PART4_SCROLL_VH / 100) * vh

    if (effectiveScroll >= part2Start) {
      const p2 = Math.min(1, (effectiveScroll - part2Start) / part2Height)
      part2TargetRef.current = p2
    } else if (effectiveScroll >= sequenceStart) {
      part2TargetRef.current = 0
    } else {
      part2TargetRef.current = 0
    }

    const frameSectionContentVh = 100 + SEQUENCE_SCROLL_VH + PART2_SCROLL_VH + PART3_SCROLL_VH + PART4_SCROLL_VH
    const scrollOutStartPx = vh + (frameSectionContentVh / 100) * vh
    const scrollOutHeightPx = (FRAME_SCROLL_OUT_VH / 100) * vh
    if (effectiveScroll >= scrollOutStartPx) {
      if (scrollWhenInsideAtCenterRef.current === null) scrollWhenInsideAtCenterRef.current = scrollOutStartPx
    } else {
      scrollWhenInsideAtCenterRef.current = null
    }

    const sentinel = videoStickSentinelRef.current
    const section = careSectionRef.current
    const wrapper = videoStickyWrapperRef.current
    if (sentinel && section) {
      const sentinelRect = sentinel.getBoundingClientRect()
      const sectionRect = section.getBoundingClientRect()
      const spacerHeightPx = (VIDEO_STICKY_SCROLL_VH / 100) * vh
      const stickStartY = effectiveScroll + sentinelRect.top - VIDEO_STICK_TOP_OFFSET_PX
      const stickEndY = stickStartY + spacerHeightPx
      let mode: 'before' | 'stuck' | 'after' = 'before'
      let progress = 0
      if (sectionRect.bottom <= 0) {
        mode = 'after'
        progress = 1
      } else if (effectiveScroll < stickStartY) {
        mode = 'before'
        progress = 0
        videoPlaceholderHeightRef.current = 0
      } else if (effectiveScroll >= stickStartY && effectiveScroll <= stickEndY) {
        mode = 'stuck'
        progress = Math.max(0, Math.min(1, (effectiveScroll - stickStartY) / spacerHeightPx))
        if (videoStickyModeRef.current !== 'stuck' && wrapper) {
          videoPlaceholderHeightRef.current = wrapper.getBoundingClientRect().height
        }
      } else {
        mode = 'after'
        progress = 1
      }
      videoStickyModeRef.current = mode
      videoTransitionTargetRef.current = progress
    }

    if (effectiveScroll >= part4StartPx) {
      part3TargetRef.current = 1
      part4TargetRef.current = Math.min(1, (effectiveScroll - part4StartPx) / part4HeightPx)
    } else if (effectiveScroll >= part3StartPx) {
      part3TargetRef.current = Math.min(1, (effectiveScroll - part3StartPx) / part3HeightPx)
      part4TargetRef.current = 0
      smoothedPart4Ref.current = 0
    } else {
      part3TargetRef.current = 0
      smoothedPart3Ref.current = 0
      part4TargetRef.current = 0
      smoothedPart4Ref.current = 0
    }
  }, [getScrollY])

  // Corner crosses + layout state from scroll. Single scroll source (window) + stable vh.
  useEffect(() => {
    if (!gradientTransitionComplete) return

    const checkScroll = () => {
      updateTargetsFromScroll()
      const effectiveScroll = getScrollY()
      const vh = stableVhRef.current
      const threshold = vh * HERO_HEIGHT_THRESHOLD
      setHeroCrossed(effectiveScroll >= threshold)
      setPolygonOpacity(Math.min(1, effectiveScroll / vh))
      // Part 1: frame sequence forward (86400→86520); Part 2: reverse (86520→86455)
      const sequenceStart = vh
      const part1Height = (SEQUENCE_SCROLL_VH / 100) * vh
      const part2Start = sequenceStart + part1Height
      const part2Height = (PART2_SCROLL_VH / 100) * vh
      if (effectiveScroll >= part2Start) {
        const p2 = Math.min(1, (effectiveScroll - part2Start) / part2Height)
        setPart2Progress(p2)
        part2TargetRef.current = p2
        setSequenceProgress(1)
      } else if (effectiveScroll >= sequenceStart) {
        setPart2Progress(0)
        part2TargetRef.current = 0
        smoothedPart2Ref.current = 0
        setSmoothedPart2Progress(0)
        const progress = Math.min(1, (effectiveScroll - sequenceStart) / part1Height)
        setSequenceProgress(progress)
      } else {
        setPart2Progress(0)
        part2TargetRef.current = 0
        smoothedPart2Ref.current = 0
        setSmoothedPart2Progress(0)
        setSequenceProgress(0)
      }
      // Scroll-out phase: frame (and inside text) start scrolling up as soon as we reach end of Part 4 (no extra scroll), then move 1:1 with scroll
      const frameSectionContentVh = 100 + SEQUENCE_SCROLL_VH + PART2_SCROLL_VH + PART3_SCROLL_VH + PART4_SCROLL_VH
      const scrollOutStartPx = vh + (frameSectionContentVh / 100) * vh
      const scrollOutHeightPx = (FRAME_SCROLL_OUT_VH / 100) * vh
      let scrollOutProgress = 0
      if (effectiveScroll >= scrollOutStartPx) {
        if (scrollWhenInsideAtCenterRef.current === null) {
          scrollWhenInsideAtCenterRef.current = scrollOutStartPx
        }
        const scrollOutPx = Math.min(scrollOutHeightPx, effectiveScroll - scrollWhenInsideAtCenterRef.current)
        scrollOutProgress = Math.min(1, scrollOutPx / scrollOutHeightPx)
        setFrameScrollOutProgress(scrollOutProgress)
      } else {
        setFrameScrollOutProgress(0)
        scrollWhenInsideAtCenterRef.current = null
      }
      // Sticky frame: before (entering), stuck (fully in view), after (scrolled past). Switch to after as soon as scroll-out completes to avoid extra scroll + jump
      const section = frameSectionRef.current
      if (section) {
        const rect = section.getBoundingClientRect()
        if (rect.top > 0) setFrameStickyMode('before')
        else if (rect.bottom <= 0 || scrollOutProgress >= 1) setFrameStickyMode('after')
        else setFrameStickyMode('stuck')
      }
      // Video: sentinel-based stick; stickStartY/stickEndY from scrollY + sentinel rect
      const sentinel = videoStickSentinelRef.current
      const careSection = careSectionRef.current
      const videoWrapper = videoStickyWrapperRef.current
      if (sentinel && careSection) {
        const sentinelRect = sentinel.getBoundingClientRect()
        const sectionRect = careSection.getBoundingClientRect()
        const spacerHeightPx = (VIDEO_STICKY_SCROLL_VH / 100) * vh
        const stickStartY = effectiveScroll + sentinelRect.top - VIDEO_STICK_TOP_OFFSET_PX
        const stickEndY = stickStartY + spacerHeightPx
        let mode: 'before' | 'stuck' | 'after' = 'before'
        let progress = 0
        if (sectionRect.bottom <= 0) {
          mode = 'after'
          progress = 1
        } else if (effectiveScroll < stickStartY) {
          mode = 'before'
          progress = 0
          videoPlaceholderHeightRef.current = 0
        } else if (effectiveScroll >= stickStartY && effectiveScroll <= stickEndY) {
          mode = 'stuck'
          progress = Math.max(0, Math.min(1, (effectiveScroll - stickStartY) / spacerHeightPx))
          if (videoStickyModeRef.current !== 'stuck' && videoWrapper) {
            videoPlaceholderHeightRef.current = videoWrapper.getBoundingClientRect().height
          }
        } else {
          mode = 'after'
          progress = 1
        }
        videoStickyModeRef.current = mode
        videoTransitionTargetRef.current = progress
        setVideoStickyMode(mode)
      }
      // Part 3: sequence02; Part 4: sequence03 (same sticky view)
      const part3StartPx = sequenceStart + part1Height + part2Height
      const part3HeightPx = (PART3_SCROLL_VH / 100) * vh
      const part4StartPx = part3StartPx + part3HeightPx
      const part4HeightPx = (PART4_SCROLL_VH / 100) * vh
      if (effectiveScroll >= part4StartPx) {
        part3TargetRef.current = 1
        const p4 = Math.min(1, (effectiveScroll - part4StartPx) / part4HeightPx)
        part4TargetRef.current = p4
      } else if (effectiveScroll >= part3StartPx) {
        const p3 = Math.min(1, (effectiveScroll - part3StartPx) / part3HeightPx)
        part3TargetRef.current = p3
        part4TargetRef.current = 0
        smoothedPart4Ref.current = 0
        setSmoothedPart4Progress(0)
      } else {
        setPart3Progress(0)
        part3TargetRef.current = 0
        smoothedPart3Ref.current = 0
        setSmoothedPart3Progress(0)
        part4TargetRef.current = 0
        smoothedPart4Ref.current = 0
        setSmoothedPart4Progress(0)
      }
    }

    checkScroll()
    window.addEventListener('scroll', checkScroll, { passive: true })
    return () => window.removeEventListener('scroll', checkScroll)
  }, [gradientTransitionComplete, updateTargetsFromScroll, getScrollY])

  // Frame-rate independent smooth animation: follow scroll target without jumping.
  // Read scroll position inside RAF every frame so mobile (throttled scroll events) still gets smooth targets.
  useEffect(() => {
    if (!gradientTransitionComplete) return
    const now0 = performance.now()
    lastTickTimeRef.current = now0
    lastTickRef.current = now0
    let rafId = 0
    const tick = (now: number) => {
      updateTargetsFromScroll()
      const dtSec = Math.min(0.1, (now - lastTickTimeRef.current) / 1000)
      lastTickTimeRef.current = now
      const isMobile = isMobileRef.current
      const smoothFactor = 1 - Math.exp(-dtSec / (isMobile ? SMOOTHING_TIME_CONSTANT_MOBILE : SMOOTHING_TIME_CONSTANT))

      const shouldUpdateProgress = (next: number, lastRef: { current: number }) =>
        Math.abs(next - lastRef.current) >= SMOOTHED_PROGRESS_THROTTLE_DELTA ||
        now - lastSmoothedProgressStateTimeRef.current >= SMOOTHED_PROGRESS_THROTTLE_MS

      if (part2TargetRef.current > 0) {
        // Part 2: smooth progress for overlay text (sequenceProgress + smoothedPart2Progress)
        const target2 = part2TargetRef.current
        const current2 = smoothedPart2Ref.current
        const next2 = current2 + (target2 - current2) * smoothFactor
        smoothedPart2Ref.current = next2
        if (shouldUpdateProgress(next2, lastSmoothedPart2StateRef)) {
          lastSmoothedPart2StateRef.current = next2
          lastSmoothedProgressStateTimeRef.current = now
          setSmoothedPart2Progress(next2)
        }
      } else {
        // Part 1: no frame state; video scrub drives Part1/2 display
      }

      const y = getScrollY()
      const vh = stableVhRef.current
      const sequenceStart = vh
      const part1Height = (SEQUENCE_SCROLL_VH / 100) * vh
      const part2Start = sequenceStart + part1Height
      const part2Height = (PART2_SCROLL_VH / 100) * vh
      const part3Start = part2Start + part2Height
      const part3Height = (PART3_SCROLL_VH / 100) * vh
      const part4Start = part3Start + part3Height
      const part4Height = (PART4_SCROLL_VH / 100) * vh

      let part: 1 | 2 | 3 | 4 = 1
      let raw = 0
      if (y < sequenceStart) {
        part = 1
        raw = 0
      } else if (y < part2Start) {
        part = 1
        raw = clamp((y - sequenceStart) / part1Height, 0, 1)
      } else if (y < part3Start) {
        part = 2
        raw = clamp((y - part2Start) / part2Height, 0, 1)
      } else if (y < part4Start) {
        part = 3
        raw = clamp((y - part3Start) / part3Height, 0, 1)
      } else {
        part = 4
        raw = clamp((y - part4Start) / part4Height, 0, 1)
      }

      const duration =
        part === 1 ? dur1Ref.current : part === 2 ? dur2Ref.current : part === 3 ? dur3Ref.current : dur4Ref.current
      let targetTime = 0
      if (duration > 0) {
        targetTime = clamp(raw * duration, 0, Math.max(0, duration - 0.001))
      }
      targetPartRef.current = part
      targetTimeRef.current = targetTime

      if (part !== displayPartRef.current) {
        displayPartRef.current = part
        const vNew = part === 1 ? v1Ref.current : part === 2 ? v2Ref.current : part === 3 ? v3Ref.current : v4Ref.current
        const initTime = vNew?.readyState && vNew.readyState >= 2 ? (vNew.currentTime || 0) : displayTimeRef.current
        displayTimeRef.current = initTime
      }

      if (duration > 0) {
        const FOLLOW_TC = isMobile ? FOLLOW_TC_MOBILE : FOLLOW_TC_DESKTOP
        const MAX_SPEED = isMobile ? MAX_SPEED_MOBILE : MAX_SPEED_DESKTOP
        let current = displayTimeRef.current
        const diff = targetTime - current
        const maxStep = MAX_SPEED * dtSec
        const clampedDiff = clamp(diff, -maxStep, maxStep)
        const followFactor = 1 - Math.exp(-dtSec / FOLLOW_TC)
        current = current + clampedDiff * followFactor
        displayTimeRef.current = clamp(current, 0, Math.max(0, duration - 0.001))
      }

      lastTickRef.current = now

      const getActiveVideo = () =>
        displayPartRef.current === 1 ? v1Ref.current
          : displayPartRef.current === 2 ? v2Ref.current
          : displayPartRef.current === 3 ? v3Ref.current
          : v4Ref.current

      const activePart = displayPartRef.current
      const activeDur = activePart === 1 ? dur1Ref.current : activePart === 2 ? dur2Ref.current : activePart === 3 ? dur3Ref.current : dur4Ref.current
      const video = getActiveVideo()
      ;[v1Ref.current, v2Ref.current, v3Ref.current, v4Ref.current].forEach((v) => {
        if (v && v !== video && !v.paused) v.pause()
      })
      if (video && activeDur > 0) {
        const desired = displayTimeRef.current
        const EPS = isMobileRef.current ? SEEK_EPS_MOBILE : SEEK_EPS_DESKTOP
        if (Math.abs((video.currentTime || 0) - desired) > EPS) {
          pendingSeekRef.current = desired
          isScrubbingRef.current = true

          if (!seekRafScheduledRef.current) {
            seekRafScheduledRef.current = true
            requestAnimationFrame(() => {
              seekRafScheduledRef.current = false
              const v = displayPartRef.current === 1 ? v1Ref.current : displayPartRef.current === 2 ? v2Ref.current : displayPartRef.current === 3 ? v3Ref.current : v4Ref.current
              const t = pendingSeekRef.current
              if (!v || t === null) return
              const minInterval = isMobileRef.current ? SEEK_MIN_INTERVAL_MS_MOBILE : SEEK_MIN_INTERVAL_MS_DESKTOP
              const nowMs = performance.now()
              if (!v.seeking && nowMs - lastSeekCommitMsRef.current >= minInterval) {
                lastSeekCommitMsRef.current = nowMs
                v.currentTime = t
              }
            })
          }
        } else {
          isScrubbingRef.current = false
        }
      } else {
        isScrubbingRef.current = false
      }

      if (DEBUG_FRAME) console.log({ part, raw, targetTime, displayTime: displayTimeRef.current })

      const target3 = part3TargetRef.current
      const current3 = smoothedPart3Ref.current
      const next3 = current3 + (target3 - current3) * smoothFactor
      smoothedPart3Ref.current = next3
      if (shouldUpdateProgress(next3, lastSmoothedPart3StateRef)) {
        lastSmoothedPart3StateRef.current = next3
        lastSmoothedProgressStateTimeRef.current = now
        setSmoothedPart3Progress(next3)
      }
      const target4 = part4TargetRef.current
      const current4 = smoothedPart4Ref.current
      const next4 = current4 + (target4 - current4) * smoothFactor
      smoothedPart4Ref.current = next4
      if (shouldUpdateProgress(next4, lastSmoothedPart4StateRef)) {
        lastSmoothedPart4StateRef.current = next4
        lastSmoothedProgressStateTimeRef.current = now
        setSmoothedPart4Progress(next4)
      }
      // Mobile: apply Part 4 zoom in draw, not on canvas
      part4ZoomRef.current = isMobileRef.current
        ? 1 - (1 - PART4_ZOOM_OUT_END) * smoothedPart4Ref.current
        : 1

      const videoTarget = videoTransitionTargetRef.current
      const videoCurrent = smoothedVideoTransitionRef.current
      const videoNext = videoCurrent + (videoTarget - videoCurrent) * smoothFactor
      smoothedVideoTransitionRef.current = videoNext
      if (shouldUpdateProgress(videoNext, lastSmoothedVideoStateRef)) {
        lastSmoothedVideoStateRef.current = videoNext
        lastSmoothedProgressStateTimeRef.current = now
        setSmoothedVideoTransitionProgress(videoNext)
      }

      // Text offsets: px-based + DPR rounding for iOS jitter fix (no React re-render)
      const seqProgress = y < sequenceStart ? 0 : y >= part2Start ? 1 : clamp((y - sequenceStart) / part1Height, 0, 1)
      const sm2 = smoothedPart2Ref.current
      const sm3 = smoothedPart3Ref.current
      const sm4 = smoothedPart4Ref.current
      const sysOffsetPx = roundToDprPx(((seqProgress * SYSTEM_TEXT_SCROLL_VH + sm2 * SYSTEM_TEXT_PART2_VH) / 100) * vh)
      const rawStyle = Math.max(0, (seqProgress - STYLE_TEXT_DELAY) / (1 - STYLE_TEXT_DELAY))
      const styleProgress = Math.pow(rawStyle, STYLE_TEXT_EASING)
      const styleOffsetPx = roundToDprPx((((1 - styleProgress) * 85 - sm2 * STYLE_TEXT_PART2_VH) / 100) * vh)
      const designVisible = sm2 > 0
      const designOffsetPx = roundToDprPx(
        ((designVisible ? DESIGN_FROM_BOTTOM_VH - DESIGN_FROM_BOTTOM_VH * sm2 - DESIGN_SCROLL_UP_VH * sm3 : DESIGN_FROM_BOTTOM_VH) + DESIGN_VERTICAL_OFFSET_VH) / 100 * vh
      )
      const careVisible = sm3 > 0
      const careOffsetPx = roundToDprPx(
        ((careVisible ? CARE_FROM_BOTTOM_VH - CARE_FROM_BOTTOM_VH * sm3 - CARE_SCROLL_UP_VH * sm4 : CARE_FROM_BOTTOM_VH) + CARE_VERTICAL_OFFSET_VH) / 100 * vh
      )
      const insideVisible = sm4 > 0
      const insideOffsetPx = roundToDprPx(
        (((insideVisible ? INSIDE_FROM_BOTTOM_VH - INSIDE_FROM_BOTTOM_VH * sm4 : INSIDE_FROM_BOTTOM_VH) + INSIDE_VERTICAL_OFFSET_VH) / 100) * vh
      )
      systemTextRef.current?.style.setProperty('--sysY', `${sysOffsetPx}px`)
      styleTextRef.current?.style.setProperty('--styleY', `${styleOffsetPx}px`)
      designTextRef.current?.style.setProperty('--designY', `${designOffsetPx}px`)
      designImageRef.current?.style.setProperty('--designY', `${designOffsetPx}px`)
      careTextRef.current?.style.setProperty('--careY', `${careOffsetPx}px`)
      insideTextRef.current?.style.setProperty('--insideY', `${insideOffsetPx}px`)

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [gradientTransitionComplete, updateTargetsFromScroll])

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      <main
        ref={mainRef}
        style={{
          overflowX: 'hidden',
          overflowY: showChampagneGradient && !gradientTransitionComplete ? 'hidden' : 'visible',
          border: 'none',
          outline: 'none',
        }}
        className={`relative min-h-screen bg-white transition-opacity duration-700 border-0 border-none outline-none ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Navigation */}
        <Navbar />

        {/* Corner plus icons – below navbar, four corners; rotate when hero crossed */}
        {!isLoading && (
          <div className="fixed inset-0 pointer-events-none z-40" aria-hidden>
            <div
              className="absolute left-6 top-[5.5rem] w-[16.8px] h-[16.8px] text-black transition-transform duration-300 ease-out"
              style={{ transform: heroCrossed ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="w-full h-full">
                <path d="M8 1v14M1 8h14" />
              </svg>
            </div>
            <div
              className="absolute right-6 top-[5.5rem] w-[16.8px] h-[16.8px] text-black transition-transform duration-300 ease-out"
              style={{ transform: heroCrossed ? 'rotate(-45deg)' : 'rotate(0deg)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="w-full h-full">
                <path d="M8 1v14M1 8h14" />
              </svg>
            </div>
            <div
              className="absolute left-6 bottom-6 w-[16.8px] h-[16.8px] text-black transition-transform duration-300 ease-out"
              style={{ transform: heroCrossed ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="w-full h-full">
                <path d="M8 1v14M1 8h14" />
              </svg>
            </div>
            <div
              className="absolute right-6 bottom-6 w-[16.8px] h-[16.8px] text-black transition-transform duration-300 ease-out"
              style={{ transform: heroCrossed ? 'rotate(-45deg)' : 'rotate(0deg)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="w-full h-full">
                <path d="M8 1v14M1 8h14" />
              </svg>
            </div>
          </div>
        )}

        {/* Section 1: hero (gradient, headline, video) */}
        {!isLoading && (
          <div className="relative min-h-screen bg-white">
            {/* Hero overlay: gradient, headline, video */}
            <div
              className="absolute top-0 left-0 right-0 min-h-screen z-20 pointer-events-none"
              style={
                showChampagneGradient
                  ? {
                      background: 'linear-gradient(to bottom, #E8DCC8 0%, #F2EBE0 40%, #FAF8F5 70%, #FFFFFF 100%)',
                    }
                  : undefined
              }
            >
              {showChampagneGradient && (
                <div
                  className="absolute top-0 left-0 right-0 flex flex-col items-center justify-start pointer-events-none z-10 pt-[30vh] md:pt-[calc(20vh+6rem)]"
                  style={{
                    animation: 'landing-gradient-fade 2.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                  }}
                >
                  <h1
                    className="text-center font-bold tracking-tight leading-none bg-clip-text text-transparent"
                    style={{
                      fontFamily: 'var(--font-unbounded), Unbounded, system-ui, sans-serif',
                      fontSize: 'clamp(3.48rem, 8.76vw, 6.12rem)',
                      backgroundImage: 'linear-gradient(to bottom, #9A7B3C 0%, #A68B45 35%, #B89850 65%, #D4BC7A 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                    }}
                  >
                    Sensing What Matters
                  </h1>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 md:pb-8">
                <div className="relative z-20 flex justify-center pointer-events-none translate-y-[24vh]">
                  <div className="relative w-[96vw] max-w-[100%] h-[80vh] max-h-[none] md:w-[98vw] md:max-w-[1400px] md:h-[86vh] md:max-h-[800px] lg:w-[98vw] lg:max-w-[1680px] lg:h-[88vh] lg:max-h-[960px] pointer-events-auto">
                    <div className="absolute inset-0 flex items-start justify-center pt-[30vh] z-0">
                      <span
                        className="text-black font-semibold tracking-tight select-none"
                        style={{
                          fontFamily: 'var(--font-unbounded), Unbounded, system-ui, sans-serif',
                          fontSize: 'clamp(1.25rem, 3.5vw, 2.25rem)',
                        }}
                      >
                        ASTHESIS
                      </span>
                    </div>
                    <video
                      ref={videoRef}
                      src={typeof navigator !== 'undefined' && isIOS() ? '/videos/hero_alpha_ios.mp4' : '/videos/Asthesis_Intro_video.webm'}
                      className="relative z-10 w-full h-full object-contain"
                      playsInline
                      muted
                      onLoadedData={(e) => {
                        const v = e.currentTarget
                        if (v.currentTime < 0.1) v.currentTime = 0.1
                      }}
                      onTimeUpdate={onTimeUpdate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Davinici frame: scroll into view (100vh), then fixed and frame sequence driven by scroll (next 200vh) */}
        {gradientTransitionComplete && (
          <section
            ref={frameSectionRef}
            className="relative w-full bg-white border-0 border-none"
            style={{ height: `${100 + SEQUENCE_SCROLL_VH + PART2_SCROLL_VH + PART3_SCROLL_VH + PART4_SCROLL_VH + FRAME_SCROLL_OUT_VH}vh`, border: 'none' }}
          >
            {frameStickyMode === 'stuck' && <div aria-hidden style={{ height: '100vh' }} />}
            <div
              className="w-full flex items-center justify-center border-0 border-none bg-white overflow-hidden lg:overflow-visible"
              style={{
                height: '100vh',
                minHeight: '100vh',
                border: 'none',
                // No transition on transform so frame stays in sync with scroll (continuous feel)
                ...(frameStickyMode === 'before' && { position: 'relative' }),
                ...(frameStickyMode === 'stuck' && {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 5,
                  // 1:1 movement: frame moves up by same vh as scroll in this phase = feels like normal scroll
                  transform: frameScrollOutProgress > 0 ? `translateY(-${frameScrollOutProgress * FRAME_SCROLL_OUT_VH}vh)` : undefined,
                }),
                ...(frameStickyMode === 'after' && {
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }),
              }}
            >
              {/* Polygons: behind frame; fade in when scrolling hero→frame1, fade out when scrolling up */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                style={{ opacity: polygonOpacity }}
                aria-hidden
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-[72vmin] h-[72vmin] max-w-[1150px] max-h-[1150px] sm:w-[78vmin] sm:h-[78vmin] md:w-[1150px] md:h-[1150px] md:max-w-none md:max-h-none lg:w-[1365px] lg:h-[1365px]"
                  fill="none"
                >
                  <polygon points="25,50 40,35 55,50 40,65" stroke="#9A9A9A" strokeWidth="0.13" />
                  <polygon points="45,50 60,35 75,50 60,65" stroke="#9A9A9A" strokeWidth="0.13" />
                  {[
                    [25, 50], [40, 35], [55, 50], [40, 65], [45, 50], [60, 35], [75, 50], [60, 65],
                  ].map(([x, y], i) => (
                    <g key={i} transform={`translate(${x},${y}) scale(0.2)`}>
                      <path d="M-3 0h6M0 -3v6" stroke="#9A9A9A" strokeWidth="0.65" strokeLinecap="round" />
                    </g>
                  ))}
                </svg>
              </div>
              {/* Part 1–4: canvas + hidden alpha videos (iOS: HEVC MP4, else: WebM VP9) */}
              <div className="relative z-10 w-full max-w-[100vw] overflow-hidden border-0 border-none pointer-events-none aspect-square sm:aspect-square md:aspect-video lg:aspect-auto lg:w-full lg:h-full lg:max-w-none lg:min-w-full">
                {(() => {
                  const isMobile = !isDesktopViewport
                  const useMp4 = alphaPlaybackMode === 'mp4'
                  const ext = useMp4 ? 'mp4' : 'webm'
                  const res = isMobile ? '540p' : '720p'
                  const suffix = useMp4 ? `_alpha_ios_${res}` : `_alpha_${res}`
                  const shot1Src = `/videos/alpha/shot1${suffix}.${ext}`
                  const shot2Src = `/videos/alpha/shot2${suffix}.${ext}`
                  const shot3Src = `/videos/alpha/shot3${suffix}.${ext}`
                  const shot4Src = `/videos/alpha/shot4${suffix}.${ext}`
                  const preload = useMp4 ? 'auto' : 'metadata'
                  return (
                    <>
                      <video ref={v1Ref} src={shot1Src} muted playsInline disablePictureInPicture preload={preload} style={{ display: 'none' }} />
                      <video ref={v2Ref} src={shot2Src} muted playsInline disablePictureInPicture preload={preload} style={{ display: 'none' }} />
                      <video ref={v3Ref} src={shot3Src} muted playsInline disablePictureInPicture preload={preload} style={{ display: 'none' }} />
                      <video ref={v4Ref} src={shot4Src} muted playsInline disablePictureInPicture preload={preload} style={{ display: 'none' }} />
                    </>
                  )
                })()}
                <canvas
                  ref={canvasRef}
                  className="block w-full h-full border-0 border-none outline-none"
                  style={{
                    ...frameImgStyle,
                    transform: (() => {
                      const base = isDesktopViewport ? DESKTOP_VIDEO_SCALE : 1
                      // Mobile: Part 4 zoom is applied in draw, not here
                      const p4 = isDesktopViewport ? smoothedPart4Progress : 0
                      const scale = base * (1 - (1 - PART4_ZOOM_OUT_END) * p4)
                      return `translateZ(0) scale(${scale})`
                    })(),
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    contain: 'layout paint',
                    background: 'transparent',
                  }}
                />
              </div>
              {/* System text: fixed at left center; comes up with frame 1, then scrolls up as sequence runs */}
              <div
                ref={systemTextRef}
                className={`absolute z-20 w-full max-w-full left-4 right-4 lg:left-0 lg:right-auto lg:max-w-4xl pl-0 pr-8 md:pl-0 md:pr-8 lg:px-12 pointer-events-none ${isIOS() ? 'transition-none' : 'transition-all duration-150 ease-out'}`}
                style={{
                  top: '50%',
                  bottom: 'auto',
                  transform: frameStickyMode === 'before' ? 'translate3d(0,-50%,0)' : 'translate3d(0, calc(-50% - var(--sysY, 0px)), 0)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden' as const,
                  WebkitFontSmoothing: 'antialiased' as const,
                }}
                aria-hidden
              >
                <div className="max-w-full lg:max-w-3xl text-center lg:text-left [&>*]:text-center lg:[&>*]:text-left">
                  <div
                    className="mb-3"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(14px, 3vw, 20px)',
                      lineHeight: 1.2,
                      letterSpacing: '0px',
                      textTransform: 'uppercase',
                      color: '#999999',
                    }}
                  >
                    SYSTEM
                  </div>
                  <h2
                    className="mb-4"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(18px, 4.5vw, 26px)',
                      lineHeight: 'clamp(22px, 5vw, 32px)',
                      letterSpacing: '0px',
                      textTransform: 'uppercase',
                      color: '#1D1D1F',
                    }}
                  >
                    A COMPLETE WELFARE INTELLIGENCE SYSTEM
                  </h2>
                  <p
                    className="mb-4 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontWeight: 400,
                      fontSize: 'clamp(12px, 2.5vw, 14px)',
                      lineHeight: 'clamp(18px, 3.5vw, 22px)',
                      letterSpacing: '0px',
                      color: '#6F6F6F',
                    }}
                  >
                    Asthesis goes beyond emergency response. It continuously learns, adapts, and responds to subtle changes in daily life — helping protect people before situations escalate.
                  </p>
                  <ul className="space-y-2 list-none pl-0 flex flex-col items-center lg:items-start">
                    {[
                      'Wellness & behavior insights',
                      'Safety & risk monitoring',
                      'Mobility & environmental awareness',
                      'Intelligent response & alerts',
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start justify-center lg:justify-start"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 400,
                          fontSize: 'clamp(12px, 2.5vw, 14px)',
                          lineHeight: 'clamp(18px, 3.5vw, 22px)',
                          letterSpacing: '0px',
                          color: '#757575',
                        }}
                      >
                        <span className="mr-2" style={{ color: '#757575' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Style: scrolls up on right (delayed start) */}
              {(() => (
                  <div
                    ref={styleTextRef}
                    className={`absolute z-20 w-full max-w-full left-4 right-4 lg:left-auto lg:right-8 lg:max-w-3xl pl-0 pr-8 md:pl-0 md:pr-8 lg:px-8 pointer-events-none ${isIOS() ? 'transition-none' : 'transition-all duration-150 ease-out'}`}
                    style={{
                      top: '50%',
                      bottom: 'auto',
                      transform: 'translate3d(0, calc(-50% + var(--styleY, 0px)), 0)',
                      opacity: frameStickyMode === 'before' ? 0 : 1,
                      willChange: 'transform',
                      backfaceVisibility: 'hidden' as const,
                      WebkitFontSmoothing: 'antialiased' as const,
                    }}
                    aria-hidden
                  >
                    <div className="mx-auto lg:mx-0 lg:ml-auto max-w-full lg:max-w-2xl text-center lg:text-right [&>*]:text-center lg:[&>*]:text-right">
                      <div
                        className="mb-3"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 800,
                          fontSize: 'clamp(14px, 3vw, 20px)',
                          lineHeight: 1.2,
                          letterSpacing: '0px',
                          textTransform: 'uppercase',
                          color: '#999999',
                        }}
                      >
                        STYLE
                      </div>
                      <h2
                        className="mb-4"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 800,
                          fontSize: 'clamp(18px, 4.5vw, 26px)',
                          lineHeight: 'clamp(22px, 5vw, 32px)',
                          letterSpacing: '0px',
                          textTransform: 'uppercase',
                          color: '#1D1D1F',
                        }}
                      >
                        AWARENESS WITHOUT SURVEILLANCE
                      </h2>
                      <p
                        className="mb-6 text-center lg:text-right"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 400,
                          fontSize: 'clamp(12px, 2.5vw, 14px)',
                          lineHeight: 'clamp(18px, 3.5vw, 22px)',
                          letterSpacing: '0px',
                          color: '#6F6F6F',
                        }}
                      >
                        Asthesis understands patterns, not people. By observing rhythms of daily life — movement, presence, and environmental context — it builds an understanding of what is normal, and recognizes when something changes.
                      </p>
                    </div>
                  </div>
              ))()}
              {/* Design: left side; Part 2: bottom to center; Part 3: center to top (scroll off) */}
              {(() => {
                const designVisible = smoothedPart2Progress > 0
                return (
                  <>
                  <div
                    ref={designTextRef}
                    className={`absolute z-20 w-full max-w-full left-4 right-4 lg:left-0 lg:right-auto lg:max-w-2xl pl-0 pr-8 md:pl-0 md:pr-8 lg:px-12 pointer-events-none ${isIOS() ? 'transition-none' : 'transition-all duration-150 ease-out'}`}
                    style={{
                      top: '50%',
                      bottom: 'auto',
                      transform: 'translate3d(0, calc(-50% + var(--designY, 0px)), 0)',
                      opacity: frameStickyMode === 'before' || !designVisible ? 0 : 1,
                      willChange: 'transform',
                      backfaceVisibility: 'hidden' as const,
                      WebkitFontSmoothing: 'antialiased' as const,
                    }}
                    aria-hidden
                  >
                    <div className="max-w-full lg:max-w-xl text-center lg:text-left [&>*]:text-center lg:[&>*]:text-left">
                      <div
                        className="mb-2"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 800,
                          fontSize: 'clamp(12px, 2.5vw, 16px)',
                          lineHeight: 1.2,
                          letterSpacing: '0px',
                          textTransform: 'uppercase',
                          color: '#999999',
                        }}
                      >
                        DESIGN
                      </div>
                      <h2
                        className="mb-3"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 800,
                          fontSize: 'clamp(16px, 3.5vw, 22px)',
                          lineHeight: 'clamp(20px, 4vw, 28px)',
                          letterSpacing: '0px',
                          textTransform: 'uppercase',
                          color: '#1D1D1F',
                        }}
                      >
INTELLIGENCE, MADE PHYSICAL
                        </h2>
                        <p
                          className="max-w-full lg:max-w-md mx-auto lg:mx-0 text-center lg:text-left"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 400,
                          fontSize: 'clamp(11px, 2.2vw, 13px)',
                          lineHeight: 'clamp(16px, 3vw, 20px)',
                          letterSpacing: '0px',
                          color: '#6F6F6F',
                        }}
                      >
                        Asthesis is designed to belong in the home — not in a clinic. With a minimal, refined form, a soft-glow display, and a precision dial that adjusts volume or sends assistance with a press, every detail is purposeful. Calm, sculpted, and unobtrusive — it blends naturally into daily life, delivering reassurance without feeling clinical.
                      </p>
                    </div>
                  </div>
                  {/* Design image: right side, moves in sync with DESIGN text */}
                  {/* <div
                    ref={designImageRef}
                    className={`absolute z-0 left-10 right-0 lg:left-[35%] lg:right-0 w-full max-w-[95vw] lg:max-w-[65vw] flex items-center justify-center lg:justify-end pointer-events-none ${isIOS() ? 'transition-none' : 'transition-all duration-150 ease-out'}`}
                    style={{
                      top: '50%',
                      bottom: 'auto',
                      transform: 'translate3d(0, calc(-50% + var(--designY, 0px)), 0)',
                      opacity: frameStickyMode === 'before' || !designVisible ? 0 : 1,
                      willChange: 'transform',
                      backfaceVisibility: 'hidden' as const,
                    }}
                    aria-hidden
                  >
                    <img
                      src="/images/lp.png"
                      alt=""
                      className="max-w-full w-full max-h-[80vh] lg:max-h-[90vh] object-contain"
                    />
                  </div> */}
                  </>
                )
              })()}
              {/* Care: right side; Part 3 bottom→right center (reaches center when Part 3 ends), Part 4 center→top */}
              {(() => {
                const careVisible = smoothedPart3Progress > 0
                return (
                  <div
                    ref={careTextRef}
                    className={`absolute z-20 w-full max-w-full left-4 right-4 lg:left-auto lg:right-8 lg:max-w-2xl pl-0 pr-8 md:pl-0 md:pr-8 lg:px-8 pointer-events-none ${isIOS() ? 'transition-none' : 'transition-all duration-150 ease-out'}`}
                    style={{
                      top: '50%',
                      bottom: 'auto',
                      transform: 'translate3d(0, calc(-50% + var(--careY, 0px)), 0)',
                      opacity: frameStickyMode === 'before' || !careVisible ? 0 : 1,
                      willChange: 'transform',
                      backfaceVisibility: 'hidden' as const,
                      WebkitFontSmoothing: 'antialiased' as const,
                    }}
                    aria-hidden
                  >
                    <div className="mx-auto lg:mx-0 lg:ml-auto max-w-full lg:max-w-xl text-center lg:text-right [&>*]:text-center lg:[&>*]:text-right">
                      <div
                        className="mb-2"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 800,
                          fontSize: 'clamp(12px, 2.5vw, 16px)',
                          lineHeight: 1.2,
                          letterSpacing: '0px',
                          textTransform: 'uppercase',
                          color: '#999999',
                        }}
                      >
                        CARE
                      </div>
                      <h2
                        className="mb-3"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 800,
                          fontSize: 'clamp(16px, 3.5vw, 22px)',
                          lineHeight: 'clamp(20px, 4vw, 28px)',
                          letterSpacing: '0px',
                          textTransform: 'uppercase',
                          color: '#1D1D1F',
                        }}
                      >
                        DESIGNED TO BE PRESENT
                      </h2>
                      <p
                        className="max-w-full lg:max-w-md mx-auto lg:mx-0 lg:ml-auto text-center lg:text-right"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 400,
                          fontSize: 'clamp(11px, 2.2vw, 13px)',
                          lineHeight: 'clamp(16px, 3vw, 20px)',
                          letterSpacing: '0px',
                          color: '#6F6F6F',
                        }}
                      >
                        Asthesis is built around a simple belief — care should feel constant, not intrusive. By learning daily rhythms, supporting natural interactions, and responding when something feels different, it becomes a steady presence in the home. Quiet when everything is well. Ready the moment it&apos;s needed.
                      </p>
                    </div>
                  </div>
                )
              })()}
              {/* Inside Asthesis: right side; Part 4 bottom→right center (no delay, same as design/care) */}
              {(() => {
                const insideVisible = smoothedPart4Progress > 0
                return (
                  <div
                    ref={insideTextRef}
                    className={`absolute z-20 w-full max-w-full left-4 right-4 lg:left-auto lg:right-8 lg:max-w-2xl pl-0 pr-8 md:pl-0 md:pr-8 lg:px-8 pointer-events-none ${isIOS() ? 'transition-none' : 'transition-all duration-150 ease-out'}`}
                    style={{
                      top: '50%',
                      bottom: 'auto',
                      transform: 'translate3d(0, calc(-50% + var(--insideY, 0px)), 0)',
                      opacity: frameStickyMode === 'before' || !insideVisible ? 0 : 1,
                      willChange: 'transform',
                      backfaceVisibility: 'hidden' as const,
                      WebkitFontSmoothing: 'antialiased' as const,
                    }}
                    aria-hidden
                  >
                    <div className="mx-auto lg:mx-0 lg:ml-auto max-w-full lg:max-w-xl text-center lg:text-right [&>*]:text-center lg:[&>*]:text-right">
                      <div
                        className="mb-2"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 800,
                          fontSize: 'clamp(12px, 2.5vw, 16px)',
                          lineHeight: 1.2,
                          letterSpacing: '0px',
                          textTransform: 'uppercase',
                          color: '#999999',
                        }}
                      >
                        INSIDE ASTHESIS
                      </div>
                      <h2
                        className="mb-3"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 800,
                          fontSize: 'clamp(16px, 3.5vw, 22px)',
                          lineHeight: 'clamp(20px, 4vw, 28px)',
                          letterSpacing: '0px',
                          textTransform: 'uppercase',
                          color: '#1D1D1F',
                        }}
                      >
                        EVERY LAYER MATTERS
                      </h2>
                      <p
                        className="max-w-full lg:max-w-md mx-auto lg:mx-0 lg:ml-auto text-center lg:text-right"
                        style={{
                          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                          fontWeight: 400,
                          fontSize: 'clamp(11px, 2.2vw, 13px)',
                          lineHeight: 'clamp(16px, 3vw, 20px)',
                          letterSpacing: '0px',
                          color: '#6F6F6F',
                        }}
                      >
                        A precision-built system combining dedicated AI processing, integrated sensors, secure connectivity, and resilient power — working quietly in the background to deliver constant, dependable protection.
                      </p>
                    </div>
                  </div>
                )
              })()}
            </div>
          </section>
        )}

        {/* After frames: heading scrolls away; video sticks via JS fixed (hysteresis = no blink) and shrinks with scroll */}
        {gradientTransitionComplete && (
          <section ref={careSectionRef} className="relative w-full min-h-screen bg-white border-0 border-none flex flex-col items-center justify-start px-4 md:px-8 lg:px-12 pt-12 pb-0 text-center overflow-visible z-[6]">
            <div ref={careVideoStickyRef} className="w-full flex flex-col items-center bg-white pt-12">
              {/* Heading + Know more: in flow so they appear as section scrolls over the frame (no fixed pop) */}
              <div className="max-w-2xl mx-auto w-full">
                <h2
                  className="mb-6 md:mb-8 font-bold text-black tracking-tight"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: 'clamp(1.35rem, 3.5vw, 2rem)',
                    lineHeight: 1.2,
                  }}
                >
                  The Intelligent Care You Deserve
                </h2>
                <a
                  href="#"
                  className="inline-block px-6 py-3 rounded-2xl font-bold text-black transition-opacity hover:opacity-90"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: 'clamp(0.875rem, 1.25vw, 1rem)',
                    backgroundColor: '#F5E6D3',
                  }}
                >
                  Know more
                </a>
              </div>
              {/* Spacer: replaces marginTop so fixed positioning has no margin math */}
              <div className="h-2 md:h-28 shrink-0" aria-hidden />
              {/* Sentinel: measure this (not the wrapper) to decide when to stick */}
              <div ref={videoStickSentinelRef} style={{ height: 1 }} aria-hidden />
              {/* Placeholder: reserves space when stuck so footer scrolls up; 0 when before/after */}
              <div
                aria-hidden
                style={{
                  height: (() => {
                    const base = videoPlaceholderHeightRef.current
                    const progress = smoothedVideoTransitionProgress
                    const scale = 1 - (1 - VIDEO_TRANSITION_HEIGHT_SCALE_END) * progress
                    if (videoStickyMode === 'before') return 0
                    if (videoStickyMode === 'stuck' && base > 0) return base * scale
                    return 0
                  })(),
                }}
              />
              {/* Video wrapper: relative in flow until stuck, then fixed at VIDEO_STICK_TOP_OFFSET_PX */}
              <div
                ref={videoStickyWrapperRef}
                className="w-full flex justify-center items-start bg-white min-h-0 z-10"
                style={{
                  position: videoStickyMode === 'stuck' ? 'fixed' : 'relative',
                  top: videoStickyMode === 'stuck' ? VIDEO_STICK_TOP_OFFSET_PX : undefined,
                  left: videoStickyMode === 'stuck' ? 0 : undefined,
                  right: videoStickyMode === 'stuck' ? 0 : undefined,
                  width: videoStickyMode === 'stuck' ? '100%' : undefined,
                }}
              >
              <div
                className="w-full max-w-7xl mx-auto overflow-hidden border border-white/30 bg-[#1a1a1a] shadow-xl will-change-transform"
                style={{
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.2)',
                  width: `${100 - (100 - VIDEO_TRANSITION_WIDTH_END_PCT) * smoothedVideoTransitionProgress}%`,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: `${VIDEO_TRANSITION_BORDER_RADIUS_PX * smoothedVideoTransitionProgress}px`,
                  transform: `scale(${1 - (1 - VIDEO_TRANSITION_SCALE_END) * smoothedVideoTransitionProgress}, 1)`,
                  transformOrigin: 'center top',
                  ...((videoStickyMode === 'stuck' || videoStickyMode === 'after') && videoPlaceholderHeightRef.current > 0
                    ? {
                        height: videoStickyMode === 'stuck'
                          ? videoPlaceholderHeightRef.current * (1 - (1 - VIDEO_TRANSITION_HEIGHT_SCALE_END) * smoothedVideoTransitionProgress)
                          : videoPlaceholderHeightRef.current * VIDEO_TRANSITION_HEIGHT_SCALE_END,
                      }
                    : {
                        aspectRatio: '16/9',
                      }),
                }}
              >
                <div className="relative aspect-video w-full min-h-[280px] sm:min-h-[320px] md:min-h-[420px]">
                  <video
                    ref={careVideoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={assetUrl('/videos/landing_page_video.mp4')}
                    playsInline
                    muted
                    loop
                  />
                  <div className="absolute inset-0 flex flex-col pointer-events-none">
                    {/* ASTHESIS: grows and moves to centre of visible area as video transition progress increases */}
                    <div
                      className="absolute left-1/2 flex justify-center items-center"
                      style={{
                        top: `${8 + 7 * smoothedVideoTransitionProgress}%`,
                        transform: `translate(-50%, -50%) scale(${1 + 0.85 * smoothedVideoTransitionProgress})`,
                        transition: 'none',
                      }}
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
                        LOVE BY ALL.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            {/* Spacer: scroll room so video height can shrink to 35% with scroll progress; footer below scrolls up with progress */}
            <div
              className="w-full bg-white"
              style={{ height: `${VIDEO_STICKY_SCROLL_VH}vh` }}
              aria-hidden
            />
            {/* Footer appears just below video; z-20 so it shows above the sticky video (z-10) */}
            <div className="relative z-20 w-full">
              <Footer />
            </div>
          </section>
        )}
      </main>
    </>
  )
}
