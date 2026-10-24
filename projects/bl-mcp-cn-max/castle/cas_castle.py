# -*- coding: utf-8 -*-
"""Castle shell: keep (doll-house open front), spiral tower cut-away, chapel,
curtain wall, gatehouse, courtyard props."""
import bpy, bmesh, math
from mathutils import Vector, Euler
from cas_lib import (H, mat, Batch, box, bx, cyl, sph, dome, ring, archway,
                     arcwall, quadstrip, ribbon_v, leaf, star, RNG, TAU, D)
from cas_island import PLAT_Z as PZ, RMAX, ground_h

WALL_R = 7.35
WALL_C = (0.0, 0.55)


def castle_mats():
    return dict(
        wall=mat('Castle_Stone', '#d6c5a8', 0.8, bmp='paper'),
        wall_l=mat('Castle_StoneLight', '#e2d3b8', 0.78, bmp='paper'),
        wall_d=mat('Castle_StoneDark', '#b2a189', 0.84, bmp='paper'),
        roof=mat('Roof_Terracotta', '#b2604c', 0.66, bmp='paper'),
        roof2=mat('Roof_Slate', '#6b70a0', 0.62),
        roof3=mat('Roof_Rose', '#b8747c', 0.66),
        wood=mat('Wood', '#b98a5d', 0.76, bmp='paper'),
        wood_d=mat('Wood_Dark', '#8d6440', 0.8, bmp='paper'),
        iron=mat('Iron', '#5c616d', 0.42, metal=0.7),
        gold=mat('Gold_Trim', '#dfb268', 0.32, metal=0.8),
        cloth_r=mat('Cloth_Red', '#b2504c', 0.78),
        cloth_b=mat('Cloth_Blue', '#5d7099', 0.78),
        cloth_c=mat('Cloth_Cream', '#f0e4cd', 0.8),
        glass=mat('Window_Glow', '#ffdca6', 0.3, emit='#ffc57a', estr=2.6),
        glass_cool=mat('Window_Blue', '#bcd7ea', 0.3, emit='#a8cbe6', estr=1.1),
        fire=mat('Fire', '#ff9a4d', 0.4, emit='#ff8438', estr=6.0),
        candle=mat('Candle', '#ffe6b0', 0.5, emit='#ffd28a', estr=4.0),
        stone_floor=mat('Floor_Stone', '#c3b49e', 0.82, bmp='paper'),
        stone_dark=mat('Floor_StoneDark', '#a9987f', 0.85),
        tapestry_r=mat('Tapestry_Red', '#a9494b', 0.85),
        tapestry_b=mat('Tapestry_Blue', '#4f6488', 0.85),
        skin=mat('Skin', '#f2d4b6', 0.68, sss=0.12),
        hair_gold=mat('Hair_Gold', '#e8c579', 0.72),
        hair_dark=mat('Hair_Dark', '#6a4c3c', 0.78),
        cloak_g=mat('Cloak_Green', '#5f8a68', 0.8),
        scarf=mat('Scarf_Red', '#c4514a', 0.75),
        armour=mat('Armour', '#b9bcc4', 0.36, metal=0.85),
        fox=mat('Fox_Fur', '#d98a52', 0.8),
        fox_w=mat('Fox_White', '#f6ece0', 0.8),
        white=mat('White', '#f7f1e6', 0.8),
    )


def ap(cx, cy, r, deg):
    a = D(deg)
    return cx + r * math.cos(a), cy + r * math.sin(a)


def cone_roof(b, c, r, h, m, seg=18, tiers=4):
    for k in range(tiers):
        t0, t1 = k / tiers, (k + 1) / tiers
        r0 = r * (1 - t0)
        r1 = r * (1 - t1)
        cyl(b, (c[0], c[1], c[2] + h * t0), r0 * 1.02, max(r1 * 0.98, 0.012),
            h / tiers * 1.06, m, seg=seg)
    sph(b, (c[0], c[1], c[2] + h * 1.02), 0.09, b_m_gold(), u=8, v=6)


