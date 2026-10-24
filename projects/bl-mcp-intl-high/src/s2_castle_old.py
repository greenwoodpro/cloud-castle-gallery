"""02 城堡外部：城墙、角楼、门楼、主堡、大厅、礼拜堂、庭院"""
import math
import random
import bmesh
import bpy
from mathutils import Vector, Euler

from lib import (R, TAU, coll, box, cyl, sph, ico, cone, torus, gable, arch,
                 empty, join, Batch, M, _mk)
from libx import (poly_prism, prism, wall_band, ribbon, lathe, rod, ring_pts,
                  arc_pts, strata, set_alpha)

C = (0.0, 2.0)
WALL_R = 11.0
WALL_H = 7.0
WALL_T = 1.1
WALL_Z = 9.0
WALL_TOP = WALL_Z + WALL_H

KEEP_C = (0.0, -1.0)
KEEP_R = 4.4
KEEP_TOP = 27.0

HALL = dict(cx=-6.5, cy=5.1, w=5.6, d=4.4, z=WALL_Z, h=4.6, roof=3.0)
CHAPEL = dict(cx=6.5, cy=4.7, w=4.2, d=5.4, z=WALL_Z, h=5.2, roof=3.2)
GATE_Y = 12.16

_rng = random.Random(515)


# ------------------------------------------------------------------ 小件
def merlon_line(name, p0, p1, z, mat=None, target=None, w=0.62, h=0.85, d=0.72, gap=0.55):
    x0, y0 = p0
    x1, y1 = p1
    L = math.hypot(x1 - x0, y1 - y0)
    ang = math.atan2(y1 - y0, x1 - x0)
    n = max(1, int(L / (w + gap)))
    step = L / n
    out = []
    for i in range(n):
        t = (i + 0.5) * step / L
        out.append(box(f"{name}_{i}", (x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, z + h / 2),
                       (w, d, h), rot=(0, 0, ang), mat=mat, target=target, bevel=0.025))
    return out


