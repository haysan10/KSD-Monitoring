import React from 'react';
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  Sequence,
  Img,
} from 'remotion';
import { StudioBackground } from '../components/StudioBackground';
import { DesktopBrowserChrome } from '../components/DesktopBrowserChrome';
import { TrunovaAppShell } from '../components/TrunovaAppShell';
import { DashboardView } from '../components/views/DashboardView';
import { PhoneMockup } from '../components/PhoneMockup';
import { MobileDashboardView } from '../components/views/MobileDashboardView';
import { MobileInputView } from '../components/views/MobileInputView';
import { HumanizedCursor, CursorWaypoint, CursorClick } from '../components/HumanizedCursor';
import { TextOverlayPill } from '../components/TextOverlayPill';

export const TrunovaDesktopToMobileTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background music fade out at the very end
  const bgmVolume = interpolate(frame, [0, 500, 540], [0.45, 0.45, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ==========================================
  // 1. ACT TIMINGS & PHASES (540 frames = 18s)
  // Act 1: 0 - 85   (Desktop Admin Focus)
  // Act 2: 85 - 150  (3D Transition to Phone)
  // Act 3: 150 - 270 (Mobile Field Report Input)
  // Act 4: 270 - 360 (Offline Sync & Recalculate)
  // Act 5: 360 - 455 (Dual-Device Synchronized View)
  // Act 6: 455 - 540 (Cinematic Brand Finale & CTA)
  // ==========================================

  // ==========================================
  // 2. DESKTOP WINDOW SPRINGS & TRANSFORMS
  // ==========================================
  // Entrance at frame 0
  const desktopEntrance = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 180, mass: 1.0 },
  });
  const initialWindowY = interpolate(desktopEntrance, [0, 1], [40, 0]);

  // Phase 2 transition (retreat to left): frame 85
  const desktopRetreat = spring({
    frame: frame - 85,
    fps,
    config: { damping: 18, stiffness: 130, mass: 0.9 },
  });

  // Dual-device return: frame 360 (desktop comes back into sharper focus on the left)
  const desktopDualSync = spring({
    frame: frame - 360,
    fps,
    config: { damping: 16, stiffness: 120, mass: 1.0 },
  });

  // Finale exit: frame 455
  const finaleExit = spring({
    frame: frame - 455,
    fps,
    config: { damping: 15, stiffness: 140, mass: 1.0 },
  });

  // Calculate desktop transforms
  let desktopScale = interpolate(desktopRetreat, [0, 1], [1.0, 0.70]);
  let desktopTranslateX = interpolate(desktopRetreat, [0, 1], [0, -380]);
  let desktopRotateY = interpolate(desktopRetreat, [0, 1], [0, 14]);
  let desktopOpacity = interpolate(desktopRetreat, [0, 1], [1.0, 0.35]);
  let desktopBlur = interpolate(desktopRetreat, [0, 1], [0, 3]);

  // In Act 5 (Dual Sync), desktop brightens up and aligns with safe padding
  if (frame >= 360) {
    desktopScale = interpolate(desktopDualSync, [0, 1], [0.70, 0.62]);
    desktopTranslateX = interpolate(desktopDualSync, [0, 1], [-380, -410]);
    desktopRotateY = interpolate(desktopDualSync, [0, 1], [14, 6]);
    desktopOpacity = interpolate(desktopDualSync, [0, 1], [0.35, 0.98]);
    desktopBlur = interpolate(desktopDualSync, [0, 1], [3, 0]);
  }

  // In Act 6 (Finale), devices fade out
  if (frame >= 455) {
    desktopOpacity = interpolate(finaleExit, [0, 1], [0.95, 0]);
    desktopScale = interpolate(finaleExit, [0, 1], [0.74, 0.65]);
  }

  // ==========================================
  // 3. SMARTPHONE SPRINGS & TRANSFORMS
  // ==========================================
  // Smartphone springs into view at frame 88
  const phoneEntrance = spring({
    frame: frame - 88,
    fps,
    config: { damping: 15, stiffness: 140, mass: 0.85 },
  });

  // Phone centers in Act 3: frame 140
  const phoneCenterProgress = spring({
    frame: frame - 140,
    fps,
    config: { damping: 16, stiffness: 120, mass: 1.0 },
  });

  // Phone moves to right in Act 5 (Dual Sync): frame 360
  const phoneDualSyncProgress = spring({
    frame: frame - 360,
    fps,
    config: { damping: 16, stiffness: 120, mass: 1.0 },
  });

  // Base values
  const phoneEntranceScale = interpolate(phoneEntrance, [0, 1], [0.75, 1.0]);
  const phoneEntranceX = interpolate(phoneEntrance, [0, 1], [420, 240]);
  const phoneEntranceOpacity = interpolate(phoneEntrance, [0, 0.2, 1], [0, 1, 1]);

  let phoneScale = phoneEntranceScale;
  let phoneTranslateX = phoneEntranceX;
  let phoneTranslateY = interpolate(phoneEntrance, [0, 1], [50, 0]);
  let phoneRotateY = 0;
  let phoneOpacity = phoneEntranceOpacity;

  // Center during Act 3 & 4
  if (frame >= 140 && frame < 360) {
    phoneTranslateX = interpolate(phoneCenterProgress, [0, 1], [240, 0]);
    phoneScale = interpolate(phoneCenterProgress, [0, 1], [1.0, 1.02]);
  }

  // Move right during Act 5 (Dual Sync) with safe margins
  if (frame >= 360) {
    phoneTranslateX = interpolate(phoneDualSyncProgress, [0, 1], [0, 460]);
    phoneScale = interpolate(phoneDualSyncProgress, [0, 1], [1.02, 0.86]);
    phoneRotateY = interpolate(phoneDualSyncProgress, [0, 1], [0, -6]);
  }

  // Fade out in Act 6 (Finale)
  if (frame >= 455) {
    phoneOpacity = interpolate(finaleExit, [0, 1], [1.0, 0]);
    phoneScale = interpolate(finaleExit, [0, 1], [0.86, 0.75]);
  }

  // Subtle breathing float for phone
  const phoneFloatY = Math.sin((frame / 30) * Math.PI) * 3;

  // ==========================================
  // 4. MOBILE INTERACTION STATES (ACT 3 & 4)
  // ==========================================
  // Tap on "Lapor" button at frame 160:
  const laporTapRippleProgress = interpolate(frame, [160, 175], [0.5, 2.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const laporTapRippleOpacity = interpolate(frame, [160, 164, 175], [0, 0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Form slider progress animation: frame 185 - 220 (88% to 100%)
  const mobileProgressValue = interpolate(frame, [185, 220], [88, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Photo attachment snap: frame 225
  const isPhotoAttached = frame >= 225;

  // Tap "Kirim Laporan" at frame 255:
  const isSubmitTapped = frame >= 255;
  const submitTapRipple = interpolate(frame, [255, 270], [0.8, 1.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Report submitted & toast active: frame 265 - 340
  const isReportSubmitted = frame >= 265;

  // ==========================================
  // 5. CURSOR WAYPOINTS
  // ==========================================
  const desktopWaypoints: CursorWaypoint[] = [
    { frame: 5, x: 1280, y: 720 },
    { frame: 25, x: 890, y: 430 },
    { frame: 45, x: 570, y: 242 },
    { frame: 80, x: 570, y: 242 },
  ];
  const desktopClicks: CursorClick[] = [
    { frame: 48, duration: 4 },
  ];

  // ==========================================
  // 6. FINALE BRAND OVERLAY SPRINGS (ACT 6)
  // ==========================================
  const finaleSpring = spring({
    frame: frame - 460,
    fps,
    config: { damping: 16, stiffness: 120, mass: 1.0 },
  });
  const finaleOpacity = interpolate(finaleSpring, [0, 1], [0, 1]);
  const finaleScale = interpolate(finaleSpring, [0, 1], [0.92, 1.0]);
  const finaleY = interpolate(finaleSpring, [0, 1], [30, 0]);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#FAF7F2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 1. STUDIO PRESENTATION BACKGROUND */}
      <StudioBackground />

      {/* 2. 3D PERSPECTIVE ENVIRONMENT */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: 1400,
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* ============================================================
            ACT 1 & 5: DESKTOP BROWSER WINDOW
            ============================================================ */}
        <div
          style={{
            position: 'absolute',
            width: 1460,
            height: 830,
            top: '50%',
            left: '50%',
            marginTop: -415,
            marginLeft: -730,
            transformStyle: 'preserve-3d',
            transform: `translate3d(${desktopTranslateX}px, ${initialWindowY}px, 0px) scale(${desktopScale}) rotateY(${desktopRotateY}deg)`,
            opacity: desktopOpacity,
            filter: desktopBlur > 0 ? `blur(${desktopBlur}px)` : 'none',
            boxShadow:
              frame >= 360
                ? '0 30px 80px rgba(15, 23, 42, 0.28), 0 0 40px rgba(16, 185, 129, 0.15)'
                : '0 25px 60px rgba(15, 23, 42, 0.14), 0 4px 16px rgba(15, 23, 42, 0.06)',
            borderRadius: 14,
            transition: 'filter 0.2s ease',
            zIndex: frame >= 360 ? 20 : 10,
          }}
        >
          <DesktopBrowserChrome
            tabTitle="TRUNOVA — Kiln #4 Command Center"
            urlText="https://trunova.id/command-center"
          >
            <TrunovaAppShell activeView="dashboard">
              <DashboardView
                totalProgress={frame >= 370 ? 86.8 : 84.2}
                ring32Progress={frame >= 370 ? 100.0 : 88.0}
              />
            </TrunovaAppShell>

            {/* Desktop Mouse Cursor during Act 1 */}
            {frame < 85 && (
              <HumanizedCursor
                currentFrame={frame}
                waypoints={desktopWaypoints}
                clicks={desktopClicks}
                adminName="Admin • Dani R."
              />
            )}
          </DesktopBrowserChrome>

          {/* Real-time Telemetry Sync Toast on Desktop in Act 5 */}
          {frame >= 370 && frame < 455 && (
            <div
              style={{
                position: 'absolute',
                top: 70,
                right: 24,
                backgroundColor: '#0F172A',
                border: '1px solid #10B981',
                borderRadius: 10,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(16, 185, 129, 0.3)',
                zIndex: 100,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#FFFFFF' }}>
                  TELEMETRY SYNC: Ring 32 Bricking 100% Tuntas!
                </div>
                <div style={{ fontSize: 10.5, color: '#94A3B8' }}>
                  EVM S-Curve Proyek terakselerasi ke <strong style={{ color: '#10B981' }}>86.8%</strong> (Ahead +2.6%).
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================
            ACT 2, 3, 4, 5: SMARTPHONE TITANIUM MOCKUP
            ============================================================ */}
        {frame >= 80 && frame < 465 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -395,
              marginLeft: -192.5,
              transformStyle: 'preserve-3d',
              transform: `translate3d(${phoneTranslateX}px, ${phoneTranslateY + phoneFloatY}px, 0px) scale(${phoneScale}) rotateY(${phoneRotateY}deg)`,
              opacity: phoneOpacity,
              zIndex: 30,
              boxShadow: '0 35px 90px rgba(15, 23, 42, 0.35), 0 10px 30px rgba(0, 0, 0, 0.2)',
              borderRadius: 48,
            }}
          >
            <PhoneMockup>
              {/* Screen Content Switcher */}
              {frame < 165 ? (
                // Initial Mobile Dashboard
                <MobileDashboardView />
              ) : frame >= 165 && frame < 325 ? (
                // Field Report Input Form
                <MobileInputView
                  progress={mobileProgressValue}
                  photoAttached={isPhotoAttached}
                  isSubmitting={isSubmitTapped && !isReportSubmitted}
                  isSubmitted={isReportSubmitted}
                />
              ) : (
                // Updated Mobile Dashboard after sync
                <MobileDashboardView
                  progress={86.8}
                  ring32Progress={100.0}
                />
              )}
            </PhoneMockup>

            {/* Tap Ripple on Lapor Button at Frame 160 */}
            {frame >= 160 && frame < 178 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: '50%',
                  marginLeft: -26,
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: '#2563EB',
                  transform: `scale(${laporTapRippleProgress})`,
                  opacity: laporTapRippleOpacity,
                  pointerEvents: 'none',
                  zIndex: 80,
                }}
              />
            )}

            {/* Tap Ripple on Kirim Laporan Button at Frame 255 */}
            {frame >= 255 && frame < 270 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 74,
                  left: '50%',
                  marginLeft: -80,
                  width: 160,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: '#10B981',
                  transform: `scale(${submitTapRipple})`,
                  opacity: 0.3,
                  pointerEvents: 'none',
                  zIndex: 80,
                }}
              />
            )}
          </div>
        )}

        {/* ============================================================
            ACT 5: TELEMETRY SYNC BEAM (BETWEEN PHONE & DESKTOP)
            ============================================================ */}
        {frame >= 365 && frame < 455 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: 45,
              width: 250,
              height: 4,
              background: 'linear-gradient(90deg, rgba(37,99,235,0.8) 0%, rgba(16,185,129,0.9) 50%, rgba(217,119,6,0.8) 100%)',
              boxShadow: '0 0 16px rgba(16,185,129,0.8), 0 0 30px rgba(37,99,235,0.6)',
              borderRadius: 9999,
              zIndex: 25,
              opacity: interpolate(frame, [365, 375, 445, 455], [0, 1, 1, 0]),
            }}
          >
            {/* Pulsing telemetry packet */}
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 0 12px #10B981',
                position: 'absolute',
                top: -5,
                left: `${interpolate((frame * 2.5) % 100, [0, 100], [0, 236])}px`,
              }}
            />
          </div>
        )}

        {/* ============================================================
            ACT 6: GRAND FINALE OUTRO & CALL TO ACTION
            ============================================================ */}
        {frame >= 455 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translateY(${finaleY}px) scale(${finaleScale})`,
              opacity: finaleOpacity,
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: 1100,
              padding: '48px 60px',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(24px)',
              borderRadius: 24,
              border: '1px solid rgba(226, 232, 240, 0.8)',
              boxShadow: '0 30px 90px rgba(15, 23, 42, 0.16), 0 0 40px rgba(37, 99, 235, 0.08)',
            }}
          >
            {/* Brand Logo Monogram */}
            <div
              style={{
                width: 72,
                height: 72,
                backgroundColor: '#0B111E',
                borderRadius: 18,
                border: '1.5px solid rgba(255, 255, 255, 0.16)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: 18,
              }}
            >
              <Img
                src={staticFile('branding/tr-monogram-white.svg')}
                style={{ height: 38, width: 'auto' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  backgroundColor: '#D97706',
                  boxShadow: '0 0 8px #F59E0B',
                }}
              />
            </div>

            {/* Brand Title */}
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 44,
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.03em',
                margin: '0 0 6px 0',
                lineHeight: 1.1,
              }}
            >
              TRUNOVA KILN SHUTDOWN
            </h1>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 20,
                fontWeight: 600,
                color: '#475569',
                margin: '0 0 28px 0',
                letterSpacing: '-0.01em',
              }}
            >
              Kendali Overhaul Total. Dari Lapangan Hingga Ruang Direksi.
            </p>

            {/* 4 Architectural Pillar Badges */}
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 32,
              }}
            >
              {[
                '🔒 Anti-Miskeying Monotonic Guard',
                '📡 Blind-Spot Offline PWA',
                '🛡️ 3-Stage QC Audit Pipeline',
                '📈 Live EVM S-Curve Engine',
              ].map((badge) => (
                <div
                  key={badge}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 9999,
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#1E293B',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              style={{
                padding: '16px 42px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                boxShadow: '0 12px 32px rgba(37, 99, 235, 0.4), 0 0 20px rgba(37, 99, 235, 0.25)',
                color: '#FFFFFF',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span>JADWALKAN DEMO OVERHAUL SEKARANG</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>

            <div style={{ marginTop: 14, fontSize: 12, fontWeight: 700, color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace" }}>
              trunova.id · Solusi Overhaul Kiln Semen Terintegrasi No. 1
            </div>
          </div>
        )}
      </div>

      {/* ============================================================
          3. KINETIC TEXT OVERLAY PILLS (BOTTOM SAFE MARGIN)
          ============================================================ */}
      <TextOverlayPill
        category="KILN OVERHAUL COMMAND CENTER"
        title="MONITORING DARI DESKTOP ADMIN."
        frameStart={10}
        frameEnd={80}
        position="bottom"
      />

      <TextOverlayPill
        category="SEAMLESS ECOSYSTEM"
        title="DARI COMMAND CENTER KE GENGGAMAN."
        frameStart={88}
        frameEnd={150}
        position="bottom"
      />

      <TextOverlayPill
        category="PELAPORAN LAPANGAN"
        title="ANTI-MISKEYING & BUKTI FOTO FISIK."
        frameStart={155}
        frameEnd={260}
        position="bottom"
      />

      <TextOverlayPill
        category="BLIND-SPOT OFFLINE PWA"
        title="DATA TERKUNCI AMAN & AUTO-SYNC."
        frameStart={265}
        frameEnd={355}
        accentColor="#10B981"
        position="bottom"
      />

      <TextOverlayPill
        category="DUAL-DEVICE REAL-TIME SYNC"
        title="UPDATE EXECUTIVE DASHBOARD SEKETIKA."
        frameStart={362}
        frameEnd={450}
        position="bottom"
      />

      <TextOverlayPill
        category="SIAPKAN SHUTDOWN PABRIK ANDA"
        title="COBA DEMO TRUNOVA SEKARANG."
        frameStart={460}
        frameEnd={535}
        accentColor="#F59E0B"
        position="bottom"
      />

      {/* ============================================================
          4. AUDIO DESIGN (BGM + PRECISE SFX SYNC)
          ============================================================ */}
      {/* 120 BPM Upbeat BGM */}
      <Audio
        src={staticFile('audio/bgm-upbeat.wav')}
        volume={bgmVolume}
      />

      {/* Act 1 SFX: Desktop Click */}
      <Sequence from={46} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-click.wav')} volume={0.65} />
      </Sequence>

      {/* Act 2 SFX: 3D Whoosh to Smartphone */}
      <Sequence from={86} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx-whoosh.wav')} volume={0.7} />
      </Sequence>

      {/* Act 3 SFX: Tap Lapor Pop */}
      <Sequence from={160} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.7} />
      </Sequence>

      {/* Act 3 SFX: Slider Drag Click */}
      <Sequence from={190} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-click.wav')} volume={0.5} />
      </Sequence>

      {/* Act 3 SFX: Photo Shutter */}
      <Sequence from={224} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx-shutter.wav')} volume={0.75} />
      </Sequence>

      {/* Act 3 SFX: Tap Kirim Laporan */}
      <Sequence from={255} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-click.wav')} volume={0.7} />
      </Sequence>

      {/* Act 4 SFX: Submission Check & Toast */}
      <Sequence from={266} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.8} />
      </Sequence>

      {/* Act 4 SFX: Recalculation Chime */}
      <Sequence from={320} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx-chime.wav')} volume={0.65} />
      </Sequence>

      {/* Act 5 SFX: Dual-Device Sync Whoosh */}
      <Sequence from={362} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx-whoosh.wav')} volume={0.65} />
      </Sequence>

      {/* Act 6 SFX: Grand Finale Chime & Stinger */}
      <Sequence from={460} durationInFrames={40}>
        <Audio src={staticFile('audio/sfx-chime.wav')} volume={0.85} />
      </Sequence>
    </div>
  );
};
