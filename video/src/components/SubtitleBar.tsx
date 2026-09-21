import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND } from '../constants/brand';

interface SubtitleBarProps {
  text: string;
  lang?: 'id' | 'en';
  style?: React.CSSProperties;
}

export const SubtitleBar: React.FC<SubtitleBarProps> = ({
  text,
  lang = 'id',
  style,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 36,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(10px)',
        padding: '8px 20px',
        borderRadius: 999,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        maxWidth: '85%',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: BRAND.fonts.mono,
          fontSize: 10,
          fontWeight: 700,
          color: BRAND.colors.amber,
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          padding: '2px 6px',
          borderRadius: 4,
          textTransform: 'uppercase',
        }}
      >
        {lang.toUpperCase()}
      </span>
      <span
        style={{
          fontFamily: BRAND.fonts.display,
          fontSize: 14,
          fontWeight: 600,
          color: '#FFFFFF',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {text}
      </span>
    </div>
  );
};
