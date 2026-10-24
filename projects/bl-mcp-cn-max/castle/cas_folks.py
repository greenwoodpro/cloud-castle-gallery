# -*- coding: utf-8 -*-
"""Figures in the Petit-Prince idiom: round heads, slender limbs, soft cloth."""
import bpy, bmesh, math
from mathutils import Vector, Euler
from cas_lib import (H, mat, Batch, box, bx, cyl, sph, dome, ring, quadstrip,
                     ribbon_v, leaf, star, RNG, TAU, D)
import cas_castle as C
from cas_island import ground_h

TERR = C.PZ + 0.16
ROOF_Z = C.KZ + C.K_H1 + 0.26 + C.K_H2 + 0.26
F2_TOP = C.KZ + C.K_H1 + 0.26


class Fig:
    def __init__(self):
        self.v = []

    def add(self, vs):
        self.v += list(vs)
        return vs

    def place(self, b, x, y, z, rot=0.0):
        if not self.v:
            return
        if rot:
            bmesh.ops.rotate(b.bm, cent=(0, 0, 0),
                             matrix=Euler((0, 0, D(rot)), 'XYZ').to_matrix(),
                             verts=self.v)
        bmesh.ops.translate(b.bm, vec=(x, y, z), verts=self.v)


def skin_mat():
    return mat('Folk_Skin', '#f4d8bc', 0.62, sss=0.16)


