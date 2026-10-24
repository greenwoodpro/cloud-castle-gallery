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
for o in list(C['06_Courtyard'].objects):
    bpy.data.objects.remove(o, do_unlink=True)

STONE = bpy.data.materials.get('M_stone') or mat('stone', '#E4D5BA')
STONE_L = bpy.data.materials.get('M_stone_l') or mat('stone_l', '#F3EADA')
STONE_D = bpy.data.materials.get('M_stone_d') or mat('stone_d', '#CBB794')
ROOF = bpy.data.materials.get('M_roof') or mat('roof', '#C4715B')
WOOD = mat('wood', '#8C6547', rough=0.85, bump=0.06)
WOOD_D = mat('wood_d', '#5C4130', rough=0.85, bump=0.06)
WOOD_L = mat('wood_l', '#BC9166', rough=0.85, bump=0.05)
IRON = mat('iron', '#6E6A66', rough=0.5, metal=0.55)
GOLD = mat('gold', '#DDB25E', rough=0.35, metal=0.7)
CREAM = mat('cloth_cream', '#EFE4CE', rough=0.9, mottle=0.06)
RED = mat('cloth_red', '#BF5F57', rough=0.9, mottle=0.06)
BLUE = mat('cloth_blue', '#8FA8C8', rough=0.9, mottle=0.06)
GREEN = mat('cloth_green', '#8CA47E', rough=0.9, mottle=0.06)
STRAW = mat('straw', '#D8C08A', rough=1.0, mottle=0.12, scale=6)
FIRE = mat('fire', '#F2A24E', rough=0.4, emit=4.0, emit_col='#FFB65E', mottle=0.0)
FLAME = mat('flame', '#FFD79A', rough=0.3, emit=9.0, emit_col='#FFE0A8', mottle=0.0)
LEAF = mat('leaf', '#7FA06A', rough=0.9, mottle=0.1)
LEAF_D = mat('leaf_d', '#5F8055', rough=0.9, mottle=0.1)
BLOOM = [mat('bl1', '#E8A0A6', rough=0.85), mat('bl2', '#E8C879', rough=0.85),
         mat('bl3', '#C99BC4', rough=0.85), mat('bl4', '#F0E6D2', rough=0.85)]
CUT = C['99_Hide_For_Interior_View']


