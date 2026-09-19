# Trunova — Brand Identity & Vector Asset Architecture

Dokumen spesifikasi identitas visual dan hierarki logo untuk **Trunova** (KSD Monitor).
Semua aset vektor diekstraksi langsung dari master file asli [`Picture1.svg`](../../Picture1.svg) tanpa mengubah satu byte pun dari file master tersebut.

---

## 🏛️ Hierarki Visual Trunova

```
┌─────────────────────────────────────────────────────────────┐
│ 1. MAIN LOGO: "trunova" (Wordmark Lengkap)                  │
│    Huruf 'o' diganti ikon sunburst 38-sinar.                │
│    Dipakai di: Header website, login portal, kop surat, dll │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. SUB LOGO / SEKUNDER: "tr" (Monogram)                     │
│    Ligatur huruf t dan r dengan alur geometris khas.         │
│    Dipakai di: Topbar ringkas, avatar, watermark, app icon  │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. FAVICON / ICON MARK: Sunburst (Ikon Matahari)            │
│    38 sinar radial presisi (ikon huruf 'o').                │
│    Dipakai di: Tab browser (16x16, 32x32), PWA launcher     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Peta File Aset (`assets/branding/` & `pb_public/`)

### 1. Main Logo — "trunova" (Wordmark Lengkap)
- [`assets/branding/trunova-logo.svg`](./trunova-logo.svg): Versi hitam murni (#000000) transparan.
- [`assets/branding/trunova-logo-white.svg`](./trunova-logo-white.svg): Versi putih murni (#FFFFFF) untuk latar gelap/navy.
- [`assets/branding/trunova-logo-brand.svg`](./trunova-logo-brand.svg): Versi warna primer brand (#0F172A).
- [`assets/branding/trunova-logo.png`](./trunova-logo.png): PNG resolusi tinggi (2000×460 px).

### 2. Sub Logo / Sekunder — "tr" (Monogram)
- [`assets/branding/tr-monogram.svg`](./tr-monogram.svg): Versi hitam murni (#000000).
- [`assets/branding/tr-monogram-white.svg`](./tr-monogram-white.svg): Versi putih murni (#FFFFFF).
- [`assets/branding/tr-monogram-appicon.svg`](./tr-monogram-appicon.svg): Monogram putih di atas badge rounded navy (#0F172A).
- [`assets/branding/tr-monogram.png`](./tr-monogram.png): PNG transparan (600×500 px).

### 3. Favicon & Icon Mark — Sunburst (Matahari)
- [`assets/branding/sunburst-icon.svg`](./sunburst-icon.svg): Vektor sunburst hitam transparan.
- [`assets/branding/sunburst-icon-white.svg`](./sunburst-icon-white.svg): Vektor sunburst putih.
- [`assets/branding/sunburst-icon-amber.svg`](./sunburst-icon-amber.svg): Vektor sunburst warna aksen api (*flame amber* `#F59E0B`).
- [`assets/branding/sunburst-favicon-badge.svg`](./sunburst-favicon-badge.svg): Badge favicon kotak sudut melengkung navy dengan sunburst amber.
- [`pb_public/icons/favicon.svg`](../../pb_public/icons/favicon.svg): Favicon utama web application SVG.
- [`pb_public/favicon.ico`](../../pb_public/favicon.ico): Multi-resolution Windows/browser icon (16×16, 32×32, 48×48 px).
- [`pb_public/icons/favicon-16x16.png`](../../pb_public/icons/favicon-16x16.png)
- [`pb_public/icons/favicon-32x32.png`](../../pb_public/icons/favicon-32x32.png)
- [`pb_public/icons/favicon-48x48.png`](../../pb_public/icons/favicon-48x48.png)
- [`pb_public/icons/apple-touch-icon.png`](../../pb_public/icons/apple-touch-icon.png) (180×180 px untuk iOS Home Screen)
- [`pb_public/icons/icon-192.png`](../../pb_public/icons/icon-192.png) (192×192 px PWA Android/Desktop)
- [`pb_public/icons/icon-512.png`](../../pb_public/icons/icon-512.png) (512×512 px PWA Splash Screen)

---

## 🔒 Master File Status
- **`Picture1.svg`** di root workspace adalah master source vector original yang **tidak boleh diedit/ditimpa/dihapus**.
