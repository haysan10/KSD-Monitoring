import React from 'react';
import { OffthreadVideo, staticFile, interpolate, useCurrentFrame } from 'remotion';

interface CinematicVideoProps {
  src: string;
  startFrom?: number;
  zoomRange?: [number, number];
  opacity?: number;
  style?: React.CSSProperties;
}

/**
 * Cinematic video background player with smooth camera zoom
 */
export const CinematicVideoPlayer: React.FC<CinematicVideoProps> = ({
  src,
  startFrom = 0,
  zoomRange = [1, 1.15],
  opacity = 0.85,
  style,
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 240], [zoomRange[0], zoomRange[1]], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0F172A',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          opacity,
        }}
      >
        <OffthreadVideo
          src={staticFile(src)}
          startFrom={startFrom}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Warm Industrial Color Grading Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.65) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