def ring_wall(name, r_out, r_in, h, loc, m, coll_, seg=32):
    bm = bmesh.new()
    to, ti, bo, bi = [], [], [], []
    for i in range(seg):
        a = 2 * math.pi * i / seg
        c, s = math.cos(a), math.sin(a)
        to.append(bm.verts.new((c * r_out, s * r_out, h * 0.5)))
        ti.append(bm.verts.new((c * r_in, s * r_in, h * 0.5)))
        bo.append(bm.verts.new((c * r_out, s * r_out, -h * 0.5)))
        bi.append(bm.verts.new((c * r_in, s * r_in, -h * 0.5)))
    for i in range(seg):
        j = (i + 1) % seg
        bm.faces.new((to[i], to[j], ti[j], ti[i]))
        bm.faces.new((bo[i], bi[i], bi[j], bo[j]))
        bm.faces.new((to[i], bo[i], bo[j], to[j]))
        bm.faces.new((ti[i], ti[j], bi[j], bi[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _finish(bm, name, m, coll_, loc, (0, 0, 0), (1, 1, 1))


# ---------------------------------------------------------------- 水井
WX, WY = -0.6, -5.6
ring_wall('WellRing', 1.15, 0.88, 0.95, (WX, WY, 0.47), STONE, C['06_Courtyard'], 32)
cyl('WellWater', 0.88, 0.05, (WX, WY, 0.25), m=mat('water', '#9FCBD3', rough=0.1, alpha=0.9),
    seg=28, coll_=C['06_Courtyard'], bevel=0.0)
for sx in (-1, 1):
    box(f'WellPost{sx}', (0.14, 0.14, 2.1), (WX + sx * 1.05, WY, 1.85), m=WOOD_D, bevel=0.01,
        coll_=C['06_Courtyard'])
box('WellBeam', (2.5, 0.16, 0.16), (WX, WY, 2.85), m=WOOD, bevel=0.01, coll_=C['06_Courtyard'])
for sx in (-1, 1):
    box(f'WellRoof{sx}', (1.5, 1.9, 0.1), (WX + sx * 0.55, WY, 3.25), (0, sx * math.radians(32), 0),
        ROOF, 0.02, 1, C['06_Courtyard'])
cyl('WellRope', 0.03, 1.2, (WX, WY, 2.3), m=STRAW, seg=6, coll_=C['06_Courtyard'], bevel=0.0)
cyl('WellBucket', 0.18, 0.26, (WX, WY, 1.6), m=WOOD, seg=12, coll_=C['06_Courtyard'], r2=0.2, bevel=0.01)

# ---------------------------------------------------------------- 集市摊位
def stall(name, x, y, rot, awning=RED, w=2.6, d=1.6):
    for sx in (-1, 1):
        for sy in (-1, 1):
            lx = x + math.cos(rot) * sx * w / 2 - math.sin(rot) * sy * d / 2
            ly = y + math.sin(rot) * sx * w / 2 + math.cos(rot) * sy * d / 2
            cyl(f'{name}_p{sx}{sy}', 0.05, 2.1, (lx, ly, 1.05), m=WOOD_D, seg=6,
                coll_=C['06_Courtyard'], bevel=0.0)
    box(f'{name}_counter', (w, 0.6, 0.1), (x, y, 0.9), (0, 0, rot), WOOD_L, 0.02, 1, C['06_Courtyard'])
    box(f'{name}_cloth', (w + 0.1, 0.66, 0.5), (x, y, 0.68), (0, 0, rot), awning, 0.0, 1, C['06_Courtyard'])
    for i in range(5):
        for j in range(2):
            px = -w / 2 + 0.35 + i * (w - 0.7) / 4
            py = -d / 2 + 0.25 + j * 0.6
            gx = x + math.cos(rot) * px - math.sin(rot) * py
            gy = y + math.sin(rot) * px + math.cos(rot) * py
            sphere(f'{name}_g{i}{j}', 0.11, (gx, gy, 0.99), m=BLOOM[(i + j) % 4],
                   seg=8, ring=6, coll_=C['06_Courtyard'])
    # 条纹雨棚
    for i in range(6):
        px = -w / 2 + (i + 0.5) * w / 6
        gx = x + math.cos(rot) * px
        gy = y + math.sin(rot) * px
        box(f'{name}_a{i}', (w / 6, d + 0.5, 0.07), (gx, gy, 2.15), (0, 0, rot),
            awning if i % 2 == 0 else CREAM, 0.0, 1, C['06_Courtyard'])


stall('Stall1', -6.4, -7.2, math.radians(6), RED)
stall('Stall2', -3.2, -8.4, math.radians(-4), BLUE, 2.2, 1.5)
stall('Stall3', 3.4, -8.6, math.radians(3), GREEN, 2.4, 1.5)

# ---------------------------------------------------------------- 马厩
SX, SY = -9.6, -1.2
box('StableBack', (6.0, 0.25, 2.6), (SX, SY - 1.9, 1.3), m=WOOD, bevel=0.02, coll_=C['06_Courtyard'])
for sx in (-1, 1):
    box(f'StableSide{sx}', (0.25, 4.0, 2.6), (SX + sx * 3.0, SY, 1.3), m=WOOD, bevel=0.02,
        coll_=C['06_Courtyard'])
    for i in range(3):
        cyl(f'StablePost{sx}{i}', 0.1, 2.7, (SX + sx * 3.0, SY - 1.7 + i * 1.7, 1.35), m=WOOD_D,
            seg=8, coll_=C['06_Courtyard'], bevel=0.0)
box('StableRoof', (6.8, 4.6, 0.16), (SX, SY + 0.2, 2.85), (math.radians(-9), 0, 0), ROOF,
    0.02, 1, C['06_Courtyard'])
for i in range(3):
    box(f'StableDiv{i}', (0.12, 2.2, 1.5), (SX - 2.0 + i * 2.0, SY - 0.7, 0.75), m=WOOD_D,
        bevel=0.01, coll_=C['06_Courtyard'])
    box(f'Hay{i}', (1.3, 1.0, 0.55), (SX - 2.0 + i * 2.0, SY - 1.3, 0.28), m=STRAW,
        bevel=0.06, coll_=C['06_Courtyard'])
box('Trough', (3.2, 0.5, 0.4), (SX, SY + 1.2, 0.2), m=WOOD_D, bevel=0.03, coll_=C['06_Courtyard'])
cyl('TroughWater', 0.2, 0.06, (SX, SY + 1.2, 0.38), m=mat('water', '#9FCBD3', rough=0.1, alpha=0.9),
    seg=20, coll_=C['06_Courtyard'], bevel=0.0)
# 干草堆
for i in range(3):
    cyl(f'HayBale{i}', 0.55, 0.9, (SX + 4.2 + (i % 2) * 0.2, SY + 2.0 + i * 0.5, 0.55),
        (0, math.pi / 2, 0.3 * i), STRAW, seg=12, coll_=C['06_Courtyard'], bevel=0.04)

# ---------------------------------------------------------------- 铁匠铺
FX, FY = 8.6, -6.2
box('ForgeBase', (2.2, 1.8, 1.0), (FX, FY, 0.5), m=STONE_D, bevel=0.04, coll_=C['06_Courtyard'])
box('ForgeTop', (2.0, 1.6, 0.2), (FX, FY, 1.05), m=mat('soot', '#4A3B33', rough=1.0, mottle=0.05),
    bevel=0.03, coll_=C['06_Courtyard'])
for i in range(3):
    cone(f'ForgeFire{i}', 0.2, 0.5, (FX - 0.3 + i * 0.3, FY, 1.25), m=FIRE, seg=8,
         coll_=C['06_Courtyard'], bevel=0.0)
box('ForgeHood', (1.4, 1.4, 0.3), (FX, FY, 2.6), m=STONE_D, bevel=0.03, coll_=C['06_Courtyard'])
cyl('ForgeChimney', 0.42, 3.4, (FX, FY, 3.4), m=STONE, seg=12, coll_=C['06_Courtyard'], bevel=0.03)
# 铁砧
box('AnvilBase', (0.4, 0.4, 0.55), (FX - 1.6, FY + 0.4, 0.28), m=WOOD_D, bevel=0.02, coll_=C['06_Courtyard'])
box('Anvil', (0.7, 0.3, 0.24), (FX - 1.6, FY + 0.4, 0.66), m=IRON, bevel=0.03, coll_=C['06_Courtyard'])
box('AnvilHorn', (0.25, 0.18, 0.12), (FX - 1.2, FY + 0.4, 0.68), (0, 0.4, 0), IRON, 0.02, 1, C['06_Courtyard'])
# 工作台
box('SmithBench', (2.0, 0.7, 0.85), (FX + 0.2, FY + 1.6, 0.42), m=WOOD, bevel=0.03, coll_=C['06_Courtyard'])
for i in range(4):
    box(f'SmithTool{i}', (0.06, 0.3, 0.06), (FX - 0.4 + i * 0.4, FY + 1.6, 0.9), (0, 0.2 * i, 0),
        IRON, 0.0, 1, C['06_Courtyard'])
# 淬火桶
cyl('Quench', 0.38, 0.7, (FX + 1.4, FY + 1.4, 0.35), m=WOOD, seg=14, coll_=C['06_Courtyard'], bevel=0.02)
cyl('QuenchWater', 0.33, 0.06, (FX + 1.4, FY + 1.4, 0.66), m=mat('water', '#9FCBD3', rough=0.1, alpha=0.9),
    seg=14, coll_=C['06_Courtyard'], bevel=0.0)
ld = bpy.data.lights.new('ForgeL', 'POINT')
ld.energy = 150
ld.color = (1.0, 0.5, 0.22)
ld.shadow_soft_size = 0.4
lo = bpy.data.objects.new('ForgeL', ld)
lo.location = (FX, FY + 0.3, 1.6)
C['10_Lights'].objects.link(lo)

# ---------------------------------------------------------------- 玫瑰花园
GX, GY = -9.0, 4.0
# 矮篱
for i in range(4):
    pass
box('GardenHedgeS', (6.2, 0.45, 0.65), (GX, GY - 3.0, 0.32), m=LEAF_D, bevel=0.12, coll_=C['06_Courtyard'])
box('GardenHedgeN', (6.2, 0.45, 0.65), (GX, GY + 3.0, 0.32), m=LEAF_D, bevel=0.12, coll_=C['06_Courtyard'])
for sx in (-1, 1):
    box(f'GardenHedge{sx}', (0.45, 6.0, 0.65), (GX + sx * 3.0, GY, 0.32), m=LEAF_D, bevel=0.12,
        coll_=C['06_Courtyard'])
box('GardenGravel', (5.6, 5.6, 0.06), (GX, GY, 0.03), m=mat('gravel', '#DCCBAE', rough=1.0, mottle=0.15, scale=8),
    bevel=0.0, coll_=C['06_Courtyard'])
# 花圃
for i in range(2):
    for j in range(2):
        bx, by = GX - 1.5 + i * 3.0, GY - 1.4 + j * 2.8
        box(f'Bed{i}{j}', (1.8, 1.6, 0.18), (bx, by, 0.11), m=mat('soil', '#8B6E52', rough=1.0, mottle=0.1),
            bevel=0.04, coll_=C['06_Courtyard'])
        for k in range(7):
            a = k * 2.1
            fx = bx + math.cos(a) * 0.6
            fy = by + math.sin(a) * 0.5
            cyl(f'Stem{i}{j}{k}', 0.02, 0.35, (fx, fy, 0.35), m=LEAF, seg=5,
                coll_=C['06_Courtyard'], bevel=0.0)
            sphere(f'Bloom{i}{j}{k}', 0.09, (fx, fy, 0.53), m=BLOOM[k % 4], seg=8, ring=6,
                   coll_=C['06_Courtyard'])
# 玫瑰：石台 + 玻璃罩
RX, RY = GX, GY
cyl('RosePedestal', 0.5, 0.95, (RX, RY, 0.47), m=STONE_L, seg=16, coll_=C['06_Courtyard'], r2=0.42, bevel=0.03)
cyl('RosePot', 0.26, 0.3, (RX, RY, 1.08), m=mat('clay', '#C08B63', rough=0.9), seg=14,
    coll_=C['06_Courtyard'], bevel=0.02)
cyl('RoseStem', 0.025, 0.55, (RX, RY, 1.48), m=LEAF_D, seg=6, coll_=C['06_Courtyard'], bevel=0.0)
for i in range(3):
    a = math.pi * 2 * i / 3
    sphere(f'RoseLeaf{i}', 0.11, (RX + math.cos(a) * 0.12, RY + math.sin(a) * 0.12, 1.35 + i * 0.08),
           m=LEAF, seg=8, ring=6, coll_=C['06_Courtyard'], scale=(1.5, 0.7, 0.4))
for i, (rr, zz) in enumerate([(0.16, 1.78), (0.13, 1.85), (0.1, 1.9)]):
    sphere(f'RosePetal{i}', rr, (RX, RY, zz), m=mat('rose', '#D2706B', rough=0.75, mottle=0.08),
           seg=12, ring=8, coll_=C['06_Courtyard'], scale=(1, 1, 0.8))
sphere('RoseCloche', 0.42, (RX, RY, 1.52), m=mat('cloche', '#DCEBF0', rough=0.05, alpha=0.16,
       mottle=0.0, transmission=0.9), seg=20, ring=12, coll_=C['06_Courtyard'], scale=(1, 1, 1.32))
torus('ClocheRim', 0.3, 0.035, (RX, RY, 1.05), m=GOLD, maj=20, mi=6, coll_=C['06_Courtyard'])
# 长椅
box('GardenBench', (1.6, 0.45, 0.1), (GX - 2.0, GY + 1.6, 0.46), m=WOOD, bevel=0.03, coll_=C['06_Courtyard'])
box('GardenBenchB', (1.6, 0.1, 0.5), (GX - 2.0, GY + 1.85, 0.72), m=WOOD, bevel=0.03, coll_=C['06_Courtyard'])
for sx in (-1, 1):
    box(f'GardenBenchL{sx}', (0.12, 0.4, 0.45), (GX - 2.0 + sx * 0.65, GY + 1.6, 0.22), m=WOOD_D,
        bevel=0.01, coll_=C['06_Courtyard'])
# 拱形花架
for sx in (-1, 1):
    cyl(f'Arbor{sx}', 0.07, 2.4, (GX + sx * 1.2, GY + 2.6, 1.2), m=WOOD_D, seg=8,
        coll_=C['06_Courtyard'], bevel=0.0)
for i in range(5):
    a = math.pi * i / 4
    x = GX - 1.2 + (i / 4) * 2.4
    z = 2.4 + math.sin(a) * 0.55
    sphere(f'ArborRose{i}', 0.14, (x, GY + 2.6, z), m=mat('rose', '#D2706B', rough=0.8),
           seg=8, ring=6, coll_=C['06_Courtyard'])

# ---------------------------------------------------------------- 杂物
def barrel(name, x, y, z=0.0, r=0.32, h=0.8, rot=0.0):
    cyl(name, r, h, (x, y, z + h / 2), m=WOOD, seg=14, coll_=C['06_Courtyard'], r2=r * 0.92, bevel=0.02)
    for zz in (0.2, 0.5, 0.8):
        torus(f'{name}_h{zz}', r * 0.99, 0.02, (x, y, z + h * zz), m=IRON, maj=14, mi=5,
              coll_=C['06_Courtyard'])


for i, (x, y) in enumerate([(4.6, -4.2), (5.2, -3.6), (4.9, -5.0)]):
    barrel(f'CBarrel{i}', x, y, 0, 0.3, 0.78)
for i in range(3):
    box(f'Crate{i}', (0.7, 0.7, 0.65), (-3.0 + i * 0.75, -3.4, 0.33), (0, 0, 0.2 * i), WOOD,
        bevel=0.03, coll_=C['06_Courtyard'])
# 柴堆
for i in range(3):
    for j in range(5):
        cyl(f'Wood{i}{j}', 0.09, 1.2, (10.4, -2.2 + j * 0.2, 0.12 + i * 0.19),
            (math.pi / 2, 0, 0), WOOD_D, seg=6, coll_=C['06_Courtyard'], bevel=0.0)
# 推车
box('CartBed', (1.6, 2.4, 0.12), (-6.6, -3.0, 0.62), m=WOOD, bevel=0.02, coll_=C['06_Courtyard'])
for sx in (-1, 1):
    box(f'CartSide{sx}', (0.1, 2.4, 0.45), (-6.6 + sx * 0.78, -3.0, 0.85), m=WOOD, bevel=0.02,
        coll_=C['06_Courtyard'])
    cyl(f'CartWheel{sx}', 0.55, 0.12, (-6.6 + sx * 0.85, -3.6, 0.55), (0, math.pi / 2, 0),
        WOOD_D, seg=14, coll_=C['06_Courtyard'], bevel=0.02)
    torus(f'CartRim{sx}', 0.55, 0.04, (-6.6 + sx * 0.85, -3.6, 0.55), (0, math.pi / 2, 0),
          IRON, maj=18, mi=5, coll_=C['06_Courtyard'])
cyl('CartHandle', 0.05, 1.6, (-6.6, -1.4, 0.75), (math.radians(20), 0, 0), WOOD, seg=6,
    coll_=C['06_Courtyard'], bevel=0.0)
for i in range(4):
    sphere(f'CartHay{i}', 0.3, (-6.6 + (i % 2) * 0.5 - 0.25, -3.3 + i * 0.35, 0.8), m=STRAW,
           seg=8, ring=6, coll_=C['06_Courtyard'], scale=(1.2, 1.2, 0.7))
# 晾衣绳
for i in range(2):
    cyl(f'LaundryPole{i}', 0.05, 2.2, (-2.0 + i * 6.0, -10.4, 1.1), m=WOOD_D, seg=6,
        coll_=C['06_Courtyard'], bevel=0.0)
tube('LaundryLine', [(-2.0, -10.4, 2.1), (1.0, -10.4, 2.02), (4.0, -10.4, 2.1)], 0.012, CREAM, C['06_Courtyard'], res=1)
for i in range(4):
    box(f'Laundry{i}', (0.7, 0.04, 0.9), (-1.2 + i * 1.5, -10.4, 1.65), m=[CREAM, BLUE, RED, CREAM][i],
        bevel=0.0, coll_=C['06_Courtyard'])
# 路灯
for i, (lx, ly) in enumerate([(-4.2, -9.6), (4.2, -9.6)]):
    cyl(f'LampPost{i}', 0.06, 2.4, (lx, ly, 1.2), m=IRON, seg=8, coll_=C['06_Courtyard'], bevel=0.0)
    box(f'LampBox{i}', (0.26, 0.26, 0.4), (lx, ly, 2.55), m=mat('lampglass', '#F5DFA8', rough=0.2,
        emit=1.2, emit_col='#FFD98A'), bevel=0.02, coll_=C['06_Courtyard'])
    cone(f'LampCap{i}', 0.24, 0.18, (lx, ly, 2.84), m=IRON, seg=8, coll_=C['06_Courtyard'])

print('COURTYARD DONE', len(C['06_Courtyard'].objects))
