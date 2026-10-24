import sys, os, math, importlib
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
import lib
importlib.reload(lib)
from lib import *
from lib import _finish
from mathutils import Vector, Matrix

C = {n: bpy.data.collections[n] for n in
     ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
      '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
      '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']}
for o in list(C['07_Nature'].objects):
    bpy.data.objects.remove(o, do_unlink=True)
for o in list(C['08_Clouds'].objects):
    bpy.data.objects.remove(o, do_unlink=True)

STONE = bpy.data.materials.get('M_stone') or mat('stone', '#E4D5BA')
STONE_L = bpy.data.materials.get('M_stone_l') or mat('stone_l', '#F3EADA')
STONE_D = bpy.data.materials.get('M_stone_d') or mat('stone_d', '#CBB794')
ROOF = bpy.data.materials.get('M_roof') or mat('roof', '#C4715B')
WOOD = mat('wood', '#8C6547', rough=0.85, bump=0.06)
WOOD_D = mat('wood_d', '#5C4130', rough=0.85, bump=0.06)
IRON = mat('iron', '#6E6A66', rough=0.5, metal=0.55)
LEAF = mat('leaf', '#7FA06A', rough=0.92, mottle=0.14, scale=4)
LEAF_D = mat('leaf_d', '#5F8055', rough=0.92, mottle=0.14, scale=4)
LEAF_L = mat('leaf_l', '#9DBE7C', rough=0.92, mottle=0.14, scale=4)
LEAF_Y = mat('leaf_y', '#B7BE6A', rough=0.92, mottle=0.14, scale=4)
PINE = mat('pine', '#5E7A5C', rough=0.92, mottle=0.14, scale=4)
PINE_D = mat('pine_d', '#4E6A52', rough=0.92, mottle=0.14, scale=4)
TRUNK = mat('trunk', '#7A5A42', rough=0.9, bump=0.08)
GRASS = mat('grass_tuft', '#9AB56F', rough=1.0, mottle=0.15, scale=6)
STRAW = mat('straw', '#D8C08A', rough=1.0, mottle=0.12, scale=6)
ROCK = mat('rock', '#C6A882', rough=0.95, mottle=0.16, scale=2.2, bump=0.12)
CLOUD = mat('cloud', '#FBF7EE', rough=1.0, mottle=0.03, emit=0.10, emit_col='#FFF6E8')
BLOOM = [mat('bl1', '#E8A0A6', rough=0.85), mat('bl2', '#E8C879', rough=0.85),
         mat('bl3', '#C99BC4', rough=0.85), mat('bl4', '#F0E6D2', rough=0.85),
         mat('bl5', '#D98F5F', rough=0.85)]


def height(x, y):
    d = max(abs(x) / 17.5, abs(y - 3.0) / 16.5)
    t = max(0.0, min(1.0, (d - 0.98) / (1.30 - 0.98)))
    flat = t * t * (3 - 2 * t)
    roll = (0.55 * math.sin(x * 0.21 + 0.4) * math.cos(y * 0.18) +
            0.30 * math.sin((x + y) * 0.12 + 1.1))
    hill = 4.2 * math.exp(-(((x - 24.0) ** 2 + (y - 20.0) ** 2) / (2 * 7.5 ** 2)))
    knoll = 1.8 * math.exp(-(((x - 20.5) ** 2 + (y + 8.0) ** 2) / (2 * 4.0 ** 2)))
    ridge = 2.8 * math.exp(-(((x + 4.0) ** 2 + (y - 32.0) ** 2) / (2 * 8.0 ** 2)))
    rise = 1.4 * math.exp(-(((x - 10.0) ** 2 + (y - 27.0) ** 2) / (2 * 10.0 ** 2)))
    pond = -1.85 * math.exp(-(((x + 20.0) ** 2 + (y - 1.0) ** 2) / (2 * 3.4 ** 2)))
    return flat * (roll + hill + knoll + ridge + rise) + pond


