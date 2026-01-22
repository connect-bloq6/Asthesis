'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import * as THREE from 'three'
import { RoundedBox, Cylinder, Ring, Torus } from '@react-three/drei'

interface FrameWithDialLayerProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animateDial?: boolean
}

export default function FrameWithDialLayer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animateDial = true
}: FrameWithDialLayerProps) {
  const groupRef = useRef<Group>(null)
  const dialRef = useRef<Group>(null)

  // Subtle dial rotation animation
  useFrame((state) => {
    if (dialRef.current && animateDial) {
      dialRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // Champagne/Gold brushed metal material
  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#C9A962',
    metalness: 0.75,
    roughness: 0.25,
  }), [])

  // Darker gold for dial grip
  const darkGoldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#A88B4A',
    metalness: 0.8,
    roughness: 0.2,
  }), [])

  // Lighter gold highlight
  const lightGoldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D4B87A',
    metalness: 0.85,
    roughness: 0.15,
  }), [])

  // Knurled texture gold
  const knurledGoldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#B89B52',
    metalness: 0.7,
    roughness: 0.35,
  }), [])

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* ===== MAIN FRAME BODY ===== */}
      <group>
        {/* Outer frame shell */}
        <RoundedBox
          args={[1.4, 2.8, 0.2]}
          radius={0.12}
          smoothness={4}
          position={[0, 0, 0]}
          material={goldMaterial}
        />

        {/* Screen cutout (hollow center) - we simulate this with a darker inset */}
        <RoundedBox
          args={[1.15, 1.4, 0.22]}
          radius={0.08}
          smoothness={4}
          position={[0, 0.5, 0.02]}
        >
          <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.8} />
        </RoundedBox>

        {/* Inner frame edge (screen opening border) */}
        <group position={[0, 0.5, 0.1]}>
          {/* Top edge */}
          <RoundedBox
            args={[1.2, 0.08, 0.06]}
            radius={0.02}
            smoothness={2}
            position={[0, 0.72, 0]}
            material={lightGoldMaterial}
          />
          {/* Bottom edge */}
          <RoundedBox
            args={[1.2, 0.08, 0.06]}
            radius={0.02}
            smoothness={2}
            position={[0, -0.72, 0]}
            material={lightGoldMaterial}
          />
          {/* Left edge */}
          <RoundedBox
            args={[0.08, 1.36, 0.06]}
            radius={0.02}
            smoothness={2}
            position={[-0.58, 0, 0]}
            material={lightGoldMaterial}
          />
          {/* Right edge */}
          <RoundedBox
            args={[0.08, 1.36, 0.06]}
            radius={0.02}
            smoothness={2}
            position={[0.58, 0, 0]}
            material={lightGoldMaterial}
          />
        </group>

        {/* Frame chamfered edges */}
        <RoundedBox
          args={[1.38, 2.78, 0.18]}
          radius={0.11}
          smoothness={4}
          position={[0, 0, -0.02]}
          material={darkGoldMaterial}
        />
      </group>

      {/* ===== ROTARY DIAL/KNOB ===== */}
      <group ref={dialRef} position={[0, -0.85, 0.12]}>
        {/* Dial base platform */}
        <Cylinder
          args={[0.52, 0.52, 0.08, 64]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, -0.02]}
          material={darkGoldMaterial}
        />

        {/* Main dial body */}
        <Cylinder
          args={[0.45, 0.48, 0.14, 64]}
          rotation={[Math.PI / 2, 0, 0]}
          material={goldMaterial}
        />

        {/* Dial top surface */}
        <Cylinder
          args={[0.42, 0.42, 0.02, 64]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0.08]}
          material={lightGoldMaterial}
        />

        {/* Knurled grip ring (outer texture) */}
        <Torus
          args={[0.44, 0.04, 8, 64]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0.02]}
          material={knurledGoldMaterial}
        />

        {/* Knurled texture - vertical ridges */}
        {[...Array(48)].map((_, i) => {
          const angle = (i / 48) * Math.PI * 2
          const x = Math.cos(angle) * 0.46
          const y = Math.sin(angle) * 0.46
          return (
            <Cylinder
              key={`knurl-${i}`}
              args={[0.012, 0.012, 0.12, 6]}
              position={[x, 0, y * 0.15]}
              rotation={[Math.PI / 2, 0, angle]}
            >
              <meshStandardMaterial
                color="#9A8242"
                metalness={0.7}
                roughness={0.4}
              />
            </Cylinder>
          )
        })}

        {/* Center dial indicator/button */}
        <Cylinder
          args={[0.18, 0.2, 0.06, 32]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0.1]}
        >
          <meshStandardMaterial
            color="#D4B87A"
            metalness={0.9}
            roughness={0.1}
          />
        </Cylinder>

        {/* Inner ring detail */}
        <Ring
          args={[0.22, 0.28, 64]}
          rotation={[0, 0, 0]}
          position={[0, 0, 0.08]}
        >
          <meshStandardMaterial
            color="#A88B4A"
            metalness={0.8}
            roughness={0.25}
          />
        </Ring>

        {/* Dial position indicator dot */}
        <Cylinder
          args={[0.02, 0.02, 0.02, 16]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0.35, 0.07]}
        >
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.3}
            roughness={0.5}
          />
        </Cylinder>
      </group>

      {/* ===== FRAME DETAILS ===== */}
      {/* Top edge highlight */}
      <RoundedBox
        args={[1.36, 0.025, 0.18]}
        radius={0.01}
        smoothness={2}
        position={[0, 1.38, 0]}
        material={lightGoldMaterial}
      />

      {/* Bottom edge detail */}
      <RoundedBox
        args={[1.36, 0.025, 0.18]}
        radius={0.01}
        smoothness={2}
        position={[0, -1.38, 0]}
        material={darkGoldMaterial}
      />

      {/* Side rails/edges */}
      <RoundedBox
        args={[0.025, 2.76, 0.18]}
        radius={0.01}
        smoothness={2}
        position={[-0.68, 0, 0]}
        material={lightGoldMaterial}
      />
      <RoundedBox
        args={[0.025, 2.76, 0.18]}
        radius={0.01}
        smoothness={2}
        position={[0.68, 0, 0]}
        material={lightGoldMaterial}
      />

      {/* Corner accents */}
      {[
        [-0.58, 1.28],
        [0.58, 1.28],
        [-0.58, -1.28],
        [0.58, -1.28],
      ].map((pos, i) => (
        <Cylinder
          key={`corner-${i}`}
          args={[0.03, 0.03, 0.21, 16]}
          position={[pos[0], pos[1], 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={lightGoldMaterial}
        />
      ))}
    </group>
  )
}

