import sys, os, math, importlib
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
import lib
importlib.reload(lib)
from lib import *
from mathutils import Vector, Euler

C = {n: bpy.data.collections[n] for n in
     ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
      '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
      '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']}
for o in list(C['09_Characters'].objects):
    bpy.data.objects.remove(o, do_unlink=True)

WOOD = mat('wood', '#8C6547', rough=0.85)
IRON = mat('iron', '#6E6A66', rough=0.5, metal=0.55)
GOLD = mat('gold', '#DDB25E', rough=0.35, metal=0.7)
SKIN = mat('skin', '#F0CFB4', rough=0.75, mottle=0.03)
SKIN2 = mat('skin2', '#D9AE8C', rough=0.75, mottle=0.03)
HAIR = mat('hair', '#E3BE6B', rough=0.8)
HAIR_D = mat('hair_d', '#6B4A34', rough=0.8)
HAIR_R = mat('hair_r', '#A85A3C', rough=0.8)
EYE = mat('eye', '#3B3028', rough=0.5)
WHITE = mat('white', '#F7F3E8', rough=0.9)
COAT_G = mat('coat_green', '#8CA47E', rough=0.9, mottle=0.05)
COAT_B = mat('coat_blue', '#7F93AE', rough=0.9, mottle=0.05)
COAT_R = mat('coat_red', '#B85C54', rough=0.9, mottle=0.05)
COAT_Y = mat('coat_yellow', '#D8B25E', rough=0.9, mottle=0.05)
COAT_P = mat('coat_plum', '#8E7A96', rough=0.9, mottle=0.05)
COAT_N = mat('coat_brown', '#8A6A50', rough=0.9, mottle=0.05)
SCARF = mat('scarf', '#C4715B', rough=0.9, mottle=0.06)
FOX = mat('fox', '#D98F5F', rough=0.85, mottle=0.06)
FOX_W = mat('fox_white', '#F3E9D8', rough=0.9)
HORSE = mat('horse', '#9A7A5E', rough=0.85, mottle=0.06)
HORSE_D = mat('horse_d', '#6B5340', rough=0.85)
SHEEP = mat('sheep', '#F2EBDD', rough=1.0, mottle=0.05)
CHICK = mat('chick', '#F0E3C8', rough=0.9)
RAVEN = mat('raven', '#3E3A40', rough=0.8)


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


def capsule(name, r, h, loc, rot=(0, 0, 0), m=None, coll_=None):
    ob = cyl(name, r, h, loc, rot, m, 12, 0.0, coll_)
    R = Euler(rot, 'XYZ').to_matrix()
    for s in (-1, 1):
        p = R @ Vector((0, 0, s * h * 0.5))
        sphere(name + f'_c{s}', r, (loc[0] + p.x, loc[1] + p.y, loc[2] + p.z), m=m,
               seg=12, ring=8, coll_=coll_)
    return ob


