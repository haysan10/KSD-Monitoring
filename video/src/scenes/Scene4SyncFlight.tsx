import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { Video60sCopy } from '../constants/copy';
import { CameraRig } from '../components/CameraRig';
import { CharReveal, TrackingExpansionText, EditorialBackdrop } from '../components/AdvancedMotionType';
import { PhoneMockup } from '../components/PhoneMockup';
import { BrowserMockup } from '../components/BrowserMockup';
import { SupergraphicBackdrop, CornerBrackets } from '../components/SupergraphicBackdrop';

interface Scene4Props {
  copy: Video60sCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene4SyncFlight: React.FC<Scene4Props> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // 1. Reconnection Spring (Frame 15)
  const onlineSpring = spring({
    frame: frame - 15,
    fps,
    config: BRAND.springs.punchy,
  });

  // 2. Data Card Flight Path (Frame 35 to 80)
  const flightProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.8 },
  });

  // 3. Browser Mockup Entrance (Frame 20)
  const browserSpring = spring({
    frame: frame - 20,
    fps,
    config: BRAND.springs.snappy,
  });

  // 4. Sync Success Toast on Browser (Frame 75)
  const syncSuccessSpring = spring({
    frame: frame - 75,
    fps,
    config: BRAND.springs.snappy,
  });

  // 3D Arc trajectory for Data Packet
  const flightX = interpolate(
    flightProgress,
    [0, 1],
    [isVertical ? 0 : -320, isVertical ? 0 : 200],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const flightY = interpolate(
    flightProgress,
    [0, 0.4, 1],
    [isVertical ? 220 : 60, isVertical ? 0 : -80, isVertical ? -160 : 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const flightScale = interpolate(
    flightProgress,
    [0, 0.45, 1],
    [0.7, 1.25, 0.95],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const flightRotZ = interpolate(
    flightProgress,
    [0, 0.5, 1],
    [-8, 12, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Whip transition out (Frames 225 - 240)
  const exitX = interpolate(frame, [225, 240], [0, isVertical ? -700 : -1100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.bgCream, overflow: 'hidden' }}>
      <CameraRig
        move={{
          scale: [0.98, 1.06],
          rotateX: [2, -1],
          rotateY: isVertical ? [0, 0] : [-4, 4],
          x: [0, exitX],
        }}
        shakeFrame={75}
      >
        {/* Giant Kinetic Word Backdrop */}
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: isVertical ? 130 : 240,
            fontWeight: 900,
            fontFamily: BRAND.fonts.display,
            color: 'rgba(37, 99, 235, 0.04)',
            letterSpacing: '-0.04em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1,
          }}
        >
          {frame < 110 ? copy.scene4.bgWord1 : copy.scene4.bgWord2}
        </div>

        {/* Dynamic Rays Supergraphic */}
        <SupergraphicBackdrop type="rays" opacity={0.06} rotationSpeed={0.18} />

        {/* Editorial Runner */}
        <EditorialBackdrop
          text="INSTANT RECONNECTION • SSE REAL-TIME SOCKET • ZERO DATA LOSS GUARANTEED"
          speed={1.5}
          fontSize={isVertical ? 80 : 130}
          color="rgba(15, 23, 42, 0.03)"
        />

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
          {/* Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#ECFDF5',
              padding: '6px 18px',
              borderRadius: 999,
              border: '1.5px solid #10B981',
              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.15)',
              transform: `scale(${onlineSpring})`,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 10px #10B981',
              }}
            />
            <span
              style={{
                fontFamily: BRAND.fonts.mono,
                fontSize: 13,
                fontWeight: 800,
                color: '#065F46',
              }}
            >
              SIGNAL RESTORED • 4G ONLINE
            </span>
          </div>

          <CharReveal
            text={copy.scene4.headline}
            startFrame={10}
            fontSize={isVertical ? 44 : 64}
            color={BRAND.colors.textDark}
            style={{ marginTop: 10 }}
          />

          <TrackingExpansionText
            text={copy.scene4.statusLabel}
            startFrame={25}
            fontSize={isVertical ? 12 : 16}
            color={BRAND.colors.cobalt}
            style={{ marginTop: 6 }}
          />
        </div>

        {/* Stage Content: Phone (Source) & Browser (Target) */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: isVertical ? 180 : 120,
            gap: isVertical ? 30 : 60,
            zIndex: 15,
          }}
        >
          {/* Left / Bottom: Mobile Phone (Synced) */}
          <div
            style={{
              transform: `scale(${isVertical ? 0.65 : 0.82}) translateY(${interpolate(browserSpring, [0, 1], [200, 0])}px) rotateY(${isVertical ? 0 : 8}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <PhoneMockup
              imageSrc="captures/mobile-01-input-progress.png"
              isOffline={false}
              width={380}
              height={760}
            />
          </div>

          {/* Right / Top: Desktop Dashboard Browser Mockup */}
          <div
            style={{
              transform: `scale(${browserSpring * (isVertical ? 0.65 : 0.88)}) translateY(${interpolate(browserSpring, [0, 1], [300, 0])}px) rotateY(${isVertical ? 0 : -6}deg)`,
              transformStyle: 'preserve-3d',
              position: 'relative',
            }}
          >
            <BrowserMockup
              imageSrc="captures/desktop-01-dashboard.png"
              width={isVertical ? 900 : 1000}
              height={isVertical ? 560 : 620}
            >
              {/* Green Sync Confirmation Toast docked inside dashboard */}
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: '12px 20px',
                  boxShadow: '0 12px 30px rgba(16, 185, 129, 0.25)',
                  border: '2px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transform: `scale(${syncSuccessSpring})`,
                  opacity: syncSuccessSpring,
                  zIndex: 25,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
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
                  <div style={{ fontFamily: BRAND.fonts.display, fontWeight: 800, fontSize: 13, color: '#065F46' }}>
                    SYNCHRONIZATION SUCCESSFUL
                  </div>
                  <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 11, color: '#047857' }}>
                    3 FIELD RECORDS COMMITTED TO SERVER
                  </div>
                </div>
              </div>
            </BrowserMockup>
          </div>
        </div>

        {/* 3D Flying Data Packet Container */}
        <div
          style={{
            position: 'absolute',
            zIndex: 40,
            pointerEvents: 'none',
            transform: `translate3d(${flightX}px, ${flightY}px, 100px) scale(${flightScale}) rotateZ(${flightRotZ}deg)`,
          }}
        >
          <div
            style={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: 16,
              padding: '16px 24px',
              border: '2px solid #F59E0B',
              boxShadow: '0 20px 40px rgba(245, 158, 11, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              position: 'relative',
              opacity: interpolate(flightProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
            }}
          >
            <CornerBrackets size={18} />
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: BRAND.colors.amber,
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 900,
              }}
            >
              🚀
            </div>
            <div>
              <div style={{ fontFamily: BRAND.fonts.display, fontWeight: 800, fontSize: 14, color: '#FFFFFF' }}>
                MUTATION_SYNC_PACKET
              </div>
              <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 11, color: BRAND.colors.amber }}>
                +12.5 m Bricking • Zero Drop
              </div>
            </div>
          </div>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
