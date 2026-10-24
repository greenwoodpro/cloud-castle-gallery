import sys, os, math, importlib
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
import lib
importlib.reload(lib)
from lib import *
from lib import _finish
from mathutils import Vector, noise as mnoise

bpy.context.scene.render.engine = 'BLENDER_EEVEE'
for ob in list(bpy.data.objects):
    if ob.name.startswith(('T_', 'Cam', 'Sun', 'Fill')):
        bpy.data.objects.remove(ob, do_unlink=True)
for c in list(bpy.data.collections):
    if c.name not in ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
                      '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
                      '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']:
        for o in list(c.objects):
            bpy.data.objects.remove(o, do_unlink=True)

C = {n: bpy.data.collections[n] for n in
     ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
      '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
      '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']}

# 可重复运行：清掉自己上次生成的东西
for cn in ['00_Island', '01_Terrain']:
    for o in list(C[cn].objects):
        bpy.data.objects.remove(o, do_unlink=True)
for o in list(bpy.data.objects):
    if o.name.startswith(('Mist', 'FloatRock')):
        bpy.data.objects.remove(o, do_unlink=True)

TAU = math.pi * 2
CTRL = [33.0, 35.0, 37.0, 39.0, 37.0, 35.0, 33.0, 29.5, 24.0, 22.0, 24.0, 27.0]
CY = 4.0


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


