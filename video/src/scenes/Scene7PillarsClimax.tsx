import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { Video60sCopy } from '../constants/copy';
import { CameraRig } from '../components/CameraRig';
import { CharReveal, TrackingExpansionText } from '../components/AdvancedMotionType';
import { SupergraphicBackdrop } from '../components/SupergraphicBackdrop';

interface Scene7Props {
  copy: Video60sCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene7PillarsClimax: React.FC<Scene7Props> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // 3 Distinct 50-frame Beats
  // Pillar 1: 0 - 50 frames (0.0s - 1.66s)
  // Pillar 2: 50 - 100 frames (1.66s - 3.33s)
  // Pillar 3: 100 - 150 frames (3.33s - 5.0s)
  let activePillarIndex = 0;
  if (frame >= 50 && frame < 100) activePillarIndex = 1;
  if (frame >= 100) activePillarIndex = 2;

  const currentPillar = copy.scene7.words[activePillarIndex];

  // Pillar snap animation on each cut
  const localFrame = frame % 50;
  const snapProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 11, stiffness: 200, mass: 0.5 },
  });

  // Background configurations
  const bgStyles = [
    { bg: BRAND.colors.bgCream, textColor: BRAND.colors.textDark, accent: BRAND.colors.amber, supergraphic: 'mobile-cover' as const },
    { bg: BRAND.colors.amber, textColor: '#0F172A', accent: '#FFFFFF', supergraphic: 'rays' as const },
    { bg: '#0F172A', textColor: '#FFFFFF', accent: BRAND.colors.amber, supergraphic: 'hero' as const },
  ];

  const currentStyle = bgStyles[activePillarIndex];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: currentStyle.bg,
        overflow: 'hidden',
        transition: 'background-color 0.05s linear',
      }}
    >
      <CameraRig
        move={{
          scale: [1, 1.08],
          rotateZ: activePillarIndex === 1 ? [-1.5, 1.5] : [1, -1],
        }}
        shakeFrame={activePillarIndex * 50}
      >
        {/* Dynamic Supergraphic Layer */}
        <SupergraphicBackdrop
          type={currentStyle.supergraphic}
          opacity={activePillarIndex === 1 ? 0.18 : 0.08}
          scale={1.3}
          rotationSpeed={activePillarIndex === 1 ? 0.4 : 0.15}
        />

        {/* Big Climax Kinetic Pillar Typography */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 40px',
            transform: `scale(${snapProgress})`,
            zIndex: 10,
          }}
        >
          {/* Step Pill Counter */}
          <div
            style={{
              backgroundColor: currentStyle.accent,
              color: currentStyle.bg,
              padding: '6px 20px',
              borderRadius: 999,
              fontFamily: BRAND.fonts.mono,
              fontWeight: 900,
              fontSize: isVertical ? 14 : 18,
              letterSpacing: '0.12em',
              marginBottom: 20,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            }}
          >
            PILLAR 0{activePillarIndex + 1} / 03
          </div>

          {/* Main Pillar Headline */}
          <div
            style={{
              fontFamily: BRAND.fonts.display,
              fontWeight: 900,
              fontSize: isVertical ? 54 : 96,
              color: currentStyle.textColor,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              textTransform: 'uppercase',
              textShadow: activePillarIndex === 2 ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
              maxWidth: isVertical ? 800 : 1300,
            }}
          >
            {currentPillar.text}
          </div>

          {/* Subtitle Telemetry */}
          <div
            style={{
              marginTop: 18,
              fontFamily: BRAND.fonts.body,
              fontSize: isVertical ? 20 : 28,
              fontWeight: 600,
              color: currentStyle.textColor,
              opacity: 0.85,
            }}
          >
            {currentPillar.sub}
          </div>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
