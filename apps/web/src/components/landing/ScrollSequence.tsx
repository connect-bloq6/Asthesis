'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SEQUENCE_FRAME_START = 86400 // sequence: davinci00086400 .. davinci00086520 (121 frames)
const SEQUENCE01_BASE = '/sequence01/frame-'
const SEQUENCE02_FRAME_START = 86400 // sequence02: davinci00086400 .. davinci00086520 (121 frames)
const SEQUENCE03_FRAME_START = 86400 // sequence03: davinci00086400 .. davinci00086520 (121 frames)
const TOTAL_FRAMES = 121
const TOTAL_FRAMES_01 = 100
const TOTAL_FRAMES_02 = 121
const TOTAL_FRAMES_03 = 121
const STICK_TOP_VH = 0
const STICK_CONTENT_HEIGHT_VH = 100 // full viewport for frame

function framePath(i: number): string {
  return `/sequence/davinci${String(SEQUENCE_FRAME_START + i).padStart(8, '0')}.png`
}
function framePath01(i: number): string {
  return `${SEQUENCE01_BASE}${i + 1}.png`
}
function framePath02(i: number): string {
  return `/sequence02/davinci${String(SEQUENCE02_FRAME_START + i).padStart(8, '0')}.png`
}
function framePath03(i: number): string {
  return `/sequence03/davinci${String(SEQUENCE03_FRAME_START + i).padStart(8, '0')}.png`
}

