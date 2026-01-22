'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { Suspense } from 'react'
import ExampleModel from '@/components/canvas/models/ExampleModel'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* 3D Content */}
      <Suspense fallback={null}>
        <ExampleModel />
        <Preload all />
      </Suspense>

      {/* Controls */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}

