import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';

interface HolographicDeckProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  accentColor?: string;
  glowColor?: string;
  title?: string;
  badge?: string;
  style?: React.CSSProperties;
}

export const HolographicDeck: React.FC<HolographicDeckProps> = ({
  children,
  width = 'auto',
  height = 'auto',
  accentColor = CINEMATIC_BRAND.colors.amberCore,
  glowColor = CINEMATIC_BRAND.colors.amberGlow,
  title,
  badge,
  style,
}) => {
  const frame = useCurrentFrame();

  // Subtle specular reflection sheen passing across card
  const sheenProgress = (frame * 1.5) % 180;
  const sheenX = interpolate(sheenProgress, [0, 80], [-200, 800], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        borderRadius: 22,
        backgroundColor: 'rgba(11, 17, 30, 0.78)',
        backdropFilter: 'blur(24px)',
        border: `1.5px solid rgba(255, 255, 255, 0.12)`,
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px ${glowColor}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Dynamic Specular Sheen */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: sheenX,
          width: 80,
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
          transform: 'skewX(-25deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Cybernetic Corner Brackets */}
      {/* Top Left */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          width: 14,
          height: 14,
          borderTop: `2px solid ${accentColor}`,
          borderLeft: `2px solid ${accentColor}`,
          pointerEvents: 'none',
        }}
      />
      {/* Top Right */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 14,
          height: 14,
          borderTop: `2px solid ${accentColor}`,
          borderRight: `2px solid ${accentColor}`,
          pointerEvents: 'none',
        }}
      />
      {/* Bottom Left */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          width: 14,
          height: 14,
          borderBottom: `2px solid ${accentColor}`,
          borderLeft: `2px solid ${accentColor}`,
          pointerEvents: 'none',
        }}
      />
      {/* Bottom Right */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          width: 14,
          height: 14,
          borderBottom: `2px solid ${accentColor}`,
          borderRight: `2px solid ${accentColor}`,
          pointerEvents: 'none',
        }}
      />

      {/* Optional Telemetry Header Bar */}
      {(title || badge) && (
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: accentColor,
                boxShadow: `0 0 10px ${accentColor}`,
              }}
            />
            <span
              style={{
                fontFamily: CINEMATIC_BRAND.fonts.mono,
                fontSize: 11,
                fontWeight: 700,
                color: CINEMATIC_BRAND.colors.textHero,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </span>
          </div>

          {badge && (
            <span
              style={{
                fontFamily: CINEMATIC_BRAND.fonts.mono,
                fontSize: 10,
                fontWeight: 800,
                color: accentColor,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${accentColor}`,
                padding: '2px 8px',
                borderRadius: 4,
              }}
            >
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1, padding: 20 }}>
        {children}
      </div>
    </div>
  );
};
