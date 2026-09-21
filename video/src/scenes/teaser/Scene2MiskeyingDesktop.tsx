import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { TEASER_TIMING } from '../../constants/timingTeaser';
import { StudioBackground } from '../../components/StudioBackground';
import { DesktopBrowserChrome } from '../../components/DesktopBrowserChrome';
import { TrunovaAppShell } from '../../components/TrunovaAppShell';
import { InputProgressView } from '../../components/views/InputProgressView';
import { HumanizedCursor, CursorWaypoint, CursorClick } from '../../components/HumanizedCursor';
import { TextOverlayPill } from '../../components/TextOverlayPill';

export const Scene2MiskeyingDesktop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle Virtual Camera push-in preserving safe padding around the mockup
  const cameraZoom = interpolate(frame, [0, 60], [1.0, 1.06], {
    extrapolateRight: 'clamp',
  });
  const cameraPanY = interpolate(frame, [0, 60], [0, -16], {
    extrapolateRight: 'clamp',
  });

  // Slider progress (starts frame 45)
  const sliderProgress = interpolate(frame, [45, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sliderMeter = (sliderProgress * 12.5).toFixed(1);
  const brickPcs = Math.round(sliderProgress * 3125).toLocaleString();
  const tonnage = (sliderProgress * 15.6).toFixed(1);

  // Save button click on frame 107
  const isSaveClicked = frame >= 107;
  const saveBtnDepress = isSaveClicked && frame < 112 ? 0.94 : 1.0;

  // Validation badge pop on frame 113
  const badgeProgress = spring({
    frame: frame - 113,
    fps,
    config: TEASER_TIMING.springs.pop,
  });

  // Cursor coordinates
  const waypoints: CursorWaypoint[] = [
    { frame: 0, x: 570, y: 242 },
    { frame: 25, x: 470, y: 228 },
    { frame: 45, x: 455, y: 228 }, // Arrive at slider handle
    { frame: 80, x: 1080, y: 228 }, // Drag slider right
    { frame: 95, x: 900, y: 350 }, // Move towards save button
    { frame: 106, x: 790, y: 410 }, // Hover on save
    { frame: 135, x: 790, y: 410 },
  ];

  const clicks: CursorClick[] = [
    { frame: 107, duration: 5 },
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Studio Background with Safe Margins */}
      <StudioBackground />

      {/* Camera Rig */}
      <div
        style={{
          transform: `scale(${cameraZoom}) translateY(${cameraPanY}px)`,
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
          urlText="https://trunova.id/input-progress"
          tabTitle="TRUNOVA — Input Progres Harian"
        >
          <TrunovaAppShell activeView="input">
            <InputProgressView />

            {/* Interactive Slider Card Overlay */}
            <div
              style={{
                position: 'absolute',
                left: 420,
                top: 125,
                width: 740,
                backgroundColor: '#FFFFFF',
                borderRadius: 18,
                padding: '24px 28px',
                boxShadow: '0 25px 60px -10px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(37, 99, 235, 0.3)',
                border: '2px solid #2563EB',
                zIndex: 30,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: '#2563EB' }}>
                    AREA PEKERJAAN REFRAKTORI
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A' }}>
                    Ring 32: Burning Zone (KM 24.2 - 36.7)
                  </div>
                </div>
                <div
                  style={{
                    padding: '4px 10px',
                    backgroundColor: '#EFF6FF',
                    borderRadius: 6,
                    color: '#2563EB',
                    fontSize: 11,
                    fontWeight: 800,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  AUTOCALC ACTIVE
                </div>
              </div>

              {/* Slider Control Container */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>Panjang Pemasangan Bata:</span>
                  <span style={{ fontSize: 20, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#0F172A' }}>
                    +{sliderMeter} meter
                  </span>
                </div>

                {/* Slider Track */}
                <div
                  style={{
                    height: 14,
                    backgroundColor: '#E2E8F0',
                    borderRadius: 7,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${sliderProgress * 100}%`,
                      backgroundColor: '#F59E0B',
                      borderRadius: 7,
                      transition: 'width 0.05s linear',
                    }}
                  />
                </div>
              </div>

              {/* Live Calculation Ticker Boxes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>JUMLAH BATA (PCS)</div>
                  <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#0F172A' }}>
                    {brickPcs} <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>pcs</span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>TOTAL TONASE REFRAKTORI</div>
                  <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#2563EB' }}>
                    {tonnage} <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>Ton</span>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div
                style={{
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  padding: '14px',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: '0.02em',
                  transform: `scale(${saveBtnDepress})`,
                  boxShadow: '0 8px 20px rgba(15, 23, 42, 0.25)',
                }}
              >
                Simpan Progres Pemasangan
              </div>

              {/* Validation Secured Pop-In Confirmation Overlay inside Card */}
              {frame >= 113 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(16, 185, 129, 0.96)',
                    borderRadius: 16,
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    zIndex: 50,
                    color: '#FFFFFF',
                    transform: `scale(${badgeProgress})`,
                    boxShadow: '0 20px 50px rgba(16, 185, 129, 0.5)',
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 36,
                      fontWeight: 900,
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    ✓
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em' }}>
                    FORMULA TERKUNCI AMAN
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#ECFDF5',
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: '0.04em',
                    }}
                  >
                    0 Typo Miskeying • Terverifikasi Otomatis
                  </div>
                </div>
              )}
            </div>
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

      {/* Kinetic Text Overlay */}
      <TextOverlayPill
        category="FORMULA INTEGRITY GUARD"
        title="ANTI SALAH KETIK."
        frameStart={15}
        frameEnd={125}
        position="bottom"
      />
    </div>
  );
};
