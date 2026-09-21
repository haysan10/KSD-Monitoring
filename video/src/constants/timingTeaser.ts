export const TEASER_TIMING = {
  fps: 30,
  bpm: 120,
  framesPerBeat: 15, // 30 fps / (120 bpm / 60) = 15 frames per beat
  totalDurationFrames: 600, // Exactly 20 seconds (600 frames @ 30fps)

  scenes: {
    // Scene 1: PREPARE - Workspace Initialization & Telemetry Arming (0.00s - 2.50s)
    scene1Prepare: {
      from: 0,
      durationInFrames: 75, // 0 - 75 (5 beats)
    },
    // Scene 2: CUPLIKAN 1 - Anti-Miskeying Safeguard & Progress Injection (2.50s - 7.00s)
    scene2Miskeying: {
      from: 75,
      durationInFrames: 135, // 75 - 210 (9 beats)
    },
    // Scene 3: CUPLIKAN 2 - Offline Blind-Spot Reconnect & Live S-Curve Surge (7.00s - 11.50s)
    scene3ScurveSync: {
      from: 210,
      durationInFrames: 135, // 210 - 345 (9 beats)
    },
    // Scene 4: CUPLIKAN 3 - 3-Stage QC Photo Audit Approval Stamp (11.50s - 15.50s)
    scene4QcAudit: {
      from: 345,
      durationInFrames: 120, // 345 - 465 (8 beats)
    },
    // Scene 5: CLIFFHANGER + CTA - Executive Overhaul Audit & Brand Reveal (15.50s - 20.00s)
    scene5Cliffhanger: {
      from: 465,
      durationInFrames: 135, // 465 - 600 (9 beats)
    },
  },

  springs: {
    rigid: { damping: 24, stiffness: 220, mass: 1.0 },
    pop: { damping: 13, stiffness: 190, mass: 0.8 },
    heavyStamp: { damping: 10, stiffness: 200, mass: 0.9 },
  },

  colors: {
    canvas: '#FAF7F2',
    surfaceWhite: '#FFFFFF',
    surfaceSlate: '#F8FAFC',
    primaryDark: '#0F172A',
    accentCobalt: '#2563EB',
    accentAmber: '#F59E0B',
    signalGreen: '#10B981',
    signalRed: '#DC2626',
    muted: '#64748B',
    border: '#E2E8F0',
  },
};