def human(h=1.66, coat='#5f8a68', legs='#4a4650', hair='#e8c579', skin='#f4d8bc',
          hair_style='curly', scarf=None, cape=None, hat=None, arm=8.0, arm2=None,
          skirt=False, sitting=False, kid=False, eye='#3a2e2a'):
    f = Fig()
    S = skin_mat()
    Cm = mat('Coat_' + coat, coat, 0.82)
    Lm = mat('Legs_' + legs, legs, 0.8)
    Hm = mat('Hair_' + hair, hair, 0.72)
    Em = mat('Eye_' + eye, eye, 0.4)
    if kid:
        h = h * 0.66
    hz = 0.845 * h
    hr = 0.098 * h
    sh = 0.715 * h
    # legs
    for sx in (-1, 1):
        lx = sx * 0.052 * h
        if sitting:
            f.add(cyl(_B, (lx, -0.10 * h, 0.36 * h), 0.036 * h, 0.032 * h, 0.34 * h,
                      Lm, seg=8, rot=(72, 0, 0)))
            f.add(bx(_B, (lx, -0.24 * h, 0.06 * h), (0.09 * h, 0.2 * h, 0.05 * h), Lm))
        else:
            f.add(cyl(_B, (lx, 0, 0.045 * h), 0.042 * h, 0.034 * h, 0.40 * h, Lm, seg=8))
            f.add(bx(_B, (lx, -0.02 * h, 0.045 * h), (0.075 * h, 0.15 * h, 0.05 * h),
                     mat('Boot_' + legs, legs, 0.7)))
    # torso / coat
    if skirt:
        f.add(cyl(_B, (0, 0, 0.40 * h), 0.135 * h, 0.062 * h, sh - 0.40 * h + 0.02, Cm,
                  seg=14))
    else:
        f.add(cyl(_B, (0, 0, 0.40 * h), 0.105 * h, 0.072 * h, sh - 0.40 * h + 0.02, Cm,
                  seg=14))
        f.add(cyl(_B, (0, 0, 0.40 * h), 0.108 * h, 0.108 * h, 0.045 * h,
                  mat('Belt_' + coat, '#8b623d', 0.7), seg=14))
    # shoulders
    f.add(sph(_B, (0, 0, sh - 0.01 * h), 0.085 * h, Cm, u=12, v=8, scale=(1.25, 0.9, 0.9)))
    # neck
    f.add(cyl(_B, (0, 0, sh), 0.028 * h, 0.026 * h, 0.055 * h, S, seg=8))
    # head
    f.add(sph(_B, (0, 0, hz), hr, S, u=16, v=12, scale=(0.94, 0.96, 1.03)))
    # ears
    for sx in (-1, 1):
        f.add(sph(_B, (sx * hr * 0.9, 0.005 * h, hz - 0.005 * h), hr * 0.2, S, u=6, v=5))
    # face
    for sx in (-1, 1):
        f.add(sph(_B, (sx * hr * 0.34, -hr * 0.86, hz + hr * 0.10), hr * 0.105, Em,
                  u=6, v=5))
        f.add(sph(_B, (sx * hr * 0.40, -hr * 0.80, hz - hr * 0.16), hr * 0.12,
                  mat('Blush', '#eba9a0', 0.8, emit='#e08b84', estr=0.05), u=6, v=5,
                  scale=(1.2, 0.4, 0.8)))
    f.add(sph(_B, (0, -hr * 0.97, hz - hr * 0.10), hr * 0.11, S, u=6, v=5,
              scale=(1, 1.3, 0.9)))
    f.add(bx(_B, (0, -hr * 0.88, hz - hr * 0.42), (hr * 0.30, hr * 0.08, hr * 0.055), Em))
    # hair
    if hair_style == 'curly':
        for i in range(11):
            a = TAU * i / 11
            el = hr * (0.55 + 0.35 * (i % 3) / 2)
            f.add(sph(_B, (math.cos(a) * hr * 0.86, math.sin(a) * hr * 0.72 + hr * 0.12,
                           hz + el), hr * 0.36, Hm, u=8, v=6))
        f.add(sph(_B, (0, hr * 0.1, hz + hr * 0.85), hr * 0.5, Hm, u=10, v=7,
                  scale=(1.15, 1.1, 0.7)))
    elif hair_style == 'long':
        f.add(sph(_B, (0, hr * 0.28, hz + hr * 0.1), hr * 1.06, Hm, u=14, v=10,
                  scale=(0.95, 1.0, 1.25)))
        for sx in (-1, 1):
            f.add(sph(_B, (sx * hr * 0.85, hr * 0.4, hz - hr * 0.55), hr * 0.42, Hm,
                      u=8, v=6, scale=(0.8, 0.7, 1.7)))
    elif hair_style == 'short':
        f.add(sph(_B, (0, hr * 0.12, hz + hr * 0.24), hr * 1.02, Hm, u=12, v=8,
                  scale=(1.02, 1.02, 0.82)))
    elif hair_style == 'bald':
        pass
    # arms
    for sx in (-1, 1):
        ax = sx * 0.085 * h
        ang = arm if sx < 0 else (arm2 if arm2 is not None else arm)
        f.add(cyl(_B, (ax, 0, sh - 0.03 * h), 0.031 * h, 0.026 * h, 0.30 * h, Cm, seg=7,
                  rot=(0, sx * ang, 0)))
        # hand
        hx = ax + sx * math.sin(D(ang)) * 0.30 * h
        hzz = sh - 0.03 * h + math.cos(D(ang)) * 0.30 * h
        f.add(sph(_B, (hx, 0, hzz), 0.036 * h, S, u=7, v=6))
    # scarf
    if scarf:
        Sm = mat('Scarf_' + scarf, scarf, 0.78)
        ring(_B, (0, 0, sh + 0.01 * h), 0.075 * h, 0.045 * h, 0.05 * h, Sm, seg=14)
        pts = [(0.04 * h, 0.02 * h, sh + 0.02 * h), (0.30 * h, 0.10 * h, sh - 0.03 * h),
               (0.58 * h, 0.15 * h, sh - 0.16 * h), (0.80 * h, 0.13 * h, sh - 0.34 * h)]
        quadstrip(_B, pts, [0.075 * h, 0.07 * h, 0.062 * h, 0.045 * h], Sm)
    # cape
    if cape:
        Km = mat('Cape_' + cape, cape, 0.8)
        # simple trapezoid cape
        bm = _B.bm
        top = [bm.verts.new((math.sin((i / 6 - 0.5) * 1.5) * 0.17 * h, hr * 0.6,
                             sh + 0.04 * h)) for i in range(7)]
        bot = [bm.verts.new((math.sin((i / 6 - 0.5) * 2.0) * 0.27 * h,
                             hr * 0.6 + 0.13 * h, 0.28 * h)) for i in range(7)]
        for i in range(6):
            bm.faces.new((top[i], top[i + 1], bot[i + 1], bot[i]))
        f.add(top + bot)
        _B.tag(top + bot, Km, True)
    # hat
    if hat:
        Ht = mat('Hat_' + (hat[0] if isinstance(hat, tuple) else hat), '#a3504a', 0.8)
        col = hat[1] if isinstance(hat, tuple) else '#a3504a'
        Ht = mat('Hat_' + col, col, 0.8)
        f.add(cyl(_B, (0, 0, hz + hr * 0.42), hr * 1.35, hr * 1.3, 0.018 * h, Ht, seg=16))
        f.add(cyl(_B, (0, 0, hz + hr * 0.44), hr * 0.62, hr * 0.55, hr * 0.9, Ht, seg=12))
    return f


