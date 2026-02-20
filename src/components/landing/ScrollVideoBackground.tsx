'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'

const DEFAULT_FRAMES_BASE = '/hero-frames/frame-'
const DEFAULT_TOTAL_FRAMES = 80
const STICK_TOP_VH = 0

type StickyMode = 'before' | 'stuck' | 'after'

interface ScrollVideoBackgroundProps {
  /** Base path for frames, e.g. "/hero-frames/frame-" → frame-1.png, frame-2.png */
  framesBasePath?: string
  /** Total number of frames (1-indexed: frame-1 ... frame-totalFrames) */
  totalFrames?: number
  /** Height of the scroll section in vh (more = longer scroll to go through all frames) */
  scrollHeightVh?: number
  /** Optional class for the canvas wrapper */
  className?: string
  /** Object fit for the frame: cover | contain */
  objectFit?: 'cover' | 'contain'
}

function framePath(base: string, index: number): string {
  return `${base}${index + 1}.png`
}

export default function ScrollVideoBackground({
  framesBasePath = DEFAULT_FRAMES_BASE,
  totalFrames = DEFAULT_TOTAL_FRAMES,
  scrollHeightVh = 200,
  className = '',
  objectFit = 'cover',
}: ScrollVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [stickyMode, setStickyMode] = useState<StickyMode>('before')
  const rafRef = useRef<number>(0)
  const lastFrameRef = useRef<number>(-1)

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const updateSticky = () => {
      const rect = container.getBoundingClientRect()
      const stickThresholdPx = (STICK_TOP_VH / 100) * window.innerHeight
      if (rect.top > stickThresholdPx) setStickyMode('before')
      else if (rect.bottom <= 0) setStickyMode('after')
      else setStickyMode('stuck')
    }
    updateSticky()
    window.addEventListener('scroll', updateSticky, { passive: true })
    window.addEventListener('resize', updateSticky)
    return () => {
      window.removeEventListener('scroll', updateSticky)
      window.removeEventListener('resize', updateSticky)
    }
  }, [mounted])

  useEffect(() => {
    const loaders = Array.from({ length: totalFrames }, (_, i) => {
      const img = new Image()
      img.src = framePath(framesBasePath, i)
      return img
    })
    imagesRef.current = loaders
    let done = 0
    const onLoad = () => {
      done += 1
      if (done === totalFrames) setImagesLoaded(true)
    }
    loaders.forEach((img) => {
      img.addEventListener('load', onLoad)
      img.addEventListener('error', onLoad)
    })
    return () => {
      loaders.forEach((img) => {
        img.removeEventListener('load', onLoad)
        img.removeEventListener('error', onLoad)
      })
    }
  }, [framesBasePath, totalFrames])

  useEffect(() => {
    const canvas = canvasRef.current
    const images = imagesRef.current
    if (!canvas || !images.length) return

    const drawFrame = (index: number) => {
      const i = Math.max(0, Math.min(Math.floor(index), totalFrames - 1))
      const img = images[i]
      if (!img?.complete || !img.naturalWidth) return
      if (lastFrameRef.current === i) return
      lastFrameRef.current = i
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const w = canvas.width
      const h = canvas.height
      if (w === 0 || h === 0) return
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.clearRect(0, 0, w, h)
      const imgAspect = img.naturalWidth / img.naturalHeight
      const canvasAspect = w / h
      let drawW: number
      let drawH: number
      let dx: number
      let dy: number
      if (objectFit === 'cover') {
        const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
        drawW = img.naturalWidth * scale
        drawH = img.naturalHeight * scale
        dx = (w - drawW) / 2
        dy = (h - drawH) / 2
      } else {
        if (imgAspect > canvasAspect) {
          drawH = w / imgAspect
          drawW = w
          dy = (h - drawH) / 2
          dx = 0
        } else {
          drawW = h * imgAspect
          drawH = h
          dx = (w - drawW) / 2
          dy = 0
        }
      }
      ctx.drawImage(img, dx, dy, drawW, drawH)
    }

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      rafRef.current = requestAnimationFrame(() => {
        const frameIndex = progress * (totalFrames - 1)
        drawFrame(frameIndex)
        rafRef.current = 0
      })
    })
    return () => {
      unsubscribe()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [scrollYProgress, totalFrames, imagesLoaded, objectFit])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const updateSize = () => {
      const dpr = window.devicePixelRatio ?? 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      const frameIdx = lastFrameRef.current
      const img = imagesRef.current[frameIdx]
      if (frameIdx >= 0 && img?.complete && img.naturalWidth) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const cw = canvas.width
          const ch = canvas.height
          const imgAspect = img.naturalWidth / img.naturalHeight
          const canvasAspect = cw / ch
          let drawW: number
          let drawH: number
          let dx: number
          let dy: number
          if (objectFit === 'cover') {
            const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
            drawW = img.naturalWidth * scale
            drawH = img.naturalHeight * scale
            dx = (cw - drawW) / 2
            dy = (ch - drawH) / 2
          } else {
            if (imgAspect > canvasAspect) {
              drawH = cw / imgAspect
              drawW = cw
              dy = (ch - drawH) / 2
              dx = 0
            } else {
              drawW = ch * imgAspect
              drawH = ch
              dx = (cw - drawW) / 2
              dy = 0
            }
          }
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'
          ctx.clearRect(0, 0, cw, ch)
          ctx.drawImage(img, dx, dy, drawW, drawH)
        }
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [imagesLoaded, objectFit])

  return (
    <section
      ref={containerRef}
      className={`relative z-0 w-full overflow-visible ${className}`}
      style={{ height: `${scrollHeightVh}vh` }}
    >
      {stickyMode === 'stuck' && <div aria-hidden style={{ height: '100vh' }} />}
      <div
        ref={stickyRef}
        className="left-0 top-0 w-full box-border overflow-hidden"
        style={{
          height: '100vh',
          ...(stickyMode === 'before' && { position: 'relative' }),
          ...(stickyMode === 'stuck' && {
            position: 'fixed',
            top: `${STICK_TOP_VH}vh`,
            left: 0,
            right: 0,
            zIndex: 0,
          }),
          ...(stickyMode === 'after' && {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }),
        }}
      >
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ width: '100%', height: '100%', objectFit: objectFit as string }}
          aria-hidden
        />
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5">
            <div className="animate-pulse text-black/50 text-sm">Loading frames...</div>
          </div>
        )}
      </div>
    </section>
  )
}