def banner(name, x, y, z, w, h, ang, mat, target, pole_h=0.0, wave=0.12):
    """带一点起伏的布旗"""
    bm = bmesh.new()
    nx, ny = 7, 5
    grid = []
    for j in range(ny):
        row = []
        for i in range(nx):
            u, v = i / (nx - 1), j / (ny - 1)
            xx = (u - 0.5) * w
            yy = -v * h
            zz = math.sin(u * 3.2 + v * 1.6) * wave * u
            row.append(bm.verts.new((xx, yy, zz)))
        grid.append(row)
    for j in range(ny - 1):
        for i in range(nx - 1):
            bm.faces.new([grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    ob = _mk(name, bm, (x, y, z), (math.pi / 2, 0, ang), mat, target, True, 0.0)
    if pole_h:
        cyl(name + "_杆", (x, y, z + pole_h / 2), 0.045, pole_h, mat=M().wood2, target=target, seg=8)
        sph(name + "_顶", (x, y, z + pole_h), 0.1, M().gold, target=target, seg=8, rings=6)
    return ob


def lantern(name, x, y, z, target, h=1.6, mat=None):
    cyl(name + "_杆", (x, y, z + h / 2), 0.05, h, mat=M().iron, target=target, seg=6)
    box(name + "_灯", (x, y, z + h + 0.14), (0.26, 0.26, 0.32), mat=mat or M().glassw, target=target, bevel=0.02)
    box(name + "_盖", (x, y, z + h + 0.34), (0.34, 0.34, 0.06), mat=M().iron, target=target, bevel=0.01)


def win(name, x, y, z, w, h, ang, target, lit=True, frame=True):
    """嵌在墙里的窗：深色窗洞 + 暖光 + 石框"""
    if frame:
        box(name + "_框", (x, y, z), (w + 0.24, 0.2, h + 0.22), rot=(0, 0, ang),
            mat=M().stone3, target=target, bevel=0.02)
        box(name + "_台", (x, y, z - h / 2 - 0.1), (w + 0.42, 0.4, 0.14), rot=(0, 0, ang),
            mat=M().stone3, target=target, bevel=0.02)
    box(name + "_洞", (x, y, z), (w, 0.34, h), rot=(0, 0, ang),
        mat=M().glassw if lit else M().dark, target=target, bevel=0.01)


def wall_with_arch(name, cx, cy, ang, length, height, thick, arch_w, arch_h, mat, target,
                   z0=0.0, strips=0.14):
    """带半圆拱洞的墙（沿局部 X 轴展开，ang 为墙的朝向）"""
    b = Batch(name, target)
    r = arch_w / 2.0
    spring = arch_h - r
    x = -length / 2.0
    while x < length / 2.0 - 1e-6:
        xc = min(x + strips / 2, length / 2.0)
        zz = 0.0
        if abs(xc) < r:
            zz = spring + math.sqrt(max(0.0, r * r - xc * xc))
        hgt = height - zz
        if hgt > 0.02:
            b.box((xc, 0, z0 + zz + hgt / 2), (min(strips, length / 2 - x) * 1.02, thick, hgt), mat=mat)
        x += strips
    ob = b.build()
    ob.rotation_euler = (0, 0, ang)
    ob.location = (cx, cy, 0)
    return ob


# ------------------------------------------------------------------ 城墙
def wall_polygon():
    pts = []
    for k in range(8):
        a = math.radians(22.5 + 45 * k)
        rr = WALL_R * (1.0 + 0.012 * math.sin(k * 2.7))
        pts.append((C[0] + math.cos(a) * rr, C[1] + math.sin(a) * rr))
    return pts


def build_wall(c):
    pts = wall_polygon()
    # 墙基
    for i in range(8):
        p0, p1 = pts[i], pts[(i + 1) % 8]
        if i == 1:      # 南面留给门楼
            continue
        mx, my = (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2
        L = math.hypot(p1[0] - p0[0], p1[1] - p0[1])
        ang = math.atan2(p1[1] - p0[1], p1[0] - p0[0])
        box(f"墙身_{i}", (mx, my, WALL_Z + WALL_H / 2), (L, WALL_T, WALL_H), rot=(0, 0, ang),
            mat=M().stone, target=c, bevel=0.05)
        box(f"墙基_{i}", (mx, my, WALL_Z + 0.35), (L + 0.1, WALL_T + 0.42, 0.7), rot=(0, 0, ang),
            mat=M().stone3, target=c, bevel=0.04)
        box(f"墙檐_{i}", (mx, my, WALL_TOP - 0.16), (L + 0.06, WALL_T + 0.3, 0.32), rot=(0, 0, ang),
            mat=M().stone3, target=c, bevel=0.03)
        # 垛口（外沿）
        ox, oy = math.cos(ang + math.pi / 2) * (WALL_T / 2 - 0.28), math.sin(ang + math.pi / 2) * (WALL_T / 2 - 0.28)
        merlon_line(f"垛_{i}", (p0[0] + ox, p0[1] + oy), (p1[0] + ox, p1[1] + oy),
                    WALL_TOP - 0.02, M().stone, c, d=0.62)
        # 内侧矮墙
        merlon_line(f"内垛_{i}", (p0[0] - ox, p0[1] - oy), (p1[0] - ox, p1[1] - oy),
                    WALL_TOP - 0.02, M().stone3, c, w=0.5, h=0.45, d=0.4, gap=1.2)
        # 箭孔
        for k in range(2):
            t = 0.32 + 0.36 * k
            wx = p0[0] + (p1[0] - p0[0]) * t
            wy = p0[1] + (p1[1] - p0[1]) * t
            nx, ny = -math.sin(ang), math.cos(ang)
            box(f"箭孔_{i}_{k}", (wx + nx * (WALL_T / 2 - 0.02), wy + ny * (WALL_T / 2 - 0.02), WALL_Z + 3.6),
                (0.16, 0.12, 1.5), rot=(0, 0, ang), mat=M().dark, target=c, bevel=0.0)
        # 墙面爬藤
        if i % 2 == 0:
            b = Batch(f"藤_{i}", c)
            for k in range(16):
                t = _rng.uniform(0.1, 0.9)
                wx = p0[0] + (p1[0] - p0[0]) * t
                wy = p0[1] + (p1[1] - p0[1]) * t
                nx, ny = -math.sin(ang), math.cos(ang)
                off = (WALL_T / 2 + 0.03) * (_rng.choice([1, -1]))
                b.ico((wx + nx * off, wy + ny * off, WALL_Z + _rng.uniform(0.4, 4.2)),
                      _rng.uniform(0.16, 0.34), M().moss, sub_=1, scale=(1, 0.5, 1))
            b.build(smooth=True)


def tower(c, name, x, y, z0, r, h, roof_mat, roof_h=None, flag=False, lit=True, seg=20):
    cyl(name, (x, y, z0 + h / 2), r, h, mat=M().stone, target=c, seg=seg, bevel=0.04)
    cyl(name + "_基", (x, y, z0 + 0.5), r + 0.22, 1.0, mat=M().stone3, target=c, seg=seg, bevel=0.03)
    # 檐口托石
    for i in range(10):
        a = TAU * i / 10
        box(f"{name}_托{i}", (x + math.cos(a) * (r + 0.18), y + math.sin(a) * (r + 0.18), z0 + h - 0.45),
            (0.32, 0.32, 0.42), rot=(0, 0, a), mat=M().stone3, target=c, bevel=0.02)
    rh = roof_h if roof_h is not None else r * 1.45
    cone(name + "_顶", (x, y, z0 + h + rh / 2), r + 0.42, 0.0, rh, mat=roof_mat, target=c, seg=seg)
    torus(name + "_檐", (x, y, z0 + h + 0.05), r + 0.36, 0.09, mat=M().stone3, target=c, maj=seg, mnr=5)
    sph(name + "_尖", (x, y, z0 + h + rh + 0.1), 0.14, M().gold, target=c, seg=8, rings=6)
    # 窗
    for k, (zz, ww) in enumerate(((0.42, 0.34), (0.62, 0.3), (0.78, 0.26))):
        a = math.radians(_rng.uniform(0, 360))
        wx, wy = x + math.cos(a) * r, y + math.sin(a) * r
        box(f"{name}_窗{k}", (wx, wy, z0 + h * zz), (ww, 0.2, ww * 2.2), rot=(0, 0, a),
            mat=M().glassw if (lit and k != 1) else M().dark, target=c, bevel=0.0)
    if flag:
        banner(f"{name}_旗", x + r * 0.2, y, z0 + h + rh + 0.2, 1.5, 2.2, 0.0, M().red, c, pole_h=1.4)


def build_towers(c):
    pts = wall_polygon()
    spec = {0: (2.35, 10.2, M().roofb, True), 3: (2.15, 11.8, M().roofp, False),
            5: (2.05, 9.0, M().roofg, False), 7: (2.25, 10.8, M().roofb, True)}
    for i, (r, h, rm, fl) in spec.items():
        p = pts[i]
        tower(c, f"角楼_{i}", p[0], p[1], WALL_Z, r, h, rm, flag=fl, seg=22)


# ------------------------------------------------------------------ 门楼
def build_gatehouse(c):
    """南门：双塔夹拱门，吊桥、闸门、火把"""
    ty = GATE_Y + 0.35
    for sx in (-1, 1):
        tower(c, f"门塔_{sx}", sx * 3.75, ty, WALL_Z, 2.55, 11.4, M().roofb, 3.3,
              flag=(sx > 0), seg=22)
    # 门墙（带拱洞）
    wall_with_arch("门洞墙", 0.0, ty, 0.0, 7.2, 7.4, 1.5, 3.0, 4.9, M().stone, c, z0=WALL_Z)
    # 拱券石
    b = Batch("拱券", c)
    for i in range(13):
        a = math.pi * i / 12
        b.box((math.cos(a) * 1.62, ty, WALL_Z + 3.42 + math.sin(a) * 1.62),
              (0.42, 1.62, 0.36), rot=(0, 0, a), mat=M().stone3)
    b.build()
    # 门楣与徽记
    box("门楣", (0, ty, WALL_Z + 5.3), (7.4, 1.72, 0.5), mat=M().stone3, target=c, bevel=0.04)
    cyl("门徽", (0, ty - 0.9, WALL_Z + 6.4), 0.55, 0.16, rot=(math.pi / 2, 0, 0),
        mat=M().gold, target=c, seg=20, bevel=0.02)
    # 木门（半开）
    for sx, ang in ((-1, 0.55), (1, -0.55)):
        box(f"门扇_{sx}", (sx * 0.95, ty - 0.72, WALL_Z + 1.65), (1.5, 0.16, 3.3),
            rot=(0, 0, ang), mat=M().wood2, target=c, bevel=0.03)
        for k in range(3):
            box(f"门铁_{sx}_{k}", (sx * 0.95, ty - 0.8, WALL_Z + 0.55 + k * 1.1), (1.35, 0.1, 0.1),
                rot=(0, 0, ang), mat=M().iron, target=c, bevel=0.0)
    # 闸门
    b = Batch("闸门", c)
    for i in range(7):
        b.box((-1.35 + i * 0.45, ty + 0.3, WALL_Z + 2.3), (0.1, 0.1, 4.2), mat=M().iron)
    for j in range(4):
        b.box((0, ty + 0.3, WALL_Z + 0.9 + j * 0.95), (3.0, 0.12, 0.1), mat=M().iron)
    b.build()
    # 门前吊桥（收起状态，贴在门洞上方）
    for i in range(7):
        box(f"吊板_{i}", (0, ty - 0.86, WALL_Z + 5.9 + i * 0.42), (3.1, 0.1, 0.36),
            mat=M().wood, target=c, bevel=0.01)
    # 火把
    for sx in (-1.6, 1.6):
        lantern(f"门火_{sx}", sx, ty - 1.0, WALL_Z + 3.0, c, h=1.1, mat=M().fire)
    # 门楣上的小阳台
    box("门楼阳台", (0, ty - 0.95, WALL_Z + 6.05), (4.2, 0.9, 0.18), mat=M().stone3, target=c, bevel=0.03)
    merlon_line("阳台垛", (-2.1, ty - 1.35), (2.1, ty - 1.35), WALL_Z + 6.14, M().stone, c,
                w=0.4, h=0.55, d=0.34, gap=0.36)
    # 门楼旗
    banner("门楼旗", 0, ty - 1.0, WALL_Z + 7.2, 1.7, 2.6, 0.0, M().red, c, pole_h=0.2)


# ------------------------------------------------------------------ 主堡
def build_keep(c):
    kx, ky = KEEP_C
    # 台基
    lathe("主堡台基", [(KEEP_R + 1.0, 0.0), (KEEP_R + 1.0, 0.9), (KEEP_R + 0.7, 1.25),
                      (KEEP_R + 0.05, 1.25)], 8, M().stone3, c, loc=(kx, ky, WALL_Z), smooth=False)
    # C 形墙：开口朝南（+Y），从 30° 到 150° 是缺口
    wall_band("主堡墙", kx, ky, KEEP_R - 0.75, KEEP_R, 150, 390, WALL_Z + 1.25, WALL_Z + 12.4,
              M().stone, c, seg=60)
    # 内壁一层浅色
    wall_band("主堡内衬", kx, ky, KEEP_R - 0.82, KEEP_R - 0.74, 152, 388, WALL_Z + 1.3, WALL_Z + 12.2,
              M().plaster, c, seg=60)
    # 楼板（二层的木地板）
    wall_band("主堡廊台", kx, ky, KEEP_R - 2.5, KEEP_R - 0.8, 150, 390,
              WALL_Z + 7.4, WALL_Z + 7.6, M().plank, c, seg=48)
    # 束腰线脚
    for zz in (WALL_Z + 4.6, WALL_Z + 7.3):
        torus(f"主堡线脚{zz}", (kx, ky, zz), KEEP_R + 0.06, 0.09, mat=M().stone3, target=c, maj=44, mnr=6)
    # 上段塔身
    cyl("主堡上段", (kx, ky, WALL_Z + 15.1), KEEP_R - 0.55, 5.4, mat=M().stone, target=c, seg=30, bevel=0.04)
    for i in range(16):
        a = TAU * i / 16
        box(f"主堡托{i}", (kx + math.cos(a) * (KEEP_R - 0.35), ky + math.sin(a) * (KEEP_R - 0.35),
                          WALL_Z + 12.45), (0.3, 0.34, 0.5), rot=(0, 0, a), mat=M().stone3, target=c, bevel=0.02)
    # 上段窗
    for i in range(8):
        a = TAU * i / 8 + 0.2
        wx, wy = kx + math.cos(a) * (KEEP_R - 0.55), ky + math.sin(a) * (KEEP_R - 0.55)
        win(f"主堡窗{i}", wx, wy, WALL_Z + 15.2, 0.62, 1.9, a, c, lit=(i % 3 != 1))
    # 檐口 + 锥顶
    torus("主堡檐", (kx, ky, WALL_Z + 17.85), KEEP_R + 0.1, 0.12, mat=M().stone3, target=c, maj=44, mnr=6)
    cone("主堡顶", (kx, ky, WALL_Z + 20.9), KEEP_R + 0.62, 0.0, 6.2, mat=M().roofb, target=c, seg=32)
    sph("主堡尖", (kx, ky, WALL_Z + 24.1), 0.22, M().gold, target=c, seg=10, rings=8)
    cyl("主堡杆", (kx, ky, WALL_Z + 25.2), 0.05, 2.2, mat=M().iron, target=c, seg=6)
    banner("主堡旗", kx + 0.15, ky, WALL_Z + 25.0, 1.9, 2.9, 0.0, M().red, c)
    # 扶壁
    for i in range(6):
        a = math.radians(150 + 40 * i)
        bx, by = kx + math.cos(a) * (KEEP_R + 0.18), ky + math.sin(a) * (KEEP_R + 0.18)
        box(f"扶壁{i}", (bx, by, WALL_Z + 5.6), (0.62, 0.55, 9.2), rot=(0, 0, a), mat=M().stone3,
            target=c, bevel=0.05)
    # 外挂楼梯塔
    tower(c, "梯塔", kx - KEEP_R - 0.55, ky - 0.8, WALL_Z, 1.55, 15.6, M().roofb, 2.6, seg=16)
    # 主堡南面开口两侧的壁柱与拱
    for sx in (-1, 1):
        box(f"主堡壁柱{sx}", (sx * 2.05, ky + 3.15, WALL_Z + 6.8), (0.7, 0.8, 11.0),
            mat=M().stone3, target=c, bevel=0.05)
        box(f"主堡柱头{sx}", (sx * 2.05, ky + 3.15, WALL_Z + 12.2), (0.9, 1.0, 0.4),
            mat=M().stone3, target=c, bevel=0.04)


# ------------------------------------------------------------------ 大厅
def build_hall(c):
    """主厅：南面敞开（剖视），只留北坡屋顶与山墙"""
    h = HALL
    cx, cy, w, d, z, hh = h["cx"], h["cy"], h["w"], h["d"], h["z"], h["h"]
    x0, x1 = cx - w / 2, cx + w / 2
    y0, y1 = cy - d / 2, cy + d / 2
    # 地板（抬高两级）
    box("大厅台基", (cx, cy, z + 0.22), (w + 0.7, d + 0.7, 0.44), mat=M().stone3, target=c, bevel=0.04)
    box("大厅地板", (cx, cy, z + 0.46), (w, d, 0.08), mat=M().plank, target=c, bevel=0.0)
    # 北墙
    box("大厅北墙", (cx, y1, z + 0.44 + hh / 2), (w, 0.55, hh), mat=M().stone, target=c, bevel=0.05)
    # 东西山墙
    for sx, xx in (("w", x0), ("e", x1)):
        box(f"大厅山墙_{sx}", (xx, cy, z + 0.44 + hh / 2), (0.55, d, hh), mat=M().stone, target=c, bevel=0.05)
        # 山尖三角
        gable(f"大厅山尖_{sx}", (xx, cy, z + 0.44 + hh), d, 0.55, h["roof"], rot=(0, 0, math.pi / 2),
              mat=M().stone, target=c)
    # 屋顶：只做北坡 + 屋脊梁
    L = math.hypot(d / 2, h["roof"])
    box("大厅屋脊", (cx, cy, z + 0.44 + hh + h["roof"]), (w + 0.5, 0.34, 0.34), mat=M().wood2, target=c, bevel=0.03)
    ang = -math.atan2(h["roof"], d / 2)
    box("大厅北坡", (cx, cy + d / 4, z + 0.44 + hh + h["roof"] / 2), (w + 0.7, L + 0.3, 0.22),
        rot=(ang, 0, 0), mat=M().roofp, target=c, bevel=0.02)
    # 檩条
    for i in range(6):
        xx = x0 + 0.5 + i * (w - 1.0) / 5
        box(f"椽_{i}", (xx, cy + d / 4, z + 0.44 + hh + h["roof"] / 2 - 0.12),
            (0.14, L + 0.2, 0.16), rot=(ang, 0, 0), mat=M().wood2, target=c, bevel=0.0)
    # 剖切处的木构架：柱与梁
    for i in range(4):
        xx = x0 + 0.35 + i * (w - 0.7) / 3
        box(f"剖柱_{i}", (xx, y0 + 0.1, z + 0.44 + hh / 2), (0.24, 0.24, hh), mat=M().wood2, target=c, bevel=0.02)
        box(f"剖梁_{i}", (xx, y0 + 0.1, z + 0.44 + hh - 0.16), (0.2, d, 0.24), mat=M().wood2, target=c, bevel=0.02)
    # 烟囱
    box("大厅烟囱", (cx + 2.2, y1 + 0.1, z + 0.44 + hh + 2.2), (0.95, 0.95, 4.6), mat=M().stone3, target=c, bevel=0.04)
    box("烟囱帽", (cx + 2.2, y1 + 0.1, z + 0.44 + hh + 4.6), (1.2, 1.2, 0.22), mat=M().stone3, target=c, bevel=0.03)
    # 窗（东西山墙）
    win("大厅东窗", x1 + 0.02, cy, z + 2.6, 0.9, 1.8, math.pi / 2, c, lit=True)


# ------------------------------------------------------------------ 礼拜堂
def build_chapel(c):
    h = CHAPEL
    cx, cy, w, d, z, hh = h["cx"], h["cy"], h["w"], h["d"], h["z"], h["h"]
    x0, x1 = cx - w / 2, cx + w / 2
    y0, y1 = cy - d / 2, cy + d / 2
    box("礼拜堂台基", (cx, cy, z + 0.2), (w + 0.5, d + 0.5, 0.4), mat=M().stone3, target=c, bevel=0.04)
    box("礼拜堂地板", (cx, cy, z + 0.42), (w, d, 0.06), mat=M().stone3, target=c, bevel=0.0)
    # 北墙 / 东西墙
    box("礼拜堂北墙", (cx, y1, z + 0.4 + hh / 2), (w, 0.55, hh), mat=M().stone, target=c, bevel=0.05)
    for xx in (x0, x1):
        box("礼拜堂侧墙", (xx, cy, z + 0.4 + hh / 2), (0.55, d, hh), mat=M().stone, target=c, bevel=0.05)
    # 南墙：下部大开拱，上部玫瑰窗
    wall_with_arch("礼拜堂南墙", cx, y0, 0.0, w, hh, 0.5, 2.9, 4.4, M().stone, c, z0=z + 0.4)
    # 山墙 + 屋顶
    gable("礼拜堂山尖", (cx, y0, z + 0.4 + hh), w, 0.55, h["roof"], mat=M().stone, target=c)
    gable("礼拜堂山尖N", (cx, y1, z + 0.4 + hh), w, 0.55, h["roof"], mat=M().stone, target=c)
    ang = math.atan2(h["roof"], w / 2)
    L = math.hypot(w / 2, h["roof"])
    for sx in (-1, 1):
        box(f"礼拜堂屋面{sx}", (cx + sx * w / 4, cy, z + 0.4 + hh + h["roof"] / 2),
            (L + 0.35, d + 0.5, 0.2), rot=(0, sx * ang, 0), mat=M().roofg, target=c, bevel=0.02)
    # 玫瑰窗
    cyl("玫瑰窗", (cx, y0 - 0.28, z + 0.4 + hh + 0.9), 1.15, 0.14, rot=(math.pi / 2, 0, 0),
        mat=M().glassr, target=c, seg=24, bevel=0.0)
    torus("玫瑰窗框", (cx, y0 - 0.3, z + 0.4 + hh + 0.9), 1.18, 0.12,
          rot=(math.pi / 2, 0, 0), mat=M().stone3, target=c, maj=28, mnr=6)
    b = Batch("窗棂", c)
    for i in range(6):
        a = TAU * i / 6
        b.box((cx + math.cos(a) * 0.55, y0 - 0.34, z + 0.4 + hh + 0.9 + math.sin(a) * 0.55),
              (1.05, 0.1, 0.09), rot=(0, a, 0), mat=M().stone3)
    b.build()
    # 钟塔（小）
    box("钟塔", (cx + w / 2 + 0.15, y1 - 0.4, z + 0.4 + hh + 2.0), (1.1, 1.1, 3.4), mat=M().stone, target=c, bevel=0.04)
    cone("钟塔顶", (cx + w / 2 + 0.15, y1 - 0.4, z + 0.4 + hh + 4.4), 0.95, 0.0, 1.7, mat=M().roofb, target=c, seg=12)
    sph("钟", (cx + w / 2 + 0.15, y1 - 0.4, z + 0.4 + hh + 2.4), 0.4, M().brass, target=c, seg=12, rings=8)


# ------------------------------------------------------------------ 附屋
def build_annex(c):
    # 厨房（北墙内侧）
    box("厨房", (-6.6, -3.2, WALL_Z + 1.9), (2.8, 2.4, 3.8), mat=M().plaster, target=c, bevel=0.05)
    gable("厨房顶", (-6.6, -3.2, WALL_Z + 3.8), 3.0, 2.7, 1.5, mat=M().thatch, target=c)
    box("厨房烟囱", (-5.6, -3.9, WALL_Z + 4.6), (0.55, 0.55, 2.6), mat=M().stone3, target=c, bevel=0.03)
    # 马厩（东侧）
    box("马厩", (6.0, -3.0, WALL_Z + 1.5), (3.0, 2.2, 3.0), mat=M().plaster, target=c, bevel=0.05)
    gable("马厩顶", (6.0, -3.0, WALL_Z + 3.0), 3.2, 2.5, 1.2, rot=(0, 0, 0), mat=M().thatch, target=c)
    for i in range(3):
        box(f"马厩柱{i}", (4.7 + i * 1.35, -4.05, WALL_Z + 0.8), (0.16, 0.16, 1.6), mat=M().wood2, target=c, bevel=0.01)
    # 铁匠铺（西侧，靠墙）
    box("铁匠铺", (-8.3, 1.6, WALL_Z + 1.4), (2.2, 2.0, 2.8), mat=M().stone3, target=c, bevel=0.04)
    gable("铁匠铺顶", (-8.3, 1.6, WALL_Z + 2.8), 2.4, 2.3, 1.0, mat=M().roofb, target=c)


# ------------------------------------------------------------------ 庭院
def build_courtyard(c):
    # 铺地
    pts = ring_pts(C[0], C[1], 10.3, 40, 0.008, seed=31)
    poly_prism("庭院铺地", pts, WALL_Z + 0.02, WALL_Z + 0.1, M().stone3, c, 0.0)
    b = Batch("铺地石", c)
    for i in range(260):
        a = _rng.uniform(0, TAU)
        rr = 10.1 * math.sqrt(_rng.random())
        x, y = C[0] + math.cos(a) * rr, C[1] + math.sin(a) * rr
        if math.hypot(x - KEEP_C[0], y - KEEP_C[1]) < KEEP_R + 0.9:
            continue
        b.box((x, y, WALL_Z + 0.11), (_rng.uniform(0.4, 0.75), _rng.uniform(0.35, 0.6), 0.06),
              rot=(0, 0, _rng.uniform(0, TAU)), mat=M().stone3 if _rng.random() < 0.6 else M().stone)
    b.build()
    # 井
    jx, jy = 0.6, 8.0
    cyl("井圈", (jx, jy, WALL_Z + 0.6), 0.95, 1.2, mat=M().stone3, target=c, seg=18, bevel=0.04)
    cyl("井水", (jx, jy, WALL_Z + 0.55), 0.72, 0.05, mat=M().waterd, target=c, seg=18, bevel=0.0)
    for sx in (-1, 1):
        box(f"井柱{sx}", (jx + sx * 0.8, jy, WALL_Z + 1.7), (0.14, 0.14, 2.2), mat=M().wood2, target=c, bevel=0.01)
    gable("井棚", (jx, jy, WALL_Z + 2.8), 2.4, 1.8, 0.8, mat=M().roofb, target=c)
    cyl("辘轳", (jx, jy, WALL_Z + 2.3), 0.12, 1.6, rot=(0, math.pi / 2, 0), mat=M().wood2, target=c, seg=10)
    # 市集摊
    bp = Batch("摊货", c)
    for i, (sx, sy) in enumerate(((-2.6, 9.4), (-3.4, 6.4), (2.9, 9.1))):
        box(f"摊台{i}", (sx, sy, WALL_Z + 0.55), (1.9, 0.8, 0.14), mat=M().wood, target=c, bevel=0.02)
        for dx in (-0.8, 0.8):
            box(f"摊腿{i}_{dx}", (sx + dx, sy, WALL_Z + 0.3), (0.12, 0.12, 0.6), mat=M().wood2, target=c, bevel=0.01)
        gable(f"摊棚{i}", (sx, sy, WALL_Z + 1.5), 2.2, 1.3, 0.55, mat=M().red if i % 2 == 0 else M().teal, target=c)
        for k in range(5):
            bp.sphere((sx - 0.7 + k * 0.35, sy + _rng.uniform(-0.2, 0.2), WALL_Z + 0.68),
                      _rng.uniform(0.09, 0.16), M().rosep if k % 2 else M().leaf4, seg=7, rings=5)
    bp.build()
    # 木桶 / 货箱 / 手推车
    for i in range(7):
        a = _rng.uniform(0, TAU)
        rr = _rng.uniform(5.5, 9.0)
        x, y = C[0] + math.cos(a) * rr, C[1] + math.sin(a) * rr
        if abs(x) < 1.6 and y > 7:
            continue
        cyl(f"桶{i}", (x, y, WALL_Z + 0.45), 0.36, 0.9, mat=M().wood, target=c, seg=12, bevel=0.02)
        torus(f"桶箍{i}", (x, y, WALL_Z + 0.72), 0.37, 0.035, mat=M().iron, target=c, maj=14, mnr=4)
    # 灯柱
    for x, y in ((-1.9, 11.0), (2.1, 10.6), (-3.9, 4.2), (3.9, 3.6)):
        lantern(f"庭院灯{x}_{y}", x, y, WALL_Z + 0.1, c, h=1.9)
    # 庭院大树
    trunk = cyl("庭院树干", (2.2, 3.0, WALL_Z + 1.6), 0.26, 3.2, mat=M().bark, target=c, seg=10, r2=0.2, bevel=0.0)
    for i, (dx, dy, dz, r) in enumerate(((0, 0, 4.6, 1.7), (-0.9, 0.4, 4.1, 1.2), (0.9, -0.3, 4.2, 1.15),
                                        (0.2, 0.9, 3.9, 1.0))):
        sph(f"庭院树冠{i}", (2.2 + dx * 0.7, 3.0 + dy * 0.7, WALL_Z + dz - 0.5), r * 0.62, M().leaf2, c, seg=12, rings=8,
            scale=(1, 1, 0.85))


def build():
    c = coll("02 城堡")
    build_wall(c)
    build_towers(c)
    build_gatehouse(c)
    build_keep(c)
    build_hall(c)
    build_chapel(c)
    build_annex(c)
    build_courtyard(c)
    return c
