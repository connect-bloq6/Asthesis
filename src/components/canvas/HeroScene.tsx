'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import ExplodedDevice from '@/components/canvas/models/ExplodedDevice'

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [3, 1.5, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      {/* Lighting Setup for Gold Material */}
      <ambientLight intensity={0.4} />
      
      {/* Main Key Light */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.2}
        color="#ffffff"
      />
      
      {/* Fill Light */}
      <directionalLight 
        position={[-5, 3, 2]} 
        intensity={0.6}
        color="#f0e6d3"
      />
      
      {/* Rim Light for gold highlight */}
      <directionalLight 
        position={[0, -2, -5]} 
        intensity={0.4}
        color="#ffd700"
      />

      {/* Top Light */}
      <pointLight 
        position={[0, 5, 2]} 
        intensity={0.5}
        color="#ffffff"
      />

      {/* 3D Product - Exploded Device */}
      <Suspense fallback={null}>
        <ExplodedDevice 
          position={[0, 0, 0]} 
          rotation={[0.15, -0.3, 0]}
          scale={0.9}
          exploded={true}
          explodeDistance={0.7}
          autoRotate={true}
          animateExplode={true}
        />
        
        {/* Subtle shadow beneath the product */}
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.3}
          scale={6}
          blur={2.5}
          far={4}
          color="#000000"
        />
        
        <Preload all />
      </Suspense>

      {/* Environment for realistic reflections */}
      <Environment preset="studio" />
    </Canvas>
  )
}
