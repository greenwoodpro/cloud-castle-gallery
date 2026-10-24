"""05 自然：森林、果园、灌木、花草、岩石、羊群、飞鸟、玫瑰园"""
import math
import random
import bpy

from lib import (R, TAU, coll, box, cyl, sph, ico, cone, torus, gable, empty,
                 Batch, M, _mk)
from libx import poly_prism, lathe, rod, ring_pts, set_alpha
from s1_island import meadow_h, LAKE, LAKE_R, MESA_C, MESA_R, ISLAND_R

_rng = random.Random(2026)


def free(x, y, pad=1.0):
    r = math.hypot(x - MESA_C[0], y - MESA_C[1])
    if r < MESA_R + 1.6 + pad:
        return False
    if math.hypot(x - LAKE[0], y - LAKE[1]) < LAKE_R + 1.6 + pad:
        return False
    if -9.5 < x < 11.5 and 12.0 < y < 25.0:      # 村庄
        return False
    if math.hypot(x, y) > ISLAND_R - 2.2:
        return False
    return True


def tree(b, x, y, s=1.0, kind="round", leaf=None):
    z = meadow_h(x, y)
    leaf = leaf or _rng.choice([M().leaf1, M().leaf2, M().leaf3, M().leaf4])
    if kind == "round":
        b.cyl((x, y, z + 1.1 * s), 0.16 * s, 2.2 * s, r2=0.11 * s, mat=M().bark, seg=7)
        for dx, dy, dz, rr in ((0, 0, 2.7, 1.15), (-0.5, 0.3, 2.35, 0.85),
                               (0.45, -0.25, 2.4, 0.8), (0.1, 0.5, 2.2, 0.7)):
            b.sphere((x + dx * s, y + dy * s, z + dz * s), rr * s, leaf, seg=9, rings=6,
                     scale=(1, 1, 0.88))
    elif kind == "cypress":
        b.cyl((x, y, z + 0.7 * s), 0.13 * s, 1.4 * s, mat=M().bark, seg=6)
        b.cone((x, y, z + 2.9 * s), 0.72 * s, 0.0, 4.2 * s, mat=leaf, seg=8)
    elif kind == "pine":
        b.cyl((x, y, z + 0.9 * s), 0.14 * s, 1.8 * s, mat=M().bark, seg=6)
        for k in range(3):
            b.cone((x, y, z + (1.5 + k * 0.95) * s), (1.05 - k * 0.24) * s, 0.0, 1.5 * s,
                   mat=leaf, seg=8)
    elif kind == "baobab":
        b.cyl((x, y, z + 1.0 * s), 0.55 * s, 2.0 * s, r2=0.34 * s, mat=M().bark, seg=8)
        b.sphere((x, y, z + 2.3 * s), 0.95 * s, leaf, seg=9, rings=6, scale=(1, 1, 0.42))
    elif kind == "fruit":
        b.cyl((x, y, z + 0.9 * s), 0.13 * s, 1.8 * s, mat=M().bark, seg=6)
        b.sphere((x, y, z + 2.3 * s), 0.9 * s, leaf, seg=9, rings=6, scale=(1, 1, 0.9))
        for k in range(5):
            a = TAU * k / 5
            b.sphere((x + math.cos(a) * 0.55 * s, y + math.sin(a) * 0.55 * s, z + 2.2 * s),
                     0.09 * s, M().rosep, seg=5, rings=4)


def build_forest(c):
    bt = Batch("林木", c)
    # 西北林地
    n = 0
    while n < 46:
        x = _rng.uniform(-23, -8)
        y = _rng.uniform(-19, -3)
        if not free(x, y, 0.4):
            continue
        kind = _rng.choices(["round", "pine", "cypress", "baobab"], [0.45, 0.3, 0.15, 0.1])[0]
        tree(bt, x, y, _rng.uniform(0.75, 1.35), kind)
        n += 1
    # 东北林
    n = 0
    while n < 30:
        x = _rng.uniform(6, 23)
        y = _rng.uniform(-20, -6)
        if not free(x, y, 0.4):
            continue
        kind = _rng.choices(["round", "pine", "cypress"], [0.55, 0.3, 0.15])[0]
        tree(bt, x, y, _rng.uniform(0.7, 1.25), kind)
        n += 1
    # 散树
    for _ in range(14):
        x, y = _rng.uniform(-22, 22), _rng.uniform(-20, 24)
        if free(x, y, 1.4):
            tree(bt, x, y, _rng.uniform(0.8, 1.3), "round")
    bt.build(smooth=True)

    # 果园：四排
    bo = Batch("果园", c)
    for row in range(3):
        for k in range(6):
            x = -19.5 + k * 2.2
            y = -14.5 + row * 2.6
            if free(x, y, 0.2):
                tree(bo, x, y, 0.8, "fruit", M().leaf2)
    bo.build(smooth=True)


