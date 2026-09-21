import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';
import { CinematicCamera } from '../../components/cinematic/CinematicCamera';
import { CharReveal, TrackingExpansionText } from '../../components/AdvancedMotionType';
import { BrowserMockup } from '../../components/BrowserMockup';
import { CyberGridFloor } from '../../components/cinematic/CyberGridFloor';

export const CinematicScene4HyperSync: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance & Camera Speed Ramp
  const consoleEntrance = spring({ frame: frame - 10, fps, config: CINEMATIC_BRAND.springs.cinematicDolly });
  const syncToastSpring = spring({ frame: frame - 65, fps, config: CINEMATIC_BRAND.springs.punchy });

  // 3D Flying Data Packet Trajectory
  const flightProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.7 },
  });

  const packetX = interpolate(flightProgress, [0, 1], [-550, 260], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const packetY = interpolate(flightProgress, [0, 0.45, 1], [180, -70, 20], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const packetZ = interpolate(flightProgress, [0, 0.5, 1], [-100, 220, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const packetRotZ = interpolate(flightProgress, [0, 0.5, 1], [-15, 18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Whip transition out (Frames 225 - 240)
  const whipX = interpolate(frame, [225, 240], [0, -1400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: CINEMATIC_BRAND.colors.bgVoid, overflow: 'hidden' }}>
      <CinematicCamera
        move={{
          scale: 1,
          z: 0,
          rotateX: [1.5, -1],
          rotateY: [-2, 2],
          x: whipX,
        }}
        shakeFrame={65}
        shakeIntensity={7}
        enableMotionBlur={true}
      >
        {/* Cyber Grid Ground with Cyber Cyan Energy */}
        <CyberGridFloor
          color={CINEMATIC_BRAND.colors.cyberCyan}
          horizonColor={CINEMATIC_BRAND.colors.cyberBlue}
          speed={2.2}
          opacity={0.3}
        />

        {/* Giant Watermark Background Word */}
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 260,
            fontWeight: 900,
            fontFamily: CINEMATIC_BRAND.fonts.display,
            color: 'rgba(6, 182, 212, 0.04)',
            letterSpacing: '-0.04em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {frame < 90 ? 'RECONNECTED' : 'SYNCHRONIZED'}
        </div>

        {/* Top Centered Cinematic Kinetic Header */}
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
            text="⚡ ZERO DATA LOSS ARCHITECTURE"
            startFrame={5}
            fontSize={18}
            color={CINEMATIC_BRAND.colors.cyberCyan}
          />

          <CharReveal
            text="INSTANT RECONNECTION."
            startFrame={10}
            staggerFrames={2}
            fontSize={68}
            color="#FFFFFF"
            style={{
              textShadow: '0 8px 30px rgba(0,0,0,0.8), 0 0 30px rgba(6, 182, 212, 0.4)',
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
            Stepping out of the kiln shell triggers automatic high-speed SSE synchronization.
          </div>
        </div>

        {/* Central 3D Curved Command Dashboard Bridge */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 100,
            transform: `scale(${Math.min(1, consoleEntrance * 0.95)})`,
            transformStyle: 'preserve-3d',
            zIndex: 15,
          }}
        >
          <div style={{ position: 'relative' }}>
            <BrowserMockup
              imageSrc="captures/desktop-01-dashboard.png"
              width={1120}
              height={600}
              style={{
                boxShadow: '0 35px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(6, 182, 212, 0.3)',
                borderColor: 'rgba(6, 182, 212, 0.35)',
              }}
            >
              {/* Neon Green Synchronization Pass Toast inside Console */}
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  backgroundColor: 'rgba(15, 23, 42, 0.94)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: 16,
                  padding: '14px 24px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.8), 0 0 30px rgba(16, 185, 129, 0.4)',
                  border: '2px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  transform: `scale(${syncToastSpring})`,
                  opacity: syncToastSpring,
                  zIndex: 35,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: 18,
                    boxShadow: '0 0 15px #10B981',
                  }}
                >
                  ✓
                </div>
                <div>
                  <div style={{ fontFamily: CINEMATIC_BRAND.fonts.display, fontWeight: 900, fontSize: 15, color: '#34D399' }}>
                    SYNCHRONIZATION SUCCESSFUL
                  </div>
                  <div style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 12, color: '#A7F3D0' }}>
                    3 FIELD RECORDS COMMITTED TO SERVER • 0 DATA LOSS
                  </div>
                </div>
              </div>
            </BrowserMockup>
          </div>
        </div>

        {/* 3D Flying Data Stream Packet */}
        <div
          style={{
            position: 'absolute',
            zIndex: 50,
            pointerEvents: 'none',
            transform: `translate3d(${packetX}px, ${packetY}px, ${packetZ}px) rotateZ(${packetRotZ}deg)`,
            opacity: interpolate(flightProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
          }}
        >
          <div
            style={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: 18,
              padding: '16px 26px',
              border: '2px solid #F59E0B',
              boxShadow: '0 20px 50px rgba(245, 158, 11, 0.5), 0 0 30px rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: CINEMATIC_BRAND.colors.amberCore,
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 900,
              }}
            >
              🚀
            </div>
            <div>
              <div style={{ fontFamily: CINEMATIC_BRAND.fonts.display, fontWeight: 900, fontSize: 14, color: '#FFFFFF' }}>
                MUTATION_SYNC_PACKET
              </div>
              <div style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 11, color: CINEMATIC_BRAND.colors.amberCore }}>
                +12.5m Bricking • Instant Socket Flush
              </div>
            </div>
          </div>
        </div>
      </CinematicCamera>
    </AbsoluteFill>
  );
};
