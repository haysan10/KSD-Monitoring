/**
 * ============================================================================
 * KSD MONITOR - GOOGLE APPS SCRIPT AUTOMATED DATABASE & PHOTO BACKUP ENGINE
 * Sistem Cadangan Otomatis Database PocketBase & Foto Dokumentasi ke Google Drive
 * ============================================================================
 * 
 * Penggunaan:
 * 1. Buka file Google Spreadsheet baru di Google Drive Anda.
 * 2. Klik menu "Extensions" (Ekstensi) -> "Apps Script".
 * 3. Hapus kode default dan tempelkan (paste) seluruh isi file ini.
 * 4. Klik "Save" (Simpan), lalu jalankan fungsi "backupKsdToSpreadsheet".
 * 5. (Opsional) Pasang Trigger Jam Alarm (⏰) agar berjalan otomatis per jam/hari.
 */

// 🌐 Konfigurasi URL KSD Monitor (Cloudflare Public URL / Domain Server)
const KSD_BASE_URL = "https://policies-back-noble-circuit.trycloudflare.com";

// 🔑 Kredensial Administrator KSD Monitor
const ADMIN_USERNAME = "admin@ksd.com";
const ADMIN_PASSWORD = "admin123";

// 📁 Nama Folder Google Drive untuk Menampung File Foto Dokumentasi
const DRIVE_PHOTO_FOLDER_NAME = "KSD_Dokumentasi_Foto_Backup";

/**
 * Fungsi Utama: Mencadangkan seluruh koleksi database dan foto ke Google Drive & Sheets
 */
function backupKsdToSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  Logger.log("⏳ Menghubungkan ke KSD Monitor PocketBase...");

  // ─── 1. Otentikasi & Ambil Token Sesi ────────────────────────────────────
  const loginRes = UrlFetchApp.fetch(KSD_BASE_URL + "/api/custom/login", {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    }),
    muteHttpExceptions: true
  });
  
  const loginData = JSON.parse(loginRes.getContentText());
  if (!loginData.success || !loginData.token) {
    Logger.log("❌ Gagal login: " + (loginData.error || "Periksa URL / Kredensial"));
    return;
  }
  
  Logger.log("✅ Berhasil login sebagai: " + loginData.name + " (" + loginData.role + ")");
  
  // ─── 2. Ambil Full Snapshot Database dari KSD Monitor ───────────────────
  const backupRes = UrlFetchApp.fetch(KSD_BASE_URL + "/api/custom/export-full-backup", {
    method: "POST",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer " + loginData.token
    },
    muteHttpExceptions: true
  });
  
  const backupJson = JSON.parse(backupRes.getContentText());
  if (!backupJson.success || !backupJson.backup) {
    Logger.log("❌ Gagal mengambil data backup: " + (backupJson.error || "Data kosong"));
    return;
  }
  
  const collections = backupJson.backup.collections;
  Logger.log("📥 Menerima snapshot database per: " + backupJson.backup.exportTimestamp);
  
  // ─── 3. Siapkan Folder Google Drive untuk File Foto Dokumentasi ──────────
  let photoFolder;
  try {
    const existing = DriveApp.getFoldersByName(DRIVE_PHOTO_FOLDER_NAME);
    photoFolder = existing.hasNext() ? existing.next() : DriveApp.createFolder(DRIVE_PHOTO_FOLDER_NAME);
    Logger.log("📁 Folder Google Drive siap: " + DRIVE_PHOTO_FOLDER_NAME);
  } catch (e) {
    Logger.log("⚠️ Drive folder notice: " + e.message);
  }

  // ─── 4. Ekstraksi & Penyimpanan Otomatis File Foto ke Google Drive ────────
  ["dailyProgress", "castable_records"].forEach(colName => {
    const list = collections[colName] || [];
    list.forEach(r => {
      const rawPhoto = r.photoUrl || r.photoBase64 || r.foto;
      if (rawPhoto && rawPhoto.startsWith("data:image") && photoFolder) {
        try {
          const parts = rawPhoto.split(",");
          const contentType = parts[0].split(":")[1].split(";")[0];
          const decodedBytes = Utilities.base64Decode(parts[1]);
          const fileName = "Foto_" + (r.date || "Log") + "_" + (r.subId || r.id || Date.now()) + ".jpg";
          
          // Simpan file fisik gambar ke Google Drive
          const file = photoFolder.createFile(Utilities.newBlob(decodedBytes, contentType, fileName));
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          
          r.link_drive_foto = file.getUrl();
          r.foto_dokumentasi = '=HYPERLINK("' + file.getUrl() + '", "📷 Buka Foto di Drive")';
          
          // Bersihkan data string Base64 yang sangat panjang agar spreadsheet tetap ringan
          delete r.photoUrl;
          delete r.photoBase64;
          delete r.foto;
        } catch (err) {
          r.link_drive_foto = "Gagal memproses foto: " + err.message;
        }
      }
    });
  });

  // ─── 5. Tulis Setiap Koleksi ke Tab Spreadsheet Masing-Masing ───────────
  const tableMapping = {
    "projects": "Proyek_KSD",
    "iacs": "Struktur_IAC",
    "subs": "Sub_Jobdesk",
    "dailyProgress": "Laporan_Harian",
    "validations": "Validasi_Progres",
    "materialLogs": "Log_Material",
    "manpowerLogs": "Log_Manpower",
    "pts": "Daftar_Kontraktor",
    "users": "Daftar_Pengguna",
    "castable_records": "Inspeksi_Castable",
    "notifications": "Notifikasi_Sistem"
  };
  
  for (const [colName, sheetName] of Object.entries(tableMapping)) {
    const records = collections[colName] || [];
    writeCollectionToSheet(ss, sheetName, records);
  }
  
  // ─── 6. Catat Riwayat Log Backup ─────────────────────────────────────────
  let logSheet = ss.getSheetByName("Riwayat_Backup");
  if (!logSheet) {
    logSheet = ss.insertSheet("Riwayat_Backup");
    logSheet.appendRow(["Waktu Backup", "Diekspor Oleh", "Peran", "Status", "Jumlah Koleksi"]);
    formatHeader(logSheet);
  }
  logSheet.appendRow([
    new Date(),
    backupJson.backup.exportedBy,
    backupJson.backup.role,
    "BERHASIL (OK)",
    Object.keys(collections).length
  ]);
  
  Logger.log("🎉 SELURUH DATABASE & FOTO DOKUMENTASI KSD BERHASIL DIBACKUP KE GOOGLE DRIVE & SPREADSHEET!");
}

/**
 * Helper: Menulis array of objects ke Sheet dengan auto-header & auto-format
 */
function writeCollectionToSheet(ss, sheetName, records) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  } else {
    sheet.clear();
  }
  
  if (!records || records.length === 0) {
    sheet.appendRow(["Belum ada data pada tabel ini"]);
    return;
  }
  
  const headers = Object.keys(records[0]);
  const rows = [headers];
  
  records.forEach(r => {
    const row = headers.map(h => {
      const val = r[h];
      if (typeof val === "object" && val !== null) return JSON.stringify(val);
      return val === undefined || val === null ? "" : val;
    });
    rows.push(row);
  });
  
  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
  formatHeader(sheet);
}

/**
 * Helper: Format Header Tabel agar Kontras & Elegan (Executive Navy Theme)
 */
function formatHeader(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange.setBackground("#0F172A");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, sheet.getLastColumn());
}
