/**
* ╔══════════════════════════════════════════════════════════════════╗
* ║ GUDANG KILN — INVENTORY MANAGEMENT SYSTEM ║
* ║ Backend Server (Google Apps Script) ║
* ║ Version: 8.0 FINAL ║
* ║ Author: Sandy @ VisualLab ║
* ║ Last Updated: 2026-02-26 ║
* ╚══════════════════════════════════════════════════════════════════╝
*
* CHANGELOG v8.0 (dari v7.5):
* 📨 NEW: Telegram notifikasi SETIAP mutasi — detail per item
* 📊 NEW: Laporan harian otomatis setiap jam 07:00 WIB
* 📎 NEW: Laporan stok semua gudang dikirim sebagai file CSV via Telegram
* 🔔 NEW: sendDailyStockReport() — dipanggil oleh Time-based Trigger
* 🔔 NEW: setupDailyTrigger() — helper setup trigger otomatis
* 🔔 NEW: removeDailyTrigger() — helper hapus trigger
* ✨ KEEP: logStokSnapshot() — point-in-time tracking
* 🐛 KEEP: getMutasiHistory() — fix nama kosong & paginasi
* 🐛 KEEP: submitTransaction() — fix tanggal mutasi
*
* STRUKTUR SHEET:
* ===============
* 1. database — Master Data Barang
* 2. mutasi — Transaction Log (16 kolom)
* 3. audit — Adjustment Log
* 4. stok_snapshot — Point-in-Time Inventory
*
* SETUP TRIGGER HARIAN:
* =====================
* Setelah deploy, jalankan fungsi setupDailyTrigger() SATU KALI
* dari Apps Script Editor → Run → setupDailyTrigger
* Trigger akan menjalankan sendDailyStockReport() setiap hari jam 07:00 WIB
*/

// ═══════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

const SS_ID = '1laPXicp0nNYUHDCts0IOLec7Caa16k3YzNwlTziRNgI';
const DB_SHEET = 'database';
const DEFAULT_PIN = '100700';
const TIMEZONE = 'Asia/Jakarta';

// ═══════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

/**
* Creates a header-to-index mapping for fast column lookup
*/
function getHeaderMap(sheet) {
const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
return headers.reduce((acc, h, i) => {
const key = h.toString().toLowerCase().trim().replace(/ /g, '_');
acc[key] = i;
return acc;
}, {});
}

/**
* Parses HTML date input (YYYY-MM-DD) to JavaScript Date object
*/
function parseHtmlDate_(s) {
if (!s || s === '') return '';
if (Object.prototype.toString.call(s) === '[object Date]') return s;
s = String(s).trim();
const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
if (!m) return '';
return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/**
* Formats Date object to human-readable string
*/
function formatDate_(val, includeTime = false) {
if (!val) return '';
const d = val instanceof Date ? val : new Date(val);
if (isNaN(d.getTime())) return String(val);
const format = includeTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
return Utilities.formatDate(d, TIMEZONE, format);
}

/**
* Format angka dengan pemisah ribuan (misal: 1000 → "1.000")
*/
function fmtNum(n) {
return Number(n || 0).toLocaleString('id-ID');
}

/**
* Escape karakter khusus Telegram Markdown v1
*/
function escapeTg(str) {
return String(str || '')
.replace(/\*/g, '\\*')
.replace(/_/g, '\\_');
}

// ═══════════════════════════════════════════════════════════════════
// WEB APP & API ENTRY POINTS (KSD MONITOR INTEGRATION)
// ═══════════════════════════════════════════════════════════════════

/**
 * Helper pembuat respons JSON untuk integrasi API eksternal
 */
function createJsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * HTTP GET Entry Point
 * 1. Menangani request API dari KSD Monitor (?action=get_stock&category=Angkur,Castable)
 * 2. Merender Web App UI Gudang Kiln jika diakses via browser secara langsung
 */
function doGet(e) {
  // ── 1. API GET Handler dari KSD Monitor ────────────────────────────
  if (e && e.parameter && e.parameter.action) {
    const action = String(e.parameter.action).trim().toLowerCase();
    if (action === 'get_stock') {
      return handleApiGetStock_(e.parameter);
    }
  }

  // ── 2. Render Tampilan Web App Bawaan ──────────────────────────────
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Gudang Kiln — Inventory System')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, ' +
      'user-scalable=no, viewport-fit=cover');
}

/**
 * Handler HTTP GET untuk mengambil sisa stok fisik (Live Stock)
 * Digunakan oleh Modul 08 KSD Monitor saat memilih item Angkur / Castable
 */
function handleApiGetStock_(params) {
  try {
    ensureSheets();
    const ss = SpreadsheetApp.openById(SS_ID);
    const sheet = ss.getSheetByName(DB_SHEET);
    if (!sheet) {
      return createJsonResponse_({
        success: false,
        error: 'Sheet database "' + DB_SHEET + '" tidak ditemukan.'
      });
    }

    const data = sheet.getDataRange().getValues();
    const hMap = getHeaderMap(sheet);

    // Filter kategori jika parameter disertakan (contoh: "Angkur,Castable")
    let targetCats = [];
    if (params.category) {
      targetCats = String(params.category)
        .split(',')
        .map(c => c.trim().toLowerCase())
        .filter(Boolean);
    }

    const items = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const code = String(row[hMap.code_barang] || '').trim();
      if (!code) continue;

      const cat = String(row[hMap.kategori_barang] || '').trim();
      const catLower = cat.toLowerCase();

      if (targetCats.length > 0) {
        const matches = targetCats.some(tc => catLower.indexOf(tc) !== -1);
        if (!matches) continue;
      }

      items.push({
        code: code,
        name: String(row[hMap.nama_barang] || '').trim(),
        category: cat,
        stock: Number(row[hMap.stok_awal]) || 0,
        unit: String(row[hMap.satuan_barang] || '').trim(),
        minStock: Number(row[hMap.min_stok]) || 0,
        gudang: String(row[hMap.gudang] || '').trim()
      });
    }

    return createJsonResponse_({
      success: true,
      timestamp: new Date().toISOString(),
      count: items.length,
      data: items
    });
  } catch (err) {
    return createJsonResponse_({
      success: false,
      error: 'Gagal mengambil data stok Gudang Kiln: ' + err.toString()
    });
  }
}

