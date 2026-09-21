import React from 'react';
import { staticFile, Img } from 'remotion';

export const InputProgressView: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: '100%',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* ============================================================
          HEADER HUD BANNER (Exact match with index.html lines 4257-4281)
          ============================================================ */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: '10px 16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D97706',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              <path d="m15 5 3 3" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
                Pelaporan Progres Fisik Lapangan
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 8.5,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  padding: '2px 6px',
                  borderRadius: 9999,
                  backgroundColor: 'rgba(245, 158, 11, 0.14)',
                  color: '#D97706',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#D97706' }} />
                SHIFT OPERATION
              </span>
            </div>
            <div style={{ fontSize: 10.5, color: '#64748B' }}>
              Input volume realisasi pekerjaan harian, tenaga kerja, dokumentasi foto, dan kendala lapangan.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              borderRadius: 6,
              fontSize: 10.5,
              fontWeight: 700,
              padding: '3px 8px',
            }}
          >
            Proyek Aktif
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 10.5,
              fontWeight: 700,
              color: '#059669',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              padding: '3px 8px',
              borderRadius: 6,
            }}
          >
            ● Offline Ready
          </span>
        </div>
      </div>

      {/* ============================================================
          MAIN FORM CARD (Exact match with index.html lines 4284-4320)
          ============================================================ */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Card Header */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            padding: '10px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 800,
                color: '#2563EB',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                borderRadius: 4,
                padding: '2px 6px',
              }}
            >
              STEP 1 – 4
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
              Formulir Pencatatan Harian (KSD Certified)
            </span>
          </div>
          <div style={{ fontSize: 10.5, color: '#64748B' }}>
            * Terproteksi Formula Anti-Miskeying Refraktori
          </div>
        </div>

        {/* Card Body */}
        <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {/* Section 1: Identifikasi Pekerjaan */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                1. Identifikasi Pekerjaan &amp; Area Kiln
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Tanggal Laporan</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>20 Sep 2026 (Shift 2)</div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Head Jobdesk (IAC)</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>IAC-04: Burning Zone</div>
              </div>

              <div style={{ backgroundColor: '#EFF6FF', padding: '8px 10px', borderRadius: 8, border: '1px solid #BFDBFE' }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>Sub-Jobdesk Spesifik</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#2563EB', marginTop: 2 }}>Bata Magnesite Ring 32</div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Kontraktor Pelaksana</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>PT Refra Mandiri (18 Org)</div>
              </div>
            </div>
          </div>

          {/* Section 2: Input Volume & Anti-Miskeying Calculation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12, flex: 1 }}>
            {/* Realtime Formula Guard Summary */}
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  2. Parameter Matematis Bata &amp; Refraktori
                </div>
                <div style={{ fontSize: 10.5, color: '#64748B', marginTop: 2 }}>
                  Otomatis divalidasi dengan radius Shell Kiln Ø 4.8m
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 10 }}>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '8px', borderRadius: 6, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                    <div style={{ fontSize: 9, color: '#64748B', fontWeight: 700 }}>PANJANG SEKTOR</div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: '#2563EB', marginTop: 2 }}>+12.5 m</div>
                  </div>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '8px', borderRadius: 6, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                    <div style={{ fontSize: 9, color: '#64748B', fontWeight: 700 }}>ESTIMASI BATA</div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', marginTop: 2 }}>3,125 pcs</div>
                  </div>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '8px', borderRadius: 6, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                    <div style={{ fontSize: 9, color: '#64748B', fontWeight: 700 }}>BERAT TONASE</div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: '#059669', marginTop: 2 }}>15.6 Ton</div>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#2563EB', fontSize: 14 }}>🛡️</span>
                <span style={{ fontSize: 10, color: '#1E40AF', fontWeight: 700 }}>
                  Anti-Miskeying Active: Toleransi deviasi fisik ±2.0% dari blueprint overhaul
                </span>
              </div>
            </div>

            {/* Photo preview slot */}
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                3. Dokumentasi Lapangan (Stage 1-3)
              </div>
              <div style={{ fontSize: 10.5, color: '#64748B', marginTop: 2 }}>
                Bukti visual langsung dari dalam tabung rotary kiln
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 8, flex: 1 }}>
                <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                  <Img src={staticFile('photos/audit-before.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(15,23,42,0.7)', color: '#fff', fontSize: 8, padding: '2px', textAlign: 'center', fontWeight: 700 }}>
                    1. BEFORE ✓
                  </div>
                </div>
                <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                  <Img src={staticFile('photos/audit-during.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(15,23,42,0.7)', color: '#fff', fontSize: 8, padding: '2px', textAlign: 'center', fontWeight: 700 }}>
                    2. DURING ✓
                  </div>
                </div>
                <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '2px solid #2563EB' }}>
                  <Img src={staticFile('photos/audit-after.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#2563EB', color: '#fff', fontSize: 8, padding: '2px', textAlign: 'center', fontWeight: 800 }}>
                    3. AFTER [PENDING]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
