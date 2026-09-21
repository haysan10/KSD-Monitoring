import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { Video60sCopy } from '../constants/copy';
import { CameraRig } from '../components/CameraRig';
import { SupergraphicBackdrop } from '../components/SupergraphicBackdrop';
import { HandUnderline } from '../components/HandDrawnAccents';

interface Scene8Props {
  copy: Video60sCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene8GrandFinale: React.FC<Scene8Props> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // Logo bloom entrance (Frames 10+)
  const logoEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 13, stiffness: 140, mass: 0.7 },
  });

  const logoScale = interpolate(logoEntrance, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(logoEntrance, [0, 0.4, 1], [0, 1, 1]);

  // CTA Button Punch (Frame 35)
  const ctaSpring = spring({
    frame: frame - 35,
    fps,
    config: BRAND.springs.punchy,
  });

  // Gentle breathing pulse on CTA
  const ctaPulse = 1 + Math.sin(Math.max(0, frame - 55) * 0.15) * 0.03;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.bgCream,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CameraRig
        move={{
          scale: [0.94, 1.04],
          rotateX: [1.5, -1],
          rotateY: isVertical ? [0, 0] : [-2, 2],
        }}
        shakeFrame={35}
      >
        {/* Spinning Sunburst Rays Supergraphic */}
        <SupergraphicBackdrop type="rays" opacity={0.14} rotationSpeed={0.25} scale={1.25} />

        {/* Radial Warm Glow */}
        <div
          style={{
            position: 'absolute',
            width: isVertical ? 600 : 900,
            height: isVertical ? 600 : 900,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Content Stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 40px',
            transform: `scale(${logoScale * (isVertical ? 1.2 : 1)})`,
            opacity: logoOpacity,
            zIndex: 10,
          }}
        >
          {/* Official Brand Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              filter: 'drop-shadow(0 12px 24px rgba(245, 158, 11, 0.2))',
            }}
          >
            <Img
              src={staticFile('branding/trunova-logo-brand.svg')}
              style={{
                height: isVertical ? 76 : 100,
                width: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Premium Tagline */}
          <div
            style={{
              fontFamily: BRAND.fonts.display,
              fontSize: isVertical ? 22 : 30,
              fontWeight: 800,
              color: BRAND.colors.textDark,
              letterSpacing: '-0.02em',
              marginBottom: 8,
              maxWidth: isVertical ? 500 : 800,
            }}
          >
            {copy.scene8.tagline}
          </div>

          <HandUnderline
            delay={25}
            color={BRAND.colors.amber}
            width={isVertical ? 280 : 420}
            strokeWidth={isVertical ? 4 : 5.5}
          />

          {/* Subtitle Description */}
          <div
            style={{
              fontFamily: BRAND.fonts.body,
              fontSize: isVertical ? 15 : 18,
              color: BRAND.colors.textMuted,
              marginTop: 14,
              maxWidth: 600,
            }}
          >
            Command your cement rotary kiln overhaul with real-time data precision.
          </div>

          {/* High-Impact CTA Button */}
          <div
            style={{
              marginTop: isVertical ? 36 : 44,
              transform: `scale(${ctaSpring * ctaPulse})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                backgroundColor: BRAND.colors.amber,
                color: BRAND.colors.textDark,
                fontFamily: BRAND.fonts.display,
                fontWeight: 900,
                fontSize: isVertical ? 20 : 24,
                padding: isVertical ? '16px 36px' : '18px 44px',
                borderRadius: 20,
                boxShadow: '0 20px 40px rgba(245, 158, 11, 0.4)',
                border: '2.5px solid #F59E0B',
                letterSpacing: '-0.02em',
                cursor: 'pointer',
              }}
            >
              <span>{copy.scene8.ctaBadge}</span>
              <span style={{ fontSize: 24, transform: 'translateX(2px)' }}>→</span>
            </div>

            {/* URL Placeholder Badge */}
            <div
              style={{
                fontFamily: BRAND.fonts.mono,
                fontSize: 13,
                fontWeight: 700,
                color: BRAND.colors.textMuted,
                backgroundColor: '#FFFFFF',
                padding: '6px 16px',
                borderRadius: 8,
                border: '1px solid rgba(15, 23, 42, 0.1)',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>🌐</span>
              <span style={{ color: BRAND.colors.cobalt }}>{copy.scene8.url}</span>
              <span style={{ color: '#94A3B8' }}>(Official Webapp)</span>
            </div>
          </div>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
