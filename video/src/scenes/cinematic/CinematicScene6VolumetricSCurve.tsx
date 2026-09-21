import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';
import { CinematicCamera } from '../../components/cinematic/CinematicCamera';
import { CharReveal, TrackingExpansionText } from '../../components/AdvancedMotionType';
import { VolumetricSCurve } from '../../components/cinematic/VolumetricSCurve';
import { CyberGridFloor } from '../../components/cinematic/CyberGridFloor';
import { HolographicDeck } from '../../components/cinematic/HolographicDeck';

export const CinematicScene6VolumetricSCurve: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Trajectory progress animation (0 to 1 over frames 15 - 120)
  const curveProgress = interpolate(frame, [15, 120], [0.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const progressPercent = Math.round(interpolate(curveProgress, [0.08, 1], [64, 88]));

  // Springs for cards
  const boardSpring = spring({ frame: frame - 10, fps, config: CINEMATIC_BRAND.springs.cinematicDolly });
  const kpiSpring = spring({ frame: frame - 40, fps, config: CINEMATIC_BRAND.springs.punchy });

  // Whip transition out (Frames 255 - 270)
  const whipX = interpolate(frame, [255, 270], [0, -1400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: CINEMATIC_BRAND.colors.bgVoid, overflow: 'hidden' }}>
      <CinematicCamera
        move={{
          scale: 1,
          z: 0,
          rotateX: [1, -1],
          rotateY: [-2, 2],
          x: whipX,
        }}
        shakeFrame={120}
        shakeIntensity={7}
        enableMotionBlur={true}
      >
        {/* Cyber Grid Ground with Cyber Cyan Energy */}
        <CyberGridFloor
          color={CINEMATIC_BRAND.colors.cyberCyan}
          horizonColor={CINEMATIC_BRAND.colors.cyberBlue}
          speed={1.0}
          opacity={0.3}
        />

        {/* 2-Column Wide Cinematic Command Matrix Layout */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 80px',
            boxSizing: 'border-box',
            gap: 50,
            zIndex: 10,
          }}
        >
          {/* Left Column: Kinetic Typography & Holographic KPI Readouts */}
          <div
            style={{
              width: 500,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div>
              <TrackingExpansionText
                text="📈 EARNED VALUE MANAGEMENT"
                startFrame={5}
                fontSize={18}
                color={CINEMATIC_BRAND.colors.cyberCyan}
              />

              <CharReveal
                text="REAL-TIME S-CURVE MATRIX."
                startFrame={10}
                staggerFrames={2}
                fontSize={56}
                color="#FFFFFF"
                style={{
                  textShadow: '0 8px 30px rgba(0,0,0,0.8), 0 0 25px rgba(6, 182, 212, 0.35)',
                  marginTop: 6,
                }}
              />

              <div
                style={{
                  fontFamily: CINEMATIC_BRAND.fonts.body,
                  fontSize: 18,
                  color: CINEMATIC_BRAND.colors.textMuted,
                  marginTop: 8,
                }}
              >
                Algorithmic schedule variance and restart projection updated in real-time.
              </div>
            </div>

            {/* Holographic KPI Block 1: Actual Progress */}
            <div
              style={{
                transform: `scale(${Math.min(1, kpiSpring)})`,
                opacity: kpiSpring,
                display: 'flex',
                gap: 16,
              }}
            >
              <div style={{ flex: 1 }}>
                <HolographicDeck
                  title="Cumulative Progress"
                  badge="AHEAD"
                  accentColor={CINEMATIC_BRAND.colors.amberCore}
                  glowColor={CINEMATIC_BRAND.colors.amberGlow}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span
                      style={{
                        fontFamily: CINEMATIC_BRAND.fonts.display,
                        fontWeight: 900,
                        fontSize: 48,
                        color: CINEMATIC_BRAND.colors.amberCore,
                        lineHeight: 1,
                      }}
                    >
                      {progressPercent}%
                    </span>
                    <span style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 13, color: '#94A3B8' }}>
                      / 85.6% Base
                    </span>
                  </div>
                </HolographicDeck>
              </div>

              {/* Holographic KPI Block 2: Variance */}
              <div style={{ flex: 1.2 }}>
                <HolographicDeck
                  title="Schedule Variance"
                  badge="SPI 1.03"
                  accentColor="#10B981"
                  glowColor="rgba(16, 185, 129, 0.4)"
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontFamily: CINEMATIC_BRAND.fonts.display,
                        fontWeight: 900,
                        fontSize: 28,
                        color: '#34D399',
                        lineHeight: 1.1,
                      }}
                    >
                      +2.4% Ahead
                    </span>
                    <span style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 11, color: '#A7F3D0', marginTop: 4 }}>
                      Predicted Restart: On Schedule
                    </span>
                  </div>
                </HolographicDeck>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Volumetric S-Curve Chart */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              transform: `scale(${Math.min(1, boardSpring)})`,
              transformStyle: 'preserve-3d',
            }}
          >
            <VolumetricSCurve
              width={900}
              height={500}
              curveProgress={curveProgress}
              currentPercent={progressPercent}
              varianceText="+2.4% (Ahead of Schedule)"
              spiText="1.03 (Optimal Pace)"
            />
          </div>
        </div>
      </CinematicCamera>
    </AbsoluteFill>
  );
};
