'use client'

import { useRef, useState } from 'react'

// Decorative X icon component
function CrossIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="14" 
      height="14" 
      viewBox="0 0 14 14" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M1 1L13 13M13 1L1 13" 
        stroke="#1D1D1F" 
        strokeWidth="1" 
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons - Corners */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Video Container */}
        <div 
          className="relative w-full max-w-5xl mx-auto aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
          onClick={togglePlay}
        >
          {/* Video Element - Replace src with actual video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            poster="/videos/poster.jpg"
          >
            <source src="/videos/asthesis-showcase.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Fallback/Placeholder Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-amber-950/30 to-black -z-10" />
          
          {/* Dark overlay for text visibility */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />

          {/* Top Text - ASTHESIS */}
          <div className="absolute top-6 md:top-10 left-0 right-0 flex justify-center">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider"
              style={{ color: '#C9A962' }}
            >
              ASTHESIS
            </h2>
          </div>

          {/* Bottom Right Text - LOVE BY ALL. */}
          <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10">
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-wide">
              LOVE BY ALL.
            </p>
          </div>

          {/* Play Button Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100 group-hover:opacity-80'}`}>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <svg 
                className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Decorative piano image placeholder (shown when video not playing) */}
          {!isPlaying && (
            <div className="absolute inset-0 -z-5">
              {/* This would be replaced by the actual video poster or first frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 via-transparent to-black/60" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

