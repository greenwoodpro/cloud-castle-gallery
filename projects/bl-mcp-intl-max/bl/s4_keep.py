import sys, os, math, importlib
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
import lib
importlib.reload(lib)
from lib import *
from lib import _finish
from mathutils import Vector

C = {n: bpy.data.collections[n] for n in
     ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
      '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
      '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']}
for cn in ['03_Keep', '04_Keep_Interior', '99_Hide_For_Interior_View']:
    for o in list(C[cn].objects):
        bpy.data.objects.remove(o, do_unlink=True)

STONE = bpy.data.materials.get('M_stone') or mat('stone', '#E4D5BA')
STONE_L = bpy.data.materials.get('M_stone_l') or mat('stone_l', '#F3EADA')
STONE_D = bpy.data.materials.get('M_stone_d') or mat('stone_d', '#CBB794')
ROOF = bpy.data.materials.get('M_roof') or mat('roof', '#C4715B')
ROOF_B = bpy.data.materials.get('M_roof_blue') or mat('roof_blue', '#8299AE')
WOOD = mat('wood', '#8C6547', rough=0.85, bump=0.06)
WOOD_D = mat('wood_d', '#5C4130', rough=0.85, bump=0.06)
WOOD_L = mat('wood_l', '#BC9166', rough=0.85, bump=0.05)
IRON = mat('iron', '#6E6A66', rough=0.5, metal=0.55)
GOLD = mat('gold', '#DDB25E', rough=0.35, metal=0.7)
GLASS = mat('window', '#6E6252', rough=0.6, mottle=0.05)
PLASTER = mat('plaster', '#EFE3CC', rough=0.95, mottle=0.08, scale=3)
TILE = mat('tile', '#C9A98C', rough=0.9, mottle=0.1, scale=5)

KX0, KX1 = -5.5, 5.5
KY0, KY1 = 0.0, 10.0
KW = 11.0
KD = 10.0
TH = 0.7
H = 18.8
FLOORS = [0.20, 4.60, 8.80, 13.00]
ROOF_Z = 17.25
STAIR = (3.55, 7.75)
SR = 1.30

# ---------------------------------------------------------------- 墙体
def keep_wall(name, size, loc, cuts, coll_):
    ob = box(name, size, loc, m=STONE, bevel=0.05, coll_=coll_)
    if cuts:
        boolean_cut(ob, cutter(name + '_cut', cuts, coll_))
    return ob


# 南墙（可隐藏）
keep_wall('Keep_SouthWall', (KW + 1.0, TH, H), (0, KY0, H * 0.5),
          [('arch', 2.5, 3.5, 2.0, (0, KY0, 0.05), (0, 0, 0))] +
          [('arch', 1.25, 2.15, 2.0, (x, KY0, z + 1.05), (0, 0, 0))
           for z in (0.5, 4.9, 9.1, 13.3) for x in (-3.3, 3.3)],
          C['99_Hide_For_Interior_View'])
# 北墙
keep_wall('Keep_NorthWall', (KW + 1.0, TH, H), (0, KY1, H * 0.5),
          [('arch', 1.25, 2.15, 2.0, (x, KY1, z + 1.05), (0, 0, 0))
           for z in (0.5, 4.9, 9.1, 13.3) for x in (-3.3, 0.0, 3.3)],
          C['03_Keep'])
# 东西墙
for sx, nm in ((-1, 'West'), (1, 'East')):
    keep_wall(f'Keep_{nm}Wall', (TH, KD + 1.0, H), (sx * 5.5, 5.0, H * 0.5),
              [('arch', 1.25, 2.15, 2.0, (sx * 5.5, y, z + 1.05), (0, 0, math.pi / 2))
               for z in (0.5, 4.9, 9.1, 13.3) for y in (2.2, 5.0, 7.8)],
              C['03_Keep'])

# 窗框与玻璃
for sx in (-1, 1):
    for z in (0.5, 4.9, 9.1, 13.3):
        for y in (2.2, 5.0, 7.8):
            box(f'KW_{sx}_{y}_{z}', (0.16, 1.0, 1.85), (sx * 5.52, y, z + 1.05),
                m=GLASS, bevel=0.0, coll_=C['03_Keep'])
            box(f'KWf_{sx}_{y}_{z}', (0.22, 0.10, 2.05), (sx * 5.5, y, z + 1.05),
                m=STONE_L, bevel=0.01, coll_=C['03_Keep'])
for z in (0.5, 4.9, 9.1, 13.3):
    for x in (-3.3, 3.3):
        box(f'KSW_{x}_{z}', (1.0, 0.16, 1.85), (x, KY0 + 0.02, z + 1.05),
            m=GLASS, bevel=0.0, coll_=C['99_Hide_For_Interior_View'])
    for x in (-3.3, 0.0, 3.3):
        box(f'KNW_{x}_{z}', (1.0, 0.16, 1.85), (x, KY1 - 0.02, z + 1.05),
            m=GLASS, bevel=0.0, coll_=C['03_Keep'])

