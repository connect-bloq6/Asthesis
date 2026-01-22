# Figma Integration Guide

This guide explains how to implement Figma designs and animations directly on your landing page.

## Setup

### 1. Get Your Figma Access Token

1. Go to Figma → Settings → Account
2. Scroll down to "Personal access tokens"
3. Click "Create new token"
4. Copy the token (you'll need it for API calls)

### 2. Get Your Figma File ID

1. Open your Figma file
2. Look at the URL: `https://www.figma.com/file/FILE_ID/File-Name`
3. The `FILE_ID` is what you need

### 3. Get Node IDs (Optional)

To fetch specific components/frames:

1. Select the element in Figma
2. In the right sidebar, find the "Instance" or "Component" section
3. The Node ID is shown there, or you can get it from the URL when inspecting

## Usage

### Basic Usage with FigmaComponent

```tsx
import { FigmaComponent } from '@/components/figma'

export default function MyPage() {
  return (
    <FigmaComponent
      fileId="your-figma-file-id"
      accessToken="your-access-token"
      nodeId="node-id-to-render"
      animation="fadeInUp"
    />
  )
}
```

### Using the useFigma Hook

```tsx
'use client'

import { useFigma } from '@/hooks/useFigma'

export default function MyComponent() {
  const { file, nodes, loading, error } = useFigma({
    fileId: 'your-figma-file-id',
    accessToken: 'your-access-token',
    nodeIds: ['node-id-1', 'node-id-2'], // Optional
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {nodes.map((node) => (
        <div key={node.id}>{node.name}</div>
      ))}
    </div>
  )
}
```

### Using Figma Animations

```tsx
import { FigmaAnimation, FigmaAnimations } from '@/components/figma'

export default function AnimatedSection() {
  return (
    <FigmaAnimation
      animation={FigmaAnimations.fadeInUp}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div>Your content here</div>
    </FigmaAnimation>
  )
}
```

### Custom Animations

```tsx
import { FigmaAnimation } from '@/components/figma'

export default function CustomAnimated() {
  return (
    <FigmaAnimation
      animation={{
        initial: { opacity: 0, scale: 0.8, rotate: -10 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1], // Custom easing
          delay: 0.2,
        },
      }}
    >
      <div>Custom animated content</div>
    </FigmaAnimation>
  )
}
```

### Extracting Design Tokens

```tsx
import { extractDesignTokens } from '@/lib/figma'
import { useFigma } from '@/hooks/useFigma'

export default function DesignTokensExample() {
  const { file } = useFigma({
    fileId: 'your-figma-file-id',
    accessToken: 'your-access-token',
  })

  if (!file) return null

  const tokens = extractDesignTokens(file)
  
  // Use tokens in your styles
  return (
    <div style={{ backgroundColor: tokens.colors['Button.primary'] }}>
      Styled with Figma tokens
    </div>
  )
}
```

## Environment Variables

For security, store your Figma access token in environment variables:

```env
# .env.local
NEXT_PUBLIC_FIGMA_ACCESS_TOKEN=your-token-here
NEXT_PUBLIC_FIGMA_FILE_ID=your-file-id-here
```

Then use it in your components:

```tsx
const accessToken = process.env.NEXT_PUBLIC_FIGMA_ACCESS_TOKEN!
const fileId = process.env.NEXT_PUBLIC_FIGMA_FILE_ID!
```

## Animation Presets

Available animation presets:
- `fadeIn` - Simple fade in
- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `slideInLeft` - Slide in from left
- `slideInRight` - Slide in from right
- `scaleIn` - Scale up from smaller
- `rotateIn` - Rotate in with fade

## Converting Figma Prototypes to Code

1. **Export animations**: Use Figma's prototype settings to understand timing
2. **Map to Framer Motion**: Use the `figmaAnimationToFramerMotion` utility
3. **Apply to components**: Use `FigmaAnimation` component

## Best Practices

1. **Cache Figma data**: Don't fetch on every render
2. **Use images for complex designs**: Export images for intricate designs
3. **Extract tokens**: Use design tokens for consistent styling
4. **Optimize images**: Use appropriate scale (1x, 2x, 3x) based on device
5. **Handle loading states**: Always show loading indicators
6. **Error handling**: Handle API errors gracefully

## Troubleshooting

### CORS Issues
- Figma API doesn't support CORS from browsers
- Use Next.js API routes as a proxy for production

### Rate Limiting
- Figma API has rate limits
- Implement caching to reduce API calls

### Node Not Found
- Verify the node ID is correct
- Ensure the node is visible in the file
- Check that your access token has permission