_bgold = None


def b_m_gold():
    global _bgold
    if _bgold is None:
        _bgold = mat('Gold_Trim', '#dfb268', 0.32, metal=0.8)
    return _bgold


def crenel_arc(b, cx, cy, r, z, a0, a1, m, n=None, w=0.5, h=0.52, d=0.42):
    span = a1 - a0
    n = n or max(6, int(abs(span) / 5.2))
    for i in range(n):
        a = a0 + span * (i + 0.5) / n
        x, y = ap(cx, cy, r, a)
        bx(b, (x, y, z + h / 2), (w, d, h), m, rot=(0, 0, a + 90))


def crenel_line(b, p0, p1, z, m, n, w=0.44, h=0.5, d=0.34):
    a = math.degrees(math.atan2(p1[1] - p0[1], p1[0] - p0[0]))
    for i in range(n):
        t = (i + 0.5) / n
        x = p0[0] + (p1[0] - p0[0]) * t
        y = p0[1] + (p1[1] - p0[1]) * t
        bx(b, (x, y, z + h / 2), (w, d, h), m, rot=(0, 0, a))


def flag(b, x, y, z, h, w=0.95, hh=0.72, mc=None, mp=None):
    mc = mc or mat('Flag_Red', '#bd5a55', 0.75)
    mp = mp or mat('Wood_Dark', '#8d6440', 0.8)
    cyl(b, (x, y, z), 0.055, 0.04, h, mp, seg=6)
    sph(b, (x, y, z + h + 0.04), 0.075, b_m_gold(), u=8, v=6)
    bm = b.bm
    nu, nv = 6, 3
    rows = []
    for i in range(nu + 1):
        t = i / nu
        row = []
        for j in range(nv + 1):
            u = j / nv
            px = x + 0.05 + t * w
            pz = z + h - 0.10 - u * hh * (1 - 0.12 * t)
            py = y + 0.15 * math.sin(t * 2.6 + 0.4) * t
            row.append(bm.verts.new((px, py, pz)))
        rows.append(row)
    vs = [v for r in rows for v in r]
    for i in range(nu):
        for j in range(nv):
            bm.faces.new((rows[i][j], rows[i + 1][j], rows[i + 1][j + 1], rows[i][j + 1]))
    b.tag(vs, mc, True)


def torch(b, x, y, z, m_wall):
    cyl(b, (x, y, z), 0.06, 0.05, 0.42, mat('Wood_Dark', '#8d6440', 0.8), seg=6)
    cyl(b, (x, y, z + 0.42), 0.13, 0.16, 0.1, mat('Iron', '#5c616d', 0.42, metal=0.7), seg=8)
    sph(b, (x, y, z + 0.60), 0.13, mat('Fire', '#ff9a4d', 0.4, emit='#ff8438', estr=6.0),
        u=8, v=6, scale=(1, 1, 1.5))


# ---------------------------------------------------------------- terrace floor
def build_courtyard(M):
    b = Batch('Castle_Courtyard', 'Castle')
    floor = mat('Court_Stone', '#c8b9a2', 0.84, bmp='paper')
    cyl(b, (0, 0.55, PZ), WALL_R + 0.1, WALL_R + 0.1, 0.16, floor, seg=72)
    # radial flagstone pattern
    for k in range(40):
        a = TAU * k / 40
        r = RNG.uniform(1.6, WALL_R - 0.4)
        x, y = ap(0, 0.55, r, math.degrees(a))
        bx(b, (x, y, PZ + 0.165), (RNG.uniform(0.55, 0.9), RNG.uniform(0.4, 0.6), 0.02),
           M['stone_dark'], rot=(0, 0, math.degrees(a) + RNG.uniform(-8, 8)))
    # central ring motif
    ring(b, (0, 0.55, PZ + 0.17), 3.1, 2.85, 0.02, M['stone_dark'], seg=48)
    ring(b, (0, 0.55, PZ + 0.17), 1.5, 1.3, 0.02, M['stone_dark'], seg=36)
    return b.build()