def smoothstep(a, b, x):
    t = max(0.0, min(1.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def gauss(x, y, cx, cy, s):
    return math.exp(-(((x - cx) ** 2 + (y - cy) ** 2) / (2 * s * s)))


def height(x, y):
    d = max(abs(x) / 17.5, abs(y - 3.0) / 16.5)
    flat = smoothstep(0.98, 1.30, d)
    roll = (0.55 * math.sin(x * 0.21 + 0.4) * math.cos(y * 0.18) +
            0.30 * math.sin((x + y) * 0.12 + 1.1))
    hill = 4.2 * gauss(x, y, 24.0, 20.0, 7.5)
    knoll = 1.8 * gauss(x, y, 20.5, -8.0, 4.0)
    ridge = 2.8 * gauss(x, y, -4.0, 32.0, 8.0)
    north_rise = 1.4 * gauss(x, y, 10.0, 27.0, 10.0)
    pond = -1.85 * gauss(x, y, -20.0, 1.0, 3.4)
    return flat * (roll + hill + knoll + ridge + north_rise) + pond


# ---------------------------------------------------------------- 材质
def terrain_mat():
    m = bpy.data.materials.new('M_terrain')
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    bsdf = nt.nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Roughness'].default_value = 0.95
    nt.links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    geo = nt.nodes.new('ShaderNodeNewGeometry')
    sep = nt.nodes.new('ShaderNodeSeparateXYZ')
    mr = nt.nodes.new('ShaderNodeMapRange')
    mr.inputs['From Min'].default_value = 0.40
    mr.inputs['From Max'].default_value = 0.80
    nt.links.new(geo.outputs['Normal'], sep.inputs['Vector'])
    nt.links.new(sep.outputs['Z'], mr.inputs['Value'])
    tc = nt.nodes.new('ShaderNodeTexCoord')
    nz = nt.nodes.new('ShaderNodeTexNoise')
    nz.inputs['Scale'].default_value = 1.15
    nz.inputs['Detail'].default_value = 7.0
    nt.links.new(tc.outputs['Object'], nz.inputs['Vector'])
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].color = srgb('#87A263')
    ramp.color_ramp.elements[1].color = srgb('#C6D89C')
    nt.links.new(nz.outputs['Fac'], ramp.inputs['Fac'])
    nz2 = nt.nodes.new('ShaderNodeTexNoise')
    nz2.inputs['Scale'].default_value = 1.6
    nz2.inputs['Detail'].default_value = 7.0
    nt.links.new(tc.outputs['Object'], nz2.inputs['Vector'])
    ramp2 = nt.nodes.new('ShaderNodeValToRGB')
    ramp2.color_ramp.elements[0].color = srgb('#A98F70')
    ramp2.color_ramp.elements[1].color = srgb('#D8C3A0')
    nt.links.new(nz2.outputs['Fac'], ramp2.inputs['Fac'])
    mix = nt.nodes.new('ShaderNodeMixRGB')
    nt.links.new(mr.outputs['Result'], mix.inputs['Fac'])
    nt.links.new(ramp2.outputs['Color'], mix.inputs['Color1'])
    nt.links.new(ramp.outputs['Color'], mix.inputs['Color2'])
    nt.links.new(mix.outputs['Color'], bsdf.inputs['Base Color'])
    bp = nt.nodes.new('ShaderNodeBump')
    bp.inputs['Strength'].default_value = 0.25
    bp.inputs['Distance'].default_value = 0.05
    nt.links.new(nz2.outputs['Fac'], bp.inputs['Height'])
    nt.links.new(bp.outputs['Normal'], bsdf.inputs['Normal'])
    return m


MT = terrain_mat()

# ---------------------------------------------------------------- 地形（径向）
NA, NR = 176, 68
tv = []
for j in range(NR + 1):
    t = j / NR
    row = []
    for i in range(NA):
        th = TAU * i / NA
        R = R_edge(th) * t
        x, y = math.cos(th) * R, CY + math.sin(th) * R
        z = height(x, y)
        row.append((x, y, z))
    tv.append(row)

verts = []
vid = []
for j in range(NR + 1):
    row = []
    for i in range(NA):
        row.append(len(verts))
        verts.append(tv[j][i])
    vid.append(row)
center_i = len(verts)
verts.append((0, CY, height(0, CY)))

faces = []
for j in range(NR):
    for i in range(NA):
        a, b = vid[j][i], vid[j][(i + 1) % NA]
        c, d = vid[j + 1][(i + 1) % NA], vid[j + 1][i]
        faces.append([a, b, c, d])
for i in range(NA):
    faces.append([center_i, vid[0][(i + 1) % NA], vid[0][i]])

# 岛缘裙边（从地表垂到 -2.45）
skirt_top = []
skirt_bot = []
for i in range(NA):
    th = TAU * i / NA
    R = R_edge(th)
    x, y = math.cos(th) * R, CY + math.sin(th) * R
    skirt_top.append(len(verts))
    verts.append((x, y, height(x, y) - 0.02))
    skirt_bot.append(len(verts))
    verts.append((x * 1.006, y * 1.006, -2.45))
for i in range(NA):
    a = skirt_top[i]
    b = skirt_top[(i + 1) % NA]
    c = skirt_bot[(i + 1) % NA]
    d = skirt_bot[i]
    faces.append([a, b, c, d])

me = bpy.data.meshes.new('Terrain')
me.from_pydata(verts, [], faces)
me.update()
ob = bpy.data.objects.new('Terrain', me)
ob.data.materials.append(MT)
C['01_Terrain'].objects.link(ob)
for p in me.polygons:
    p.use_smooth = True
print('terrain verts', len(verts), 'faces', len(faces))

# ---------------------------------------------------------------- 岩体
ROCKM = bpy.data.materials.new('M_island_rock')
ROCKM.use_nodes = True
nt = ROCKM.node_tree
nt.nodes.clear()
out = nt.nodes.new('ShaderNodeOutputMaterial')
bsdf = nt.nodes.new('ShaderNodeBsdfPrincipled')
bsdf.inputs['Roughness'].default_value = 0.95
nt.links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
tc = nt.nodes.new('ShaderNodeTexCoord')
sepz = nt.nodes.new('ShaderNodeSeparateXYZ')
nt.links.new(tc.outputs['Object'], sepz.inputs['Vector'])
nz = nt.nodes.new('ShaderNodeTexNoise')
nz.inputs['Scale'].default_value = 0.30
nz.inputs['Detail'].default_value = 4.0
nt.links.new(tc.outputs['Object'], nz.inputs['Vector'])
mr = nt.nodes.new('ShaderNodeMapRange')
mr.inputs['From Min'].default_value = -56
mr.inputs['From Max'].default_value = 2
nt.links.new(sepz.outputs['Z'], mr.inputs['Value'])
mad = nt.nodes.new('ShaderNodeMath')
mad.operation = 'MULTIPLY_ADD'
nt.links.new(nz.outputs['Fac'], mad.inputs[0])
mad.inputs[1].default_value = 0.30
nt.links.new(mr.outputs['Result'], mad.inputs[2])
ramp = nt.nodes.new('ShaderNodeValToRGB')
els = ramp.color_ramp.elements
els[0].position = 0.0
els[0].color = srgb('#6B5849')
els[1].position = 0.30
els[1].color = srgb('#8C745D')
e = ramp.color_ramp.elements.new(0.50)
e.color = srgb('#AC8F6F')
e = ramp.color_ramp.elements.new(0.68)
e.color = srgb('#C6AC88')
e = ramp.color_ramp.elements.new(0.85)
e.color = srgb('#DAC4A0')
e = ramp.color_ramp.elements.new(1.0)
e.color = srgb('#E5D4B4')
nt.links.new(mad.outputs['Value'], ramp.inputs['Fac'])
# 层理条带
wave = nt.nodes.new('ShaderNodeTexWave')
wave.wave_type = 'BANDS'
wave.bands_direction = 'Z'
wave.inputs['Scale'].default_value = 0.32
wave.inputs['Distortion'].default_value = 7.0
wave.inputs['Detail'].default_value = 3.0
nt.links.new(tc.outputs['Object'], wave.inputs['Vector'])
band = nt.nodes.new('ShaderNodeValToRGB')
band.color_ramp.interpolation = 'CONSTANT'
band.color_ramp.elements[0].position = 0.42
band.color_ramp.elements[0].color = (1, 1, 1, 1)
band.color_ramp.elements[1].position = 0.62
band.color_ramp.elements[1].color = (0.72, 0.72, 0.72, 1)
nt.links.new(wave.outputs['Fac'], band.inputs['Fac'])
mixc = nt.nodes.new('ShaderNodeMixRGB')
mixc.blend_type = 'MULTIPLY'
mixc.inputs['Fac'].default_value = 0.55
nt.links.new(ramp.outputs['Color'], mixc.inputs['Color1'])
nt.links.new(band.outputs['Color'], mixc.inputs['Color2'])
nt.links.new(mixc.outputs['Color'], bsdf.inputs['Base Color'])
bp = nt.nodes.new('ShaderNodeBump')
bp.inputs['Strength'].default_value = 0.5
bp.inputs['Distance'].default_value = 0.2
nt.links.new(nz.outputs['Fac'], bp.inputs['Height'])
nt.links.new(bp.outputs['Normal'], bsdf.inputs['Normal'])

NSEG = 144
LEVELS = [(-2.42, 1.004), (-4.0, 1.024), (-7.0, 1.014), (-11.0, 0.968),
          (-16.0, 0.888), (-21.0, 0.792), (-26.0, 0.652), (-31.0, 0.482),
          (-35.0, 0.300), (-38.5, 0.100)]
rv = []
rings = []
for (z, k) in LEVELS:
    ring = []
    for i in range(NSEG):
        th = TAU * i / NSEG
        R = R_edge(th) * k
        p = Vector((math.cos(th) * R, math.sin(th) * R, z))
        n = mnoise.noise(Vector((math.cos(th) * 2.2, math.sin(th) * 2.2, z * 0.09)))
        flute = 0.030 * math.sin(th * 9 + z * 0.25)
        step = 1.0 + 0.022 * math.sin(z * 1.15 + th * 0.6)
        p.x *= (1 + n * 0.075 + flute) * step
        p.y *= (1 + n * 0.075 + flute) * step
        p.z += 0.45 * math.sin(th * 4 + z * 0.2) * (0.3 + abs(z) / 50.0)
        ring.append(p)
    rings.append(ring)
    rv.extend(ring)

rock_faces = []
for j in range(len(rings) - 1):
    for i in range(NSEG):
        a = j * NSEG + i
        b = j * NSEG + (i + 1) % NSEG
        c = (j + 1) * NSEG + (i + 1) % NSEG
        d = (j + 1) * NSEG + i
        rock_faces.append([a, b, c, d])
rock_faces.append([i for i in range(NSEG - 1, -1, -1)])
tip = len(rv)
rv.append((0, 0, -40.5))
last = (len(rings) - 1) * NSEG
for i in range(NSEG):
    rock_faces.append([last + i, last + (i + 1) % NSEG, tip])

rme = bpy.data.meshes.new('IslandRock')
rme.from_pydata([tuple(v) for v in rv], [], rock_faces)
rme.update()
rob = bpy.data.objects.new('IslandRock', rme)
rob.location = (0, CY, 0)
rob.data.materials.append(ROCKM)
C['00_Island'].objects.link(rob)
for p in rme.polygons:
    p.use_smooth = True
print('rock verts', len(rv))

# ---------------------------------------------------------------- 水
WATER = mat('water', '#9FCBD3', rough=0.10, alpha=0.80, transmission=0.35,
            mottle=0.05, scale=2.0)
pond = cyl('Pond', 3.3, 0.10, (-20, 1, -0.72), m=WATER, seg=56, coll_=C['01_Terrain'], bevel=0.04)
pond.scale = (1.12, 0.95, 1.0)

stream_pts = [(-22.6, 0.8, -0.78), (-25.0, 1.5, -0.82), (-27.6, 2.2, -0.92),
              (-30.0, 2.8, -1.10), (-31.8, 3.2, -1.45), (-32.9, 3.4, -1.95)]
tube('Stream', stream_pts, 0.52, WATER, C['01_Terrain'], res=2)

WATERFALL = mat('fall', '#DDEEF1', rough=0.22, alpha=0.60, mottle=0.04,
                emit=0.18, emit_col='#EDF8F9')
prof = [(-1.9, 0), (1.9, 0), (3.6, -12), (4.8, -24), (3.0, -33), (-3.4, -33), (-4.4, -24), (-2.9, -12)]
wob = [(x + 0.32 * math.sin(z * 0.45), z) for (x, z) in prof]
prism('Waterfall', wob, 0.45, (-33.3, 3.4, -0.8), (0, 0, math.radians(14)),
      WATERFALL, C['01_Terrain'], bevel=0.0)
for i in range(9):
    a = random.uniform(0, TAU)
    rr = random.uniform(0, 2.6)
    sphere(f'Mist{i}', random.uniform(0.5, 1.1),
           (-33.3 + math.cos(a) * rr, 3.4 + math.sin(a) * rr, -33.5 + random.uniform(-1.2, 1.2)),
           m=mat('mist', '#F3F8F7', rough=1.0, alpha=0.35, mottle=0, emit=0.3),
           coll_=C['08_Clouds'], seg=12, ring=8)

# ---------------------------------------------------------------- 悬垂岩块 / 浮石
ROCK = mat('rock', '#C6A882', rough=0.95, mottle=0.16, scale=2.2, bump=0.12)


def chunk(name, loc, size, seed=0, coll_=None, m=None, stretch=1.7):
    bm = bmesh.new()
    try:
        bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=1.0)
    except TypeError:
        bmesh.ops.create_uvsphere(bm, segments=16, ring_count=10, radius=1.0)
    for v in bm.verts:
        n = mnoise.noise(Vector((v.co.x * 1.9 + seed * 3.1, v.co.y * 1.9, v.co.z * 1.9)))
        v.co *= 1.0 + n * 0.30
        if v.co.z < 0:
            v.co.z *= stretch
    return _finish(bm, name, m or ROCK, coll_, loc, (0, 0, random.uniform(0, TAU)),
                   size, smooth_angle=45)


