import React from 'react';
import { staticFile, Img } from 'remotion';

export const ValidationsView: React.FC = () => {
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
          CARD CONTAINER (Exact match with index.html lines 4215-4254)
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
              Antrean Validasi Progres Kontraktor
            </div>
            <div style={{ fontSize: 10.5, color: '#64748B' }}>
              Tinjau dan setujui laporan progres harian yang diajukan mitra kontraktor sebelum dihitung resmi ke metrik proyek.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                fontWeight: 700,
                color: '#B45309',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FCD34D',
                padding: '3px 8px',
                borderRadius: 6,
              }}
            >
              2 Menunggu Approval
            </span>
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
              Muat Ulang
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ padding: '10px 18px', flex: 1, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                <th style={{ padding: '6px' }}>Tanggal</th>
                <th style={{ padding: '6px' }}>Kontraktor (PT)</th>
                <th style={{ padding: '6px' }}>Sub-Jobdesk</th>
                <th style={{ padding: '6px' }}>Capaian</th>
                <th style={{ padding: '6px' }}>Pelapor / Shift</th>
                <th style={{ padding: '6px' }}>Catatan</th>
                <th style={{ padding: '6px', textAlign: 'center' }}>Foto 3-Tahap</th>
                <th style={{ padding: '6px', textAlign: 'right' }}>Aksi Validasi</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Focus item Ring 32 */}
              <tr style={{ backgroundColor: 'rgba(37, 99, 235, 0.04)', borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '8px 6px', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#0F172A', fontWeight: 700 }}>
                  20/09 16:40
                </td>
                <td style={{ padding: '8px 6px', fontWeight: 800, color: '#0F172A' }}>
                  PT Refra Mandiri
                </td>
                <td style={{ padding: '8px 6px', fontWeight: 800, color: '#2563EB' }}>
                  Bricking Magnesite Ring 32
                </td>
                <td style={{ padding: '8px 6px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, color: '#2563EB' }}>
                  +12.5m (88.0%)
                </td>
                <td style={{ padding: '8px 6px', color: '#64748B', fontSize: 10.5 }}>
                  Dani R. (Shift 2)
                </td>
                <td style={{ padding: '8px 6px', color: '#334155', fontSize: 10.5 }}>
                  Key brick jacking selesai. Cek clearance &amp; mortar.
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 4, overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                      <Img src={staticFile('photos/audit-before.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: 4, overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                      <Img src={staticFile('photos/audit-during.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: 4, overflow: 'hidden', border: '1px solid #2563EB' }}>
                      <Img src={staticFile('photos/audit-after.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'right' }}>
                  <span
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      borderRadius: 6,
                      fontSize: 10.5,
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    Setujui QC &rarr;
                  </span>
                </td>
              </tr>

              {/* Row 2: Secondary item */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '8px 6px', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#64748B' }}>
                  20/09 14:15
                </td>
                <td style={{ padding: '8px 6px', fontWeight: 700, color: '#0F172A' }}>
                  PT Indo Cipta
                </td>
                <td style={{ padding: '8px 6px', fontWeight: 700, color: '#334155' }}>
                  Anchoring Calcining Zone
                </td>
                <td style={{ padding: '8px 6px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: '#059669' }}>
                  +8.0m (95.0%)
                </td>
                <td style={{ padding: '8px 6px', color: '#64748B', fontSize: 10.5 }}>
                  Budi S. (Shift 1)
                </td>
                <td style={{ padding: '8px 6px', color: '#334155', fontSize: 10.5 }}>
                  Welding pull test 12 anchors OK.
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>2/2 Foto ✓</span>
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'right' }}>
                  <span
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      borderRadius: 6,
                      fontSize: 10.5,
                      fontWeight: 700,
                    }}
                  >
                    Tinjau
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