# ------------------------------------------------------------------------ keep
KX, KY, KW, KD = 0.0, 2.1, 5.8, 4.9
KZ = PZ + 0.16
K_H1, K_H2 = 3.5, 3.2


def build_keep(M):
    b = Batch('Castle_Keep', 'Castle')
    z = KZ
    t = 0.44
    # ---- ground floor: three walls + open arcade to the south
    box(b, (KX, KY + KD / 2, z), (KW, t, K_H1), M['wall'])
    box(b, (KX + KW / 2, KY, z), (t, KD, K_H1), M['wall'])
    box(b, (KX - KW / 2, KY, z), (t, KD, K_H1), M['wall'])
    # plinth
    box(b, (KX, KY, z - 0.02), (KW + 0.5, KD + 0.5, 0.34), M['wall_d'])
    # arcade columns (south face)
    xs = [-KW / 2 + 0.28, -1.02, 1.02, KW / 2 - 0.28]
    for x in xs:
        box(b, (x, KY - KD / 2 + 0.1, z), (0.46, 0.5, K_H1 - 0.15), M['wall_l'])
        box(b, (x, KY - KD / 2 + 0.1, z + K_H1 - 0.34), (0.62, 0.66, 0.2), M['wall_d'])
    for i in range(3):
        x0, x1 = xs[i], xs[i + 1]
        cx = (x0 + x1) / 2
        w = (x1 - x0) - 0.46
        archway(b, (cx, KY - KD / 2 + 0.1, z + K_H1 - 2.55), w, 1.75, 0.52,
                M['wall_l'], thick=0.4, seg=9)
    # interior floor (warm wood planks over stone)
    box(b, (KX, KY, z + 0.02), (KW - 0.5, KD - 0.5, 0.06), M['wood'])
    # ---- first floor slab + balcony
    box(b, (KX, KY, z + K_H1), (KW + 0.36, KD + 0.36, 0.26), M['wall'])
    box(b, (KX, KY - KD / 2 - 0.42, z + K_H1), (KW + 0.36, 0.5, 0.16), M['wall_l'])
    # balcony balustrade
    for i in range(15):
        x = -KW / 2 + 0.2 + i * (KW - 0.4) / 14
        cyl(b, (x, KY - KD / 2 - 0.52, z + K_H1 + 0.16), 0.06, 0.05, 0.55, M['wall_l'], seg=6)
    box(b, (KX, KY - KD / 2 - 0.52, z + K_H1 + 0.70), (KW + 0.1, 0.16, 0.1), M['wall_l'])
    # ---- second floor walls (south partly open)
    z2 = z + K_H1 + 0.26
    box(b, (KX, KY + KD / 2, z2), (KW, t, K_H2), M['wall'])
    box(b, (KX + KW / 2, KY, z2), (t, KD, K_H2), M['wall'])
    box(b, (KX - KW / 2, KY, z2), (t, KD, K_H2), M['wall'])
    # south: left pier + two slender columns, rest open
    box(b, (KX - KW / 2 + 0.75, KY - KD / 2, z2), (1.5, t, K_H2), M['wall'])
    for x in (0.55, KW / 2 - 0.2):
        cyl(b, (x, KY - KD / 2 + 0.1, z2), 0.17, 0.14, K_H2 - 0.1, M['wall_l'], seg=10)
    box(b, (KX, KY, z2 + 0.02), (KW - 0.5, KD - 0.5, 0.05), M['wood'])
    # window band on north / east / west
    for i in range(3):
        x = -1.8 + i * 1.8
        box(b, (x, KY + KD / 2 - 0.02, z2 + 1.5), (0.66, 0.14, 1.25), M['glass'])
        archway(b, (x, KY + KD / 2 - 0.22, z2 + 1.42), 0.66, 1.15, 0.22, M['wall_l'],
                thick=0.18, seg=7)
    for sx in (-1, 1):
        for i in range(2):
            y = KY - 1.2 + i * 2.4
            box(b, (KX + sx * (KW / 2 + 0.01), y, z2 + 1.5), (0.14, 0.6, 1.2), M['glass'])
    # ---- roof terrace + parapet
    z3 = z2 + K_H2
    box(b, (KX, KY, z3), (KW + 0.36, KD + 0.36, 0.26), M['wall'])
    zc = z3 + 0.26
    crenel_line(b, (KX - KW / 2 - 0.1, KY + KD / 2 + 0.1),
                (KX + KW / 2 + 0.1, KY + KD / 2 + 0.1), zc, M['wall_l'], 9)
    crenel_line(b, (KX - KW / 2 - 0.1, KY - KD / 2 - 0.1),
                (KX + KW / 2 + 0.1, KY - KD / 2 - 0.1), zc, M['wall_l'], 9)
    crenel_line(b, (KX - KW / 2 - 0.1, KY - KD / 2), (KX - KW / 2 - 0.1, KY + KD / 2),
                zc, M['wall_l'], 7, w=0.34, d=0.44)
    crenel_line(b, (KX + KW / 2 + 0.1, KY - KD / 2), (KX + KW / 2 + 0.1, KY + KD / 2),
                zc, M['wall_l'], 7, w=0.34, d=0.44)
    # ---- corner turrets
    for sx in (-1, 1):
        for sy in (-1, 1):
            cx = KX + sx * (KW / 2 + 0.05)
            cy = KY + sy * (KD / 2 + 0.05)
            cyl(b, (cx, cy, z + 1.1), 0.62, 0.56, z3 - z + 0.9, M['wall'], seg=12)
            cyl(b, (cx, cy, z3 - 0.1), 0.7, 0.7, 0.16, M['wall_d'], seg=12)
            cone_roof(b, (cx, cy, z3 + 0.06), 0.66, 1.45, M['roof2'], seg=12, tiers=3)
    # ---- steep central turret at the back
    bx0, by0 = KX - 1.2, KY + 1.4
    cyl(b, (bx0, by0, z3 - 0.5), 0.95, 0.9, 5.2, M['wall'], seg=14)
    cone_roof(b, (bx0, by0, z3 + 4.65), 1.02, 2.9, M['roof'], seg=14, tiers=4)
    flag(b, bx0, by0, z3 + 7.8, 1.5, mc=mat('Flag_Blue', '#4f6488', 0.75))
    # door to the terrace
    archway(b, (KX + 1.4, KY + KD / 2 - 0.24, z3 + 0.26), 0.9, 1.5, 0.3, M['wall_l'],
            thick=0.2, seg=7)
    return b.build()


