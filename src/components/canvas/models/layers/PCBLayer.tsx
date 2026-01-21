'use client'

import { useRef, useMemo } from 'react'
import { Group } from 'three'
import * as THREE from 'three'
import { RoundedBox, Cylinder, Box } from '@react-three/drei'

interface PCBLayerProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function PCBLayer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: PCBLayerProps) {
  const groupRef = useRef<Group>(null)

  // PCB Board material (dark green)
  const pcbMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a2e1a',
    metalness: 0.1,
    roughness: 0.8,
  }), [])

  // Metal shield material (brushed aluminum)
  const shieldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d0d0d0',
    metalness: 0.9,
    roughness: 0.3,
  }), [])

  // Dark PCB material (black board)
  const darkPCBMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.1,
    roughness: 0.7,
  }), [])

  // Chip material (dark grey)
  const chipMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    metalness: 0.2,
    roughness: 0.6,
  }), [])

  // Connector material (dark plastic)
  const connectorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.1,
    roughness: 0.5,
  }), [])

  // Gold connector pins
  const goldPinMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#C9A962',
    metalness: 0.9,
    roughness: 0.2,
  }), [])

  // Copper traces
  const copperMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#b87333',
    metalness: 0.8,
    roughness: 0.4,
  }), [])

  // Flex cable material (orange/brown)
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
      {/* ===== MAIN PCB BOARD (Top Board) ===== */}
      <group position={[0, 0.4, 0]}>
        {/* Main PCB substrate */}
        <RoundedBox
          args={[1.3, 1.8, 0.08]}
          radius={0.02}
          smoothness={2}
          position={[0, 0, 0]}
          material={pcbMaterial}
        />

        {/* Large metal shield (main processor area) */}
        <RoundedBox
          args={[0.9, 0.7, 0.12]}
          radius={0.02}
          smoothness={2}
          position={[0, 0.3, 0.08]}
          material={shieldMaterial}
        />

        {/* Smaller metal shield */}
        <RoundedBox
          args={[0.4, 0.35, 0.1]}
          radius={0.02}
          smoothness={2}
          position={[0.35, -0.4, 0.07]}
          material={shieldMaterial}
        />

        {/* SD Card slot */}
        <Box
          args={[0.35, 0.25, 0.06]}
          position={[0.4, 0.75, 0.05]}
          material={connectorMaterial}
        />
        <Box
          args={[0.28, 0.18, 0.04]}
          position={[0.4, 0.75, 0.07]}
        >
          <meshStandardMaterial color="#3a3a3a" metalness={0.3} roughness={0.5} />
        </Box>

        {/* USB/Power connector (top left) */}
        <Box
          args={[0.2, 0.12, 0.08]}
          position={[-0.5, 0.8, 0.06]}
          material={connectorMaterial}
        />

        {/* HDMI-like connector */}
        <Box
          args={[0.18, 0.08, 0.06]}
          position={[-0.25, 0.85, 0.05]}
          material={connectorMaterial}
        />

        {/* Small chips around the board */}
        {[
          [-0.4, 0.1, 0.05],
          [-0.4, -0.2, 0.05],
          [0.1, -0.5, 0.05],
          [-0.3, -0.6, 0.05],
        ].map((pos, i) => (
          <Box
            key={`chip-${i}`}
            args={[0.12, 0.12, 0.04]}
            position={pos as [number, number, number]}
            material={chipMaterial}
          />
        ))}

        {/* Capacitors */}
        {[
          [-0.55, 0.5, 0.06],
          [-0.55, 0.3, 0.06],
          [0.55, 0.1, 0.06],
          [0.55, -0.1, 0.06],
        ].map((pos, i) => (
          <Cylinder
            key={`cap-${i}`}
            args={[0.025, 0.025, 0.08, 16]}
            position={pos as [number, number, number]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.5} />
          </Cylinder>
        ))}

        {/* Flex cable connector going to bottom board */}
        <Box
          args={[0.15, 0.5, 0.02]}
          position={[0.1, -0.65, -0.04]}
          rotation={[0.3, 0, 0]}
          material={flexCableMaterial}
        />

        {/* Gold mounting holes/contacts */}
        {[
          [-0.55, 0.8, 0.04],
          [0.55, 0.8, 0.04],
          [-0.55, -0.8, 0.04],
          [0.55, -0.8, 0.04],
        ].map((pos, i) => (
          <Cylinder
            key={`hole-${i}`}
            args={[0.04, 0.04, 0.02, 16]}
            position={pos as [number, number, number]}
            rotation={[Math.PI / 2, 0, 0]}
            material={goldPinMaterial}
          />
        ))}
      </group>

      {/* ===== SECONDARY PCB BOARD (Bottom Board with barrel connector) ===== */}
      <group position={[0.3, -0.65, -0.15]} rotation={[0, 0, 0.15]}>
        {/* Secondary PCB substrate */}
        <RoundedBox
          args={[0.9, 1.0, 0.06]}
          radius={0.02}
          smoothness={2}
          position={[0, 0, 0]}
          material={darkPCBMaterial}
        />

        {/* Barrel connector (coaxial) */}
        <group position={[0.15, 0.1, 0.08]}>
          {/* Outer barrel */}
          <Cylinder
            args={[0.08, 0.08, 0.2, 24]}
            rotation={[Math.PI / 2, 0, 0]}
            material={shieldMaterial}
          />
          {/* Inner barrel */}
          <Cylinder
            args={[0.04, 0.04, 0.22, 16]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial color="#c9a962" metalness={0.9} roughness={0.2} />
          </Cylinder>
          {/* Center pin */}
          <Cylinder
            args={[0.015, 0.015, 0.24, 8]}
            rotation={[Math.PI / 2, 0, 0]}
            material={goldPinMaterial}
          />
        </group>

        {/* Small metal shield on secondary board */}
        <RoundedBox
          args={[0.25, 0.3, 0.08]}
          radius={0.01}
          smoothness={2}
          position={[-0.25, 0.2, 0.05]}
          material={shieldMaterial}
        />

        {/* SD card slot on secondary board */}
        <Box
          args={[0.3, 0.22, 0.04]}
          position={[0.2, -0.25, 0.04]}
          material={connectorMaterial}
        />

        {/* Various small components */}
        {[
          [-0.25, -0.2, 0.04],
          [-0.1, -0.35, 0.04],
          [0.35, 0.35, 0.04],
        ].map((pos, i) => (
          <Box
            key={`sec-chip-${i}`}
            args={[0.08, 0.08, 0.03]}
            position={pos as [number, number, number]}
            material={chipMaterial}
          />
        ))}

        {/* Connector pins at bottom */}
        <Box
          args={[0.15, 0.06, 0.04]}
          position={[-0.3, -0.45, 0.04]}
          material={connectorMaterial}
        />

        {/* USB-C like port */}
        <Box
          args={[0.12, 0.04, 0.03]}
          position={[0.3, -0.47, 0.04]}
        >
          <meshStandardMaterial color="#333333" metalness={0.4} roughness={0.4} />
        </Box>

        {/* Gold mounting holes */}
        {[
          [-0.38, 0.42, 0.03],
          [0.38, 0.42, 0.03],
          [-0.38, -0.42, 0.03],
          [0.38, -0.42, 0.03],
        ].map((pos, i) => (
          <Cylinder
            key={`sec-hole-${i}`}
            args={[0.03, 0.03, 0.02, 16]}
            position={pos as [number, number, number]}
            rotation={[Math.PI / 2, 0, 0]}
            material={goldPinMaterial}
          />
        ))}
      </group>

      {/* Flex cable connecting both boards */}
      <mesh position={[0.15, -0.1, -0.06]} rotation={[0.5, 0.1, 0.1]}>
        <boxGeometry args={[0.12, 0.35, 0.015]} />
        <meshStandardMaterial color="#B8860B" metalness={0.2} roughness={0.5} />
      </mesh>

      {/* Copper traces visible on PCB edge */}
      {[0.02, 0.04, 0.06].map((offset, i) => (
        <mesh key={`trace-${i}`} position={[-0.64, 0.4 + i * 0.15, offset - 0.02]}>
          <boxGeometry args={[0.01, 0.08, 0.005]} />
          <meshStandardMaterial {...copperMaterial} />
        </mesh>
      ))}
    </group>
  )
}

