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
import { SCurveView } from '../../components/views/SCurveView';
import { HumanizedCursor, CursorWaypoint } from '../../components/HumanizedCursor';
import { TextOverlayPill } from '../../components/TextOverlayPill';

export const Scene3ScurveSyncDesktop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle camera pan and push-in preserving safe margins around the mockup
  const cameraZoom = interpolate(frame, [0, 40], [1.0, 1.05], {
    extrapolateRight: 'clamp',
  });
  const cameraPanY = interpolate(frame, [0, 40], [0, -12], {
    extrapolateRight: 'clamp',
  });

  // Sync notification animation
  const syncBadgeSpring = spring({
    frame: frame - 8,
    fps,
    config: TEASER_TIMING.springs.pop,
  });

  // S-Curve Line Draw (starts frame 25)
  const curveDrawProgress = interpolate(frame, [25, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Numbers ticker
  const evmPercent = (interpolate(curveDrawProgress, [0, 1], [84.2, 88.0])).toFixed(1);

  // Variance Badge Pop
  const varianceSpring = spring({
    frame: frame - 60,
    fps,
    config: TEASER_TIMING.springs.pop,
  });

  // Tooltip HUD pop on hover
  const tooltipSpring = spring({
    frame: frame - 85,
    fps,
    config: TEASER_TIMING.springs.pop,
  });

  // Cursor coordinates
  const waypoints: CursorWaypoint[] = [
    { frame: 0, x: 790, y: 410 },
    { frame: 45, x: 980, y: 340 },
    { frame: 80, x: 1280, y: 275 }, // Hover over top point of curve
    { frame: 135, x: 1280, y: 275 },
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
          urlText="https://trunova.id/s-curve-tracking"
          tabTitle="TRUNOVA — Real-Time EVM S-Curve"
          connectionStatus="online"
        >
          <TrunovaAppShell activeView="scurve">
            <SCurveView />

            {/* Top-Right Sync Toast Banner */}
            <div
              style={{
                position: 'absolute',
                top: 110,
                right: 28,
                transform: `scale(${syncBadgeSpring})`,
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                padding: '10px 18px',
                borderRadius: 12,
                boxShadow: '0 12px 30px rgba(16, 185, 129, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                zIndex: 40,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 900 }}>SINKRONISASI SELESAI</div>
                <div style={{ fontSize: 10, opacity: 0.95, fontFamily: 'JetBrains Mono, monospace' }}>
                  3 Mutasi Offline Kiln Masuk • S-Curve Diperbarui
                </div>
              </div>
            </div>

            {/* Dynamic S-Curve SVG Overlay over the chart container */}
            <div
              style={{
                position: 'absolute',
                left: 250,
                top: 250,
                width: 1160,
                height: 250,
                pointerEvents: 'none',
                zIndex: 30,
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1160 250"
                fill="none"
                style={{ overflow: 'visible' }}
              >
                {/* Planned Target Line */}
                <path
                  d="M 30 220 C 350 210, 700 110, 1080 40"
                  stroke="#94A3B8"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  opacity="0.65"
                />

                {/* Actual EVM Line (Glowing Blue Surge) */}
                <path
                  d="M 30 220 C 350 210, 700 90, 1080 15"
                  stroke="#2563EB"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="1400"
                  strokeDashoffset={`${(1 - curveDrawProgress) * 1400}`}
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(37, 99, 235, 0.7))',
                  }}
                />

                {/* Leading Head Marker */}
                {curveDrawProgress > 0 && (
                  <circle
                    cx={30 + curveDrawProgress * 1050}
                    cy={220 - curveDrawProgress * 205 + Math.sin(curveDrawProgress * Math.PI) * 12}
                    r="8"
                    fill="#FFFFFF"
                    stroke="#2563EB"
                    strokeWidth="4"
                    style={{ filter: 'drop-shadow(0 0 8px #2563EB)' }}
                  />
                )}
              </svg>

              {/* Hover Tooltip at Apex */}
              {frame >= 85 && (
                <div
                  style={{
                    position: 'absolute',
                    right: 30,
                    top: 0,
                    transform: `scale(${tooltipSpring})`,
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    padding: '10px 16px',
                    borderRadius: 10,
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontFamily: 'JetBrains Mono, monospace',
                    zIndex: 40,
                  }}
                >
                  <div style={{ fontSize: 9.5, color: '#94A3B8' }}>TITIK CAPAIAN TERAKHIR</div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#10B981' }}>88.0% ACTUAL (+2.4% AHEAD)</div>
                  <div style={{ fontSize: 10, color: '#CBD5E1' }}>Ring 32 • Zero Overhaul Delay</div>
                </div>
              )}
            </div>

            {/* S-Curve Floating Dynamic Counters inside Chart Canvas */}
            <div
              style={{
                position: 'absolute',
                left: 300,
                top: 330,
                display: 'flex',
                gap: 14,
                zIndex: 35,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: 10,
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.1)',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ fontSize: 9.5, color: '#64748B', fontWeight: 700 }}>PROGRES AKUMULATIF</div>
                <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#2563EB' }}>
                  {evmPercent}%
                </div>
              </div>

              {frame >= 60 && (
                <div
                  style={{
                    transform: `scale(${varianceSpring})`,
                    backgroundColor: '#ECFDF5',
                    padding: '8px 16px',
                    borderRadius: 10,
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                    border: '1px solid #A7F3D0',
                  }}
                >
                  <div style={{ fontSize: 9.5, color: '#047857', fontWeight: 700 }}>SCHEDULE VARIANCE</div>
                  <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#10B981' }}>
                    +2.4% Ahead
                  </div>
                </div>
              )}
            </div>
          </TrunovaAppShell>

          {/* Humanized Cursor */}
          <HumanizedCursor
            currentFrame={frame}
            waypoints={waypoints}
            adminName="Admin • Dani R."
          />
        </DesktopBrowserChrome>
      </div>

      {/* Kinetic Text Overlay */}
      <TextOverlayPill
        category="EVM PROGRESS ENGINE"
        title="S-CURVE OTOMATIS REAL-TIME."
        frameStart={15}
        frameEnd={125}
        position="bottom"
      />
    </div>
  );
};
