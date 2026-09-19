#!/usr/bin/env python3
import math
import os

OUTPUT_DIR = "assets/branding/supergraphics"
PB_OUTPUT_DIR = "pb_public/assets/branding/supergraphics"
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(PB_OUTPUT_DIR, exist_ok=True)

def generate_hero_supergraphic():
    """
    Generates a stunning, eye-catching, transparent, high-precision
    Rotary Kiln Overhaul Mission Control Supergraphic.
    ViewBox: 0 0 1600 1200, centered at cx=1050, cy=600 (dynamic right-offset for hero layout).
    """
    cx, cy = 1050, 600
    svg = []
    svg.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200" fill="none">')
    
    # Definitions: Gradients & Glow Filters
    svg.append('<defs>')
    svg.append('''
        <radialGradient id="hero-core-heat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
            <stop offset="12%" stop-color="#FDE68A" stop-opacity="0.75"/>
            <stop offset="28%" stop-color="#F59E0B" stop-opacity="0.55"/>
            <stop offset="50%" stop-color="#D97706" stop-opacity="0.30"/>
            <stop offset="75%" stop-color="#2563EB" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#0B0F19" stop-opacity="0"/>
        </radialGradient>
        
        <linearGradient id="ray-flame-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFBEB" stop-opacity="0.95"/>
            <stop offset="35%" stop-color="#FBBF24" stop-opacity="0.90"/>
            <stop offset="70%" stop-color="#F59E0B" stop-opacity="0.70"/>
            <stop offset="100%" stop-color="#EA580C" stop-opacity="0.35"/>
        </linearGradient>

        <linearGradient id="ray-cobalt-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#93C5FD" stop-opacity="0.85"/>
            <stop offset="50%" stop-color="#3B82F6" stop-opacity="0.65"/>
            <stop offset="100%" stop-color="#1D4ED8" stop-opacity="0.15"/>
        </linearGradient>
        
        <filter id="super-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur1"/>
            <feGaussianBlur stdDeviation="24" result="blur2"/>
            <feMerge>
                <feMergeNode in="blur2"/>
                <feMergeNode in="blur1"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>

        <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    ''')
    svg.append('</defs>')

    # Ambient Background Radiance (Soft heat bubble)
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="650" fill="url(#hero-core-heat)"/>')

    # Group with glow
    svg.append('<g filter="url(#soft-glow)">')

    # Concentric Calibration Rings (Rotary Kiln Cross Section)
    rings = [
        (90, 1.5, "#F59E0B", 0.6, "none"),
        (135, 1.0, "#3B82F6", 0.45, "4 4"),
        (220, 2.0, "#FBBF24", 0.75, "none"),
        (230, 0.8, "#F59E0B", 0.35, "none"),
        (350, 1.2, "#60A5FA", 0.4, "8 8"),
        (480, 1.8, "#F59E0B", 0.5, "16 8"),
        (560, 0.8, "#94A3B8", 0.25, "2 4"),
        (680, 1.5, "#3B82F6", 0.35, "20 12"),
    ]
    for r, w, col, op, dash in rings:
        dash_attr = f'stroke-dasharray="{dash}"' if dash != "none" else ""
        svg.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" stroke="{col}" stroke-width="{w}" stroke-opacity="{op}" {dash_attr} fill="none"/>')

    # Degree Axis Reticles (Crosshairs & 45 degree ticks)
    for deg in range(0, 360, 15):
        rad = math.radians(deg)
        cos_a = math.cos(rad)
        sin_a = math.sin(rad)
        r_start = 205
        r_end = 245 if deg % 45 == 0 else 230 if deg % 30 == 0 else 218
        stroke_c = "#FBBF24" if deg % 90 == 0 else "#60A5FA" if deg % 45 == 0 else "#F59E0B"
        stroke_w = 2.0 if deg % 90 == 0 else 1.2 if deg % 45 == 0 else 0.8
        op = 0.85 if deg % 90 == 0 else 0.6 if deg % 45 == 0 else 0.35
        x1 = cx + r_start * cos_a
        y1 = cy + r_start * sin_a
        x2 = cx + r_end * cos_a
        y2 = cy + r_end * sin_a
        svg.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{stroke_c}" stroke-width="{stroke_w}" stroke-opacity="{op}"/>')
        
        # Add telemetry labels at 0, 90, 180, 270
        if deg % 90 == 0:
            lbl_r = 265
            lx = cx + lbl_r * cos_a
            ly = cy + lbl_r * sin_a + 4
            svg.append(f'<text x="{lx:.1f}" y="{ly:.1f}" fill="#FBBF24" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" text-anchor="middle" opacity="0.85">{deg}°</text>')

    # 38 PRIMARY KILN REFRACTORY BRICK RAYS (Authentic Brand Geometry)
    num_rays = 38
    for i in range(num_rays):
        angle_deg = (i * 360.0) / num_rays
        angle_rad = math.radians(angle_deg)
        
        # Centerline unit vector
        ux = math.cos(angle_rad)
        uy = math.sin(angle_rad)
        # Perpendicular unit vector
        vx = -uy
        vy = ux
        
        # Ray dimensions: tapered needle/key brick
        r_inner = 240.0
        r_mid = 380.0
        r_outer = 530.0 if i % 2 == 0 else 470.0
        
        # Widths
        w_inner = 1.2
        w_mid = 7.5 if i % 2 == 0 else 5.2
        w_outer = 0.8
        
        # 4 control points for tapered brick polygon
        p1x = cx + r_inner * ux
        p1y = cy + r_inner * uy
        
        p2x = cx + r_mid * ux + (w_mid / 2) * vx
        p2y = cy + r_mid * uy + (w_mid / 2) * vy
        
        p3x = cx + r_outer * ux
        p3y = cy + r_outer * uy
        
        p4x = cx + r_mid * ux - (w_mid / 2) * vx
        p4y = cy + r_mid * uy - (w_mid / 2) * vy
        
        fill_grad = "url(#ray-flame-amber)" if i % 3 != 1 else "url(#ray-cobalt-glow)"
        opacity = 0.90 if i % 2 == 0 else 0.75
        
        svg.append(f'<polygon points="{p1x:.1f},{p1y:.1f} {p2x:.1f},{p2y:.1f} {p3x:.1f},{p3y:.1f} {p4x:.1f},{p4y:.1f}" fill="{fill_grad}" opacity="{opacity}"/>')

    # Secondary Extended Laser Whisker Rays (76 fine technical needles)
    for i in range(76):
        angle_deg = (i * 360.0) / 76
        angle_rad = math.radians(angle_deg)
        ux = math.cos(angle_rad)
        uy = math.sin(angle_rad)
        
        r_start = 545.0
        r_end = 690.0 if i % 4 == 0 else 630.0 if i % 2 == 0 else 590.0
        stroke_col = "#F59E0B" if i % 4 == 0 else "#3B82F6" if i % 2 == 0 else "#94A3B8"
        stroke_w = 1.6 if i % 4 == 0 else 1.0 if i % 2 == 0 else 0.6
        op = 0.70 if i % 4 == 0 else 0.45 if i % 2 == 0 else 0.20
        
        x1 = cx + r_start * ux
        y1 = cy + r_start * uy
        x2 = cx + r_end * ux
        y2 = cy + r_end * uy
        svg.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{stroke_col}" stroke-width="{stroke_w}" stroke-opacity="{op}"/>')
        
        # Outer satellite telemetry nodes
        if i % 8 == 0:
            nx = cx + (r_end + 12) * ux
            ny = cy + (r_end + 12) * uy
            svg.append(f'<circle cx="{nx:.1f}" cy="{ny:.1f}" r="3" fill="#FBBF24" opacity="0.85"/>')
            svg.append(f'<circle cx="{nx:.1f}" cy="{ny:.1f}" r="7" stroke="#F59E0B" stroke-width="0.8" opacity="0.45" fill="none"/>')

    # Orbital Arcs with High-Energy Accent Pulses
    svg.append(f'<path d="M {cx-480} {cy} A 480 480 0 0 1 {cx+480} {cy}" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" stroke-opacity="0.8" stroke-dasharray="80 320" fill="none" filter="url(#super-glow)"/>')
    svg.append(f'<path d="M {cx} {cy-560} A 560 560 0 0 1 {cx} {cy+560}" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.75" stroke-dasharray="120 400" fill="none" filter="url(#super-glow)"/>')
    
    # Core Central Kiln Monogram Hub
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="72" fill="#0B0F19" stroke="#F59E0B" stroke-width="2.5" stroke-opacity="0.85"/>')
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="64" fill="none" stroke="#FBBF24" stroke-width="1.0" stroke-dasharray="4 4" stroke-opacity="0.7"/>')
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="36" fill="url(#ray-flame-amber)" opacity="0.95" filter="url(#super-glow)"/>')
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="14" fill="#FFFFFF" opacity="0.95"/>')

    svg.append('</g>')
    svg.append('</svg>')
    return '\n'.join(svg)