def person(name, x, y, z, rot=0.0, coat=COAT_G, hair=HAIR, skin=SKIN, scale=1.0,
           pose='stand', dress=False, hat=None, crown=False, spear=False, staff=False,
           bag=False, hood=False):
    """童话比例人物：大头、小身、圆润。z 为脚底。"""
    s = scale
    coll_ = C['09_Characters']
    cr, sr = math.cos(rot), math.sin(rot)

    def P(dx, dy, dz):
        return (x + cr * dx - sr * dy, y + sr * dx + cr * dy, z + dz)

    # 腿
    if pose != 'sit':
        for sx in (-1, 1):
            lx, ly = sx * 0.11 * s, 0
            capsule(f'{name}_leg{sx}', 0.075 * s, 0.42 * s, P(lx, ly, 0.26 * s), m=coat, coll_=coll_)
            box(f'{name}_foot{sx}', (0.15 * s, 0.24 * s, 0.1 * s), P(lx, 0.04 * s, 0.05 * s),
                (0, 0, rot), mat('boot', '#5C4130', rough=0.9), 0.02, 1, coll_)
    else:
        for sx in (-1, 1):
            box(f'{name}_thigh{sx}', (0.14 * s, 0.42 * s, 0.14 * s),
                P(sx * 0.11 * s, 0.2 * s, -0.02 * s), (0, 0, rot), coat, 0.04, 2, coll_)
            box(f'{name}_shin{sx}', (0.12 * s, 0.12 * s, 0.46 * s),
                P(sx * 0.11 * s, 0.38 * s, -0.24 * s), (0, 0, rot), coat, 0.03, 2, coll_)

    # 身体
    bz = 0.42 * s if pose != 'sit' else 0.30 * s
    if dress:
        cone(f'{name}_body', 0.30 * s, 0.62 * s, P(0, 0, bz + 0.3 * s), m=coat, seg=16,
             coll_=coll_, bevel=0.02)
    else:
        cyl(f'{name}_body', 0.24 * s, 0.52 * s, P(0, 0, bz + 0.26 * s), m=coat, seg=14,
            coll_=coll_, r2=0.26 * s, bevel=0.02)
    # 腰带
    cyl(f'{name}_belt', 0.252 * s, 0.07 * s, P(0, 0, bz + 0.14 * s), m=mat('belt', '#6B4A34', rough=0.9),
        seg=14, coll_=coll_, bevel=0.0)
    # 手臂
    for sx in (-1, 1):
        ax = sx * 0.30 * s
        az = bz + 0.42 * s
        capsule(f'{name}_arm{sx}', 0.06 * s, 0.36 * s, P(ax, 0, az),
                (0, sx * 0.25, 0), coat, coll_)
        sphere(f'{name}_hand{sx}', 0.07 * s, P(ax + sx * 0.03 * s, 0, az - 0.22 * s),
               m=skin, seg=10, ring=8, coll_=coll_)
    # 头
    hz = bz + 0.74 * s
    sphere(f'{name}_head', 0.225 * s, P(0, 0, hz), m=skin, seg=18, ring=14, coll_=coll_)
    # 头发
    if hood:
        sphere(f'{name}_hood', 0.25 * s, P(0, -0.01 * s, hz + 0.02 * s), m=coat, seg=16, ring=12,
               coll_=coll_, scale=(1, 1.02, 1))
    else:
        sphere(f'{name}_hair', 0.238 * s, P(0, -0.02 * s, hz + 0.045 * s), m=hair, seg=16, ring=12,
               coll_=coll_, scale=(1.02, 1.02, 0.92))
        # 刘海
        for i in range(3):
            sphere(f'{name}_bang{i}', 0.07 * s, P((i - 1) * 0.11 * s, 0.18 * s, hz + 0.16 * s),
                   m=hair, seg=8, ring=6, coll_=coll_, scale=(1, 0.8, 0.9))
    # 眼睛 / 鼻子
    for sx in (-1, 1):
        sphere(f'{name}_eye{sx}', 0.024 * s, P(sx * 0.08 * s, 0.2 * s, hz + 0.01 * s),
               m=EYE, seg=8, ring=6, coll_=coll_)
    sphere(f'{name}_nose', 0.026 * s, P(0, 0.22 * s, hz - 0.04 * s), m=skin, seg=8, ring=6,
           coll_=coll_)
    # 帽子 / 王冠
    if hat == 'helmet':
        sphere(f'{name}_helm', 0.235 * s, P(0, 0, hz + 0.06 * s), m=IRON, seg=16, ring=10,
               coll_=coll_, scale=(1, 1, 0.95))
        box(f'{name}_noseguard', (0.05 * s, 0.06 * s, 0.16 * s), P(0, 0.215 * s, hz + 0.0),
            (0, 0, rot), IRON, 0.0, 1, coll_)
    elif hat == 'hood':
        cone(f'{name}_hat', 0.2 * s, 0.34 * s, P(0, -0.02 * s, hz + 0.18 * s), m=coat, seg=14,
             coll_=coll_, bevel=0.02)
    elif hat == 'cap':
        cyl(f'{name}_cap', 0.235 * s, 0.1 * s, P(0, 0, hz + 0.15 * s), m=coat, seg=14,
            coll_=coll_, bevel=0.02)
    if crown:
        cyl(f'{name}_crown', 0.17 * s, 0.12 * s, P(0, 0, hz + 0.19 * s), m=GOLD, seg=10,
            coll_=coll_, bevel=0.01)
        for i in range(5):
            a = math.pi * 2 * i / 5
            cone(f'{name}_crownP{i}', 0.03 * s, 0.09 * s,
                 P(math.cos(a) * 0.13 * s, math.sin(a) * 0.13 * s, hz + 0.28 * s), m=GOLD,
                 seg=6, coll_=coll_)
    # 长矛 / 法杖
    if spear:
        px = 0.32 * s
        cyl(f'{name}_spear', 0.022 * s, 2.0 * s, P(px, 0, 1.0 * s), m=WOOD, seg=6,
            coll_=coll_, bevel=0.0)
        cone(f'{name}_spearHead', 0.05 * s, 0.2 * s, P(px, 0, 2.05 * s), m=IRON, seg=6,
             coll_=coll_)
    if staff:
        cyl(f'{name}_staff', 0.025 * s, 1.5 * s, P(0.3 * s, 0.05 * s, 0.75 * s), m=WOOD, seg=6,
            coll_=coll_, bevel=0.0)
        torus(f'{name}_staffTop', 0.09 * s, 0.025 * s, P(0.3 * s, 0.05 * s, 1.55 * s),
              (math.pi / 2, 0, 0), GOLD, coll_=coll_, maj=12, mi=5)


