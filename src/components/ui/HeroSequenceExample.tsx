'use client'

/**
 * Example: Hero Section with 10 Figma Screens
 * 
 * Replace the node IDs with your actual Figma node IDs
 */

import { FigmaSequence } from '@/components/figma'

export default function HeroSequenceExample() {
  // Replace these with your actual 10 node IDs from Figma
  const nodeIds = [
    '438:140', // Screen 1
    '438:141', // Screen 2
    '438:142', // Screen 3
    '438:143', // Screen 4
    '438:144', // Screen 5
    '438:145', // Screen 6
    '438:146', // Screen 7
    '438:147', // Screen 8
    '438:148', // Screen 9
    '438:149', // Screen 10
  ]

  return (
    <section className="relative w-full">
      <FigmaSequence
        fileId={process.env.NEXT_PUBLIC_FIGMA_FILE_ID!}
        nodeIds={nodeIds}
        animationType="scroll" // 'scroll' | 'sequential' | 'fade'
        scrollSpeed={0.5}
        useProxy={true}
        className="w-full"
      />
    </section>
  )
}

