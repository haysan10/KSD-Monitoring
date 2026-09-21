import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface CinematicCameraMove {
  x?: number | [number, number];
  y?: number | [number, number];
  z?: number | [number, number];
  scale?: number | [number, number];
  rotateX?: number | [number, number];
  rotateY?: number | [number, number];
  rotateZ?: number | [number, number];
}

interface CinematicCameraProps {
  children: React.ReactNode;
  move?: CinematicCameraMove;
  shakeFrame?: number;
  shakeIntensity?: number;
  enableMotionBlur?: boolean;
  style?: React.CSSProperties;
}

export const CinematicCamera: React.FC<CinematicCameraProps> = ({
  children,
  move = {},
  shakeFrame,
  shakeIntensity = 8,
  enableMotionBlur = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Helper to safely resolve a number or a [start, end] range
  const resolveProp = (
    val: number | [number, number] | undefined,
    defaultVal: number,
    targetFrame: number = frame
  ): number => {
    if (val === undefined) return defaultVal;
    if (typeof val === 'number') return val;
    return interpolate(targetFrame, [0, durationInFrames], val, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  const currentX = resolveProp(move.x, 0, frame);
  const currentY = resolveProp(move.y, 0, frame);
  const currentZ = resolveProp(move.z, 0, frame);
  const currentScale = resolveProp(move.scale, 1, frame);
  const currentRotX = resolveProp(move.rotateX, 0, frame);
  const currentRotY = resolveProp(move.rotateY, 0, frame);
  const currentRotZ = resolveProp(move.rotateZ, 0, frame);

  // Velocity calculation for dynamic motion blur
  const prevX = resolveProp(move.x, 0, frame - 1);
  const prevY = resolveProp(move.y, 0, frame - 1);
  const velocity = Math.hypot(currentX - prevX, currentY - prevY);
  const blurAmount = enableMotionBlur ? Math.min(16, velocity * 0.4) : 0;

  // Camera shake simulation (decays smoothly over 18 frames)
  let shakeX = 0;
  let shakeY = 0;
  let shakeRot = 0;
  if (shakeFrame !== undefined && frame >= shakeFrame && frame < shakeFrame + 18) {
    const elapsed = frame - shakeFrame;
    const decay = interpolate(elapsed, [0, 18], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    shakeX = Math.sin(elapsed * 2.8) * shakeIntensity * decay;
    shakeY = Math.cos(elapsed * 3.2) * shakeIntensity * decay;
    shakeRot = Math.sin(elapsed * 2.5) * (shakeIntensity * 0.1) * decay;
  }

  const finalX = currentX + shakeX;
  const finalY = currentY + shakeY;
  const finalRotZ = currentRotZ + shakeRot;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        perspective: 1200,
        perspectiveOrigin: '50% 50%',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `translate3d(${finalX}px, ${finalY}px, ${currentZ}px) scale(${currentScale}) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) rotateZ(${finalRotZ}deg)`,
          filter: blurAmount > 1.5 ? `blur(${blurAmount.toFixed(1)}px)` : undefined,
          willChange: 'transform, filter',
        }}
      >
        {children}
      </div>
    </div>
  );
};
