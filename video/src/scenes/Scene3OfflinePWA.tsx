import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { Video60sCopy } from '../constants/copy';
import { CameraRig } from '../components/CameraRig';
import { CharReveal, TrackingExpansionText, EditorialBackdrop } from '../components/AdvancedMotionType';
import { PhoneMockup } from '../components/PhoneMockup';
import { SupergraphicBackdrop, CornerBrackets } from '../components/SupergraphicBackdrop';
import { HighlightCircle } from '../components/HandDrawnAccents';

interface Scene3Props {
  copy: Video60sCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene3OfflinePWA: React.FC<Scene3Props> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // 1. Phone Entrance (Frame 0 - 35)
  const phoneSpring = spring({
    frame,
    fps,
    config: BRAND.springs.snappy,
  });

  const phoneY = interpolate(phoneSpring, [0, 1], [500, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Interactive Input Action (Frame 45 - 85)
  const inputPopSpring = spring({
    frame: frame - 45,
    fps,
    config: BRAND.springs.punchy,
  });

  // Tap ripple effect (Frame 55 - 75)
  const tapRippleScale = interpolate(frame, [55, 75], [0, 2.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tapRippleOpacity = interpolate(frame, [55, 75], [0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Offline Detection & Queue Alert Banner (Frame 95+)
  const queuePopSpring = spring({
    frame: frame - 95,
    fps,
    config: BRAND.springs.snappy,
  });

  // 4. Queued items count animation (Frame 130+)
  const queueItemsSpring = spring({
    frame: frame - 130,
    fps,
    config: BRAND.springs.punchy,
  });

  // Camera Exit Whip (Frames 255 - 270)
  const exitX = interpolate(frame, [255, 270], [0, isVertical ? -650 : -1100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.bgCream, overflow: 'hidden' }}>
      <CameraRig
        move={{
          scale: [0.98, 1.06],
          rotateX: [1.5, -1.5],
          rotateY: isVertical ? [0, 0] : [-4, 3],
          x: [0, exitX],
        }}
        shakeFrame={95}
      >
        {/* Continuous Editorial Runner */}
        <EditorialBackdrop
          text="OFFLINE-FIRST ARCHITECTURE • LOCAL INDEXEDDB MUTATION QUEUE • ZERO DATA LOSS"
          speed={1.6}
          fontSize={isVertical ? 80 : 140}
          color="rgba(15, 23, 42, 0.035)"
        />

        {/* Supergraphic Mobile Cover Decorator */}
        <SupergraphicBackdrop type="mobile-cover" opacity={0.1} scale={1.2} />

        {/* ─── 16:9 LANDSCAPE LAYOUT ─── */}
        {!isVertical && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 90px',
              boxSizing: 'border-box',
              gap: 60,
              zIndex: 20,
            }}
          >
            {/* Left Column: Editorial Typography & Offline Status Details */}
            <div
              style={{
                width: 520,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <div>
                <TrackingExpansionText
                  text={`⚡ ${copy.scene3.badge}`}
                  startFrame={5}
                  fontSize={16}
                  color={BRAND.colors.amber}
                />

                <CharReveal
                  text={copy.scene3.headline}
                  startFrame={10}
                  staggerFrames={2}
                  fontSize={66}
                  color={BRAND.colors.textDark}
                  style={{ marginTop: 6 }}
                />

                <div
                  style={{
                    fontFamily: BRAND.fonts.body,
                    fontSize: 20,
                    color: BRAND.colors.textMuted,
                    marginTop: 8,
                    lineHeight: 1.4,
                  }}
                >
                  Deep inside the steel kiln shell without cellular connection, Trunova remains fully responsive.
                </div>
              </div>

              {/* Dedicated Mutation Queue Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  padding: '20px 24px',
                  border: '1.5px solid #FEF3C7',
                  boxShadow: '0 12px 30px rgba(245, 158, 11, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  transform: `scale(${queuePopSpring})`,
                  opacity: queuePopSpring,
                  position: 'relative',
                }}
              >
                <CornerBrackets size={18} />

                {/* Queue Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        backgroundColor: '#FEF3C7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                      }}
                    >
                      📶
                    </div>
                    <div>
                      <div style={{ fontFamily: BRAND.fonts.display, fontWeight: 800, fontSize: 15, color: '#92400E' }}>
                        {copy.scene3.queueAlert}
                      </div>
                      <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 11, color: '#D97706' }}>
                        LOCAL INDEXEDDB PERSISTENCE
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: BRAND.fonts.mono,
                      fontSize: 11,
                      backgroundColor: '#FEF3C7',
                      color: '#92400E',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: 999,
                      border: '1px solid #F59E0B',
                    }}
                  >
                    3 QUEUED
                  </span>
                </div>

                {/* 3 Queued Mutation Items */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    transform: `scale(${queueItemsSpring})`,
                  }}
                >
                  {[
                    { label: 'Refractory Brick Installation', val: '+12.5 m', time: '10:42:15' },
                    { label: 'Worn Brick Demolition (Tearing)', val: '8.0 m', time: '10:35:00' },
                    { label: 'Cooler Castable Inspection', val: 'Pass QC', time: '10:20:44' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#F8FAFC',
                        borderRadius: 10,
                        padding: '8px 14px',
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: '#10B981', fontWeight: 900, fontSize: 13 }}>✓</span>
                        <span style={{ fontFamily: BRAND.fonts.display, fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
                          {item.label}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 11, color: BRAND.colors.amberWarm, fontWeight: 700 }}>
                          {item.val}
                        </span>
                        <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 10, color: '#94A3B8' }}>
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 3D Smartphone Mockup */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                transform: `translateY(${phoneY}px) scale(0.95) rotateY(-4deg)`,
                transformStyle: 'preserve-3d',
                position: 'relative',
              }}
            >
              <PhoneMockup
                imageSrc="captures/mobile-01-input-progress.png"
                isOffline={true}
                width={380}
                height={760}
              >
                {/* Floating Interactive Input Toast docked inside phone */}
                <div
                  style={{
                    position: 'absolute',
                    top: 140,
                    left: 18,
                    right: 18,
                    backgroundColor: '#0F172A',
                    borderRadius: 16,
                    padding: '14px 16px',
                    color: '#FFFFFF',
                    boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
                    border: '1.5px solid #F59E0B',
                    transform: `scale(${inputPopSpring})`,
                    opacity: inputPopSpring,
                    zIndex: 25,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          backgroundColor: BRAND.colors.amber,
                          color: '#0F172A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                          fontSize: 16,
                        }}
                      >
                        ✓
                      </div>
                      <div>
                        <div style={{ fontFamily: BRAND.fonts.display, fontWeight: 800, fontSize: 13 }}>
                          {copy.scene3.actionLabel}
                        </div>
                        <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 10, color: BRAND.colors.amber }}>
                          Saved to Offline Storage
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        fontSize: 10,
                        fontFamily: BRAND.fonts.mono,
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 6,
                      }}
                    >
                      SAVED
                    </span>
                  </div>
                </div>

                {/* Simulated Finger Tap Ripple */}
                {frame >= 55 && frame <= 75 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 170,
                      left: 180,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(245, 158, 11, 0.4)',
                      border: '2px solid #F59E0B',
                      transform: `translate(-50%, -50%) scale(${tapRippleScale})`,
                      opacity: tapRippleOpacity,
                      pointerEvents: 'none',
                      zIndex: 30,
                    }}
                  />
                )}
              </PhoneMockup>
            </div>
          </div>
        )}

        {/* ─── 9:16 VERTICAL PORTRAIT LAYOUT ─── */}
        {isVertical && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '50px 24px 225px',
              boxSizing: 'border-box',
              justifyContent: 'space-between',
              zIndex: 20,
            }}
          >
            {/* Top: Kinetic Header */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 10,
              }}
            >
              <TrackingExpansionText
                text={`⚡ ${copy.scene3.badge}`}
                startFrame={5}
                fontSize={15}
                color={BRAND.colors.amber}
              />

              <CharReveal
                text={copy.scene3.headline}
                startFrame={10}
                staggerFrames={2}
                fontSize={48}
                color={BRAND.colors.textDark}
              />

              <div
                style={{
                  fontFamily: BRAND.fonts.body,
                  fontSize: 16,
                  color: BRAND.colors.textMuted,
                  maxWidth: 480,
                }}
              >
                100% Operational Inside Kiln Blind-Spots Without Cellular Network
              </div>
            </div>

            {/* Center: Clean Centered Phone Mockup */}
            <div
              style={{
                transform: `translateY(${phoneY * 0.5}px) scale(0.82)`,
                transformStyle: 'preserve-3d',
                position: 'relative',
              }}
            >
              <PhoneMockup
                imageSrc="captures/mobile-01-input-progress.png"
                isOffline={true}
                width={380}
                height={760}
              >
                {/* Floating Interactive Input Toast inside Phone */}
                <div
                  style={{
                    position: 'absolute',
                    top: 140,
                    left: 18,
                    right: 18,
                    backgroundColor: '#0F172A',
                    borderRadius: 16,
                    padding: '14px 16px',
                    color: '#FFFFFF',
                    boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
                    border: '1.5px solid #F59E0B',
                    transform: `scale(${inputPopSpring})`,
                    opacity: inputPopSpring,
                    zIndex: 25,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          backgroundColor: BRAND.colors.amber,
                          color: '#0F172A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                          fontSize: 16,
                        }}
                      >
                        ✓
                      </div>
                      <div>
                        <div style={{ fontFamily: BRAND.fonts.display, fontWeight: 800, fontSize: 13 }}>
                          {copy.scene3.actionLabel}
                        </div>
                        <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 10, color: BRAND.colors.amber }}>
                          Saved to Offline Storage
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        fontSize: 10,
                        fontFamily: BRAND.fonts.mono,
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 6,
                      }}
                    >
                      QUEUED
                    </span>
                  </div>
                </div>

                {/* Simulated Finger Tap Ripple */}
                {frame >= 55 && frame <= 75 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 170,
                      left: 180,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(245, 158, 11, 0.4)',
                      border: '2px solid #F59E0B',
                      transform: `translate(-50%, -50%) scale(${tapRippleScale})`,
                      opacity: tapRippleOpacity,
                      pointerEvents: 'none',
                      zIndex: 30,
                    }}
                  />
                )}
              </PhoneMockup>
            </div>

            {/* Bottom: Dedicated Offline Queue Status Bar (Safe above subtitle bar) */}
            <div
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: 18,
                padding: '14px 20px',
                border: '1.5px solid #FEF3C7',
                boxShadow: '0 10px 24px rgba(245, 158, 11, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transform: `scale(${queuePopSpring})`,
                opacity: queuePopSpring,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <div>
                  <div style={{ fontFamily: BRAND.fonts.display, fontWeight: 800, fontSize: 14, color: '#92400E' }}>
                    {copy.scene3.queueAlert}
                  </div>
                  <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 11, color: '#D97706' }}>
                    {copy.scene3.queueSub}
                  </div>
                </div>
              </div>

              <span
                style={{
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  fontFamily: BRAND.fonts.mono,
                  fontWeight: 800,
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 8,
                  border: '1px solid #F59E0B',
                }}
              >
                3 QUEUED
              </span>
            </div>
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
