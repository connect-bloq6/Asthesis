'use client'

import { useRef, useMemo } from 'react'
import { Group, Mesh, Material, MeshStandardMaterial } from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

// Type for the GLTF result
type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>
  materials: Record<string, Material>
}

interface BackCaseGLBLayerProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

// Preload the model for better performance
useGLTF.preload('/models/backcase-layer.glb')

export default function BackCaseGLBLayer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: BackCaseGLBLayerProps) {
  const groupRef = useRef<Group>(null)
  
  // Load the GLB model
  const { scene, nodes, materials } = useGLTF('/models/backcase-layer.glb') as GLTFResult

  // Clone the scene to avoid modifying the cached original
  const clonedScene = useMemo(() => scene.clone(), [scene])

  // Optional: Apply custom materials to maintain visual consistency with other layers
  // Champagne/Gold brushed metal material to match the design language
  const goldMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#C9A962',
    metalness: 0.78,
    roughness: 0.26,
  }), [])

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Render the loaded GLB model - rotated 180° in Y to face correct direction */}
      <primitive object={clonedScene} rotation={[0, Math.PI, 0]} />
    </group>
  )
}

