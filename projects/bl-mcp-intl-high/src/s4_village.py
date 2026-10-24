"""04 村庄：半木构民居、市集、风车、石桥、田圃、小码头"""
import math
import random
import bpy
from mathutils import Vector

from lib import (R, TAU, coll, box, cyl, sph, ico, cone, torus, gable, arch,
                 empty, join, Batch, M, _mk)
from libx import poly_prism, prism, ribbon, lathe, rod, ring_pts
from s1_island import meadow_h, RAVINE_A, RAVINE_B, LAKE, LAKE_Z, LAKE_R

_rng = random.Random(4242)


def path_ribbon(c, name, pts, width, mat, z_off=0.05, thick=0.1):
    """贴地小路：逐段采样地形高度"""
    out = []
    for i in range(len(pts) - 1):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        n = max(1, int(math.hypot(x1 - x0, y1 - y0) / 1.2))
        for k in range(n):
            t0, t1 = k / n, (k + 1) / n
            ax, ay = x0 + (x1 - x0) * t0, y0 + (y1 - y0) * t0
            bx, by = x0 + (x1 - x0) * t1, y0 + (y1 - y0) * t1
            za = meadow_h(ax, ay) + z_off
            zb = meadow_h(bx, by) + z_off
            ob = box(f"{name}_{i}_{k}", ((ax + bx) / 2, (ay + by) / 2, (za + zb) / 2 - thick / 2),
                     (math.hypot(bx - ax, by - ay) * 1.06, width, thick),
                     rot=(0, 0, math.atan2(by - ay, bx - ax)), mat=mat, target=c, bevel=0.0)
            out.append(ob)
    return out


def house(c, name, cx, cy, rot, w=2.8, d=3.4, h=2.6, roof=None, roof_h=1.6, wall=None):
    """半木构小屋：石基 + 灰泥墙 + 木梁 + 双坡顶 + 烟囱"""
    z = max(meadow_h(cx + dx, cy + dy) for dx in (-w / 2, 0, w / 2) for dy in (-d / 2, 0, d / 2)) + 0.02
    roof = roof or M().roofp
    wall = wall or M().plaster
    ca, sa = math.cos(rot), math.sin(rot)

    def P(dx, dy):
        return (cx + dx * ca - dy * sa, cy + dx * sa + dy * ca)

    # 基座
    box(name + "_基", (cx, cy, z + 0.25), (w + 0.3, d + 0.3, 0.5), rot=(0, 0, rot),
        mat=M().stone3, target=c, bevel=0.03)
    # 墙
    box(name + "_墙", (cx, cy, z + 0.5 + h / 2), (w, d, h), rot=(0, 0, rot),
        mat=wall, target=c, bevel=0.04)
    # 木构架
    b = Batch(name + "_木构", c)
    for sx in (-1, 1):
        for dy in (-d / 2 + 0.1, d / 2 - 0.1):
            px, py = P(sx * (w / 2 - 0.02), dy)
            b.box((px, py, z + 0.5 + h / 2), (0.1, 0.1, h), rot=(0, 0, rot), mat=M().wood2)
    for dy in (-d / 2 + 0.1, 0, d / 2 - 0.1):
        px, py = P(0, dy)
        b.box((px, py, z + 0.5 + h / 2), (w, 0.09, 0.09), rot=(0, 0, rot), mat=M().wood2)
        b.box((px, py, z + 0.5 + h * 0.62), (w, 0.07, 0.07), rot=(0, 0, rot), mat=M().wood2)
    for sx in (-1, 1):
        px, py = P(sx * w * 0.28, -d / 2 - 0.01)
        b.box((px, py, z + 0.5 + h * 0.55), (0.08, 0.08, h * 0.8), rot=(0, 0, rot + sx * 0.6),
              mat=M().wood2)
    b.build()
    # 屋顶
    gable(name + "_顶", (cx, cy, z + 0.5 + h), w + 0.55, d + 0.5, roof_h, rot=(0, 0, rot),
          mat=roof, target=c)
    # 门
    px, py = P(0, -d / 2 - 0.04)
    box(name + "_门", (px, py, z + 1.15), (0.66, 0.1, 1.3), rot=(0, 0, rot), mat=M().wood2,
        target=c, bevel=0.02)
    box(name + "_门框", (px, py, z + 1.18), (0.82, 0.06, 1.42), rot=(0, 0, rot), mat=M().wood,
        target=c, bevel=0.01)
    box(name + "_台阶", (px, py - 0.18, z + 0.34), (0.9, 0.5, 0.16), rot=(0, 0, rot),
        mat=M().stone3, target=c, bevel=0.02)
    # 窗与花箱
    for sx in (-1, 1):
        wx, wy = P(sx * (w / 2 - 0.45), -d / 2 - 0.04)
        box(name + f"_窗{sx}", (wx, wy, z + 1.55), (0.52, 0.12, 0.62), rot=(0, 0, rot),
            mat=M().glassw, target=c, bevel=0.01)
        box(name + f"_窗框{sx}", (wx, wy, z + 1.55), (0.64, 0.06, 0.74), rot=(0, 0, rot),
            mat=M().cream, target=c, bevel=0.01)
        box(name + f"_花箱{sx}", (wx, wy - 0.08, z + 1.18), (0.56, 0.2, 0.16), rot=(0, 0, rot),
            mat=M().wood, target=c, bevel=0.01)
        for k in range(4):
            bx, by = P(sx * (w / 2 - 0.45) - 0.2 + k * 0.13, -d / 2 - 0.12)
            sph(name + f"_花{sx}{k}", (bx, by, z + 1.28), 0.07,
                M().rosep if k % 2 else M().gold, c, seg=6, rings=4)
    # 烟囱
    chx, chy = P(w * 0.28, d * 0.2)
    box(name + "_烟囱", (chx, chy, z + 0.5 + h + roof_h * 0.55), (0.42, 0.42, roof_h + 1.3),
        rot=(0, 0, rot), mat=M().stone3, target=c, bevel=0.02)
    return z


