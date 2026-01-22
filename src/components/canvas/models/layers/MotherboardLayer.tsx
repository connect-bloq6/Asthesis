'use client'

import { useRef, useMemo } from 'react'
import { Group, Mesh, Material, Box3, Vector3 } from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

// Type for the GLTF result
type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>
  materials: Record<string, Material>
}

interface MotherboardLayerProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

// Preload the model for better performance
useGLTF.preload('/models/motherboard-layer.glb')

export default function MotherboardLayer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: MotherboardLayerProps) {
  const groupRef = useRef<Group>(null)
  
  // Load the GLB model
  const { scene } = useGLTF('/models/motherboard-layer.glb') as GLTFResult

  // Clone the scene to avoid modifying the cached original
  const clonedScene = useMemo(() => scene.clone(), [scene])

  // Calculate scale to match the battery layer size
  // Use the same target dimensions as battery layer to ensure same size
  const baseScale = useMemo(() => {
    const box = new Box3().setFromObject(clonedScene)
    const size = box.getSize(new Vector3())
    
    // Target dimensions (same as battery layer)
    const targetWidth = 1.35
    const targetHeight = 2.9
    
    // Calculate scale based on width and height, use the smaller scale to ensure it fits
    const scaleX = targetWidth / size.x
    const scaleY = targetHeight / size.y
    const calculatedScale = Math.min(scaleX, scaleY)
    
    // Return the calculated scale, or default to 0.8 if calculation fails
    return isFinite(calculatedScale) && calculatedScale > 0 ? calculatedScale : 0.8
  }, [clonedScene])

  // Position motherboard 0.04 units from the battery layer (in front of it)
  const adjustedPosition: [number, number, number] = useMemo(() => {
    return [position[0], position[1], position[2] + 0.225]
  }, [position])

  return (
    <group
      ref={groupRef}
      position={adjustedPosition}
      rotation={rotation}
      scale={scale * baseScale}
    >
      {/* Render the loaded GLB model */}
      <primitive object={clonedScene} />
    </group>
  )
}

