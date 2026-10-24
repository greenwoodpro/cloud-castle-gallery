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
for o in list(C['04_Keep_Interior'].objects):
    bpy.data.objects.remove(o, do_unlink=True)

STONE = bpy.data.materials.get('M_stone') or mat('stone', '#E4D5BA')
STONE_L = bpy.data.materials.get('M_stone_l') or mat('stone_l', '#F3EADA')
STONE_D = bpy.data.materials.get('M_stone_d') or mat('stone_d', '#CBB794')
WOOD = mat('wood', '#8C6547', rough=0.85, bump=0.06)
WOOD_D = mat('wood_d', '#5C4130', rough=0.85, bump=0.06)
WOOD_L = mat('wood_l', '#BC9166', rough=0.85, bump=0.05)
IRON = mat('iron', '#6E6A66', rough=0.5, metal=0.55)
GOLD = mat('gold', '#DDB25E', rough=0.35, metal=0.7)
PLASTER = mat('plaster', '#F0E4CE', rough=0.95, mottle=0.08, scale=3)
TILE = mat('tile', '#C9A98C', rough=0.9, mottle=0.1, scale=5)
RUSH = mat('rush', '#D8C08A', rough=1.0, mottle=0.12, scale=8)
RED = mat('cloth_red', '#BF5F57', rough=0.9, mottle=0.06)
BLUE = mat('cloth_blue', '#8FA8C8', rough=0.9, mottle=0.06)
GREEN = mat('cloth_green', '#8CA47E', rough=0.9, mottle=0.06)
CREAM = mat('cloth_cream', '#EFE4CE', rough=0.9, mottle=0.06)
FIRE = mat('fire', '#F2A24E', rough=0.4, emit=4.0, emit_col='#FFB65E', mottle=0.0)
FLAME = mat('flame', '#FFD79A', rough=0.3, emit=9.0, emit_col='#FFE0A8', mottle=0.0)
BOOKS = [mat('bk1', '#A9564E', rough=0.8), mat('bk2', '#6E7F9B', rough=0.8),
         mat('bk3', '#7E8E62', rough=0.8), mat('bk4', '#C9A05C', rough=0.8),
         mat('bk5', '#8B6E86', rough=0.8), mat('bk6', '#5F6E5A', rough=0.8)]
FL = [0.37, 4.77, 8.97, 13.17]
CUT = C['99_Hide_For_Interior_View']

# ---------------------------------------------------------------- 通用家具
def table(name, x, y, z, w, d, h=0.78, m=WOOD, rot=0.0, thick=0.09):
    box(f'{name}_top', (w, d, thick), (x, y, z + h), (0, 0, rot), m, 0.02, 1, C['04_Keep_Interior'])
    for sx in (-1, 1):
        for sy in (-1, 1):
            lx = x + math.cos(rot) * sx * (w / 2 - 0.16) - math.sin(rot) * sy * (d / 2 - 0.16)
            ly = y + math.sin(rot) * sx * (w / 2 - 0.16) + math.cos(rot) * sy * (d / 2 - 0.16)
            box(f'{name}_leg{sx}{sy}', (0.1, 0.1, h - 0.02), (lx, ly, z + h / 2),
                (0, 0, rot), WOOD_D, 0.01, 1, C['04_Keep_Interior'])


def chair(name, x, y, z, rot=0.0, m=WOOD, seat=0.46, back=0.95):
    box(f'{name}_seat', (0.46, 0.44, 0.07), (x, y, z + seat), (0, 0, rot), m, 0.02, 1, C['04_Keep_Interior'])
    for sx in (-1, 1):
        for sy in (-1, 1):
            lx = x + math.cos(rot) * sx * 0.18 - math.sin(rot) * sy * 0.17
            ly = y + math.sin(rot) * sx * 0.18 + math.cos(rot) * sy * 0.17
            box(f'{name}_l{sx}{sy}', (0.06, 0.06, seat), (lx, ly, z + seat / 2), (0, 0, rot),
                WOOD_D, 0.0, 1, C['04_Keep_Interior'])
    bx = x - math.sin(rot) * 0.2
    by = y + math.cos(rot) * 0.2
    box(f'{name}_back', (0.46, 0.06, back - seat), (bx, by, z + (seat + back) / 2), (0, 0, rot),
        m, 0.02, 1, C['04_Keep_Interior'])


