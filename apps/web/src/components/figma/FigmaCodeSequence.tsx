'use client'

import { useEffect, useRef, useState } from 'react'
import { useFigma, useFigmaImages } from '@/hooks/useFigma'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { FigmaNode } from '@/lib/figma'
import { figmaColorToCSS } from '@/lib/figma'

export interface FigmaCodeSequenceProps {
  fileId: string
  nodeIds: string[]
  accessToken?: string
  useProxy?: boolean
  className?: string
  renderAs?: 'tailwind' | 'css' | 'inline'
}

/**
 * Combines design-to-code rendering with scroll animations
 * Renders Figma designs as React components that animate on scroll
 */
export default function FigmaCodeSequence({
  fileId,
  nodeIds,
  accessToken,
  useProxy = true,
  className,
  renderAs = 'tailwind',
}: FigmaCodeSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Fetch all nodes
  const { nodes, loading, error } = useFigma({
    fileId,
    accessToken,
    nodeIds,
    useProxy,
  })

  // Fetch images for any image nodes
  const { images } = useFigmaImages(
    fileId,
    accessToken,
    nodeIds,
    { format: 'png', scale: 2, useProxy }
  )

  // Ensure component is mounted
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: isMounted && containerRef.current ? containerRef : undefined,
    offset: ['start start', 'end end'],
  })

  const screenProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, nodeIds.length - 1]
  )

  useEffect(() => {
    if (isMounted) {
      const unsubscribe = screenProgress.on('change', (latest) => {
        const index = Math.min(Math.floor(latest), nodeIds.length - 1)
        setCurrentIndex(index)
      })
      return unsubscribe
    }
  }, [screenProgress, nodeIds.length, isMounted])

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

  if (!isMounted) {
    return (
      <div className={`relative ${className}`} style={{ height: `${nodeIds.length * 100}vh` }}>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${nodeIds.length * 100}vh` }}
    >
      {/* Sticky container for screens */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {nodes.map((node, index) => {
          const isActive = index === currentIndex
          const distance = Math.abs(index - currentIndex)
          const imageUrl = images[node.id] || images[nodeIds[index]]

          // Debug logging for first node
          if (index === 0 && isMounted) {
            console.log('FigmaCodeSequence - Rendering node:', {
              nodeId: node.id,
              nodeName: node.name,
              nodeType: node.type,
              hasChildren: !!node.children?.length,
              childrenCount: node.children?.length || 0,
              hasImage: !!imageUrl,
              absoluteBoundingBox: node.absoluteBoundingBox,
            })
          }

          return (
            <motion.div
              key={node.id || nodeIds[index]}
              className="absolute inset-0 flex items-center justify-center overflow-auto"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.95,
                zIndex: nodeIds.length - distance,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="w-full max-w-7xl mx-auto px-4 py-8">
                {/* For now, show images as fallback while code rendering is being debugged */}
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={node.name || `Screen ${index + 1}`}
                    className="w-full h-auto"
                    style={{ maxWidth: '100%', display: 'block' }}
                  />
                ) : (
                  <FigmaNodeRenderer
                    node={node}
                    images={images}
                    renderAs={renderAs}
                    depth={0}
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Import the renderer functions from FigmaCodeRenderer
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
  // Limit recursion depth to prevent performance issues
  if (depth > 20) {
    console.warn('FigmaNodeRenderer: Max depth reached for node:', node.name)
    return null
  }

  const { className, style } = getNodeStyles(node, renderAs, depth)
  const imageUrl = images[node.id]

  // Debug logging for first few nodes
  if (depth === 0) {
    console.log('Rendering root node:', {
      id: node.id,
      name: node.name,
      type: node.type,
      hasChildren: !!node.children?.length,
      hasImage: !!imageUrl,
      style,
    })
  }

  // Handle text nodes
  if (node.type === 'TEXT' && node.characters) {
    const textStyle = getTextStyles(node, renderAs)
    const Tag = getTextTag(node.style?.fontSize || 16)

    return (
      <Tag
        key={node.id}
        className={className + ' ' + textStyle.className}
        style={{
          ...(renderAs === 'inline' ? { ...style, ...textStyle.style } : { ...style, ...textStyle.style }),
          position: 'relative', // Ensure text is visible
        }}
      >
        {node.characters}
      </Tag>
    )
  }

  // Handle image nodes - prefer images if available for complex designs
  if (imageUrl) {
    return (
      <img
        key={node.id}
        src={imageUrl}
        alt={node.name}
        className={className}
        style={{
          ...style,
          maxWidth: '100%',
          height: 'auto',
          position: 'relative',
        }}
      />
    )
  }

  // Handle container nodes
  const hasVisibleContent = node.children && node.children.length > 0

  return (
    <div
      key={node.id}
      className={className}
      style={{
        ...style,
        position: 'relative', // Ensure containers are positioned
        minHeight: node.absoluteBoundingBox?.height ? `${node.absoluteBoundingBox.height}px` : 'auto',
      }}
    >
      {hasVisibleContent ? (
        node.children!.map((child) => (
          <FigmaNodeRenderer
            key={child.id}
            node={child}
            images={images}
            renderAs={renderAs}
            depth={depth + 1}
          />
        ))
      ) : (
        // Fallback: show node name if no children
        node.name && depth < 3 && (
          <div className="text-xs text-gray-400 p-2">{node.name}</div>
        )
      )}
    </div>
  )
}

function getNodeStyles(
  node: FigmaNode,
  renderAs: 'tailwind' | 'css' | 'inline',
  depth: number = 0
): { className: string; style: React.CSSProperties | undefined } {
  const classes: string[] = []
  const styles: React.CSSProperties = {}

  // Size - Use relative sizing for better responsiveness
  if (node.absoluteBoundingBox) {
    // For root frames, use full width
    if (depth === 0) {
      styles.width = '100%'
      styles.maxWidth = `${node.absoluteBoundingBox.width}px`
    } else {
      // For nested elements, use exact size but make responsive
      styles.width = node.absoluteBoundingBox.width > 2000 
        ? '100%' 
        : `${node.absoluteBoundingBox.width}px`
    }
    
    // Only set height if it's reasonable (not huge canvas dimensions)
    if (node.absoluteBoundingBox.height < 10000) {
      styles.height = node.absoluteBoundingBox.height > 2000
        ? 'auto'
        : `${node.absoluteBoundingBox.height}px`
    }
  }

  // Background
  if (node.fills && node.fills.length > 0) {
    const fill = node.fills[0]
    if (fill.type === 'SOLID' && fill.color) {
      styles.backgroundColor = figmaColorToCSS(fill.color)
    }
  }

  // Border
  if ('strokes' in node && Array.isArray((node as any).strokes) && (node as any).strokes.length > 0) {
    const stroke = (node as any).strokes[0]
    if (stroke.type === 'SOLID' && stroke.color) {
      styles.borderColor = figmaColorToCSS(stroke.color)
      styles.borderWidth = `${('strokeWeight' in node ? (node as any).strokeWeight : 1) || 1}px`
      styles.borderStyle = 'solid'
    }
  }

  // Border radius
  if ('cornerRadius' in node && node.cornerRadius) {
    if (renderAs === 'tailwind') {
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
    if (node.paddingLeft) styles.paddingLeft = `${node.paddingLeft}px`
    if (node.paddingRight) styles.paddingRight = `${node.paddingRight}px`
    if (node.paddingTop) styles.paddingTop = `${node.paddingTop}px`
    if (node.paddingBottom) styles.paddingBottom = `${node.paddingBottom}px`
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
    if (renderAs === 'tailwind') {
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
    if (renderAs === 'tailwind') {
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
  if ((style as any).lineHeightPx) {
    styles.lineHeight = `${(style as any).lineHeightPx}px`
  } else if ((style as any).lineHeightPercent) {
    styles.lineHeight = `${(style as any).lineHeightPercent}%`
  }

  // Letter spacing
  if (style.letterSpacing) {
    styles.letterSpacing = `${style.letterSpacing}px`
  }

  // Text align
  if ((style as any).textAlignHorizontal) {
    if (renderAs === 'tailwind') {
      if ((style as any).textAlignHorizontal === 'LEFT') classes.push('text-left')
      else if ((style as any).textAlignHorizontal === 'CENTER') classes.push('text-center')
      else if ((style as any).textAlignHorizontal === 'RIGHT') classes.push('text-right')
      else if ((style as any).textAlignHorizontal === 'JUSTIFIED') classes.push('text-justify')
    } else {
      styles.textAlign = (style as any).textAlignHorizontal.toLowerCase() as any
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

