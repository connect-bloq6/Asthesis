import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route to proxy Figma API calls
 * This avoids CORS issues when calling Figma API from the browser
 * 
 * Usage:
 * GET /api/figma?fileId=xxx&nodeIds=id1,id2&type=file|nodes|images
 */

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const fileId = searchParams.get('fileId')
  const nodeIds = searchParams.get('nodeIds')
  const type = searchParams.get('type') || 'file' // 'file' | 'nodes' | 'images'
  const format = searchParams.get('format') || 'png'
  const scale = searchParams.get('scale') || '2'
  const accessToken = searchParams.get('accessToken') || process.env.FIGMA_ACCESS_TOKEN

  if (!fileId) {
    return NextResponse.json({ error: 'fileId is required' }, { status: 400 })
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Figma access token is required. Set FIGMA_ACCESS_TOKEN in .env.local or pass as query param' },
      { status: 400 }
    )
  }

  try {
    let url: string

    switch (type) {
      case 'nodes':
        if (!nodeIds) {
          return NextResponse.json({ error: 'nodeIds is required for type=nodes' }, { status: 400 })
        }
        url = `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeIds}`
        break

      case 'images':
        if (!nodeIds) {
          return NextResponse.json({ error: 'nodeIds is required for type=images' }, { status: 400 })
        }
        url = `https://api.figma.com/v1/images/${fileId}?ids=${nodeIds}&format=${format}&scale=${scale}`
        break

      case 'file':
      default:
        url = `https://api.figma.com/v1/files/${fileId}`
        break
    }

    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': accessToken,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Figma API error: ${response.statusText}`, details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Figma API proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from Figma API', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

