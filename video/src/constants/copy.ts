export interface Video60sCopy {
  scene1: {
    badge: string;
    part1: string;
    part2: string;
    subtitle: string;
  };
  scene2: {
    badge: string;
    headline: string;
    sub: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    subtitle: string;
  };
  scene3: {
    badge: string;
    headline: string;
    actionLabel: string;
    queueAlert: string;
    queueSub: string;
    subtitle: string;
  };
  scene4: {
    badge: string;
    headline: string;
    bgWord1: string;
    bgWord2: string;
    statusLabel: string;
    subtitle: string;
  };
  scene5: {
    badge: string;
    headline: string;
    photos: Array<{ step: string; name: string; tag: string }>;
    subtitle: string;
  };
  scene6: {
    badge: string;
    headline: string;
    scurveLabel: string;
    varianceTxt: string;
    spiTxt: string;
    subtitle: string;
  };
  scene7: {
    words: Array<{ text: string; sub: string; color: 'cream' | 'amber' | 'cobalt' }>;
    subtitle: string;
  };
  scene8: {
    tagline: string;
    ctaBadge: string;
    url: string;
    subtitle: string;
  };
}

export const COPY_60S_ID: Video60sCopy = {
  scene1: {
    badge: 'KILN OVERHAUL REALITY',
    part1: 'DI DALAM KILN BAJA.',
    part2: 'SINYAL TERPUTUS TOTAL.',
    subtitle: 'Di dalam perut rotary kiln baja tebal, seluruh sinyal telekomunikasi terputus total.',
  },
  scene2: {
    badge: 'TANTANGAN OPERASI',
    headline: 'METODE LAMA RAWAN MOLOR.',
    sub: 'Salah ketik rumus, data tertunda, dan estimasi waktu meleset.',
    bullet1: 'Formula Spreadsheet Tertimpa',
    bullet2: 'Progres Lapangan Terlambat Dilaporkan',
    bullet3: 'Beban Biaya Downtime Per Jam',
    subtitle: 'Metode konvensional berisiko tinggi salah input data dan mengakibatkan keterlambatan overhaul.',
  },
  scene3: {
    badge: 'PWA BLIND-SPOT ENGINE',
    headline: 'KERJA JALAN TERUS.',
    actionLabel: 'Input Pasang Bata: +12.5 m',
    queueAlert: 'MODE OFFLINE KILN AKTIF',
    queueSub: '3 Inspeksi Tersimpan Aman di Antrean',
    subtitle: 'Aplikasi Trunova tetap berjalan lancar di dalam blind-spot tanpa memerlukan sinyal internet.',
  },
  scene4: {
    badge: 'ZERO DATA LOSS',
    headline: 'SINYAL KEMBALI.',
    bgWord1: 'ONLINE',
    bgWord2: 'TERHUBUNG',
    statusLabel: 'SINKRONISASI INSTAN (0 DATA HILANG)',
    subtitle: 'Saat keluar dari kiln, seluruh data inspeksi langsung melesat dan tersinkronisasi otomatis.',
  },
  scene5: {
    badge: '3-STAGE QC VERIFICATION',
    headline: 'BUKTI FOTO LAPANGAN REAL.',
    photos: [
      { step: 'STAGE 1', name: 'Before Tearing', tag: 'Bongkar Bata' },
      { step: 'STAGE 2', name: 'During Bricking', tag: 'Pasang Baru' },
      { step: 'STAGE 3', name: 'After Key Jacking', tag: 'Kunci Jacking' },
    ],
    subtitle: 'Verifikasi mutu 3 tahap dengan dokumentasi foto Before, During, dan After resmi.',
  },
  scene6: {
    badge: 'EARNED VALUE MANAGEMENT',
    headline: 'KURVA-S REAL-TIME.',
    scurveLabel: 'PREDIKSI RESTART TEPAT WAKTU',
    varianceTxt: '+2.4% (Ahead of Schedule)',
    spiTxt: '1.03 (Optimal Pace)',
    subtitle: 'Engine Kurva-S memproyeksikan deviasi dan estimasi penyelesaian secara real-time.',
  },
  scene7: {
    words: [
      { text: 'OFFLINE-FIRST PWA', sub: 'Blind-Spot Mutation Queue', color: 'cream' },
      { text: '3-STAGE QC AUDIT', sub: 'Zero-Miskeying Photo Verification', color: 'amber' },
      { text: 'PRECISE S-CURVE', sub: 'Real-time EVM Variance Index', color: 'cobalt' },
    ],
    subtitle: 'Trunova: Offline-First PWA, 3-Stage QC Audit, dan Kurva-S Presisi.',
  },
  scene8: {
    tagline: 'Kiln Shutdown & Overhaul Intelligence',
    ctaBadge: 'Buka Webapp Trunova',
    url: 'trunova.app',
    subtitle: 'Kendalikan overhaul rotary kiln Anda dengan presisi. Buka trunova.app',
  },
};