def build_village(c):
    spots = [
        ("屋A", 1.4, 17.4, 0.10, M().roofp),
        ("屋B", 5.6, 18.6, -0.35, M().roofb),
        ("屋C", -2.6, 19.4, 0.22, M().roofg),
        ("屋D", 3.2, 22.4, 3.05, M().roofp),
        ("屋E", -5.4, 16.6, 0.55, M().roofb),
        ("屋F", 8.2, 16.0, -0.9, M().roofp),
        ("屋G", -0.6, 14.4, 2.7, M().roofg),
    ]
    for name, x, y, rot, rm in spots:
        house(c, name, x, y, rot, roof=rm)
    # 小广场铺地
    gz = meadow_h(2.6, 20.2)
    poly_prism("村广场", ring_pts(2.6, 20.2, 2.4, 22, 0.05, seed=5), gz - 0.25, gz + 0.05,
               M().stone3, c, 0.0)
    # 广场井
    cyl("村井", (2.6, 20.2, gz + 0.55), 0.55, 1.1, mat=M().stone3, target=c, seg=14, bevel=0.03)
    cyl("村井水", (2.6, 20.2, gz + 0.62), 0.42, 0.04, mat=M().waterd, target=c, seg=14)
    for sx in (-1, 1):
        box(f"村井柱{sx}", (2.6 + sx * 0.5, 20.2, gz + 1.6), (0.1, 0.1, 1.4), mat=M().wood2, target=c)
    gable("村井棚", (2.6, 20.2, gz + 2.25), 1.5, 1.2, 0.55, mat=M().thatch, target=c)
    # 市集棚
    for i, (sx, sy, mt) in enumerate(((0.4, 21.6, M().red), (4.6, 21.2, M().teal))):
        gz2 = meadow_h(sx, sy)
        box(f"村摊{i}", (sx, sy, gz2 + 1.05), (1.5, 0.7, 0.12), mat=M().wood, target=c, bevel=0.01)
        gable(f"村摊棚{i}", (sx, sy, gz2 + 1.85), 1.8, 1.1, 0.5, mat=mt, target=c)
        for k in range(4):
            sph(f"村货{i}{k}", (sx - 0.5 + k * 0.33, sy, gz2 + 1.17), 0.1,
                M().leaf4 if k % 2 else M().rosep, c, seg=6, rings=4)
    # 篱笆
    b = Batch("村篱笆", c)
    for seg in (((-7.2, 15.2), (-7.6, 20.0)), ((-7.6, 20.0), (-4.6, 23.2)),
                ((9.4, 14.6), (9.8, 19.2)), ((6.2, 23.8), (9.8, 19.2))):
        (x0, y0), (x1, y1) = seg
        L = math.hypot(x1 - x0, y1 - y0)
        n = int(L / 0.55)
        for k in range(n):
            t = k / n
            px, py = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
            b.box((px, py, meadow_h(px, py) + 0.45), (0.07, 0.07, 0.9), mat=M().wood2)
        for zz in (0.35, 0.7):
            b.box(((x0 + x1) / 2, (y0 + y1) / 2, meadow_h((x0 + x1) / 2, (y0 + y1) / 2) + zz),
                  (L, 0.05, 0.06), rot=(0, 0, math.atan2(y1 - y0, x1 - x0)), mat=M().wood)
    b.build()
    # 草垛
    for i, (hx, hy) in enumerate(((-4.2, 22.4), (7.4, 21.6), (5.0, 13.6))):
        zz = meadow_h(hx, hy)
        cyl(f"草垛{i}", (hx, hy, zz + 0.5), 0.6, 1.0, mat=M().thatch, target=c, seg=12, r2=0.45)
        cone(f"草垛顶{i}", (hx, hy, zz + 1.3), 0.62, 0.0, 0.6, mat=M().thatch, target=c, seg=12)
    # 手推车
    cx, cy = 6.8, 19.8
    zz = meadow_h(cx, cy)
    box("推车斗", (cx, cy, zz + 0.55), (1.1, 0.7, 0.35), mat=M().wood, target=c, bevel=0.02)
    for sx in (-1, 1):
        cyl(f"车轴{sx}", (cx + sx * 0.2, cy - 0.38, zz + 0.3), 0.26, 0.08,
            rot=(math.pi / 2, 0, 0), mat=M().wood2, target=c, seg=12)
    # 灯
    for x, y in ((-1.2, 16.0), (5.8, 21.0), (0.2, 22.6)):
        zz = meadow_h(x, y)
        cyl(f"村灯杆{x}", (x, y, zz + 1.0), 0.05, 2.0, mat=M().iron, target=c, seg=6)
        box(f"村灯{x}", (x, y, zz + 2.1), (0.22, 0.22, 0.3), mat=M().glassw, target=c, bevel=0.02)
    # 晾衣绳
    (ax, ay), (bx, by) = (-2.2, 15.6), (0.4, 15.2)
    za, zb = meadow_h(ax, ay) + 1.9, meadow_h(bx, by) + 1.9
    rod("晾衣绳", (ax, ay, za), (bx, by, zb), 0.015, M().cream, c, seg=4)
    for i in range(4):
        t = 0.15 + i * 0.22
        box(f"衣{i}", (ax + (bx - ax) * t, ay + (by - ay) * t, za - 0.28 + (zb - za) * t),
            (0.3, 0.02, 0.5), mat=[M().cream, M().red, M().teal, M().gold][i], target=c, bevel=0.0)


