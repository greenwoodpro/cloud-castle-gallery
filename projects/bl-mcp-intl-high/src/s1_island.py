"""01 浮空岛：岩体、草甸、台地、村庄台、湖与瀑布、卫星岛"""
import math
import random
import bmesh
import bpy
from mathutils import Vector

from lib import (R, TAU, coll, box, cyl, sph, ico, cone, torus, empty, join,
                 Batch, M, noise_disp, _mk)
from libx import (poly_prism, prism, wall_band, ribbon, lathe, rod, ring_pts,
                  arc_pts, strata, set_alpha)

ISLAND_R = 26.0
MESA_C = (0.0, 2.0)
MESA_R = 12.6
MESA_Z = 9.0
SHELF_Z = 4.4
LAKE = (16.5, 8.5)
LAKE_R = 4.6
LAKE_Z = 1.30
RIM_Z = 2.35

_rng = random.Random(77)


def smoothstep(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def _edge_noise(a, k=0.0):
    return (1.0 + 0.038 * math.sin(3 * a + 0.6 + k) + 0.024 * math.sin(7 * a + 1.9)
            + 0.014 * math.sin(11 * a + 4.1 - k))


def rim_r(a):
    """岛缘半径（随角度起伏）"""
    return ISLAND_R * _edge_noise(a)


def seg_dist(p, a, b):
    px, py = p
    ax, ay = a
    bx, by = b
    vx, vy = bx - ax, by - ay
    wx, wy = px - ax, py - ay
    L2 = vx * vx + vy * vy or 1.0
    t = max(0.0, min(1.0, (wx * vx + wy * vy) / L2))
    return math.hypot(px - (ax + vx * t), py - (ay + vy * t))


RAVINE_A = (11.9, 13.2)
RAVINE_B = (12.4, 27.0)


def meadow_h(x, y):
    """草甸顶面高度（含湖盆、河谷、边缘下垂）"""
    r = math.hypot(x, y)
    h = RIM_Z
    h += 1.05 * math.sin(x * 0.135 + 0.7) * math.cos(y * 0.115 - 0.35)
    h += 0.42 * math.sin(x * 0.33 - 1.1) * math.sin(y * 0.29 + 0.9)
    h += 0.16 * math.sin(x * 0.7 + y * 0.5)
    # 西北小丘（风车所在）
    h += 1.5 * math.exp(-(((x + 18.5) ** 2 + (y + 1.5) ** 2) / 46.0))
    # 东北缓坡
    h += 0.9 * math.exp(-(((x - 15.0) ** 2 + (y + 14.0) ** 2) / 60.0))
    # 湖盆
    d = math.hypot(x - LAKE[0], y - LAKE[1])
    if d < LAKE_R + 2.2:
        h -= 1.75 * smoothstep((LAKE_R + 2.6 - d) / (LAKE_R + 2.6))
    # 河谷
    dr = seg_dist((x, y), RAVINE_A, RAVINE_B)
    if dr < 3.0:
        h -= 2.3 * smoothstep((3.0 - dr) / 3.0)
    # 边缘下垂
    h -= 0.55 * smoothstep((r - 22.5) / 4.0)
    return h


# --------------------------------------------------------------------- 岩体
ROCK_PROFILE = [(1.000, 1.62), (1.004, 0.90), (0.990, 0.20), (0.968, -0.60),
            (0.940, -1.50), (0.952, -2.20), (0.905, -3.40), (0.888, -4.60),
            (0.860, -5.40), (0.872, -6.10), (0.820, -7.60), (0.800, -8.90),
            (0.770, -9.80), (0.735, -11.40), (0.700, -12.60), (0.712, -13.40),
            (0.640, -15.00), (0.600, -16.60), (0.575, -17.80), (0.520, -19.40),
            (0.470, -21.00), (0.455, -22.20), (0.390, -24.00), (0.330, -25.80),
            (0.300, -27.00), (0.230, -29.00), (0.180, -30.60), (0.120, -32.20),
            (0.070, -33.40), (0.000, -34.60)]


def rock_radius(z):
    for i in range(len(ROCK_PROFILE) - 1):
        z0, z1 = ROCK_PROFILE[i][1], ROCK_PROFILE[i + 1][1]
        if z0 >= z >= z1:
            t = (z0 - z) / max(1e-6, z0 - z1)
            f = ROCK_PROFILE[i][0] + (ROCK_PROFILE[i + 1][0] - ROCK_PROFILE[i][0]) * t
            return ISLAND_R * f
    return ISLAND_R * (ROCK_PROFILE[-1][0] if z < ROCK_PROFILE[-1][1] else ROCK_PROFILE[0][0])


def build_rock(c):
    prof = ROCK_PROFILE
    N = 84
    bm = bmesh.new()
    rings = []
    for k, (f, z) in enumerate(prof):
        ring = []
        for i in range(N):
            a = TAU * i / N
            if f <= 1e-6:
                ring.append(bm.verts.new((0, 0, z)))
                break
            rad = ISLAND_R * f * _edge_noise(a, k * 0.55)
            rad *= 1.0 + 0.042 * math.sin(a * 5 + k * 0.9) + 0.026 * math.sin(a * 9 - k * 0.55) + 0.012 * math.sin(a * 17 + k * 1.3)
            rad += _rng.uniform(-0.22, 0.22) if k > 1 else 0.0
            zz = z + (_rng.uniform(-0.28, 0.28) if k > 1 else 0.0)
            ring.append(bm.verts.new((math.cos(a) * rad, math.sin(a) * rad, zz)))
        rings.append(ring)
    for k in range(len(rings) - 1):
        A, B = rings[k], rings[k + 1]
        if len(B) == 1:
            for i in range(len(A)):
                bm.faces.new([A[i], A[(i + 1) % len(A)], B[0]])
        else:
            for i in range(N):
                bm.faces.new([A[i], A[(i + 1) % N], B[(i + 1) % N], B[i]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    ob = _mk("岩体", bm, (0, 0, 0), (0, 0, 0), None, c, False, 0.0)
    strata(ob, [M().rock, M().rock2, M().cliff, M().cliff2],
           [(-15.0, 3), (-10.0, 2), (-6.0, 3), (-3.0, 1), (-0.5, 3), (0.6, 0), (2.0, 1)])
    # 土层底：填住草甸凹陷处，避免看穿
    poly_prism("土层", ring_pts(0, 0, 25.9, 64, 0.01, seed=3), 0.05, 0.45, M().dirt, c, 0.0)
    return ob


def build_meadow(c):
    """极坐标网格草甸，边缘与岩体顶圈吻合"""
    N = 108
    rings = 26
    bm = bmesh.new()
    grid = []
    for j in range(rings + 1):
        t = j / rings
        r = ISLAND_R * (t ** 0.92)
        row = []
        for i in range(N):
            a = TAU * i / N
            rr = r * (1.0 + (_edge_noise(a) - 1.0) * (t ** 2.4))
            x, y = math.cos(a) * rr, math.sin(a) * rr
            row.append(bm.verts.new((x, y, meadow_h(x, y) + (0.03 if j == rings else 0))))
        grid.append(row)
    for j in range(rings):
        for i in range(N):
            i2 = (i + 1) % N
            try:
                bm.faces.new([grid[j][i], grid[j][i2], grid[j + 1][i2], grid[j + 1][i]])
            except ValueError:
                pass
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bmesh.ops.remove_doubles(bm, verts=bm.verts[:], dist=0.02)
    # 草甸是一张开口曲面，recalc 可能朝下：这里强制朝上
    bm.normal_update()
    if sum(f.normal.z for f in bm.faces) < 0:
        bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
    ob = _mk("草甸", bm, (0, 0, 0), (0, 0, 0), M().grass, c, True, 0.0)
    # 给高处/低处换色
    ob.data.materials.append(M().grass2)
    ob.data.materials.append(M().moss)
    for p in ob.data.polygons:
        n = p.normal
        if n.z < 0.55:
            p.material_index = 2
        elif p.center.z > RIM_Z + 0.45:
            p.material_index = 1
    return ob


def build_mesa(c):
    """城堡台地：不规则 14 边形，侧面收分并分层"""
    pts = ring_pts(MESA_C[0], MESA_C[1], MESA_R, 18, 0.075, seed=11)
    bot = [(x, y, 0.9) for x, y in pts]
    top = [(MESA_C[0] + (x - MESA_C[0]) * 0.985, MESA_C[1] + (y - MESA_C[1]) * 0.985, MESA_Z)
           for x, y in pts]
    bands = [(0.9, 2.5, M().cliff2), (2.5, 3.9, M().cliff), (3.9, 5.1, M().cliff2),
             (5.1, 6.3, M().cliff), (6.3, 7.3, M().stone3), (7.3, 9.0, M().cliff)]
    for bi, (z0, z1, mm) in enumerate(bands):
        t0 = (z0 - 0.9) / (MESA_Z - 0.9)
        t1 = (z1 - 0.9) / (MESA_Z - 0.9)
        b0 = [(MESA_C[0] + (x - MESA_C[0]) * (1 + 0.075 * (1 - t0)),
               MESA_C[1] + (y - MESA_C[1]) * (1 + 0.075 * (1 - t0)), z0) for x, y in pts]
        b1 = [(MESA_C[0] + (x - MESA_C[0]) * (1 + 0.075 * (1 - t1)),
               MESA_C[1] + (y - MESA_C[1]) * (1 + 0.075 * (1 - t1)), z1) for x, y in pts]
        prism(f"台地{bi}", b0, b1, mm, c, 0.0, caps=(bi == 0))
    # 台地草皮盖
    cap = ring_pts(MESA_C[0], MESA_C[1], MESA_R * 0.984, 40, 0.006, seed=12)
    poly_prism("台地草皮", cap, MESA_Z - 0.05, MESA_Z + 0.02, M().grass, c, 0.0)
    # 岩檐：三道外凸的岩层
    for k, (zz, rr, hh) in enumerate(((3.1, 0.35, 0.55), (5.4, 0.22, 0.42), (7.3, 0.3, 0.5))):
        pts2 = ring_pts(MESA_C[0], MESA_C[1], MESA_R * 0.985 + rr, 40, 0.02, seed=20 + k)
        poly_prism(f"岩檐{k}", pts2, MESA_Z - (MESA_Z - zz) - hh, MESA_Z - (MESA_Z - zz), M().cliff2, c, 0.0)
    # 竖向岩脊
    for k in range(14):
        a = TAU * k / 14 + 0.2
        rr = MESA_R * 0.99
        x, y = MESA_C[0] + math.cos(a) * rr, MESA_C[1] + math.sin(a) * rr
        box(f"岩脊{k}", (x, y, MESA_Z * 0.5 + 1.4), (0.55, 1.4, 6.4), rot=(0, 0, a),
            mat=M().cliff2, target=c, bevel=0.12)
    # 台地边缘一圈碎石与草檐
    b = Batch("台地檐口", c)
    for i in range(96):
        a = TAU * i / 96
        rr = MESA_R * (0.985 + _rng.uniform(-0.01, 0.012))
        x = MESA_C[0] + math.cos(a) * rr
        y = MESA_C[1] + math.sin(a) * rr
        if _rng.random() < 0.45:
            b.ico((x, y, MESA_Z - _rng.uniform(0.05, 0.3)), _rng.uniform(0.18, 0.42),
                  M().moss if _rng.random() < 0.6 else M().rock2, sub_=1,
                  scale=(1.0, 1.0, 0.6))
        if _rng.random() < 0.55:
            b.cone((x, y, MESA_Z + 0.05), 0.22, 0.0, _rng.uniform(0.4, 0.9), mat=M().grass2, seg=5)
    b.build()


def build_grand_stair(c):
    """沿台地南壁盘旋而下的大阶梯：从城门落到草甸"""
    cx, cy = MESA_C
    R0 = MESA_R + 0.45
    n = 22
    a0, a1 = 92.0, 146.0
    b = Batch("大阶梯", c)
    for i in range(n):
        t = i / (n - 1)
        a = math.radians(a0 + (a1 - a0) * t)
        x = cx + math.cos(a) * R0
        y = cy + math.sin(a) * R0
        z = MESA_Z + (meadow_h(x, y) + 0.35 - MESA_Z) * t
        b.box((x, y, z - 0.11), (0.72, 2.5, 0.22), rot=(0, 0, a + math.pi / 2), mat=M().stone3)
        # 外侧矮墙
        if i % 2 == 0:
            xx = cx + math.cos(a) * (R0 + 1.28)
            yy = cy + math.sin(a) * (R0 + 1.28)
            b.box((xx, yy, z + 0.36), (0.5, 0.24, 0.86), rot=(0, 0, a + math.pi / 2), mat=M().stone)
    b.build()
    # 梯口平台
    ax = cx + math.cos(math.radians(a1)) * (R0 + 1.1)
    ay = cy + math.sin(math.radians(a1)) * (R0 + 1.1)
    poly_prism("梯口平台", [(ax - 2.2, ay - 2.0), (ax + 2.2, ay - 2.4),
                            (ax + 2.4, ay + 2.2), (ax - 2.0, ay + 2.0)],
               meadow_h(ax, ay) - 0.3, meadow_h(ax, ay) + 0.06, M().stone3, c, 0.0)


def build_lake(c):
    # 湖岸沙带
    ring = ring_pts(LAKE[0], LAKE[1], LAKE_R + 1.1, 40, 0.03, seed=21)
    poly_prism("湖岸", ring, LAKE_Z - 0.55, LAKE_Z - 0.16, M().sand, c, 0.0)
    # 水面
    ring2 = ring_pts(LAKE[0], LAKE[1], LAKE_R, 44, 0.025, seed=22)
    poly_prism("湖面", ring2, LAKE_Z - 0.03, LAKE_Z, M().water, c, 0.0)
    # 涟漪
    for i, r in enumerate((1.6, 2.9, 4.1)):
        torus(f"涟漪_{i}", (LAKE[0] + 0.6 * i, LAKE[1] - 0.4 * i, LAKE_Z + 0.012),
              r, 0.035, mat=M().water2, target=c, maj=40, mnr=4)
    # 溪流到岛缘
    path = [(LAKE[0] + 3.9, LAKE[1] + 2.6), (20.6, 11.4), (21.9, 12.4)]
    ribbon("溪水", path, 1.5, LAKE_Z - 0.02, M().water, c, 0.05)
    ribbon("溪岸", [(LAKE[0] + 3.6, LAKE[1] + 2.2), (20.3, 11.1), (21.6, 12.1)], 2.6,
           LAKE_Z - 0.14, M().sand, c, 0.08)
    # 芦苇与睡莲
    b = Batch("湖畔植物", c)
    for i in range(46):
        a = _rng.uniform(0, TAU)
        rr = LAKE_R * _rng.uniform(0.86, 1.06)
        x, y = LAKE[0] + math.cos(a) * rr, LAKE[1] + math.sin(a) * rr
        b.cone((x, y, LAKE_Z + 0.05), 0.07, 0.0, _rng.uniform(0.5, 1.2), mat=M().moss, seg=4)
    for i in range(9):
        a = _rng.uniform(0, TAU)
        rr = LAKE_R * _rng.uniform(0.2, 0.8)
        b.sphere((LAKE[0] + math.cos(a) * rr, LAKE[1] + math.sin(a) * rr, LAKE_Z + 0.03),
                 0.28, M().leaf2, seg=8, rings=5, scale=(1, 1, 0.14))
    b.build()


def build_waterfall(c):
    """岛缘瀑布：从溪口翻过岩唇，贴壁下坠，渐宽成雾"""
    sx, sy = 21.9, 12.4
    a = math.atan2(sy, sx)
    ox, oy = math.cos(a), math.sin(a)
    px, py = -oy, ox
    zs = [2.06, 1.6, 0.7, -0.5, -2.0, -4.0, -6.4, -9.2, -12.4, -15.8, -19.0]
    widths = [1.4, 1.7, 2.2, 2.8, 3.5, 4.3, 5.1, 5.8, 6.4, 6.8, 7.0]
    bm = bmesh.new()
    rows = []
    for k, (z, w) in enumerate(zip(zs, widths)):
        rad = rock_radius(z) + 0.45
        row = []
        for s_ in (-1, -0.5, 0, 0.5, 1):
            x = ox * rad + px * (w * 0.5 * s_)
            y = oy * rad + py * (w * 0.5 * s_)
            row.append(bm.verts.new((x, y, z + 0.1 * math.sin(s_ * 3 + k))))
        rows.append(row)
    for k in range(len(rows) - 1):
        for i in range(4):
            bm.faces.new([rows[k][i], rows[k][i + 1], rows[k + 1][i + 1], rows[k + 1][i]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    ob = _mk("瀑布", bm, (0, 0, 0), (0, 0, 0), M().foam, c, True, 0.0)
    set_alpha(ob.data.materials[0], 0.34)
    # 水口的一小段溪流与翻唇
    ribbon("溪口", [(sx - ox * 1.6, sy - oy * 1.6), (sx, sy), (sx + ox * 0.6, sy + oy * 0.6)],
           1.4, 2.06, M().water, c, 0.04)
    # 落点的一团极淡水雾
    b = Batch("瀑布水雾", c)
    for i in range(4):
        z = -18.0 - i * 1.6
        x = ox * (rock_radius(z) + 1.6)
        y = oy * (rock_radius(z) + 1.6)
        b.ico((x, y, z), 3.2 + i * 0.9, M().cloud, sub_=2, scale=(1, 1, 0.35))
    ob2 = b.build(smooth=True)
    set_alpha(ob2.data.materials[0], 0.16)


def build_satellites(c):
    """两座卫星小岛 + 一圈悬空碎石"""
    for name, cx, cy, cz, s in (("卫星岛_A", -30, -22, 6, 3.4), ("卫星岛_B", 34, -26, -3, 2.2),
                                ("卫星岛_C", -26, 26, -9, 2.6)):
        lathe(name, [(s * 0.02, -s * 1.9), (s * 0.42, -s * 1.1), (s * 0.9, -s * 0.2),
                     (s * 1.0, s * 0.12), (s * 0.96, s * 0.3), (0.0, s * 0.34)],
              16, M().rock, c, loc=(cx, cy, cz), smooth=True)
        poly_prism(name + "_草", ring_pts(cx, cy, s * 0.94, 12, 0.06, seed=abs(int(cx))),
                   cz + s * 0.28, cz + s * 0.36, M().grass, c, 0.0)
        if s > 3:
            cone(name + "_树", (cx + 0.6, cy - 0.4, cz + s * 0.35), 0.9, 0.0, 2.6,
                 mat=M().leaf3, target=c, seg=7)
    b = Batch("悬空碎石", c)
    for i in range(30):
        a = _rng.uniform(0, TAU)
        rr = _rng.uniform(28, 38)
        z = _rng.uniform(-16, 8)
        s = _rng.uniform(0.3, 1.4)
        b.ico((math.cos(a) * rr, math.sin(a) * rr, z), s, M().rock2, sub_=1,
              scale=(1, 1, 0.8), rot=(0, 0, _rng.uniform(0, TAU)))
    b.build()


def build():
    c = coll("01 浮空岛")
    build_rock(c)
    build_meadow(c)
    build_mesa(c)
    build_grand_stair(c)
    build_lake(c)
    build_waterfall(c)
    build_satellites(c)
    return c
