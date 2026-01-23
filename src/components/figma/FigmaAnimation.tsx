'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

export interface FigmaAnimationProps {
  children: ReactNode
  animation?: {
    initial?: Record<string, any>
    animate?: Record<string, any>
    exit?: Record<string, any>
    transition?: {
      duration?: number
      delay?: number
      ease?: string | number[]
      repeat?: number
      repeatType?: 'loop' | 'reverse' | 'repeat'
    }
  }
  whileInView?: Record<string, any>
  viewport?: {
    once?: boolean
    margin?: string
    amount?: number
  }
  className?: string
  style?: React.CSSProperties
}

/**
 * Component to apply Figma animations using Framer Motion
 * 
 * @example
 * <FigmaAnimation
 *   animation={{
 *     initial: { opacity: 0, y: 20 },
 *     animate: { opacity: 1, y: 0 },
 *     transition: { duration: 0.6, ease: 'easeOut' }
 *   }}
 *   whileInView={{ opacity: 1 }}
 *   viewport={{ once: true }}
 * >
 *   <div>Your content</div>
 * </FigmaAnimation>
 */
export default function FigmaAnimation({
  children,
  animation,
  whileInView,
  viewport,
  className,
  style,
}: FigmaAnimationProps) {
  const motionProps: MotionProps & { className?: string; style?: React.CSSProperties } = {}

  if (animation) {
    if (animation.initial) motionProps.initial = animation.initial
    if (animation.animate) motionProps.animate = animation.animate
    if (animation.exit) motionProps.exit = animation.exit
    if (animation.transition) {
      motionProps.transition = {
        ...animation.transition,
        ease: typeof animation.transition.ease === 'string'
          ? animation.transition.ease
          : animation.transition.ease,
      }
    }
  }

  if (whileInView) {
    motionProps.whileInView = whileInView
    motionProps.viewport = viewport || { once: true }
  }

  return <motion.div {...motionProps} className={className} style={style}>{children}</motion.div>
}

/**
 * Pre-configured animation presets from common Figma patterns
 */
export const FigmaAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

