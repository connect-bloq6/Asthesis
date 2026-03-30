'use client'

import type React from 'react'
import type { CSSProperties, RefObject } from 'react'

function legacySectionRef(r: RefObject<HTMLElement | null>): React.LegacyRef<HTMLElement> {
  return r as React.LegacyRef<HTMLElement>
}
function legacyDivRef(r: RefObject<HTMLDivElement | null>): React.LegacyRef<HTMLDivElement> {
  return r as React.LegacyRef<HTMLDivElement>
}
function legacyCanvasRef(r: RefObject<HTMLCanvasElement | null>): React.LegacyRef<HTMLCanvasElement> {
  return r as React.LegacyRef<HTMLCanvasElement>
}
function legacyVideoRef(r: RefObject<HTMLVideoElement | null>): React.LegacyRef<HTMLVideoElement> {
  return r as React.LegacyRef<HTMLVideoElement>
}
import {
  FRAME_SCROLL_OUT_VH,
  PART2_SCROLL_VH,
  PART3_SCROLL_VH,
  PART4_SCROLL_VH,
  SEQUENCE_SCROLL_VH,
} from '../constants'

const frameImgStyle: CSSProperties = {
  border: 'none',
  outline: 'none',
  width: '100%',
  height: '100%',
  margin: 0,
  display: 'block',
  transformOrigin: 'center center',
}

export type FrameSequenceRefs = {
  frameSectionRef: RefObject<HTMLElement | null>
  canvasRef: RefObject<HTMLCanvasElement | null>
  v1Ref: RefObject<HTMLVideoElement | null>
  v2Ref: RefObject<HTMLVideoElement | null>
  v3Ref: RefObject<HTMLVideoElement | null>
  v4Ref: RefObject<HTMLVideoElement | null>
  systemTextRef: RefObject<HTMLDivElement | null>
  styleTextRef: RefObject<HTMLDivElement | null>
  designTextRef: RefObject<HTMLDivElement | null>
  careTextRef: RefObject<HTMLDivElement | null>
  insideTextRef: RefObject<HTMLDivElement | null>
}

type Props = {
  refs: FrameSequenceRefs
  alphaPlaybackMode: 'webm' | 'mp4'
  isDesktopViewport: boolean
  frameStickyMode: 'before' | 'stuck' | 'after'
  frameScrollOutProgress: number
  polygonOpacity: number
}

