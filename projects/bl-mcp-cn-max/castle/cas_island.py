# -*- coding: utf-8 -*-
"""Floating island: rock underside, meadow, path, pond, waterfall, clouds, flora."""
import bpy, bmesh, math
from mathutils import Vector, Euler
from cas_lib import (H, mat, Batch, box, bx, cyl, sph, dome, ring, leaf,
                     quadstrip, ribbon_v, star, collection, RNG, TAU, D)

RMAX = 13.0
PLAT_Z = 0.62          # castle terrace height
TERR_R = 8.0           # terrace radius


def ground_h(x, y):
    d = math.hypot(x, y)
    base = (0.30 * math.sin(x * 0.42 + 1.1) * math.cos(y * 0.36 - 0.5)
            + 0.16 * math.sin((x * 0.9 + y * 0.7)) + 0.10 * math.cos(y * 0.9))
    k = min(1.0, max(0.0, (d - 8.4) / 2.6))
    edge = 0.12 * max(0.0, (d - 11.6) / 1.3)
    return base * k + edge


# ---------------------------------------------------------------- materials
def rock_gradient():
    m = bpy.data.materials.get('Rock_Gradient')
    if m:
        return m
    m = bpy.data.materials.new('Rock_Gradient')
    m.use_nodes = True
    nt = m.node_tree
    bsdf = [n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'][0]
    tc = nt.nodes.new('ShaderNodeTexCoord')
    sep = nt.nodes.new('ShaderNodeSeparateXYZ')
    mr = nt.nodes.new('ShaderNodeMapRange')
    mr.inputs['From Min'].default_value = -21.0
    mr.inputs['From Max'].default_value = 1.0
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    cr = ramp.color_ramp
    cr.elements[0].position = 0.0
    cr.elements[0].color = (*H('#8e7a67'), 1)
    cr.elements[1].position = 1.0
    cr.elements[1].color = (*H('#cdb79b'), 1)
    for pos, col in ((0.30, '#a68b70'), (0.58, '#bfa285'), (0.82, '#cdb290')):
        e = cr.elements.new(pos)
        e.color = (*H(col), 1)
    nt.links.new(tc.outputs['Object'], sep.inputs['Vector'])
    nt.links.new(sep.outputs['Z'], mr.inputs['Value'])
    nt.links.new(mr.outputs['Result'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], bsdf.inputs['Base Color'])
    # paper speckle bump
    nz = nt.nodes.new('ShaderNodeTexNoise')
    nz.inputs['Scale'].default_value = 9.0
    nz.inputs['Detail'].default_value = 8.0
    bump = nt.nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = 0.4
    nt.links.new(nz.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    bsdf.inputs['Roughness'].default_value = 0.9
    return m


def mats():
    _rk = rock_gradient()
    return dict(
        rock_grad=_rk,
        grass_a=mat('Grass_Light', '#b3c98f', 0.86, bmp='paper'),
        grass_b=mat('Grass_Warm', '#aac286', 0.88, bmp='paper'),
        grass_c=mat('Grass_Deep', '#9cb87e', 0.9, bmp='paper'),
        soil=mat('Soil', '#a98a6b', 0.9, bmp='paper'),
        rock_a=_rk,
        rock_b=_rk,
        rock_c=_rk,
        rock_d=_rk,
        stone=mat('Terrace_Stone', '#cbbda6', 0.78, bmp='paper'),
        stone_d=mat('Stone_Dark', '#ab9c85', 0.82, bmp='paper'),
        water=mat('Water', '#9fc4d8', 0.12, spec=0.6, alpha=0.72, emit='#cfe6ef', estr=0.12),
        foam=mat('Foam', '#f4f8f7', 0.4, alpha=0.88, emit='#ffffff', estr=0.25),
        cloud=mat('Cloud', '#fdf8f6', 0.98, alpha=0.62, sss=0.5, emit='#ffeae4', estr=0.16),
        bark=mat('Bark', '#a1795a', 0.85, bmp='paper'),
        leaf_a=mat('Leaf_Sun', '#9cc076', 0.8, bmp='paper'),
        leaf_b=mat('Leaf_Mid', '#7fae6c', 0.84, bmp='paper'),
        leaf_c=mat('Leaf_Deep', '#5f9163', 0.86, bmp='paper'),
        leaf_d=mat('Leaf_Rose', '#c9a06e', 0.85),
        petal_r=mat('Petal_Red', '#d9534a', 0.6, sss=0.25),
        petal_p=mat('Petal_Pink', '#e79aa8', 0.62, sss=0.3),
        petal_w=mat('Petal_Cream', '#f6ecd8', 0.6, sss=0.3),
        petal_y=mat('Petal_Gold', '#e8bf6a', 0.6, sss=0.25),
        petal_b=mat('Petal_Blue', '#9fb8db', 0.62, sss=0.25),
        glass=mat('Glass_Bell', '#dff0f2', 0.05, spec=0.6, alpha=0.22,
                  emit='#eaf6ff', estr=0.06),
        gold=mat('Gold', '#dfb268', 0.3, metal=0.85, spec=0.5),
    )


# -------------------------------------------------------------- island body
def _prof(t):
    if t < 0.28:
        return 1.0 - 0.09 * (t / 0.28)
    u = (t - 0.28) / 0.72
    return 0.91 * (1 - u) ** 1.45 + 0.025


def _zf(t):
    return -0.85 - 17.5 * (t ** 1.12)


def build_island(M):
    b = Batch('Island_Rock', 'Island')
    segs, layers = 64, 28
    R = RMAX
    rows = []
    for i in range(layers + 1):
        t = i / layers
        z = _zf(t)
        prof = _prof(t)
        row = []
        for j in range(segs):
            a = TAU * j / segs
            wob = (1.0 + 0.055 * math.sin(a * 4.0 + t * 2.6)
                   + 0.028 * math.sin(a * 9.0 - t * 3.4)
                   + 0.016 * math.sin(a * 17.0 + 0.7))
            rr = R * prof * wob
            zz = z + 0.24 * math.sin(a * 6.0 + t * 5.0) * (0.3 + t)
            row.append(b.bm.verts.new((rr * math.cos(a), rr * math.sin(a), zz)))
        rows.append(row)
    bms = b.bm
    tip = bms.verts.new((0.5, -0.35, _zf(1.0) - 2.4))
    for i in range(layers):
        for j in range(segs):
            j2 = (j + 1) % segs
            v0 = rows[i][j]
            f = bms.faces.new((v0, rows[i][j2], rows[i + 1][j2], rows[i + 1][j]))
            f.material_index = b._mi(M['rock_grad'])
            f.smooth = True
    for j in range(segs):
        j2 = (j + 1) % segs
        f = bms.faces.new((rows[-1][j], rows[-1][j2], tip))
        f.material_index = b._mi(M['rock_grad'])
        f.smooth = True

    # hanging spurs / stalactites
    for _ in range(30):
        a = RNG.uniform(0, TAU)
        t = RNG.uniform(0.20, 0.94)
        z = _zf(t)
        rr = R * _prof(t) * RNG.uniform(0.86, 0.97)
        x, y = rr * math.cos(a), rr * math.sin(a)
        ln = RNG.uniform(0.9, 4.6) * (0.45 + t)
        rad = ln * RNG.uniform(0.10, 0.20) + 0.08
        tilt = RNG.uniform(-26, 26)
        cyl(b, (x, y, z - ln * 0.5), rad, rad * 0.4, ln, M['rock_grad'], seg=7,
            rot=(tilt, tilt * 0.7, RNG.uniform(0, 360)))
        cyl(b, (x, y, z - ln * 1.35), rad * 0.5, 0.02, ln * 0.8, M['rock_grad'], seg=6,
            rot=(tilt * 1.3, tilt, 0))
    # boulders on the rim
    for _ in range(10):
        a = RNG.uniform(0, TAU)
        rr = RNG.uniform(9.4, 12.2)
        x, y = rr * math.cos(a), rr * math.sin(a)
        sz = RNG.uniform(0.35, 1.0)
        sph(b, (x, y, ground_h(x, y) + sz * 0.2), sz, M['rock_grad'],
            u=9, v=6, scale=(1, RNG.uniform(0.7, 1.2), RNG.uniform(0.5, 0.8)),
            amp=0.22, freq=2.0, seed=RNG.random() * 10)
    return b.build()


def build_meadow(M):
    b = Batch('Island_Meadow', 'Island')
    segs, rings = 96, 30
    bms = b.bm
    centre = bms.verts.new((0, 0, ground_h(0, 0)))
    rows = []
    for i in range(1, rings + 1):
        t = i / rings
        rr0 = RMAX * (t ** 0.95) * 0.985
        row = []
        for j in range(segs):
            a = TAU * j / segs
            wob = 1.0 + 0.035 * math.sin(a * 4.0) + 0.02 * math.sin(a * 9.0 + 1.3)
            rr = rr0 * wob
            x, y = rr * math.cos(a), rr * math.sin(a)
            z = ground_h(x, y)
            row.append(bms.verts.new((x, y, z)))
        rows.append(row)
    for j in range(segs):
        j2 = (j + 1) % segs
        f = bms.faces.new((centre, rows[0][j], rows[0][j2]))
        f.material_index = b._mi(M['grass_b'])
    for i in range(rings - 1):
        for j in range(segs):
            j2 = (j + 1) % segs
            f = bms.faces.new((rows[i][j], rows[i][j2], rows[i + 1][j2], rows[i + 1][j]))
            k = RNG.random()
            m = M['grass_a'] if k < 0.45 else (M['grass_b'] if k < 0.8 else M['grass_c'])
            f.material_index = b._mi(m)
            f.smooth = True
    # rim skirt (grass lip folding over the rock)
    low = []
    for j in range(segs):
        v = rows[-1][j]
        low.append(bms.verts.new((v.co.x * 0.998, v.co.y * 0.998, v.co.z - 0.95)))
    for j in range(segs):
        j2 = (j + 1) % segs
        f = bms.faces.new((rows[-1][j], low[j], low[j2], rows[-1][j2]))
        f.material_index = b._mi(M['soil'])
        f.smooth = True
    return b.build()


def build_terrace(M):
    """stone platform the castle sits on + curved steps"""
    b = Batch('Castle_Terrace', 'Castle')
    cyl(b, (0, 0.5, -0.6), TERR_R + 0.5, TERR_R + 0.2, PLAT_Z + 0.6, M['stone_d'], seg=64)
    cyl(b, (0, 0.5, PLAT_Z - 0.10), TERR_R + 0.05, TERR_R + 0.05, 0.10, M['stone'], seg=64)
    # flagstone ring pattern
    for i in range(34):
        a = TAU * i / 34
        rr = TERR_R - 0.55
        bx(b, (rr * math.cos(a), 0.5 + rr * math.sin(a), PLAT_Z + 0.005),
           (0.75, 0.42, 0.03), M['stone'],
           rot=(0, 0, math.degrees(a) + 90))
    # steps at the south side (front gate direction -Y)
    for k in range(4):
        w = 7.6 - k * 0.35
        box(b, (0, -TERR_R - 0.55 + k * 0.62, ground_h(0, -TERR_R) + 0.02),
            (w, 0.72, 0.16), M['stone_d'])
    return b.build()


# --------------------------------------------------------------- water works
def build_pond(M):
    b = Batch('Island_Pond', 'Island')
    cx, cy = -6.6, -6.4
    water = Batch('Island_PondWater', 'Island')
    ring(b, (cx, cy, ground_h(cx, cy) - 0.05), 2.05, 1.55, 0.12, M['stone'], seg=28)
    ring(b, (cx, cy, ground_h(cx, cy) - 0.14), 2.5, 2.0, 0.16, M['stone_d'], seg=28)
    cyl(water, (cx, cy, ground_h(cx, cy) - 0.18), 1.85, 1.85, 0.06, M['water'], seg=28)
    for i in range(9):
        a = TAU * i / 9 + 0.3
        rr = RNG.uniform(2.0, 2.4)
        s = RNG.uniform(0.2, 0.45)
        sph(b, (cx + rr * math.cos(a), cy + rr * math.sin(a),
                ground_h(cx, cy) + s * 0.15), s, M['rock_a'], u=8, v=6, amp=0.2, freq=2.5)
    ob = b.build()
    ob2 = water.build()
    # lily pads
    lb = Batch('Island_Lilies', 'Island')
    for i in range(7):
        a = RNG.uniform(0, TAU)
        rr = RNG.uniform(0.3, 1.5)
        cyl(lb, (cx + rr * math.cos(a), cy + rr * math.sin(a),
                 ground_h(cx, cy) - 0.135), 0.22, 0.2, 0.02, M['leaf_b'], seg=9)
    lb.build()
    return ob


def build_waterfall(M):
    """a fall pouring off the eastern rim and dissolving into mist"""
    b = Batch('Island_Waterfall', 'Island')
    x0, y0 = -8.9, 4.6
    z0 = ground_h(x0, y0) - 0.15
    pts, ws = [], []
    n = 16
    for i in range(n):
        t = i / (n - 1)
        pts.append((x0 - 3.1 * t ** 1.6, y0 + 0.2 * t, z0 - 15.5 * t ** 1.25))
        ws.append(1.5 + 1.9 * t ** 1.4)
    quadstrip(b, pts, ws, M['water'], up=(0, 1, 0))
    quadstrip(b, [(p[0] - 0.14, p[1] - 0.02, p[2]) for p in pts],
              [w * 0.55 for w in ws], M['foam'], up=(0, 1, 0))
    # mist puffs
    for i in range(14):
        t = RNG.uniform(0.25, 1.0)
        px = x0 - 3.1 * t ** 1.6 + RNG.uniform(-0.8, 0.8)
        py = y0 + RNG.uniform(-0.6, 0.6)
        pz = z0 - 15.5 * t ** 1.25 + RNG.uniform(-0.5, 0.5)
        s = RNG.uniform(0.5, 1.2) * (0.5 + t)
        sph(b, (px, py, pz), s, M['cloud'], u=10, v=7,
            scale=(1.2, 1.0, 0.7), amp=0.18, freq=2.0, seed=RNG.random() * 9)
    return b.build()


def build_cloudsea(M):
    b = Batch('Cloud_Sea', 'Env')
    for i in range(46):
        a = TAU * i / 46 + RNG.uniform(-0.05, 0.05)
        rr = RNG.uniform(30, 62)
        z = RNG.uniform(-26, -17)
        cx, cy = rr * math.cos(a), rr * math.sin(a) * 0.92
        for k in range(RNG.randint(3, 6)):
            sc_ = RNG.uniform(1.1, 2.6)
            sph(b, (cx + RNG.uniform(-3.4, 3.4), cy + RNG.uniform(-3.4, 3.4),
                    z + RNG.uniform(-0.5, 0.5)), sc_, M['cloud'], u=14, v=10,
                scale=(1.3, 1.05, 0.6), amp=0.10, freq=1.8, seed=RNG.random() * 11)
    return b.build()


# ------------------------------------------------------------------- flora
def tree(b, x, y, z, h=3.2, kind='round', m=None):
    M = m
    lean = RNG.uniform(-4, 4)
    cyl(b, (x, y, z), 0.16 * h / 3.2, 0.10 * h / 3.2, h * 0.62, M['bark'], seg=7,
        rot=(lean * 0.4, lean, 0))
    topx = x + math.sin(D(lean)) * h * 0.5
    topy = y
    topz = z + h * 0.60
    if kind == 'round':
        for k in range(RNG.randint(3, 4)):
            s = h * RNG.uniform(0.26, 0.34) * (1 - k * 0.12)
            sph(b, (topx + RNG.uniform(-0.35, 0.35) * h / 3,
                    topy + RNG.uniform(-0.35, 0.35) * h / 3,
                    topz + k * s * 0.55), s,
                [M['leaf_a'], M['leaf_b'], M['leaf_c']][k % 3], u=12, v=8,
                scale=(1.1, 1.05, 0.9), amp=0.10, freq=2.2, seed=RNG.random() * 7)
    elif kind == 'cypress':
        for k, (dz, rr, sq) in enumerate(((0.10, 0.150, 2.1), (0.42, 0.120, 2.4),
                                          (0.72, 0.070, 2.2))):
            sph(b, (topx + RNG.uniform(-0.06, 0.06), topy + RNG.uniform(-0.06, 0.06),
                    topz + h * dz), h * rr,
                [M['leaf_c'], M['leaf_b'], M['leaf_c']][k], u=10, v=8,
                scale=(0.92, 0.92, sq), amp=0.10, freq=3.0, seed=RNG.random() * 8)
    elif kind == 'baobab':
        cyl(b, (x, y, z), 0.34, 0.26, h * 0.55, M['bark'], seg=9)
        sph(b, (topx, topy, topz + h * 0.16), h * 0.42, M['leaf_b'], u=14, v=8,
            scale=(1.25, 1.2, 0.42), amp=0.08, freq=2.0)
        for k in range(4):
            a = TAU * k / 4 + 0.6
            sph(b, (topx + 0.5 * h * 0.4 * math.cos(a), topy + 0.5 * h * 0.4 * math.sin(a),
                    topz + h * 0.10), h * 0.22, M['leaf_c'], u=10, v=7,
                scale=(1.1, 1.1, 0.45), amp=0.1, freq=2.0)
    elif kind == 'poplar':
        sph(b, (topx, topy, topz + h * 0.30), h * 0.25, M['leaf_b'], u=14, v=10,
            scale=(0.65, 0.65, 1.55), amp=0.07, freq=2.4)


def build_flora(M):
    b = Batch('Flora_Trees', 'Island')
    spots = []
    # ring of trees around the meadow, kept clear of the gate path
    for i in range(26):
        a = RNG.uniform(0, TAU)
        rr = RNG.uniform(9.2, 12.0)
        x, y = rr * math.cos(a), rr * math.sin(a)
        if abs(x) < 2.6 and y < -9.0:
            continue
        if math.hypot(x - (-6.6), y - (-6.4)) < 3.2:
            continue
        if y < -5.4 and abs(x) < 8.0:
            continue
        spots.append((x, y))
    for (x, y) in spots:
        kind = RNG.choices(['round', 'cypress', 'poplar', 'baobab'], [0.62, 0.16, 0.18, 0.04])[0]
        tree(b, x, y, ground_h(x, y) - 0.05, h=RNG.uniform(2.4, 4.6), kind=kind, m=M)
    # two guardian cypresses flanking the stair
    for sx in (-1, 1):
        tree(b, sx * 6.9, -7.4, ground_h(sx * 6.9, -7.4) - 0.05, h=3.2, kind='cypress', m=M)
    b.build()

    # flowers
    f = Batch('Flora_Flowers', 'Island')
    cols = [M['petal_r'], M['petal_p'], M['petal_w'], M['petal_y'], M['petal_b']]
    for i in range(430):
        a = RNG.uniform(0, TAU)
        rr = RNG.uniform(8.4, 12.2)
        x, y = rr * math.cos(a), rr * math.sin(a)
        if abs(x) < 3.4 and y < -7.0:
            continue
        z = ground_h(x, y)
        cyl(f, (x, y, z - 0.02), 0.012, 0.012, RNG.uniform(0.16, 0.34), M['leaf_c'], seg=3)
        sph(f, (x, y, z + RNG.uniform(0.18, 0.34)), RNG.uniform(0.045, 0.085),
            RNG.choice(cols), u=7, v=5, scale=(1, 1, 0.65))
    # grass tufts
    for i in range(330):
        a = RNG.uniform(0, TAU)
        rr = RNG.uniform(8.3, 12.4)
        x, y = rr * math.cos(a), rr * math.sin(a)
        z = ground_h(x, y)
        for k in range(3):
            leaf(f, (x + RNG.uniform(-0.1, 0.1), y + RNG.uniform(-0.1, 0.1), z - 0.02), 0.085,
                 M['leaf_b'] if k % 2 else M['leaf_c'],
                 rot=(RNG.uniform(-24, 24), RNG.uniform(-24, 24), RNG.uniform(0, 360)), n=4)
    f.build()
    return f


def build_garden(M):
    """rose beds + the rose under its glass bell (Le Petit Prince homage)"""
    b = Batch('Garden_Roses', 'Island')
    st = Batch('Garden_Stones', 'Island')

    def rose(x, y, z, s=1.0, petal=None):
        petal = petal or M['petal_r']
        cyl(b, (x, y, z), 0.022 * s, 0.018 * s, 0.55 * s, M['leaf_c'], seg=5)
        for k in range(3):
            a = TAU * k / 3 + RNG.uniform(0, 1)
            leaf(b, (x, y, z + 0.18 * s + k * 0.09 * s), 0.10 * s, M['leaf_b'],
                 rot=(-58, 0, math.degrees(a)), n=4)
        cz = z + 0.55 * s
        for k in range(5):
            a = TAU * k / 5
            sph(b, (x + 0.045 * s * math.cos(a), y + 0.045 * s * math.sin(a), cz),
                0.062 * s, petal, u=7, v=5, scale=(1, 1, 0.8))
        sph(b, (x, y, cz + 0.02 * s), 0.05 * s, petal, u=7, v=5, scale=(1, 1, 1.1))

    # beds in front of the castle, symmetric
    for sx in (-1, 1):
        ring(st, (sx * 3.0, -6.6, ground_h(sx * 3.0, -6.6) - 0.02), 1.35, 1.15, 0.26,
             M['stone'], seg=18)
        for k in range(9):
            a = TAU * k / 9
            rose(sx * 3.0 + 0.8 * math.cos(a), -6.6 + 0.8 * math.sin(a),
                 ground_h(sx * 3.0, -6.6) + 0.22, s=RNG.uniform(0.9, 1.15),
                 petal=RNG.choice([M['petal_r'], M['petal_p'], M['petal_w']]))
    # the single rose, in a glass bell, on a small plinth
    gx, gy = 4.9, -8.4
    gz = ground_h(gx, gy)
    cyl(st, (gx, gy, gz), 0.34, 0.30, 0.30, M['stone'], seg=12)
    cyl(st, (gx, gy, gz + 0.30), 0.28, 0.26, 0.18, M['gold'], seg=12)
    rose(gx, gy, gz + 0.45, s=1.35, petal=M['petal_r'])
    glass = Batch('Garden_GlassBell', 'Island')
    dome(glass, (gx, gy, gz + 0.48), 0.52, M['glass'], seg=20, rings=7, squash=1.55)
    cyl(glass, (gx, gy, gz + 0.46), 0.53, 0.53, 0.03, M['glass'], seg=20)
    ob = glass.build()
    ob.visible_shadow = False
    # scattered stones marking the path
    for i in range(22):
        t = i / 21
        x = 0.55 * math.sin(t * 5.2) * 3.0
        y = -8.6 - 3.4 * t
        bx(st, (x, y, ground_h(x, y) + 0.01), (RNG.uniform(0.4, 0.7), RNG.uniform(0.3, 0.5), 0.06),
           M['stone'], rot=(0, 0, RNG.uniform(0, 90)))
    b.build()
    return st.build()
