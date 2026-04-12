/**
 * Landing scroll → normalized timeline.
 * One scroll position maps to raw progress values; display frame (separate) maps to text/canvas sync.
 */

import {
  FRAME_STICKY_HYSTERESIS_PX,
  PART2_SCROLL_VH,
  PART3_SCROLL_VH,
  PART4_SCROLL_VH,
  SEQUENCE_SCROLL_VH,
} from './constants'

export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1)
  return t * t * (3 - 2 * t)
}

export type CumFrames = [number, number, number, number, number]

/** Part norms 0–1 from global display frame index (same basis as canvas). */
export function globalFrameToPartNorms(
  displayGlobal: number,
  cf: CumFrames
): { seqProgress: number; p2Norm: number; p3Norm: number; p4Norm: number } {
  const totalF = cf[4]
  if (totalF <= 0 || cf[1] <= 0) {
    return { seqProgress: 0, p2Norm: 0, p3Norm: 0, p4Norm: 0 }
  }
  const seqProgress = clamp(displayGlobal / cf[1], 0, 1)
  const p2Norm =
    cf[2] > cf[1]
      ? displayGlobal < cf[1]
        ? 0
        : displayGlobal >= cf[2]
          ? 1
          : (displayGlobal - cf[1]) / (cf[2] - cf[1])
      : 0
  const p3Norm =
    cf[3] > cf[2]
      ? displayGlobal < cf[2]
        ? 0
        : displayGlobal >= cf[3]
          ? 1
          : (displayGlobal - cf[2]) / (cf[3] - cf[2])
      : 0
  const p4Norm =
    cf[4] > cf[3] ? (displayGlobal < cf[3] ? 0 : (displayGlobal - cf[3]) / (cf[4] - cf[3])) : 0
  return { seqProgress, p2Norm, p3Norm, p4Norm }
}

/** @param sequenceStartPx Document Y where the frame sequence begins (defaults to one viewport = hero-only layout). */
export function computeLayoutPx(vh: number, sequenceStartPx?: number) {
  const sequenceStart = sequenceStartPx !== undefined ? sequenceStartPx : vh
  const part1Height = (SEQUENCE_SCROLL_VH / 100) * vh
  const part2Start = sequenceStart + part1Height
  const part2Height = (PART2_SCROLL_VH / 100) * vh
  const part3StartPx = part2Start + part2Height
  const part3HeightPx = (PART3_SCROLL_VH / 100) * vh
  const part4StartPx = part3StartPx + part3HeightPx
  const part4HeightPx = (PART4_SCROLL_VH / 100) * vh
  const frameSectionContentVh =
    100 + SEQUENCE_SCROLL_VH + PART2_SCROLL_VH + PART3_SCROLL_VH + PART4_SCROLL_VH
  /** Document Y where frame narrative scroll is consumed; sticky ends here (no extra release band). */
  const frameNarrativeEndPx = sequenceStart + (frameSectionContentVh / 100) * vh
  return {
    sequenceStart,
    part1Height,
    part2Start,
    part2Height,
    part3StartPx,
    part3HeightPx,
    part4StartPx,
    part4HeightPx,
    scrollOutStartPx: frameNarrativeEndPx,
    scrollOutEndPx: frameNarrativeEndPx,
  }
}

/** Raw scroll-derived progress (instant); used as targets for smoothing / frame target. */
export function scrollToRawProgress(scrollY: number, vh: number, sequenceStartPx?: number) {
  const L = computeLayoutPx(vh, sequenceStartPx)
  let part1Progress = 0
  let part2Progress = 0
  let part3Progress = 0
  let part4Progress = 0
  if (scrollY >= L.part2Start) {
    part2Progress = Math.min(1, (scrollY - L.part2Start) / L.part2Height)
    part1Progress = 1
  } else if (scrollY >= L.sequenceStart) {
    part1Progress = Math.min(1, (scrollY - L.sequenceStart) / L.part1Height)
  }
  if (scrollY >= L.part4StartPx) {
    part3Progress = 1
    part4Progress = Math.min(1, (scrollY - L.part4StartPx) / L.part4HeightPx)
  } else if (scrollY >= L.part3StartPx) {
    part3Progress = Math.min(1, (scrollY - L.part3StartPx) / L.part3HeightPx)
  }
  const hysF = FRAME_STICKY_HYSTERESIS_PX
  let frameStickyMode: 'before' | 'stuck' | 'after' = 'before'
  if (scrollY < L.sequenceStart - hysF) frameStickyMode = 'before'
  else if (scrollY > L.scrollOutEndPx + hysF) frameStickyMode = 'after'
  else frameStickyMode = 'stuck'

  return {
    ...L,
    part1Progress,
    part2Progress,
    part3Progress,
    part4Progress,
    frameStickyMode,
  }
}
