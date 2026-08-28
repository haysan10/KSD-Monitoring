/**
 * KSD KILN Project Monitoring — Multi-Project Edition
 * Google Apps Script Backend Engine - Version 3.2 (Enterprise Custom Token Auth)
 * Berbasis ECMAScript 2023 & Google Spreadsheet Database
 */

const SPREADSHEET_ID = ""; // Kosongkan jika script terikat ke spreadsheet terkait [cite: 1, 2]

/**
 * Mendapatkan objek spreadsheet aktif
 */
function getDb() {
  if (SPREADSHEET_ID && SPREADSHEET_ID !== "") {
    return SpreadsheetApp.openById(SPREADSHEET_ID); // [cite: 2]
  }
  return SpreadsheetApp.getActiveSpreadsheet(); // [cite: 3]
}

/**
 * Render halaman web utama
 */
function doGet() {
  const template = HtmlService.createTemplateFromFile('index'); // [cite: 3]
  return template.evaluate()
    .setTitle('KSD KILN Multi-Project Monitoring')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1'); // [cite: 4]
}

/**
 * Helper Enkripsi SHA-256 untuk Kata Sandi
 */
function computeSHA256(input) {
  const rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_2_256 || Utilities.DigestAlgorithm.SHA_256, input, Utilities.Charset.UTF_8); // [cite: 5]
  let output = ""; // [cite: 6]
  for (let i = 0; i < rawHash.length; i++) {
    let byteVal = rawHash[i]; // [cite: 6]
    if (byteVal < 0) byteVal += 256; // [cite: 7]
    let byteString = byteVal.toString(16); // [cite: 7]
    if (byteString.length == 1) byteString = "0" + byteString; // [cite: 7]
    output += byteString; // [cite: 8]
  }
  return output; // [cite: 8]
}

/**
 * Inisialisasi Database Multi-Project & Enkripsi Pengguna Bawaan
 */
function setupDatabase() {
  const db = getDb(); // [cite: 9]
  
  // 1. Tambahkan/Inisialisasi sheet-sheet utama jika belum ada, atau update headernya
  const mainSheets = {
    "Projects": ["Project_ID", "Name", "Area", "StartDate", "Status", "CreatedBy", "Timestamp"],
    "Users": ["Username", "Name", "Role", "Password_Hash", "Session_Token", "Token_Expiry", "Must_Change_Password"],
    "IAC": ["Project_ID", "IAC_ID", "Title", "Weight"],
    "SubJobdesk": ["Project_ID", "Sub_ID", "IAC_ID", "Title", "Contractor", "Weight"],
    "DailyProgress": ["Project_ID", "Date", "Sub_ID", "Progress", "Remarks", "InputBy", "Timestamp", "Photo_URL"],
    "Validation": ["Project_ID", "Type", "User", "Timestamp", "Status", "Comment"],
    "Alerts": ["Project_ID", "Alert_ID", "Type", "Item_ID", "Details", "Timestamp"]
  };

  for (let sheetName in mainSheets) {
    let sheet = db.getSheetByName(sheetName);
    if (!sheet) {
      sheet = db.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, mainSheets[sheetName].length).setValues([mainSheets[sheetName]]);
      sheet.getRange(1, 1, 1, mainSheets[sheetName].length).setFontWeight("bold").setBackground("#f1f5f9");
    }
  }

  // Tambahkan user default jika kosong
  let usersSheet = db.getSheetByName("Users");
  if (usersSheet.getLastRow() <= 1) {
    const defaultAdminHash = computeSHA256("admin123");
    const defaultManagerHash = computeSHA256("manager123");
    usersSheet.appendRow(["admin@ksd.com", "Superadmin KSD", "superadmin", defaultAdminHash, "", "", "FALSE"]);
    usersSheet.appendRow(["manager@ksd.com", "Manager Lapangan", "manager", defaultManagerHash, "", "", "FALSE"]);
  }

  // 2. Tambah kolom baru V2 di akhir sheet existing
  const extensionsV2 = {
    "Projects": ["Planned_Finish_Date", "Shutdown_Type", "Baseline_Locked", "Overall_Status_Gate"],
    "IAC": ["Phase", "Discipline", "Critical_Flag", "Criticality_Level", "Area_Tag"],
    "SubJobdesk": ["Area_Detail", "Discipline", "Planned_Start", "Planned_Finish", "Predecessor_Sub_ID", "Critical_Flag", "Milestone_Flag"],
    "DailyProgress": ["Shift", "Manpower_Actual", "Delay_Reason_Code", "Constraint_Description", "Recovery_Action"],
    "Material_Log": ["Reported_By", "Timestamp"],
    "Manpower_Log": ["Reported_By", "Timestamp"]
  };

  for (let sheetName in extensionsV2) {
    let sheet = db.getSheetByName(sheetName);
    if (sheet) {
      let headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).getValues()[0];
      let newCols = extensionsV2[sheetName];
      for (let i = 0; i < newCols.length; i++) {
        if (headers.indexOf(newCols[i]) === -1) {
          let lastCol = sheet.getLastColumn();
          sheet.getRange(1, lastCol + 1).setValue(newCols[i]).setFontWeight("bold").setBackground("#f1f5f9");
        }
      }
    }
  }

  // 3. Pembuatan sheet baru V2 (BaselineSchedule, Dependencies, Material_Log, Manpower_Log, Lessons_Learned)
  const newSheetsV2 = {
    "BaselineSchedule": ["Project_ID", "Sub_ID", "Planned_Start", "Planned_Finish", "Planned_Duration", "Planned_%_by_Date"],
    "Dependencies": ["Project_ID", "Sub_ID", "Predecessor_Sub_ID"],
    "Material_Log": ["Project_ID", "Sub_ID", "Material_Code", "Qty_Planned", "Qty_Issued", "Qty_Consumed", "Qty_Return", "Shortage", "Reported_By", "Timestamp"],
    "Manpower_Log": ["Project_ID", "Sub_ID", "Date", "Contractor", "Shift", "Manpower_Actual", "Manhours_Actual", "Reported_By", "Timestamp"],
    "Lessons_Learned": ["Project_ID", "Category", "Issue", "Root_Cause", "Impact", "Recommendation"]
  };

  for (let sheetName in newSheetsV2) {
    let sheet = db.getSheetByName(sheetName);
    if (!sheet) {
      sheet = db.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, newSheetsV2[sheetName].length).setValues([newSheetsV2[sheetName]]);
      sheet.getRange(1, 1, 1, newSheetsV2[sheetName].length).setFontWeight("bold").setBackground("#f1f5f9");
    }
  }

  return "Database V2 Update Berhasil: Sheet & Kolom baru ditambahkan tanpa merusak data V1.";
}


/**
 * 🔐 ENDPOINT 1: Verifikasi Kredensial Login
 */
function verifyLogin(username, password) {
  try {
    const db = getDb(); // [cite: 23]
    let sheet = db.getSheetByName("Users"); // [cite: 24]
    if (!sheet) {
      setupDatabase(); // [cite: 24]
      sheet = db.getSheetByName("Users"); // [cite: 24]
    }
    const values = sheet.getDataRange().getValues(); // [cite: 25]
    const inputHash = computeSHA256(password); // [cite: 25]
    for (let i = 1; i < values.length; i++) {
      const dbUser = String(values[i][0]).toLowerCase(); // [cite: 26]
      const inputUser = String(username).toLowerCase(); // [cite: 27]

      if (dbUser === inputUser) {
        const dbHash = values[i][3]; // [cite: 27]
        if (dbHash === inputHash) { // [cite: 28]
          const token = Utilities.getUuid(); // [cite: 28]
          const expiryDate = new Date(); // [cite: 29]
          expiryDate.setHours(expiryDate.getHours() + 2); // [cite: 29]
          const expiryStr = expiryDate.toISOString(); // [cite: 29]

          sheet.getRange(i + 1, 5).setValue(token); // [cite: 29]
          sheet.getRange(i + 1, 6).setValue(expiryStr); // [cite: 29]
          const mustChange = String(values[i][6]).toUpperCase() === "TRUE"; // [cite: 30]

          const sessionData = {
            username: values[i][0],
            name: values[i][1],
            role: values[i][2]
          };
          CacheService.getScriptCache().put(token, JSON.stringify(sessionData), 7200);

          return {
            success: true,
            token: token,
            username: values[i][0],
            name: values[i][1],
            role: values[i][2],
            mustChange: mustChange
          }; // [cite: 30]
        }
      }
    }
    return { success: false, error: "Username atau password salah!" }; // [cite: 31, 32]
  } catch(e) {
    return { success: false, error: e.toString() }; // [cite: 32]
  }
}

/**
 * 🛡️ HELPER: Validasi Token & Hak Akses Sesi Aktif
 */
