import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { TIMING } from '../constants/timing';
import { COPY_60S_EN } from '../constants/copy';
import { Scene1CinematicHook } from '../scenes/Scene1CinematicHook';
import { Scene2Problem } from '../scenes/Scene2Problem';
import { Scene3OfflinePWA } from '../scenes/Scene3OfflinePWA';
import { Scene4SyncFlight } from '../scenes/Scene4SyncFlight';
import { Scene5QCAuditPhotos } from '../scenes/Scene5QCAuditPhotos';
import { Scene6SCurveMatrix } from '../scenes/Scene6SCurveMatrix';
import { Scene7PillarsClimax } from '../scenes/Scene7PillarsClimax';
import { Scene8GrandFinale } from '../scenes/Scene8GrandFinale';
import { SubtitleBar } from '../components/SubtitleBar';

export const TrunovaLaunch9x16: React.FC = () => {
  const frame = useCurrentFrame();

  const bgmVolume = interpolate(
    frame,
    [0, 15, TIMING.totalDurationFrames - 60, TIMING.totalDurationFrames],
    [0, 0.42, 0.42, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  let currentSubtitle = COPY_60S_EN.scene1.subtitle;
  if (frame >= TIMING.scenes.scene8GrandFinale.from) {
    currentSubtitle = COPY_60S_EN.scene8.subtitle;
  } else if (frame >= TIMING.scenes.scene7PillarsClimax.from) {
    currentSubtitle = COPY_60S_EN.scene7.subtitle;
  } else if (frame >= TIMING.scenes.scene6SCurveMatrix.from) {
    currentSubtitle = COPY_60S_EN.scene6.subtitle;
  } else if (frame >= TIMING.scenes.scene5QCAuditPhotos.from) {
    currentSubtitle = COPY_60S_EN.scene5.subtitle;
  } else if (frame >= TIMING.scenes.scene4SyncFlight.from) {
    currentSubtitle = COPY_60S_EN.scene4.subtitle;
  } else if (frame >= TIMING.scenes.scene3OfflinePWA.from) {
    currentSubtitle = COPY_60S_EN.scene3.subtitle;
  } else if (frame >= TIMING.scenes.scene2Problem.from) {
    currentSubtitle = COPY_60S_EN.scene2.subtitle;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#FAF7F2', overflow: 'hidden' }}>
      {/* ─── AUDIO ENGINE ─── */}
      <Audio src={staticFile('audio/bgm-upbeat.wav')} volume={bgmVolume} />

      {/* SFX Cues across 60 Seconds */}
      <Sequence from={20} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx-whoosh.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={120} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.65} />
      </Sequence>

      <Sequence from={260} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={285} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={310} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.65} />
      </Sequence>

      <Sequence from={505} durationInFrames={10}>
        <Audio src={staticFile('audio/sfx-click.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={570} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.6} />
      </Sequence>

      <Sequence from={735} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx-chime.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={755} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx-whoosh.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={795} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.7} />
      </Sequence>

      <Sequence from={980} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-shutter.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={1005} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={1030} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-shutter.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={1055} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={1080} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-shutter.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={1105} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.75} />
      </Sequence>

      <Sequence from={1310} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={1360} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx-chime.wav')} volume={0.65} />
      </Sequence>

      <Sequence from={1500} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={1550} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={1600} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.7} />
      </Sequence>

      <Sequence from={1665} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx-chime.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={1685} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.65} />
      </Sequence>

      {/* ─── SCENE SEQUENCES (0 - 60s / 1800 Frames) ─── */}
      <Sequence
        from={TIMING.scenes.scene1CinematicHook.from}
        durationInFrames={TIMING.scenes.scene1CinematicHook.durationInFrames}
      >
        <Scene1CinematicHook copy={COPY_60S_EN} aspectRatio="9:16" />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene2Problem.from}
        durationInFrames={TIMING.scenes.scene2Problem.durationInFrames}
      >
        <Scene2Problem copy={COPY_60S_EN} aspectRatio="9:16" />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene3OfflinePWA.from}
        durationInFrames={TIMING.scenes.scene3OfflinePWA.durationInFrames}
      >
        <Scene3OfflinePWA copy={COPY_60S_EN} aspectRatio="9:16" />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene4SyncFlight.from}
        durationInFrames={TIMING.scenes.scene4SyncFlight.durationInFrames}
      >
        <Scene4SyncFlight copy={COPY_60S_EN} aspectRatio="9:16" />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene5QCAuditPhotos.from}
        durationInFrames={TIMING.scenes.scene5QCAuditPhotos.durationInFrames}
      >
        <Scene5QCAuditPhotos copy={COPY_60S_EN} aspectRatio="9:16" />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene6SCurveMatrix.from}
        durationInFrames={TIMING.scenes.scene6SCurveMatrix.durationInFrames}
      >
        <Scene6SCurveMatrix copy={COPY_60S_EN} aspectRatio="9:16" />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene7PillarsClimax.from}
        durationInFrames={TIMING.scenes.scene7PillarsClimax.durationInFrames}
      >
        <Scene7PillarsClimax copy={COPY_60S_EN} aspectRatio="9:16" />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene8GrandFinale.from}
        durationInFrames={TIMING.scenes.scene8GrandFinale.durationInFrames}
      >
        <Scene8GrandFinale copy={COPY_60S_EN} aspectRatio="9:16" />
      </Sequence>

      {/* Subtitle Overlay (Adjusted for mobile bottom sheet / nav safe areas) */}
      <SubtitleBar text={currentSubtitle} lang="en" style={{ bottom: 120 }} />
    </AbsoluteFill>
  );
};
