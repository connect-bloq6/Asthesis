/**
 * Unified landing animation: one passive scroll listener writes scrollYRef; one RAF loop reads it
 * and drives canvas seeks, displayed frame, text (transforms + opacity from the same display timeline),
 * frame sticky layout state, and final video sticky transition (lerp + mode snap for continuity).
 */
import type React from 'react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  ALPHA_FPS,
  BOUNDARY_BLEND_FRAMES,
  FRAME_DT,
  CATCHUP_ACCEL_TAU,
  CATCHUP_MAX_FPS_DESKTOP,
  CATCHUP_MAX_FPS_MOBILE,
  DEBUG_FRAME,
  DESKTOP_VIDEO_SCALE,
  PART4_ZOOM_OUT_END,
  SMOOTHED_PROGRESS_THROTTLE_DELTA,
  SMOOTHED_PROGRESS_THROTTLE_MS,
  SMOOTHING_TIME_CONSTANT,
  SMOOTHING_TIME_CONSTANT_MOBILE,
  STEP_MIN_INTERVAL_MS_DESKTOP,
  STEP_MIN_INTERVAL_MS_MOBILE,
  STYLE_TEXT_DELAY,
  STYLE_TEXT_EASING,
  SYSTEM_TEXT_PART2_VH,
  SYSTEM_TEXT_SCROLL_VH,
  STYLE_TEXT_PART2_VH,
  CARE_FROM_BOTTOM_VH,
  CARE_SCROLL_UP_VH,
  CARE_VERTICAL_OFFSET_VH,
  DESIGN_FROM_BOTTOM_VH,
  DESIGN_SCROLL_UP_VH,
  DESIGN_VERTICAL_OFFSET_VH,
  INSIDE_FROM_BOTTOM_VH,
  INSIDE_VERTICAL_OFFSET_VH,
  VIDEO_STICK_TOP_OFFSET_PX,
  VIDEO_STICKY_HYSTERESIS_PX,
  VIDEO_STICKY_SCROLL_VH_DESKTOP,
  VIDEO_STICKY_SCROLL_VH_MOBILE,
  VIDEO_TRANSITION_BORDER_RADIUS_PX,
  VIDEO_TRANSITION_HEIGHT_SCALE_END,
  VIDEO_TRANSITION_PROGRESS_AT_50_PCT,
  VIDEO_TRANSITION_SCALE_END,
  VIDEO_TRANSITION_WIDTH_END_PCT,
  FRAME_EPS_SEC,
  MOBILE_VIDEO_PROGRESS_WRITE_THROTTLE,
} from '../constants'
import { drawCover, globalFrameToShotAndLocal } from '../alphaVideo'
import {
  clamp,
  computeLayoutPx,
  globalFrameToPartNorms,
  scrollToRawProgress,
  smoothstep,
} from '../timeline'
import { useStableViewportHeight } from './useStableViewportHeight'

const roundToDprPx = (px: number) => {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  return Math.round(px * dpr) / dpr
}

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

function supportsVp9Webm(): boolean {
  if (typeof document === 'undefined') return true
  const v = document.createElement('video')
  return v.canPlayType('video/webm; codecs="vp9"') !== ''
}

