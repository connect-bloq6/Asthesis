'use client'

import { useRef, useMemo } from 'react'
import { Group } from 'three'
import * as THREE from 'three'
import { RoundedBox, Box, Cylinder } from '@react-three/drei'

interface BackCoverLayerProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function BackCoverLayer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: BackCoverLayerProps) {
  const groupRef = useRef<Group>(null)

  // Champagne/Gold brushed metal material - main body
  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#C9A962',
    metalness: 0.78,
    roughness: 0.26,
  }), [])

  // Darker gold for recessed inner surface
  const innerSurfaceMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#BFA058',
    metalness: 0.65,
    roughness: 0.38,
  }), [])

  // Slightly darker for mounting features
  const mountingMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#A88B4A',
    metalness: 0.7,
    roughness: 0.32,
  }), [])

  // Lighter gold for raised edges/rim highlights
  const rimMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D4B87A',
    metalness: 0.82,
    roughness: 0.18,
  }), [])

  // Dark material for cutouts
  const cutoutMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.1,
    roughness: 0.9,
  }), [])

  // Gray material for slot details
  const slotMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#6B6B6B',
    metalness: 0.3,
    roughness: 0.6,
  }), [])

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* ===== MAIN BACK COVER SHELL ===== */}
      <group>
        {/* Outer shell - the main body with raised rim */}
        <RoundedBox
          args={[1.42, 2.85, 0.14]}
          radius={0.14}
          smoothness={6}
          position={[0, 0, 0]}
          material={goldMaterial}
        />

        {/* Inner raised rim/lip - creates the step edge effect */}
        <RoundedBox
          args={[1.34, 2.72, 0.04]}
          radius={0.11}
          smoothness={6}
          position={[0, 0, 0.06]}
          material={rimMaterial}
        />

        {/* Recessed inner cavity - the main pocket */}
        <RoundedBox
          args={[1.24, 2.58, 0.08]}
          radius={0.08}
          smoothness={6}
          position={[0, 0, 0.035]}
          material={innerSurfaceMaterial}
        />
      </group>

      {/* ===== CIRCULAR DIAL CUTOUT - positioned lower-right as in image ===== */}
      <group position={[0.15, -0.82, 0]}>
        {/* Main circular hole */}
        <Cylinder
          args={[0.32, 0.32, 0.16, 64]}
          rotation={[Math.PI / 2, 0, 0]}
          material={cutoutMaterial}
        />
        
        {/* Beveled edge around cutout */}
        <Cylinder
          args={[0.36, 0.32, 0.03, 64]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0.065]}
          material={mountingMaterial}
        />

        {/* Inner ring detail */}
        <Cylinder
          args={[0.34, 0.34, 0.02, 64]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0.055]}
          material={innerSurfaceMaterial}
        />
      </group>

      {/* ===== BOTTOM RECTANGULAR SLOTS ===== */}
      {/* Left bottom slot */}
      <group position={[-0.42, -1.22, 0]}>
        <Box args={[0.22, 0.08, 0.16]}>
          <primitive object={slotMaterial} attach="material" />
        </Box>
        {/* Slot edge detail */}
        <RoundedBox
          args={[0.24, 0.1, 0.03]}
          radius={0.015}
          smoothness={2}
          position={[0, 0, 0.055]}
          material={mountingMaterial}
        />
      </group>

      {/* Right bottom slot */}
      <group position={[0.42, -1.22, 0]}>
        <Box args={[0.22, 0.08, 0.16]}>
          <primitive object={slotMaterial} attach="material" />
        </Box>
        {/* Slot edge detail */}
        <RoundedBox
          args={[0.24, 0.1, 0.03]}
          radius={0.015}
          smoothness={2}
          position={[0, 0, 0.055]}
          material={mountingMaterial}
        />
      </group>

      {/* ===== INTERNAL DIAGONAL MOUNTING TABS (as seen in image) ===== */}
      {/* Top-left diagonal tab */}
      <RoundedBox
        args={[0.18, 0.06, 0.035]}
        radius={0.012}
        smoothness={2}
        position={[-0.42, 1.08, 0.055]}
        rotation={[0, 0, 0.65]}
        material={mountingMaterial}
      />

      {/* Top-right diagonal tab */}
      <RoundedBox
        args={[0.18, 0.06, 0.035]}
        radius={0.012}
        smoothness={2}
        position={[0.42, 1.08, 0.055]}
        rotation={[0, 0, -0.65]}
        material={mountingMaterial}
      />

      {/* Bottom-left diagonal tab (above the slot) */}
      <RoundedBox
        args={[0.16, 0.06, 0.035]}
        radius={0.012}
        smoothness={2}
        position={[-0.46, -0.95, 0.055]}
        rotation={[0, 0, -0.5]}
        material={mountingMaterial}
      />

      {/* Bottom-right diagonal tab (above the slot) */}
      <RoundedBox
        args={[0.16, 0.06, 0.035]}
        radius={0.012}
        smoothness={2}
        position={[0.50, -0.95, 0.055]}
        rotation={[0, 0, 0.5]}
        material={mountingMaterial}
      />

      {/* ===== HORIZONTAL MOUNTING RAILS ===== */}
      {/* Top horizontal mounting rail */}
      <RoundedBox
        args={[0.35, 0.065, 0.04]}
        radius={0.015}
        smoothness={2}
        position={[0, 1.15, 0.055]}
        material={mountingMaterial}
      />

      {/* Mid-upper horizontal rail (left side) */}
      <RoundedBox
        args={[0.12, 0.05, 0.035]}
        radius={0.012}
        smoothness={2}
        position={[-0.48, 0.55, 0.055]}
        material={mountingMaterial}
      />

      {/* Mid-upper horizontal rail (right side) */}
      <RoundedBox
        args={[0.12, 0.05, 0.035]}
        radius={0.012}
        smoothness={2}
        position={[0.48, 0.55, 0.055]}
        material={mountingMaterial}
      />

      {/* Mid-center horizontal rail (left side) */}
      <RoundedBox
        args={[0.14, 0.05, 0.035]}
        radius={0.012}
        smoothness={2}
        position={[-0.46, 0.0, 0.055]}
        material={mountingMaterial}
      />

      {/* Mid-center horizontal rail (right side) */}
      <RoundedBox
        args={[0.14, 0.05, 0.035]}
        radius={0.012}
        smoothness={2}
        position={[0.46, 0.0, 0.055]}
        material={mountingMaterial}
      />

      {/* Lower-mid horizontal rail (left side) */}
      <RoundedBox
        args={[0.12, 0.05, 0.035]}
        radius={0.012}
        smoothness={2}
        position={[-0.48, -0.45, 0.055]}
        material={mountingMaterial}
      />

      {/* ===== SIDE CUTOUTS/NOTCHES (small rectangular) ===== */}
      {/* Left side notches */}
      {[0.7, 0.2, -0.3].map((y, i) => (
        <Box
          key={`left-notch-${i}`}
          args={[0.05, 0.12, 0.16]}
          position={[-0.62, y, 0]}
        >
          <primitive object={cutoutMaterial} attach="material" />
        </Box>
      ))}

      {/* Right side notches */}
      {[0.7, 0.2].map((y, i) => (
        <Box
          key={`right-notch-${i}`}
          args={[0.05, 0.12, 0.16]}
          position={[0.62, y, 0]}
        >
          <primitive object={cutoutMaterial} attach="material" />
        </Box>
      ))}

      {/* ===== TOP CUTOUT/NOTCH ===== */}
      <Box
        args={[0.28, 0.05, 0.16]}
        position={[0, 1.32, 0]}
      >
        <primitive object={cutoutMaterial} attach="material" />
      </Box>

      {/* ===== SCREW/MOUNTING POINTS ===== */}
      {/* Corner mounting points with subtle raised bosses */}
      {[
        [-0.48, 1.22, 0.055],
        [0.48, 1.22, 0.055],
        [-0.52, -1.08, 0.055],
        [0.52, -1.08, 0.055],
      ].map((pos, i) => (
        <group key={`mount-point-${i}`} position={pos as [number, number, number]}>
          {/* Raised boss */}
          <Cylinder
            args={[0.045, 0.045, 0.025, 24]}
            rotation={[Math.PI / 2, 0, 0]}
            material={mountingMaterial}
          />
          {/* Center hole */}
          <Cylinder
            args={[0.018, 0.018, 0.03, 16]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <primitive object={cutoutMaterial} attach="material" />
          </Cylinder>
        </group>
      ))}

      {/* ===== OUTER RIM EDGE DETAIL ===== */}
      {/* Top edge chamfer highlight */}
      <RoundedBox
        args={[1.4, 0.018, 0.12]}
        radius={0.006}
        smoothness={2}
        position={[0, 1.415, 0]}
        material={rimMaterial}
      />

      {/* Bottom edge chamfer highlight */}
      <RoundedBox
        args={[1.4, 0.018, 0.12]}
        radius={0.006}
        smoothness={2}
        position={[0, -1.415, 0]}
        material={rimMaterial}
      />

      {/* Left edge chamfer */}
      <RoundedBox
        args={[0.018, 2.83, 0.12]}
        radius={0.006}
        smoothness={2}
        position={[-0.7, 0, 0]}
        material={rimMaterial}
      />

      {/* Right edge chamfer */}
      <RoundedBox
        args={[0.018, 2.83, 0.12]}
        radius={0.006}
        smoothness={2}
        position={[0.7, 0, 0]}
        material={rimMaterial}
      />

      {/* ===== SUBTLE SURFACE TEXTURE LINES (brushed metal effect) ===== */}
      {[...Array(16)].map((_, i) => (
        <mesh
          key={`texture-line-${i}`}
          position={[0, -1.15 + i * 0.145, 0.058]}
        >
          <boxGeometry args={[1.12, 0.002, 0.001]} />
          <meshStandardMaterial
            color="#B8A052"
            metalness={0.5}
            roughness={0.35}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}

      {/* ===== INTERNAL REINFORCEMENT STRUCTURE ===== */}
      {/* Subtle internal cross-ribs for structural support appearance */}
      <RoundedBox
        args={[1.0, 0.035, 0.022]}
        radius={0.008}
        smoothness={2}
        position={[0, 0.35, 0.045]}
        material={innerSurfaceMaterial}
      />
      
      <RoundedBox
        args={[1.0, 0.035, 0.022]}
        radius={0.008}
        smoothness={2}
        position={[0, -0.25, 0.045]}
        material={innerSurfaceMaterial}
      />

      {/* Vertical internal ribs */}
      <RoundedBox
        args={[0.035, 0.8, 0.022]}
        radius={0.008}
        smoothness={2}
        position={[-0.35, 0.5, 0.045]}
        material={innerSurfaceMaterial}
      />

      <RoundedBox
        args={[0.035, 0.8, 0.022]}
        radius={0.008}
        smoothness={2}
        position={[0.35, 0.5, 0.045]}
        material={innerSurfaceMaterial}
      />
    </group>
  )
}
