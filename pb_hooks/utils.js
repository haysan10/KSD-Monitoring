function parseGojaJson(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) {
        // Check if it's a Go byte slice (e.g. [91, 34, ...])
        if (raw.length > 0 && typeof raw[0] === "number") {
            try {
                let str = "";
                for (let i = 0; i < raw.length; i++) {
                    str += String.fromCharCode(raw[i]);
                }
                const parsed = JSON.parse(str);
                if (Array.isArray(parsed)) return parsed;
                if (typeof parsed === "string") {
                    try {
                        const p2 = JSON.parse(parsed);
                        if (Array.isArray(p2)) return p2;
                    } catch(e2) {}
                }
                return [];
            } catch(e) {
                return [];
            }
        }
        return raw;
    }
    if (typeof raw === "string") {
        try {
            const p = JSON.parse(raw);
            if (Array.isArray(p)) return p;
            if (typeof p === "string") {
                try {
                    const p2 = JSON.parse(p);
                    if (Array.isArray(p2)) return p2;
                } catch(e2) {}
            }
        } catch(e) {
            return raw.split(",").map(s => s.trim()).filter(Boolean);
        }
    }
    try {
        const p = JSON.parse(JSON.stringify(raw));
        if (Array.isArray(p)) return p;
    } catch(e) {}
    return [];
}

function validateSession(e) {
    const token = e.request.header.get("Authorization") || "";
    if (!token || token === "") {
        throw new Error("UNAUTHORIZED");
    }

    const cleanToken = token.replace("Bearer ", "");
    let record;
    try {
        record = $app.findFirstRecordByFilter("users", "sessionToken = {:token}", { token: cleanToken });
    } catch (err) {
        console.log("DB lookup error for token: " + err);
        throw new Error("UNAUTHORIZED");
    }

    if (!record) {
        throw new Error("UNAUTHORIZED");
    }

    // Check expiry
    const expiryStr = record.get("tokenExpiry") || "";
    if (expiryStr !== "") {
        const expiryMs = parseFloat(expiryStr) || 0;
        if (expiryMs > 0 && expiryMs < Date.now()) {
            console.log("Token expired because: " + expiryMs + " < " + Date.now());
            throw new Error("SESSION_EXPIRED");
        }
    }

    let jobdeskScope = parseGojaJson(record.get("jobdesk_scope"));
    let allowedProjects = parseGojaJson(record.get("allowed_projects"));
    let allowedLocations = parseGojaJson(record.get("allowed_locations"));
    let permissions = parseGojaJson(record.get("permissions"));

    let userRole = record.get("role") || "internal_admin";
    // Normalize legacy role aliases
    if (userRole === "admin") userRole = "internal_admin";
    if (userRole === "manager") userRole = "internal_viewer";

    return {
        id: record.id || record.getId(),
        email: record.email() || record.get("email") || record.username(),
        name: record.get("name"),
        role: userRole,
        pt: record.get("pt") || "",
        pt_name: record.get("pt_name") || "",
        jobdesk_scope: jobdeskScope,
        allowed_projects: allowedProjects,
        allowed_locations: allowedLocations,
        permissions: permissions
    };
}

function sendJSON(e, status, payload) {
    return e.json(status, payload);
}

function getRequestBody(e) {
    try {
        const raw = readerToString(e.request.body);
        if (!raw) return {};
        return JSON.parse(raw);
    } catch(err) {
        console.log("Error parsing request body: " + err);
        return {};
    }
}

function ensureCollection(name, fields, rules = {}) {
    let col;
    try {
        col = $app.findCollectionByNameOrId(name);
    } catch (e) {
        try {
            col = new Collection({
                name: name,
                type: "base",
                listRule: rules.listRule !== undefined ? rules.listRule : "",
                viewRule: rules.viewRule !== undefined ? rules.viewRule : "",
                createRule: rules.createRule !== undefined ? rules.createRule : "",
                updateRule: rules.updateRule !== undefined ? rules.updateRule : "",
                deleteRule: rules.deleteRule !== undefined ? rules.deleteRule : ""
            });
        } catch (err) {
            console.log("Error instantiating collection " + name + ": " + err);
            return;
        }
    }

    let modified = false;
    for (let f of fields) {
        if (!col.fields.getByName(f.name)) {
            col.fields.addMarshaledJSON(JSON.stringify(f));
            modified = true;
        }
    }

    if (modified || !col.id) {
        try {
            $app.save(col);
            console.log("Updated collection fields for: " + name);
        } catch (saveErr) {
            console.log("Error saving collection " + name + ": " + saveErr);
        }
    }
}