export function useLandingScrollTimeline(
  enabled: boolean,
  isDesktopViewport: boolean,
  heroVideoRef: React.RefObject<HTMLVideoElement | null>,
  careVideoScrollTransition = true
) {
  const stableVhRef = useStableViewportHeight()

  const [heroCrossed, setHeroCrossed] = useState(false)
  const [navbarSolid, setNavbarSolid] = useState(false)
  const [polygonOpacity, setPolygonOpacity] = useState(0)
  const [frameStickyMode, setFrameStickyMode] = useState<'before' | 'stuck' | 'after'>('before')
  const [videoStickyMode, setVideoStickyMode] = useState<'before' | 'stuck' | 'after'>('before')
  const [alphaPlaybackMode, setAlphaPlaybackMode] = useState<'webm' | 'mp4'>('webm')

  const scrollYRef = useRef(0)
  const isMobileRef = useRef(false)
  const isIOSRef = useRef(false)

  const mainRef = useRef<HTMLElement>(null)
  const frameSectionRef = useRef<HTMLElement>(null)
  const careSectionRef = useRef<HTMLElement>(null)
  const careVideoStickyRef = useRef<HTMLDivElement>(null)
  const videoStickSentinelRef = useRef<HTMLDivElement>(null)
  const videoStickyWrapperRef = useRef<HTMLDivElement>(null)
  const videoStickyCardRef = useRef<HTMLDivElement>(null)
  const videoPlaceholderRef = useRef<HTMLDivElement>(null)
  const careVideoBrandingRef = useRef<HTMLDivElement>(null)
  const careVideoSensingRef = useRef<HTMLSpanElement>(null)
  const careVideoRef = useRef<HTMLVideoElement>(null)

  const videoStickStartYRef = useRef(0)
  const videoStickEndYRef = useRef(0)
  const videoAfterTopPxRef = useRef(0)
  const videoStickyModeRef = useRef<'before' | 'stuck' | 'after'>('before')
  const videoTransitionTargetRef = useRef(0)
  const smoothedVideoTransitionRef = useRef(0)
  const videoCardBaseHeightRef = useRef(0)
  const prevVideoModeRef = useRef<'before' | 'stuck' | 'after'>('before')
  const lastWrittenVideoProgressRef = useRef(-1)

  const systemTextRef = useRef<HTMLDivElement>(null)
  const styleTextRef = useRef<HTMLDivElement>(null)
  const designTextRef = useRef<HTMLDivElement>(null)
  const careTextRef = useRef<HTMLDivElement>(null)
  const insideTextRef = useRef<HTMLDivElement>(null)
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
  const drawRafRef = useRef<number | null>(null)
  const vfcHandleRef = useRef<number | null>(null)
  const part4ZoomRef = useRef(1)
  const lastSeekByShotRef = useRef<[number, number, number, number]>([0, 0, 0, 0])

  const framesInShotRef = useRef<[number, number, number, number]>([0, 0, 0, 0])
  const cumFramesRef = useRef<[number, number, number, number, number]>([0, 0, 0, 0, 0])
  const targetGlobalFrameRef = useRef(0)
  const displayGlobalFrameFloatRef = useRef(0)
  const displayGlobalFrameRef = useRef(0)
  const displayShotRef = useRef<1 | 2 | 3 | 4>(1)
  const blendActiveRef = useRef(false)
  const blendAlphaRef = useRef(0)
  const blendFromShotRef = useRef<1 | 2 | 3 | 4>(1)
  const blendToShotRef = useRef<1 | 2 | 3 | 4>(1)

  const smoothedPart3Ref = useRef(0)
  const smoothedPart4Ref = useRef(0)
  const part3TargetRef = useRef(0)
  const part4TargetRef = useRef(0)
  const lastTickTimeRef = useRef(0)

  const lastSmoothedPart3StateRef = useRef(0)
  const lastSmoothedPart4StateRef = useRef(0)
  const lastSmoothedPart3TimeRef = useRef(0)
  const lastSmoothedPart4TimeRef = useRef(0)

  const lastHeroRef = useRef(false)
  const lastNavRef = useRef(false)
  const lastPolyRef = useRef(0)
  const lastFrameStickyRef = useRef<'before' | 'stuck' | 'after'>('before')
  const lastVideoModeForStateRef = useRef<'before' | 'stuck' | 'after'>('before')

  const getVideoForShot = useCallback((shot: 1 | 2 | 3 | 4) => {
    return shot === 1 ? v1Ref.current : shot === 2 ? v2Ref.current : shot === 3 ? v3Ref.current : v4Ref.current
  }, [])

  const seekToFrame = useCallback(
    (shot: 1 | 2 | 3 | 4, localFrame: number, nowMs: number, force = false) => {
      const v = getVideoForShot(shot)
      if (!v || v.readyState < 2 || (v.duration || 0) <= 0 || v.seeking) return
      const dur = v.duration
      const t = clamp(localFrame * FRAME_DT, 0, Math.max(0, dur - FRAME_DT))
      const cur = v.currentTime || 0
      if (Math.abs(cur - t) <= FRAME_EPS_SEC && !force) return
      const minInterval = isMobileRef.current ? STEP_MIN_INTERVAL_MS_MOBILE : STEP_MIN_INTERVAL_MS_DESKTOP
      const last = lastSeekByShotRef.current[shot - 1]
      if (!force && nowMs - last < minInterval) return
      lastSeekByShotRef.current[shot - 1] = nowMs
      v.currentTime = t
    },
    [getVideoForShot]
  )

  const measureVideoStickyBounds = useCallback(() => {
    const sentinel = videoStickSentinelRef.current
    const stickyContainer = careVideoStickyRef.current
    if (!sentinel || !stickyContainer) return
    const scrollY = scrollYRef.current
    const vh = stableVhRef.current
    const scrollVh = isDesktopViewport ? VIDEO_STICKY_SCROLL_VH_DESKTOP : VIDEO_STICKY_SCROLL_VH_MOBILE
    const spacerHeightPx = (scrollVh / 100) * vh
    const sentinelRect = sentinel.getBoundingClientRect()
    const containerRect = stickyContainer.getBoundingClientRect()
    const sentinelDocY = scrollY + sentinelRect.top
    const containerDocY = scrollY + containerRect.top
    videoStickStartYRef.current = sentinelDocY - VIDEO_STICK_TOP_OFFSET_PX
    videoStickEndYRef.current = videoStickStartYRef.current + spacerHeightPx
    videoAfterTopPxRef.current = sentinelDocY - containerDocY + spacerHeightPx
  }, [isDesktopViewport, stableVhRef])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ios = isIOS()
    const vp9Ok = supportsVp9Webm()
    if (ios) setAlphaPlaybackMode('mp4')
    else if (vp9Ok) setAlphaPlaybackMode('webm')
    else setAlphaPlaybackMode('mp4')
  }, [])

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

  useLayoutEffect(() => {
    if (!enabled || !careVideoScrollTransition) return
    const run = () => measureVideoStickyBounds()
    run()
    const raf = requestAnimationFrame(run)
    window.addEventListener('resize', run)
    window.addEventListener('orientationchange', run)
    window.visualViewport?.addEventListener('resize', run)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', run)
      window.removeEventListener('orientationchange', run)
      window.visualViewport?.removeEventListener('resize', run)
    }
  }, [enabled, measureVideoStickyBounds, isDesktopViewport, careVideoScrollTransition])

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
    const ctx = canvas.getContext('2d', { alpha: true }) || canvas.getContext('2d')
    ctxRef.current = ctx
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    canvasRectRef.current = { w: rect.width, h: rect.height }
  }, [])

  useEffect(() => {
    if (!enabled) return
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
  }, [enabled, syncCanvasSize])

  useEffect(() => {
    if (!enabled) return
    const updateCumFrames = () => {
      const f = framesInShotRef.current
      cumFramesRef.current = [0, f[0], f[0] + f[1], f[0] + f[1] + f[2], f[0] + f[1] + f[2] + f[3]]
    }
    const getActiveVideo = () =>
      displayShotRef.current === 1
        ? v1Ref.current
        : displayShotRef.current === 2
          ? v2Ref.current
          : displayShotRef.current === 3
            ? v3Ref.current
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
    }
    const videos = [v1Ref, v2Ref, v3Ref, v4Ref] as const
    const durRefs = [dur1Ref, dur2Ref, dur3Ref, dur4Ref] as const
    const warm = (v: HTMLVideoElement, durRef: { current: number }, shotIndex: number) => {
      const dur = v.duration || 0
      durRef.current = dur
      const frames = Math.round(dur * ALPHA_FPS)
      framesInShotRef.current[shotIndex] = Math.max(1, frames)
      updateCumFrames()
      v.currentTime = 0
      v.play()
        .then(() => v.pause())
        .catch(() => {})
    }
    const cleanups: (() => void)[] = []
    videos.forEach((ref, i) => {
      const v = ref.current
      if (!v) return
      const onMeta = () => warm(v, durRefs[i], i)
      v.addEventListener('loadedmetadata', onMeta)
      if (v.readyState >= 1) onMeta()
      cleanups.push(() => v.removeEventListener('loadedmetadata', onMeta))
      const boundSeeked = () => onSeeked(v)
      v.addEventListener('seeked', boundSeeked)
      cleanups.push(() => v.removeEventListener('seeked', boundSeeked))
    })
    return () => cleanups.forEach((c) => c())
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const getVideoForShotInner = (shot: 1 | 2 | 3 | 4) =>
      shot === 1 ? v1Ref.current : shot === 2 ? v2Ref.current : shot === 3 ? v3Ref.current : v4Ref.current

    const draw = () => {
      const ctx = ctxRef.current
      const rect = canvasRectRef.current
      if (!ctx || rect.w <= 0 || rect.h <= 0) return
      const zoom = part4ZoomRef.current
      const canDraw = (v: HTMLVideoElement | null) =>
        !!v && v.readyState >= 2 && v.videoWidth > 0 && v.videoHeight > 0
      const drawVideo = (v: HTMLVideoElement, alpha: number) => {
        ctx.globalAlpha = alpha
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
      const wantBlend = blendActiveRef.current
      const vFrom = wantBlend ? getVideoForShotInner(blendFromShotRef.current) : null
      const vTo = wantBlend ? getVideoForShotInner(blendToShotRef.current) : getVideoForShotInner(displayShotRef.current)
      if (wantBlend) {
        if (!canDraw(vFrom) || !canDraw(vTo)) return
        ctx.clearRect(0, 0, rect.w, rect.h)
        ctx.globalCompositeOperation = 'source-over'
        drawVideo(vFrom!, 1 - blendAlphaRef.current)
        drawVideo(vTo!, blendAlphaRef.current)
      } else {
        if (!canDraw(vTo)) return
        ctx.clearRect(0, 0, rect.w, rect.h)
        ctx.globalCompositeOperation = 'source-over'
        drawVideo(vTo!, 1)
      }
      ctx.globalAlpha = 1
    }

    const vfcLoop = (v: HTMLVideoElement | null) => {
      if (!v || typeof (v as unknown as { requestVideoFrameCallback: (cb: () => void) => number }).requestVideoFrameCallback !== 'function') {
        vfcHandleRef.current = null
        return
      }
      vfcHandleRef.current = (v as unknown as { requestVideoFrameCallback: (cb: () => void) => number }).requestVideoFrameCallback(() => {
        draw()
        vfcLoop(blendActiveRef.current ? getVideoForShotInner(blendToShotRef.current) : getVideoForShotInner(displayShotRef.current))
      })
    }

    const activeV = blendActiveRef.current ? getVideoForShotInner(blendToShotRef.current) : getVideoForShotInner(displayShotRef.current)
    const hasVFC = !!activeV && typeof (activeV as unknown as { requestVideoFrameCallback: (cb: () => void) => number }).requestVideoFrameCallback === 'function'
    if (hasVFC) {
      vfcLoop(activeV)
    } else {
      const rafLoop = () => {
        draw()
        drawRafRef.current = requestAnimationFrame(rafLoop)
      }
      drawRafRef.current = requestAnimationFrame(rafLoop)
    }

    return () => {
      if (drawRafRef.current !== null) {
        cancelAnimationFrame(drawRafRef.current)
        drawRafRef.current = null
      }
      const h = vfcHandleRef.current
      if (h !== null) {
        const vCancel = blendActiveRef.current ? getVideoForShotInner(blendToShotRef.current) : getVideoForShotInner(displayShotRef.current)
        if (vCancel && typeof (vCancel as unknown as { cancelVideoFrameCallback: (id: number) => void }).cancelVideoFrameCallback === 'function') {
          ;(vCancel as unknown as { cancelVideoFrameCallback: (id: number) => void }).cancelVideoFrameCallback(h)
        }
        vfcHandleRef.current = null
      }
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return
    const onScroll = () => {
      scrollYRef.current = window.scrollY || document.documentElement.scrollTop || 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const now0 = performance.now()
    lastTickTimeRef.current = now0
    let rafId = 0

    const tick = (now: number) => {
      if (typeof window !== 'undefined') {
        scrollYRef.current = window.scrollY || document.documentElement.scrollTop || 0
      }
      const y = scrollYRef.current
      const vh = stableVhRef.current
      const fs = frameSectionRef.current
      const sequenceStartPx =
        fs && typeof fs.getBoundingClientRect === 'function'
          ? Math.round(y + fs.getBoundingClientRect().top)
          : undefined
      const HERO_HEIGHT_THRESHOLD = 0.12
      const threshold = vh * HERO_HEIGHT_THRESHOLD
      const hc = y >= threshold
      const ns = y >= vh
      const po = Math.min(1, y / vh)
      const L0 = computeLayoutPx(vh, sequenceStartPx)
      if (y >= L0.sequenceStart) {
        const hv = heroVideoRef.current
        if (hv && !hv.paused) hv.pause()
      }
      if (hc !== lastHeroRef.current) {
        lastHeroRef.current = hc
        setHeroCrossed(hc)
      }
      if (ns !== lastNavRef.current) {
        lastNavRef.current = ns
        setNavbarSolid(ns)
      }
      if (Math.abs(po - lastPolyRef.current) > 0.004) {
        lastPolyRef.current = po
        setPolygonOpacity(po)
      }

      const raw = scrollToRawProgress(y, vh, sequenceStartPx)
      if (raw.frameStickyMode !== lastFrameStickyRef.current) {
        lastFrameStickyRef.current = raw.frameStickyMode
        setFrameStickyMode(raw.frameStickyMode)
      }

      part3TargetRef.current = raw.part3Progress
      part4TargetRef.current = raw.part4Progress

      let stickStart = 0
      let stickEnd = 0
      let stickRange = 0
      if (careVideoScrollTransition) {
        stickStart = videoStickStartYRef.current
        stickEnd = videoStickEndYRef.current
        stickRange = stickEnd - stickStart
        if (stickRange <= 1) {
          measureVideoStickyBounds()
          stickStart = videoStickStartYRef.current
          stickEnd = videoStickEndYRef.current
          stickRange = stickEnd - stickStart
        }
        const hysV = VIDEO_STICKY_HYSTERESIS_PX
        const card = videoStickyCardRef.current
        let vMode: 'before' | 'stuck' | 'after' = 'before'
        let vProgress = 0
        if (stickRange > 1) {
          if (y < stickStart - hysV) {
            vMode = 'before'
            vProgress = 0
          } else if (y > stickEnd + hysV) {
            vMode = 'after'
            vProgress = 1
          } else {
            vMode = 'stuck'
            vProgress = clamp((y - stickStart) / stickRange, 0, 1)
            if (prevVideoModeRef.current !== 'stuck' && card) {
              const rectH = card.getBoundingClientRect().height
              videoCardBaseHeightRef.current =
                rectH > 60 ? rectH : (card.offsetWidth || 0) * (9 / 16)
            }
          }
          videoTransitionTargetRef.current = vProgress
          const prevM = prevVideoModeRef.current
          if (vMode !== prevM) {
            if (vMode === 'after' || vMode === 'before') {
              smoothedVideoTransitionRef.current = vProgress
            } else if (vMode === 'stuck') {
              if (card) {
                const rectH = card.getBoundingClientRect().height
                videoCardBaseHeightRef.current =
                  rectH > 60 ? rectH : (card.offsetWidth || 0) * (9 / 16)
              }
              smoothedVideoTransitionRef.current = vProgress
            }
            prevVideoModeRef.current = vMode
            videoStickyModeRef.current = vMode
            if (vMode !== lastVideoModeForStateRef.current) {
              lastVideoModeForStateRef.current = vMode
              setVideoStickyMode(vMode)
            }
          } else {
            videoStickyModeRef.current = vMode
          }
        }
      } else {
        videoStickyModeRef.current = 'before'
        videoTransitionTargetRef.current = 0
        smoothedVideoTransitionRef.current = 0
        prevVideoModeRef.current = 'before'
      }

      const dtSec = Math.min(0.1, (now - lastTickTimeRef.current) / 1000)
      lastTickTimeRef.current = now
      const isMobile = isMobileRef.current
      const smoothFactor = 1 - Math.exp(-dtSec / (isMobile ? SMOOTHING_TIME_CONSTANT_MOBILE : SMOOTHING_TIME_CONSTANT))

      if (careVideoScrollTransition && videoStickyModeRef.current === 'stuck') {
        const tgt = videoTransitionTargetRef.current
        const cur = smoothedVideoTransitionRef.current
        smoothedVideoTransitionRef.current = cur + (tgt - cur) * smoothFactor
      }

      const shouldUpdatePart3 = (next: number) =>
        Math.abs(next - lastSmoothedPart3StateRef.current) >= SMOOTHED_PROGRESS_THROTTLE_DELTA ||
        now - lastSmoothedPart3TimeRef.current >= SMOOTHED_PROGRESS_THROTTLE_MS
      const shouldUpdatePart4 = (next: number) =>
        Math.abs(next - lastSmoothedPart4StateRef.current) >= SMOOTHED_PROGRESS_THROTTLE_DELTA ||
        now - lastSmoothedPart4TimeRef.current >= SMOOTHED_PROGRESS_THROTTLE_MS

      const t3 = part3TargetRef.current
      smoothedPart3Ref.current += (t3 - smoothedPart3Ref.current) * smoothFactor
      const t4 = part4TargetRef.current
      smoothedPart4Ref.current += (t4 - smoothedPart4Ref.current) * smoothFactor

      const L = computeLayoutPx(vh, sequenceStartPx)
      const totalPx = L.part1Height + L.part2Height + L.part3HeightPx + L.part4HeightPx
      const masterProgress = totalPx > 0 ? clamp((y - L.sequenceStart) / totalPx, 0, 1) : 0
      const cumFrames = cumFramesRef.current
      const totalFrames = cumFrames[4]
      if (totalFrames > 0) {
        targetGlobalFrameRef.current = Math.round(masterProgress * (totalFrames - 1))
      }

      if (totalFrames > 0) {
        const maxFps = isMobile ? CATCHUP_MAX_FPS_MOBILE : CATCHUP_MAX_FPS_DESKTOP
        const maxFramesThisTick = Math.max(1, Math.floor(maxFps * dtSec))
        const target = targetGlobalFrameRef.current
        const floatVal = displayGlobalFrameFloatRef.current
        const diff = target - floatVal
        const a = 1 - Math.exp(-dtSec / CATCHUP_ACCEL_TAU)
        displayGlobalFrameFloatRef.current = clamp(floatVal + diff * a, 0, totalFrames - 1)
        const desiredInt = Math.round(displayGlobalFrameFloatRef.current)
        let steps = 0
        let current = displayGlobalFrameRef.current
        while (current !== desiredInt && steps < maxFramesThisTick) {
          current += desiredInt > current ? 1 : -1
          current = clamp(current, 0, totalFrames - 1)
          steps++
        }
        displayGlobalFrameRef.current = current
      }

      const displayGlobal = displayGlobalFrameRef.current
      const { shot: displayShot, localFrame: displayLocal } =
        totalFrames > 0 ? globalFrameToShotAndLocal(displayGlobal, cumFrames) : { shot: 1 as const, localFrame: 0 }
      displayShotRef.current = displayShot

      blendActiveRef.current = false
      if (totalFrames > 0) {
        const B = BOUNDARY_BLEND_FRAMES
        for (let i = 1; i <= 3; i++) {
          const boundary = cumFrames[i]
          if (displayGlobal >= boundary - B && displayGlobal < boundary) {
            blendActiveRef.current = true
            blendFromShotRef.current = i as 1 | 2 | 3 | 4
            blendToShotRef.current = (i + 1) as 1 | 2 | 3 | 4
            blendAlphaRef.current = (displayGlobal - (boundary - B)) / B
            break
          }
          if (displayGlobal >= boundary && displayGlobal < boundary + B) {
            blendActiveRef.current = true
            blendFromShotRef.current = (i + 1) as 1 | 2 | 3 | 4
            blendToShotRef.current = i as 1 | 2 | 3 | 4
            blendAlphaRef.current = 1 - (displayGlobal - boundary) / B
            break
          }
        }
      }

      const nowMs = now
      if (blendActiveRef.current) {
        const fromShot = blendFromShotRef.current
        const toShot = blendToShotRef.current
        const boundary = cumFrames[fromShot]
        const fromLast = Math.max(0, cumFrames[fromShot] - cumFrames[fromShot - 1] - 1)
        const fromLocal = displayGlobal < boundary ? displayGlobal - cumFrames[fromShot - 1] : fromLast
        const toLocal = displayGlobal >= boundary ? displayGlobal - cumFrames[toShot - 1] : 0
        seekToFrame(fromShot, Math.round(fromLocal), nowMs, true)
        seekToFrame(toShot, Math.round(toLocal), nowMs, true)
      } else {
        seekToFrame(displayShot, displayLocal, nowMs)
      }
      ;[v1Ref.current, v2Ref.current, v3Ref.current, v4Ref.current].forEach((v) => {
        if (v && !v.paused) v.pause()
      })

      if (DEBUG_FRAME) console.log({ displayGlobal, displayShot, displayLocal })

      const p3s = smoothedPart3Ref.current
      const p4s = smoothedPart4Ref.current
      if (shouldUpdatePart3(p3s)) {
        lastSmoothedPart3StateRef.current = p3s
        lastSmoothedPart3TimeRef.current = now
      }
      if (shouldUpdatePart4(p4s)) {
        lastSmoothedPart4StateRef.current = p4s
        lastSmoothedPart4TimeRef.current = now
      }

      const careVideo = careVideoRef.current
      if (careVideoScrollTransition && careVideo) {
        const vSticky = videoStickyModeRef.current
        const tgtProgress = videoTransitionTargetRef.current
        const stickyCard = videoStickyCardRef.current
        const vhView = typeof window !== 'undefined' ? window.innerHeight : vh
        let cardFullyOffScreen = false
        if (stickyCard) {
          const cr = stickyCard.getBoundingClientRect()
          cardFullyOffScreen = cr.bottom <= 0 || cr.top >= vhView
        }
        const scrollPastStickyRangeEnd = stickRange > 1 && stickEnd > 0 && y >= stickEnd
        let atDocumentScrollBottom = false
        if (typeof document !== 'undefined') {
          const docEl = document.documentElement
          const maxScrollY = Math.max(0, docEl.scrollHeight - docEl.clientHeight)
          atDocumentScrollBottom = maxScrollY > 0 && y >= maxScrollY - 32
        }
        const pastHalfHeight =
          vSticky === 'after' ||
          (vSticky === 'stuck' && tgtProgress >= VIDEO_TRANSITION_PROGRESS_AT_50_PCT)
        if (pastHalfHeight || cardFullyOffScreen || scrollPastStickyRangeEnd || atDocumentScrollBottom) {
          if (!careVideo.paused) careVideo.pause()
        } else if (vSticky === 'stuck' && tgtProgress < VIDEO_TRANSITION_PROGRESS_AT_50_PCT && !cardFullyOffScreen) {
          if (careVideo.paused) careVideo.play().catch(() => {})
        }
      }

      const { seqProgress, p2Norm, p3Norm, p4Norm } = globalFrameToPartNorms(displayGlobal, cumFrames)
      const sysOffsetPx = roundToDprPx(((seqProgress * SYSTEM_TEXT_SCROLL_VH + p2Norm * SYSTEM_TEXT_PART2_VH) / 100) * vh)
      const rawStyle = Math.max(0, (seqProgress - STYLE_TEXT_DELAY) / (1 - STYLE_TEXT_DELAY))
      const styleProgress = Math.pow(rawStyle, STYLE_TEXT_EASING)
      const styleOffsetPx = roundToDprPx((((1 - styleProgress) * 85 - p2Norm * STYLE_TEXT_PART2_VH) / 100) * vh)
      const designVisible = p2Norm > 0
      const designOffsetPx = roundToDprPx(
        ((designVisible ? DESIGN_FROM_BOTTOM_VH - DESIGN_FROM_BOTTOM_VH * p2Norm - DESIGN_SCROLL_UP_VH * p3Norm : DESIGN_FROM_BOTTOM_VH) +
          DESIGN_VERTICAL_OFFSET_VH) /
          100 *
          vh
      )
      const careVisible = p3Norm > 0
      const careOffsetPx = roundToDprPx(
        ((careVisible ? CARE_FROM_BOTTOM_VH - CARE_FROM_BOTTOM_VH * p3Norm - CARE_SCROLL_UP_VH * p4Norm : CARE_FROM_BOTTOM_VH) + CARE_VERTICAL_OFFSET_VH) /
          100 *
          vh
      )
      const insideVisible = p4Norm > 0
      const insideOffsetPx = roundToDprPx(
        (((insideVisible && p4Norm > 0 ? INSIDE_FROM_BOTTOM_VH - INSIDE_FROM_BOTTOM_VH * p4Norm : INSIDE_FROM_BOTTOM_VH) + INSIDE_VERTICAL_OFFSET_VH) / 100) * vh
      )
      part4ZoomRef.current = isMobile ? 1 - (1 - PART4_ZOOM_OUT_END) * p4Norm : 1

      systemTextRef.current?.style.setProperty('--sysY', `${sysOffsetPx}px`)
      styleTextRef.current?.style.setProperty('--styleY', `${styleOffsetPx}px`)
      designTextRef.current?.style.setProperty('--designY', `${designOffsetPx}px`)
      careTextRef.current?.style.setProperty('--careY', `${careOffsetPx}px`)
      insideTextRef.current?.style.setProperty('--insideY', `${insideOffsetPx}px`)

      const styleOp =
        raw.frameStickyMode !== 'before' || seqProgress > 0.001 || p2Norm > 0.001 ? 1 : smoothstep(0, 0.04, seqProgress / Math.max(STYLE_TEXT_DELAY, 0.01))
      const designOp = smoothstep(0, 0.03, p2Norm) * (p3Norm < 0.995 ? 1 : smoothstep(1, 0.92, p3Norm))
      const careOp = smoothstep(0, 0.03, p3Norm) * (p4Norm < 0.995 ? 1 : smoothstep(1, 0.92, p4Norm))
      const insideOp = smoothstep(0, 0.035, p4Norm)

      if (styleTextRef.current) styleTextRef.current.style.opacity = String(styleOp)
      if (designTextRef.current) designTextRef.current.style.opacity = String(designOp)
      if (careTextRef.current) careTextRef.current.style.opacity = String(careOp)
      if (insideTextRef.current) insideTextRef.current.style.opacity = String(insideOp)

      const canvas = canvasRef.current
      if (canvas) {
        const base = isDesktopViewport ? DESKTOP_VIDEO_SCALE : 1
        const scale = isDesktopViewport ? base * (1 - (1 - PART4_ZOOM_OUT_END) * p4s) : base
        canvas.style.transform = `translateZ(0) scale(${scale})`
      }

      if (careVideoScrollTransition) {
        const vp = smoothedVideoTransitionRef.current
        const baseH = videoCardBaseHeightRef.current
        const phEl = videoPlaceholderRef.current
        const cardEl = videoStickyCardRef.current
        const mode = videoStickyModeRef.current

        const shouldWriteVideoStyles =
          !isMobile ||
          mode !== 'stuck' ||
          lastWrittenVideoProgressRef.current < 0 ||
          Math.abs(vp - lastWrittenVideoProgressRef.current) >= MOBILE_VIDEO_PROGRESS_WRITE_THROTTLE

        if (mode === 'before') lastWrittenVideoProgressRef.current = -1

        if (shouldWriteVideoStyles) {
          lastWrittenVideoProgressRef.current = vp
          if (phEl) {
            if (mode === 'before' || baseH <= 0) {
              phEl.style.height = '0px'
            } else if (mode === 'stuck') {
              phEl.style.height = `${baseH * (1 - (1 - VIDEO_TRANSITION_HEIGHT_SCALE_END) * vp)}px`
            } else {
              phEl.style.height = `${baseH * VIDEO_TRANSITION_HEIGHT_SCALE_END}px`
            }
          }

          if (cardEl) {
            if (mode === 'before') {
              cardEl.style.width = ''
              cardEl.style.marginLeft = ''
              cardEl.style.marginRight = ''
              cardEl.style.borderRadius = ''
              cardEl.style.transform = ''
              cardEl.style.transformOrigin = ''
              cardEl.style.height = ''
              cardEl.style.aspectRatio = ''
            } else {
              const wPct = 100 - (100 - VIDEO_TRANSITION_WIDTH_END_PCT) * vp
              cardEl.style.width = `${wPct}%`
              cardEl.style.marginLeft = 'auto'
              cardEl.style.marginRight = 'auto'
              cardEl.style.borderRadius = `${VIDEO_TRANSITION_BORDER_RADIUS_PX * vp}px`
              cardEl.style.transform = `scale(${1 - (1 - VIDEO_TRANSITION_SCALE_END) * vp}, 1)`
              cardEl.style.transformOrigin = 'center top'
              if (baseH > 0) {
                cardEl.style.height = `${baseH * (mode === 'stuck' ? 1 - (1 - VIDEO_TRANSITION_HEIGHT_SCALE_END) * vp : VIDEO_TRANSITION_HEIGHT_SCALE_END)}px`
                cardEl.style.aspectRatio = ''
              }
            }
          }

          const brand = careVideoBrandingRef.current
          if (brand) {
            brand.style.top = `${8 + 7 * vp}%`
            brand.style.transform = `translate(-50%, -50%) scale(${1 + 0.85 * vp})`
          }
        }

        const sensingEl = careVideoSensingRef.current
        if (sensingEl) {
          if (mode === 'before') {
            sensingEl.style.removeProperty('transform')
            sensingEl.style.removeProperty('opacity')
          } else if (baseH > 0) {
            const endScale = VIDEO_TRANSITION_HEIGHT_SCALE_END
            const currentHeight =
              mode === 'after' ? baseH * endScale : baseH * (1 - (1 - endScale) * vp)
            const heightDelta = baseH - currentHeight
            sensingEl.style.transform = `translateY(${-heightDelta}px)`
            const progress = mode === 'after' ? 1 : vp
            sensingEl.style.opacity = String(Math.max(1 - progress * 0.2, 0.7))
          } else {
            sensingEl.style.removeProperty('transform')
            sensingEl.style.removeProperty('opacity')
          }
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [
    enabled,
    heroVideoRef,
    isDesktopViewport,
    measureVideoStickyBounds,
    seekToFrame,
    stableVhRef,
    careVideoScrollTransition,
  ])

  const refs = useMemo(
    () => ({
      mainRef,
      frameSectionRef,
      careSectionRef,
      careVideoStickyRef,
      videoStickSentinelRef,
      videoStickyWrapperRef,
      videoStickyCardRef,
      videoPlaceholderRef,
      careVideoBrandingRef,
      careVideoSensingRef,
      careVideoRef,
      systemTextRef,
      styleTextRef,
      designTextRef,
      careTextRef,
      insideTextRef,
      canvasRef,
      v1Ref,
      v2Ref,
      v3Ref,
      v4Ref,
    }),
    []
  )

  return {
    heroCrossed,
    navbarSolid,
    polygonOpacity,
    frameStickyMode,
    videoStickyMode,
    alphaPlaybackMode,
    refs,
    videoAfterTopPxRef,
    measureVideoStickyBounds,
  }
}
