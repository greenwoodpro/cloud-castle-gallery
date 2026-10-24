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
WALL_R = 10.8
WALL_H = 7.6
WALL_T = 0.95
WALL_Z = 9.0
WALL_TOP = WALL_Z + WALL_H

KEEP_C = (0.0, -1.0)
KEEP_R = 4.2
KEEP_TOP = 30.6

HALL = dict(cx=-6.4, cy=5.2, w=5.8, d=4.6, z=WALL_Z, h=4.6, roof=3.0)
CHAPEL = dict(cx=6.4, cy=4.9, w=4.2, d=5.4, z=WALL_Z, h=5.2, roof=3.2)
GATE_Y = 11.94

_rng = random.Random(515)


# ------------------------------------------------------------------ 小件
def merlon_line(name, p0, p1, z, mat=None, target=None, w=0.6, h=0.85, d=0.62, gap=0.52):
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
    bm = bmesh.new()
    nx, ny = 7, 5
    grid = []
    for j in range(ny):
        row = []
        for i in range(nx):
            u, v = i / (nx - 1), j / (ny - 1)
            row.append(bm.verts.new(((u - 0.5) * w, -v * h, math.sin(u * 3.2 + v * 1.6) * wave * u)))
        grid.append(row)
    for j in range(ny - 1):
        for i in range(nx - 1):
            bm.faces.new([grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    ob = _mk(name, bm, (x, y, z), (math.pi / 2, 0, ang), mat, target, True, 0.0)
    if pole_h:
        cyl(name + "_杆", (x, y, z + pole_h / 2), 0.04, pole_h, mat=M().wood2, target=target, seg=8)
        sph(name + "_顶", (x, y, z + pole_h), 0.09, M().gold, target=target, seg=8, rings=6)
    return ob


def lantern(name, x, y, z, target, h=1.6, mat=None):
    cyl(name + "_杆", (x, y, z + h / 2), 0.05, h, mat=M().iron, target=target, seg=6)
    box(name + "_灯", (x, y, z + h + 0.14), (0.24, 0.24, 0.3), mat=mat or M().glassw, target=target, bevel=0.02)
    box(name + "_盖", (x, y, z + h + 0.32), (0.32, 0.32, 0.06), mat=M().iron, target=target, bevel=0.01)


def win(name, x, y, z, w, h, ang, target, lit=True, frame=True):
    if frame:
        box(name + "_框", (x, y, z), (w + 0.24, 0.18, h + 0.22), rot=(0, 0, ang),
            mat=M().stone3, target=target, bevel=0.02)
        box(name + "_台", (x, y, z - h / 2 - 0.1), (w + 0.4, 0.36, 0.13), rot=(0, 0, ang),
            mat=M().stone3, target=target, bevel=0.02)
    box(name + "_洞", (x, y, z), (w, 0.32, h), rot=(0, 0, ang),
        mat=M().glassw if lit else M().dark, target=target, bevel=0.01)


def wall_with_arch(name, cx, cy, ang, length, height, thick, arch_w, arch_h, mat, target,
                   z0=0.0, strips=0.12):
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
    for i in range(8):
        p0, p1 = pts[i], pts[(i + 1) % 8]
        if i == 1:
            continue
        mx, my = (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2
        L = math.hypot(p1[0] - p0[0], p1[1] - p0[1])
        ang = math.atan2(p1[1] - p0[1], p1[0] - p0[0])
        box(f"墙身_{i}", (mx, my, WALL_Z + WALL_H / 2), (L, WALL_T, WALL_H), rot=(0, 0, ang),
            mat=M().stone, target=c, bevel=0.05)
        box(f"墙基_{i}", (mx, my, WALL_Z + 0.32), (L + 0.1, WALL_T + 0.34, 0.64), rot=(0, 0, ang),
            mat=M().stone3, target=c, bevel=0.04)
        box(f"墙檐_{i}", (mx, my, WALL_TOP - 0.14), (L + 0.06, WALL_T + 0.26, 0.28), rot=(0, 0, ang),
            mat=M().stone3, target=c, bevel=0.03)
        ox = math.cos(ang + math.pi / 2) * (WALL_T / 2 - 0.24)
        oy = math.sin(ang + math.pi / 2) * (WALL_T / 2 - 0.24)
        merlon_line(f"垛_{i}", (p0[0] + ox, p0[1] + oy), (p1[0] + ox, p1[1] + oy),
                    WALL_TOP - 0.02, M().stone, c, d=0.56)
        merlon_line(f"内垛_{i}", (p0[0] - ox, p0[1] - oy), (p1[0] - ox, p1[1] - oy),
                    WALL_TOP - 0.02, M().stone3, c, w=0.46, h=0.42, d=0.34, gap=1.3)
        for k in range(2):
            t = 0.3 + 0.4 * k
            wx = p0[0] + (p1[0] - p0[0]) * t
            wy = p0[1] + (p1[1] - p0[1]) * t
            nx, ny = -math.sin(ang), math.cos(ang)
            box(f"箭孔_{i}_{k}", (wx + nx * (WALL_T / 2 - 0.02), wy + ny * (WALL_T / 2 - 0.02),
                                 WALL_Z + 4.0), (0.15, 0.12, 1.6), rot=(0, 0, ang),
                mat=M().dark, target=c, bevel=0.0)
        # 外墙挂旗
        if i in (0, 3, 5, 7):
            nx, ny = -math.sin(ang), math.cos(ang)
            bx = mx + nx * (WALL_T / 2 + 0.12)
            by = my + ny * (WALL_T / 2 + 0.12)
            banner(f"墙旗_{i}", bx, by, WALL_Z + 6.4, 1.1, 1.8, ang + math.pi / 2,
                   M().red if i % 2 == 0 else M().teal, c)
        if i % 2 == 0:
            b = Batch(f"藤_{i}", c)
            for k in range(18):
                t = _rng.uniform(0.08, 0.92)
                wx = p0[0] + (p1[0] - p0[0]) * t
                wy = p0[1] + (p1[1] - p0[1]) * t
                nx, ny = -math.sin(ang), math.cos(ang)
                off = (WALL_T / 2 + 0.03) * _rng.choice([1, -1])
                b.ico((wx + nx * off, wy + ny * off, WALL_Z + _rng.uniform(0.4, 5.2)),
                      _rng.uniform(0.14, 0.3), M().moss, sub_=1, scale=(1, 0.5, 1))
            b.build(smooth=True)


def tower(c, name, x, y, z0, r, h, roof_mat, roof_h=None, flag=False, lit=True, seg=20):
    cyl(name, (x, y, z0 + h / 2), r, h, mat=M().stone, target=c, seg=seg, bevel=0.04)
    cyl(name + "_基", (x, y, z0 + 0.45), r + 0.18, 0.9, mat=M().stone3, target=c, seg=seg, bevel=0.03)
    for i in range(8):
        a = TAU * i / 8
        box(f"{name}_托{i}", (x + math.cos(a) * (r + 0.12), y + math.sin(a) * (r + 0.12), z0 + h - 0.4),
            (0.26, 0.28, 0.36), rot=(0, 0, a), mat=M().stone3, target=c, bevel=0.02)
    rh = roof_h if roof_h is not None else r * 1.5
    cone(name + "_顶", (x, y, z0 + h + rh / 2), r + 0.3, 0.0, rh, mat=roof_mat, target=c, seg=seg)
    torus(name + "_檐", (x, y, z0 + h + 0.03), r + 0.26, 0.075, mat=M().stone3, target=c, maj=seg, mnr=5)
    sph(name + "_尖", (x, y, z0 + h + rh + 0.08), 0.12, M().gold, target=c, seg=8, rings=6)
    for k, zz in enumerate((0.45, 0.72)):
        a = math.radians(_rng.uniform(0, 360))
        wx, wy = x + math.cos(a) * r, y + math.sin(a) * r
        box(f"{name}_窗{k}", (wx, wy, z0 + h * zz), (0.3, 0.18, 0.66), rot=(0, 0, a),
            mat=M().glassw if lit else M().dark, target=c, bevel=0.0)
    if flag:
        banner(f"{name}_旗", x + r * 0.1, y, z0 + h + rh + 0.15, 1.3, 1.9, 0.0, M().red, c, pole_h=1.2)


def build_towers(c):
    pts = wall_polygon()
    spec = {0: (1.8, 10.4, M().roofb, True), 3: (1.65, 12.0, M().roofp, False),
            5: (1.6, 9.2, M().roofg, False), 7: (1.75, 11.0, M().roofb, True)}
    for i, (r, h, rm, fl) in spec.items():
        p = pts[i]
        tower(c, f"角楼_{i}", p[0], p[1], WALL_Z, r, h, rm, flag=fl, seg=22)


# ------------------------------------------------------------------ 门楼
def build_gatehouse(c):
    ty = GATE_Y
    gw, gh, gd = 6.6, 9.0, 2.4
    wall_with_arch("门楼体", 0.0, ty, 0.0, gw, gh, gd, 2.9, 4.8, M().stone, c, z0=WALL_Z)
    b = Batch("拱券", c)
    for i in range(15):
        a = math.pi * i / 14
        b.box((math.cos(a) * 1.62, ty - gd / 2 - 0.02, WALL_Z + 3.34 + math.sin(a) * 1.62),
              (0.4, 0.3, 0.34), rot=(0, 0, a), mat=M().stone3)
    b.build()
    box("门楼檐", (0, ty, WALL_Z + gh - 0.1), (gw + 0.5, gd + 0.5, 0.3), mat=M().stone3, target=c, bevel=0.03)
    merlon_line("门楼垛", (-gw / 2 + 0.2, ty - gd / 2 - 0.1), (gw / 2 - 0.2, ty - gd / 2 - 0.1),
                WALL_Z + gh + 0.05, M().stone, c, w=0.55, h=0.85, d=0.5, gap=0.5)
    merlon_line("门楼垛后", (-gw / 2 + 0.2, ty + gd / 2 + 0.1), (gw / 2 - 0.2, ty + gd / 2 + 0.1),
                WALL_Z + gh + 0.05, M().stone, c, w=0.55, h=0.85, d=0.5, gap=0.5)
    for sx in (-1, 1):
        tower(c, f"门塔_{sx}", sx * (gw / 2 + 0.55), ty, WALL_Z, 1.35, 12.4, M().roofb, 2.5,
              flag=(sx > 0), seg=18)
    for sx, ang in ((-1, 0.6), (1, -0.6)):
        box(f"门扇_{sx}", (sx * 0.92, ty - 0.55, WALL_Z + 1.6), (1.42, 0.14, 3.2),
            rot=(0, 0, ang), mat=M().wood2, target=c, bevel=0.03)
    b = Batch("闸门", c)
    for i in range(7):
        b.box((-1.3 + i * 0.43, ty + 0.4, WALL_Z + 2.3), (0.09, 0.09, 4.2), mat=M().iron)
    for j in range(4):
        b.box((0, ty + 0.4, WALL_Z + 0.9 + j * 0.95), (2.9, 0.1, 0.09), mat=M().iron)
    b.build()
    cyl("门徽", (0, ty - gd / 2 - 0.1, WALL_Z + 5.9), 0.5, 0.14, rot=(math.pi / 2, 0, 0),
        mat=M().gold, target=c, seg=20, bevel=0.02)
    banner("门楼旗", 0, ty - 0.2, WALL_Z + gh + 0.9, 1.5, 2.3, 0.0, M().red, c, pole_h=0.3)
    for sx in (-1.7, 1.7):
        lantern(f"门火_{sx}", sx, ty - gd / 2 - 0.35, WALL_Z + 2.9, c, h=1.1, mat=M().fire)
    # 门外的前台：一段悬在崖上的石台，接大阶梯
    plat = [(-3.4, ty + gd / 2), (3.4, ty + gd / 2), (3.1, 15.6), (-3.1, 15.6)]
    poly_prism("门前台", plat, WALL_Z - 2.6, WALL_Z + 0.02, M().stone3, c, 0.0)
    poly_prism("门前台面", plat, WALL_Z + 0.0, WALL_Z + 0.12, M().stone, c, 0.0)
    b = Batch("门前台垛", c)
    for i in range(6):
        b.box((-3.0 + i * 1.2, 15.55, WALL_Z + 0.45), (0.6, 0.24, 0.7), mat=M().stone)
    b.build()
    # 台下的扶壁
    for sx in (-1, 1):
        box(f"台扶壁{sx}", (sx * 2.6, 14.4, WALL_Z - 1.4), (1.0, 2.6, 2.8), mat=M().stone3,
            target=c, bevel=0.06)


# ------------------------------------------------------------------ 主堡
def build_keep(c):
    kx, ky = KEEP_C
    lathe("主堡台基", [(KEEP_R + 0.9, 0.0), (KEEP_R + 0.9, 0.8), (KEEP_R + 0.6, 1.2),
                      (KEEP_R + 0.02, 1.2)], 8, M().stone3, c, loc=(kx, ky, WALL_Z), smooth=False)
    wall_band("主堡墙", kx, ky, KEEP_R - 0.72, KEEP_R, 150, 390, WALL_Z + 1.2, WALL_Z + 12.0,
              M().stone, c, seg=64)
    wall_band("主堡内衬", kx, ky, KEEP_R - 0.8, KEEP_R - 0.7, 152, 388, WALL_Z + 1.25, WALL_Z + 11.8,
              M().plaster, c, seg=64)
    wall_band("主堡廊台", kx, ky, KEEP_R - 1.95, KEEP_R - 0.78, 150, 390,
              WALL_Z + 9.4, WALL_Z + 9.56, M().plank, c, seg=52)
    for zz in (WALL_Z + 4.5, WALL_Z + 7.2):
        pass
    cyl("主堡上段", (kx, ky, WALL_Z + 14.7), KEEP_R - 0.5, 5.4, mat=M().stone, target=c, seg=30, bevel=0.04)
    for i in range(16):
        a = TAU * i / 16
        box(f"主堡托{i}", (kx + math.cos(a) * (KEEP_R - 0.32), ky + math.sin(a) * (KEEP_R - 0.32),
                          WALL_Z + 12.05), (0.26, 0.3, 0.44), rot=(0, 0, a), mat=M().stone3,
            target=c, bevel=0.02)
    for i in range(8):
        a = TAU * i / 8 + 0.2
        wx, wy = kx + math.cos(a) * (KEEP_R - 0.5), ky + math.sin(a) * (KEEP_R - 0.5)
        win(f"主堡窗{i}", wx, wy, WALL_Z + 14.8, 0.58, 1.8, a, c, lit=(i % 3 != 1))
    torus("主堡檐", (kx, ky, WALL_Z + 17.35), KEEP_R + 0.08, 0.11, mat=M().stone3, target=c, maj=46, mnr=6)
    cone("主堡顶", (kx, ky, WALL_Z + 20.2), KEEP_R + 0.55, 0.0, 5.7, mat=M().roofb, target=c, seg=32)
    sph("主堡尖", (kx, ky, WALL_Z + 23.15), 0.2, M().gold, target=c, seg=10, rings=8)
    cyl("主堡杆", (kx, ky, WALL_Z + 24.2), 0.045, 2.2, mat=M().iron, target=c, seg=6)
    banner("主堡旗", kx + 0.12, ky, WALL_Z + 24.0, 1.7, 2.6, 0.0, M().red, c)
    for i in range(6):
        a = math.radians(150 + 40 * i)
        bx, by = kx + math.cos(a) * (KEEP_R + 0.16), ky + math.sin(a) * (KEEP_R + 0.16)
        box(f"扶壁{i}", (bx, by, WALL_Z + 5.4), (0.55, 0.5, 8.8), rot=(0, 0, a), mat=M().stone3,
            target=c, bevel=0.05)
    tower(c, "梯塔", kx - KEEP_R - 0.5, ky - 0.6, WALL_Z, 1.35, 14.4, M().roofb, 2.3, seg=16)
    for sx in (-1, 1):
        box(f"主堡壁柱{sx}", (sx * 1.95, ky + 3.0, WALL_Z + 6.6), (0.6, 0.72, 10.6),
            mat=M().stone3, target=c, bevel=0.05)
        box(f"主堡柱头{sx}", (sx * 1.95, ky + 3.0, WALL_Z + 11.9), (0.8, 0.9, 0.36),
            mat=M().stone3, target=c, bevel=0.04)


# ------------------------------------------------------------------ 大厅
def build_hall(c):
    """主厅：+Y（朝庭院/城门）一侧敞开，只留远侧屋顶"""
    h = HALL
    cx, cy, w, d, z, hh = h["cx"], h["cy"], h["w"], h["d"], h["z"], h["h"]
    x0, x1 = cx - w / 2, cx + w / 2
    y0, y1 = cy - d / 2, cy + d / 2
    box("大厅台基", (cx, cy, z + 0.22), (w + 0.7, d + 0.7, 0.44), mat=M().stone3, target=c, bevel=0.04)
    box("大厅地板", (cx, cy, z + 0.46), (w, d, 0.08), mat=M().plank, target=c, bevel=0.0)
    # 远侧（-Y）实墙
    box("大厅背墙", (cx, y0, z + 0.44 + hh / 2), (w, 0.5, hh), mat=M().stone, target=c, bevel=0.05)
    for xx in (x0, x1):
        box("大厅山墙", (xx, cy, z + 0.44 + hh / 2), (0.5, d, hh), mat=M().stone, target=c, bevel=0.05)
        gable("大厅山尖", (xx, cy, z + 0.44 + hh), d, 0.5, h["roof"], rot=(0, 0, math.pi / 2),
              mat=M().stone, target=c)
    L = math.hypot(d / 2, h["roof"])
    box("大厅屋脊", (cx, cy, z + 0.44 + hh + h["roof"]), (w + 0.4, 0.3, 0.3), mat=M().wood2,
        target=c, bevel=0.03)
    ang = math.atan2(h["roof"], d / 2)
    box("大厅后坡", (cx, cy - d / 4, z + 0.44 + hh + h["roof"] / 2), (w + 0.6, L + 0.25, 0.2),
        rot=(ang, 0, 0), mat=M().roofp, target=c, bevel=0.02)
    for i in range(6):
        xx = x0 + 0.5 + i * (w - 1.0) / 5
        box(f"椽_{i}", (xx, cy - d / 4, z + 0.44 + hh + h["roof"] / 2 - 0.11),
            (0.12, L + 0.15, 0.14), rot=(ang, 0, 0), mat=M().wood2, target=c, bevel=0.0)
    # 敞开一侧的木构架
    for i in range(4):
        xx = x0 + 0.3 + i * (w - 0.6) / 3
        box(f"剖柱_{i}", (xx, y1 - 0.08, z + 0.44 + hh / 2), (0.2, 0.2, hh), mat=M().wood2,
            target=c, bevel=0.02)
        box(f"剖梁_{i}", (xx, y1 - 0.08, z + 0.44 + hh - 0.14), (0.18, d, 0.2), mat=M().wood2,
            target=c, bevel=0.02)
    box("大厅烟囱", (cx + 1.9, y0 - 0.05, z + 0.44 + hh + 2.1), (0.85, 0.85, 4.4),
        mat=M().stone3, target=c, bevel=0.04)
    box("烟囱帽", (cx + 1.9, y0 - 0.05, z + 0.44 + hh + 4.3), (1.1, 1.1, 0.2),
        mat=M().stone3, target=c, bevel=0.03)
    win("大厅东窗", x1 + 0.02, cy, z + 2.6, 0.85, 1.7, math.pi / 2, c, lit=True)


# ------------------------------------------------------------------ 礼拜堂
def build_chapel(c):
    h = CHAPEL
    cx, cy, w, d, z, hh = h["cx"], h["cy"], h["w"], h["d"], h["z"], h["h"]
    x0, x1 = cx - w / 2, cx + w / 2
    y0, y1 = cy - d / 2, cy + d / 2
    box("礼拜堂台基", (cx, cy, z + 0.2), (w + 0.5, d + 0.5, 0.4), mat=M().stone3, target=c, bevel=0.04)
    box("礼拜堂地板", (cx, cy, z + 0.42), (w, d, 0.06), mat=M().stone3, target=c, bevel=0.0)
    box("礼拜堂背墙", (cx, y0, z + 0.4 + hh / 2), (w, 0.5, hh), mat=M().stone, target=c, bevel=0.05)
    for xx in (x0, x1):
        box("礼拜堂侧墙", (xx, cy, z + 0.4 + hh / 2), (0.5, d, hh), mat=M().stone, target=c, bevel=0.05)
    wall_with_arch("礼拜堂正面", cx, y1, 0.0, w, hh, 0.45, 2.7, 4.2, M().stone, c, z0=z + 0.4)
    gable("礼拜堂山尖", (cx, y1, z + 0.4 + hh), w, 0.5, h["roof"], mat=M().stone, target=c)
    gable("礼拜堂山尖N", (cx, y0, z + 0.4 + hh), w, 0.5, h["roof"], mat=M().stone, target=c)
    ang = math.atan2(h["roof"], w / 2)
    L = math.hypot(w / 2, h["roof"])
    for sx in (-1, 1):
        box(f"礼拜堂屋面{sx}", (cx + sx * w / 4, cy, z + 0.4 + hh + h["roof"] / 2),
            (L + 0.3, d + 0.4, 0.18), rot=(0, sx * ang, 0), mat=M().roofg, target=c, bevel=0.02)
    cyl("玫瑰窗", (cx, y1 + 0.24, z + 0.4 + hh + 0.85), 1.05, 0.12, rot=(math.pi / 2, 0, 0),
        mat=M().glassr, target=c, seg=24, bevel=0.0)
    torus("玫瑰窗框", (cx, y1 + 0.26, z + 0.4 + hh + 0.85), 1.08, 0.1,
          rot=(math.pi / 2, 0, 0), mat=M().stone3, target=c, maj=28, mnr=6)
    b = Batch("窗棂", c)
    for i in range(6):
        a = TAU * i / 6
        b.box((cx + math.cos(a) * 0.5, y1 + 0.3, z + 0.4 + hh + 0.85 + math.sin(a) * 0.5),
              (0.95, 0.09, 0.08), rot=(0, a, 0), mat=M().stone3)
    b.build()
    box("钟塔", (cx + w / 2 + 0.1, y0 + 0.35, z + 0.4 + hh + 1.8), (1.0, 1.0, 3.2),
        mat=M().stone, target=c, bevel=0.04)
    cone("钟塔顶", (cx + w / 2 + 0.1, y0 + 0.35, z + 0.4 + hh + 4.1), 0.88, 0.0, 1.6,
         mat=M().roofb, target=c, seg=12)
    sph("钟", (cx + w / 2 + 0.1, y0 + 0.35, z + 0.4 + hh + 2.2), 0.36, M().brass,
        c, seg=12, rings=8)


def build_annex(c):
    box("厨房", (-6.5, -3.3, WALL_Z + 1.9), (2.7, 2.3, 3.8), mat=M().plaster, target=c, bevel=0.05)
    gable("厨房顶", (-6.5, -3.3, WALL_Z + 3.8), 2.9, 2.6, 1.4, mat=M().thatch, target=c)
    box("厨房烟囱", (-5.6, -4.0, WALL_Z + 4.5), (0.5, 0.5, 2.4), mat=M().stone3, target=c, bevel=0.03)
    box("马厩", (5.9, -3.1, WALL_Z + 1.5), (3.0, 2.2, 3.0), mat=M().plaster, target=c, bevel=0.05)
    gable("马厩顶", (5.9, -3.1, WALL_Z + 3.0), 3.2, 2.5, 1.2, mat=M().thatch, target=c)
    for i in range(3):
        box(f"马厩柱{i}", (4.6 + i * 1.3, -4.15, WALL_Z + 0.8), (0.14, 0.14, 1.6),
            mat=M().wood2, target=c, bevel=0.01)
    box("铁匠铺", (-8.2, 1.8, WALL_Z + 1.4), (2.1, 1.9, 2.8), mat=M().stone3, target=c, bevel=0.04)
    gable("铁匠铺顶", (-8.2, 1.8, WALL_Z + 2.8), 2.3, 2.2, 1.0, mat=M().roofb, target=c)


def build_courtyard(c):
    pts = ring_pts(C[0], C[1], 10.2, 40, 0.008, seed=31)
    poly_prism("庭院铺地", pts, WALL_Z + 0.02, WALL_Z + 0.1, M().stone3, c, 0.0)
    b = Batch("铺地石", c)
    for i in range(300):
        a = _rng.uniform(0, TAU)
        rr = 10.0 * math.sqrt(_rng.random())
        x, y = C[0] + math.cos(a) * rr, C[1] + math.sin(a) * rr
        if math.hypot(x - KEEP_C[0], y - KEEP_C[1]) < KEEP_R + 0.9:
            continue
        b.box((x, y, WALL_Z + 0.11), (_rng.uniform(0.38, 0.7), _rng.uniform(0.32, 0.56), 0.055),
              rot=(0, 0, _rng.uniform(0, TAU)), mat=M().stone3 if _rng.random() < 0.6 else M().stone)
    b.build()
    jx, jy = -2.2, 9.2
    cyl("井圈", (jx, jy, WALL_Z + 0.6), 0.85, 1.2, mat=M().stone3, target=c, seg=18, bevel=0.04)
    cyl("井水", (jx, jy, WALL_Z + 0.58), 0.64, 0.05, mat=M().waterd, target=c, seg=18, bevel=0.0)
    for sx in (-1, 1):
        box(f"井柱{sx}", (jx + sx * 0.72, jy, WALL_Z + 1.65), (0.12, 0.12, 2.1), mat=M().wood2,
            target=c, bevel=0.01)
    gable("井棚", (jx, jy, WALL_Z + 2.7), 2.2, 1.7, 0.75, mat=M().roofb, target=c)
    cyl("辘轳", (jx, jy, WALL_Z + 2.2), 0.1, 1.5, rot=(0, math.pi / 2, 0), mat=M().wood2,
        target=c, seg=10)
    bp = Batch("摊货", c)
    for i, (sx, sy) in enumerate(((4.4, 7.2), (3.0, 10.2))):
        box(f"摊台{i}", (sx, sy, WALL_Z + 0.55), (1.7, 0.75, 0.12), mat=M().wood, target=c, bevel=0.02)
        for dx in (-0.7, 0.7):
            box(f"摊腿{i}_{dx}", (sx + dx, sy, WALL_Z + 0.3), (0.1, 0.1, 0.6), mat=M().wood2,
                target=c, bevel=0.01)
        gable(f"摊棚{i}", (sx, sy, WALL_Z + 1.5), 2.0, 1.2, 0.5,
              mat=M().red if i % 2 == 0 else M().teal, target=c)
        for k in range(5):
            bp.sphere((sx - 0.6 + k * 0.3, sy + _rng.uniform(-0.18, 0.18), WALL_Z + 0.66),
                      _rng.uniform(0.08, 0.14), M().rosep if k % 2 else M().leaf4, seg=7, rings=5)
    bp.build()
    for i in range(7):
        a = _rng.uniform(0, TAU)
        rr = _rng.uniform(5.6, 9.2)
        x, y = C[0] + math.cos(a) * rr, C[1] + math.sin(a) * rr
        if abs(x) < 1.4 and y > 7.4:
            continue
        cyl(f"桶{i}", (x, y, WALL_Z + 0.42), 0.32, 0.84, mat=M().wood, target=c, seg=12, bevel=0.02)
        torus(f"桶箍{i}", (x, y, WALL_Z + 0.66), 0.33, 0.03, mat=M().iron, target=c, maj=14, mnr=4)
    for x, y in ((-1.2, 11.2), (1.4, 10.8), (-4.2, 3.8), (4.4, 3.2)):
        lantern(f"庭院灯{x}_{y}", x, y, WALL_Z + 0.1, c, h=1.9)
    cyl("庭院树干", (3.0, 3.6, WALL_Z + 1.4), 0.22, 2.8, mat=M().bark, target=c, seg=10, r2=0.14, bevel=0.0)
    for i, (dx, dy, dz, r) in enumerate(((0, 0, 3.2, 0.95), (-0.5, 0.25, 2.9, 0.68),
                                        (0.5, -0.2, 2.95, 0.66), (0.1, 0.5, 2.75, 0.58))):
        sph(f"庭院树冠{i}", (3.0 + dx, 3.6 + dy, WALL_Z + dz), r, M().leaf2, c, seg=12, rings=8,
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
