# Motion Design System & Frame-by-Frame Technical Specification: TRUNOVA Launch Video

> **Document Type**: Comprehensive Motion Design Specification & Frame-by-Frame Production Blueprint (Phase 3 through Phase 6)  
> **Target Video**: TRUNOVA Webapp Launch (Clean Modern & Light Edition)  
> **Master Resolution**: 16:9 Landscape (1920×1080) with 9:16 Portrait Safe-Area Compatibility  
> **Duration**: 60.00 Seconds (1800 Frames @ 30 FPS, 120 BPM)  
> **Output Path**: `/video/analysis/motion-spec.md`  

---

## Table of Contents
1. [Phase 3: Motion Design System Tokens](#phase-3-motion-design-system-tokens)
   - 1.1 [Timing & Frame Budget Scale](#11-timing--frame-budget-scale)
   - 1.2 [Easing Curves & Physical Spring Constants](#12-easing-curves--physical-spring-constants)
   - 1.3 [Stagger & Sequencing Cadence](#13-stagger--sequencing-cadence)
   - 1.4 [Overshoot, Recoil & Eye Hold Guardrails](#14-overshoot-recoil--eye-hold-guardrails)
   - 1.5 [Typography Scale & Composition Safe Areas](#15-typography-scale--composition-safe-areas)
   - 1.6 [Visual FX Pipeline (Blur, Grain, Scrim, Glow)](#16-visual-fx-pipeline-blur-grain-scrim-glow)
   - 1.7 [Motion Personality & Anti-Slop Bans](#17-motion-personality--anti-slop-bans)
2. [Phase 4: Frame-by-Frame Scene Specifications (Scene 1 to Scene 8)](#phase-4-frame-by-frame-scene-specifications-scene-1-to-scene-8)
   - 2.1 [Scene 1: The Kiln Reality & Total Signal Blackout (Frames 0–240)](#21-scene-1-the-kiln-reality--total-signal-blackout-frames-0240)
   - 2.2 [Scene 2: Legacy Chaos & Costly Overhaul Slips (Frames 240–450)](#22-scene-2-legacy-chaos--costly-overhaul-slips-frames-240450)
   - 2.3 [Scene 3: Offline-First PWA in the Kiln Blind-Spot (Frames 450–720)](#23-scene-3-offline-first-pwa-in-the-kiln-blind-spot-frames-450720)
   - 2.4 [Scene 4: Instant Reconnection & 3D Flight Convergence (Frames 720–960)](#24-scene-4-instant-reconnection--3d-flight-convergence-frames-720960)
   - 2.5 [Scene 5: 3-Stage Authenticated Photo Audit Pipeline (Frames 960–1230)](#25-scene-5-3-stage-authenticated-photo-audit-pipeline-frames-9601230)
   - 2.6 [Scene 6: Real-Time S-Curve & EVM Trajectory Engine (Frames 1230–1500)](#26-scene-6-real-time-s-curve--evm-trajectory-engine-frames-12301500)
   - 2.7 [Scene 7: The 3 Core Pillars Climax (Frames 1500–1650)](#27-scene-7-the-3-core-pillars-climax-frames-15001650)
   - 2.8 [Scene 8: Grand Brand Finale & Actionable Call-to-Action (Frames 1650–1800)](#28-scene-8-grand-brand-finale--actionable-call-to-action-frames-16501800)
3. [Phase 4.9: Specific Trunova Motion Craft Solutions](#phase-49-specific-trunova-motion-craft-solutions)
4. [Phase 5: Technical Mapping to Remotion & Code Architecture](#phase-5-technical-mapping-to-remotion--code-architecture)
5. [Phase 6: Production Asset Checklist & Risk Mitigation](#phase-6-production-asset-checklist--risk-mitigation)

---

# Phase 3: Motion Design System Tokens

### 1.1 Timing & Frame Budget Scale
All motion units are locked to the 30 FPS timeline (1 frame = 33.33ms) and synchronized with the 120 BPM musical tempo (1 beat = 15 frames) `[USULAN]`:

| Token Name | Frames | Real Duration | Musical Metric | Primary Application |
| :--- | :--- | :--- | :--- | :--- |
| `T_INSTANT` | 1–3 frames | 33–100 ms | $\le \frac{1}{4}$ beat | Micro button clicks, reticle snaps, indicator dot flashes. |
| `T_SNAPPY` | 5–8 frames | 166–266 ms | $\frac{1}{2}$ beat | Metric badge pops, tooltip reveals, toast notifications. |
| `T_STANDARD` | 12–15 frames | 400–500 ms | 1 beat | Card entrances, phone glide, photo slot transitions. |
| `T_DELIBERATE`| 20–30 frames | 666–1000 ms | 2 beats (1 bar) | Full S-Curve line draw, 3D flight trajectory, scene whip-pans. |
| `T_HOLD` | 30–45 frames | 1000–1500 ms | 2–3 beats | Mandatory cognitive rest so critical metrics and text are fully read. |

---

### 1.2 Easing Curves & Physical Spring Constants
Derived from the `animation-principles` and `motion-design` skills:

#### CSS Cubic-Bezier Easing Formulas
* **Entrance Ease (`EASE_IN_DECEL`)**: `cubic-bezier(0.16, 1.0, 0.30, 1.0)`  
  *Behavior*: High initial velocity, zero float, gentle magnetic settling into place. Used for all incoming cards, headlines, and mockups.
* **Exit Ease (`EASE_OUT_ACCEL`)**: `cubic-bezier(0.70, 0.0, 0.84, 0.0)`  
  *Behavior*: Slow start, rapid whip out of frame. Used for scene exits and dismissals.
* **Reposition Ease (`EASE_IN_OUT_SMOOTH`)**: `cubic-bezier(0.65, 0.0, 0.35, 1.0)`  
  *Behavior*: Symmetric acceleration and deceleration for elements moving between positions on screen.

#### Remotion `spring()` Physics Configurations
* **Rigid / Industrial Spring (`SPRING_RIGID`)**:
  ```ts
  { damping: 24, stiffness: 220, mass: 1.0 }
  ```
  *Visual Result*: Crisp, authoritative lock-in with negligible overshoot ($< 3\%$). Used for UI panels, browser chrome, metric tables, and HUD lines.
* **Kinetic / Snappy Spring (`SPRING_SNAPPY`)**:
  ```ts
  { damping: 14, stiffness: 180, mass: 0.8 }
  ```
  *Visual Result*: Energetic, tactile pop with controlled physical recoil ($12\text{--}15\%$). Used for approval stamps, signal restoration badges, floating mutation cards, and CTA buttons.

---

### 1.3 Stagger & Sequencing Cadence
Cascading animation offsets to prevent sensory overload:
* **Character Stagger (`STAGGER_CHAR`)**: `2 frames` per glyph in kinetic headlines (max duration 20 frames total).
* **Word Stagger (`STAGGER_WORD`)**: `4 frames` per word for secondary narrative subtitles.
* **Card / List Stagger (`STAGGER_CARD`)**: `5 frames` between adjacent cards (e.g., 3 Problem Cards or 3 QC Photo Slots).
* **Grid Pulse Stagger (`STAGGER_METRIC`)**: `3 frames` between EVM telemetry numbers.

---

### 1.4 Overshoot, Recoil & Eye Hold Guardrails
1. **Overshoot Limit**: Max scale overshoot is `1.12x` for badges and `1.08x` for UI cards. Camera zoom moves must have **0% overshoot** (monotonically increasing or decreasing scale).
2. **Mandatory Hold Time**: Every text block, metric number, and diagram must hold completely static for a minimum of `24 frames` (0.8s) before camera transitions begin.
3. **No Drift Ban**: Elements that have completed their entrance animation must not exhibit random float or idle breathing unless explicitly defined as low-contrast ambient background.

---

### 1.5 Typography Scale & Composition Safe Areas

#### Typography Hierarchy (1920×1080 Viewport)
* **Giant Kinetic Backdrop**: `Plus Jakarta Sans 900`, `140px - 180px`, letter-spacing `-0.04em`, color `#0F172A` at `4%` opacity.
* **Scene Category Badge**: `JetBrains Mono 800`, `14px - 16px`, letter-spacing `+0.12em`, uppercase pill.
* **Hero Headline (H1)**: `Plus Jakarta Sans 900`, `64px - 76px`, letter-spacing `-0.03em`, leading `1.05`.
* **Secondary Explainer**: `Plus Jakarta Sans 600`, `18px - 22px`, letter-spacing `-0.01em`, color `#64748B`.
* **Telemetry & Numeric Counters**: `JetBrains Mono 900`, `32px - 64px`, color `#0F172A` / `#F59E0B`.
* **Subtitle Overlay**: `Plus Jakarta Sans 600`, `18px`, padded pill centered at `bottom: 50px`.

#### 16:9 Master Grid & 9:16 Vertical Safe Area
* **16:9 Canvas**: `1920px × 1080px`. Title-safe margin: `100px` left/right, `60px` top/bottom.
* **9:16 Safe Zone**: The central `608px × 1080px` vertical pillar contains 100% of focal elements, so horizontal compositions can be automatically restacked or center-cropped into mobile TikTok/Reels without losing primary data.

---

### 1.6 Visual FX Pipeline (Blur, Grain, Scrim, Glow)
* **Motion Blur (`@remotion/motion-blur`)**: Applied with `shutterAngle: 180` during whip-pan camera shifts and 3D flight paths.
* **Procedural Film Grain Canvas (`#grungeGrainCanvas`)**:
  - Rendered at `16 FPS` cycle.
  - Mix-blend mode: `overlay` at `8%` opacity on light cream surfaces (adds tactile paper quality without obscuring text).
* **Warm Radial Bloom**: Soft ambient background gradient (`radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 65%)`).

---

### 1.7 Motion Personality & Anti-Slop Bans
* **Chosen Motion Personality**: **Clean Modern Utilitarian Tech** `[USER SELECTION]`.
* **Style Guidelines**: Sharp, snappy, crisp, and physically grounded. The visual weight communicates heavy industrial machinery and certified engineering rigor.
* **Explicit Anti-Slop Bans**:
  - ❌ BAN floaty, slow, wandering easing that makes the app feel unresponsive.
  - ❌ BAN decorative bouncing icons that serve no communication purpose.
  - ❌ BAN raw sRGB gradient interpolations that produce muddy grey midpoints.
  - ❌ BAN generic lorem ipsum text, mock placeholder names, or fake statistics.

---

# Phase 4: Frame-by-Frame Scene Specifications (Scene 1 to Scene 8)

Total Duration: Exactly **1800 Frames / 60.00 Seconds** (30 FPS, 120 BPM).

```
Scene 1: Frames 0000 - 0240 (0:00 - 0:08) — Kiln Reality & Total Blackout
Scene 2: Frames 0240 - 0450 (0:08 - 0:15) — Legacy Friction & Risky Slips
Scene 3: Frames 0450 - 0720 (0:15 - 0:24) — Offline-First PWA in Blind Spot
Scene 4: Frames 0720 - 0960 (0:24 - 0:32) — Signal Restored & 3D Flight Sync
Scene 5: Frames 0960 - 1230 (0:32 - 0:41) — 3-Stage Authenticated Photo Audit
Scene 6: Frames 1230 - 1500 (0:41 - 0:50) — Real-Time S-Curve & EVM Trajectory
Scene 7: Frames 1500 - 1650 (0:50 - 0:55) — The 3 Core Pillars Climax
Scene 8: Frames 1650 - 1800 (0:55 - 1:00) — Grand Finale & Actionable CTA
```

---

### 2.1 Scene 1: The Kiln Reality & Total Signal Blackout (Frames 0–240)
* **Time**: `00:00.000` to `00:08.000` (8.0 seconds / 16 beats)
* **Narrative Goal**: Establish the visceral, claustrophobic reality of a cement rotary kiln shutdown — where millions of dollars are at stake and standard mobile signals drop to zero.
* **On-Screen Text**:
  - Phase 1 (Frames 0–120): `"INSIDE THE STEEL KILN."`
  - Phase 2 (Frames 120–240): `"ZERO NETWORK SIGNAL."`
  - Subtitle: *"Deep inside the heavy steel shell of a rotary kiln, all telecommunication signals are completely cut off."*

#### Element Inventory
1. `HeroKilnVideo`: `assets/hero-kiln.mp4`, layer `z: 1`, full bleed `1920×1080`, industrial color grading.
2. `TelemetryHUD`: Reticle brackets, kiln coordinates `KM 18.2 - KM 37.0`, layer `z: 10`.
3. `TextPhase1`: Kinetic typography `CharReveal`, color `#FFFFFF`, drop shadow, layer `z: 20`.
4. `AmberSnapCover`: Fullscreen solid fill `#F59E0B`, layer `z: 30`, opacity 0 $\rightarrow$ 1 at frame 120.
5. `CrossedSignalIcon`: 3D vector SVG signal with red strike line, layer `z: 35`.
6. `TextPhase2`: Kinetic typography `CharReveal`, color `#0F172A`, layer `z: 35`.

#### Animation Timeline Table
| Element | Property | Start F | End F | Initial $\rightarrow$ Target Value | Easing / Spring | Description / Cue |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `HeroKilnVideo` | scale | 0 | 120 | `1.00` $\rightarrow$ `1.08` | `linear` | Slow, tense cinematic push-in. |
| `TelemetryHUD` | opacity | 10 | 25 | `0.0` $\rightarrow$ `1.0` | `EASE_IN_DECEL` | Technical telemetry brackets fade in. |
| `TextPhase1` | char reveal | 15 | 45 | translateY `40px` $\rightarrow$ `0px`, opacity `0` $\rightarrow$ `1` | `SPRING_RIGID` | Stagger 2f per glyph. |
| `AmberSnapCover`| opacity | 120 | 121 | `0.0` $\rightarrow$ `1.0` | `instant` | Hard beat drop cut on Beat 8! |
| `CrossedSignalIcon`| scale | 120 | 140 | `0.0` $\rightarrow$ `1.15` $\rightarrow$ `1.0` | `SPRING_SNAPPY` | Icon slaps into center. |
| `TextPhase2` | tracking | 125 | 165 | letter-spacing `-0.05em` $\rightarrow$ `+0.08em` | `EASE_IN_DECEL` | `"ZERO NETWORK SIGNAL"` expands. |
| `Scene1Rig` | whip-pan X | 225 | 240 | `0px` $\rightarrow$ `-1920px` | `EASE_OUT_ACCEL` | Aggressive whip pan transition to left. |

* **Virtual Camera**: Starts center, pushes in subtly (+8%), shakes vigorously at frame 120 (amplitude 12px, decaying over 15 frames).
* **Audio Cues**: Low industrial kiln drone (0–120) $\rightarrow$ Beat 8 impact drop with heavy whoosh at frame 120 $\rightarrow$ Whip whoosh at frame 230.

---

### 2.2 Scene 2: Legacy Chaos & Costly Overhaul Slips (Frames 240–450)
* **Time**: `00:08.000` to `00:15.000` (7.0 seconds / 14 beats)
* **Narrative Goal**: Highlight the acute pain points of conventional manual methods (spreadsheets corrupting formulas, WhatsApp reports lagging 36 hours, and catastrophic downtime costs).
* **On-Screen Text**:
  - Badge: `"OPERATIONAL FRICTION"`
  - Headline: `"LEGACY TOOLS RISK COSTLY SLIPS."`
  - Subtext: *"Corrupted spreadsheet formulas, blind-spot communication lag, and unseen downtime."*
  - Card 1: `"#REF! SYNTAX_FORMULA_ERROR • Corrupted Weight Calculations"`
  - Card 2: `"+36 HOURS REPORTING LAG • Progress Dispersed on WhatsApp"`
  - Card 3: `"$12,500 / HOUR • Unplanned Downtime Firing Slip"`

#### Element Inventory
1. `BgCanvas`: `#FAF7F2` Titanium cream, layer `z: 1`.
2. `EditorialRunner`: Continuous background marquee `"LEGACY CHAOS • DATA SILOS • UNSEEN DELAYS"`, layer `z: 2`.
3. `LeftColumnText`: Badge, Headline `CharReveal`, subtext, layer `z: 10`.
4. `ProblemCard1`: Red border `#FEE2E2`, warning spreadsheet icon, layer `z: 20`.
5. `ProblemCard2`: Amber border `#FEF3C7`, clock delay icon, layer `z: 21`.
6. `ProblemCard3`: Dark slate border `#334155`, flame cost icon, layer `z: 22`.

#### Animation Timeline Table
| Element | Property | Start F | End F | Initial $\rightarrow$ Target Value | Easing / Spring | Description / Cue |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `LeftColumnText` | translateY / opac | 245 | 275 | `50px` $\rightarrow$ `0px`, `0` $\rightarrow$ `1` | `EASE_IN_DECEL` | Headline enters crisply. |
| `ProblemCard1` | translateY / scale | 260 | 285 | `80px` $\rightarrow$ `0px`, `0.85` $\rightarrow$ `1.0` | `SPRING_SNAPPY` | Card 1 slaps in, pop SFX. |
| `ProblemCard2` | translateY / scale | 285 | 310 | `80px` $\rightarrow$ `0px`, `0.85` $\rightarrow$ `1.0` | `SPRING_SNAPPY` | Card 2 slaps in, pop SFX. |
| `ProblemCard3` | translateY / scale | 310 | 335 | `80px` $\rightarrow$ `0px`, `0.85` $\rightarrow$ `1.0` | `SPRING_SNAPPY` | Card 3 slaps in, pop SFX. |
| `ProblemCard1` | error flash | 340 | 360 | border-color `#FEE2E2` $\rightarrow$ `#DC2626` | `linear` | Error alert pulse. |
| `Scene2Rig` | whip-pan X | 435 | 450 | `0px` $\rightarrow$ `-1920px` | `EASE_OUT_ACCEL` | Match-move exit to right. |

* **Virtual Camera**: 3D tilt `rotateY(6deg)` focusing on right-hand problem cards, subtle push-in `scale: [0.98, 1.05]`.
* **Audio Cues**: Whoosh at frame 240 $\rightarrow$ Pop SFX at frames 260, 285, 310 $\rightarrow$ Whip whoosh at frame 440.

---

### 2.3 Scene 3: Offline-First PWA in the Kiln Blind-Spot (Frames 450–720)
* **Time**: `00:15.000` to `00:24.000` (9.0 seconds / 18 beats)
* **Narrative Goal**: Demonstrate Trunova's primary technical breakthrough — logging physical refractory installation inside the steel kiln without network connection, guaranteed by IndexedDB local storage.
* **On-Screen Text**:
  - Badge: `"PWA BLIND-SPOT ENGINE"`
  - Headline: `"WORK KEEPS MOVING."`
  - Subtext: *"100% operational inside the steel kiln without cellular or internet connectivity."*
  - Interactive Toast: `"Input Pasang Bata: +12.5 m • Saved to Offline Memory"`
  - Status Banner: `"KILN OFFLINE MODE ACTIVE • 3 Queued Mutations Safe"`

#### Element Inventory
1. `BgCanvas`: `#FAF7F2`, layer `z: 1`.
2. `MobileSupergraphic`: Vector backing frame `assets/branding/supergraphics/mobile-cover-supergraphic.svg`, layer `z: 5`.
3. `PhoneMockup`: 3D Smartphone bezel containing real screen capture `captures/mobile-01-input-progress.png`, layer `z: 20`.
4. `FingerTapRipple`: Simulated interactive touch circle, amber border, layer `z: 25`.
5. `FloatingSavedToast`: Dark slate pill `#0F172A` with checkmark, inside phone screen, layer `z: 28`.
6. `OfflineQueueCard`: Bottom floating card with 3 queued data items, layer `z: 30`.

#### Animation Timeline Table
| Element | Property | Start F | End F | Initial $\rightarrow$ Target Value | Easing / Spring | Description / Cue |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `PhoneMockup` | translateY / rotY | 450 | 485 | `250px` $\rightarrow$ `0px`, `-15deg` $\rightarrow$ `-4deg` | `SPRING_RIGID` | 3D phone glides into center-right. |
| `Headline` | char reveal | 460 | 490 | translateY `40px` $\rightarrow$ `0px`, opacity `0` $\rightarrow$ `1` | `SPRING_RIGID` | Text enters on left. |
| `FingerTapRipple`| scale / opacity | 505 | 525 | scale `0.2` $\rightarrow$ `1.8`, opac `1` $\rightarrow$ `0` | `EASE_IN_DECEL` | Tactile tap on `+12.5m` input. |
| `FloatingSavedToast`| scale / translateY | 515 | 535 | scale `0.5` $\rightarrow$ `1.0`, `20px` $\rightarrow$ `0px` | `SPRING_SNAPPY` | Toast springs up inside phone. |
| `OfflineQueueCard`| scale / opacity | 560 | 590 | scale `0.85` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `SPRING_SNAPPY` | Queue card appears on left. |
| `QueueItem 1-3` | stagger translateY | 590 | 620 | `20px` $\rightarrow$ `0px`, opac `0` $\rightarrow$ `1` | `SPRING_RIGID` | 3 items cascade into list (5f stagger). |
| `PhoneMockup` | push zoom | 620 | 700 | scale `0.95` $\rightarrow$ `1.08` | `linear` | Focus deepens on saved state. |
| `Scene3Rig` | match-cut slide | 705 | 720 | translateX `0px` $\rightarrow$ `-1100px` | `EASE_OUT_ACCEL` | Match-move exit towards sync screen. |

* **Virtual Camera**: Smooth 3D flight starting low, settling at an isometric angle (-4 deg Y), then pushing in before the cut.
* **Audio Cues**: Click SFX at frame 505 (finger tap) $\rightarrow$ Pop SFX at frame 515 $\rightarrow$ Chime SFX at frame 560 (queue card).

---

### 2.4 Scene 4: Instant Reconnection & 3D Flight Convergence (Frames 720–960)
* **Time**: `00:24.000` to `00:32.000` (8.0 seconds / 16 beats)
* **Narrative Goal**: The worker emerges from the kiln. The 4G signal restores immediately. Queued mutations fly dynamically across the 3D void and land safely into the central desktop dashboard without losing a single byte.
* **On-Screen Text**:
  - Badge: `"SIGNAL RESTORED • 4G ONLINE"`
  - Headline: `"INSTANT RECONNECTION."`
  - Subtext: `"Zero data loss guaranteed with Server-Sent Events (SSE) socket sync."`
  - Data Packet Pill: `"MUTATION_SYNC_PACKET • +12.5m Bricking Confirmed"`
  - Desktop Toast: `"✓ SYNCHRONIZATION COMPLETE • 3 Records Merged to Database"`

#### Element Inventory
1. `BgCanvas`: `#FAF7F2`, layer `z: 1`.
2. `SunburstRays`: Rotating dynamic vector `assets/branding/supergraphics/divider-rays.svg`, layer `z: 2`.
3. `PhoneLeft`: Mobile phone showing offline queue clearing, layer `z: 10`, positioned at left.
4. `BrowserRight`: Desktop browser mockup showing `captures/desktop-01-dashboard.png`, layer `z: 10`, positioned at right.
5. `FlightPacket3D`: Glowing amber data pill with corner brackets, parabolic trajectory in 3D space, layer `z: 40`.
6. `SuccessPill`: Emerald green confirmation toast appearing inside desktop browser, layer `z: 45`.

#### Animation Timeline Table
| Element | Property | Start F | End F | Initial $\rightarrow$ Target Value | Easing / Spring | Description / Cue |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `SignalBadge` | scale / color | 725 | 745 | scale `0.7` $\rightarrow$ `1.0`, gray $\rightarrow$ `#10B981` | `SPRING_SNAPPY` | Badge pops green at top. |
| `Headline` | char reveal | 730 | 760 | translateY `30px` $\rightarrow$ `0px`, opac `0` $\rightarrow$ `1` | `SPRING_RIGID` | Headline enters cleanly. |
| `FlightPacket3D`| translation X | 765 | 810 | `-450px` $\rightarrow$ `+420px` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Parabolic arc from phone to desktop. |
| `FlightPacket3D`| translation Y | 765 | 810 | `100px` $\rightarrow$ `-180px` $\rightarrow$ `0px` | `cubic-bezier(0.4, 0, 0.2, 1)` | Arc rises and lands. |
| `FlightPacket3D`| scale / 3D rotZ | 765 | 810 | scale `0.6` $\rightarrow$ `1.2` $\rightarrow$ `0.9`, rot `0` $\rightarrow$ `15deg` | `linear` | Banking in flight. |
| `BrowserRight` | impact scale | 810 | 825 | scale `0.98` $\rightarrow$ `1.02` $\rightarrow$ `1.0` | `SPRING_RIGID` | Desktop absorbs packet landing. |
| `SuccessPill` | scale / opacity | 815 | 835 | scale `0.5` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `SPRING_SNAPPY` | Green success badge pops inside browser. |
| `Scene4Rig` | push zoom | 850 | 945 | scale `1.0` $\rightarrow$ `1.08` | `linear` | Camera pushes into browser dashboard. |
| `Scene4Rig` | whip exit | 945 | 960 | translateY `0px` $\rightarrow$ `-1080px` | `EASE_OUT_ACCEL` | Vertical whip cut up to photo audit. |

* **Virtual Camera**: Tracks the 3D data packet across the divide; slight Dutch tilt (4 deg) to enhance kinetic flight speed.
* **Audio Cues**: Chime SFX at frame 725 (online sound) $\rightarrow$ High whoosh at frame 765 (data rocket) $\rightarrow$ Crisp checkmark chime at frame 810 (sync confirmed).

---

### 2.5 Scene 5: 3-Stage Authenticated Photo Audit Pipeline (Frames 960–1230)
* **Time**: `00:32.000` to `00:41.000` (9.0 seconds / 18 beats)
* **Narrative Goal**: Prove that quality control is rock-solid. Show 3 actual field photos taken during the overhaul, stamped with tamper-evident inspection seals, eliminating post-overhaul brick collapse.
* **On-Screen Text**:
  - Badge: `"3-STAGE QC VERIFICATION"`
  - Headline: `"AUTHENTICATED FIELD PROOF."`
  - Subtext: *"Complete visual documentation across every critical overhaul milestone."*
  - Card 1: `"STAGE 1 // Before Tearing • KM 18.2 - 24.5 • [✓ INSPECTED]"`
  - Card 2: `"STAGE 2 // During Bricking • KM 24.5 - 32.0 • [✓ VERIFIED]"`
  - Card 3: `"STAGE 3 // After Key Jacking • KM 32.0 - 37.0 • [✓ APPROVED]"`

#### Element Inventory
1. `BgCanvas`: `#FAF7F2`, layer `z: 1`.
2. `EditorialRunner`: `"THREE-STAGE QUALITY CONTROL • BEFORE DURING AFTER • ZERO COLLAPSE"`, layer `z: 2`.
3. `PhotoCard 1`: `assets/audit-before.jpg`, white card frame with corner brackets, layer `z: 20`.
4. `PhotoCard 2`: `assets/audit-during.jpg`, white card frame with corner brackets, layer `z: 21`.
5. `PhotoCard 3`: `assets/audit-after.jpg`, white card frame with corner brackets, layer `z: 22`.
6. `StampSeal 1-3`: Emerald green `#10B981` angled verification stamp seals, layer `z: 30`.
7. `BottomBadge`: Industrial pill `"ANTI-MISKEYING AUDIT PIPELINE • 100% PHOTO PROOF"`, layer `z: 35`.

#### Animation Timeline Table
| Element | Property | Start F | End F | Initial $\rightarrow$ Target Value | Easing / Spring | Description / Cue |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Headline` | char reveal | 965 | 995 | translateY `40px` $\rightarrow$ `0px`, opac `0` $\rightarrow$ `1` | `SPRING_RIGID` | Headline enters at top. |
| `PhotoCard 1` | translateY / rot | 980 | 1005 | `150px` $\rightarrow$ `0px`, rot `0` $\rightarrow$ `-2deg` | `SPRING_SNAPPY` | Card 1 drops in. |
| `StampSeal 1` | scale / opacity | 1005 | 1020 | scale `2.2` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `SPRING_SNAPPY` | `[✓ INSPECTED]` stamp slaps on photo. |
| `PhotoCard 2` | translateY / rot | 1030 | 1055 | `150px` $\rightarrow$ `0px`, rot `0` $\rightarrow$ `+1.8deg`| `SPRING_SNAPPY` | Card 2 drops in. |
| `StampSeal 2` | scale / opacity | 1055 | 1070 | scale `2.2` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `SPRING_SNAPPY` | `[✓ VERIFIED]` stamp slaps on photo. |
| `PhotoCard 3` | translateY / rot | 1080 | 1105 | `150px` $\rightarrow$ `0px`, rot `0` $\rightarrow$ `-1.2deg`| `SPRING_SNAPPY` | Card 3 drops in. |
| `StampSeal 3` | scale / opacity | 1105 | 1120 | scale `2.5` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `SPRING_SNAPPY` | `[✓ APPROVED]` stamp slaps on photo. |
| `BottomBadge` | scale / opacity | 1130 | 1155 | scale `0.85` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `SPRING_RIGID` | Bottom badge locks into view. |
| `Scene5Rig` | push zoom | 1150 | 1215 | scale `1.0` $\rightarrow$ `1.06` | `linear` | Hold to inspect quality cards. |
| `Scene5Rig` | whip exit | 1215 | 1230 | translateX `0px` $\rightarrow$ `-1920px` | `EASE_OUT_ACCEL` | Whip pan left to S-Curve engine. |

* **Virtual Camera**: Smooth parallax pan across the 3 cards; camera shakes lightly upon each stamp slap (amplitude 4px).
* **Audio Cues**: Shutter SFX at frames 980, 1030, 1080 $\rightarrow$ Heavy mechanical stamp check SFX at frames 1005, 1055, 1105.

---

### 2.6 Scene 6: Real-Time S-Curve & EVM Trajectory Engine (Frames 1230–1500)
* **Time**: `00:41.000` to `00:50.000` (9.0 seconds / 18 beats)
* **Narrative Goal**: Deliver the mathematical climax of the platform. Show the vector S-Curve drawing live with glowing gradient stroke, surging past the planned baseline to prove that the overhaul is ahead of schedule with zero firing slippage.
* **On-Screen Text**:
  - Badge: `"EARNED VALUE MANAGEMENT"`
  - Headline: `"REAL-TIME S-CURVE MATRIX."`
  - Subtext: `"Predictive firing restart right on schedule."`
  - Counter 1: `"88% CUMULATIVE PROGRESS • Target Plan: 85.6% [▲ ACCELERATING]"`
  - Counter 2: `"+2.4% SCHEDULE VARIANCE • SPI Index: 1.03 (Optimal Pace)"`
  - Canvas Tooltip: `"88% REVENUE • +2.4% AHEAD"`

#### Element Inventory
1. `BgCanvas`: `#FAF7F2`, layer `z: 1`.
2. `EditorialRunner`: `"EARNED VALUE MANAGEMENT • REAL-TIME S-CURVE ENGINE • ZERO SLIP"`, layer `z: 2`.
3. `LeftColumnMetrics`: Cumulative % counter, Schedule Variance card with green hand-drawn highlight circle, layer `z: 15`.
4. `SCurveCanvas`: Dedicated vector SVG canvas `width={880} height={520}`, layer `z: 20`:
   - Grid lines & axis labels (`0%` to `100%`, `H-01` to `H-18`).
   - Planned baseline (dashed slate stroke).
   - Actual S-Curve (glowing gradient `#2563EB` $\rightarrow$ `#F59E0B` $\rightarrow$ `#10B981`).
   - Radar tip tracker & coordinate callout badge.

#### Animation Timeline Table
| Element | Property | Start F | End F | Initial $\rightarrow$ Target Value | Easing / Spring | Description / Cue |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Headline` | char reveal | 1235 | 1265 | translateY `40px` $\rightarrow$ `0px`, opac `0` $\rightarrow$ `1` | `SPRING_RIGID` | Headline enters. |
| `SCurveCanvas` | scale / opacity | 1245 | 1275 | scale `0.88` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `SPRING_RIGID` | Chart canvas board expands. |
| `PlannedBaseline`| stroke-dashoffset| 1265 | 1310 | `1.0` $\rightarrow$ `0.0` | `EASE_IN_DECEL` | Dashed target line draws in. |
| `ActualSCurve` | stroke-dashoffset| 1285 | 1380 | `1.0` $\rightarrow$ `0.12` (88% drawn) | `cubic-bezier(0.4, 0, 0.2, 1)` | Glowing actual curve sweeps forward! |
| `NumericCounter`| numeric value | 1285 | 1380 | `64%` $\rightarrow$ `88%` | `linear` | Large progress counter counts up. |
| `RadarTipTracker`| scale / pulse | 1375 | 1410 | scale `0.0` $\rightarrow$ `1.4` $\rightarrow$ `1.0` | `SPRING_SNAPPY` | Radar target blinks at 88% tip. |
| `VarianceCard` | scale / opacity | 1380 | 1405 | scale `0.85` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `SPRING_SNAPPY` | Green `+2.4% Ahead` badge pops. |
| `HighlightCircle`| stroke draw-on | 1405 | 1435 | `dashoffset: 1` $\rightarrow$ `0` | `EASE_IN_DECEL` | Hand-drawn loop circles `+2.4%`. |
| `Scene6Rig` | push-in | 1410 | 1485 | scale `1.0` $\rightarrow$ `1.06` | `linear` | Triumphant hold on perfect curve. |
| `Scene6Rig` | whip exit | 1485 | 1500 | translateX `0px` $\rightarrow$ `-1920px` | `EASE_OUT_ACCEL` | Whip pan left to Climax. |

* **Virtual Camera**: Smooth push-in directly toward the intersection point where actual progress overtakes planned baseline.
* **Audio Cues**: Subtle digital frequency sweep (1285–1380) $\rightarrow$ Chime SFX at frame 1380 $\rightarrow$ Pop SFX at frame 1405.

---

### 2.7 Scene 7: The 3 Core Pillars Climax (Frames 1500–1650)
* **Time**: `00:50.000` to `00:55.000` (5.0 seconds / 10 beats)
* **Narrative Goal**: Hypnotic rapid-fire rhythm. Reinforce the three defining pillars of Trunova with 3 solid full-screen color cuts changing exactly every 50 frames (every 3.3 beats).
* **On-Screen Text**:
  - Beat 1 (Frames 1500–1550): `"01 // OFFLINE-FIRST PWA"` • Sub: *"Full Kiln Shell Blind-Spot Resilience"*
  - Beat 2 (Frames 1550–1600): `"02 // 3-STAGE QC AUDIT"` • Sub: *"Photo-Verified Refractory Standards"*
  - Beat 3 (Frames 1600–1650): `"03 // PRECISE S-CURVE"` • Sub: *"Zero Downtime Slippage Guaranteed"*

#### Element Inventory
1. `Pillar 1 Slide`: Background `#FAF7F2` Titanium Cream, text `#0F172A`, flame amber accent, layer `z: 10`.
2. `Pillar 2 Slide`: Background `#F59E0B` Solid Flame Amber, text `#0F172A`, white accent, layer `z: 20`.
3. `Pillar 3 Slide`: Background `#0F172A` Deep Midnight Navy, text `#FFFFFF`, emerald accent, layer `z: 30`.
4. `RotatingSupergraphic`: Sunburst rays and dynamic geometric shapes rotating behind text, layer `z: 5`.

#### Animation Timeline Table
| Element | Property | Start F | End F | Initial $\rightarrow$ Target Value | Easing / Spring | Description / Cue |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Pillar 1 Text` | scale / tracking | 1500 | 1535 | scale `0.9` $\rightarrow$ `1.04`, track `0` $\rightarrow$ `0.04em` | `EASE_IN_DECEL` | Cream slide snap on Beat 100. |
| `Pillar 2 Snap` | scale / opacity | 1550 | 1552 | scale `1.15` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `instant` | Amber slide snap on Beat 103! |
| `Pillar 3 Snap` | scale / opacity | 1600 | 1602 | scale `1.15` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `instant` | Navy slide snap on Beat 106! |
| `CameraImpact` | shake amplitude | 1550 & 1600 | +12f | `10px` $\rightarrow$ `0px` | `decaying` | Impact camera shake on each cut. |

* **Virtual Camera**: Continuous forward zoom across all three cuts (`scale: 0.95` to `1.10`) creating unstoppable momentum.
* **Audio Cues**: Heavy whoosh cut at frame 1500 $\rightarrow$ Snappy pop cut at frame 1550 $\rightarrow$ Snappy pop cut at frame 1600.

---

### 2.8 Scene 8: Grand Brand Finale & Actionable Call-to-Action (Frames 1650–1800)
* **Time**: `00:55.000` to `01:00.000` (5.0 seconds / 10 beats)
* **Narrative Goal**: Resolve the high-energy journey with clarity, dignity, and a clear call-to-action. Settle the Trunova logo into the center of the frame with a pulsating launch button.
* **On-Screen Text**:
  - Brand Mark: `"trunova"` (with illuminated amber sunburst 'o')
  - Tagline: `"Kiln Shutdown & Overhaul Intelligence"`
  - Subtitle: *"Take command of your cement rotary kiln overhauls with real-time data precision."*
  - CTA Button: `"Launch Trunova Today →"`
  - Official URL: `"trunova.app (Official Webapp)"`

#### Element Inventory
1. `BgCanvas`: `#FAF7F2` Titanium cream, layer `z: 1`.
2. `WarmRadialBloom`: Radial gradient `#F59E0B` at `10%` opacity, pulsing gently, layer `z: 2`.
3. `SunburstRays`: Soft spinning vector background `assets/branding/supergraphics/divider-rays.svg`, layer `z: 3`.
4. `TrunovaBrandLogo`: Full master SVG `assets/branding/trunova-logo-brand.svg`, layer `z: 20`.
5. `HandDrawnUnderline`: Amber stroke under tagline, layer `z: 22`.
6. `CTAButton`: Flame Amber `#F59E0B` pill button with forward arrow, layer `z: 25`.
7. `URLBadge`: Clean white badge `"🌐 trunova.app"`, layer `z: 26`.

#### Animation Timeline Table
| Element | Property | Start F | End F | Initial $\rightarrow$ Target Value | Easing / Spring | Description / Cue |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TrunovaBrandLogo`| scale / opacity | 1650 | 1680 | scale `0.75` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `SPRING_RIGID` | Brand mark blooms from center. |
| `SunburstCenter`| rotation | 1650 | 1800 | `0deg` $\rightarrow$ `90deg` | `linear` | Center sunburst 'o' rotates gracefully. |
| `Tagline` | translateY / opac | 1670 | 1695 | `25px` $\rightarrow$ `0px`, opac `0` $\rightarrow$ `1` | `EASE_IN_DECEL` | Tagline locks under logo. |
| `HandUnderline` | stroke-dashoffset| 1685 | 1715 | `1.0` $\rightarrow$ `0.0` | `EASE_IN_DECEL` | Amber stroke draws under tagline. |
| `CTAButton` | scale / opacity | 1705 | 1730 | scale `0.6` $\rightarrow$ `1.0`, opac `0` $\rightarrow$ `1` | `SPRING_SNAPPY` | CTA button pops with shadow. |
| `CTAButton` | breathing pulse | 1735 | 1800 | scale `1.0` $\rightleftharpoons$ `1.04` (cycle 30f)| `sine` | Subtle breathing call-to-action. |
| `URLBadge` | opacity | 1720 | 1745 | `0.0` $\rightarrow$ `1.0` | `EASE_IN_DECEL` | Official URL badge appears below. |
| `FinaleHold` | zero motion hold | 1745 | 1800 | static hold (55 frames / 1.8s) | `none` | Clean, rock-solid ending frame. |

* **Virtual Camera**: Starts slightly zoomed in, then smoothly pulls back (`scale: 1.04` to `0.98`) to give the brand logo grandeur and breathing space.
* **Audio Cues**: Resonant chime at frame 1650 $\rightarrow$ Soft pop click at frame 1705 $\rightarrow$ Music fades out gently over frames 1770–1800.

---

# Phase 4.9: Specific Trunova Motion Craft Solutions

1. **Interactive Reticle Cursor Craft**:
   - Matches `.custom-cursor-dot` and `.custom-cursor-ring` from `landing.html`.
   - Center dot snaps to clickable elements with `SPRING_SNAPPY`; outer ring lags physically by 3 frames (`lerp(0.18)`), expanding by `1.6x` on click with an amber pulse ring.
2. **Kinetic Typography (Char & Word Reveal)**:
   - Built with `AdvancedMotionType.tsx`: each glyph enters along an inclined trajectory `translateY(35px) rotate(4deg)` with overshoot dampening, preventing static text transitions.
3. **UI Mockup Staging (Phone & Desktop)**:
   - Modeled inside high-precision 3D device bezels with subtle rim lighting. When a feature is active, surrounding non-essential UI elements dim to `30%` opacity while the active card elevates with `0 16px 36px rgba(15, 23, 42, 0.15)`.
4. **S-Curve Mathematical Plotting Engine**:
   - Pure vector cubic Bezier SVG path:
     $$B(t) = (1-t)^3 P_0 + 3(1-t)^2 t P_1 + 3(1-t) t^2 P_2 + t^3 P_3$$
   - Animated via `strokeDashoffset` from `1.0` to `0.12`, accompanied by dynamic numeric interpolation for both cumulative percentage and schedule variance.
5. **Layout Restructuring (16:9 Editorial to 9:16 Mobile)**:
   - In 16:9: Asymmetric horizontal editorial split (narrative on left, interactive canvas on right).
   - In 9:16: Balanced vertical stack (category badge & title on top, full-width canvas in center, 3-pill metric strip in bottom safe area with `paddingBottom: 225px` to never collide with the subtitle bar).

---

# Phase 5: Technical Mapping to Remotion & Code Architecture

| Motion Technique | Remotion / React Implementation | Key Parameters | Assets Required | Difficulty | Risk & Safe Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Frame Animation** | `useCurrentFrame()`, `interpolate()` | `extrapolateLeft: 'clamp', extrapolateRight: 'clamp'` | None (Pure React) | Easy | Unclamped interpolation can cause negative scale. Always enforce `'clamp'`. |
| **Physical Springs** | `spring()` from `remotion` | `damping: 24, stiffness: 220, mass: 1` | None | Easy | High stiffness causes oscillation; stick to calibrated presets. |
| **Motion Blur** | `<MotionBlur>` from `@remotion/motion-blur` | `shutterAngle: 180, samples: 5` | None | Medium | Can increase render time by ~2x. Fallback: standard CSS transform blur filter. |
| **Vector Curve Draw**| `<path>` + `strokeDasharray`, `strokeDashoffset` | Normalized path length `1.0` | Inlined SVG paths | Medium | SVG path length measurement bugs in React. Use `pathLength="1"`. |
| **3D Device Flight** | `transform: translate3d(...) rotateX(...) rotateY(...)` | `perspective: 1200px` | Phone & Browser Mockup PNGs | Medium | Device clip overflow. Enforce `transformStyle: 'preserve-3d'` on parent. |
| **Procedural Noise** | `@remotion/noise` (`noise2D()`) or Canvas | `seed: 42, speed: 0.05` | None | Medium | Canvas lag if re-rendered per frame. Cache grain noise in a lightweight static canvas loop. |
| **Scene Transitions** | `<Sequence>` & `@remotion/transitions` | `durationInFrames: 15` | None | Easy | Abrupt cuts if sequences do not overlap by transition duration. |

---

# Phase 6: Production Asset Checklist & Risk Mitigation

### 6.1 Production Asset Checklist
* [x] **Video Background**: `assets/hero-kiln.mp4` verified and functional in `/video/public/videos/hero-kiln.mp4`.
* [x] **Real Inspection Photos**: `audit-before.jpg`, `audit-during.jpg`, `audit-after.jpg` verified in `/video/public/photos/`.
* [x] **High-Res App Screens**: 13 Retina PNGs verified in `/video/analysis/screens/`.
* [x] **Brand Logos**: `trunova-logo-brand.svg`, `sunburst-icon-amber.svg`, `tr-monogram.svg` verified in `/assets/branding/`.
* [x] **Supergraphics**: `divider-rays.svg`, `card-corner-accent.svg`, `mobile-cover-supergraphic.svg` verified.
* [x] **Soundtrack**: `video/public/audio/bgm-upbeat.wav` (120 BPM) verified.
* [x] **Sound Effects (SFX)**: `sfx-whoosh.wav`, `sfx-pop.wav`, `sfx-click.wav`, `sfx-shutter.wav`, `sfx-check.wav`, `sfx-chime.wav` verified.

### 6.2 SVG Optimization Tasks for Animation
1. `trunova-logo-brand.svg`: Verify each letter ('t', 'r', 'u', 'n', 'o', 'v', 'a') has a unique `<path id="...">` to allow letter-by-letter staggering.
2. `sunburst-icon-amber.svg`: Ensure the 38 radial rays have `transform-origin: center center` (pivot at 50% 50%) for smooth rotation without orbital wobble.
3. `card-corner-accent.svg`: Group top-left, top-right, bottom-left, bottom-right brackets into distinct `<g id="...">` tags.

### 6.3 Recommended Production Sequence
1. **Milestone 1**: Implement `AdvancedMotionType.tsx` and test English kinetic typography components.
2. **Milestone 2**: Build `SCurveChartCanvas.tsx` with dual-trajectory vector math and live coordinate tooltips.
3. **Milestone 3**: Assemble Scene 1 (Hook), Scene 2 (Problem), and Scene 3 (PWA Blind-Spot).
4. **Milestone 4**: Assemble Scene 4 (3D Flight Sync) and Scene 5 (3-Stage QC Photo Audit).
5. **Milestone 5**: Assemble Scene 6 (S-Curve Matrix), Scene 7 (3 Pillars Climax), and Scene 8 (Grand Finale).
6. **Milestone 6**: Global audio pass (syncing 6 SFX cue files to exact frame beats) & final master render.

### 6.4 Key Risks & Decisions Awaiting Approval
1. **Risk 1: Rendering Time for Motion Blur**  
   *Mitigation*: Pre-render draft previews without motion blur (`--frames=0-90`), then activate `@remotion/motion-blur` for final production exports.
2. **Risk 2: Multi-Language Subtitles**  
   *Decision*: All on-screen motion titles and cards are 100% in English `[USER SELECTION]`. Subtitle bar at the bottom can optionally display synchronized Indonesian or English captions.