# ---------------------------------------------------------------- spiral tower
TX, TY, TR = -4.35, 3.35, 1.62
TZ = PZ + 0.16
T_H = 11.6


def build_tower(M):
    b = Batch('Castle_SpiralTower', 'Castle')
    # shell with a 100-degree cut facing the viewer (south)
    arcwall(b, (TX, TY, TZ), TR, 318, 582, T_H, 0.46, M['wall'], seg=54)
    # base batter
    cyl(b, (TX, TY, TZ - 0.05), TR + 0.22, TR + 0.12, 0.7, M['wall_d'], seg=24)
    # floor slabs (visible through the cut)
    for i, zz in enumerate((4.5, 7.6, 10.5)):
        cyl(b, (TX, TY, TZ + zz), TR - 0.16, TR - 0.16, 0.16, M['stone_floor'], seg=22)
    # central newel + spiral stair
    cyl(b, (TX, TY, TZ), 0.22, 0.20, T_H, M['wall_d'], seg=10)
    n = 74
    for i in range(n):
        zz = TZ + 0.35 + i * (T_H - 0.9) / n
        a = -100 + i * 340 / n
        tx, ty = ap(TX, TY, 0.86, a)
        s = bx(b, (tx, ty, zz), (1.28, 0.42, 0.11), M['stone_dark'],
               rot=(0, 0, a + 90))
    # stringer wall of the stair (low helix wall)
    for i in range(0, n, 2):
        zz = TZ + 0.35 + i * (T_H - 0.9) / n
        a = -100 + i * 340 / n
        tx, ty = ap(TX, TY, 1.36, a)
        bx(b, (tx, ty, zz + 0.32), (0.9, 0.10, 0.62), M['wall'], rot=(0, 0, a + 90))
    # windows on the closed side
    for i, (aa, zz) in enumerate(((20, 3.0), (70, 6.2), (140, 9.2), (200, 2.4), (240, 8.4))):
        x, y = ap(TX, TY, TR + 0.02, aa)
        box(b, (x, y, TZ + zz), (0.42, 0.42, 1.0), M['glass_cool'], rot=(0, 0, aa))
        box(b, (x, y, TZ + zz - 0.12), (0.62, 0.62, 0.12), M['wall_l'], rot=(0, 0, aa))
    # corbel ring + conical roof with a small gallery
    cyl(b, (TX, TY, TZ + T_H - 0.3), TR + 0.25, TR + 0.12, 0.34, M['wall_d'], seg=24)
    crenel_arc(b, TX, TY, TR + 0.02, TZ + T_H, 318, 582, M['wall_l'], n=16,
               w=0.36, h=0.42, d=0.3)
    cone_roof(b, (TX, TY, TZ + T_H + 0.34), TR + 0.12, 3.5, M['roof2'], seg=20, tiers=5)
    flag(b, TX, TY, TZ + T_H + 4.1, 1.9, mc=mat('Flag_Gold', '#d9a75c', 0.7))
    return b.build()


