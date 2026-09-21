# KSD Monitor / TRUNOVA — Showcase Media & Motion Assets

Direktori ini berisi materi presentasi sinematik, video teaser peluncuran, dan aset media gerak (*motion graphics*) untuk KSD Monitor (TRUNOVA Kiln Shutdown & Overhaul Intelligence).

---

## 🎬 Koleksi Video & Media

### 1. Teaser Peluncuran Horizontal (Landscape 16:9)
- **Lokasi**: [`showcase/teaser-landscape/brag.mp4`](file:///Users/haysan/Documents/KSD%20file/showcase/teaser-landscape/brag.mp4)
- **Thumbnail Poster**: [`showcase/teaser-landscape/brag.jpg`](file:///Users/haysan/Documents/KSD%20file/showcase/teaser-landscape/brag.jpg)
- **Resolusi**: 1920 × 1080 (Landscape)
- **Durasi**: ~20 detik
- **Deskripsi**: Teaser sinematik bertempo cepat yang menyoroti masalah pelaporan manual di spreadsheet, sistem audit foto 3-tahap, dan komputasi Kurva-S real-time.
- **Salinan Narasi**: Tersedia di [`showcase/teaser-landscape/share-copy.txt`](file:///Users/haysan/Documents/KSD%20file/showcase/teaser-landscape/share-copy.txt).

### 2. Teaser Peluncuran Vertikal (Portrait 9:16)
- **Lokasi**: [`showcase/teaser-vertical/brag.mp4`](file:///Users/haysan/Documents/KSD%20file/showcase/teaser-vertical/brag.mp4)
- **Thumbnail Poster**: [`showcase/teaser-vertical/brag.jpg`](file:///Users/haysan/Documents/KSD%20file/showcase/teaser-vertical/brag.jpg)
- **Resolusi**: 1080 × 1920 (Vertical / Reels / Shorts / Stories)
- **Durasi**: ~20 detik
- **Deskripsi**: Teaser format vertikal dengan fokus pada pengalaman pengguna mobile smartphone, offline PWA, dan pengetikan anti-miskeying langsung dari dalam silinder kiln.
- **Salinan Narasi**: Tersedia di [`showcase/teaser-vertical/share-copy.txt`](file:///Users/haysan/Documents/KSD%20file/showcase/teaser-vertical/share-copy.txt).

---

## 🎥 Mesin Grafis Gerak Terprogram (Remotion Engine)

Direktori [`video/`](file:///Users/haysan/Documents/KSD%20file/video/) memuat implementasi *code-driven video composition* menggunakan React dan [Remotion](https://www.remotion.dev/).

### Komposisi yang Tersedia di `video/src/compositions/`:
- **`TrunovaLaunch16x9`**: Video peluncuran sinematik penuh 60 detik lanskap.
- **`TrunovaLaunch9x16`**: Video peluncuran sinematik penuh 60 detik potret.
- **`TrunovaAdminTeaserDesktop`**: Teaser desktop showcase 20 detik berfokus pada dasbor interaktif.
- **`TrunovaDesktopToMobileTransition`**: Transisi responsif dari konsol desktop ke aplikasi smartphone PWA di lapangan.

### Cara Menjalankan & Merender Video:
```bash
cd video

# Menjalankan live preview di browser:
npm run preview

# Render video teaser desktop:
npm run render:teaser

# Render video peluncuran 16:9:
npm run render:16x9

# Render video peluncuran 9:16:
npm run render:9x16
```
