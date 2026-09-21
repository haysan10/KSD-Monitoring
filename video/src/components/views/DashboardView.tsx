import React from 'react';

interface DashboardViewProps {
  totalProgress?: number;
  ring32Progress?: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  totalProgress = 84.2,
  ring32Progress = 88.0,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        height: '100%',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* ============================================================
          TOP 3 METRICS GRID (Exact match with index.html lines 3922-3981)
          ============================================================ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr',
          gap: 12,
          flexShrink: 0,
        }}
      >
        {/* Metric Card 1: Primary EVM Gauge */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            padding: '14px 18px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                color: '#64748B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Progres Total Proyek
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: totalProgress > 85 ? '#059669' : '#0F172A',
                letterSpacing: '-0.02em',
                marginTop: 2,
                lineHeight: 1.1,
              }}
            >
              {totalProgress.toFixed(1)}%
            </div>
            <div
              style={{
                fontSize: 10.5,
                color: '#64748B',
                marginTop: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span>Mulai:</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#0F172A' }}>
                12 Sep 2026
              </span>
              <span style={{ color: '#059669', fontWeight: 800, marginLeft: 4 }}>
                {totalProgress > 85 ? '▲ +2.6% Accelerated' : '▲ +2.4% Ahead'}
              </span>
            </div>
          </div>

          {/* SVG Circular Gauge */}
          <div
            style={{
              width: 72,
              height: 72,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="72" height="72" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={totalProgress > 85 ? '#10B981' : '#2563EB'}
                strokeWidth="10"
                strokeDasharray="251.33"
                strokeDashoffset={251.33 * (1 - totalProgress / 100)}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                lineHeight: 1,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 900, color: totalProgress > 85 ? '#059669' : '#2563EB' }}>
                {totalProgress.toFixed(1)}%
              </span>
              <span style={{ fontSize: 8.5, color: '#64748B', fontWeight: 700 }}>
                EVM
              </span>
            </div>
          </div>
        </div>

        {/* Metric Card 2: Duration */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            padding: '14px 18px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              color: '#64748B',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Lamanya Proyek Berjalan
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: '#059669',
              letterSpacing: '-0.02em',
              marginTop: 2,
              lineHeight: 1.1,
            }}
          >
            14
            <span style={{ fontSize: 15, fontWeight: 700, color: '#64748B', marginLeft: 4 }}>
              hari
            </span>
          </div>
          <div
            style={{
              fontSize: 10.5,
              color: '#64748B',
              marginTop: 4,
              lineHeight: 1.2,
            }}
          >
            Dihitung dinamis dari tanggal mulai proyek.
          </div>
        </div>

        {/* Metric Card 3: Jobdesk Structure */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            padding: '14px 18px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              color: '#64748B',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Struktur Pekerjaan
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              marginTop: 3,
            }}
          >
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                TOTAL IAC
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
                32
              </div>
            </div>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                SUB-JOBDESK
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
                280
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 4,
              fontSize: 10.5,
              color: '#64748B',
            }}
          >
            <span>Rata-rata Terbobot</span>
            <span
              style={{
                backgroundColor: '#ECFDF5',
                color: '#059669',
                fontSize: 9.5,
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: 4,
              }}
            >
              Sistem Aktif
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================
          MAIN DASHBOARD TWO-COLUMN LAYOUT
          ============================================================ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 12, flex: 1, minHeight: 0 }}>
        {/* LEFT COLUMN: Head Jobdesk Progress & Variance Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          {/* Card: Progres per Head Jobdesk (IAC) */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
              padding: '12px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Progres per Head Jobdesk (IAC)
                </div>
                <div style={{ fontSize: 10.5, color: '#64748B' }}>
                  Status pencapaian masing-masing unit pekerjaan kiln
                </div>
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#2563EB',
                  backgroundColor: 'rgba(37, 99, 235, 0.08)',
                  padding: '3px 8px',
                  borderRadius: 6,
                }}
              >
                4 SEKTOR KRITIS
              </span>
            </div>

            {/* IAC Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Sector 1 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, color: '#334155' }}>
                    IAC-01: Inlet &amp; Feed End Overhaul (KM 00.0 - 12.0)
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: '#059669' }}>
                    100% ✓
                  </span>
                </div>
                <div style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#10B981', borderRadius: 3 }} />
                </div>
              </div>

              {/* Sector 2 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, color: '#334155' }}>
                    IAC-02: Calcining Zone Refractory (KM 12.0 - 24.2)
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: '#059669' }}>
                    96.5%
                  </span>
                </div>
                <div style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '96.5%', height: '100%', backgroundColor: '#10B981', borderRadius: 3 }} />
                </div>
              </div>

              {/* Sector 3 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, color: '#334155' }}>
                    IAC-03: Upper Transition Zone (KM 24.2 - 28.0)
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: '#059669' }}>
                    92.0%
                  </span>
                </div>
                <div style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', backgroundColor: '#10B981', borderRadius: 3 }} />
                </div>
              </div>

              {/* Sector 4 - Focus */}
              <div style={{ backgroundColor: ring32Progress >= 100 ? 'rgba(16, 185, 129, 0.06)' : 'rgba(37, 99, 235, 0.04)', padding: '5px 8px', borderRadius: 6, border: ring32Progress >= 100 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(37, 99, 235, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span style={{ fontWeight: 800, color: ring32Progress >= 100 ? '#059669' : '#2563EB' }}>
                    IAC-04: Burning Zone Ring 30–35 (KM 28.0 - 36.7)
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, color: ring32Progress >= 100 ? '#059669' : '#2563EB' }}>
                    {ring32Progress.toFixed(1)}%{ring32Progress >= 100 ? ' ✓' : ''}
                  </span>
                </div>
                <div style={{ height: 6, backgroundColor: ring32Progress >= 100 ? '#D1FAE5' : '#DBEAFE', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${ring32Progress}%`, height: '100%', backgroundColor: ring32Progress >= 100 ? '#10B981' : '#2563EB', borderRadius: 3 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card: Baseline vs Actual Variance Table */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: '14px 18px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Baseline vs Actual Variance
                </div>
                <div style={{ fontSize: 9.5, color: '#64748B' }}>
                  Perbandingan jadwal terencana dengan realisasi lapangan
                </div>
              </div>
            </div>

            <div style={{ overflowX: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10.5 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', textAlign: 'left' }}>
                    <th style={{ padding: '4px 6px', fontWeight: 700 }}>Sub-Jobdesk</th>
                    <th style={{ padding: '4px 6px', fontWeight: 700 }}>Plan</th>
                    <th style={{ padding: '4px 6px', fontWeight: 700 }}>Actual</th>
                    <th style={{ padding: '4px 6px', fontWeight: 700 }}>Variance</th>
                    <th style={{ padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '5px 6px', fontWeight: 700, color: '#0F172A' }}>Demolisi Bata Ring 30–32</td>
                    <td style={{ padding: '5px 6px', color: '#64748B' }}>12-14 Sep</td>
                    <td style={{ padding: '5px 6px', color: '#0F172A' }}>12-13 Sep</td>
                    <td style={{ padding: '5px 6px', color: '#059669', fontWeight: 800 }}>-1 Hari</td>
                    <td style={{ padding: '5px 6px', textAlign: 'right', color: '#059669', fontWeight: 800 }}>Tuntas ✓</td>
                  </tr>
                  <tr style={{ backgroundColor: ring32Progress >= 100 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(37, 99, 235, 0.04)', borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '5px 6px', fontWeight: 800, color: ring32Progress >= 100 ? '#059669' : '#2563EB' }}>Bricking Magnesite Ring 32</td>
                    <td style={{ padding: '5px 6px', color: '#64748B' }}>15-20 Sep</td>
                    <td style={{ padding: '5px 6px', color: ring32Progress >= 100 ? '#059669' : '#2563EB', fontWeight: 700 }}>15-20 Sep</td>
                    <td style={{ padding: '5px 6px', color: '#059669', fontWeight: 800 }}>0 Hari</td>
                    <td style={{ padding: '5px 6px', textAlign: 'right', color: ring32Progress >= 100 ? '#059669' : '#2563EB', fontWeight: 800 }}>
                      {ring32Progress >= 100 ? 'Tuntas ✓' : `${ring32Progress.toFixed(1)}%`}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px 6px', fontWeight: 700, color: '#475569' }}>Grouting &amp; Jacking Ring 32</td>
                    <td style={{ padding: '5px 6px', color: '#64748B' }}>21-22 Sep</td>
                    <td style={{ padding: '5px 6px', color: '#64748B' }}>21-22 Sep</td>
                    <td style={{ padding: '5px 6px', color: '#64748B' }}>—</td>
                    <td style={{ padding: '5px 6px', textAlign: 'right', color: '#D97706', fontWeight: 700 }}>Siap Mulai</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Aktivitas Terbaru & Alert/Perhatian */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          {/* Card: Aktivitas Terbaru */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
              padding: '12px 18px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }}
          >
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Aktivitas Terbaru
              </div>
              <div style={{ fontSize: 10.5, color: '#64748B' }}>
                Pembaruan progres terakhir
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '6px 10px', backgroundColor: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748B' }}>
                  <span style={{ fontWeight: 700, color: '#2563EB' }}>Input Progres Lapangan</span>
                  <span>5 menit lalu</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', marginTop: 1 }}>
                  Ring 32 Bricking dilaporkan (+12.5m)
                </div>
              </div>

              <div style={{ padding: '6px 10px', backgroundColor: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748B' }}>
                  <span style={{ fontWeight: 700, color: '#059669' }}>QC Inspector Verifikasi</span>
                  <span>22 menit lalu</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', marginTop: 1 }}>
                  Lolos verifikasi Slot 1 &amp; 2 (Photo Audit)
                </div>
              </div>

              <div style={{ padding: '6px 10px', backgroundColor: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748B' }}>
                  <span style={{ fontWeight: 700, color: '#64748B' }}>Telemetry Sync Engine</span>
                  <span>1 jam lalu</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', marginTop: 1 }}>
                  3 offline packets synced seamlessly
                </div>
              </div>
            </div>
          </div>

          {/* Card: Alert & Perhatian */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
              padding: '12px 18px',
            }}
          >
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Alert &amp; Perhatian
              </div>
              <div style={{ fontSize: 10.5, color: '#64748B' }}>
                Notifikasi sistem aktif
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#D97706' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#92400E' }}>
                  2 antrean validasi menunggu persetujuan
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#059669' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#065F46' }}>
                  Target Firing: 2 hari lagi (On Schedule)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
