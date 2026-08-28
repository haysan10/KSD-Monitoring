// ============================================================
// KSD MONITOR - POCKETBASE BACKEND ENGINE v3.5 (MULTI-TENANT EDITION)
// ============================================================

// 🔐 POST /api/custom/login
routerAdd("POST", "/api/custom/login", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.initExtraCollections();
        const body = utils.getRequestBody(e);
        const username = body.username || "";
        const password = body.password || "";

        if (!username || !password) {
            return utils.sendJSON(e, 400, { success: false, error: "Username dan kata sandi wajib diisi" });
        }

        // Find auth record
        let record = null;
        try {
            record = $app.findAuthRecordByEmail("users", username);
        } catch (err) {
            if (username.indexOf("@") === -1) {
                try {
                    record = $app.findAuthRecordByEmail("users", username + "@ksd.com");
                } catch (errFallback) {
                    return utils.sendJSON(e, 401, { success: false, error: "Username atau password salah!" });
                }
            } else {
                return utils.sendJSON(e, 401, { success: false, error: "Username atau password salah!" });
            }
        }

        if (!record || !record.validatePassword(password)) {
            return utils.sendJSON(e, 401, { success: false, error: "Username atau password salah!" });
        }

        // Generate token and expiry (4 hours duration)
        const token = $security.randomString(32);
        const expiry = Date.now() + 14400000; // 4 hours in ms

        record.set("sessionToken", token);
        record.set("tokenExpiry", expiry.toString());
        $app.save(record);

        let userRole = record.get("role") || "internal_admin";
        if (userRole === "admin") userRole = "internal_admin";

        let jobdeskScope = utils.parseGojaJson(record.get("jobdesk_scope"));
        let userPerms = utils.parseGojaJson(record.get("permissions"));
        let allowedProjects = utils.parseGojaJson(record.get("allowed_projects"));
        let allowedLocations = utils.parseGojaJson(record.get("allowed_locations"));

        return utils.sendJSON(e, 200, {
            success: true,
            token: token,
            userId: record.id || record.getId(),
            username: record.email() || record.username(),
            name: record.get("name"),
            role: userRole,
            pt: record.get("pt") || "",
            pt_name: record.get("pt_name") || "",
            jobdesk_scope: jobdeskScope,
            permissions: userPerms,
            allowed_projects: allowedProjects,
            allowed_locations: allowedLocations,
            mustChange: false
        });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🚪 POST /api/custom/logout
routerAdd("POST", "/api/custom/logout", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user && user.record) {
            user.record.set("sessionToken", "");
            $app.save(user.record);
        }
    } catch (err) {}
    return utils.sendJSON(e, 200, { success: true });
});

