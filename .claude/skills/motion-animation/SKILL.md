---
name: motion-animation
description: "Kinetic animation, spring dynamics, camera framing, and UI motion design rules for high-impact visual presentations and motion graphics."
risk: low
source_type: local
---

# Motion & Kinetic UI Animation System

This skill defines the motion vocabulary, spring parameters, easing curves, and camera choreography for high-end product showcases and video motion graphics.

## 1. Motion Personality & Easing Tokens

Match the motion feel to the brand identity: **Precision Industrial & Futuristic Mission Control**.

| Motion Type | Purpose | Physics / Easing Formula |
|---|---|---|
| **Industrial Snap** | Badge entrances, UI tabs, status toggles | `spring({ stiffness: 180, damping: 16, mass: 0.6 })` |
| **Cinematic Silk** | Camera zoom-in, backdrop panning, ambient glow | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Telemetry Pulse** | Live indicators, beacon rings, warning status | Looping sin wave `Math.sin(frame / 6) * 0.5 + 0.5` |
| **Kinetic Type** | Headline word-by-word reveal with blur | Staggered 3-frame delay + `translateY(40px -> 0)` + `filter: blur(8px -> 0)` |

## 2. UI Mockup Camera Choreography

When showcasing features inside video:
1. **Scene Intro (Wide)**: Show the full device / browser frame entering with subtle perspective tilt (`rotateX(6deg) rotateY(-4deg)`).
2. **Focus Zoom (Tight Punch)**: Interpolate camera focal point to the active feature area (e.g. S-Curve chart, Photo upload slot, Anti-miskeying guard).
   - Scale: `1.0 -> 1.4`
   - Focal translate: `transformOrigin: '65% 40%'`
3. **Cursor Pointer Simulation**: A simulated flame-amber reticle moves to click the interactive control, triggering the real-time UI response.
4. **Scene Outro (Whip / Dissolve)**: Fast directional slide-out with slight motion blur or crossfade into the next module.

## 3. Kinetic Typography Principles

- **Word-Level Stagger**: Break headlines into individual word tokens. Reveal each token with a 3–5 frame stagger offset.
- **Dual-Tone Gradient**: Use Trunova brand gradients (`#FFFFFF` to `#94A3B8` for text, `#F59E0B` flame amber for critical highlights).
- **Legibility Guarantee**:
  - High contrast ratio (minimum 7:1 against dark navy/carbon backdrops).
  - Heavy font weights (`font-weight: 800` or `700` in Plus Jakarta Sans / Inter).
  - Monospace telemetry tags (`JetBrains Mono`) for numbers, timestamps, and industrial metrics.

## 4. Avoiding AI Slop in Motion
- ❌ Do NOT use generic slow floating bubbles or random purple abstract blobs.
- ❌ Do NOT let scenes sit static without ambient micro-motion.
- ✅ DO use structured technical grids, HUD framing ticks, real product screenshots, live S-Curve vector trajectories, and precise timing aligned to speech/music beats.
