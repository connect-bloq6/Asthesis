'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Cylinder } from '@react-three/drei'
import { Group, Mesh } from 'three'
import * as THREE from 'three'

interface ProductDeviceProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function ProductDevice({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1 
}: ProductDeviceProps) {
  const groupRef = useRef<Group>(null)
  const dialRef = useRef<Mesh>(null)

  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
    // Subtle dial rotation
    if (dialRef.current) {
      dialRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // Gold/Champagne material
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: '#C9A962',
    metalness: 0.7,
    roughness: 0.25,
  })

  // Darker gold for accents
  const darkGoldMaterial = new THREE.MeshStandardMaterial({
    color: '#A88B4A',
    metalness: 0.8,
    roughness: 0.2,
  })

  // Screen material (dark, slightly reflective)
  const screenMaterial = new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.1,
    roughness: 0.3,
  })

  // Screen bezel material
  const bezelMaterial = new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    metalness: 0.3,
    roughness: 0.4,
  })

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation} 
      scale={scale}
    >
      {/* Main Body - Rounded rectangle */}
      <RoundedBox
        args={[1.4, 2.8, 0.35]}
        radius={0.12}
        smoothness={4}
        material={goldMaterial}
      />

      {/* Screen Bezel/Frame */}
      <RoundedBox
        args={[1.15, 1.3, 0.05]}
        radius={0.08}
        smoothness={4}
        position={[0, 0.55, 0.16]}
        material={bezelMaterial}
      />

      {/* Screen Display */}
      <RoundedBox
        args={[1.0, 1.15, 0.02]}
        radius={0.05}
        smoothness={4}
        position={[0, 0.55, 0.19]}
        material={screenMaterial}
      />

      {/* Screen Glass Reflection Layer */}
      <RoundedBox
        args={[1.0, 1.15, 0.005]}
        radius={0.05}
        smoothness={4}
        position={[0, 0.55, 0.2]}
      >
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          metalness={1}
          roughness={0}
        />
      </RoundedBox>

      {/* Dial/Knob Base */}
      <Cylinder
        ref={dialRef}
        args={[0.45, 0.45, 0.12, 64]}
        position={[0, -0.75, 0.18]}
        rotation={[Math.PI / 2, 0, 0]}
        material={darkGoldMaterial}
      />

      {/* Dial Center */}
      <Cylinder
        args={[0.35, 0.35, 0.14, 64]}
        position={[0, -0.75, 0.19]}
        rotation={[Math.PI / 2, 0, 0]}
        material={goldMaterial}
      />

      {/* Dial Inner Circle */}
      <Cylinder
        args={[0.25, 0.25, 0.15, 64]}
        position={[0, -0.75, 0.2]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#B89B52"
          metalness={0.9}
          roughness={0.15}
        />
      </Cylinder>

      {/* Dial Grip Lines */}
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2
        const x = Math.cos(angle) * 0.4
        const y = Math.sin(angle) * 0.4
        return (
          <Cylinder
            key={i}
            args={[0.012, 0.012, 0.13, 8]}
            position={[x, -0.75 + y * 0.01, 0.185]}
            rotation={[Math.PI / 2, 0, angle]}
          >
            <meshStandardMaterial
              color="#8B7355"
              metalness={0.6}
              roughness={0.4}
            />
          </Cylinder>
        )
      })}

      {/* Top Edge Highlight */}
      <RoundedBox
        args={[1.38, 0.03, 0.33]}
        radius={0.01}
        smoothness={2}
        position={[0, 1.385, 0]}
      >
        <meshStandardMaterial
          color="#D4B87A"
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Bottom Speaker Grille */}
      <mesh position={[0, -1.25, 0.18]}>
        <boxGeometry args={[0.6, 0.08, 0.02]} />
        <meshStandardMaterial
          color="#3a3a3a"
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}