def bench(name, x, y, z, L, rot=0.0):
    box(f'{name}_top', (L, 0.32, 0.08), (x, y, z + 0.45), (0, 0, rot), WOOD, 0.02, 1, C['04_Keep_Interior'])
    for s in (-1, 1):
        lx = x + math.cos(rot) * s * (L / 2 - 0.2)
        ly = y + math.sin(rot) * s * (L / 2 - 0.2)
        box(f'{name}_leg{s}', (0.1, 0.26, 0.44), (lx, ly, z + 0.22), (0, 0, rot), WOOD_D, 0.01, 1, C['04_Keep_Interior'])


def rug(name, x, y, z, w, d, m, rot=0.0):
    box(name, (w, d, 0.025), (x, y, z + 0.012), (0, 0, rot), m, 0.0, 1, C['04_Keep_Interior'])


def candle(name, x, y, z, h=0.22, light=False):
    cyl(f'{name}_c', 0.028, h, (x, y, z + h / 2), m=CREAM, seg=8,
        coll_=C['04_Keep_Interior'], bevel=0.0)
    sphere(f'{name}_f', 0.035, (x, y, z + h + 0.035), m=FLAME, seg=8, ring=6,
           coll_=C['04_Keep_Interior'])
    if light:
        ld = bpy.data.lights.new(name + '_L', 'POINT')
        ld.energy = 12
        ld.color = (1.0, 0.72, 0.42)
        ld.shadow_soft_size = 0.35
        lo = bpy.data.objects.new(name + '_L', ld)
        lo.location = (x, y, z + h + 0.12)
        C['10_Lights'].objects.link(lo)


def bookrow(name, x, y, z, L, rot=0.0, n=9, hmax=0.3):
    for i in range(n):
        t = (i + 0.5) / n
        lx = x + math.cos(rot) * (t * L - L / 2)
        ly = y + math.sin(rot) * (t * L - L / 2)
        hh = 0.18 + (i * 7 % 5) * 0.035
        box(f'{name}_{i}', (L / n * 0.72, 0.16, hh), (lx, ly, z + hh / 2), (0, 0, rot),
            BOOKS[i % len(BOOKS)], 0.005, 1, C['04_Keep_Interior'])


def shelf(name, x, y, z, w, h, d, rot=0.0, levels=4):
    box(f'{name}_body', (w, d, h), (x, y, z + h / 2), (0, 0, rot), WOOD_D, 0.02, 1, C['04_Keep_Interior'])
    ox = math.sin(rot) * (d / 2 - 0.10)
    oy = -math.cos(rot) * (d / 2 - 0.10)
    for i in range(levels):
        zz = z + 0.24 + i * (h - 0.42) / max(1, levels - 1)
        box(f'{name}_sh{i}', (w - 0.06, d + 0.05, 0.05), (x, y, zz), (0, 0, rot), WOOD, 0.01, 1, C['04_Keep_Interior'])
        bookrow(f'{name}_bk{i}', x + ox, y + oy, zz + 0.025, w - 0.24, rot, 8, hmax=0.26)


def barrel(name, x, y, z, r=0.32, h=0.8):
    b = cyl(name, r, h, (x, y, z + h / 2), m=WOOD, seg=16, coll_=C['04_Keep_Interior'], r2=r * 0.92, bevel=0.02)
    for zz in (0.18, 0.5, 0.82):
        torus(f'{name}_h{zz}', r * 0.99, 0.022, (x, y, z + h * zz), m=IRON,
              coll_=C['04_Keep_Interior'], maj=16, mi=6)


def tapestry(name, x, y, z, w, h, rot, m):
    box(name, (w, 0.05, h), (x, y, z - h / 2), (0, 0, rot), m, 0.0, 1, C['04_Keep_Interior'])
    box(name + '_rod', (w + 0.2, 0.06, 0.06), (x, y, z + 0.03), (0, 0, rot), WOOD_D,
        0.0, 1, C['04_Keep_Interior'])


