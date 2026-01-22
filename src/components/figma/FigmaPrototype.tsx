'use client'

import { useEffect, useState } from 'react'
import { useFigma, useFigmaImages } from '@/hooks/useFigma'
import { motion, AnimatePresence } from 'framer-motion'
import type { FigmaNode } from '@/lib/figma'

export interface FigmaPrototypeProps {
  fileId: string
  nodeIds: string[] // Array of node IDs representing the prototype flow
  accessToken?: string
  useProxy?: boolean
  className?: string
  autoPlay?: boolean
  duration?: number // Duration per screen in milliseconds
  transition?: {
    type?: 'fade' | 'slide' | 'scale' | 'slideUp' | 'slideDown'
    duration?: number
    easing?: number[]
  }
  onScreenChange?: (index: number, node: FigmaNode) => void
}

/**
 * Component to display Figma prototype flow with animations
 * Supports transitions matching Figma prototype settings
 * 
 * @example
 * <FigmaPrototype
 *   fileId="your-file-id"
 *   nodeIds={['screen-1', 'screen-2', 'screen-3']}
 *   autoPlay={true}
 *   duration={2000}
 *   transition={{ type: 'slide', duration: 0.6 }}
 * />
 */
export default function FigmaPrototype({
  fileId,
  nodeIds,
  accessToken,
  useProxy = true,
  className,
  autoPlay = false,
  duration = 2000,
  transition = {
    type: 'fade',
    duration: 0.6,
    easing: [0.16, 1, 0.3, 1],
  },
  onScreenChange,
}: FigmaPrototypeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for prev, 1 for next

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

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && nodes.length > 1) {
      const interval = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % nodes.length)
      }, duration)
      return () => clearInterval(interval)
    }
  }, [autoPlay, nodes.length, duration])

  // Notify parent of screen change
  useEffect(() => {
    if (nodes[currentIndex] && onScreenChange) {
      onScreenChange(currentIndex, nodes[currentIndex])
    }
  }, [currentIndex, nodes, onScreenChange])

  // Navigation functions
  const goToNext = () => {
    if (currentIndex < nodes.length - 1) {
      setDirection(1)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((prev) => prev - 1)
    }
  }

  // Get transition variants based on type
  const getVariants = () => {
    const baseDuration = transition.duration || 0.6
    const baseEasing = transition.easing || [0.16, 1, 0.3, 1]

    switch (transition.type) {
      case 'slide':
        return {
          enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
          }),
          center: {
            x: 0,
            opacity: 1,
          },
          exit: (direction: number) => ({
            x: direction > 0 ? '-100%' : '100%',
            opacity: 0,
          }),
        }

      case 'slideUp':
        return {
          enter: { y: '100%', opacity: 0 },
          center: { y: 0, opacity: 1 },
          exit: { y: '-100%', opacity: 0 },
        }

      case 'slideDown':
        return {
          enter: { y: '-100%', opacity: 0 },
          center: { y: 0, opacity: 1 },
          exit: { y: '100%', opacity: 0 },
        }

      case 'scale':
        return {
          enter: { scale: 0.8, opacity: 0 },
          center: { scale: 1, opacity: 1 },
          exit: { scale: 1.2, opacity: 0 },
        }

      case 'fade':
      default:
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 },
        }
    }
  }

  const variants = getVariants()

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
        Error loading Figma prototype: {error.message}
      </div>
    )
  }

  if (nodes.length === 0) {
    return <div className={className}>No nodes found</div>
  }

  const currentNode = nodes[currentIndex]
  const currentImageUrl = currentNode
    ? images[currentNode.id] || images[nodeIds[currentIndex]]
    : null

  return (
    <div className={`relative ${className}`}>
      {/* Main screen container */}
      <div className="relative w-full h-screen overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {currentImageUrl && (
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: transition.duration || 0.6,
                ease: transition.easing || [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={currentImageUrl}
                alt={currentNode.name || `Screen ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation controls */}
        {!autoPlay && (
          <>
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 px-4 py-2 bg-black/50 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === nodes.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 px-4 py-2 bg-black/50 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
            >
              Next →
            </button>
          </>
        )}

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {nodes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to screen ${index + 1}`}
            />
          ))}
        </div>

        {/* Screen counter */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/50 text-white text-sm rounded-lg">
          {currentIndex + 1} / {nodes.length}
        </div>
      </div>
    </div>
  )
}

