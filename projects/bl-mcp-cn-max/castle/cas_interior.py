# -*- coding: utf-8 -*-
"""Interiors: great hall, upper chamber, spiral-tower rooms, chapel."""
import bpy, bmesh, math
from mathutils import Vector, Euler
from cas_lib import (H, mat, Batch, box, bx, cyl, sph, dome, ring, leaf,
                     ribbon_v, star, RNG, TAU, D)
import cas_castle as C

PZ = C.PZ
KZ = C.KZ
KX, KY, KW, KD = C.KX, C.KY, C.KW, C.KD
HALL_Z = KZ + 0.09          # hall floor top
F2_Z = KZ + C.K_H1 + 0.28   # second floor top
F3_Z = F2_Z + C.K_H2 + 0.26


def im():
    return dict(
        table=mat('Furn_Wood', '#b58a5c', 0.62, bmp='paper'),
        table_d=mat('Furn_WoodDark', '#8b623d', 0.66, bmp='paper'),
        chair=mat('Furn_Chair', '#a87a4f', 0.68),
        rug=mat('Rug_Red', '#a94b46', 0.92),
        rug_b=mat('Rug_Blue', '#4c6389', 0.92),
        rug_gold=mat('Rug_Gold', '#d9ad63', 0.9),
        plate=mat('Pewter', '#cfd2cf', 0.34, metal=0.6),
        linen=mat('Linen', '#f4ead6', 0.88),
        bed=mat('Bed_Spread', '#c1665f', 0.88),
        pillow=mat('Pillow', '#f7efdd', 0.9),
        book=mat('Book_Leather', '#7d4b3c', 0.7),
        paper=mat('Paper', '#f2e7cf', 0.9),
        ink=mat('Ink', '#2b2b33', 0.5),
        iron=mat('Iron2', '#4f545f', 0.4, metal=0.75),
        fire=mat('Fire2', '#ff9346', 0.4, emit='#ff7c2e', estr=7.0),
        candle=mat('Candle2', '#ffe7b4', 0.55, emit='#ffd08a', estr=4.5),
        soot=mat('Soot', '#3b3230', 0.95),
        gold=mat('Gold_Trim', '#dfb268', 0.32, metal=0.8),
        water=mat('Water2', '#a4c8da', 0.14, alpha=0.8, emit='#cfe6ef', estr=0.1),
        hay=mat('Hay2', '#d9b97a', 0.92),
        cloth_g=mat('Drape_Green', '#5c7f60', 0.85),
        cloth_r=mat('Drape_Red', '#a34b47', 0.85),
        cloth_b=mat('Drape_Blue', '#4c608c', 0.85),
        glass_warm=mat('Lamp_Glow', '#ffdca6', 0.3, emit='#ffc57a', estr=3.0),
        fur=mat('Fur', '#c9b197', 0.9),
        dog=mat('Dog_Fur', '#b98a5e', 0.86),
        cat=mat('Cat_Fur', '#8d7a6c', 0.86),
    )


def candle(b, x, y, z, h=0.28, M=None, s=1.0):
    cyl(b, (x, y, z), 0.028 * s, 0.026 * s, h, M['candle'], seg=8)
    sph(b, (x, y, z + h + 0.02), 0.035 * s, M['fire'], u=7, v=5, scale=(1, 1, 1.7))


def candelabra(b, x, y, z, M, h=0.55, arms=3):
    cyl(b, (x, y, z), 0.09, 0.06, 0.05, M['iron'], seg=10)
    cyl(b, (x, y, z + 0.05), 0.022, 0.018, h, M['iron'], seg=6)
    for i in range(arms):
        a = TAU * i / arms
        ax, ay = x + 0.14 * math.cos(a), y + 0.14 * math.sin(a)
        bx(b, (x + 0.07 * math.cos(a), y + 0.07 * math.sin(a), z + h * 0.72),
           (0.14, 0.02, 0.02), M['iron'], rot=(0, 0, math.degrees(a)))
        candle(b, ax, ay, z + h * 0.78, 0.16, M, 0.85)


def goblet(b, x, y, z, M, s=1.0):
    cyl(b, (x, y, z), 0.022 * s, 0.02 * s, 0.05 * s, M['plate'], seg=8)
    cyl(b, (x, y, z + 0.05 * s), 0.045 * s, 0.05 * s, 0.055 * s, M['plate'], seg=10)


def dish(b, x, y, z, M, r=0.12):
    cyl(b, (x, y, z), r * 0.7, r, 0.018, M['plate'], seg=12)


