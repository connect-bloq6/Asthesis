'use client'

import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  onLoadingComplete?: () => void
  minDuration?: number
}

export default function LoadingScreen({ 
  onLoadingComplete,
  minDuration = 2500 
}: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Minimum loading duration for the animation to complete
    const timer = setTimeout(() => {
      setIsExiting(true)
      // Wait for exit animation to complete
      setTimeout(() => {
        setIsVisible(false)
        onLoadingComplete?.()
      }, 600)
    }, minDuration)

    return () => clearTimeout(timer)
  }, [minDuration, onLoadingComplete])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-600 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Loading Line Container */}
      <div className="relative w-[60%] max-w-[600px] h-[2px]">
        {/* Track (subtle background line) */}
        <div className="absolute inset-0 bg-white/10 rounded-full" />
        
        {/* Animated Progress Line */}
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/80 via-white to-white/80 rounded-full animate-loading-line"
          style={{
            boxShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)'
          }}
        />
        
        {/* Leading Dot */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-white rounded-full animate-loading-dot"
          style={{
            boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)'
          }}
        />
      </div>
    </div>
  )
}
