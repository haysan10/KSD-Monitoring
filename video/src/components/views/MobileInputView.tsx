import React from 'react';
import { staticFile, Img } from 'remotion';

interface MobileInputViewProps {
  progress?: number;
  photoAttached?: boolean;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
}

export const MobileInputView: React.FC<MobileInputViewProps> = ({
  progress = 88,
  photoAttached = true,
  isSubmitting = false,
  isSubmitted = false,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#F3F5F9',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ============================================================
          1. TOP BAR / HEADER
          ============================================================ */}
      <header
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          height: 48,
          boxSizing: 'border-box',
          flexShrink: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              backgroundColor: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#475569',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </div>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
            Pelaporan Progres Lapangan
          </span>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 7px',
            borderRadius: 6,
            backgroundColor: '#DCFCE7',
            border: '1px solid #86EFAC',
            color: '#15803D',
            fontSize: 9.5,
            fontWeight: 800,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#10B981' }} />
          OFFLINE READY
        </div>
      </header>

      {/* ============================================================
          2. SCROLLABLE FORM BODY
          ============================================================ */}
      <div
        style={{
          flex: 1,
          overflowY: 'hidden',
          padding: '10px 12px 64px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          boxSizing: 'border-box',
        }}
      >
        {/* Status HUD Mini Strip */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            padding: '8px 10px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#0F172A' }}>
                OVERHAUL KILN TUBAN #4
              </div>
              <div style={{ fontSize: 9, color: '#64748B' }}>
                Shift Siang · Sektor Ring 32 Burning Zone
              </div>
            </div>
          </div>
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              color: '#2563EB',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: 4,
              padding: '2px 5px',
            }}
          >
            STEP 1-3
          </span>
        </div>

        {/* Section 1: Identifikasi Sektor Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            padding: '10px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{ fontSize: 9.5, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Identifikasi Pekerjaan
          </div>
          
          <div
            style={{
              padding: '6px 8px',
              backgroundColor: '#F8FAFC',
              borderRadius: 6,
              border: '1px solid #CBD5E1',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <span style={{ fontSize: 8.5, color: '#64748B' }}>Head Jobdesk (IAC):</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#0F172A' }}>
              IAC-04: Burning Zone Ring 30–35 (KM 28.0 - 36.7)
            </span>
          </div>

          <div
            style={{
              padding: '6px 8px',
              backgroundColor: '#F8FAFC',
              borderRadius: 6,
              border: '1px solid #CBD5E1',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <span style={{ fontSize: 8.5, color: '#64748B' }}>Sub-Jobdesk Spesifik:</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#2563EB' }}>
              Bricking Magnesite Ring 32 (Target: 100%)
            </span>
          </div>
        </div>

        {/* Section 2: Realisasi Progres & Tactile Slider Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            padding: '10px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Capaian Progres Kumulatif *
              </div>
              <div style={{ fontSize: 8.5, color: '#64748B' }}>
                Anti-Miskeying Monotonic Guard Aktif
              </div>
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 22,
                fontWeight: 900,
                color: progress >= 100 ? '#10B981' : '#2563EB',
                lineHeight: 1,
              }}
            >
              {Math.round(progress)}%
            </div>
          </div>

          {/* Range Slider Visualization */}
          <div style={{ width: '100%', position: 'relative', height: 26, display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 8,
                backgroundColor: '#E2E8F0',
                borderRadius: 9999,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: progress >= 100 ? 'linear-gradient(90deg, #2563EB, #10B981)' : '#2563EB',
                  borderRadius: 9999,
                  transition: 'width 0.1s ease',
                }}
              />
            </div>
            {/* Slider Thumb */}
            <div
              style={{
                position: 'absolute',
                left: `calc(${progress}% - 11px)`,
                width: 22,
                height: 22,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: progress >= 100 ? '3px solid #10B981' : '3px solid #2563EB',
                boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: '#94A3B8' }}>PRESET:</span>
            {[25, 50, 75, 100].map((val) => {
              const isSelected = Math.round(progress) === val;
              return (
                <div
                  key={val}
                  style={{
                    flex: 1,
                    padding: '4px 0',
                    textAlign: 'center',
                    fontSize: 9,
                    fontWeight: isSelected ? 800 : 600,
                    borderRadius: 5,
                    backgroundColor: isSelected ? (val === 100 ? '#DCFCE7' : '#EFF6FF') : '#F1F5F9',
                    color: isSelected ? (val === 100 ? '#15803D' : '#1D4ED8') : '#475569',
                    border: isSelected
                      ? (val === 100 ? '1px solid #86EFAC' : '1px solid #93C5FD')
                      : '1px solid #E2E8F0',
                  }}
                >
                  {val}%
                </div>
              );
            })}
          </div>

          {/* Guard Alert */}
          <div
            style={{
              padding: '5px 8px',
              backgroundColor: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 8.5,
              fontWeight: 700,
              color: '#1D4ED8',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Anti-Miskeying: Nilai valid &gt;= 88.0% (Terkunci Otomatis)</span>
          </div>
        </div>

        {/* Section 3: Foto Bukti Fisik Lapangan */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            padding: '10px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9.5, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Dokumentasi Foto Lapangan
            </span>
            <span style={{ fontSize: 8.5, color: '#16A34A', fontWeight: 700 }}>
              ✓ GPS &amp; Timestamp Verified
            </span>
          </div>

          {photoAttached ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 36,
                  borderRadius: 6,
                  overflow: 'hidden',
                  backgroundColor: '#0F172A',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Img
                  src={staticFile('photos/audit-during.jpg')}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  IMG_RING32_BRICKING_FINAL.JPG
                </div>
                <div style={{ fontSize: 8, color: '#64748B' }}>
                  340 KB · Kompresi Kiln Offline Aktif
                </div>
              </div>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: '12px',
                borderRadius: 8,
                border: '1.5px dashed #94A3B8',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                color: '#64748B',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <span style={{ fontSize: 9.5, fontWeight: 700 }}>Ketuk untuk Ambil Foto Fisik</span>
            </div>
          )}
        </div>

        {/* Action Button: Kirim Laporan Lapangan */}
        <div style={{ marginTop: 'auto', paddingTop: 4 }}>
          <div
            style={{
              width: '100%',
              padding: '11px 0',
              borderRadius: 8,
              background: isSubmitted
                ? '#10B981'
                : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              boxShadow: isSubmitted
                ? '0 4px 12px rgba(16, 185, 129, 0.35)'
                : '0 4px 12px rgba(37, 99, 235, 0.35)',
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.04em',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transform: isSubmitting ? 'scale(0.97)' : 'scale(1)',
              transition: 'all 0.15s ease',
            }}
          >
            {isSubmitted ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>LAPORAN TERSIMPAN • SYNCED</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                <span>KIRIM LAPORAN LAPANGAN</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================
          3. FLOATING SYNC TOAST (POPUP WHEN SUBMITTED)
          ============================================================ */}
      {isSubmitted && (
        <div
          style={{
            position: 'absolute',
            bottom: 66,
            left: 14,
            right: 14,
            backgroundColor: '#0F172A',
            borderRadius: 10,
            padding: '10px 12px',
            border: '1px solid #334155',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 100,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#FFFFFF' }}>
              Telemetri Lapangan Tersimpan!
            </div>
            <div style={{ fontSize: 8.5, color: '#94A3B8' }}>
              S-Curve &amp; Command Center terupdate real-time.
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          4. 5-TAB MOBILE BOTTOM NAV
          ============================================================ */}
      <nav
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 60,
          padding: '0 8px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: '#94A3B8', fontSize: 9, fontWeight: 600 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
          <span>Dashboard</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: '#94A3B8', fontSize: 9, fontWeight: 600 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
          <span>S-Curve</span>
        </div>

        {/* Elevated Lapor Tab (Active) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: '#2563EB', fontSize: 9, fontWeight: 800 }}>
          <div
            style={{
              width: 40,
              height: 40,
              marginTop: -14,
              borderRadius: '50%',
              backgroundColor: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.45)',
              border: '2px solid #FFFFFF',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </div>
          <span>Lapor</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: '#94A3B8', fontSize: 9, fontWeight: 600 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" x2="18" y1="20" y2="10" />
            <line x1="12" x2="12" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="14" />
          </svg>
          <span>Laporan</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: '#94A3B8', fontSize: 9, fontWeight: 600 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span>Menu</span>
        </div>
      </nav>
    </div>
  );
};