type StickyMode = 'before' | 'stuck' | 'after'

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasWrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const images01Ref = useRef<HTMLImageElement[]>([])
  const images02Ref = useRef<HTMLImageElement[]>([])
  const images03Ref = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [stickyMode, setStickyMode] = useState<StickyMode>('before')
  const rafRef = useRef<number>(0)
  const lastFrameRef = useRef<number>(-1)
  const lastSequenceRef = useRef<number>(0)

  // Scroll: 0 when section bottom hits viewport top (entering), 1 when section top hits viewport bottom (leaving)
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ['start end', 'end start'],
  })

  // Three sequences: 0–33% seq0, 33–66% seq01, 66–100% seq02
  const frameProgress = useTransform(scrollYProgress, [0, 1 / 3], [0, TOTAL_FRAMES - 1])
  const frameProgress01 = useTransform(scrollYProgress, [1 / 3, 2 / 3], [0, TOTAL_FRAMES_01 - 1])
  const frameProgress02 = useTransform(scrollYProgress, [2 / 3, 1], [0, TOTAL_FRAMES_02 - 1])
  // Copy 1: scrolls up into view [0, 0.2], stays until start of sequence 2 (33%), then exits [33%, 50%]
  const textScrollY = useTransform(scrollYProgress, [0, 0.2], [140, 0])
  const copy1ExitY = useTransform(scrollYProgress, [1 / 3, 0.5], [0, -320])
  // Copy 2: enters from below [33%, 50%] (in place by 50%); exits at end of sequence 2 [66%, 80%]
  const copy2EnterY = useTransform(scrollYProgress, [1 / 3, 0.5], [280, 0])
  const copy2ExitY = useTransform(scrollYProgress, [2 / 3, 0.8], [0, -320])
  // Copy 3 (DESIGN): synced with sequence02 — in place by 50% of seq02, scrolls up after 70% of seq02
  // Sequence02 runs [2/3, 0.88]. 50% of seq02 = 2/3 + 0.5*(0.88 - 2/3) ≈ 0.773; 70% ≈ 0.816
  const copy3EnterY = useTransform(scrollYProgress, [2 / 3, 0.773], [320, 0])
  const copy3ExitY = useTransform(scrollYProgress, [0.816, 0.88], [0, -320])
  // Copy 4 (sequence03): enters as copy 3 exits [0.816, 0.88], same right-center position
  const copy4EnterY = useTransform(scrollYProgress, [0.816, 0.88], [320, 0])
  const copy4Opacity = useTransform(scrollYProgress, [0, 0.816, 0.88], [0, 0, 1])
  // Copy 1: visible until 33%, fade out by 50%
  const copy1Opacity = useTransform(scrollYProgress, [0, 1 / 3, 0.5], [1, 1, 0])
  // Copy 2: fade in [33%, 50%], visible until 66%, fade out [66%, 80%]
  const copy2Opacity = useTransform(scrollYProgress, [0, 1 / 3, 0.5, 2 / 3, 0.8], [0, 0, 1, 1, 0])
  // Copy 3: fade in by 50% of seq02 [2/3, 0.773], fade out after 70% of seq02 [0.816, 0.88]
  const copy3Opacity = useTransform(scrollYProgress, [0, 2 / 3, 0.773, 0.816, 0.88], [0, 0, 1, 1, 0])
  // First block y: initial bring-in + exit upward at start of sequence 2
  const copy1Y = useTransform(
    [textScrollY, copy1ExitY],
    ([a, b]) => (typeof a === 'number' && typeof b === 'number' ? a + b : 0)
  )
  // Second block y: enter from below by 50% + exit upward at end of sequence 2
  const copy2Y = useTransform(
    [copy2EnterY, copy2ExitY],
    ([a, b]) => (typeof a === 'number' && typeof b === 'number' ? a + b : 0)
  )
  // Third block y: enter by 50% of seq02 + exit upward after 70% of seq02
  const copy3Y = useTransform(
    [copy3EnterY, copy3ExitY],
    ([a, b]) => (typeof a === 'number' && typeof b === 'number' ? a + b : 0)
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll-driven sticky: fix the block at 2.5vh when it reaches that point (works even if CSS sticky is broken by parent overflow)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateSticky = () => {
      const rect = container.getBoundingClientRect()
      const stickThresholdPx = (STICK_TOP_VH / 100) * window.innerHeight
      if (rect.top > stickThresholdPx) {
        setStickyMode('before')
      } else if (rect.bottom <= 0) {
        setStickyMode('after')
      } else {
        setStickyMode('stuck')
      }
    }

    updateSticky()
    window.addEventListener('scroll', updateSticky, { passive: true })
    window.addEventListener('resize', updateSticky)
    return () => {
      window.removeEventListener('scroll', updateSticky)
      window.removeEventListener('resize', updateSticky)
    }
  }, [mounted])

  // Preload sequence, sequence01, sequence02, and sequence03; set imagesLoaded when all are done
  useEffect(() => {
    const loaders = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image()
      img.src = framePath(i)
      return img
    })
    const loaders01 = Array.from({ length: TOTAL_FRAMES_01 }, (_, i) => {
      const img = new Image()
      img.src = framePath01(i)
      return img
    })
    const loaders02 = Array.from({ length: TOTAL_FRAMES_02 }, (_, i) => {
      const img = new Image()
      img.src = framePath02(i)
      return img
    })
    const loaders03 = Array.from({ length: TOTAL_FRAMES_03 }, (_, i) => {
      const img = new Image()
      img.src = framePath03(i)
      return img
    })
    imagesRef.current = loaders
    images01Ref.current = loaders01
    images02Ref.current = loaders02
    images03Ref.current = loaders03
    let done = 0
    const total = TOTAL_FRAMES + TOTAL_FRAMES_01 + TOTAL_FRAMES_02 + TOTAL_FRAMES_03
    const onLoad = () => {
      done += 1
      if (done === total) setImagesLoaded(true)
    }
    ;[...loaders, ...loaders01, ...loaders02, ...loaders03].forEach((img) => {
      img.addEventListener('load', onLoad)
      img.addEventListener('error', onLoad)
    })
    return () => {
      ;[...loaders, ...loaders01, ...loaders02, ...loaders03].forEach((img) => {
        img.removeEventListener('load', onLoad)
        img.removeEventListener('error', onLoad)
      })
    }
  }, [])

  // Subscribe to scroll progress: four segments = sequence, sequence01, sequence02, sequence03; draw current frame
  useEffect(() => {
    const canvas = canvasRef.current
    const images = imagesRef.current
    const images01 = images01Ref.current
    const images02 = images02Ref.current
    const images03 = images03Ref.current
    if (!canvas || !images.length || !images01.length || !images02?.length || !images03?.length) return

    const drawFrame = (seq: 0 | 1 | 2 | 3, index: number) => {
      const arr = seq === 0 ? images : seq === 1 ? images01 : seq === 2 ? images02 : images03
      const maxIdx =
        seq === 0
          ? TOTAL_FRAMES - 1
          : seq === 1
            ? TOTAL_FRAMES_01 - 1
            : seq === 2
              ? TOTAL_FRAMES_02 - 1
              : TOTAL_FRAMES_03 - 1
      const i = Math.max(0, Math.min(Math.floor(index), maxIdx))
      const img = arr[i]
      if (!img || !img.complete || !img.naturalWidth) return
      if (lastSequenceRef.current === seq && lastFrameRef.current === i) return
      lastSequenceRef.current = seq
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
      let drawW = w
      let drawH = h
      let dx = 0
      let dy = 0
      if (imgAspect > canvasAspect) {
        drawH = w / imgAspect
        dy = (h - drawH) / 2
      } else {
        drawW = h * imgAspect
        dx = (w - drawW) / 2
      }
      if (drawW > img.naturalWidth || drawH > img.naturalHeight) {
        const scale = Math.min(img.naturalWidth / drawW, img.naturalHeight / drawH)
        drawW *= scale
        drawH *= scale
        dx = (w - drawW) / 2
        dy = (h - drawH) / 2
      }
      ctx.drawImage(img, dx, dy, drawW, drawH)
    }

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      rafRef.current = requestAnimationFrame(() => {
        if (progress < 1 / 3) {
          const frameIndex = (progress / (1 / 3)) * (TOTAL_FRAMES - 1)
          drawFrame(0, frameIndex)
        } else if (progress < 2 / 3) {
          const frameIndex = ((progress - 1 / 3) / (1 / 3)) * (TOTAL_FRAMES_01 - 1)
          drawFrame(1, frameIndex)
        } else if (progress < 0.88) {
          // Sequence02: [2/3, 0.88] → [0, 99] (full range, completes by 88%)
          const segStart = 2 / 3
          const segEnd = 0.88
          const t = Math.min(1, (progress - segStart) / (segEnd - segStart))
          const frameIndex = t * (TOTAL_FRAMES_02 - 1)
          drawFrame(2, frameIndex)
        } else {
          // Sequence03: [0.88, 0.97] → [0, 99] (extended range so last frame reachable by 97%)
          const segStart = 0.88
          const segEnd = 0.97
          const t = Math.min(1, (progress - segStart) / (segEnd - segStart))
          const frameIndex = t * (TOTAL_FRAMES_03 - 1)
          drawFrame(3, frameIndex)
        }
        rafRef.current = 0
      })
    })

    return () => {
      unsubscribe()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [scrollYProgress, imagesLoaded])

  // Set canvas size to the frame wrapper (65vh) so image isn't zoomed
  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = canvasWrapperRef.current
    if (!canvas || !wrapper) return

    const updateSize = () => {
      const rect = wrapper.getBoundingClientRect()
      const dpr = window.devicePixelRatio ?? 1
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      // Redraw current frame at new size (from whichever sequence we're on)
      const seq = lastSequenceRef.current
      const frameIdx = lastFrameRef.current
      const arr =
        seq === 0
          ? imagesRef.current
          : seq === 1
            ? images01Ref.current
            : seq === 2
              ? images02Ref.current
              : images03Ref.current
      const img = arr[frameIdx]
      if (frameIdx >= 0 && img?.complete && img.naturalWidth) {
        const w = canvas.width
        const h = canvas.height
        const imgAspect = img.naturalWidth / img.naturalHeight
        const canvasAspect = w / h
        let drawW = w, drawH = h, dx = 0, dy = 0
        if (imgAspect > canvasAspect) {
          drawH = w / imgAspect
          dy = (h - drawH) / 2
        } else {
          drawW = h * imgAspect
          dx = (w - drawW) / 2
        }
        if (drawW > img.naturalWidth || drawH > img.naturalHeight) {
          const scale = Math.min(img.naturalWidth / drawW, img.naturalHeight / drawH)
          drawW *= scale
          drawH *= scale
          dx = (w - drawW) / 2
          dy = (h - drawH) / 2
        }
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'
          ctx.clearRect(0, 0, w, h)
          ctx.drawImage(img, dx, dy, drawW, drawH)
        }
      }
    }

    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(wrapper)
    return () => ro.disconnect()
  }, [imagesLoaded])

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full bg-white overflow-visible"
      style={{ height: '3200vh' }}
    >
      {/* Spacer preserves layout when content is position:fixed so section doesn't collapse */}
      {stickyMode === 'stuck' && (
        <div
          aria-hidden
          style={{ height: `${STICK_CONTENT_HEIGHT_VH}vh` }}
        />
      )}
      <div
        ref={stickyRef}
        className="left-0 flex justify-center bg-white w-full box-border overflow-visible"
        style={{
          height: '100vh',
          paddingTop: 0,
          alignItems: 'flex-start',
          ...(stickyMode === 'before' && { position: 'relative' }),
          ...(stickyMode === 'stuck' && {
            position: 'fixed',
            top: `${STICK_TOP_VH}vh`,
            left: 0,
            right: 0,
            width: '100%',
            zIndex: 20,
          }),
          ...(stickyMode === 'after' && {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
          }),
        }}
      >
        {/* Left-side copy 1 (SYSTEM): scrolls up into view, then fades out and exits upward after 70% */}
        <motion.div
          className="absolute left-0 z-30 pl-32 md:pl-56 lg:pl-72 pt-28 max-w-[720px] pointer-events-none"
          style={{
            y: copy1Y,
            opacity: copy1Opacity,
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          }}
        >
          <p
            className="uppercase font-extrabold tracking-[0px]"
            style={{
              fontSize: 24,
              lineHeight: '20px',
              color: '#999999',
            }}
          >
            SYSTEM
          </p>
          <h2
            className="uppercase font-extrabold tracking-[0px] mt-2"
            style={{
              fontSize: 32,
              lineHeight: '25px',
              color: '#000000',
            }}
          >
            A COMPLETE CARE INTELLIGENCE SYSTEM
          </h2>
          <p
            className="font-normal mt-4 tracking-[0px]"
            style={{
              fontSize: 16,
              lineHeight: '18px',
              color: '#6F6F6F',
            }}
          >
            Asthesis transforms the home into an intelligent, protective environment.<br></br><br></br>

