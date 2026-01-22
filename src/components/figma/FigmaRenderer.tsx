'use client'

import { useFigma } from '@/hooks/useFigma'
import { figmaColorToCSS, figmaSpacingToCSS } from '@/lib/figma'
import type { FigmaNode } from '@/lib/figma'
import { CSSProperties } from 'react'

export interface FigmaRendererProps {
  fileId: string
  nodeId: string
  accessToken?: string
  useProxy?: boolean
  className?: string
  onNodeRender?: (node: FigmaNode) => React.ReactNode
}

/**
 * Renders Figma designs as actual React components (not images)
 * Converts Figma nodes to HTML/CSS
 */
export default function FigmaRenderer({
  fileId,
  nodeId,
  accessToken,
  useProxy = true,
  className,
  onNodeRender,
}: FigmaRendererProps) {
  const { nodes, loading, error } = useFigma({
    fileId,
    accessToken,
    nodeIds: [nodeId],
    useProxy,
  })

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

  const rootNode = nodes[0]

  return (
    <div className={className}>
      {renderNode(rootNode, onNodeRender)}
    </div>
  )
}

/**
 * Convert Figma node to React component
 */
function renderNode(
  node: FigmaNode,
  customRender?: (node: FigmaNode) => React.ReactNode,
  depth: number = 0
): React.ReactNode {
  // Use custom renderer if provided
  if (customRender) {
    const custom = customRender(node)
    if (custom) return custom
  }

  // Get node styles
  const styles = getNodeStyles(node)
  const className = getNodeClassName(node)

  // Handle different node types
  switch (node.type) {
    case 'TEXT':
      return renderTextNode(node, styles, className)

    case 'RECTANGLE':
    case 'ELLIPSE':
    case 'VECTOR':
    case 'LINE':
      return renderShapeNode(node, styles, className)

    case 'FRAME':
    case 'GROUP':
    case 'COMPONENT':
    case 'INSTANCE':
      return renderContainerNode(node, styles, className, customRender, depth)

    case 'IMAGE':
      return renderImageNode(node, styles, className)

    default:
      // Default: render as div
      return (
        <div key={node.id} style={styles} className={className}>
          {node.children?.map((child) => renderNode(child, customRender, depth + 1))}
        </div>
      )
  }
}

/**
 * Get CSS styles from Figma node
 */
function getNodeStyles(node: FigmaNode): CSSProperties {
  const styles: CSSProperties = {}

  // Position and size
  if (node.absoluteBoundingBox) {
    styles.width = `${node.absoluteBoundingBox.width}px`
    styles.height = `${node.absoluteBoundingBox.height}px`
    styles.position = 'relative'
  }

  // Background/Fills
  if (node.fills && Array.isArray(node.fills) && node.fills.length > 0) {
    const fill = node.fills[0]
    if (fill.type === 'SOLID' && fill.color) {
      styles.backgroundColor = figmaColorToCSS(fill.color)
    } else if (fill.type === 'GRADIENT_LINEAR' && fill.gradientStops) {
      // Handle gradients
      const stops = fill.gradientStops.map((stop: any) => {
        const color = figmaColorToCSS(stop.color)
        return `${color} ${stop.position * 100}%`
      }).join(', ')
      styles.background = `linear-gradient(${fill.gradientHandlePositions?.[0] || '180deg'}, ${stops})`
    }
  }

  // Border/Stroke
  if (node.strokes && Array.isArray(node.strokes) && node.strokes.length > 0) {
    const stroke = node.strokes[0]
    if (stroke.type === 'SOLID' && stroke.color) {
      styles.borderColor = figmaColorToCSS(stroke.color)
      styles.borderWidth = `${node.strokeWeight || 1}px`
      styles.borderStyle = 'solid'
    }
  }

  // Border radius
  if ('cornerRadius' in node && node.cornerRadius) {
    styles.borderRadius = `${node.cornerRadius}px`
  }

  // Opacity
  if (node.opacity !== undefined) {
    styles.opacity = node.opacity
  }

  // Effects (shadows)
  if (node.effects && Array.isArray(node.effects)) {
    const shadows = node.effects
      .filter((effect: any) => effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW')
      .map((effect: any) => {
        const offset = effect.offset || { x: 0, y: 0 }
        const color = figmaColorToCSS(effect.color || { r: 0, g: 0, b: 0, a: 0.25 })
        return `${offset.x}px ${offset.y}px ${effect.radius || 0}px ${color}`
      })
    if (shadows.length > 0) {
      styles.boxShadow = shadows.join(', ')
    }
  }

  // Layout properties
  if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
    styles.display = 'flex'
    styles.flexDirection = node.layoutMode === 'HORIZONTAL' ? 'row' : 'column'
    styles.gap = node.itemSpacing ? `${node.itemSpacing}px` : undefined
    
    if (node.paddingLeft) styles.paddingLeft = `${node.paddingLeft}px`
    if (node.paddingRight) styles.paddingRight = `${node.paddingRight}px`
    if (node.paddingTop) styles.paddingTop = `${node.paddingTop}px`
    if (node.paddingBottom) styles.paddingBottom = `${node.paddingBottom}px`
  }

  return styles
}