# -------------------------------------------------------------------- chapel
CX, CY, CW, CD = 4.65, 2.65, 3.5, 4.9
CZ = PZ + 0.16
CH = 4.1


def build_chapel(M):
    b = Batch('Castle_Chapel', 'Castle')
    # body
    box(b, (CX, CY, CZ), (CW, CD, CH), M['wall'])
    box(b, (CX, CY, CZ - 0.02), (CW + 0.4, CD + 0.4, 0.3), M['wall_d'])
    # buttresses on the flanks
    for sx in (-1, 1):
        for i in range(3):
            y = CY - CD / 2 + 0.9 + i * 1.55
            box(b, (CX + sx * (CW / 2 + 0.12), y, CZ), (0.34, 0.5, CH - 0.5), M['wall_l'])
            cone_roof(b, (CX + sx * (CW / 2 + 0.12), y, CZ + CH - 0.5), 0.3, 0.55, M['roof'],
                      seg=8, tiers=2)
    # gable roof (ridge along Y), steep
    bm = b.bm
    y0, y1 = CY - CD / 2 - 0.2, CY + CD / 2 + 0.2
    x0, x1 = CX - CW / 2 - 0.28, CX + CW / 2 + 0.28
    zt = CZ + CH
    zr = zt + 1.75
    v = [bm.verts.new(p) for p in ((x0, y0, zt), (x1, y0, zt), (x1, y1, zt), (x0, y1, zt),
                                   (CX, y0, zr), (CX, y1, zr))]
    faces = [(v[0], v[1], v[4]), (v[3], v[5], v[2]), (v[0], v[4], v[5], v[3]),
             (v[1], v[2], v[5], v[4]), (v[0], v[3], v[2], v[1])]
    for f in faces:
        bm.faces.new(f)
    b.tag(v, M['roof3'], False)
    # tile courses on both slopes
    for i in range(5):
        t = (i + 0.5) / 5
        zz = zt + (zr - zt) * t
        half = (CW / 2 + 0.28) * (1 - t)
        for sy in (-1, 1):
            bx(b, (CX, CY + sy * (CD / 2 + 0.2), zz), (half * 2, 0.06, 0.05),
               M['roof3'])
    # little ridge crest
    for i in range(7):
        yy = y0 + (y1 - y0) * (i + 0.5) / 7
        bx(b, (CX, yy, zr + 0.16), (0.09, 0.16, 0.34), M['roof3'])
    # facade: rose window + portal
    fy = CY - CD / 2 - 0.02
    ring(b, (CX, fy, CZ + 2.75), 0.92, 0.78, 0.1, M['wall_l'], seg=24)
    cyl(b, (CX, fy - 0.06, CZ + 2.75), 0.8, 0.8, 0.06, M['glass'], seg=24,
        rot=(90, 0, 0))
    for i in range(8):
        a = TAU * i / 8
        bx(b, (CX + 0.4 * math.cos(a), fy - 0.13, CZ + 2.75 + 0.4 * math.sin(a)),
           (0.05, 0.05, 0.8), M['wall_l'], rot=(0, 90 - math.degrees(a), 0))
    archway(b, (CX, fy - 0.05, CZ), 1.25, 2.45, 0.34, M['wall_l'], thick=0.28, seg=9)
    box(b, (CX, fy - 0.16, CZ), (1.15, 0.08, 2.1), M['wood_d'])
    box(b, (CX + 0.28, fy - 0.22, CZ + 0.02), (0.5, 0.06, 2.0), M['wood'])
    # interior hint: pews + altar glow seen through the doorway
    for i in range(3):
        box(b, (CX + 0.55, CY - 0.4 + i * 0.85, CZ + 0.02), (1.5, 0.22, 0.5), M['wood_d'])
    bx(b, (CX, CY + 1.4, CZ + 1.0), (1.3, 0.5, 0.9), M['wall_l'])
    sph(b, (CX, CY + 1.4, CZ + 1.55), 0.16, M['candle'], u=8, v=6, scale=(1, 1, 1.4))
    # bell tower at the rear-east corner
    btx, bty = CX + CW / 2 - 0.1, CY + CD / 2 - 0.15
    box(b, (btx, bty, CZ), (0.95, 0.95, CH + 2.2), M['wall'])
    for i in range(4):
        a = TAU * i / 4 + 0.78
        box(b, (btx + 0.34 * math.cos(a), bty + 0.34 * math.sin(a), CZ + CH + 1.4),
            (0.18, 0.18, 0.7), M['glass'], rot=(0, 0, math.degrees(a)))
    cone_roof(b, (btx, bty, CZ + CH + 2.2), 0.64, 1.7, M['roof2'], seg=8, tiers=3)
    flag(b, btx, bty, CZ + CH + 4.1, 1.0, w=0.6, hh=0.5,
         mc=mat('Flag_Cream', '#f0e4cd', 0.75))
    return b.build()


