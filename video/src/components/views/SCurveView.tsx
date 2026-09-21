import React from 'react';

export const SCurveView: React.FC = () => {
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
          CARD CONTAINER (Exact match with index.html lines 4144-4187)
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
            padding: '10px 18px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              S-Curve Matrix &amp; Daily Progress
            </div>
            <div style={{ fontSize: 10.5, color: '#64748B' }}>
              Laporan harian S-Curve komprehensif dengan progres terbobot per sub-pekerjaan
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            <button
              type="button"
              style={{
                padding: '4px 10px',
                border: '1px solid #CBD5E1',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                color: '#334155',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              Excel (.xlsx)
            </button>
            <button
              type="button"
              style={{
                padding: '4px 10px',
                border: '1px solid #CBD5E1',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                color: '#334155',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              PDF (A4)
            </button>
          </div>
        </div>

        {/* Toolbar (Exact match with index.html lines 4158-4182) */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            padding: '8px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* View Mode Switcher */}
            <div
              style={{
                display: 'flex',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                padding: 2,
              }}
            >
              <span
                style={{
                  padding: '3px 8px',
                  fontSize: 10.5,
                  fontWeight: 700,
                  borderRadius: 6,
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                }}
              >
                Mingguan (Ringkas)
              </span>
              <span
                style={{
                  padding: '3px 8px',
                  fontSize: 10.5,
                  fontWeight: 700,
                  borderRadius: 6,
                  color: '#64748B',
                }}
              >
                Harian Penuh
              </span>
            </div>

            {/* Filter IAC Dropdown mockup */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: 11,
                fontWeight: 600,
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>🏢 Semua IAC (32)</span>
              <span style={{ fontSize: 9, color: '#64748B' }}>▼</span>
            </div>

            {/* Search Input */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                padding: '3px 8px',
                fontSize: 11,
                color: '#94A3B8',
                width: 140,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span>🔍</span>
              <span>Cari sub-pekerjaan...</span>
            </div>
          </div>

          {/* Performance stats badge */}
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: '#059669',
              backgroundColor: '#ECFDF5',
              border: '1px solid rgba(16,185,129,0.3)',
              padding: '3px 8px',
              borderRadius: 6,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            32 IAC · 280 Sub-Jobdesk Terpantau
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div
          style={{
            height: 250,
            backgroundColor: '#FFFFFF',
            position: 'relative',
            padding: '12px 20px',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          {/* Chart Grid Lines */}
          <div style={{ position: 'absolute', inset: '30px 24px 30px 45px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ borderBottom: '1px dashed #E2E8F0', width: '100%' }} />
            <div style={{ borderBottom: '1px dashed #E2E8F0', width: '100%' }} />
            <div style={{ borderBottom: '1px dashed #E2E8F0', width: '100%' }} />
            <div style={{ borderBottom: '1px solid #CBD5E1', width: '100%' }} />
          </div>

          {/* Legend */}
          <div style={{ position: 'absolute', top: 10, left: 45, display: 'flex', gap: 16, fontSize: 10.5, fontWeight: 700 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748B' }}>
              <div style={{ width: 14, height: 2, borderBottom: '2px dashed #94A3B8' }} />
              <span>Target Baseline Plan</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#2563EB' }}>
              <div style={{ width: 14, height: 3, backgroundColor: '#2563EB' }} />
              <span>Realisasi Lapangan (Actual EVM)</span>
            </div>
          </div>
        </div>

        {/* Matrix Table breakdown */}
        <div style={{ padding: '8px 18px', flex: 1, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10.5, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                <th style={{ padding: '4px 6px' }}>SEKTOR KILN</th>
                <th style={{ padding: '4px 6px' }}>TARGET PLAN</th>
                <th style={{ padding: '4px 6px' }}>REALISASI FISIK</th>
                <th style={{ padding: '4px 6px' }}>DEVIASI (SV)</th>
                <th style={{ padding: '4px 6px', textAlign: 'right' }}>STATUS EVM</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '5px 6px', fontWeight: 700, color: '#0F172A' }}>IAC-01: Inlet &amp; Feed End (KM 00.0 - 12.0)</td>
                <td style={{ padding: '5px 6px', color: '#64748B' }}>100%</td>
                <td style={{ padding: '5px 6px', color: '#059669', fontWeight: 800 }}>100%</td>
                <td style={{ padding: '5px 6px', color: '#059669', fontWeight: 800 }}>0.0%</td>
                <td style={{ padding: '5px 6px', textAlign: 'right', color: '#059669', fontWeight: 800 }}>Tuntas ✓</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '5px 6px', fontWeight: 700, color: '#0F172A' }}>IAC-02: Calcining Zone (KM 12.0 - 24.2)</td>
                <td style={{ padding: '5px 6px', color: '#64748B' }}>95.0%</td>
                <td style={{ padding: '5px 6px', color: '#059669', fontWeight: 800 }}>96.5%</td>
                <td style={{ padding: '5px 6px', color: '#059669', fontWeight: 800 }}>+1.5%</td>
                <td style={{ padding: '5px 6px', textAlign: 'right', color: '#059669', fontWeight: 800 }}>Ahead of Schedule</td>
              </tr>
              <tr style={{ backgroundColor: 'rgba(37, 99, 235, 0.04)' }}>
                <td style={{ padding: '5px 6px', fontWeight: 800, color: '#2563EB' }}>IAC-04: Burning Zone Ring 30–35 (KM 28.0 - 36.7)</td>
                <td style={{ padding: '5px 6px', color: '#64748B' }}>82.0%</td>
                <td style={{ padding: '5px 6px', color: '#2563EB', fontWeight: 900 }}>88.0%</td>
                <td style={{ padding: '5px 6px', color: '#059669', fontWeight: 800 }}>+2.4%</td>
                <td style={{ padding: '5px 6px', textAlign: 'right', color: '#2563EB', fontWeight: 800 }}>Sync Diperbarui ✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