/**
 * Get Tailwind/CSS classes from Figma node
 */
function getNodeClassName(node: FigmaNode): string {
  const classes: string[] = []

  // Layout classes
  if (node.layoutMode === 'HORIZONTAL') {
    classes.push('flex', 'flex-row')
  } else if (node.layoutMode === 'VERTICAL') {
    classes.push('flex', 'flex-col')
  }

  // Clipping
  if (node.clipsContent) {
    classes.push('overflow-hidden')
  }

  return classes.join(' ')
}

/**
 * Render text node
 */
function renderTextNode(
  node: FigmaNode,
  styles: CSSProperties,
  className: string
): React.ReactNode {
  if (!node.characters) return null

  // Add text styles
  if (node.style) {
    styles.fontFamily = node.style.fontFamily || 'inherit'
    styles.fontSize = `${node.style.fontSize || 16}px`
    styles.fontWeight = node.style.fontWeight || 400
    styles.lineHeight = node.style.lineHeightPx 
      ? `${node.style.lineHeightPx}px`
      : node.style.lineHeightPercent 
        ? `${node.style.lineHeightPercent}%`
        : 'normal'
    styles.letterSpacing = node.style.letterSpacing 
      ? `${node.style.letterSpacing}px`
      : 'normal'
    styles.textAlign = node.style.textAlignHorizontal?.toLowerCase() || 'left'
    styles.color = node.fills?.[0]?.type === 'SOLID' && node.fills[0].color
      ? figmaColorToCSS(node.fills[0].color)
      : 'inherit'
  }

  const Tag = getTextTag(node.style?.fontSize || 16)

  return (
    <Tag
      key={node.id}
      style={styles}
      className={className}
    >
      {node.characters}
    </Tag>
  )
}

/**
 * Get appropriate HTML tag for text based on size
 */
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

/**
 * Render shape node (rectangle, ellipse, vector, line)
 */
function renderShapeNode(
  node: FigmaNode,
  styles: CSSProperties,
  className: string
): React.ReactNode {
  // For ellipses, use border-radius to make it circular
  if (node.type === 'ELLIPSE' && node.absoluteBoundingBox) {
    const size = Math.min(
      node.absoluteBoundingBox.width,
      node.absoluteBoundingBox.height
    )
    styles.borderRadius = '50%'
    styles.width = `${size}px`
    styles.height = `${size}px`
  }

  return (
    <div
      key={node.id}
      style={styles}
      className={className}
    />
  )
}

/**
 * Render container node (frame, group, component)
 */
function renderContainerNode(
  node: FigmaNode,
  styles: CSSProperties,
  className: string,
  customRender?: (node: FigmaNode) => React.ReactNode,
  depth: number = 0
): React.ReactNode {
  return (
    <div
      key={node.id}
      style={styles}
      className={className}
    >
      {node.children?.map((child) => renderNode(child, customRender, depth + 1))}
    </div>
  )
}

/**
 * Render image node
 */
function renderImageNode(
  node: FigmaNode,
  styles: CSSProperties,
  className: string
): React.ReactNode {
  // For images, we'd need to fetch the image URL
  // This is a placeholder - you'd need to get the image from Figma API
  const imageUrl = node.fills?.[0]?.imageRef 
    ? `https://figma.com/image/${node.fills[0].imageRef}` // This would need actual implementation
    : undefined

  if (!imageUrl) {
    // Fallback to div with background
    return (
      <div
        key={node.id}
        style={styles}
        className={className}
      />
    )
  }

  return (
    <img
      key={node.id}
      src={imageUrl}
      alt={node.name}
      style={styles}
      className={className}
    />
  )
}

