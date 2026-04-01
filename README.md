# Asthesis: Next.js + Three.js Project

An immersive 3D web experience built with Next.js 14 and Three.js (React Three Fiber).

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
│
├── components/
│   ├── canvas/             # Three.js/R3F components
│   │   ├── Scene.tsx       # Main 3D scene
│   │   └── models/         # 3D model components
│   │       └── ExampleModel.tsx
│   │
│   └── ui/                 # UI components (HTML/React)
│       └── LoadingScreen.tsx
│
├── hooks/                  # Custom React hooks
│   └── useThreeHelpers.ts  # Three.js related hooks
│
├── lib/                    # Utility libraries
│   └── three/
│       └── utils.ts        # Three.js helpers
│
├── shaders/                # GLSL shaders
│   └── example/
│       ├── vertex.glsl
│       └── fragment.glsl
│
├── types/                  # TypeScript types
│   └── three.d.ts          # Three.js type extensions
│
└── constants/              # App constants
    └── index.ts

public/
├── models/                 # 3D model files (GLTF, GLB, etc.)
├── textures/               # Texture images
└── hdri/                   # Environment maps
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **3D Engine:** Three.js with React Three Fiber
- **Helpers:** @react-three/drei (useful R3F helpers)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `three` | 3D graphics library |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Useful helpers for R3F |
| `tailwindcss` | Utility-first CSS |

## 🎨 Adding 3D Models

1. Place your model files (`.gltf`, `.glb`) in `public/models/`
2. Create a component in `src/components/canvas/models/`
3. Use `useGLTF` from `@react-three/drei` to load models:

```tsx
import { useGLTF } from '@react-three/drei'

export default function MyModel() {
  const { scene } = useGLTF('/models/my-model.glb')
  return <primitive object={scene} />
}
```

## 🌐 Environment

Create a `.env.local` file for environment variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📄 License

Private project - All rights reserved.

