import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { TIMING } from '../constants/timing';
import { CINEMATIC_BRAND } from '../constants/cinematicBrand';
import { CinematicScene1Hook } from '../scenes/cinematic/CinematicScene1Hook';
import { CinematicScene2Crisis } from '../scenes/cinematic/CinematicScene2Crisis';
import { CinematicScene3Terminal } from '../scenes/cinematic/CinematicScene3Terminal';
import { CinematicScene4HyperSync } from '../scenes/cinematic/CinematicScene4HyperSync';
import { CinematicScene5OpticsAudit } from '../scenes/cinematic/CinematicScene5OpticsAudit';
import { CinematicScene6VolumetricSCurve } from '../scenes/cinematic/CinematicScene6VolumetricSCurve';
import { CinematicScene7Staccato } from '../scenes/cinematic/CinematicScene7Staccato';
import { CinematicScene8Monolith } from '../scenes/cinematic/CinematicScene8Monolith';

export const TrunovaLaunchCinematic16x9: React.FC = () => {
  const frame = useCurrentFrame();

  // BGM Volume Automation (Fade in first 0.5s = 15f, Fade out last 2s = 60f)
  const bgmVolume = interpolate(
    frame,
    [0, 15, TIMING.totalDurationFrames - 60, TIMING.totalDurationFrames],
    [0, 0.44, 0.44, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: CINEMATIC_BRAND.colors.bgVoid, overflow: 'hidden' }}>
      {/* ─── AUDIO ENGINE ─── */}
      <Audio src={staticFile('audio/bgm-upbeat.wav')} volume={bgmVolume} />

      {/* SFX Cues across 60 Seconds */}
      {/* Scene 1: Hook */}
      <Sequence from={20} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx-whoosh.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={120} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.7} />
      </Sequence>

      {/* Scene 2: Crisis */}
      <Sequence from={260} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={285} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={310} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.65} />
      </Sequence>

      {/* Scene 3: Terminal */}
      <Sequence from={505} durationInFrames={12}>
        <Audio src={staticFile('audio/sfx-click.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={570} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.65} />
      </Sequence>

      {/* Scene 4: Hyper-Sync */}
      <Sequence from={735} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx-chime.wav')} volume={0.75} />
      </Sequence>
      <Sequence from={755} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx-whoosh.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={795} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.75} />
      </Sequence>

      {/* Scene 5: Optics Audit */}
      <Sequence from={980} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-shutter.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={1005} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={1030} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-shutter.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={1055} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={1080} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-shutter.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={1105} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.8} />
      </Sequence>

      {/* Scene 6: Volumetric S-Curve */}
      <Sequence from={1310} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={1360} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx-chime.wav')} volume={0.7} />
      </Sequence>

      {/* Scene 7: Staccato */}
      <Sequence from={1500} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-whoosh.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={1550} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={1600} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.75} />
      </Sequence>

      {/* Scene 8: Monolith Finale */}
      <Sequence from={1665} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx-chime.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={1685} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.7} />
      </Sequence>

      {/* ─── 8 CINEMATIC SCENES (0 - 60s / 1800 Frames) ─── */}
      <Sequence
        from={TIMING.scenes.scene1CinematicHook.from}
        durationInFrames={TIMING.scenes.scene1CinematicHook.durationInFrames}
      >
        <CinematicScene1Hook />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene2Problem.from}
        durationInFrames={TIMING.scenes.scene2Problem.durationInFrames}
      >
        <CinematicScene2Crisis />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene3OfflinePWA.from}
        durationInFrames={TIMING.scenes.scene3OfflinePWA.durationInFrames}
      >
        <CinematicScene3Terminal />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene4SyncFlight.from}
        durationInFrames={TIMING.scenes.scene4SyncFlight.durationInFrames}
      >
        <CinematicScene4HyperSync />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene5QCAuditPhotos.from}
        durationInFrames={TIMING.scenes.scene5QCAuditPhotos.durationInFrames}
      >
        <CinematicScene5OpticsAudit />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene6SCurveMatrix.from}
        durationInFrames={TIMING.scenes.scene6SCurveMatrix.durationInFrames}
      >
        <CinematicScene6VolumetricSCurve />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene7PillarsClimax.from}
        durationInFrames={TIMING.scenes.scene7PillarsClimax.durationInFrames}
      >
        <CinematicScene7Staccato />
      </Sequence>

      <Sequence
        from={TIMING.scenes.scene8GrandFinale.from}
        durationInFrames={TIMING.scenes.scene8GrandFinale.durationInFrames}
      >
        <CinematicScene8Monolith />
      </Sequence>

      {/* NOTE: ZERO FOOTER / SUBTITLE BAR IN OPTION 2 PER USER SPECIFICATION */}
    </AbsoluteFill>
  );
};
