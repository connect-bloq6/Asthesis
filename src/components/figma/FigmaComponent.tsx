'use client'

import { useFigma, useFigmaImages } from '@/hooks/useFigma'
import FigmaAnimation, { FigmaAnimations } from './FigmaAnimation'
import { extractDesignTokens, figmaColorToCSS } from '@/lib/figma'
import type { FigmaNode } from '@/lib/figma'
import { useEffect, useState } from 'react'

export interface FigmaComponentProps {
  fileId: string
  accessToken?: string // Optional if using API proxy with server-side token
  nodeId?: string
  nodeIds?: string[]
  className?: string
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'rotateIn' | 'none'
  renderNode?: (node: FigmaNode) => React.ReactNode
  useProxy?: boolean // Use Next.js API route (recommended)
}

/**
 * Component that renders Figma designs directly
 * 
 * @example
 * <FigmaComponent
 *   fileId="your-figma-file-id"
 *   accessToken="your-access-token"
 *   nodeId="node-id-to-render"
 *   animation="fadeInUp"
 * />
 */
export default function FigmaComponent({
  fileId,
  accessToken,
  nodeId,
  nodeIds,
  className,
  animation = 'fadeInUp',
  renderNode,
  useProxy = true,
}: FigmaComponentProps) {
  const ids = nodeId ? [nodeId] : nodeIds || []
  const { nodes, loading, error } = useFigma({
    fileId,
    accessToken,
    nodeIds: ids,
    useProxy,
  })

  const { images, loading: imagesLoading, error: imagesError } = useFigmaImages(
    fileId,
    accessToken,
    ids,
    { format: 'png', scale: 2, useProxy }
  )

  const [designTokens, setDesignTokens] = useState<any>(null)

  // Debug logging
  useEffect(() => {
    if (nodes.length > 0) {
      console.log('FigmaComponent - Nodes received:', nodes.length)
      console.log('FigmaComponent - Images:', images)
      console.log('FigmaComponent - First node:', nodes[0])
    }
  }, [nodes, images])

  useEffect(() => {
    if (nodes.length > 0) {
      // Extract design tokens from nodes
      // This is a simplified version - you might want to process the full file
      const tokens = {
        colors: {} as Record<string, string>,
        typography: {} as Record<string, any>,
      }

      const extractFromNode = (node: FigmaNode) => {
        if (node.fills && Array.isArray(node.fills)) {
          node.fills.forEach((fill) => {
            if (fill.type === 'SOLID' && fill.color) {
              tokens.colors[node.name] = figmaColorToCSS(fill.color)
            }
          })
        }

        if (node.style) {
          tokens.typography[node.name] = node.style
        }

        if (node.children) {
          node.children.forEach(extractFromNode)
        }
      }

      nodes.forEach(extractFromNode)
      setDesignTokens(tokens)
    }
  }, [nodes])

  if (loading || imagesLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-red-500 ${className}`}>
        Error loading Figma component: {error.message}
      </div>
    )
  }

  if (imagesError) {
    console.error('FigmaComponent - Images error:', imagesError)
  }

  if (nodes.length === 0) {
    return <div className={className}>No nodes found</div>
  }

  // Get the first node (main frame)
  const mainNode = nodes[0]
  
  // Check if we have an image URL for this node
  const imageUrl = images[mainNode.id] || images[ids[0]]
  
  // If we have an image, render it directly
  if (imageUrl) {
    return (
      <div className={className}>
        <img
          src={imageUrl}
          alt={mainNode.name || 'Figma design'}
          className="w-full h-auto"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
    )
  }

  const renderFigmaNode = (node: FigmaNode, depth: number = 0): React.ReactNode => {
    if (renderNode) {
      return renderNode(node)
    }

    // Default rendering
    const imageUrl = images[node.id]
    const style: React.CSSProperties = {}

    if (node.absoluteBoundingBox) {
      style.width = `${node.absoluteBoundingBox.width}px`
      style.height = `${node.absoluteBoundingBox.height}px`
    }

    if (node.fills && node.fills.length > 0) {
      const fill = node.fills[0]
      if (fill.type === 'SOLID' && fill.color) {
        style.backgroundColor = figmaColorToCSS(fill.color)
      }
    }

    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={node.name}
          style={style}
          className="w-full h-auto"
        />
      )
    }

    return (
      <div style={style} className="border border-gray-200 rounded">
        {node.name}
        {node.children && node.children.length > 0 && (
          <div>
            {node.children.map((child) => (
              <div key={child.id}>{renderFigmaNode(child, depth + 1)}</div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const content = (
    <div className={className}>
      {nodes.map((node) => {
        const renderedNode = renderFigmaNode(node, 0)
        // If the rendered node is already a React element with a key, wrap it
        // Otherwise, wrap it in a div with a key
        return (
          <div key={node.id}>
            {renderedNode}
          </div>
        )
      })}
    </div>
  )

  if (animation === 'none') {
    return content
  }

  const animationConfig = FigmaAnimations[animation] || FigmaAnimations.fadeInUp

  return (
    <FigmaAnimation animation={animationConfig} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      {content}
    </FigmaAnimation>
  )
}