def tapestry(b, x, y, z, w, h, m, m2, axis='y'):
    """hanging cloth with a simple woven motif"""
    bm = b.bm
    nu, nv = 8, 10
    rows = []
    for i in range(nu + 1):
        t = i / nu
        row = []
        for j in range(nv + 1):
            u = j / nv
            px = x - w / 2 + w * t
            pz = z + h - h * u
            py = y + 0.035 * math.sin(u * 3.0 + 0.4) * (0.4 + 0.6 * math.sin(t * math.pi))
            row.append(bm.verts.new((px, py, pz)))
        rows.append(row)
    vs = [v for r in rows for v in r]
    for i in range(nu):
        for j in range(nv):
            bm.faces.new((rows[i][j], rows[i + 1][j], rows[i + 1][j + 1], rows[i][j + 1]))
    b.tag(vs, m, True)
    # motif: lozenges + border
    for k in range(3):
        zz = z + h * 0.30 + k * h * 0.22
        bx(b, (x, y - 0.04, zz), (w * 0.22, 0.02, w * 0.22), m2,
           rot=(0, 45, 0))
    bx(b, (x, y - 0.03, z + 0.05), (w * 0.96, 0.02, 0.05), m2)
    bx(b, (x, y - 0.03, z + h - 0.05), (w * 0.96, 0.02, 0.05), m2)
    # rod
    cyl(b, (x - w / 2 - 0.08, y - 0.01, z + h + 0.02), 0.035, 0.035, w + 0.16,
        mat('Iron2', '#4f545f', 0.4, metal=0.75), seg=6, rot=(0, 90, 0))


