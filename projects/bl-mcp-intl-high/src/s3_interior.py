"""03 城堡内部：主厅、王座厅、礼拜堂、厨房 —— 全部剖开展示"""
import math
import random
import bpy
from mathutils import Vector

from lib import (R, TAU, coll, box, cyl, sph, ico, cone, torus, gable, arch,
                 empty, join, Batch, M, _mk)
from libx import poly_prism, prism, wall_band, ribbon, lathe, rod, ring_pts, set_alpha
from s2_castle import HALL, CHAPEL, KEEP_C, KEEP_R, WALL_Z

_rng = random.Random(808)

HALL_FZ = WALL_Z + 0.5
KEEP_FZ = WALL_Z + 1.25
CHAP_FZ = WALL_Z + 0.46


# ------------------------------------------------------------------ 家具零件
def table(c, name, x, y, z, w, d, h=0.8, mat=None, rot=0.0):
    mat = mat or M().wood
    box(name, (x, y, z + h), (w, d, 0.09), rot=(0, 0, rot), mat=mat, target=c, bevel=0.02)
    for sx in (-1, 1):
        for sy in (-1, 1):
            dx = math.cos(rot) * (w / 2 - 0.16) * sx - math.sin(rot) * (d / 2 - 0.16) * sy
            dy = math.sin(rot) * (w / 2 - 0.16) * sx + math.cos(rot) * (d / 2 - 0.16) * sy
            box(f"{name}_腿{sx}{sy}", (x + dx, y + dy, z + h / 2), (0.1, 0.1, h),
                rot=(0, 0, rot), mat=M().wood2, target=c, bevel=0.0)


def chair(c, name, x, y, z, ang=0.0, mat=None, tall=False):
    mat = mat or M().wood2
    box(name + "_座", (x, y, z + 0.46), (0.46, 0.46, 0.08), rot=(0, 0, ang), mat=mat, target=c, bevel=0.01)
    for sx in (-1, 1):
        for sy in (-1, 1):
            box(f"{name}_腿{sx}{sy}", (x + sx * 0.18, y + sy * 0.18, z + 0.23), (0.07, 0.07, 0.46),
                mat=M().wood2, target=c, bevel=0.0)
    hb = 1.05 if tall else 0.62
    box(name + "_背", (x - math.sin(ang) * 0.21, y - math.cos(ang) * 0.21, z + 0.46 + hb / 2),
        (0.46, 0.07, hb), rot=(0, 0, ang), mat=mat, target=c, bevel=0.01)


def candle(c, name, x, y, z, h=0.34, mat=None):
    cyl(name, (x, y, z + h / 2), 0.045, h, mat=M().cream, target=c, seg=8, bevel=0.0)
    cone(name + "_焰", (x, y, z + h + 0.07), 0.055, 0.0, 0.16, mat=mat or M().fire, target=c, seg=6)


def plate(c, name, x, y, z, r=0.16):
    cyl(name, (x, y, z + 0.015), r, 0.03, mat=M().cream, target=c, seg=14, bevel=0.01)


def jug(c, name, x, y, z, s=1.0):
    lathe(name, [(0.001, 0), (0.1 * s, 0.02 * s), (0.14 * s, 0.14 * s), (0.1 * s, 0.3 * s),
                 (0.06 * s, 0.38 * s), (0.09 * s, 0.4 * s)], 10, M().teal, c, loc=(x, y, z), smooth=True)


def fire(c, name, x, y, z, s=1.0):
    b = Batch(name, c)
    for i in range(5):
        b.cone((x + _rng.uniform(-0.12, 0.12) * s, y + _rng.uniform(-0.08, 0.08) * s,
                z + 0.16 * s + _rng.uniform(0, 0.1)), 0.1 * s, 0.0,
               _rng.uniform(0.3, 0.62) * s, mat=M().fire, seg=6)
    for i in range(3):
        b.cyl((x + _rng.uniform(-0.16, 0.16) * s, y, z + 0.06), 0.05 * s, 0.5 * s,
              rot=(0, math.pi / 2, _rng.uniform(0, 3)), mat=M().wood2, seg=6)
    b.build()
    d = bpy.data.lights.new(name + "_光", "POINT")
    d.energy = 55 * s
    d.color = (1.0, 0.62, 0.32)
    d.shadow_soft_size = 0.5
    ob = bpy.data.objects.new(name + "_光", d)
    c.objects.link(ob)
    ob.location = (x, y, z + 0.55 * s)


