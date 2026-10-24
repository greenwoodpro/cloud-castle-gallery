import sys, os, math, importlib
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
import lib
importlib.reload(lib)
from lib import *
from mathutils import Vector

C = {n: bpy.data.collections[n] for n in
     ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
      '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
      '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']}
for o in list(C['05_Chapel'].objects):
    bpy.data.objects.remove(o, do_unlink=True)

STONE = bpy.data.materials.get('M_stone') or mat('stone', '#E4D5BA')
STONE_L = bpy.data.materials.get('M_stone_l') or mat('stone_l', '#F3EADA')
STONE_D = bpy.data.materials.get('M_stone_d') or mat('stone_d', '#CBB794')
ROOF = bpy.data.materials.get('M_roof') or mat('roof', '#C4715B')
ROOF_B = bpy.data.materials.get('M_roof_blue') or mat('roof_blue', '#8299AE')
WOOD = mat('wood', '#8C6547', rough=0.85, bump=0.06)
WOOD_D = mat('wood_d', '#5C4130', rough=0.85, bump=0.06)
GOLD = mat('gold', '#DDB25E', rough=0.35, metal=0.7)
CREAM = mat('cloth_cream', '#EFE4CE', rough=0.9, mottle=0.06)
FLAME = mat('flame', '#FFD79A', rough=0.3, emit=9.0, emit_col='#FFE0A8', mottle=0.0)
G1 = mat('glass_blue', '#6E8FB8', rough=0.15, emit=0.55, emit_col='#7FA8D8', alpha=0.92, mottle=0.05)
G2 = mat('glass_red', '#B65F55', rough=0.15, emit=0.5, emit_col='#D07A6A', alpha=0.92, mottle=0.05)
G3 = mat('glass_gold', '#D8B25E', rough=0.15, emit=0.5, emit_col='#E8C878', alpha=0.92, mottle=0.05)
G4 = mat('glass_green', '#6E8E68', rough=0.15, emit=0.45, emit_col='#86A87C', alpha=0.92, mottle=0.05)
GLASSES = [G1, G2, G3, G4]

CX, CY0, CY1 = 9.2, -0.8, 7.6
CW = 5.0
WALL_H = 5.4
RIDGE = 8.4
N = 5  # 开间

# ---------------------------------------------------------------- 主体
# 侧墙（带尖窗洞）
for sx in (-1, 1):
    x = CX + sx * CW * 0.5
    w = box(f'ChapelWall{sx}', (0.55, CY1 - CY0, WALL_H), (x, (CY0 + CY1) / 2, WALL_H / 2),
            m=STONE, bevel=0.04, coll_=C['05_Chapel'])
    shapes = []
    for i in range(3):
        yy = CY0 + 1.6 + i * 2.6
        shapes.append(('arch', 0.95, 2.6, 1.4, (x, yy, 1.5), (0, 0, math.pi / 2)))
    boolean_cut(w, cutter(f'ChapelCut{sx}', shapes, C['05_Chapel']))
    for i in range(3):
        yy = CY0 + 1.6 + i * 2.6
        box(f'ChapelGlass{sx}{i}', (0.12, 0.9, 2.45), (x, yy, 2.8), m=GLASSES[i % 4],
            bevel=0.0, coll_=C['05_Chapel'])
        box(f'ChapelMull{sx}{i}', (0.16, 0.06, 2.4), (x, yy, 2.8), m=STONE_D,
            bevel=0.0, coll_=C['05_Chapel'])
    # 扶壁
    for i in range(4):
        yy = CY0 + 0.6 + i * 2.35
        box(f'Buttress{sx}{i}', (0.75, 0.55, 4.6), (x + sx * 0.42, yy, 2.3), m=STONE_D,
            bevel=0.03, coll_=C['05_Chapel'])
        box(f'ButtressCap{sx}{i}', (0.85, 0.65, 0.35), (x + sx * 0.42, yy, 4.75), m=STONE,
            bevel=0.03, coll_=C['05_Chapel'])

# 山墙（南北）
for yy, nm in ((CY0, 'S'), (CY1, 'N')):
    prof = [(-CW / 2 - 0.3, 0), (CW / 2 + 0.3, 0), (CW / 2 + 0.3, WALL_H),
            (0, RIDGE), (-CW / 2 - 0.3, WALL_H)]
    prism(f'ChapelGable{nm}', prof, 0.55, (CX, yy, 0), (0, 0, 0), STONE,
          C['05_Chapel'], bevel=0.03)

# 屋顶两坡
slope = math.atan2(RIDGE - WALL_H, CW / 2 + 0.3)
half = math.hypot(RIDGE - WALL_H, CW / 2 + 0.3)
for sx in (-1, 1):
    box(f'ChapelRoof{sx}', (half + 0.5, CY1 - CY0 + 0.8, 0.28),
        (CX + sx * (CW / 4 + 0.1), (CY0 + CY1) / 2, (WALL_H + RIDGE) / 2 + 0.05),
        (0, sx * slope, 0), ROOF, 0.03, 1, C['05_Chapel'])
