import React from 'react';
import { staticFile, Img } from 'remotion';

export type TrunovaViewType = 'dashboard' | 'input' | 'scurve' | 'validations' | 'table';

interface TrunovaAppShellProps {
  activeView: TrunovaViewType;
  children?: React.ReactNode;
}

export const TrunovaAppShell: React.FC<TrunovaAppShellProps> = ({
  activeView,
  children,
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
          1. 2-TIER STICKY TOPBAR (FULL WIDTH SPAN ACROSS APP)
          ============================================================ */}
      <header
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          flexShrink: 0,
        }}
      >
        {/* Baris 1: Brand & Top Actions (Height 54px) */}
        <div
          style={{
            height: 54,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 18px',
            boxSizing: 'border-box',
          }}
        >
          {/* Brand Mark & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div
              style={{
                width: 36,
                height: 36,
                backgroundColor: '#0B111E',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
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
                style={{ height: 20, width: 'auto' }}
              />
              {/* Amber bottom indicator line */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: '#D97706',
                  boxShadow: '0 0 6px #D97706',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                TRUNOVA
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 8.5,
                  fontWeight: 700,
                  color: '#D97706',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                KILN SHUTDOWN
              </span>
            </div>
          </div>

          {/* Topbar Actions: Strictly 2 Elements (Notif Bell + Avatar) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* 1. Notification Bell Button */}
            <div
              style={{
                width: 38,
                height: 38,
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                color: '#64748B',
                cursor: 'pointer',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              {/* Notif badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: '#D97706',
                  color: '#FFFFFF',
                  fontSize: 9,
                  fontWeight: 800,
                  borderRadius: 9999,
                  padding: '1px 5px',
                  lineHeight: 1,
                }}
              >
                3
              </div>
            </div>

            {/* 2. Avatar Trigger Button */}
            <div
              style={{
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
                }}
              >
                S
              </div>
            </div>
          </div>
        </div>

        {/* Baris 2: Project Switcher (Full Width Tactile Card) */}
        <div style={{ width: '100%', padding: '0 18px 8px', boxSizing: 'border-box' }}>
          <div
            style={{
              width: '100%',
              minHeight: 40,
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 10,
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: '#D97706',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  marginBottom: 2,
                }}
              >
                PROYEK AKTIF
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#0F172A',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: 1.2,
                }}
              >
                Overhaul Kiln Tuban #4 (Major Shutdown)
              </div>
            </div>

            <div style={{ color: '#64748B', display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          2. APP BODY (AUTHENTIC SIDEBAR + MAIN CONTENT CONTAINER)
          ============================================================ */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* ---------- LEFT SIDEBAR (240px) ---------- */}
        <nav
          style={{
            width: 240,
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            backgroundImage: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            padding: '10px 0',
            boxSizing: 'border-box',
          }}
        >
          {/* SECTION: MONITORING */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              color: '#64748B',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              padding: '6px 18px 4px',
            }}
          >
            Monitoring
          </div>

          <NavItem
            id="dashboard"
            label="Dashboard"
            isActive={activeView === 'dashboard'}
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
            }
          />

          <NavItem
            id="overview"
            label="Ringkasan Semua Proyek"
            isActive={false}
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            }
          />

          <NavItem
            id="scurve"
            label="S-Curve Matrix"
            isActive={activeView === 'scurve'}
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            }
          />

          <NavItem
            id="table"
            label="Hierarki Pekerjaan"
            isActive={activeView === 'table'}
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12h-8" />
                <path d="M21 6H8" />
                <path d="M21 18h-8" />
                <path d="M3 6v4c0 1.1.9 2 2 2h3" />
                <path d="M3 10v6c0 1.1.9 2 2 2h3" />
              </svg>
            }
          />

          <NavItem
            id="validations"
            label="Validasi Progres"
            isActive={activeView === 'validations'}
            badgeText="2"
            badgeColor="#DC2626"
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={activeView === 'validations' ? '#2563EB' : '#D97706'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            }
          />

          {/* SECTION: INPUT & LAPORAN */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              color: '#64748B',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              padding: '12px 18px 4px',
            }}
          >
            Input &amp; Laporan
          </div>

          <NavItem
            id="input"
            label="Input Progres"
            isActive={activeView === 'input'}
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                <path d="m15 5 3 3" />
              </svg>
            }
          />

          <NavItem
            id="calendar"
            label="Kalender Harian"
            isActive={false}
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
            }
          />

          <NavItem
            id="reports"
            label="Grafik Laporan"
            isActive={false}
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" x2="18" y1="20" y2="10" />
                <line x1="12" x2="12" y1="20" y2="4" />
                <line x1="6" x2="6" y1="20" y2="14" />
              </svg>
            }
          />

          <NavItem
            id="castable"
            label="Inspeksi Castable"
            isActive={false}
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                <path d="M8.5 2h7" />
                <path d="M7 16h10" />
              </svg>
            }
          />

          <NavItem
            id="logs"
            label="Material &amp; Manpower"
            isActive={false}
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="m9 14 2 2 4-4" />
              </svg>
            }
          />

          {/* SECTION: ADMIN */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              color: '#64748B',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              padding: '12px 18px 4px',
            }}
          >
            Admin
          </div>

          <NavItem
            id="setup"
            label="Setup &amp; Proyek"
            isActive={false}
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7h-9" />
                <path d="M14 17H5" />
                <circle cx="17" cy="17" r="3" />
                <circle cx="7" cy="7" r="3" />
              </svg>
            }
          />

          {/* Sidebar Footer System Badge */}
          <div
            style={{
              marginTop: 'auto',
              padding: '10px 16px',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 9999,
                  backgroundColor: '#059669',
                  boxShadow: '0 0 6px #059669',
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  color: '#64748B',
                }}
              >
                v2.4.0 • Online Sync
              </span>
            </div>
          </div>
        </nav>

        {/* ---------- RIGHT MAIN CONTENT CONTAINER ---------- */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F3F5F9',
            overflow: 'hidden',
          }}
        >
          {/* PROJECT BANNER (Exact match with index.html lines 1908-1998) */}
          <div
            style={{
              backgroundColor: '#F3F5F9',
              borderBottom: '1px solid #E2E8F0',
              width: '100%',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            {/* Ambient hairline gradient */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 1,
                background: 'linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.2) 30%, rgba(37,99,235,0.14) 70%, transparent 100%)',
              }}
            />

            <div
              style={{
                padding: '10px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
              }}
            >
              <div>
                {/* Status dot + text */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#334155',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    backgroundColor: '#EDF2F7',
                    border: '1px solid #E2E8F0',
                    padding: '2px 8px',
                    borderRadius: 9999,
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 9999,
                      backgroundColor: '#059669',
                      boxShadow: '0 0 6px #059669',
                    }}
                  />
                  <span>
                    Status: <strong style={{ color: '#0F172A' }}>Sedang Berjalan</strong>
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: '#0F172A',
                    letterSpacing: '-0.02em',
                    margin: 0,
                    lineHeight: 1.15,
                  }}
                >
                  Overhaul Kiln Tuban #4 (Major Shutdown)
                </h2>

                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    color: '#64748B',
                    margin: '2px 0 0 0',
                  }}
                >
                  Area: Tuban Line 4 | Durasi: 12 Sep 2026 - 28 Sep 2026 (16 Hari)
                </p>
              </div>

              {/* Action buttons on banner right */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #FCD34D',
                    color: '#B45309',
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontSize: 10.5,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Butuh Validasi (2)
                </div>

                <button
                  type="button"
                  style={{
                    padding: '5px 12px',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: '#334155',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  Arsipkan
                </button>

                <button
                  type="button"
                  style={{
                    padding: '5px 12px',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: '#334155',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  Sinkronisasi
                </button>
              </div>
            </div>
          </div>

          {/* PAGE CONTENT CONTAINER */}
          <div
            style={{
              padding: '14px 22px',
              flex: 1,
              overflow: 'hidden',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  id: string;
  label: string;
  isActive: boolean;
  icon: React.ReactNode;
  badgeText?: string;
  badgeColor?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  isActive,
  icon,
  badgeText,
  badgeColor = '#DC2626',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '7px 14px',
        margin: '1px 8px',
        borderRadius: 8,
        backgroundColor: isActive ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
        color: isActive ? '#2563EB' : '#475569',
        fontWeight: isActive ? 700 : 600,
        fontSize: 12.5,
        position: 'relative',
        cursor: 'pointer',
        minHeight: 36,
        boxSizing: 'border-box',
        transition: 'all 150ms ease',
      }}
    >
      {/* Signature glowing left-border pill from index.html line 1860 */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            left: -8,
            top: '20%',
            bottom: '20%',
            width: 3,
            backgroundColor: '#2563EB',
            borderRadius: '0 4px 4px 0',
            boxShadow: '0 0 8px #2563EB, 0 0 16px rgba(37, 99, 235, 0.28)',
          }}
        />
      )}

      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isActive ? '#2563EB' : '#64748B',
          flexShrink: 0,
        }}
      >
        {icon}
      </span>

      <span
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1,
        }}
      >
        {label}
      </span>

      {badgeText && (
        <span
          style={{
            backgroundColor: badgeColor,
            color: '#FFFFFF',
            fontSize: 9.5,
            fontWeight: 800,
            borderRadius: 9999,
            padding: '1px 6px',
            lineHeight: 1.2,
          }}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
};