def build_hall(M, CM):
    b = Batch('Hall_Furniture', 'Interior')
    m = im()
    z = HALL_Z
    # ---- long table
    tx, ty = 0.0, 2.0
    tw, td = 3.3, 1.05
    box(b, (tx, ty, z + 0.70), (tw, td, 0.09), m['table'])
    for sx in (-1, 1):
        for sy in (-1, 1):
            box(b, (tx + sx * (tw / 2 - 0.22), ty + sy * (td / 2 - 0.16), z),
                (0.13, 0.13, 0.70), m['table_d'])
    box(b, (tx, ty, z + 0.62), (tw - 0.3, td - 0.28, 0.1), m['table_d'])
    # benches
    for sy in (-1, 1):
        box(b, (tx, ty + sy * 0.95, z + 0.44), (tw - 0.2, 0.34, 0.07), m['chair'])
        for k in range(3):
            box(b, (tx - tw / 2 + 0.4 + k * 1.2, ty + sy * 0.95, z), (0.1, 0.28, 0.44),
                m['chair'])
    # tableware
    for i in range(4):
        for sy in (-1, 1):
            px = tx - 1.15 + i * 0.78
            py = ty + sy * 0.32
            dish(b, px, py, z + 0.80, m, 0.13)
            goblet(b, px + 0.30, py + sy * 0.02, z + 0.80, m)
            if RNG.random() < 0.6:
                sph(b, (px, py, z + 0.83), 0.045, mat('Bread', '#cf9f63', 0.85),
                    u=8, v=6, scale=(1.4, 1, 0.7))
    for px in (-0.9, 0.0, 0.9):
        candelabra(b, px, ty, z + 0.79, m, h=0.52)
    # jug + fruit bowl
    cyl(b, (1.1, ty + 0.1, z + 0.79), 0.07, 0.09, 0.22, m['plate'], seg=10)
    cyl(b, (-1.15, ty - 0.1, z + 0.79), 0.18, 0.22, 0.08, m['plate'], seg=12)
    for k in range(5):
        a = TAU * k / 5
        sph(b, (-1.15 + 0.1 * math.cos(a), ty - 0.1 + 0.1 * math.sin(a), z + 0.88),
            0.055, mat('Fruit', '#c85a4e', 0.7), u=7, v=5)
    # ---- high seat at the north end
    hx, hy = 0.0, 4.05
    box(b, (hx, hy, z + 0.42), (0.95, 0.62, 0.08), m['table_d'])
    for sx in (-1, 1):
        box(b, (hx + sx * 0.3, hy, z), (0.1, 0.5, 0.42), m['table_d'])
    box(b, (hx, hy + 0.28, z), (0.95, 0.1, 1.75), m['table_d'])
    box(b, (hx, hy + 0.24, z + 1.75), (1.05, 0.1, 0.16), m['table_d'])
    bx(b, (hx, hy - 0.02, z + 0.52), (0.8, 0.5, 0.14), m['rug'])
    # steps up to the dais
    for k in range(2):
        box(b, (hx, hy - 0.55 - k * 0.32, z), (1.4 - k * 0.1, 0.34, 0.12 + k * 0.0),
            m['table_d'])
    # ---- fireplace on the north wall
    fx, fy = -1.85, KY + KD / 2 - 0.05
    box(b, (fx, fy, z), (2.0, 0.5, 2.0), CM['wall_l'])
    box(b, (fx, fy - 0.28, z + 0.05), (1.25, 0.12, 1.2), m['soot'])
    box(b, (fx, fy - 0.22, z + 0.02), (1.0, 0.3, 0.16), m['soot'])
    for k in range(5):
        cyl(b, (fx - 0.35 + k * 0.18, fy - 0.30, z + 0.14), 0.075, 0.07, 0.5,
            m['table_d'], seg=6, rot=(0, 90, 0))
    for k in range(7):
        a = RNG.uniform(0, TAU)
        sph(b, (fx + RNG.uniform(-0.3, 0.3), fy - 0.34, z + 0.28 + RNG.uniform(0, 0.2)),
            0.13, m['fire'], u=8, v=6, scale=(1, 0.7, 1.8))
    box(b, (fx, fy - 0.06, z + 2.0), (2.3, 0.62, 0.16), CM['wall_d'])
    box(b, (fx, fy - 0.06, z + 2.16), (1.5, 0.5, 0.55), CM['wall'])
    for k in range(3):
        candle(b, fx - 0.4 + k * 0.4, fy - 0.32, z + 2.16, 0.2, m)
    # fire irons
    for k in range(2):
        cyl(b, (fx + 0.9 + k * 0.1, fy - 0.35, z), 0.025, 0.02, 0.9, m['iron'], seg=5)
    # ---- tapestries
    tapestry(b, 1.95, KY + KD / 2 - 0.12, z + 1.1, 1.5, 2.05, CM['tapestry_r'],
             CM['gold'])
    tapestry(b, -2.65, KY + 0.9, z + 1.1, 1.3, 1.9, CM['tapestry_b'], CM['gold'])
    # shields + crossed swords over the arcade
    for k, sx in enumerate((-2.2, 2.2)):
        cyl(b, (sx, -0.36, z + 2.42), 0.34, 0.34, 0.07, CM['cloth_b' if k else 'cloth_r'],
            seg=16, rot=(90, 0, 0))
        sph(b, (sx, -0.42, z + 2.42), 0.075, CM['gold'], u=8, v=6)
        for s in (-1, 1):
            bx(b, (sx, -0.34, z + 2.42), (0.045, 0.045, 1.0), m['iron'],
               rot=(0, s * 38, 0))
    # ---- chandelier
    cxx, cyy, czz = 0.0, 2.0, z + 3.05
    cyl(b, (cxx, cyy, czz + 0.15), 0.02, 0.02, 0.55, m['iron'], seg=4)
    for rr in (0.72, 0.46):
        ring(b, (cxx, cyy, czz), rr + 0.04, rr - 0.04, 0.045, m['iron'], seg=20)
        for k in range(6):
            a = TAU * k / 6 + (0.3 if rr < 0.5 else 0)
            candle(b, cxx + rr * math.cos(a), cyy + rr * math.sin(a), czz + 0.05, 0.20, m, 0.9)
    for k in range(3):
        a = TAU * k / 3
        bx(b, (cxx + 0.3 * math.cos(a), cyy + 0.3 * math.sin(a), czz + 0.28),
           (0.5, 0.02, 0.02), m['iron'], rot=(0, 0, math.degrees(a)))
    # ---- runner rug
    bx(b, (0, 1.55, z + 0.012), (1.5, 4.4, 0.022), m['rug'])
    bx(b, (0, 1.55, z + 0.026), (1.2, 4.1, 0.012), m['rug_gold'])
    bx(b, (0, 1.55, z + 0.034), (1.04, 3.94, 0.012), m['rug'])
    # ---- stair up along the west wall
    for k in range(13):
        box(b, (-2.25, 3.85 - k * 0.30, z + k * 0.276), (0.82, 0.32, 0.09), CM['wall_l'])
    box(b, (-2.25, 3.5, z + 1.6), (0.06, 1.6, 0.06), m['iron'],
        rot=(0, 0, 0))
    # ---- clutter: chests, barrel, hound
    bx(b, (2.15, 3.7, z + 0.28), (0.72, 0.46, 0.56), m['table_d'])
    bx(b, (2.15, 3.7, z + 0.56), (0.74, 0.48, 0.06), m['iron'])
    cyl(b, (2.2, 0.5, z), 0.3, 0.32, 0.7, m['table'], seg=12)
    # hound by the fire
    dx, dy = -1.0, 3.55
    sph(b, (dx, dy, z + 0.26), 0.24, m['dog'], u=10, v=7, scale=(1.6, 0.85, 0.9))
    sph(b, (dx - 0.36, dy, z + 0.34), 0.15, m['dog'], u=10, v=7)
    sph(b, (dx - 0.50, dy, z + 0.30), 0.1, m['dog'], u=8, v=6, scale=(1.2, 0.9, 0.8))
    for sy in (-1, 1):
        sph(b, (dx - 0.28, dy + sy * 0.07, z + 0.47), 0.05, m['dog'], u=6, v=4)
    sph(b, (dx + 0.36, dy + 0.1, z + 0.32), 0.11, m['dog'], u=8, v=6, scale=(1.4, 0.8, 0.8))
    return b.build()


