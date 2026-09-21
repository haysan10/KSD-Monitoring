import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface CameraMove {
  scale?: [number, number]; // [startScale, endScale]
  x?: [number, number];     // [startX, endX]
  y?: [number, number];     // [startY, endY]
  rotateX?: [number, number];
  rotateY?: [number, number];
  rotateZ?: [number, number];
  perspective?: number;
}

interface CameraRigProps {
  move?: CameraMove;
  children: React.ReactNode;
  style?: React.CSSProperties;
  shakeFrame?: number; // Optional frame where camera hits a beat and shakes
}

/**
 * Advanced 3D Camera Rig with Pan, Zoom, 3D Tilt, and Dynamic Parallax
 */
export const CameraRig: React.FC<CameraRigProps> = ({
  move = {},
  children,
  style,
  shakeFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const {
    scale = [1, 1],
    x = [0, 0],
    y = [0, 0],
    rotateX = [0, 0],
    rotateY = [0, 0],
    rotateZ = [0, 0],
    perspective = 1200,
  } = move;

  const currentScale = interpolate(frame, [0, durationInFrames], [scale[0], scale[1]], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentX = interpolate(frame, [0, durationInFrames], [x[0], x[1]], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentY = interpolate(frame, [0, durationInFrames], [y[0], y[1]], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentRotX = interpolate(frame, [0, durationInFrames], [rotateX[0], rotateX[1]], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentRotY = interpolate(frame, [0, durationInFrames], [rotateY[0], rotateY[1]], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentRotZ = interpolate(frame, [0, durationInFrames], [rotateZ[0], rotateZ[1]], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Camera Shake on specific beat hit (damps out quickly)
  let shakeOffset = 0;
  if (shakeFrame !== undefined && frame >= shakeFrame) {
    const decay = Math.exp(-(frame - shakeFrame) * 0.3);
    shakeOffset = Math.sin((frame - shakeFrame) * 1.5) * 6 * decay;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `translate3d(${currentX + shakeOffset}px, ${currentY + shakeOffset * 0.5}px, 0px) scale(${currentScale}) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) rotateZ(${currentRotZ}deg)`,
          transformOrigin: 'center center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
};
