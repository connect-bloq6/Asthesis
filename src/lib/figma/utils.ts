/**
 * Utility functions for Figma integration
 */

/**
 * Convert Figma URL node ID format to API format
 * URL format: 438-140
 * API format: 438:140
 */
export function convertFigmaNodeId(urlNodeId: string): string {
  return urlNodeId.replace(/-/g, ':')
}

/**
 * Extract file ID from Figma URL
 * Example: https://www.figma.com/design/mwCQR2AfAmfDxhMJxXS89x/File-Name
 * Returns: mwCQR2AfAmfDxhMJxXS89x
 */
export function extractFileIdFromUrl(url: string): string | null {
  const match = url.match(/figma\.com\/[^/]+\/([a-zA-Z0-9]+)/)
  return match ? match[1] : null
}

/**
 * Extract node ID from Figma URL
 * Example: https://...?node-id=438-140
 * Returns: 438-140
 */
export function extractNodeIdFromUrl(url: string): string | null {
  const match = url.match(/[?&]node-id=([^&]+)/)
  return match ? match[1] : null
}

/**
 * Parse Figma URL and extract file ID and node ID
 */
export function parseFigmaUrl(url: string): {
  fileId: string | null
  nodeId: string | null
  apiNodeId: string | null
} {
  const fileId = extractFileIdFromUrl(url)
  const nodeId = extractNodeIdFromUrl(url)
  const apiNodeId = nodeId ? convertFigmaNodeId(nodeId) : null

  return { fileId, nodeId, apiNodeId }
}