/**
 * HTTP POST Entry Point
 * Menerima mutasi pemakaian dari KSD Monitor (tipe 'OUT')
 * Memotong sisa stok fisik di Google Sheet & memicu notifikasi Telegram
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse_({
        success: false,
        error: 'Payload POST kosong atau format tidak didukung.'
      });
    }

    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse_({
        success: false,
        error: 'Format payload bukan JSON valid: ' + parseErr.message
      });
    }

    const actionType = String(payload.type || payload.action || 'OUT').toUpperCase();
    const nik = String(payload.nik || payload.user || payload.reportedBy || 'KSD_CONTRACTOR').trim();
    const section = String(payload.section || 'KSD Monitor - Kiln Overhaul').trim();
    const note = String(payload.note || payload.remarks || 'Pemotongan stok otomatis dari KSD Monitor').trim();
    const dateStr = payload.tanggal_pengambilan_barang || formatDate_(new Date());

    let rawItems = [];
    if (Array.isArray(payload.items) && payload.items.length > 0) {
      rawItems = payload.items;
    } else if (payload.code || payload.materialCode || payload.itemCode) {
      rawItems = [{
        code: payload.code || payload.materialCode || payload.itemCode,
        qty: Number(payload.qty || payload.qtyConsumed || payload.quantity) || 0
      }];
    } else {
      return createJsonResponse_({
        success: false,
        error: 'Item barang mutasi tidak ditemukan dalam payload.'
      });
    }

    // Resolusi gudang barang
    let targetGudang = String(payload.gudang || '').trim();
    if (!targetGudang) {
      const ss = SpreadsheetApp.openById(SS_ID);
      const dbSheet = ss.getSheetByName(DB_SHEET);
      if (dbSheet) {
        const dbData = dbSheet.getDataRange().getValues();
        const hMap = getHeaderMap(dbSheet);
        const searchCode = String(rawItems[0].code).trim();
        for (let i = 1; i < dbData.length; i++) {
          if (String(dbData[i][hMap.code_barang]).trim() === searchCode) {
            targetGudang = String(dbData[i][hMap.gudang] || '').trim();
            break;
          }
        }
      }
    }
    if (!targetGudang) targetGudang = 'Gudang Utama';

    // Bentuk payload transaksi standar yang diterima submitTransaction()
    const txPayload = {
      type: actionType,
      nik: nik,
      section: section,
      gudang: targetGudang,
      note: note,
      tanggal_pengambilan_barang: dateStr,
      tanggal_penerimaan_barang: dateStr,
      items: rawItems.map(it => ({
        code: String(it.code || it.itemCode || it.materialCode).trim(),
        qty: Number(it.qty || it.qtyConsumed || it.quantity) || 0
      }))
    };

    // Jalankan submitTransaction (mengupdate sheet, mencatat mutasi, dan memicu notifikasi Telegram)
    const result = submitTransaction(txPayload);

    return createJsonResponse_({
      success: true,
      message: result.message || 'Mutasi berhasil diproses di Gudang Kiln.',
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    return createJsonResponse_({
      success: false,
      error: 'Gagal memproses mutasi stok: ' + err.toString()
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// INITIALIZATION & METADATA
// ═══════════════════════════════════════════════════════════════════

function getInitialData() {
try {
ensureSheets();
const ss = SpreadsheetApp.openById(SS_ID);
const dbSheet = ss.getSheetByName(DB_SHEET);
const data = dbSheet.getDataRange().getValues();
const hMap = getHeaderMap(dbSheet);

const gudangSet = new Set();
const kategoriSet = new Set();

data.slice(1).forEach(r => {
if (r[hMap.gudang]) gudangSet.add(String(r[hMap.gudang]).trim());
if (r[hMap.kategori_barang]) kategoriSet.add(String(r[hMap.kategori_barang]).trim());
});

const props = PropertiesService.getScriptProperties();

return {
success: true,
data: {
gudang: [...gudangSet].sort(),
kategori: [...kategoriSet].sort(),
sections: [
'Finish Mill', 'Kiln', 'Coal Mill',
'Raw Mill', 'CCP'
],
telegramEnabled: props.getProperty('TELEGRAM_ENABLED') === 'true'
}
};
} catch (err) {
return { success: false, message: 'Gagal inisialisasi: ' + err.toString() };
}
}

// ═══════════════════════════════════════════════════════════════════
// STOCK DATA QUERIES
// ═══════════════════════════════════════════════════════════════════

function getStockData() {
try {
const ss = SpreadsheetApp.openById(SS_ID);
const sheet = ss.getSheetByName(DB_SHEET);
const data = sheet.getDataRange().getValues();
const hMap = getHeaderMap(sheet);

const list = data.slice(1)
.filter(r => r[hMap.code_barang])
.map(r => ({
no: r[hMap.no] || '',
kategori_barang: r[hMap.kategori_barang] || '',
code_barang: String(r[hMap.code_barang]).trim(),
nama_barang: r[hMap.nama_barang] || '',
satuan_barang: r[hMap.satuan_barang] || '',
stok_awal: Number(r[hMap.stok_awal]) || 0,
min_stok: Number(r[hMap.min_stok]) || 0,
gudang: r[hMap.gudang] || ''
}));

return {
success: true,
list: list,
lastUpdated: formatDate_(new Date(), true).split(' ')[1]
};
} catch (err) {
return { success: false, message: err.toString() };
}
}

// ═══════════════════════════════════════════════════════════════════
// STOCK SNAPSHOT LOGGING
// ═══════════════════════════════════════════════════════════════════

function logStokSnapshot(code, gudang, newStok, triggeredBy, notes) {
try {
const ss = SpreadsheetApp.openById(SS_ID);
let snapSheet = ss.getSheetByName('stok_snapshot');

if (!snapSheet) {
snapSheet = ss.insertSheet('stok_snapshot');
const headers = [
'snapshot_id', 'timestamp', 'code_barang', 'nama_barang',
'gudang', 'stok_qty', 'min_stok', 'kategori', 'satuan',
'triggered_by', 'notes'
];
snapSheet.appendRow(headers);
snapSheet.getRange(1, 1, 1, headers.length)
.setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff')
.setBorder(true, true, true, true, true, true);
snapSheet.setFrozenRows(1);
}

const dbSheet = ss.getSheetByName(DB_SHEET);
const dbData = dbSheet.getDataRange().getValues();
const hMap = getHeaderMap(dbSheet);

const item = dbData.slice(1).find(r =>
String(r[hMap.code_barang]).trim() === code &&
String(r[hMap.gudang]).trim() === gudang
);
if (!item) return;

const snapId = 'SNAP-' + Date.now().toString().slice(-8);
const ts = new Date();
snapSheet.appendRow([
snapId, ts, code,
item[hMap.nama_barang], gudang, newStok,
item[hMap.min_stok], item[hMap.kategori_barang],
item[hMap.satuan_barang], triggeredBy, notes
]);
snapSheet.getRange(snapSheet.getLastRow(), 2).setNumberFormat('yyyy-mm-dd hh:mm:ss');

} catch (err) {
Logger.log('❌ Snapshot error: ' + err.toString());
}
}

// ═══════════════════════════════════════════════════════════════════
// TRANSACTION PROCESSING (IN/OUT)
// ═══════════════════════════════════════════════════════════════════

/**
* Memproses mutasi barang dan mengirim notifikasi Telegram per-transaksi
* dengan detail lengkap setiap item yang berubah.
*/
function submitTransaction(payload) {
const lock = LockService.getDocumentLock();

try {
lock.waitLock(30000);
ensureSheets();

const ss = SpreadsheetApp.openById(SS_ID);
const dbSheet = ss.getSheetByName(DB_SHEET);
const mutasiSheet = ss.getSheetByName('mutasi');
const dbData = dbSheet.getDataRange().getValues();
const hMap = getHeaderMap(dbSheet);

let tglAmbil = '';
let tglTerima = '';
if (payload.type === 'OUT') {
tglAmbil = parseHtmlDate_(payload.tanggal_pengambilan_barang);
} else {
tglTerima = parseHtmlDate_(payload.tanggal_penerimaan_barang);
}

const txId = 'TX' + Date.now().toString().slice(-6);
const ts = new Date();

// ── Build lookup index ──────────────────────────────────────────
const lookup = {};
for (let i = 1; i < dbData.length; i++) {
const key = String(dbData[i][hMap.code_barang]).trim() + '|' + String(dbData[i][hMap.gudang]).trim();
lookup[key] = { rowIndex: i + 1, data: dbData[i] };
}

// ── Validate ALL items first ─────────────────────────────────────
const validatedItems = [];
for (const item of payload.items) {
const key = String(item.code).trim() + '|' + String(payload.gudang).trim();
const target = lookup[key];

if (!target) {
throw new Error(
`❌ Barang [${item.code}] tidak ditemukan di gudang [${payload.gudang}].`
);
}

const currentStok = Number(target.data[hMap.stok_awal]);
const qty = Number(item.qty);
const newStok = payload.type === 'IN' ? currentStok + qty : currentStok - qty;

if (payload.type === 'OUT' && newStok < 0) {
throw new Error(
`❌ Stok tidak cukup untuk ${target.data[hMap.nama_barang]}.\n` +
`Stok tersedia: ${currentStok} | Diminta: ${qty}`
);
}

validatedItems.push({ item, target, currentStok, qty, newStok });
}

// ── Process & write ──────────────────────────────────────────────
const kritisAlert = [];
const itemLines = []; // Untuk Telegram summary

validatedItems.forEach(({ item, target, currentStok, qty, newStok }) => {
const namaBarang = target.data[hMap.nama_barang];
const satuanBarang= target.data[hMap.satuan_barang];
const minStok = Number(target.data[hMap.min_stok]);

// Update stok di database
dbSheet.getRange(target.rowIndex, hMap.stok_awal + 1).setValue(newStok);

// Snapshot
logStokSnapshot(
item.code, payload.gudang, newStok,
'MUTASI_' + payload.type,
`TX: ${txId} | NIK: ${payload.nik} | Qty: ${qty}`
);

// Log ke mutasi sheet
const rowData = [
txId, ts, payload.type, payload.nik, payload.section, payload.gudang,
item.code, namaBarang, qty, satuanBarang,
payload.note || '', currentStok, newStok, 'WEBAPP',
tglAmbil || '', tglTerima || ''
];
mutasiSheet.appendRow(rowData);

const lastRow = mutasiSheet.getLastRow();
if (tglAmbil instanceof Date) mutasiSheet.getRange(lastRow, 15).setNumberFormat('yyyy-mm-dd');
if (tglTerima instanceof Date) mutasiSheet.getRange(lastRow, 16).setNumberFormat('yyyy-mm-dd');

// Siapkan baris info item untuk Telegram
const arah = payload.type === 'IN' ? '▲' : '▼';
const stokInfo = `${fmtNum(currentStok)} → *${fmtNum(newStok)}* ${satuanBarang}`;
itemLines.push(
`${arah} *${escapeTg(namaBarang)}*\n` +
` Kode: \`${escapeTg(item.code)}\` | Qty: ${arah === '▲' ? '+' : '-'}${fmtNum(qty)} ${satuanBarang}\n` +
` Stok: ${stokInfo}`
);

// Cek kritis
if (payload.type === 'OUT' && newStok <= minStok) {
kritisAlert.push({ namaBarang, satuanBarang, newStok, minStok, code: item.code });
}
});

// ── Kirim notifikasi Telegram lengkap per transaksi ──────────────
const props = PropertiesService.getScriptProperties();
const tgEnabled = props.getProperty('TELEGRAM_ENABLED') === 'true';

if (tgEnabled) {
const tipeIcon = payload.type === 'OUT' ? '📤' : '📥';
const tipeTeks = payload.type === 'OUT' ? 'PENGAMBILAN (OUT)' : 'PENERIMAAN (IN)';
const dateStr = payload.type === 'OUT'
? (payload.tanggal_pengambilan_barang || formatDate_(ts))
: (payload.tanggal_penerimaan_barang || formatDate_(ts));

// ── Pesan utama mutasi ────────────────────────────────────────
const msgMutasi =
`${tipeIcon} *MUTASI ${tipeTeks}*\n` +
`━━━━━━━━━━━━━━━━━━━━━━\n` +
`🆔 TX ID: \`${txId}\`\n` +
`👤 NIK Operator: *${escapeTg(payload.nik)}*\n` +
`🏗️ Unit/Seksi: ${escapeTg(payload.section)}\n` +
`🏢 Gudang: *${escapeTg(payload.gudang)}*\n` +
`📅 Tanggal: ${escapeTg(dateStr)}\n` +
`📝 Keterangan: ${escapeTg(payload.note || '-')}\n` +
`━━━━━━━━━━━━━━━━━━━━━━\n` +
`*Detail ${validatedItems.length} Item:*\n\n` +
itemLines.join('\n\n') +
`\n━━━━━━━━━━━━━━━━━━━━━━\n` +
`🕐 Waktu: ${formatDate_(ts, true)}`;

sendTelegramMessage(msgMutasi);

// ── Alert stok kritis (per item) ──────────────────────────────
kritisAlert.forEach(k => {
const msgKritis =
`⚠️ *STOK KRITIS!*\n` +
`━━━━━━━━━━━━━━━━━━━━━━\n` +
`📦 *${escapeTg(k.namaBarang)}*\n` +
`🔑 Kode: \`${escapeTg(k.code)}\`\n` +
`🏢 Gudang: ${escapeTg(payload.gudang)}\n` +
`📉 Stok sisa: *${fmtNum(k.newStok)} ${escapeTg(k.satuanBarang)}*\n` +
`🚨 Batas minimum: ${fmtNum(k.minStok)} ${escapeTg(k.satuanBarang)}\n` +
`👤 Diambil oleh: ${escapeTg(payload.nik)}\n` +
`🏗️ Unit: ${escapeTg(payload.section)}\n\n` +
`🔴 *SEGERA LAKUKAN RESTOCK!*`;
sendTelegramMessage(msgKritis);
});
}

return {
success: true,
message: `✅ Transaksi ${txId} berhasil disimpan. Total ${validatedItems.length} item diproses.`
};

} catch (err) {
return { success: false, message: err.toString() };
} finally {
lock.releaseLock();
}
}

