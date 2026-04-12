/** Landing scroll / animation tuning. Single source for section heights and video transition. */

export const GRADIENT_START_TIME = 3.2
export const GRADIENT_DURATION_MS = 2800

export const HERO_HEIGHT_THRESHOLD = 0.12

export const SEQUENCE_SCROLL_VH = 250
export const PART2_SCROLL_VH = 125
export const PART3_SCROLL_VH = 100
export const PART3_SCALE_START = 1.32
export const PART3_SCALE_END = 1
export const PART4_SCROLL_VH = 170
export const PART4_FRAME_EASING = 0.72

export const VIDEO_STICK_TOP_OFFSET_PX = 72
export const VIDEO_STICKY_SCROLL_VH_DESKTOP = 100
/** Larger span on mobile so transition completes and footer handoff is clean (no snap/trap). */
export const VIDEO_STICKY_SCROLL_VH_MOBILE = 58
/** Hysteresis (px) so frame sticky mode does not flicker at threshold crossings. */
export const FRAME_STICKY_HYSTERESIS_PX = 2
export const VIDEO_STICKY_HYSTERESIS_PX = 2
export const VIDEO_TRANSITION_WIDTH_END_PCT = 80
export const VIDEO_TRANSITION_BORDER_RADIUS_PX = 24
export const VIDEO_TRANSITION_SCALE_END = 0.9
export const VIDEO_TRANSITION_HEIGHT_SCALE_END = 0.4375
export const VIDEO_TRANSITION_PROGRESS_AT_50_PCT =
  (1 - 0.5) / (1 - VIDEO_TRANSITION_HEIGHT_SCALE_END)

export const PART4_ZOOM_OUT_END = 0.5
export const SYSTEM_TEXT_SCROLL_VH = 82
export const SYSTEM_TEXT_PART2_VH = 70
export const STYLE_TEXT_DELAY = 0.22
export const STYLE_TEXT_EASING = 1.45
export const STYLE_TEXT_PART2_VH = 95
export const DESIGN_FROM_BOTTOM_VH = 95
export const DESIGN_SCROLL_UP_VH = 95
export const DESIGN_VERTICAL_OFFSET_VH = 2
export const CARE_FROM_BOTTOM_VH = 95
export const CARE_SCROLL_UP_VH = 95
export const CARE_VERTICAL_OFFSET_VH = 4
export const INSIDE_FROM_BOTTOM_VH = 95
export const INSIDE_VERTICAL_OFFSET_VH = 2

export const SMOOTHING_TIME_CONSTANT = 0.06
/** Slower follow on mobile for smoother scroll perception and less jitter. */
export const SMOOTHING_TIME_CONSTANT_MOBILE = 0.11
export const SMOOTHED_PROGRESS_THROTTLE_DELTA = 0.002
export const SMOOTHED_PROGRESS_THROTTLE_MS = 80

export const ALPHA_FPS = 30
export const FRAME_DT = 1 / ALPHA_FPS
export const CATCHUP_MAX_FPS_DESKTOP = 180
export const CATCHUP_MAX_FPS_MOBILE = 60
export const CATCHUP_ACCEL_TAU = 0.09
export const STEP_MIN_INTERVAL_MS_DESKTOP = 0
export const STEP_MIN_INTERVAL_MS_MOBILE = 14
/** On mobile, skip care-video DOM writes when progress delta is below this (reduces jank). */
export const MOBILE_VIDEO_PROGRESS_WRITE_THROTTLE = 0.012
export const BOUNDARY_BLEND_FRAMES = 6
export const FRAME_EPS_SEC = 0.45 * FRAME_DT

export const DESKTOP_VIDEO_SCALE = 1.15

export const DEBUG_FRAME = false
