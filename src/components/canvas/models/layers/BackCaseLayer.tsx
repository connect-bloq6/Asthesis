'use client'

import { useRef, useMemo } from 'react'
import { Group, Shape, ExtrudeGeometry } from 'three'
import * as THREE from 'three'

interface BackCaseLayerProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function BackCaseLayer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: BackCaseLayerProps) {
  const groupRef = useRef<Group>(null)

  // Dimensions
  const width = 1.44
  const height = 2.88
  const wallHeight = 0.12  // Height of the side walls
  const wallThickness = 0.04  // Thickness of the walls
  const cornerRadius = 0.14  // Rounded corner radius
  const backThickness = 0.015  // Thin back panel

  // Champagne/Gold material
  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#C4A86C',
    metalness: 0.72,
    roughness: 0.28,
    side: THREE.DoubleSide,
  }), [])

  // Create rounded rectangle shape for the back panel
  const backShape = useMemo(() => {
    const shape = new Shape()
    const w = width / 2
    const h = height / 2
    const r = cornerRadius

    shape.moveTo(-w + r, -h)
    shape.lineTo(w - r, -h)
    shape.quadraticCurveTo(w, -h, w, -h + r)
    shape.lineTo(w, h - r)
    shape.quadraticCurveTo(w, h, w - r, h)
    shape.lineTo(-w + r, h)
    shape.quadraticCurveTo(-w, h, -w, h - r)
    shape.lineTo(-w, -h + r)
    shape.quadraticCurveTo(-w, -h, -w + r, -h)

    return shape
  }, [width, height, cornerRadius])

  // Create the shell shape (outer minus inner for walls)
  const shellShape = useMemo(() => {
    const outer = new Shape()
    const w = width / 2
    const h = height / 2
    const r = cornerRadius

    // Outer path
    outer.moveTo(-w + r, -h)
    outer.lineTo(w - r, -h)
    outer.quadraticCurveTo(w, -h, w, -h + r)
    outer.lineTo(w, h - r)
    outer.quadraticCurveTo(w, h, w - r, h)
    outer.lineTo(-w + r, h)
    outer.quadraticCurveTo(-w, h, -w, h - r)
    outer.lineTo(-w, -h + r)
    outer.quadraticCurveTo(-w, -h, -w + r, -h)

    // Inner hole (creates the wall thickness)
    const innerW = w - wallThickness
    const innerH = h - wallThickness
    const innerR = Math.max(cornerRadius - wallThickness, 0.02)

    const hole = new THREE.Path()
    hole.moveTo(-innerW + innerR, -innerH)
    hole.lineTo(innerW - innerR, -innerH)
    hole.quadraticCurveTo(innerW, -innerH, innerW, -innerH + innerR)
    hole.lineTo(innerW, innerH - innerR)
    hole.quadraticCurveTo(innerW, innerH, innerW - innerR, innerH)
    hole.lineTo(-innerW + innerR, innerH)
    hole.quadraticCurveTo(-innerW, innerH, -innerW, innerH - innerR)
    hole.lineTo(-innerW, -innerH + innerR)
    hole.quadraticCurveTo(-innerW, -innerH, -innerW + innerR, -innerH)

    outer.holes.push(hole)

    return outer
  }, [width, height, cornerRadius, wallThickness])

  // Extrude settings for the walls
  const wallExtrudeSettings = useMemo(() => ({
    depth: wallHeight,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 3,
  }), [wallHeight])

  // Extrude settings for the back panel
  const backExtrudeSettings = useMemo(() => ({
    depth: backThickness,
    bevelEnabled: false,
  }), [backThickness])

  // Create geometries
  const wallGeometry = useMemo(() => {
    return new ExtrudeGeometry(shellShape, wallExtrudeSettings)
  }, [shellShape, wallExtrudeSettings])

  const backGeometry = useMemo(() => {
    return new ExtrudeGeometry(backShape, backExtrudeSettings)
  }, [backShape, backExtrudeSettings])

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Back panel (thin flat surface) */}
      <mesh 
        geometry={backGeometry} 
        material={goldMaterial}
        position={[0, 0, 0]}
      />

      {/* Side walls */}
      <mesh 
        geometry={wallGeometry} 
        material={goldMaterial}
        position={[0, 0, backThickness]}
      />
    </group>
  )
}
