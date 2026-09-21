import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { SceneCopy } from '../constants/copy';
import { KineticWords } from '../components/KineticText';
import { FloatingCard } from '../components/FloatingCard';
import { HighlightCircle } from '../components/HandDrawnAccents';

interface Scene4KontrolMutuProps {
  copy: SceneCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene4KontrolMutu: React.FC<Scene4KontrolMutuProps> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // 3 Stages checks triggers
  const stage1Check = spring({ frame: frame - 20, fps, config: BRAND.springs.punchy });
  const stage2Check = spring({ frame: frame - 50, fps, config: BRAND.springs.punchy });
  const stage3Check = spring({ frame: frame - 80, fps, config: BRAND.springs.punchy });

  // Phase swap: QC stages (0-100) -> S-Curve focus (100-210)
  const isPhase2 = frame >= 100;

  // S-Curve card entrance
  const scurveEntrance = spring({
    frame: frame - 95,
    fps,
    config: BRAND.springs.snappy,
  });

  // Animated Live SVG Curve Progress (draws from 110 to 180)
  const curveDraw = interpolate(frame, [110, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Progress percentage counter (74% -> 88%)
  const progressPercent = Math.round(interpolate(curveDraw, [0, 1], [74, 88]));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.bgCream,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: isVertical ? '40px 20px' : '40px 80px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Headline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          textAlign: 'center',
          marginBottom: isVertical ? 24 : 32,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: BRAND.colors.amberSoft,
            border: `1.5px solid ${BRAND.colors.amber}`,
            padding: '5px 16px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 800,
            fontFamily: BRAND.fonts.display,
            color: BRAND.colors.amberWarm,
          }}
        >
          <span>🛡️ ZERO-DEFECT QUALITY GATE</span>
        </div>

        {!isPhase2 ? (
          <KineticWords
            words={copy.scene4.headline.split(' ')}
            startFrame={3}
            staggerFrames={5}
            fontSize={isVertical ? 40 : 54}
            color={BRAND.colors.textDark}
            align="center"
            fontWeight={800}
          />
        ) : (
          <KineticWords
            words={"S-CURVE UPDATE REAL-TIME".split(' ')}
            startFrame={102}
            staggerFrames={5}
            fontSize={isVertical ? 40 : 54}
            color={BRAND.colors.cobalt}
            align="center"
            fontWeight={800}
          />
        )}
      </div>

      {/* Main Content Area: QC Stage Pills & S-Curve Card */}
      <div
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isVertical ? 20 : 36,
          width: '100%',
          maxWidth: 1200,
          zIndex: 10,
        }}
      >
        {/* Left / Top: 3-Stage Checklist Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            width: isVertical ? '100%' : 380,
          }}
        >
          {copy.scene4.stages.map((stage, idx) => {
            const checkVal = idx === 0 ? stage1Check : idx === 1 ? stage2Check : stage3Check;
            const isChecked = checkVal > 0.6;

            return (
              <div
                key={stage.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  backgroundColor: '#FFFFFF',
                  padding: '14px 20px',
                  borderRadius: 16,
                  border: isChecked ? '1.5px solid #10B981' : '1.5px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: BRAND.shadows.card,
                  transform: `scale(${isChecked ? 1.02 : 1})`,
                  transition: 'all 0.15s ease',
                }}
              >
                {/* Stage Number / Check Icon */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    backgroundColor: isChecked ? '#10B981' : '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isChecked ? '#FFFFFF' : '#64748B',
                    fontWeight: 800,
                    fontSize: 16,
                    transform: `scale(${checkVal})`,
                    boxShadow: isChecked ? '0 6px 16px rgba(16, 185, 129, 0.3)' : 'none',
                  }}
                >
                  {isChecked ? '✓' : stage.id}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                    Tahap {stage.id}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', fontFamily: BRAND.fonts.display }}>
                    {stage.label}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 8,
                    backgroundColor: isChecked ? '#ECFDF5' : '#F1F5F9',
                    color: isChecked ? '#059669' : '#94A3B8',
                  }}
                >
                  {isChecked ? 'VERIFIED' : 'PENDING'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right / Bottom: Live S-Curve Card with SVG drawing */}
        <div
          style={{
            flex: isVertical ? 'none' : 1,
            width: isVertical ? '100%' : 'auto',
            transform: `scale(${scurveEntrance})`,
            opacity: interpolate(scurveEntrance, [0, 0.4, 1], [0, 1, 1]),
            position: 'relative',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              padding: '24px 28px',
              border: '1.5px solid rgba(15, 23, 42, 0.08)',
              boxShadow: BRAND.shadows.float,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* S-Curve Card Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: BRAND.colors.cobalt, textTransform: 'uppercase' }}>
                  EVM PERFORMANCE INDEX
                </span>
                <h4 style={{ margin: '2px 0 0', fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
                  Rotary Kiln Overhaul S-Curve
                </h4>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Progres Kumulatif</span>
                <div style={{ fontSize: 28, fontWeight: 800, color: BRAND.colors.cobalt, fontFamily: BRAND.fonts.mono }}>
                  {progressPercent}%
                </div>
              </div>
            </div>

            {/* Interactive SVG Chart Drawing */}
            <svg
              width="100%"
              height={isVertical ? 160 : 200}
              viewBox="0 0 500 200"
              fill="none"
              style={{ overflow: 'visible' }}
            >
              {/* Background Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Planned Target Line (Dotted Gray) */}
              <path
                d="M 10 180 C 150 175, 250 80, 480 20"
                stroke="#CBD5E1"
                strokeWidth="3"
                strokeDasharray="6 6"
              />

              {/* Actual Progress Curve (Solid Cobalt) - Animated Draw */}
              <path
                d="M 10 180 C 140 170, 240 70, 480 25"
                stroke="#2563EB"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={600}
                strokeDashoffset={600 * (1 - curveDraw)}
              />

              {/* Amber Current Progress Head Pulse */}
              <circle
                cx={10 + 470 * curveDraw}
                cy={180 - 155 * Math.pow(curveDraw, 1.2)}
                r="7"
                fill="#F59E0B"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
            </svg>

            {/* Bottom Status Tickers */}
            <div style={{ display: 'flex', gap: 16, marginTop: 14, borderTop: '1px solid #F1F5F9', paddingTop: 12 }}>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>
                Deviasi: <strong style={{ color: '#10B981' }}>+2.4% (Ahead of Schedule)</strong>
              </div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginLeft: 'auto' }}>
                SPI: <strong style={{ color: '#2563EB' }}>1.03</strong>
              </div>
            </div>
          </div>

          {/* Highlight circle on S-Curve percentage */}
          {frame >= 140 && (
            <div style={{ position: 'absolute', top: 22, right: 16, zIndex: 30 }}>
              <HighlightCircle delay={140} color={BRAND.colors.amber} width={140} height={60} strokeWidth={3.5} />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