def generate_divider_rays():
    """
    Generates an eye-catching, laser-sharp glowing horizontal divider beam.
    ViewBox: 0 0 1200 64.
    """
    svg = []
    svg.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 64" width="1200" height="64" fill="none">')
    svg.append('<defs>')
    svg.append('''
        <linearGradient id="beam-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0"/>
            <stop offset="25%" stop-color="#3B82F6" stop-opacity="0.35"/>
            <stop offset="45%" stop-color="#F59E0B" stop-opacity="0.85"/>
            <stop offset="50%" stop-color="#FEF3C7" stop-opacity="1.0"/>
            <stop offset="55%" stop-color="#F59E0B" stop-opacity="0.85"/>
            <stop offset="75%" stop-color="#3B82F6" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
        </linearGradient>
        <radialGradient id="beam-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
            <stop offset="30%" stop-color="#FDE68A" stop-opacity="0.8"/>
            <stop offset="60%" stop-color="#F59E0B" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#0B0F19" stop-opacity="0"/>
        </radialGradient>
        <filter id="beam-glow">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    ''')
    svg.append('</defs>')
    
    # Baseline horizontal laser beam
    svg.append('<line x1="0" y1="32" x2="1200" y2="32" stroke="url(#beam-grad)" stroke-width="1.8" filter="url(#beam-glow)"/>')
    svg.append('<line x1="200" y1="32" x2="1000" y2="32" stroke="#FEF3C7" stroke-width="0.8" opacity="0.8"/>')
    
    # Center ambient flare
    svg.append('<circle cx="600" cy="32" r="28" fill="url(#beam-pulse)"/>')

    # Radial needle rays arching across the center
    num_ticks = 48
    for i in range(num_ticks):
        x = 420 + i * (360.0 / num_ticks)
        dist_from_center = abs(x - 600)
        h = max(6, 28 - (dist_from_center / 180.0) * 22)
        op = max(0.15, 1.0 - (dist_from_center / 180.0) * 0.85)
        col = "#FBBF24" if dist_from_center < 60 else "#F59E0B" if dist_from_center < 120 else "#3B82F6"
        svg.append(f'<line x1="{x:.1f}" y1="{32 - h/2:.1f}" x2="{x:.1f}" y2="{32 + h/2:.1f}" stroke="{col}" stroke-width="1.5" stroke-opacity="{op:.2f}" stroke-linecap="round"/>')
        
    # Center Diamond Beacon
    svg.append('<polygon points="600,24 606,32 600,40 594,32" fill="#FFFFFF" opacity="0.95"/>')
    svg.append('<circle cx="600" cy="32" r="3" fill="#F59E0B"/>')

    svg.append('</svg>')
    return '\n'.join(svg)

