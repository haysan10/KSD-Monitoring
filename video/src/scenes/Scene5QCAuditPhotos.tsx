import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { Video60sCopy } from '../constants/copy';
import { CameraRig } from '../components/CameraRig';
import { CharReveal, TrackingExpansionText, EditorialBackdrop } from '../components/AdvancedMotionType';
import { SupergraphicBackdrop, CornerBrackets } from '../components/SupergraphicBackdrop';
import { HighlightCircle } from '../components/HandDrawnAccents';

interface Scene5Props {
  copy: Video60sCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene5QCAuditPhotos: React.FC<Scene5Props> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // Photo 1 Entrance (Frame 20) & Stamp (Frame 45)
  const card1Spring = spring({ frame: frame - 20, fps, config: BRAND.springs.punchy });
  const stamp1Spring = spring({ frame: frame - 45, fps, config: BRAND.springs.snappy });

  // Photo 2 Entrance (Frame 70) & Stamp (Frame 95)
  const card2Spring = spring({ frame: frame - 70, fps, config: BRAND.springs.punchy });
  const stamp2Spring = spring({ frame: frame - 95, fps, config: BRAND.springs.snappy });

  // Photo 3 Entrance (Frame 120) & Stamp (Frame 145)
  const card3Spring = spring({ frame: frame - 120, fps, config: BRAND.springs.punchy });
  const stamp3Spring = spring({ frame: frame - 145, fps, config: BRAND.springs.snappy });

  // Whip transition out (Frames 255 - 270)
  const exitX = interpolate(frame, [255, 270], [0, isVertical ? -650 : -1100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const photoCards = [
    {
      step: 'STAGE 1',
      title: 'Before Tearing',
      tag: 'Old Lining Tearing',
      meter: 'KM 18.2 - 24.5',
      imgSrc: 'photos/audit-before.jpg',
      spring: card1Spring,
      stampSpring: stamp1Spring,
      stampText: 'INSPECTED',
      tilt: -2.5,
    },
    {
      step: 'STAGE 2',
      title: 'During Bricking',
      tag: 'New Brick Laying',
      meter: 'KM 24.5 - 32.0',
      imgSrc: 'photos/audit-during.jpg',
      spring: card2Spring,
      stampSpring: stamp2Spring,
      stampText: 'VERIFIED',
      tilt: 1.8,
    },
    {
      step: 'STAGE 3',
      title: 'After Key Jacking',
      tag: 'Final Key Jacking',
      meter: 'KM 32.0 - 37.0',
      imgSrc: 'photos/audit-after.jpg',
      spring: card3Spring,
      stampSpring: stamp3Spring,
      stampText: 'APPROVED',
      tilt: -1.2,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.bgCream, overflow: 'hidden' }}>
      <CameraRig
        move={{
          scale: [0.98, 1.05],
          rotateX: [2, -1],
          rotateY: isVertical ? [0, 0] : [-3, 3],
          x: [0, exitX],
        }}
        shakeFrame={145}
      >
        {/* Continuous Editorial Runner */}
        <EditorialBackdrop
          text="THREE-STAGE QUALITY CONTROL • BEFORE DURING AFTER • ZERO REFRACTORY COLLAPSE"
          speed={1.4}
          fontSize={isVertical ? 80 : 130}
          color="rgba(15, 23, 42, 0.03)"
        />

        <SupergraphicBackdrop type="hero" opacity={0.06} scale={1.1} />

        {/* Top Header */}
        <div
          style={{
            position: 'absolute',
            top: isVertical ? 40 : 50,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 30,
            padding: '0 20px',
          }}
        >
          <TrackingExpansionText
            text={`🛡️ ${copy.scene5.badge}`}
            startFrame={5}
            fontSize={isVertical ? 14 : 18}
            color={BRAND.colors.amber}
          />

          <CharReveal
            text={copy.scene5.headline}
            startFrame={12}
            staggerFrames={2}
            fontSize={isVertical ? 44 : 68}
            color={BRAND.colors.textDark}
            style={{ marginTop: 8 }}
          />

          <div
            style={{
              fontFamily: BRAND.fonts.body,
              fontSize: isVertical ? 15 : 18,
              color: BRAND.colors.textMuted,
              marginTop: 6,
            }}
          >
            Authenticated field photo documentation across every critical overhaul milestone
          </div>
        </div>

        {/* 3 Photo Cards Layout */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: isVertical ? 160 : 120,
            gap: isVertical ? 20 : 36,
            zIndex: 20,
          }}
        >
          {photoCards.map((card, idx) => {
            const cardScale = card.spring;
            const translateY = interpolate(cardScale, [0, 1], [150, 0]);

            return (
              <div
                key={idx}
                style={{
                  width: isVertical ? '88%' : 380,
                  maxWidth: 420,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  padding: 12,
                  boxShadow: '0 16px 36px rgba(15, 23, 42, 0.12)',
                  border: '1.5px solid #E2E8F0',
                  transform: `translateY(${translateY}px) scale(${cardScale}) rotate(${isVertical ? 0 : card.tilt}deg)`,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <CornerBrackets size={18} />

                {/* Photo Header Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px 10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        backgroundColor: BRAND.colors.amber,
                        color: '#0F172A',
                        fontFamily: BRAND.fonts.mono,
                        fontWeight: 900,
                        fontSize: 10,
                        padding: '2px 8px',
                        borderRadius: 6,
                      }}
                    >
                      {card.step}
                    </span>
                    <span style={{ fontFamily: BRAND.fonts.display, fontWeight: 800, fontSize: 13, color: '#0F172A' }}>
                      {card.title}
                    </span>
                  </div>
                  <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 11, color: '#64748B' }}>
                    {card.meter}
                  </span>
                </div>

                {/* Real Inspection Photo */}
                <div
                  style={{
                    width: '100%',
                    height: isVertical ? 140 : 260,
                    borderRadius: 12,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#0F172A',
                  }}
                >
                  <Img
                    src={staticFile(card.imgSrc)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.05) saturate(1.05)',
                    }}
                  />

                  {/* Stamp Seal Slap */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) scale(${card.stampSpring}) rotate(-12deg)`,
                      border: '3px solid #10B981',
                      backgroundColor: 'rgba(16, 185, 129, 0.9)',
                      color: '#FFFFFF',
                      padding: '8px 18px',
                      borderRadius: 8,
                      fontFamily: BRAND.fonts.mono,
                      fontWeight: 900,
                      fontSize: isVertical ? 14 : 20,
                      letterSpacing: '0.1em',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      pointerEvents: 'none',
                      opacity: card.stampSpring,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ✓ {card.stampText}
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 6px 4px',
                    fontFamily: BRAND.fonts.mono,
                    fontSize: 11,
                    color: '#64748B',
                  }}
                >
                  <span>TAG: {card.tag}</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>QC PASS</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Accent on Final Stage */}
        <div
          style={{
            position: 'absolute',
            bottom: isVertical ? 210 : 35,
            zIndex: 35,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            backgroundColor: '#0F172A',
            padding: isVertical ? '6px 18px' : '8px 24px',
            borderRadius: 999,
            color: '#FFFFFF',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          }}
        >
          <span style={{ color: BRAND.colors.amber, fontSize: 16 }}>★</span>
          <span style={{ fontFamily: BRAND.fonts.display, fontWeight: 700, fontSize: 13 }}>
            ANTI-MISKEYING AUDIT PIPELINE • 100% PHOTO PROOF
          </span>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