_B = None  # module-level scratch batch, set by build_all


def fox(scale=1.0):
    f = Fig()
    Fm = mat('Fox', '#d98a52', 0.8)
    Wm = mat('FoxWhite', '#f8efe2', 0.8)
    Dm = mat('FoxDark', '#3f3230', 0.7)
    s = scale
    f.add(sph(_B, (0, 0, 0.24 * s), 0.16 * s, Fm, u=12, v=8, scale=(1.7, 0.9, 0.85)))
    # chest
    f.add(sph(_B, (0.20 * s, 0, 0.24 * s), 0.10 * s, Wm, u=10, v=7, scale=(1, 0.9, 1.1)))
    # head
    f.add(sph(_B, (0.30 * s, 0, 0.40 * s), 0.115 * s, Fm, u=12, v=9))
    f.add(cyl(_B, (0.38 * s, 0, 0.36 * s), 0.075 * s, 0.028 * s, 0.13 * s, Wm, seg=8,
              rot=(0, 62, 0)))
    f.add(sph(_B, (0.455 * s, 0, 0.405 * s), 0.028 * s, Dm, u=6, v=5))
    for sy in (-1, 1):
        f.add(cyl(_B, (0.27 * s, sy * 0.06 * s, 0.47 * s), 0.05 * s, 0.006 * s, 0.15 * s,
                  Fm, seg=6, rot=(sy * -12, -16, 0)))
        f.add(sph(_B, (0.355 * s, sy * 0.042 * s, 0.425 * s), 0.014 * s, Dm, u=5, v=4))
    # legs
    for sx in (-1, 1):
        for sy in (-1, 1):
            f.add(cyl(_B, (0.18 * sx * s + 0.04 * s, sy * 0.075 * s, 0.0), 0.026 * s,
                      0.022 * s, 0.17 * s, Dm, seg=6))
    # tail
    for k in range(4):
        t = k / 3.0
        f.add(sph(_B, (-0.16 * s - t * 0.16 * s, 0.02 * s * math.sin(t * 3),
                       0.22 * s + t * 0.13 * s), (0.10 - 0.02 * k) * s,
                  Wm if k == 3 else Fm, u=9, v=7, scale=(1.2, 0.85, 0.85)))
    return f


