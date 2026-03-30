'use client'

import { useEffect, useRef, useState } from 'react'
import { useFigma, useFigmaImages } from '@/hooks/useFigma'
import FigmaAnimation, { FigmaAnimations } from './FigmaAnimation'
import { motion, useScroll, useTransform } from 'framer-motion'

export interface FigmaSequenceProps {
  fileId: string
  nodeIds: string[] // Array of node IDs for the sequence
  accessToken?: string
  useProxy?: boolean
  className?: string
  animationType?: 'scroll' | 'sequential' | 'fade'
  scrollSpeed?: number // How fast the scroll triggers transitions (0-1)
}

/**
 * Component to display a sequence of Figma screens with animations
 * 
 * @example
 * <FigmaSequence
 *   fileId="your-file-id"
 *   nodeIds={['node-1', 'node-2', 'node-3']}
 *   animationType="scroll"
 *   scrollSpeed={0.5}
 * />
 */
export default function FigmaSequence({
  fileId,
  nodeIds,
  accessToken,
  useProxy = true,
  className,
  animationType = 'scroll',
  scrollSpeed = 0.5,
}: FigmaSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
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

  // Ensure component is mounted before using useScroll
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Scroll-based animation - only use when mounted and ref is ready
  const { scrollYProgress } = useScroll({
    target: isMounted && containerRef.current ? containerRef : undefined,
    offset: ['start start', 'end end'],
  })

  // Calculate which screen to show based on scroll
  const screenProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, nodeIds.length - 1]
  )

  useEffect(() => {
    if (animationType === 'scroll' && isMounted) {
      const unsubscribe = screenProgress.on('change', (latest) => {
        const index = Math.min(Math.floor(latest), nodeIds.length - 1)
        setCurrentIndex(index)
      })
      return unsubscribe
    }
  }, [screenProgress, animationType, nodeIds.length, isMounted])

  // Sequential animation (auto-play)
  useEffect(() => {
    if (animationType === 'sequential' && nodes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % nodes.length)
      }, 3000) // Change screen every 3 seconds
      return () => clearInterval(interval)
    }
  }, [animationType, nodes.length])

  // Intersection Observer for fade animations
  useEffect(() => {
    if (animationType === 'fade' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting)
        },
        { threshold: 0.1 }
      )
      observer.observe(containerRef.current)
      return () => observer.disconnect()
    }
  }, [animationType])

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
        Error loading Figma sequence: {error.message}
      </div>
    )
  }

  if (nodes.length === 0) {
    return <div className={className}>No nodes found</div>
  }

  // Get current screen image
  const currentNode = nodes[currentIndex]
  const currentImageUrl = currentNode
    ? images[currentNode.id] || images[nodeIds[currentIndex]]
    : null

  // Don't render scroll animation until mounted
  if (animationType === 'scroll' && !isMounted) {
    return (
      <div className={`relative ${className}`} style={{ height: `${nodeIds.length * 100}vh` }}>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
        </div>
      </div>
    )
  }

  // Render based on animation type
  if (animationType === 'scroll') {
    return (
      <div
        ref={containerRef}
        className={`relative ${className}`}
        style={{ height: `${nodeIds.length * 100}vh` }}
      >
        {/* Sticky container for screens */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {nodes.map((node, index) => {
            const imageUrl = images[node.id] || images[nodeIds[index]]
            if (!imageUrl) return null

            const isActive = index === currentIndex
            const distance = Math.abs(index - currentIndex)

            return (
              <motion.div
                key={node.id || nodeIds[index]}
                className="absolute inset-0 flex items-center justify-center"
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
                <img
                  src={imageUrl}
                  alt={node.name || `Screen ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  if (animationType === 'sequential') {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        {nodes.map((node, index) => {
          const imageUrl = images[node.id] || images[nodeIds[index]]
          if (!imageUrl) return null

          const isActive = index === currentIndex

          return (
            <motion.div
              key={node.id || nodeIds[index]}
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.9,
                zIndex: isActive ? 10 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src={imageUrl}
                alt={node.name || `Screen ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </motion.div>
          )
        })}
        <div className="relative" style={{ minHeight: '100vh', paddingBottom: '100vh' }}>
          {/* Spacer to maintain layout */}
        </div>
      </div>
    )
  }

  // Fade animation (all screens fade in on scroll)
  return (
    <div ref={containerRef} className={`space-y-8 ${className}`}>
      {nodes.map((node, index) => {
        const imageUrl = images[node.id] || images[nodeIds[index]]
        if (!imageUrl) return null

        return (
          <FigmaAnimation
            key={node.id || nodeIds[index]}
            animation={{
              initial: { opacity: 0, y: 50 },
              animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
              transition: {
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
          >
            <div className="w-full">
              <img
                src={imageUrl}
                alt={node.name || `Screen ${index + 1}`}
                className="w-full h-auto"
              />
            </div>
          </FigmaAnimation>
        )
      })}
    </div>
  )
}

