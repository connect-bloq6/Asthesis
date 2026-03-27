'use client'

import type React from 'react'
import type { RefObject } from 'react'

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

function isSafari(): boolean {
  if (typeof navigator === 'undefined') return false
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

type Props = {
  videoRef: RefObject<HTMLVideoElement | null>
  showChampagneGradient: boolean
  onTimeUpdate: () => void
}

export function HeroSection({ videoRef, showChampagneGradient, onTimeUpdate }: Props) {
  const useMp4Hero = typeof navigator !== 'undefined' && (isIOS() || isSafari())

  if (process.env.NODE_ENV === 'development') {
    console.log('Hero video source selection:', {
      isIOS: typeof navigator !== 'undefined' ? isIOS() : false,
      isSafari: typeof navigator !== 'undefined' ? isSafari() : false,
      useMp4Hero,
      src: useMp4Hero ? '/videos/hero_alpha_ios_cut.mp4' : '/videos/Asthesis_Intro_video_cut.webm',
    })
  }

  return (
    <div className="relative min-h-screen bg-white">
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
            className="absolute top-0 left-0 right-0 flex flex-col items-center justify-start pointer-events-none z-10 pt-[18vh] md:pt-[calc(11vh+6rem)]"
            style={{
              animation: 'landing-gradient-fade 2.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }}
          >
            <div className="flex flex-col items-center gap-2.5 md:gap-3 px-4">
              <h1
                className="text-center font-bold tracking-tight leading-[1.05] bg-clip-text text-transparent"
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
              <p
                className="text-center font-semibold tracking-tight leading-snug max-w-[min(42rem,94vw)] bg-clip-text text-transparent text-balance"
                style={{
                  fontFamily: 'var(--font-unbounded), Unbounded, system-ui, sans-serif',
                  fontSize: 'clamp(1.125rem, 3vw, 1.625rem)',
                  backgroundImage: 'linear-gradient(to bottom, #9A7B3C 0%, #A68B45 35%, #B89850 65%, #D4BC7A 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                A new standard for technology enabled care at home
              </p>
            </div>
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
                ref={videoRef as React.LegacyRef<HTMLVideoElement>}
                src={useMp4Hero ? '/videos/hero_alpha_ios_cut.mp4' : '/videos/Asthesis_Intro_video_cut.webm'}
                className="relative z-10 w-full h-full object-contain"
                playsInline
                muted
                onLoadedData={(e) => {
                  console.log('Hero loaded:', e.currentTarget.currentSrc)
                  const v = e.currentTarget
                  if (v.currentTime < 0.1) v.currentTime = 0.1
                }}
                onError={(e) => {
                  console.error('Hero failed:', e.currentTarget.currentSrc)
                }}
                onTimeUpdate={onTimeUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
