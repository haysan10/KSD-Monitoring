import React from 'react';
import { staticFile, Img } from 'remotion';
import { BRAND } from '../constants/brand';

interface FloatingCardProps {
  imageSrc?: string;
  badgeText?: string;
  badgeColor?: string;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  imageSrc,
  badgeText,
  badgeColor = BRAND.colors.amber,
  width = 'auto',
  height = 'auto',
  children,
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        boxShadow: BRAND.shadows.float,
        border: '1.5px solid rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {badgeText && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            zIndex: 10,
            backgroundColor: badgeColor,
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 800,
            fontFamily: BRAND.fonts.display,
            padding: '4px 10px',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {badgeText}
        </div>
      )}

      {imageSrc && (
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )}

      {children}
    </div>
  );
};
