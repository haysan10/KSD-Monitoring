import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';
import { CinematicCamera } from '../../components/cinematic/CinematicCamera';
import { CyberGridFloor } from '../../components/cinematic/CyberGridFloor';

export const CinematicScene7Staccato: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 Distinct 50-frame Beats
  let activePillarIndex = 0;
  if (frame >= 50 && frame < 100) activePillarIndex = 1;
  if (frame >= 100) activePillarIndex = 2;

  const localFrame = frame % 50;
  const snapSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 260, mass: 0.5 },
  });

  const pillars = [
    {
      title: 'OFFLINE-FIRST PWA',
      subtitle: 'BLIND-SPOT MUTATION QUEUE • LOCAL INDEXEDDB',
      bg: '#060911',
      textColor: '#FFFFFF',
      accent: CINEMATIC_BRAND.colors.amberCore,
      gridColor: '#F59E0B',
      horizon: '#FF5722',
    },
    {
      title: '3-STAGE QC AUDIT',
      subtitle: 'ZERO-MISKEYING PHOTO PROOF • INSTANT VERIFICATION',
      bg: '#991B1B',
      textColor: '#FFFFFF',
      accent: '#FEF3C7',
      gridColor: '#EF4444',
      horizon: '#F59E0B',
    },
    {
      title: 'MATHEMATICAL S-CURVE',
      subtitle: 'REAL-TIME EARNED VALUE • ZERO DOWNTIME SLIP',
      bg: '#082F49',
      textColor: '#FFFFFF',
      accent: '#38BDF8',
      gridColor: '#0284C7',
      horizon: '#06B6D4',
    },
  ];

  const current = pillars[activePillarIndex];

  return (
    <AbsoluteFill style={{ backgroundColor: current.bg, overflow: 'hidden' }}>
      <CinematicCamera
        move={{
          scale: 1,
          rotateZ: activePillarIndex === 1 ? [-1, 1] : [1, -1],
        }}
        shakeFrame={activePillarIndex * 50}
        shakeIntensity={10}
        enableMotionBlur={true}
      >
        {/* Dynamic Cyber Ground */}
        <CyberGridFloor
          color={current.gridColor}
          horizonColor={current.horizon}
          speed={3.0}
          opacity={0.35}
        />

        {/* Massive Full-Bleed Kinetic Monolith */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 60px',
            transform: `scale(${Math.min(1.02, snapSpring)})`,
            zIndex: 10,
          }}
        >
          {/* Pillar Index Pill */}
          <div
            style={{
              backgroundColor: current.accent,
              color: '#0F172A',
              padding: '8px 24px',
              borderRadius: 999,
              fontFamily: CINEMATIC_BRAND.fonts.mono,
              fontWeight: 900,
              fontSize: 15,
              letterSpacing: '0.15em',
              marginBottom: 24,
              boxShadow: `0 0 25px ${current.accent}`,
            }}
          >
            PILLAR 0{activePillarIndex + 1} / 03
          </div>

          {/* Main Kinetic Headline */}
          <div
            style={{
              fontFamily: CINEMATIC_BRAND.fonts.display,
              fontWeight: 900,
              fontSize: 84,
              color: current.textColor,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              textTransform: 'uppercase',
              textShadow: '0 15px 50px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.2)',
              maxWidth: 1400,
            }}
          >
            {current.title}
          </div>

          {/* Subtitle Telemetry */}
          <div
            style={{
              marginTop: 24,
              fontFamily: CINEMATIC_BRAND.fonts.mono,
              fontSize: 22,
              fontWeight: 700,
              color: current.accent,
              letterSpacing: '0.08em',
              textShadow: '0 4px 15px rgba(0,0,0,0.6)',
            }}
          >
            {current.subtitle}
          </div>
        </div>
      </CinematicCamera>
    </AbsoluteFill>
  );
};