# ------------------------------------------------------------------ 主厅
def hall(c):
    cx, cy, w, d = HALL["cx"], HALL["cy"], HALL["w"], HALL["d"]
    x0, x1 = cx - w / 2 + 0.3, cx + w / 2 - 0.3
    yb = cy - d / 2 + 0.28
    z = HALL_FZ
    # 地板拼缝
    b = Batch("大厅地板缝", c)
    for i in range(14):
        b.box((x0 + i * (x1 - x0) / 13, cy, z + 0.005), (0.02, d - 0.3, 0.01), mat=M().wood2)
    b.build()
    # 长毯
    ribbon("大厅地毯", [(cx + 1.0, cy + d / 2 - 0.4), (cx + 1.0, cy - d / 2 + 0.4)], 1.0, z + 0.012,
           M().carpet, c, 0.0)
    # 壁炉
    fx = cx + 1.45
    box("壁炉体", (fx, yb + 0.18, z + 1.0), (2.0, 0.42, 2.0), mat=M().stone3, target=c, bevel=0.03)
    box("炉膛", (fx, yb + 0.34, z + 0.5), (1.35, 0.3, 1.0), mat=M().dark, target=c, bevel=0.0)
    box("炉台", (fx, yb + 0.34, z + 1.02), (2.2, 0.5, 0.14), mat=M().stone3, target=c, bevel=0.03)
    box("炉罩", (fx, yb + 0.28, z + 1.9), (1.9, 0.44, 0.55), mat=M().stone3, target=c, bevel=0.04)
    fire(c, "炉火", fx, yb + 0.42, z + 0.08, 1.0)
    # 壁炉上方织物画
    box("挂画", (fx, yb + 0.02, z + 2.9), (1.5, 0.06, 1.0), mat=M().teal, target=c, bevel=0.01)
    box("挂画框", (fx, yb + 0.01, z + 2.9), (1.62, 0.04, 1.12), mat=M().gold, target=c, bevel=0.01)
    # 长桌
    tx = cx - 0.2
    table(c, "长桌", tx, cy - 0.15, z, 3.3, 1.0, 0.78)
    for sy in (-1, 1):
        box(f"长凳{sy}", (tx, cy - 0.15 + sy * 0.85, z + 0.44), (2.9, 0.34, 0.09),
            mat=M().wood2, target=c, bevel=0.02)
        for k in (-1.2, 0, 1.2):
            box(f"凳腿{sy}_{k}", (tx + k, cy - 0.15 + sy * 0.85, z + 0.22), (0.09, 0.3, 0.44),
                mat=M().wood2, target=c, bevel=0.0)
    # 餐具
    for i in range(4):
        px = tx - 1.1 + i * 0.72
        plate(c, f"盘{i}", px, cy - 0.38, z + 0.8)
        plate(c, f"盘B{i}", px, cy + 0.1, z + 0.8)
        if i % 2 == 0:
            cyl(f"杯{i}", (px + 0.2, cy - 0.32, z + 0.88), 0.055, 0.14, mat=M().brass, target=c, seg=8)
    jug(c, "酒壶", tx + 1.15, cy - 0.2, z + 0.8, 1.0)
    sph("面包", (tx - 0.45, cy - 0.15, z + 0.86), 0.13, M().thatch, c, seg=10, rings=7, scale=(1.3, 1, 0.8))
    for sx in (-1, 1):
        cyl(f"烛台{sx}", (tx + sx * 0.9, cy + 0.32, z + 0.9), 0.03, 0.26, mat=M().brass, target=c, seg=8)
        candle(c, f"桌烛{sx}", tx + sx * 0.9, cy + 0.32, z + 1.03, 0.3)
    # 高背主座
    chair(c, "主座", tx - 2.35, cy - 0.15, z, ang=math.pi / 2, mat=M().wood, tall=True)
    box("主座垫", (tx - 2.35, cy - 0.15, z + 0.52), (0.42, 0.42, 0.06), mat=M().carpet, target=c, bevel=0.02)
    # 吊灯
    cyl("吊灯链", (tx, cy, z + 3.35), 0.02, 1.4, mat=M().iron, target=c, seg=5)
    torus("吊灯环", (tx, cy, z + 2.62), 0.52, 0.035, mat=M().brass, target=c, maj=16, mnr=4)
    for i in range(8):
        a = TAU * i / 8
        candle(c, f"吊烛{i}", tx + math.cos(a) * 0.52, cy + math.sin(a) * 0.52, z + 2.62, 0.22)
    # 北墙挂毯
    for i, (gx, mt) in enumerate(((cx - 1.9, M().rose), (cx - 2.95, M().teal))):
        box(f"挂毯{i}", (gx, yb + 0.02, z + 2.35), (0.85, 0.05, 2.2), mat=mt, target=c, bevel=0.01)
        cyl(f"毯杆{i}", (gx, yb + 0.06, z + 3.48), 0.035, 1.0, rot=(0, math.pi / 2, 0),
            mat=M().gold, target=c, seg=8)
    # 书架（东墙）
    for k in range(3):
        box(f"书板{k}", (x1 - 0.18, cy + 0.6, z + 0.7 + k * 0.55), (0.34, 1.5, 0.05),
            mat=M().wood2, target=c, bevel=0.0)
        for i in range(11):
            box(f"书{k}_{i}", (x1 - 0.18, cy + 0.05 + i * 0.12, z + 0.85 + k * 0.55),
                (0.26, 0.07, 0.34), mat=[M().book1, M().book2, M().book3, M().book4][i % 4],
                target=c, bevel=0.0)
    # 酒桶与箱
    cyl("厅桶", (x1 - 0.7, cy - 1.6, z + 0.42), 0.32, 0.84, mat=M().wood, target=c, seg=12)
    box("木箱", (x1 - 0.8, cy - 0.9, z + 0.26), (0.6, 0.5, 0.52), mat=M().wood, target=c, bevel=0.03)
    # 角落的甲胄架
    ax, ay = x0 + 0.45, cy - 1.75
    box("甲胄_身", (ax, ay, z + 1.25), (0.42, 0.3, 0.7), mat=M().iron, target=c, bevel=0.06)
    sph("甲胄_盔", (ax, ay, z + 1.78), 0.19, M().iron, c, seg=10, rings=7, scale=(1, 1.1, 1.2))
    box("甲胄_矛", (ax + 0.3, ay, z + 1.2), (0.04, 0.04, 2.6), mat=M().wood2, target=c, bevel=0.0)
    # 狗
    sph("狗_身", (fx - 1.4, yb + 1.0, z + 0.3), 0.26, M().fox, c, seg=10, rings=7, scale=(1.5, 0.8, 0.75))
    sph("狗_头", (fx - 1.75, yb + 1.0, z + 0.42), 0.16, M().fox, c, seg=10, rings=7)
    # 窗侧烛光
    candle(c, "窗烛", x1 - 0.5, cy + 1.5, z + 1.6, 0.4)
    # 厅内补光（模拟从敞开面进来的天光）
    d = bpy.data.lights.new("厅内补光", "AREA")
    d.energy = 90
    d.color = (1.0, 0.92, 0.80)
    d.size = 5.0
    ob = bpy.data.objects.new("厅内补光", d)
    c.objects.link(ob)
    ob.location = (cx, cy + 2.4, z + 3.6)
    ob.rotation_euler = (math.radians(70), 0, 0)


