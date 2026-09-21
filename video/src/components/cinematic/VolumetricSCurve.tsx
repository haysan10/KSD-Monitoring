import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';

interface VolumetricSCurveProps {
  width?: number;
  height?: number;
  curveProgress: number; // 0 to 1
  currentPercent: number; // e.g. 88
  varianceText: string;
  spiText?: string;
  style?: React.CSSProperties;
}

export const VolumetricSCurve: React.FC<VolumetricSCurveProps> = ({
  width = 960,
  height = 540,
  curveProgress,
  currentPercent,
  varianceText,
  spiText = '1.03 (Optimal)',
  style,
}) => {
  const frame = useCurrentFrame();

  // Pulse effect on leading beacon
  const beaconPulse = 1 + Math.sin(frame * 0.3) * 0.25;

  // Path coordinates in 800x380 SVG space
  const plannedPath = 'M 80 320 C 260 315, 480 90, 720 50';
  const actualPath = 'M 80 320 C 240 315, 400 190, 560 92';
  const actualLength = 580;
  const dashOffset = actualLength * (1 - curveProgress);

  // Tip coordinate calculation
  const tipX = interpolate(curveProgress, [0, 0.4, 0.7, 1], [80, 220, 400, 560], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tipY = interpolate(curveProgress, [0, 0.4, 0.7, 1], [320, 305, 190, 92], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: 'rotateX(20deg) rotateY(-6deg)',
        backgroundColor: 'rgba(11, 17, 30, 0.85)',
        backdropFilter: 'blur(30px)',
        borderRadius: 28,
        border: '1.5px solid rgba(6, 182, 212, 0.35)',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(6, 182, 212, 0.25)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Top Hologram Command Bar */}
      <div
        style={{
          padding: '16px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 12px #10B981',
            }}
          />
          <span
            style={{
              fontFamily: CINEMATIC_BRAND.fonts.display,
              fontWeight: 900,
              fontSize: 15,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
            }}
          >
            VOLUMETRIC S-CURVE MATRIX • EVM ENGINE
          </span>
        </div>

        {/* Status Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 2, borderTop: '2px dashed #94A3B8' }} />
            <span style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 11, color: '#94A3B8' }}>
              Planned Baseline
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 20,
                height: 4,
                borderRadius: 2,
                backgroundColor: CINEMATIC_BRAND.colors.amberCore,
                boxShadow: '0 0 8px #F59E0B',
              }}
            />
            <span
              style={{
                fontFamily: CINEMATIC_BRAND.fonts.mono,
                fontSize: 11,
                color: CINEMATIC_BRAND.colors.amberCore,
                fontWeight: 700,
              }}
            >
              Actual Trajectory
            </span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div style={{ flex: 1, position: 'relative', padding: '10px 30px' }}>
        <svg viewBox="0 0 800 370" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="volumetricGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Horizon Lines */}
          {[
            { y: 50, label: '100%' },
            { y: 115, label: '75%' },
            { y: 185, label: '50%' },
            { y: 255, label: '25%' },
            { y: 320, label: '0%' },
          ].map((g, i) => (
            <g key={i}>
              <line x1="70" y1={g.y} x2="740" y2={g.y} stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              <text
                x="55"
                y={g.y + 4}
                textAnchor="end"
                fontFamily={CINEMATIC_BRAND.fonts.mono}
                fontSize="11"
                fill="rgba(255, 255, 255, 0.4)"
              >
                {g.label}
              </text>
            </g>
          ))}

          {/* Milestone Columns */}
          {[
            { x: 80, label: 'D-01 (Shutdown)' },
            { x: 240, label: 'D-05 (Tearing)' },
            { x: 400, label: 'D-10 (Bricking)' },
            { x: 560, label: 'D-14 (Jacking)' },
            { x: 720, label: 'D-18 (Firing)' },
          ].map((m, i) => (
            <g key={i}>
              <line
                x1={m.x}
                y1="50"
                x2={m.x}
                y2="320"
                stroke="rgba(6, 182, 212, 0.2)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={m.x}
                y="345"
                textAnchor="middle"
                fontFamily={CINEMATIC_BRAND.fonts.mono}
                fontSize="11"
                fill="rgba(6, 182, 212, 0.8)"
                fontWeight="600"
              >
                {m.label}
              </text>
            </g>
          ))}

          {/* Planned Dashed Trajectory */}
          <path
            d={plannedPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />

          {/* Glowing Animated Actual Trajectory */}
          <path
            d={actualPath}
            fill="none"
            stroke="url(#volumetricGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={actualLength}
            strokeDashoffset={dashOffset}
            filter="url(#neonGlow)"
          />

          {/* Leading Energy Beacon */}
          {curveProgress > 0.05 && (
            <g transform={`translate(${tipX}, ${tipY})`}>
              <circle r={22 * beaconPulse} fill="none" stroke="#10B981" strokeWidth="2" opacity={0.4} />
              <circle r="12" fill="#10B981" filter="url(#neonGlow)" />
              <circle r="5" fill="#FFFFFF" />

              {/* Holographic Callout Box */}
              {curveProgress > 0.3 && (
                <g transform="translate(18, -35)">
                  <rect
                    width="140"
                    height="42"
                    rx="10"
                    fill="rgba(11, 17, 30, 0.95)"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    filter="drop-shadow(0 8px 25px rgba(0,0,0,0.8))"
                  />
                  <text
                    x="14"
                    y="18"
                    fontFamily={CINEMATIC_BRAND.fonts.display}
                    fontSize="13"
                    fontWeight="900"
                    fill="#FFFFFF"
                  >
                    {currentPercent}% COMPLETED
                  </text>
                  <text
                    x="14"
                    y="34"
                    fontFamily={CINEMATIC_BRAND.fonts.mono}
                    fontSize="11"
                    fontWeight="700"
                    fill="#10B981"
                  >
                    +2.4% AHEAD OF PLAN
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Telemetry Strip */}
      <div
        style={{
          padding: '14px 28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: CINEMATIC_BRAND.fonts.mono, fontSize: 12, color: '#94A3B8' }}>
            KILN ASSET: <strong style={{ color: '#FFFFFF' }}>RK-04 ROTARY KILN</strong>
          </span>
          <span
            style={{
              backgroundColor: 'rgba(6, 182, 212, 0.15)',
              color: '#38BDF8',
              border: '1px solid #06B6D4',
              borderRadius: 6,
              padding: '2px 8px',
              fontFamily: CINEMATIC_BRAND.fonts.mono,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            SPI: {spiText}
          </span>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            color: '#34D399',
            border: '1px solid #10B981',
            borderRadius: 8,
            padding: '4px 14px',
            fontFamily: CINEMATIC_BRAND.fonts.mono,
            fontSize: 12,
            fontWeight: 800,
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)',
          }}
        >
          {varianceText} • ZERO RESTART SLIP
        </div>
      </div>
    </div>
  );
};
