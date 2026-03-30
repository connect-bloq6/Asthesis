import { clamp } from './timeline'

export function drawCover(
  ctx: CanvasRenderingContext2D,
  source: HTMLVideoElement,
  dw: number,
  dh: number
) {
  const sw = source.videoWidth || 1
  const sh = source.videoHeight || 1
  const sAspect = sw / sh
  const dAspect = dw / dh
  let sx = 0,
    sy = 0,
    sWidth = sw,
    sHeight = sh
  if (sAspect > dAspect) {
    sWidth = sh * dAspect
    sx = (sw - sWidth) / 2
  } else {
    sHeight = sw / dAspect
    sy = (sh - sHeight) / 2
  }
  ctx.drawImage(source, sx, sy, sWidth, sHeight, 0, 0, dw, dh)
}

export function globalFrameToShotAndLocal(
  globalFrame: number,
  cumFrames: [number, number, number, number, number]
): { shot: 1 | 2 | 3 | 4; localFrame: number } {
  const total = cumFrames[4]
  const g = clamp(Math.round(globalFrame), 0, Math.max(0, total - 1))
  if (g < cumFrames[1]) return { shot: 1, localFrame: g - cumFrames[0] }
  if (g < cumFrames[2]) return { shot: 2, localFrame: g - cumFrames[1] }
  if (g < cumFrames[3]) return { shot: 3, localFrame: g - cumFrames[2] }
  return { shot: 4, localFrame: g - cumFrames[3] }
}
