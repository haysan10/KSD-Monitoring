import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';

interface AccentProps {
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
  delay?: number;
}

/**
 * Hand-drawn SVG Ellipse / Highlight Circle
 * Simulates an inspector or designer circling an important element on screen.
 */
export const HighlightCircle: React.FC<AccentProps> = ({
  color = BRAND.colors.amber,
  width = 220,
  height = 90,
  strokeWidth = 3.5,
  style,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  const strokeDashoffset = interpolate(progress, [0, 1], [600, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 90"
      fill="none"
      style={{
        overflow: 'visible',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <path
        d="M 15 45 C 15 15, 205 10, 205 45 C 205 80, 25 85, 22 52 C 20 28, 70 20, 110 20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={600}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  );
};

/**
 * Playful Hand-drawn Arrow pointing to an action or card
 */
export const AccentArrow: React.FC<AccentProps & { rotation?: number }> = ({
  color = BRAND.colors.orange,
  width = 120,
  height = 80,
  strokeWidth = 3.5,
  rotation = 0,
  style,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.7 },
  });

  const pathLength = 200;
  const dashOffset = interpolate(progress, [0, 1], [pathLength, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 80"
      fill="none"
      style={{
        overflow: 'visible',
        transform: `rotate(${rotation}deg) scale(${progress})`,
        transformOrigin: 'top left',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <path
        d="M 10 70 C 40 60, 70 50, 100 20 M 100 20 L 75 18 M 100 20 L 98 45"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
};

/**
 * Hand-drawn marker underline
 */
export const HandUnderline: React.FC<AccentProps> = ({
  color = BRAND.colors.amber,
  width = 300,
  height = 20,
  strokeWidth = 4,
  style,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.8 },
  });

  const len = 350;
  const dashOffset = interpolate(progress, [0, 1], [len, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 20"
      fill="none"
      style={{
        overflow: 'visible',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <path
        d="M 5 12 C 90 6, 210 16, 295 10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
};
