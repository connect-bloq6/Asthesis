'use client'

/**
 * Example component showing how to use Figma integration
 * 
 * This is a reference implementation. Replace with your actual Figma file IDs and node IDs.
 */

import FigmaComponent from './FigmaComponent'
import FigmaAnimation, { FigmaAnimations } from './FigmaAnimation'
import { useFigma } from '@/hooks/useFigma'

export default function FigmaExample() {
  // Example: Using the hook directly
  const { file, nodes, loading, error } = useFigma({
    fileId: process.env.NEXT_PUBLIC_FIGMA_FILE_ID || '',
    accessToken: process.env.NEXT_PUBLIC_FIGMA_ACCESS_TOKEN,
    useProxy: true, // Recommended: uses Next.js API route
  })

  return (
    <div className="space-y-12 p-8">
      <h1 className="text-4xl font-bold">Figma Integration Examples</h1>

      {/* Example 1: Simple Figma Component */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Example 1: Render Figma Component</h2>
        <FigmaComponent
          fileId={process.env.NEXT_PUBLIC_FIGMA_FILE_ID || ''}
          accessToken={process.env.NEXT_PUBLIC_FIGMA_ACCESS_TOKEN}
          nodeId="your-node-id-here"
          animation="fadeInUp"
          className="border rounded-lg p-4"
        />
      </section>

      {/* Example 2: Animated Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Example 2: Animated Content</h2>
        <FigmaAnimation
          animation={FigmaAnimations.fadeInUp}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="bg-accent-gold/10 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Animated Section</h3>
            <p>This content fades in and slides up when it enters the viewport.</p>
          </div>
        </FigmaAnimation>
      </section>

      {/* Example 3: Custom Animation */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Example 3: Custom Animation</h2>
        <FigmaAnimation
          animation={{
            initial: { opacity: 0, scale: 0.8, rotate: -5 },
            animate: { opacity: 1, scale: 1, rotate: 0 },
            transition: {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1], // Custom easing curve
              delay: 0.2,
            },
          }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-foreground/5 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Custom Animation</h3>
            <p>This uses a custom animation with scale, rotation, and custom easing.</p>
          </div>
        </FigmaAnimation>
      </section>

      {/* Example 4: Staggered Animations */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Example 4: Staggered List</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item, index) => (
            <FigmaAnimation
              key={item}
              animation={{
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: {
                  duration: 0.5,
                  delay: index * 0.1, // Stagger delay
                },
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-background border border-foreground/10 p-4 rounded">
                Item {item}
              </div>
            </FigmaAnimation>
          ))}
        </div>
      </section>

      {/* Example 5: Using Hook Data */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Example 5: Using Hook Data</h2>
        {loading && <div>Loading Figma data...</div>}
        {error && <div className="text-red-500">Error: {error.message}</div>}
        {file && (
          <div className="bg-foreground/5 p-4 rounded">
            <p>File: {file.name}</p>
            <p>Last Modified: {new Date(file.lastModified).toLocaleDateString()}</p>
          </div>
        )}
        {nodes.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Nodes found: {nodes.length}</p>
            <ul className="list-disc list-inside space-y-1">
              {nodes.map((node) => (
                <li key={node.id}>{node.name}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}

