import React from 'react';

export const MasterTableView: React.FC = () => {
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
          CARD CONTAINER (Exact match with index.html lines 4190-4212)
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
              Hierarki Bobot Konstruksi KSD
            </div>
            <div style={{ fontSize: 10.5, color: '#64748B' }}>
              Struktur pembobotan IAC dengan sub-tugas pendukung
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: 8,
              padding: '4px 10px',
              fontSize: 11,
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              width: 200,
            }}
          >
            <span>🔍</span>
            <span>Cari IAC atau Sub-Jobdesk...</span>
          </div>
        </div>

        {/* Hierarchical Tree Table */}
        <div style={{ padding: '10px 18px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Header Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr 1.2fr 1fr 1fr', padding: '6px 10px', backgroundColor: '#F8FAFC', borderRadius: 6, fontSize: 10.5, fontWeight: 800, color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}>
            <span>KODE IAC</span>
            <span>DESKRIPSI SEKTOR / PEKERJAAN</span>
            <span>KONTRAKTOR</span>
            <span>BOBOT EVM</span>
            <span style={{ textAlign: 'right' }}>CAPAIAN</span>
          </div>

          {/* Items */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr 1.2fr 1fr 1fr', padding: '8px 10px', borderBottom: '1px solid #F1F5F9', fontSize: 11, alignItems: 'center' }}>
            <span style={{ fontWeight: 800, color: '#0F172A' }}>IAC-01</span>
            <span style={{ color: '#334155' }}>Inlet &amp; Feed End Overhaul (KM 00.0 - 12.0)</span>
            <span style={{ color: '#64748B' }}>PT Refra Mandiri</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>18.5%</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, color: '#059669', textAlign: 'right' }}>100% ✓</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr 1.2fr 1fr 1fr', padding: '8px 10px', borderBottom: '1px solid #F1F5F9', fontSize: 11, alignItems: 'center' }}>
            <span style={{ fontWeight: 800, color: '#0F172A' }}>IAC-02</span>
            <span style={{ color: '#334155' }}>Calcining Zone Refractory (KM 12.0 - 24.2)</span>
            <span style={{ color: '#64748B' }}>PT Indo Cipta</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>22.0%</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, color: '#059669', textAlign: 'right' }}>96.5%</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr 1.2fr 1fr 1fr', padding: '8px 10px', borderBottom: '1px solid #F1F5F9', fontSize: 11, alignItems: 'center' }}>
            <span style={{ fontWeight: 800, color: '#0F172A' }}>IAC-03</span>
            <span style={{ color: '#334155' }}>Upper Transition Zone (KM 24.2 - 28.0)</span>
            <span style={{ color: '#64748B' }}>PT Refra Mandiri</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>14.0%</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, color: '#059669', textAlign: 'right' }}>92.0%</span>
          </div>

          {/* Active Highlight Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr 1.2fr 1fr 1fr', padding: '8px 10px', backgroundColor: 'rgba(37, 99, 235, 0.06)', borderRadius: 6, border: '1px solid rgba(37, 99, 235, 0.25)', fontSize: 11, alignItems: 'center' }}>
            <span style={{ fontWeight: 900, color: '#2563EB' }}>IAC-04</span>
            <span style={{ fontWeight: 800, color: '#0F172A' }}>Burning Zone Ring 30–35 (KM 28.0 - 36.7)</span>
            <span style={{ color: '#2563EB', fontWeight: 700 }}>PT Refra Mandiri</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800 }}>30.5%</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, color: '#2563EB', textAlign: 'right' }}>88.0%</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr 1.2fr 1fr 1fr', padding: '8px 10px', fontSize: 11, alignItems: 'center' }}>
            <span style={{ fontWeight: 800, color: '#0F172A' }}>IAC-05</span>
            <span style={{ color: '#334155' }}>Outlet &amp; Cooler Zone (KM 36.7 - 45.0)</span>
            <span style={{ color: '#64748B' }}>PT Mega Konstruksi</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>15.0%</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, color: '#059669', textAlign: 'right' }}>82.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
