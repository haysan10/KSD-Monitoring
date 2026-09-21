import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { CornerBrackets } from './SupergraphicBackdrop';

interface SCurveChartCanvasProps {
  width?: number;
  height?: number;
  curveProgress: number; // 0 to 1
  currentPercent: number; // e.g. 64 to 88
  varianceText: string;
  isVertical?: boolean;
  style?: React.CSSProperties;
}

export const SCurveChartCanvas: React.FC<SCurveChartCanvasProps> = ({
  width = 860,
  height = 500,
  curveProgress,
  currentPercent,
  varianceText,
  isVertical = false,
  style,
}) => {
  const frame = useCurrentFrame();

  // Pulse effect on tip beacon
  const tipPulse = 1 + Math.sin(frame * 0.25) * 0.2;

  // Path definition in 700x340 space
  // Baseline planned S-curve: (60, 280) -> (640, 50)
  const plannedPath = 'M 70 285 C 240 280, 420 80, 640 45';

  // Actual progress path: (70, 285) -> (505, 80) representing 88% progress
  const actualPath = 'M 70 285 C 220 280, 360 170, 505 82';
  const actualPathTotalLength = 520;
  const strokeDashoffset = actualPathTotalLength * (1 - curveProgress);

  // Tip coordinate at 88% (x: 505, y: 82)
  // Interpolated current tip coordinates along progress
  const tipX = interpolate(curveProgress, [0, 0.4, 0.7, 1], [70, 200, 360, 505], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tipY = interpolate(curveProgress, [0, 0.4, 0.7, 1], [285, 270, 170, 82], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1), 0 1px 3px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <CornerBrackets size={20} />

      {/* Header Bar */}
      <div
        style={{
          padding: isVertical ? '14px 18px' : '16px 24px',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFA',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 10px #10B981',
            }}
          />
          <span
            style={{
              fontFamily: BRAND.fonts.display,
              fontWeight: 800,
              fontSize: isVertical ? 12 : 14,
              color: BRAND.colors.textDark,
              letterSpacing: '-0.01em',
            }}
          >
            S-CURVE TRAJECTORY ENGINE • LIVE EVM
          </span>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isVertical ? 10 : 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 16,
                height: 2,
                backgroundColor: '#94A3B8',
                borderTop: '2px dashed #94A3B8',
              }}
            />
            <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 11, color: '#64748B' }}>
              Planned Baseline
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 18,
                height: 4,
                borderRadius: 2,
                backgroundColor: BRAND.colors.amber,
              }}
            />
            <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 11, color: BRAND.colors.amberWarm, fontWeight: 700 }}>
              Actual Progress
            </span>
          </div>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div style={{ flex: 1, position: 'relative', padding: isVertical ? '10px 14px' : '16px 24px' }}>
        <svg
          viewBox="0 0 700 320"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="actualCurveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="55%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            <linearGradient id="curveAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.22)" />
              <stop offset="100%" stopColor="rgba(37, 99, 235, 0.0)" />
            </linearGradient>

            <filter id="curveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Horizontal Grid Lines */}
          {[
            { y: 45, label: '100%' },
            { y: 105, label: '75%' },
            { y: 165, label: '50%' },
            { y: 225, label: '25%' },
            { y: 285, label: '0%' },
          ].map((grid, i) => (
            <g key={i}>
              <line
                x1="60"
                y1={grid.y}
                x2="660"
                y2={grid.y}
                stroke="#F1F5F9"
                strokeWidth="1.5"
              />
              <text
                x="50"
                y={grid.y + 4}
                textAnchor="end"
                fontFamily={BRAND.fonts.mono}
                fontSize="11"
                fill="#94A3B8"
                fontWeight="600"
              >
                {grid.label}
              </text>
            </g>
          ))}

          {/* Vertical Milestone Guides */}
          {[
            { x: 70, label: 'D-01 (Shutdown)' },
            { x: 210, label: 'D-05 (Tearing)' },
            { x: 360, label: 'D-10 (Bricking)' },
            { x: 505, label: 'D-14 (Jacking)' },
            { x: 640, label: 'D-18 (Firing)' },
          ].map((vGrid, i) => (
            <g key={i}>
              <line
                x1={vGrid.x}
                y1="45"
                x2={vGrid.x}
                y2="285"
                stroke="#F8FAFC"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={vGrid.x}
                y="305"
                textAnchor="middle"
                fontFamily={BRAND.fonts.mono}
                fontSize="10.5"
                fill="#64748B"
                fontWeight="600"
              >
                {vGrid.label}
              </text>
            </g>
          ))}

          {/* Planned S-Curve Baseline (Dashed) */}
          <path
            d={plannedPath}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="3"
            strokeDasharray="6 6"
            opacity={0.7}
          />

          {/* Actual Animated S-Curve Path */}
          <path
            d={actualPath}
            fill="none"
            stroke="url(#actualCurveGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={actualPathTotalLength}
            strokeDashoffset={strokeDashoffset}
            filter="url(#curveGlow)"
          />

          {/* Leading Beacon on Actual Tip */}
          {curveProgress > 0.05 && (
            <g transform={`translate(${tipX}, ${tipY})`}>
              {/* Outer Pulse Ripple */}
              <circle
                r={16 * tipPulse}
                fill="none"
                stroke="#10B981"
                strokeWidth="1.5"
                opacity={0.4}
              />
              {/* Glowing Outer Dot */}
              <circle r="9" fill="#10B981" />
              {/* Core White Dot */}
              <circle r="4" fill="#FFFFFF" />

              {/* Dynamic Coordinate Callout Box */}
              {curveProgress > 0.3 && (
                <g transform="translate(14, -28)">
                  <rect
                    width="110"
                    height="32"
                    rx="8"
                    fill="#0F172A"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    filter="drop-shadow(0 6px 16px rgba(0,0,0,0.25))"
                  />
                  <text
                    x="10"
                    y="15"
                    fontFamily={BRAND.fonts.display}
                    fontSize="11"
                    fontWeight="800"
                    fill="#FFFFFF"
                  >
                    {currentPercent}% COMPLETED
                  </text>
                  <text
                    x="10"
                    y="27"
                    fontFamily={BRAND.fonts.mono}
                    fontSize="9.5"
                    fontWeight="700"
                    fill="#10B981"
                  >
                    +2.4% AHEAD
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
          padding: isVertical ? '10px 16px' : '12px 24px',
          borderTop: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          fontSize: 12,
        }}
      >
        <span style={{ fontFamily: BRAND.fonts.mono, color: '#64748B' }}>
          PROJECT: <strong>RK-04 CEMENT KILN OVERHAUL</strong>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              backgroundColor: '#ECFDF5',
              color: '#047857',
              fontFamily: BRAND.fonts.mono,
              fontWeight: 800,
              fontSize: 11,
              padding: '3px 10px',
              borderRadius: 6,
              border: '1px solid #A7F3D0',
            }}
          >
            {varianceText}
          </span>
        </div>
      </div>
    </div>
  );
};