# --------------------------------------------------------------- curtain wall
def build_wall(M):
    b = Batch('Castle_CurtainWall', 'Castle')
    z = PZ + 0.16
    H = 3.45
    WC = (WALL_C[0], WALL_C[1], z)
    arcwall(b, WC, WALL_R, 281, 619, H, 0.58, M['wall'], seg=96)
    # inner walkway (parapet ring, lower)
    arcwall(b, WC, WALL_R - 0.85, 281, 619, H - 0.55, 0.3, M['wall_l'], seg=64)
    crenel_arc(b, WALL_C[0], WALL_C[1], WALL_R + 0.02, z + H, 283, 617, M['wall_l'],
               n=56, w=0.46, h=0.5, d=0.32)
    # base slope
    arcwall(b, WC, WALL_R + 0.26, 281, 619, 0.55, 0.34, M['wall_d'], seg=64)
    # mural towers
    towers = [312, 356, 44, 92, 136, 184, 228, 264]
    for aa in towers:
        x, y = ap(WALL_C[0], WALL_C[1], WALL_R, aa)
        cyl(b, (x, y, z - 0.05), 0.95, 0.9, 4.5, M['wall'], seg=14)
        cyl(b, (x, y, z + 4.35), 1.02, 1.02, 0.16, M['wall_d'], seg=14)
        crenel_arc(b, x, y, 0.9, z + 4.5, 0, 360, M['wall_l'], n=9, w=0.34, h=0.46, d=0.26)
        cone_roof(b, (x, y, z + 4.6), 0.94, 1.5, M['roof2'] if aa % 40 else M['roof'],
                  seg=12, tiers=3)
        # arrow slit
        box(b, (x, y, z + 1.6), (0.12, 0.22, 1.0), M['stone_dark'], rot=(0, 0, aa))
    return b.build()