# ---------------------------------------------------------------- 一层 大厅
Z = FL[0]
rug('HallRush', 0, 4.6, Z, 9.2, 8.2, RUSH)
rug('HallRug', -0.7, 4.4, Z + 0.03, 4.4, 3.0, RED)
rug('DaisRug', 0, 7.6, Z + 0.36, 4.2, 2.4, BLUE)
# 高台
box('Dais', (5.4, 1.7, 0.34), (0, 8.35, Z + 0.17), m=WOOD, bevel=0.03, coll_=C['04_Keep_Interior'])
box('DaisCarpet', (4.6, 1.3, 0.03), (0, 8.35, Z + 0.35), m=RED, bevel=0.0, coll_=C['04_Keep_Interior'])
# 王座
box('Throne_seat', (0.9, 0.8, 0.12), (0, 8.55, Z + 0.72), m=WOOD_D, bevel=0.03, coll_=C['04_Keep_Interior'])
box('Throne_back', (0.9, 0.14, 1.9), (0, 8.92, Z + 1.35), m=WOOD_D, bevel=0.04, coll_=C['04_Keep_Interior'])
box('Throne_cushion', (0.8, 0.7, 0.1), (0, 8.5, Z + 0.83), m=RED, bevel=0.04, coll_=C['04_Keep_Interior'])
for s in (-1, 1):
    box(f'Throne_arm{s}', (0.12, 0.7, 0.5), (s * 0.45, 8.55, Z + 1.0), m=WOOD_D, bevel=0.02, coll_=C['04_Keep_Interior'])
sphere('Throne_finial', 0.09, (0, 8.92, Z + 2.32), m=GOLD, seg=10, ring=8, coll_=C['04_Keep_Interior'])
# 华盖
for s in (-1, 1):
    cyl(f'Canopy_p{s}', 0.05, 3.0, (s * 1.1, 8.85, Z + 1.5), m=WOOD_D, seg=8, coll_=C['04_Keep_Interior'])
box('Canopy_top', (2.5, 1.0, 0.08), (0, 8.85, Z + 3.0), m=RED, bevel=0.02, coll_=C['04_Keep_Interior'])
box('Canopy_val', (2.5, 0.9, 0.5), (0, 8.85, Z + 2.75), m=RED, bevel=0.02, coll_=C['04_Keep_Interior'])

# 长桌
table('HallTable', -0.7, 4.4, Z, 5.4, 1.15, 0.78)
for s in (-1, 1):
    bench(f'HallBench{s}', -0.7, 4.4 + s * 0.95, Z, 5.0)
for i in range(5):
    x = -2.9 + i * 1.15
    for s in (-1, 1):
        cyl(f'Plate{i}{s}', 0.16, 0.03, (x, 4.4 + s * 0.34, Z + 0.83), m=CREAM, seg=16,
            coll_=C['04_Keep_Interior'], bevel=0.01)
    if i % 2 == 0:
        cyl(f'Mug{i}', 0.07, 0.16, (x + 0.3, 4.4 + 0.1, Z + 0.88), m=WOOD, seg=10,
            coll_=C['04_Keep_Interior'], bevel=0.01)
candle('HallCandle1', -1.6, 4.4, Z + 0.82, 0.24, light=True)
candle('HallCandle2', 0.6, 4.4, Z + 0.82, 0.2)
# 高桌
table('HighTable', 0, 7.4, Z + 0.34, 3.6, 0.9, 0.78)
chair('HighChair', 0, 8.5, Z + 0.34, 0.0, WOOD_D, back=1.1)

# 壁炉（东墙）
FX, FY = 4.85, 4.3
box('Hearth_base', (1.5, 3.2, 0.28), (FX, FY, Z + 0.14), m=STONE_D, bevel=0.03, coll_=C['04_Keep_Interior'])
box('Hearth_back', (0.22, 2.7, 2.75), (5.28, FY, Z + 1.5), m=mat('soot', '#3F322B', rough=1.0, mottle=0.06),
    bevel=0.0, coll_=C['04_Keep_Interior'])
for s_ in (-1, 1):
    box(f'Hearth_side{s_}', (1.25, 0.46, 2.75), (FX + 0.12, FY + s_ * 1.45, Z + 1.5), m=STONE,
        bevel=0.05, coll_=C['04_Keep_Interior'])
    box(f'Hearth_wing{s_}', (0.9, 0.5, 0.35), (FX, FY + s_ * 1.55, Z + 2.95), m=STONE_D,
        bevel=0.04, coll_=C['04_Keep_Interior'])
