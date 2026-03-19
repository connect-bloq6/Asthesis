import { useEffect, useRef } from 'react'

/** Minimum height change (px) before we update stored viewport on mobile (avoids chrome expand/collapse churn). */
const MOBILE_VH_DELTA_THRESHOLD_PX = 80
/** Minimum relative height change (0–1) before we update on mobile. */
const MOBILE_VH_DELTA_RATIO = 0.12

/**
 * Stable inner height for section math.
 * Desktop: follows resize and visualViewport.resize.
 * Mobile: updates only on orientation change, width change, or a sufficiently large height change
 * so that browser chrome expand/collapse during scroll does not reflow the animation timeline.
 */
export function useStableViewportHeight() {
  const stableVhRef = useRef(800)
  const lastWidthRef = useRef(0)
  const lastHeightRef = useRef(0)

  useEffect(() => {
    const updateVh = (reason?: 'resize' | 'orientation') => {
      if (typeof window === 'undefined') return
      const vv = window.visualViewport
      const innerH = vv?.height ?? window.innerHeight
      const innerW = window.innerWidth
      const isMobile = innerW < 1024
      const prevH = stableVhRef.current
      const prevW = lastWidthRef.current

      if (reason === 'orientation') {
        stableVhRef.current = innerH
        lastWidthRef.current = innerW
        lastHeightRef.current = innerH
        return
      }

      if (isMobile) {
        const widthChanged = prevW !== 0 && Math.abs(innerW - prevW) > 2
        const heightDeltaPx = Math.abs(innerH - (lastHeightRef.current || innerH))
        const heightDeltaRatio = prevH > 0 ? heightDeltaPx / prevH : 1
        const significantHeightChange =
          heightDeltaPx >= MOBILE_VH_DELTA_THRESHOLD_PX || heightDeltaRatio >= MOBILE_VH_DELTA_RATIO
        if (widthChanged || significantHeightChange || lastHeightRef.current === 0) {
          stableVhRef.current = innerH
          lastHeightRef.current = innerH
        }
        lastWidthRef.current = innerW
      } else {
        stableVhRef.current = innerH
        lastWidthRef.current = innerW
        lastHeightRef.current = innerH
      }
    }

    const onResize = () => updateVh('resize')
    const onOrientation = () => updateVh('orientation')

    updateVh('resize')
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onOrientation)
    window.visualViewport?.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onOrientation)
      window.visualViewport?.removeEventListener('resize', onResize)
    }
  }, [])

  return stableVhRef
}