It learns.<br></br>
It adapts.<br></br>
It responds.<br></br>
          </p>
          <ul
            className="font-normal mt-4 list-disc pl-5 space-y-1 tracking-[0px]"
            style={{
              fontSize: 16,
              lineHeight: '18px',
              color: '#6F6F6F',
            }}
          >
            
          <li> Learns natural movement to predict risk </li>
          <li> Detects pre-fall indicators before accidents happen </li>
          <li> Recognizes abnormal infant motion & distress </li>
          <li> Monitors air quality and humidity in real time </li>
          <li> Logs daily check-ins for continuous reassurance </li>
          <li> Sends emergency alerts with a single press </li>

          </ul>
          <p
            className="font-normal mt-4 tracking-[0px]"
            style={{
              fontSize: 16,
              lineHeight: '18px',
              color: '#6F6F6F',
            }}
          >
            All powered by on-device intelligence.<br></br>
All designed around consent.<br></br><br></br>

Asthesis doesn’t wait for emergencies.<br></br>
It prevents them.
          </p>
        </motion.div>

        {/* Left-side copy 2 (STYLE): hidden initially; fades in after 70%, then scrolls up and fades out at 85–95% */}
        <motion.div
          className="absolute left-0 z-30 pl-32 md:pl-56 lg:pl-72 pt-28 max-w-[720px] pointer-events-none"
          style={{
            y: copy2Y,
            opacity: copy2Opacity,
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          }}
        >
          <p
            className="uppercase font-extrabold tracking-[0px]"
            style={{
              fontSize: 24,
              lineHeight: '20px',
              color: '#999999',
            }}
          >
            STYLE
          </p>
          <h2
            className="uppercase font-extrabold tracking-[0px] mt-2"
            style={{
              fontSize: 32,
              lineHeight: '25px',
              color: '#000000',
            }}
          >
            Awareness Without Surveillance
          </h2>
          <p
            className="font-normal mt-4 tracking-[0px]"
            style={{
              fontSize: 16,
              lineHeight: '18px',
              color: '#6F6F6F',
            }}
          >
            Asthesis learns rhythms, not identities.<br></br><br></br>

