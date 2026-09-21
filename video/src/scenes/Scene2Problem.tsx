import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { Video60sCopy } from '../constants/copy';
import { CameraRig } from '../components/CameraRig';
import { CharReveal, TrackingExpansionText, EditorialBackdrop } from '../components/AdvancedMotionType';
import { SupergraphicBackdrop, CornerBrackets } from '../components/SupergraphicBackdrop';

interface Scene2Props {
  copy: Video60sCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene2Problem: React.FC<Scene2Props> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // Card 1 Pop (Frame 20)
  const card1Spring = spring({
    frame: frame - 20,
    fps,
    config: BRAND.springs.punchy,
  });

  // Card 2 Pop (Frame 45)
  const card2Spring = spring({
    frame: frame - 45,
    fps,
    config: BRAND.springs.punchy,
  });

  // Card 3 Pop (Frame 70)
  const card3Spring = spring({
    frame: frame - 70,
    fps,
    config: BRAND.springs.snappy,
  });

  // Whip transition out (Frames 195 - 210)
  const exitX = interpolate(frame, [195, 210], [0, isVertical ? -600 : -1000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.bgCream, overflow: 'hidden' }}>
      <CameraRig
        move={{
          scale: [1, 1.07],
          rotateX: [2, -2],
          rotateY: isVertical ? [0, 0] : [-5, 4],
          x: [0, exitX],
        }}
        shakeFrame={45}
      >
        {/* Dynamic Supergraphic Scatter */}
        <SupergraphicBackdrop type="scatter" opacity={0.06} />

        {/* Continuous Scrolling Editorial Backdrop */}
        <EditorialBackdrop
          text="OPERATIONAL FRICTION • RISKY DELAYS • EXPENSIVE DOWNTIME"
          speed={1.5}
          fontSize={isVertical ? 90 : 150}
          color="rgba(15, 23, 42, 0.035)"
        />

        {/* Content Container */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isVertical ? '60px 30px' : '0 100px',
            boxSizing: 'border-box',
            gap: isVertical ? 32 : 80,
            zIndex: 10,
          }}
        >
          {/* Left Column: Kinetic Typography */}
          <div
            style={{
              flex: isVertical ? 'none' : 1,
              width: isVertical ? '100%' : 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isVertical ? 'center' : 'flex-start',
              textAlign: isVertical ? 'center' : 'left',
              gap: 16,
            }}
          >
            <TrackingExpansionText
              text={`⚠️ ${copy.scene2.badge}`}
              startFrame={5}
              fontSize={isVertical ? 15 : 18}
              color="#DC2626"
            />

            <CharReveal
              text={copy.scene2.headline}
              startFrame={12}
              staggerFrames={2}
              fontSize={isVertical ? 50 : 76}
              color={BRAND.colors.textDark}
            />

            <div
              style={{
                fontFamily: BRAND.fonts.body,
                fontSize: isVertical ? 18 : 24,
                color: BRAND.colors.textMuted,
                maxWidth: isVertical ? 500 : 540,
                lineHeight: 1.4,
                opacity: interpolate(frame, [25, 40], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: `translateY(${interpolate(frame, [25, 40], [20, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}px)`,
              }}
            >
              {copy.scene2.sub}
            </div>
          </div>

          {/* Right Column: 3 Floating Warning Cards with 3D Depth */}
          <div
            style={{
              flex: isVertical ? 'none' : 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              width: isVertical ? '100%' : 480,
              maxWidth: 500,
            }}
          >
            {/* Card 1: Spreadsheet Error */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: '18px 24px',
                border: '1.5px solid #FEE2E2',
                boxShadow: '0 12px 30px rgba(220, 38, 38, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `scale(${card1Spring}) translateY(${interpolate(card1Spring, [0, 1], [40, 0])}px) rotate(${isVertical ? 0 : -2}deg)`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: '#FEE2E2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  color: '#DC2626',
                  fontWeight: 900,
                }}
              >
                ✕
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: BRAND.fonts.display, fontWeight: 700, fontSize: 18, color: '#991B1B' }}>
                  {copy.scene2.bullet1}
                </span>
                <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 13, color: '#DC2626' }}>
                  #REF! SYNTAX_MISKEY_ERROR
                </span>
              </div>
            </div>

            {/* Card 2: Delayed Progress */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: '18px 24px',
                border: '1.5px solid #FEF3C7',
                boxShadow: '0 12px 30px rgba(245, 158, 11, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `scale(${card2Spring}) translateY(${interpolate(card2Spring, [0, 1], [40, 0])}px) rotate(${isVertical ? 0 : 2}deg)`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}
              >
                ⏱️
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: BRAND.fonts.display, fontWeight: 700, fontSize: 18, color: '#92400E' }}>
                  {copy.scene2.bullet2}
                </span>
                <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 13, color: '#D97706' }}>
                  +36 HOURS REPORTING LAG
                </span>
              </div>
            </div>

            {/* Card 3: Downtime Cost Burden with Corner Brackets */}
            <div
              style={{
                backgroundColor: '#0F172A',
                borderRadius: 16,
                padding: '20px 24px',
                border: '1.5px solid rgba(245, 158, 11, 0.4)',
                boxShadow: '0 16px 36px rgba(15, 23, 42, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `scale(${card3Spring}) translateY(${interpolate(card3Spring, [0, 1], [40, 0])}px)`,
                position: 'relative',
              }}
            >
              <CornerBrackets size={20} />
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  color: BRAND.colors.amber,
                }}
              >
                💸
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: BRAND.fonts.display, fontWeight: 700, fontSize: 18, color: '#FFFFFF' }}>
                  {copy.scene2.bullet3}
                </span>
                <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 14, color: BRAND.colors.amber, fontWeight: 700 }}>
                  CRITICAL SHUTDOWN RISK
                </span>
              </div>
            </div>
          </div>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
