/**
 * Option 2: Cinematic Dark Industrial Design Tokens
 * Aesthetic: Dark Industrial Tech Noir / Command Deck
 */
export const CINEMATIC_BRAND = {
  colors: {
    // Canvas & Foundations
    bgVoid: '#060911',        // Ultra-deep obsidian abyss
    bgSurface: '#0B111E',     // Deep command console graphite
    bgCardGlass: 'rgba(15, 23, 42, 0.72)', // Holographic glassmorphism
    borderGlass: 'rgba(255, 255, 255, 0.12)',
    
    // Glowing Core Thermals & Energy
    flameOrange: '#FF5722',   // Molten kiln magma
    amberCore: '#F59E0B',     // Kinetic primary amber
    amberGlow: 'rgba(245, 158, 11, 0.45)',
    
    // High-Tech Cyber Telemetry
    cyberCyan: '#06B6D4',     // Laser coordinate cyan
    cyberBlue: '#3B82F6',     // Electric cobalt
    cyanGlow: 'rgba(6, 182, 212, 0.5)',
    
    // Verification & Pass
    emeraldLaser: '#10B981',  // Optical inspection green
    emeraldGlow: 'rgba(16, 185, 129, 0.45)',
    
    // Alarms & Errors
    crimsonAlert: '#EF4444',  // Critical failure red
    crimsonGlow: 'rgba(239, 68, 68, 0.45)',
    
    // Typography
    textHero: '#FFFFFF',
    textBody: '#E2E8F0',
    textMuted: '#94A3B8',
    textDim: '#64748B',
  },

  fonts: {
    display: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  springs: {
    // Ultra-snappy punch for high-speed industrial motion
    punchy: { damping: 14, stiffness: 280, mass: 0.6 },
    // Smooth cinematic camera dolly & crane
    cinematicDolly: { damping: 28, stiffness: 140, mass: 1.2 },
    // Whip transitions & elastic snaps
    hyperWhip: { damping: 18, stiffness: 220, mass: 0.7 },
    // Subtle breathing pulse
    gentlePulse: { damping: 20, stiffness: 80, mass: 1.0 },
  },

  shadows: {
    hologramAmber: '0 0 35px rgba(245, 158, 11, 0.35), 0 20px 50px rgba(0, 0, 0, 0.6)',
    hologramCyan: '0 0 35px rgba(6, 182, 212, 0.35), 0 20px 50px rgba(0, 0, 0, 0.6)',
    hologramEmerald: '0 0 35px rgba(16, 185, 129, 0.35), 0 20px 50px rgba(0, 0, 0, 0.6)',
    cardDeep: '0 25px 60px rgba(0, 0, 0, 0.7), 0 2px 10px rgba(0, 0, 0, 0.4)',
  },
};