def sheep(scale=1.0):
    f = Fig()
    Wm = mat('Sheep_Wool', '#f5efe2', 0.92)
    Dm = mat('Sheep_Dark', '#4a4038', 0.8)
    s = scale
    for k in range(5):
        a = TAU * k / 5
        f.add(sph(_B, (math.cos(a) * 0.10 * s, math.sin(a) * 0.06 * s, 0.26 * s),
                  0.13 * s, Wm, u=8, v=6, amp=0.09, freq=3, seed=k))
    f.add(sph(_B, (0, 0, 0.28 * s), 0.14 * s, Wm, u=10, v=7, scale=(1.3, 0.95, 1.0)))
    f.add(sph(_B, (0.20 * s, 0, 0.34 * s), 0.075 * s, Dm, u=9, v=7, scale=(1.2, 0.9, 1.0)))
    for sy in (-1, 1):
        f.add(sph(_B, (0.22 * s, sy * 0.06 * s, 0.39 * s), 0.035 * s, Dm, u=6, v=4,
                  scale=(0.7, 0.5, 1.2)))
    for sx in (-1, 1):
        for sy in (-1, 1):
            f.add(cyl(_B, (sx * 0.08 * s, sy * 0.055 * s, 0), 0.018 * s, 0.016 * s,
                      0.17 * s, Dm, seg=5))
    return f


def horse(scale=1.0):
    f = Fig()
    Bm = mat('Horse_Body', '#a8703f', 0.82)
    Mm = mat('Horse_Mane', '#5d4230', 0.85)
    s = scale
    f.add(sph(_B, (0, 0, 0.55 * s), 0.34 * s, Bm, u=14, v=10, scale=(1.5, 0.72, 0.78)))
    f.add(cyl(_B, (0.36 * s, 0, 0.62 * s), 0.13 * s, 0.10 * s, 0.42 * s, Bm, seg=10,
              rot=(0, 28, 0)))
    f.add(sph(_B, (0.53 * s, 0, 0.98 * s), 0.14 * s, Bm, u=12, v=9, scale=(1.5, 0.85, 0.9)))
    f.add(sph(_B, (0.66 * s, 0, 0.94 * s), 0.07 * s, Bm, u=8, v=6, scale=(1.4, 0.8, 0.9)))
    for sy in (-1, 1):
        f.add(cyl(_B, (0.50 * s, sy * 0.05 * s, 1.06 * s), 0.03 * s, 0.006 * s,
                  0.10 * s, Bm, seg=5))
    for i in range(6):
        f.add(sph(_B, (0.36 * s - i * 0.03 * s, 0, 1.02 * s - i * 0.075 * s),
                  0.055 * s, Mm, u=7, v=5, scale=(0.8, 0.5, 1.2)))
    for sx in (-1, 1):
        for sy in (-1, 1):
            f.add(cyl(_B, (sx * 0.26 * s, sy * 0.13 * s, 0), 0.045 * s, 0.038 * s,
                      0.58 * s, mat('Horse_Leg', '#8d5c34', 0.8), seg=6))
            f.add(cyl(_B, (sx * 0.26 * s, sy * 0.13 * s, 0), 0.055 * s, 0.05 * s,
                      0.08 * s, Mm, seg=6))
    for i in range(4):
        f.add(sph(_B, (-0.46 * s - i * 0.02 * s, 0, 0.62 * s - i * 0.08 * s),
                  0.075 * s, Mm, u=7, v=5, scale=(0.8, 0.6, 1.4)))
    return f


def bird(scale=1.0):
    f = Fig()
    Bm = mat('Bird', '#6d6f7e', 0.78)
    s = scale
    f.add(sph(_B, (0, 0, 0.09 * s), 0.07 * s, Bm, u=9, v=7, scale=(1.5, 0.8, 0.9)))
    f.add(sph(_B, (0.09 * s, 0, 0.13 * s), 0.045 * s, Bm, u=8, v=6))
    f.add(cyl(_B, (0.13 * s, 0, 0.125 * s), 0.018 * s, 0.002 * s, 0.05 * s,
              mat('Beak', '#d9a34f', 0.6), seg=5, rot=(0, 78, 0)))
    for sy in (-1, 1):
        f.add(bx(_B, (0, sy * 0.045 * s, 0.11 * s), (0.08 * s, 0.06 * s, 0.012 * s), Bm,
                 rot=(0, 0, 0)))
    return f