export const COPY_60S_EN: Video60sCopy = {
  scene1: {
    badge: 'KILN OVERHAUL REALITY',
    part1: 'INSIDE THE STEEL KILN.',
    part2: 'ZERO NETWORK SIGNAL.',
    subtitle: 'Deep inside the heavy steel shell of a rotary kiln, all telecommunication signals are cut off.',
  },
  scene2: {
    badge: 'OPERATIONAL FRICTION',
    headline: 'LEGACY TOOLS RISK COSTLY SLIPS.',
    sub: 'Corrupted spreadsheet formulas, blind-spot communication lag, and unseen downtime.',
    bullet1: 'Formula Syntax Errors (#REF!)',
    bullet2: 'Delayed Progress Reporting (+36h)',
    bullet3: 'Unplanned Kiln Downtime ($12.5k/h)',
    subtitle: 'Conventional manual spreadsheets carry extreme risks of formula corruption and costly delay.',
  },
  scene3: {
    badge: 'PWA BLIND-SPOT ENGINE',
    headline: 'WORK KEEPS MOVING.',
    actionLabel: 'Input Bricking Progress: +12.5 m',
    queueAlert: 'KILN OFFLINE MODE ACTIVE',
    queueSub: '3 Field Inspections Queued Locally',
    subtitle: 'Trunova PWA operates continuously inside blind-spots without cellular signal.',
  },
  scene4: {
    badge: 'ZERO DATA LOSS',
    headline: 'INSTANT RECONNECTION.',
    bgWord1: 'ONLINE',
    bgWord2: 'CONNECTED',
    statusLabel: 'INSTANT SYNC (ZERO DATA LOSS)',
    subtitle: 'Stepping outside reconnects instantly with zero dropped data records.',
  },
  scene5: {
    badge: '3-STAGE QC VERIFICATION',
    headline: 'AUTHENTICATED FIELD PROOF.',
    photos: [
      { step: 'STAGE 1', name: 'Before Tearing', tag: 'Old Lining' },
      { step: 'STAGE 2', name: 'During Bricking', tag: 'New Laying' },
      { step: 'STAGE 3', name: 'After Key Jacking', tag: 'Final Lock' },
    ],
    subtitle: 'Rigorous 3-stage validation backed by official Before, During, and After field photos.',
  },
  scene6: {
    badge: 'EARNED VALUE MANAGEMENT',
    headline: 'REAL-TIME S-CURVE MATRIX.',
    scurveLabel: 'PREDICTIVE RESTART ASSURANCE',
    varianceTxt: '+2.4% (Ahead of Schedule)',
    spiTxt: '1.03 (Optimal Pace)',
    subtitle: 'The S-Curve engine projects schedule variance and estimated restart completion in real-time.',
  },
  scene7: {
    words: [
      { text: 'OFFLINE-FIRST PWA', sub: 'Blind-Spot Mutation Queue', color: 'cream' },
      { text: '3-STAGE QC AUDIT', sub: 'Photo-Verified Standards', color: 'amber' },
      { text: 'PRECISE S-CURVE', sub: 'Zero Downtime Slippage', color: 'cobalt' },
    ],
    subtitle: 'Offline resilience, certified multi-stage quality, and mathematically precise progress control.',
  },
  scene8: {
    tagline: 'Kiln Shutdown & Overhaul Intelligence',
    ctaBadge: 'Launch Trunova Today',
    url: 'trunova.app',
    subtitle: 'Take command of your cement rotary kiln overhauls with real-time data precision.',
  },
};

// Backward compatibility for 30s scenes
export interface SceneCopy {
  scene1: { part1: string; part2: string; subtitle: string };
  scene2: { headline: string; sub1: string; sub2: string; subtitle: string; actionLabel?: string; queueAlert?: string; queueSub?: string };
  scene3: { headline: string; bgWord1: string; bgWord2: string; subtitle: string; statusLabel?: string };
  scene4: { headline: string; stages: Array<{ id?: string | number; step: string; name: string; label?: string }>; subtitle: string };
  scene5: { words: Array<{ text: string; sub: string; color: string }>; subtitle: string };
  scene6: { tagline: string; ctaBadge: string; url: string; subtitle: string };
}

