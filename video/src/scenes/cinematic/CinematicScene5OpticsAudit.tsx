import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';
import { CinematicCamera } from '../../components/cinematic/CinematicCamera';
import { CharReveal, TrackingExpansionText } from '../../components/AdvancedMotionType';
import { LaserScanner } from '../../components/cinematic/LaserScanner';
import { CyberGridFloor } from '../../components/cinematic/CyberGridFloor';

export const CinematicScene5OpticsAudit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 Photo Cards Entrance and Stamp Springs
  const card1Spring = spring({ frame: frame - 15, fps, config: CINEMATIC_BRAND.springs.punchy });
  const stamp1Spring = spring({ frame: frame - 40, fps, config: CINEMATIC_BRAND.springs.punchy });

  const card2Spring = spring({ frame: frame - 65, fps, config: CINEMATIC_BRAND.springs.punchy });
  const stamp2Spring = spring({ frame: frame - 90, fps, config: CINEMATIC_BRAND.springs.punchy });

  const card3Spring = spring({ frame: frame - 115, fps, config: CINEMATIC_BRAND.springs.punchy });
  const stamp3Spring = spring({ frame: frame - 140, fps, config: CINEMATIC_BRAND.springs.punchy });

  // Camera whip transition out (Frames 255 - 270)
  const whipX = interpolate(frame, [255, 270], [0, -1400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const photoCards = [
    {
      step: 'STAGE 01',
      title: 'Before Tearing',
      tag: 'Old Lining Tearing',
      meter: 'KM 18.2 - 24.5',
      imgSrc: 'photos/audit-before.jpg',
      cardSpring: card1Spring,
      stampSpring: stamp1Spring,
      stampText: 'INSPECTED',
      rotY: 10,
      transZ: -30,
    },
    {
      step: 'STAGE 02',
      title: 'During Bricking',
      tag: 'New Brick Laying',
      meter: 'KM 24.5 - 32.0',
      imgSrc: 'photos/audit-during.jpg',
      cardSpring: card2Spring,
      stampSpring: stamp2Spring,
      stampText: 'VERIFIED',
      rotY: 0,
      transZ: 50,
    },
    {
      step: 'STAGE 03',
      title: 'After Key Jacking',
      tag: 'Final Key Jacking',
      meter: 'KM 32.0 - 37.0',
      imgSrc: 'photos/audit-after.jpg',
      cardSpring: card3Spring,
      stampSpring: stamp3Spring,
      stampText: 'APPROVED',
      rotY: -10,
      transZ: -30,
    },
  ];

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
        shakeFrame={140}
        shakeIntensity={7}
        enableMotionBlur={true}
      >
        {/* Deep Emerald Cyber Grid Ground */}
        <CyberGridFloor
          color={CINEMATIC_BRAND.colors.emeraldLaser}
          horizonColor="#059669"
          speed={1.2}
          opacity={0.25}
        />

        {/* Top Centered Kinetic Header */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 30,
            padding: '0 40px',
          }}
        >
          <TrackingExpansionText
            text="🛡️ 3-STAGE OPTICAL QC VERIFICATION"
            startFrame={5}
            fontSize={18}
            color={CINEMATIC_BRAND.colors.emeraldLaser}
          />

          <CharReveal
            text="AUTHENTICATED FIELD PROOF."
            startFrame={10}
            staggerFrames={2}
            fontSize={68}
            color="#FFFFFF"
            style={{
              textShadow: '0 8px 30px rgba(0,0,0,0.8), 0 0 30px rgba(16, 185, 129, 0.4)',
              marginTop: 6,
            }}
          />

          <div
            style={{
              fontFamily: CINEMATIC_BRAND.fonts.body,
              fontSize: 18,
              color: CINEMATIC_BRAND.colors.textMuted,
              marginTop: 8,
            }}
          >
            Cryptographically timestamped field photographs for Before, During, and After milestones.
          </div>
        </div>

        {/* 3D Curved Arc Photo Deck Container */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 90,
            gap: 32,
            perspective: 1200,
            transformStyle: 'preserve-3d',
            zIndex: 20,
          }}
        >
          {photoCards.map((card, idx) => {
            const cardScale = Math.min(1, card.cardSpring);
            const translateY = interpolate(card.cardSpring, [0, 1], [160, 0]);

            return (
              <div
                key={idx}
                style={{
                  width: 390,
                  backgroundColor: 'rgba(11, 17, 30, 0.88)',
                  backdropFilter: 'blur(24px)',
                  borderRadius: 24,
                  padding: 14,
                  border: '1.5px solid rgba(16, 185, 129, 0.35)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(16, 185, 129, 0.2)',
                  transform: `translateY(${translateY}px) scale(${cardScale}) translateZ(${card.transZ}px) rotateY(${card.rotY}deg)`,
                  transformStyle: 'preserve-3d',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Header Meta */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px 12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        backgroundColor: '#10B981',
                        color: '#064E3B',
                        fontFamily: CINEMATIC_BRAND.fonts.mono,
                        fontWeight: 900,
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 6,
                      }}
                    >
                      {card.step}
                    </span>
                    <span style={{ fontFamily: CINEMATIC_BRAND.fonts.display, fontWeight: 900, fontSize: 15, color: '#FFFFFF' }}>
                      {card.title}
                    </span>
                  </div>
                  <span style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 11, color: '#94A3B8' }}>
                    {card.meter}
                  </span>
                </div>

                {/* Photo Viewer with Laser Scanner */}
                <div
                  style={{
                    width: '100%',
                    height: 270,
                    borderRadius: 16,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#020408',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Img
                    src={staticFile(card.imgSrc)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.1) saturate(1.1)',
                    }}
                  />

                  {/* Optical Laser Scanner Sweep on active card */}
                  <LaserScanner
                    color={CINEMATIC_BRAND.colors.emeraldLaser}
                    glowColor={CINEMATIC_BRAND.colors.emeraldGlow}
                    duration={40}
                  />

                  {/* Glowing Laser Stamp Seal Slap */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) scale(${card.stampSpring}) rotate(-10deg)`,
                      border: '3px solid #10B981',
                      backgroundColor: 'rgba(16, 185, 129, 0.95)',
                      color: '#064E3B',
                      padding: '10px 24px',
                      borderRadius: 10,
                      fontFamily: CINEMATIC_BRAND.fonts.mono,
                      fontWeight: 900,
                      fontSize: 20,
                      letterSpacing: '0.12em',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 25px #10B981',
                      pointerEvents: 'none',
                      opacity: card.stampSpring,
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                    }}
                  >
                    ✓ {card.stampText}
                  </div>
                </div>

                {/* Bottom Tag */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 8px 4px',
                    fontFamily: CINEMATIC_BRAND.fonts.mono,
                    fontSize: 12,
                    color: '#94A3B8',
                  }}
                >
                  <span>TAG: {card.tag}</span>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>PASS 100%</span>
                </div>
              </div>
            );
          })}
        </div>
      </CinematicCamera>
    </AbsoluteFill>
  );
};
