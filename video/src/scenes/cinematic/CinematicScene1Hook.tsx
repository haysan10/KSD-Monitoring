import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';
import { CinematicCamera } from '../../components/cinematic/CinematicCamera';
import { CinematicVideoPlayer } from '../../components/CinematicVideoPlayer';
import { CharReveal, TrackingExpansionText } from '../../components/AdvancedMotionType';
import { CyberGridFloor } from '../../components/cinematic/CyberGridFloor';

export const CinematicScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPhase2 = frame >= 120; // Cut at 4.0s (120f)
  const amberSnap = spring({
    frame: frame - 120,
    fps,
    config: CINEMATIC_BRAND.springs.punchy,
  });

  // Dynamic Camera Movement
  const whipX = interpolate(frame, [220, 240], [0, -1400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Anamorphic Letterbox Bars (expand open)
  const letterboxHeight = interpolate(frame, [0, 40], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: CINEMATIC_BRAND.colors.bgVoid, overflow: 'hidden' }}>
      <CinematicCamera
        move={{
          scale: 1,
          z: 0,
          rotateX: isPhase2 ? [-1, 1] : [1.5, -1],
          rotateY: isPhase2 ? [0, 0] : [-2, 2],
          x: whipX,
        }}
        shakeFrame={120}
        shakeIntensity={12}
        enableMotionBlur={true}
      >
        {/* Phase 1: Real Kiln Video + Cyber HUD */}
        {!isPhase2 && (
          <>
            <CinematicVideoPlayer
              src="videos/hero-kiln.mp4"
              startFrom={0}
              zoomRange={[1, 1.04]}
              opacity={0.7}
            />

            {/* Subtle Amber Heat Haze Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 87, 34, 0.25) 0%, rgba(6, 9, 17, 0.9) 75%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* Corner Cybernetic HUD Crosshairs */}
            <div
              style={{
                position: 'absolute',
                inset: 40,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                pointerEvents: 'none',
              }}
            >
              <div style={{ position: 'absolute', top: 12, left: 16, fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 11, color: CINEMATIC_BRAND.colors.amberCore, letterSpacing: '0.1em' }}>
                REC ● 1400°C KILN CORE
              </div>
              <div style={{ position: 'absolute', top: 12, right: 16, fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 11, color: '#94A3B8' }}>
                SHELL DIA: 4.8M • ROT: 3.5 RPM
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: 16, fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 11, color: CINEMATIC_BRAND.colors.crimsonAlert }}>
                NETWORK STATUS: ZERO COVERAGE [0%]
              </div>
              <div style={{ position: 'absolute', bottom: 12, right: 16, fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 11, color: '#94A3B8' }}>
                CAM RIG: 35MM ANAMORPHIC
              </div>
            </div>

            {/* Centered Massive Kinetic Typography */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                zIndex: 20,
                padding: '0 60px',
              }}
            >
              <TrackingExpansionText
                text="⚡ INDUSTRIAL OVERHAUL REALITY"
                startFrame={8}
                fontSize={18}
                color={CINEMATIC_BRAND.colors.amberCore}
                style={{ marginBottom: 20 }}
              />

              <CharReveal
                text="INSIDE THE STEEL KILN."
                startFrame={15}
                staggerFrames={2}
                fontSize={88}
                color="#FFFFFF"
                style={{
                  textShadow: '0 10px 40px rgba(0,0,0,0.9), 0 0 30px rgba(245, 158, 11, 0.4)',
                  maxWidth: 1300,
                }}
              />

              <div
                style={{
                  marginTop: 24,
                  fontFamily: CINEMATIC_BRAND.fonts.mono,
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.85)',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(12px)',
                  padding: '8px 24px',
                  borderRadius: 8,
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
                }}
              >
                1400°C HEAVY STEEL SHELL • CELLULAR SIGNALS CUT OFF COMPLETELY
              </div>
            </div>
          </>
        )}

        {/* Phase 2: Explosive Flame Blast (120 - 240 frames) */}
        {isPhase2 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#0A0604',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 30,
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Cyber Grid Ground */}
            <CyberGridFloor color="#FF5722" horizonColor="#F59E0B" speed={2.5} opacity={0.35} />

            {/* Glowing Magma Core Radial Orb */}
            <div
              style={{
                position: 'absolute',
                width: 900,
                height: 900,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 87, 34, 0.35) 0%, rgba(245, 158, 11, 0.1) 40%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Inner Content with Safe Spring Entrance */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${Math.min(1.02, amberSnap)})`,
                zIndex: 10,
                padding: '0 60px',
              }}
            >
              {/* Crossed Signal Holographic Emblem */}
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 87, 34, 0.15)',
                  border: '2px solid #FF5722',
                  boxShadow: '0 0 40px rgba(255, 87, 34, 0.6), inset 0 0 20px rgba(255, 87, 34, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                  <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                  <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
                  <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" />
                </svg>
              </div>

              <CharReveal
                text="ZERO NETWORK SIGNAL."
                startFrame={122}
                staggerFrames={2}
                fontSize={84}
                color="#FFFFFF"
                style={{
                  textShadow: '0 10px 50px rgba(255, 87, 34, 0.7)',
                  maxWidth: 1200,
                }}
              />

              <TrackingExpansionText
                text="OFFLINE IN THE BLIND-SPOT • MISSION CANNOT STOP"
                startFrame={135}
                fontSize={20}
                color="#FFA726"
                style={{ marginTop: 20 }}
              />
            </div>
          </div>
        )}
      </CinematicCamera>

      {/* Cinematic Anamorphic Letterbox Bars */}
      {letterboxHeight > 0 && (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: letterboxHeight, backgroundColor: '#000000', zIndex: 100 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: letterboxHeight, backgroundColor: '#000000', zIndex: 100 }} />
        </>
      )}
    </AbsoluteFill>
  );
};