# 大门框
for sx in (-1, 1):
    box(f'KeepDoorJ{sx}', (0.28, 0.9, 3.7), (sx * 1.35, KY0 - 0.1, 1.85),
        m=STONE_L, bevel=0.03, coll_=C['99_Hide_For_Interior_View'])
box('KeepDoorLintel', (3.0, 0.9, 0.3), (0, KY0 - 0.1, 3.6), m=STONE_L, bevel=0.03,
    coll_=C['99_Hide_For_Interior_View'])
# 台阶
for i in range(3):
    box(f'KeepStep{i}', (3.2 - i * 0.25, 0.55, 0.18), (0, KY0 - 0.35 - i * 0.5, 0.09 + i * 0.06),
        m=STONE_D, bevel=0.02, coll_=C['99_Hide_For_Interior_View'])

# ---------------------------------------------------------------- 楼板
for i, z in enumerate(FLOORS):
    slab = box(f'KeepFloor{i}', (KW - 0.2, KD - 0.2, 0.34), (0, 5, z),
               m=STONE_L if i == 0 else WOOD_L, bevel=0.03, coll_=C['03_Keep'])
    if i > 0:
        hole = cyl(f'FHole{i}', SR + 0.28, 1.2, (STAIR[0], STAIR[1], z), m=STONE,
                   seg=24, coll_=C['03_Keep'], bevel=0.0)
        boolean_cut(slab, hole)
        # 木梁
        for k in range(5):
            box(f'Beam{i}_{k}', (KW - 0.4, 0.24, 0.26), (0, 1.6 + k * 1.75, z - 0.28),
                m=WOOD, bevel=0.02, coll_=C['03_Keep'])

# ---------------------------------------------------------------- 螺旋楼梯
def spiral_stair():
    bm = bmesh.new()
    steps = 72
    rise = (ROOF_Z - 0.2) / steps
    da = math.radians(19.5)
    r0, r1 = 0.16, SR
    for i in range(steps):
        z = 0.2 + i * rise
        a0 = i * da
        a1 = a0 + da * 1.02
        vs = []
        for (rr, aa) in ((r0, a0), (r1, a0), (r1, a1), (r0, a1)):
            vs.append(bm.verts.new((math.cos(aa) * rr, math.sin(aa) * rr, z)))
        f = bm.faces.new(vs)
        ret = bmesh.ops.extrude_face_region(bm, geom=[f])
        nv = [e for e in ret['geom'] if isinstance(e, bmesh.types.BMVert)]
        bmesh.ops.translate(bm, verts=nv, vec=(0, 0, rise * 0.92))
        bmesh.ops.delete(bm, geom=[f], context='FACES')
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    ob = _finish(bm, 'SpiralStair', WOOD, C['03_Keep'],
                 (STAIR[0], STAIR[1], 0), (0, 0, 0), (1, 1, 1))
    return ob


spiral_stair()
cyl('Newel', 0.17, ROOF_Z - 0.2, (STAIR[0], STAIR[1], (ROOF_Z + 0.2) * 0.5), m=WOOD_D,
    seg=12, coll_=C['03_Keep'], bevel=0.02)
# 楼梯井围壁
for i in range(4):
    z0 = FLOORS[i] + 0.2
    z1 = (FLOORS[i + 1] if i < 3 else ROOF_Z)
    cyl(f'StairShell{i}', SR + 0.30, z1 - z0, (STAIR[0], STAIR[1], (z0 + z1) * 0.5),
        m=STONE, seg=28, coll_=C['03_Keep'], bevel=0.03, cap=False)
    # 开口（用一块拱形门洞的墙体遮挡）
    a = math.atan2(5 - STAIR[1], -1 - STAIR[0])
    dx, dy = math.cos(a) * (SR + 0.31), math.sin(a) * (SR + 0.31)
    box(f'StairDoor{i}', (0.9, 0.2, 2.1), (STAIR[0] + dx, STAIR[1] + dy, z0 + 1.05),
        (0, 0, a + math.pi / 2), mat('dark', '#4A3B31', rough=0.9, mottle=0.02),
        bevel=0.0, coll_=C['03_Keep'])

