---
name: remotion-best-practices
description: "Best practices, architecture patterns, and optimization rules for programmatic video creation using Remotion, React, and programmatic animation."
risk: low
source_type: local
---

# Remotion Video Development Best Practices

This skill provides expert guidelines for building high-fidelity programmatic video applications with Remotion and React.

## 1. Architecture & File Structure

Organize Remotion projects with clean separation between root registry, compositions, scenes, UI mockups, and typography presets:

```
video/
├── src/
│   ├── index.ts               # Remotion Root entrypoint (registerRoot)
│   ├── Root.tsx               # Composition registry (16:9, 9:16 variants)
│   ├── compositions/          # Full video compositions
│   │   ├── LaunchVideo16x9.tsx
│   │   └── LaunchVideo9x16.tsx
│   ├── scenes/                # Modular scene components (one per phase)
│   │   ├── Scene1Hook.tsx
│   │   ├── Scene2Problem.tsx
│   │   ├── Scene3Solution.tsx
│   │   ├── Scene4Feature1.tsx
│   │   ├── Scene5Feature2.tsx
│   │   ├── Scene6Feature3.tsx
│   │   ├── Scene7Proof.tsx
│   │   └── Scene8CTA.tsx
│   ├── components/            # Reusable UI widgets & mockups
│   │   ├── BrowserMockup.tsx
│   │   ├── PhoneMockup.tsx
│   │   ├── KineticText.tsx
│   │   ├── TelemetryHUD.tsx
│   │   ├── SCurveChartGraphic.tsx
│   │   └── BrandLogo.tsx
│   ├── constants/             # Centralized theme, timing & copy config
│   │   ├── brand.ts           # Colors, fonts, shadows, tokens
│   │   ├── timing.ts          # Frame counts & duration constants
│   │   └── copy.ts            # Multilingual copy (ID & EN)
│   └── types/                 # TypeScript type definitions
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

## 2. Core Remotion Animation Rules

### Pure Functions & Determinism
- **Zero non-deterministic calls in render**: Never use `Math.random()`, `Date.now()`, or unpredictable state inside frame calculations. Derive all positions strictly from `useCurrentFrame()` and `useVideoConfig()`.
- Use deterministic pseudo-random seeds if procedural elements (like film grain or particles) are needed.

### Spring Physics with `spring()`
```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const entrance = spring({
  frame,
  fps,
  config: {
    damping: 14,
    stiffness: 120,
    mass: 0.8,
  },
});
```

### Frame Interpolation with `interpolate()`
- Always provide `extrapolateLeft: 'clamp'` and `extrapolateRight: 'clamp'` to prevent unexpected scale/opacity blowouts.
```tsx
import { interpolate } from 'remotion';

const opacity = interpolate(frame, [0, 15], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

## 3. Aspect Ratio Management (16:9 vs 9:16)

- Keep shared scene logic parameterized by aspect ratio (`aspectRatio: '16:9' | '9:16'`).
- 16:9 standard: `1920 × 1080` @ 30fps.
- 9:16 vertical standard: `1080 × 1920` @ 30fps.
- In 9:16 vertical view, ensure UI mockups are scaled (`transform: scale(...)`) and center-weighted with high-contrast, large text (minimum 28px on mobile canvas) for instant readability on TikTok/Reels.

## 4. Audio & Subtitles
- Use Remotion `<Audio />` components with clamped volume interpolation for smooth fades:
```tsx
import { Audio, staticFile, interpolate, useCurrentFrame } from 'remotion';

// Fade in first 1 sec, fade out last 2 sec
const volume = interpolate(frame, [0, 30, durationInFrames - 60, durationInFrames], [0, 0.4, 0.4, 0], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

<Audio src={staticFile('audio/bgm-industrial.mp3')} volume={volume} />
```

## 5. Preview & Rendering Commands

- **Local Live Preview**: `npx remotion preview src/index.ts`
- **Render 16:9 MP4**: `npx remotion render src/index.ts TrunovaLaunch16x9 out/trunova-launch-16x9.mp4 --codec=h264`
- **Render 9:16 MP4**: `npx remotion render src/index.ts TrunovaLaunch9x16 out/trunova-launch-9x16.mp4 --codec=h264`
- **Render Still Thumbnail**: `npx remotion still src/index.ts TrunovaLaunch16x9 out/thumbnail.png --frame=60`