def build_upper(M, CM):
    b = Batch('Keep_UpperChamber', 'Interior')
    m = im()
    z = F2_Z
    # ---- four-poster bed
    bedx, bedy = -0.9, 3.35
    bx(b, (bedx, bedy, z + 0.24), (2.0, 1.45, 0.30), m['table_d'])
    bx(b, (bedx, bedy, z + 0.42), (1.88, 1.32, 0.18), m['linen'])
    bx(b, (bedx, bedy - 0.05, z + 0.52), (1.86, 1.2, 0.12), m['bed'])
    for sx in (-1, 1):
        for sy in (-1, 1):
            cyl(b, (bedx + sx * 0.92, bedy + sy * 0.64, z + 0.4), 0.055, 0.045, 1.5,
                m['table_d'], seg=6)
    # canopy
    bx(b, (bedx, bedy, z + 1.85), (2.1, 1.6, 0.1), m['cloth_r'])
    for sy in (-1, 1):
        ribbon_v(b, [(bedx - 0.98, bedy + sy * 0.72, z + 1.85),
                     (bedx - 0.95, bedy + sy * 0.78, z + 1.3),
                     (bedx - 0.98, bedy + sy * 0.74, z + 0.8)], 1.35, m['cloth_r'])
    ribbon_v(b, [(bedx, bedy + 0.72, z + 1.85), (bedx, bedy + 0.8, z + 1.2),
                 (bedx, bedy + 0.74, z + 0.62)], 1.3, m['cloth_r'])
    # pillows
    for k in range(2):
        bx(b, (bedx - 0.45 + k * 0.9, bedy + 0.42, z + 0.55), (0.62, 0.3, 0.16), m['pillow'],
           rot=(0, 0, RNG.uniform(-8, 8)))
    # ---- desk + chair under the south opening
    dx, dy = 1.5, 0.55
    box(b, (dx, dy, z + 0.68), (1.15, 0.62, 0.08), m['table'])
    for sx in (-1, 1):
        for sy in (-1, 1):
            box(b, (dx + sx * 0.48, dy + sy * 0.22, z), (0.08, 0.08, 0.68), m['table_d'])
    bx(b, (dx - 0.1, dy + 0.02, z + 0.76), (0.42, 0.3, 0.03), m['paper'],
       rot=(0, 0, 6))
    bx(b, (dx - 0.1, dy + 0.02, z + 0.775), (0.4, 0.28, 0.012), m['paper'])
    cyl(b, (dx + 0.22, dy - 0.12, z + 0.76), 0.03, 0.03, 0.07, m['ink'], seg=8)
    bx(b, (dx + 0.16, dy - 0.12, z + 0.84), (0.02, 0.02, 0.34), m['pillow'],
       rot=(12, 0, 8))
    cyl(b, (dx - 0.5, dy - 0.18, z + 0.76), 0.05, 0.06, 0.14, m['plate'], seg=8)
    for k in range(3):
        sph(b, (dx - 0.5, dy - 0.18, z + 0.93 + k * 0.05), 0.028, m['fire'], u=6, v=4,
            scale=(1, 1, 1.5))
    # stool
    box(b, (dx - 0.02, dy - 0.75, z + 0.44), (0.42, 0.42, 0.06), m['chair'])
    for sx in (-1, 1):
        for sy in (-1, 1):
            box(b, (dx - 0.02 + sx * 0.16, dy - 0.75 + sy * 0.16, z), (0.05, 0.05, 0.44),
                m['table_d'])
    # ---- bookshelf against the east wall
    sx0, sy0 = 2.5, 2.6
    box(b, (sx0, sy0, z), (0.36, 1.6, 2.0), m['table_d'])
    for k in range(4):
        box(b, (sx0 - 0.02, sy0, z + 0.45 + k * 0.48), (0.38, 1.5, 0.05), m['table'])
        for i in range(7):
            ln = RNG.uniform(0.22, 0.3)
            bx(b, (sx0 - 0.06, sy0 - 0.66 + i * 0.19, z + 0.5 + k * 0.48 + ln / 2),
               (0.12, 0.14, ln), RNG.choice([m['book'], m['rug_b'], m['cloth_g'],
                                             m['paper']]))
    # ---- telescope aimed out of the south opening
    tx, ty, tz = 1.9, -0.1, z
    cyl(b, (tx, ty, tz), 0.32, 0.24, 0.06, m['iron'], seg=10)
    cyl(b, (tx, ty, tz + 0.06), 0.05, 0.04, 0.75, m['iron'], seg=6)
    bx(b, (tx, ty, tz + 0.85), (0.16, 0.16, 0.1), m['iron'])
    cyl(b, (tx, ty - 0.22, tz + 1.02), 0.07, 0.04, 0.95, m['table_d'], seg=10,
        rot=(-28, 0, 0))
    cyl(b, (tx, ty - 0.65, tz + 0.65), 0.09, 0.05, 0.22, m['gold'], seg=10, rot=(-28, 0, 0))
    # ---- star chart on the floor + chest
    bx(b, (0.35, 1.4, z + 0.012), (1.25, 1.25, 0.02), m['paper'], rot=(0, 0, 14))
    for k in range(9):
        a = RNG.uniform(0, TAU)
        r = RNG.uniform(0.05, 0.55)
        sph(b, (0.35 + r * math.cos(a), 1.4 + r * math.sin(a), z + 0.026), 0.018,
            m['ink'], u=5, v=4)
    bx(b, (2.3, 4.0, z + 0.3), (0.6, 0.42, 0.6), m['table_d'])
    bx(b, (2.3, 4.0, z + 0.6), (0.62, 0.44, 0.06), m['iron'])
    # rug
    bx(b, (0.6, 2.2, z + 0.014), (2.4, 2.0, 0.02), m['rug_b'])
    bx(b, (0.6, 2.2, z + 0.028), (2.0, 1.7, 0.012), m['rug_gold'])
    return b.build()