def build_paths(c):
    path_ribbon(c, "村路", [(-12.4, 9.8), (-11.0, 13.0), (-8.0, 15.4), (-4.0, 16.4),
                            (0.0, 17.2), (3.4, 18.4), (6.0, 19.6), (8.6, 19.4), (10.6, 19.0)],
                 1.3, M().sand, 0.06, 0.08)
    path_ribbon(c, "城门路", [(0.4, 14.6), (0.0, 15.8), (-0.4, 17.0)], 1.4, M().sand, 0.06, 0.08)
    path_ribbon(c, "田埂", [(-7.6, 20.4), (-10.4, 21.4), (-12.6, 22.2)], 0.9, M().sand, 0.05, 0.06)


def build_bridge(c):
    """跨峡谷的石拱桥"""
    x0, x1 = 10.9, 13.9
    y = 18.6
    z = meadow_h(x0, y) + 0.1
    box("桥面", ((x0 + x1) / 2, y, z + 0.16), (x1 - x0 + 1.4, 2.0, 0.32), mat=M().stone3, target=c, bevel=0.03)
    for i in range(7):
        a = math.pi * i / 6
        box(f"桥拱{i}", ((x0 + x1) / 2 + math.cos(a) * 1.35, y, z - 0.9 + math.sin(a) * 0.95),
            (0.42, 2.1, 0.34), rot=(0, a - math.pi / 2, 0), mat=M().stone, target=c, bevel=0.02)
    for sy in (-1, 1):
        for i in range(4):
            box(f"桥栏{sy}{i}", (x0 + 0.4 + i * 0.9, y + sy * 0.95, z + 0.62), (0.5, 0.14, 0.6),
                mat=M().stone, target=c, bevel=0.02)
    # 桥头石
    for sx in (x0, x1):
        box(f"桥头{sx}", (sx, y, z + 0.45), (0.7, 2.2, 0.9), mat=M().stone3, target=c, bevel=0.03)


