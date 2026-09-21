import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface TextOverlayPillProps {
  category?: string;
  title: string;
  frameStart?: number;
  frameEnd?: number;
  position?: 'bottom' | 'top';
  accentColor?: string;
}

export const TextOverlayPill: React.FC<TextOverlayPillProps> = ({
  category,
  title,
  frameStart = 10,
  frameEnd = 65,
  position = 'bottom',
  accentColor = '#F59E0B',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < frameStart || frame > frameEnd) return null;

  // Entrance spring
  const entranceProgress = spring({
    frame: frame - frameStart,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });

  // Exit fade out in the last 8 frames
  const exitOpacity = interpolate(
    frame,
    [frameEnd - 8, frameEnd],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const translateY = interpolate(entranceProgress, [0, 1], [position === 'bottom' ? 30 : -30, 0]);
  const scale = interpolate(entranceProgress, [0, 1], [0.92, 1.0]);
  const opacity = Math.min(entranceProgress, exitOpacity);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        [position]: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9000,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          padding: '9px 24px',
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(16px)',
          borderRadius: 14,
          boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12)',
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}
      >
        {category && (
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.14em',
              color: accentColor,
              textTransform: 'uppercase',
            }}
          >
            {category}
          </div>
        )}

        <div
          style={{
            fontSize: 21,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
