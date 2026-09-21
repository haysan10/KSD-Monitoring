import React from 'react';
import { interpolate } from 'remotion';

export interface CursorWaypoint {
  frame: number;
  x: number;
  y: number;
}

export interface CursorClick {
  frame: number;
  duration?: number; // default 4 frames
}

interface HumanizedCursorProps {
  currentFrame: number;
  waypoints: CursorWaypoint[];
  clicks?: CursorClick[];
  adminName?: string;
  visible?: boolean;
}

export const HumanizedCursor: React.FC<HumanizedCursorProps> = ({
  currentFrame,
  waypoints,
  clicks = [],
  adminName = 'Admin • Dani R.',
  visible = true,
}) => {
  if (!visible || waypoints.length === 0) return null;

  // Find surrounding waypoints
  let currentX = waypoints[0].x;
  let currentY = waypoints[0].y;

  if (currentFrame <= waypoints[0].frame) {
    currentX = waypoints[0].x;
    currentY = waypoints[0].y;
  } else if (currentFrame >= waypoints[waypoints.length - 1].frame) {
    currentX = waypoints[waypoints.length - 1].x;
    currentY = waypoints[waypoints.length - 1].y;
  } else {
    // Interpolate between two waypoints
    for (let i = 0; i < waypoints.length - 1; i++) {
      const p1 = waypoints[i];
      const p2 = waypoints[i + 1];
      if (currentFrame >= p1.frame && currentFrame <= p2.frame) {
        // Curved Bezier-like smooth interpolation
        const t = (currentFrame - p1.frame) / (p2.frame - p1.frame);
        // Smooth ease-in-out curve
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        // Add subtle natural arc perpendicular to motion
        const midArc = Math.sin(t * Math.PI) * 16;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const perpX = dist > 0 ? -dy / dist : 0;
        const perpY = dist > 0 ? dx / dist : 0;

        currentX = p1.x + (p2.x - p1.x) * ease + perpX * midArc;
        currentY = p1.y + (p2.y - p1.y) * ease + perpY * midArc;
        break;
      }
    }
  }

  // Check click events
  let isClicking = false;
  let rippleScale = 0;
  let rippleOpacity = 0;

  for (const click of clicks) {
    const dur = click.duration || 5;
    if (currentFrame >= click.frame && currentFrame < click.frame + dur) {
      isClicking = true;
    }
    // Ripple persists for 14 frames after click start
    if (currentFrame >= click.frame && currentFrame < click.frame + 14) {
      const rf = currentFrame - click.frame;
      rippleScale = interpolate(rf, [0, 14], [0.6, 2.2]);
      rippleOpacity = interpolate(rf, [0, 4, 14], [0.5, 0.4, 0]);
    }
  }

  const cursorScale = isClicking ? 0.88 : 1.0;

  return (
    <div
      style={{
        position: 'absolute',
        left: currentX,
        top: currentY,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `scale(${cursorScale})`,
        transformOrigin: '0 0',
        transition: 'transform 0.05s ease',
      }}
    >
      {/* Click Ripple Effect */}
      {rippleOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            left: -16,
            top: -16,
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '2px solid #2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* SVG Precision Pointer */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          filter: 'drop-shadow(0 4px 10px rgba(15, 23, 42, 0.35))',
          display: 'block',
        }}
      >
        <path
          d="M4.5 2.5V21.5L9.8 16.2H17.5L4.5 2.5Z"
          fill="#0F172A"
        />
        <path
          d="M5.5 4.5V18.8L9.2 15.2H15L5.5 4.5Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* Admin Name Badge */}
      {adminName && (
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            fontSize: 10,
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 800,
            letterSpacing: '0.04em',
            padding: '3px 8px',
            borderRadius: 6,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span>{adminName}</span>
        </div>
      )}
    </div>
  );
};