def build_tower_rooms(M, CM):
    b = Batch('Tower_Interiors', 'Interior')
    m = im()
    z = C.TZ
    # room 1 (z 4.5) -- study
    r1 = z + 4.58
    bx(b, (C.TX + 0.2, C.TY + 0.1, r1 + 0.01), (1.7, 1.7, 0.02), m['rug_b'], rot=(0, 0, 20))
    box(b, (C.TX + 0.45, C.TY + 0.55, r1), (0.9, 0.5, 0.62), m['table'])
    bx(b, (C.TX + 0.45, C.TY + 0.55, r1 + 0.66), (0.36, 0.26, 0.03), m['paper'])
    candle(b, C.TX + 0.16, C.TY + 0.44, r1 + 0.64, 0.2, m)
    # book stack
    for k in range(4):
        bx(b, (C.TX + 0.78, C.TY + 0.34, r1 + 0.65 + k * 0.055), (0.22, 0.16, 0.05),
           m['book'])
    # stool
    box(b, (C.TX + 0.3, C.TY - 0.05, r1 + 0.4), (0.36, 0.36, 0.05), m['chair'])
    # cot
    bx(b, (C.TX - 0.55, C.TY + 0.15, r1 + 0.22), (0.8, 1.6, 0.28), m['table_d'])
    bx(b, (C.TX - 0.55, C.TY + 0.15, r1 + 0.38), (0.74, 1.5, 0.12), m['linen'])
    bx(b, (C.TX - 0.55, C.TY + 0.15, r1 + 0.46), (0.7, 1.2, 0.08), m['rug'])
    # room 2 (z 7.6) -- astronomy
    r2 = z + 7.68
    cyl(b, (C.TX, C.TY + 0.1, r2), 0.34, 0.26, 0.06, m['iron'], seg=10)
    cyl(b, (C.TX, C.TY + 0.1, r2 + 0.06), 0.05, 0.04, 0.7, m['iron'], seg=6)
    cyl(b, (C.TX - 0.1, C.TY - 0.2, r2 + 0.9), 0.08, 0.045, 1.0, m['table_d'], seg=10,
        rot=(-40, 0, 0))
    bx(b, (C.TX + 0.5, C.TY - 0.1, r2 + 0.012), (1.1, 1.1, 0.02), m['paper'], rot=(0, 0, 8))
    # armillary ring
    ring(b, (C.TX - 0.55, C.TY + 0.7, r2 + 0.7), 0.3, 0.26, 0.04, m['gold'], seg=16)
    # room 3 (z 10.5) -- bed under the bell
    r3 = z + 10.58
    bx(b, (C.TX + 0.1, C.TY + 0.2, r3 + 0.2), (1.2, 1.6, 0.3), m['table_d'])
    bx(b, (C.TX + 0.1, C.TY + 0.2, r3 + 0.38), (1.1, 1.5, 0.14), m['linen'])
    bx(b, (C.TX + 0.1, C.TY + 0.2, r3 + 0.48), (1.05, 1.2, 0.1), m['rug'])
    candle(b, C.TX + 0.65, C.TY - 0.45, r3 + 0.3, 0.22, m)
    # a cat
    sph(b, (C.TX - 0.6, C.TY - 0.4, r3 + 0.1), 0.16, m['cat'], u=9, v=6,
        scale=(1.3, 0.9, 0.95))
    sph(b, (C.TX - 0.72, C.TY - 0.4, r3 + 0.22), 0.11, m['cat'], u=8, v=6)
    for sx in (-1, 1):
        sph(b, (C.TX - 0.72 + sx * 0.05, C.TY - 0.4, r3 + 0.32), 0.035, m['cat'], u=5, v=4)
    sph(b, (C.TX - 0.42, C.TY - 0.34, r3 + 0.12), 0.06, m['cat'], u=7, v=5,
        scale=(2.2, 0.7, 0.7))
    return b.build()


