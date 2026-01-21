'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Preload } from '@react-three/drei'
import { Suspense, useState } from 'react'
import ExplodedDevice from './models/ExplodedDevice'

interface ExplodedDeviceSceneProps {
  exploded?: boolean
  autoRotate?: boolean
  className?: string
}

export default function ExplodedDeviceScene({
  exploded = true,
  autoRotate = true,
  className = ''
}: ExplodedDeviceSceneProps) {
  const [isExploded, setIsExploded] = useState(exploded)

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [3, 2, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Environment and Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.5}
        />
        <pointLight position={[0, 5, 0]} intensity={0.3} />

        {/* Environment map for reflections */}
        <Environment preset="studio" />

        {/* 3D Content */}
        <Suspense fallback={null}>
          <ExplodedDevice
            position={[0, 0.5, 0]}
            exploded={isExploded}
            explodeDistance={0.9}
            autoRotate={autoRotate}
            animateExplode={true}
          />

          {/* Ground shadow */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={4}
          />

          <Preload all />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
        />
      </Canvas>

      {/* UI Overlay for toggling exploded view */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => setIsExploded(!isExploded)}
          className="px-6 py-3 bg-[#C9A962] text-black font-semibold rounded-full 
                     hover:bg-[#D4B87A] transition-all duration-300 
                     shadow-lg hover:shadow-xl active:scale-95"
        >
          {isExploded ? 'Assemble' : 'Explode'}
        </button>
      </div>
    </div>
  )
}