for i, (th, z, s, st) in enumerate([(0.35, -30, 7.5, 2.0), (2.1, -34, 9.0, 2.3),
                                   (3.5, -28, 6.0, 1.8), (4.6, -36, 7.0, 2.1),
                                   (5.6, -31, 5.5, 1.9), (1.2, -40, 5.0, 2.4)]):
    R = R_edge(th) * 0.55
    chunk(f'FloatRock{i}', (math.cos(th) * R, CY + math.sin(th) * R, z),
          (s, s * 0.85, s * 0.7), seed=i + 1, coll_=C['00_Island'], stretch=st)

for i in range(7):
    th = TAU * i / 7 + 0.7
    R = R_edge(th) * random.uniform(1.15, 1.45)
    chunk(f'FloatRockS{i}', (math.cos(th) * R, CY + math.sin(th) * R, random.uniform(-30, 4)),
          (random.uniform(1.2, 3.0),) * 2 + (random.uniform(1.0, 2.2),),
          seed=20 + i, coll_=C['00_Island'])

VINE = mat('vine', '#7C9B62', rough=0.9)
for i in range(40):
    th = TAU * i / 40 + 0.11
    R = R_edge(th) * 1.002
    x, y = math.cos(th) * R, CY + math.sin(th) * R
    L = 1.4 + 2.8 * abs(math.sin(i * 2.3))
    dx, dy = math.cos(th), math.sin(th)
    pts = [(x, y, -0.05), (x + dx * 0.18, y + dy * 0.18, -L * 0.45),
           (x + dx * 0.06, y + dy * 0.06, -L)]
    tube(f'Vine{i}', pts, 0.05, VINE, C['01_Terrain'], res=1)

