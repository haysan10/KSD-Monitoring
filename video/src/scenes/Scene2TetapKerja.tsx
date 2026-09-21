import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { SceneCopy } from '../constants/copy';
import { KineticWords } from '../components/KineticText';
import { PhoneMockup } from '../components/PhoneMockup';
import { FloatingCard } from '../components/FloatingCard';
import { HighlightCircle, AccentArrow } from '../components/HandDrawnAccents';

interface Scene2TetapKerjaProps {
  copy: SceneCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene2TetapKerja: React.FC<Scene2TetapKerjaProps> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // 1. Phone fly-in from bottom
  const phoneEntrance = spring({
    frame,
    fps,
    config: BRAND.springs.snappy,
  });

  const phoneTranslateY = interpolate(phoneEntrance, [0, 1], [600, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dynamic slight tilt for playful energy
  const phoneTilt = interpolate(frame, [0, 60, 240], [8, -3, 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Action Input Pop (Around frame 45 = 1.5s in scene)
  const inputCardPop = spring({
    frame: frame - 45,
    fps,
    config: BRAND.springs.punchy,
  });

  // 3. Offline Queue Banner Pop (Around frame 105 = 3.5s in scene)
  const queueBannerPop = spring({
    frame: frame - 105,
    fps,
    config: BRAND.springs.snappy,
  });

  // 4. Headline swap: "INPUT TETAP JALAN" (0-110) -> "OTOMATIS TERSIMPAN" (110-240)
  const isPhase2 = frame >= 110;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.bgCream,
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: isVertical ? '40px 20px' : '0 100px',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Animated Kinetic Ambient Text */}
      <div
        style={{
          position: 'absolute',
          top: isVertical ? '18%' : '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(-6deg)`,
          fontSize: isVertical ? 80 : 160,
          fontWeight: 900,
          fontFamily: BRAND.fonts.display,
          color: 'rgba(15, 23, 42, 0.03)',
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}
      >
        OFFLINE-FIRST ARCHITECTURE
      </div>

      {/* Left / Top Side: Kinetic Typography */}
      <div
        style={{
          flex: isVertical ? 'none' : 1,
          width: isVertical ? '100%' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isVertical ? 'center' : 'flex-start',
          textAlign: isVertical ? 'center' : 'left',
          gap: 16,
          zIndex: 10,
          marginBottom: isVertical ? 24 : 0,
          maxWidth: isVertical ? '100%' : 600,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: BRAND.colors.amberSoft,
            border: `1px solid ${BRAND.colors.amber}`,
            padding: '5px 14px',
            borderRadius: 999,
            fontSize: isVertical ? 12 : 14,
            fontWeight: 800,
            fontFamily: BRAND.fonts.display,
            color: BRAND.colors.amberWarm,
            letterSpacing: '0.04em',
          }}
        >
          <span>📍 INSIDE KILN BLIND-SPOT</span>
        </div>

        {!isPhase2 ? (
          <KineticWords
            words={copy.scene2.headline.split(' ')}
            startFrame={5}
            staggerFrames={6}
            fontSize={isVertical ? 44 : 64}
            color={BRAND.colors.textDark}
            align={isVertical ? 'center' : 'left'}
            fontWeight={800}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: isVertical ? 'center' : 'flex-start', gap: 6, width: '100%' }}>
            <KineticWords
              words={['OTOMATIS TERSIMPAN']}
              startFrame={112}
              staggerFrames={5}
              fontSize={isVertical ? 44 : 56}
              color={BRAND.colors.amberWarm}
              align={isVertical ? 'center' : 'left'}
              fontWeight={800}
            />
            <KineticWords
              words={['DI ANTREAN']}
              startFrame={120}
              staggerFrames={5}
              fontSize={isVertical ? 44 : 56}
              color={BRAND.colors.amberWarm}
              align={isVertical ? 'center' : 'left'}
              fontWeight={800}
            />
          </div>
        )}

        <div
          style={{
            fontSize: isVertical ? 14 : 18,
            fontFamily: BRAND.fonts.display,
            color: BRAND.colors.textMuted,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          Teknisi tetap mencatat progres pasang bata tanpa khawatir sinyal mati.
        </div>
      </div>

      {/* Right / Bottom Side: Phone Mockup with real app UI & interactive cards */}
      <div
        style={{
          flex: isVertical ? 1 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transform: `translateY(${phoneTranslateY}px) rotate(${phoneTilt}deg)`,
          zIndex: 10,
        }}
      >
        {/* Phone wrapper with strict relative bounds */}
        <div style={{ position: 'relative', width: isVertical ? 310 : 360, height: isVertical ? 620 : 720 }}>
          <PhoneMockup
            imageSrc="captures/mobile-01-input-progress.png"
            width={isVertical ? 310 : 360}
            height={isVertical ? 620 : 720}
            isOffline={true}
          >
            {/* Action Pop 1: Inspector types progress */}
            {frame >= 45 && (
              <div
                style={{
                  position: 'absolute',
                  top: 140,
                  left: 16,
                  right: 16,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: '12px 16px',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                  border: '1.5px solid #2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transform: `scale(${inputCardPop})`,
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    color: '#2563EB',
                    fontWeight: 800,
                  }}
                >
                  +
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Pekerjaan Refraktori</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', fontFamily: BRAND.fonts.mono }}>
                    {copy.scene2.actionLabel}
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: 6 }}>
                  LOKAL
                </span>
              </div>
            )}

            {/* Action Pop 2: Offline Queue Notification */}
            {frame >= 105 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 70,
                  left: 12,
                  right: 12,
                  backgroundColor: '#FEF3C7',
                  borderRadius: 14,
                  padding: '12px 14px',
                  boxShadow: '0 12px 28px rgba(217, 119, 6, 0.2)',
                  border: '1.5px solid #F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transform: `scale(${queueBannerPop})`,
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    backgroundColor: '#F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  ⚡
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#92400E' }}>
                    {copy.scene2.queueAlert}
                  </div>
                  <div style={{ fontSize: 10, color: '#B45309', marginTop: 2 }}>
                    {copy.scene2.queueSub}
                  </div>
                </div>
                <span style={{ backgroundColor: '#FDE68A', color: '#92400E', fontSize: 10, fontWeight: 800, padding: '3px 7px', borderRadius: 6 }}>
                  QUEUED
                </span>
              </div>
            )}
          </PhoneMockup>

          {/* Hand-drawn Accent Circle circling the queue badge */}
          {frame >= 115 && (
            <div
              style={{
                position: 'absolute',
                bottom: 50,
                right: -15,
                zIndex: 30,
              }}
            >
              <HighlightCircle
                delay={115}
                color={BRAND.colors.amberWarm}
                width={isVertical ? 220 : 260}
                height={95}
                strokeWidth={4}
              />
            </div>
          )}

          {/* Hand-drawn Arrow pointing to offline queue */}
          {frame >= 125 && (
            <div
              style={{
                position: 'absolute',
                bottom: 150,
                left: -35,
                zIndex: 30,
              }}
            >
              <AccentArrow
                delay={125}
                color={BRAND.colors.orange}
                width={100}
                height={70}
                rotation={20}
              />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