def build_chapel_inside(M, CM):
    b = Batch('Chapel_Interior', 'Interior')
    m = im()
    z = C.CZ + 0.02
    # pews
    for i in range(4):
        y = C.CY - 1.1 + i * 0.75
        box(b, (C.CX + 0.8, y, z + 0.42), (1.6, 0.24, 0.07), m['table'])
        box(b, (C.CX + 0.8, y + 0.18, z + 0.42), (1.6, 0.08, 0.55), m['chair'])
        for sx in (-1, 1):
            box(b, (C.CX + 0.8 + sx * 0.72, y, z), (0.08, 0.22, 0.42), m['table_d'])
    # aisle runner
    bx(b, (C.CX + 0.25, C.CY - 0.2, z + 0.014), (1.0, 4.0, 0.02), m['rug'])
    # altar
    ax = C.CX + 0.75
    ay = C.CY + 1.75
    bx(b, (ax, ay, z + 0.45), (1.3, 0.6, 0.9), CM['wall_l'])
    bx(b, (ax, ay, z + 0.92), (1.5, 0.7, 0.08), m['linen'])
    for k in range(3):
        candle(b, ax - 0.4 + k * 0.4, ay - 0.15, z + 0.98, 0.26, m)
    # tryptich
    bx(b, (ax, ay + 0.32, z + 1.5), (1.1, 0.06, 1.2), m['gold'])
    bx(b, (ax, ay + 0.28, z + 1.55), (0.9, 0.04, 1.0), m['rug_b'])
    sph(b, (ax, ay + 0.24, z + 1.9), 0.14, m['gold'], u=10, v=8, scale=(1, 1, 1.6))
    # stained glass panels (columns of colour)
    for sx in (-1, 1):
        for k in range(3):
            bx(b, (C.CX + sx * (C.CW / 2 - 0.12), C.CY - 0.8 + k * 1.6, z + 2.4),
               (0.06, 0.7, 1.5), RNG.choice([CM['cloth_b'], CM['cloth_r'], m['cloth_g'],
                                             CM['gold']]))
    return b.build()


def build_all(M, CM):
    out = [build_hall(M, CM), build_upper(M, CM), build_tower_rooms(M, CM),
           build_chapel_inside(M, CM)]
    return out