box('Hearth_top', (1.3, 3.4, 0.45), (FX + 0.1, FY, Z + 2.95), m=STONE, bevel=0.05, coll_=C['04_Keep_Interior'])
box('Hearth_mantel', (1.55, 3.7, 0.16), (FX + 0.05, FY, Z + 3.25), m=WOOD, bevel=0.03, coll_=C['04_Keep_Interior'])
for i in range(3):
    cyl(f'Log{i}', 0.1, 1.4, (5.0, FY - 0.34 + i * 0.34, Z + 0.42), (math.pi / 2, 0, 0.08),
        m=WOOD_D, seg=8, coll_=C['04_Keep_Interior'], bevel=0.0)
for i, (dy, sc) in enumerate([(0, 1.0), (-0.34, 0.72), (0.34, 0.82)]):
    cone(f'Fire{i}', 0.26 * sc, 0.85 * sc, (5.02, FY + dy, Z + 0.52 + 0.42 * sc), m=FIRE, seg=10,
         coll_=C['04_Keep_Interior'], bevel=0.0)
    cone(f'Flame{i}', 0.13 * sc, 0.5 * sc, (5.0, FY + dy, Z + 0.56 + 0.3 * sc), m=FLAME, seg=8,
         coll_=C['04_Keep_Interior'], bevel=0.0)
ld = bpy.data.lights.new('FireLight', 'POINT')
ld.energy = 220
ld.color = (1.0, 0.52, 0.22)
ld.shadow_soft_size = 0.5
lo = bpy.data.objects.new('FireLight', ld)
lo.location = (4.3, FY, Z + 1.0)
C['10_Lights'].objects.link(lo)

# 吊灯
cyl('Chand_ring', 1.05, 0.1, (0, 4.4, Z + 3.35), m=WOOD_D, seg=24, coll_=C['04_Keep_Interior'], cap=False)
for i in range(8):
    a = math.pi * 2 * i / 8
    candle(f'Chand{i}', math.cos(a) * 1.0, 4.4 + math.sin(a) * 1.0, Z + 3.4, 0.18,
           light=(i == 0))
for i in range(4):
    a = math.pi * 2 * i / 4 + 0.4
    tube(f'ChandChain{i}', [(math.cos(a) * 1.0, 4.4 + math.sin(a) * 1.0, Z + 3.4),
                            (0, 4.4, Z + 4.4)], 0.015, IRON, C['04_Keep_Interior'], res=1)

# 挂毯 / 旗帜
tapestry('TapW1', -4.72, 3.0, Z + 3.7, 2.6, 3.2, math.pi / 2, BLUE)
tapestry('TapW2', -4.72, 6.6, Z + 3.7, 2.4, 3.0, math.pi / 2, GREEN)
tapestry('TapN', 0, 9.26, Z + 3.9, 3.2, 2.4, 0.0, BLUE)
for i, x in enumerate([-2.6, 0, 2.6]):
    banner(f'HallBan{i}', (x, 9.18, Z + 4.15), (0, 0, 0), 1.1, 3.0, RED if i % 2 == 0 else BLUE,
           WOOD_D, C['04_Keep_Interior'])
# 边柜
box('Sideboard', (0.5, 2.2, 0.9), (-4.4, 7.2, Z + 0.45), m=WOOD, bevel=0.03, coll_=C['04_Keep_Interior'])
for i in range(5):
    cyl(f'Cup{i}', 0.06, 0.14, (-4.4, 6.4 + i * 0.4, Z + 0.97), m=GOLD if i % 2 else CREAM,
        seg=10, coll_=C['04_Keep_Interior'], bevel=0.01)
# 竖琴
harp = []
for i in range(9):
    t = i / 8
    harp.append((1.3 + 0.0, 2.2 + t * 1.5 - 0.2 * t * t, Z + 0.9 + t * 0.9))
tube('Harp_frame', [(-3.95, 1.7, Z + 0.05), (-3.95, 2.0, Z + 1.9), (-3.95, 3.4, Z + 2.1)],
     0.06, WOOD_D, C['04_Keep_Interior'], res=2)
for i in range(7):
    t = i / 6
    tube(f'Harp_s{i}', [(-3.95, 1.95 + t * 1.3, Z + 1.85 - t * 0.9),
                        (-3.95, 2.0 + t * 1.25, Z + 0.1 + t * 0.75)], 0.008, CREAM,
         C['04_Keep_Interior'], res=1)