def scarf_trail(name, x, y, z, rot, length=1.4, s=1.0, color=SCARF):
    pts = []
    for i in range(9):
        t = i / 8
        a = rot + math.pi + t * 0.85
        d = t * length
        perp = a + math.pi / 2
        w = math.sin(t * 3.2) * 0.22 * t
        pts.append((x + math.cos(a) * d + math.cos(perp) * w,
                    y + math.sin(a) * d + math.sin(perp) * w,
                    z + math.sin(t * 4.6) * 0.2 - t * 0.42))
    tube(name, pts, 0.042 * s, color, C['09_Characters'], res=3)
    tube(name + '_2', [(p[0], p[1], p[2] - 0.06) for p in pts[:7]], 0.028 * s, color,
         C['09_Characters'], res=2)


# ---------------------------------------------------------------- 小王子
PX, PY = 24.6, -11.2
PZ = height(PX, PY) + 0.05
person('LittlePrince', PX, PY, PZ, rot=math.radians(150), coat=COAT_G, hair=HAIR, scale=0.95)
scarf_trail('PrinceScarf', PX, PY, PZ + 0.80, math.radians(150), 1.5, 1.0)
# 小王子脚下的小草坡
sphere('PrinceMound', 0.95, (PX, PY, PZ - 0.55), m=mat('grass', '#A9C083', rough=1.0, mottle=0.12),
       seg=16, ring=10, coll_=C['09_Characters'], scale=(1.25, 1.15, 0.42))
for i in range(6):
    a = i * 1.05
    cone(f'PrinceGrass{i}', 0.05, 0.28, (PX + math.cos(a) * 0.5, PY + math.sin(a) * 0.5, PZ - 0.12),
         m=mat('grass_tuft', '#9AB56F', rough=1.0), seg=4, coll_=C['09_Characters'])

# ---------------------------------------------------------------- 狐狸
FX, FY = 26.2, -12.4
FZ = height(FX, FY)
ROT_F = math.radians(-40)
crf, srf = math.cos(ROT_F), math.sin(ROT_F)
def FP(dx, dy, dz):
    return (FX + crf * dx - srf * dy, FY + srf * dx + crf * dy, FZ + dz)

sphere('Fox_body', 0.3, FP(0, 0, 0.42), (0, 0, ROT_F), FOX, seg=16, ring=12,
       coll_=C['09_Characters'], scale=(0.8, 1.35, 0.85))