function validateSession(token, allowedRoles = []) {
  if (!token || token === "") {
    throw new Error("UNAUTHORIZED"); // [cite: 33]
  }
  
  // -- TAHAP 1: CACHE SERVICE OPTIMIZATION --
  const cached = CacheService.getScriptCache().get(token);
  if (cached) {
    const user = JSON.parse(cached);
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      throw new Error("FORBIDDEN");
    }
    return user;
  }
  // -----------------------------------------

  const db = getDb(); // [cite: 34]
  let sheet = db.getSheetByName("Users"); // [cite: 34]
  if (!sheet) {
    setupDatabase(); // [cite: 34]
    sheet = db.getSheetByName("Users"); // [cite: 34]
  }
  const values = sheet.getDataRange().getValues(); // [cite: 35]
  const now = new Date(); // [cite: 35]
  for (let i = 1; i < values.length; i++) {
    const dbToken = values[i][4]; // [cite: 36]
    if (dbToken === token) { // [cite: 37]
      const expiryStr = values[i][5]; // [cite: 37]
      if (!expiryStr || expiryStr === "") {
        throw new Error("SESSION_EXPIRED"); // [cite: 38]
      }
      const expiryDate = new Date(expiryStr); // [cite: 39]
      if (now > expiryDate) {
        throw new Error("SESSION_EXPIRED"); // [cite: 40]
      }

      const userRole = values[i][2]; // [cite: 41]
      if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        throw new Error("FORBIDDEN"); // [cite: 42]
      }

      return {
        username: values[i][0],
        name: values[i][1],
        role: userRole
      }; // [cite: 43]
    }
  }
  throw new Error("UNAUTHORIZED"); // [cite: 44]
}

/**
 * 🔐 ENDPOINT 2: Logout
 */
function logout(token) {
  try {
    // BUG-22 FIX: Hapus token dari CacheService agar sesi benar-benar tidak valid
    try { CacheService.getScriptCache().remove(token); } catch(ce) {}
    const db = getDb();
    const sheet = db.getSheetByName("Users");
    const values = sheet.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {
      if (values[i][4] === token) {
        sheet.getRange(i + 1, 5).setValue("");
        sheet.getRange(i + 1, 6).setValue("");
        break;
      }
    }
    return { success: true };
  } catch(e) {
    return { success: false, error: e.toString() };
  }
}

/**
 * 🔐 ENDPOINT 3: Force Change Password
 */
function changePassword(token, newPassword) {
  try {
    const user = validateSession(token);
    // BUG-23 FIX: Hapus cache agar token lama tidak bisa dipakai setelah ganti password
    try { CacheService.getScriptCache().remove(token); } catch(ce) {}
    const db = getDb();
    const sheet = db.getSheetByName("Users");
    const values = sheet.getDataRange().getValues();
    const newHash = computeSHA256(newPassword);
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === user.username) {
        sheet.getRange(i + 1, 4).setValue(newHash);
        sheet.getRange(i + 1, 7).setValue("FALSE");
        break;
      }
    }
    return { success: true };
  } catch(e) {
    return { success: false, error: e.toString() };
  }
}

/**
 * 👑 ENDPOINT 4: Superadmin membuat User baru
 */
function createUser(token, username, name, role, initialPassword) {
  try {
    validateSession(token, ["superadmin"]); // [cite: 54]
    const db = getDb(); // [cite: 55]
    const sheet = db.getSheetByName("Users"); // [cite: 55]
    const values = sheet.getDataRange().getValues(); // [cite: 55]
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][0]).toLowerCase() === username.toLowerCase()) {
        return { success: false, error: "Username sudah terdaftar!" }; // [cite: 56, 57]
      }
    }

    const passHash = computeSHA256(initialPassword); // [cite: 57]
    sheet.appendRow([username, name, role, passHash, "", "", "TRUE"]); // [cite: 57]
    return { success: true }; // [cite: 58]
  } catch (e) {
    return { success: false, error: e.message === "SESSION_EXPIRED" || e.message === "UNAUTHORIZED" ? "Sesi Anda kedaluwarsa. Silakan login kembali." : e.toString() }; // [cite: 59, 60]
  }
}

/**
 * 👑 ENDPOINT 5: Superadmin Reset Password User
 */
function resetPassword(token, targetUsername, newPassword) {
  try {
    validateSession(token, ["superadmin"]); // [cite: 60]
    const db = getDb(); // [cite: 61]
    const sheet = db.getSheetByName("Users"); // [cite: 61]
    const values = sheet.getDataRange().getValues(); // [cite: 61]
    const newHash = computeSHA256(newPassword); // [cite: 61]
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === targetUsername) {
        sheet.getRange(i + 1, 4).setValue(newHash); // [cite: 62]
        sheet.getRange(i + 1, 7).setValue("TRUE"); // [cite: 63]
        return { success: true }; // [cite: 63]
      }
    }
    return { success: false, error: "User tidak ditemukan!" }; // [cite: 64]
  } catch(e) {
    return { success: false, error: e.toString() }; // [cite: 65]
  }
}

/**
 * 👑 ENDPOINT 6: Superadmin menarik daftar Users
 */
function getUsersList(token) {
  try {
    validateSession(token, ["superadmin"]); // [cite: 66]
    const db = getDb(); // [cite: 67]
    const sheet = db.getSheetByName("Users"); // [cite: 67]
    const values = sheet.getDataRange().getValues(); // [cite: 67]
    const users = []; // [cite: 67]
    for (let i = 1; i < values.length; i++) {
      users.push({
        username: values[i][0],
        name: values[i][1],
        role: values[i][2],
        mustChange: String(values[i][6]).toUpperCase() === "TRUE"
      }); // [cite: 68]
    }
    
    return JSON.parse(JSON.stringify({ success: true, users: users }));
  } catch (error) {
    if (error.message === "UNAUTHORIZED" || error.message === "SESSION_EXPIRED") {
      return { success: false, error: "SESSION_EXPIRED" };
    }
    return { success: false, error: error.toString() };
  }
}

/**
 * Menyimpan file foto yang diunggah ke Google Drive
 */
function savePhotoToDrive(photoBase64, photoName) {
  try {
    const folders = DriveApp.getFoldersByName("KSD_Project_Photos"); // [cite: 95]
    let folder; // [cite: 96]
    if (folders.hasNext()) {
      folder = folders.next(); // [cite: 96]
    } else {
      folder = DriveApp.createFolder("KSD_Project_Photos"); // [cite: 97]
    }

    const contentType = photoBase64.substring(5, photoBase64.indexOf(";")); // [cite: 97]
    const base64Data = photoBase64.substring(photoBase64.indexOf(",") + 1); // [cite: 198]
    const decoded = Utilities.base64Decode(base64Data); // [cite: 98]
    const blob = Utilities.newBlob(decoded, contentType, photoName); // [cite: 98]

    const file = folder.createFile(blob); // [cite: 98]
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); // [cite: 99]
    return file.getUrl();
  } catch (e) {
    Logger.log("Gagal mengunggah foto ke Google Drive: " + e.toString()); // [cite: 99]
    return ""; // [cite: 100]
  }
}

/**
 * Mendapatkan seluruh daftar proyek
 */
function getProjectsList() {
  try {
    const db = getDb(); // [cite: 100]
    if (!db.getSheetByName("Projects")) {
      setupDatabase(); // [cite: 101]
    }
    const sheet = db.getSheetByName("Projects"); // [cite: 101]
    const values = sheet.getDataRange().getValues(); // [cite: 102]
    const projects = [];
    for (let i = 1; i < values.length; i++) {
      projects.push({
        id: values[i][0],
        name: values[i][1],
        area: values[i][2],
        startDate: formatDate(values[i][3]), // [cite: 102]
        status: values[i][4]
      });
    }
    return projects; // [cite: 103]
  } catch(e) {
    return []; // [cite: 103]
  }
}


/**
 * 📝 ENDPOINT: Ambil seluruh data satu proyek aktif (dipanggil oleh triggerSync())
 * Mengembalikan semua data yang dibutuhkan frontend: IAC, Sub, Progress, Validasi,
 * Alert, Baseline, Dependencies, dan computed progress.
 */
