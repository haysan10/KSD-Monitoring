export const TIMING = {
  fps: 30,
  bpm: 120,
  framesPerBeat: 15, // 30 fps / (120 bpm / 60) = 15 frames per beat
  totalDurationFrames: 1800, // Exactly 60 seconds (1 minute @ 30fps)

  scenes: {
    // 1. Overhaul Reality & Cinematic Video Hook (0:00 - 0:08, 16 beats)
    scene1CinematicHook: {
      from: 0,
      durationInFrames: 240, // 0-8s
    },
    // 2. The Overhaul Challenge & Ground Friction (0:08 - 0:15, 14 beats)
    scene2Problem: {
      from: 240,
      durationInFrames: 210, // 8-15s
    },
    // 3. Offline-First PWA Action inside Kiln (0:15 - 0:24, 18 beats)
    scene3OfflinePWA: {
      from: 450,
      durationInFrames: 270, // 15-24s
    },
    // 4. 3D Flight Match-Cut & Instant Reconnection (0:24 - 0:32, 16 beats)
    scene4SyncFlight: {
      from: 720,
      durationInFrames: 240, // 24-32s
    },
    // 5. 3-Stage QC Audit with Real Inspection Photos (0:32 - 0:41, 18 beats)
    scene5QCAuditPhotos: {
      from: 960,
      durationInFrames: 270, // 32-41s
    },
    // 6. Live S-Curve Matrix & EVM Tracking Engine (0:41 - 0:50, 18 beats)
    scene6SCurveMatrix: {
      from: 1230,
      durationInFrames: 270, // 41-50s
    },
    // 7. Kinetic Supergraphic Climax / 3 Pillars (0:50 - 0:55, 10 beats)
    scene7PillarsClimax: {
      from: 1500,
      durationInFrames: 150, // 50-55s
    },
    // 8. The Grand Finale & Call To Action (0:55 - 1:00, 10 beats)
    scene8GrandFinale: {
      from: 1650,
      durationInFrames: 150, // 55-60s
    },
  },
};
