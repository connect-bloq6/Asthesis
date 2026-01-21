'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload, Environment } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import { Group } from 'three'
import { BackCaseLayer, BatteryLayer } from '@/components/canvas/models/layers'

interface AnimatedLayersProps {
  scrollProgress: number
}

function AnimatedLayers({ scrollProgress }: AnimatedLayersProps) {
  const batteryRef = useRef<Group>(null)
  const backCaseRef = useRef<Group>(null)

  useFrame(() => {
    if (batteryRef.current) {
      // Battery moves out (positive Z) as scroll increases
      // Start position: fully inside the case (z = 0.1, accounts for battery thickness)
      // End position: exploded out (z = 1.6)
      const batteryZ = 0.1 + scrollProgress * 1.5
      batteryRef.current.position.z = batteryZ
      
      // Slight rotation as it comes out
      batteryRef.current.rotation.x = scrollProgress * 0.1
      batteryRef.current.rotation.y = scrollProgress * 0.15
    }
  })

  return (
    <group rotation={[0.3, 0.5, 0]}>
      {/* Back Case - stationary */}
      <group ref={backCaseRef}>
        <BackCaseLayer 
          position={[0, 0, 0]} 
          rotation={[0, 0, 0]} 
          scale={1} 
        />
      </group>

      {/* Battery - animates based on scroll */}
      <group ref={batteryRef} position={[0, 0, 0.1]}>
        <BatteryLayer 
          position={[0, 0, 0]} 
          rotation={[0, 0, 0]} 
          scale={0.95} 
        />
      </group>
    </group>
  )
}

export default function BackCaseScene() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Calculate scroll progress based on element position
        // Progress goes from 0 (element at bottom of viewport) to 1 (element at top)
        const elementCenter = rect.top + rect.height / 2
        const progress = 1 - (elementCenter / windowHeight)
        
        // Clamp between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress))
        setScrollProgress(clampedProgress)
      }
    }

    // Also handle wheel events directly on the canvas for demo
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setScrollProgress(prev => {
        const delta = e.deltaY * 0.001
        return Math.max(0, Math.min(1, prev + delta))
      })
    }

    window.addEventListener('scroll', handleScroll)
    const container = containerRef.current
    container?.addEventListener('wheel', handleWheel, { passive: false })
    
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      container?.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {/* Progress indicator */}
      <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
        <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Scroll Progress</div>
        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 rounded-full transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="text-white text-sm mt-1 font-mono">{(scrollProgress * 100).toFixed(0)}%</div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white/60 text-xs">
        Scroll or use mouse wheel to animate
      </div>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)' }}
      >
        {/* Soft environment lighting */}
        <Environment preset="apartment" />

        {/* Overall ambient lighting */}
        <ambientLight intensity={1.2} color="#ffffff" />
        
        <hemisphereLight 
          intensity={0.8} 
          color="#f5f0e6" 
          groundColor="#d4cfc5" 
        />
        
        {/* Gentle directional lights */}
        <directionalLight position={[0, 5, 5]} intensity={0.5} color="#fff8f0" />
        <directionalLight position={[0, -5, 5]} intensity={0.3} color="#f0ece4" />
        <directionalLight position={[5, 0, 5]} intensity={0.3} color="#f5f0e8" />
        <directionalLight position={[-5, 0, 5]} intensity={0.3} color="#f5f0e8" />

        {/* 3D Content */}
        <Suspense fallback={null}>
          <AnimatedLayers scrollProgress={scrollProgress} />
          <Preload all />
        </Suspense>

        {/* Controls - zoom disabled so scroll only controls animation */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  )
}