// ═══════════════════════════════════════════════════════════════════
// LAPORAN HARIAN OTOMATIS — DIKIRIM VIA TELEGRAM
// ═══════════════════════════════════════════════════════════════════

/**
* Fungsi utama laporan harian stok semua gudang.
* Dipanggil oleh Time-based Trigger setiap hari jam 07:00 WIB.
*
* Yang dikirim ke Telegram:
* 1. Pesan ringkasan stok semua gudang (teks Markdown)
* 2. File CSV stok lengkap sebagai dokumen (via sendDocument)
* 3. Pesan ringkasan mutasi kemarin
*
* Cara setup:
* Jalankan setupDailyTrigger() sekali dari Apps Script Editor.
*/
function sendDailyStockReport() {
const props = PropertiesService.getScriptProperties();
const tgEnabled = props.getProperty('TELEGRAM_ENABLED') === 'true';
if (!tgEnabled) {
Logger.log('⚠️ Telegram tidak aktif, laporan harian dilewati.');
return;
}

try {
const ss = SpreadsheetApp.openById(SS_ID);
const dbSheet = ss.getSheetByName(DB_SHEET);
const data = dbSheet.getDataRange().getValues();
const hMap = getHeaderMap(dbSheet);
const now = new Date();
const today = formatDate_(now);
const yesterday = formatDate_(new Date(now.getTime() - 86400000));

// ── Kumpulkan data stok ──────────────────────────────────────────
const items = data.slice(1).filter(r => r[hMap.code_barang]).map(r => ({
code: String(r[hMap.code_barang]).trim(),
nama: r[hMap.nama_barang] || '',
gudang: String(r[hMap.gudang] || '').trim(),
kategori: r[hMap.kategori_barang] || '',
satuan: r[hMap.satuan_barang] || '',
stok: Number(r[hMap.stok_awal]) || 0,
min: Number(r[hMap.min_stok]) || 0,
}));

// ── Statistik global ─────────────────────────────────────────────
const total = items.length;
const kritisItems = items.filter(r => r.stok <= r.min);
const amanItems = items.filter(r => r.stok > r.min);

// ── Kelompokkan per gudang ────────────────────────────────────────
const byGudang = {};
items.forEach(r => {
if (!byGudang[r.gudang]) byGudang[r.gudang] = { items: [], kritis: 0, aman: 0 };
byGudang[r.gudang].items.push(r);
if (r.stok <= r.min) byGudang[r.gudang].kritis++;
else byGudang[r.gudang].aman++;
});

// ── Pesan 1: Header & Ringkasan Global ──────────────────────────
let msgHeader =
`📊 *LAPORAN STOK HARIAN*\n` +
`🗓️ ${escapeTg(today)} | ${Utilities.formatDate(now, TIMEZONE, 'HH:mm')} WIB\n` +
`━━━━━━━━━━━━━━━━━━━━━━\n` +
`📦 Total Item: *${fmtNum(total)}*\n` +
`✅ Stok Aman: *${fmtNum(amanItems.length)}*\n` +
`🚨 Stok Kritis: *${fmtNum(kritisItems.length)}*\n` +
`🏢 Gudang Aktif: *${Object.keys(byGudang).length}*\n` +
`━━━━━━━━━━━━━━━━━━━━━━\n\n`;

// ── Ringkasan per gudang ─────────────────────────────────────────
Object.keys(byGudang).sort().forEach(g => {
const gd = byGudang[g];
const statusIcon = gd.kritis > 0 ? '⚠️' : '✅';
msgHeader +=
`${statusIcon} *${escapeTg(g)}*\n` +
` Total: ${fmtNum(gd.items.length)} item | ` +
`Aman: ${fmtNum(gd.aman)} | Kritis: *${fmtNum(gd.kritis)}*\n\n`;
});

sendTelegramMessage(msgHeader);

// ── Pesan 2: Daftar Stok Kritis (jika ada) ──────────────────────
if (kritisItems.length > 0) {
// Bagi menjadi chunk 20 item per pesan agar tidak melebihi batas Telegram
const chunkSize = 20;
for (let i = 0; i < kritisItems.length; i += chunkSize) {
const chunk = kritisItems.slice(i, i + chunkSize);
let msgKritis =
`🚨 *DAFTAR STOK KRITIS* ` +
`(${i + 1}–${Math.min(i + chunkSize, kritisItems.length)} dari ${kritisItems.length})\n` +
`━━━━━━━━━━━━━━━━━━━━━━\n`;
chunk.forEach((r, idx) => {
const kurang = r.min - r.stok;
msgKritis +=
`${i + idx + 1}. *${escapeTg(r.nama)}*\n` +
` \`${escapeTg(r.code)}\` | ${escapeTg(r.gudang)}\n` +
` Stok: *${fmtNum(r.stok)}* / Min: ${fmtNum(r.min)} ${escapeTg(r.satuan)}\n` +
` Kurang: *${fmtNum(kurang)} ${escapeTg(r.satuan)}*\n\n`;
});
sendTelegramMessage(msgKritis);
}
}

// ── CSV: Buat file CSV lengkap semua gudang ──────────────────────
const csvContent = buildStockCSV(items, today);
const csvBlob = Utilities.newBlob(
csvContent,
'text/csv; charset=utf-8',
`Stok_Semua_Gudang_${today}.csv`
);

// Kirim file CSV via Telegram sendDocument
sendTelegramDocument(
csvBlob,
`📎 *Data Stok Lengkap — ${escapeTg(today)}*\n` +
`Berisi ${fmtNum(total)} item dari ${Object.keys(byGudang).length} gudang.\n` +
`Import ke Excel/Google Sheets untuk analisis lebih lanjut.`
);

// ── Pesan 3: Ringkasan Mutasi Kemarin ────────────────────────────
const mutasiSheet = ss.getSheetByName('mutasi');
if (mutasiSheet && mutasiSheet.getLastRow() > 1) {
const mutasiSummary = buildMutasiSummary(mutasiSheet, yesterday);
if (mutasiSummary) {
sendTelegramMessage(mutasiSummary);
}
}

// Catat waktu laporan terakhir
props.setProperty('DAILY_REPORT_LAST_RUN', formatDate_(now, true));
Logger.log('✅ Laporan harian berhasil dikirim: ' + today);

} catch (err) {
Logger.log('❌ Error sendDailyStockReport: ' + err.toString());
sendTelegramMessage(
`❌ *ERROR: Laporan Harian Gagal*\n` +
`\`${escapeTg(err.toString())}\``
);
}
}

