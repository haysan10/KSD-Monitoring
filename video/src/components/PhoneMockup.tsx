import React from 'react';
import { staticFile, Img } from 'remotion';
import { BRAND } from '../constants/brand';

interface PhoneMockupProps {
  imageSrc?: string;
  width?: number;
  height?: number;
  isOffline?: boolean;
  timeText?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  imageSrc,
  width = 385,
  height = 790,
  isOffline = false,
  timeText = '09:41',
  children,
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        borderRadius: 48,
        backgroundColor: '#0F172A', // Sleek dark chassis
        boxShadow:
          '0 36px 90px -18px rgba(15, 23, 42, 0.38), 0 16px 36px -12px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.15), 0 1px 3px 0 rgba(15, 23, 42, 0.08)',
        padding: 9,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        border: '3px solid #334155',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Inner Screen Bezel */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 38,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Status Bar & Dynamic Island */}
        <div
          style={{
            height: 36,
            width: '100%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            boxSizing: 'border-box',
            zIndex: 10,
            borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
          }}
        >
          {/* Time */}
          <span
            style={{
              fontFamily: BRAND.fonts.display,
              fontWeight: 700,
              fontSize: 12,
              color: BRAND.colors.textDark,
            }}
          >
            {timeText}
          </span>

          {/* Dynamic Island Pill */}
          <div
            style={{
              width: 80,
              height: 18,
              borderRadius: 10,
              backgroundColor: '#0F172A',
            }}
          />

          {/* Network Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {isOffline ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  backgroundColor: '#FEF3C7',
                  padding: '2px 6px',
                  borderRadius: 6,
                  border: '1px solid #F59E0B',
                }}
              >
                <span style={{ fontSize: 10, color: '#D97706', fontWeight: 800 }}>
                  ✕ OFFLINE
                </span>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor: '#ECFDF5',
                  padding: '2px 6px',
                  borderRadius: 6,
                  border: '1px solid #10B981',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                  }}
                />
                <span style={{ fontSize: 10, color: '#059669', fontWeight: 800 }}>
                  4G ONLINE
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Screen Content / Screenshot */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {imageSrc && (
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
          )}

          {/* Pure React Screen Content */}
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 4,
            borderRadius: 2,
            backgroundColor: '#CBD5E1',
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
};
