import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';

interface LaserScannerProps {
  color?: string;
  glowColor?: string;
  direction?: 'horizontal' | 'vertical';
  duration?: number;
  startFrame?: number;
  style?: React.CSSProperties;
}

export const LaserScanner: React.FC<LaserScannerProps> = ({
  color = CINEMATIC_BRAND.colors.emeraldLaser,
  glowColor = CINEMATIC_BRAND.colors.emeraldGlow,
  direction = 'vertical',
  duration = 45,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const activeFrame = Math.max(0, frame - startFrame);
  const cycle = (activeFrame % duration) / duration;

  const positionPercent = cycle * 100;

  if (direction === 'vertical') {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 20,
          ...style,
        }}
      >
        {/* Laser Line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${positionPercent}%`,
            height: 2,
            backgroundColor: color,
            boxShadow: `0 0 15px 3px ${color}, 0 0 35px 8px ${glowColor}`,
          }}
        />

        {/* Trailing Scan Flare Gradient */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${Math.max(0, positionPercent - 15)}%`,
            height: '15%',
            background: `linear-gradient(to bottom, transparent, ${glowColor})`,
            opacity: 0.35,
          }}
        />
      </div>
    );
  }

  // Horizontal sweep
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 20,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${positionPercent}%`,
          width: 2,
          backgroundColor: color,
          boxShadow: `0 0 15px 3px ${color}, 0 0 35px 8px ${glowColor}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${Math.max(0, positionPercent - 15)}%`,
          width: '15%',
          background: `linear-gradient(to right, transparent, ${glowColor})`,
          opacity: 0.35,
        }}
      />
    </div>
  );
};