export function FrameSequenceSection({
  refs,
  alphaPlaybackMode,
  isDesktopViewport,
  frameStickyMode,
  frameScrollOutProgress,
  polygonOpacity,
}: Props) {
  const {
    frameSectionRef,
    canvasRef,
    v1Ref,
    v2Ref,
    v3Ref,
    v4Ref,
    systemTextRef,
    styleTextRef,
    designTextRef,
    careTextRef,
    insideTextRef,
  } = refs

  const isSafari =
    typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  const sectionVh =
    100 + SEQUENCE_SCROLL_VH + PART2_SCROLL_VH + PART3_SCROLL_VH + PART4_SCROLL_VH + FRAME_SCROLL_OUT_VH

  return (
    <section
      ref={legacySectionRef(frameSectionRef)}
      className="relative w-full bg-white border-0 border-none"
      style={{ height: `${sectionVh}vh`, border: 'none' }}
    >
      {frameStickyMode === 'stuck' && <div aria-hidden style={{ height: '100vh' }} />}
      <div
        className="w-full flex items-center justify-center border-0 border-none bg-white overflow-hidden lg:overflow-visible"
        style={{
          height: '100vh',
          minHeight: '100vh',
          border: 'none',
          ...(frameStickyMode === 'before' && { position: 'relative' }),
          ...(frameStickyMode === 'stuck' && {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            transform:
              frameScrollOutProgress > 0 ? `translateY(-${frameScrollOutProgress * FRAME_SCROLL_OUT_VH}vh)` : undefined,
          }),
          ...(frameStickyMode === 'after' && {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }),
        }}
      >
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
            {[[25, 50], [40, 35], [55, 50], [40, 65], [45, 50], [60, 35], [75, 50], [60, 65]].map(([x, y], i) => (
              <g key={i} transform={`translate(${x},${y}) scale(0.2)`}>
                <path d="M-3 0h6M0 -3v6" stroke="#9A9A9A" strokeWidth="0.65" strokeLinecap="round" />
              </g>
            ))}
          </svg>
        </div>
        <div className="relative z-10 w-full max-w-[100vw] overflow-hidden border-0 border-none pointer-events-none aspect-square sm:aspect-square md:aspect-video lg:aspect-auto lg:w-full lg:h-full lg:max-w-none lg:min-w-full">
          {(() => {
            const isMobile = !isDesktopViewport

            // Safari → MP4, others → follow alphaPlaybackMode
            const useMp4 = alphaPlaybackMode === 'mp4' || isSafari

            const ext = useMp4 ? 'mp4' : 'webm'

            // Resolution selection
            const res = isMobile ? '540p' : '720p'

            // IMPORTANT: Asset family logic (decoupled from format)
            let suffix = ''

            if (useMp4) {
              if (isMobile) {
                // Mobile Safari / iOS MP4
                suffix = `_alpha_ios_${res}`
              } else {
                // Desktop Safari → 720p MP4 assets
                suffix = `_alpha_${res}`
              }
            } else {
              // WebM browsers
              suffix = `_alpha_${res}`
            }

            const preload = useMp4 ? 'auto' : 'metadata'

            if (process.env.NODE_ENV === 'development') {
              console.log('Frame source debug:', {
                isSafari,
                isMobile,
                isDesktopViewport,
                useMp4,
                ext,
                res,
                suffix,
                example: `/videos/alpha/shot1${suffix}.${ext}`,
              })
            }

            return (
              <>
                <video
                  ref={legacyVideoRef(v1Ref)}
                  src={`/videos/alpha/shot1${suffix}.${ext}`}
                  onError={() => console.error('Failed:', `/videos/alpha/shot1${suffix}.${ext}`)}
                  muted
                  playsInline
                  disablePictureInPicture
                  preload={preload}
                  style={{ display: 'none' }}
                />
                <video
                  ref={legacyVideoRef(v2Ref)}
                  src={`/videos/alpha/shot2${suffix}.${ext}`}
                  onError={() => console.error('Failed:', `/videos/alpha/shot2${suffix}.${ext}`)}
                  muted
                  playsInline
                  disablePictureInPicture
                  preload={preload}
                  style={{ display: 'none' }}
                />
                <video
                  ref={legacyVideoRef(v3Ref)}
                  src={`/videos/alpha/shot3${suffix}.${ext}`}
                  onError={() => console.error('Failed:', `/videos/alpha/shot3${suffix}.${ext}`)}
                  muted
                  playsInline
                  disablePictureInPicture
                  preload={preload}
                  style={{ display: 'none' }}
                />
                <video
                  ref={legacyVideoRef(v4Ref)}
                  src={`/videos/alpha/shot4${suffix}.${ext}`}
                  onError={() => console.error('Failed:', `/videos/alpha/shot4${suffix}.${ext}`)}
                  muted
                  playsInline
                  disablePictureInPicture
                  preload={preload}
                  style={{ display: 'none' }}
                />
              </>
            )
          })()}
          <canvas
            ref={legacyCanvasRef(canvasRef)}
            className="block w-full h-full border-0 border-none outline-none"
            style={{
              ...frameImgStyle,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              contain: 'layout paint',
              background: 'transparent',
            }}
          />
        </div>

        <div
          ref={legacyDivRef(systemTextRef)}
          className="absolute z-20 w-full max-w-full left-4 right-4 lg:left-0 lg:right-auto lg:max-w-4xl pl-0 pr-8 md:pl-0 md:pr-8 lg:px-12 pointer-events-none transition-none"
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
              className="mb-4 w-full max-w-[13.2rem] sm:max-w-[19.2rem] md:max-w-xl lg:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                lineHeight: 'clamp(18px, 3.5vw, 22px)',
                letterSpacing: '0px',
                color: '#6F6F6F',
              }}
            >
              Asthesis is AI-enabled technology enabled care (TEC): an AI-powered home monitoring device that helps health and care systems move from reactive response to proactive, person-centred support. It continuously learns daily patterns of routine, mobility and wellbeing, so changes can be identified early to enable safer independent living, preventative and anticipatory care for people at risk of deterioration, and timely intervention.
            </p>
            <p
              className="mb-4 w-full max-w-[13.2rem] sm:max-w-[19.2rem] md:max-w-xl lg:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                lineHeight: 'clamp(18px, 3.5vw, 22px)',
                letterSpacing: '0px',
                color: '#6F6F6F',
              }}
            >
              Designed as non-intrusive ambient monitoring in the home, Asthesis delivers privacy-preserving remote monitoring without cameras or wearables—supporting independent living and home-first care models, with insight that strengthens preventative care pathways for people at risk of deterioration.
            </p>
            <ul className="space-y-2 list-none pl-0 flex flex-col items-center lg:items-start w-full max-w-[13.2rem] sm:max-w-[19.2rem] md:max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
              {[
                'Earlier identification of changes in mobility, routine and activity',
                'More confident support for independent living',
                'Better targeted intervention through technology enabled care',
                'Reassurance for individuals, carers, providers, local authorities and NHS commissioners—without intrusive surveillance',
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

        <div
          ref={legacyDivRef(styleTextRef)}
          className="absolute z-20 w-full max-w-full left-4 right-4 lg:left-auto lg:right-8 lg:max-w-3xl pl-0 pr-8 md:pl-0 md:pr-8 lg:px-8 pointer-events-none transition-none"
          style={{
            top: '50%',
            bottom: 'auto',
            transform: 'translate3d(0, calc(-50% + var(--styleY, 0px)), 0)',
            willChange: 'transform, opacity',
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
              className="mb-6 w-full max-w-[13.2rem] sm:max-w-[19.2rem] md:max-w-lg lg:max-w-2xl mx-auto lg:mx-0 lg:ml-auto text-center lg:text-right"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                lineHeight: 'clamp(18px, 3.5vw, 22px)',
                letterSpacing: '0px',
                color: '#6F6F6F',
              }}
            >
              Asthesis understands patterns, not people. By observing patterns of daily life including movement, presence, and environmental context. It builds an understanding of what is normal, and recognizes when something changes.
            </p>
          </div>
        </div>

        <div
          ref={legacyDivRef(designTextRef)}
          className="absolute z-20 w-full max-w-full left-4 right-4 lg:left-0 lg:right-auto lg:max-w-2xl pl-0 pr-8 md:pl-0 md:pr-8 lg:px-12 pointer-events-none transition-none"
          style={{
            top: '50%',
            bottom: 'auto',
            transform: 'translate3d(0, calc(-50% + var(--designY, 0px)), 0)',
            willChange: 'transform, opacity',
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
              DESIGNED FOR MODERN CARE DELIVERY
            </h2>
            <p
              className="w-full max-w-[13.2rem] sm:max-w-[19.2rem] md:max-w-md lg:max-w-md mx-auto lg:mx-0 text-center lg:text-left"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(11px, 2.2vw, 13px)',
                lineHeight: 'clamp(16px, 3vw, 20px)',
                letterSpacing: '0px',
                color: '#6F6F6F',
              }}
            >
              Asthesis combines ambient sensing, on-device intelligence and continuous monitoring in a format designed for the home. It supports preventative and anticipatory care while respecting dignity, autonomy and privacy.
            </p>
          </div>
        </div>

        <div
          ref={legacyDivRef(careTextRef)}
          className="absolute z-20 w-full max-w-full left-4 right-4 lg:left-auto lg:right-8 lg:max-w-2xl pl-0 pr-8 md:pl-0 md:pr-8 lg:px-8 pointer-events-none transition-none"
          style={{
            top: '50%',
            bottom: 'auto',
            transform: 'translate3d(0, calc(-50% + var(--careY, 0px)), 0)',
            willChange: 'transform, opacity',
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
              className="w-full max-w-[13.2rem] sm:max-w-[19.2rem] md:max-w-md lg:max-w-md mx-auto lg:mx-0 lg:ml-auto text-center lg:text-right"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(11px, 2.2vw, 13px)',
                lineHeight: 'clamp(16px, 3vw, 20px)',
                letterSpacing: '0px',
                color: '#6F6F6F',
              }}
            >
              Asthesis is built around a simple belief. Care should feel constant, not intrusive. By learning daily rhythms, supporting natural interactions, and responding when something feels different, it becomes a steady presence in the home. Quiet when everything is well. Ready the moment it&apos;s needed.
            </p>
          </div>
        </div>

        <div
          ref={legacyDivRef(insideTextRef)}
          className="absolute z-20 w-full max-w-full left-4 right-4 lg:left-auto lg:right-8 lg:max-w-2xl pl-0 pr-8 md:pl-0 md:pr-8 lg:px-8 pointer-events-none transition-none"
          style={{
            top: '50%',
            bottom: 'auto',
            transform: 'translate3d(0, calc(-50% + var(--insideY, 0px)), 0)',
            willChange: 'transform, opacity',
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
              className="w-full max-w-[13.2rem] sm:max-w-[19.2rem] md:max-w-md lg:max-w-md mx-auto lg:mx-0 lg:ml-auto text-center lg:text-right"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(11px, 2.2vw, 13px)',
                lineHeight: 'clamp(16px, 3vw, 20px)',
                letterSpacing: '0px',
                color: '#6F6F6F',
              }}
            >
              A precision-built system combining dedicated AI processing, integrated sensors, secure connectivity, and resilient power working quietly in the background to deliver constant, dependable protection.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
