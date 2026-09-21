import React from 'react';
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from 'remotion';
import { TEASER_TIMING } from '../../constants/timingTeaser';
import { StudioBackground } from '../../components/StudioBackground';
import { DesktopBrowserChrome } from '../../components/DesktopBrowserChrome';
import { TrunovaAppShell } from '../../components/TrunovaAppShell';
import { MasterTableView } from '../../components/views/MasterTableView';
import { HumanizedCursor, CursorWaypoint, CursorClick } from '../../components/HumanizedCursor';

export const Scene5CliffhangerDesktop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: Cliffhanger inside desktop window (Frame 0 to 45)
  // Part 2: Brand Finale Reveal (Frame 46 to 135)
  const isBrandReveal = frame >= 46;

  // Gentle camera zoom in Part 1 preserving safe margins
  const cameraZoom = interpolate(frame, [0, 45], [1.0, 1.03], {
    extrapolateRight: 'clamp',
  });

  // Progress bar in modal (Frame 20 to 45)
  const progressPercent = interpolate(frame, [22, 44], [0, 99], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Modal scale up
  const modalScale = interpolate(frame, [20, 45], [0.85, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // White flash on frame 45-47
  const flashOpacity = interpolate(frame, [45, 46, 48], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Brand reveal springs
  const sunburstSpring = spring({
    frame: frame - 48,
    fps,
    config: TEASER_TIMING.springs.pop,
  });
  const sunburstScale = interpolate(sunburstSpring, [0, 1], [0.4, 1.0]);
  const sunburstRot = interpolate(sunburstSpring, [0, 1], [-45, 0]);

  const wordmarkSpring = spring({
    frame: frame - 60,
    fps,
    config: TEASER_TIMING.springs.rigid,
  });
  const wordmarkOpacity = interpolate(wordmarkSpring, [0, 1], [0, 1]);
  const wordmarkY = interpolate(wordmarkSpring, [0, 1], [25, 0]);

  const taglineSpring = spring({
    frame: frame - 72,
    fps,
    config: TEASER_TIMING.springs.rigid,
  });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineSpring, [0, 1], [20, 0]);

  const ctaSpring = spring({
    frame: frame - 84,
    fps,
    config: TEASER_TIMING.springs.pop,
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.85, 1.0]);
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1]);

  // Cursor in Part 1
  const waypoints: CursorWaypoint[] = [
    { frame: 0, x: 1080, y: 445 },
    { frame: 18, x: 1320, y: 195 }, // Move to Generate Executive Audit button
    { frame: 45, x: 1320, y: 195 },
  ];

  const clicks: CursorClick[] = [
    { frame: 20, duration: 4 },
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: isBrandReveal ? '#0F172A' : '#FAF8F5',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}
    >
      {/* Studio Background: Light in Part 1, Dark in Brand Reveal */}
      <StudioBackground dark={isBrandReveal} />

      {/* PART 1: The Cliffhanger Action inside Desktop Window */}
      {!isBrandReveal && (
        <div
          style={{
            transform: `scale(${cameraZoom})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <DesktopBrowserChrome
            width={1460}
            height={830}
            urlText="https://trunova.id/executive-reporting"
            tabTitle="TRUNOVA — Executive Reporting Engine"
          >
            <TrunovaAppShell activeView="table">
              <MasterTableView />

              {/* Action Trigger Button in Top Right */}
              <div
                style={{
                  position: 'absolute',
                  top: 110,
                  right: 28,
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  padding: '9px 20px',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 12.5,
                  boxShadow: '0 8px 25px rgba(15, 23, 42, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  zIndex: 25,
                  cursor: 'pointer',
                }}
              >
                <span>⚡ Generate Executive Overhaul Audit</span>
              </div>

              {/* Modal Dialog Opening Up and Rushing to 99% */}
              {frame >= 20 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.65)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 45,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      width: 580,
                      borderRadius: 20,
                      padding: '36px 40px',
                      boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
                      transform: `scale(${modalScale})`,
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        backgroundColor: '#EFF6FF',
                        margin: '0 auto 18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 26,
                      }}
                    >
                      📊
                    </div>

                    <div style={{ fontSize: 12, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: '#2563EB', marginBottom: 6 }}>
                      COMPUTING OVERHAUL TELEMETRY
                    </div>

                    <div style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 24 }}>
                      Mengkalkulasi Prediksi Firing Kiln...
                    </div>

                    {/* Progress Bar Container */}
                    <div
                      style={{
                        height: 14,
                        backgroundColor: '#E2E8F0',
                        borderRadius: 7,
                        overflow: 'hidden',
                        position: 'relative',
                        marginBottom: 12,
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${progressPercent}%`,
                          backgroundColor: '#2563EB',
                          borderRadius: 7,
                        }}
                      />
                    </div>

                    <div style={{ fontSize: 16, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#2563EB' }}>
                      {Math.round(progressPercent)}% Selesai
                    </div>
                  </div>
                </div>
              )}
            </TrunovaAppShell>

            {/* Humanized Cursor */}
            <HumanizedCursor
              currentFrame={frame}
              waypoints={waypoints}
              clicks={clicks}
              adminName="Admin • Dani R."
            />
          </DesktopBrowserChrome>
        </div>
      )}

      {/* PART 2: Brand Reveal Finale (Frame 46 to 135) */}
      {isBrandReveal && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 50,
          }}
        >
          {/* Subtle Sunburst Background Glow */}
          <div
            style={{
              position: 'absolute',
              width: 800,
              height: 800,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* 38-Ray Sunburst Icon */}
          <div
            style={{
              width: 140,
              height: 140,
              transform: `scale(${sunburstScale}) rotate(${sunburstRot}deg)`,
              marginBottom: 24,
              filter: 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.45))',
            }}
          >
            <Img
              src={staticFile('branding/sunburst-icon-amber.svg')}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Wordmark Logo */}
          <div
            style={{
              transform: `translateY(${wordmarkY}px)`,
              opacity: wordmarkOpacity,
              marginBottom: 16,
            }}
          >
            <Img
              src={staticFile('branding/trunova-logo-white.svg')}
              style={{ height: 48, filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))' }}
            />
          </div>

          {/* Punchy Tagline */}
          <div
            style={{
              transform: `translateY(${taglineY}px)`,
              opacity: taglineOpacity,
              fontSize: 32,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: 36,
              textAlign: 'center',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Satu Dashboard. Tanpa Meleset.
          </div>

          {/* CTA Button */}
          <div
            style={{
              transform: `scale(${ctaScale})`,
              opacity: ctaOpacity,
              backgroundColor: '#F59E0B',
              color: '#0F172A',
              padding: '16px 38px',
              borderRadius: 50,
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: '-0.01em',
              boxShadow: '0 15px 40px rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span>Coba Trunova Sekarang</span>
            <span style={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', opacity: 0.7 }}>•</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 800 }}>trunova.id</span>
          </div>

          {/* Subtext info */}
          <div
            style={{
              marginTop: 22,
              color: '#94A3B8',
              fontSize: 13,
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.04em',
              opacity: ctaOpacity,
            }}
          >
            KILN SHUTDOWN & REFRACTORY INTELLIGENCE PLATFORM
          </div>
        </div>
      )}

      {/* Instant Flash Whip Cut on Frame 45-47 */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFFFF',
            opacity: flashOpacity,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
