import React from 'react';
import { staticFile, Img } from 'remotion';
import { BRAND } from '../constants/brand';

interface BrowserMockupProps {
  imageSrc: string;
  width?: number;
  height?: number;
  urlText?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  imageSrc,
  width = 1100,
  height = 680,
  urlText = 'http://127.0.0.1:8090/index.html',
  children,
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        boxShadow: BRAND.shadows.float,
        border: '1px solid rgba(15, 23, 42, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Chrome Top Bar */}
      <div
        style={{
          height: 44,
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          gap: 16,
          boxSizing: 'border-box',
          zIndex: 10,
        }}
      >
        {/* Window Dots */}
        <div style={{ display: 'flex', gap: 7 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#10B981' }} />
        </div>

        {/* URL Pill */}
        <div
          style={{
            flex: 1,
            maxWidth: 420,
            height: 26,
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            border: '1px solid rgba(15, 23, 42, 0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            fontSize: 11,
            color: BRAND.colors.textMuted,
            fontFamily: BRAND.fonts.mono,
            gap: 6,
          }}
        >
          <span style={{ color: '#10B981', fontSize: 10 }}>🔒</span>
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {urlText}
          </span>
        </div>

        {/* Top Right App Badge */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: BRAND.colors.amberWarm,
              backgroundColor: '#FEF3C7',
              padding: '3px 8px',
              borderRadius: 6,
              fontFamily: BRAND.fonts.display,
            }}
          >
            TRUNOVA KSD
          </span>
        </div>
      </div>

      {/* Screen Area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
          }}
        />

        {children}
      </div>
    </div>
  );
};