# ---------------------------------------------------------------- 角部扶壁与角楼
for sx in (-1, 1):
    for sy, yy in ((-1, 0.0), (1, 10.0)):
        cyl(f'Buttress_{sx}_{sy}', 0.95, 11.5, (sx * 5.45, yy, 5.75), m=STONE,
            seg=4, r2=0.72, rot=(0, 0, math.radians(45)), coll_=C['03_Keep'], bevel=0.04)
        # 角楼
        tx, ty = sx * 5.45, yy + sy * 0.15
        cone(f'TurretCorbel_{sx}_{sy}', 1.55, 1.4, (tx, ty, 10.9), m=STONE_D, seg=20,
             coll_=C['03_Keep'], r2=1.35, bevel=0.0)
        cyl(f'Turret_{sx}_{sy}', 1.35, 9.6, (tx, ty, 16.0), m=STONE, seg=24,
            coll_=C['03_Keep'], r2=1.24, bevel=0.03)
        cyl(f'TurretBelt_{sx}_{sy}', 1.30, 0.22, (tx, ty, 18.6), m=STONE_L, seg=24,
            coll_=C['03_Keep'], bevel=0.02)
        cone(f'TurretRoof_{sx}_{sy}', 1.62, 4.2, (tx, ty, 22.9), m=ROOF if sy < 0 else ROOF_B,
             seg=24, coll_=C['03_Keep'], bevel=0.02)
        sphere(f'TurretFin_{sx}_{sy}', 0.15, (tx, ty, 25.1), m=GOLD, seg=12, ring=8,
               coll_=C['03_Keep'])
        for k in range(3):
            a = math.radians(40 + k * 100)
            box(f'TurretW_{sx}_{sy}_{k}', (0.22, 0.3, 0.8),
                (tx + math.cos(a) * 1.3, ty + math.sin(a) * 1.3, 14.2 + k * 1.1),
                (0, 0, a), GLASS, 0.01, 1, C['03_Keep'])

# ---------------------------------------------------------------- 屋顶
roof_slab = box('Keep_Roof', (KW + 0.9, KD + 0.9, 0.4), (0, 5, ROOF_Z),
                m=STONE, bevel=0.04, coll_=C['99_Hide_For_Interior_View'])
# 女儿墙 + 城齿
for (p1, p2) in [((-5.95, -0.45), (5.95, -0.45)), ((5.95, -0.45), (5.95, 10.45)),
                 ((5.95, 10.45), (-5.95, 10.45)), ((-5.95, 10.45), (-5.95, -0.45))]:
    dx, dy = p2[0] - p1[0], p2[1] - p1[1]
    L = math.hypot(dx, dy)
    ang = math.atan2(dy, dx)
    box(f'RoofPar_{p1[0]}_{p1[1]}', (L, 0.36, 1.0), ((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2,
        ROOF_Z + 0.7), (0, 0, ang), STONE, bevel=0.03, coll_=C['99_Hide_For_Interior_View'])
    merlons(f'RoofMer_{p1[0]}_{p1[1]}', p1, p2, ROOF_Z + 1.2, h=0.62, w=0.6, d=0.36,
            gap=0.68, m=STONE, coll_=C['99_Hide_For_Interior_View'])

# 屋顶小楼（楼梯出口）
cyl('CapHouse', 1.5, 3.0, (STAIR[0], STAIR[1], ROOF_Z + 1.5), m=STONE, seg=20,
    coll_=C['99_Hide_For_Interior_View'], bevel=0.03)
cone('CapRoof', 1.85, 2.4, (STAIR[0], STAIR[1], ROOF_Z + 4.2), m=ROOF_B, seg=20,
     coll_=C['99_Hide_For_Interior_View'], bevel=0.02)
sphere('CapFin', 0.13, (STAIR[0], STAIR[1], ROOF_Z + 5.5), m=GOLD, seg=10, ring=8,
       coll_=C['99_Hide_For_Interior_View'])

# 烟囱
for (cx, cy, hh) in [(-4.2, 3.2, 4.2), (4.3, 3.0, 3.4)]:
    box(f'Chimney_{cx}', (1.1, 1.3, hh), (cx, cy, ROOF_Z + hh * 0.5), m=STONE,
        bevel=0.04, coll_=C['99_Hide_For_Interior_View'])
    box(f'ChimCap_{cx}', (1.35, 1.55, 0.22), (cx, cy, ROOF_Z + hh + 0.1), m=STONE_D,
        bevel=0.03, coll_=C['99_Hide_For_Interior_View'])

# 旗杆与旗
cyl('FlagPole', 0.09, 7.0, (0, 5, ROOF_Z + 3.5), m=WOOD_D, seg=10,
    coll_=C['03_Keep'], bevel=0.0)
flag('KeepFlag', (0.08, 5, ROOF_Z + 6.4), (0, 0, math.radians(-8)), w=2.4, h=1.3,
     m=mat('cloth_red', '#BF5F57', rough=0.9, mottle=0.06), coll_=C['03_Keep'])

print('KEEP DONE', len(C['03_Keep'].objects), len(C['03_Keep'].objects))
