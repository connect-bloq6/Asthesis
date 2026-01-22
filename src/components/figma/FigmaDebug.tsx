'use client'

import { useFigma, useFigmaImages } from '@/hooks/useFigma'
import { useEffect } from 'react'

/**
 * Debug component to see what data is being received from Figma
 */
export default function FigmaDebug({ 
  fileId, 
  nodeIds 
}: { 
  fileId: string
  nodeIds: string[]
}) {
  const { nodes, loading, error } = useFigma({
    fileId,
    nodeIds,
    useProxy: true,
  })

  const { images, loading: imagesLoading } = useFigmaImages(
    fileId,
    undefined,
    nodeIds,
    { format: 'png', scale: 2, useProxy: true }
  )

  useEffect(() => {
    console.log('=== FIGMA DEBUG ===')
    console.log('Nodes:', nodes)
    console.log('Images:', images)
    console.log('Loading:', loading, imagesLoading)
    console.log('Error:', error)
    
    if (nodes.length > 0) {
      console.log('First node structure:', JSON.stringify(nodes[0], null, 2))
    }
    
    if (images && Object.keys(images).length > 0) {
      console.log('Image URLs:', Object.entries(images))
    }
    console.log('==================')
  }, [nodes, images, loading, imagesLoading, error])

  if (loading || imagesLoading) {
    return <div className="p-4 bg-yellow-100">Loading Figma data...</div>
  }

  if (error) {
    return <div className="p-4 bg-red-100 text-red-800">Error: {error.message}</div>
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded">
      <h3 className="font-bold mb-2">Figma Debug Info</h3>
      <p>Nodes: {nodes.length}</p>
      <p>Images: {images ? Object.keys(images).length : 0}</p>
      {nodes.length > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer">First Node Details</summary>
          <pre className="mt-2 text-xs overflow-auto max-h-40">
            {JSON.stringify(nodes[0], null, 2)}
          </pre>
        </details>
      )}
    </div>
  )
}

