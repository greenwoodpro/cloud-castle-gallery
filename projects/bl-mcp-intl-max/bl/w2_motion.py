"""动态元素：风车 / 飞鸟 / 云 / 旗 / 火 / 热气球 / 蒲公英 / 水面"""
import bpy, math, random, sys
from mathutils import Vector, Euler
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
from lib import mat, srgb, cyl, sphere, box, tube, cone, torus, _finish

C = {n: bpy.data.collections[n] for n in
     ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
      '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
      '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']}
sc = bpy.context.scene
sc.frame_start = 1
sc.frame_end = 240
sc.render.fps = 24
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'

# 清理上一次的动态物体
for o in list(bpy.data.objects):
    if o.name.startswith(('ANIM_', 'Balloon', 'Seed', 'Dandelion')):
        bpy.data.objects.remove(o, do_unlink=True)


def empty(name, loc):
    e = bpy.data.objects.new(name, None)
    e.empty_display_size = 0.6
    e.location = loc
    C['10_Lights'].objects.link(e)
    return e


def parent_keep(objs, par):
    for o in objs:
        o.parent = par
        o.matrix_parent_inverse = par.matrix_world.inverted()


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


# ---------------------------------------------------------------- 风车
MZ = height(24.0, 20.0)
hub = Vector((24.0, 20.0 - 1.9, MZ + 7.4))
sails = [o for o in bpy.data.objects if o.name.startswith('Sail')]
if sails:
    e = empty('ANIM_Windmill', hub)
    parent_keep(sails, e)
    e.rotation_euler = (0, 0, 0)
    e.keyframe_insert('rotation_euler', frame=1)
    e.rotation_euler = (0, -math.pi * 2, 0)
    e.keyframe_insert('rotation_euler', frame=241)
    print('windmill', len(sails))

# ---------------------------------------------------------------- 飞鸟绕岛
birds = [o for o in bpy.data.objects if o.name.startswith('Bird')]
if birds:
    e = empty('ANIM_Birds', (0, 4, 0))
    parent_keep(birds, e)
    e.rotation_euler = (0, 0, 0)
    e.keyframe_insert('rotation_euler', frame=1)
    e.rotation_euler = (0, 0, math.radians(360))
    e.keyframe_insert('rotation_euler', frame=240)

# ---------------------------------------------------------------- 云漂移
for i, o in enumerate([x for x in bpy.data.objects if x.name.startswith(('Cloud', 'NearCloud'))]):
    p = o.location.copy()
    o.keyframe_insert('location', frame=1)
    o.location = (p.x + 5.5, p.y + 2.0, p.z + 0.4)
    o.keyframe_insert('location', frame=240)

# ---------------------------------------------------------------- 旗帜飘动
for o in bpy.data.objects:
    if o.name.startswith(('KeepFlag', 'HallBan', 'Bridge_mer')) or o.name == 'KeepFlag':
        pass
flags = [o for o in bpy.data.objects if o.name.startswith('KeepFlag')]
for o in flags:
    for old in list(o.modifiers):
        if old.type == 'WAVE':
            o.modifiers.remove(old)
    md = o.modifiers.new('Wave', 'WAVE')
    md.use_normal = False
    md.use_x = False
    md.use_y = True
    md.height = 0.18
    md.width = 0.6
    md.narrowness = 1.5
    md.speed = 0.02
    md.use_cyclic = True
    md.time_offset = 0
    md.keyframe_insert('time_offset', frame=1)
    md.time_offset = -90
    md.keyframe_insert('time_offset', frame=240)

# ---------------------------------------------------------------- 火光跳动
fires = [o for o in bpy.data.objects if o.name in ('FireLight', 'KitFireL', 'ForgeL', 'BrazierL')]
random.seed(11)
for o in fires:
    base = o.data.energy
    for f in range(1, 241, 6):
        o.data.energy = base * random.uniform(0.78, 1.18)
        o.data.keyframe_insert('energy', frame=f)

# 火焰体形抖动
flames = [o for o in bpy.data.objects if o.name.startswith(('Fire', 'Flame', 'ForgeFire', 'KitFire', 'BrazierF'))]
for i, o in enumerate(flames):
    s0 = o.scale.copy()
    o.keyframe_insert('scale', frame=1)
    o.scale = (s0.x * 1.12, s0.y * 1.12, s0.z * 1.25)
    o.keyframe_insert('scale', frame=24 + (i % 5) * 7)
    o.scale = s0
    o.keyframe_insert('scale', frame=52 + (i % 5) * 7)

