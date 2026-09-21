const { chromium } = require('../node_modules/playwright');
const path = require('path');
const fs = require('fs');

async function run() {
    const outputDir = path.join(__dirname, '../public/captures');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const browser = await chromium.launch({ headless: true });
    
    // ----------------------------------------------------
    // 1. DESKTOP CAPTURES (1440 x 900)
    // ----------------------------------------------------
    console.log('📸 Capturing Desktop views (1440x900)...');
    const desktopContext = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2, // Retina quality
    });
    const desktopPage = await desktopContext.newPage();
    
    // Set theme to light mode explicitly
    await desktopPage.addInitScript(() => {
        localStorage.setItem('ksd_theme_mode', 'light');
        localStorage.setItem('ksd_theme_v3', 'true');
    });

    await desktopPage.goto('http://127.0.0.1:8090/index.html?dev=1', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1000);

    // Perform quick login as superadmin
    console.log('Logging in as superadmin on desktop...');
    await desktopPage.evaluate(() => {
        if (typeof quickLogin === 'function') {
            quickLogin('superadmin');
        }
    });
    await desktopPage.waitForTimeout(3000);

    // Wait for app container to be visible
    await desktopPage.waitForSelector('#page-app:not(.page-hidden)', { timeout: 10000 });
    await desktopPage.waitForTimeout(2000);

    // Dismiss onboarding modal and any overlays
    await desktopPage.evaluate(() => {
        const modal = document.getElementById("onboardingWelcomeModal");
        if (modal) modal.remove();
        const backdrops = document.querySelectorAll('.modal-backdrop, .shepherd-modal-overlay-container, #tourModal');
        backdrops.forEach(b => b.remove());
        const toast = document.getElementById('toast');
        if (toast) toast.classList.remove('show');
    });
    await desktopPage.waitForTimeout(500);

    // 1. Desktop Dashboard
    await desktopPage.screenshot({
        path: path.join(outputDir, 'desktop-01-dashboard.png'),
        fullPage: false
    });
    console.log('✅ Captured desktop-01-dashboard.png');

    // 2. Desktop S-Curve Tab
    await desktopPage.evaluate(() => {
        if (typeof switchTab === 'function') switchTab('scurve');
    });
    await desktopPage.waitForTimeout(2000);
    await desktopPage.screenshot({
        path: path.join(outputDir, 'desktop-02-scurve.png'),
        fullPage: false
    });
    console.log('✅ Captured desktop-02-scurve.png');

    // Isolate S-Curve Chart Card
    const scurveChartCard = await desktopPage.$('#scurveContainer') || await desktopPage.$('.chart-card') || await desktopPage.$('#view-scurve .card');
    if (scurveChartCard) {
        await scurveChartCard.screenshot({
            path: path.join(outputDir, 'card-scurve.png')
        });
        console.log('✅ Captured card-scurve.png');
    }

    // 3. Desktop Validations (3-Stage QC Audit)
    await desktopPage.evaluate(() => {
        if (typeof switchTab === 'function') switchTab('validations');
    });
    await desktopPage.waitForTimeout(2000);
    await desktopPage.screenshot({
        path: path.join(outputDir, 'desktop-03-validations.png'),
        fullPage: false
    });
    console.log('✅ Captured desktop-03-validations.png');

    // Isolate QC validation item/card if present
    const qcCard = await desktopPage.$('.validation-card') || await desktopPage.$('#validationsList .card') || await desktopPage.$('#view-validations .card');
    if (qcCard) {
        await qcCard.screenshot({
            path: path.join(outputDir, 'card-qc-audit-item.png')
        });
        console.log('✅ Captured card-qc-audit-item.png');
    }

    // 4. Desktop Progress Input (Anti-Miskeying)
    await desktopPage.evaluate(() => {
        if (typeof switchTab === 'function') switchTab('input');
    });
    await desktopPage.waitForTimeout(2000);
    await desktopPage.screenshot({
        path: path.join(outputDir, 'desktop-04-input.png'),
        fullPage: false
    });
    console.log('✅ Captured desktop-04-input.png');

    const inputCard = await desktopPage.$('#view-input .card') || await desktopPage.$('.form-card');
    if (inputCard) {
        await inputCard.screenshot({
            path: path.join(outputDir, 'card-anti-miskeying.png')
        });
        console.log('✅ Captured card-anti-miskeying.png');
    }

    // 5. Desktop Work Hierarchy Table
    await desktopPage.evaluate(() => {
        if (typeof switchTab === 'function') switchTab('table');
    });
    await desktopPage.waitForTimeout(2000);
    await desktopPage.screenshot({
        path: path.join(outputDir, 'desktop-05-table.png'),
        fullPage: false
    });
    console.log('✅ Captured desktop-05-table.png');

    // Also capture Landing Page Hero
    await desktopPage.goto('http://127.0.0.1:8090/landing.html', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1500);
    await desktopPage.screenshot({
        path: path.join(outputDir, 'desktop-landing-hero.png'),
        fullPage: false
    });
    console.log('✅ Captured desktop-landing-hero.png');

    await desktopContext.close();

    // ----------------------------------------------------
    // 2. MOBILE CAPTURES (390 x 844 - iPhone 14 / modern smartphone)
    // ----------------------------------------------------
    console.log('📸 Capturing Mobile views (390x844)...');
    const mobileContext = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.addInitScript(() => {
        localStorage.setItem('ksd_theme_mode', 'light');
        localStorage.setItem('ksd_theme_v3', 'true');
    });

    await mobilePage.goto('http://127.0.0.1:8090/index.html?dev=1', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    // Login as superadmin on mobile so all projects and tabs are fully active with zero permission toast
    await mobilePage.evaluate(() => {
        if (typeof quickLogin === 'function') {
            quickLogin('superadmin');
        }
    });
    await mobilePage.waitForTimeout(3000);
    await mobilePage.waitForSelector('#page-app:not(.page-hidden)', { timeout: 10000 });

    // Ensure any transient toast and onboarding modals are dismissed
    await mobilePage.evaluate(() => {
        const modal = document.getElementById("onboardingWelcomeModal");
        if (modal) modal.remove();
        const backdrops = document.querySelectorAll('.modal-backdrop, .shepherd-modal-overlay-container, #tourModal');
        backdrops.forEach(b => b.remove());
        const toast = document.getElementById('toast');
        if (toast) toast.classList.remove('show');
        if (typeof switchProject === 'function' && window.state && window.state.projects && window.state.projects.length > 0) {
            switchProject(window.state.projects[0].id);
        }
    });
    await mobilePage.waitForTimeout(1000);

    // 1. Mobile Input Progress Screen
    await mobilePage.evaluate(() => {
        if (typeof switchTab === 'function') switchTab('input');
    });
    await mobilePage.waitForTimeout(1500);
    await mobilePage.screenshot({
        path: path.join(outputDir, 'mobile-01-input-progress.png'),
        fullPage: false
    });
    console.log('✅ Captured mobile-01-input-progress.png');

    // 2. Mobile Offline Mode / Queue Simulation
    await mobilePage.evaluate(() => {
        // Trigger offline simulation UI
        const queueBtn = document.getElementById('offlineSyncBtn');
        if (queueBtn) {
            queueBtn.style.display = 'inline-flex';
            const countTxt = document.getElementById('offlineCountTxt');
            if (countTxt) countTxt.innerText = 'Antrean Offline (3 Data Tersimpan)';
        }
        const offlineBanner = document.createElement('div');
        offlineBanner.id = 'demoOfflineAlert';
        offlineBanner.style.cssText = `
            position: fixed;
            top: 60px;
            left: 12px;
            right: 12px;
            background: #FEF3C7;
            border: 1.5px solid #F59E0B;
            border-radius: 12px;
            padding: 12px 14px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.15);
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        offlineBanner.innerHTML = `
            <div style="width:28px;height:28px;border-radius:8px;background:#F59E0B;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:14px;flex-shrink:0;">⚡</div>
            <div style="flex:1;">
                <div style="font-weight:700;font-size:12px;color:#92400E;">Mode Offline Kiln Aktif</div>
                <div style="font-size:11px;color:#B45309;margin-top:2px;">3 inspeksi tersimpan aman di antrean lokal browser</div>
            </div>
            <span style="background:#FDE68A;color:#92400E;font-size:10px;font-weight:700;padding:3px 8px;border-radius:6px;">ANTREAN</span>
        `;
        document.body.appendChild(offlineBanner);
    });
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({
        path: path.join(outputDir, 'mobile-02-offline-queue.png'),
        fullPage: false
    });
    console.log('✅ Captured mobile-02-offline-queue.png');

    // 3. Mobile Dashboard Screen
    await mobilePage.evaluate(() => {
        const alert = document.getElementById('demoOfflineAlert');
        if (alert) alert.remove();
        if (typeof switchTab === 'function') switchTab('dashboard');
    });
    await mobilePage.waitForTimeout(1500);
    await mobilePage.screenshot({
        path: path.join(outputDir, 'mobile-03-dashboard.png'),
        fullPage: false
    });
    console.log('✅ Captured mobile-03-dashboard.png');

    // 4. Mobile QC Audit Screen
    await mobilePage.evaluate(() => {
        if (typeof switchTab === 'function') switchTab('validations');
    });
    await mobilePage.waitForTimeout(1500);
    await mobilePage.screenshot({
        path: path.join(outputDir, 'mobile-04-qc-audit.png'),
        fullPage: false
    });
    console.log('✅ Captured mobile-04-qc-audit.png');

    await mobileContext.close();
    await browser.close();
    console.log('🎉 All captures completed successfully!');
}

run().catch(err => {
    console.error('Error during capture:', err);
    process.exit(1);
});
