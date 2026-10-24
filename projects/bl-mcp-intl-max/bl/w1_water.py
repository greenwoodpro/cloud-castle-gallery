"""重建水系：湖 — 溪 — 崖口 — 瀑布（参数化曲面，朝外翻落）"""
import bpy, bmesh, math, random, sys
from mathutils import Vector, Matrix, noise as mnoise
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
from lib import mat, srgb

C = {n: bpy.data.collections[n] for n in
     ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
      '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
      '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']}

for o in list(C['01_Terrain'].objects):
    if o.name.startswith(('Pond', 'Stream', 'Waterfall', 'Mist', 'Lip', 'Splash',
                          'Pebble', 'Bank', 'Fall')):
        bpy.data.objects.remove(o, do_unlink=True)

TAU = math.pi * 2
CY = 4.0
CTRL = [33.0, 35.0, 37.0, 39.0, 37.0, 35.0, 33.0, 29.5, 24.0, 22.0, 24.0, 27.0]


def _cr(p0, p1, p2, p3, t):
    return 0.5 * ((2 * p1) + (-p0 + p2) * t +
                  (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
                  (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t)


def R_edge(th):
    t = (th % TAU) / TAU * 12.0
    i = int(t)
    f = t - i
    r = _cr(CTRL[(i - 1) % 12], CTRL[i % 12], CTRL[(i + 1) % 12], CTRL[(i + 2) % 12], f)
    damp = 0.35 + 0.65 * (0.5 + 0.5 * math.sin(th))
    r += damp * (0.9 * math.sin(7 * th + 2.0) + 0.55 * math.sin(11 * th + 0.7))
    return r


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


# ---------------------------------------------------------------- 材质
WATER = mat('water', '#7FB6C8', rough=0.05, alpha=0.92, transmission=0.20,
            mottle=0.05, scale=2.0)
WATER.name = 'M_water'
FOAM = mat('foam', '#F4FBFA', rough=0.5, alpha=0.85, emit=0.12, emit_col='#FFFFFF', mottle=0.02)
FALL = bpy.data.materials.new('M_waterfall')
FALL.use_nodes = True
nt = FALL.node_tree
nt.nodes.clear()
out = nt.nodes.new('ShaderNodeOutputMaterial')
bsdf = nt.nodes.new('ShaderNodeBsdfPrincipled')
bsdf.inputs['Base Color'].default_value = srgb('#DCEEF2')
bsdf.inputs['Roughness'].default_value = 0.18
bsdf.inputs['Alpha'].default_value = 0.62
try:
    bsdf.inputs['Emission Color'].default_value = srgb('#EAF7F8')
    bsdf.inputs['Emission Strength'].default_value = 0.22
except Exception:
    pass
nt.links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
tc = nt.nodes.new('ShaderNodeTexCoord')
mp = nt.nodes.new('ShaderNodeMapping')
mp.name = 'FlowMap'
mp.inputs['Scale'].default_value = (1.0, 1.0, 0.35)
nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
wave = nt.nodes.new('ShaderNodeTexWave')
wave.wave_type = 'BANDS'
wave.bands_direction = 'X'
wave.inputs['Scale'].default_value = 2.2
wave.inputs['Distortion'].default_value = 9.0
wave.inputs['Detail'].default_value = 3.0
nt.links.new(mp.outputs['Vector'], wave.inputs['Vector'])
ramp = nt.nodes.new('ShaderNodeValToRGB')
ramp.color_ramp.elements[0].color = srgb('#C7E2EA')
ramp.color_ramp.elements[1].color = srgb('#FFFFFF')
nt.links.new(wave.outputs['Fac'], ramp.inputs['Fac'])
nt.links.new(ramp.outputs['Color'], bsdf.inputs['Base Color'])
bp = nt.nodes.new('ShaderNodeBump')
bp.inputs['Strength'].default_value = 0.25
nt.links.new(wave.outputs['Fac'], bp.inputs['Height'])
nt.links.new(bp.outputs['Normal'], bsdf.inputs['Normal'])
for a, v in (('blend_method', 'BLEND'), ('surface_render_method', 'BLENDED')):
    try:
        setattr(FALL, a, v)
    except Exception:
        pass


def obj_from(name, verts, faces, m, coll_=None, smooth=True):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.update()
    ob = bpy.data.objects.new(name, me)
    ob.data.materials.append(m)
    (coll_ or C['01_Terrain']).objects.link(ob)
    if smooth:
        for p in me.polygons:
            p.use_smooth = True
    return ob


# ---------------------------------------------------------------- 湖面（不规则）
PX, PY = -20.0, 1.0
NA = 64
vs, fs = [], []
vs.append((PX, PY, -0.66))
for i in range(NA):
    a = TAU * i / NA
    rr = 4.62 * (1.0 + 0.06 * math.sin(3 * a + 0.6) + 0.04 * math.sin(5 * a))
    vs.append((PX + math.cos(a) * rr, PY + math.sin(a) * rr * 0.95, -0.68))
for i in range(NA):
    fs.append([0, 1 + i, 1 + (i + 1) % NA])
obj_from('Pond', vs, fs, WATER)

# 湖岸卵石
PEB = mat('pebble', '#C9BCA6', rough=0.95, mottle=0.15)
for i in range(22):
    a = TAU * i / 22 + random.uniform(-0.06, 0.06)
    rr = 4.85 + random.uniform(-0.1, 0.3)
    x, y = PX + math.cos(a) * rr, PY + math.sin(a) * rr * 0.95
    s = random.uniform(0.12, 0.26)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=s, location=(x, y, height(x, y) + s * 0.3))
    ob = bpy.context.object
    ob.name = f'Pebble{i}'
    ob.scale = (1.3, 1.0, 0.6)
    ob.data.materials.append(PEB)
    for c in ob.users_collection:
        c.objects.unlink(ob)
    C['01_Terrain'].objects.link(ob)

# ---------------------------------------------------------------- 溪流（沿地形）
PATH = [(-21.4, 1.6), (-23.4, 2.2), (-25.6, 2.6), (-27.8, 2.9), (-29.8, 3.1),
        (-31.4, 3.3), (-32.6, 3.4)]
# 平滑
pts = []
for i in range(len(PATH) - 1):
    a, b = Vector(PATH[i]), Vector(PATH[i + 1])
    for k in range(4):
        pts.append(a.lerp(b, k / 4))
pts.append(Vector(PATH[-1]))

# 河床（深色湿土）
bed_v, bed_f = [], []
for i, p in enumerate(pts):
    if i == 0:
        tg = (pts[1] - pts[0])
    elif i == len(pts) - 1:
        tg = (pts[-1] - pts[-2])
    else:
        tg = (pts[i + 1] - pts[i - 1])
    tg.normalize()
    sd = Vector((-tg.y, tg.x))
    w = 1.05 + 0.55 * (i / (len(pts) - 1))
    for s in (-1, 1):
        x, y = p.x + sd.x * w * s, p.y + sd.y * w * s
        bed_v.append((x, y, height(x, y) - 0.02))
for i in range(len(pts) - 1):
    a = i * 2
    bed_f.append([a, a + 1, a + 3, a + 2])
obj_from('StreamBed', bed_v, bed_f, mat('riverbed', '#8C7A5E', rough=1.0, mottle=0.15), smooth=False)

# 水面
wv, wf = [], []
for i, p in enumerate(pts):
    if i == 0:
        tg = (pts[1] - pts[0])
    elif i == len(pts) - 1:
        tg = (pts[-1] - pts[-2])
    else:
        tg = (pts[i + 1] - pts[i - 1])
    tg.normalize()
    sd = Vector((-tg.y, tg.x))
    w = 0.72 + 0.42 * (i / (len(pts) - 1))
    for s in (-1, 1):
        x, y = p.x + sd.x * w * s, p.y + sd.y * w * s
        wv.append((x, y, height(x, y) + 0.05))
for i in range(len(pts) - 1):
    a = i * 2
    wf.append([a, a + 1, a + 3, a + 2])
obj_from('Stream', wv, wf, WATER)

# 溪岸白沫
for s_ in (-1, 1):
    fv, ff = [], []
    for i, p in enumerate(pts):
        if i == 0:
            tg = (pts[1] - pts[0])
        elif i == len(pts) - 1:
            tg = (pts[-1] - pts[-2])
        else:
            tg = (pts[i + 1] - pts[i - 1])
        tg.normalize()
        sd = Vector((-tg.y, tg.x))
        w = 0.72 + 0.42 * (i / (len(pts) - 1))
        x, y = p.x + sd.x * w * s_, p.y + sd.y * w * s_
        fv.append((x, y, height(x, y) + 0.06))
        x2, y2 = p.x + sd.x * (w - 0.22) * s_, p.y + sd.y * (w - 0.22) * s_
        fv.append((x2, y2, height(x2, y2) + 0.055))
    for i in range(len(pts) - 1):
        a = i * 2
        ff.append([a, a + 1, a + 3, a + 2])
    obj_from(f'BankFoam{s_}', fv, ff, FOAM)

# ---------------------------------------------------------------- 崖口与瀑布
LIP = Vector((-32.6, 3.4, 0.0))
# 精确找到崖口：沿 -X 方向找边界
th = math.atan2(LIP.y - CY, LIP.x)
R = R_edge(th)
LIP.x = math.cos(th) * R - 0.25
LIP.z = height(LIP.x, LIP.y) + 0.02
OUT = Vector((math.cos(th), math.sin(th), 0)).normalized()   # 朝外
SIDE = Vector((-OUT.y, OUT.x, 0))

# 崖口石唇
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=1.0,
                                      location=(LIP.x + OUT.x * 0.55, LIP.y + OUT.y * 0.55, LIP.z - 0.55))
