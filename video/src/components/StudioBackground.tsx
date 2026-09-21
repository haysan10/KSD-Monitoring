import React from 'react';
import { staticFile, Img } from 'remotion';

interface StudioBackgroundProps {
  dark?: boolean;
}

export const StudioBackground: React.FC<StudioBackgroundProps> = ({ dark = false }) => {
  if (dark) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0A0F1D',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Dark OLED Radial Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(ellipse 1100px 750px at 50% 50%, rgba(37, 99, 235, 0.12) 0%, rgba(217, 119, 6, 0.05) 45%, transparent 75%)',
          }}
        />
        {/* Dot Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1.2px, transparent 1.2px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#FAF8F5',
        overflow: 'hidden',
        pointerEvents: 'none',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* 1. Studio Ambient Radial Lighting (soft glow behind the floating mockup) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse 1200px 750px at 50% 48%, rgba(37, 99, 235, 0.07) 0%, rgba(217, 119, 6, 0.035) 40%, transparent 72%)',
        }}
      />

      {/* 2. Architectural Dot Grid with balanced density */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.42) 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
          opacity: 0.75,
        }}
      />

      {/* 3. Subtle Edge Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 50% 50%, transparent 62%, rgba(15, 23, 42, 0.045) 100%)',
        }}
      />

      {/* 4. Decorative Sunburst Watermark in Top Right */}
      <div
        style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 440,
          height: 440,
          opacity: 0.035,
          pointerEvents: 'none',
        }}
      >
        <Img src={staticFile('branding/sunburst-icon.svg')} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* 5. Precision Studio Corner Registration Marks (+) */}
      {/* Top Left Crosshair */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{ color: '#94A3B8', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
          +
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#D97706' }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#64748B',
              textTransform: 'uppercase',
            }}
          >
            TRUNOVA • KILN COMMAND CENTER
          </span>
        </div>
      </div>

      {/* Top Right Crosshair & Telemetry Status */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#64748B',
              textTransform: 'uppercase',
            }}
          >
            DESKTOP SIMULATION • 1080P 60FPS
          </span>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }} />
        </div>
        <div style={{ color: '#94A3B8', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
          +
        </div>
      </div>

      {/* Bottom Corner Crosshairs */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: 44,
          color: '#94A3B8',
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
        }}
      >
        +
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          right: 44,
          color: '#94A3B8',
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
        }}
      >
        +
      </div>
    </div>
  );
};
