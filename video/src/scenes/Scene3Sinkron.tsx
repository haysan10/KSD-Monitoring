import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { SceneCopy } from '../constants/copy';
import { KineticWords } from '../components/KineticText';
import { PhoneMockup } from '../components/PhoneMockup';
import { BrowserMockup } from '../components/BrowserMockup';

interface Scene3SinkronProps {
  copy: SceneCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene3Sinkron: React.FC<Scene3SinkronProps> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // Background word swap: "TERHUBUNG" (0-70) -> "TERIKAT" (70-150)
  const isPhase2 = frame >= 70;

  // Reconnection pulse
  const onlinePulse = spring({
    frame: frame - 15,
    fps,
    config: BRAND.springs.punchy,
  });

  // Data Card Flight (Match-cut motion from phone to desktop)
  const flightProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  const flightX = interpolate(flightProgress, [0, 1], [isVertical ? 0 : -350, isVertical ? 0 : 250], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const flightY = interpolate(flightProgress, [0, 1], [isVertical ? 250 : 50, isVertical ? -150 : 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const flightScale = interpolate(flightProgress, [0, 0.5, 1], [0.85, 1.15, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Desktop browser entrance
  const desktopEntrance = spring({
    frame: frame - 55,
    fps,
    config: BRAND.springs.snappy,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.bgCream,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Huge Kinetic Background Typography */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: isVertical ? 120 : 220,
          fontWeight: 900,
          fontFamily: BRAND.fonts.display,
          color: 'rgba(37, 99, 235, 0.05)',
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}
      >
        {!isPhase2 ? copy.scene3.bgWord1 : copy.scene3.bgWord2}
      </div>

      {/* Top / Main Headline */}
      <div
        style={{
          position: 'absolute',
          top: isVertical ? 50 : 60,
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: BRAND.colors.emeraldSoft,
            border: `1.5px solid ${BRAND.colors.emerald}`,
            padding: '5px 14px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 800,
            fontFamily: BRAND.fonts.display,
            color: '#059669',
            transform: `scale(${onlinePulse})`,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span>4G SIGNAL RESTORED</span>
        </div>

        <KineticWords
          words={copy.scene3.headline.split(' ')}
          startFrame={5}
          staggerFrames={5}
          fontSize={isVertical ? 42 : 56}
          color={BRAND.colors.textDark}
          align="center"
          fontWeight={800}
        />
      </div>

      {/* Left (Desktop) or Center: Desktop Browser Mockup */}
      <div
        style={{
          transform: `scale(${desktopEntrance})`,
          opacity: interpolate(desktopEntrance, [0, 0.3, 1], [0, 1, 1]),
          zIndex: 10,
          marginTop: isVertical ? 60 : 40,
        }}
      >
        <BrowserMockup
          imageSrc="captures/desktop-01-dashboard.png"
          width={isVertical ? 720 : 1080}
          height={isVertical ? 480 : 620}
        >
          {/* Real-time Sync Toast Notification inside Desktop */}
          {frame >= 75 && (
            <div
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                borderRadius: 12,
                padding: '10px 18px',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: BRAND.fonts.display,
                fontWeight: 700,
                fontSize: 13,
                zIndex: 30,
              }}
            >
              <span>✓</span>
              <span>{copy.scene3.statusLabel}</span>
            </div>
          )}
        </BrowserMockup>
      </div>

      {/* Flying Data Mutation Card (shoots across) */}
      {frame >= 35 && frame < 95 && (
        <div
          style={{
            position: 'absolute',
            zIndex: 40,
            transform: `translate(${flightX}px, ${flightY}px) scale(${flightScale})`,
            backgroundColor: '#FFFFFF',
            border: `2px solid ${BRAND.colors.cobalt}`,
            borderRadius: 16,
            padding: '14px 20px',
            boxShadow: BRAND.shadows.float,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              color: '#2563EB',
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>
              MUTASI DATA TERKIRIM
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', fontFamily: BRAND.fonts.mono }}>
              Ring Kiln #3 — +12.5 Meter Pasang
            </div>
          </div>
          <span
            style={{
              backgroundColor: '#ECFDF5',
              color: '#059669',
              fontSize: 11,
              fontWeight: 800,
              padding: '4px 8px',
              borderRadius: 6,
            }}
          >
            SYNCED
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
