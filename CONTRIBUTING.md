# Panduan Kontribusi KSD Monitor (Contributing Guidelines)

Terima kasih atas minat Anda untuk berkontribusi pada pengembangan **KSD Monitor (Kiln Shutdown & Overhaul Management System)**. Proyek ini dibangun untuk menjaga keandalan operasional tingkat tinggi dalam pemeliharaan fasilitas industri berat rotary kiln semen.

---

## 🚨 Aturan Baku Invarian Brand & Keamanan Aset

Sebelum Anda melakukan perubahan apapun pada repositori ini, patuhi aturan mutlak berikut:

> [!CAUTION]
> ### DILARANG KERAS MENGUBAH `Picture1.svg`
> 1. **`Picture1.svg` adalah aset master grafis vektor asli yang bersifat *immutable***.
> 2. Anda **TIDAK BOLEH** mengedit, memformat, mengompresi, mengganti nama, menimpa, ataupun menghapus berkas `Picture1.svg` di root direktori.
> 3. Semua aset turunan (ikon aplikasi, favicon, web manifest, monogram) harus diekstraksi secara independen ke dalam direktori [`icons/`](file:///Users/haysan/Documents/KSD%20file/icons/) atau [`assets/branding/`](file:///Users/haysan/Documents/KSD%20file/assets/branding/) tanpa menyentuh berkas asli.
> 4. Pelanggaran terhadap aturan ini akan langsung membatalkan Pull Request (*automatic rejection*).

---

## 🛠️ Filosofi Arsitektur & Standar Kode

### 1. Zero Build Failure pada Client Frontend
- Antarmuka utama ([`index.html`](file:///Users/haysan/Documents/KSD%20file/index.html)) dan halaman pendaratan ([`landing.html`](file:///Users/haysan/Documents/KSD%20file/landing.html), [`launch.html`](file:///Users/haysan/Documents/KSD%20file/launch.html)) menggunakan **Vanilla JavaScript modern (ES6+)** dan **CSS Custom Properties (Design Tokens)**.
- **Jangan memperkenalkan bundler berat** (seperti Webpack/Vite bundler pada core SPA) yang dapat menyebabkan kegagalan build di komputer lapangan tanpa koneksi internet.
- Pastikan setiap perubahan pada file HTML di root juga dicerminkan (*mirrored*) ke dalam folder [`pb_public/`](file:///Users/haysan/Documents/KSD%20file/pb_public/) agar PocketBase lokal menyajikannya secara presisi.

### 2. Standar Mesin Video (Remotion)
- Kode sumber untuk grafis gerak dan video promosi terletak di folder [`video/`](file:///Users/haysan/Documents/KSD%20file/video/).
- Gunakan TypeScript dan React 18 dengan dependensi Remotion yang terdaftar di `video/package.json`.
- **Dilarang melakukan commit terhadap `video/node_modules/` atau `video/out/`**. Selalu pastikan aturan `.gitignore` tetap aktif.

### 3. Ekstensi Backend PocketBase (`pb_hooks/`)
- Gunakan JavaScript murni yang didukung oleh runtime PocketBase (dukungan ES5/ES6 via Goja engine).
- Selalu bungkus transaksi mutasi data sensitif (seperti kalkulasi Kurva-S atau approval gate) dalam blok `$app.dao().runInTransaction(...)`.
- Pastikan setiap endpoint kustom memvalidasi otorisasi peran pengguna (*Role-Based Access Control*).

---

## 🌿 Alur Kerja Git & Percabangan (Branching)

1. **Fork atau Buat Cabang Baru**:
   Gunakan format penamaan cabang semantik:
   - `feat/nama-fitur-baru`
   - `fix/nama-perbaikan-bug`
   - `docs/pembaruan-dokumentasi`
   - `perf/optimasi-performa`

2. **Format Pesan Commit (Conventional Commits)**:
   Ikuti konvensi pesan commit standar:
   - `feat(scurve): implement sigmoid trajectory forecast formula`
   - `fix(pwa): resolve offline sync mutation replay on reconnection`
   - `docs(api): update endpoint specification for /api/custom/export-full-backup`
   - `chore(repo): optimize asset compression and directory structure`

3. **Verifikasi Mandiri Sebelum Mengirim PR**:
   - [ ] Server PocketBase dapat dijalankan tanpa error via `./start_local.sh`.
   - [ ] Halaman SPA dapat dimuat saat offline (uji via Chrome DevTools > Application > Service Workers > Offline).
   - [ ] Tidak ada perubahan bytes pada `Picture1.svg`.
   - [ ] Tidak ada file log (`*.log`) atau berkas sementara database (`*.db-shm`, `*.db-wal`) yang masuk dalam staging git.
   - [ ] File di root telah disinkronkan ke `pb_public/`.

---

## 🤝 Pengajuan Pull Request (PR)

- Buka PR ke cabang `main`.
- Isi deskripsi PR menggunakan template yang disediakan di [`.github/PULL_REQUEST_TEMPLATE.md`](file:///Users/haysan/Documents/KSD%20file/.github/PULL_REQUEST_TEMPLATE.md).
- Jelaskan latar belakang masalah, ringkasan solusi teknis, dan langkah pengujian yang telah dilakukan.