def generate_card_corner_accent():
    """
    Generates a high-contrast, glowing radial corner watermark for cards.
    ViewBox: 0 0 240 240 (anchored at top-right: cx=240, cy=0).
    """
    cx, cy = 240, 0
    svg = []
    svg.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240" fill="none">')
    svg.append('<defs>')
    svg.append('''
        <radialGradient id="card-corner-glow" cx="100%" cy="0%" r="100%">
            <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.8"/>
            <stop offset="25%" stop-color="#FBBF24" stop-opacity="0.6"/>
            <stop offset="55%" stop-color="#F59E0B" stop-opacity="0.3"/>
            <stop offset="85%" stop-color="#2563EB" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#0B0F19" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="corner-ray-grad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFBEB" stop-opacity="0.9"/>
            <stop offset="40%" stop-color="#FBBF24" stop-opacity="0.75"/>
            <stop offset="80%" stop-color="#F59E0B" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#EA580C" stop-opacity="0"/>
        </linearGradient>
    ''')
    svg.append('</defs>')

    # Corner Heat Ambience
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="220" fill="url(#card-corner-glow)"/>')

    # Concentric Arcs (Quadrant)
    arcs = [
        (40, 2.0, "#FBBF24", 0.8, "none"),
        (75, 1.2, "#F59E0B", 0.5, "4 3"),
        (120, 1.8, "#FBBF24", 0.7, "none"),
        (165, 1.0, "#3B82F6", 0.4, "8 4"),
        (210, 1.5, "#F59E0B", 0.35, "none"),
    ]
    for r, w, col, op, dash in arcs:
        dash_attr = f'stroke-dasharray="{dash}"' if dash != "none" else ""
        # Path for top-right corner arc (angles 90 to 180 in standard SVG coords: from (cx, cy+r) to (cx-r, cy))
        svg.append(f'<path d="M {cx} {cy+r} A {r} {r} 0 0 1 {cx-r} {cy}" stroke="{col}" stroke-width="{w}" stroke-opacity="{op}" {dash_attr} fill="none"/>')

    # Radial Tapered Rays (Angles 90 to 180, i.e., heading bottom-left)
    num_rays = 19
    for i in range(num_rays):
        # 90 degrees (down) to 180 degrees (left)
        deg = 90 + (i * 90.0 / (num_rays - 1))
        rad = math.radians(deg)
        ux = math.cos(rad)
        uy = math.sin(rad)
        vx = -uy
        vy = ux
        
        r_inner = 35.0
        r_mid = 110.0
        r_outer = 195.0 if i % 2 == 0 else 160.0
        
        w_mid = 4.8 if i % 2 == 0 else 3.0
        
        p1x = cx + r_inner * ux
        p1y = cy + r_inner * uy
        p2x = cx + r_mid * ux + (w_mid / 2) * vx
        p2y = cy + r_mid * uy + (w_mid / 2) * vy
        p3x = cx + r_outer * ux
        p3y = cy + r_outer * uy
        p4x = cx + r_mid * ux - (w_mid / 2) * vx
        p4y = cy + r_mid * uy - (w_mid / 2) * vy
        
        op = 0.85 if i % 2 == 0 else 0.55
        svg.append(f'<polygon points="{p1x:.1f},{p1y:.1f} {p2x:.1f},{p2y:.1f} {p3x:.1f},{p3y:.1f} {p4x:.1f},{p4y:.1f}" fill="url(#corner-ray-grad)" opacity="{op}"/>')

    # Apex Core Node at top-right
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="22" fill="#F59E0B" opacity="0.6"/>')
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="12" fill="#FFFBEB" opacity="0.9"/>')

    svg.append('</svg>')
    return '\n'.join(svg)

