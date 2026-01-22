'use client'

import { useFigma } from '@/hooks/useFigma'
import { figmaColorToCSS } from '@/lib/figma'
import type { FigmaNode } from '@/lib/figma'
import { useFigmaImages } from '@/hooks/useFigma'

export interface FigmaCodeRendererProps {
  fileId: string
  nodeIds: string[]
  accessToken?: string
  useProxy?: boolean
  className?: string
  renderAs?: 'tailwind' | 'css' | 'inline'
}

/**
 * Advanced renderer that converts Figma designs to actual React code
 * Supports Tailwind classes, CSS modules, or inline styles
 */
export default function FigmaCodeRenderer({
  fileId,
  nodeIds,
  accessToken,
  useProxy = true,
  className,
  renderAs = 'tailwind',
}: FigmaCodeRendererProps) {
  const { nodes, loading, error } = useFigma({
    fileId,
    accessToken,
    nodeIds,
    useProxy,
  })

  const { images } = useFigmaImages(
    fileId,
    accessToken,
    nodeIds,
    { format: 'png', scale: 2, useProxy }
  )

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-red-500 p-8 ${className}`}>
        Error loading Figma design: {error.message}
      </div>
    )
  }

  if (nodes.length === 0) {
    return <div className={className}>No nodes found</div>
  }

  return (
    <div className={className}>
      {nodes.map((node) => (
        <FigmaNodeRenderer
          key={node.id}
          node={node}
          images={images}
          renderAs={renderAs}
          depth={0}
        />
      ))}
    </div>
  )
}

interface FigmaNodeRendererProps {
  node: FigmaNode
  images: Record<string, string>
  renderAs: 'tailwind' | 'css' | 'inline'
  depth: number
}

function FigmaNodeRenderer({
  node,
  images,
  renderAs,
  depth,
}: FigmaNodeRendererProps) {
  const { className, style } = getNodeStyles(node, renderAs)
  const imageUrl = images[node.id]

  // Handle text nodes
  if (node.type === 'TEXT' && node.characters) {
    const textStyle = getTextStyles(node, renderAs)
    const Tag = getTextTag(node.style?.fontSize || 16)

    return (
      <Tag
        key={node.id}
        className={className + ' ' + textStyle.className}
        style={renderAs === 'inline' ? { ...style, ...textStyle.style } : style}
      >
        {node.characters}
      </Tag>
    )
  }

  // Handle image nodes
  if (imageUrl) {
    return (
      <img
        key={node.id}
        src={imageUrl}
        alt={node.name}
        className={className}
        style={style}
      />
    )
  }

  // Handle container nodes
  return (
    <div
      key={node.id}
      className={className}
      style={style}
    >
      {node.children?.map((child) => (
        <FigmaNodeRenderer
          key={child.id}
          node={child}
          images={images}
          renderAs={renderAs}
          depth={depth + 1}
        />
      ))}
    </div>
  )
}

function getNodeStyles(
  node: FigmaNode,
  renderAs: 'tailwind' | 'css' | 'inline'
): { className: string; style: React.CSSProperties } {
  const classes: string[] = []
  const styles: React.CSSProperties = {}

  // Size
  if (node.absoluteBoundingBox) {
    if (renderAs === 'inline') {
      styles.width = `${node.absoluteBoundingBox.width}px`
      styles.height = `${node.absoluteBoundingBox.height}px`
    } else if (renderAs === 'tailwind') {
      // Use Tailwind classes where possible, inline for exact values
      styles.width = `${node.absoluteBoundingBox.width}px`
      styles.height = `${node.absoluteBoundingBox.height}px`
    } else {
      styles.width = `${node.absoluteBoundingBox.width}px`
      styles.height = `${node.absoluteBoundingBox.height}px`
    }
  }

  // Background
  if (node.fills && node.fills.length > 0) {
    const fill = node.fills[0]
    if (fill.type === 'SOLID' && fill.color) {
      const color = figmaColorToCSS(fill.color)
      if (renderAs === 'inline') {
        styles.backgroundColor = color
      } else {
        styles.backgroundColor = color
      }
    }
  }

  // Border
  if (node.strokes && node.strokes.length > 0) {
    const stroke = node.strokes[0]
    if (stroke.type === 'SOLID' && stroke.color) {
      styles.borderColor = figmaColorToCSS(stroke.color)
      styles.borderWidth = `${node.strokeWeight || 1}px`
      styles.borderStyle = 'solid'
    }
  }

  // Border radius
  if ('cornerRadius' in node && node.cornerRadius) {
    if (renderAs === 'tailwind') {
      // Try to match Tailwind classes
      const radius = node.cornerRadius
      if (radius === 4) classes.push('rounded')
      else if (radius === 8) classes.push('rounded-lg')
      else if (radius === 12) classes.push('rounded-xl')
      else if (radius === 16) classes.push('rounded-2xl')
      else styles.borderRadius = `${radius}px`
    } else {
      styles.borderRadius = `${node.cornerRadius}px`
    }
  }

  // Layout
  if (node.layoutMode === 'HORIZONTAL') {
    classes.push('flex', 'flex-row')
    if (node.itemSpacing) {
      styles.gap = `${node.itemSpacing}px`
    }
  } else if (node.layoutMode === 'VERTICAL') {
    classes.push('flex', 'flex-col')
    if (node.itemSpacing) {
      styles.gap = `${node.itemSpacing}px`
    }
  }

  // Padding
  if (node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
    if (renderAs === 'inline') {
      if (node.paddingLeft) styles.paddingLeft = `${node.paddingLeft}px`
      if (node.paddingRight) styles.paddingRight = `${node.paddingRight}px`
      if (node.paddingTop) styles.paddingTop = `${node.paddingTop}px`
      if (node.paddingBottom) styles.paddingBottom = `${node.paddingBottom}px`
    } else {
      // Use Tailwind padding classes where possible
      const padding = node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom
      if (padding) {
        if (padding === 4) classes.push('p-1')
        else if (padding === 8) classes.push('p-2')
        else if (padding === 16) classes.push('p-4')
        else if (padding === 24) classes.push('p-6')
        else if (padding === 32) classes.push('p-8')
        else {
          styles.paddingLeft = node.paddingLeft ? `${node.paddingLeft}px` : undefined
          styles.paddingRight = node.paddingRight ? `${node.paddingRight}px` : undefined
          styles.paddingTop = node.paddingTop ? `${node.paddingTop}px` : undefined
          styles.paddingBottom = node.paddingBottom ? `${node.paddingBottom}px` : undefined
        }
      }
    }
  }

  // Opacity
  if (node.opacity !== undefined && node.opacity < 1) {
    styles.opacity = node.opacity
  }

  // Effects (shadows)
  if (node.effects && Array.isArray(node.effects)) {
    const shadows = node.effects
      .filter((effect: any) => effect.type === 'DROP_SHADOW')
      .map((effect: any) => {
        const offset = effect.offset || { x: 0, y: 0 }
        const color = figmaColorToCSS(effect.color || { r: 0, g: 0, b: 0, a: 0.25 })
        return `${offset.x}px ${offset.y}px ${effect.radius || 0}px ${color}`
      })
    if (shadows.length > 0) {
      styles.boxShadow = shadows.join(', ')
      if (renderAs === 'tailwind') {
        // Try to match common shadow classes
        const shadow = shadows[0]
        if (shadow.includes('0 1px 3px')) classes.push('shadow-sm')
        else if (shadow.includes('0 4px 6px')) classes.push('shadow')
        else if (shadow.includes('0 10px 15px')) classes.push('shadow-lg')
        else if (shadow.includes('0 20px 25px')) classes.push('shadow-xl')
      }
    }
  }

  return {
    className: classes.join(' '),
    style: Object.keys(styles).length > 0 ? styles : undefined,
  }
}

function getTextStyles(
  node: FigmaNode,
  renderAs: 'tailwind' | 'css' | 'inline'
): { className: string; style: React.CSSProperties } {
  const classes: string[] = []
  const styles: React.CSSProperties = {}

  if (!node.style) {
    return { className: '', style: {} }
  }

  const { style } = node

  // Font size
  if (style.fontSize) {
    if (renderAs === 'inline') {
      styles.fontSize = `${style.fontSize}px`
    } else if (renderAs === 'tailwind') {
      // Map to Tailwind text sizes
      if (style.fontSize <= 12) classes.push('text-xs')
      else if (style.fontSize <= 14) classes.push('text-sm')
      else if (style.fontSize <= 16) classes.push('text-base')
      else if (style.fontSize <= 18) classes.push('text-lg')
      else if (style.fontSize <= 20) classes.push('text-xl')
      else if (style.fontSize <= 24) classes.push('text-2xl')
      else if (style.fontSize <= 30) classes.push('text-3xl')
      else if (style.fontSize <= 36) classes.push('text-4xl')
      else if (style.fontSize <= 48) classes.push('text-5xl')
      else if (style.fontSize <= 60) classes.push('text-6xl')
      else styles.fontSize = `${style.fontSize}px`
    } else {
      styles.fontSize = `${style.fontSize}px`
    }
  }

  // Font weight
  if (style.fontWeight) {
    if (renderAs === 'inline') {
      styles.fontWeight = style.fontWeight
    } else if (renderAs === 'tailwind') {
      if (style.fontWeight <= 300) classes.push('font-light')
      else if (style.fontWeight <= 400) classes.push('font-normal')
      else if (style.fontWeight <= 500) classes.push('font-medium')
      else if (style.fontWeight <= 600) classes.push('font-semibold')
      else if (style.fontWeight <= 700) classes.push('font-bold')
      else styles.fontWeight = style.fontWeight
    } else {
      styles.fontWeight = style.fontWeight
    }
  }

  // Line height
  if (style.lineHeightPx) {
    styles.lineHeight = `${style.lineHeightPx}px`
  } else if (style.lineHeightPercent) {
    styles.lineHeight = `${style.lineHeightPercent}%`
  }

  // Letter spacing
  if (style.letterSpacing) {
    styles.letterSpacing = `${style.letterSpacing}px`
  }

  // Text align
  if (style.textAlignHorizontal) {
    if (renderAs === 'inline') {
      styles.textAlign = style.textAlignHorizontal.toLowerCase() as any
    } else if (renderAs === 'tailwind') {
      if (style.textAlignHorizontal === 'LEFT') classes.push('text-left')
      else if (style.textAlignHorizontal === 'CENTER') classes.push('text-center')
      else if (style.textAlignHorizontal === 'RIGHT') classes.push('text-right')
      else if (style.textAlignHorizontal === 'JUSTIFIED') classes.push('text-justify')
    } else {
      styles.textAlign = style.textAlignHorizontal.toLowerCase() as any
    }
  }

  // Color
  if (node.fills && node.fills.length > 0) {
    const fill = node.fills[0]
    if (fill.type === 'SOLID' && fill.color) {
      styles.color = figmaColorToCSS(fill.color)
    }
  }

  return { className: classes.join(' '), style }
}

function getTextTag(fontSize: number): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' {
  if (fontSize >= 48) return 'h1'
  if (fontSize >= 36) return 'h2'
  if (fontSize >= 30) return 'h3'
  if (fontSize >= 24) return 'h4'
  if (fontSize >= 20) return 'h5'
  if (fontSize >= 18) return 'h6'
  if (fontSize >= 16) return 'p'
  return 'span'
}