def build_shrubs(c):
    b = Batch("灌木与花丛", c)
    n = 0
    while n < 150:
        x, y = _rng.uniform(-24, 24), _rng.uniform(-22, 24)
        if not free(x, y, 0.2):
            continue
        z = meadow_h(x, y)
        b.sphere((x, y, z + 0.25), _rng.uniform(0.25, 0.5), _rng.choice([M().leaf1, M().leaf3, M().moss]),
                 seg=7, rings=5, scale=(1, 1, 0.75))
        n += 1
    # 花丛
    for _ in range(190):
        x, y = _rng.uniform(-24, 24), _rng.uniform(-22, 24)
        if not free(x, y, 0.1):
            continue
        z = meadow_h(x, y)
        mt = _rng.choice([M().rosep, M().gold, M().cream, M().lav, M().rose])
        for k in range(_rng.randint(2, 4)):
            b.sphere((x + _rng.uniform(-0.25, 0.25), y + _rng.uniform(-0.25, 0.25), z + _rng.uniform(0.1, 0.24)),
                     0.06, mt, seg=5, rings=4)
    b.build(smooth=True)

    # 草簇
    bg = Batch("草簇", c)
    n = 0
    while n < 520:
        x, y = _rng.uniform(-25, 25), _rng.uniform(-24, 25)
        if not free(x, y, 0.0):
            continue
        z = meadow_h(x, y)
        for k in range(3):
            bg.cone((x + _rng.uniform(-0.12, 0.12), y + _rng.uniform(-0.12, 0.12), z + 0.12),
                    _rng.uniform(0.03, 0.06), 0.0, _rng.uniform(0.18, 0.4),
                    mat=M().grass2 if k else M().moss, seg=3)
        n += 1
    bg.build()


def build_rocks(c):
    b = Batch("碎石", c)
    n = 0
    while n < 110:
        x, y = _rng.uniform(-25, 25), _rng.uniform(-24, 25)
        if not free(x, y, 0.0):
            continue
        z = meadow_h(x, y)
        b.ico((x, y, z + 0.06), _rng.uniform(0.12, 0.42), _rng.choice([M().rock, M().rock2, M().stone3]),
              sub_=1, scale=(1, _rng.uniform(0.7, 1.2), _rng.uniform(0.4, 0.8)),
              rot=(0, 0, _rng.uniform(0, TAU)))
        n += 1
    b.build()


def build_rose_garden(c):
    """玫瑰园：矮石墙 + 玻璃罩 + 一株玫瑰（给小王子）"""
    gx, gy = 10.6, 11.8
    gz = meadow_h(gx, gy)
    ring = ring_pts(gx, gy, 2.4, 20, 0.03, seed=9)
    poly_prism("玫瑰园台", ring, gz - 0.2, gz + 0.06, M().sand, c, 0.0)
    b = Batch("玫瑰园墙", c)
    for i in range(18):
        a = TAU * i / 18
        b.box((gx + math.cos(a) * 2.35, gy + math.sin(a) * 2.35, gz + 0.22), (0.5, 0.3, 0.44),
              rot=(0, 0, a), mat=M().stone3)
    b.build()
    # 玻璃罩
    dome = sph("玻璃罩", (gx, gy, gz + 0.85), 0.92, M().glassb, c, seg=24, rings=14, scale=(1, 1, 1.35))
    set_alpha(dome.data.materials[0], 0.22)
    torus("罩座", (gx, gy, gz + 0.1), 0.95, 0.06, mat=M().iron, target=c, maj=24, mnr=5)
    # 玫瑰
    cyl("玫瑰茎", (gx, gy, gz + 0.45), 0.03, 0.7, mat=M().leafp, target=c, seg=6)
    for i in range(6):
        a = TAU * i / 6
        sph(f"玫瑰瓣{i}", (gx + math.cos(a) * 0.09, gy + math.sin(a) * 0.09, gz + 0.82 + (i % 2) * 0.05),
            0.12, M().rosep if i % 2 else M().rosep2, c, seg=8, rings=6, scale=(1, 1, 0.8))
    sph("玫瑰花心", (gx, gy, gz + 0.88), 0.07, M().rosep2, c, seg=8, rings=6)
    for i in range(3):
        a = TAU * i / 3 + 0.4
        box(f"玫瑰叶{i}", (gx + math.cos(a) * 0.16, gy + math.sin(a) * 0.16, gz + 0.45),
            (0.22, 0.1, 0.02), rot=(0, 0.3, a), mat=M().leafp, target=c, bevel=0.0)


