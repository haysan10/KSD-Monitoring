migrate((app) => {
    // 1. Extend collection users
    try {
        const users = app.findCollectionByNameOrId("users");
        if (!users.fields.getByName("role")) {
            users.fields.addMarshaledJSON(JSON.stringify({ name: "role", type: "text" }));
        }
        if (!users.fields.getByName("pt")) {
            users.fields.addMarshaledJSON(JSON.stringify({ name: "pt", type: "text" }));
        }
        if (!users.fields.getByName("pt_name")) {
            users.fields.addMarshaledJSON(JSON.stringify({ name: "pt_name", type: "text" }));
        }
        if (!users.fields.getByName("jobdesk_scope")) {
            users.fields.addMarshaledJSON(JSON.stringify({ name: "jobdesk_scope", type: "json" }));
        }
        if (!users.fields.getByName("sessionToken")) {
            users.fields.addMarshaledJSON(JSON.stringify({ name: "sessionToken", type: "text" }));
        }
        if (!users.fields.getByName("tokenExpiry")) {
            users.fields.addMarshaledJSON(JSON.stringify({ name: "tokenExpiry", type: "text" }));
        }
        app.save(users);
    } catch (e) {
        console.log("Error updating users collection in multi_tenant migration: " + e);
    }

    // 2. Create PT Collection
    try {
        let ptCol;
        try {
            ptCol = app.findCollectionByNameOrId("pt");
        } catch (e) {
            ptCol = new Collection({
                name: "pt",
                type: "base",
                listRule: "@request.auth.role = 'internal_admin' || @request.auth.role = 'internal_viewer' || (@request.auth.role = 'kontraktor_admin' && id = @request.auth.pt)",
                viewRule: "@request.auth.role = 'internal_admin' || @request.auth.role = 'internal_viewer' || (@request.auth.role = 'kontraktor_admin' && id = @request.auth.pt)",
                createRule: "@request.auth.role = 'internal_admin'",
                updateRule: "@request.auth.role = 'internal_admin'",
                deleteRule: "@request.auth.role = 'internal_admin'"
            });
        }
        const ptFields = [
            { name: "nama_pt", type: "text", required: true },
            { name: "kode_pt", type: "text", required: true },
            { name: "lokasi_default", type: "text" },
            { name: "status_aktif", type: "bool" },
            { name: "kontak_pic", type: "text" }
        ];
        for (let f of ptFields) {
            if (!ptCol.fields.getByName(f.name)) {
                ptCol.fields.addMarshaledJSON(JSON.stringify(f));
            }
        }
        app.save(ptCol);
    } catch (e) {
        console.log("Error creating pt collection: " + e);
    }

    // 3. Create Jobdesk Collection
    try {
        let jobdeskCol;
        try {
            jobdeskCol = app.findCollectionByNameOrId("jobdesk");
        } catch (e) {
            jobdeskCol = new Collection({
                name: "jobdesk",
                type: "base",
                listRule: "@request.auth.role = 'internal_admin' || @request.auth.role = 'internal_viewer' || (@request.auth.role = 'kontraktor_admin' && pt = @request.auth.pt)",
                viewRule: "@request.auth.role = 'internal_admin' || @request.auth.role = 'internal_viewer' || (@request.auth.role = 'kontraktor_admin' && pt = @request.auth.pt)",
                createRule: "@request.auth.role = 'internal_admin'",
                updateRule: "@request.auth.role = 'internal_admin'",
                deleteRule: "@request.auth.role = 'internal_admin'"
            });
        }
        const jobdeskFields = [
            { name: "nama_jobdesk", type: "text", required: true },
            { name: "deskripsi", type: "text" },
            { name: "pt", type: "text", required: true },
            { name: "pt_name", type: "text" },
            { name: "lokasi_list", type: "json" },
            { name: "projectId", type: "text" },
            { name: "iacId", type: "text" },
            { name: "subId", type: "text" },
            { name: "weight", type: "number" }
        ];
        for (let f of jobdeskFields) {
            if (!jobdeskCol.fields.getByName(f.name)) {
                jobdeskCol.fields.addMarshaledJSON(JSON.stringify(f));
            }
        }
        app.save(jobdeskCol);
    } catch (e) {
        console.log("Error creating jobdesk collection: " + e);
    }

    // 4. Create Progress Log Collection
    try {
        let progCol;
        try {
            progCol = app.findCollectionByNameOrId("progress_log");
        } catch (e) {
            progCol = new Collection({
                name: "progress_log",
                type: "base",
                listRule: "@request.auth.role = 'internal_admin' || @request.auth.role = 'internal_viewer' || (@request.auth.role = 'kontraktor_admin' && pt = @request.auth.pt)",
                viewRule: "@request.auth.role = 'internal_admin' || @request.auth.role = 'internal_viewer' || (@request.auth.role = 'kontraktor_admin' && pt = @request.auth.pt)",
                createRule: "@request.auth.role = 'internal_admin' || (@request.auth.role = 'kontraktor_admin' && @request.auth.pt != '')",
                updateRule: "@request.auth.role = 'internal_admin' || (@request.auth.role = 'kontraktor_admin' && submitted_by = @request.auth.id && status = 'draft')",
                deleteRule: "@request.auth.role = 'internal_admin'"
            });
        }
        const progFields = [
            { name: "jobdesk", type: "text" },
            { name: "jobdesk_name", type: "text" },
            { name: "subId", type: "text" },
            { name: "projectId", type: "text" },
            { name: "pt", type: "text", required: true },
            { name: "pt_name", type: "text" },
            { name: "date", type: "text", required: true },
            { name: "lokasi", type: "text", required: true },
            { name: "deskripsi_pekerjaan", type: "text" },
            { name: "persentase_progress", type: "number", required: true },
            { name: "foto", type: "text" },
            { name: "shift", type: "text" },
            { name: "manpowerActual", type: "number" },
            { name: "delayReasonCode", type: "text" },
            { name: "constraintDescription", type: "text" },
            { name: "recoveryAction", type: "text" },
            { name: "status", type: "text", required: true }, // draft, submitted, validated, rejected
            { name: "submitted_by", type: "text" },
            { name: "submitted_by_name", type: "text" },
            { name: "validated_by", type: "text" },
            { name: "validated_by_name", type: "text" },
            { name: "validated_at", type: "text" },
            { name: "catatan_validasi", type: "text" }
        ];
        for (let f of progFields) {
            if (!progCol.fields.getByName(f.name)) {
                progCol.fields.addMarshaledJSON(JSON.stringify(f));
            }
        }
        app.save(progCol);
    } catch (e) {
        console.log("Error creating progress_log collection: " + e);
    }

    // 5. Create Notifications Collection
    try {
        let notifCol;
        try {
            notifCol = app.findCollectionByNameOrId("notifications");
        } catch (e) {
            notifCol = new Collection({
                name: "notifications",
                type: "base",
                listRule: "@request.auth.id = user_target || @request.auth.role = 'internal_admin'",
                viewRule: "@request.auth.id = user_target || @request.auth.role = 'internal_admin'",
                createRule: "@request.auth.id != ''",
                updateRule: "@request.auth.id = user_target || @request.auth.role = 'internal_admin'",
                deleteRule: "@request.auth.id = user_target || @request.auth.role = 'internal_admin'"
            });
        }
        const notifFields = [
            { name: "user_target", type: "text" },
            { name: "tipe", type: "text", required: true }, // progress_submitted, progress_validated, progress_rejected, kontraktor_opened_update
            { name: "progress_log", type: "text" },
            { name: "title", type: "text", required: true },
            { name: "message", type: "text", required: true },
            { name: "pt", type: "text" },
            { name: "pt_name", type: "text" },
            { name: "jobdesk", type: "text" },
            { name: "projectId", type: "text" },
            { name: "icon", type: "text" },
            { name: "color", type: "text" },
            { name: "is_read", type: "bool" }
        ];
        for (let f of notifFields) {
            if (!notifCol.fields.getByName(f.name)) {
                notifCol.fields.addMarshaledJSON(JSON.stringify(f));
            }
        }
        app.save(notifCol);
    } catch (e) {
        console.log("Error creating notifications collection: " + e);
    }

    // 6. Seed Sample PTs and Contractor Users if not already present
    try {
        const ptCol = app.findCollectionByNameOrId("pt");
        const existingPTs = app.findRecordsByFilter("pt", "", "", 0, 0);
        if (existingPTs.length === 0) {
            const initialPTs = [
                { id: "pt_tali", kode_pt: "TALI", nama_pt: "PT. Tali Abadi Lancar Indonesia", lokasi_default: "PLANT 8 - Burner Sector, Kiln Body", status_aktif: true, kontak_pic: "Budi (081234567890)" },
                { id: "pt_hjg", kode_pt: "HJG", nama_pt: "PT. Harapan Jaya Gemilang", lokasi_default: "PLANT 8 - Preheater Tower, Kiln Body", status_aktif: true, kontak_pic: "Yusuf (081298765432)" },
                { id: "pt_multicrew", kode_pt: "MULTICREW", nama_pt: "PT. Multi Fabrindo Perkasa", lokasi_default: "PLANT 8 - Cooler Sector", status_aktif: true, kontak_pic: "Hendra (081311223344)" },
                { id: "pt_sinarbaja", kode_pt: "SINARBAJA", nama_pt: "PT. Sinar Baja Perkasa", lokasi_default: "PLANT 8 - Hot Zone", status_aktif: true, kontak_pic: "Rina (081555667788)" }
            ];

            for (let item of initialPTs) {
                const rec = new Record(ptCol);
                rec.setId(item.id);
                rec.set("kode_pt", item.kode_pt);
                rec.set("nama_pt", item.nama_pt);
                rec.set("lokasi_default", item.lokasi_default);
                rec.set("status_aktif", item.status_aktif);
                rec.set("kontak_pic", item.kontak_pic);
                app.save(rec);
            }
        }

        // Update default users roles and add contractor users
        const usersCol = app.findCollectionByNameOrId("users");
        
        // Update admin role to internal_admin
        try {
            const adminRec = app.findFirstRecordByFilter("users", "username = 'admin'");
            if (adminRec) {
                adminRec.set("role", "internal_admin");
                app.save(adminRec);
            }
        } catch (e) {}

        // Update manager role to internal_viewer
        try {
            const mgrRec = app.findFirstRecordByFilter("users", "username = 'manager'");
            if (mgrRec) {
                mgrRec.set("role", "internal_viewer");
                app.save(mgrRec);
            }
        } catch (e) {}

        // Seed Contractor User PT TALI
        try {
            const userTali = app.findFirstRecordByFilter("users", "username = 'kontraktor_tali'");
        } catch (e) {
            const k1 = new Record(usersCol);
            k1.set("username", "kontraktor_tali");
            k1.set("email", "tali@kontraktor.ksd.com");
            k1.set("name", "Budi (Admin PT TALI)");
            k1.set("role", "kontraktor_admin");
            k1.set("pt", "pt_tali");
            k1.set("pt_name", "PT. Tali Abadi Lancar Indonesia");
            k1.set("jobdesk_scope", ["SUB-01-1", "SUB-01-4"]);
            k1.setPassword("tali123");
            k1.set("emailVisibility", true);
            k1.set("verified", true);
            app.save(k1);
        }

        // Seed Contractor User PT HJG
        try {
            const userHjg = app.findFirstRecordByFilter("users", "username = 'kontraktor_hjg'");
        } catch (e) {
            const k2 = new Record(usersCol);
            k2.set("username", "kontraktor_hjg");
            k2.set("email", "hjg@kontraktor.ksd.com");
            k2.set("name", "Yusuf (Admin PT HJG)");
            k2.set("role", "kontraktor_admin");
            k2.set("pt", "pt_hjg");
            k2.set("pt_name", "PT. Harapan Jaya Gemilang");
            k2.set("jobdesk_scope", ["SUB-01-2", "SUB-01-3"]);
            k2.setPassword("hjg123");
            k2.set("emailVisibility", true);
            k2.set("verified", true);
            app.save(k2);
        }

    } catch (e) {
        console.log("Error seeding PTs and contractor users: " + e);
    }
}, (app) => {
    // Down migration
    try {
        app.delete(app.findCollectionByNameOrId("notifications"));
        app.delete(app.findCollectionByNameOrId("progress_log"));
        app.delete(app.findCollectionByNameOrId("jobdesk"));
        app.delete(app.findCollectionByNameOrId("pt"));
    } catch (e) {}
});
