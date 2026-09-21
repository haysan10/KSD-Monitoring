import React from 'react';
import { Composition } from 'remotion';
import { TIMING } from './constants/timing';
import { TrunovaLaunch16x9 } from './compositions/TrunovaLaunch16x9';
import { TrunovaLaunch9x16 } from './compositions/TrunovaLaunch9x16';
import { TrunovaLaunchCinematic16x9 } from './compositions/TrunovaLaunchCinematic16x9';
import { TrunovaAdminTeaserDesktop } from './compositions/TrunovaAdminTeaserDesktop';
import { TrunovaDesktopToMobileTransition } from './compositions/TrunovaDesktopToMobileTransition';
import { TEASER_TIMING } from './constants/timingTeaser';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Feature Transition & Full Journey: Desktop Command Center to Smartphone Dashboard (18s / 540 frames @ 30fps) */}
      <Composition
        id="TrunovaDesktopToMobileTransition"
        component={TrunovaDesktopToMobileTransition}
        durationInFrames={540} // 18 seconds complete workflow
        fps={TEASER_TIMING.fps}
        width={1920}
        height={1080}
      />

      {/* Primary: 16:9 PC Desktop Webapps Screen Simulation Teaser (20s / 600 frames @ 30fps) */}
      <Composition
        id="TrunovaAdminTeaserDesktop"
        component={TrunovaAdminTeaserDesktop}
        durationInFrames={TEASER_TIMING.totalDurationFrames} // 600 frames = 20s
        fps={TEASER_TIMING.fps}
        width={1920}
        height={1080}
      />

      {/* Option 2: 16:9 Cinematic Master (Dark Industrial / Motion Blur / 3D Rig / No Footers) */}
      <Composition
        id="TrunovaLaunchCinematic16x9"
        component={TrunovaLaunchCinematic16x9}
        durationInFrames={TIMING.totalDurationFrames} // 1800 frames = 60s
        fps={TIMING.fps}
        width={1920}
        height={1080}
      />

      {/* Option 1: 16:9 Landscape Video (Clean Light / Subtitled) */}
      <Composition
        id="TrunovaLaunch16x9"
        component={TrunovaLaunch16x9}
        durationInFrames={TIMING.totalDurationFrames}
        fps={TIMING.fps}
        width={1920}
        height={1080}
      />

      {/* Option 1: 9:16 Vertical Video (Mobile / Subtitled) */}
      <Composition
        id="TrunovaLaunch9x16"
        component={TrunovaLaunch9x16}
        durationInFrames={TIMING.totalDurationFrames}
        fps={TIMING.fps}
        width={1080}
        height={1920}
      />
    </>
  );
};
