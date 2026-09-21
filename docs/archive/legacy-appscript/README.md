# Arsip Prototipe Awal (Legacy Google Apps Script & Gudang Kiln)

Direktori ini menyimpan snapshot historis dari prototipe awal sistem pemantauan overhaul dan gudang kiln berbasis Google Apps Script sebelum dimigrasikan ke arsitektur modern berbasis PocketBase (Go + SQLite) dan Single Page Application (SPA).

## Berkas Tersimpan:
1. **`code.gs.txt`**:
   - Kode skrip Google Apps Script awal (`code.gs`) yang mengelola pembacaan sheet, logika validasi, dan rendering HTML service.
2. **`index.html.txt`**:
   - Template tampilan HTML/CSS monolitik untuk antarmuka "Gudang Kiln | Inventory System" yang dijalankan via Google Apps Script Web App.

## Catatan:
Berkas di direktori ini disimpan semata-mata untuk rekam jejak historis (*historical preservation*) dan audit komparasi algoritma. Sistem aktif KSD Monitor kini sepenuhnya menggunakan:
- SPA modern: [`index.html`](file:///Users/haysan/Documents/KSD%20file/index.html)
- PocketBase Hooks: [`pb_hooks/routes.pb.js`](file:///Users/haysan/Documents/KSD%20file/pb_hooks/routes.pb.js)
- Pipa cadangan mandiri: [`code.gs`](file:///Users/haysan/Documents/KSD%20file/code.gs) dan [`google_apps_script_backup.js`](file:///Users/haysan/Documents/KSD%20file/google_apps_script_backup.js)