lip = bpy.context.object
lip.name = 'LipRock'
lip.scale = (1.3, 2.4, 0.32)
lip.data.materials.append(mat('rock', '#C6A882', rough=0.95, mottle=0.16, scale=2.2, bump=0.12))
for c in lip.users_collection:
    c.objects.unlink(lip)
C['01_Terrain'].objects.link(lip)

# 瀑布参数曲面
NF, NW = 26, 12
W0, W1 = 3.2, 5.4
DROP = 34.0
fall_v, fall_f = [], []
for j in range(NF + 1):
    t = j / NF
    # 抛物线：先向外抛出，再竖直下落
    out_d = 0.42 + 2.8 * t + 4.8 * t * t
    z = 0.06 - DROP * (t ** 1.55)
    w = W0 + (W1 - W0) * (t ** 0.75)
    for i in range(NW + 1):
        u = i / NW - 0.5
        wig = math.sin(t * 7.0 + u * 3.0) * 0.28 * t
        px = LIP.x + OUT.x * (out_d + wig) + SIDE.x * (u * w)
        py = LIP.y + OUT.y * (out_d + wig) + SIDE.y * (u * w)
        pz = LIP.z + z + 0.35 * math.sin(u * 5.0 + t * 3.0) * t
        fall_v.append((px, py, pz))
