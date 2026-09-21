# Spesifikasi Teknis & Motion Design: Video Teaser Simulasi Layar Admin TRUNOVA

> **Tipe Dokumen**: Spesifikasi Motion Design & Blueprint Produksi Frame-by-Frame (Perencanaan Teaser Admin)  
> **Target Video**: Simulasi Rekaman Layar Admin (Screen-Recording Simulation Teaser)  
> **Master Format**: 16:9 Landscape (1920×1080) dengan Dual-Safe Area 9:16 Mobile Center (608px) `[USULAN]`  
> **Durasi Master**: 20.00 Detik (600 Frame @ 30 FPS) — Sinkronisasi Grid Audio 120 BPM (15 Frame/Beat) `[USULAN]`  
> **Output Path**: `/video/analysis/admin-teaser-spec.md`  
> **Status**: Tahap Perencanaan Selesai — Menunggu Persetujuan User Sebelum Pengodean Remotion  

---

## Daftar Isi
1. [Laporan Verifikasi Prasyarat & Lingkungan](#1-laporan-verifikasi-prasyarat--lingkungan)
2. [Tahap 1: Pemilihan Momen Hero Admin](#tahap-1-pemilihan-momen-hero-admin)
3. [Tahap 2: Struktur Naratif & Anggaran Frame Presisi](#tahap-2-struktur-naratif--anggaran-frame-presisi)
4. [Tahap 3: Implementasi Teknik Penasaran (Curiosity Hooks)](#tahap-3-implementasi-teknik-penasaran-curiosity-hooks)
5. [Tahap 4: Sistem Token Motion & Fisika Interaksi](#tahap-4-sistem-token-motion--fisika-interaksi)
6. [Tahap 5: Spesifikasi Rinci Frame-by-Frame Per Scene](#tahap-5-spesifikasi-rinci-frame-by-frame-per-scene)
   - 6.1 [Scene 1: PREPARE — Workspace Initialization & Telemetry Arming](#61-scene-1-prepare--workspace-initialization--telemetry-arming-frame-075)
   - 6.2 [Scene 2: CUPLIKAN 1 — Anti-Miskeying Safeguard & Progress Injection](#62-scene-2-cuplikan-1--anti-miskeying-safeguard--progress-injection-frame-75210)
   - 6.3 [Scene 3: CUPLIKAN 2 — Offline Blind-Spot Reconnect & Live S-Curve Surge](#63-scene-3-cuplikan-2--offline-blind-spot-reconnect--live-s-curve-surge-frame-210345)
   - 6.4 [Scene 4: CUPLIKAN 3 — 3-Stage QC Photo Audit Approval Stamp](#64-scene-4-cuplikan-3--3-stage-qc-photo-audit-approval-stamp-frame-345465)
   - 6.5 [Scene 5: CLIFFHANGER & CTA — Executive Overhaul Audit & Brand Reveal](#65-scene-5-cliffhanger--cta--executive-overhaul-audit--brand-reveal-frame-465600)
7. [Tahap 6: Analisis Risiko, Beban Render & Kebutuhan Aset](#tahap-6-analisis-risiko-beban-render--kebutuhan-aset)

---

## 1. Laporan Verifikasi Prasyarat & Lingkungan

Berdasarkan pemeriksaan fisik sistem dan repositori kode, seluruh dependensi dan lingkungan kerja diverifikasi sebagai berikut:

1. **Folder `/video` (Proyek Remotion)**:
   - **Status**: `TERSEDIA` (`/Users/haysan/Documents/KSD file/video`).
   - Struktur proyek Remotion telah terpasang lengkap dengan `remotion.config.ts`, `package.json`, `tsconfig.json`, dan aset `public/`.

2. **Pemeriksaan Paket Skill di `.agents/skills/` (Sesuai `skills-lock.json`)**:
   - `remotion-best-practices`: `TERPASANG` di `.agents/skills/remotion-best-practices/` (source: `remotion-dev/skills`).
   - `motion-design-skill`: `TERPASANG` sebagai folder `.agents/skills/motion-design/` (source: `LottieFiles/motion-design-skill`).
   - `gsap-skills`: `TERPASANG` sebagai rangkaian 8 modul independen (`gsap-core`, `gsap-frameworks`, `gsap-performance`, `gsap-plugins`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-utils` dari source `greensock/gsap-skills`).
   - `iart-ai`: `TERPASANG` sebagai 9 modul motion graphics dari source `iart-ai/motion-design-skills` (`remotion-video`, `beat-sync-editing`, `animation-principles`, `shot-composition`, `color-motion`, `logo-animation`, `motion-art-direction`, `motion-background`, `after-effects`).

3. **Ketersediaan Dokumen Analisis & Tangkapan Layar**:
   - Dokumen `/video/analysis/product-analysis.md`, `motion-spec.md`, dan `timeline.json` telah dibaca dan dijadikan referensi dasar.
   - Folder `/video/analysis/screens/` telah memiliki 13 tangkapan layar resolusi tinggi (2880×1800 px untuk desktop dan 1170×2532 px untuk mobile).

---

## Tahap 1: Pemilihan Momen Hero Admin

Dipilih 4 momen inti yang paling visual, memecahkan masalah operasional nyata, dan memicu rasa penasaran penonton terhadap Trunova:

### Momen 1: PREPARE — Workspace Initialization & Telemetry Arming
- **Aksi Admin**: Admin membuka sesi kerja Trunova, memuat proyek overhaul aktif (*Kiln #4 Major Overhaul*), dan mengaktifkan panel telemetri `[DARI KODE]`.
- **Hasil "Wow"**: Jendela kerja browser terbuka cepat, metrik overhaul langsung terisi secara elastis (S-Curve gauge, hitungan mundur firing, 0 crash), HUD telemetry beralih ke status hijau `[DARI KODE]`.
- **Alasan Bikin Penasaran**: Tidak ada proses loading kaku atau spreadsheet berat yang membeku. Penonton langsung disuguhi command-center industri modern dengan identitas visual solid `[USULAN]`.

### Momen 2: Anti-Miskeying Form Guard & 1-Click Progress Injection
- **Aksi Admin**: Admin membuka modul input progres lapangan (`#view-input`), menggeser slider volume pemasangan bata refraktori ke `+12.5 m`, dan menekan tombol simpan `[DARI KODE]`.
- **Hasil "Wow"**: Sistem secara instan mengunci formula: menghitung otomatis total tonase dan pcs bata (3.125 pcs), memvalidasi batas deviasi tanpa error `#REF!`, dan memunculkan badge validasi hijau berkilau `[DARI KODE]`.
- **Alasan Bikin Penasaran**: Menunjukkan bagaimana form interaktif pintar Trunova menghapus kesalahan fatal salah ketik (typo miskeying) yang kerap merusak kalkulasi spreadsheet Excel manual `[USULAN]`.

### Momen 3: Blind-Spot Reconnection & Live S-Curve Trajectory Surge
- **Aksi Admin**: Admin menerima sinkronisasi data dari inspector lapangan yang baru saja keluar dari dalam cangkang kiln baja (blind-spot) `[DARI KODE]`.
- **Hasil "Wow"**: Badge koneksi berubah dari *"3 Mutasi Tersimpan Offline"* menjadi *"Sinkronisasi Berhasil"*. Secara bersamaan, kurva S-Curve pada layar desktop langsung tumbuh dinamis ke atas dari `84.2%` ke `88.0%`, dan Schedule Variance berubah instan menjadi `+2.4% Ahead of Schedule` `[DARI KODE]`.
- **Alasan Bikin Penasaran**: Menampilkan penyelesaian masalah terbesar pabrik semen: hilangnya sinyal di dalam pipa kiln baja tebal. Penonton penasaran bagaimana data lapangan bisa masuk otomatis tanpa operator menginput ulang di kantor `[USULAN]`.

### Momen 4: 3-Stage Authenticated QC Inspection Gate
- **Aksi Admin**: Admin menginspeksi kartu validasi kualitas pemasangan bata (`#view-validations`) yang memuat foto 3-tahap (*Stage 1: Before Tearing, Stage 2: During Bricking, Stage 3: After Key Jacking*) lalu menekan tombol *"Setujui Validasi"* `[DARI KODE]`.
- **Hasil "Wow"**: Stempel hijau haptik *"AUTHENTICATED & QC PASSED"* menghantam slot foto ketiga dengan pantulan spring fisik, mengunci integritas overhaul secara permanen `[DARI KODE]`.
- **Alasan Bikin Penasaran**: Memberikan rasa kepuasan visual dan kepastian mutu teknis yang tidak bisa didapatkan pada chat WhatsApp atau tabel Excel `[USULAN]`.

### Momen 5 (Cliffhanger): Executive Audit Generation & Instant Cut
- **Aksi Admin**: Admin menekan tombol *"Ekspor Executive Audit & Prediksi Firing"* `[DARI KODE]`.
- **Hasil "Wow"**: Progress bar komputasi melesat cepat ke 99%... namun layar langsung dipotong sepersekian detik sebelum laporan terbuka penuh `[USULAN]`.
- **Alasan Bikin Penasaran (Open Loop)**: Penonton dibiarkan bertanya-tanya tentang detail prediksi penyalaan kiln, mengarahkan mereka untuk segera mencoba aplikasi di `trunova.id` `[USULAN]`.

---

## Tahap 2: Struktur Naratif & Anggaran Frame Presisi

Target durasi: **20.00 Detik** = **600 Frame** pada **30 FPS**.  
Tempo musik acuan: **120 BPM** (1 Beat = 15 Frame, 1 Bar = 60 Frame / 2.0 Detik).

| Scene | ID Scene | Narasi & Fokus Utama | Rentang Detik | Rentang Frame | Durasi Frame | Ketukan Musik |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| **01** | `scene_01_prepare` | **PREPARE**: Boot Aplikasi & Kesiapan Layar Admin | 0.00s – 2.50s | Frame 000 – 075 | 75 frame | 5 beats |
| **02** | `scene_02_miskeying` | **CUPLIKAN 1**: Slider Taktil & Anti-Miskeying Guard | 2.50s – 7.00s | Frame 075 – 210 | 135 frame | 9 beats |
| **03** | `scene_03_scurve_sync`| **CUPLIKAN 2**: Sinyal Pulih & S-Curve Meroket Live | 7.00s – 11.50s | Frame 210 – 345 | 135 frame | 9 beats |
| **04** | `scene_04_qc_audit` | **CUPLIKAN 3**: Audit 3-Tahap & Stempel Lolos QC | 11.50s – 15.50s | Frame 345 – 465 | 120 frame | 8 beats |
| **05** | `scene_05_cliffhanger`| **CLIFFHANGER + CTA**: Laporan Siap & Reveal Brand | 15.50s – 20.00s | Frame 465 – 600 | 135 frame | 9 beats |
| **TOTAL**| — | **Presisi 20.00 Detik Penuh** | **0.00s – 20.00s** | **Frame 000 – 600** | **600 frame** | **40 beats** |

*Catatan Tumpang Tindih Transisi*: Transisi whip-pan dan cross-zoom antar scene dirancang sepanjang 8 frame (misal Frame 067–075 untuk transisi S1 ke S2) dengan menjaga momentum gerak elemen penghubung sehingga tidak ada frame mati.

---

## Tahap 3: Implementasi Teknik Penasaran (Curiosity Hooks)

1. **Open Loop (Dipakai di Scene 05 - Frame 465–510)**:
   - Admin memicu *"Kalkulasi Prediksi Firing & Export Audit"*. Progress bar melesat hingga 99%, modal jendela mulai mengembang ke arah kamera, lalu *WHIP CUT* tepat pada Frame 510 ke kartu penutup brand Trunova sebelum halaman laporan terbuka sempurna.

2. **Kompresi Waktu (Time Compression) (Dipakai di Scene 03 - Frame 230–280)**:
   - Data inspeksi fisik berhari-hari disinkronkan hanya dalam 15 frame (0.5 detik). Kurva Planned vs Actual EVM yang rumit ter-generate secara kinetik dari titik kilometer 0 hingga kilometer 45 dalam waktu kurang dari 1 detik.

3. **Angka Hidup / Living Numbers (Dipakai di Scene 02, 03, dan 04)**:
   - Counter volume progres bata berputar cepat dari `0.0 m` ke `+12.5 m` (Scene 2).
   - Metrik progress S-Curve melonjak elastis dari `84.2%` ke `88.0%`, diiringi perubahan status deviasi jadwal `+2.4% Ahead` (Scene 3).

4. **Reveal Parsial & Depth of Field (Dipakai di Scene 02 dan Scene 04)**:
   - Saat kursor admin mengarahkan perhatian pada field input atau slot foto QC ke-3, bagian latar belakang dashboard di-blur halus (`filter: blur(8px)`) dan di-dim (`opacity: 0.35`), memaksa mata penonton tertuju pada elemen interaktif.

5. **Satu Klik, Banyak Perubahan Serentak (Dipakai di Scene 03 - Frame 255)**:
   - Begitu tombol sync terpicu, 4 elemen bereaksi simultan dalam 6 frame: badge koneksi berubah hijau emerald, kurva S-Curve melesat, baris tabel jobdesk tercentang hijau, dan widget notifikasi muncul di pojok kanan atas.

6. **Teks Overlay Singkat & Tegas (Maksimal 3-5 Kata)**:
   - Scene 1: *"KENDALI OVERHAUL TOTAL."*
   - Scene 2: *"ANTI SALAH KETIK."*
   - Scene 3: *"S-CURVE OTOMATIS REAL-TIME."*
   - Scene 4: *"VALIDASI FISIK 3-TAHAP."*
   - Scene 5: *"STOP RABA-RABA. COBA SEKARANG."*

7. **Desain Ramah Tontonan Tanpa Suara (Sound-Off Friendly)**:
   - Teks overlay menggunakan kontras tinggi dengan badge latar rounded navy (`#0F172A`), ditempatkan pada Safe Area tengah sehingga 100% terbaca jelas di layar smartphone.
   - Semua respons UI diperkuat dengan efek visual (ripple, pop-in, highlight glow) sehingga penonton memahami hasil aksi admin meski tanpa mendengar efek suara klik.

---

## Tahap 4: Sistem Token Motion & Fisika Interaksi

### 4.1 Skala Durasi Interaksi
- `DUR_MICRO`: 3 frame (100 ms) — Hover state, penekanan tombol (active push), ripple wave.
- `DUR_POP`: 8 frame (266 ms) — Kemunculan badge validasi, stamp seal, tooltip.
- `DUR_SLIDE`: 15 frame (500 ms) — Pergerakan kursor melengkung antar target, pergeseran slider.
- `DUR_CAM`: 24 frame (800 ms) — Gerakan kamera virtual push-in / pull-out.
- `DUR_HOLD`: 24–30 frame (800–1000 ms) — Jeda istirahat visual agar penonton sempat membaca angka hasil.

### 4.2 Kurva Easing Standar (Cubic-Bezier)
- `EASE_DECEL`: `cubic-bezier(0.16, 1.0, 0.30, 1.0)` — Kecepatan awal tinggi, deselerasi sangat halus mendekati target (untuk kursor dan panel UI).
- `EASE_ACCEL`: `cubic-bezier(0.70, 0.0, 0.84, 0.0)` — Akselerasi keluar untuk transisi keluar layar.
- `EASE_SMOOTH`: `cubic-bezier(0.65, 0.0, 0.35, 1.0)` — Gerak kamera panning dan zoom in-out berkesinambungan.

### 4.3 Konfigurasi Fisika Remotion `spring()`
- **Pegas Taktil / Rigid (`SPRING_RIGID`)**:
  `{ damping: 24, stiffness: 220, mass: 1.0 }`  
  *Karakter*: Tegas, minim pantulan (< 3%), presisi tinggi untuk panel industri dan chart frame.
- **Pegas Enerjik / Pop (`SPRING_POP`)**:
  `{ damping: 13, stiffness: 190, mass: 0.8 }`  
  *Karakter*: Memiliki recoil pantulan elastis (12-15%), digunakan untuk stempel QC, notifikasi badge, dan kursor click ripple.

### 4.4 Aturan Kursor & Perilaku Manusia (Humanized Cursor Physics)
- **Aset Kursor**: Vektor SVG macOS Precision Pointer putih dengan border navy tipis (`#0F172A`) dan bayangan lembut. Titik hotspot terletak presisi di koordinat `(0, 0)` ujung panah.
- **Badge Nama Admin**: Pill mini menempel pada sudut kanan bawah kursor `[Admin • Dani R.]` dengan font JetBrains Mono 10px warna `#0F172A` di atas latar putih transparan 90%.
- **Lintasan Bezier Melengkung**: Kursor tidak pernah bergerak lurus linier. Lintasan selalu memiliki busur lengkung halus dengan titik kontrol kuadratik/kubik.
- **Jeda Pra-Klik (Pre-Click Hover Hold)**: Kursor berhenti stabil selama 4–6 frame di atas elemen target sebelum menekan tombol.
- **State Tekan (Click Down)**: Pada frame klik, scale kursor mengkerut ke `0.90x`, tombol UI mengalami depresi `translateY(2px)` dan scale `0.97x`, disertai ekspansi ring ripple tipis dengan opasitas `0.4 -> 0.0`.
- **Micro-Hesitation**: Sebelum memilih opsi penting, kursor mengalami deviasi kecil (2–4 pixel) meniru keraguan sepersekian detik operator manusia.

### 4.5 Tipografi & Safe Area Komposisi
- **Viewport**: 1920 × 1080 px (16:9).
- **Dual-Safe Center (9:16 Vertical)**: Lebar tengah 608 px dijamin bebas dari teks pinggir yang terpotong di TikTok / Instagram Reels / YouTube Shorts.
- **Font Stack `[DARI KODE]`**:
  - Judul & UI Brand: `Plus Jakarta Sans` (Weight 700, 800, 900).
  - Data Teknis, Angka & Telemetri: `JetBrains Mono` (Weight 600, 700, 800).
- **Ukuran Teks Overlay**:
  - H1 Overlay: `56px – 64px`, letter-spacing `-0.03em`, drop-shadow pekat.
  - Subtitle Tag: `16px – 18px`, huruf kapital tebal berjarak tracking `+0.1em`.

---

## Tahap 5: Spesifikasi Rinci Frame-by-Frame Per Scene

### 6.1 Scene 1: PREPARE — Workspace Initialization & Telemetry Arming (Frame 0–75)
- **Durasi**: 2.50 Detik (Frame 000 – Frame 075)
- **Tujuan Naratif**: Menampilkan kecepatan pembukaan command center Trunova, menyiapkan sesi kerja admin, dan membangun impresi profesional dalam 30 frame pertama.
- **Teks Overlay**: *"KENDALI OVERHAUL TOTAL."* (Muncul Frame 15, Exit Frame 68).

#### Tabel Spesifikasi Elemen Scene 1
| Elemen | Properti | Frame Mulai | Frame Selesai | Nilai Awal → Akhir | Easing / Spring | Catatan |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Backdrop Grid** | Opacity | 0 | 20 | `0.0` → `1.0` | `EASE_DECEL` | Subtle industrial dot-grid `#E2E8F0` pada canvas `#FAF7F2` |
| **Window Frame** | Scale & Y | 0 | 25 | `scale: 0.94, y: 40px` → `1.0, 0px` | `SPRING_RIGID` | Jendela browser macOS Trunova terangkat ke tengah layar |
| **Topbar Status** | Opacity & X | 12 | 28 | `opacity: 0, x: -20px` → `1.0, 0px` | `EASE_DECEL` | Badge *"KILN #4 MAJOR OVERHAUL - DAY 04"* terbit |
| **Kursor Admin** | X, Y Pos | 10 | 42 | `(960, 900)` → `(680, 240)` | Bezier Arc + `EASE_DECEL` | Bergerak cepat dari bawah ke menu *"Dashboard Telemetri"* |
| **Kursor Admin** | Scale (Click) | 44 | 48 | `1.0` → `0.90` → `1.0` | `SPRING_POP` | Klik aktif pada tombol load data dashboard |
| **Metric Cards** | Stagger Y | 46 | 65 | `y: 30px, opacity: 0` → `0px, 1.0` | `SPRING_POP` (stagger 3f) | 4 card telemetri muncul bertahap |
| **Kamera Virtual** | Zoom (Scale) | 0 | 75 | `1.0` → `1.05` | `EASE_SMOOTH` | Kamera push-in perlahan memusatkan fokus ke area data |

*Cue Audio*:
- Frame 0: Audio BGM Intro kick beat dimulai (120 BPM).
- Frame 44: SFX `mouse-click.wav` (Volume 0.7).
- Frame 48: SFX `card-swoosh-pop.wav` beruntun saat widget angka terbuka.

---

### 6.2 Scene 2: CUPLIKAN 1 — Anti-Miskeying Safeguard & Progress Injection (Frame 75–210)
- **Durasi**: 4.50 Detik (Frame 075 – Frame 210)
- **Tujuan Naratif**: Menyorot keunggulan form pintar Trunova yang mencegah salah input angka pada pekerjaan pemasangan bata refraktori.
- **Teks Overlay**: *"ANTI SALAH KETIK."* (Muncul Frame 090, Exit Frame 195).

#### Tabel Spesifikasi Elemen Scene 2
| Elemen | Properti | Frame Mulai | Frame Selesai | Nilai Awal → Akhir | Easing / Spring | Catatan |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Kamera Virtual** | Focus Point & Zoom | 75 | 105 | `Zoom: 1.05, Center` → `Zoom: 1.35, Focus Input Card` | `EASE_SMOOTH` | Push-in dramatis ke panel Form Input Ring 32 |
| **Background UI** | Blur & Dim | 85 | 110 | `blur: 0px, opacity: 1.0` → `blur: 6px, opacity: 0.4` | `EASE_DECEL` | Mengaburkan elemen luar agar perhatian terpusat |
| **Kursor Admin** | X, Y Pos | 85 | 120 | `(680, 240)` → `(840, 560)` | Bezier Arc + Hesitation | Mengarah ke handle slider meter progres |
| **Slider Handle** | X Pos & Value | 126 | 155 | `0.0 m` → `+12.5 m` | `EASE_DECEL` | Slider ditarik ke kanan, track berwarna oranye api `#F59E0B` |
| **Counter Tonase**| Number Ticker | 126 | 160 | `0 Ton (0 Pcs)` → `15.6 Ton (3.125 Pcs)` | Linear Ticker | Kalkulasi formula refraktori berjalan instan tanpa jeda |
| **Kursor Admin** | X, Y Pos | 162 | 180 | `(840, 560)` → `(1050, 720)` | `EASE_DECEL` | Kursor bergeser ke tombol *"Simpan Progres"* |
| **Tombol Simpan** | Click & Depress | 182 | 186 | `scale: 1.0` → `0.96` → `1.0` | `SPRING_POP` | Klik eksekusi simpan |
| **Validation Tag** | Scale & Glow | 188 | 205 | `scale: 0.0, glow: 0px` → `1.0, glow: 12px` | `SPRING_POP` | Badge hijau *"FORMULA SECURED • 0 MISKEYING"* pop-in |

*Cue Audio*:
- Frame 126–155: SFX `haptic-tick-sweep.wav` (suara ratchet gesekan saat slider ditarik).
- Frame 182: SFX `mouse-click.wav`.
- Frame 188: SFX `success-ding-crystal.wav` (Volume 0.8) saat validasi sukses.

---

### 6.3 Scene 3: CUPLIKAN 2 — Offline Blind-Spot Reconnect & Live S-Curve Surge (Frame 210–345)
- **Durasi**: 4.50 Detik (Frame 210 – Frame 345)
- **Tujuan Naratif**: Menampilkan momen "Aha!" ketika data dari pekerja di dalam pipa kiln baja (offline) tersinkronisasi otomatis dan kurva S-Curve melesat naik di layar admin.
- **Teks Overlay**: *"S-CURVE OTOMATIS REAL-TIME."* (Muncul Frame 225, Exit Frame 335).

#### Tabel Spesifikasi Elemen Scene 3
| Elemen | Properti | Frame Mulai | Frame Selesai | Nilai Awal → Akhir | Easing / Spring | Catatan |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Transisi Scene** | Camera Pan & Reset | 210 | 225 | `Zoom: 1.35, Pan Right` → `Zoom: 1.20, Focus Chart` | `EASE_SMOOTH` | Kamera bergeser mulus ke arah grafik S-Curve |
| **Sync Pill** | Background & Icon | 218 | 235 | `Amber (#F59E0B) 3 Queued` → `Emerald (#10B981) Synced` | `SPRING_POP` | Badge mutasi offline berubah status menjadi tersinkron |
| **S-Curve Line** | SVG Path Stroke | 235 | 275 | `strokeDashoffset: 100%` → `0%` | `cubic-bezier(0.2, 0.9, 0.3, 1)` | Garis Actual EVM tumbuh dinamis melintasi kurva Planned |
| **EVM Metric** | Number Counter | 240 | 280 | `84.2%` → `88.0%` | `EASE_DECEL` | Angka persentase akumulatif overhaul berputar naik |
| **Variance Tag** | Scale & Color | 270 | 290 | `scale: 0.8, -1.2% Slip` → `1.1, +2.4% Ahead` | `SPRING_POP` | Badge varians jadwal melonjak dengan aksen hijau neon |
| **Kursor Admin** | Hover & Tooltip | 285 | 320 | `(1050, 720)` → `(980, 480)` | Bezier Arc | Kursor melayang di atas titik koordinat kurva |
| **Chart Tooltip** | Opacity & Scale | 300 | 315 | `opacity: 0, scale: 0.8` → `1.0, 1.0` | `SPRING_POP` | Tooltip HUD memunculkan detail *"Ring 32 Completed Ahead"* |

*Cue Audio*:
- Frame 218: SFX `synced-chime.wav`.
- Frame 235–275: SFX `riser-whoosh-tone.wav` (pitch naik seiring pertumbuhan garis kurva S-Curve).
- Frame 270: Beat drop drum musik pada beat ke-18.

---

### 6.4 Scene 4: CUPLIKAN 3 — 3-Stage QC Photo Audit Approval Stamp (Frame 345–465)
- **Durasi**: 4.00 Detik (Frame 345 – Frame 465)
- **Tujuan Naratif**: Menunjukkan kepastian inspeksi visual overhaul dengan stempel persetujuan haptik pada dokumentasi foto 3 tahap.
- **Teks Overlay**: *"VALIDASI FISIK 3-TAHAP."* (Muncul Frame 360, Exit Frame 455).

#### Tabel Spesifikasi Elemen Scene 4
| Elemen | Properti | Frame Mulai | Frame Selesai | Nilai Awal → Akhir | Easing / Spring | Catatan |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Kamera Virtual** | Camera Push & Focus | 345 | 370 | `Zoom: 1.20` → `Zoom: 1.30, Focus QC Matrix` | `EASE_SMOOTH` | Kamera mengunci 3 slot kartu foto inspeksi |
| **Slot 1 (Before)** | Border & Stamp | 355 | 370 | `Border: Slate` → `Border: Emerald, Opacity: 1` | `EASE_DECEL` | Foto pembongkaran lama (Before Tearing) sudah bercentang |
| **Slot 2 (During)** | Border & Stamp | 365 | 380 | `Border: Slate` → `Border: Emerald, Opacity: 1` | `EASE_DECEL` | Foto pemasangan (During Bricking) sudah terverifikasi |
| **Slot 3 (After)** | Highlight Pulse | 375 | 400 | `boxShadow: 0px` → `16px Amber Glow` | Ping-Pong 12f | Foto penguncian (After Key Jacking) menunggu approval |
| **Kursor Admin** | X, Y Pos | 380 | 412 | `(980, 480)` → `(1240, 540)` | Bezier Curve | Kursor bergerak mantap menuju tombol *"Approve Stage 3"* |
| **Tombol Approve**| Scale & Active | 414 | 418 | `scale: 1.0` → `0.92` → `1.0` | `SPRING_POP` | Klik persetujuan admin |
| **QC Stamp Seal** | Scale & Rotation | 420 | 438 | `scale: 2.5, rot: -25deg` → `scale: 1.0, rot: -8deg` | `SPRING_POP` (Heavy Recoil) | Stempel hijau *"AUTHENTICATED & SEALED"* menghantam kartu |
| **Impact Ripple** | Scale & Opacity | 422 | 440 | `scale: 0.8, op: 0.6` → `scale: 1.6, op: 0.0` | `EASE_DECEL` | Gelombang kejut haptik terpancar dari stempel |

*Cue Audio*:
- Frame 414: SFX `mouse-click.wav`.
- Frame 420: SFX `heavy-stamp-thud.wav` (suara dentuman berat dan mantap saat stempel menempel).

---

### 6.5 Scene 5: CLIFFHANGER & CTA — Executive Overhaul Audit & Brand Reveal (Frame 465–600)
- **Durasi**: 4.50 Detik (Frame 465 – Frame 600)
- **Tujuan Naratif**: Menghadirkan open-loop penasaran melalui aksi ekspor dokumen eksekutif yang terpotong tepat sebelum selesai, lalu ditutup dengan penegasan brand Trunova dan ajakan bertindak (CTA).
- **Teks Overlay**:
  - Bagian Cliffhanger (Frame 475–510): *"PREDIKSI PENYALAAN KILN..."*
  - Bagian Reveal Brand & CTA (Frame 520–600): *"SATU DASHBOARD. TANPA MELESET."*

#### Tabel Spesifikasi Elemen Scene 5
| Elemen | Properti | Frame Mulai | Frame Selesai | Nilai Awal → Akhir | Easing / Spring | Catatan |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Kursor Admin** | X, Y Pos | 468 | 490 | `(1240, 540)` → `(960, 320)` | Fast Whip | Kursor bergerak ke tombol *"Generate Overhaul Audit"* |
| **Export Button** | Click Down | 492 | 496 | `scale: 1.0` → `0.94` | `SPRING_POP` | Klik pemicu laporan |
| **Modal Audit** | Scale & Opacity | 496 | 509 | `scale: 0.8, op: 0` → `scale: 1.05, op: 1` | `EASE_ACCEL` | Dialog laporan mulai mekar ke depan kamera |
| **Progress 99%** | Value Bar | 496 | 509 | `0%` → `99%` | `EASE_ACCEL` | Bar progress melesat kencang... |
| **WHIP CUT** | Flash Opacity | 510 | 512 | `opacity: 0.0` → `1.0` (White Flash) | Instant Cut | **CLIFFHANGER CUT**: Layar dipotong tepat sebelum isi laporan tampil! |
| **Brand Backdrop**| Background Fill | 512 | 600 | Solid `#0F172A` (Slate Navy Pekat) | Static | Latar belakang premium gelap beralih untuk kontras tinggi |
| **Sunburst Mark** | Scale & Rotation | 515 | 545 | `scale: 0.3, rot: -45deg` → `scale: 1.0, rot: 0deg` | `SPRING_POP` | 38-sinar ikon matahari Trunova mekar dengan warna emas api `#F59E0B` |
| **Logo Wordmark** | Opacity & Y | 530 | 555 | `opacity: 0, y: 20px` → `1.0, 0px` | `EASE_DECEL` | Tulisan *"trunova"* putih bersih terkunci di tengah |
| **Tagline Teks** | Stagger Character | 545 | 570 | `opacity: 0, letterSpacing: 0.2em` → `1.0, 0.05em` | `EASE_DECEL` | *"Satu Dashboard. Tanpa Meleset."* |
| **CTA Button** | Scale & Pulse | 555 | 580 | `scale: 0.8, opacity: 0` → `1.0, 1.0` | `SPRING_POP` | Pill button oranye *"Coba Trunova Sekarang • trunova.id"* |
| **Hold Frame** | Freeze | 570 | 600 | Static Hold (30 frame penuh) | — | Frame penutup ditahan diam tanpa distraksi agar terbaca jelas |

*Cue Audio*:
- Frame 492: SFX `mouse-click.wav`.
- Frame 496–509: SFX `digital-processing-glitch.wav`.
- Frame 510: SFX `impact-whoosh-cinematic.wav` saat transisi potong tajam.
- Frame 515: Chime nada korporat hangat (Trunova Audio Sonic Logo).
- Frame 570–600: Musik fade out secara halus menuju keheningan.

---

## Tahap 6: Analisis Risiko, Beban Render & Kebutuhan Aset

### 6.1 Checklist Aset Produksi
Seluruh aset yang dibutuhkan telah siap atau akan diintegrasikan ke path `/video/public/`:

| Nama Aset | Tipe | Path Sumber Proyek | Target Path Remotion | Status Kesiapan |
| :--- | :--- | :--- | :--- | :--- |
| **Logo Trunova White** | SVG | `/assets/branding/trunova-logo-white.svg` | `/video/public/branding/trunova-logo-white.svg` | `Tersedia` |
| **Sunburst Icon Amber**| SVG | `/assets/branding/sunburst-icon-amber.svg` | `/video/public/branding/sunburst-icon-amber.svg` | `Tersedia` |
| **Precision Cursor** | SVG | Built-in React Component | Komponen statis Remotion | `Akan Dibangun` |
| **Screen Dashboard** | PNG | `/video/analysis/screens/desktop-01-dashboard.png` | `/video/public/screens/desktop-01-dashboard.png`| `Tersedia (2880×1800)` |
| **Screen S-Curve** | PNG | `/video/analysis/screens/desktop-02-scurve.png` | `/video/public/screens/desktop-02-scurve.png` | `Tersedia (2880×1800)` |
| **Screen Validations** | PNG | `/video/analysis/screens/desktop-03-validations.png` | `/video/public/screens/desktop-03-validations.png`| `Tersedia (2880×1800)` |
| **Screen Input Form** | PNG | `/video/analysis/screens/desktop-04-input.png` | `/video/public/screens/desktop-04-input.png` | `Tersedia (2880×1800)` |
| **Foto QC Before** | PNG | `/assets/audit-before.png` | `/video/public/assets/audit-before.png` | `Tersedia` |
| **Foto QC During** | PNG | `/assets/audit-during.png` | `/video/public/assets/audit-during.png` | `Tersedia` |
| **Foto QC After** | PNG | `/assets/audit-after.png` | `/video/public/assets/audit-after.png` | `Tersedia` |

### 6.2 Penyesuaian Vektor SVG Agar Siap Dianimasikan
1. **Sunburst Icon**: File SVG asli memiliki 38 path sinar radial. Untuk animasi putaran mekar di Scene 5, path sinar dikelompokkan dalam satu tag `<g>` dengan titik tumpu transformasi (`transform-origin: 50% 50%`) agar dapat diputar tanpa distorsi titik koordinat.
2. **Precision Cursor**: Kursor dibuat menggunakan path vektor murni dengan koordinat `viewBox="0 0 24 24"` dan titik hotspot `(0, 0)` agar posisi ujung panah tepat menyentuh titik klik tombol pada resolusi apa pun.

### 6.3 Analisis Efek Berisiko Berat & Alternatif Ringan
1. **Motion Blur Berkecepatan Tinggi**:
   - *Risiko*: Menggunakan filter SVG konvolusi atau canvas render multi-pass di Remotion memperlambat render hingga 400%.
   - *Solusi Ringan*: Terapkan `filter: blur(N px)` berbasis CSS standar yang diinterpolasi hanya pada 3-5 frame saat transisi whip-cut.
2. **S-Curve Dynamic Drawing**:
   - *Risiko*: Re-render canvas Chart.js dinamis di setiap frame Remotion dapat menyebabkan lag frame dropping.
   - *Solusi Ringan*: Bangun kurva S-Curve sebagai elemen SVG native `<path>` dengan manipulasi `strokeDasharray` dan `strokeDashoffset` yang dipetakan langsung ke `useCurrentFrame()`. Ini menghasilkan kurva tajam 4K dengan waktu render secepat kilat.
3. **Film Grain & Vignette**:
   - *Risiko*: Grain animasi berbasis noise shader WebGL memperberat encoding Chromium.
   - *Solusi Ringan*: Gunakan gambar pola noise PNG 128×128 berulang (tiled texture) dengan opasitas `3%` dan mode `mix-blend-mode: overlay`.

---

## 7. Kesimpulan & Status Siap Produksi

Dokumen spesifikasi ini telah mendefinisikan secara tuntas:
- Anggaran waktu frame matematis (600 frame @ 30 FPS).
- Koreografi kursor realistis dengan akselerasi kurva Bezier dan jeda haptik.
- Momen hero visual nyata yang digali langsung dari arsitektur teknis Trunova tanpa klaim fiktif.
- Rekayasa open-loop yang mengundang rasa penasaran profesional industri.

Tahap selanjutnya adalah menunggu konfirmasi persetujuan pengguna sebelum memulai pembuatan komponen Remotion di `/video/src/`.
