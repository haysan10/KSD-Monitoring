import React from 'react';
import { staticFile, Img } from 'remotion';

interface MobileDashboardViewProps {
  progress?: number;
  ring32Progress?: number;
}

export const MobileDashboardView: React.FC<MobileDashboardViewProps> = ({
  progress = 84.2,
  ring32Progress = 88.0,
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
          1. MOBILE 2-TIER STICKY TOPBAR
          ============================================================ */}
      <header
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          flexShrink: 0,
        }}
      >
        {/* Row 1: Brand & User (Height 48px) */}
        <div
          style={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 14px',
            boxSizing: 'border-box',
          }}
        >
          {/* Brand Monogram & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#0B111E',
                borderRadius: 8,
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <Img
                src={staticFile('branding/tr-monogram-white.svg')}
                style={{ height: 16, width: 'auto' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: '#D97706',
                  boxShadow: '0 0 4px #D97706',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '0.04em',
                }}
              >
                TRUNOVA
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 7.5,
                  fontWeight: 700,
                  color: '#D97706',
                  letterSpacing: '0.1em',
                }}
              >
                KILN SHUTDOWN
              </span>
            </div>
          </div>

          {/* Right Actions: Notif Bell + Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span
                style={{
                  position: 'absolute',
                  top: -3,
                  right: -3,
                  backgroundColor: '#D97706',
                  color: '#FFFFFF',
                  fontSize: 8.5,
                  fontWeight: 800,
                  borderRadius: 9999,
                  minWidth: 14,
                  height: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 3px',
                  boxShadow: '0 0 4px rgba(217, 119, 6, 0.4)',
                }}
              >
                3
              </span>
            </div>

            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: '#2563EB',
                border: '1.5px solid #FFFFFF',
                boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: 12,
              }}
            >
              S
            </div>
          </div>
        </div>

        {/* Row 2: Active Project Switcher Card (Height 34px) */}
        <div
          style={{
            padding: '0 12px 6px 12px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              height: 28,
              backgroundColor: '#F8FAFC',
              borderRadius: 7,
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 8,
                  fontWeight: 800,
                  color: '#D97706',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                }}
              >
                PROYEK:
              </span>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  color: '#0F172A',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Overhaul Kiln Tuban #4
              </span>
            </div>
            <span style={{ fontSize: 9, color: '#64748B' }}>▼</span>
          </div>
        </div>
      </header>

      {/* ============================================================
          2. MOBILE CONTENT BODY (COMPACT SCROLLABLE HUD)
          ============================================================ */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px 12px 70px 12px', // Bottom padding for bottom-nav clearance
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
        }}
      >
        {/* Status Mini-HUD */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 10px',
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 6px #10B981' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#0F172A' }}>Sedang Berjalan</span>
            <span style={{ fontSize: 9, color: '#64748B' }}>• Tuban Line 4</span>
          </div>

          <div
            style={{
              padding: '2px 6px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: 4,
              fontSize: 8.5,
              fontWeight: 800,
              color: '#047857',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            LIVE SYNC
          </div>
        </div>

        {/* PRIMARY EVM PROGRESS CARD */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: '12px 14px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8.5,
                fontWeight: 700,
                color: '#64748B',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Progres Total Proyek
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: progress > 85 ? '#059669' : '#0F172A',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginTop: 2,
              }}
            >
              {progress.toFixed(1)}%
            </div>
            <div style={{ fontSize: 9.5, color: '#64748B', marginTop: 3 }}>
              <span>Mulai: 12 Sep • </span>
              <span style={{ color: '#059669', fontWeight: 800 }}>
                {progress > 85 ? '▲ +2.6% Accelerated' : '▲ +2.4% Ahead'}
              </span>
            </div>
          </div>

          {/* Mini Circular SVG Gauge */}
          <div style={{ width: 62, height: 62, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="62" height="62" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="11" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={progress > 85 ? '#10B981' : '#2563EB'}
                strokeWidth="11"
                strokeDasharray="251.33"
                strokeDashoffset={251.33 * (1 - progress / 100)}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
              <span style={{ fontSize: 11, fontWeight: 900, color: progress > 85 ? '#059669' : '#2563EB' }}>
                {progress.toFixed(1)}%
              </span>
              <span style={{ fontSize: 7, color: '#64748B', fontWeight: 700 }}>EVM</span>
            </div>
          </div>
        </div>

        {/* 2-COLUMN SECONDARY METRIC CHIPS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              padding: '9px 12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ fontSize: 8.5, color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Durasi Berjalan
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#059669', marginTop: 1 }}>
              14 <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>Hari</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              padding: '9px 12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ fontSize: 8.5, color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Pekerjaan IAC
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', marginTop: 1 }}>
              32 <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>Sektor</span>
            </div>
          </div>
        </div>

        {/* CRITICAL SECTORS PROGRESS */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: '12px 14px',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Sektor Kritis Lapangan
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#2563EB' }}>4 Area</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {/* Item 1 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, marginBottom: 3 }}>
                <span style={{ fontWeight: 700, color: '#334155' }}>Ring 32 Burning Zone</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: ring32Progress >= 100 ? '#059669' : '#2563EB' }}>
                  {ring32Progress.toFixed(1)}%{ring32Progress >= 100 ? ' ✓' : ''}
                </span>
              </div>
              <div style={{ height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${ring32Progress}%`, height: '100%', backgroundColor: ring32Progress >= 100 ? '#059669' : '#2563EB', borderRadius: 3 }} />
              </div>
            </div>

            {/* Item 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, marginBottom: 3 }}>
                <span style={{ fontWeight: 700, color: '#334155' }}>Inlet & Feed End Overhaul</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: '#059669' }}>100% ✓</span>
              </div>
              <div style={{ height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#059669', borderRadius: 3 }} />
              </div>
            </div>

            {/* Item 3 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, marginBottom: 3 }}>
                <span style={{ fontWeight: 700, color: '#334155' }}>Calcining Zone Refractory</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: '#059669' }}>96.5%</span>
              </div>
              <div style={{ height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: '96.5%', height: '100%', backgroundColor: '#059669', borderRadius: 3 }} />
              </div>
            </div>
          </div>
        </div>

        {/* FAST ACTION CALLOUT */}
        <div
          style={{
            backgroundColor: '#EFF6FF',
            borderRadius: 10,
            padding: '10px 12px',
            border: '1px solid #BFDBFE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 14 }}>📋</span>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#1E40AF' }}>2 Validasi Menunggu</div>
              <div style={{ fontSize: 8.5, color: '#3B82F6' }}>Foto Audit Ring 32 Siap Disetujui</div>
            </div>
          </div>
          <div style={{ fontSize: 10, color: '#1D4ED8', fontWeight: 800 }}>Tinjau →</div>
        </div>
      </div>

      {/* ============================================================
          3. AUTHENTIC MOBILE BOTTOM NAVIGATION (Height 58px)
          ============================================================ */}
      <nav
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px 6px 8px',
          boxSizing: 'border-box',
          zIndex: 60,
        }}
      >
        {/* Tab 1: Dashboard (Active) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
          <span style={{ fontSize: 9, fontWeight: 800, color: '#2563EB' }}>Dashboard</span>
        </div>

        {/* Tab 2: S-Curve */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#64748B' }}>S-Curve</span>
        </div>

        {/* Tab 3: LAPOR (Signature Elevated Center Button) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: -14, cursor: 'pointer' }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(37, 99, 235, 0.45)',
              border: '2.5px solid #FFFFFF',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </div>
          <span style={{ fontSize: 8.5, fontWeight: 800, color: '#2563EB', marginTop: -2 }}>Lapor</span>
        </div>

        {/* Tab 4: Laporan */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" x2="18" y1="20" y2="10" />
            <line x1="12" x2="12" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="14" />
          </svg>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#64748B' }}>Laporan</span>
        </div>

        {/* Tab 5: Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#64748B' }}>Menu</span>
        </div>
      </nav>
    </div>
  );
};