# ------------------------------------------------------------------ 王座厅
def throne(c):
    kx, ky = KEEP_C
    z = KEEP_FZ
    # 地面
    cyl("王座厅地面", (kx, ky, z - 0.06), KEEP_R - 0.78, 0.12, mat=M().stone3, target=c, seg=40, bevel=0.0)
    ribbon("王座地毯", [(kx, ky + 3.2), (kx, ky - 2.1)], 1.5, z + 0.02, M().carpet, c, 0.0)
    # 台阶
    for i in range(3):
        box(f"台座{i}", (kx, ky - 2.35 - i * 0.28, z + 0.09 + i * 0.18),
            (3.0 - i * 0.2, 0.34, 0.18 + i * 0.02), mat=M().stone3, target=c, bevel=0.02)
    # 王座
    tz = z + 0.62
    box("王座_座", (kx, ky - 2.95, tz + 0.22), (1.05, 0.85, 0.24), mat=M().wood2, target=c, bevel=0.03)
    box("王座_垫", (kx, ky - 2.95, tz + 0.36), (0.9, 0.72, 0.1), mat=M().carpet, target=c, bevel=0.02)
    box("王座_背", (kx, ky - 3.32, tz + 1.1), (1.05, 0.16, 1.75), mat=M().wood2, target=c, bevel=0.04)
    box("王座_背垫", (kx, ky - 3.24, tz + 1.1), (0.82, 0.08, 1.5), mat=M().carpet, target=c, bevel=0.02)
    for sx in (-1, 1):
        box(f"王座_扶{sx}", (kx + sx * 0.52, ky - 2.95, tz + 0.5), (0.14, 0.8, 0.12),
            mat=M().wood2, target=c, bevel=0.02)
        cyl(f"王座_尖{sx}", (kx + sx * 0.48, ky - 3.3, tz + 2.02), 0.05, 0.24,
            mat=M().gold, target=c, seg=8)
    cyl("王座徽", (kx, ky - 3.22, tz + 1.62), 0.22, 0.05, rot=(math.pi / 2, 0, 0),
        mat=M().gold, target=c, seg=16, bevel=0.0)
    # 立柱
    for sx in (-1, 1):
        for sy in (-1, 1):
            px, py = kx + sx * 2.45, ky + sy * 1.55
            cyl(f"厅柱{sx}{sy}", (px, py, z + 2.9), 0.24, 5.8, mat=M().stone, target=c, seg=14, bevel=0.03)
            cyl(f"柱础{sx}{sy}", (px, py, z + 0.16), 0.36, 0.32, mat=M().stone3, target=c, seg=14)
            cyl(f"柱头{sx}{sy}", (px, py, z + 5.7), 0.38, 0.3, mat=M().stone3, target=c, seg=14)
    # 北墙彩窗
    cyl("彩窗", (kx, ky - KEEP_R + 0.95, z + 3.3), 1.05, 0.1, rot=(math.pi / 2, 0, 0),
        mat=M().glassr, target=c, seg=22, bevel=0.0)
    # 彩窗里的三色玻璃块
    for i, (ang0, rr, mt) in enumerate(((0.3, 0.62, M().glassb), (2.4, 0.62, M().glassw),
                                        (4.4, 0.62, M().glassr))):
        cyl(f"彩窗块{i}", (kx + math.cos(ang0) * rr, ky - KEEP_R + 0.88,
                          z + 3.3 + math.sin(ang0) * rr), 0.34, 0.08,
            rot=(math.pi / 2, 0, 0), mat=mt, target=c, seg=14, bevel=0.0)
    # 侧墙挂毯
    for sx in (-1, 1):
        box(f"王座挂毯{sx}", (kx + sx * (KEEP_R - 0.92), ky - 1.4, z + 2.2), (0.05, 1.0, 2.2),
            mat=M().teal if sx < 0 else M().rose, target=c, bevel=0.0)
    for i in range(6):
        a = TAU * i / 6
        box(f"彩窗棂{i}", (kx + math.cos(a) * 0.5, ky - KEEP_R + 0.9, z + 3.3 + math.sin(a) * 0.5),
            (0.95, 0.08, 0.08), rot=(0, a, 0), mat=M().stone3, target=c, bevel=0.0)
    # 壁挂旗
    for sx in (-1, 1):
        banner_vert(c, f"王旗{sx}", kx + sx * (KEEP_R - 0.95), ky + 0.2, z + 3.9, 1.0, 2.4,
                    math.pi / 2 * sx, M().red)
    # 火盆
    for sx in (-1, 1):
        px = kx + sx * 1.9
        cyl(f"火盆{sx}", (px, ky + 2.2, z + 0.55), 0.28, 0.9, mat=M().iron, target=c, seg=10)
        cyl(f"盆口{sx}", (px, ky + 2.2, z + 1.02), 0.36, 0.16, mat=M().iron, target=c, seg=12)
        fire(c, f"盆火{sx}", px, ky + 2.2, z + 1.05, 0.6)
    # 吊灯
    torus("王座吊灯", (kx, ky + 0.3, z + 5.4), 0.62, 0.04, mat=M().brass, target=c, maj=18, mnr=4)
    for i in range(8):
        a = TAU * i / 8
        candle(c, f"王座吊烛{i}", kx + math.cos(a) * 0.62, ky + 0.3 + math.sin(a) * 0.62, z + 5.4, 0.24)
    cyl("王座吊链", (kx, ky + 0.3, z + 6.1), 0.02, 1.2, mat=M().iron, target=c, seg=5)
    # 地图桌
    table(c, "地图桌", kx + 1.85, ky + 2.35, z, 1.1, 0.7, 0.76)
    box("地图", (kx + 1.85, ky + 2.35, z + 0.82), (0.85, 0.5, 0.02), mat=M().cream, target=c, bevel=0.0)
    candle(c, "地图烛", kx + 1.5, ky + 2.6, z + 0.84, 0.26)
    # 王座顶光
    d = bpy.data.lights.new("王座顶光", "SPOT")
    d.energy = 120
    d.color = (1.0, 0.86, 0.66)
    d.spot_size = 1.5
    d.spot_blend = 0.6
    ob = bpy.data.objects.new("王座顶光", d)
    c.objects.link(ob)
    ob.location = (kx, ky - 1.2, z + 8.6)
    ob.rotation_euler = (0, 0, 0)
    # 靠墙的木梯（贴着内壁，带扶手）
    for i in range(9):
        a = math.radians(196 + i * 9)
        sx, sy = kx + math.cos(a) * (KEEP_R - 1.15), ky + math.sin(a) * (KEEP_R - 1.15)
        box(f"厅梯{i}", (sx, sy, z + 0.3 + i * 0.52), (0.5, 0.66, 0.1),
            rot=(0, 0, a), mat=M().wood2, target=c, bevel=0.01)
    for i in range(0, 9, 3):
        a = math.radians(196 + i * 9)
        sx, sy = kx + math.cos(a) * (KEEP_R - 1.62), ky + math.sin(a) * (KEEP_R - 1.62)
        cyl(f"梯柱{i}", (sx, sy, z + 0.3 + i * 0.52 + 0.5), 0.04, 1.0, mat=M().wood2, target=c, seg=6)