function createNotification(data) {
    try {
        let notifCol;
        try {
            notifCol = $app.findCollectionByNameOrId("notifications");
        } catch (e) {
            initExtraCollections();
            notifCol = $app.findCollectionByNameOrId("notifications");
        }
        const rec = new Record(notifCol);
        rec.set("user_target", data.user_target || "");
        rec.set("tipe", data.tipe || "progress_submitted");
        rec.set("progress_log", data.progress_log || "");
        rec.set("title", data.title || "");
        rec.set("message", data.message || "");
        rec.set("pt", data.pt || "");
        rec.set("pt_name", data.pt_name || "");
        rec.set("jobdesk", data.jobdesk || "");
        rec.set("projectId", data.projectId || "");
        rec.set("icon", data.icon || "bell");
        rec.set("color", data.color || "accent");
        rec.set("is_read", false);
        $app.save(rec);
        console.log("SUCCESS saved notification: " + rec.id + " target: " + data.user_target + " type: " + data.tipe);
        return rec;
    } catch (err) {
        console.log("Error creating notification: " + err);
        return null;
    }
}

function notifyInternalAdmins(title, message, tipe, pt = "", pt_name = "", jobdesk = "", projectId = "", progressLogId = "") {
    try {
        // Find all internal_admin users (and superadmin/admin)
        const allUsers = $app.findRecordsByFilter("users", "", "", 100, 0);
        console.log("notifyInternalAdmins total users found: " + allUsers.length);
        for (let u of allUsers) {
            const role = u.get("role") || "";
            console.log("User: " + u.id + " role: " + role);
            if (role === "internal_admin" || role === "superadmin" || role === "admin" || !role) {
                createNotification({
                    user_target: u.id,
                    tipe: tipe,
                    progress_log: progressLogId,
                    title: title,
                    message: message,
                    pt: pt,
                    pt_name: pt_name,
                    jobdesk: jobdesk,
                    projectId: projectId,
                    icon: tipe === "kontraktor_opened_update" ? "pencil-line" : "clock",
                    color: tipe === "kontraktor_opened_update" ? "warning" : "accent"
                });
            }
        }
    } catch (err) {
        console.log("Error notifying internal admins: " + err);
    }
}

function notifyContractor(userId, title, message, tipe, pt = "", pt_name = "", jobdesk = "", projectId = "", progressLogId = "", color = "success") {
    try {
        if (!userId) return;
        createNotification({
            user_target: userId,
            tipe: tipe,
            progress_log: progressLogId,
            title: title,
            message: message,
            pt: pt,
            pt_name: pt_name,
            jobdesk: jobdesk,
            projectId: projectId,
            icon: tipe === "progress_validated" ? "check-circle" : "x-circle",
            color: color
        });
    } catch (err) {
        console.log("Error notifying contractor: " + err);
    }
}

