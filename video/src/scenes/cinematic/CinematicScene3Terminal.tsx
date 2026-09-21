import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';
import { CinematicCamera } from '../../components/cinematic/CinematicCamera';
import { CharReveal, TrackingExpansionText } from '../../components/AdvancedMotionType';
import { PhoneMockup } from '../../components/PhoneMockup';
import { HolographicDeck } from '../../components/cinematic/HolographicDeck';
import { LaserScanner } from '../../components/cinematic/LaserScanner';
import { CyberGridFloor } from '../../components/cinematic/CyberGridFloor';

export const CinematicScene3Terminal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const terminalEntrance = spring({ frame, fps, config: CINEMATIC_BRAND.springs.cinematicDolly });
  const inputPopSpring = spring({ frame: frame - 40, fps, config: CINEMATIC_BRAND.springs.punchy });
  const queuePopSpring = spring({ frame: frame - 85, fps, config: CINEMATIC_BRAND.springs.punchy });

  // Camera whip transition out (Frames 255 - 270)
  const whipX = interpolate(frame, [255, 270], [0, -1400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: CINEMATIC_BRAND.colors.bgVoid, overflow: 'hidden' }}>
      <CinematicCamera
        move={{
          scale: 1,
          z: 0,
          rotateX: [1, -1],
          rotateY: [-2, 2],
          x: whipX,
        }}
        shakeFrame={40}
        shakeIntensity={7}
        enableMotionBlur={true}
      >
        {/* Cyber Grid Ground with Molten Amber Energy */}
        <CyberGridFloor
          color={CINEMATIC_BRAND.colors.amberCore}
          horizonColor={CINEMATIC_BRAND.colors.flameOrange}
          speed={1.0}
          opacity={0.25}
        />

        {/* Ambient Warm Volumetric Backlight */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            right: '25%',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* 2-Column Wide Cinematic Command Layout */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 90px',
            boxSizing: 'border-box',
            gap: 70,
            zIndex: 10,
          }}
        >
          {/* Left Column: Industrial Typography & Holographic Local Storage Bank */}
          <div
            style={{
              width: 560,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <div>
              <TrackingExpansionText
                text="⚡ PWA BLIND-SPOT ENGINE"
                startFrame={5}
                fontSize={18}
                color={CINEMATIC_BRAND.colors.amberCore}
              />

              <CharReveal
                text="WORK KEEPS MOVING."
                startFrame={10}
                staggerFrames={2}
                fontSize={72}
                color="#FFFFFF"
                style={{
                  textShadow: '0 8px 30px rgba(0,0,0,0.8), 0 0 25px rgba(245, 158, 11, 0.3)',
                  marginTop: 8,
                }}
              />

              <div
                style={{
                  fontFamily: CINEMATIC_BRAND.fonts.body,
                  fontSize: 20,
                  color: CINEMATIC_BRAND.colors.textMuted,
                  lineHeight: 1.5,
                  marginTop: 12,
                }}
              >
                Deep inside the steel kiln shell without cellular connection, Trunova remains fully responsive.
              </div>
            </div>

            {/* Dedicated Holographic Mutation Queue Bank */}
            <div
              style={{
                transform: `scale(${queuePopSpring})`,
                opacity: queuePopSpring,
              }}
            >
              <HolographicDeck
                title="Local IndexedDB Persistence Bank"
                badge="3 MUTATIONS QUEUED"
                accentColor={CINEMATIC_BRAND.colors.amberCore}
                glowColor={CINEMATIC_BRAND.colors.amberGlow}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Refractory Brick Installation', val: '+12.5 m', time: '10:42:15' },
                    { label: 'Worn Brick Demolition (Tearing)', val: '8.0 m', time: '10:35:00' },
                    { label: 'Cooler Castable Inspection', val: 'Pass QC', time: '10:20:44' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 10,
                        padding: '10px 16px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#10B981', fontWeight: 900 }}>✓</span>
                        <span style={{ fontFamily: CINEMATIC_BRAND.fonts.display, fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
                          {item.label}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 12, color: CINEMATIC_BRAND.colors.amberCore, fontWeight: 800 }}>
                          {item.val}
                        </span>
                        <span style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 11, color: '#64748B' }}>
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </HolographicDeck>
            </div>
          </div>

          {/* Right Column: 3D Holographic Smartphone Terminal */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              perspective: 1200,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              style={{
                transform: `scale(${Math.min(1, terminalEntrance * 0.96)}) rotateY(-12deg) rotateX(6deg)`,
                transformStyle: 'preserve-3d',
                position: 'relative',
              }}
            >
              {/* Phone Mockup with Laser Scanner Overlay */}
              <div style={{ position: 'relative' }}>
                <PhoneMockup
                  imageSrc="captures/mobile-01-input-progress.png"
                  isOffline={true}
                  width={350}
                  height={700}
                  style={{
                    backgroundColor: '#0F172A',
                    borderColor: 'rgba(245, 158, 11, 0.4)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  {/* Optical Laser Scanner Sweep */}
                  <LaserScanner
                    color={CINEMATIC_BRAND.colors.amberCore}
                    glowColor={CINEMATIC_BRAND.colors.amberGlow}
                    duration={50}
                  />

                  {/* Floating Action Confirmation Toast inside screen */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 140,
                      left: 18,
                      right: 18,
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      borderRadius: 16,
                      padding: '14px 16px',
                      color: '#FFFFFF',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.8)',
                      border: '1.5px solid #F59E0B',
                      transform: `scale(${inputPopSpring})`,
                      opacity: inputPopSpring,
                      zIndex: 30,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            backgroundColor: CINEMATIC_BRAND.colors.amberCore,
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
                          <div style={{ fontFamily: CINEMATIC_BRAND.fonts.display, fontWeight: 800, fontSize: 13 }}>
                            Input Bricking Progress: +12.5 m
                          </div>
                          <div style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 10, color: CINEMATIC_BRAND.colors.amberCore }}>
                            SAVED TO LOCAL INDEXEDDB
                          </div>
                        </div>
                      </div>

                      <span
                        style={{
                          backgroundColor: 'rgba(245, 158, 11, 0.2)',
                          color: CINEMATIC_BRAND.colors.amberCore,
                          fontSize: 10,
                          fontFamily: CINEMATIC_BRAND.fonts.mono,
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: 6,
                          border: '1px solid #F59E0B',
                        }}
                      >
                        QUEUED
                      </span>
                    </div>
                  </div>
                </PhoneMockup>
              </div>
            </div>
          </div>
        </div>
      </CinematicCamera>
    </AbsoluteFill>
  );
};