function getProjectData(token, projectId) {
  try {
    const sessionUser = validateSession(token);
    const db = getDb();

    if (!db.getSheetByName("Projects")) {
      setupDatabase();
    }

    const projects = getProjectsList();
    if (projects.length === 0) {
      return { success: false, error: "Tidak ada proyek terdaftar." };
    }

    const activeProjectId = projectId || projects[0].id;
    const projectInfo = projects.find(p => p.id === activeProjectId) || projects[0];

    const iacSheet = db.getSheetByName("IAC").getDataRange().getValues();
    const subSheet = db.getSheetByName("SubJobdesk").getDataRange().getValues();
    const progressSheet = db.getSheetByName("DailyProgress").getDataRange().getValues();
    const validationSheet = db.getSheetByName("Validation").getDataRange().getValues();

    // Baca BaselineSchedule & Dependencies (optional — toleran jika belum ada)
    const depsSheetRaw = db.getSheetByName("Dependencies") ? db.getSheetByName("Dependencies").getDataRange().getValues() : [];
    const baselineSheetRaw = db.getSheetByName("BaselineSchedule") ? db.getSheetByName("BaselineSchedule").getDataRange().getValues() : [];

    const iacs = [];
    for (let i = 1; i < iacSheet.length; i++) {
      if (iacSheet[i][0] === activeProjectId) {
        iacs.push({
          id: iacSheet[i][1],
          title: iacSheet[i][2],
          weight: parseFloat(iacSheet[i][3]) || 0
        });
      }
    }

    const subs = [];
    for (let i = 1; i < subSheet.length; i++) {
      if (subSheet[i][0] === activeProjectId) {
        subs.push({
          id: subSheet[i][1],
          iacId: subSheet[i][2],
          title: subSheet[i][3],
          contractor: subSheet[i][4],
          weight: parseFloat(subSheet[i][5]) || 0
        });
      }
    }

    const progress = [];
    for (let i = 1; i < progressSheet.length; i++) {
      if (progressSheet[i][0] === activeProjectId) {
        progress.push({
          date: formatDate(progressSheet[i][1]),
          subId: progressSheet[i][2],
          progress: parseFloat(progressSheet[i][3]) || 0,
          remarks: progressSheet[i][4],
          inputBy: progressSheet[i][5],
          timestamp: progressSheet[i][6] instanceof Date ? progressSheet[i][6].toISOString() : String(progressSheet[i][6] || ""),
          photoUrl: progressSheet[i][7] || ""
        });
      }
    }
    progress.sort((a, b) => new Date(a.date) - new Date(b.date));

    const validations = [];
    for (let i = 1; i < validationSheet.length; i++) {
      if (validationSheet[i][0] === activeProjectId) {
        validations.push({
          type: validationSheet[i][1],
          user: validationSheet[i][2],
          timestamp: validationSheet[i][3] instanceof Date ? validationSheet[i][3].toISOString() : String(validationSheet[i][3] || ""),
          status: validationSheet[i][4],
          comment: validationSheet[i][5]
        });
      }
    }

    // dependencies[]: { subId, predecessorId, critical_flag }
    const dependencies = [];
    for (let i = 1; i < depsSheetRaw.length; i++) {
      if (depsSheetRaw[i][0] === activeProjectId) {
        dependencies.push({
          subId: depsSheetRaw[i][1],
          predecessorId: depsSheetRaw[i][2],
          critical_flag: Boolean(depsSheetRaw[i][3])
        });
      }
    }

    // baseline[]: { subId, plannedStart, plannedFinish, plannedDuration }
    const baseline = [];
    for (let i = 1; i < baselineSheetRaw.length; i++) {
      if (baselineSheetRaw[i][0] === activeProjectId) {
        baseline.push({
          subId: baselineSheetRaw[i][1],
          plannedStart: baselineSheetRaw[i][2] instanceof Date ? baselineSheetRaw[i][2].toISOString().slice(0, 10) : String(baselineSheetRaw[i][2] || ""),
          plannedFinish: baselineSheetRaw[i][3] instanceof Date ? baselineSheetRaw[i][3].toISOString().slice(0, 10) : String(baselineSheetRaw[i][3] || ""),
          plannedDuration: baselineSheetRaw[i][4]
        });
      }
    }

    const computedData = calculateProgress(iacs, subs, progress, projectInfo);
    
    const alertsSheetObj = db.getSheetByName("Alerts");
    const alertsSheetValues = alertsSheetObj ? alertsSheetObj.getDataRange().getValues() : [[]];
    const alerts = runAlertAnalysis(activeProjectId, computedData, progress, projectInfo, alertsSheetValues, false, baselineSheetRaw);

    // Tentukan status "Completed": overallProgress===100 DAN ada superadmin_finalize Approved
    const isCompleted = computedData.overallProgress === 100 &&
                        validations.some(v => v.type === "superadmin_finalize" && v.status === "Approved");

    return JSON.parse(JSON.stringify({
      success: true,
      projects: projects,
      activeProjectId: activeProjectId,
      currentUser: sessionUser,
      config: {
        projectName: projectInfo.name,
        area: projectInfo.area,
        startDatePlanned: projectInfo.startDate,
        status: isCompleted ? "Completed" : projectInfo.status
      },
      iacs: computedData.iacs,
      subs: computedData.subs,
      dailyProgress: progress,
      validations: validations,
      alerts: alerts,
      dependencies: dependencies,
      baseline: baseline,
      overallProgress: computedData.overallProgress,
      actualStartDate: projectInfo.startDate,
      actualDuration: computedData.actualDuration
    }));
  } catch (error) {
    if (error.message === "UNAUTHORIZED" || error.message === "SESSION_EXPIRED") {
      return { success: false, error: "SESSION_EXPIRED" };
    }
    return { success: false, error: error.toString() };
  }
}

/**
 * Membuat Project Baru
 */
function createNewProject(token, id, name, area, startDate) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const user = validateSession(token, ["superadmin"]); 
    const db = getDb(); 
    const sheet = db.getSheetByName("Projects"); 
    const data = sheet.getDataRange().getValues(); 
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === id) {
        return { success: false, error: `ID Project ${id} sudah terdaftar!` }; 
      }
    }
    sheet.appendRow([id, name, area, startDate, "In Progress", user.name, new Date().toISOString()]); 
    return { success: true }; 
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() }; 
  } finally {
    lock.releaseLock();
  }
}

/**
 * Menyimpan Konfigurasi Project Multi-Project
 */
function updateConfig(token, projectId, configData) {
  try {
    validateSession(token, ["superadmin"]); // [cite: 109]
    const db = getDb(); // [cite: 110]
    const sheet = db.getSheetByName("Projects"); // [cite: 110]
    const dataRange = sheet.getDataRange(); // [cite: 110]
    const values = dataRange.getValues(); // [cite: 110]
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === projectId) {
        sheet.getRange(i + 1, 2).setValue(configData.projectName); // [cite: 111]
        sheet.getRange(i + 1, 3).setValue(configData.area); // [cite: 112]
        sheet.getRange(i + 1, 4).setValue(configData.startDatePlanned); // [cite: 112]
        break;
      }
    }
    return { success: true }; // [cite: 112]
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() }; // [cite: 113]
  }
}

/**
 * Menambahkan data IAC baru
 */
function addIAC(token, projectId, id, title, weight) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    validateSession(token, ["superadmin"]); 
    const db = getDb(); 
    const sheet = db.getSheetByName("IAC"); 
    const data = sheet.getDataRange().getValues(); 
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === projectId && data[i][1] === id) {
        return { success: false, error: `ID IAC ${id} sudah terdaftar di proyek ini!` }; 
      }
    }
    sheet.appendRow([projectId, id, title, weight]); 
    return { success: true }; 
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() }; 
  } finally {
    lock.releaseLock();
  }
}

/**
 * Menambahkan SubJobdesk baru
 */
function addSubJobdesk(token, projectId, id, iacId, title, contractor, weight) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    validateSession(token, ["superadmin"]); 
    const db = getDb(); 
    const sheet = db.getSheetByName("SubJobdesk"); 
    const data = sheet.getDataRange().getValues(); 
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === projectId && data[i][1] === id) {
        return { success: false, error: `ID Sub-Jobdesk ${id} sudah terdaftar di proyek ini!` }; 
      }
    }
    sheet.appendRow([projectId, id, iacId, title, contractor, weight]); 
    return { success: true }; 
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() }; 
  } finally {
    lock.releaseLock();
  }
}

/**
 * 🛠️ SETUP BASELINE SCHEDULE & DEPENDENCIES
 */