def prince():
    """the little prince: green coat, gold curls, long red scarf"""
    f = human(h=1.62, coat='#6f9b72', legs='#4a5060', hair='#e9c979',
              hair_style='curly', scarf='#c4514a', arm=6, skirt=True)
    # star pin on the chest
    star(_B, (0.02, -0.088, 1.02), 0.035, mat('Gold_Trim', '#dfb268', 0.32, metal=0.8))
    return f


def king():
    f = human(h=1.7, coat='#7a5f96', legs='#3f3a4a', hair='#c9b7a0', hair_style='long',
              cape='#8e4a56', hat=('#a3504a'), arm=14, arm2=10)
    # crown
    cyl(_B, (0, 0, 1.55), 0.13, 0.14, 0.09, mat('Gold_Trim', '#dfb268', 0.32, metal=0.8),
        seg=10)
    return f


def knight():
    f = human(h=1.72, coat='#b7bac2', legs='#7e838f', hair='#6a5a4a', hair_style='short',
              cape='#a34b47', arm=20, arm2=4)
    hm = mat('Helm', '#a9adb8', 0.34, metal=0.8)
    # helm
    sph(_B, (0, 0, 1.49), 0.155, hm, u=12, v=9, scale=(0.95, 1.0, 1.15))
    bx(_B, (0, -0.13, 1.47), (0.19, 0.05, 0.035), mat('Dark', '#2c2c33', 0.6))
    # plume
    sph(_B, (0, 0.02, 1.68), 0.06, mat('Plume', '#c96a63', 0.8), u=7, v=5,
        scale=(0.8, 0.8, 1.6))
    # spear
    cyl(_B, (0.34, 0, 0.05), 0.022, 0.018, 2.05, mat('Shaft', '#a87a4f', 0.7), seg=6)
    cyl(_B, (0.34, 0, 2.10), 0.045, 0.002, 0.22,
        mat('Steel', '#cfd4da', 0.3, metal=0.85), seg=6)
    # shield
    cyl(_B, (-0.34, -0.06, 0.95), 0.28, 0.28, 0.05,
        mat('Shield', '#5f7fae', 0.7), seg=14, rot=(88, 0, 0))
    sph(_B, (-0.34, -0.10, 0.95), 0.07, mat('Gold_Trim', '#dfb268', 0.32, metal=0.8),
        u=8, v=6)
    return f


def lady(dress='#6b7fb0', hair='#6a4c3c'):
    f = human(h=1.58, coat=dress, legs='#4a4650', hair=hair, hair_style='long',
              skirt=True, arm=6, arm2=10)
    # apron
    bx(_B, (0, -0.10, 0.45), (0.18, 0.03, 0.36), mat('Apron', '#f2e6d0', 0.9))
    return f


def child(coat='#c98a5f'):
    f = human(h=1.5, kid=True, coat=coat, legs='#5a5560', hair='#d9b46a',
              hair_style='curly', arm=16, arm2=24)
    return f


def shepherd():
    f = human(h=1.68, coat='#8d7f5f', legs='#4d4638', hair='#7a6a52', hair_style='short',
              hat=('#9c8a63'), arm=34, arm2=6)
    # crook
    cyl(_B, (0.30, -0.02, 0.05), 0.022, 0.02, 1.55,
        mat('Shaft', '#a87a4f', 0.7), seg=6)
    ring(_B, (0.30, -0.02, 1.60), 0.10, 0.075, 0.03,
         mat('Shaft', '#a87a4f', 0.7), seg=10)
    return f


def lamplighter():
    f = human(h=1.66, coat='#5b6b73', legs='#3f4750', hair='#5c4a3c', hair_style='short',
              arm=52, arm2=4)
    # lantern on a pole
    cyl(_B, (0.34, 0, 0.0), 0.02, 0.018, 1.6, mat('Iron2', '#4f545f', 0.4, metal=0.75),
        seg=5)
    bx(_B, (0.34, 0, 1.60), (0.12, 0.12, 0.16),
       mat('Lamp_Glow', '#ffdca6', 0.3, emit='#ffc57a', estr=3.2))
    bx(_B, (0.34, 0, 1.76), (0.15, 0.15, 0.04),
       mat('Iron2', '#4f545f', 0.4, metal=0.75))
    return f


