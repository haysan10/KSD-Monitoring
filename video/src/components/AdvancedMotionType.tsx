import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';

interface CharRevealProps {
  text: string;
  startFrame?: number;
  staggerFrames?: number;
  fontSize?: number;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Letter-by-letter kinetic rolling typography with spring overshoot
 */
export const CharReveal: React.FC<CharRevealProps> = ({
  text,
  startFrame = 0,
  staggerFrames = 2,
  fontSize = 64,
  color = BRAND.colors.textDark,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');
  let charCounter = 0;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: `${fontSize * 0.28}px`,
        rowGap: `${fontSize * 0.08}px`,
        fontFamily: BRAND.fonts.display,
        fontSize,
        fontWeight: 900,
        color,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        ...style,
      }}
    >
      {words.map((word, wIdx) => {
        const wordChars = word.split('');
        return (
          <span
            key={wIdx}
            style={{
              display: 'inline-flex',
              whiteSpace: 'nowrap',
            }}
          >
            {wordChars.map((char, cIdx) => {
              const charIndex = charCounter++;
              const charProgress = spring({
                frame: frame - (startFrame + charIndex * staggerFrames),
                fps,
                config: { damping: 13, stiffness: 160, mass: 0.6 },
              });

              const translateY = interpolate(charProgress, [0, 1], [100, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              const rotate = interpolate(charProgress, [0, 1], [15, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              const opacity = interpolate(charProgress, [0, 0.4, 1], [0, 1, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              return (
                <span
                  key={cIdx}
                  style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    paddingBottom: '0.12em',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      transform: `translateY(${translateY}%) rotate(${rotate}deg)`,
                      opacity,
                    }}
                  >
                    {char}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

interface TrackingExpansionProps {
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Text that expands its letter-spacing dynamically on impact
 */
export const TrackingExpansionText: React.FC<TrackingExpansionProps> = ({
  text,
  startFrame = 0,
  fontSize = 32,
  color = BRAND.colors.amberWarm,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.7 },
  });

  const tracking = interpolate(progress, [0, 1], [-0.05, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame - startFrame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontFamily: BRAND.fonts.mono,
        fontSize,
        fontWeight: 800,
        color,
        letterSpacing: `${tracking}em`,
        opacity,
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {text}
    </div>
  );
};

interface CurtainRevealProps {
  children: React.ReactNode;
  startFrame?: number;
  direction?: 'up' | 'left';
  style?: React.CSSProperties;
}

/**
 * Razor-sharp clipping curtain reveal
 */
export const CurtainReveal: React.FC<CurtainRevealProps> = ({
  children,
  startFrame = 0,
  direction = 'up',
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: BRAND.springs.snappy,
  });

  const clip = direction === 'up'
    ? `inset(${interpolate(progress, [0, 1], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}% 0 0 0)`
    : `inset(0 ${interpolate(progress, [0, 1], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}% 0 0)`;

  return (
    <div
      style={{
        clipPath: clip,
        WebkitClipPath: clip,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

interface EditorialBackdropProps {
  text: string;
  speed?: number;
  fontSize?: number;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Continuous smooth scrolling editorial backdrop running behind cards
 */
export const EditorialBackdrop: React.FC<EditorialBackdropProps> = ({
  text,
  speed = 1.2,
  fontSize = 140,
  color = 'rgba(15, 23, 42, 0.035)',
  style,
}) => {
  const frame = useCurrentFrame();
  const offset = (frame * speed) % 1200;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '300%',
        transform: `translate3d(${-offset}px, -50%, 0)`,
        fontFamily: BRAND.fonts.display,
        fontSize,
        fontWeight: 900,
        letterSpacing: '-0.04em',
        color,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
      }}
    >
      {`${text}   •   ${text}   •   ${text}   •   ${text}`}
    </div>
  );
};
