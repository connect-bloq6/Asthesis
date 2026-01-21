'use client'

import { useRef, useMemo } from 'react'
import { Group } from 'three'
import * as THREE from 'three'
import { RoundedBox, Box, Cylinder } from '@react-three/drei'

interface BatteryLayerProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function BatteryLayer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: BatteryLayerProps) {
  const groupRef = useRef<Group>(null)

  // Black mounting plate material
  const mountingPlateMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.1,
    roughness: 0.7,
  }), [])

  // Battery cell material (silver/metallic)
  const batteryCellMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#c0c0c0',
    metalness: 0.6,
    roughness: 0.35,
  }), [])

  // Battery wrap/label (yellow/gold tape)
  const batteryWrapMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D4A017',
    metalness: 0.1,
    roughness: 0.6,
  }), [])

  // Wire colors
  const redWireMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#CC0000',
    metalness: 0.1,
    roughness: 0.5,
  }), [])

  const blackWireMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.1,
    roughness: 0.5,
  }), [])

  // Connector material (white plastic)
  const connectorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#f5f5f5',
    metalness: 0.1,
    roughness: 0.4,
  }), [])

  // Flex cable material
  const flexCableMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8B4513',
    metalness: 0.1,
    roughness: 0.6,
  }), [])

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* ===== MOUNTING PLATE ===== */}
      <group>
        {/* Main mounting plate (black plastic/PCB) */}
        <RoundedBox
          args={[1.0, 2.0, 0.08]}
          radius={0.03}
          smoothness={2}
          position={[0, 0, 0]}
          material={mountingPlateMaterial}
        />

        {/* Cutout area at top (for flex cable passthrough) */}
        <Box
          args={[0.25, 0.15, 0.09]}
          position={[0, 0.95, 0]}
        >
          <meshStandardMaterial color="#0a0a0a" />
        </Box>

        {/* Battery retention tabs */}
        {[
          [-0.42, 0.3, 0.04],
          [0.42, 0.3, 0.04],
          [-0.42, -0.3, 0.04],
          [0.42, -0.3, 0.04],
        ].map((pos, i) => (
          <RoundedBox
            key={`tab-${i}`}
            args={[0.08, 0.15, 0.03]}
            radius={0.01}
            smoothness={2}
            position={pos as [number, number, number]}
            material={mountingPlateMaterial}
          />
        ))}

        {/* Flex cable connector at top */}
        <Box
          args={[0.2, 0.08, 0.025]}
          position={[0, 0.88, 0.05]}
        >
          <meshStandardMaterial color="#f5f5dc" metalness={0.2} roughness={0.4} />
        </Box>

        {/* Flex cable ribbon */}
        <Box
          args={[0.15, 0.2, 0.01]}
          position={[0, 1.0, 0.02]}
          material={flexCableMaterial}
        />
      </group>

      {/* ===== LIPO BATTERY CELL ===== */}
      <group position={[0, -0.15, 0.12]}>
        {/* Battery cell body (silver pouch) */}
        <RoundedBox
          args={[0.7, 1.1, 0.14]}
          radius={0.02}
          smoothness={2}
          position={[0, 0, 0]}
          material={batteryCellMaterial}
        />

        {/* Yellow caution tape/wrap at top */}
        <Box
          args={[0.72, 0.12, 0.145]}
          position={[0, 0.52, 0]}
          material={batteryWrapMaterial}
        />

        {/* Yellow caution tape/wrap at bottom */}
        <Box
          args={[0.72, 0.08, 0.145]}
          position={[0, -0.48, 0]}
          material={batteryWrapMaterial}
        />

        {/* Battery label area (lighter section) */}
        <Box
          args={[0.6, 0.5, 0.001]}
          position={[0, 0, 0.071]}
        >
          <meshStandardMaterial color="#d0d0d0" metalness={0.3} roughness={0.5} />
        </Box>

        {/* Battery tabs (connection points) */}
        <Box
          args={[0.2, 0.08, 0.01]}
          position={[-0.15, 0.59, 0]}
          material={batteryCellMaterial}
        />
        <Box
          args={[0.2, 0.08, 0.01]}
          position={[0.15, 0.59, 0]}
          material={batteryCellMaterial}
        />

        {/* Protection circuit board at top of battery */}
        <Box
          args={[0.55, 0.12, 0.04]}
          position={[0, 0.65, 0.02]}
        >
          <meshStandardMaterial color="#1a3d1a" metalness={0.1} roughness={0.7} />
        </Box>
      </group>

      {/* ===== WIRING HARNESS ===== */}
      <group position={[0, 0.55, 0.15]}>
        {/* Red wire */}
        <Cylinder
          args={[0.015, 0.015, 0.35, 8]}
          position={[-0.05, 0.15, 0]}
          rotation={[0.3, 0, 0.2]}
          material={redWireMaterial}
        />
        
        {/* Black wire */}
        <Cylinder
          args={[0.015, 0.015, 0.35, 8]}
          position={[0.05, 0.15, 0]}
          rotation={[0.3, 0, -0.2]}
          material={blackWireMaterial}
        />

        {/* JST connector (white) */}
        <Box
          args={[0.12, 0.06, 0.04]}
          position={[0, 0.35, -0.02]}
          material={connectorMaterial}
        />

        {/* Connector pins */}
        {[-0.025, 0.025].map((x, i) => (
          <Box
            key={`pin-${i}`}
            args={[0.015, 0.03, 0.015]}
            position={[x, 0.38, -0.02]}
          >
            <meshStandardMaterial color="#c9a962" metalness={0.9} roughness={0.2} />
          </Box>
        ))}
      </group>

      {/* ===== MOUNTING PLATE DETAILS ===== */}
      {/* Screw holes / mounting points */}
      {[
        [-0.4, 0.85, 0.04],
        [0.4, 0.85, 0.04],
        [-0.4, -0.85, 0.04],
        [0.4, -0.85, 0.04],
      ].map((pos, i) => (
        <Cylinder
          key={`hole-${i}`}
          args={[0.025, 0.025, 0.02, 16]}
          position={pos as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#0a0a0a" />
        </Cylinder>
      ))}

      {/* Cable management clips */}
      {[
        [-0.35, 0.5, 0.05],
        [0.35, 0.5, 0.05],
      ].map((pos, i) => (
        <Box
          key={`clip-${i}`}
          args={[0.06, 0.08, 0.03]}
          position={pos as [number, number, number]}
          material={mountingPlateMaterial}
        />
      ))}

      {/* Adhesive foam pads */}
      {[
        [0.25, -0.6, 0.045],
        [-0.25, -0.6, 0.045],
      ].map((pos, i) => (
        <Box
          key={`foam-${i}`}
          args={[0.15, 0.15, 0.02]}
          position={pos as [number, number, number]}
        >
          <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
        </Box>
      ))}
    </group>
  )
}