def inside(x, y, margin=2.0):
    th = math.atan2(y - 4.0, x)
    Rmax = 30.0 + 8.0 * math.sin(th)
    return math.hypot(x, y - 4.0) < Rmax - margin


def merged(name, parts, m, coll_, seg=14, ring=9, smooth=60):
    bm = bmesh.new()
    for (r, loc, sc) in parts:
        mtx = Matrix.Translation(Vector(loc)) @ Matrix.Diagonal(Vector((sc[0], sc[1], sc[2], 1.0)))
        try:
            bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=ring, radius=r, matrix=mtx)
        except TypeError:
            bmesh.ops.create_uvsphere(bm, segments=seg, ring_count=ring, radius=r, matrix=mtx)
    return _finish(bm, name, m, coll_, (0, 0, 0), (0, 0, 0), (1, 1, 1), smooth_angle=smooth)


def pine(x, y, s=1.0, seed=0):
    z = height(x, y)
    rnd = random.Random(seed)
    cyl(f'PineT{seed}', 0.16 * s, 2.4 * s, (x, y, z + 1.2 * s), m=TRUNK, seg=7,
        coll_=C['07_Nature'], bevel=0.0)
    bm = bmesh.new()
    for i, (rr, hh) in enumerate([(1.55, 2.0), (1.22, 1.85), (0.86, 1.7), (0.5, 1.3)]):
        mtx = Matrix.Translation((0, 0, 2.0 * s + i * 1.4 * s))
        bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=11,
                              radius1=rr * s, radius2=0.03 * s, depth=hh * s, matrix=mtx)
    return _finish(bm, f'PineF{seed}', PINE if seed % 3 else PINE_D, C['07_Nature'],
                   (x, y, z), (0, 0, rnd.uniform(0, 6.28)), (1, 1, 1), smooth_angle=32)


def broadleaf(x, y, s=1.0, seed=0, m=None, fruit=False):
    z = height(x, y)
    rnd = random.Random(seed)
    cyl(f'TreeT{seed}', 0.2 * s, 3.0 * s, (x, y, z + 1.5 * s), m=TRUNK, seg=8,
        coll_=C['07_Nature'], bevel=0.0, r2=0.14 * s)
    parts = []
    for i in range(5):
        a = i * 1.7 + rnd.uniform(0, 1)
        rr = rnd.uniform(0.9, 1.35) * s
        parts.append((rr, (x + math.cos(a) * 0.7 * s, y + math.sin(a) * 0.7 * s,
                           z + 3.6 * s + rnd.uniform(-0.4, 0.5) * s),
                      (1.0, 1.0, 0.85)))
    parts.append((1.3 * s, (x, y, z + 4.1 * s), (1.0, 1.0, 0.9)))
    merged(f'TreeF{seed}', parts, m or (LEAF if seed % 2 else LEAF_L), C['07_Nature'], 12, 8)
    if fruit:
        for i in range(7):
            a = i * 2.3
            sphere(f'Fruit{seed}{i}', 0.11 * s,
                   (x + math.cos(a) * 1.1 * s, y + math.sin(a) * 1.1 * s,
                    z + 3.6 * s + math.sin(a * 2) * 0.5 * s),
                   m=mat('fruit', '#D2683F', rough=0.7), seg=8, ring=6, coll_=C['07_Nature'])


def bush(x, y, s=1.0, seed=0):
    z = height(x, y)
    parts = [(0.62 * s, (x, y, z + 0.42 * s), (1.2, 1.1, 0.9)),
             (0.5 * s, (x + 0.5 * s, y + 0.2 * s, z + 0.3 * s), (1.0, 1.0, 0.85)),
             (0.46 * s, (x - 0.45 * s, y - 0.15 * s, z + 0.32 * s), (1.0, 1.0, 0.85))]
    merged(f'Bush{seed}', parts, LEAF_D if seed % 2 else LEAF, C['07_Nature'], 10, 7)