def build_volcanoes(c):
    """小王子式的三座小火山（其中一座死火山）"""
    for i, (vx, vy, r, h, active) in enumerate(((-15.5, 15.0, 1.5, 1.1, True),
                                                (-13.4, 16.8, 1.1, 0.75, False),
                                                (-17.2, 17.4, 0.9, 0.6, False))):
        gz = meadow_h(vx, vy)
        lathe(f"火山{i}", [(r, 0), (r * 0.92, 0.1), (r * 0.55, h * 0.7), (r * 0.32, h),
                           (r * 0.36, h * 0.96), (r * 0.12, h * 0.9)], 14,
              M().cliff2, c, loc=(vx, vy, gz), smooth=False)
        cyl(f"火山口{i}", (vx, vy, gz + h * 0.95), r * 0.3, 0.06,
            mat=M().ember if active else M().dark, target=c, seg=14)
        if active:
            b = Batch(f"火山烟{i}", c)
            for k in range(5):
                b.ico((vx + _rng.uniform(-0.2, 0.2), vy + _rng.uniform(-0.2, 0.2),
                       gz + h + 0.3 + k * 0.45), 0.2 + k * 0.1, M().cloud, sub_=1)
            b.build(smooth=True)


def build_sheep(c):
    for i, (x, y) in enumerate(((-19.0, 12.0), (-17.6, 13.4), (-20.4, 13.8), (-18.2, 11.0),
                                (-16.4, 12.2), (14.6, 20.0), (16.0, 21.4), (13.6, 22.2))):
        z = meadow_h(x, y)
        sph(f"羊身{i}", (x, y, z + 0.42), 0.34, M().wool, c, seg=10, rings=7, scale=(1.3, 0.95, 0.85))
        sph(f"羊头{i}", (x + 0.42, y, z + 0.56), 0.16, M().dark, c, seg=8, rings=6)
        for sx, sy in ((-0.2, -0.15), (-0.2, 0.15), (0.2, -0.15), (0.2, 0.15)):
            cyl(f"羊腿{i}{sx}{sy}", (x + sx, y + sy, z + 0.18), 0.045, 0.36, mat=M().dark, target=c, seg=5)


def build_birds(c):
    b = Batch("飞鸟", c)
    for i in range(34):
        a = _rng.uniform(0, TAU)
        rr = _rng.uniform(14, 40)
        z = _rng.uniform(16, 40)
        x, y = math.cos(a) * rr, math.sin(a) * rr
        s = _rng.uniform(0.5, 1.1)
        b.box((x, y, z), (0.5 * s, 0.06, 0.05), rot=(0, _rng.uniform(-0.4, 0.4), a + 0.7), mat=M().night)
        b.box((x, y, z), (0.5 * s, 0.06, 0.05), rot=(0, _rng.uniform(-0.4, 0.4), a - 0.7), mat=M().night)
    b.build()


def build_grass_edge(c):
    """岛缘一圈垂落的草与藤"""
    b = Batch("岛缘草", c)
    for i in range(150):
        a = TAU * i / 150
        rr = ISLAND_R * 0.995
        x, y = math.cos(a) * rr, math.sin(a) * rr
        b.ico((x, y, meadow_h(x, y) - 0.12), _rng.uniform(0.12, 0.3), M().grass2, sub_=1,
              scale=(1, 1, 0.7))
    b.build(smooth=True)


def build():
    c = coll("05 自然")
    build_forest(c)
    build_shrubs(c)
    build_rocks(c)
    build_rose_garden(c)
    build_volcanoes(c)
    build_sheep(c)
    build_birds(c)
    build_grass_edge(c)
    return c
