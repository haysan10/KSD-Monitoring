# Product Analysis & Strategic Narrative: TRUNOVA Launch Video

> **Document Type**: Product Analysis & Motion Narrative Strategy (Phase 1 & Phase 2)  
> **Project Target**: TRUNOVA — Kiln Shutdown & Overhaul Intelligence Webapp  
> **Author**: Senior Motion Director & Product Video Strategist  
> **Output Path**: `/video/analysis/product-analysis.md`  
> **Status**: Completed & Structured for Production  

---

## Table of Contents
1. [Phase 1: Deep Product Analysis from Codebase](#phase-1-deep-product-analysis-from-codebase)
   - 1.1 [Product Summary & Core Value Proposition](#11-product-summary--core-value-proposition)
   - 1.2 [Complete Module Map & User Flow](#12-complete-module-map--user-flow)
   - 1.3 [Top 5 Visual Hero Features](#13-top-5-visual-hero-features)
   - 1.4 [The "Aha Moment" Operational Flow](#14-the-aha-moment-operational-flow)
   - 1.5 [Brand Design Tokens from Codebase](#15-brand-design-tokens-from-codebase)
   - 1.6 [Available Vector, Video & Image Assets](#16-available-vector-video--image-assets)
   - 1.7 [High-Resolution Application Screen Captures](#17-high-resolution-application-screen-captures)
   - 1.8 [Realistic Industrial Test Data](#18-realistic-industrial-test-data)
2. [Phase 2: Concept & Video Narrative](#phase-2-concept--video-narrative)
   - 2.1 [Two Creative Concepts & Strategic Recommendation](#21-two-creative-concepts--strategic-recommendation)
   - 2.2 [60-Second Narrative Architecture & Duration Breakdown](#22-60-second-narrative-architecture--duration-breakdown)
   - 2.3 [English Headline & Copy Matrix (3 Alternatives)](#23-english-headline--copy-matrix-3-alternatives)
   - 2.4 [Musical Beat Grid (120 BPM / 15 Frames Per Beat)](#24-musical-beat-grid-120-bpm--15-frames-per-beat)

---

# Phase 1: Deep Product Analysis from Codebase

### 1.1 Product Summary & Core Value Proposition
* **Product Name**: TRUNOVA (formerly KSD Monitor - Kiln Shutdown Dashboard) `[DARI KODE]`
* **Category**: Industrial Cement Plant Major Overhaul & Rotary Kiln Refractory Management System `[DARI KODE]`
* **Primary Function**: Single command platform for tracking shutdown progress, calculating real-time Earned Value Management (EVM) S-Curves, enforcing anti-miskeying field inputs, authenticating 3-stage refractory inspection photos, and operating offline inside heavy steel kiln shells `[DARI KODE]`.
* **Target Users**:
  1. *Plant Managers & Executive Stakeholders*: Monitoring overall overhaul milestone deadlines, schedule variance (SV), and firing restart predictions `[DARI KODE]`.
  2. *Kiln Mechanical Superintendents & Overhaul Coordinators*: Managing day-to-day shift targets, contractor manpower, and logistics `[DARI KODE]`.
  3. *Refractory Specialists & QC Inspectors*: Auditing bricking taper alignment, key jacking pressure, castable pre-heat curing, and photo documentation `[DARI KODE]`.
  4. *Field Foremen & Shift Operators*: Inputting physical progress on mobile devices inside the kiln without mobile network connectivity `[DARI KODE]`.
* **Core Value Proposition (Plain Language)**: *"Eliminating spreadsheet corruption, blind-spot communication lag, and costly downtime slippage during major cement rotary kiln overhauls."* `[DARI KODE]`

---

### 1.2 Complete Module Map & User Flow
Extracted directly from `index.html` (lines 3919–5620) and `README.md`:

| Module ID | Module Name in Codebase | Key Functionalities & UI Components | Visual Weight |
| :--- | :--- | :--- | :--- |
| `01. #view-dashboard` | **Executive Telemetry Dashboard** | Project status hero, daily progress gauge, quick milestone telemetry, critical alerts, shift overview. `[DARI KODE]` | High (Global View) |
| `02. #view-overview` | **Scope & Work Breakdown Overview** | Project scope summary, jobdesk hierarchy, contract value, target finish date. `[DARI KODE]` | Medium |
| `03. #view-scurve` | **Real-Time S-Curve & EVM Engine** | Dual trajectory graph (Planned vs Actual EVM), Schedule Variance (SV), SPI index, live completion projection. `[DARI KODE]` | **Ultra-High (Hero)** |
| `04. #view-table` | **Master Jobdesk IAC Matrix** | Hierarchical job list, sub-jobdesk breakdowns, assigned contractors, meter markers (KM 00.0 - 45.0). `[DARI KODE]` | Medium |
| `05. #view-validations` | **3-Stage QC Photo Audit** | 3-slot authenticated inspection cards (*Stage 1: Before Tearing, Stage 2: During Bricking, Stage 3: After Key Jacking*) with pass/reject stamps. `[DARI KODE]` | **Ultra-High (Hero)** |
| `06. #view-input` | **Field Progress Input & Anti-Miskeying** | 4-step wizard form, auto-fill job selector, physical volume slider/inputs, auto-calculation, IndexedDB local persistence. `[DARI KODE]` | **Ultra-High (Hero)** |
| `07. #view-calendar` | **Project Calendar & Milestone Path** | Gantt-style daily progress timeline, critical path tasks, countdown to firing restart. `[DARI KODE]` | Medium |
| `08. #view-reports` | **Executive Report Center** | 1-click PDF export, Google Spreadsheet synchronization, printable shift handover reports. `[DARI KODE]` | High |
| `09. #view-castable` | **Refractory & Castable Calculator** | Volume-to-tonnage converter, water-ratio calculator, curing schedule, slump/crushing test log. `[DARI KODE]` | High (Technical) |
| `10. #view-logs` | **System Audit Trail & Security Log** | Real-time SSE mutations, user activity stamps, tamper-proof audit history. `[DARI KODE]` | Low |
| `11. #view-setup` | **Project Baseline & Access Control** | Baseline lock mechanism, RBAC roles (Superadmin, Project Coordinator, Contractor, Guest). `[DARI KODE]` | Low |
| `12. #view-guide` | **Operational Standards & SOP** | Bricking standards, safety rules, interactive guided tour. `[DARI KODE]` | Low |

---

### 1.3 Top 5 Visual Hero Features
Selected for maximum cinematic motion impact and product differentiation:

1. **Feature 1: Real-Time S-Curve & EVM Trajectory Engine (`#view-scurve`)** `[DARI KODE]`
   * *Why it's hero*: S-Curves are the universal language of mega-project progress. Animating an SVG curve dynamically drawing alongside planned baselines with glowing coordinate tooltips (`88% Actual / +2.4% Ahead`) instantly proves quantitative intelligence.
2. **Feature 2: Offline-First PWA Blind-Spot Engine (`sw.js` & IndexedDB)** `[DARI KODE]`
   * *Why it's hero*: The heavy steel kiln shell blocks 100% of RF signals. Showing an interactive phone UI operating seamlessly offline, storing 3 queued mutations, and instantly re-syncing when signal returns creates a dramatic narrative contrast.
3. **Feature 3: 3-Stage Authenticated Photo Audit Pipeline (`#view-validations`)** `[DARI KODE]`
   * *Why it's hero*: Overhaul quality cannot be verified with text alone. Real industrial photos (*Before Tearing, During Bricking, After Key Jacking*) stamped with certified green approval seals provide tangible, physical reality.
4. **Feature 4: Strict Anti-Miskeying Form Guard (`#view-input`)** `[DARI KODE]`
   * *Why it's hero*: Directly solves the nightmare of spreadsheet formulas corrupted by typo inputs (`#REF!` syntax errors). Interactive input with instant validation badges brings immediate relief to engineers.
5. **Feature 5: 3D Data Flight & Instant Multi-Device Sync (SSE Engine)** `[DARI KODE]`
   * *Why it's hero*: Visually connects the field foreman's mobile device to the plant manager's desktop browser dashboard with a dynamic 3D flying data packet match-cut.

---

### 1.4 The "Aha Moment" Operational Flow
The definitive user journey that demonstrates Trunova's breakthrough value:
1. **The Dark Blind-Spot (Action)**: A foreman deep inside Kiln Shell Ring 32 (no 4G/Wi-Fi) opens Trunova on mobile.
2. **Instant Input (Interaction)**: He taps *"Pasang Bata Refraktori"*, slides to `+12.5 m`, snaps an inspection photo, and hits *"Save Progress"*.
3. **Local Safety (Micro-Reward)**: Instead of a frozen browser error, the app flashes *"Saved to Local IndexedDB — 3 Queued Mutations Safe"*.
4. **The Exit & Reconnection (Transformation)**: The foreman steps outside the kiln. The 4G signal reconnects. The status badge switches from Amber *"Offline Ready"* to Emerald *"Online"*.
5. **Instant Control Room Impact (The Climax)**: On the Plant Manager's desktop screen 500 meters away, the S-Curve trajectory dynamically recalculates upward from `85.6%` to `88.0%`, displaying `+2.4% Ahead of Schedule` with zero manual spreadsheet merging.

---

### 1.5 Brand Design Tokens from Codebase
Extracted from `landing.html` (lines 31–56) and `index.html` (lines 60–140):

* **Color Palette (Clean Modern & Light Aesthetic)** `[DARI KODE & USER PREFERENCE]`:
  - **Canvas Background**: `#FAF7F2` (Warm Titanium Paper Cream)
  - **Surface White**: `#FFFFFF` (Pure Card White)
  - **Surface Off-White**: `#F8FAFC` (Slate 50 Canvas Tint)
  - **Primary Brand Dark**: `#0F172A` (Deep Slate Navy — High Contrast Text & Badges)
  - **Brand Accent 1 (Precision Cobalt)**: `#2563EB` (Primary Links, Active Tabs, Telemetry)
  - **Brand Accent 2 (Flame Amber)**: `#F59E0B` (Kiln Fire Identity, Warnings, Highlights)
  - **Semantic Green (Verified Pass)**: `#10B981` (QC Approved, On-Schedule, Signal Restored)
  - **Semantic Red (Critical Alert)**: `#DC2626` (Spreadsheet Errors, Delays)
  - **Muted Text / Hairline Borders**: `#64748B` (Secondary Text), `#E2E8F0` (Borders)
* **Typography Hierarchy** `[DARI KODE]`:
  - **Display / Headlines**: `Plus Jakarta Sans` (Weights: 800 ExtraBold, 900 Black, tracking: -0.03em)
  - **UI & Body**: `Plus Jakarta Sans` / `Inter` (Weights: 500 Medium, 600 SemiBold, 700 Bold)
  - **Telemetry / Code / Data / Stamps**: `JetBrains Mono` (Weights: 600 SemiBold, 800 ExtraBold)
* **Border Radii** `[DARI KODE]`:
  - Micro tags: `6px` (`--r-sm`)
  - Inner cards / inputs: `10px` (`--r-md`)
  - Metric cards: `14px` (`--r-lg`)
  - Container / Mockup shells: `20px`–`24px` (`--r-xl`)
  - Pill badges & Buttons: `9999px` (`--r-full`)
* **Shadows & Elevation** `[DARI KODE]`:
  - Rest: `0 1px 3px rgba(15, 23, 42, 0.05), 0 0 0 1px rgba(226, 232, 240, 0.9)`
  - Elevated Card: `0 12px 30px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8)`
  - Amber Glow: `0 16px 36px rgba(245, 158, 11, 0.25)`

---

### 1.6 Available Vector, Video & Image Assets
Found in workspace root and `assets/` directory:

| Asset Category | File Path in Workspace | Status & Animation Optimization Note |
| :--- | :--- | :--- |
| **Real Kiln Video Footage** | `assets/hero-kiln.mp4` (16.8 MB) | Ready for Remotion `<Video>` or `<OffthreadVideo>` with slow cinematic zoom. `[DARI KODE]` |
| **Master Brand Vector** | `Picture1.svg` (Root, 42.4 KB) | Master original. Immutable source file. `[DARI KODE]` |
| **Main Wordmark Logo** | `assets/branding/trunova-logo-brand.svg` | SVG with clean paths for letter stagger and sunburst 'o' scale-in. `[DARI KODE]` |
| **Monogram Sub-Logo** | `assets/branding/tr-monogram.svg` | Geometric 'tr' ligature for corner watermarks. `[DARI KODE]` |
| **Sunburst Icon Mark** | `assets/branding/sunburst-icon-amber.svg` | 38 radial ray paths around center core for spinning loop. `[DARI KODE]` |
| **Supergraphic: Divider Rays** | `assets/branding/supergraphics/divider-rays.svg` | Sunburst rays for background rotation accent. `[DARI KODE]` |
| **Supergraphic: Texture Scatter** | `assets/branding/supergraphics/texture-scatter.svg` | Micro geometric grid dots for texture overlay. `[DARI KODE]` |
| **Supergraphic: Corner Brackets** | `assets/branding/supergraphics/card-corner-accent.svg` | Industrial HUD brackets for metric card corners. `[DARI KODE]` |
| **Supergraphic: Mobile Cover** | `assets/branding/supergraphics/mobile-cover-supergraphic.svg` | Frame backing for smartphone device mockup. `[DARI KODE]` |
| **Real Inspection Photo 1** | `assets/audit-before.jpg` | Stage 1: Before Tearing (Damaged Brick lining). `[DARI KODE]` |
| **Real Inspection Photo 2** | `assets/audit-during.jpg` | Stage 2: During Bricking (Hydraulic bricking rig). `[DARI KODE]` |
| **Real Inspection Photo 3** | `assets/audit-after.jpg` | Stage 3: After Key Jacking (Completed brick ring). `[DARI KODE]` |
| **Audio: Upbeat Tech BGM** | `video/public/audio/bgm-upbeat.wav` | 120 BPM energetic, confident tech soundtrack. `[DARI KODE]` |
| **Audio: Sound Effects (SFX)** | `video/public/audio/sfx-*.wav` | 6 cue files: whoosh, pop, click, chime, check, shutter. `[DARI KODE]` |

---

### 1.7 High-Resolution Application Screen Captures
Located in `/video/analysis/screens/` (13 Retina 2x PNG files verified):
* `desktop-01-dashboard.png` — Full executive telemetry view with KPI gauges. `[DARI KODE]`
* `desktop-02-scurve.png` — Dedicated S-Curve dashboard view with milestone charts. `[DARI KODE]`
* `desktop-03-validations.png` — 3-Stage QC inspection list with status filters. `[DARI KODE]`
* `desktop-04-input.png` — 4-Step progress input wizard form. `[DARI KODE]`
* `desktop-05-table.png` — Master IAC Jobdesk & sub-task breakdown matrix. `[DARI KODE]`
* `desktop-landing-hero.png` — Editorial landing page hero with cinematic media background. `[DARI KODE]`
* `mobile-01-input-progress.png` — Mobile PWA daily progress logging form. `[DARI KODE]`
* `mobile-02-offline-queue.png` — Mobile offline queue mutation sync drawer. `[DARI KODE]`
* `mobile-03-dashboard.png` — Mobile executive summary and milestone cards. `[DARI KODE]`
* `mobile-04-qc-audit.png` — Mobile camera upload slot for Before/During/After stages. `[DARI KODE]`
* `card-scurve.png`, `card-anti-miskeying.png`, `card-qc-audit-item.png` — Isolated UI components. `[DARI KODE]`

---

### 1.8 Realistic Industrial Test Data
Accurate technical values from cement rotary kiln overhaul engineering standards (No generic lorem ipsum) `[DARI KODE]`:
* **Project Designation**: `RK-04 Cement Kiln Major Overhaul (Tuban Plant)`
* **Active Kiln Section**: `KM 18.2 - KM 37.0 (Calcining & Burning Zone)`
* **Refractory Material**: `Basic Magnesite-Spinel Brick B20` & `Low-Cement Castable LC-60`
* **EVM Metrics**:
  - Target Planned Progress: `85.6%`
  - Actual Realized Progress: `88.0%`
  - Schedule Variance (SV): `+2.4% (Ahead of Schedule)`
  - Schedule Performance Index (SPI): `1.03 (Optimal Pace)`
  - Firing Countdown: `D-09 / 120H 00M 32S Remaining`
* **Queued Field Mutations**:
  - Item 1: `Pasang Bata Refraktori (+12.5 m) • 10:42:15`
  - Item 2: `Bongkar Bata Aus / Tearing (8.0 m) • 10:35:00`
  - Item 3: `Inspeksi Castable Cooler (Pass QC) • 10:20:44`

---

# Phase 2: Concept & Video Narrative

### 2.1 Two Creative Concepts & Strategic Recommendation

#### Concept 1: "Precision Under Pressure: The Overhaul Intelligence" (RECOMMENDED) `[USULAN]`
* **Visual Style**: Clean Modern & Light (`#FAF7F2` titanium cream canvas, `#0F172A` deep navy contrast, `#F59E0B` flame amber kinetic energy, Swiss editorial typography grid, subtle ambient grain).
* **Motion Character**: *Utilitarian High-End Precision*. Snappy physical springs, instant UI responsiveness, smooth camera depth zooms, and zero floaty drift.
* **Story Arc**:
  - *Hook*: Real video inside the suffocating steel kiln — total signal blackout.
  - *Conflict*: Spreadsheets fail under pressure (`#REF!` formula corruptions, late reports).
  - *The Breakthrough*: Trunova PWA keeps operating offline without missing a beat.
  - *The Connection*: Instant multi-device sync upon exit.
  - *Proof*: 3-stage photo inspection validation & live mathematical S-Curve.
  - *Climax & CTA*: Unstoppable confidence for plant leadership.
* **Why Recommended**: Matches enterprise B2B standards, highlights actual software capabilities, honors the user's aesthetic preference for a Clean Modern Light look, and perfectly fits the 60-second 120-BPM structure.

#### Concept 2: "From Steel Shell to Control Room: The Shift Story" `[USULAN]`
* **Visual Style**: Cinematic documentary contrast (dark industrial live footage transitioning to bright clean interface).
* **Motion Character**: Slower, editorial pans with character-driven perspective shifts.
* **Why Not Selected**: Less dynamic than Concept 1; spends too much time on narrative transition rather than showcasing the interface's power and data visualization engine.

---

### 2.2 60-Second Narrative Architecture & Duration Breakdown
**Target Duration**: Exactly 60.00 Seconds (1800 Frames @ 30 FPS, 120 BPM) `[USER DECISION]`  
**Aspect Ratio**: 16:9 Landscape (1920×1080) with 9:16 vertical safe area `[USER DECISION]`  

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ TOTAL TIMELINE: 60 SECONDS / 1800 FRAMES (30 FPS, 120 BPM = 15 FRAMES/BEAT)                  │
├─────────────────┬─────────────────┬─────────────────┬─────────────────┬────────────────────────┤
│ 00:00 - 00:08   │ 00:08 - 00:15   │ 00:15 - 00:24   │ 00:24 - 00:32   │ 00:32 - 00:41          │
│ Scene 1: Hook   │ Scene 2: Problem│ Scene 3: PWA    │ Scene 4: Sync   │ Scene 5: QC Audit      │
│ 240 Frames      │ 210 Frames      │ 270 Frames      │ 240 Frames      │ 270 Frames             │
├─────────────────┴─────────────────┼─────────────────┴─────────────────┼────────────────────────┤
│ 00:41 - 00:50                     │ 00:50 - 00:55                     │ 00:55 - 01:00          │
│ Scene 6: S-Curve Matrix           │ Scene 7: 3 Pillars Climax         │ Scene 8: Grand Finale  │
│ 270 Frames                        │ 150 Frames                        │ 150 Frames             │
└───────────────────────────────────┴───────────────────────────────────┴────────────────────────┘
```

* **Scene 1 (0:00 - 0:08 | Frames 0 - 240, 16 Beats)**: *Kiln Overhaul Reality & Total Signal Loss*  
  Real kiln video with industrial HUD telemetry. Kinetic snap cut to Flame Amber: `"INSIDE THE STEEL KILN. ZERO NETWORK SIGNAL."`
* **Scene 2 (0:08 - 0:15 | Frames 240 - 450, 14 Beats)**: *The Friction of Spreadsheets & Risky Slips*  
  3 floating 3D diagnostic cards: Formula `#REF!` corruption, reporting lag (+36 hrs), and downtime cost per hour.
* **Scene 3 (0:15 - 0:24 | Frames 450 - 720, 18 Beats)**: *The PWA Blind-Spot Engine in Action*  
  Interactive 3D phone glide. Foreman taps progress input; local IndexedDB instantly captures 3 queued mutations with offline badge.
* **Scene 4 (0:24 - 0:32 | Frames 720 - 960, 16 Beats)**: *Signal Restored & 3D Flight Match-Cut*  
  Network returns (Green 4G Online). Data packet launches in a parabolic 3D flight from mobile into desktop browser console without data loss.
* **Scene 5 (0:32 - 0:41 | Frames 960 - 1230, 18 Beats)**: *3-Stage Authenticated Photo Audit Pipeline*  
  Camera sweeps past 3 real inspection photos (*Before, During, After*) with camera shutter sound cues and green certified stamp seals.
* **Scene 6 (0:41 - 0:50 | Frames 1230 - 1500, 18 Beats)**: *Live S-Curve & EVM Trajectory Engine*  
  Smooth camera push-in to full-width vector S-Curve canvas. Dynamic glowing curve plots past planned baseline to `88% (+2.4% Ahead, SPI 1.03)`.
* **Scene 7 (0:50 - 0:55 | Frames 1500 - 1650, 10 Beats)**: *The 3 Core Pillars Climax (Rapid 3-Beat Cuts)*  
  Fast energetic cuts every 50 frames: Pillar 1 *"OFFLINE-FIRST PWA"*, Pillar 2 *"3-STAGE QC AUDIT"*, Pillar 3 *"PRECISE S-CURVE"*.
* **Scene 8 (0:55 - 01:00 | Frames 1650 - 1800, 10 Beats)**: *The Grand Finale & Call to Action*  
  Pull-back to blossoming Trunova brand mark with warm ambient sunburst, tagline *"Kiln Shutdown & Overhaul Intelligence"*, and pulsating CTA button.

---

### 2.3 English Headline & Copy Matrix (3 Alternatives)
All text in Full English `[USER DECISION]`:

| Scene & Message | Option A (Recommended - Precision Tech) `[USULAN]` | Option B (Direct Operational) `[USULAN]` | Option C (High-Impact Punchy) `[USULAN]` |
| :--- | :--- | :--- | :--- |
| **Scene 1: Hook** | *INSIDE THE STEEL KILN.<br/>ZERO NETWORK SIGNAL.* | *DEEP IN THE KILN BLIND SPOT.<br/>COMMUNICATION CUTS OFF.* | *HEAVY STEEL SHELL.<br/>SIGNAL DROPS TO ZERO.* |
| **Scene 2: Problem** | *LEGACY TOOLS RISK COSTLY SLIPS.<br/>Spreadsheet Errors & Reporting Lags.* | *SPREADSHEETS CRASH OVERHAULS.<br/>Corrupted Formulas & Blind Risks.* | *MANUAL CHAOS COSTS MILLIONS.<br/>Lost Data & Unseen Downtime.* |
| **Scene 3: Solution 1** | *WORK KEEPS MOVING.<br/>100% Operational in Blind Spots.* | *ZERO SIGNAL. ZERO DOWNTIME.<br/>Built for Offline Inspection.* | *SIGNAL LOST. PROGRESS SAVED.<br/>Full Offline Persistence.* |
| **Scene 4: Solution 2** | *SIGNAL RESTORED.<br/>Instant Multi-Device Synchronization.* | *BACK ONLINE.<br/>Zero Data Loss Guaranteed.* | *RECONNECTED.<br/>Real-Time Cloud Convergence.* |
| **Scene 5: Feature QC** | *AUTHENTICATED FIELD PROOF.<br/>Three-Stage Visual Inspection Audit.* | *CERTIFIED QUALITY CONTROL.<br/>Before, During, and After Verification.* | *PHOTO-VERIFIED ACCURACY.<br/>Zero Refractory Collapse Risk.* |
| **Scene 6: Feature S-Curve** | *REAL-TIME S-CURVE MATRIX.<br/>Predictive Firing On Schedule.* | *LIVE EARNED VALUE TRACKING.<br/>Instant Variance & SPI Detection.* | *PRECISION PROGRESS TRAJECTORY.<br/>Zero Overhaul Slip.* |
| **Scene 7: Pillars** | *OFFLINE PWA • 3-STAGE QC • REAL-TIME S-CURVE* | *OFFLINE READY • AUDIT PROOF • EVM PRECISION* | *FIELD FIRST • QUALITY LOCKED • ALWAYS ON SCHEDULE* |
| **Scene 8: Finale CTA** | *TRUNOVA<br/>Kiln Shutdown & Overhaul Intelligence<br/>Launch Trunova Today →* | *TRUNOVA<br/>Master Your Kiln Overhaul<br/>Explore the Command Platform →* | *TRUNOVA<br/>Zero Slippage Overhaul Control<br/>Get Started Now →* |

---

### 2.4 Musical Beat Grid (120 BPM / 15 Frames Per Beat)
Calculated using the `beat-sync-editing` skill framework:
* **Tempo**: $120\text{ BPM}$
* **Frames Per Beat**: $\frac{60}{\text{BPM}} \times \text{FPS} = \frac{60}{120} \times 30 = 15\text{ Frames / Beat}$
* **Frames Per Musical Bar (4 Beats)**: $15 \times 4 = 60\text{ Frames / Bar}$ (Exactly 2.0 seconds)

```
Beat 001 (Frame 000) : Scene 1 Starts (Kiln Video Ambient Intro)
Beat 008 (Frame 120) : IMPACT CUT — Solid Flame Amber Snap + "ZERO SIGNAL"
Beat 016 (Frame 240) : Scene 2 Starts (Problem Framing, Whoosh SFX)
Beat 020 (Frame 300) : Warning Card 1 Snaps into View (Pop SFX)
Beat 023 (Frame 345) : Warning Card 2 Snaps into View (Pop SFX)
Beat 026 (Frame 390) : Warning Card 3 Snaps into View (Pop SFX)
Beat 030 (Frame 450) : Scene 3 Starts (3D Mobile Glide In)
Beat 034 (Frame 510) : Finger Tap Progress Input (Click SFX)
Beat 038 (Frame 570) : Offline Queue Card Pops (Chime SFX)
Beat 048 (Frame 720) : Scene 4 Starts (Signal Restored, Green Badge Flash)
Beat 051 (Frame 765) : 3D Data Packet Launches into Flight (Whoosh SFX)
Beat 054 (Frame 810) : Packet Lands on Desktop Console (Check SFX)
Beat 064 (Frame 960) : Scene 5 Starts (QC Photo Audit Stage 1, Shutter SFX)
Beat 069 (Frame 1035): QC Photo Stage 2 Pops (Shutter + Check SFX)
Beat 074 (Frame 1110): QC Photo Stage 3 Pops & Stamp Slaps (Shutter + Check SFX)
Beat 082 (Frame 1230): Scene 6 Starts (S-Curve Canvas Push-In)
Beat 088 (Frame 1320): Glowing S-Curve Surges Past Planned Baseline
Beat 092 (Frame 1380): Counter Hits 88% + SV Pill "+2.4% Ahead" (Chime SFX)
Beat 100 (Frame 1500): Scene 7 Beat 1: Cream Snap "OFFLINE-FIRST PWA"
Beat 103 (Frame 1550): Scene 7 Beat 2: Amber Snap "3-STAGE QC AUDIT"
Beat 106 (Frame 1600): Scene 7 Beat 3: Cobalt Snap "PRECISE S-CURVE"
Beat 110 (Frame 1650): Scene 8 Grand Finale: Brand Mark Blooms (Chime SFX)
Beat 114 (Frame 1710): CTA Button "Launch Trunova Today →" Pulses (Pop SFX)
Beat 120 (Frame 1800): Video Concludes on Perfect Musical Loop End
```