export const COPY_ID: SceneCopy = {
  scene1: {
    part1: 'SINYAL HILANG.',
    part2: 'KERJA JALAN TERUS.',
    subtitle: 'Di dalam rotary kiln baja tebal tanpa sinyal seluler, overhaul tidak boleh terhenti.',
  },
  scene2: {
    headline: 'INPUT TETAP JALAN',
    sub1: 'Pemasangan Bata Refraktori: +12.5m',
    sub2: 'Otomatis Masuk Antrean Offline Aman',
    subtitle: 'Aplikasi Trunova tetap responsif di dalam kiln: input data offline tersimpan tanpa kendala.',
  },
  scene3: {
    headline: 'SINYAL KEMBALI, INSTAN SINKRON',
    bgWord1: 'TERHUBUNG',
    bgWord2: 'TERIKAT',
    subtitle: 'Begitu keluar dari kiln, seluruh data inspeksi otomatis melesat dan tersinkronisasi.',
  },
  scene4: {
    headline: 'MUTU 3 TAHAP & KURVA-S OTOMATIS',
    stages: [
      { step: 'STAGE 1', name: 'Before Tearing (Foto Lapangan)' },
      { step: 'STAGE 2', name: 'During Bricking (QC Ketebalan)' },
      { step: 'STAGE 3', name: 'After Jacking (Verifikasi Siap Api)' },
    ],
    subtitle: 'Verifikasi mutu 3 tahap dan pembaruan Kurva-S langsung memprediksi waktu restart.',
  },
  scene5: {
    words: [
      { text: 'OFFLINE-FIRST', sub: 'PWA Blind-Spot Engine', color: 'cream' },
      { text: 'ANTI-MISKEYING', sub: 'Triple Verification Pipeline', color: 'amber' },
      { text: 'KURVA-S PRESISI', sub: 'Prediksi Restart Real-time', color: 'cobalt' },
    ],
    subtitle: 'Trunova: Offline-first PWA, integritas data anti-salah ketik, dan Kurva-S presisi.',
  },
  scene6: {
    tagline: 'Sistem Monitoring Overhaul Kiln Presisi Tinggi',
    ctaBadge: 'Buka Webapp Trunova',
    url: 'trunova.app',
    subtitle: 'Kendalikan overhaul kiln semen Anda dengan presisi. Buka trunova.app',
  },
};

export const COPY_EN: SceneCopy = {
  scene1: {
    part1: 'SIGNAL LOST.',
    part2: 'WORK NEVER STOPS.',
    subtitle: 'Inside the heavy steel kiln shell without cellular coverage, overhaul never stops.',
  },
  scene2: {
    headline: 'INPUT STAYS SMOOTH',
    sub1: 'Refractory Bricking: +12.5m',
    sub2: 'Automatically Queued in Local Storage',
    subtitle: 'Trunova PWA stays responsive offline inside the blind spot: zero dropped data.',
  },
  scene3: {
    headline: 'SIGNAL RESTORED, INSTANT SYNC',
    bgWord1: 'CONNECTED',
    bgWord2: 'SYNCED',
    subtitle: 'The moment you step outside the kiln, all inspection records sync instantaneously.',
  },
  scene4: {
    headline: '3-STAGE QC & REAL-TIME S-CURVE',
    stages: [
      { step: 'STAGE 1', name: 'Before Tearing (Photo Audit)' },
      { step: 'STAGE 2', name: 'During Bricking (Thickness QC)' },
      { step: 'STAGE 3', name: 'After Jacking (Fire-Ready Signoff)' },
    ],
    subtitle: 'Strict 3-stage validation and live S-Curve trajectory forecast kiln restart with precision.',
  },
  scene5: {
    words: [
      { text: 'OFFLINE-FIRST', sub: 'PWA Blind-Spot Engine', color: 'cream' },
      { text: 'ANTI-MISKEYING', sub: 'Triple Verification Pipeline', color: 'amber' },
      { text: 'PRECISE S-CURVE', sub: 'Real-time EVM Trajectory', color: 'cobalt' },
    ],
    subtitle: 'Trunova: Offline-first PWA, zero-miskeying verification, and real-time S-Curve.',
  },
  scene6: {
    tagline: 'High-Precision Kiln Overhaul Intelligence',
    ctaBadge: 'Launch Trunova Webapp',
    url: 'trunova.app',
    subtitle: 'Command your cement kiln overhaul with precision. Visit trunova.app',
  },
};