def flowerpatch(x, y, r, n, seed=0):
    z = height(x, y)
    rnd = random.Random(seed)
    for k in range(3):
        parts = []
        for i in range(n // 3 + 1):
            a = rnd.uniform(0, 6.28)
            rr = rnd.uniform(0, r)
            parts.append((rnd.uniform(0.05, 0.09),
                          (x + math.cos(a) * rr, y + math.sin(a) * rr,
                           z + rnd.uniform(0.10, 0.22)), (1, 1, 0.8)))
        merged(f'Flower{seed}_{k}', parts, BLOOM[(seed + k) % 5], C['07_Nature'], 6, 4, 70)


def wheat(x, y, w, d, seed=0):
    z = height(x, y)
    bm = bmesh.new()
    for i in range(int(w / 0.42)):
        for j in range(int(d / 0.42)):
            px = -w / 2 + i * 0.42 + random.uniform(-0.05, 0.05)
            py = -d / 2 + j * 0.42 + random.uniform(-0.05, 0.05)
            hh = random.uniform(0.55, 0.8)
            mtx = Matrix.Translation((px, py, hh * 0.5))
            bmesh.ops.create_cone(bm, cap_ends=False, cap_tris=False, segments=4,
                                  radius1=0.055, radius2=0.012, depth=hh, matrix=mtx)
    ob = _finish(bm, f'Wheat{seed}', STRAW, C['07_Nature'], (x, y, z), (0, 0, 0), (1, 1, 1),
                 smooth_angle=40)
    return ob


# ---------------------------------------------------------------- 植被布置
random.seed(7)
# 北侧松林
for i in range(16):
    a = random.uniform(0, 6.28)
    rr = random.uniform(6, 22)
    x = math.cos(a) * rr
    y = 30 + math.sin(a) * rr * 0.7
    if (abs(x) < 14 and y < 20) or not inside(x, y, 3):
        continue
    pine(x, y, random.uniform(0.85, 1.35), i)

# 东侧阔叶林
for i in range(11):
    a = random.uniform(0, 6.28)
    rr = random.uniform(6, 18)
    x = 23 + math.cos(a) * rr
    y = 10 + math.sin(a) * rr
    if not inside(x, y, 3):
        continue
    broadleaf(x, y, random.uniform(0.8, 1.2), 30 + i)

# 西侧果园
for i in range(4):
    for j in range(3):
        x = -24 + i * 3.4
        y = -12 + j * 3.2
        broadleaf(x, y, 0.72, 60 + i * 3 + j, fruit=True)

# 南坡与草甸
for i in range(6):
    a = random.uniform(-2.4, -0.6)
    rr = random.uniform(20, 27)
    x = math.cos(a) * rr
    y = 4 + math.sin(a) * rr
    if math.hypot(x, y - 4) < 30 and inside(x, y, 3):
        broadleaf(x, y, random.uniform(0.7, 1.0), 90 + i, m=LEAF_Y)

# 灌木
for i in range(16):
    a = random.uniform(0, 6.28)
    rr = random.uniform(16, 30)
    x = math.cos(a) * rr
    y = 4 + math.sin(a) * rr
    if (abs(x) < 16 and -12 < y < 15) or not inside(x, y, 2.5):
        continue
    bush(x, y, random.uniform(0.8, 1.5), i)

# 花丛
for i, (x, y, r) in enumerate([(18, -6, 2.4), (24, -2, 3.0), (14, -12, 2.0),
                               (-16, 12, 2.6), (-8, 18, 2.2), (8, 22, 2.8),
                               (26, 14, 2.2), (-26, -6, 2.0)]):
    flowerpatch(x, y, r, 14, i)

# 麦田梯田（西北）
for i in range(3):
    x = -15 - i * 0.0
    y = 16 + i * 3.2
    box(f'Terr{i}', (7.0 - i * 0.8, 2.8, 0.3), (x, y, height(x, y) + 0.05),
        m=mat('soil', '#8B6E52', rough=1.0, mottle=0.1), bevel=0.05, coll_=C['07_Nature'])
    wheat(x, y, 6.4 - i * 0.8, 2.3, i)

# ---------------------------------------------------------------- 风车
MX, MY = 24.0, 20.0
MZ = height(MX, MY)
cyl('MillBase', 2.3, 1.2, (MX, MY, MZ + 0.6), m=STONE_D, seg=20, coll_=C['07_Nature'], bevel=0.04)
cyl('MillTower', 1.9, 7.0, (MX, MY, MZ + 4.1), m=STONE, seg=20, coll_=C['07_Nature'],
    r2=1.35, bevel=0.03)
cyl('MillBelt', 1.45, 0.3, (MX, MY, MZ + 6.6), m=STONE_L, seg=20, coll_=C['07_Nature'], bevel=0.02)
cone('MillRoof', 1.75, 2.2, (MX, MY, MZ + 8.7), m=ROOF, seg=18, coll_=C['07_Nature'], bevel=0.02)
sphere('MillFin', 0.14, (MX, MY, MZ + 9.85), m=mat('gold', '#DDB25E', rough=0.35, metal=0.7),
       seg=10, ring=8, coll_=C['07_Nature'])
box('MillDoor', (1.0, 0.4, 1.9), (MX, MY - 1.75, MZ + 0.95), m=WOOD_D, bevel=0.02, coll_=C['07_Nature'])
for i in range(3):
    a = math.radians(40 + i * 60)
    box(f'MillWin{i}', (0.36, 0.3, 0.55), (MX + math.cos(a) * 1.6, MY + math.sin(a) * 1.6, MZ + 4.2),
        (0, 0, a), mat('window', '#6E6252', rough=0.6), 0.0, 1, C['07_Nature'])
# 风车叶片
hub = (MX, MY - 1.9, MZ + 7.4)
cyl('MillHub', 0.28, 0.7, hub, (math.pi / 2, 0, 0), WOOD_D, seg=12, coll_=C['07_Nature'], bevel=0.02)
for i in range(4):
    a = math.radians(90 * i + 18)
    dx, dz = math.cos(a), math.sin(a)
    L = 4.6
    box(f'SailSpar{i}', (0.09, 0.09, L), (hub[0] + dx * L * 0.5, hub[1], hub[2] + dz * L * 0.5),
        (0, math.pi / 2 - a, 0), WOOD_D, 0.0, 1, C['07_Nature'])
    for k in range(4):
        t = 0.9 + k * 1.05
        cx = hub[0] + dx * t - dz * 0.34
        cz = hub[2] + dz * t + dx * 0.34
        box(f'SailCloth{i}{k}', (0.66, 0.04, 0.95), (cx, hub[1], cz),
            (0, math.pi / 2 - a, 0), mat('sail', '#EFE4CE', rough=0.95, mottle=0.06),
            0.0, 1, C['07_Nature'])
        box(f'SailBar{i}{k}', (0.72, 0.05, 0.05), (cx, hub[1], cz),
            (0, math.pi / 2 - a, 0), WOOD, 0.0, 1, C['07_Nature'])
    box(f'SailEdge{i}', (0.06, 0.06, L * 0.92), (hub[0] + dx * L * 0.5 - dz * 0.62, hub[1],
        hub[2] + dz * L * 0.5 + dx * 0.62), (0, math.pi / 2 - a, 0), WOOD, 0.0, 1, C['07_Nature'])

# ---------------------------------------------------------------- 石头 / 芦苇
for i in range(14):
    a = random.uniform(0, 6.28)
    rr = random.uniform(14, 31)
    x = math.cos(a) * rr
    y = 4 + math.sin(a) * rr
    if (abs(x) < 15 and -13 < y < 16) or not inside(x, y, 1.5):
        continue
    s = random.uniform(0.5, 1.4)
    chunk(f'Rock{i}', (x, y, height(x, y) + s * 0.25), (s, s * 0.85, s * 0.7), seed=i,
          m=ROCK, coll_=C['07_Nature'], stretch=0.8, amp=0.35)

REED = mat('reed', '#8FA35E', rough=0.95)
for i in range(18):
    a = random.uniform(0, 6.28)
    rr = random.uniform(2.6, 3.6)
    x = -20 + math.cos(a) * rr
    y = 1 + math.sin(a) * rr
    cyl(f'Reed{i}', 0.03, random.uniform(0.8, 1.4), (x, y, height(x, y) + 0.5), m=REED, seg=4,
        coll_=C['07_Nature'], bevel=0.0)

# ---------------------------------------------------------------- 云
def cloud(name, x, y, z, s, n=7, seed=0):
    rnd = random.Random(seed)
    parts = []
    for i in range(n):
        a = rnd.uniform(0, 6.28)
        rr = rnd.uniform(0, s * 1.5)
        parts.append((rnd.uniform(0.5, 1.0) * s,
                      (x + math.cos(a) * rr, y + math.sin(a) * rr * 0.7,
                       z + rnd.uniform(-0.2, 0.35) * s), (1.2, 1.0, 0.75)))
    merged(name, parts, CLOUD, C['08_Clouds'], 14, 9, 70)


random.seed(21)
# 岛下云海
for i in range(16):
    a = 6.28 * i / 16 + random.uniform(-0.1, 0.1)
    rr = random.uniform(54, 88)
    cloud(f'Cloud{i}', math.cos(a) * rr, 4 + math.sin(a) * rr, random.uniform(-78, -62),
          random.uniform(5, 9), 7, i)
# 远处高层云
for i in range(8):
    a = 6.28 * i / 8 + 0.3
    rr = random.uniform(88, 125)
    cloud(f'HighCloud{i}', math.cos(a) * rr, 4 + math.sin(a) * rr, random.uniform(-10, 18),
          random.uniform(5, 9), 6, 40 + i)
# 近岛小云
for i in range(5):
    a = random.uniform(0, 6.28)
    rr = random.uniform(52, 68)
    cloud(f'NearCloud{i}', math.cos(a) * rr, 4 + math.sin(a) * rr, random.uniform(-58, -48),
          random.uniform(2.6, 4.4), 5, 70 + i)

# 中景云（构图用）
for i, (ang, rr, zz, ss) in enumerate([(0.4, 50, -14, 4.0), (1.5, 56, -22, 4.6),
                                       (2.7, 52, -8, 3.4), (3.7, 58, -18, 4.2),
                                       (4.9, 54, -10, 3.6), (5.8, 60, -24, 4.8)]):
    cloud(f'MidCloud{i}', math.cos(ang) * rr, 4 + math.sin(ang) * rr, zz, ss, 6, 120 + i)

# ---------------------------------------------------------------- 飞鸟
BIRD = mat('bird', '#6E6A72', rough=0.8)
for i in range(14):
    a = random.uniform(0, 6.28)
    rr = random.uniform(26, 52)
    x = math.cos(a) * rr
    y = 4 + math.sin(a) * rr
    z = random.uniform(12, 32)
    s = random.uniform(0.7, 1.3)
    sphere(f'Bird{i}', 0.14 * s, (x, y, z), m=BIRD, seg=8, ring=6, coll_=C['08_Clouds'],
           scale=(1.6, 0.7, 0.7))
    for sx in (-1, 1):
        box(f'BirdW{i}{sx}', (0.5 * s, 0.16 * s, 0.04), (x + sx * 0.28 * s, y, z + 0.1),
            (0, sx * 0.5, 0), BIRD, 0.0, 1, C['08_Clouds'])

print('NATURE DONE', len(C['07_Nature'].objects), len(C['08_Clouds'].objects))
