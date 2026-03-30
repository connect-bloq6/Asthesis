import { Object3DNode, MaterialNode } from '@react-three/fiber'
import * as THREE from 'three'

// Extend Three.js types for React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Add custom geometry/material types here if needed
      // customGeometry: Object3DNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>
      // customMaterial: MaterialNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial>
    }
  }
}

// Custom model types
export interface ModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
}

// Animation types
export interface AnimationConfig {
  duration: number
  delay?: number
  easing?: (t: number) => number
}

// Scene configuration
export interface SceneConfig {
  camera: {
    position: [number, number, number]
    fov: number
    near: number
    far: number
  }
  lighting: {
    ambient: number
    directional: number
  }
}