def build_windmill(c):
    wx, wy = -18.2, -1.4
    z = meadow_h(wx, wy)
    lathe("风车塔", [(1.55, 0), (1.5, 0.4), (1.25, 3.4), (1.05, 4.6), (1.2, 4.75)], 14,
          M().plaster, c, loc=(wx, wy, z), smooth=False)
    cone("风车顶", (wx, wy, z + 5.35), 1.35, 0.0, 1.5, mat=M().roofb, target=c, seg=14)
    box("风车门", (wx, wy - 1.45, z + 0.95), (0.7, 0.2, 1.5), mat=M().wood2, target=c, bevel=0.02)
    # 环廊
    torus("风车廊", (wx, wy, z + 3.2), 1.45, 0.1, mat=M().wood2, target=c, maj=20, mnr=5)
    for i in range(8):
        a = TAU * i / 8
        box(f"廊柱{i}", (wx + math.cos(a) * 1.3, wy + math.sin(a) * 1.3, z + 2.7),
            (0.08, 0.08, 1.1), mat=M().wood2, target=c, bevel=0.0)
    # 风车叶（朝南）
    hub = Vector((wx, wy - 1.55, z + 4.6))
    cyl("风车轴", hub, 0.22, 0.5, rot=(math.pi / 2, 0, 0), mat=M().wood2, target=c, seg=10)
    for i in range(4):
        a = TAU * i / 4 + 0.3
        dx, dy = math.cos(a), math.sin(a)
        rod(f"叶片{i}", hub, (hub.x + dx * 3.2, hub.y, hub.z + dy * 3.2), 0.07, M().wood2, c, seg=6)
        box(f"叶帆{i}", (hub.x + dx * 2.2, hub.y, hub.z + dy * 2.2), (0.9, 0.05, 1.9),
            rot=(0, -a, 0), mat=M().cream, target=c, bevel=0.0)


def build_fields(c):
    for bx, by, rot in ((-11.6, 20.4, 0.35), (-9.2, 22.4, 0.35), (7.0, 22.8, -0.2)):
        w, d = 3.6, 2.6
        ca, sa = math.cos(rot), math.sin(rot)
        pts = []
        for dx, dy in ((-w / 2, -d / 2), (w / 2, -d / 2), (w / 2, d / 2), (-w / 2, d / 2)):
            pts.append((bx + dx * ca - dy * sa, by + dx * sa + dy * ca))
        poly_prism(f"田{bx}", pts, meadow_h(bx, by) - 0.25, meadow_h(bx, by) + 0.03,
                   M().dirt, c, 0.0)
        b = Batch(f"作物{bx}", c)
        for i in range(6):
            for k in range(10):
                px = bx + (i - 2.5) * 0.55 * ca - (k - 4.5) * 0.24 * sa
                py = by + (i - 2.5) * 0.55 * sa + (k - 4.5) * 0.24 * ca
                b.cone((px, py, meadow_h(px, py) + 0.12), 0.09, 0.0, 0.3, mat=M().leaf2, seg=4)
        b.build()


def build_dock(c):
    """湖边小码头与一条小船"""
    a = math.atan2(LAKE[1] - 8.0, LAKE[0] - 12.0)
    dx, dy = math.cos(a), math.sin(a)
    x0, y0 = LAKE[0] - dx * (LAKE_R + 0.4), LAKE[1] - dy * (LAKE_R + 0.4)
    x1, y1 = LAKE[0] - dx * (LAKE_R - 2.2), LAKE[1] - dy * (LAKE_R - 2.2)
    box("码头", ((x0 + x1) / 2, (y0 + y1) / 2, LAKE_Z + 0.22), (1.4, 2.6, 0.12),
        rot=(0, 0, a + math.pi / 2), mat=M().wood, target=c, bevel=0.01)
    for i in range(4):
        t = i / 3
        box(f"桩{i}", (x0 + (x1 - x0) * t + dy * 0.7, y0 + (y1 - y0) * t - dx * 0.7, LAKE_Z + 0.05),
            (0.14, 0.14, 1.0), mat=M().wood2, target=c, bevel=0.0)
    # 小船
    bx, by = LAKE[0] - dx * (LAKE_R - 3.4) + dy * 1.6, LAKE[1] - dy * (LAKE_R - 3.4) - dx * 1.6
    box("小船", (bx, by, LAKE_Z + 0.1), (1.5, 0.7, 0.28), rot=(0, 0, a), mat=M().wood, target=c, bevel=0.08)
    box("小船内", (bx, by, LAKE_Z + 0.2), (1.2, 0.45, 0.14), rot=(0, 0, a), mat=M().wood2, target=c, bevel=0.04)
    rod("船桨", (bx - 0.4, by, LAKE_Z + 0.2), (bx + 0.6, by + 0.4, LAKE_Z + 0.1), 0.03, M().wood2, c, seg=5)


def build():
    c = coll("04 村庄与田园")
    build_village(c)
    build_paths(c)
    build_bridge(c)
    build_windmill(c)
    build_fields(c)
    build_dock(c)
    return c
