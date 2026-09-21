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
import { ValidationsView } from '../../components/views/ValidationsView';
import { HumanizedCursor, CursorWaypoint, CursorClick } from '../../components/HumanizedCursor';
import { TextOverlayPill } from '../../components/TextOverlayPill';

export const Scene4QcAuditDesktop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle Camera zoom preserving safe margins around the mockup
  const cameraZoom = interpolate(frame, [0, 50], [1.0, 1.06], {
    extrapolateRight: 'clamp',
  });
  const cameraPanY = interpolate(frame, [0, 50], [0, -16], {
    extrapolateRight: 'clamp',
  });

  // Click on Approve button at frame 69
  const isApproved = frame >= 69;
  const btnScale = isApproved && frame < 74 ? 0.92 : 1.0;

  // Stamp animation starts at frame 75
  const stampSpring = spring({
    frame: frame - 75,
    fps,
    config: TEASER_TIMING.springs.heavyStamp,
  });

  const stampScale = interpolate(stampSpring, [0, 1], [2.4, 1.0]);
  const stampRot = interpolate(stampSpring, [0, 1], [-28, -8]);
  const stampOpacity = interpolate(stampSpring, [0, 0.2, 1], [0, 1, 1]);

  // Stamp impact ripple
  const rippleProgress = interpolate(frame, [75, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rippleScale = interpolate(rippleProgress, [0, 1], [0.8, 1.8]);
  const rippleOpacity = interpolate(rippleProgress, [0, 0.2, 1], [0, 0.6, 0]);

  // Cursor coordinates
  const waypoints: CursorWaypoint[] = [
    { frame: 0, x: 1280, y: 275 },
    { frame: 35, x: 1160, y: 360 },
    { frame: 68, x: 1080, y: 445 }, // Land directly on center of Approve button
    { frame: 120, x: 1080, y: 445 },
  ];

  const clicks: CursorClick[] = [
    { frame: 69, duration: 5 },
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
          urlText="https://trunova.id/quality-validations"
          tabTitle="TRUNOVA — 3-Stage QC Photo Audit"
        >
          <TrunovaAppShell activeView="validations">
            <ValidationsView />

            {/* Detailed 3-Stage Inspection Card Foreground Overlay */}
            <div
              style={{
                position: 'absolute',
                left: 440,
                top: 125,
                width: 780,
                backgroundColor: '#FFFFFF',
                borderRadius: 18,
                padding: '24px 28px',
                boxShadow: '0 30px 70px -15px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(15, 23, 42, 0.08)',
                border: '2px solid #E2E8F0',
                zIndex: 35,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              {/* Title Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: '#10B981' }}>
                    QC AUDIT VERIFIED PIPELINE
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A' }}>
                    Ring 32 Bricking Quality Authentication
                  </div>
                </div>
                <div
                  style={{
                    padding: '5px 12px',
                    backgroundColor: '#ECFDF5',
                    borderRadius: 8,
                    color: '#047857',
                    fontSize: 11,
                    fontWeight: 800,
                    fontFamily: 'JetBrains Mono, monospace',
                    border: '1px solid #A7F3D0',
                  }}
                >
                  3-SLOT AUTHENTICATED
                </div>
              </div>

              {/* 3 Photo Slots Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
                {/* Slot 1: Before Tearing */}
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '2px solid #10B981',
                    position: 'relative',
                  }}
                >
                  <div style={{ height: 130, position: 'relative' }}>
                    <Img
                      src={staticFile('photos/audit-before.png')}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 6,
                        left: 6,
                        backgroundColor: '#10B981',
                        color: '#FFFFFF',
                        fontSize: 9,
                        fontWeight: 800,
                        fontFamily: 'JetBrains Mono, monospace',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                    >
                      PASSED ✓
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', fontSize: 11, fontWeight: 800, color: '#334155' }}>
                    Stage 1: Before Tearing
                  </div>
                </div>

                {/* Slot 2: During Bricking */}
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '2px solid #10B981',
                    position: 'relative',
                  }}
                >
                  <div style={{ height: 130, position: 'relative' }}>
                    <Img
                      src={staticFile('photos/audit-during.png')}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 6,
                        left: 6,
                        backgroundColor: '#10B981',
                        color: '#FFFFFF',
                        fontSize: 9,
                        fontWeight: 800,
                        fontFamily: 'JetBrains Mono, monospace',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                    >
                      PASSED ✓
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', fontSize: 11, fontWeight: 800, color: '#334155' }}>
                    Stage 2: During Bricking
                  </div>
                </div>

                {/* Slot 3: After Key Jacking */}
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: frame >= 75 ? '2px solid #10B981' : '2px solid #F59E0B',
                    position: 'relative',
                    boxShadow: frame < 75 ? '0 0 16px rgba(245, 158, 11, 0.35)' : 'none',
                  }}
                >
                  <div style={{ height: 130, position: 'relative' }}>
                    <Img
                      src={staticFile('photos/audit-after.png')}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* Stamp Impact Ripple */}
                    {rippleOpacity > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          border: '3px solid #10B981',
                          borderRadius: 8,
                          transform: `scale(${rippleScale})`,
                          opacity: rippleOpacity,
                          pointerEvents: 'none',
                        }}
                      />
                    )}

                    {/* Haptic QC Stamp */}
                    {frame >= 75 && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          transform: `scale(${stampScale}) rotate(${stampRot}deg)`,
                          opacity: stampOpacity,
                          pointerEvents: 'none',
                        }}
                      >
                        <div
                          style={{
                            border: '4px solid #10B981',
                            backgroundColor: 'rgba(236, 253, 245, 0.94)',
                            color: '#047857',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontWeight: 900,
                            fontSize: 14,
                            padding: '6px 12px',
                            borderRadius: 6,
                            letterSpacing: '0.08em',
                            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                          }}
                        >
                          <div>QC PASSED</div>
                          <div style={{ fontSize: 9 }}>AUTHENTICATED</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '8px 10px', fontSize: 11, fontWeight: 800, color: '#334155' }}>
                    Stage 3: After Key Jacking
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <div
                  style={{
                    backgroundColor: frame >= 75 ? '#10B981' : '#0F172A',
                    color: '#FFFFFF',
                    padding: '12px 28px',
                    borderRadius: 10,
                    fontWeight: 800,
                    fontSize: 13,
                    letterSpacing: '0.03em',
                    transform: `scale(${btnScale})`,
                    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span>{frame >= 75 ? '✓ Validasi Disetujui' : 'Setujui Validasi Kualitas'}</span>
                </div>
              </div>
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
        category="3-STAGE AUDIT GATE"
        title="VALIDASI FISIK 3-TAHAP."
        frameStart={15}
        frameEnd={110}
        position="bottom"
      />
    </div>
  );
};
