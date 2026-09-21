import React from 'react';
import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion';

interface SupergraphicProps {
  type?: 'hero' | 'rays' | 'scatter' | 'mobile-cover';
  opacity?: number;
  rotationSpeed?: number;
  scale?: number;
  style?: React.CSSProperties;
}

/**
 * Supergraphic Backdrop Component using user's brand vector assets
 */
export const SupergraphicBackdrop: React.FC<SupergraphicProps> = ({
  type = 'hero',
  opacity = 0.08,
  rotationSpeed = 0.15,
  scale = 1,
  style,
}) => {
  const frame = useCurrentFrame();
  const rotation = frame * rotationSpeed;

  let assetName = 'hero-supergraphic.svg';
  if (type === 'rays') assetName = 'divider-rays.svg';
  if (type === 'scatter') assetName = 'texture-scatter.svg';
  if (type === 'mobile-cover') assetName = 'mobile-cover-supergraphic.svg';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden',
        zIndex: 1,
        ...style,
      }}
    >
      <Img
        src={staticFile(`branding/supergraphics/${assetName}`)}
        style={{
          width: type === 'rays' ? '140%' : '100%',
          height: type === 'rays' ? '140%' : '100%',
          objectFit: 'contain',
          opacity,
          transform: type === 'rays' ? `rotate(${rotation}deg) scale(${scale})` : `scale(${scale})`,
          transition: 'opacity 0.2s ease',
        }}
      />
    </div>
  );
};

/**
 * Corner brackets using card-corner-accent.svg to frame UI cards
 */
export const CornerBrackets: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({
  size = 28,
  color = '#F59E0B',
  style,
}) => {
  return (
    <>
      <div style={{ position: 'absolute', top: 8, left: 8, width: size, height: size, zIndex: 15, ...style }}>
        <Img src={staticFile('branding/supergraphics/card-corner-accent.svg')} style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 8, right: 8, width: size, height: size, transform: 'rotate(180deg)', zIndex: 15, ...style }}>
        <Img src={staticFile('branding/supergraphics/card-corner-accent.svg')} style={{ width: '100%', height: '100%' }} />
      </div>
    </>
  );
};
