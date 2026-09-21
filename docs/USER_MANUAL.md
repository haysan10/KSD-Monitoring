# Buku Panduan Operasional Pengguna (User Manual) — KSD Monitor

Panduan ini ditujukan bagi seluruh personil yang terlibat dalam kegiatan *major overhaul* dan *shutdown* kiln: Mandor Lapangan, Pengawas/Inspector Mutu, Project Coordinator, hingga Kiln Superintendent.

---

## 🎯 Peran Pengguna & Hak Akses (Roles)

1. **Mandor Kontraktor (Field Foreman)**:
   - Menginput progres harian sub-jobdesk yang ditugaskan.
   - Mengunggah foto dokumentasi pekerjaan (Before, During, After).
   - Melaporkan kendala teknis dan pemakaian material harian.
2. **Inspector QC & Pengawas Internal**:
   - Memeriksa antrean laporan progres (*Pending Validations*).
   - Menyetujui (*Approve*) atau Menolak (*Reject*) bukti foto audit mutu.
   - Menguji sampel castable (*Castable Quality Test*).
3. **Superintendent & Project Manager (Admin)**:
   - Memantau deviasi Kurva-S, Jalur Kritis (*Critical Path*), dan status KPI.
   - Mengunci target baseline jadwal (*Baseline Schedule Lock*).
   - Mencetak laporan resmi dan rekapitulasi SPK satu-klik.

---

## 📱 Modul 1: Panduan Mandor Lapangan (Entri Progres)

### 1. Membuka Halaman Lapor Progres (`#view-input-progress`)
- Klik tab navigasi **"Lapor Progres"** pada bilah menu atas atau bilah bawah smartphone.
- Pilih **Item Aktivitas Center (IAC)** dan **Sub-Jobdesk** yang sedang dikerjakan.

### 2. Menggunakan Slider Taktil Anti-Miskeying
- Gunakan slider persentase untuk menentukan capaian progres shift berjalan (0% s/d 100%).
- Sistem dilengkapi **Anti-Miskeying Guard**:
  - Angka tidak bisa melebihi 100%.
  - Peringatan instan akan muncul jika lonjakan progres dinilai tidak wajar (>30% dalam 1 shift tanpa catatan khusus).

### 3. Mengunggah Foto Bukti Kerja (Tactile Camera Dropzone)
- Klik area **"Ambil / Unggah Foto Bukti"** atau seret berkas gambar ke kotak dropzone.
- Kamera smartphone akan aktif secara otomatis.
- Pilih kategori tahap inspeksi:
  - `Before`: Kondisi awal sebelum pembongkaran.
  - `During`: Proses penyusunan bata / ring refraktori baru.
  - `After`: Hasil akhir penguncian cincin dengan jack hidrolik.
- Gambar otomatis dikompresi agar hemat kuota tanpa mengurangi detail ketajaman batu bata.

### 4. Bekerja di Dalam Silinder Kiln (Kondisi Offline)
- Bila Anda berada di dalam cangkang kiln dan tidak ada sinyal HP:
  - Tetap input data seperti biasa dan klik tombol **"Kirim Laporan Progres"**.
  - Aplikasi akan menampilkan badge **"Tersimpan di Antrean Offline (⏳)"**.
  - Begitu Anda keluar dari kiln dan ponsel kembali menerima sinyal Wi-Fi/4G, sistem secara otomatis menyinkronkan data ke server tanpa perlu input ulang.

---

## 🔍 Modul 2: Panduan Inspector Mutu (Persetujuan & Audit Foto)

### 1. Meninjau Antrean Validasi (`#view-validations`)
- Buka modul **"Persetujuan Mutu"**.
- Bilah atas menampilkan jumlah laporan yang menunggu verifikasi (*Pending Approval*).

### 2. Memeriksa Foto Resolusi Tinggi
- Klik thumbnail foto untuk membuka moda penampil resolusi penuh (*Lightroom Modal Viewer*).
- Periksa keselarasan aksial ring bata, ketebalan celah ekspansi, dan kerapian pelat penahan.

### 3. Otorisasi Persetujuan / Penolakan
- Jika hasil pekerjaan memenuhi standar:
  - Klik tombol hijau **"Setujui (Approve)"**. Progres langsung terkunci dan menambah akumulasi Kurva-S proyek secara real-time.
- Jika terdapat cacat pemasangan:
  - Klik tombol merah **"Tolak (Reject)"**.
  - Masukkan alasan teknis (contoh: *"Celah ekspansi ring #14 melebihi toleransi 2mm, wajib perbaikan sebelum penguncian"*). Mandor akan menerima notifikasi revisi secara instan.

---

## 📊 Modul 3: Panduan Superintendent & Manajer (Dashboard & Kurva-S)

### 1. Membaca HUD Telemetri Kurva-S (`#view-scurve`)
- **Garis Biru Solid**: Realisasi capaian aktual kumulatif tervalidasi.
- **Garis Emas Putus-putus**: Target rencana (*Baseline Plan Curve*).
- **Indikator Status**:
  - `Ahead of Schedule` (🟢): Realisasi lebih cepat dari rencana target.
  - `On Track` (🟡): Deviasi dalam toleransi normal ($\pm 2\%$).
  - `Critical Delay` (🔴): Deviasi $> -5\%$, memicu sorotan pada jalur kritis (*Critical Path*).

### 2. Menghitung Logistik Refraktori & Uji Castable (`#view-castable`)
- Buka modul **Kalkulator Refraktori**.
- Masukkan diameter dalam kiln ($D$), tebal bata ($T$), dan panjang bentang meter lari ($L$).
- Sistem secara otomatis menghitung:
  - Volume m³ refraktori terpasang.
  - Estimasi tonase kebutuhan material.
  - Jumlah zak semen tahan api / mortar yang diperlukan.

### 3. Ekspor Laporan Resmi 1-Klik (`#view-reports`)
- Buka modul **Pusat Laporan**.
- Pilih format output:
  - **PDF Executive Brief**: Resume 2 halaman untuk direksi dan rapat harian.
  - **Excel Full Audit Log**: Rekapitulasi lengkap seluruh transaksi dan foto untuk serah terima pekerjaan ke tim operasi pabrik.
- Klik **"Unduh Laporan"**; dokumen ter-generate secara instan tanpa jeda server.