def build_gatehouse(M):
    b = Batch('Castle_Gatehouse', 'Castle')
    z = PZ + 0.16
    # flanking drums
    for aa in (256, 284):
        x, y = ap(WALL_C[0], WALL_C[1], WALL_R, aa)
        cyl(b, (x, y, z - 0.05), 1.18, 1.12, 6.2, M['wall'], seg=18)
        cyl(b, (x, y, z + 6.15), 1.3, 1.3, 0.2, M['wall_d'], seg=18)
        crenel_arc(b, x, y, 1.2, z + 6.35, 0, 360, M['wall_l'], n=11, w=0.38, h=0.5, d=0.28)
        cone_roof(b, (x, y, z + 6.4), 1.2, 2.1, M['roof'], seg=14, tiers=4)
        flag(b, x, y, z + 8.9, 1.3, w=0.72, hh=0.56,
             mc=mat('Flag_Red', '#bd5a55', 0.75))
        # machicolation brackets
        for i in range(6):
            a2 = TAU * i / 6 + 0.3
            xxx, yyy = x + 1.02 * math.cos(a2), y + 1.02 * math.sin(a2)
            cyl(b, (xxx, yyy, z + 5.3), 0.1, 0.1, 0.75, M['wall_d'], seg=6)
    # gate block
    gy = WALL_C[1] - WALL_R + 0.1
    for sx in (-1, 1):
        box(b, (sx * 1.42, gy, z), (0.6, 1.12, 4.32), M['wall'])
    box(b, (0, gy, z + 3.18), (3.44, 1.12, 1.14), M['wall'])
    box(b, (0, gy, z - 0.02), (3.9, 1.34, 0.34), M['wall_d'])
    archway(b, (0, gy - 0.62, z), 2.05, 3.2, 0.5, M['wall_l'], thick=0.3, seg=11)
    for i in range(7):
        x = -0.9 + i * 0.3
        box(b, (x, gy - 0.18, z + 0.25), (0.08, 0.08, 2.45), M['iron'])
    for i in range(4):
        box(b, (0, gy - 0.18, z + 0.55 + i * 0.58), (1.9, 0.08, 0.07), M['iron'])
    # gate roof + crenels
    box(b, (0, gy, z + 4.3), (3.6, 1.4, 0.2), M['wall_l'])
    for i in range(5):
        bx(b, (-1.4 + i * 0.7, gy - 0.55, z + 4.74), (0.44, 0.3, 0.5), M['wall_l'])
    flag(b, 0, gy + 0.1, z + 4.5, 1.5, w=0.8, hh=0.6,
         mc=mat('Flag_Blue', '#4f6488', 0.75))
    # drawbridge
    bm = b.bm
    dy0, dy1 = gy - 1.3, gy - 3.5
    for i in range(9):
        yy = dy0 + (dy1 - dy0) * (i + 0.5) / 9
        zz = z + 0.02 - (yy - dy0) * 0.045
        bx(b, (0, yy, zz - 0.05), (2.5, 0.24, 0.09), M['wood'],
           rot=(math.degrees(math.atan(0.045)), 0, 0))

    # stone steps down to the meadow
    for k in range(3):
        box(b, (0, dy1 - 0.4 - k * 0.55, ground_h(0, dy1 - 0.4 - k * 0.55) + 0.02),
            (3.0 - k * 0.2, 0.6, 0.18), M['stone_dark'])
    return b.build()


