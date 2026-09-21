import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { SceneCopy } from '../constants/copy';
import { HandUnderline } from '../components/HandDrawnAccents';

interface Scene6PenutupProps {
  copy: SceneCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene6Penutup: React.FC<Scene6PenutupProps> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // 0.5s breathing pause (Frames 0 to 15) -> Content starts at frame 15
  const contentEntrance = spring({
    frame: frame - 15,
    fps,
    config: BRAND.springs.snappy,
  });

  const logoScale = interpolate(contentEntrance, [0, 1], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const logoOpacity = interpolate(contentEntrance, [0, 0.4, 1], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Sunburst icon rotation (gentle 15deg to 0deg)
  const sunburstRot = interpolate(contentEntrance, [0, 1], [-25, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CTA button punch (Frame 35)
  const ctaEntrance = spring({
    frame: frame - 35,
    fps,
    config: BRAND.springs.punchy,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.bgCream,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '0 40px',
      }}
    >
      {/* Background radial warm glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {frame >= 15 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            zIndex: 10,
          }}
        >
          {/* Logo Brand SVG */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <Img
              src={staticFile('branding/trunova-logo-brand.svg')}
              style={{
                height: isVertical ? 68 : 88,
                width: 'auto',
                display: 'block',
                transform: `rotate(${sunburstRot}deg)`,
              }}
            />
          </div>

          {/* Single-line Tagline */}
          <div
            style={{
              fontFamily: BRAND.fonts.display,
              fontSize: isVertical ? 18 : 26,
              fontWeight: 700,
              color: BRAND.colors.textDark,
              letterSpacing: '-0.02em',
              marginBottom: 8,
            }}
          >
            {copy.scene6.tagline}
          </div>

          <HandUnderline
            delay={25}
            color={BRAND.colors.amber}
            width={isVertical ? 260 : 380}
            strokeWidth={isVertical ? 3.5 : 5}
          />

          {/* Official Marked CTA Button Placeholder */}
          <div
            style={{
              marginTop: isVertical ? 32 : 40,
              transform: `scale(${ctaEntrance})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: BRAND.colors.amber,
                color: BRAND.colors.textDark,
                fontFamily: BRAND.fonts.display,
                fontWeight: 800,
                fontSize: isVertical ? 18 : 22,
                padding: isVertical ? '14px 28px' : '16px 36px',
                borderRadius: 16,
                boxShadow: '0 16px 32px rgba(245, 158, 11, 0.35)',
                border: '2px solid #F59E0B',
                letterSpacing: '-0.02em',
              }}
            >
              <span>{copy.scene6.ctaBadge}</span>
              <span style={{ fontSize: 22 }}>→</span>
            </div>

            {/* URL Placeholder indicator */}
            <div
              style={{
                fontFamily: BRAND.fonts.mono,
                fontSize: 13,
                fontWeight: 700,
                color: BRAND.colors.textSubtle,
                backgroundColor: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: 6,
                border: '1px solid rgba(15, 23, 42, 0.1)',
                marginTop: 6,
              }}
            >
              🌐 {copy.scene6.url} (Placeholder Resmi)
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