sphere('Fox_haunch', 0.24, FP(0, -0.24, 0.38), (0, 0, ROT_F), FOX, seg=14, ring=10,
       coll_=C['09_Characters'], scale=(0.9, 1.0, 0.95))
sphere('Fox_chest', 0.17, FP(0, 0.3, 0.4), (0, 0, ROT_F), FOX_W, seg=12, ring=8,
       coll_=C['09_Characters'], scale=(0.85, 0.8, 1.05))
sphere('Fox_head', 0.19, FP(0, 0.46, 0.72), (0, 0, ROT_F), FOX, seg=16, ring=12,
       coll_=C['09_Characters'], scale=(0.95, 1.0, 0.92))
sphere('Fox_muzzle', 0.1, FP(0, 0.62, 0.66), (0, 0, ROT_F), FOX_W, seg=12, ring=8,
       coll_=C['09_Characters'], scale=(0.9, 1.3, 0.7))
sphere('Fox_nose', 0.035, FP(0, 0.72, 0.68), (0, 0, ROT_F), EYE, seg=8, ring=6,
       coll_=C['09_Characters'])
for sx in (-1, 1):
    cone(f'Fox_ear{sx}', 0.085, 0.24, FP(sx * 0.11, 0.42, 0.94), (0, sx * 0.22, ROT_F), FOX,
         seg=6, coll_=C['09_Characters'])
    sphere(f'Fox_earIn{sx}', 0.045, FP(sx * 0.11, 0.43, 0.92), (0, 0, ROT_F),
           mat('fox_pink', '#E8B8A8', rough=0.9), seg=8, ring=6, coll_=C['09_Characters'])
    sphere(f'Fox_eye{sx}', 0.026, FP(sx * 0.07, 0.6, 0.75), (0, 0, ROT_F), EYE, seg=8, ring=6,
           coll_=C['09_Characters'])
    for k in (-1, 1):
        cyl(f'Fox_leg{sx}{k}', 0.042, 0.3, FP(sx * 0.12, k * 0.2, 0.16), m=FOX, seg=8,
            coll_=C['09_Characters'], bevel=0.0)
        sphere(f'Fox_paw{sx}{k}', 0.05, FP(sx * 0.12, k * 0.2, 0.03), m=FOX_W, seg=8, ring=6,
               coll_=C['09_Characters'])
tail = []
for i in range(7):
    t = i / 6
    tail.append(FP(0.02 * t, -0.4 - t * 0.34, 0.4 + math.sin(t * 2.2) * 0.5 + t * 0.15))
tube('Fox_tail', tail, 0.115, FOX, C['09_Characters'], res=3)
sphere('Fox_tailTip', 0.115, tail[-1], m=FOX_W, seg=10, ring=8, coll_=C['09_Characters'])

# ---------------------------------------------------------------- 卫兵（城门）
person('GuardW', -2.0, -13.4, 0.02, rot=math.radians(180), coat=COAT_R, hair=HAIR_D, scale=1.05,
       hat='helmet', spear=True)
person('GuardE', 2.0, -13.4, 0.02, rot=math.radians(180), coat=COAT_R, hair=HAIR_D, scale=1.05,
       hat='helmet', spear=True)

# ---------------------------------------------------------------- 国王 / 王后（大厅）
person('King', 0, 8.5, 1.25, rot=0.0, coat=COAT_P, hair=HAIR, skin=SKIN, scale=1.0, pose='sit',
       crown=True)
person('Queen', 1.15, 8.4, 1.25, rot=0.0, coat=COAT_B, hair=HAIR_R, skin=SKIN, scale=0.95,
       pose='sit', dress=True)
# 厅内侍从
person('Server', -2.4, 5.4, 0.37, rot=math.radians(80), coat=COAT_N, hair=HAIR_D, scale=0.95)
person('Guest1', -1.8, 3.4, 0.37, rot=math.radians(10), coat=COAT_Y, hair=HAIR, scale=0.95)
person('Guest2', 0.6, 3.4, 0.37, rot=math.radians(-10), coat=COAT_B, hair=HAIR_R, scale=0.92,
       dress=True)

