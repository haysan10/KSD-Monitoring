import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CINEMATIC_BRAND } from '../../constants/cinematicBrand';

interface CyberGridFloorProps {
  color?: string;
  speed?: number;
  opacity?: number;
  horizonColor?: string;
}

export const CyberGridFloor: React.FC<CyberGridFloorProps> = ({
  color = CINEMATIC_BRAND.colors.amberCore,
  speed = 1.0,
  opacity = 0.25,
  horizonColor = CINEMATIC_BRAND.colors.flameOrange,
}) => {
  const frame = useCurrentFrame();
  const offsetY = (frame * speed * 2) % 60;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Horizon Glow Line */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: horizonColor,
          boxShadow: `0 0 40px 6px ${horizonColor}, 0 0 100px 20px ${color}`,
          opacity: opacity * 1.5,
        }}
      />

      {/* 3D Perspective Grid Plane */}
      <div
        style={{
          position: 'absolute',
          bottom: '-25%',
          left: '-50%',
          width: '200%',
          height: '85%',
          perspective: 600,
          perspectiveOrigin: '50% 0%',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: 'rotateX(72deg)',
            transformOrigin: '50% 0%',
            backgroundImage: `
              linear-gradient(to right, ${color} 1px, transparent 1px),
              linear-gradient(to bottom, ${color} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: `0px ${offsetY}px`,
            opacity,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
          }}
        />
      </div>

      {/* Subtle Ambient Vignette & Fog */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 48%, transparent 30%, rgba(6, 9, 17, 0.85) 90%)',
        }}
      />
    </div>
  );
};