# 屋脊
box('ChapelRidge', (0.3, CY1 - CY0 + 0.9, 0.22), (CX, (CY0 + CY1) / 2, RIDGE + 0.12),
    m=STONE_D, bevel=0.03, coll_=C['05_Chapel'])

# ---------------------------------------------------------------- 南立面：门 + 玫瑰窗
box('ChapelPorch', (3.6, 1.3, 3.4), (CX, CY0 - 0.65, 1.7), m=STONE, bevel=0.04,
    coll_=C['05_Chapel'])
arch_cut = cutter('PorchCut', [('arch', 1.9, 3.0, 1.6, (CX, CY0 - 0.65, 0.0), (0, 0, 0))],
                  C['05_Chapel'])
boolean_cut(bpy.data.objects['ChapelPorch'], arch_cut)
for sx in (-1, 1):
    cyl(f'PorchCol{sx}', 0.16, 3.0, (CX + sx * 1.1, CY0 - 1.3, 1.5), m=STONE_L, seg=12,
        coll_=C['05_Chapel'], bevel=0.02)
box('PorchStep', (3.4, 0.7, 0.22), (CX, CY0 - 1.5, 0.11), m=STONE_D, bevel=0.03,
    coll_=C['05_Chapel'])
# 门
for sx in (-1, 1):
    box(f'ChapelDoor{sx}', (0.85, 0.12, 2.7), (CX + sx * 0.45, CY0 - 0.72, 1.35),
        (0, 0, sx * 0.12), WOOD, 0.02, 1, C['05_Chapel'])
box('ChapelDoorArch', (0.3, 0.3, 0.35), (CX, CY0 - 0.72, 2.85), m=GOLD, bevel=0.02,
    coll_=C['05_Chapel'])
# 玫瑰窗
RZ = 6.3
torus('RoseFrame', 1.05, 0.14, (CX, CY0 - 0.35, RZ), (math.pi / 2, 0, 0), STONE_L,
      coll_=C['05_Chapel'], maj=28, mi=8)
cyl('RoseGlass', 0.98, 0.1, (CX, CY0 - 0.35, RZ), (math.pi / 2, 0, 0), G1,
    seg=28, coll_=C['05_Chapel'], bevel=0.0)
for i in range(8):
    a = math.pi * 2 * i / 8
    box(f'RoseSpoke{i}', (0.07, 0.09, 1.0), (CX, CY0 - 0.36, RZ), (0, 0, a), STONE_D,
        bevel=0.0, coll_=C['05_Chapel'])
    # 花瓣彩色
    sphere(f'RosePetal{i}', 0.19, (CX + math.cos(a + 0.4) * 0.6, CY0 - 0.34,
           RZ + math.sin(a + 0.4) * 0.6), m=GLASSES[i % 4], seg=8, ring=6,
           coll_=C['05_Chapel'], scale=(1, 0.25, 1))
sphere('RoseCenter', 0.2, (CX, CY0 - 0.34, RZ), m=G3, seg=12, ring=8,
       coll_=C['05_Chapel'], scale=(1, 0.3, 1))

# ---------------------------------------------------------------- 钟亭（屋脊）
TX, TY = CX, CY1 - 1.6
for sx in (-1, 1):
    box(f'BellPost{sx}', (0.34, 0.5, 2.0), (TX + sx * 0.62, TY, RIDGE + 0.9), m=STONE,
        bevel=0.03, coll_=C['05_Chapel'])
box('BellLintel', (1.9, 0.55, 0.3), (TX, TY, RIDGE + 1.95), m=STONE_D, bevel=0.03,
    coll_=C['05_Chapel'])
for sx in (-1, 1):
    box(f'BellRoof{sx}', (1.15, 0.9, 0.16), (TX + sx * 0.42, TY, RIDGE + 2.35),
        (0, sx * math.radians(38), 0), ROOF_B, 0.02, 1, C['05_Chapel'])
sphere('Bell', 0.3, (TX, TY, RIDGE + 1.35), m=GOLD, seg=14, ring=10,
       coll_=C['05_Chapel'], scale=(1, 0.9, 1.1))
cyl('BellMouth', 0.31, 0.16, (TX, TY, RIDGE + 1.08), m=GOLD, seg=14,
    coll_=C['05_Chapel'], bevel=0.02)
cyl('BellYoke', 0.05, 0.9, (TX, TY, RIDGE + 1.72), (0, math.pi / 2, 0), WOOD_D, seg=8,
    coll_=C['05_Chapel'], bevel=0.0)