function initExtraCollections() {
    // Multi-tenant core collections
    ensureCollection("users", [
        { name: "role", type: "text" },
        { name: "pt", type: "text" },
        { name: "pt_name", type: "text" },
        { name: "jobdesk_scope", type: "text" },
        { name: "permissions", type: "json" },
        { name: "allowed_projects", type: "json" },
        { name: "allowed_locations", type: "json" }
    ]);

    ensureCollection("pt", [
        { name: "nama_pt", type: "text" },
        { name: "kode_pt", type: "text" },
        { name: "lokasi_default", type: "text" },
        { name: "status_aktif", type: "bool" },
        { name: "kontak_pic", type: "text" }
    ]);

    ensureCollection("jobdesk", [
        { name: "nama_jobdesk", type: "text" },
        { name: "deskripsi", type: "text" },
        { name: "pt", type: "text" },
        { name: "pt_name", type: "text" },
        { name: "lokasi_list", type: "json" },
        { name: "projectId", type: "text" },
        { name: "iacId", type: "text" },
        { name: "subId", type: "text" },
        { name: "weight", type: "number" }
    ]);

    ensureCollection("progress_log", [
        { name: "jobdesk", type: "text" },
        { name: "jobdesk_name", type: "text" },
        { name: "subId", type: "text" },
        { name: "projectId", type: "text" },
        { name: "pt", type: "text" },
        { name: "pt_name", type: "text" },
        { name: "date", type: "text" },
        { name: "lokasi", type: "text" },
        { name: "deskripsi_pekerjaan", type: "text" },
        { name: "persentase_progress", type: "number" },
        { name: "foto", type: "text" },
        { name: "shift", type: "text" },
        { name: "manpowerActual", type: "number" },
        { name: "delayReasonCode", type: "text" },
        { name: "constraintDescription", type: "text" },
        { name: "recoveryAction", type: "text" },
        { name: "status", type: "text" },
        { name: "submitted_by", type: "text" },
        { name: "submitted_by_name", type: "text" },
        { name: "validated_by", type: "text" },
        { name: "validated_by_name", type: "text" },
        { name: "validated_at", type: "text" },
        { name: "catatan_validasi", type: "text" }
    ]);

    ensureCollection("notifications", [
        { name: "user_target", type: "text" },
        { name: "tipe", type: "text" },
        { name: "progress_log", type: "text" },
        { name: "title", type: "text" },
        { name: "message", type: "text" },
        { name: "pt", type: "text" },
        { name: "pt_name", type: "text" },
        { name: "jobdesk", type: "text" },
        { name: "projectId", type: "text" },
        { name: "icon", type: "text" },
        { name: "color", type: "text" },
        { name: "is_read", type: "bool" }
    ]);

    // Castable module collections
    ensureCollection("castable_kategori", [{ name: "katId", type: "text" }, { name: "nama", type: "text" }]);
    ensureCollection("castable_detail", [{ name: "detId", type: "text" }, { name: "kategoriId", type: "text" }, { name: "nama", type: "text" }]);
    ensureCollection("castable_types", [{ name: "typeId", type: "text" }, { name: "nama", type: "text" }, { name: "densitas", type: "number" }]);
    ensureCollection("castable_settings", [{ name: "wasteFactor", type: "number" }, { name: "persenCastable", type: "number" }, { name: "persenInsulating", type: "number" }]);
    ensureCollection("castable_checks", [
        { name: "idLog", type: "text" }, { name: "tanggalInspeksi", type: "text" }, { name: "vendor", type: "text" },
        { name: "kategoriId", type: "text" }, { name: "detailId", type: "text" }, { name: "lebar", type: "number" },
        { name: "panjang", type: "number" }, { name: "diameterAngkur", type: "number" }, { name: "panjangAngkur", type: "number" },
        { name: "typeId", type: "text" }, { name: "volumeM3", type: "number" }, { name: "tonaseAkhir", type: "number" },
        { name: "tonaseCastable", type: "number" }, { name: "tonaseInsulating", type: "number" },
        { name: "remarks", type: "text" }, { name: "photoUrl", type: "text" }, { name: "inspektor", type: "text" }
    ]);
    ensureCollection("lessons_learned", [
        { name: "projectId", type: "text" }, { name: "weekNum", type: "text" }, { name: "category", type: "text" },
        { name: "issue", type: "text" }, { name: "rootCause", type: "text" }, { name: "impact", type: "text" },
        { name: "recommendation", type: "text" }, { name: "reportedBy", type: "text" }
    ]);

    ensureCollection("daily_progress", [
        { name: "projectId", type: "text" },
        { name: "subId", type: "text" },
        { name: "date", type: "text" },
        { name: "progress", type: "number" },
        { name: "remarks", type: "text" },
        { name: "photoUrl", type: "text" },
        { name: "shift", type: "text" },
        { name: "manpowerActual", type: "number" },
        { name: "delayReasonCode", type: "text" },
        { name: "constraintDescription", type: "text" },
        { name: "recoveryAction", type: "text" },
        { name: "status", type: "text" },
        { name: "pt", type: "text" },
        { name: "pt_name", type: "text" },
        { name: "lokasi", type: "text" },
        { name: "inputBy", type: "text" },
        { name: "validated_by", type: "text" },
        { name: "validated_at", type: "text" },
        { name: "catatan_validasi", type: "text" }
    ]);

    // 1. Seed kontraktor_tali
    try {
        const usersCol = $app.findCollectionByNameOrId("users");
        let taliUser = null;
        try { taliUser = $app.findFirstRecordByFilter("users", "username = 'kontraktor_tali' || email = 'tali@kontraktor.ksd.com' || email = 'kontraktor_tali@ksd.com'"); } catch (e) {}
        if (!taliUser) {
            const u1 = new Record(usersCol);
            u1.set("username", "kontraktor_tali");
            u1.set("email", "tali@kontraktor.ksd.com");
            u1.set("name", "PT. Tali Abadi Lancar Indonesia");
            u1.set("role", "kontraktor_admin");
            u1.set("pt", "PT_TALI");
            u1.set("pt_name", "PT. Tali Abadi Lancar Indonesia");
            u1.set("jobdesk_scope", "ALL");
            u1.set("emailVisibility", true);
            u1.set("verified", true);
            u1.setPassword("tali1234");
            $app.save(u1);
            console.log("Seeded default user: kontraktor_tali");
        }
    } catch (e) {}

    // 2. Seed kontraktor_hjg
    try {
        const usersCol = $app.findCollectionByNameOrId("users");
        let hjgUser = null;
        try { hjgUser = $app.findFirstRecordByFilter("users", "username = 'kontraktor_hjg' || email = 'hjg@kontraktor.ksd.com' || email = 'kontraktor_hjg@ksd.com'"); } catch (e) {}
        if (!hjgUser) {
            const u2 = new Record(usersCol);
            u2.set("username", "kontraktor_hjg");
            u2.set("email", "hjg@kontraktor.ksd.com");
            u2.set("name", "PT. Harapan Jaya Gemilang");
            u2.set("role", "kontraktor_admin");
            u2.set("pt", "PT_HJG");
            u2.set("pt_name", "PT. Harapan Jaya Gemilang");
            u2.set("jobdesk_scope", "ALL");
            u2.set("emailVisibility", true);
            u2.set("verified", true);
            u2.setPassword("hjg12345");
            $app.save(u2);
            console.log("Seeded default user: kontraktor_hjg");
        }
    } catch (e) {}

    // 3. Seed default PT records
    try {
        const ptCol = $app.findCollectionByNameOrId("pt");
        const defaultPts = [
            { kode_pt: "PT_TALI", nama_pt: "PT. Tali Abadi Lancar Indonesia", lokasi: "PLANT 8 - Kiln Line 1 Body, PLANT 8 - Preheater Tower", pic: "Bpk. Bambang" },
            { kode_pt: "PT_HJG", nama_pt: "PT. Harapan Jaya Gemilang", lokasi: "PLANT 8 - Burner Sector, PLANT 8 - Cooler Sector", pic: "Bpk. Hendra" },
            { kode_pt: "PT_GLOBAL", nama_pt: "PT. Global Kiln Tech", lokasi: "PLANT 8 - Hot Zone Area", pic: "Bpk. Rahmat" }
        ];
        for (let p of defaultPts) {
            let existingPt = null;
            try { existingPt = $app.findFirstRecordByFilter("pt", "kode_pt = {:kode}", { kode: p.kode_pt }); } catch (e) {}
            if (!existingPt) {
                const ptRec = new Record(ptCol);
                ptRec.set("kode_pt", p.kode_pt);
                ptRec.set("nama_pt", p.nama_pt);
                ptRec.set("lokasi_default", p.lokasi);
                ptRec.set("status_aktif", true);
                ptRec.set("kontak_pic", p.pic);
                $app.save(ptRec);
                console.log("Seeded PT master: " + p.kode_pt);
            }
        }
    } catch (e) {}
}

module.exports = {
    validateSession,
    parseGojaJson,
    sendJSON,
    getRequestBody,
    ensureCollection,
    initExtraCollections,
    createNotification,
    notifyInternalAdmins,
    notifyContractor
};
