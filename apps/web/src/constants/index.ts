// Application constants

export const APP_CONFIG = {
  name: 'Asthesis',
  description: 'An immersive 3D web experience',
} as const

// Camera defaults
export const CAMERA_DEFAULTS = {
  position: [0, 0, 5] as const,
  fov: 75,
  near: 0.1,
  far: 1000,
}

// Animation defaults
export const ANIMATION_DEFAULTS = {
  duration: 1000,
  easing: 'easeInOut',
}

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Colors (matching Tailwind config)
export const COLORS = {
  primary: '#0ea5e9',
  secondary: '#6366f1',
  accent: '#f43f5e',
} as const

