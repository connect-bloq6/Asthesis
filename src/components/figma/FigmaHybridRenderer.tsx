'use client'

import { useEffect, useRef, useState } from 'react'
import { useFigma, useFigmaImages } from '@/hooks/useFigma'
import { motion, useScroll, useTransform } from 'framer-motion'

export interface FigmaHybridRendererProps {
  fileId: string
  nodeIds: string[]
  accessToken?: string
  useProxy?: boolean
  className?: string
  preferCode?: boolean // If true, tries code rendering first, falls back to images
}

/**
 * Hybrid renderer: Shows images by default, can render as code when ready
 * This ensures content is always visible while code rendering is perfected
 */
export default function FigmaHybridRenderer({
  fileId,
  nodeIds,
  accessToken,
  useProxy = true,
  className,
  preferCode = false,
}: FigmaHybridRendererProps) {
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

  // Fetch all images
  const { images, loading: imagesLoading } = useFigmaImages(
    fileId,
    accessToken,
    nodeIds,
    { format: 'png', scale: 2, useProxy }
  )

  // Ensure component is mounted
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Debug logging
  useEffect(() => {
    if (nodes.length > 0) {
      console.log('FigmaHybridRenderer - Nodes loaded:', {
        nodesCount: nodes.length,
        imagesCount: images ? Object.keys(images).length : 0,
        firstNode: {
          id: nodes[0]?.id,
          name: nodes[0]?.name,
          type: nodes[0]?.type,
          hasChildren: !!nodes[0]?.children?.length,
        },
        allImageUrls: images ? Object.entries(images).map(([id, url]) => ({ id, url: url.substring(0, 50) + '...' })) : [],
      })
    }
  }, [nodes, images])

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

  if (loading || imagesLoading) {
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

          if (!imageUrl) {
            console.warn(`No image URL for node ${node.id} (${node.name})`)
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
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={node.name || `Screen ${index + 1}`}
                    className="w-full h-auto"
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto',
                      display: 'block',
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', imageUrl)
                      e.currentTarget.style.display = 'none'
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', imageUrl)
                    }}
                  />
                ) : (
                  <div className="text-center p-8 bg-gray-100 rounded">
                    <p className="text-gray-600">No image available for: {node.name}</p>
                    <p className="text-sm text-gray-400 mt-2">Node ID: {node.id}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

