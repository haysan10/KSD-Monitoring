import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { SceneCopy } from '../constants/copy';
import { KineticWords } from '../components/KineticText';
import { HandUnderline } from '../components/HandDrawnAccents';

interface Scene1HookProps {
  copy: SceneCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene1Hook: React.FC<Scene1HookProps> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // Camera subtle push-in
  const cameraScale = interpolate(frame, [0, 90], [0.96, 1.04], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Beat 4 (Frame 36 = 1.2s): Bright Amber Flash / Transition
  const amberSnap = spring({
    frame: frame - 36,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.6 },
  });

  // Wipe transition out to Scene 2 (Frames 80-90)
  const wipeOut = interpolate(frame, [80, 90], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.bgCream,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transform: `scale(${cameraScale})`,
      }}
    >
      {/* Background Subtle Warm Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Part 1: "DI DALAM KILN." (Frames 0 - 36) */}
      {frame < 44 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            zIndex: 10,
            padding: '0 40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: BRAND.colors.amberSoft,
              border: `1.5px solid ${BRAND.colors.amber}`,
              padding: '6px 16px',
              borderRadius: 999,
              fontSize: isVertical ? 14 : 16,
              fontWeight: 800,
              fontFamily: BRAND.fonts.display,
              color: BRAND.colors.amberWarm,
              letterSpacing: '0.06em',
            }}
          >
            <span>⚡ OVERHAUL REALITY</span>
          </div>

          <KineticWords
            words={copy.scene1.part1.split(' ')}
            startFrame={3}
            staggerFrames={6}
            fontSize={isVertical ? 64 : 108}
            color={BRAND.colors.textDark}
            align="center"
            fontWeight={800}
          />

          <HandUnderline
            delay={16}
            color={BRAND.colors.amber}
            width={isVertical ? 240 : 400}
            strokeWidth={isVertical ? 4 : 6}
          />
        </div>
      )}

      {/* Part 2: "SINYAL HILANG." Solid Amber Fullscreen Block (Frames 36 - 90) */}
      {frame >= 36 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: BRAND.colors.amber,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            transform: `scale(${amberSnap})`,
            padding: '0 40px',
            textAlign: 'center',
          }}
        >
          {/* Signal Lost Icon Animation */}
          <div
            style={{
              width: isVertical ? 72 : 96,
              height: isVertical ? 72 : 96,
              borderRadius: '50%',
              backgroundColor: BRAND.colors.textDark,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
            }}
          >
            <svg
              width={isVertical ? 40 : 52}
              height={isVertical ? 40 : 52}
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

          <KineticWords
            words={copy.scene1.part2.split(' ')}
            startFrame={38}
            staggerFrames={6}
            fontSize={isVertical ? 72 : 124}
            color={BRAND.colors.textDark}
            align="center"
            fontWeight={800}
          />

          <div
            style={{
              marginTop: 20,
              fontFamily: BRAND.fonts.mono,
              fontSize: isVertical ? 14 : 18,
              fontWeight: 700,
              color: 'rgba(15, 23, 42, 0.75)',
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              padding: '6px 18px',
              borderRadius: 8,
              letterSpacing: '0.05em',
            }}
          >
            OFFLINE IN THE KILN
          </div>
        </div>
      )}

      {/* Wipe out effect */}
      {wipeOut > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: BRAND.colors.bgCream,
            transform: `translateY(${100 - wipeOut}%)`,
            zIndex: 30,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