def monk():
    f = human(h=1.66, coat='#6b5b4a', legs='#4a4038', hair='#8d7a62', hair_style='bald',
              skirt=True, arm=10, arm2=6)
    # hood + book
    sph(_B, (0, 0.06, 1.40), 0.19, mat('Cowl', '#5c4f42', 0.88), u=10, v=8,
        scale=(1.05, 1.1, 1.25))
    bx(_B, (0.02, -0.16, 0.92), (0.16, 0.05, 0.2), mat('Book_Leather', '#7d4b3c', 0.7))
    return f


def build_all(M, CM):
    global _B
    _B = Batch('Folk', 'People')
    B = _B
    out = []
    # ---- the little prince + fox on the roof terrace
    prince().place(B, 0.95, 1.35, ROOF_Z, rot=-22)
    fox(1.0).place(B, 1.75, 1.75, ROOF_Z, rot=118)
    child('#c98a5f').place(B, -1.4, 2.4, ROOF_Z, rot=15)
    # ---- king on the balcony
    king().place(B, 0.75, -0.62, F2_TOP, rot=8)
    lady('#6b7fb0').place(B, -1.6, -0.72, F2_TOP, rot=-14)
    # ---- princess at the spiral-tower opening
    lady('#c07b93', '#59402f').place(B, C.TX + 0.15, C.TY - 1.05, 5.44, rot=6)
    # ---- guards at the gate
    knight().place(B, -1.25, -6.05, TERR, rot=-8)
    knight().place(B, 1.25, -6.05, TERR, rot=8)
    # ---- courtyard life
    lady('#8f9ec4').place(B, 2.35, -3.25, TERR, rot=-40)
    child('#7fa7a0').place(B, -0.55, -4.85, TERR, rot=120)
    child('#d0a06a').place(B, 0.35, -5.15, TERR, rot=-60)
    monk().place(B, 4.2, -0.95, TERR, rot=170)
    human(h=1.7, coat='#a07a52', legs='#4f4a3f', hair='#5c4a3c', hair_style='short',
          arm=12).place(B, -4.6, -3.4, TERR, rot=64)   # merchant
    human(h=1.68, coat='#7f8f6a', legs='#4a4a42', hair='#8d7354', hair_style='short',
          arm=30, arm2=18).place(B, 4.9, -3.6, TERR, rot=-96)  # stable hand
    horse(0.95).place(B, 5.65, -2.55, TERR, rot=196)
    # ---- meadow
    lamplighter().place(B, 0.35, -10.15, ground_h(0.35, -10.15) - 0.02, rot=-18)
    shepherd().place(B, -8.3, -1.6, ground_h(-8.3, -1.6) - 0.02, rot=52)
    for i, (sx, sy) in enumerate(((-8.9, -2.5), (-7.6, -2.2), (-8.1, -0.9))):
        sheep(1.0).place(B, sx, sy, ground_h(sx, sy) - 0.02, rot=RNG.uniform(0, 360))
    human(h=1.66, coat='#9b7d9c', legs='#4a4650', hair='#6a4c3c', hair_style='long',
          skirt=True, arm=8).place(B, 2.55, -11.0, ground_h(2.55, -11.0) - 0.02, rot=-120)
    # ---- birds on the roof and wall
    for (bx_, by_, bz_) in ((1.9, 3.9, ROOF_Z + 0.95), (2.15, 3.9, ROOF_Z + 0.95),
                            (-2.6, -6.0, TERR + 3.55), (5.4, 1.2, C.CZ + C.CH + 0.2)):
        bird(1.1).place(B, bx_, by_, bz_, rot=RNG.uniform(0, 360))
    ob = B.build()
    out.append(ob)
    return out
