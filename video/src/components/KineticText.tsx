import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';

interface KineticWordsProps {
  words: string[];
  startFrame?: number;
  staggerFrames?: number;
  fontSize?: number;
  color?: string;
  highlightWords?: Record<string, string>;
  align?: 'left' | 'center' | 'right';
  fontWeight?: number;
  lineHeight?: number;
  style?: React.CSSProperties;
}

/**
 * Slide-up word-by-word kinetic text with overflow masking
 */
export const KineticWords: React.FC<KineticWordsProps> = ({
  words,
  startFrame = 0,
  staggerFrames = 5,
  fontSize = 72,
  color = BRAND.colors.textDark,
  highlightWords = {},
  align = 'left',
  fontWeight = 800,
  lineHeight = 1.1,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        gap: `${fontSize * 0.28}px`,
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        textAlign: align,
        fontFamily: BRAND.fonts.display,
        fontSize,
        fontWeight,
        lineHeight,
        color,
        letterSpacing: '-0.03em',
        ...style,
      }}
    >
      {words.map((word, idx) => {
        const wordDelay = startFrame + idx * staggerFrames;
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: BRAND.springs.snappy,
        });

        const translateY = interpolate(progress, [0, 1], [110, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const opacity = interpolate(progress, [0, 0.6, 1], [0, 1, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const wordColor = highlightWords[word.toUpperCase()] || highlightWords[word] || color;

        return (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              paddingTop: '0.05em',
              paddingBottom: '0.28em',
              marginBottom: '-0.24em',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${translateY}%)`,
                opacity,
                color: wordColor,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
};

interface BigPunchTextProps {
  text: string;
  frameOffset?: number;
  fontSize?: number;
  color?: string;
  bgHighlight?: string;
  style?: React.CSSProperties;
}

/**
 * High-energy scale-in punch for key phrases
 */
export const BigPunchText: React.FC<BigPunchTextProps> = ({
  text,
  frameOffset = 0,
  fontSize = 96,
  color = BRAND.colors.textDark,
  bgHighlight,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - frameOffset,
    fps,
    config: BRAND.springs.punchy,
  });

  const opacity = interpolate(frame - frameOffset, [0, 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        fontFamily: BRAND.fonts.display,
        fontSize,
        fontWeight: 800,
        letterSpacing: '-0.04em',
        color,
        display: 'inline-block',
        backgroundColor: bgHighlight || 'transparent',
        padding: bgHighlight ? '6px 20px' : '0',
        borderRadius: bgHighlight ? '16px' : '0',
        lineHeight: 1,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
