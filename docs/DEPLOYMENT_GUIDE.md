# Panduan Deployment & Operasional Lapangan KSD Monitor

Dokumen ini memandu langkah demi langkah penerapan (*deployment*), konfigurasi jaringan, dan manajemen layanan **KSD Monitor** untuk berbagai skenario operasional pabrik semen: dari laptop teknisi lokal, jaringan Wi-Fi CCR, VPN privat antarkota, hingga domain publik aman via HTTPS.

---

## 📋 Prasyarat Sistem Minimum

| Komponen | Spesifikasi Minimum | Rekomendasi Lapangan |
| :--- | :--- | :--- |
| **Sistem Operasi** | macOS (x64/ARM), Linux (Ubuntu/Debian 20.04+), Windows (WSL2) | Linux Server (Ubuntu 22.04 LTS) atau MacBook Lapangan |
| **CPU** | 1 Core (1.5 GHz+) | 2 Core+ (Multi-threading PocketBase Go runtime) |
| **RAM** | 512 MB | 2 GB+ (Mendukung pembacaan gambar dan konkurensi PWA) |
| **Ruang Disk** | 200 MB bebas | 5 GB+ (Untuk arsip foto dokumentasi audit resolusi tinggi) |
| **Runtime External** | **Zero / Tanpa Perlu Runtime Tambahan** | PocketBase adalah binary Go mandiri terkompilasi |

---

## 🚀 Skenario 1: Menjalankan Server Lokal (Host Komputer)

Cara tercepat untuk memulai server pada laptop atau stasiun kerja di ruang kendali (*Central Control Room / CCR*):

### Menggunakan Skrip Cepat (macOS & Linux):
```bash
# 1. Pastikan berkas memiliki izin eksekusi:
chmod +x start_local.sh stop_local.sh pocketbase

# 2. Nyalakan server:
./start_local.sh
```

Terminal akan menampilkan pesan konfirmasi:
```text
🚀 Menjalankan KSD Monitor PocketBase server pada port 8090...
✅ KSD Monitor berhasil dijalankan! (PID: 34125)
--------------------------------------------------------
🌐 Web App URL        : http://127.0.0.1:8090
📊 Admin Dashboard    : http://127.0.0.1:8090/_/
📜 File Log           : pocketbase.log
--------------------------------------------------------
```

### Mematikan Server:
```bash
./stop_local.sh
```

---

## 📶 Skenario 2: Berbagi Akses via Wi-Fi Lokal Pabrik (LAN / Intranet)

Mandor dan teknisi di area pabrik dapat mengakses sistem dari smartphone atau tablet tanpa koneksi internet luar asalkan terhubung ke router Wi-Fi lokal yang sama.

1. **Jalankan Server dengan Binding ke Semua Alamat IP (`0.0.0.0`)**:
   ```bash
   ./pocketbase serve --http="0.0.0.0:8090"
   ```
2. **Cari Tahu Alamat IP Lokal Komputer Host**:
   - macOS: `ipconfig getifaddr en0` (contoh: `192.168.1.45`)
   - Linux: `hostname -I | awk '{print $1}'`
   - Windows (PowerShell): `Get-NetIPAddress -AddressFamily IPv4`
3. **Buka dari Smartphone Mandor**:
   Buka peramban (Chrome / Safari) di HP, lalu ketik:
   ```text
   http://192.168.1.45:8090/
   ```
4. **Instal PWA ke Layar Utama**:
   - Pada Chrome Android: Klik menu `⋮` &rarr; Pilih **"Install application"** atau **"Add to Home screen"**.
   - Pada Safari iOS: Klik tombol Share `📤` &rarr; Pilih **"Add to Home Screen"**.

---

## 🔒 Skenario 3: Akses Privat Antar-Kota via Tailscale Mesh VPN

Jika manajemen di kantor pusat ingin memantau Kurva-S real-time dari luar kota tanpa membuka port router (*zero port-forwarding*):

1. **Instal Tailscale** pada komputer host KSD Monitor dan perangkat pengawas:
   - Unduh dari: [tailscale.com/download](https://tailscale.com/download)
2. **Aktifkan Koneksi Tailscale**:
   ```bash
   tailscale up
   ```
3. **Dapatkan Alamat IP Tailscale Host**:
   ```bash
   tailscale ip -4
   # Output contoh: 100.99.188.113
   ```
4. **Akses dari Mana Saja**:
   Perangkat pengawas yang berada dalam jaringan Tailscale dapat mengakses sistem via:
   ```text
   http://100.99.188.113:8090/
   # atau menggunakan MagicDNS:
   http://ksd-monitor.tail76fff5.ts.net/
   ```

---

## 🌐 Skenario 4: Akses Publik Terenkripsi via Cloudflare Tunnel (HTTPS)

Menyediakan URL publik dengan sertifikat SSL/TLS otomatis tanpa perlu IP publik statis pabrik.

1. **Instal Cloudflared CLI**:
   - macOS: `brew install cloudflare/cloudflare/cloudflared`
   - Linux: `curl -fsSL https://pkg.cloudflare.com/cloudflared-ascii.repo | sudo tee /etc/yum.repos.d/cloudflared.repo`
2. **Jalankan Terowongan Cepat**:
   ```bash
   cloudflared tunnel --url http://localhost:8090
   ```
3. Terminal akan mencetak URL aman berakhiran `.trycloudflare.com`. Bagikan tautan tersebut kepada tim untuk akses global dari manapun.

---

## 🐧 Skenario 5: Pemasangan Server Produksi Linux Permanen (systemd)

Untuk server pabrik yang harus beroperasi 24/7 dan otomatis hidup kembali saat listrik menyala pasca *blackout*:

1. **Buat Berkas Service `systemd`**:
   ```bash
   sudo nano /etc/systemd/system/ksd-monitor.service
   ```
2. **Isikan Konfigurasi**:
   ```ini
   [Unit]
   Description=KSD Monitor - Kiln Shutdown Management Daemon
   After=network.target

   [Service]
   Type=simple
   User=ksdadmin
   WorkingDirectory=/opt/ksd-monitor
   ExecStart=/opt/ksd-monitor/pocketbase serve --http="0.0.0.0:8090"
   Restart=always
   RestartSec=5
   StandardOutput=append:/var/log/ksd-monitor.log
   StandardError=append:/var/log/ksd-monitor-error.log

   [Install]
   WantedBy=multi-user.target
   ```
3. **Aktifkan dan Jalankan Layanan**:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable ksd-monitor
   sudo systemctl start ksd-monitor
   sudo systemctl status ksd-monitor
   ```

---

## ☁️ Skenario 6: Konfigurasi Cloud Backup Otomatis ke Google Sheets

1. Buat Google Spreadsheet baru di Google Drive Anda.
2. Buka menu **Extensions** &rarr; **Apps Script**.
3. Salin seluruh isi berkas [`google_apps_script_backup.js`](file:///Users/haysan/Documents/KSD%20file/google_apps_script_backup.js).
4. Sesuaikan konstanta `KSD_BASE_URL`, `ADMIN_USERNAME`, dan `ADMIN_PASSWORD`.
5. Jalankan fungsi `backupKsdToSpreadsheet` sekali untuk menguji koneksi.
6. Buat Trigger (pemicu waktu) setiap 1 jam atau setiap pergantian shift kerja untuk mencadangkan seluruh data tabular ke 11 sheet dan foto dokumentasi ke folder Google Drive.