# ------------------------------------------------------------------ props
def build_props(M):
    b = Batch('Castle_Courtyard_Props', 'Castle')
    # well / fountain
    wx, wy = -2.55, -4.45
    wz = PZ + 0.16
    cyl(b, (wx, wy, wz), 1.15, 1.1, 0.55, M['wall_d'], seg=20)
    cyl(b, (wx, wy, wz + 0.55), 1.2, 1.2, 0.12, M['wall_l'], seg=20)
    cyl(b, (wx, wy, wz + 0.4), 0.95, 0.95, 0.16,
        mat('Water', '#9fc4d8', 0.12, spec=0.6, alpha=0.8, emit='#cfe6ef', estr=0.1), seg=20)
    for sx in (-1, 1):
        box(b, (wx + sx * 0.95, wy, wz + 0.6), (0.16, 0.16, 1.5), M['wood_d'])
    box(b, (wx, wy, wz + 2.0), (2.1, 0.22, 0.16), M['wood_d'])
    box(b, (wx, wy, wz + 2.12), (2.3, 0.5, 0.12), M['wood'])
    # market stalls along the west wall
    for i in range(3):
        x = -5.9 + i * 0.1
        y = -2.6 + i * 1.5
        box(b, (x, y, wz), (1.5, 1.0, 0.8), M['wood'])
        box(b, (x, y, wz + 0.8), (1.7, 1.2, 0.08), M['cloth_r'] if i % 2 else M['cloth_b'])
        for sx in (-1, 1):
            cyl(b, (x + sx * 0.7, y, wz + 0.8), 0.05, 0.05, 1.3, M['wood_d'], seg=5)
        box(b, (x, y, wz + 2.05), (1.7, 1.24, 0.06), M['cloth_r'] if i % 2 else M['cloth_b'])
    # barrels + crates
    for (x, y) in ((-5.5, -5.6), (-5.1, -5.9), (5.6, -5.2), (3.9, -5.9), (5.2, -1.2)):
        cyl(b, (x, y, wz), 0.32, 0.34, 0.72, M['wood'], seg=12)
        cyl(b, (x, y, wz + 0.18), 0.35, 0.35, 0.06, M['wood_d'], seg=12)
        cyl(b, (x, y, wz + 0.48), 0.35, 0.35, 0.06, M['wood_d'], seg=12)
    for (x, y) in ((5.0, -5.7), (-4.9, -5.0), (6.0, -4.4)):
        bx(b, (x, y, wz + 0.28), (0.55, 0.55, 0.55), M['wood'],
           rot=(0, 0, RNG.uniform(0, 40)))
    # hay
    for (x, y) in ((3.2, -3.4), (3.55, -3.05)):
        sph(b, (x, y, wz + 0.3), 0.55, mat('Hay', '#d8b673', 0.9), u=10, v=7,
            scale=(1.2, 1.0, 0.62), amp=0.12, freq=3)
    # stable (open shed) on the east
    sx0, sy0 = 5.55, -2.9
    for (dx, dy) in ((-0.9, -1.1), (0.9, -1.1), (-0.9, 1.1), (0.9, 1.1)):
        cyl(b, (sx0 + dx, sy0 + dy, wz), 0.1, 0.09, 2.1, M['wood_d'], seg=7)
    box(b, (sx0, sy0, wz + 2.1), (2.3, 2.7, 0.14), M['wood'],
        rot=(0, 7, 0))
    for i in range(5):
        bx(b, (sx0 - 1.0 + i * 0.5, sy0 - 1.2, wz + 2.3), (0.2, 2.4, 0.1), M['cloth_c'],
           rot=(0, 7, 0))
    # fence bits
    for i in range(6):
        cyl(b, (2.0 + i * 0.55, -6.55, wz), 0.06, 0.05, 0.85, M['wood_d'], seg=5)
    return b.build()


def build_all(M, CM):
    floor = build_courtyard(CM)
    keep = build_keep(CM)
    tower = build_tower(CM)
    chapel = build_chapel(CM)
    wall = build_wall(CM)
    gate = build_gatehouse(CM)
    props = build_props(CM)
    return [floor, keep, tower, chapel, wall, gate, props]
