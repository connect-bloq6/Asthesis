'use client'

import { useRef, useMemo } from 'react'
import { Group } from 'three'
import * as THREE from 'three'
import { RoundedBox, Box } from '@react-three/drei'

interface DisplayLayerProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function DisplayLayer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: DisplayLayerProps) {
  const groupRef = useRef<Group>(null)

  // Screen glass material (dark, glossy)
  const screenGlassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#0a0a0a',
    metalness: 0.1,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9,
  }), [])

  // Screen bezel material (dark grey)
  const bezelMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.3,
    roughness: 0.4,
  }), [])

  // Display panel back material
  const panelBackMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    metalness: 0.2,
    roughness: 0.6,
  }), [])

  // Flex cable material (orange/brown)
  const flexCableMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8B4513',
    metalness: 0.1,
    roughness: 0.6,
  }), [])

  // Metal edge material (silver)
  const metalEdgeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#c0c0c0',
    metalness: 0.8,
    roughness: 0.3,
  }), [])

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Main display panel body */}
      <group>
        {/* Display back housing */}
        <RoundedBox
          args={[1.15, 1.15, 0.06]}
          radius={0.06}
          smoothness={4}
          position={[0, 0, -0.03]}
          material={panelBackMaterial}
        />

        {/* Metal frame edge around display */}
        <RoundedBox
          args={[1.18, 1.18, 0.08]}
          radius={0.07}
          smoothness={4}
          position={[0, 0, -0.02]}
          material={metalEdgeMaterial}
        />

        {/* Inner dark bezel */}
        <RoundedBox
          args={[1.12, 1.12, 0.04]}
          radius={0.05}
          smoothness={4}
          position={[0, 0, 0.01]}
          material={bezelMaterial}
        />

        {/* Glass screen surface */}
        <RoundedBox
          args={[1.08, 1.08, 0.015]}
          radius={0.04}
          smoothness={4}
          position={[0, 0, 0.035]}
          material={screenGlassMaterial}
        />

        {/* Screen reflection/highlight */}
        <RoundedBox
          args={[1.06, 1.06, 0.002]}
          radius={0.04}
          smoothness={4}
          position={[0, 0, 0.044]}
        >
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.03}
            metalness={1}
            roughness={0}
          />
        </RoundedBox>

        {/* Subtle screen gradient overlay */}
        <RoundedBox
          args={[1.0, 1.0, 0.001]}
          radius={0.03}
          smoothness={4}
          position={[0.02, 0.02, 0.043]}
        >
          <meshStandardMaterial
            color="#1a1a2e"
            transparent
            opacity={0.15}
          />
        </RoundedBox>

        {/* Small indicator dots on bezel edge */}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={`dot-${i}`}
            position={[0.48, -0.4 + i * 0.1, 0.035]}
          >
            <circleGeometry args={[0.008, 16]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>
        ))}
      </group>

      {/* Flex cable ribbon (FPC connector going down) */}
      <group position={[0, -0.7, -0.02]}>
        {/* Main flex cable */}
        <Box
          args={[0.18, 0.35, 0.012]}
          position={[0, 0, 0]}
          material={flexCableMaterial}
        />

        {/* Flex cable connector head */}
        <Box
          args={[0.22, 0.06, 0.02]}
          position={[0, -0.19, 0]}
        >
          <meshStandardMaterial color="#f5f5dc" metalness={0.2} roughness={0.4} />
        </Box>

        {/* Gold traces on flex cable */}
        {[...Array(6)].map((_, i) => (
          <mesh
            key={`flex-trace-${i}`}
            position={[-0.06 + i * 0.024, 0, 0.007]}
          >
            <boxGeometry args={[0.015, 0.34, 0.001]} />
            <meshStandardMaterial color="#c9a962" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Small components on back of display */}
      <group position={[0, 0, -0.06]}>
        {/* Driver IC chip */}
        <Box
          args={[0.15, 0.08, 0.02]}
          position={[0.3, -0.35, 0]}
        >
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.5} />
        </Box>

        {/* Small capacitors/resistors */}
        {[
          [0.35, 0.3, 0],
          [0.35, 0.35, 0],
          [-0.35, -0.3, 0],
        ].map((pos, i) => (
          <Box
            key={`comp-${i}`}
            args={[0.03, 0.015, 0.01]}
            position={pos as [number, number, number]}
          >
            <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.5} />
          </Box>
        ))}
      </group>
    </group>
  )
}