sphere('BellFin', 0.1, (TX, TY, RIDGE + 2.7), m=GOLD, seg=10, ring=8, coll_=C['05_Chapel'])

# ---------------------------------------------------------------- 内部
box('ChapelFloor', (CW - 0.6, CY1 - CY0 - 0.6, 0.12), (CX, (CY0 + CY1) / 2, 0.06),
    m=mat('tile', '#C9A98C', rough=0.9, mottle=0.1, scale=5), bevel=0.02, coll_=C['05_Chapel'])
# 祭坛
box('Altar', (2.2, 0.9, 1.0), (CX, CY1 - 1.2, 0.5), m=STONE_L, bevel=0.03, coll_=C['05_Chapel'])
box('AltarCloth', (2.3, 1.0, 0.06), (CX, CY1 - 1.2, 1.02), m=CREAM, bevel=0.0, coll_=C['05_Chapel'])
box('AltarCloth2', (2.3, 0.06, 0.5), (CX, CY1 - 1.68, 0.78), m=CREAM, bevel=0.0, coll_=C['05_Chapel'])
for sx in (-1, 1):
    cyl(f'AltarCandle{sx}', 0.05, 0.42, (CX + sx * 0.7, CY1 - 1.2, 1.26), m=CREAM, seg=8,
        coll_=C['05_Chapel'], bevel=0.0)
    sphere(f'AltarFlame{sx}', 0.05, (CX + sx * 0.7, CY1 - 1.2, 1.52), m=FLAME, seg=8, ring=6,
           coll_=C['05_Chapel'])
    cyl(f'CandleStick{sx}', 0.12, 0.12, (CX + sx * 0.7, CY1 - 1.2, 1.12), m=GOLD, seg=12,
        coll_=C['05_Chapel'], bevel=0.02)
# 圣像
box('Niche', (1.2, 0.5, 2.2), (CX, CY1 - 0.45, 2.6), m=STONE_L, bevel=0.02, coll_=C['05_Chapel'])
sphere('StatueHead', 0.16, (CX, CY1 - 0.5, 2.6), m=CREAM, seg=12, ring=8, coll_=C['05_Chapel'])
cyl('StatueBody', 0.22, 0.9, (CX, CY1 - 0.5, 2.0), m=CREAM, seg=12, coll_=C['05_Chapel'], r2=0.26)
# 长椅
for i in range(5):
    yy = CY0 + 2.4 + i * 1.05
    box(f'Pew{i}', (3.4, 0.36, 0.08), (CX, yy, 0.46), m=WOOD, bevel=0.02, coll_=C['05_Chapel'])
    box(f'PewBack{i}', (3.4, 0.08, 0.6), (CX, yy + 0.2, 0.78), m=WOOD, bevel=0.02, coll_=C['05_Chapel'])
    for sx in (-1, 1):
        box(f'PewLeg{i}{sx}', (0.1, 0.32, 0.44), (CX + sx * 1.5, yy, 0.22), m=WOOD_D,
            bevel=0.0, coll_=C['05_Chapel'])
# 吊灯
for i in range(2):
    yy = CY0 + 2.6 + i * 2.6
    torus(f'ChapelRing{i}', 0.5, 0.05, (CX, yy, 3.6), m=WOOD_D, maj=16, mi=6, coll_=C['05_Chapel'])
    for k in range(4):
        a = math.pi * 2 * k / 4
        sphere(f'ChapelFlame{i}{k}', 0.04, (CX + math.cos(a) * 0.5, yy + math.sin(a) * 0.5, 3.68),
               m=FLAME, seg=6, ring=4, coll_=C['05_Chapel'])
    tube(f'ChapelChain{i}', [(CX, yy, 3.65), (CX, yy, 5.4)], 0.012, mat('iron', '#6E6A66', rough=0.5),
         C['05_Chapel'], res=1)
ld = bpy.data.lights.new('ChapelLight', 'POINT')
ld.energy = 120
ld.color = (1.0, 0.80, 0.55)
ld.shadow_soft_size = 0.6
lo = bpy.data.objects.new('ChapelLight', ld)
lo.location = (CX, (CY0 + CY1) / 2, 3.2)
C['10_Lights'].objects.link(lo)
ld2 = bpy.data.lights.new('ChapelLight2', 'AREA')
ld2.energy = 60
ld2.size = 3.0
ld2.color = (0.95, 0.85, 0.7)
ld2.use_shadow = False
lo2 = bpy.data.objects.new('ChapelLight2', ld2)
lo2.location = (CX, (CY0 + CY1) / 2, 4.6)
lo2.rotation_euler = (math.pi, 0, 0)
C['10_Lights'].objects.link(lo2)

print('CHAPEL DONE', len(C['05_Chapel'].objects))