// 📦 GET & POST /api/custom/export-full-backup
// Endpoint cadangan lengkap database untuk backup otomatis Google Apps Script dan ekspor JSON
function handleExportBackup(e) {
    const utils = require(`${__hooks}/utils.js`);
    try {
        let user = null;
        try {
            user = utils.validateSession(e);
        } catch (authErr) {
            const queryToken = e.request.url.query().get("token");
            if (queryToken) {
                try {
                    const record = $app.findFirstRecordByData("users", "sessionToken", queryToken);
                    if (record && Number(record.get("tokenExpiry") || 0) > Date.now()) {
                        user = {
                            id: record.id,
                            role: record.get("role") || "internal_admin",
                            name: record.get("name") || "",
                            record: record
                        };
                    }
                } catch (qErr) {}
            }
        }

        if (!user || !["superadmin", "internal_admin", "manager"].includes(user.role)) {
            return utils.sendJSON(e, 403, { success: false, error: "Akses ditolak. Hanya Admin/Manager yang berhak mengekspor backup." });
        }

        const collections = ["projects", "iacs", "subs", "dailyProgress", "materialLogs", "manpowerLogs", "validations", "pts", "users", "notifications", "castable_records"];
        const backupData = {
            exportTimestamp: new Date().toISOString(),
            exportedBy: user.name,
            role: user.role,
            collections: {}
        };

        collections.forEach(colName => {
            try {
                const records = $app.findAllRecords(colName);
                backupData.collections[colName] = records.map(r => {
                    const obj = {};
                    r.collection().fields.forEach(f => {
                        if (f.name !== "password" && f.name !== "tokenKey") {
                            obj[f.name] = r.get(f.name);
                        }
                    });
                    return obj;
                });
            } catch (err) {
                backupData.collections[colName] = [];
            }
        });

        return utils.sendJSON(e, 200, { success: true, backup: backupData });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
}
routerAdd("POST", "/api/custom/export-full-backup", handleExportBackup);
routerAdd("GET", "/api/custom/export-full-backup", handleExportBackup);

// 🔔 POST /api/custom/contractor-form-opened
// Trigger hook saat kontraktor membuka form/halaman input progres
routerAdd("POST", "/api/custom/contractor-form-opened", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role === "kontraktor_admin") {
            const ptName = user.pt_name || user.pt || "Kontraktor";
            utils.notifyInternalAdmins(
                `📝 Kontraktor Membuka Form Progres`,
                `${user.name} (${ptName}) sedang membuka antarmuka pengisian progres harian.`,
                "kontraktor_opened_update",
                user.pt,
                ptName
            );
        }
        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        if (err.message === "UNAUTHORIZED" || err.message === "SESSION_EXPIRED") {
            return utils.sendJSON(e, 401, { success: false, error: "SESSION_EXPIRED" });
        }
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📊 POST /api/custom/project-data
routerAdd("POST", "/api/custom/project-data", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.initExtraCollections();
        const user = utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const reqProjectId = body.projectId || "";
        const filterPt = body.filterPt || ""; // Filter PT untuk admin drill-down

        // Get projects list
        const projectRecords = $app.findRecordsByFilter("projects", "", "", 100, 0);
        let projects = projectRecords.map(r => ({
            id: r.get("projectId"),
            name: r.get("name"),
            area: r.get("area"),
            startDate: r.get("startDate"),
            status: r.get("status"),
            plannedFinish: r.get("plannedFinish"),
            shutdownType: r.get("shutdownType"),
            baselineLocked: r.get("baselineLocked"),
            overallStatusGate: r.get("overallStatusGate")
        }));

        // Helper for Goja array search
        const arrayContains = (arr, item) => {
            if (!arr) return false;
            for (let i = 0; i < arr.length; i++) {
                if (String(arr[i]).trim() === String(item).trim()) return true;
            }
            return false;
        };

        // Filter projects by user allowed_projects if restricted
        if (user.role !== "superadmin" && user.role !== "internal_admin") {
            const userAllowedProjs = user.allowed_projects || [];
            if (userAllowedProjs.length > 0 && !arrayContains(userAllowedProjs, "ALL")) {
                projects = projects.filter(p => arrayContains(userAllowedProjs, p.id));
            }
        }

        if (projects.length === 0) {
            if (user.role === "superadmin" || user.role === "internal_admin") {
                return utils.sendJSON(e, 200, {
                    success: true,
                    noProjects: true,
                    projects: [],
                    activeProjectId: "",
                    config: { projectName: "Belum Ada Proyek", area: "-", startDatePlanned: "", status: "Belum Dimulai" },
                    iacs: [],
                    subs: [],
                    dailyProgress: [],
                    daily: [],
                    baseline: [],
                    validations: [],
                    alerts: [],
                    pts: [],
                    overallProgress: 0,
                    actualStartDate: "",
                    actualDuration: 0,
                    currentUser: user
                });
            } else {
                return utils.sendJSON(e, 403, { success: false, error: "Akses Ditolak: Belum ada proyek yang tersedia atau Anda belum diberi izin." });
            }
        }

        const activeProjectId = (reqProjectId && reqProjectId !== "ALL") ? reqProjectId : projects[0].id;
        const activeProj = projects.find(p => p.id === activeProjectId) || projects[0];

        if (reqProjectId && reqProjectId !== "ALL" && !projects.find(p => p.id === reqProjectId)) {
            return utils.sendJSON(e, 403, { success: false, error: `Akses Ditolak: Anda tidak memiliki izin untuk membuka proyek '${reqProjectId}'.` });
        }

        // Fetch Master PT List
        let pts = [];
        try {
            const ptRecs = $app.findRecordsByFilter("pt", "", "", 100, 0);
            pts = ptRecs.map(r => ({
                id: r.id,
                kode_pt: r.get("kode_pt"),
                nama_pt: r.get("nama_pt"),
                lokasi_default: r.get("lokasi_default"),
                status_aktif: r.get("status_aktif"),
                kontak_pic: r.get("kontak_pic")
            }));
        } catch (err) {}

        // Fallback default PTs if empty
        if (pts.length === 0) {
            pts = [
                { id: "pt_tali", kode_pt: "TALI", nama_pt: "PT. Tali Abadi Lancar Indonesia", lokasi_default: "PLANT 8 - Burner Sector, Kiln Body", status_aktif: true },
                { id: "pt_hjg", kode_pt: "HJG", nama_pt: "PT. Harapan Jaya Gemilang", lokasi_default: "PLANT 8 - Preheater Tower, Kiln Body", status_aktif: true },
                { id: "pt_multicrew", kode_pt: "MULTICREW", nama_pt: "PT. Multi Fabrindo Perkasa", lokasi_default: "PLANT 8 - Cooler Sector", status_aktif: true },
                { id: "pt_sinarbaja", kode_pt: "SINARBAJA", nama_pt: "PT. Sinar Baja Perkasa", lokasi_default: "PLANT 8 - Hot Zone", status_aktif: true }
            ];
        }

        // Fetch IACs
        const iacRecords = $app.findRecordsByFilter("iacs", "projectId = {:pId}", "", 200, 0, { pId: activeProjectId });
        let iacs = iacRecords.map(r => ({
            id: r.get("iacId"),
            title: r.get("title"),
            weight: r.get("weight"),
            phase: r.get("phase"),
            discipline: r.get("discipline"),
            criticalFlag: r.get("criticalFlag"),
            criticalityLevel: r.get("criticalityLevel"),
            areaTag: r.get("areaTag")
        }));

        // Fetch Subs
        const subRecords = $app.findRecordsByFilter("subs", "projectId = {:pId}", "", 500, 0, { pId: activeProjectId });
        let subs = subRecords.map(r => ({
            id: r.get("subId"),
            iacId: r.get("iacId"),
            title: r.get("title"),
            contractor: r.get("contractor"),
            weight: r.get("weight"),
            areaDetail: r.get("areaDetail"),
            discipline: r.get("discipline"),
            plannedStart: r.get("plannedStart"),
            plannedFinish: r.get("plannedFinish"),
            predecessorSubId: r.get("predecessorSubId"),
            criticalFlag: r.get("criticalFlag"),
            milestoneFlag: r.get("milestoneFlag")
        }));

        // Fetch Daily Progress & Progress Logs
        const progressRecords = $app.findRecordsByFilter("daily_progress", "projectId = {:pId}", "", 5000, 0, { pId: activeProjectId });
        let dailyProgress = progressRecords.map(r => ({
            id: r.id,
            date: r.get("date"),
            subId: r.get("subId"),
            progress: r.get("progress"),
            remarks: r.get("remarks"),
            inputBy: r.get("inputBy"),
            timestamp: r.get("created"),
            photoUrl: r.get("photoUrl"),
            shift: r.get("shift"),
            manpowerActual: r.get("manpowerActual"),
            delayReasonCode: r.get("delayReasonCode"),
            constraintDescription: r.get("constraintDescription"),
            recoveryAction: r.get("recoveryAction"),
            status: r.get("status") || "validated", // default legacy records to validated
            validated_by: r.get("validated_by") || "",
            validated_by_name: r.get("validated_by_name") || "",
            catatan_validasi: r.get("catatan_validasi") || "",
            pt: r.get("pt") || "",
            pt_name: r.get("pt_name") || ""
        }));

        // Fetch Validations
        const valRecords = $app.findRecordsByFilter("validations", "projectId = {:pId}", "", 500, 0, { pId: activeProjectId });
        const validations = valRecords.map(r => ({
            type: r.get("type"),
            user: r.get("user"),
            timestamp: r.get("created"),
            status: r.get("status"),
            comment: r.get("comment")
        }));

        // Fetch Baseline
        const baselineRecords = $app.findRecordsByFilter("baseline_schedule", "projectId = {:pId}", "", 500, 0, { pId: activeProjectId });
        const baseline = baselineRecords.map(r => ({
            subId: r.get("subId"),
            plannedStart: r.get("plannedStart"),
            plannedFinish: r.get("plannedFinish"),
            plannedDuration: r.get("plannedDuration")
        }));

        // === MULTI-TENANT FILTERING ===
        if (user.role === "kontraktor_admin") {
            const userPtKode = (user.pt_name || user.pt || "").toUpperCase();
            const userScope = user.jobdesk_scope || [];

            // Filter subs strictly to contractor scope
            subs = subs.filter(s => {
                const sContractor = (s.contractor || "").toUpperCase();
                const matchPt = sContractor.includes(userPtKode) || userPtKode.includes(sContractor);
                const matchScope = userScope.length === 0 || userScope.includes(s.id);
                return matchPt || matchScope;
            });

            // Filter IACs strictly to those containing contractor subs
            const activeIacIds = new Set(subs.map(s => s.iacId));
            iacs = iacs.filter(iac => activeIacIds.has(iac.id));

            // Filter dailyProgress to contractor subs
            const activeSubIds = new Set(subs.map(s => s.id));
            dailyProgress = dailyProgress.filter(p => activeSubIds.has(p.subId));
        } else if (filterPt && filterPt !== "ALL" && filterPt !== "") {
            // Internal Admin / Viewer drill-down filter
            const ptObj = pts.find(p => p.id === filterPt || p.kode_pt === filterPt || p.nama_pt === filterPt);
            const ptKey = ptObj ? ptObj.kode_pt.toUpperCase() : filterPt.toUpperCase();

            subs = subs.filter(s => (s.contractor || "").toUpperCase().includes(ptKey));
            const activeIacIds = new Set(subs.map(s => s.iacId));
            iacs = iacs.filter(iac => activeIacIds.has(iac.id));
            const activeSubIds = new Set(subs.map(s => s.id));
            dailyProgress = dailyProgress.filter(p => activeSubIds.has(p.subId));
        }

        // === PROGRESS CALCULATION (ONLY COUNT VALIDATED ENTRIES FOR OFFICIAL METRICS) ===
        const latestSubProgress = {};
        let latestProgressDate = null;
        
        // Sort ascending by date
        dailyProgress.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        dailyProgress.forEach(p => {
            // Only validated progress counts toward official metrics
            if (p.status === "validated" || !p.status) {
                latestSubProgress[p.subId] = p.progress;
                if (!latestProgressDate || new Date(p.date) > new Date(latestProgressDate)) {
                    latestProgressDate = p.date;
                }
            }
        });

        const startPlanned = new Date(activeProj.startDate);
        const endCompare = latestProgressDate ? new Date(latestProgressDate) : new Date();
        const timeDiff = Math.max(0, endCompare - startPlanned);
        const actualDuration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

        // Process Subs Progress
        const processedSubs = subs.map(sub => {
            const currentProg = latestSubProgress[sub.id] || 0;
            // Also find latest submitted pending progress if any
            const pendingLogs = dailyProgress.filter(p => p.subId === sub.id && p.status === "submitted");
            const latestPending = pendingLogs.length > 0 ? pendingLogs[pendingLogs.length - 1] : null;

            return {
                ...sub,
                currentProgress: currentProg,
                pendingProgress: latestPending ? latestPending.progress : null,
                hasPendingValidation: !!latestPending
            };
        });

        const subsByIac = {};
        processedSubs.forEach(s => {
            if (!subsByIac[s.iacId]) subsByIac[s.iacId] = [];
            subsByIac[s.iacId].push(s);
        });

        iacs.forEach(iac => {
            const relatedSubs = subsByIac[iac.id] || [];
            let weightedSum = 0;
            let totalWeightUsed = 0;
            relatedSubs.forEach(s => {
                weightedSum += (s.currentProgress * (s.weight / 100));
                totalWeightUsed += s.weight;
            });
            const iacProg = totalWeightUsed > 0 ? (weightedSum * (100 / totalWeightUsed)) : 0;
            iac.currentProgress = Math.min(100, Math.max(0, Math.round(iacProg * 100) / 100));
        });

        let overallProgress = 0;
        let totalIacWeight = 0;
        const processedIacs = iacs.map(iac => {
            const prog = iac.currentProgress || 0;
            overallProgress += (prog * (iac.weight / 100));
            totalIacWeight += iac.weight;
            return iac;
        });

        if (totalIacWeight > 0) {
            overallProgress = (overallProgress * (100 / totalIacWeight));
        }
        overallProgress = Math.min(100, Math.round(overallProgress * 100) / 100);

        // Pending Validations for Internal Admin
        let pendingValidationsCount = 0;
        let pendingValidationsList = [];
        try {
            const pendings = dailyProgress.filter(p => p.status === "submitted");
            pendingValidationsCount = pendings.length;
            pendingValidationsList = pendings.map(p => {
                const matchingSub = subs.find(s => s.id === p.subId);
                return {
                    ...p,
                    subTitle: matchingSub ? matchingSub.title : p.subId,
                    contractor: matchingSub ? matchingSub.contractor : (p.pt_name || p.pt || "Kontraktor")
                };
            });
        } catch (e) {}

        // Run Alert Analysis
        const alerts = [];
        const today = new Date();
        for (let subId in latestSubProgress) {
            const sub = subs.find(s => s.id === subId);
            if (!sub) continue;
            
            const currentProg = latestSubProgress[subId];
            if (currentProg >= 100) continue;

            let plannedProg = 0;
            const bItem = baseline.find(b => b.subId === subId);
            if (bItem) {
                const pStart = new Date(bItem.plannedStart);
                const pFinish = new Date(bItem.plannedFinish);
                if (!isNaN(pStart) && !isNaN(pFinish)) {
                    const totalDuration = pFinish.getTime() - pStart.getTime();
                    const elapsed = today.getTime() - pStart.getTime();
                    if (elapsed <= 0) plannedProg = 0;
                    else if (elapsed >= totalDuration) plannedProg = 100;
                    else plannedProg = Math.round((elapsed / totalDuration) * 100);
                }
            }

            if (currentProg < plannedProg - 10) {
                alerts.push({
                    id: `ALERT-DELAY-${subId}`,
                    type: "delay_risk",
                    itemId: subId,
                    details: `Progres aktual (${currentProg}%) tertinggal >10% dari Baseline Target (${plannedProg}%).`,
                    timestamp: new Date().toISOString()
                });
            }
        }

        const isCompleted = overallProgress === 100 && validations.some(v => v.type === "superadmin_finalize" && v.status === "Approved");

        return utils.sendJSON(e, 200, {
            success: true,
            projects: projects,
            pts: pts,
            activeProjectId: activeProjectId,
            currentUser: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                pt: user.pt,
                pt_name: user.pt_name,
                jobdesk_scope: user.jobdesk_scope,
                permissions: user.permissions,
                allowed_projects: user.allowed_projects,
                allowed_locations: user.allowed_locations
            },
            config: {
                projectName: activeProj.name,
                area: activeProj.area,
                startDatePlanned: activeProj.startDate,
                status: isCompleted ? "Completed" : activeProj.status
            },
            iacs: processedIacs,
            subs: processedSubs,
            dailyProgress: dailyProgress,
            validations: validations,
            pendingValidationsList: pendingValidationsList,
            pendingValidationsCount: pendingValidationsCount,
            alerts: alerts,
            baseline: baseline,
            overallProgress: overallProgress,
            actualStartDate: activeProj.startDate,
            actualDuration: actualDuration
        });
    } catch (err) {
        if (err.message === "UNAUTHORIZED" || err.message === "SESSION_EXPIRED") {
            return utils.sendJSON(e, 401, { success: false, error: "SESSION_EXPIRED" });
        }
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🏠 POST /api/custom/projects-summary
routerAdd("POST", "/api/custom/projects-summary", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.initExtraCollections();
        const user = utils.validateSession(e);

        // Fetch all projects
        const projectRecords = $app.findRecordsByFilter("projects", "", "", 100, 0);
        let projects = projectRecords.map(r => ({
            id: r.get("projectId"),
            name: r.get("name"),
            area: r.get("area"),
            startDate: r.get("startDate"),
            status: r.get("status")
        }));

        // Helper for Goja array search
        const arrayContains = (arr, item) => {
            if (!arr) return false;
            for (let i = 0; i < arr.length; i++) {
                if (String(arr[i]).trim() === String(item).trim()) return true;
            }
            return false;
        };

        // Filter projects by user allowed_projects if restricted
        if (user.role !== "superadmin" && user.role !== "internal_admin") {
            const userAllowedProjs = user.allowed_projects || [];
            if (userAllowedProjs.length > 0 && !arrayContains(userAllowedProjs, "ALL")) {
                projects = projects.filter(p => arrayContains(userAllowedProjs, p.id));
            }
        }

        if (projects.length === 0) {
            return utils.sendJSON(e, 200, {
                success: true,
                summary: {
                    totalProjects: 0,
                    totalOnTrack: 0,
                    totalAlert: 0,
                    avgOverallProgress: 0
                },
                projects: []
            });
        }

        const projectSummaries = projects.map(proj => {
            const iacRecords = $app.findRecordsByFilter("iacs", "projectId = {:pId}", "", 200, 0, { pId: proj.id });
            const iacs = iacRecords.map(r => ({
                id: r.get("iacId"),
                title: r.get("title"),
                weight: r.get("weight")
            }));

            let subRecords = $app.findRecordsByFilter("subs", "projectId = {:pId}", "", 500, 0, { pId: proj.id });
            let subs = subRecords.map(r => ({
                id: r.get("subId"),
                iacId: r.get("iacId"),
                title: r.get("title"),
                contractor: r.get("contractor"),
                weight: r.get("weight")
            }));

            let progressRecords = $app.findRecordsByFilter("daily_progress", "projectId = {:pId}", "", 5000, 0, { pId: proj.id });
            let dailyProgress = progressRecords.map(r => ({
                date: r.get("date"),
                subId: r.get("subId"),
                progress: r.get("progress"),
                remarks: r.get("remarks"),
                status: r.get("status") || "validated"
            }));

            if (user.role === "kontraktor_admin") {
                const userPtKode = (user.pt_name || user.pt || "").toUpperCase();
                const userScope = user.jobdesk_scope || [];
                subs = subs.filter(s => {
                    const sContractor = (s.contractor || "").toUpperCase();
                    return sContractor.includes(userPtKode) || userPtKode.includes(sContractor) || userScope.includes(s.id);
                });
                const activeSubIds = new Set(subs.map(s => s.id));
                dailyProgress = dailyProgress.filter(p => activeSubIds.has(p.subId));
            }

            const latestSubProgress = {};
            let latestDate = null;
            dailyProgress.forEach(p => {
                // Only validated count
                if (p.status === "validated") {
                    latestSubProgress[p.subId] = p.progress;
                    if (!latestDate || new Date(p.date) > new Date(latestDate)) latestDate = p.date;
                }
            });

            // Calculate overall progress
            let overallProgress = 0;
            let totalIacWeight = 0;
            iacs.forEach(iac => {
                const relatedSubs = subs.filter(s => s.iacId === iac.id);
                let sum = 0, wTotal = 0;
                relatedSubs.forEach(s => {
                    sum += ((latestSubProgress[s.id] || 0) * (s.weight / 100));
                    wTotal += s.weight;
                });
                const iacProg = wTotal > 0 ? (sum * (100 / wTotal)) : 0;
                overallProgress += (iacProg * (iac.weight / 100));
                totalIacWeight += iac.weight;
            });

            if (totalIacWeight > 0) overallProgress = overallProgress * (100 / totalIacWeight);
            overallProgress = Math.min(100, Math.round(overallProgress * 100) / 100);

            return {
                id: proj.id,
                name: proj.name,
                area: proj.area,
                status: proj.status,
                startDate: proj.startDate,
                overallProgress: overallProgress,
                alertCount: 0,
                lastProgressDate: latestDate,
                lastProgressRemarks: dailyProgress.length > 0 ? dailyProgress[dailyProgress.length - 1].remarks : ""
            };
        });

        return utils.sendJSON(e, 200, {
            success: true,
            summary: {
                totalProjects: projects.length,
                totalOnTrack: projects.length,
                totalAlert: 0,
                avgOverallProgress: projects.length ? projectSummaries.reduce((a, b) => a + b.overallProgress, 0) / projects.length : 0
            },
            projects: projectSummaries
        });
    } catch (err) {
        if (err.message === "UNAUTHORIZED" || err.message === "SESSION_EXPIRED") {
            return utils.sendJSON(e, 401, { success: false, error: "SESSION_EXPIRED" });
        }
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📌 POST /api/custom/save-progress
// Input Progres dengan Validasi Ketat Sisi Server & Workflow Validasi
routerAdd("POST", "/api/custom/save-progress", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.initExtraCollections();
        const user = utils.validateSession(e);
        const body = utils.getRequestBody(e);

        const pId = body.projectId || "";
        const date = body.date || "";
        const subId = body.subId || "";
        const progress = parseFloat(body.progress);
        const remarks = body.remarks || "";
        const photoBase64 = body.photoBase64 || "";
        const shift = body.shift || "";
        const manpowerActual = parseFloat(body.manpower) || 0;
        const delayReasonCode = body.delayCode || "";
        const constraintDescription = body.constraint || "";
        const recoveryAction = body.recovery || "";
        const lokasi = body.lokasi || "";

        // 1. Validasi Input Wajib
        if (!pId || !date || !subId) {
            return utils.sendJSON(e, 400, { success: false, error: "Proyek, Tanggal, dan Sub-Jobdesk wajib diisi." });
        }

        // 2. Validasi Angka Progres 0 - 100
        if (isNaN(progress) || progress < 0 || progress > 100) {
            return utils.sendJSON(e, 400, { success: false, error: "Persentase progres harus berada di antara 0% dan 100%." });
        }

        // 3. Validasi Progres Kumulatif Monotonik (Tidak boleh turun dari progres tanggal sebelumnya)
        try {
            const priorRecords = $app.findRecordsByFilter("daily_progress", "projectId = {:pId} && subId = {:subId} && date < {:date}", "", 50, 0, { pId, subId, date });
            let maxPrior = 0;
            priorRecords.forEach(r => {
                const rp = r.getFloat("progress") || 0;
                if (rp > maxPrior) maxPrior = rp;
            });
            if (progress < maxPrior) {
                return utils.sendJSON(e, 400, {
                    success: false,
                    error: `Progres kumulatif tidak boleh turun (${progress}%). Capaian tanggal sebelumnya sudah mencapai ${maxPrior}%.`
                });
            }
        } catch(priorErr) {}

        // 3. Verifikasi Sub & Hak Akses Kontraktor
        let subTitle = subId;
        let subContractor = "";
        try {
            const subRec = $app.findFirstRecordByFilter("subs", "projectId = {:pId} && subId = {:subId}", { pId, subId });
            subTitle = subRec.get("title");
            subContractor = subRec.get("contractor");
        } catch (err) {}

        if (user.role === "kontraktor_admin") {
            const userPtKode = (user.pt_name || user.pt || "").toUpperCase();
            const userScope = user.jobdesk_scope || [];
            const isMatch = subContractor.toUpperCase().includes(userPtKode) || userPtKode.includes(subContractor.toUpperCase()) || userScope.includes(subId);
            if (!isMatch) {
                return utils.sendJSON(e, 403, { success: false, error: "Anda tidak memiliki hak akses untuk melaporkan Sub-Jobdesk ini." });
            }
        }

        // 3b. Verifikasi Batasan Area Kerja / Lokasi (Work Area Scope)
        if (user.role !== "superadmin" && user.role !== "internal_admin") {
            const allowedLocs = user.allowed_locations || [];
            if (allowedLocs.length > 0 && allowedLocs.indexOf("ALL") === -1) {
                const lokStr = String(lokasi || "").toLowerCase();
                let isMatch = false;
                for (let li = 0; li < allowedLocs.length; li++) {
                    const lStr = String(allowedLocs[li] || "").toLowerCase();
                    if (lokStr.indexOf(lStr) !== -1 || lStr.indexOf(lokStr) !== -1) {
                        isMatch = true;
                        break;
                    }
                }
                if (lokasi && !isMatch) {
                    return utils.sendJSON(e, 403, {
                        success: false,
                        error: `Akses Lokasi Ditolak: Anda tidak memiliki izin untuk menginput progres di area kerja '${lokasi}'. Area kerja Anda dibatasi.`
                    });
                }
            }
        }

        // Status untuk Kontraktor selalu "submitted" (Pending Approval Internal Admin)
        const initialStatus = user.role === "kontraktor_admin" ? "submitted" : "validated";
        const ptId = user.role === "kontraktor_admin" ? user.pt : (subContractor || "Internal");
        const ptName = user.role === "kontraktor_admin" ? (user.pt_name || user.pt) : (subContractor || "Internal KSD");

        // 4. Update / Insert di daily_progress using Record API
        try {
            const dailyCol = $app.findCollectionByNameOrId("daily_progress");
            let dRec = null;
            try {
                dRec = $app.findFirstRecordByFilter("daily_progress", "projectId = {:pId} && date = {:date} && subId = {:subId}", { pId, date, subId });
            } catch (findErr) {}

            if (!dRec) {
                dRec = new Record(dailyCol);
                dRec.set("projectId", pId);
                dRec.set("subId", subId);
                dRec.set("date", date);
            }

            dRec.set("progress", progress);
            dRec.set("remarks", remarks);
            dRec.set("inputBy", user.name);
            dRec.set("photoUrl", photoBase64);
            dRec.set("shift", shift);
            dRec.set("manpowerActual", manpowerActual);
            dRec.set("delayReasonCode", delayReasonCode);
            dRec.set("constraintDescription", constraintDescription);
            dRec.set("recoveryAction", recoveryAction);
            dRec.set("status", initialStatus);
            dRec.set("pt", ptId);
            dRec.set("pt_name", ptName);
            $app.save(dRec);
        } catch (dailySaveErr) {
            console.log("Error saving daily_progress record: " + dailySaveErr);
        }

        // 5. Insert Log ke progress_log
        let logId = "";
        try {
            const progCol = $app.findCollectionByNameOrId("progress_log");
            const pLog = new Record(progCol);
            pLog.set("jobdesk", subId);
            pLog.set("jobdesk_name", subTitle);
            pLog.set("subId", subId);
            pLog.set("projectId", pId);
            pLog.set("pt", ptId);
            pLog.set("pt_name", ptName);
            pLog.set("date", date);
            pLog.set("lokasi", lokasi || "Area Kerja Proyek");
            pLog.set("deskripsi_pekerjaan", remarks || `Laporan Progres ${progress}%`);
            pLog.set("persentase_progress", progress);
            pLog.set("foto", photoBase64);
            pLog.set("shift", shift);
            pLog.set("manpowerActual", manpowerActual);
            pLog.set("delayReasonCode", delayReasonCode);
            pLog.set("constraintDescription", constraintDescription);
            pLog.set("recoveryAction", recoveryAction);
            pLog.set("status", initialStatus);
            pLog.set("submitted_by", user.id);
            pLog.set("submitted_by_name", user.name);
            $app.save(pLog);
            logId = pLog.id;
        } catch (logErr) {
            console.log("Error inserting into progress_log: " + logErr);
        }

        // 6. Broadcast Notifikasi ke Internal Admin jika Kontraktor Submit
        if (user.role === "kontraktor_admin") {
            utils.notifyInternalAdmins(
                `📥 Pengajuan Progres Baru (${ptName})`,
                `${user.name} melaporkan capaian ${progress}% pada sub-jobdesk [${subId}] ${subTitle}. Menunggu validasi internal admin.`,
                "progress_submitted",
                ptId,
                ptName,
                subId,
                pId,
                logId
            );
        }

        return utils.sendJSON(e, 200, {
            success: true,
            status: initialStatus,
            message: initialStatus === "submitted" ? "Progres berhasil dikirim! Menunggu validasi dari Admin Internal." : "Progres berhasil disimpan!"
        });
    } catch (err) {
        if (err.message === "UNAUTHORIZED" || err.message === "SESSION_EXPIRED") {
            return utils.sendJSON(e, 401, { success: false, error: "SESSION_EXPIRED" });
        }
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// ✅ POST /api/custom/validate-progress
// Validasi Internal Admin (Approve / Reject)
routerAdd("POST", "/api/custom/validate-progress", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "internal_admin" && user.role !== "superadmin" && user.role !== "admin") {
            return utils.sendJSON(e, 403, { success: false, error: "Hanya Admin Internal yang berhak memvalidasi progres." });
        }

        const body = utils.getRequestBody(e);
        const pId = body.projectId || "";
        const subId = body.subId || "";
        const date = body.date || "";
        const action = body.action || "approve"; // approve | reject
        const comment = body.comment || "";
        const targetStatus = action === "approve" ? "validated" : "rejected";

        if (!pId || !subId || !date) {
            return utils.sendJSON(e, 400, { success: false, error: "Project ID, Sub ID, dan Tanggal diperlukan." });
        }

        // Update daily_progress records using Record API
        try {
            const dailyRecs = $app.findRecordsByFilter("daily_progress", "projectId = {:pId} && subId = {:subId} && date = {:date}", "", 0, 0, { pId, subId, date });
            for (let dRec of dailyRecs) {
                dRec.set("status", targetStatus);
                dRec.set("validated_by", user.id);
                dRec.set("validated_by_name", user.name);
                dRec.set("catatan_validasi", comment);
                $app.save(dRec);
            }
        } catch (errDaily) {
            console.log("Error updating daily_progress status: " + errDaily);
        }

        // Update progress_log & find submitter to notify
        let submitterId = "";
        let ptName = "";
        try {
            const progRec = $app.findFirstRecordByFilter("progress_log", "projectId = {:pId} && subId = {:subId} && date = {:date}", { pId, subId, date });
            if (progRec) {
                submitterId = progRec.get("submitted_by");
                ptName = progRec.get("pt_name");
                progRec.set("status", targetStatus);
                progRec.set("validated_by", user.id);
                progRec.set("validated_by_name", user.name);
                progRec.set("validated_at", new Date().toISOString());
                progRec.set("catatan_validasi", comment);
                $app.save(progRec);
            }
        } catch (e) {}

        if (!submitterId) {
            try {
                const cUser = $app.findFirstRecordByFilter("users", "role = 'kontraktor_admin'");
                if (cUser) submitterId = cUser.id;
            } catch (uErr) {}
        }

        // Kirim Notifikasi Balik ke Kontraktor
        if (submitterId) {
            const notifTitle = action === "approve" ? `✅ Progres Disetujui (${subId})` : `❌ Progres Ditolak (${subId})`;
            const notifMsg = action === "approve"
                ? `Progres Anda untuk Sub [${subId}] pada tanggal ${date} telah disetujui oleh ${user.name}.${comment ? " Catatan: " + comment : ""}`
                : `Progres Anda untuk Sub [${subId}] pada tanggal ${date} ditolak oleh ${user.name}. Alasan: ${comment || "Perlu revisi data lapangan."}`;
            
            utils.notifyContractor(
                submitterId,
                notifTitle,
                notifMsg,
                action === "approve" ? "progress_validated" : "progress_rejected",
                "",
                ptName,
                subId,
                pId,
                "",
                action === "approve" ? "success" : "danger"
            );
        }

        return utils.sendJSON(e, 200, {
            success: true,
            newStatus: targetStatus,
            message: `Progres berhasil di-${action === "approve" ? "setujui (Approved)" : "tolak (Rejected)"}.`
        });
    } catch (err) {
        if (err.message === "UNAUTHORIZED" || err.message === "SESSION_EXPIRED") {
            return utils.sendJSON(e, 401, { success: false, error: "SESSION_EXPIRED" });
        }
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// ✅ POST /api/custom/approve-validation
routerAdd("POST", "/api/custom/approve-validation", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "internal_admin" && user.role !== "superadmin" && user.role !== "admin") {
            return utils.sendJSON(e, 403, { success: false, error: "Hanya Admin yang berhak menyetujui validasi." });
        }
        const body = utils.getRequestBody(e);
        const valId = body.validationId || "";
        const notes = body.notes || body.comment || "Disetujui via notifikasi";

        if (!valId) {
            return utils.sendJSON(e, 400, { success: false, error: "Validation ID wajib disertakan." });
        }

        try {
            const dRec = $app.findFirstRecordByFilter("daily_progress", "id = {:valId}", { valId });
            if (dRec) {
                dRec.set("status", "validated");
                dRec.set("validated_by", user.id);
                dRec.set("validated_by_name", user.name);
                dRec.set("catatan_validasi", notes);
                $app.save(dRec);
            }
        } catch(e1) {}

        try {
            const vRec = $app.findFirstRecordByFilter("validations", "id = {:valId}", { valId });
            if (vRec) {
                vRec.set("status", "approved");
                vRec.set("comment", notes);
                vRec.set("user", user.name);
                $app.save(vRec);
            }
        } catch(e2) {}

        return utils.sendJSON(e, 200, { success: true, message: "Validasi progres berhasil disetujui." });
    } catch(err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📋 POST /api/custom/get-pending-validations
routerAdd("POST", "/api/custom/get-pending-validations", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "internal_admin" && user.role !== "superadmin" && user.role !== "admin") {
            return utils.sendJSON(e, 403, { success: false, error: "Akses ditolak." });
        }

        let items = [];
        try {
            const allLogs = $app.findRecordsByFilter("progress_log", "", "", 200, 0);
            for (let r of allLogs) {
                if (r.get("status") === "submitted") {
                    items.push({
                        id: r.id,
                        projectId: r.get("projectId"),
                        subId: r.get("subId"),
                        date: r.get("date"),
                        progress: r.get("persentase_progress"),
                        remarks: r.get("deskripsi_pekerjaan"),
                        inputBy: r.get("submitted_by_name"),
                        photoUrl: r.get("foto"),
                        shift: r.get("shift"),
                        manpowerActual: r.get("manpowerActual"),
                        delayReasonCode: r.get("delayReasonCode"),
                        constraintDescription: r.get("constraintDescription"),
                        recoveryAction: r.get("recoveryAction"),
                        pt: r.get("pt"),
                        pt_name: r.get("pt_name"),
                        lokasi: r.get("lokasi"),
                        created: r.get("created")
                    });
                }
            }
        } catch (err1) {
            console.log("Error reading progress_log for pending validations: " + err1);
        }

        return utils.sendJSON(e, 200, { success: true, items });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🔔 POST /api/custom/notifications
routerAdd("POST", "/api/custom/notifications", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        const notifications = [];

        // 1. Fetch user-specific notifications from notifications collection
        try {
            const allNotifs = $app.findRecordsByFilter("notifications", "", "", 100, 0);
            for (let r of allNotifs) {
                const target = r.get("user_target") || "";
                const tipe = r.get("tipe") || "";
                
                let isMatch = false;
                if (user.role === "internal_admin" || user.role === "superadmin" || user.role === "admin") {
                    if (!target || target === user.id || tipe === "kontraktor_opened_update" || tipe === "progress_submitted") {
                        isMatch = true;
                    }
                } else if (user.role === "kontraktor_admin") {
                    if (target === user.id || (!target && (tipe === "progress_validated" || tipe === "progress_rejected")) || (r.get("pt") && r.get("pt") === user.pt)) {
                        isMatch = true;
                    }
                } else {
                    if (!target || target === user.id) isMatch = true;
                }

                if (isMatch) {
                    notifications.push({
                        id: r.id,
                        type: tipe,
                        title: r.get("title"),
                        message: r.get("message"),
                        time: r.get("created"),
                        icon: r.get("icon") || "bell",
                        color: r.get("color") || "accent",
                        is_read: r.get("is_read") || false
                    });
                }
            }
        } catch (err) {
            console.log("Error fetching notifications: " + err);
        }

        // 2. Delay Entries Alert
        try {
            const progRecs = $app.findRecordsByFilter("daily_progress", "delayReasonCode != ''", "", 5, 0);
            for (let r of progRecs) {
                const code = r.get("delayReasonCode");
                if (code && code.toString().trim() !== "") {
                    notifications.push({
                        id: `DELAY-${r.id}`,
                        type: "delay",
                        title: `🚨 Kendala Lapangan: ${code}`,
                        message: `${r.get("constraintDescription") || "Kendala operasional"} (Sub: ${r.get("subId")})`,
                        time: r.get("date") || r.get("created"),
                        icon: "alert-triangle",
                        color: "danger",
                        is_read: false
                    });
                }
            }
        } catch (err) {}

        return utils.sendJSON(e, 200, { success: true, notifications });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🔕 POST /api/custom/mark-notifications-read
routerAdd("POST", "/api/custom/mark-notifications-read", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        try {
            $app.db().newQuery("UPDATE notifications SET is_read = 1 WHERE user_target = {:uId}")
                .bind({ uId: user.id })
                .execute();
        } catch (err) {}
        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🏢 POST /api/custom/get-pts-list
routerAdd("POST", "/api/custom/get-pts-list", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        const ptRecs = $app.findRecordsByFilter("pt", "", "", 100, 0);
        const pts = ptRecs.map(r => ({
            id: r.id,
            kode_pt: r.get("kode_pt"),
            nama_pt: r.get("nama_pt"),
            lokasi_default: r.get("lokasi_default"),
            status_aktif: r.get("status_aktif"),
            kontak_pic: r.get("kontak_pic")
        }));
        return utils.sendJSON(e, 200, { success: true, pts });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 👥 POST /api/custom/get-users-list
routerAdd("POST", "/api/custom/get-users-list", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        const userRecords = $app.findRecordsByFilter("users", "", "", 200, 0);
        const users = userRecords.map(r => {
            let role = r.get("role") || "internal_admin";
            if (role === "superadmin" || role === "admin") role = "internal_admin";
            if (role === "manager") role = "internal_viewer";

            let jobdeskScope = utils.parseGojaJson(r.get("jobdesk_scope"));
            let allowedProjects = utils.parseGojaJson(r.get("allowed_projects"));
            let allowedLocations = utils.parseGojaJson(r.get("allowed_locations"));

            return {
                id: r.id,
                username: r.email() || r.get("email") || r.username(),
                name: r.get("name"),
                role: role,
                pt: r.get("pt") || "",
                pt_name: r.get("pt_name") || "",
                jobdesk_scope: jobdeskScope,
                allowed_projects: allowedProjects,
                allowed_locations: allowedLocations,
                mustChange: false
            };
        });
        return utils.sendJSON(e, 200, { success: true, users });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 👤 POST /api/custom/create-user
routerAdd("POST", "/api/custom/create-user", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.initExtraCollections();
        const user = utils.validateSession(e);
        if (user.role !== "internal_admin" && user.role !== "superadmin") {
            return utils.sendJSON(e, 403, { success: false, error: "Hanya Admin Internal / Superadmin yang dapat menambah pengguna." });
        }

        const body = utils.getRequestBody(e);
        const username = body.username || "";
        const name = body.name || "";
        const role = body.role || "internal_admin";
        const pt = body.pt || "";
        const pt_name = body.pt_name || "";
        const jobdesk_scope = body.jobdesk_scope || [];
        const allowed_projects = body.allowed_projects || [];
        const allowed_locations = body.allowed_locations || [];
        const permissions = body.permissions || [];
        const password = body.initialPassword || body.password || "ksd12345";

        if (!username || !name) {
            return utils.sendJSON(e, 400, { success: false, error: "Username dan nama wajib diisi." });
        }

        const usersCol = $app.findCollectionByNameOrId("users");
        const newRecord = new Record(usersCol);
        newRecord.set("username", username.split("@")[0]);
        newRecord.set("email", username.includes("@") ? username : `${username}@ksd.com`);
        newRecord.set("name", name);
        newRecord.set("role", role);
        newRecord.set("pt", pt);
        newRecord.set("pt_name", pt_name);
        newRecord.set("jobdesk_scope", JSON.stringify(jobdesk_scope));
        newRecord.set("allowed_projects", JSON.stringify(allowed_projects));
        newRecord.set("allowed_locations", JSON.stringify(allowed_locations));
        newRecord.set("permissions", JSON.stringify(permissions));
        newRecord.setPassword(password);
        newRecord.set("emailVisibility", true);
        newRecord.set("verified", true);
        $app.save(newRecord);

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🔐 POST /api/custom/change-password
routerAdd("POST", "/api/custom/change-password", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const newPass = body.newPass || "";
        if (!newPass || newPass.length < 6) {
            return utils.sendJSON(e, 400, { success: false, error: "Password minimal 6 karakter." });
        }

        const record = $app.findRecordById("users", user.id);
        record.setPassword(newPass);
        $app.save(record);

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🔑 POST /api/custom/reset-password
routerAdd("POST", "/api/custom/reset-password", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "internal_admin" && user.role !== "superadmin") {
            return utils.sendJSON(e, 403, { success: false, error: "Hanya Admin Internal yang dapat mereset password." });
        }

        const body = utils.getRequestBody(e);
        const targetUser = body.targetUser || "";
        const newPass = body.newPass || "ksd12345";

        let record = null;
        try {
            record = $app.findAuthRecordByEmail("users", targetUser);
        } catch (err1) {
            if (targetUser.indexOf("@") === -1) {
                try {
                    const fallbackEmail = targetUser + "@ksd.com";
                    record = $app.findAuthRecordByEmail("users", fallbackEmail);
                } catch (errFallback) {
                    return utils.sendJSON(e, 404, { success: false, error: "Pengguna tidak ditemukan." });
                }
            } else {
                return utils.sendJSON(e, 404, { success: false, error: "Pengguna tidak ditemukan." });
            }
        }

        if (!record) {
            return utils.sendJSON(e, 404, { success: false, error: "Pengguna tidak ditemukan." });
        }

        record.setPassword(newPass);
        $app.save(record);

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// ❌ POST /api/custom/delete-user
routerAdd("POST", "/api/custom/delete-user", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "internal_admin" && user.role !== "superadmin") {
            return utils.sendJSON(e, 403, { success: false, error: "Hanya Admin Internal yang dapat menghapus pengguna." });
        }

        const body = utils.getRequestBody(e);
        const targetUser = body.targetUser || "";

        let record;
        try {
            record = $app.findAuthRecordByEmail("users", targetUser);
        } catch (err1) {
            record = $app.findAuthRecordByUsername("users", targetUser);
        }

        $app.delete(record);
        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📌 POST /api/custom/create-project
routerAdd("POST", "/api/custom/create-project", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "superadmin" && user.role !== "internal_admin") {
            return utils.sendJSON(e, 403, { success: false, error: "Hanya Admin / Superadmin yang dapat membuat proyek baru." });
        }
        const body = utils.getRequestBody(e);
        const id = (body.id || body.projectId || "").trim().toUpperCase();
        const name = (body.name || body.projectName || "").trim();
        const area = (body.area || "").trim();
        const startDate = body.startDate || body.startDatePlanned || "";
        const plannedFinish = body.plannedFinish || "";
        const shutdownType = body.shutdownType || "";
        const status = body.status || "In Progress";

        if (!id || !name) {
            return utils.sendJSON(e, 400, { success: false, error: "Project ID dan Nama Proyek wajib diisi." });
        }

        // Check if project already exists
        try {
            const existing = $app.findFirstRecordByFilter("projects", "projectId = {:pId}", { pId: id });
            if (existing) {
                return utils.sendJSON(e, 400, { success: false, error: `Project ID '${id}' sudah terdaftar dalam sistem.` });
            }
        } catch (findErr) {}

        const newId = $security.randomString(15);
        $app.db().newQuery("INSERT INTO projects (id, projectId, name, area, startDate, plannedFinish, shutdownType, status, baselineLocked) VALUES ({:id}, {:pId}, {:name}, {:area}, {:startDate}, {:plannedFinish}, {:shutdownType}, {:status}, 0)")
            .bind({ id: newId, pId: id, name, area, startDate, plannedFinish, shutdownType, status })
            .execute();

        return utils.sendJSON(e, 200, { success: true, message: `Proyek '${id}' berhasil didaftarkan!` });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🗑️ POST /api/custom/delete-project
routerAdd("POST", "/api/custom/delete-project", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "superadmin" && user.role !== "internal_admin") {
            return utils.sendJSON(e, 403, { success: false, error: "Hanya Superadmin / Admin yang memiliki izin untuk menghapus proyek." });
        }

        const body = utils.getRequestBody(e);
        const pId = (body.projectId || body.id || "").trim();
        if (!pId) {
            return utils.sendJSON(e, 400, { success: false, error: "Project ID wajib disertakan." });
        }

        // Cascade delete across all tables
        try {
            const pRecords = $app.findRecordsByFilter("projects", "projectId = {:pId} || id = {:pId}", "", 10, 0, { pId });
            pRecords.forEach(r => $app.delete(r));
        } catch(eRec) {}

        try { $app.db().newQuery("DELETE FROM projects WHERE projectId = {:pId} OR id = {:pId}").bind({ pId }).execute(); } catch(e1) {}
        try { $app.db().newQuery("DELETE FROM iacs WHERE projectId = {:pId}").bind({ pId }).execute(); } catch(e2) {}
        try { $app.db().newQuery("DELETE FROM subs WHERE projectId = {:pId}").bind({ pId }).execute(); } catch(e3) {}
        try { $app.db().newQuery("DELETE FROM daily_progress WHERE projectId = {:pId}").bind({ pId }).execute(); } catch(e4) {}
        try { $app.db().newQuery("DELETE FROM baseline_schedule WHERE projectId = {:pId}").bind({ pId }).execute(); } catch(e5) {}
        try { $app.db().newQuery("DELETE FROM material_logs WHERE projectId = {:pId}").bind({ pId }).execute(); } catch(e6) {}
        try { $app.db().newQuery("DELETE FROM manpower_logs WHERE projectId = {:pId}").bind({ pId }).execute(); } catch(e7) {}
        try { $app.db().newQuery("DELETE FROM progress_log WHERE projectId = {:pId}").bind({ pId }).execute(); } catch(e8) {}
        try { $app.db().newQuery("DELETE FROM notifications WHERE projectId = {:pId}").bind({ pId }).execute(); } catch(e9) {}
        try { $app.db().newQuery("DELETE FROM castable_inspeksi WHERE projectId = {:pId}").bind({ pId }).execute(); } catch(e10) {}
        try { $app.db().newQuery("DELETE FROM validations WHERE projectId = {:pId}").bind({ pId }).execute(); } catch(e11) {}

        return utils.sendJSON(e, 200, { success: true, message: `Proyek '${pId}' beserta seluruh data turunan berhasil dihapus.` });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🗑️ POST /api/custom/delete-iac
routerAdd("POST", "/api/custom/delete-iac", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "superadmin" && user.role !== "internal_admin") {
            return utils.sendJSON(e, 403, { success: false, error: "Hanya Admin yang berhak menghapus IAC." });
        }
        const body = utils.getRequestBody(e);
        const pId = (body.projectId || "").trim();
        const iacId = (body.iacId || "").trim();
        if (!pId || !iacId) {
            return utils.sendJSON(e, 400, { success: false, error: "Project ID dan IAC ID wajib disertakan." });
        }

        try { $app.db().newQuery("DELETE FROM iacs WHERE projectId = {:pId} AND iacId = {:iacId}").bind({ pId, iacId }).execute(); } catch(e1) {}
        try { $app.db().newQuery("DELETE FROM subs WHERE projectId = {:pId} AND iacId = {:iacId}").bind({ pId, iacId }).execute(); } catch(e2) {}
        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🗑️ POST /api/custom/delete-sub
routerAdd("POST", "/api/custom/delete-sub", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "superadmin" && user.role !== "internal_admin") {
            return utils.sendJSON(e, 403, { success: false, error: "Hanya Admin yang berhak menghapus Sub-Jobdesk." });
        }
        const body = utils.getRequestBody(e);
        const pId = (body.projectId || "").trim();
        const subId = (body.subId || "").trim();
        if (!pId || !subId) {
            return utils.sendJSON(e, 400, { success: false, error: "Project ID dan Sub ID wajib disertakan." });
        }

        try { $app.db().newQuery("DELETE FROM subs WHERE projectId = {:pId} AND subId = {:subId}").bind({ pId, subId }).execute(); } catch(e1) {}
        try { $app.db().newQuery("DELETE FROM daily_progress WHERE projectId = {:pId} AND subId = {:subId}").bind({ pId, subId }).execute(); } catch(e2) {}
        try { $app.db().newQuery("DELETE FROM baseline_schedule WHERE projectId = {:pId} AND subId = {:subId}").bind({ pId, subId }).execute(); } catch(e3) {}
        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📌 POST /api/custom/add-iac
routerAdd("POST", "/api/custom/add-iac", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const pId = body.projectId || "";
        const id = body.id || "";
        const title = body.title || "";
        const weight = parseFloat(body.weight) || 0;

        const newId = $security.randomString(15);
        $app.db().newQuery("INSERT INTO iacs (id, projectId, iacId, title, weight, criticalFlag) VALUES ({:id}, {:pId}, {:iacId}, {:title}, {:weight}, 0)")
            .bind({ id: newId, pId, iacId: id, title, weight })
            .execute();

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📌 POST /api/custom/add-sub
routerAdd("POST", "/api/custom/add-sub", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const pId = body.projectId || "";
        const id = body.id || "";
        const iacId = body.iacId || "";
        const title = body.title || "";
        const contractor = body.contractor || "";
        const weight = parseFloat(body.weight) || 0;

        const newId = $security.randomString(15);
        $app.db().newQuery("INSERT INTO subs (id, projectId, subId, iacId, title, contractor, weight, criticalFlag, milestoneFlag) VALUES ({:id}, {:pId}, {:subId}, {:iacId}, {:title}, {:contractor}, {:weight}, 0, 0)")
            .bind({ id: newId, pId, subId: id, iacId, title, contractor, weight })
            .execute();

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📌 POST /api/custom/save-baseline
routerAdd("POST", "/api/custom/save-baseline", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const pId = body.projectId || "";
        const subId = body.subId || "";
        const start = body.plannedStart || body.start || "";
        const finish = body.plannedFinish || body.finish || "";
        const duration = parseInt(body.plannedDuration || body.duration) || 0;
        const pred = body.predecessorSubId || body.pred || "";
        const isCritical = body.criticalFlag || body.isCritical ? 1 : 0;

        try {
            $app.db().newQuery("UPDATE subs SET predecessorSubId = {:pred}, criticalFlag = {:crit} WHERE projectId = {:pId} AND subId = {:subId}")
                .bind({ pred, crit: isCritical, pId, subId })
                .execute();
        } catch (subErr) {}

        $app.db().newQuery("DELETE FROM baseline_schedule WHERE projectId = {:pId} AND subId = {:subId}")
            .bind({ pId, subId })
            .execute();

        const newId = $security.randomString(15);
        $app.db().newQuery("INSERT INTO baseline_schedule (id, projectId, subId, plannedStart, plannedFinish, plannedDuration) VALUES ({:id}, {:pId}, {:subId}, {:start}, {:finish}, {:duration})")
            .bind({ id: newId, pId, subId, start, finish, duration })
            .execute();

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📌 POST /api/custom/save-material-log
routerAdd("POST", "/api/custom/save-material-log", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const pId = body.projectId || "";
        const subId = body.subId || "";
        const matCode = body.materialCode || "";
        const qtyPlanned = parseFloat(body.qtyPlanned) || 0;
        const qtyIssued = parseFloat(body.qtyIssued) || 0;
        const qtyConsumed = parseFloat(body.qtyConsumed) || 0;
        const qtyReturn = parseFloat(body.qtyReturn) || 0;
        const shortage = parseFloat(body.shortage) || 0;

        const newId = $security.randomString(15);
        $app.db().newQuery("INSERT INTO material_logs (id, projectId, subId, materialCode, qtyPlanned, qtyIssued, qtyConsumed, qtyReturn, shortage, reportedBy) VALUES ({:id}, {:pId}, {:subId}, {:matCode}, {:qtyPlanned}, {:qtyIssued}, {:qtyConsumed}, {:qtyReturn}, {:shortage}, {:rep})")
            .bind({ id: newId, pId, subId, matCode, qtyPlanned, qtyIssued, qtyConsumed, qtyReturn, shortage, rep: user.name })
            .execute();

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📌 POST /api/custom/save-manpower-log
routerAdd("POST", "/api/custom/save-manpower-log", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const pId = body.projectId || "";
        const subId = body.subId || "";
        const date = body.date || "";
        const contractor = body.contractor || user.pt_name || "";
        const shift = body.shift || "";
        const manpowerActual = parseFloat(body.manpowerActual) || 0;
        const manhoursActual = parseFloat(body.manhoursActual) || 0;

        const newId = $security.randomString(15);
        $app.db().newQuery("INSERT INTO manpower_logs (id, projectId, subId, date, contractor, shift, manpowerActual, manhoursActual, reportedBy) VALUES ({:id}, {:pId}, {:subId}, {:date}, {:contractor}, {:shift}, {:mp}, {:mh}, {:rep})")
            .bind({ id: newId, pId, subId, date, contractor, shift, mp: manpowerActual, mh: manhoursActual, rep: user.name })
            .execute();

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📌 POST /api/custom/submit-validation
routerAdd("POST", "/api/custom/submit-validation", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const pId = body.projectId || "";
        const type = body.type || "";
        const status = body.status || "";
        const comment = body.comment || "";

        const newId = $security.randomString(15);
        $app.db().newQuery("INSERT INTO validations (id, projectId, type, user, status, comment) VALUES ({:id}, {:pId}, {:type}, {:user}, {:status}, {:comment})")
            .bind({ id: newId, pId, type, user: user.name, status, comment })
            .execute();

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// ⚙️ POST /api/custom/save-project-config & update-project
const handleSaveProjectConfig = (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "superadmin" && user.role !== "internal_admin") {
            return utils.sendJSON(e, 403, { success: false, error: "Hanya Admin / Superadmin yang dapat memperbarui informasi proyek." });
        }
        const body = utils.getRequestBody(e);
        const pId = (body.projectId || body.id || "").trim();
        const conf = body.conf || body;

        let record = null;
        try {
            record = $app.findFirstRecordByFilter("projects", "projectId = {:pId}", { pId });
        } catch (findErr) {}

        if (!record) {
            return utils.sendJSON(e, 404, { success: false, error: `Proyek '${pId}' tidak ditemukan.` });
        }

        if (conf.projectName || conf.name) record.set("name", conf.projectName || conf.name);
        if (conf.area) record.set("area", conf.area);
        if (conf.startDatePlanned || conf.startDate) record.set("startDate", conf.startDatePlanned || conf.startDate);
        if (conf.plannedFinish) record.set("plannedFinish", conf.plannedFinish);
        if (conf.status) record.set("status", conf.status);
        if (conf.shutdownType) record.set("shutdownType", conf.shutdownType);
        if (conf.baselineLocked !== undefined) record.set("baselineLocked", conf.baselineLocked);
        if (conf.overallStatusGate) record.set("overallStatusGate", conf.overallStatusGate);
        $app.save(record);

        return utils.sendJSON(e, 200, { success: true, message: `Informasi proyek '${pId}' berhasil diperbarui!` });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
};

routerAdd("POST", "/api/custom/save-project-config", handleSaveProjectConfig);
routerAdd("POST", "/api/custom/update-project", handleSaveProjectConfig);

// 📑 POST /api/custom/submit-lessons-learned
routerAdd("POST", "/api/custom/submit-lessons-learned", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const pId = body.projectId || "";
        const category = body.category || "";
        const issue = body.issue || "";
        const rootCause = body.rootCause || "";
        const impact = body.impact || "";
        const recommendation = body.recommendation || "";

        const newId = $security.randomString(15);
        try {
            $app.db().newQuery("INSERT INTO lessons_learned (id, projectId, category, issue, rootCause, impact, recommendation, reportedBy) VALUES ({:id}, {:pId}, {:cat}, {:iss}, {:root}, {:imp}, {:rec}, {:rep})")
                .bind({ id: newId, pId, cat: category, iss: issue, root: rootCause, imp: impact, rec: recommendation, rep: user.name })
                .execute();
        } catch (dbErr) {
            console.log("Lessons learned insert fallback: " + dbErr);
        }

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📥 POST /api/custom/import-project-excel
// Endpoint untuk mengimpor seluruh struktur proyek (Project Info, IAC, Sub-Jobdesk, Baseline, Kontraktor) dari file Excel secara instan
routerAdd("POST", "/api/custom/import-project-excel", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "superadmin" && user.role !== "internal_admin") {
            return utils.sendJSON(e, 403, { success: false, error: "Akses ditolak. Hanya Superadmin / Admin yang dapat mengimpor setup proyek." });
        }

        const body = utils.getRequestBody(e);
        const project = body.project || {};
        const iacs = body.iacs || [];
        const subs = body.subs || [];
        const contractors = body.contractors || [];

        const projectId = (project.id || "").trim();
        const projectName = (project.name || "").trim();
        const area = (project.area || "").trim();
        const startDate = (project.startDate || "").trim();
        const duration = parseInt(project.duration) || 14;

        if (!projectId || !projectName) {
            return utils.sendJSON(e, 400, { success: false, error: "Kode Proyek dan Nama Proyek wajib diisi pada Sheet Info_Proyek." });
        }

        if (!iacs.length || !subs.length) {
            return utils.sendJSON(e, 400, { success: false, error: "Data Struktur_IAC dan Sub_Jobdesk tidak boleh kosong." });
        }

        // 1. Validasi Total Bobot IAC = 100%
        let totalIacWeight = 0;
        iacs.forEach(i => { totalIacWeight += parseFloat(i.weight) || 0; });
        totalIacWeight = Math.round(totalIacWeight * 10) / 10;
        if (Math.abs(totalIacWeight - 100) > 0.5) {
            return utils.sendJSON(e, 400, { success: false, error: `Total bobot IAC harus 100% (saat ini: ${totalIacWeight}%). Periksa sheet Struktur_IAC.` });
        }

        // 2. Validasi Total Bobot Sub per IAC = 100%
        for (const iac of iacs) {
            const relSubs = subs.filter(s => s.iacId === iac.id);
            if (!relSubs.length) {
                return utils.sendJSON(e, 400, { success: false, error: `IAC ${iac.id} (${iac.title}) tidak memiliki Sub-Jobdesk. Minimal 1 sub-jobdesk per IAC.` });
            }
            let subSum = 0;
            relSubs.forEach(s => { subSum += parseFloat(s.weight) || 0; });
            subSum = Math.round(subSum * 10) / 10;
            if (Math.abs(subSum - 100) > 0.5) {
                return utils.sendJSON(e, 400, { success: false, error: `Total bobot Sub-Jobdesk untuk ${iac.id} harus 100% (saat ini: ${subSum}%). Periksa sheet Sub_Jobdesk.` });
            }
        }

        // 3. Upsert Proyek di tabel projects
        try {
            $app.db().newQuery("DELETE FROM projects WHERE projectId = {:pId}").bind({ pId: projectId }).execute();
        } catch(e) {}
        const newProjDbId = $security.randomString(15);
        $app.db().newQuery("INSERT INTO projects (id, projectId, name, area, startDate, status, baselineLocked) VALUES ({:id}, {:pId}, {:name}, {:area}, {:startDate}, 'In Progress', 0)")
            .bind({ id: newProjDbId, pId: projectId, name: projectName, area, startDate })
            .execute();

        // 4. Bersihkan data lama untuk projectId ini agar atomik & bersih
        try { $app.db().newQuery("DELETE FROM iacs WHERE projectId = {:pId}").bind({ pId: projectId }).execute(); } catch(e) {}
        try { $app.db().newQuery("DELETE FROM subs WHERE projectId = {:pId}").bind({ pId: projectId }).execute(); } catch(e) {}
        try { $app.db().newQuery("DELETE FROM baseline_schedule WHERE projectId = {:pId}").bind({ pId: projectId }).execute(); } catch(e) {}

        // 5. Masukkan Seluruh Data IAC
        for (const iac of iacs) {
            const iacDbId = $security.randomString(15);
            $app.db().newQuery("INSERT INTO iacs (id, projectId, iacId, title, weight, criticalFlag) VALUES ({:id}, {:pId}, {:iacId}, {:title}, {:weight}, 0)")
                .bind({ id: iacDbId, pId: projectId, iacId: iac.id.trim(), title: iac.title.trim(), weight: parseFloat(iac.weight) || 0 })
                .execute();
        }

        // 6. Masukkan Seluruh Data Sub-Jobdesk & Baseline
        for (const sub of subs) {
            const subDbId = $security.randomString(15);
            const isCritical = !!(sub.critical || sub.criticalFlag);
            const pred = sub.predecessor || "";
            $app.db().newQuery("INSERT INTO subs (id, projectId, subId, iacId, title, contractor, weight, criticalFlag, milestoneFlag, predecessorSubId) VALUES ({:id}, {:pId}, {:subId}, {:iacId}, {:title}, {:contractor}, {:weight}, {:crit}, 0, {:pred})")
                .bind({
                    id: subDbId,
                    pId: projectId,
                    subId: sub.id.trim(),
                    iacId: sub.iacId.trim(),
                    title: sub.title.trim(),
                    contractor: (sub.contractor || "Internal Team").trim(),
                    weight: parseFloat(sub.weight) || 0,
                    crit: isCritical ? 1 : 0,
                    pred: pred
                })
                .execute();

            // Masukkan data baseline jika ada
            if (sub.plannedStart || sub.plannedFinish) {
                const baseDbId = $security.randomString(15);
                $app.db().newQuery("INSERT INTO baseline_schedule (id, projectId, subId, plannedStart, plannedFinish, plannedDuration) VALUES ({:id}, {:pId}, {:subId}, {:pStart}, {:pFin}, {:dur})")
                    .bind({
                        id: baseDbId,
                        pId: projectId,
                        subId: sub.id.trim(),
                        pStart: sub.plannedStart || startDate,
                        pFin: sub.plannedFinish || "",
                        dur: duration
                    })
                    .execute();
            }
        }

        // 7. Daftarkan Kontraktor Baru jika ada
        if (contractors.length > 0) {
            for (const c of contractors) {
                if (c.code || c.name) {
                    try {
                        const ptDbId = $security.randomString(15);
                        $app.db().newQuery("INSERT OR IGNORE INTO pts (id, code, name, contact, status) VALUES ({:id}, {:code}, {:name}, {:contact}, 'Active')")
                            .bind({ id: ptDbId, code: (c.code || c.name).trim(), name: (c.name || c.code).trim(), contact: (c.contact || "").trim() })
                            .execute();
                    } catch(e) {}
                }
            }
        }

        return utils.sendJSON(e, 200, {
            success: true,
            message: `🎉 Proyek '${projectName}' (${projectId}) berhasil disetup penuh! Total ${iacs.length} IAC, ${subs.length} Sub-Jobdesk dimuat.`,
            projectId: projectId
        });
    } catch(err) {
        return utils.sendJSON(e, 500, { success: false, error: "Gagal impor Excel: " + err.toString() });
    }
});

// 📦 POST /api/custom/create-project-archive
routerAdd("POST", "/api/custom/create-project-archive", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        return utils.sendJSON(e, 200, { success: true, url: "#", message: "Arsip proyek berhasil dibuat!" });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🧹 POST /api/custom/reset-to-clean-production
 routerAdd("POST", "/api/custom/reset-to-clean-production", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        if (user.role !== "superadmin" && user.role !== "internal_admin") {
            return utils.sendJSON(e, 403, { success: false, error: "Akses ditolak. Hanya Admin / Superadmin yang dapat mereset ke mode produksi." });
        }
        utils.initExtraCollections();

        const tablesToWipe = ["daily_progress", "progress_log", "notifications", "material_logs", "manpower_logs", "lessons_learned", "validations", "baseline_schedule", "subs", "iacs", "projects", "castable_checks"];
        for (let name of tablesToWipe) {
            try {
                const recs = $app.findRecordsByFilter(name, "", "", 0, 0);
                for (let r of recs) {
                    $app.delete(r);
                }
            } catch (err) {}
        }
        return utils.sendJSON(e, 200, { success: true, message: "Mode Produksi Bersih siap digerakkan! Silakan tambahkan proyek baru." });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 🧱 CASTABLE INSPECTION & EXTRA MODULES 🧱

// 📥 POST /api/custom/get-castable-data
routerAdd("POST", "/api/custom/get-castable-data", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        utils.initExtraCollections();

        let kategori = [], detailArea = [], typeMaterial = [], settings = {}, records = [];

        try {
            const katRecs = $app.findRecordsByFilter("castable_kategori", "", "", 0, 0);
            kategori = katRecs.map(r => ({ id: r.get("katId") || r.id, nama: r.get("nama") }));
        } catch (err) {}

        try {
            const detRecs = $app.findRecordsByFilter("castable_detail", "", "", 0, 0);
            detailArea = detRecs.map(r => ({ id: r.get("detId") || r.id, kategoriId: r.get("kategoriId"), nama: r.get("nama") }));
        } catch (err) {}

        try {
            const typeRecs = $app.findRecordsByFilter("castable_types", "", "", 0, 0);
            typeMaterial = typeRecs.map(r => ({ id: r.get("typeId") || r.id, nama: r.get("nama"), densitas: r.get("densitas") }));
        } catch (err) {}

        try {
            const setRecs = $app.findRecordsByFilter("castable_settings", "", "", 0, 1);
            if (setRecs.length > 0) {
                settings = {
                    wasteFactor: setRecs[0].get("wasteFactor"),
                    persenCastable: setRecs[0].get("persenCastable"),
                    persenInsulating: setRecs[0].get("persenInsulating")
                };
            }
        } catch (err) {}

        try {
            const checkRecs = $app.findRecordsByFilter("castable_checks", "", "", 0, 0);
            records = checkRecs.map(r => ({
                idLog: r.get("idLog") || r.id,
                tanggalInspeksi: r.get("tanggalInspeksi"),
                vendor: r.get("vendor"),
                kategoriId: r.get("kategoriId"),
                detailId: r.get("detailId"),
                lebar: r.get("lebar"),
                panjang: r.get("panjang"),
                diameterAngkur: r.get("diameterAngkur"),
                panjangAngkur: r.get("panjangAngkur"),
                typeId: r.get("typeId"),
                volumeM3: r.get("volumeM3"),
                tonaseAkhir: r.get("tonaseAkhir"),
                tonaseCastable: r.get("tonaseCastable"),
                tonaseInsulating: r.get("tonaseInsulating"),
                remarks: r.get("remarks"),
                photoUrl: r.get("photoUrl"),
                inspektor: r.get("inspektor"),
                timestamp: r.get("created")
            }));
        } catch (err) {}

        if (kategori.length === 0) {
            kategori = [
                { id: "KAT-01", nama: "Burner Tip & Cone" },
                { id: "KAT-02", nama: "KILN Hood & Transition Zone" }
            ];
        }
        if (detailArea.length === 0) {
            detailArea = [
                { id: "DET-01", kategoriId: "KAT-01", nama: "Burner Tip Sector A" },
                { id: "DET-02", kategoriId: "KAT-02", nama: "Transition Ring Zone 1" }
            ];
        }
        if (typeMaterial.length === 0) {
            typeMaterial = [
                { id: "TYP-01", nama: "High Alumina Castable", densitas: 2.45 },
                { id: "TYP-02", nama: "Silicon Carbide Refractory", densitas: 2.65 }
            ];
        }
        if (!settings.wasteFactor) {
            settings = { wasteFactor: 1.1, persenCastable: 80, persenInsulating: 20 };
        }

        return utils.sendJSON(e, 200, {
            success: true,
            kategori,
            detailArea,
            typeMaterial,
            settings,
            records
        });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// 📌 POST /api/custom/submit-castable
routerAdd("POST", "/api/custom/submit-castable", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        const user = utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const payload = body.payload || body;

        const idLog = `CST-${$security.randomString(6).toUpperCase()}`;
        const tanggalInspeksi = payload.tanggalInspeksi || new Date().toISOString().slice(0, 10);
        const vendor = payload.vendor || "";
        const kategoriId = payload.kategoriId || "";
        const detailId = payload.detailId || "";
        const lebar = parseFloat(payload.lebar) || 0;
        const panjang = parseFloat(payload.panjang) || 0;
        const diameterAngkur = parseFloat(payload.diameterAngkur) || 0;
        const panjangAngkur = parseFloat(payload.panjangAngkur) || 0;
        const typeId = payload.typeId || "";
        const remarks = payload.remarks || "";
        const photoUrl = payload.photoBase64 || "";

        const wf = 1.1, pctCast = 80, pctIns = 20, densitas = 2.45;
        const vol = (lebar / 1000) * (panjang / 1000) * (panjangAngkur / 1000) * wf;
        const tonAkhir = vol * densitas;
        const tonCast = tonAkhir * (pctCast / 100);
        const tonIns = tonAkhir * (pctIns / 100);

        try {
            const col = $app.findCollectionByNameOrId("castable_checks");
            const rec = new Record(col);
            rec.set("idLog", idLog);
            rec.set("tanggalInspeksi", tanggalInspeksi);
            rec.set("vendor", vendor);
            rec.set("kategoriId", kategoriId);
            rec.set("detailId", detailId);
            rec.set("lebar", lebar);
            rec.set("panjang", panjang);
            rec.set("diameterAngkur", diameterAngkur);
            rec.set("panjangAngkur", panjangAngkur);
            rec.set("typeId", typeId);
            rec.set("volumeM3", vol);
            rec.set("tonaseAkhir", tonAkhir);
            rec.set("tonaseCastable", tonCast);
            rec.set("tonaseInsulating", tonIns);
            rec.set("remarks", remarks);
            rec.set("photoUrl", photoUrl);
            rec.set("inspektor", user.name);
            $app.save(rec);
        } catch (dbErr) {
            console.log("Castable insert log: " + dbErr);
        }

        return utils.sendJSON(e, 200, { success: true, idLog });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// ➕ POST /api/custom/add-castable-kategori
routerAdd("POST", "/api/custom/add-castable-kategori", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const nama = body.nama || body.namaKategori || "";
        const katId = `KAT-${$security.randomString(4).toUpperCase()}`;

        try {
            const col = $app.findCollectionByNameOrId("castable_kategori");
            const rec = new Record(col);
            rec.set("katId", katId);
            rec.set("nama", nama);
            $app.save(rec);
        } catch (err) {
            console.log("Add castable kat error: " + err);
        }

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// ➕ POST /api/custom/add-castable-detail
routerAdd("POST", "/api/custom/add-castable-detail", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const kategoriId = body.kategoriId || "";
        const nama = body.nama || "";
        const detId = `DET-${$security.randomString(4).toUpperCase()}`;

        try {
            const col = $app.findCollectionByNameOrId("castable_detail");
            const rec = new Record(col);
            rec.set("detId", detId);
            rec.set("kategoriId", kategoriId);
            rec.set("nama", nama);
            $app.save(rec);
        } catch (err) {
            console.log("Add castable det error: " + err);
        }

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// ➕ POST /api/custom/add-castable-type
routerAdd("POST", "/api/custom/add-castable-type", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const nama = body.nama || "";
        const densitas = parseFloat(body.densitas) || 2.45;
        const typeId = `TYP-${$security.randomString(4).toUpperCase()}`;

        try {
            const col = $app.findCollectionByNameOrId("castable_types");
            const rec = new Record(col);
            rec.set("typeId", typeId);
            rec.set("nama", nama);
            $app.save(rec);
        } catch (err) {
            console.log("Add castable type error: " + err);
        }

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// ⚙️ POST /api/custom/update-castable-settings
routerAdd("POST", "/api/custom/update-castable-settings", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const wf = parseFloat(body.wasteFactor) || 1.1;
        const pctCast = parseFloat(body.persenCastable) || 80;
        const pctIns = parseFloat(body.persenInsulating) || 20;

        try {
            const setRecs = $app.findRecordsByFilter("castable_settings", "", "", 0, 0);
            for (let r of setRecs) {
                $app.delete(r);
            }
            const col = $app.findCollectionByNameOrId("castable_settings");
            const rec = new Record(col);
            rec.set("wasteFactor", wf);
            rec.set("persenCastable", pctCast);
            rec.set("persenInsulating", pctIns);
            $app.save(rec);
        } catch (err) {
            console.log("Update castable set error: " + err);
        }

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});

// ❌ POST /api/custom/delete-castable
routerAdd("POST", "/api/custom/delete-castable", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        const body = utils.getRequestBody(e);
        const idLog = body.idLog || "";

        try {
            const recs = $app.findRecordsByFilter("castable_checks", "idLog = {:idLog} || id = {:idLog}", "", 0, 0, { idLog });
            for (let r of recs) {
                $app.delete(r);
            }
        } catch (err) {
            console.log("Delete castable error: " + err);
        }

        return utils.sendJSON(e, 200, { success: true });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});
