#!/usr/bin/env bash
# Convert a video to PNG frames for scroll-driven playback.
# Usage: ./scripts/video-to-frames.sh [video_path] [output_dir] [num_frames]
# Example: ./scripts/video-to-frames.sh public/videos/Asthesis_Intro_video.webm public/hero-frames 80

set -e
VIDEO="${1:-public/videos/Asthesis_Intro_video.webm}"
OUTDIR="${2:-public/hero-frames}"
NUM_FRAMES="${3:-80}"

mkdir -p "$OUTDIR"
# Get video duration; extract N frames evenly by setting rate = N/duration
duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$VIDEO" 2>/dev/null || echo "5")
fps=$(echo "scale=2; $NUM_FRAMES / $duration" | bc 2>/dev/null || echo "16")
# -r $fps -t $duration gives ~N frames; -vframes to cap exactly
vf="scale=iw:ih:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2"
ffmpeg -y -i "$VIDEO" -r "$fps" -t "$duration" -vf "$vf" -vframes "$NUM_FRAMES" -q:v 2 "$OUTDIR/frame-%d.png"
echo "Exported $NUM_FRAMES frames to $OUTDIR (frame-1.png .. frame-${NUM_FRAMES}.png)"
