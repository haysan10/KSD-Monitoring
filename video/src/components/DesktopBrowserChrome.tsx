import React from 'react';
import { staticFile, Img } from 'remotion';
import { TEASER_TIMING } from '../constants/timingTeaser';

interface DesktopBrowserChromeProps {
  imageSrc?: string;
  width?: number;
  height?: number;
  urlText?: string;
  tabTitle?: string;
  connectionStatus?: 'online' | 'offline' | 'syncing';
  children?: React.ReactNode;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export const DesktopBrowserChrome: React.FC<DesktopBrowserChromeProps> = ({
  imageSrc,
  width = 1460,
  height = 830,
  urlText = 'https://trunova.id/command-center',
  tabTitle = 'TRUNOVA — Kiln #4 Major Overhaul',
  connectionStatus = 'online',
  children,
  style,
  contentStyle,
}) => {
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        boxShadow:
          '0 32px 85px -18px rgba(15, 23, 42, 0.24), 0 16px 36px -12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.08), 0 1px 3px 0 rgba(15, 23, 42, 0.04)',
        border: '1px solid rgba(226, 232, 240, 0.95)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        ...style,
      }}
    >
      {/* Chrome Tab Bar & Window Controls */}
      <div
        style={{
          height: 44,
          backgroundColor: '#F1F5F9',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          boxSizing: 'border-box',
          gap: 14,
        }}
      >
        {/* macOS Traffic Lights */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56', border: '1px solid rgba(0,0,0,0.1)' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E', border: '1px solid rgba(0,0,0,0.1)' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F', border: '1px solid rgba(0,0,0,0.1)' }} />
        </div>

        {/* Browser Tab */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '10px 10px 0 0',
            borderTop: '1px solid rgba(15, 23, 42, 0.08)',
            borderLeft: '1px solid rgba(15, 23, 42, 0.08)',
            borderRight: '1px solid rgba(15, 23, 42, 0.08)',
            height: 32,
            boxSizing: 'border-box',
          }}
        >
          <Img
            src={staticFile('branding/sunburst-icon-amber.svg')}
            style={{ width: 14, height: 14 }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#0F172A',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {tabTitle}
          </span>
          <span style={{ fontSize: 11, color: '#94A3B8', marginLeft: 4 }}>✕</span>
        </div>

        {/* Plus new tab icon */}
        <div style={{ color: '#94A3B8', fontSize: 16, cursor: 'pointer', userSelect: 'none' }}>+</div>
      </div>

      {/* URL Address Bar & Navigation Toolbar */}
      <div
        style={{
          height: 48,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          boxSizing: 'border-box',
          gap: 16,
        }}
      >
        {/* Navigation Arrows */}
        <div style={{ display: 'flex', gap: 12, color: '#94A3B8', fontSize: 14, alignItems: 'center' }}>
          <span style={{ opacity: 0.5 }}>←</span>
          <span style={{ opacity: 0.5 }}>→</span>
          <span style={{ fontSize: 12, color: '#64748B' }}>↻</span>
        </div>

        {/* Address Pill */}
        <div
          style={{
            flex: 1,
            maxWidth: 580,
            height: 30,
            backgroundColor: '#F8FAFC',
            borderRadius: 8,
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 8,
          }}
        >
          {/* SSL Lock */}
          <span style={{ color: '#10B981', fontSize: 11 }}>🔒</span>
          <span
            style={{
              fontSize: 12,
              fontFamily: 'JetBrains Mono, monospace',
              color: '#334155',
              letterSpacing: '-0.02em',
            }}
          >
            {urlText}
          </span>
        </div>

        {/* Admin Telemetry Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              backgroundColor: '#0F172A',
              borderRadius: 6,
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 800,
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.04em',
            }}
          >
            <span>ADMIN: DANI R.</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 9px',
              backgroundColor: connectionStatus === 'online' ? '#ECFDF5' : '#FFFBEB',
              border: `1px solid ${connectionStatus === 'online' ? '#A7F3D0' : '#FDE68A'}`,
              borderRadius: 6,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: connectionStatus === 'online' ? '#10B981' : '#F59E0B',
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: connectionStatus === 'online' ? '#047857' : '#B45309',
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.05em',
              }}
            >
              {connectionStatus === 'online' ? 'LIVE TELEMETRY' : 'OFFLINE QUEUE'}
            </span>
          </div>
        </div>
      </div>

      {/* Browser Viewport Body */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#FAF7F2',
          overflow: 'hidden',
          ...contentStyle,
        }}
      >
        {imageSrc && (
          <Img
            src={imageSrc}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
};
