# KSD Monitor — Kiln Shutdown & Overhaul Management System

Sistem manajemen, pemantauan progres, logistik, dan kalkulasi refraktori kiln shutdown berbasis **PocketBase**, **Vanilla JavaScript/CSS**, dan **Progressive Web App (PWA)**.

---

## 🚀 Fitur Utama

- **Pemantauan Progres Real-Time & Kurva-S (S-Curve)**: Visualisasi bobot rencana (*planned*) vs aktual (*actual*) dengan indikator deviasi dan status deviasi dinamis.
- **Validasi Progres Harian & Dokumentasi Foto**: Validasi input lapangan terintegrasi bukti visual foto pekerjaan.
- **Logistik Material & Tenaga Kerja (Manpower)**: Pencatatan kuantitas material masuk/terpakai serta pencatatan jam kerja dan alokasi kontraktor harian.
- **Kalkulator Refraktori Castable**: Perhitungan otomatis volume, kebutuhan berat material castable & insulating, dimensi ketebalan, serta densitas dan faktor waste.
- **Mesin Validasi Formulir Ketat (*Strict Typing Engine*)**: 
  - Kolom angka secara ketat memblokir huruf (termasuk karakter bawaan seperti `e`, `E`, `+`, `-`), intersep keyboard `keydown`, dan filter clipboard `paste`.
  - Kolom nama personil memblokir angka `0-9`.
  - Kolom entitas (Vendor, Kontraktor, Proyek) memvalidasi data agar tidak diisi angka murni.
  - Peringatan visual interaktif dengan animasi getar (*shake animation*) dan pesan panduan.
- **Antarmuka Minimalis & Ergonomis (*Industrial Minimalist UI*)**:
  - Desain bersih dan tenang, bebas dari ikon dekoratif berlebihan.
  - Hanya mempertahankan ikon esensial fungsional untuk interaksi langsung.
  - Dukungan tema ganda (*Dark Mode* & *Light Mode*).
  - Tampilan responsif mobile dengan bottom navigation bar dan drawer minimalis.
- **PWA v2.8 (Offline Capable)**:
  - Layanan Service Worker berstrategi *Network-First* untuk pembaruan instan dan ketersediaan offline.
  - Dukungan instalasi langsung ke layar utama (*Add to Home Screen*) pada smartphone dan tablet.

---

## 🌐 Cara Akses dari Perangkat Lain (HP, Tablet, Laptop)

### 1. Jalur Wi-Fi / Jaringan Lokal (Tanpa Perlu Install Tailscale)
Jika perangkat Anda terhubung ke jaringan Wi-Fi / LAN yang sama dengan komputer host:
- **URL Akses**:
  ```text
  http://192.168.1.5:8090/
  ```

### 2. Jalur Tailscale (Jarak Jauh / Data Seluler / Luar Jaringan)
Jika berada di luar jaringan lokal, pastikan aplikasi Tailscale di HP/perangkat lain telah diinstal, login dengan akun yang sama (`haysan1010@`), dan VPN dalam kondisi **Connected**:
- **Tailscale IP (Port Default)**: `http://100.99.188.113/`
- **Tailscale IP (Port 8090)**: `http://100.99.188.113:8090/`
- **Tailscale MagicDNS**: `http://ksd-monitor.tail76fff5.ts.net/`

---

## 💻 Menjalankan Sistem Secara Lokal

1. **Jalankan PocketBase Backend**:
   ```bash
   ./pocketbase serve --http=0.0.0.0:8090
   ```
2. **Akses Dashboard**:
   Buka browser di `http://localhost:8090/` atau `http://127.0.0.1:8090/`.
3. **Akses Panel Admin PocketBase**:
   Buka `http://localhost:8090/_/` untuk manajemen skema database dan koleksi.

---

## 🛠️ Arsitektur Teknologi

- **Backend**: [PocketBase](https://pocketbase.io/) (Go / SQLite tersemat)
- **Frontend**: Vanilla HTML5, Modern Vanilla CSS (CSS Variables, Flexbox/Grid), Vanilla JavaScript (ES6+)
- **Charts & Visualisasi**: Chart.js
- **Icons**: Lucide Icons (Minimalis fungsional)
- **Networking**: Tailscale Serve daemon