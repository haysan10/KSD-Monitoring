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
import { DashboardView } from '../../components/views/DashboardView';
import { HumanizedCursor, CursorWaypoint, CursorClick } from '../../components/HumanizedCursor';
import { TextOverlayPill } from '../../components/TextOverlayPill';

export const Scene1PrepareDesktop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser entrance spring
  const windowEntrance = spring({
    frame,
    fps,
    config: TEASER_TIMING.springs.rigid,
  });

  const windowScale = interpolate(windowEntrance, [0, 1], [0.94, 1.0]);
  const windowY = interpolate(windowEntrance, [0, 1], [40, 0]);
  const windowOpacity = interpolate(windowEntrance, [0, 0.4, 1], [0, 1, 1]);

  // Subtle Virtual Camera push-in with safe padding preservation
  const cameraZoom = interpolate(frame, [0, 75], [1.0, 1.03], {
    extrapolateRight: 'clamp',
  });

  // Cursor movement: move directly towards EVM Circular Gauge
  const waypoints: CursorWaypoint[] = [
    { frame: 10, x: 1260, y: 720 },
    { frame: 28, x: 920, y: 440 },
    { frame: 42, x: 570, y: 242 }, // Land on EVM Circular Gauge
    { frame: 75, x: 570, y: 242 },
  ];

  const clicks: CursorClick[] = [
    { frame: 44, duration: 4 },
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
      {/* Studio Background with Safe Padding & Ambient Lighting */}
      <StudioBackground />

      {/* Camera Rig Layer */}
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
        {/* Browser Window containing REALISTIC DUMMY APP */}
        <DesktopBrowserChrome
          width={1460}
          height={830}
          style={{
            transform: `translateY(${windowY}px) scale(${windowScale})`,
            opacity: windowOpacity,
          }}
        >
          <TrunovaAppShell activeView="dashboard">
            <DashboardView />
          </TrunovaAppShell>

          {/* Simulated Cursor */}
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
        category="KILN OVERHAUL INTELLIGENCE"
        title="KENDALI OVERHAUL TOTAL."
        frameStart={14}
        frameEnd={70}
        position="bottom"
      />
    </div>
  );
};