def generate_empty_state_graphic():
    """
    Generates a technical, mission-control wireframe of the kiln overhaul radar ring
    for empty states. Replaces the generic curly 'r'.
    ViewBox: 0 0 280 280, centered at (140, 140).
    """
    cx, cy = 140, 140
    svg = []
    svg.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280" width="280" height="280" fill="none">')
    svg.append('<defs>')
    svg.append('''
        <radialGradient id="es-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FBBF24" stop-opacity="0.35"/>
            <stop offset="50%" stop-color="#3B82F6" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#0B0F19" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="es-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FBBF24"/>
            <stop offset="100%" stop-color="#F59E0B"/>
        </linearGradient>
    ''')
    svg.append('</defs>')

    svg.append(f'<circle cx="{cx}" cy="{cy}" r="130" fill="url(#es-glow)"/>')

    # Concentric rings
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="110" stroke="#3B82F6" stroke-width="1.2" stroke-dasharray="6 6" stroke-opacity="0.4" fill="none"/>')
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="85" stroke="#F59E0B" stroke-width="1.8" stroke-opacity="0.65" fill="none"/>')
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="55" stroke="#94A3B8" stroke-width="1.0" stroke-opacity="0.3" fill="none"/>')
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="28" stroke="#FBBF24" stroke-width="1.5" stroke-opacity="0.8" fill="rgba(245,158,11,0.08)"/>')

    # Crosshairs
    svg.append(f'<line x1="{cx-120}" y1="{cy}" x2="{cx+120}" y2="{cy}" stroke="#F59E0B" stroke-width="1.2" stroke-opacity="0.45" stroke-dasharray="10 5"/>')
    svg.append(f'<line x1="{cx}" y1="{cy-120}" x2="{cx}" y2="{cy+120}" stroke="#F59E0B" stroke-width="1.2" stroke-opacity="0.45" stroke-dasharray="10 5"/>')

    # Radial Tapered Brick Rays (38 positions)
    num_rays = 38
    for i in range(num_rays):
        deg = i * 360.0 / num_rays
        rad = math.radians(deg)
        ux = math.cos(rad)
        uy = math.sin(rad)
        r1 = 57.0
        r2 = 82.0 if i % 2 == 0 else 72.0
        w = 2.0 if i % 2 == 0 else 1.2
        op = 0.8 if i % 2 == 0 else 0.45
        col = "#FBBF24" if i % 4 == 0 else "#F59E0B" if i % 2 == 0 else "#60A5FA"
        svg.append(f'<line x1="{cx+r1*ux:.1f}" y1="{cy+r1*uy:.1f}" x2="{cx+r2*ux:.1f}" y2="{cy+r2*uy:.1f}" stroke="{col}" stroke-width="{w}" stroke-opacity="{op}" stroke-linecap="round"/>')

    # Center Hub Icon
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="12" fill="#F59E0B" opacity="0.9"/>')
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="5" fill="#FFFFFF"/>')

    # Telemetry Badges
    svg.append(f'<rect x="{cx-38}" y="{cy+95}" width="76" height="18" rx="4" fill="#111827" stroke="#F59E0B" stroke-width="1" stroke-opacity="0.6"/>')
    svg.append(f'<text x="{cx}" y="{cy+107}" fill="#FBBF24" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" text-anchor="middle" letter-spacing="0.1em">KILN RADAR</text>')

    svg.append('</svg>')
    return '\n'.join(svg)