# ---------------------------------------------------------------- 厨房 / 书房 / 礼拜堂
person('Cook', -2.9, 4.6, 4.77, rot=math.radians(200), coat=WHITE, hair=HAIR_D, scale=0.95,
       hat='cap')
person('Scribe', 2.2, 4.0, 4.77, rot=math.radians(0), coat=COAT_N, hair=HAIR_D, scale=0.95)
person('Monk', 9.2, 3.4, 0.12, rot=math.radians(0), coat=COAT_N, hair=HAIR_D, scale=0.95,
       hood=True)

# ---------------------------------------------------------------- 庭院
person('Child1', 4.6, -3.2, 0.0, rot=math.radians(30), coat=COAT_Y, hair=HAIR, scale=0.62)
person('Child2', 5.4, -2.4, 0.0, rot=math.radians(-40), coat=COAT_B, hair=HAIR_R, scale=0.58)
person('StableHand', -8.4, 0.6, 0.0, rot=math.radians(160), coat=COAT_N, hair=HAIR_D, scale=0.98)
person('Lady', -8.6, 5.2, 0.0, rot=math.radians(80), coat=COAT_P, hair=HAIR_R, scale=0.95,
       dress=True)

# ---------------------------------------------------------------- 马
def horse(name, x, y, z, rot, m=HORSE):
    cr, sr = math.cos(rot), math.sin(rot)
    def P(dx, dy, dz):
        return (x + cr * dx - sr * dy, y + sr * dx + cr * dy, z + dz)
    sphere(f'{name}_body', 0.42, P(0, 0, 1.05), m=m, seg=16, ring=12, coll_=C['09_Characters'],
           scale=(0.85, 1.5, 0.85))
    cyl(f'{name}_neck', 0.16, 0.6, P(0, 0.55, 1.45), (math.radians(-25), 0, rot), m,
        seg=12, coll_=C['09_Characters'], r2=0.13, bevel=0.02)
    sphere(f'{name}_head', 0.18, P(0, 0.78, 1.72), m=m, seg=12, ring=10, coll_=C['09_Characters'],
           scale=(0.8, 1.4, 0.9))
    cone(f'{name}_muzzle', 0.11, 0.24, P(0, 0.95, 1.66), (math.radians(70), 0, rot), m,
         seg=10, coll_=C['09_Characters'])
    for sx in (-1, 1):
        cone(f'{name}_ear{sx}', 0.05, 0.14, P(sx * 0.07, 0.7, 1.86), (0, sx * 0.2, 0), m,
             seg=6, coll_=C['09_Characters'])
        for k in (-1, 1):
            cyl(f'{name}_leg{sx}{k}', 0.06, 0.9, P(sx * 0.2, k * 0.45, 0.45), m=m, seg=8,
                coll_=C['09_Characters'], bevel=0.0)
    tube(f'{name}_tail', [P(0, -0.62, 1.2), P(0, -0.72, 0.95), P(0, -0.7, 0.65)], 0.07,
         HORSE_D, C['09_Characters'], res=2)
    tube(f'{name}_mane', [P(0, 0.42, 1.72), P(0, 0.55, 1.55), P(0, 0.62, 1.35)], 0.06,
         HORSE_D, C['09_Characters'], res=2)


horse('Horse1', -10.4, -1.4, 0.0, math.radians(96))
horse('Horse2', -8.2, -1.4, 0.0, math.radians(88), HORSE_D)

