'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { PCBLayer, DisplayLayer, FrameWithDialLayer, BatteryLayer, BackCaseGLBLayer } from './layers'

interface ExplodedDeviceProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  exploded?: boolean
  explodeDistance?: number
  autoRotate?: boolean
  animateExplode?: boolean
}

export default function ExplodedDevice({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  exploded = true,
  explodeDistance = 0.8,
  autoRotate = true,
  animateExplode = true
}: ExplodedDeviceProps) {
  const groupRef = useRef<Group>(null)
  const [currentExplode, setCurrentExplode] = useState(exploded ? explodeDistance : 0)
  const targetExplode = exploded ? explodeDistance : 0

  // Smooth animation for explode/collapse
  useEffect(() => {
    if (!animateExplode) {
      setCurrentExplode(targetExplode)
    }
  }, [targetExplode, animateExplode])

  useFrame((state, delta) => {
    // Auto rotation
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.15
    }

    // Smooth explode animation
    if (animateExplode && Math.abs(currentExplode - targetExplode) > 0.001) {
      setCurrentExplode(prev => prev + (targetExplode - prev) * 0.05)
    }
  })

  // Calculate layer positions based on explode amount
  // Layer order from front to back:
  // 1. PCB (front/top) - electronics
  // 2. Display - screen
  // 3. Frame with Dial - main body
  // 4. Battery - power
  // 5. Back Cover - back plate

  const layerOffsets = {
    pcb: currentExplode * 2.5,      // Furthest front
    display: currentExplode * 1.5,   // Second
    frame: currentExplode * 0.5,     // Center-ish
    battery: -currentExplode * 0.8,  // Behind
    backCover: -currentExplode * 2,  // Furthest back
  }

  // Tilt angles for exploded view (slight angles for better visibility)
  const tiltAngle = currentExplode * 0.15

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Layer 1: PCB/Electronics (Front) */}
      <PCBLayer
        position={[0, 0, layerOffsets.pcb]}
        rotation={[tiltAngle * 0.8, 0, tiltAngle * 0.3]}
        scale={0.85}
      />

      {/* Layer 2: Display Screen */}
      <DisplayLayer
        position={[0, 0.45, layerOffsets.display]}
        rotation={[tiltAngle * 0.5, 0, 0]}
        scale={1}
      />

      {/* Layer 3: Frame with Dial (Main Body) */}
      <FrameWithDialLayer
        position={[0, 0, layerOffsets.frame]}
        rotation={[tiltAngle * 0.2, 0, 0]}
        scale={1}
        animateDial={true}
      />

      {/* Layer 4: Battery Pack */}
      <BatteryLayer
        position={[0, 0.1, layerOffsets.battery]}
        rotation={[-tiltAngle * 0.3, 0, 0]}
        scale={0.9}
      />

      {/* Layer 5: Back Cover (Back) - GLB Model */}
      <BackCaseGLBLayer
        position={[0, 0, layerOffsets.backCover]}
        rotation={[-tiltAngle * 0.6, 0, 0]}
        scale={1}
      />
    </group>
  )
}