# ---------------------------------------------------------------- 二层 厨房 + 书房
Z2 = FL[1]
box('Partition2', (0.2, 8.6, 3.75), (0.25, 5.0, Z2 + 1.875), m=PLASTER, bevel=0.02, coll_=C['04_Keep_Interior'])
box('Partition2_door', (0.22, 1.2, 2.2), (0.25, 3.4, Z2 + 1.1), m=mat('dark', '#4A3B31', rough=0.9, mottle=0.02),
    bevel=0.0, coll_=C['04_Keep_Interior'])
# 厨房
box('KitHearth', (0.8, 2.2, 2.2), (-4.55, 6.4, Z2 + 1.1), m=STONE_D, bevel=0.04, coll_=C['04_Keep_Interior'])
box('KitHearth_in', (0.3, 1.5, 1.3), (-4.35, 6.4, Z2 + 0.75), m=mat('soot', '#4A3B33', rough=1.0, mottle=0.04),
    bevel=0.0, coll_=C['04_Keep_Interior'])
for i, dy in enumerate([-0.3, 0.15]):
    cone(f'KitFire{i}', 0.24, 0.55, (-4.3, 6.4 + dy, Z2 + 0.55), m=FIRE, seg=8,
         coll_=C['04_Keep_Interior'], bevel=0.0)
ld = bpy.data.lights.new('KitFireL', 'POINT')
ld.energy = 90
ld.color = (1.0, 0.6, 0.3)
ld.shadow_soft_size = 0.4
lo = bpy.data.objects.new('KitFireL', ld)
lo.location = (-3.9, 6.4, Z2 + 0.9)
C['10_Lights'].objects.link(lo)
# 大锅
sphere('Cauldron', 0.42, (-3.5, 6.4, Z2 + 0.62), m=IRON, seg=16, ring=10,
       coll_=C['04_Keep_Interior'], scale=(1, 1, 0.8))
torus('Cauldron_rim', 0.4, 0.04, (-3.5, 6.4, Z2 + 0.92), m=IRON, maj=16, mi=6, coll_=C['04_Keep_Interior'])
table('KitTable', -2.6, 3.6, Z2, 2.6, 1.1, 0.85, WOOD_L)
for i in range(4):
    sphere(f'Veg{i}', 0.1, (-3.2 + i * 0.35, 3.5 + (i % 2) * 0.25, Z2 + 0.93),
           m=[mat('veg1', '#C97B4E', rough=0.8), mat('veg2', '#8FA35E', rough=0.8),
              mat('veg3', '#C4553F', rough=0.8), mat('veg4', '#D8B45C', rough=0.8)][i],
           seg=10, ring=8, coll_=C['04_Keep_Interior'])
