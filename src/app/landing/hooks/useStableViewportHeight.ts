import { useEffect, useRef } from 'react'

/** Stable inner height for section math (mobile URL bar). */
export function useStableViewportHeight() {
  const stableVhRef = useRef(800)

  useEffect(() => {
    const updateVh = () => {
      if (typeof window === 'undefined') return
      stableVhRef.current = window.visualViewport?.height ?? window.innerHeight
    }
    updateVh()
    window.addEventListener('resize', updateVh)
    window.visualViewport?.addEventListener('resize', updateVh)
    return () => {
      window.removeEventListener('resize', updateVh)
      window.visualViewport?.removeEventListener('resize', updateVh)
    }
  }, [])

  return stableVhRef
}
