import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';
import { CinematicCamera } from '../../components/cinematic/CinematicCamera';
import { CyberGridFloor } from '../../components/cinematic/CyberGridFloor';
import { SupergraphicBackdrop } from '../../components/SupergraphicBackdrop';

export const CinematicScene8Monolith: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.8 },
  });

  const ctaSpring = spring({
    frame: frame - 35,
    fps,
    config: CINEMATIC_BRAND.springs.punchy,
  });

  // Breathing pulse on CTA button
  const pulse = 1 + Math.sin(Math.max(0, frame - 55) * 0.16) * 0.035;

  return (
    <AbsoluteFill style={{ backgroundColor: CINEMATIC_BRAND.colors.bgVoid, overflow: 'hidden' }}>
      <CinematicCamera
        move={{
          scale: 1,
          z: 0,
          rotateX: [1, -0.5],
          rotateY: [-1, 1],
        }}
        shakeFrame={35}
        shakeIntensity={6}
        enableMotionBlur={true}
      >
        {/* Cyber Grid Floor Ground */}
        <CyberGridFloor
          color={CINEMATIC_BRAND.colors.amberCore}
          horizonColor={CINEMATIC_BRAND.colors.flameOrange}
          speed={0.8}
          opacity={0.3}
        />

        {/* Ambient Volumetric Sunburst Flare */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1000,
            height: 1000,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(255, 87, 34, 0.08) 45%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Spinning Sunburst Rays in Background */}
        <SupergraphicBackdrop type="rays" opacity={0.16} rotationSpeed={0.3} scale={1.4} />

        {/* Central Monolith Deck */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            transform: `scale(${logoSpring})`,
            zIndex: 10,
            padding: '0 40px',
          }}
        >
          {/* Official Brand Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              filter: 'drop-shadow(0 15px 35px rgba(245, 158, 11, 0.45))',
            }}
          >
            <Img
              src={staticFile('branding/trunova-logo-white.svg')}
              style={{
                height: 105,
                width: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Premium Tagline */}
          <div
            style={{
              fontFamily: CINEMATIC_BRAND.fonts.display,
              fontSize: 34,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textShadow: '0 6px 20px rgba(0,0,0,0.8)',
              marginBottom: 10,
            }}
          >
            Kiln Shutdown & Overhaul Intelligence
          </div>

          {/* Subtitle Telemetry */}
          <div
            style={{
              fontFamily: CINEMATIC_BRAND.fonts.body,
              fontSize: 20,
              color: CINEMATIC_BRAND.colors.textMuted,
              maxWidth: 720,
              lineHeight: 1.4,
            }}
          >
            Command your cement rotary kiln overhaul with real-time data precision.
          </div>

          {/* Floating High-Impact Launch Button */}
          <div
            style={{
              marginTop: 36,
              transform: `scale(${Math.min(1.02, ctaSpring * pulse)})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                backgroundColor: CINEMATIC_BRAND.colors.amberCore,
                color: '#0F172A',
                fontFamily: CINEMATIC_BRAND.fonts.display,
                fontWeight: 900,
                fontSize: 24,
                padding: '16px 44px',
                borderRadius: 20,
                boxShadow: '0 20px 50px rgba(245, 158, 11, 0.5), 0 0 35px rgba(245, 158, 11, 0.4)',
                border: '2px solid #FCD34D',
                letterSpacing: '-0.02em',
                cursor: 'pointer',
              }}
            >
              <span>Launch Trunova Today</span>
              <span style={{ fontSize: 26, transform: 'translateX(2px)' }}>→</span>
            </div>

            {/* Glowing Webapp URL Badge */}
            <div
              style={{
                fontFamily: CINEMATIC_BRAND.fonts.mono,
                fontSize: 14,
                fontWeight: 700,
                color: '#94A3B8',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '8px 20px',
                borderRadius: 10,
                border: '1px solid rgba(6, 182, 212, 0.35)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>🌐</span>
              <span style={{ color: CINEMATIC_BRAND.colors.cyberCyan }}>trunova.app</span>
              <span style={{ color: '#64748B' }}>(Official Webapp)</span>
            </div>
          </div>
        </div>
      </CinematicCamera>
    </AbsoluteFill>
  );
};
