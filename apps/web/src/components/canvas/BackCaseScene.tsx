'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function BackCaseMesh() {
  return (
    <group>
      {/* Back case housing - simple box for champagne gold back */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 5.6, 0.4]} />
        <meshStandardMaterial color="#c9a962" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Battery layer - slightly inset */}
      <mesh castShadow receiveShadow position={[0, 0, 0.1]}>
        <boxGeometry args={[2.4, 5, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.7} />
      </mesh>
    </group>
  )
}

export default function BackCaseScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#0f0f23']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-3, 2, 2]} intensity={0.5} />
      <BackCaseMesh />
      <OrbitControls enableDamping dampingFactor={0.05} />
    </Canvas>
  )
}
