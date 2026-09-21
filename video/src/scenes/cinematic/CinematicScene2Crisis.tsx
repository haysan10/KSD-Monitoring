import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';
import { CinematicCamera } from '../../components/cinematic/CinematicCamera';
import { CharReveal, TrackingExpansionText } from '../../components/AdvancedMotionType';
import { CyberGridFloor } from '../../components/cinematic/CyberGridFloor';
import { HolographicDeck } from '../../components/cinematic/HolographicDeck';

export const CinematicScene2Crisis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 Monolith Pop Springs
  const card1Spring = spring({ frame: frame - 18, fps, config: CINEMATIC_BRAND.springs.punchy });
  const card2Spring = spring({ frame: frame - 42, fps, config: CINEMATIC_BRAND.springs.punchy });
  const card3Spring = spring({ frame: frame - 68, fps, config: CINEMATIC_BRAND.springs.punchy });

  // Rotating Wireframe Kiln Angle
  const kilnRotation = (frame * 0.8) % 360;

  // Whip pan transition out (Frames 195 - 210)
  const whipX = interpolate(frame, [195, 210], [0, -1400], {
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
        shakeFrame={68}
        shakeIntensity={8}
        enableMotionBlur={true}
      >
        {/* Deep Cyber Grid Floor with Crimson Alert Tint */}
        <CyberGridFloor
          color={CINEMATIC_BRAND.colors.crimsonAlert}
          horizonColor={CINEMATIC_BRAND.colors.flameOrange}
          speed={1.2}
          opacity={0.2}
        />

        {/* Ambient Dark Threat Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 70% 50%, rgba(239, 68, 68, 0.12) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Main 2-Column Balanced Cinema Layout */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 100px',
            boxSizing: 'border-box',
            gap: 60,
            zIndex: 10,
          }}
        >
          {/* Left Column: Kinetic Warning Typography */}
          <div
            style={{
              width: 540,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <TrackingExpansionText
              text="⚠️ OPERATIONAL VULNERABILITY"
              startFrame={5}
              fontSize={18}
              color={CINEMATIC_BRAND.colors.crimsonAlert}
            />

            <CharReveal
              text="LEGACY TOOLS RISK COSTLY SLIPS."
              startFrame={12}
              staggerFrames={2}
              fontSize={64}
              color="#FFFFFF"
              style={{
                textShadow: '0 8px 30px rgba(0,0,0,0.8)',
              }}
            />

            <div
              style={{
                fontFamily: CINEMATIC_BRAND.fonts.body,
                fontSize: 20,
                color: CINEMATIC_BRAND.colors.textMuted,
                lineHeight: 1.5,
                marginTop: 8,
              }}
            >
              Corrupted spreadsheet formulas, communication blackouts, and unbudgeted plant downtime.
            </div>

            {/* Live Threat Telemetry Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1.5px solid rgba(239, 68, 68, 0.4)',
                borderRadius: 10,
                padding: '10px 18px',
                marginTop: 10,
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)',
              }}
            >
              <span style={{ fontSize: 18 }}>🔴</span>
              <span style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 13, color: '#FCA5A5', fontWeight: 700 }}>
                RISK STATUS: HIGH UNPLANNED OVERRUN PROBABILITY
              </span>
            </div>
          </div>

          {/* Right Column: 3 Floating 3D Holographic Threat Decks */}
          <div
            style={{
              flex: 1,
              maxWidth: 580,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              perspective: 1000,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Threat Card 1: Formula Corruption */}
            <div
              style={{
                transform: `scale(${card1Spring}) translateY(${interpolate(card1Spring, [0, 1], [60, 0])}px) rotateX(6deg) rotateY(-4deg)`,
              }}
            >
              <HolographicDeck
                title="Spreadsheet Formula Corruption"
                badge="#REF! SYNTAX ERROR"
                accentColor={CINEMATIC_BRAND.colors.crimsonAlert}
                glowColor={CINEMATIC_BRAND.colors.crimsonGlow}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      backgroundColor: 'rgba(239, 68, 68, 0.18)',
                      border: '1px solid #EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      color: '#EF4444',
                      fontWeight: 900,
                    }}
                  >
                    ✕
                  </div>
                  <div>
                    <div style={{ fontFamily: CINEMATIC_BRAND.fonts.display, fontWeight: 800, fontSize: 18, color: '#FFFFFF' }}>
                      Accidental Cell Overwrites
                    </div>
                    <div style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 12, color: '#F87171', marginTop: 4 }}>
                      Silent formula breakage renders S-Curve projections invalid.
                    </div>
                  </div>
                </div>
              </HolographicDeck>
            </div>

            {/* Threat Card 2: Reporting Lag */}
            <div
              style={{
                transform: `scale(${card2Spring}) translateY(${interpolate(card2Spring, [0, 1], [60, 0])}px) rotateX(4deg) rotateY(-2deg)`,
              }}
            >
              <HolographicDeck
                title="Field Communication Blackout"
                badge="+36H LATENCY"
                accentColor={CINEMATIC_BRAND.colors.amberCore}
                glowColor={CINEMATIC_BRAND.colors.amberGlow}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      backgroundColor: 'rgba(245, 158, 11, 0.18)',
                      border: '1px solid #F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                    }}
                  >
                    ⏱️
                  </div>
                  <div>
                    <div style={{ fontFamily: CINEMATIC_BRAND.fonts.display, fontWeight: 800, fontSize: 18, color: '#FFFFFF' }}>
                      Delayed Progress Visibility
                    </div>
                    <div style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 12, color: '#FBBF24', marginTop: 4 }}>
                      Paper notes trapped inside the blind-spot delay management response.
                    </div>
                  </div>
                </div>
              </HolographicDeck>
            </div>

            {/* Threat Card 3: Downtime Burn Rate */}
            <div
              style={{
                transform: `scale(${card3Spring}) translateY(${interpolate(card3Spring, [0, 1], [60, 0])}px) rotateX(2deg)`,
              }}
            >
              <HolographicDeck
                title="Critical Kiln Outage Cost"
                badge="$12,500 / HOUR"
                accentColor={CINEMATIC_BRAND.colors.flameOrange}
                glowColor="rgba(255, 87, 34, 0.4)"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      backgroundColor: 'rgba(255, 87, 34, 0.2)',
                      border: '1px solid #FF5722',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                    }}
                  >
                    🔥
                  </div>
                  <div>
                    <div style={{ fontFamily: CINEMATIC_BRAND.fonts.display, fontWeight: 800, fontSize: 18, color: '#FFFFFF' }}>
                      Catastrophic Kiln Downtime
                    </div>
                    <div style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 12, color: '#FB923C', marginTop: 4 }}>
                      Every missed overhaul deadline burns thousands of dollars per hour.
                    </div>
                  </div>
                </div>
              </HolographicDeck>
            </div>
          </div>
        </div>
      </CinematicCamera>
    </AbsoluteFill>
  );
};
