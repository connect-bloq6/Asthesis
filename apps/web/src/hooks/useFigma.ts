'use client'

import { useState, useEffect } from 'react'
import type { FigmaFile, FigmaNode } from '@/lib/figma'

export interface UseFigmaOptions {
  fileId: string
  accessToken?: string // Optional if using API route
  nodeIds?: string[]
  useProxy?: boolean // Use Next.js API route instead of direct API call
}

export interface UseFigmaResult {
  file: FigmaFile | null
  nodes: FigmaNode[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Hook to fetch and use Figma file data
 * 
 * @example
 * const { file, nodes, loading } = useFigma({
 *   fileId: 'your-figma-file-id',
 *   accessToken: 'your-figma-access-token', // Optional if using proxy
 *   nodeIds: ['node-id-1', 'node-id-2'], // Optional: specific nodes to fetch
 *   useProxy: true // Use Next.js API route (recommended)
 * })
 */
export function useFigma(options: UseFigmaOptions): UseFigmaResult {
  const [file, setFile] = useState<FigmaFile | null>(null)
  const [nodes, setNodes] = useState<FigmaNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchFigmaData = async () => {
    setLoading(true)
    setError(null)

    try {
      const { fileId, accessToken, nodeIds, useProxy = true } = options

      if (useProxy) {
        // Use Next.js API route (recommended - avoids CORS)
        const params = new URLSearchParams({
          fileId,
          ...(nodeIds && nodeIds.length > 0 && { nodeIds: nodeIds.join(',') }),
          ...(nodeIds && nodeIds.length > 0 ? { type: 'nodes' } : { type: 'file' }),
          ...(accessToken && { accessToken }),
        })

        const response = await fetch(`/api/figma?${params.toString()}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `API error: ${response.statusText}`)
        }

        const data = await response.json()

        if (nodeIds && nodeIds.length > 0) {
          // Extract document nodes from the response
          // Structure: { nodes: { "nodeId": { document: {...} } } }
          const extractedNodes = Object.values(data.nodes || {}).map((nodeData: any) => {
            // If the node has a document property, use that, otherwise use the node itself
            return nodeData.document || nodeData
          })
          setNodes(extractedNodes)
        } else {
          setFile(data as FigmaFile)
        }
      } else {
        // Direct API call (requires access token)
        if (!accessToken) {
          throw new Error('accessToken is required when useProxy is false')
        }

        if (nodeIds && nodeIds.length > 0) {
          const nodeIdsParam = nodeIds.join(',')
          const response = await fetch(
            `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeIdsParam}`,
            {
              headers: {
                'X-Figma-Token': accessToken,
              },
            }
          )

          if (!response.ok) {
            throw new Error(`Figma API error: ${response.statusText}`)
          }

          const data = await response.json()
          // Extract document nodes from the response
          const extractedNodes = Object.values(data.nodes || {}).map((nodeData: any) => {
            return nodeData.document || nodeData
          })
          setNodes(extractedNodes)
        } else {
          const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
            headers: {
              'X-Figma-Token': accessToken,
            },
          })

          if (!response.ok) {
            throw new Error(`Figma API error: ${response.statusText}`)
          }

          const data = await response.json()
          setFile(data as FigmaFile)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Error fetching Figma data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFigmaData()
  }, [options.fileId, options.accessToken, options.nodeIds?.join(',')])

  return {
    file,
    nodes,
    loading,
    error,
    refetch: fetchFigmaData,
  }
}

/**
 * Hook to fetch Figma images
 */
export function useFigmaImages(
  fileId: string,
  accessToken: string | undefined,
  nodeIds: string[],
  options?: {
    format?: 'jpg' | 'png' | 'svg' | 'pdf'
    scale?: number
    useProxy?: boolean
  }
) {
  const [images, setImages] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      if (nodeIds.length === 0) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const format = options?.format || 'png'
        const scale = options?.scale || 2
        const useProxy = options?.useProxy !== false

        if (useProxy) {
          const params = new URLSearchParams({
            fileId,
            nodeIds: nodeIds.join(','),
            type: 'images',
            format,
            scale: scale.toString(),
            ...(accessToken && { accessToken }),
          })

          const response = await fetch(`/api/figma?${params.toString()}`)

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || `API error: ${response.statusText}`)
          }

          const data = await response.json()
          setImages(data.images)
        } else {
          if (!accessToken) {
            throw new Error('accessToken is required when useProxy is false')
          }

          const nodeIdsParam = nodeIds.join(',')
          const response = await fetch(
            `https://api.figma.com/v1/images/${fileId}?ids=${nodeIdsParam}&format=${format}&scale=${scale}`,
            {
              headers: {
                'X-Figma-Token': accessToken,
              },
            }
          )

          if (!response.ok) {
            throw new Error(`Figma API error: ${response.statusText}`)
          }

          const data = await response.json()
          setImages(data.images)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
        console.error('Error fetching Figma images:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [fileId, accessToken, nodeIds.join(','), options?.format, options?.scale])

  return { images, loading, error }
}