def banner_vert(c, name, x, y, z, w, h, ang, mat):
    box(name, (x, y, z), (w, 0.04, h), rot=(0, 0, ang), mat=mat, target=c, bevel=0.0)
    box(name + "_杆", (x, y, z + h / 2 + 0.05), (w + 0.2, 0.07, 0.07), rot=(0, 0, ang),
        mat=M().gold, target=c, bevel=0.0)


# ------------------------------------------------------------------ 礼拜堂
def chapel(c):
    cx, cy, w, d = CHAPEL["cx"], CHAPEL["cy"], CHAPEL["w"], CHAPEL["d"]
    z = CHAP_FZ
    # 祭坛
    ay = cy - d / 2 + 0.9
    box("祭坛", (cx, ay, z + 0.45), (2.0, 0.7, 0.9), mat=M().stone3, target=c, bevel=0.03)
    box("祭坛布", (cx, ay, z + 0.93), (2.1, 0.78, 0.06), mat=M().cream, target=c, bevel=0.01)
    for sx in (-0.55, 0.55):
        cyl(f"祭烛{sx}", (cx + sx, ay, z + 1.0), 0.045, 0.34, mat=M().cream, target=c, seg=8)
        cone(f"祭焰{sx}", (cx + sx, ay, z + 1.42), 0.05, 0.0, 0.14, mat=M().fire, target=c, seg=6)
    box("十字", (cx, ay, z + 1.35), (0.1, 0.08, 0.6), mat=M().gold, target=c, bevel=0.0)
    box("十字横", (cx, ay, z + 1.45), (0.36, 0.08, 0.1), mat=M().gold, target=c, bevel=0.0)
    # 祭坛画
    box("祭坛画", (cx, cy - d / 2 + 0.32, z + 2.5), (1.5, 0.06, 1.4), mat=M().teal, target=c, bevel=0.01)
    box("祭坛画框", (cx, cy - d / 2 + 0.34, z + 2.5), (1.62, 0.05, 1.52), mat=M().gold, target=c, bevel=0.01)
    # 长椅
    for row in range(3):
        yy = cy - 0.4 - row * 0.85
        for sx in (-1, 1):
            xx = cx + sx * 0.95
            box(f"长椅{row}{sx}", (xx, yy, z + 0.44), (0.62, 0.3, 0.08), mat=M().wood2, target=c, bevel=0.01)
            box(f"椅背{row}{sx}", (xx, yy + 0.14, z + 0.72), (0.62, 0.06, 0.5), mat=M().wood2, target=c, bevel=0.01)
            for sy in (-1, 1):
                box(f"椅腿{row}{sx}{sy}", (xx, yy + sy * 0.12, z + 0.22), (0.56, 0.05, 0.44),
                    mat=M().wood2, target=c, bevel=0.0)
    # 中央通道地毯
    ribbon("礼拜毯", [(cx, cy + d / 2 - 0.6), (cx, cy - 1.2)], 0.8, z + 0.01, M().carpet, c, 0.0)
    # 烛台
    cyl("烛台柱", (cx - 1.6, cy + 0.4, z + 0.6), 0.06, 1.2, mat=M().iron, target=c, seg=8)
    for i in range(3):
        a = TAU * i / 3
        candle(c, f"祭台烛{i}", cx - 1.6 + math.cos(a) * 0.22, cy + 0.2 + math.sin(a) * 0.22, z + 1.2, 0.26)
    # 圣像龛
    box("圣龛", (cx, cy - d / 2 + 0.45, z + 1.55), (0.7, 0.3, 1.2), mat=M().stone3, target=c, bevel=0.02)
    sph("圣像", (cx, cy - d / 2 + 0.62, z + 1.55), 0.22, M().cream, c, seg=10, rings=8, scale=(0.8, 0.6, 1.6))
    # 吊灯
    cyl("礼拜灯链", (cx, cy, z + 3.5), 0.015, 1.0, mat=M().iron, target=c, seg=4)
    torus("礼拜灯", (cx, cy, z + 2.95), 0.3, 0.03, mat=M().brass, target=c, maj=12, mnr=4)
    for i in range(4):
        a = TAU * i / 4
        candle(c, f"礼拜烛{i}", cx + math.cos(a) * 0.3, cy + math.sin(a) * 0.3, z + 2.95, 0.2)
    # 从玫瑰窗投下的光斑
    cyl("窗光", (cx, cy + 0.2, z + 0.03), 1.1, 0.02, mat=M().glassr, target=c, seg=24, bevel=0.0)