for j in range(NF):
    for i in range(NW):
        a = j * (NW + 1) + i
        fall_f.append([a, a + NW + 1, a + NW + 2, a + 1])
fall = obj_from('Waterfall', fall_v, fall_f, FALL)
# 薄壳（让瀑布有厚度）
sol = fall.modifiers.new('Solidify', 'SOLIDIFY')
sol.thickness = 0.22
sol.offset = 0.0

# 崖口白沫
foam_v, foam_f = [], []
for i in range(NW + 1):
    u = i / NW - 0.5
    w = W0
    px = LIP.x + OUT.x * (-0.2) + SIDE.x * (u * w)
    py = LIP.y + OUT.y * (-0.2) + SIDE.y * (u * w)
    foam_v.append((px, py, LIP.z + 0.10))
    px2 = LIP.x + OUT.x * 0.7 + SIDE.x * (u * w * 1.15)
    py2 = LIP.y + OUT.y * 0.7 + SIDE.y * (u * w * 1.15)
    foam_v.append((px2, py2, LIP.z - 0.12))
for i in range(NW):
    a = i * 2
    foam_f.append([a, a + 1, a + 3, a + 2])
obj_from('LipFoam', foam_v, foam_f, FOAM)

# 底部水雾
MIST = mat('mist', '#F3F8F7', rough=1.0, alpha=0.30, mottle=0, emit=0.28)
for i in range(7):
    a = random.uniform(0, TAU)
    rr = random.uniform(0, 3.2)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=random.uniform(0.8, 1.5),
                                         location=(LIP.x + OUT.x * 4.5 + math.cos(a) * rr,
                                                   LIP.y + OUT.y * 4.5 + math.sin(a) * rr,
                                                   LIP.z - DROP + random.uniform(-2, 1)))
    ob = bpy.context.object
    ob.name = f'FallMist{i}'
    ob.data.materials.append(MIST)
    for c in ob.users_collection:
        c.objects.unlink(ob)
    C['08_Clouds'].objects.link(ob)

# ---------------------------------------------------------------- 动画：水纹流动
def key_offset(mat_, frames=240, dy=-3.0):
    n = mat_.node_tree.nodes.get('FlowMap')
    if not n:
        return
    n.inputs['Location'].default_value = (0, 0, 0)
    n.inputs['Location'].keyframe_insert('default_value', frame=1)
    n.inputs['Location'].default_value = (0, 0, dy)
    n.inputs['Location'].keyframe_insert('default_value', frame=frames)
    try:
        ad = mat_.node_tree.animation_data
        for fc in ad.action.fcurves:
            for kp in fc.keyframe_points:
                kp.interpolation = 'LINEAR'
    except Exception as e:
        print('fcurve skip', e)


key_offset(FALL, 240, -6.0)

# 瀑布轻微摆动
fall.rotation_mode = 'XYZ'
for f, r in ((1, 0), (60, 0.004), (120, -0.004), (180, 0.003), (240, 0)):
    fall.rotation_euler = (0, r, 0)
    fall.keyframe_insert('rotation_euler', frame=f)

print('WATER DONE  lip=%.1f,%.1f,%.2f  R=%.2f' % (LIP.x, LIP.y, LIP.z, R))