function setupBaselineAndDependencies(token, projectId, subId, plannedStart, plannedFinish, predId, criticalFlag) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (e) {
    return { success: false, error: "Sistem sibuk diproses user lain. Coba lagi." };
  }
  
  try {
    validateSession(token);
    
    // Validasi & Sanitasi Input
    if (!subId || !subId.trim()) return { success: false, error: "Sub-Jobdesk ID tidak boleh kosong." };
    subId = subId.trim();
    if (!plannedStart || !/^\d{4}-\d{2}-\d{2}$/.test(plannedStart)) return { success: false, error: "Format Planned Start tidak valid." };
    if (!plannedFinish || !/^\d{4}-\d{2}-\d{2}$/.test(plannedFinish)) return { success: false, error: "Format Planned Finish tidak valid." };
    
    const startObj = new Date(plannedStart);
    const finishObj = new Date(plannedFinish);
    if (startObj > finishObj) return { success: false, error: "Planned Start tidak boleh melewati Planned Finish." };
    
    predId = String(predId || "").trim();
    criticalFlag = !!criticalFlag;
    
    const db = getDb();
    
    // Update BaselineSchedule
    const baseSheet = db.getSheetByName("BaselineSchedule");
    if (!baseSheet) return { success: false, error: "Sheet BaselineSchedule tidak ditemukan. Hubungi Admin." };
    
    const duration = Math.ceil((finishObj - startObj) / (1000 * 60 * 60 * 24)) + 1;
    const baseValues = baseSheet.getDataRange().getValues();
    let baseRowIndex = -1;
    for (let i = 1; i < baseValues.length; i++) {
      if (baseValues[i][0] === projectId && baseValues[i][1] === subId) {
        baseRowIndex = i + 1;
        break;
      }
    }
    
    if (baseRowIndex > -1) {
      baseSheet.getRange(baseRowIndex, 3).setValue(plannedStart);
      baseSheet.getRange(baseRowIndex, 4).setValue(plannedFinish);
      baseSheet.getRange(baseRowIndex, 5).setValue(duration);
    } else {
      baseSheet.appendRow([projectId, subId, plannedStart, plannedFinish, duration, ""]);
    }
    
    // Update Dependencies
    const depSheet = db.getSheetByName("Dependencies");
    if (!depSheet) return { success: false, error: "Sheet Dependencies tidak ditemukan." };
    
    const depValues = depSheet.getDataRange().getValues();
    let depRowIndex = -1;
    for (let i = 1; i < depValues.length; i++) {
      if (depValues[i][0] === projectId && depValues[i][1] === subId) {
        depRowIndex = i + 1;
        break;
      }
    }
    
    // Ensure header length for Critical_Flag
    if (depValues[0].length < 4) {
        depSheet.getRange(1, 4).setValue("Critical_Flag");
    }
    
    if (depRowIndex > -1) {
      depSheet.getRange(depRowIndex, 3).setValue(predId);
      depSheet.getRange(depRowIndex, 4).setValue(criticalFlag);
    } else {
      depSheet.appendRow([projectId, subId, predId, criticalFlag]);
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 🛠️ SETUP MATERIAL LOG
 */
function submitMaterialLog(token, projectId, subId, materialCode, qtyPlanned, qtyIssued, qtyConsumed, qtyReturn, shortage) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (e) {
    return { success: false, error: "Sistem sibuk diproses user lain. Coba lagi." };
  }
  
  try {
    const user = validateSession(token);
    if (!subId || !subId.trim() || !materialCode || !materialCode.trim()) {
      return { success: false, error: "Sub-Jobdesk ID dan Kode Material wajib diisi." };
    }
    
    const db = getDb();
    const sheet = db.getSheetByName("Material_Log");
    if (!sheet) return { success: false, error: "Sheet Material_Log tidak ditemukan." };
    
    sheet.appendRow([
      projectId, 
      subId.trim(), 
      materialCode.trim(), 
      parseFloat(qtyPlanned) || 0,
      parseFloat(qtyIssued) || 0,
      parseFloat(qtyConsumed) || 0,
      parseFloat(qtyReturn) || 0,
      parseFloat(shortage) || 0,
      user.name,
      new Date().toISOString()
    ]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 🛠️ SETUP MANPOWER LOG
 */
function submitManpowerLog(token, projectId, subId, dateStr, contractor, shift, manpowerCount, manhours) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (e) {
    return { success: false, error: "Sistem sibuk diproses user lain. Coba lagi." };
  }
  
  try {
    const user = validateSession(token);
    if (!subId || !subId.trim() || !dateStr) {
      return { success: false, error: "Sub-Jobdesk ID dan Tanggal wajib diisi." };
    }
    
    const db = getDb();
    const sheet = db.getSheetByName("Manpower_Log");
    if (!sheet) return { success: false, error: "Sheet Manpower_Log tidak ditemukan." };
    
    sheet.appendRow([
      projectId, 
      subId.trim(), 
      dateStr,
      String(contractor || "").trim(),
      String(shift || "").trim(),
      parseInt(manpowerCount, 10) || 0,
      parseFloat(manhours) || 0,
      user.name,
      new Date().toISOString()
    ]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 🛠️ SUBMIT LESSONS LEARNED
 */
function submitLessonsLearned(token, projectId, category, issue, rootCause, impact, recommendation) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (e) {
    return { success: false, error: "Sistem sibuk diproses user lain. Coba lagi." };
  }
  
  try {
    const user = validateSession(token);
    if (!category || !category.trim() || !issue || !issue.trim()) {
      return { success: false, error: "Kategori dan Isu/Kendala wajib diisi." };
    }
    
    const db = getDb();
    const sheet = db.getSheetByName("Lessons_Learned");
    if (!sheet) return { success: false, error: "Sheet Lessons_Learned tidak ditemukan." };
    
    sheet.appendRow([
      projectId, 
      String(category).trim(),
      String(issue).trim(),
      String(rootCause || "").trim(),
      String(impact || "").trim(),
      String(recommendation || "").trim()
    ]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 🛠️ INPUT PROGRES HARIAN (Sisi Server Idempotent & Validasi Logika Kumulatif)
 */
function submitDailyProgress(token, projectId, dateStr, subId, progress, remarks, photoBase64, photoName, shift, manpower, delayCode, constraint, recovery) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (e) {
    return { success: false, error: "Sistem sibuk diproses user lain. Coba lagi." };
  }
  try {
    const user = validateSession(token);
    
    // T2-3b: Input Validation & Sanitization
    progress = parseFloat(progress);
    if (isNaN(progress) || progress < 0 || progress > 100) {
      return { success: false, error: "Progress harus berupa angka antara 0 hingga 100." };
    }
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return { success: false, error: "Format tanggal tidak valid." };
    }
    remarks = String(remarks || "").trim();
    shift = String(shift || "").trim();
    manpower = String(manpower || "").trim();
    delayCode = String(delayCode || "").trim();
    constraint = String(constraint || "").trim();
    recovery = String(recovery || "").trim();
    
    const db = getDb();
    
    // DEPENDENCY CHECK
    const depsSheet = db.getSheetByName("Dependencies");
    if (depsSheet) {
      const depsData = depsSheet.getDataRange().getValues();
      let predId = null;
      for (let i = 1; i < depsData.length; i++) {
        if (depsData[i][0] === projectId && depsData[i][1] === subId) {
          predId = depsData[i][2];
          break;
        }
      }
      if (predId) {
        const progSheet = db.getSheetByName("DailyProgress");
        const progData = progSheet.getDataRange().getValues();
        let predMax = 0;
        for (let j = 1; j < progData.length; j++) {
          if (progData[j][0] === projectId && progData[j][2] === predId) {
            const p = parseFloat(progData[j][3]) || 0;
            if (p > predMax) predMax = p;
          }
        }
        if (predMax < 100) {
          return { success: false, error: `Predecessor (${predId}) belum 100% selesai (saat ini ${predMax}%). Selesaikan predecessor terlebih dahulu.` };
        }
      }
    }
    
    const sheet = db.getSheetByName("DailyProgress");
    const values = sheet.getDataRange().getValues();
    const reporter = user.name;
    const timestamp = new Date().toISOString();

    let maxOtherProgress = 0;
    let rowIndexToUpdate = -1;

    for (let i = 1; i < values.length; i++) {
      const rowProjId = values[i][0];
      const rowDateStr = formatDate(values[i][1]);
      const rowSubId = values[i][2];
      const rowProg = parseFloat(values[i][3]) || 0;

      if (rowProjId === projectId && rowSubId === subId) {
        if (rowDateStr === dateStr) {
          rowIndexToUpdate = i + 1;
        } else {
          if (rowProg > maxOtherProgress) maxOtherProgress = rowProg;
        }
      }
    }

    if (progress < maxOtherProgress) {
      return { 
        success: false, 
        error: `Validasi Gagal: Sub-pekerjaan ini sudah memiliki pencapaian ${maxOtherProgress}% di tanggal lain. Progres tidak boleh diturunkan!` 
      };
    }

    let photoUrl = "";
    if (photoBase64 && photoBase64 !== "") {
      photoUrl = savePhotoToDrive(photoBase64, photoName || `KSD_${subId}_${dateStr}.png`);
    }

    if (rowIndexToUpdate !== -1) {
      const finalPhotoUrl = (photoUrl !== "") ? photoUrl : (values[rowIndexToUpdate - 1][7] || "");
      const rowData = [
        progress,
        remarks,
        reporter,
        timestamp,
        finalPhotoUrl,
        shift || "",
        manpower || "",
        delayCode || "",
        constraint || "",
        recovery || ""
      ];
      // T2-2: Batch Write Optimization
      sheet.getRange(rowIndexToUpdate, 4, 1, 10).setValues([rowData]);
    } else {
      sheet.appendRow([projectId, dateStr, subId, progress, remarks, reporter, timestamp, photoUrl, shift || "", manpower || "", delayCode || "", constraint || "", recovery || ""]);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  }
}

/**
 * Alur Kerja Validasi Multi-Project
 */
function submitValidation(token, projectId, type, status, comment) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const user = validateSession(token, ["superadmin"]); 
    
    // T2-3b: Input Validation & Sanitization
    if (!["Approved", "Rejected"].includes(status)) {
      return { success: false, error: "Status validasi tidak valid." };
    }
    comment = String(comment || "").trim();
    
    const db = getDb();
    const sheet = db.getSheetByName("Validation"); 
    const timestamp = new Date().toISOString(); 
    
    sheet.appendRow([projectId, type, user.name, timestamp, status, comment]); 
    return { success: true }; 
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() }; 
  } finally {
    lock.releaseLock();
  }
}

/**
 * Helper memformat objek Date menjadi YYYY-MM-DD
 * BUG-18 FIX: Gunakan Utilities.formatDate agar timezone-safe (tidak off-by-one di UTC+7)
 */
function formatDate(dateVal) {
  if (!dateVal) return "";
  // Jika sudah string format YYYY-MM-DD, kembalikan langsung
  if (typeof dateVal === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateVal)) return dateVal;
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return "";
  try {
    return Utilities.formatDate(d, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  } catch(e) {
    // Fallback jika dipanggil di luar GAS context (tes)
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }
}

/**
 * 📊 FUNGSI MATEMATIKA UTAMA: Menghitung Weighted Progress Terbobot
 */
function calculateProgress(iacs, subs, progress, projectInfo) {
  const latestSubProgress = {}; // [cite: 142]
  let latestProgressDate = null; // [cite: 143]

  progress.sort((a, b) => new Date(a.date) - new Date(b.date)); // [cite: 143]
  progress.forEach(p => {
    latestSubProgress[p.subId] = p.progress; // [cite: 144]
    if (!latestProgressDate || new Date(p.date) > new Date(latestProgressDate)) {
      latestProgressDate = p.date; // [cite: 144]
    }
  });

  const startPlanned = new Date(projectInfo.startDate); // [cite: 145]
  const endCompare = latestProgressDate ? new Date(latestProgressDate) : new Date(); // [cite: 145]
  const timeDiff = Math.max(0, endCompare - startPlanned); // [cite: 146]
  const actualDuration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // [cite: 146]
  const iacProgressMap = {}; // [cite: 147]
  const processedSubs = subs.map(sub => {
    const currentProg = latestSubProgress[sub.id] || 0; // [cite: 147]
    return {
      ...sub,
      currentProgress: currentProg
    };
  });

  // T2-2: O(N) Lookup Map Optimization
  const subsByIac = {};
  processedSubs.forEach(s => {
    if (!subsByIac[s.iacId]) subsByIac[s.iacId] = [];
    subsByIac[s.iacId].push(s);
  });

  iacs.forEach(iac => {
    const relatedSubs = subsByIac[iac.id] || [];
    let weightedSum = 0; // [cite: 148]
    let totalWeightUsed = 0; // [cite: 148]

    relatedSubs.forEach(s => {
      weightedSum += (s.currentProgress * (s.weight / 100)); // [cite: 148]
      totalWeightUsed += s.weight; // [cite: 148]
    });

    const iacProg = totalWeightUsed > 0 ? (weightedSum * (100 / totalWeightUsed)) : 0; // [cite: 148]
    iacProgressMap[iac.id] = Math.min(100, Math.max(0, iacProg)); // [cite: 148]
  });

  let overallProgress = 0; // [cite: 149]
  let totalIacWeight = 0; // [cite: 149]
  
  const processedIacs = iacs.map(iac => {
    const prog = iacProgressMap[iac.id] || 0; // [cite: 149]
    overallProgress += (prog * (iac.weight / 100)); // [cite: 149]
    totalIacWeight += iac.weight; // [cite: 149]
    return {
      ...iac,
      currentProgress: Math.round(prog * 100) / 100
    };
  });

  if (totalIacWeight > 0) {
    overallProgress = (overallProgress * (100 / totalIacWeight)); // [cite: 150]
  }
  overallProgress = Math.min(100, Math.round(overallProgress * 100) / 100); // [cite: 151]
  return {
    iacs: processedIacs,
    subs: processedSubs,
    overallProgress: overallProgress,
    actualDuration: actualDuration
  }; // [cite: 152]
}

/**
 * 🚨 FUNGSI ANALISIS ALERT UTAMA: Log Otomatis Stuck & Delay Risk Proyek
 */
function runAlertAnalysis(projectId, computed, progress, projectInfo, alertsSheetValues, saveToDb = false, baselineDataAll = null) {
  const alerts = [];
  const today = new Date();
  const db = getDb();
  
  let baselineData = baselineDataAll;
  if (!baselineData) {
    const baselineSheet = db.getSheetByName("BaselineSchedule");
    baselineData = baselineSheet ? baselineSheet.getDataRange().getValues() : [];
  }
  
  const subProgressHistory = {};
  progress.forEach(p => {
    if (!subProgressHistory[p.subId]) subProgressHistory[p.subId] = [];
    subProgressHistory[p.subId].push({ date: new Date(p.date), prog: p.progress });
  });

  for (let subId in subProgressHistory) {
    const history = subProgressHistory[subId];
    history.sort((a, b) => b.date - a.date);
    const latestProg = history[0].prog;
    
    let plannedProg = 0;
    if (baselineData.length > 1) {
       for (let i = 1; i < baselineData.length; i++) {
         if (baselineData[i][0] === projectId && baselineData[i][1] === subId) {
            const plannedStart = new Date(baselineData[i][2]);
            const plannedFinish = new Date(baselineData[i][3]);
            if (!isNaN(plannedStart) && !isNaN(plannedFinish)) {
               const totalDuration = plannedFinish.getTime() - plannedStart.getTime();
               const elapsed = today.getTime() - plannedStart.getTime();
               if (elapsed <= 0) plannedProg = 0;
               else if (elapsed >= totalDuration) plannedProg = 100;
               else plannedProg = Math.round((elapsed / totalDuration) * 100);
            }
            break;
         }
       }
    }

    if (latestProg < plannedProg - 10 && latestProg < 100) {
       alerts.push({
         id: `ALERT-DELAY-${subId}`,
         type: "delay_risk",
         itemId: subId,
         details: `Progres aktual (${latestProg}%) tertinggal >10% dari Baseline Target (${plannedProg}%).`,
         timestamp: new Date().toISOString()
       });
    }

    if (history.length > 0 && latestProg < 100) {
      const daysSinceLastProgress = Math.floor((today - history[0].date) / (1000 * 60 * 60 * 24));
      if (daysSinceLastProgress >= 3) {
        alerts.push({
          id: `ALERT-STUCK-${subId}`,
          type: "stagnant",
          itemId: subId,
          details: `Tidak ada pergerakan progres selama ${daysSinceLastProgress} hari terakhir.`,
          timestamp: new Date().toISOString()
        });
      }
    }
  }

  return alerts;
}

// ============ MODUL BARU: CASTABLE INSPECTION (Tambahan, tidak mengubah kode existing) ============

/**
 * A. Inisialisasi Database Castable & Seed Data (Idempotent)
 */
function ensureCastableSheets() {
  const db = getDb();
  
  // 1. Castable_Kategori
  let sheetKat = db.getSheetByName("Castable_Kategori");
  if (!sheetKat) {
    sheetKat = db.insertSheet("Castable_Kategori");
    const katData = [
      ["Kategori_ID", "Nama_Kategori"],
      ["K01", "Castable Preheater"],
      ["K02", "Castable Kiln-Cooler"]
    ];
    sheetKat.getRange(1, 1, katData.length, katData[0].length).setValues(katData);
    sheetKat.getRange(1, 1, 1, katData[0].length).setFontWeight("bold").setBackground("#f1f5f9");
  }

  // 2. Castable_DetailArea
  let sheetDet = db.getSheetByName("Castable_DetailArea");
  if (!sheetDet) {
    sheetDet = db.insertSheet("Castable_DetailArea");
    const detData = [
      ["Kategori_ID", "Detail_ID", "Nama_Detail"],
      ["K01", "D01", "Lantai 2"],
      ["K01", "D02", "Lantai 3"],
      ["K01", "D03", "Lantai 4"],
      ["K01", "D04", "Lantai 5"],
      ["K01", "D05", "Lantai 6"],
      ["K01", "D06", "Lantai 7"],
      ["K01", "D07", "Lantai 8"],
      ["K02", "D08", "Grate 1"],
      ["K02", "D09", "Grate 2"],
      ["K02", "D10", "KILN"],
      ["K02", "D11", "TAD"]
    ];
    sheetDet.getRange(1, 1, detData.length, detData[0].length).setValues(detData);
    sheetDet.getRange(1, 1, 1, detData[0].length).setFontWeight("bold").setBackground("#f1f5f9");
  }

  // 3. Castable_TypeMaterial
  let sheetType = db.getSheetByName("Castable_TypeMaterial");
  if (!sheetType) {
    sheetType = db.insertSheet("Castable_TypeMaterial");
    const typeData = [
      ["Type_ID", "Nama_Type", "Densitas"],
      ["T01", "Refgun 165 SIC", 2.20]
    ];
    sheetType.getRange(1, 1, typeData.length, typeData[0].length).setValues(typeData);
    sheetType.getRange(1, 1, 1, typeData[0].length).setFontWeight("bold").setBackground("#f1f5f9");
  }

  // 4. Castable_Settings
  let sheetSet = db.getSheetByName("Castable_Settings");
  if (!sheetSet) {
    sheetSet = db.insertSheet("Castable_Settings");
    const setData = [
      ["Key", "Value"],
      ["WASTE_FACTOR", 1.1],
      ["PERSEN_CASTABLE", 80],
      ["PERSEN_INSULATING", 20]
    ];
    sheetSet.getRange(1, 1, setData.length, setData[0].length).setValues(setData);
    sheetSet.getRange(1, 1, 1, setData[0].length).setFontWeight("bold").setBackground("#f1f5f9");
  }

  // 5. Castable_Inspeksi
  let sheetInsp = db.getSheetByName("Castable_Inspeksi");
  if (!sheetInsp) {
    sheetInsp = db.insertSheet("Castable_Inspeksi");
    const headerInsp = [["ID_LOG", "Timestamp", "Inspektor", "Tanggal_Inspeksi", "Vendor", "Kategori_ID", "Detail_ID", "Lebar_mm", "Panjang_mm", "Diameter_Angkur_mm", "Panjang_Angkur_mm", "Type_ID", "Densitas", "Volume_m3", "Tonase_Akhir_Ton", "Tonase_Castable_Ton", "Tonase_Insulating_Ton", "Remarks", "Photo_URL"]];
    sheetInsp.getRange(1, 1, 1, headerInsp[0].length).setValues(headerInsp);
    sheetInsp.getRange(1, 1, 1, headerInsp[0].length).setFontWeight("bold").setBackground("#f1f5f9");
  }
}

/**
 * B. Menarik Config & Master Data Castable
 */
function getCastableConfig(token) {
  try {
    validateSession(token); // Semua role bisa baca
    ensureCastableSheets();
    const db = getDb();

    // Mapping Kategori
    const katValues = db.getSheetByName("Castable_Kategori").getDataRange().getValues();
    const kategori = [];
    for (let i = 1; i < katValues.length; i++) {
      kategori.push({ id: katValues[i][0], nama: katValues[i][1] });
    }

    // Mapping Detail Area
    const detValues = db.getSheetByName("Castable_DetailArea").getDataRange().getValues();
    const detailArea = [];
    for (let i = 1; i < detValues.length; i++) {
      detailArea.push({ kategoriId: detValues[i][0], id: detValues[i][1], nama: detValues[i][2] });
    }

    // Mapping Type Material
    const typeValues = db.getSheetByName("Castable_TypeMaterial").getDataRange().getValues();
    const typeMaterial = [];
    for (let i = 1; i < typeValues.length; i++) {
      typeMaterial.push({ id: typeValues[i][0], nama: typeValues[i][1], densitas: parseFloat(typeValues[i][2]) || 0 });
    }

    // Mapping Settings
    const setValues = db.getSheetByName("Castable_Settings").getDataRange().getValues();
    const settings = { wasteFactor: 1.1, persenCastable: 80, persenInsulating: 20 };
    for (let i = 1; i < setValues.length; i++) {
      if (setValues[i][0] === "WASTE_FACTOR") settings.wasteFactor = parseFloat(setValues[i][1]) || 1.1;
      if (setValues[i][0] === "PERSEN_CASTABLE") settings.persenCastable = parseFloat(setValues[i][1]) || 80;
      if (setValues[i][0] === "PERSEN_INSULATING") settings.persenInsulating = parseFloat(setValues[i][1]) || 20;
    }

    return JSON.parse(JSON.stringify({ success: true, kategori: kategori, detailArea: detailArea, typeMaterial: typeMaterial, settings: settings }));
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  }
}

/**
 * C. Menarik Master Data sekaligus Log Inspeksi
 */
function getCastableData(token) {
  try {
    validateSession(token);
    const configResult = getCastableConfig(token);
    if (!configResult.success) throw new Error(configResult.error);

    const db = getDb();
    const inspValues = db.getSheetByName("Castable_Inspeksi").getDataRange().getValues();
    const records = [];

    for (let i = 1; i < inspValues.length; i++) {
      records.push({
        idLog: inspValues[i][0],
        timestamp: inspValues[i][1] instanceof Date ? inspValues[i][1].toISOString() : String(inspValues[i][1] || ""),
        inspektor: inspValues[i][2],
        tanggalInspeksi: formatDate(inspValues[i][3]),
        vendor: inspValues[i][4],
        kategoriId: inspValues[i][5],
        detailId: inspValues[i][6],
        lebar: parseFloat(inspValues[i][7]) || 0,
        panjang: parseFloat(inspValues[i][8]) || 0,
        diameterAngkur: parseFloat(inspValues[i][9]) || 0,
        panjangAngkur: parseFloat(inspValues[i][10]) || 0,
        typeId: inspValues[i][11],
        densitas: parseFloat(inspValues[i][12]) || 0,
        volumeM3: parseFloat(inspValues[i][13]) || 0,
        tonaseAkhir: parseFloat(inspValues[i][14]) || 0,
        tonaseCastable: parseFloat(inspValues[i][15]) || 0,
        tonaseInsulating: parseFloat(inspValues[i][16]) || 0,
        remarks: inspValues[i][17],
        photoUrl: inspValues[i][18] || ""
      });
    }

    return JSON.parse(JSON.stringify({ 
      success: true, 
      kategori: configResult.kategori,
      detailArea: configResult.detailArea,
      typeMaterial: configResult.typeMaterial,
      settings: configResult.settings,
      records: records
    }));
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  }
}

/**
 * D. Submit Log Inspeksi Castable Baru (Kalkulasi Server-side)
 */
function submitCastableInspeksi(token, data) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const user = validateSession(token);
    
    // T2-3b: Input Validation & Sanitization
    if (!data.tanggalInspeksi || !/^\d{4}-\d{2}-\d{2}$/.test(data.tanggalInspeksi)) {
      return { success: false, error: "Format tanggal tidak valid." };
    }
    data.lebar = parseFloat(data.lebar);
    data.panjang = parseFloat(data.panjang);
    data.diameterAngkur = parseFloat(data.diameterAngkur);
    data.panjangAngkur = parseFloat(data.panjangAngkur);
    if (isNaN(data.lebar) || data.lebar <= 0 || isNaN(data.panjang) || data.panjang <= 0 || isNaN(data.panjangAngkur) || data.panjangAngkur <= 0) {
      return { success: false, error: "Dimensi (lebar, panjang, panjang angkur) harus berupa angka > 0." };
    }
    data.remarks = String(data.remarks || "").trim();

    const db = getDb();
    
    // Ambil Data Settings
    let wasteFactor = 1.1, persenCastable = 80, persenInsulating = 20;
    const setValues = db.getSheetByName("Castable_Settings").getDataRange().getValues();
    for (let i = 1; i < setValues.length; i++) {
      if (setValues[i][0] === "WASTE_FACTOR") wasteFactor = parseFloat(setValues[i][1]) || 1.1;
      if (setValues[i][0] === "PERSEN_CASTABLE") persenCastable = parseFloat(setValues[i][1]) || 80;
      if (setValues[i][0] === "PERSEN_INSULATING") persenInsulating = parseFloat(setValues[i][1]) || 20;
    }

    // Ambil Densitas dari Type Material
    let densitas = 0;
    const typeValues = db.getSheetByName("Castable_TypeMaterial").getDataRange().getValues();
    for (let i = 1; i < typeValues.length; i++) {
      if (typeValues[i][0] === data.typeId) {
        densitas = parseFloat(typeValues[i][2]) || 0;
        break;
      }
    }

    if (densitas === 0) return { success: false, error: "Type Material tidak valid atau densitas 0" };

    // Kalkulasi Berdasarkan Rumus Wajib Server-side
    const l_m = (parseFloat(data.lebar) || 0) / 1000;
    const p_m = (parseFloat(data.panjang) || 0) / 1000;
    const pa_m = (parseFloat(data.panjangAngkur) || 0) / 1000; // ASUMSI: Panjang angkur berperan sebagai kedalaman/tebal
    
    const volume_m3 = l_m * p_m * pa_m * wasteFactor;
    const tonaseAkhir = volume_m3 * densitas;
    const tonaseCastable = tonaseAkhir * (persenCastable / 100);
    const tonaseInsulating = tonaseAkhir * (persenInsulating / 100);

    // Persiapan Metadata
    const idLog = "CST-" + Utilities.getUuid().substring(0, 8).toUpperCase();
    const timestamp = new Date().toISOString();
    
    // Penanganan Foto
    let photoUrl = "";
    if (data.photoBase64 && data.photoBase64 !== "") {
      photoUrl = savePhotoToDrive(data.photoBase64, data.photoName || `KSD_CST_${idLog}.png`);
    }

    const sheetInsp = db.getSheetByName("Castable_Inspeksi");
    sheetInsp.appendRow([
      idLog, timestamp, user.name, data.tanggalInspeksi, data.vendor, data.kategoriId, data.detailId, 
      data.lebar, data.panjang, data.diameterAngkur, data.panjangAngkur, data.typeId, densitas, 
      volume_m3, tonaseAkhir, tonaseCastable, tonaseInsulating, data.remarks, photoUrl
    ]);

    return { success: true, idLog: idLog };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * E. Menghapus Log Inspeksi
 */
function deleteCastableInspeksi(token, idLog) {
  try {
    validateSession(token, ["superadmin", "manager"]);
    const db = getDb();
    const sheet = db.getSheetByName("Castable_Inspeksi");
    const values = sheet.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === idLog) {
        sheet.deleteRow(i + 1);
        return { success: true };
      }
    }
    return { success: false, error: "Data log inspeksi tidak ditemukan!" };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  }
}

/**
 * F. Tambah Kategori Baru
 */
function addCastableKategori(token, namaKategori) {
  try {
    validateSession(token, ["superadmin"]);
    const db = getDb();
    const sheet = db.getSheetByName("Castable_Kategori");
    const data = sheet.getDataRange().getValues();
    
    let newId = "K01";
    if (data.length > 1) {
      const lastId = data[data.length - 1][0];
      const num = parseInt(lastId.substring(1), 10);
      newId = "K" + (num + 1).toString().padStart(2, "0");
    }
    
    sheet.appendRow([newId, namaKategori]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  }
}

/**
 * G. Tambah Detail Area Baru
 */
function addCastableDetailArea(token, kategoriId, namaDetail) {
  try {
    validateSession(token, ["superadmin"]);
    const db = getDb();
    const sheet = db.getSheetByName("Castable_DetailArea");
    const data = sheet.getDataRange().getValues();
    
    let newId = "D01";
    if (data.length > 1) {
      const lastId = data[data.length - 1][1];
      const num = parseInt(lastId.substring(1), 10);
      newId = "D" + (num + 1).toString().padStart(2, "0");
    }
    
    sheet.appendRow([kategoriId, newId, namaDetail]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  }
}

/**
 * H. Tambah Type Material Baru
 */
function addCastableTypeMaterial(token, namaType, densitas) {
  try {
    validateSession(token, ["superadmin"]);
    const db = getDb();
    const sheet = db.getSheetByName("Castable_TypeMaterial");
    const data = sheet.getDataRange().getValues();
    
    let newId = "T01";
    if (data.length > 1) {
      const lastId = data[data.length - 1][0];
      const num = parseInt(lastId.substring(1), 10);
      newId = "T" + (num + 1).toString().padStart(2, "0");
    }
    
    sheet.appendRow([newId, namaType, densitas]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  }
}

/**
 * I. Update Konfigurasi Setting Castable
 */
function updateCastableSettings(token, wasteFactor, persenCastable, persenInsulating) {
  try {
    validateSession(token, ["superadmin"]);
    
    if (parseFloat(persenCastable) + parseFloat(persenInsulating) !== 100) {
      return { success: false, error: "Total persentase harus 100%" };
    }

    const db = getDb();
    const sheet = db.getSheetByName("Castable_Settings");
    const values = sheet.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === "WASTE_FACTOR") sheet.getRange(i + 1, 2).setValue(wasteFactor);
      if (values[i][0] === "PERSEN_CASTABLE") sheet.getRange(i + 1, 2).setValue(persenCastable);
      if (values[i][0] === "PERSEN_INSULATING") sheet.getRange(i + 1, 2).setValue(persenInsulating);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message === "SESSION_EXPIRED" ? "SESSION_EXPIRED" : error.toString() };
  }
}

/**
 * 👑 ENDPOINT 10: Generate ZIP Laporan PDF Semua Proyek (Superadmin & Manager)
 */
function createProjectArchive(token, projectId) {
  try {
    const sessionUser = validateSession(token, ['manager', 'superadmin']);
    const db = getDb();
    
    const ts = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmmss");
    const ss = SpreadsheetApp.create("Arsip_KSD_" + projectId + "_" + ts);
    
    const sheetsToExport = [
      { name: "Projects", filterColIndex: 0 },
      { name: "IAC", filterColIndex: 0 },
      { name: "SubJobdesk", filterColIndex: 0 },
      { name: "DailyProgress", filterColIndex: 0 },
      { name: "Validation", filterColIndex: 0 },
      { name: "Alerts", filterColIndex: 0 },
      { name: "Castable_Inspeksi", filterColIndex: -1 }
    ];
    
    for (const config of sheetsToExport) {
      const src = db.getSheetByName(config.name);
      if (!src) continue;
      
      const values = src.getDataRange().getValues();
      if (values.length === 0) continue;
      
      let rowsToExport = [values[0]]; // Header
      
      if (config.filterColIndex >= 0) {
        for (let i = 1; i < values.length; i++) {
          if (values[i][config.filterColIndex] === projectId) {
            rowsToExport.push(values[i]);
          }
        }
      } else {
        for (let i = 1; i < values.length; i++) {
            rowsToExport.push(values[i]);
        }
      }
      
      if (rowsToExport.length > 1) { // Only if there's data besides header
        const newSheet = ss.insertSheet(config.name);
        newSheet.getRange(1, 1, rowsToExport.length, rowsToExport[0].length).setValues(rowsToExport);
        newSheet.getRange(1, 1, 1, rowsToExport[0].length).setFontWeight("bold").setBackground("#f1f5f9");
      }
    }
    
    const defaultSheet = ss.getSheetByName("Sheet1");
    if (defaultSheet) {
      ss.deleteSheet(defaultSheet);
    }
    
    const fileId = ss.getId();
    const url = "https://docs.google.com/spreadsheets/d/" + fileId + "/export?format=xlsx";
    
    return { success: true, url: url, fileId: fileId };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function generateAllProjectsReportZip(token) {
  try {
    validateSession(token, ["superadmin", "manager"]);
    const db = getDb();
    const projects = getProjectsList();

    if (projects.length === 0) {
      return { success: false, error: "Tidak ada proyek terdaftar untuk diekspor." };
    }

    const now = new Date();
    const dateStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyyMMdd_HHmm");
    const folderName = "KSD_Laporan_AllProjects_" + dateStr;
    
    const mainFolder = DriveApp.createFolder(folderName);
    mainFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    const iacSheetValues = db.getSheetByName("IAC").getDataRange().getValues();
    const subSheetValues = db.getSheetByName("SubJobdesk").getDataRange().getValues();
    const progressSheetValues = db.getSheetByName("DailyProgress").getDataRange().getValues();

    // -- TAHAP 2: Grouping Optimization --
    const groupedIacs = {};
    for (let r = 1; r < iacSheetValues.length; r++) {
      const pId = iacSheetValues[r][0];
      if (!groupedIacs[pId]) groupedIacs[pId] = [];
      groupedIacs[pId].push({ id: iacSheetValues[r][1], title: iacSheetValues[r][2], weight: parseFloat(iacSheetValues[r][3]) || 0 });
    }
    const groupedSubs = {};
    for (let r = 1; r < subSheetValues.length; r++) {
      const pId = subSheetValues[r][0];
      if (!groupedSubs[pId]) groupedSubs[pId] = [];
      groupedSubs[pId].push({ id: subSheetValues[r][1], iacId: subSheetValues[r][2], title: subSheetValues[r][3], contractor: subSheetValues[r][4], weight: parseFloat(subSheetValues[r][5]) || 0 });
    }
    const groupedProgress = {};
    for (let r = 1; r < progressSheetValues.length; r++) {
      const pId = progressSheetValues[r][0];
      if (!groupedProgress[pId]) groupedProgress[pId] = [];
      groupedProgress[pId].push({ date: formatDate(progressSheetValues[r][1]), subId: progressSheetValues[r][2], progress: parseFloat(progressSheetValues[r][3]) || 0, remarks: progressSheetValues[r][4], timestamp: progressSheetValues[r][6] instanceof Date ? progressSheetValues[r][6].toISOString() : String(progressSheetValues[r][6] || "") });
    }
    // -------------------------------------

    const pdfBlobs = [];
    let successCount = 0;
    const failedProjects = [];
    const startTime = Date.now();

    for (let i = 0; i < projects.length; i++) {
      if (Date.now() - startTime > 270000) { 
        break; // TAHAP 5: Timeout safety (4.5 mins limit)
      }

      const pInfo = projects[i];
      const pId = pInfo.id;
      let tempSs = null;

      try {
        tempSs = SpreadsheetApp.create("Temp_KSD_" + pId);
        const sheet = tempSs.getSheets()[0];
        sheet.setName("Report_" + pId);

        const iacs = groupedIacs[pId] || [];
        const subs = groupedSubs[pId] || [];
        const progress = groupedProgress[pId] || [];

        const computed = calculateProgress(iacs, subs, progress, pInfo);

        // -- TAHAP 3: Batch Writes --
        const outData = [];
        outData.push(["RINGKASAN PROYEK", "", "", ""]);
        outData.push(["Project ID", pId, "", ""]);
        outData.push(["Nama Proyek", pInfo.name, "", ""]);
        outData.push(["Area", pInfo.area, "", ""]);
        outData.push(["Status", pInfo.status, "", ""]);
        outData.push(["Progres Keseluruhan", computed.overallProgress + "%", "", ""]);
        outData.push(["Durasi Aktual", computed.actualDuration + " Hari", "", ""]);
        outData.push(["", "", "", ""]);

        outData.push(["DAFTAR HEAD JOBDESK (IAC)", "Bobot", "Progres", ""]);
        computed.iacs.forEach(iac => {
          outData.push(["[" + iac.id + "] " + iac.title, iac.weight + "%", iac.currentProgress + "%", ""]);
        });
        outData.push(["", "", "", ""]);

        outData.push(["DAFTAR SUB-JOBDESK", "Kontraktor", "Bobot", "Progres"]);
        computed.subs.forEach(sub => {
          outData.push(["[" + sub.id + "] " + sub.title, sub.contractor || "-", sub.weight + "%", sub.currentProgress + "%"]);
        });
        outData.push(["", "", "", ""]);

        outData.push(["LOG PROGRES TERAKHIR (Max 20)", "Sub ID", "Progres", "Catatan"]);
        progress.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const recentLogs = progress.slice(0, 20);
        
        if (recentLogs.length > 0) {
          recentLogs.forEach(lg => {
            outData.push([lg.date, lg.subId, lg.progress + "%", lg.remarks || "-"]);
          });
        } else {
          outData.push(["Belum ada data", "", "", ""]);
        }

        sheet.getRange(1, 1, outData.length, 4).setValues(outData);

        sheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#1e293b").setFontColor("white");
        sheet.getRange(9, 1, 1, 3).setFontWeight("bold").setBackground("#f1f5f9");
        sheet.getRange(11 + computed.iacs.length, 1, 1, 4).setFontWeight("bold").setBackground("#f1f5f9");
        sheet.getRange(13 + computed.iacs.length + computed.subs.length, 1, 1, 4).setFontWeight("bold").setBackground("#f1f5f9");
        // -------------------------------------

        SpreadsheetApp.flush();
        const url = tempSs.getUrl().replace(/edit$/, '') + 'export?exportFormat=pdf&format=pdf&size=A4&portrait=false&fitw=true&sheetnames=false&printtitle=false&pagenumbers=true&gridlines=true';
        const tokenOAuth = ScriptApp.getOAuthToken();
        const response = UrlFetchApp.fetch(url, {
          headers: { 'Authorization': 'Bearer ' + tokenOAuth },
          muteHttpExceptions: true
        });

        if (response.getResponseCode() !== 200) {
          throw new Error("Gagal export PDF HTTP " + response.getResponseCode());
        }

        const safeName = pInfo.name.replace(/[^a-zA-Z0-9]/g, "_");
        const pdfBlob = response.getBlob().setName("Laporan_" + pId + "_" + safeName + ".pdf");
        
        mainFolder.createFile(pdfBlob);
        pdfBlobs.push(pdfBlob);
        successCount++;

      } catch (projError) {
        failedProjects.push(pId);
      } finally {
        if (tempSs) {
          try {
            DriveApp.getFileById(tempSs.getId()).setTrashed(true);
          } catch (e) {
            // Abaikan error saat hapus file sementara
          }
        }
      }
    }

    let zipUrl = "";
    if (pdfBlobs.length > 0) {
      const zipName = "Laporan_Lengkap_AllProjects_" + dateStr + ".zip";
      const zipBlob = Utilities.zip(pdfBlobs, zipName);
      const zipFile = mainFolder.createFile(zipBlob);
      zipFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      zipUrl = zipFile.getUrl();
    }

    return {
      success: true,
      folderUrl: mainFolder.getUrl(),
      zipUrl: zipUrl,
      totalReports: successCount,
      failedProjects: failedProjects
    };

  } catch (error) {
    if (error.message === "UNAUTHORIZED" || error.message === "SESSION_EXPIRED" || error.message === "FORBIDDEN") {
      return { success: false, error: "SESSION_EXPIRED" };
    }
    return { success: false, error: error.toString() };
  }
}

/**
 * 📦 ENDPOINT: Ambil data utuh semua proyek (untuk frontend ZIP generation)
 */
function getAllProjectsFullData(token) {
  const startTime = Date.now();
  try {
    validateSession(token);
    const db = getDb();
    const projects = getProjectsList();

    if (projects.length === 0) return JSON.parse(JSON.stringify({ success: true, projects: [] }));

    const iacSheetValues = db.getSheetByName("IAC").getDataRange().getValues();
    const subSheetValues = db.getSheetByName("SubJobdesk").getDataRange().getValues();
    const progressSheetValues = db.getSheetByName("DailyProgress").getDataRange().getValues();
    const validationSheet = db.getSheetByName("Validation");
    const validationSheetValues = validationSheet ? validationSheet.getDataRange().getValues() : [];

    const groupedIacs = {};
    for (let r = 1; r < iacSheetValues.length; r++) {
      const pId = iacSheetValues[r][0];
      if (!groupedIacs[pId]) groupedIacs[pId] = [];
      groupedIacs[pId].push({ id: iacSheetValues[r][1], title: iacSheetValues[r][2], weight: parseFloat(iacSheetValues[r][3]) || 0 });
    }
    const groupedSubs = {};
    for (let r = 1; r < subSheetValues.length; r++) {
      const pId = subSheetValues[r][0];
      if (!groupedSubs[pId]) groupedSubs[pId] = [];
      groupedSubs[pId].push({ id: subSheetValues[r][1], iacId: subSheetValues[r][2], title: subSheetValues[r][3], contractor: subSheetValues[r][4], weight: parseFloat(subSheetValues[r][5]) || 0 });
    }
    const groupedProgress = {};
    for (let r = 1; r < progressSheetValues.length; r++) {
      const pId = progressSheetValues[r][0];
      if (!groupedProgress[pId]) groupedProgress[pId] = [];
      groupedProgress[pId].push({ date: formatDate(progressSheetValues[r][1]), subId: progressSheetValues[r][2], progress: parseFloat(progressSheetValues[r][3]) || 0, remarks: progressSheetValues[r][4], timestamp: progressSheetValues[r][6] instanceof Date ? progressSheetValues[r][6].toISOString() : String(progressSheetValues[r][6] || "") });
    }
    const groupedValidations = {};
    for (let r = 1; r < validationSheetValues.length; r++) {
      const pId = validationSheetValues[r][0];
      if (!groupedValidations[pId]) groupedValidations[pId] = [];
      groupedValidations[pId].push({ type: validationSheetValues[r][1], status: validationSheetValues[r][4] });
    }

    let isPartial = false;
    let processedCount = 0;
    const fullProjects = [];
    
    for (let i = 0; i < projects.length; i++) {
      if (Date.now() - startTime > 270000) {
        isPartial = true;
        break; // T2-1: Guard timeout limit
      }
      processedCount++;
      const pInfo = projects[i];
      const pId = pInfo.id;
      const iacs = groupedIacs[pId] || [];
      const subs = groupedSubs[pId] || [];
      const progress = groupedProgress[pId] || [];
      // BUG-19 FIX: Sort progress kronologis
      progress.sort((a, b) => new Date(a.date) - new Date(b.date));
      const computed = calculateProgress(iacs, subs, progress, pInfo);

      const validations = groupedValidations[pId] || [];
      let isSuperadminFinalized = false;
      for (let v = 0; v < validations.length; v++) {
        if (validations[v].type === "superadmin_finalize" && validations[v].status === "Approved") {
          isSuperadminFinalized = true;
          break;
        }
      }

      if (computed.overallProgress === 100 && isSuperadminFinalized) {
        pInfo.status = "Completed";
      }

      fullProjects.push({
        config: pInfo,
        iacs: computed.iacs,
        subs: computed.subs,
        dailyProgress: progress,
        overallProgress: computed.overallProgress,
        actualDuration: computed.actualDuration,
        // BUG-02 FIX: calculateProgress tidak mengembalikan actualStartDate, ambil dari pInfo
        actualStartDate: pInfo.startDate
      });
    }

    return JSON.parse(JSON.stringify({ 
      success: true, 
      partial: isPartial,
      processedCount: processedCount,
      projects: fullProjects 
    }));
  } catch (error) {
    if (error.message === "UNAUTHORIZED" || error.message === "SESSION_EXPIRED" || error.message === "FORBIDDEN") {
      return { success: false, error: "SESSION_EXPIRED" };
    }
    return { success: false, error: error.toString() };
  }
}

/**
 * 📊 ENDPOINT: Summary Dashboard Semua Proyek
 */
function getAllProjectsDashboardSummary(token) {
  const startTime = Date.now();
  try {
    validateSession(token);
    const db = getDb();
    const projects = getProjectsList();

    if (projects.length === 0) {
      return JSON.parse(JSON.stringify({
        success: true,
        generatedAt: new Date().toISOString(),
        summary: { totalProjects: 0, totalOnTrack: 0, totalAlert: 0, avgOverallProgress: 0 },
        projects: []
      }));
    }

    const iacSheetValues = db.getSheetByName("IAC").getDataRange().getValues();
    const subSheetValues = db.getSheetByName("SubJobdesk").getDataRange().getValues();
    const progressSheetValues = db.getSheetByName("DailyProgress").getDataRange().getValues();
    const alertsSheetValues = db.getSheetByName("Alerts").getDataRange().getValues();
    const baselineSheet = db.getSheetByName("BaselineSchedule");
    const baselineDataAll = baselineSheet ? baselineSheet.getDataRange().getValues() : [];

    // -- TAHAP 2: O(N) Grouping Optimization --
    const groupedIacs = {};
    for (let r = 1; r < iacSheetValues.length; r++) {
      const pId = iacSheetValues[r][0];
      if (!groupedIacs[pId]) groupedIacs[pId] = [];
      groupedIacs[pId].push({ id: iacSheetValues[r][1], title: iacSheetValues[r][2], weight: parseFloat(iacSheetValues[r][3]) || 0 });
    }

    const groupedSubs = {};
    for (let r = 1; r < subSheetValues.length; r++) {
      const pId = subSheetValues[r][0];
      if (!groupedSubs[pId]) groupedSubs[pId] = [];
      groupedSubs[pId].push({ id: subSheetValues[r][1], iacId: subSheetValues[r][2], title: subSheetValues[r][3], contractor: subSheetValues[r][4], weight: parseFloat(subSheetValues[r][5]) || 0 });
    }

    const groupedProgress = {};
    for (let r = 1; r < progressSheetValues.length; r++) {
      const pId = progressSheetValues[r][0];
      if (!groupedProgress[pId]) groupedProgress[pId] = [];
      groupedProgress[pId].push({ date: formatDate(progressSheetValues[r][1]), subId: progressSheetValues[r][2], progress: parseFloat(progressSheetValues[r][3]) || 0, remarks: progressSheetValues[r][4], inputBy: progressSheetValues[r][5], timestamp: progressSheetValues[r][6] instanceof Date ? progressSheetValues[r][6].toISOString() : String(progressSheetValues[r][6] || ""), photoUrl: progressSheetValues[r][7] || "" });
    }
    // -----------------------------------------

    let totalAlert = 0;
    let totalOnTrack = 0;
    let sumOverallProgress = 0;
    const projectSummaries = [];

    let isPartial = false;
    let processedCount = 0;

    for (let i = 0; i < projects.length; i++) {
      if (Date.now() - startTime > 270000) {
        isPartial = true;
        break; // T2-1: Guard against 6-min execution limit (Timeout safe)
      }
      processedCount++;

      const pInfo = projects[i];
      const pId = pInfo.id;

      const iacs = groupedIacs[pId] || [];
      const subs = groupedSubs[pId] || [];
      const progress = groupedProgress[pId] || [];

      const computed = calculateProgress(iacs, subs, progress, pInfo);
      const projectAlerts = runAlertAnalysis(pId, computed, progress, pInfo, alertsSheetValues, false, baselineDataAll);

      totalAlert += projectAlerts.length;
      if (projectAlerts.length === 0) {
        totalOnTrack++;
      }
      sumOverallProgress += computed.overallProgress;

      let lastProgDate = null;
      let lastProgRem = "";
      progress.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      if (progress.length > 0) {
        lastProgDate = progress[0].date;
        lastProgRem = progress[0].remarks;
      }

      projectSummaries.push({
        id: pId,
        name: pInfo.name,
        area: pInfo.area,
        status: pInfo.status,
        startDate: pInfo.startDate,
        overallProgress: computed.overallProgress,
        actualDuration: computed.actualDuration,
        alertCount: projectAlerts.length,
        lastProgressDate: lastProgDate,
        lastProgressRemarks: lastProgRem
      });
    }

    return JSON.parse(JSON.stringify({
      success: true,
      partial: isPartial,
      processedCount: processedCount,
      generatedAt: new Date().toISOString(),
      summary: {
        totalProjects: processedCount, // Update total based on processed
        totalOnTrack: totalOnTrack,
        totalAlert: totalAlert,
        avgOverallProgress: processedCount > 0 ? Math.round((sumOverallProgress / processedCount) * 10) / 10 : 0
      },
      projects: projectSummaries
    }));

  } catch (error) {
    if (error.message === "UNAUTHORIZED" || error.message === "SESSION_EXPIRED" || error.message === "FORBIDDEN") {
      return { success: false, error: "SESSION_EXPIRED" };
    }
    return { success: false, error: error.toString() };
  }
}

function pancingOtorisasi() {
  DriveApp.getFiles();
}