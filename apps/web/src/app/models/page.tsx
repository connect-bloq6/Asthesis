'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

// Dynamically import the scene to avoid SSR issues with Three.js
const BackCaseScene = dynamic(
  () => import('@/components/canvas/BackCaseScene'),
  { ssr: false }
)

export default function ModelsPage() {
  return (
    <main className="relative w-full h-screen bg-[#0f0f23] overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            href="/" 
            className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-white font-medium tracking-wide text-lg">
            Device Exploded View
          </h1>
          
          <div className="w-24" />
        </div>
      </header>

      {/* 3D Scene */}
      <div className="w-full h-full">
        <BackCaseScene />
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <h2 className="text-white font-semibold text-xl mb-2">
                  Battery Assembly
                </h2>
                <p className="text-white/60 text-sm max-w-md">
                  Scroll or use mouse wheel to see the battery layer animate 
                  in and out of the back case housing. The exploded view shows 
                  how components fit together.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/5 rounded-lg px-4 py-3">
                  <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">
                    Back Case
                  </span>
                  <span className="text-white text-sm font-medium">
                    Champagne Gold
                  </span>
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-3">
                  <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">
                    Battery
                  </span>
                  <span className="text-white text-sm font-medium">
                    Li-Po Cell
                  </span>
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-3">
                  <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">
                    Animation
                  </span>
                  <span className="text-white text-sm font-medium">
                    Scroll-based
                  </span>
                </div>
              </div>
            </div>
            
            {/* Controls hint */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-6 text-white/40 text-xs">
              <span className="flex items-center gap-2">
                <kbd className="bg-white/10 px-2 py-1 rounded text-white/60">Scroll</kbd>
                Animate layers
              </span>
              <span className="flex items-center gap-2">
                <kbd className="bg-white/10 px-2 py-1 rounded text-white/60">Drag</kbd>
                Rotate view
              </span>
              <span className="flex items-center gap-2">
                <kbd className="bg-white/10 px-2 py-1 rounded text-white/60">Pinch/Scroll</kbd>
                Zoom
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
