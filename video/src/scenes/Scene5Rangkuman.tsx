import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { SceneCopy } from '../constants/copy';

interface Scene5RangkumanProps {
  copy: SceneCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene5Rangkuman: React.FC<Scene5RangkumanProps> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // Word 1: 0 - 40 frames (1.33s)
  // Word 2: 40 - 80 frames (1.33s)
  // Word 3: 80 - 120 frames (1.33s)
  let activeIndex = 0;
  let wordLocalFrame = frame;

  if (frame >= 80) {
    activeIndex = 2;
    wordLocalFrame = frame - 80;
  } else if (frame >= 40) {
    activeIndex = 1;
    wordLocalFrame = frame - 40;
  }

  const currentItem = copy.scene5.words[activeIndex];

  // Snappy punch scale on each word switch
  const punchScale = spring({
    frame: wordLocalFrame,
    fps,
    config: BRAND.springs.punchy,
  });

  // Background color mapping per phase
  let bg = BRAND.colors.bgCream;
  let textColor = BRAND.colors.textDark;
  let pillBg = BRAND.colors.amberSoft;
  let pillColor = BRAND.colors.amberWarm;

  if (currentItem.color === 'amber') {
    bg = BRAND.colors.amber;
    textColor = '#0F172A';
    pillBg = '#FFFFFF';
    pillColor = '#0F172A';
  } else if (currentItem.color === 'cobalt') {
    bg = BRAND.colors.cobalt;
    textColor = '#FFFFFF';
    pillBg = 'rgba(255, 255, 255, 0.2)';
    pillColor = '#FFFFFF';
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
        textAlign: 'center',
        overflow: 'hidden',
        transition: 'background-color 0.1s ease',
      }}
    >
      {/* Dynamic Count Pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          backgroundColor: pillBg,
          color: pillColor,
          padding: '6px 18px',
          borderRadius: 999,
          fontSize: isVertical ? 13 : 16,
          fontWeight: 800,
          fontFamily: BRAND.fonts.mono,
          letterSpacing: '0.08em',
          marginBottom: 24,
          transform: `scale(${punchScale})`,
        }}
      >
        <span>0{activeIndex + 1} / 03</span>
      </div>

      {/* Giant Kinetic Word */}
      <div
        style={{
          transform: `scale(${punchScale})`,
          fontFamily: BRAND.fonts.display,
          fontSize: isVertical ? 68 : 128,
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: textColor,
          lineHeight: 1.05,
          maxWidth: 1400,
        }}
      >
        {currentItem.text}
      </div>

      {/* Subtitle description */}
      <div
        style={{
          marginTop: 24,
          fontFamily: BRAND.fonts.display,
          fontSize: isVertical ? 18 : 28,
          fontWeight: 600,
          color: textColor,
          opacity: 0.85,
          letterSpacing: '-0.01em',
        }}
      >
        {currentItem.sub}
      </div>
    </AbsoluteFill>
  );
};