barrel('KitBarrel1', -4.3, 1.6, Z2, 0.34, 0.85)
barrel('KitBarrel2', -3.5, 1.5, Z2, 0.30, 0.75)
barrel('KitBarrel3', -4.3, 2.5, Z2, 0.30, 0.7)
# 挂草药
for i in range(6):
    x = -4.2 + (i % 3) * 0.55
    y = 5.0 + (i // 3) * 0.7
    tube(f'Herb{i}', [(x, y, Z2 + 3.6), (x, y, Z2 + 2.9)], 0.03, mat('herb', '#7E8E62', rough=0.9),
         C['04_Keep_Interior'], res=1)
    sphere(f'HerbB{i}', 0.16, (x, y, Z2 + 2.85), m=mat('herb', '#7E8E62', rough=0.9),
           seg=8, ring=6, coll_=C['04_Keep_Interior'], scale=(1, 1, 1.4))
# 书架（厨房小架）
shelf('KitShelf', -4.6, 8.4, Z2, 2.0, 2.2, 0.4, math.pi / 2, 3)
for i in range(5):
    cyl(f'Pot{i}', 0.11, 0.18, (-4.45, 7.6 + i * 0.35, Z2 + 1.4), m=mat('clay', '#C08B63', rough=0.9),
        seg=10, coll_=C['04_Keep_Interior'], bevel=0.01)

# 书房
rug('LibRug', 2.6, 5.0, Z2, 3.8, 3.4, RED)
shelf('LibShelf1', 4.5, 2.2, Z2, 2.6, 3.0, 0.42, math.pi / 2, 4)
shelf('LibShelf2', 4.5, 5.0, Z2, 2.2, 3.0, 0.42, math.pi / 2, 4)
shelf('LibShelf3', 1.25, 9.0, Z2, 1.6, 2.8, 0.42, 0.0, 4)
table('LibDesk', 2.2, 4.6, Z2, 1.8, 1.0, 0.78, WOOD_D)
box('LibBook', (0.5, 0.36, 0.06), (2.0, 4.6, Z2 + 0.83), m=CREAM, bevel=0.01, coll_=C['04_Keep_Interior'])
box('LibBook2', (0.5, 0.36, 0.03), (2.0, 4.6, Z2 + 0.88), (0, 0, 0.1), CREAM, 0.0, 1, C['04_Keep_Interior'])
chair('LibChair', 2.2, 3.9, Z2, math.pi, WOOD_D)
candle('LibCandle', 2.7, 4.5, Z2 + 0.82, 0.22, light=True)
# 地球仪
cyl('Globe_stand', 0.05, 0.9, (1.0, 3.2, Z2 + 0.45), m=WOOD_D, seg=8, coll_=C['04_Keep_Interior'])
sphere('Globe', 0.34, (1.0, 3.2, Z2 + 1.15), m=mat('globe', '#B7C4B0', rough=0.7, mottle=0.1),
       seg=18, ring=12, coll_=C['04_Keep_Interior'])
torus('Globe_ring', 0.38, 0.015, (1.0, 3.2, Z2 + 1.15), (math.radians(20), 0, 0), GOLD,
      coll_=C['04_Keep_Interior'], maj=24, mi=5)
# 梯子
for s in (-1, 1):
    cyl(f'LibLadder{s}', 0.035, 2.6, (4.1 + s * 0.24, 3.9, Z2 + 1.3), (0.16, 0, 0), WOOD,
        seg=6, coll_=C['04_Keep_Interior'], bevel=0.0)
for i in range(6):
    box(f'LibRung{i}', (0.52, 0.05, 0.04), (4.1, 3.9, Z2 + 0.3 + i * 0.4), (0, 0, 0), WOOD,
        0.0, 1, C['04_Keep_Interior'])

# ---------------------------------------------------------------- 三层 卧室 + 育婴房
Z3 = FL[2]
box('Partition3', (9.6, 0.2, 3.75), (0, 5.2, Z3 + 1.875), m=PLASTER, bevel=0.02, coll_=C['04_Keep_Interior'])
box('Partition3_door', (1.1, 0.22, 2.2), (-2.4, 5.2, Z3 + 1.1), m=mat('dark', '#4A3B31', rough=0.9, mottle=0.02),
    bevel=0.0, coll_=C['04_Keep_Interior'])
rug('BedRug', -1.0, 2.6, Z3, 4.2, 3.4, BLUE)
# 四柱床
BX, BY = -1.6, 2.3
box('BedFrame', (2.1, 3.0, 0.35), (BX, BY, Z3 + 0.3), m=WOOD_D, bevel=0.03, coll_=C['04_Keep_Interior'])
box('Mattress', (1.95, 2.85, 0.28), (BX, BY, Z3 + 0.6), m=CREAM, bevel=0.08, coll_=C['04_Keep_Interior'])
box('Blanket', (2.0, 2.0, 0.14), (BX, BY - 0.35, Z3 + 0.78), m=RED, bevel=0.06, coll_=C['04_Keep_Interior'])
box('Pillow', (1.4, 0.5, 0.22), (BX, BY + 1.1, Z3 + 0.82), m=CREAM, bevel=0.08, coll_=C['04_Keep_Interior'])
for sx in (-1, 1):
    for sy in (-1, 1):
        cyl(f'BedPost{sx}{sy}', 0.075, 2.6, (BX + sx * 1.0, BY + sy * 1.42, Z3 + 1.45), m=WOOD_D,
            seg=10, coll_=C['04_Keep_Interior'], bevel=0.01)
        sphere(f'BedFin{sx}{sy}', 0.11, (BX + sx * 1.0, BY + sy * 1.42, Z3 + 2.8), m=GOLD,
               seg=10, ring=8, coll_=C['04_Keep_Interior'])
box('BedCanopy', (2.25, 3.1, 0.1), (BX, BY, Z3 + 2.75), m=RED, bevel=0.02, coll_=C['04_Keep_Interior'])
for sy in (-1, 1):
    box(f'BedCurtain{sy}', (2.1, 0.06, 1.7), (BX, BY + sy * 1.4, Z3 + 1.95), m=RED, bevel=0.0,
        coll_=C['04_Keep_Interior'])
# 箱子 / 梳妆 / 壁炉
box('Chest', (1.4, 0.7, 0.65), (-3.6, 1.2, Z3 + 0.33), m=WOOD, bevel=0.03, coll_=C['04_Keep_Interior'])
box('Chest_band', (1.42, 0.72, 0.08), (-3.6, 1.2, Z3 + 0.55), m=IRON, bevel=0.0, coll_=C['04_Keep_Interior'])
box('WashStand', (0.8, 0.6, 0.85), (3.6, 1.3, Z3 + 0.42), m=WOOD_L, bevel=0.03, coll_=C['04_Keep_Interior'])
cyl('Basin', 0.24, 0.12, (3.6, 1.3, Z3 + 0.9), m=CREAM, seg=16, coll_=C['04_Keep_Interior'], bevel=0.02)
tapestry('TapBed', -4.72, 2.6, Z3 + 3.4, 2.2, 2.6, math.pi / 2, GREEN)
# 窗边座
box('WindowSeat', (0.7, 2.0, 0.45), (4.4, 2.0, Z3 + 0.22), m=WOOD, bevel=0.03, coll_=C['04_Keep_Interior'])
box('WindowSeatC', (0.72, 1.9, 0.12), (4.4, 2.0, Z3 + 0.5), m=RED, bevel=0.04, coll_=C['04_Keep_Interior'])
candle('BedCandle', 3.6, 1.9, Z3 + 0.92, 0.2, light=True)

# 育婴房
rug('NurseryRug', 1.0, 7.2, Z3, 3.2, 2.8, GREEN)
box('Cot', (0.9, 1.5, 0.5), (-3.3, 8.3, Z3 + 0.4), m=WOOD_L, bevel=0.03, coll_=C['04_Keep_Interior'])
box('CotMattress', (0.8, 1.4, 0.16), (-3.3, 8.3, Z3 + 0.7), m=CREAM, bevel=0.06, coll_=C['04_Keep_Interior'])
box('CotPillow', (0.6, 0.35, 0.12), (-3.3, 8.8, Z3 + 0.8), m=CREAM, bevel=0.05, coll_=C['04_Keep_Interior'])
# 摇马
box('HorseBody', (0.7, 0.28, 0.3), (0.4, 7.0, Z3 + 0.55), m=WOOD_L, bevel=0.06, coll_=C['04_Keep_Interior'])
box('HorseHead', (0.22, 0.2, 0.45), (0.68, 7.0, Z3 + 0.85), (0, 0.35, 0), WOOD_L, 0.04, 2, C['04_Keep_Interior'])
for s in (-1, 1):
    for sy in (-1, 1):
        cyl(f'HorseLeg{s}{sy}', 0.045, 0.42, (0.4 + s * 0.25, 7.0 + sy * 0.1, Z3 + 0.3), m=WOOD_L,
            seg=6, coll_=C['04_Keep_Interior'], bevel=0.0)
for s in (-1, 1):
    tube(f'Rocker{s}', [(0.05, 7.0 + s * 0.14, Z3 + 0.08), (0.4, 7.0 + s * 0.14, Z3 + 0.02),
                        (0.75, 7.0 + s * 0.14, Z3 + 0.08)], 0.035, WOOD_D, C['04_Keep_Interior'], res=1)
# 玩具城堡
for i in range(3):
    box(f'ToyTower{i}', (0.16, 0.16, 0.35 + i * 0.05), (-1.9 + i * 0.3, 6.6, Z3 + 0.18), m=CREAM,
        bevel=0.01, coll_=C['04_Keep_Interior'])
    cone(f'ToyRoof{i}', 0.13, 0.18, (-1.9 + i * 0.3, 6.6, Z3 + 0.44 + i * 0.05), m=RED, seg=8,
         coll_=C['04_Keep_Interior'])

# ---------------------------------------------------------------- 四层 观星台
Z4 = FL[3]
rug('ObsRug', 0, 5.0, Z4, 3.6, 3.0, BLUE)
table('ObsTable', -1.2, 4.6, Z4, 2.4, 1.2, 0.8, WOOD_D)
box('StarChart', (1.4, 0.9, 0.02), (-1.2, 4.6, Z4 + 0.82), m=mat('chart', '#E8DCC0', rough=0.9),
    bevel=0.0, coll_=C['04_Keep_Interior'])
for i in range(9):
    sphere(f'Star{i}', 0.02, (-1.7 + (i * 37 % 100) / 100 * 1.0, 4.25 + (i * 53 % 100) / 100 * 0.7, Z4 + 0.85),
           m=GOLD, seg=6, ring=4, coll_=C['04_Keep_Interior'])
# 望远镜
TX, TY = 1.4, 6.6
for i in range(3):
    a = math.pi * 2 * i / 3
    cyl(f'TeleLeg{i}', 0.035, 1.5, (TX + math.cos(a) * 0.35, TY + math.sin(a) * 0.35, Z4 + 0.75),
        (math.cos(a) * 0.2, math.sin(a) * 0.2, 0), WOOD_D, seg=6, coll_=C['04_Keep_Interior'], bevel=0.0)
cyl('TeleTube', 0.13, 1.9, (TX, TY, Z4 + 1.75), (math.radians(58), 0, math.radians(-35)), GOLD,
    seg=16, coll_=C['04_Keep_Interior'], r2=0.1, bevel=0.01)
cyl('TeleTube2', 0.1, 0.5, (TX + 0.62, TY + 0.5, Z4 + 2.2), (math.radians(58), 0, math.radians(-35)),
    IRON, seg=16, coll_=C['04_Keep_Interior'], bevel=0.01)
# 卷轴架 / 乌鸦
shelf('ObsShelf', -4.5, 8.2, Z4, 2.2, 2.4, 0.4, math.pi / 2, 3)
for i in range(5):
    cyl(f'Scroll{i}', 0.07, 0.5, (-4.35, 7.3 + i * 0.4, Z4 + 1.5), (0, math.pi / 2, 0), CREAM,
        seg=8, coll_=C['04_Keep_Interior'], bevel=0.01)
box('RavenPerch', (1.2, 0.3, 0.1), (-1.4, 8.9, Z4 + 1.4), m=WOOD_D, bevel=0.02, coll_=C['04_Keep_Interior'])
for i in range(3):
    sphere(f'Raven{i}', 0.14, (-1.8 + i * 0.4, 8.9, Z4 + 1.58), m=mat('raven', '#3E3A40', rough=0.8),
           seg=10, ring=8, coll_=C['04_Keep_Interior'], scale=(1.3, 0.8, 0.9))
    cone(f'RavenB{i}', 0.05, 0.14, (-1.7 + i * 0.4, 8.76, Z4 + 1.6), (math.pi / 2, 0, 0),
         mat('gold', '#DDB25E', rough=0.4), seg=6, coll_=C['04_Keep_Interior'])
candle('ObsCandle', 0.2, 8.7, Z4 + 1.45, 0.2, light=True)
# 火盆
cyl('Brazier', 0.36, 0.3, (-3.6, 1.6, Z4 + 0.6), m=IRON, seg=14, coll_=C['04_Keep_Interior'], bevel=0.02)
for i in range(3):
    cone(f'BrazierF{i}', 0.14, 0.4, (-3.6 + (i - 1) * 0.1, 1.6, Z4 + 0.85), m=FIRE, seg=8,
         coll_=C['04_Keep_Interior'], bevel=0.0)
ld = bpy.data.lights.new('BrazierL', 'POINT')
ld.energy = 60
ld.color = (1.0, 0.6, 0.3)
ld.shadow_soft_size = 0.3
lo = bpy.data.objects.new('BrazierL', ld)
lo.location = (-3.6, 1.6, Z4 + 1.0)
C['10_Lights'].objects.link(lo)

# ---------------------------------------------------------------- 室内补光
def fill(name, x, y, z, size, energy, rot=(0, 0, 0), color=(1.0, 0.92, 0.80)):
    ld = bpy.data.lights.new(name, 'AREA')
    ld.energy = energy
    ld.size = size
    ld.color = color
    ld.use_shadow = False
    lo = bpy.data.objects.new(name, ld)
    lo.location = (x, y, z)
    lo.rotation_euler = rot
    C['10_Lights'].objects.link(lo)


for i, z in enumerate(FL):
    fill(f'FillA{i}', -1.5, 4.0, z + 3.6, 4.5, 120, (math.pi, 0, 0))
    fill(f'FillB{i}', 2.2, 6.5, z + 3.6, 4.0, 90, (math.pi, 0, 0))
fill('FillHallS', 0, 1.5, FL[0] + 2.0, 3.0, 70, (0, math.pi / 2, 0), (1.0, 0.85, 0.7))

print('INTERIOR DONE', len(C['04_Keep_Interior'].objects))
