import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { Video60sCopy } from '../constants/copy';
import { CameraRig } from '../components/CameraRig';
import { CinematicVideoPlayer } from '../components/CinematicVideoPlayer';
import { CharReveal, TrackingExpansionText } from '../components/AdvancedMotionType';
import { SupergraphicBackdrop } from '../components/SupergraphicBackdrop';
import { HandUnderline } from '../components/HandDrawnAccents';

interface Scene1Props {
  copy: Video60sCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene1CinematicHook: React.FC<Scene1Props> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // Beat 8 (Frame 120 = 4.0s): Amber Flash Transition to "SINYAL TERPUTUS TOTAL"
  const isPhase2 = frame >= 120;
  const amberSnap = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.6 },
  });

  // Whip pan transition out (Frames 225 - 240)
  const whipPanX = interpolate(frame, [225, 240], [0, -1200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0B0F19', overflow: 'hidden' }}>
      <CameraRig
        move={{
          scale: isPhase2 ? [1, 1.06] : [1, 1.12],
          x: [0, whipPanX],
          rotateZ: [0, isPhase2 ? -1.5 : 0.8],
        }}
        shakeFrame={120}
      >
        {/* Real Kiln Video Footage in Background during Phase 1 */}
        {!isPhase2 && (
          <CinematicVideoPlayer
            src="videos/hero-kiln.mp4"
            startFrom={0}
            zoomRange={[1, 1.15]}
            opacity={0.8}
          />
        )}

        {/* Supergraphic Texture Scatter Overlay */}
        <SupergraphicBackdrop type="scatter" opacity={0.12} />

        {/* Phase 1: Overhaul Reality Video + HUD (0 - 120 frames) */}
        {!isPhase2 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              zIndex: 20,
              padding: '0 40px',
              maxWidth: isVertical ? 900 : 1200,
            }}
          >
            {/* Telemetry Tracking Badge */}
            <TrackingExpansionText
              text="⚡ INDUSTRIAL OVERHAUL REALITY"
              startFrame={8}
              fontSize={isVertical ? 14 : 18}
              color={BRAND.colors.amber}
              style={{ marginBottom: 16 }}
            />

            {/* Letter-by-letter Kinetic Reveal */}
            <CharReveal
              text={copy.scene1.part1}
              startFrame={15}
              staggerFrames={2}
              fontSize={isVertical ? 58 : 96}
              color="#FFFFFF"
              style={{ textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
            />

            <HandUnderline
              delay={35}
              color={BRAND.colors.amber}
              width={isVertical ? 280 : 450}
              strokeWidth={isVertical ? 4 : 6}
              style={{ marginTop: 12 }}
            />

            {/* Subtitle Telemetry */}
            <div
              style={{
                marginTop: 20,
                fontFamily: BRAND.fonts.mono,
                fontSize: isVertical ? 13 : 16,
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.75)',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(8px)',
                padding: '6px 18px',
                borderRadius: 8,
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              1400°C KILN SHELL • ZERO CELLULAR COVERAGE
            </div>
          </div>
        )}

        {/* Phase 2: Solid Flame Amber Block Snap (120 - 240 frames) */}
        {isPhase2 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: BRAND.colors.amber,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 30,
              transform: `scale(${amberSnap})`,
              padding: '0 40px',
              textAlign: 'center',
            }}
          >
            {/* Spinning Sunburst Rays Supergraphic Backdrop */}
            <SupergraphicBackdrop type="rays" opacity={0.18} rotationSpeed={0.25} />

            {/* Crossed Signal Icon */}
            <div
              style={{
                width: isVertical ? 80 : 110,
                height: isVertical ? 80 : 110,
                borderRadius: '50%',
                backgroundColor: BRAND.colors.textDark,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                boxShadow: '0 16px 36px rgba(0,0,0,0.2)',
                zIndex: 10,
              }}
            >
              <svg
                width={isVertical ? 44 : 60}
                height={isVertical ? 44 : 60}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>

            <CharReveal
              text={copy.scene1.part2}
              startFrame={122}
              staggerFrames={2}
              fontSize={isVertical ? 64 : 112}
              color={BRAND.colors.textDark}
              style={{ zIndex: 10 }}
            />

            <TrackingExpansionText
              text="OFFLINE IN THE BLIND-SPOT"
              startFrame={135}
              fontSize={isVertical ? 15 : 20}
              color="rgba(15, 23, 42, 0.75)"
              style={{ marginTop: 18, zIndex: 10 }}
            />
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
