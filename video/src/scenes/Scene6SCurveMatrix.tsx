import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../constants/brand';
import { Video60sCopy } from '../constants/copy';
import { CameraRig } from '../components/CameraRig';
import { CharReveal, TrackingExpansionText, EditorialBackdrop } from '../components/AdvancedMotionType';
import { SCurveChartCanvas } from '../components/SCurveChartCanvas';
import { SupergraphicBackdrop, CornerBrackets } from '../components/SupergraphicBackdrop';
import { HighlightCircle } from '../components/HandDrawnAccents';

interface Scene6Props {
  copy: Video60sCopy;
  aspectRatio: '16:9' | '9:16';
}

export const Scene6SCurveMatrix: React.FC<Scene6Props> = ({ copy, aspectRatio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = aspectRatio === '9:16';

  // Board Entrance Spring
  const boardSpring = spring({
    frame: frame - 10,
    fps,
    config: BRAND.springs.snappy,
  });

  // Smooth curve drawing (Frames 30 - 150)
  const curveProgress = interpolate(frame, [30, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Cumulative progress counter ticking up (64% -> 88%)
  const progressPercent = Math.round(interpolate(curveProgress, [0, 1], [64, 88]));

  // Variance & SPI Pop (Frame 70)
  const varianceSpring = spring({
    frame: frame - 70,
    fps,
    config: BRAND.springs.punchy,
  });

  // Metric 2 Pop (Frame 90)
  const metric2Spring = spring({
    frame: frame - 90,
    fps,
    config: BRAND.springs.snappy,
  });

  // Exit whip (Frames 255 - 270)
  const exitX = interpolate(frame, [255, 270], [0, isVertical ? -650 : -1100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.bgCream, overflow: 'hidden' }}>
      <CameraRig
        move={{
          scale: [0.98, 1.05],
          rotateX: [1.5, -1],
          rotateY: isVertical ? [0, 0] : [-3, 3],
          x: [0, exitX],
        }}
        shakeFrame={70}
      >
        {/* Continuous Editorial Runner */}
        <EditorialBackdrop
          text="EARNED VALUE MANAGEMENT • PLAN VS ACTUAL S-CURVE • PREDICTIVE RESTART ASSURANCE"
          speed={1.5}
          fontSize={isVertical ? 80 : 130}
          color="rgba(15, 23, 42, 0.03)"
        />

        <SupergraphicBackdrop type="rays" opacity={0.06} rotationSpeed={0.2} />

        {/* ─── 16:9 LANDSCAPE LAYOUT ─── */}
        {!isVertical && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 70px',
              boxSizing: 'border-box',
              gap: 40,
              zIndex: 20,
            }}
          >
            {/* Left Column: Editorial Typography + Metric Cards */}
            <div
              style={{
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <div>
                <TrackingExpansionText
                  text={`📈 ${copy.scene6.badge}`}
                  startFrame={5}
                  fontSize={16}
                  color={BRAND.colors.cobalt}
                />

                <CharReveal
                  text={copy.scene6.headline}
                  startFrame={10}
                  staggerFrames={2}
                  fontSize={48}
                  color={BRAND.colors.textDark}
                  style={{ marginTop: 6 }}
                />

                <div
                  style={{
                    fontFamily: BRAND.fonts.body,
                    fontSize: 18,
                    color: BRAND.colors.textMuted,
                    marginTop: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {copy.scene6.scurveLabel}
                </div>
              </div>

              {/* Metric Card 1: Actual Progress Jump */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  padding: '18px 24px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
                  position: 'relative',
                  transform: `scale(${boardSpring})`,
                }}
              >
                <CornerBrackets size={18} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 12, color: '#64748B', fontWeight: 700 }}>
                    CUMULATIVE PROGRESS
                  </span>
                  <span
                    style={{
                      fontFamily: BRAND.fonts.mono,
                      fontSize: 11,
                      backgroundColor: '#ECFDF5',
                      color: '#059669',
                      padding: '2px 8px',
                      borderRadius: 6,
                      fontWeight: 800,
                    }}
                  >
                    ▲ ACCELERATING
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: BRAND.fonts.display,
                    fontWeight: 900,
                    fontSize: 54,
                    color: BRAND.colors.amber,
                    lineHeight: 1.1,
                    marginTop: 4,
                  }}
                >
                  {progressPercent}%
                </div>
                <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 12, color: '#64748B', marginTop: 4 }}>
                  Target planned baseline: 85.6%
                </div>
              </div>

              {/* Metric Card 2: Schedule Variance & SPI */}
              <div
                style={{
                  backgroundColor: '#0F172A',
                  borderRadius: 20,
                  padding: '18px 24px',
                  color: '#FFFFFF',
                  boxShadow: '0 16px 36px rgba(15, 23, 42, 0.25)',
                  border: '1.5px solid rgba(16, 185, 129, 0.4)',
                  position: 'relative',
                  transform: `scale(${varianceSpring})`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 12, color: BRAND.colors.amber, fontWeight: 700 }}>
                    SCHEDULE VARIANCE
                  </span>
                  <span style={{ fontFamily: BRAND.fonts.mono, fontSize: 11, color: '#94A3B8' }}>
                    SPI: {copy.scene6.spiTxt}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: BRAND.fonts.display,
                    fontWeight: 900,
                    fontSize: 26,
                    color: '#10B981',
                    marginTop: 6,
                  }}
                >
                  {copy.scene6.varianceTxt}
                </div>
                <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 12, color: '#CBD5E1', marginTop: 4 }}>
                  Predicted Restart: On Schedule (Zero Slip)
                </div>
                <HighlightCircle delay={80} color="#10B981" width={160} height={36} />
              </div>
            </div>

            {/* Right Column: Dedicated High-End S-Curve Canvas */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                transform: `scale(${boardSpring})`,
              }}
            >
              <SCurveChartCanvas
                width={880}
                height={520}
                curveProgress={curveProgress}
                currentPercent={progressPercent}
                varianceText={copy.scene6.varianceTxt}
                isVertical={false}
              />
            </div>
          </div>
        )}

        {/* ─── 9:16 VERTICAL PORTRAIT LAYOUT ─── */}
        {isVertical && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '50px 24px 225px',
              boxSizing: 'border-box',
              justifyContent: 'space-between',
              zIndex: 20,
            }}
          >
            {/* Top: Kinetic Header */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 10,
              }}
            >
              <TrackingExpansionText
                text={`📈 ${copy.scene6.badge}`}
                startFrame={5}
                fontSize={15}
                color={BRAND.colors.cobalt}
              />

              <CharReveal
                text={copy.scene6.headline}
                startFrame={10}
                staggerFrames={2}
                fontSize={46}
                color={BRAND.colors.textDark}
              />

              <div
                style={{
                  fontFamily: BRAND.fonts.body,
                  fontSize: 16,
                  color: BRAND.colors.textMuted,
                  maxWidth: 500,
                }}
              >
                {copy.scene6.scurveLabel}
              </div>
            </div>

            {/* Center: Full-Width S-Curve Interactive Canvas Card */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                transform: `scale(${boardSpring})`,
              }}
            >
              <SCurveChartCanvas
                width={980}
                height={500}
                curveProgress={curveProgress}
                currentPercent={progressPercent}
                varianceText={copy.scene6.varianceTxt}
                isVertical={true}
              />
            </div>

            {/* Bottom: 3-Pill Horizontal EVM Metric Strip */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                transform: `scale(${varianceSpring})`,
              }}
            >
              {/* Metric 1 */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  padding: '12px 14px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 8px 20px rgba(15, 23, 42, 0.06)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 10, color: '#64748B', fontWeight: 700 }}>
                  ACTUAL PROGRESS
                </div>
                <div
                  style={{
                    fontFamily: BRAND.fonts.display,
                    fontWeight: 900,
                    fontSize: 26,
                    color: BRAND.colors.amber,
                    marginTop: 2,
                  }}
                >
                  {progressPercent}%
                </div>
              </div>

              {/* Metric 2 */}
              <div
                style={{
                  flex: 1.3,
                  backgroundColor: '#ECFDF5',
                  borderRadius: 16,
                  padding: '12px 14px',
                  border: '1.5px solid #10B981',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.12)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 10, color: '#047857', fontWeight: 700 }}>
                  SCHEDULE VARIANCE
                </div>
                <div
                  style={{
                    fontFamily: BRAND.fonts.display,
                    fontWeight: 900,
                    fontSize: 18,
                    color: '#059669',
                    marginTop: 4,
                  }}
                >
                  +2.4% Ahead
                </div>
              </div>

              {/* Metric 3 */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#0F172A',
                  borderRadius: 16,
                  padding: '12px 14px',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 20px rgba(15, 23, 42, 0.2)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: BRAND.fonts.mono, fontSize: 10, color: BRAND.colors.amber, fontWeight: 700 }}>
                  SPI INDEX
                </div>
                <div
                  style={{
                    fontFamily: BRAND.fonts.display,
                    fontWeight: 900,
                    fontSize: 24,
                    color: '#FFFFFF',
                    marginTop: 2,
                  }}
                >
                  1.03
                </div>
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