def generate_mobile_cover_supergraphic():
    """
    Generates a seamless, transparent mobile drawer cover supergraphic.
    ViewBox: 0 0 420 220, centered at (210, 0) radiating downward.
    """
    cx, cy = 210, 0
    svg = []
    svg.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 220" width="420" height="220" fill="none">')
    svg.append('<defs>')
    svg.append('''
        <radialGradient id="mob-glow" cx="50%" cy="0%" r="85%">
            <stop offset="0%" stop-color="#FBBF24" stop-opacity="0.5"/>
            <stop offset="35%" stop-color="#F59E0B" stop-opacity="0.25"/>
            <stop offset="70%" stop-color="#2563EB" stop-opacity="0.10"/>
            <stop offset="100%" stop-color="#0B0F19" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="mob-ray-grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#FFFBEB" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#FBBF24" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.1"/>
        </linearGradient>
    ''')
    svg.append('</defs>')

    svg.append(f'<rect width="420" height="220" fill="url(#mob-glow)"/>')

    # Arcs radiating downward (angles 0 to 180)
    for r, w, col, op, dash in [(50, 1.8, "#FBBF24", 0.7, "none"), (90, 1.2, "#3B82F6", 0.45, "6 4"), (140, 1.8, "#F59E0B", 0.6, "none"), (190, 1.0, "#94A3B8", 0.3, "4 4")]:
        dash_attr = f'stroke-dasharray="{dash}"' if dash != "none" else ""
        svg.append(f'<path d="M {cx-r} {cy} A {r} {r} 0 0 0 {cx+r} {cy}" stroke="{col}" stroke-width="{w}" stroke-opacity="{op}" {dash_attr} fill="none"/>')

    # Radial rays pointing down (angles 15 to 165 degrees)
    for i in range(25):
        deg = 15 + i * (150.0 / 24)
        rad = math.radians(deg)
        ux = math.cos(rad)
        uy = math.sin(rad)
        vx = -uy
        vy = ux
        
        r1 = 50.0
        r_mid = 110.0
        r2 = 185.0 if i % 2 == 0 else 150.0
        w_mid = 4.0 if i % 2 == 0 else 2.2
        
        p1x = cx + r1 * ux
        p1y = cy + r1 * uy
        p2x = cx + r_mid * ux + (w_mid/2) * vx
        p2y = cy + r_mid * uy + (w_mid/2) * vy
        p3x = cx + r2 * ux
        p3y = cy + r2 * uy
        p4x = cx + r_mid * ux - (w_mid/2) * vx
        p4y = cy + r_mid * uy - (w_mid/2) * vy
        
        op = 0.8 if i % 2 == 0 else 0.5
        svg.append(f'<polygon points="{p1x:.1f},{p1y:.1f} {p2x:.1f},{p2y:.1f} {p3x:.1f},{p3y:.1f} {p4x:.1f},{p4y:.1f}" fill="url(#mob-ray-grad)" opacity="{op}"/>')

    # Core Hub at (210, 0)
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="35" fill="#0B0F19" stroke="#F59E0B" stroke-width="2"/>')
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="18" fill="#FBBF24" opacity="0.9"/>')
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="8" fill="#FFFFFF"/>')

    svg.append('</svg>')
    return '\n'.join(svg)

# Write all SVGs
files = {
    "hero-supergraphic.svg": generate_hero_supergraphic(),
    "divider-rays.svg": generate_divider_rays(),
    "card-corner-accent.svg": generate_card_corner_accent(),
    "empty-state-graphic.svg": generate_empty_state_graphic(),
    "mobile-cover-supergraphic.svg": generate_mobile_cover_supergraphic(),
}

for name, content in files.items():
    p1 = os.path.join(OUTPUT_DIR, name)
    p2 = os.path.join(PB_OUTPUT_DIR, name)
    with open(p1, "w", encoding="utf-8") as f:
        f.write(content)
    with open(p2, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated: {p1} and {p2} ({len(content)} bytes)")
