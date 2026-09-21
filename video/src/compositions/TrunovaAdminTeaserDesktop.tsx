import React from 'react';
import {
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { TEASER_TIMING } from '../constants/timingTeaser';
import { Scene1PrepareDesktop } from '../scenes/teaser/Scene1PrepareDesktop';
import { Scene2MiskeyingDesktop } from '../scenes/teaser/Scene2MiskeyingDesktop';
import { Scene3ScurveSyncDesktop } from '../scenes/teaser/Scene3ScurveSyncDesktop';
import { Scene4QcAuditDesktop } from '../scenes/teaser/Scene4QcAuditDesktop';
import { Scene5CliffhangerDesktop } from '../scenes/teaser/Scene5CliffhangerDesktop';

export const TrunovaAdminTeaserDesktop: React.FC = () => {
  const frame = useCurrentFrame();

  // Background music volume fade out during final hold (frame 570 - 600)
  const bgmVolume = interpolate(frame, [0, 565, 600], [0.4, 0.4, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const { scenes } = TEASER_TIMING;

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
      {/* 1. SCENE SEQUENCES */}
      {/* Scene 1: PREPARE (Frames 0 - 75) */}
      <Sequence
        from={scenes.scene1Prepare.from}
        durationInFrames={scenes.scene1Prepare.durationInFrames}
        name="Scene 1: Prepare Desktop"
      >
        <Scene1PrepareDesktop />
      </Sequence>

      {/* Scene 2: CUPLIKAN 1 - Anti-Miskeying (Frames 75 - 210) */}
      <Sequence
        from={scenes.scene2Miskeying.from}
        durationInFrames={scenes.scene2Miskeying.durationInFrames}
        name="Scene 2: Anti-Miskeying Desktop"
      >
        <Scene2MiskeyingDesktop />
      </Sequence>

      {/* Scene 3: CUPLIKAN 2 - Live S-Curve Sync (Frames 210 - 345) */}
      <Sequence
        from={scenes.scene3ScurveSync.from}
        durationInFrames={scenes.scene3ScurveSync.durationInFrames}
        name="Scene 3: S-Curve Sync Desktop"
      >
        <Scene3ScurveSyncDesktop />
      </Sequence>

      {/* Scene 4: CUPLIKAN 3 - 3-Stage QC Audit (Frames 345 - 465) */}
      <Sequence
        from={scenes.scene4QcAudit.from}
        durationInFrames={scenes.scene4QcAudit.durationInFrames}
        name="Scene 4: QC Audit Desktop"
      >
        <Scene4QcAuditDesktop />
      </Sequence>

      {/* Scene 5: CLIFFHANGER & CTA (Frames 465 - 600) */}
      <Sequence
        from={scenes.scene5Cliffhanger.from}
        durationInFrames={scenes.scene5Cliffhanger.durationInFrames}
        name="Scene 5: Cliffhanger & CTA Desktop"
      >
        <Scene5CliffhangerDesktop />
      </Sequence>

      {/* 2. AUDIO LAYER (BGM & PRECISE SFX) */}
      {/* Upbeat 120 BPM Background Music */}
      <Audio
        src={staticFile('audio/bgm-upbeat.wav')}
        volume={bgmVolume}
      />

      {/* Scene 1 SFX */}
      <Sequence from={44} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-click.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={48} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx-pop.wav')} volume={0.55} />
      </Sequence>

      {/* Scene 2 SFX */}
      <Sequence from={182} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-click.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={188} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.75} />
      </Sequence>

      {/* Scene 3 SFX */}
      <Sequence from={218} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx-chime.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={235} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx-whoosh.wav')} volume={0.5} />
      </Sequence>

      {/* Scene 4 SFX */}
      <Sequence from={414} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-click.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={420} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx-check.wav')} volume={0.8} />
      </Sequence>

      {/* Scene 5 SFX */}
      <Sequence from={485} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx-click.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={510} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx-whoosh.wav')} volume={0.8} />
      </Sequence>
    </div>
  );
};
