migrate((app) => {
    // 1. Modifikasi tabel users bawaan untuk menambahkan kolom role, sessionToken, tokenExpiry
    try {
        const users = app.findCollectionByNameOrId("users");
        users.fields.addMarshaledJSON(JSON.stringify({
            name: "role",
            type: "text"
        }));
        users.fields.addMarshaledJSON(JSON.stringify({
            name: "sessionToken",
            type: "text"
        }));
        users.fields.addMarshaledJSON(JSON.stringify({
            name: "tokenExpiry",
            type: "text"
        }));
        app.save(users);
    } catch (e) {
        console.log("Error updating users collection: " + e);
    }

    // 2. Daftar koleksi baru yang akan dibuat
    const collections = [
        {
            name: "projects",
            fields: [
                { name: "projectId", type: "text" },
                { name: "name", type: "text" },
                { name: "area", type: "text" },
                { name: "startDate", type: "text" },
                { name: "status", type: "text" },
                { name: "plannedFinish", type: "text" },
                { name: "shutdownType", type: "text" },
                { name: "baselineLocked", type: "bool" },
                { name: "overallStatusGate", type: "text" }
            ]
        },
        {
            name: "iacs",
            fields: [
                { name: "projectId", type: "text" },
                { name: "iacId", type: "text" },
                { name: "title", type: "text" },
                { name: "weight", type: "number" },
                { name: "phase", type: "text" },
                { name: "discipline", type: "text" },
                { name: "criticalFlag", type: "bool" },
                { name: "criticalityLevel", type: "text" },
                { name: "areaTag", type: "text" }
            ]
        },
        {
            name: "subs",
            fields: [
                { name: "projectId", type: "text" },
                { name: "subId", type: "text" },
                { name: "iacId", type: "text" },
                { name: "title", type: "text" },
                { name: "contractor", type: "text" },
                { name: "weight", type: "number" },
                { name: "areaDetail", type: "text" },
                { name: "discipline", type: "text" },
                { name: "plannedStart", type: "text" },
                { name: "plannedFinish", type: "text" },
                { name: "predecessorSubId", type: "text" },
                { name: "criticalFlag", type: "bool" },
                { name: "milestoneFlag", type: "bool" }
            ]
        },
        {
            name: "daily_progress",
            fields: [
                { name: "projectId", type: "text" },
                { name: "date", type: "text" },
                { name: "subId", type: "text" },
                { name: "progress", type: "number" },
                { name: "remarks", type: "text" },
                { name: "inputBy", type: "text" },
                { name: "photoUrl", type: "text" },
                { name: "shift", type: "text" },
                { name: "manpowerActual", type: "number" },
                { name: "delayReasonCode", type: "text" },
                { name: "constraintDescription", type: "text" },
                { name: "recoveryAction", type: "text" }
            ]
        },
        {
            name: "validations",
            fields: [
                { name: "projectId", type: "text" },
                { name: "type", type: "text" },
                { name: "user", type: "text" },
                { name: "status", type: "text" },
                { name: "comment", type: "text" }
            ]
        },
        {
            name: "material_logs",
            fields: [
                { name: "projectId", type: "text" },
                { name: "subId", type: "text" },
                { name: "materialCode", type: "text" },
                { name: "qtyPlanned", type: "number" },
                { name: "qtyIssued", type: "number" },
                { name: "qtyConsumed", type: "number" },
                { name: "qtyReturn", type: "number" },
                { name: "shortage", type: "number" },
                { name: "reportedBy", type: "text" }
            ]
        },
        {
            name: "manpower_logs",
            fields: [
                { name: "projectId", type: "text" },
                { name: "subId", type: "text" },
                { name: "date", type: "text" },
                { name: "contractor", type: "text" },
                { name: "shift", type: "text" },
                { name: "manpowerActual", type: "number" },
                { name: "manhoursActual", type: "number" },
                { name: "reportedBy", type: "text" }
            ]
        },
        {
            name: "castable_checks",
            fields: [
                { name: "projectId", type: "text" },
                { name: "checkId", type: "text" },
                { name: "subId", type: "text" },
                { name: "areaDetail", type: "text" },
                { name: "status", type: "text" },
                { name: "comment", type: "text" },
                { name: "photoUrl", type: "text" },
                { name: "reportedBy", type: "text" }
            ]
        },
        {
            name: "baseline_schedule",
            fields: [
                { name: "projectId", type: "text" },
                { name: "subId", type: "text" },
                { name: "plannedStart", type: "text" },
                { name: "plannedFinish", type: "text" },
                { name: "plannedDuration", type: "number" },
                { name: "plannedPctByDate", type: "number" }
            ]
        },
        {
            name: "castable_kategori",
            fields: [
                { name: "katId", type: "text" },
                { name: "nama", type: "text" }
            ]
        },
        {
            name: "castable_detail",
            fields: [
                { name: "detId", type: "text" },
                { name: "kategoriId", type: "text" },
                { name: "nama", type: "text" }
            ]
        },
        {
            name: "castable_types",
            fields: [
                { name: "typeId", type: "text" },
                { name: "nama", type: "text" },
                { name: "densitas", type: "number" }
            ]
        },
        {
            name: "castable_settings",
            fields: [
                { name: "wasteFactor", type: "number" },
                { name: "persenCastable", type: "number" },
                { name: "persenInsulating", type: "number" }
            ]
        },
        {
            name: "castable_checks",
            fields: [
                { name: "idLog", type: "text" },
                { name: "tanggalInspeksi", type: "text" },
                { name: "vendor", type: "text" },
                { name: "kategoriId", type: "text" },
                { name: "detailId", type: "text" },
                { name: "lebar", type: "number" },
                { name: "panjang", type: "number" },
                { name: "diameterAngkur", type: "number" },
                { name: "panjangAngkur", type: "number" },
                { name: "typeId", type: "text" },
                { name: "volumeM3", type: "number" },
                { name: "tonaseAkhir", type: "number" },
                { name: "tonaseCastable", type: "number" },
                { name: "tonaseInsulating", type: "number" },
                { name: "remarks", type: "text" },
                { name: "photoUrl", type: "text" },
                { name: "inspektor", type: "text" }
            ]
        },
        {
            name: "lessons_learned",
            fields: [
                { name: "projectId", type: "text" },
                { name: "weekNum", type: "text" },
                { name: "category", type: "text" },
                { name: "issue", type: "text" },
                { name: "rootCause", type: "text" },
                { name: "impact", type: "text" },
                { name: "recommendation", type: "text" },
                { name: "reportedBy", type: "text" }
            ]
        }
    ];

    for (let c of collections) {
        const collection = new Collection({
            name: c.name,
            type: "base",
            listRule: "",
            viewRule: "",
            createRule: "",
            updateRule: "",
            deleteRule: ""
        });

        for (let f of c.fields) {
            collection.fields.addMarshaledJSON(JSON.stringify(f));
        }

        app.save(collection);
    }

    // 3. Masukkan data pengguna default (Superadmin, Manager, Operator)
    try {
        const users = app.findCollectionByNameOrId("users");

        const admin = new Record(users);
        admin.set("username", "admin");
        admin.set("email", "admin@ksd.com");
        admin.set("name", "Superadmin KSD");
        admin.set("role", "superadmin");
        admin.setPassword("admin123");
        admin.set("emailVisibility", true);
        admin.set("verified", true);
        app.save(admin);

        const manager = new Record(users);
        manager.set("username", "manager");
        manager.set("email", "manager@ksd.com");
        manager.set("name", "Manager Lapangan");
        manager.set("role", "manager");
        manager.setPassword("manager123");
        manager.set("emailVisibility", true);
        manager.set("verified", true);
        app.save(manager);

        const operator = new Record(users);
        operator.set("username", "operator");
        operator.set("email", "operator@ksd.com");
        operator.set("name", "Operator Lapangan");
        operator.set("role", "admin");
        operator.setPassword("operator123");
        operator.set("emailVisibility", true);
        operator.set("verified", true);
        app.save(operator);
    } catch (e) {
        console.log("Error seeding default users: " + e);
    }

    // 4. Masukkan data proyek bawaan untuk demo (PRJ-01 dan PRJ-02)
    try {
        const projectsCol = app.findCollectionByNameOrId("projects");
        const iacsCol = app.findCollectionByNameOrId("iacs");
        const subsCol = app.findCollectionByNameOrId("subs");
        const progressCol = app.findCollectionByNameOrId("daily_progress");

        // Projects
        const p1 = new Record(projectsCol);
        p1.set("projectId", "PRJ-01");
        p1.set("name", "Overhaul Kiln 1 & Burner System");
        p1.set("area", "PLANT 8 - Burner Sector");
        p1.set("startDate", "2026-05-01");
        p1.set("status", "In Progress");
        p1.set("baselineLocked", false);
        app.save(p1);

        const p2 = new Record(projectsCol);
        p2.set("projectId", "PRJ-02");
        p2.set("name", "Refractory Bricklining Replacement Kiln 2");
        p2.set("area", "PLANT 4 - Hot Zone");
        p2.set("startDate", "2026-05-05");
        p2.set("status", "In Progress");
        p2.set("baselineLocked", false);
        app.save(p2);

        // IACs
        const iac1 = new Record(iacsCol);
        iac1.set("projectId", "PRJ-01");
        iac1.set("iacId", "IAC-01A");
        iac1.set("title", "Mechanical Overhaul System");
        iac1.set("weight", 50);
        app.save(iac1);

        const iac2 = new Record(iacsCol);
        iac2.set("projectId", "PRJ-01");
        iac2.set("iacId", "IAC-01B");
        iac2.set("title", "Burner System Integration");
        iac2.set("weight", 50);
        app.save(iac2);

        // Subs
        const s1 = new Record(subsCol);
        s1.set("projectId", "PRJ-01");
        s1.set("subId", "SUB-01-1");
        s1.set("iacId", "IAC-01A");
        s1.set("title", "Pre-Inspection and Shell Ovality Check");
        s1.set("contractor", "TALI");
        s1.set("weight", 30);
        app.save(s1);

        const s2 = new Record(subsCol);
        s2.set("projectId", "PRJ-01");
        s2.set("subId", "SUB-01-2");
        s2.set("iacId", "IAC-01A");
        s2.set("title", "Support Roller Shaft Adjustment");
        s2.set("contractor", "HJG");
        s2.set("weight", 70);
        app.save(s2);

        const s3 = new Record(subsCol);
        s3.set("projectId", "PRJ-01");
        s3.set("subId", "SUB-01-3");
        s3.set("iacId", "IAC-01B");
        s3.set("title", "Nozzle Burner Replacement & Check");
        s3.set("contractor", "HJG");
        s3.set("weight", 100);
        app.save(s3);

        // Daily Progress
        const prg1 = new Record(progressCol);
        prg1.set("projectId", "PRJ-01");
        prg1.set("date", "2026-05-01");
        prg1.set("subId", "SUB-01-1");
        prg1.set("progress", 20);
        prg1.set("remarks", "Inspeksi awal shell ovality mulai");
        prg1.set("inputBy", "Yusuf");
        app.save(prg1);

        const prg2 = new Record(progressCol);
        prg2.set("projectId", "PRJ-01");
        prg2.set("date", "2026-05-03");
        prg2.set("subId", "SUB-01-1");
        prg2.set("progress", 50);
        prg2.set("remarks", "Pekerjaan inspeksi dilanjutkan");
        prg2.set("inputBy", "Yusuf");
        app.save(prg2);

        const prg3 = new Record(progressCol);
        prg3.set("projectId", "PRJ-01");
        prg3.set("date", "2026-05-06");
        prg3.set("subId", "SUB-01-1");
        prg3.set("progress", 100);
        prg3.set("remarks", "Inspeksi shell ovality rampung 100%");
        prg3.set("inputBy", "Yusuf");
        app.save(prg3);

    } catch (e) {
        console.log("Error seeding default projects/progress data: " + e);
    }
}, (app) => {
    // Down migration
    const names = [
        "baseline_schedule",
        "castable_checks",
        "manpower_logs",
        "material_logs",
        "validations",
        "daily_progress",
        "subs",
        "iacs",
        "projects"
    ];
    for (let name of names) {
        try {
            const collection = app.findCollectionByNameOrId(name);
            app.delete(collection);
        } catch (e) {}
    }
});