# ------------------------------------------------------------------ 厨房
def kitchen(c):
    kx, ky = -6.6, -3.2
    z = WALL_Z + 0.05
    box("灶台", (kx - 0.3, ky - 0.85, z + 0.45), (1.4, 0.6, 0.9), mat=M().stone3, target=c, bevel=0.03)
    box("灶膛", (kx - 0.3, ky - 1.05, z + 0.45), (0.8, 0.3, 0.5), mat=M().dark, target=c, bevel=0.0)
    fire(c, "灶火", kx - 0.3, ky - 1.1, z + 0.25, 0.7)
    cyl("吊锅", (kx - 0.3, ky - 1.0, z + 0.95), 0.32, 0.36, mat=M().iron, target=c, seg=14, r2=0.28)
    for i in range(3):
        cyl(f"厨桶{i}", (kx + 0.9 - i * 0.35, ky - 0.6 + i * 0.3, z + 0.4), 0.24, 0.8,
            mat=M().wood, target=c, seg=10)
    # 挂草药
    for i in range(5):
        cone(f"草药{i}", (kx - 0.9 + i * 0.45, ky + 0.75, z + 2.3), 0.1, 0.0, 0.5,
             rot=(math.pi, 0, 0), mat=M().leaf3, target=c, seg=5)
    table(c, "厨台", kx + 0.6, ky + 0.4, z, 1.4, 0.7, 0.78)


def build():
    c = coll("03 城堡内部")
    hall(c)
    throne(c)
    chapel(c)
    kitchen(c)
    return c