# ---------------------------------------------------------------- 热气球
BAL = mat('balloon', '#EFE0C8', rough=0.85, mottle=0.05)
BAL2 = mat('balloon2', '#C4715B', rough=0.85, mottle=0.05)
BAL3 = mat('balloon3', '#7F93AE', rough=0.85, mottle=0.05)
BASK = mat('basket', '#A87C56', rough=0.9, mottle=0.08)
ROPE = mat('rope', '#C9B18C', rough=0.95)

bx, by, bz = 14.0, -34.0, 9.0
balloon = empty('Balloon', (bx, by, bz))
env = sphere('BalloonEnv', 3.1, (bx, by, bz + 5.2), m=BAL, seg=24, ring=16,
             coll_=C['09_Characters'], scale=(1, 1, 1.18))
# 竖条纹
for i in range(6):
    a = math.pi * 2 * i / 6
    s = sphere(f'BalloonStripe{i}', 3.13, (bx, by, bz + 5.2), m=BAL2 if i % 2 == 0 else BAL3,
               seg=20, ring=14, coll_=C['09_Characters'], scale=(1, 1, 1.18))
    s.scale = (3.13, 3.13, 3.7)
    s.data.materials.clear()
    s.data.materials.append(BAL2 if i % 2 == 0 else BAL3)
    # 用缩小角度切片代替：直接做细长条
    s.hide_render = True
    s.hide_viewport = True
for i in range(8):
    a = math.pi * 2 * i / 8
    box(f'BalloonRib{i}', (0.34, 0.06, 6.6),
        (bx + math.cos(a) * 2.55, by + math.sin(a) * 2.55, bz + 5.2),
        (0, 0, a + math.pi / 2), BAL2 if i % 2 == 0 else BAL3, 0.0, 1, C['09_Characters'])
box('BalloonBasket', (1.5, 1.5, 1.1), (bx, by, bz + 0.55), m=BASK, bevel=0.06, coll_=C['09_Characters'])
for i in range(4):
    a = math.pi / 4 + math.pi / 2 * i
    tube(f'BalloonRope{i}', [(bx + math.cos(a) * 1.0, by + math.sin(a) * 1.0, bz + 1.0),
                             (bx + math.cos(a) * 2.3, by + math.sin(a) * 2.3, bz + 3.2)],
         0.035, ROPE, C['09_Characters'], res=1)
# 吊篮里的人（小小王子剪影）
sphere('BalloonHead', 0.17, (bx, by, bz + 1.35), m=mat('skin', '#F0CFB4', rough=0.75),
       seg=10, ring=8, coll_=C['09_Characters'])
parts = [o for o in C['09_Characters'].objects if o.name.startswith('Balloon')]
parent_keep(parts, balloon)
balloon.keyframe_insert('location', frame=1)
balloon.location = (bx + 2.0, by + 1.5, bz + 1.6)
balloon.keyframe_insert('location', frame=120)
balloon.location = (bx - 1.2, by - 1.0, bz + 0.6)
balloon.keyframe_insert('location', frame=240)

# ---------------------------------------------------------------- 蒲公英种子
SEED = mat('seed', '#FBF6E9', rough=0.9, emit=0.15, emit_col='#FFFDF4')
random.seed(23)
for i in range(16):
    x = random.uniform(-24, 26)
    y = random.uniform(-14, 26)
    z = height(x, y) + random.uniform(0.4, 3.2)
    sphere(f'Seed{i}', 0.05, (x, y, z), m=SEED, seg=6, ring=4, coll_=C['07_Nature'])
    for k in range(3):
        a = k * 2.1
        tube(f'SeedHair{i}_{k}', [(x, y, z + 0.05),
                                  (x + math.cos(a) * 0.16, y + math.sin(a) * 0.16, z + 0.22)],
             0.006, SEED, C['07_Nature'], res=1)
    o = bpy.data.objects[f'Seed{i}']
    o.keyframe_insert('location', frame=1)
    o.location = (x + random.uniform(-3, 3), y + random.uniform(-3, 3), z + random.uniform(1.0, 2.4))
    o.keyframe_insert('location', frame=240)
    for k in range(3):
        h = bpy.data.objects[f'SeedHair{i}_{k}']
        h.parent = o
        h.matrix_parent_inverse = o.matrix_world.inverted()

# ---------------------------------------------------------------- 水面波动（材质相位）
for mname in ('M_water', 'M_waterfall'):
    m = bpy.data.materials.get(mname)
    if not m or not m.use_nodes:
        continue
    n = m.node_tree.nodes.get('FlowMap')
    if n:
        continue

print('MOTION DONE', len([o for o in bpy.data.objects if o.name.startswith('ANIM_')]))