/**
* Membangun konten CSV dari daftar item stok
* Format: BOM UTF-8 + header + data
*/
function buildStockCSV(items, tanggal) {
const BOM = '\uFEFF'; // BOM agar Excel bisa baca UTF-8
const SEP = ',';

const header = [
'Tanggal Laporan', 'Gudang', 'Kategori', 'Kode Barang',
'Nama Barang', 'Stok', 'Min Stok', 'Satuan', 'Status',
'Kekurangan'
].join(SEP);

const rows = items.map(r => {
const isKritis = r.stok <= r.min;
const kekurangan = isKritis ? (r.min - r.stok) : 0;
return [
tanggal,
csvCell(r.gudang),
csvCell(r.kategori),
csvCell(r.code),
csvCell(r.nama),
r.stok,
r.min,
csvCell(r.satuan),
isKritis ? 'KRITIS' : 'AMAN',
kekurangan
].join(SEP);
});

return BOM + [header, ...rows].join('\n');
}

/**
* Escape nilai CSV (tambah quote jika mengandung koma/quote/newline)
*/
function csvCell(val) {
const s = String(val === null || val === undefined ? '' : val);
if (s.includes(',') || s.includes('"') || s.includes('\n')) {
return '"' + s.replace(/"/g, '""') + '"';
}
return s;
}

/**
* Membangun ringkasan mutasi untuk tanggal tertentu
*/
function buildMutasiSummary(mutasiSheet, tanggal) {
try {
const rows = mutasiSheet.getDataRange().getValues();
if (rows.length <= 1) return null;

const hMap = getHeaderMap(mutasiSheet);
const fromDate = new Date(tanggal + 'T00:00:00');
const toDate = new Date(tanggal + 'T23:59:59');

let totalIn = 0, totalOut = 0, cIn = 0, cOut = 0;
const txIds = new Set();

rows.slice(1).forEach(r => {
const ts = r[hMap.timestamp];
const date = ts instanceof Date ? ts : new Date(ts);
if (isNaN(date.getTime())) return;
if (date < fromDate || date > toDate) return;

const qty = Number(r[hMap.qty]) || 0;
if (r[hMap.type] === 'IN') { totalIn += qty; cIn++; }
if (r[hMap.type] === 'OUT') { totalOut += qty; cOut++; }
if (r[hMap.tx_id]) txIds.add(r[hMap.tx_id]);
});

if (txIds.size === 0) {
return (
`📋 *RINGKASAN MUTASI KEMARIN (${escapeTg(tanggal)})*\n` +
`━━━━━━━━━━━━━━━━━━━━━━\n` +
`ℹ️ Tidak ada transaksi kemarin.`
);
}

return (
`📋 *RINGKASAN MUTASI KEMARIN (${escapeTg(tanggal)})*\n` +
`━━━━━━━━━━━━━━━━━━━━━━\n` +
`🔄 Total Transaksi: *${fmtNum(txIds.size)}* TX\n` +
`📥 Penerimaan (IN): *${fmtNum(cIn)}* baris | Qty: ${fmtNum(totalIn)}\n` +
`📤 Pengambilan (OUT): *${fmtNum(cOut)}* baris | Qty: ${fmtNum(totalOut)}`
);
} catch (err) {
Logger.log('⚠️ buildMutasiSummary error: ' + err.toString());
return null;
}
}

// ═══════════════════════════════════════════════════════════════════
// TIME-BASED TRIGGER MANAGEMENT
// ═══════════════════════════════════════════════════════════════════

/**
* Setup trigger harian laporan stok jam 07:00 WIB.
* Jalankan fungsi ini SATU KALI dari Apps Script Editor:
* Editor → Run → setupDailyTrigger
*
* Trigger akan memanggil sendDailyStockReport() setiap hari jam 07:00–08:00 WIB.
*/
function setupDailyTrigger() {
try {
// Step 1: Hapus trigger lama
removeDailyTrigger();

// Step 2: Buat trigger baru
var trigger = ScriptApp.newTrigger('sendDailyStockReport')
.timeBased()
.everyDays(1)
.atHour(7)
.create();

Logger.log('✅ Trigger ID: ' + trigger.getUniqueId());

// Step 3: Simpan ke properties
PropertiesService.getScriptProperties()
.setProperty('DAILY_TRIGGER_SETUP', new Date().toString());

Logger.log('✅ Setup selesai.');

} catch(e) {
Logger.log('❌ Error: ' + e.toString());
Logger.log('Stack: ' + e.stack);
}
}

/**
* Hapus semua trigger sendDailyStockReport yang ada.
* Berguna saat ingin reset atau disable laporan harian.
*/
function removeDailyTrigger() {
const triggers = ScriptApp.getProjectTriggers();
triggers.forEach(t => {
if (t.getHandlerFunction() === 'sendDailyStockReport') {
ScriptApp.deleteTrigger(t);
Logger.log('🗑️ Trigger dihapus: ' + t.getUniqueId());
}
});
}

/**
* Cek status trigger harian (untuk keperluan debugging)
*/
function checkTriggerStatus() {
const triggers = ScriptApp.getProjectTriggers();
const dailyTriggers = triggers.filter(t => t.getHandlerFunction() === 'sendDailyStockReport');
Logger.log(`Trigger aktif: ${dailyTriggers.length}`);
dailyTriggers.forEach(t => {
Logger.log(` - ID: ${t.getUniqueId()} | Type: ${t.getEventType()}`);
});
return dailyTriggers.length;
}

// ═══════════════════════════════════════════════════════════════════
// ADMIN: CRUD OPERATIONS ON MASTER DATA
// ═══════════════════════════════════════════════════════════════════

function dbCRUD(payload) {
if (payload.pin !== DEFAULT_PIN) {
return { success: false, message: '🔒 Akses ditolak. PIN admin tidak valid.' };
}

const lock = LockService.getDocumentLock();

try {
lock.waitLock(15000);

const ss = SpreadsheetApp.openById(SS_ID);
const sheet = ss.getSheetByName(DB_SHEET);
const data = sheet.getDataRange().getValues();
const hMap = getHeaderMap(sheet);

// ── CREATE ──────────────────────────────────────────────────────
if (payload.op === 'CREATE') {
const isDup = data.slice(1).some(r =>
String(r[hMap.code_barang]).trim() === String(payload.code).trim() &&
String(r[hMap.gudang]).trim() === String(payload.gudang).trim()
);
if (isDup) {
return {
success: false,
message: `❌ Kode barang [${payload.code}] sudah terdaftar di gudang [${payload.gudang}].`
};
}
const noUrut = data.length;
sheet.appendRow([
noUrut, payload.kategori, payload.code, payload.nama,
payload.satuan, Number(payload.stok) || 0, Number(payload.min) || 0, payload.gudang
]);
logStokSnapshot(payload.code, payload.gudang, Number(payload.stok) || 0,
'MASTER_CREATE', 'Item baru ditambahkan oleh admin');
return { success: true, message: `✅ Barang [${payload.code}] berhasil ditambahkan.` };
}

// ── UPDATE ──────────────────────────────────────────────────────
else if (payload.op === 'UPDATE') {
const searchCode = payload.oldCode || payload.code;
for (let i = 1; i < data.length; i++) {
if (String(data[i][hMap.code_barang]).trim() === String(searchCode).trim()) {
const oldStok = Number(data[i][hMap.stok_awal]);
const newStok = Number(payload.stok) || 0;
sheet.getRange(i + 1, 1, 1, 8).setValues([[
data[i][hMap.no], payload.kategori, payload.code, payload.nama,
payload.satuan, newStok, Number(payload.min) || 0, payload.gudang
]]);
if (oldStok !== newStok) {
logStokSnapshot(payload.code, payload.gudang, newStok,
'MASTER_UPDATE', `Stok diubah dari ${oldStok} ke ${newStok} oleh admin`);
}
return { success: true, message: `✅ Data barang [${payload.code}] berhasil diperbarui.` };
}
}
return { success: false, message: `❌ Barang [${searchCode}] tidak ditemukan.` };
}

// ── DELETE ──────────────────────────────────────────────────────
else if (payload.op === 'DELETE') {
for (let i = 1; i < data.length; i++) {
if (String(data[i][hMap.code_barang]).trim() === String(payload.code).trim()) {
sheet.deleteRow(i + 1);
return { success: true, message: `✅ Barang [${payload.code}] berhasil dihapus.` };
}
}
return { success: false, message: `❌ Barang [${payload.code}] tidak ditemukan.` };
}

return { success: false, message: '❌ Operasi tidak dikenali.' };

} catch (err) {
return { success: false, message: '❌ Error: ' + err.toString() };
} finally {
lock.releaseLock();
}
}

// ═══════════════════════════════════════════════════════════════════
// ADMIN: BULK STOCK ADJUSTMENT (STOCK OPNAME)
// ═══════════════════════════════════════════════════════════════════

function bulkAudit(payload) {
if (payload.pin !== DEFAULT_PIN) {
return { success: false, message: '🔒 Akses ditolak. PIN admin tidak valid.' };
}

const lock = LockService.getDocumentLock();

try {
lock.waitLock(20000);

const ss = SpreadsheetApp.openById(SS_ID);
const dbSheet = ss.getSheetByName(DB_SHEET);
const auditSheet = ss.getSheetByName('audit');
const data = dbSheet.getDataRange().getValues();
const hMap = getHeaderMap(dbSheet);

const ts = new Date();
const adjId = 'AUD-' + Date.now().toString().slice(-6);
let changed = 0;
const kritisList = [];

payload.adjustments.forEach(adj => {
for (let i = 1; i < data.length; i++) {
if (String(data[i][hMap.code_barang]).trim() === String(adj.code).trim()) {
const oldVal = Number(data[i][hMap.stok_awal]);
const newVal = Number(adj.newVal);
if (oldVal !== newVal) {
dbSheet.getRange(i + 1, hMap.stok_awal + 1).setValue(newVal);
logStokSnapshot(adj.code, data[i][hMap.gudang], newVal,
'STOCK_OPNAME', `Audit ID: ${adjId} | Reason: ${payload.reason}`);
auditSheet.appendRow([
adjId, ts, 'ADMIN', 'BULK_AUDIT',
data[i][hMap.gudang], adj.code, data[i][hMap.nama_barang],
payload.reason, oldVal, newVal, newVal - oldVal, 'WEBAPP'
]);
changed++;
if (newVal <= Number(data[i][hMap.min_stok])) {
kritisList.push(
`• ${data[i][hMap.nama_barang]} (${newVal}/${data[i][hMap.min_stok]})`
);
}
}
break;
}
}
});

const props = PropertiesService.getScriptProperties();
const tgEnabled = props.getProperty('TELEGRAM_ENABLED') === 'true';

if (tgEnabled && changed > 0) {
let msg =
`🏠 *STOCK OPNAME SELESAI*\n` +
`━━━━━━━━━━━━━━━━━━━━━━\n` +
`📋 Audit ID: \`${adjId}\`\n` +
`🔄 Item diubah: *${changed}*\n` +
`📝 Alasan: ${escapeTg(payload.reason)}\n` +
`🕐 Waktu: ${formatDate_(ts, true)}`;
if (kritisList.length > 0) {
msg += `\n\n⚠️ *Masih Kritis Setelah Opname:*\n${kritisList.join('\n')}`;
}
sendTelegramMessage(msg);
}

return {
success: true,
message: `✅ Stock opname selesai. ${changed} item berhasil diperbarui.`
};

} catch (err) {
return { success: false, message: '❌ Error: ' + err.toString() };
} finally {
lock.releaseLock();
}
}

// ═══════════════════════════════════════════════════════════════════
// REPORTING: AGGREGATE MUTATION SUMMARY
// ═══════════════════════════════════════════════════════════════════

function getReportData(payload) {
try {
const ss = SpreadsheetApp.openById(SS_ID);
const mutasiSheet = ss.getSheetByName('mutasi');
if (!mutasiSheet) return { success: true, list: [] };

const rows = mutasiSheet.getDataRange().getValues();
if (rows.length <= 1) return { success: true, list: [] };

const hMap = getHeaderMap(mutasiSheet);

const from = new Date(payload.from); from.setHours(0, 0, 0, 0);
const to = new Date(payload.to); to.setHours(23, 59, 59, 999);

const rekap = {};
rows.slice(1).forEach(r => {
const ts = r[hMap.timestamp];
const date = ts instanceof Date ? ts : new Date(ts);
if (isNaN(date.getTime()) || date < from || date > to) return;
if (payload.gudang && r[hMap.gudang] !== payload.gudang) return;

const key = r[hMap.code_barang] + '|' + r[hMap.gudang];
if (!rekap[key]) {
rekap[key] = {
code: r[hMap.code_barang], nama: r[hMap.nama_barang],
gudang: r[hMap.gudang], sat: r[hMap.satuan] || '', in: 0, out: 0
};
}
const qty = Number(r[hMap.qty]) || 0;
if (r[hMap.type] === 'IN') rekap[key].in += qty;
if (r[hMap.type] === 'OUT') rekap[key].out += qty;
});

return { success: true, list: Object.values(rekap) };
} catch (err) {
return { success: false, message: err.toString() };
}
}

// ═══════════════════════════════════════════════════════════════════
// REPORTING: DETAILED MUTATION HISTORY
// ═══════════════════════════════════════════════════════════════════

function getMutasiHistory(payload) {
try {
const ss = SpreadsheetApp.openById(SS_ID);
const mutasiSheet = ss.getSheetByName('mutasi');

if (!mutasiSheet) {
return { success: false, message: '❌ Sheet mutasi tidak ditemukan.', list: [], total: 0 };
}

const rows = mutasiSheet.getDataRange().getValues();
if (rows.length <= 1) {
return { success: true, message: 'Belum ada data transaksi.', list: [], total: 0 };
}

const hMap = getHeaderMap(mutasiSheet);

const requiredCols = ['tx_id', 'timestamp', 'type', 'code_barang', 'qty', 'gudang'];
const missingCols = requiredCols.filter(col => !(col in hMap));
if (missingCols.length > 0) {
return {
success: false,
message: `❌ Header sheet mutasi tidak lengkap. Kolom hilang: ${missingCols.join(', ')}`,
list: [], total: 0
};
}

const from = payload.from ? new Date(payload.from) : null;
if (from) from.setHours(0, 0, 0, 0);
const to = payload.to ? new Date(payload.to) : null;
if (to) to.setHours(23, 59, 59, 999);

const list = [];
rows.slice(1).forEach((r, idx) => {
if (!r[hMap.tx_id] || !r[hMap.code_barang]) return;

const ts = r[hMap.timestamp];
const date = ts instanceof Date ? ts : new Date(ts);
if (isNaN(date.getTime())) return;
if (from && date < from) return;
if (to && date > to) return;

if (payload.gudang && r[hMap.gudang] !== payload.gudang) return;
if (payload.type && r[hMap.type] !== payload.type) return;

if (payload.search) {
const q = String(payload.search).toLowerCase();
const matchCode = String(r[hMap.code_barang] || '').toLowerCase().includes(q);
const matchNama = String(r[hMap.nama_barang] || '').toLowerCase().includes(q);
const matchNik = String(r[hMap.nik] || '').toLowerCase().includes(q);
if (!matchCode && !matchNama && !matchNik) return;
}

const namaBarang =
(r[hMap.nama_barang] && String(r[hMap.nama_barang]).trim())
? String(r[hMap.nama_barang]).trim()
: (r[hMap.nama_barang_snapshot] && String(r[hMap.nama_barang_snapshot]).trim())
? String(r[hMap.nama_barang_snapshot]).trim()
: '';

list.push({
tx_id: r[hMap.tx_id] || '',
timestamp: formatDate_(r[hMap.timestamp], true),
type: r[hMap.type] || '',
nik: r[hMap.nik] || '',
section: r[hMap.section] || '',
gudang: r[hMap.gudang] || '',
code_barang: r[hMap.code_barang] || '',
nama_barang: namaBarang,
qty: Number(r[hMap.qty]) || 0,
satuan: r[hMap.satuan] || '',
keterangan: r[hMap.keterangan] || '',
stok_before: Number(r[hMap.stok_before]) || 0,
stok_after: Number(r[hMap.stok_after]) || 0,
tanggal_pengambilan_barang: formatDate_(r[hMap.tanggal_pengambilan_barang]),
tanggal_penerimaan_barang: formatDate_(r[hMap.tanggal_penerimaan_barang])
});
});

list.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

const limit = Number(payload.limit) || 1000;
const offset = Number(payload.offset) || 0;
const paged = list.slice(offset, offset + limit);

return {
success: true,
list: paged,
total: list.length,
displayed: paged.length,
hasMore: list.length > (offset + limit)
};

} catch (err) {
return { success: false, message: '❌ Error getMutasiHistory: ' + err.toString(), list: [], total: 0 };
}
}

// ═══════════════════════════════════════════════════════════════════
// QUERY HISTORICAL STOCK SNAPSHOTS
// ═══════════════════════════════════════════════════════════════════

function getStokSnapshot(payload) {
try {
const ss = SpreadsheetApp.openById(SS_ID);
const snapSheet = ss.getSheetByName('stok_snapshot');
if (!snapSheet) return getStockData();

const rows = snapSheet.getDataRange().getValues();
if (rows.length <= 1) return getStockData();

const hMap = getHeaderMap(snapSheet);
const latest = {};

rows.slice(1).forEach(r => {
const key = r[hMap.code_barang] + '|' + r[hMap.gudang];
const ts = r[hMap.timestamp];
const date = ts instanceof Date ? ts : new Date(ts);
if (isNaN(date.getTime())) return;
if (payload.timestamp) {
const targetDate = new Date(payload.timestamp);
if (date > targetDate) return;
}
if (!latest[key] || date > latest[key].date) {
latest[key] = { date, data: r };
}
});

let list = Object.values(latest).map(item => {
const r = item.data;
return {
snapshot_id: r[hMap.snapshot_id],
timestamp: formatDate_(item.date, true),
code_barang: r[hMap.code_barang],
nama_barang: r[hMap.nama_barang],
gudang: r[hMap.gudang],
stok_qty: Number(r[hMap.stok_qty]) || 0,
min_stok: Number(r[hMap.min_stok]) || 0,
kategori: r[hMap.kategori],
satuan: r[hMap.satuan],
triggered_by: r[hMap.triggered_by],
notes: r[hMap.notes]
};
});

if (payload.gudang) list = list.filter(r => r.gudang === payload.gudang);
if (payload.kategori) list = list.filter(r => r.kategori === payload.kategori);
if (payload.code) {
const q = String(payload.code).toLowerCase();
list = list.filter(r =>
r.code_barang.toLowerCase().includes(q) ||
r.nama_barang.toLowerCase().includes(q)
);
}

return { success: true, list, snapshotTime: payload.timestamp || 'LATEST' };

} catch (err) {
return { success: false, message: err.toString(), list: [] };
}
}

// ═══════════════════════════════════════════════════════════════════
// TELEGRAM INTEGRATION
// ═══════════════════════════════════════════════════════════════════

function getAdminConfig(p) {
if (p.pin !== DEFAULT_PIN) {
return { telegramEnabled: false, telegramToken: '', telegramChatId: '' };
}
const props = PropertiesService.getScriptProperties();
return {
telegramEnabled: props.getProperty('TELEGRAM_ENABLED') === 'true',
telegramToken: props.getProperty('TELEGRAM_TOKEN') || '',
telegramChatId: props.getProperty('TELEGRAM_CHAT_ID') || ''
};
}

function saveTelegram(p) {
if (p.pin !== DEFAULT_PIN) {
return { success: false, message: '🔒 Akses ditolak. PIN admin tidak valid.' };
}
try {
PropertiesService.getScriptProperties().setProperties({
'TELEGRAM_ENABLED': String(!!p.enabled),
'TELEGRAM_TOKEN': p.token || '',
'TELEGRAM_CHAT_ID': p.chatId || ''
});
return { success: true, message: '✅ Konfigurasi Telegram berhasil disimpan.' };
} catch (err) {
return { success: false, message: '❌ Error: ' + err.toString() };
}
}

/**
* Kirim pesan teks ke Telegram (Markdown mode)
*/
function sendTelegramMessage(text) {
const props = PropertiesService.getScriptProperties();
const token = props.getProperty('TELEGRAM_TOKEN');
const chatId = props.getProperty('TELEGRAM_CHAT_ID');
if (!token || !chatId) return;

try {
const response = UrlFetchApp.fetch(
`https://api.telegram.org/bot${token}/sendMessage`,
{
method: 'post',
contentType: 'application/json',
payload: JSON.stringify({
chat_id: chatId,
text: text,
parse_mode: 'Markdown'
}),
muteHttpExceptions: true
}
);
const result = JSON.parse(response.getContentText());
if (!result.ok) {
Logger.log('❌ Telegram sendMessage error: ' + result.description);
}
} catch (e) {
Logger.log('❌ Telegram exception: ' + e.toString());
}
}

/**
* Kirim file (Blob) ke Telegram sebagai dokumen via multipart/form-data
* Digunakan untuk mengirim CSV laporan harian
*
* @param {Blob} blob - File blob yang akan dikirim
* @param {string} caption - Caption file (mendukung Markdown)
*/
function sendTelegramDocument(blob, caption) {
const props = PropertiesService.getScriptProperties();
const token = props.getProperty('TELEGRAM_TOKEN');
const chatId = props.getProperty('TELEGRAM_CHAT_ID');
if (!token || !chatId) return;

try {
const boundary = '------GasMultipart' + Date.now();

// Build multipart body manual karena GAS tidak support FormData native
const metaPart =
`--${boundary}\r\n` +
`Content-Disposition: form-data; name="chat_id"\r\n\r\n` +
`${chatId}\r\n` +
`--${boundary}\r\n` +
`Content-Disposition: form-data; name="parse_mode"\r\n\r\nMarkdown\r\n` +
`--${boundary}\r\n` +
`Content-Disposition: form-data; name="caption"\r\n\r\n` +
`${caption || ''}\r\n` +
`--${boundary}\r\n` +
`Content-Disposition: form-data; name="document"; filename="${blob.getName()}"\r\n` +
`Content-Type: ${blob.getContentType()}\r\n\r\n`;

const closingPart = `\r\n--${boundary}--`;

// Gabungkan: metadata + file bytes + penutup
const metaBytes = Utilities.newBlob(metaPart).getBytes();
const fileBytes = blob.getBytes();
const closingBytes = Utilities.newBlob(closingPart).getBytes();

const bodyBytes = metaBytes.concat(fileBytes).concat(closingBytes);

const response = UrlFetchApp.fetch(
`https://api.telegram.org/bot${token}/sendDocument`,
{
method: 'post',
contentType: `multipart/form-data; boundary=${boundary}`,
payload: bodyBytes,
muteHttpExceptions: true
}
);

const result = JSON.parse(response.getContentText());
if (!result.ok) {
Logger.log('❌ Telegram sendDocument error: ' + result.description);
// Fallback: kirim pesan teks saja
sendTelegramMessage(
`📎 *File CSV Laporan Stok Harian*\n` +
`Gagal mengirim file langsung. Error: ${result.description}\n\n` +
caption
);
} else {
Logger.log('✅ File CSV berhasil dikirim ke Telegram.');
}

} catch (e) {
Logger.log('❌ Telegram sendDocument exception: ' + e.toString());
// Fallback: kirim notif saja
sendTelegramMessage(
`⚠️ File CSV laporan stok tidak dapat dikirim otomatis.\n` +
`Error: ${e.toString()}\n\n` +
`Silakan export manual dari aplikasi.`
);
}
}

/**
* Test kirim pesan Telegram (dipanggil dari frontend)
*/
function testTelegram(p) {
if (p && p.pin && p.pin !== DEFAULT_PIN) {
return { success: false, message: '🔒 Akses ditolak. PIN admin tidak valid.' };
}
try {
const props = PropertiesService.getScriptProperties();
const token = props.getProperty('TELEGRAM_TOKEN');
const chatId = props.getProperty('TELEGRAM_CHAT_ID');
if (!token || !chatId) {
return { success: false, message: '❌ Token atau Chat ID belum dikonfigurasi.' };
}

const ts = formatDate_(new Date(), true);
sendTelegramMessage(
`✅ *TEST NOTIFIKASI — GUDANG KILN v8.0*\n` +
`━━━━━━━━━━━━━━━━━━━━━━\n` +
`Koneksi bot berhasil!\n` +
`🕐 Waktu: ${ts}\n\n` +
`Fitur aktif:\n` +
`• 📨 Notifikasi setiap mutasi\n` +
`• 🚨 Alert stok kritis\n` +
`• 📊 Laporan harian 07:00 WIB\n` +
`• 📎 File CSV stok harian`
);
props.setProperty('TELEGRAM_LAST_TEST', ts);
return { success: true, message: '✅ Pesan test berhasil dikirim ke Telegram.' };
} catch (err) {
return { success: false, message: '❌ Gagal: ' + err.toString() };
}
}

// ═══════════════════════════════════════════════════════════════════
// SETUP & INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

function ensureSheets() {
const ss = SpreadsheetApp.openById(SS_ID);

const configs = [
{
name: 'mutasi',
headers: [
'tx_id', 'timestamp', 'type', 'nik', 'section', 'gudang',
'code_barang', 'nama_barang', 'qty', 'satuan',
'keterangan', 'stok_before', 'stok_after', 'source',
'tanggal_pengambilan_barang', 'tanggal_penerimaan_barang'
]
},
{
name: 'audit',
headers: [
'adj_id', 'timestamp', 'user_role', 'method', 'gudang',
'code_barang', 'nama_barang', 'reason',
'stok_before', 'stok_after', 'selisih', 'source'
]
},
{
name: 'stok_snapshot',
headers: [
'snapshot_id', 'timestamp', 'code_barang', 'nama_barang',
'gudang', 'stok_qty', 'min_stok', 'kategori', 'satuan',
'triggered_by', 'notes'
]
}
];

configs.forEach(conf => {
let sh = ss.getSheetByName(conf.name);

if (!sh) {
sh = ss.insertSheet(conf.name);
const range = sh.getRange(1, 1, 1, conf.headers.length);
range.setValues([conf.headers]);
range.setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff')
.setBorder(true, true, true, true, true, true);
sh.setFrozenRows(1);
Logger.log(`✅ Created sheet: ${conf.name}`);
} else {
const lastCol = Math.max(sh.getLastColumn(), 1);
const existHdrs = sh.getRange(1, 1, 1, lastCol).getValues()[0];
const existSet = new Set(existHdrs.map(h => String(h).trim()));
let appendCol = lastCol;

conf.headers.forEach(h => {
if (!existSet.has(h)) {
appendCol++;
sh.getRange(1, appendCol).setValue(h)
.setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
Logger.log(`✅ Added column "${h}" to sheet ${conf.name}`);
}
});
}
});
}


function testAuth() {
Logger.log('SS: ' + SpreadsheetApp.openById(SS_ID).getName());
Logger.log('Props: ' + PropertiesService.getScriptProperties().getKeys());
Logger.log('Triggers: ' + ScriptApp.getProjectTriggers().length);
Logger.log('Auth OK');
}

function testTelegramDirect() {
const props = PropertiesService.getScriptProperties();
const token = props.getProperty('TELEGRAM_TOKEN');
const chatId = props.getProperty('TELEGRAM_CHAT_ID');

Logger.log('Token ada: ' + (token ? 'YA (' + token.length + ' karakter)' : 'TIDAK ADA'));
Logger.log('ChatID: ' + (chatId ? chatId : 'TIDAK ADA'));

if (!token || !chatId) {
Logger.log('❌ Token/ChatID kosong!');
return;
}

const url = 'https://api.telegram.org/bot' + token + '/sendMessage';
const response = UrlFetchApp.fetch(url, {
method: 'post',
contentType: 'application/json',
payload: JSON.stringify({
chat_id: chatId,
text: '✅ TEST - Gudang Kiln\nWaktu: ' + new Date().toString()
}),
muteHttpExceptions: true
});

const result = JSON.parse(response.getContentText());
Logger.log('Response: ' + JSON.stringify(result));
Logger.log(result.ok ? '✅ SUKSES!' : '❌ GAGAL: ' + result.description);
}

function cekSemuaProperties() {
const props = PropertiesService.getScriptProperties().getProperties();
Logger.log('TELEGRAM_ENABLED : ' + props['TELEGRAM_ENABLED']);
Logger.log('TELEGRAM_TOKEN : ' + (props['TELEGRAM_TOKEN'] ? '***ada***' : 'KOSONG'));
Logger.log('TELEGRAM_CHAT_ID : ' + (props['TELEGRAM_CHAT_ID'] ? props['TELEGRAM_CHAT_ID'] : 'KOSONG'));
Logger.log('DAILY_TRIGGER_SETUP : ' + props['DAILY_TRIGGER_SETUP']);
Logger.log('DAILY_REPORT_LAST_RUN : ' + props['DAILY_REPORT_LAST_RUN']);
}

function pakseAktifkanTelegram() {
PropertiesService.getScriptProperties().setProperty('TELEGRAM_ENABLED', 'true');
Logger.log('✅ TELEGRAM_ENABLED diset ke true');
Logger.log('Nilai sekarang: ' + PropertiesService.getScriptProperties().getProperty('TELEGRAM_ENABLED'));
}




function testLaporanManual() {
try {
sendDailyStockReport();
Logger.log('✅ Fungsi selesai. Cek Telegram sekarang.');
} catch(e) {
Logger.log('❌ Error: ' + e.toString());
Logger.log('Stack: ' + e.stack);
}
}

function forceReauthorize() {
// Fungsi ini memaksa GAS meminta ulang semua izin
UrlFetchApp.fetch('https://www.google.com', {muteHttpExceptions: true});
Logger.log('✅ UrlFetchApp authorized!');
}
// ═══════════════════════════════════════════════════════════════════
// 🎉 END OF CODE.GS v8.0
// ═══════════════════════════════════════════════════════════════════
function fixDanTestTelegram() {
// Update Chat ID yang benar
PropertiesService.getScriptProperties().setProperty('TELEGRAM_CHAT_ID', '7072269592');
Logger.log('✅ Chat ID diupdate ke: 7072269592');

// Langsung test kirim
const token = PropertiesService.getScriptProperties().getProperty('TELEGRAM_TOKEN');
const chatId = '7072269592';

const res = UrlFetchApp.fetch(
'https://api.telegram.org/bot' + token + '/sendMessage',
{
method: 'post',
contentType: 'application/json',
payload: JSON.stringify({
chat_id: chatId,
text: '✅ Gudang Kiln berhasil terhubung!\nHai Haysan, notifikasi siap dikirim.'
}),
muteHttpExceptions: true
}
);

const result = JSON.parse(res.getContentText());
Logger.log(result.ok ? '✅ PESAN MASUK! Cek Telegram.' : '❌ ' + result.description);
}

function setTokenDanChatId() {
const TOKEN = '8719610589:AAG34kKff9sVeDM1TAQuuv0CYhiZPWQNKNA'; // token Anda
const CHATID = '-1003766863451';

PropertiesService.getScriptProperties().setProperties({
'TELEGRAM_TOKEN' : TOKEN,
'TELEGRAM_CHAT_ID': CHATID,
'TELEGRAM_ENABLED': 'true'
});

Logger.log('Token : ' + PropertiesService.getScriptProperties().getProperty('TELEGRAM_TOKEN'));
Logger.log('ChatID : ' + PropertiesService.getScriptProperties().getProperty('TELEGRAM_CHAT_ID'));
Logger.log('Enabled: ' + PropertiesService.getScriptProperties().getProperty('TELEGRAM_ENABLED'));

// Langsung test
const res = UrlFetchApp.fetch(
'https://api.telegram.org/bot' + TOKEN + '/sendMessage',
{
method: 'post',
contentType: 'application/json',
payload: JSON.stringify({
chat_id: CHATID,
text: '✅ Gudang Kiln - Koneksi Berhasil!\nHai Haysan, sistem siap.'
}),
muteHttpExceptions: true
}
);

const result = JSON.parse(res.getContentText());
Logger.log('Result: ' + res.getContentText());
Logger.log(result.ok ? '✅ PESAN MASUK! Cek Telegram.' : '❌ Error: ' + result.description);
}

// ═══════════════════════════════════════════════════════════════════
// NEW v8.0 FUNCTION: BINCARD TRACKER ENGINE
// ═══════════════════════════════════════════════════════════════════

/**
* Mengambil riwayat mutasi khusus untuk satu kode barang di gudang tertentu
* untuk disajikan dalam bentuk Kartu Stok (Bincard).
* * @param {Object} payload - Objek berisi properti code dan gudang
* @return {Object} JSON response sukses/gagal beserta list mutasi item
*/
function getBincardHistory(payload) {
try {
const ss = SpreadsheetApp.openById(SS_ID);
const mutasiSheet = ss.getSheetByName('mutasi');

if (!mutasiSheet) {
return { success: true, list: [], message: 'Sheet mutasi belum terbuat.' };
}

const rows = mutasiSheet.getDataRange().getValues();
if (rows.length <= 1) {
return { success: true, list: [], message: 'Belum ada data transaksi masuk/keluar.' };
}

const hMap = getHeaderMap(mutasiSheet);
const list = [];

// Lakukan pemindaian log mutasi dari baris pertama setelah header
rows.slice(1).forEach(r => {
const matchCode = String(r[hMap.code_barang]).trim() === String(payload.code).trim();
const matchGudang = String(r[hMap.gudang]).trim() === String(payload.gudang).trim();

if (matchCode && matchGudang) {
const isIN = r[hMap.type] === 'IN';
// Ambil tanggal resmi dari form input, fallback ke log timestamp sistem
const rawDate = isIN
? (r[hMap.tanggal_penerimaan_barang] || r[hMap.timestamp])
: (r[hMap.tanggal_pengambilan_barang] || r[hMap.timestamp]);

list.push({
tx_id: r[hMap.tx_id] || '—',
tanggal: formatDate_(rawDate, false),
timestamp: formatDate_(r[hMap.timestamp], true),
type: r[hMap.type] || 'OUT',
nik: r[hMap.nik] || '—',
section: r[hMap.section] || '—',
qty: Number(r[hMap.qty]) || 0,
keterangan: r[hMap.keterangan] || '',
stok_before: Number(r[hMap.stok_before]) || 0,
stok_after: Number(r[hMap.stok_after]) || 0
});
}
});

// Urutkan riwayat dari yang paling lama ke yang paling baru (kronologis kartu kendali)
list.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

return {
success: true,
list: list
};

} catch (err) {
return {
success: false,
message: 'Gagal memproses kartu bincard: ' + err.toString()
};
}
}
/**
* ╔══════════════════════════════════════════════════════════════════╗
* ║ PANDUAN SETUP LAPORAN HARIAN ║
* ╚══════════════════════════════════════════════════════════════════╝
*
* LANGKAH 1: Deploy Web App (sama seperti sebelumnya)
* - Deploy → New Deployment → Web App
* - Execute as: Me | Who has access: Anyone
*
* LANGKAH 2: Aktifkan Telegram dari Panel Admin
* - Buka aplikasi → Admin → Telegram
* - Isi Bot Token & Chat ID → Simpan → Test Kirim
*
* LANGKAH 3: Setup Trigger Laporan Harian (WAJIB, sekali saja!)
* - Buka Apps Script Editor
* - Pilih fungsi: setupDailyTrigger
* - Klik tombol ▶ Run
* - Izinkan permission yang diminta
* - Telegram akan menerima konfirmasi "TRIGGER HARIAN AKTIF"
*
* LANGKAH 4: Verifikasi
* - Editor → Triggers (jam/lonceng icon di sidebar kiri)
* - Pastikan ada trigger: sendDailyStockReport | Time-driven | Day timer | 7am-8am
*
* UNTUK DISABLE LAPORAN HARIAN:
* - Jalankan fungsi removeDailyTrigger() dari Editor
*
* ╔══════════════════════════════════════════════════════════════════╗
* ║ YANG DIKIRIM KE TELEGRAM ║
* ╚══════════════════════════════════════════════════════════════════╝
*
* A. Saat ada mutasi (real-time):
* 1. Pesan detail mutasi (TX ID, operator, gudang, semua item)
* 2. Alert kritis per item jika stok di bawah minimum
*
* B. Setiap hari jam 07:00 WIB (otomatis):
* 1. Pesan ringkasan stok semua gudang
* 2. Daftar item stok kritis (jika ada)
* 3. File CSV stok lengkap semua gudang (attachment dokumen)
* 4. Ringkasan mutasi kemarin (total IN/OUT)
*/