By understanding motion, presence, and environmental balance, it recognizes when something changes — without turning your home into a monitored space.<br></br><br></br>

No facial recognition.<br></br>
No intrusive tracking.<br></br>
No unnecessary recording.<br></br><br></br>

Just intelligent awareness.<br></br><br></br>

Designed for dignity.<br></br>
Built for trust.
          </p>
        </motion.div>

        {/* Copy 3 (DESIGN): wrapper is right-center; block enters from bottom-right (x,y +) and scrolls up into place [66%, 80%] */}
        <div className="absolute right-0 z-30 pr-32 md:pr-56 lg:pr-72 top-1/2 w-full max-w-[720px] pointer-events-none -translate-y-1/2 flex justify-end">
          <motion.div
            className="text-right max-w-[720px]"
            style={{
              y: copy3Y,
              opacity: copy3Opacity,
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            }}
          >
          <p
            className="uppercase font-extrabold tracking-[0px]"
            style={{
              fontSize: 24,
              lineHeight: '20px',
              color: '#999999',
            }}
          >
            DESIGN
          </p>
          <h2
            className="uppercase font-extrabold tracking-[0px] mt-2"
            style={{
              fontSize: 32,
              lineHeight: '25px',
              color: '#000000',
            }}
          >
            A Device That Belongs
          </h2>
          <p
            className="font-normal mt-4 tracking-[0px]"
            style={{
              fontSize: 16,
              lineHeight: '18px',
              color: '#6F6F6F',
            }}
          >
            Asthesis was created for living spaces.<br></br><br></br>

