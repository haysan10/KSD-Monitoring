// 🚀 NATIVE POCKETBASE SEEDER ENGINE (KSD PLANT 8)
function onAfterBootstrap(e) {
    if (e && typeof e.next === "function") {
        e.next();
    }
}

routerAdd("POST", "/api/custom/seed-demo-data", (e) => {
    const utils = require(`${__hooks}/utils.js`);
    try {
        utils.validateSession(e);
        utils.initExtraCollections();

        function dRandInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
        function dRandChoice(arr) { return arr[dRandInt(0, arr.length - 1)]; }
        function dRandBool(chance) { return Math.random() < chance; }
        function dClamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
        function dAddDays(date, days) { return new Date(date.getTime() + days * 86400000); }
        function dFmtDate(date) { return date.toISOString().slice(0, 10); }

        function distributeWeights(n) {
            const raw = [];
            for (let i = 0; i < n; i++) raw.push(dRandInt(60, 140));
            const sum = raw.reduce((a, b) => a + b, 0);
            const weights = raw.map(v => Math.round((v / sum) * 10000) / 100);
            const diff = Math.round((100 - weights.reduce((a, b) => a + b, 0)) * 100) / 100;
            weights[weights.length - 1] = Math.round((weights[weights.length - 1] + diff) * 100) / 100;
            return weights;
        }

        console.log("=== STARTING FULL PRODUCTION DEMO SEED (14 PROJECTS, 2,520 SUB-JOBDESKS) ===");

        // Wipe existing demo tables cleanly
        const tablesToWipe = ["daily_progress", "material_logs", "manpower_logs", "lessons_learned", "validations", "baseline_schedule", "subs", "iacs", "projects", "castable_checks"];
        for (let name of tablesToWipe) {
            try {
                const recs = $app.findRecordsByFilter(name, "", "", 0, 0);
                for (let r of recs) {
                    $app.delete(r);
                }
            } catch (err) {}
        }

        const today = new Date();
        const IAC_TEMPLATES = [
            { title: "Pre-Shutdown Inspection & Planning", discipline: "Planning", phase: "Persiapan" },
            { title: "Preheater Tower Inspection & Cleaning", discipline: "Mechanical", phase: "Preheater" },
            { title: "Kiln Shell Ovality & Alignment Check", discipline: "Mechanical", phase: "Kiln Body" },
            { title: "Support Roller & Shaft Overhaul", discipline: "Mechanical", phase: "Kiln Body" },
            { title: "Girth Gear & Pinion Inspection", discipline: "Mechanical", phase: "Kiln Body" },
            { title: "Tyre & Riding Ring Overhaul", discipline: "Mechanical", phase: "Kiln Body" },
            { title: "Trunnion Bearing Overhaul", discipline: "Mechanical", phase: "Kiln Body" },
            { title: "Kiln Inlet & Outlet Seal Replacement", discipline: "Mechanical", phase: "Kiln Body" },
            { title: "Refractory Lining Total Relining", discipline: "Refractory", phase: "Refractory" },
            { title: "Castable Refractory Repair Zone", discipline: "Refractory", phase: "Refractory" },
            { title: "Burner & Firing System Overhaul", discipline: "Mechanical", phase: "Burner" },
            { title: "Cooler Grate & Crusher Overhaul", discipline: "Mechanical", phase: "Cooler" },
            { title: "ID Fan & Ducting Overhaul", discipline: "Mechanical", phase: "Fan System" },
            { title: "Dust Collector & ESP Maintenance", discipline: "Mechanical", phase: "Dust System" },
            { title: "Electrical & Instrumentation Upgrade", discipline: "Electrical", phase: "E&I" },
            { title: "Hydraulic & Lubrication System Check", discipline: "Mechanical", phase: "Utility" },
            { title: "Civil & Structural Steel Repair", discipline: "Civil", phase: "Civil" },
            { title: "Final Commissioning & Test Run", discipline: "Commissioning", phase: "Commissioning" }
        ];

        const SUB_TEMPLATES = [
            "Pre-Inspection & Dokumentasi Kondisi Awal",
            "Dismantling / Pembongkaran Komponen",
            "Cleaning & Blasting Area Kerja",
            "NDT Testing (UT/MT/PT)",
            "Fabrikasi Spare Part / Material",
            "Instalasi & Pemasangan Komponen",
            "Alignment & Levelling Check",
            "Welding & Fit-up Structural",
            "Painting & Anti-Corrosion Coating",
            "Final Inspection & QC Sign-off"
        ];

        const CONTRACTORS = ["TALI", "HJG", "PT. Multi Fabrindo", "PT. Sinar Baja Perkasa", "PT. Karya Teknik Mandiri", "Internal Crew KSD", "PT. Boiler Prima", "PT. Rekayasa Industri"];
        const REPORTERS = ["Yusuf Hidayat", "Andi Wijaya", "Budi Santoso", "Rina Marlina", "Dedi Kurniawan", "Sri Wahyuni", "Agus Salim", "Fitri Handayani", "Hendra Gunawan", "Nur Aisyah"];
        const DELAY_CODES = ["MATERIAL_DELAY", "WEATHER", "EQUIPMENT", "MANPOWER", "DESIGN_CHANGE", "ACCESS", "OTHER"];
        const SHIFTS = ["Shift 1", "Shift 2", "Shift 3"];
        const MATERIAL_CODES = ["MAT-PLAT-SS400", "MAT-CASTABLE-165SIC", "MAT-BEARING-SKF", "MAT-GEAR-OIL", "MAT-WELDING-ROD", "MAT-INSULATION-BLANKET", "MAT-BOLT-HTS", "MAT-PAINT-EPOXY"];
        const LESSON_CATEGORIES = ["Teknis", "Material", "Manpower", "Cuaca", "Lainnya"];

        const PROJECT_DEFS = [
            { name: "KILN OVERHAUL PLANT 8 - Line 1 Major Shutdown", area: "PLANT 8 - Kiln Line 1", startAgo: 190, base: 96 },
            { name: "KILN OVERHAUL PLANT 8 - Line 2 Major Shutdown", area: "PLANT 8 - Kiln Line 2", startAgo: 150, base: 78 },
            { name: "KILN OVERHAUL PLANT 8 - Line 3 Major Shutdown", area: "PLANT 8 - Kiln Line 3", startAgo: 130, base: 60 },
            { name: "KILN OVERHAUL PLANT 8 - Line 4 Major Shutdown", area: "PLANT 8 - Kiln Line 4", startAgo: 210, base: 100 },
            { name: "KILN OVERHAUL PLANT 8 - Preheater Tower Overhaul", area: "PLANT 8 - Preheater Tower", startAgo: 80, base: 45 },
            { name: "KILN OVERHAUL PLANT 8 - Cooler System Overhaul", area: "PLANT 8 - Cooler Sector", startAgo: 55, base: 30 },
            { name: "KILN OVERHAUL PLANT 8 - Burner & Firing System Overhaul", area: "PLANT 8 - Burner Sector", startAgo: 40, base: 20 },
            { name: "KILN OVERHAUL PLANT 8 - Kiln Shell & Tyre Overhaul", area: "PLANT 8 - Hot Zone", startAgo: 25, base: 15 },
            { name: "KILN OVERHAUL PLANT 8 - Refractory Total Relining", area: "PLANT 8 - Kiln Body", startAgo: 15, base: 8 },
            { name: "KILN OVERHAUL PLANT 8 - ID Fan & Ducting Overhaul", area: "PLANT 8 - Fan Room", startAgo: 3, base: 0 },
            { name: "KILN OVERHAUL PLANT 8 - Electrical & Instrumentation Upgrade", area: "PLANT 8 - Electrical Room", startAgo: 95, base: 55 },
            { name: "KILN OVERHAUL PLANT 8 - Civil & Structural Reinforcement", area: "PLANT 8 - Civil Yard", startAgo: 60, base: 35 },
            { name: "KILN OVERHAUL PLANT 8 - Dust Collection System Overhaul", area: "PLANT 8 - Dust System Zone", startAgo: 170, base: 70 },
            { name: "KILN OVERHAUL PLANT 8 - Final Commissioning Batch", area: "PLANT 8 - Commissioning Area", startAgo: 205, base: 100 }
        ];

        const projCol = $app.findCollectionByNameOrId("projects");
        const iacCol = $app.findCollectionByNameOrId("iacs");
        const subCol = $app.findCollectionByNameOrId("subs");
        const baseCol = $app.findCollectionByNameOrId("baseline_schedule");
        const progCol = $app.findCollectionByNameOrId("daily_progress");
        const matCol = $app.findCollectionByNameOrId("material_logs");
        const manCol = $app.findCollectionByNameOrId("manpower_logs");
        const valCol = $app.findCollectionByNameOrId("validations");
        const lesCol = $app.findCollectionByNameOrId("lessons_learned");
        const cstCol = $app.findCollectionByNameOrId("castable_checks");

        let totalProjects = 0, totalIacs = 0, totalSubs = 0, totalProgress = 0;

        PROJECT_DEFS.forEach((def, pIdx) => {
            const pId = "KO8-" + String(pIdx + 1).padStart(2, "0");
            const startDate = dAddDays(today, -def.startAgo);
            const plannedFinish = dAddDays(startDate, dRandInt(120, 240));

            const pRec = new Record(projCol);
            pRec.set("projectId", pId);
            pRec.set("name", def.name);
            pRec.set("area", def.area);
            pRec.set("startDate", dFmtDate(startDate));
            pRec.set("plannedFinish", dFmtDate(plannedFinish));
            pRec.set("status", def.base >= 100 ? "Completed" : "In Progress");
            pRec.set("shutdownType", dRandChoice(["Major Shutdown", "Minor Shutdown", "Planned Maintenance"]));
            pRec.set("baselineLocked", true);
            $app.save(pRec);
            totalProjects++;

            const iacWeights = distributeWeights(18);

            IAC_TEMPLATES.forEach((iacTpl, iacIdx) => {
                const iacId = "IAC-" + String(iacIdx + 1).padStart(2, "0");
                const iacWeight = iacWeights[iacIdx];

                const iRec = new Record(iacCol);
                iRec.set("projectId", pId);
                iRec.set("iacId", iacId);
                iRec.set("title", iacTpl.title);
                iRec.set("weight", iacWeight);
                iRec.set("phase", iacTpl.phase);
                iRec.set("discipline", iacTpl.discipline);
                iRec.set("criticalFlag", dRandBool(0.15));
                iRec.set("criticalityLevel", dRandChoice(["Low", "Medium", "High", "Critical"]));
                iRec.set("areaTag", def.area);
                $app.save(iRec);
                totalIacs++;

                let iacFinalBase;
                if (def.base >= 100) iacFinalBase = dRandInt(96, 100);
                else if (def.base <= 0) iacFinalBase = 0;
                else {
                    const decayPerIac = def.base / 20;
                    iacFinalBase = dClamp(Math.round(def.base - iacIdx * decayPerIac + dRandInt(-6, 6)), 0, 100);
                }

                const subWeights = distributeWeights(10);

                SUB_TEMPLATES.forEach((subTitle, subIdx) => {
                    const subId = "SUB-" + String(iacIdx + 1).padStart(2, "0") + "-" + String(subIdx + 1).padStart(2, "0");
                    const subWeight = subWeights[subIdx];
                    const contractor = dRandChoice(CONTRACTORS);

                    let subFinal;
                    if (iacFinalBase <= 0) subFinal = 0;
                    else if (dRandBool(0.08)) subFinal = 0;
                    else {
                        subFinal = dClamp(Math.round(iacFinalBase + dRandInt(-10, 10)), 0, 100);
                        if (subFinal >= 90 && dRandBool(0.35)) subFinal = 100;
                    }

                    const iacSlice = 200 / 18;
                    const subOffsetStart = Math.round(iacIdx * iacSlice + subIdx * (iacSlice / 10));
                    const plannedStart = dAddDays(startDate, subOffsetStart);
                    const plannedDuration = dRandInt(3, 12);
                    const subPlannedFinish = dAddDays(plannedStart, plannedDuration);

                    const predecessorId = (subIdx > 0 && dRandBool(0.4))
                        ? "SUB-" + String(iacIdx + 1).padStart(2, "0") + "-" + String(subIdx).padStart(2, "0")
                        : "";
                    const isCritical = dRandBool(0.12);
                    const isMilestone = (subIdx === 9);

                    const sRec = new Record(subCol);
                    sRec.set("projectId", pId);
                    sRec.set("subId", subId);
                    sRec.set("iacId", iacId);
                    sRec.set("title", subTitle);
                    sRec.set("contractor", contractor);
                    sRec.set("weight", subWeight);
                    sRec.set("areaDetail", def.area);
                    sRec.set("discipline", iacTpl.discipline);
                    sRec.set("plannedStart", dFmtDate(plannedStart));
                    sRec.set("plannedFinish", dFmtDate(subPlannedFinish));
                    sRec.set("predecessorSubId", predecessorId);
                    sRec.set("criticalFlag", isCritical);
                    sRec.set("milestoneFlag", isMilestone);
                    $app.save(sRec);
                    totalSubs++;

                    // Save baseline schedule
                    const bRec = new Record(baseCol);
                    bRec.set("projectId", pId);
                    bRec.set("subId", subId);
                    bRec.set("plannedStart", dFmtDate(plannedStart));
                    bRec.set("plannedFinish", dFmtDate(subPlannedFinish));
                    bRec.set("plannedDuration", plannedDuration);
                    $app.save(bRec);

                    // Seed daily progress history for non-zero subs
                    if (subFinal > 0) {
                        const isRework = dRandBool(0.05) && subFinal < 100;
                        const entryCount = dRandInt(2, 5);

                        let sequence = [];
                        let current = dRandInt(5, Math.max(5, Math.round(subFinal * 0.3)));
                        sequence.push(current);
                        for (let k = 1; k < entryCount; k++) {
                            if (k === entryCount - 1) current = subFinal;
                            else current = dClamp(current + dRandInt(5, 25), 0, subFinal);
                            sequence.push(current);
                        }

                        if (isRework && sequence.length >= 3) {
                            const dropIdx = dRandInt(1, sequence.length - 2);
                            sequence[dropIdx] = dClamp(Math.round(sequence[dropIdx] * 0.6), 1, sequence[dropIdx]);
                        }

                        const daysAgo = (subFinal < 100 && dRandBool(0.3)) ? dRandInt(3, 18) : dRandInt(0, 2);
                        const lastEntryDate = dAddDays(today, -daysAgo);

                        const dateList = [];
                        let cursor = new Date(plannedStart.getTime());
                        for (let k = 0; k < sequence.length - 1; k++) {
                            cursor = dAddDays(cursor, dRandInt(2, 8));
                            if (cursor > lastEntryDate) cursor = dAddDays(lastEntryDate, -dRandInt(1, 4));
                            dateList.push(new Date(cursor.getTime()));
                        }
                        dateList.push(lastEntryDate);
                        dateList.sort((a, b) => a - b);

                        const remarksPool = [
                            "Pekerjaan berjalan lancar sesuai jadwal",
                            "Progres dilanjutkan setelah penyetelan part",
                            "Sedikit kendala cuaca hujan di lokasi",
                            "Percepatan dengan penambahan manpower shift malam",
                            "QC menemukan defect minor, perbaikan selesai",
                            "Pekerjaan rampung 100% dan lolos inspeksi akhir"
                        ];

                        sequence.forEach((prog, sIdx) => {
                            const prgRec = new Record(progCol);
                            prgRec.set("projectId", pId);
                            prgRec.set("date", dFmtDate(dateList[sIdx]));
                            prgRec.set("subId", subId);
                            prgRec.set("progress", prog);
                            prgRec.set("remarks", dRandChoice(remarksPool));
                            prgRec.set("inputBy", dRandChoice(REPORTERS));
                            prgRec.set("shift", dRandChoice(SHIFTS));
                            prgRec.set("manpowerActual", dRandInt(4, 16));
                            if (dRandBool(0.2)) {
                                prgRec.set("delayReasonCode", dRandChoice(DELAY_CODES));
                                prgRec.set("constraintDescription", "Kendala operasional di lokasi kerja");
                                prgRec.set("recoveryAction", "Penambahan jam kerja & koordinasi ulang resource");
                            }
                            $app.save(prgRec);
                            totalProgress++;
                        });
                    }
                });
            });

            // Seed Material & Manpower logs for project
            for (let m = 0; m < 5; m++) {
                const subId = `SUB-01-${m + 1}`;
                const planned = dRandInt(50, 400);
                const issued = dRandInt(Math.round(planned * 0.5), planned);
                const consumed = dRandInt(Math.round(issued * 0.6), issued);

                const mRec = new Record(matCol);
                mRec.set("projectId", pId);
                mRec.set("subId", subId);
                mRec.set("materialCode", dRandChoice(MATERIAL_CODES));
                mRec.set("qtyPlanned", planned);
                mRec.set("qtyIssued", issued);
                mRec.set("qtyConsumed", consumed);
                mRec.set("qtyReturn", issued - consumed);
                mRec.set("shortage", planned - consumed);
                mRec.set("reportedBy", dRandChoice(REPORTERS));
                $app.save(mRec);

                const mpRec = new Record(manCol);
                mpRec.set("projectId", pId);
                mpRec.set("subId", subId);
                mpRec.set("date", dFmtDate(dAddDays(startDate, dRandInt(5, 50))));
                mpRec.set("contractor", dRandChoice(CONTRACTORS));
                mpRec.set("shift", "Shift 1");
                mpRec.set("manpowerActual", dRandInt(6, 20));
                mpRec.set("manhoursActual", dRandInt(48, 160));
                mpRec.set("reportedBy", dRandChoice(REPORTERS));
                $app.save(mpRec);
            }

            // Seed Lessons Learned & Validations
            const lRec = new Record(lesCol);
            lRec.set("projectId", pId);
            lRec.set("weekNum", "1");
            lRec.set("category", dRandChoice(LESSON_CATEGORIES));
            lRec.set("issue", "Keterlambatan pengiriman material bata tahan api dari supplier utama.");
            lRec.set("rootCause", "Kendala logistik pelabuhan dan cuaca buruk saat transit.");
            lRec.set("impact", "Pekerjaan relining tertunda 2 hari di sektor Kiln Body.");
            lRec.set("recommendation", "Menyediakan buffer stock 20% di gudang site & kontrak pengiriman darurat.");
            lRec.set("reportedBy", "Superadmin KSD");
            $app.save(lRec);

            if (def.base >= 50) {
                const vRec = new Record(valCol);
                vRec.set("projectId", pId);
                vRec.set("type", def.base >= 100 ? "superadmin_finalize" : "milestone_50");
                vRec.set("user", "Superadmin KSD");
                vRec.set("status", "Approved");
                vRec.set("comment", "Pekerjaan dan dokumentasi QC telah diverifikasi lengkap.");
                $app.save(vRec);
            }
        });

        // Seed Castable Inspections
        for (let c = 1; c <= 10; c++) {
            const cRec = new Record(cstCol);
            cRec.set("idLog", `CST-PLANT8-${String(c).padStart(3, "0")}`);
            cRec.set("tanggalInspeksi", dFmtDate(dAddDays(today, -dRandInt(1, 40))));
            cRec.set("vendor", "PT Refrakto Utama");
            cRec.set("kategoriId", "KAT-01");
            cRec.set("detailId", "DET-01");
            cRec.set("lebar", 1200);
            cRec.set("panjang", 2500);
            cRec.set("diameterAngkur", 16);
            cRec.set("panjangAngkur", 150);
            cRec.set("typeId", "TYP-01");
            cRec.set("volumeM3", 0.495);
            cRec.set("tonaseAkhir", 1.21);
            cRec.set("tonaseCastable", 0.97);
            cRec.set("tonaseInsulating", 0.24);
            cRec.set("remarks", "Pengecoran berjalan baik, struktur padat tanpa rongga udara.");
            cRec.set("inspektor", "Superadmin KSD");
            $app.save(cRec);
        }

        console.log(`=== SEED COMPLETE: ${totalProjects} Projects, ${totalIacs} IACs, ${totalSubs} Sub-Jobdesks, ${totalProgress} Progress Entries ===`);
        return utils.sendJSON(e, 200, { success: true, totalProjects, totalIacs, totalSubs, totalProgress });
    } catch (err) {
        return utils.sendJSON(e, 500, { success: false, error: err.toString() });
    }
});
