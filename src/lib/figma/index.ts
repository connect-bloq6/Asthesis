/**
 * Figma Integration Utilities
 * 
 * This module provides utilities to integrate Figma designs directly into your React components.
 * 
 * Usage:
 * 1. Get your Figma file ID and access token
 * 2. Use the useFigma hook to fetch design data
 * 3. Use FigmaAnimation components for animations
 */

export * from './utils'

export interface FigmaNode {
  id: string
  name: string
  type: string
  visible?: boolean
  opacity?: number
  blendMode?: string
  absoluteBoundingBox?: {
    x: number
    y: number
    width: number
    height: number
  }
  fills?: Array<{
    type: string
    color?: {
      r: number
      g: number
      b: number
      a: number
    }
    gradientStops?: Array<any>
  }>
  effects?: Array<any>
  children?: FigmaNode[]
  characters?: string
  style?: {
    fontFamily?: string
    fontSize?: number
    fontWeight?: number
    lineHeight?: number
    letterSpacing?: number
  }
  layoutMode?: 'HORIZONTAL' | 'VERTICAL'
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  itemSpacing?: number
}

export interface FigmaFile {
  document: FigmaNode
  components: Record<string, any>
  componentSets: Record<string, any>
  styles: Record<string, any>
  name: string
  lastModified: string
  thumbnailUrl: string
  version: string
}

export interface FigmaAnimation {
  name: string
  duration: number
  easing: string
  keyframes: Array<{
    time: number
    properties: Record<string, any>
  }>
}

/**
 * Convert Figma color to CSS color
 */
export function figmaColorToCSS(color: { r: number; g: number; b: number; a: number }): string {
  const r = Math.round(color.r * 255)
  const g = Math.round(color.g * 255)
  const b = Math.round(color.b * 255)
  const a = color.a !== undefined ? color.a : 1
  
  if (a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Convert Figma spacing to CSS value
 */
export function figmaSpacingToCSS(value: number): string {
  return `${value}px`
}

/**
 * Convert Figma font weight to CSS
 */
export function figmaFontWeightToCSS(weight: number): string {
  // Figma uses numeric weights (100-900)
  return weight.toString()
}

/**
 * Extract design tokens from Figma file
 */
export function extractDesignTokens(file: FigmaFile): {
  colors: Record<string, string>
  typography: Record<string, any>
  spacing: Record<string, string>
  shadows: Record<string, string>
} {
  const tokens = {
    colors: {} as Record<string, string>,
    typography: {} as Record<string, any>,
    spacing: {} as Record<string, string>,
    shadows: {} as Record<string, string>,
  }

  function traverseNode(node: FigmaNode, path: string = '') {
    const currentPath = path ? `${path}.${node.name}` : node.name

    // Extract colors from fills
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach((fill, index) => {
        if (fill.type === 'SOLID' && fill.color) {
          const colorName = `${currentPath}.fill.${index}`
          tokens.colors[colorName] = figmaColorToCSS(fill.color)
        }
      })
    }

    // Extract typography
    if (node.style) {
      tokens.typography[currentPath] = {
        fontFamily: node.style.fontFamily,
        fontSize: node.style.fontSize,
        fontWeight: node.style.fontWeight,
        lineHeight: node.style.lineHeight,
        letterSpacing: node.style.letterSpacing,
      }
    }

    // Extract spacing
    if (node.paddingLeft) tokens.spacing[`${currentPath}.paddingLeft`] = figmaSpacingToCSS(node.paddingLeft)
    if (node.paddingRight) tokens.spacing[`${currentPath}.paddingRight`] = figmaSpacingToCSS(node.paddingRight)
    if (node.paddingTop) tokens.spacing[`${currentPath}.paddingTop`] = figmaSpacingToCSS(node.paddingTop)
    if (node.paddingBottom) tokens.spacing[`${currentPath}.paddingBottom`] = figmaSpacingToCSS(node.paddingBottom)
    if (node.itemSpacing) tokens.spacing[`${currentPath}.itemSpacing`] = figmaSpacingToCSS(node.itemSpacing)

    // Extract shadows from effects
    if (node.effects && Array.isArray(node.effects)) {
      node.effects.forEach((effect, index) => {
        if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
          const shadowName = `${currentPath}.shadow.${index}`
          const shadow = effect
          tokens.shadows[shadowName] = `${shadow.offset?.x || 0}px ${shadow.offset?.y || 0}px ${shadow.radius || 0}px ${figmaColorToCSS(shadow.color || { r: 0, g: 0, b: 0, a: 0.25 })}`
        }
      })
    }

    // Recursively traverse children
    if (node.children) {
      node.children.forEach((child) => traverseNode(child, currentPath))
    }
  }

  traverseNode(file.document)
  return tokens
}

/**
 * Convert Figma animation to Framer Motion animation config
 */
export function figmaAnimationToFramerMotion(animation: FigmaAnimation): any {
  const keyframes: Record<string, any> = {}
  
  animation.keyframes.forEach((keyframe) => {
    const percentage = Math.round(keyframe.time * 100)
    Object.entries(keyframe.properties).forEach(([prop, value]) => {
      if (!keyframes[prop]) keyframes[prop] = {}
      keyframes[prop][percentage] = value
    })
  })

  // Convert easing
  let easing: [number, number, number, number] = [0.4, 0, 0.2, 1] // default ease-in-out
  if (animation.easing === 'ease-in') easing = [0.4, 0, 1, 1]
  if (animation.easing === 'ease-out') easing = [0, 0, 0.2, 1]
  if (animation.easing === 'ease-in-out') easing = [0.4, 0, 0.2, 1]
  if (animation.easing === 'linear') easing = [0, 0, 1, 1]

  return {
    keyframes,
    duration: animation.duration / 1000, // Convert ms to seconds
    ease: easing,
  }
}