Not medical corridors.<br></br>
Not surveillance systems.<br></br><br></br>

Its silhouette is clean.<br></br>
Its materials are warm.<br></br>
Its interface is simple.<br></br><br></br>

Turn to adjust.<br></br>
Press to connect.<br></br><br></br>

Everything else happens quietly in the background.<br></br><br></br>

Designed to be seen.<br></br>
Engineered to be trusted.
          </p>
          </motion.div>

          {/* Copy 4 (sequence03): enters from below as copy 3 exits [0.816, 0.88], right-center */}
          <motion.div
            className="absolute right-0 top-1/2 pr-32 md:pr-56 lg:pr-72 text-right max-w-[720px] -translate-y-1/2"
            style={{
              y: copy4EnterY,
              opacity: copy4Opacity,
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            }}
          >
            <h2
              className="uppercase font-extrabold tracking-[0px]"
              style={{
                fontSize: 32,
                lineHeight: '25px',
                color: '#000000',
              }}
            >
              Every Layer Matters
            </h2>
            <p
              className="font-normal mt-4 tracking-[0px]"
              style={{
                fontSize: 16,
                lineHeight: '18px',
                color: '#6F6F6F',
              }}
            >
              Precision-machined housing.<br></br>
              Dedicated AI processor.<br></br>
              Embedded sensing modules.<br></br>
              Secure communication core.<br></br>
              Resilient battery system.<br></br><br></br>

              Everything engineered to disappear into the background — while working relentlessly in the foreground.<br></br><br></br>

              Built to endure.<br></br>
              Built to protect.
            </p>
          </motion.div>
        </div>

        <div
          ref={canvasWrapperRef}
          className="relative z-10 w-full h-full min-h-[100vh] flex items-center justify-center overflow-visible border-2 border-black"
        >
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-contain"
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
          />
          {/* Static centered overlapping diamonds with plus signs at vertices – same size/style as landing corner pluses */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            aria-hidden
          >
            <svg
              viewBox="0 0 100 100"
              className="absolute w-[1150px] h-[1150px] md:w-[1365px] md:h-[1365px] translate-y-[6%]"
              fill="none"
            >
              {/* Left diamond – thickness reduced 50% */}
              <polygon
                points="25,50 40,35 55,50 40,65"
                stroke="#c0c0c0"
                strokeWidth="0.15"
              />
              {/* Right diamond */}
              <polygon
                points="45,50 60,35 75,50 60,65"
                stroke="#c0c0c0"
                strokeWidth="0.15"
              />
              {/* 8 plus signs – thickness reduced 50% */}
              {[
                [25, 50],
                [40, 35],
                [55, 50],
                [40, 65],
                [45, 50],
                [60, 35],
                [75, 50],
                [60, 65],
              ].map(([x, y], i) => (
                <g key={i} transform={`translate(${x},${y}) scale(0.2)`}>
                  <path
                    d="M-3 0h6M0 -3v6"
                    stroke="#1D1D1F"
                    strokeWidth="0.65"
                    strokeLinecap="round"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="animate-pulse text-black/50">Loading sequence...</div>
          </div>
        )}
      </div>
    </section>
  )
}