# ---------------------------------------------------------------- 羊
def sheep(name, x, y, z, rot, s=1.0):
    parts = [(0.34 * s, (0, 0, 0.52 * s), (1.2, 1.5, 0.95)),
             (0.24 * s, (0.1 * s, 0.2 * s, 0.62 * s), (1, 1, 0.9)),
             (0.24 * s, (-0.12 * s, -0.15 * s, 0.6 * s), (1, 1, 0.9))]
    bm = bmesh.new()
    for (r, loc, sc) in parts:
        from mathutils import Matrix
        mtx = Matrix.Translation(Vector(loc)) @ Matrix.Diagonal(Vector((sc[0], sc[1], sc[2], 1)))
        bmesh.ops.create_uvsphere(bm, u_segments=12, v_segments=8, radius=r, matrix=mtx)
    ob = bpy.data.objects.new(name + '_wool', bpy.data.meshes.new(name + '_wool'))
    bm.to_mesh(ob.data)
    bm.free()
    ob.location = (x, y, z)
    ob.rotation_euler = (0, 0, rot)
    ob.data.materials.append(SHEEP)
    C['09_Characters'].objects.link(ob)
    cr, sr = math.cos(rot), math.sin(rot)
    hx, hy = x + cr * 0.42 * s, y + sr * 0.42 * s
    sphere(f'{name}_head', 0.13 * s, (hx, hy, z + 0.62 * s), m=mat('sheepface', '#C9B39A', rough=0.9),
           seg=12, ring=8, coll_=C['09_Characters'])
    for sx in (-1, 1):
        cone(f'{name}_ear{sx}', 0.04 * s, 0.1 * s,
             (hx - sr * sx * 0.1 * s, hy + cr * sx * 0.1 * s, z + 0.7 * s), (0, 0, rot), SHEEP,
             seg=6, coll_=C['09_Characters'])
        for k in (-1, 1):
            cyl(f'{name}_leg{sx}{k}', 0.03 * s, 0.34 * s,
                (x + cr * sx * 0.15 * s - sr * k * 0.2 * s, y + sr * sx * 0.15 * s + cr * k * 0.2 * s,
                 z + 0.17 * s), m=mat('sheepface', '#C9B39A', rough=0.9), seg=6,
                coll_=C['09_Characters'], bevel=0.0)


for i, (sx, sy) in enumerate([(25.0, -3.0), (26.4, -1.6), (24.2, -0.8), (27.0, -4.2), (23.4, -2.2)]):
    sheep(f'Sheep{i}', sx, sy, 0.0, math.radians(i * 40), 0.9)

# ---------------------------------------------------------------- 猫 / 鸡
sphere('Cat_body', 0.14, (12.6, -2.4, 6.35), m=mat('cat', '#C9A98C', rough=0.9), seg=12, ring=8,
       coll_=C['09_Characters'], scale=(1.5, 0.9, 0.9))
sphere('Cat_head', 0.1, (12.78, -2.35, 6.45), m=mat('cat', '#C9A98C', rough=0.9), seg=12, ring=8,
       coll_=C['09_Characters'])
for sx in (-1, 1):
    cone(f'Cat_ear{sx}', 0.04, 0.08, (12.8 + sx * 0.03, -2.4 + sx * 0.04, 6.53), m=mat('cat', '#C9A98C', rough=0.9),
         seg=5, coll_=C['09_Characters'])
tube('Cat_tail', [(12.45, -2.4, 6.35), (12.3, -2.3, 6.41), (12.25, -2.2, 6.51)], 0.03,
     mat('cat', '#C9A98C', rough=0.9), C['09_Characters'], res=2)

for i in range(3):
    x = 4.4 + i * 0.55
    y = -9.2 + (i % 2) * 0.4
    sphere(f'Chicken{i}', 0.14, (x, y, 0.18), m=CHICK, seg=10, ring=8, coll_=C['09_Characters'],
           scale=(1, 1.25, 0.9))
    sphere(f'ChickHead{i}', 0.07, (x + 0.13, y, 0.32), m=CHICK, seg=8, ring=6, coll_=C['09_Characters'])
    cone(f'ChickBeak{i}', 0.02, 0.06, (x + 0.2, y, 0.32), (0, math.radians(90), 0),
         mat('beak', '#D8A05C', rough=0.8), seg=5, coll_=C['09_Characters'])

print('CHARACTERS DONE', len(C['09_Characters'].objects))