# ---------------------------------------------------------------- 小路
PATHM = mat('path', '#D9C49C', rough=0.98, mottle=0.12, scale=4)
def path(name, pts, w=1.3):
    idx = 0
    for i in range(len(pts) - 1):
        p1, p2 = Vector(pts[i]), Vector(pts[i + 1])
        L = (p2 - p1).length
        if L < 0.01:
            continue
        n = max(1, int(L / 1.1))
        for k in range(n):
            a = p1 + (p2 - p1) * (k / n)
            b = p1 + (p2 - p1) * ((k + 1) / n)
            mid = (a + b) * 0.5
            seg = (b - a).length
            z = height(mid.x, mid.y)
            box(f'{name}_{idx}', (seg + 0.22, w, 0.05),
                (mid.x, mid.y, z + 0.02), (0, 0, math.atan2(b.y - a.y, b.x - a.x)),
                PATHM, 0.02, 1, C['01_Terrain'])
            idx += 1

path('PathGate', [(0, -11.6), (0, -15.0), (0, -18.2)], 3.2)
path('PathWest', [(0, -11.4), (-6, -13.6), (-12, -13.2), (-16, -9), (-18, -4)], 1.2)
path('PathEast', [(1, -11.4), (8, -12.6), (14, -10), (17, -5), (18, -1)], 1.2)
path('PathNorth', [(-2, 13.6), (-6, 18), (-4, 23), (-1, 27)], 1.0)

print('ISLAND DONE')
