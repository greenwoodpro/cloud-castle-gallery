"""多场景：清晨 / 黄昏 / 星空 / 解剖动画"""
import bpy, math, random
from mathutils import Vector

scn = bpy.context.scene
GEO = ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
       '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
       '11_Cameras', '99_Hide_For_Interior_View']

# ---------------------------------------------------------------- 光照集合拆分
def new_coll(name, parent_scene=None):
    c = bpy.data.collections.get(name)
    if c is None:
        c = bpy.data.collections.new(name)
        (parent_scene or scn).collection.children.link(c)
    return c


def move_to(objs, coll):
    for o in objs:
        for c in list(o.users_collection):
            c.objects.unlink(o)
        coll.objects.link(o)


DAY_NAMES = {'Sun', 'Fill', 'Bounce', 'Key_Rim'}
day_lights = [o for o in bpy.data.objects if o.type == 'LIGHT' and o.name in DAY_NAMES]
COL_DAY = new_coll('20_Light_Day')
move_to(day_lights, COL_DAY)

shared = [o for o in bpy.data.objects if o.type == 'LIGHT' and o.name not in DAY_NAMES]
COL_SH = new_coll('21_Light_Shared')
move_to(shared, COL_SH)

anim = [o for o in bpy.data.objects if o.name.startswith('ANIM_') or o.name == 'Balloon']
COL_ANIM = new_coll('22_AnimRig')
move_to(anim, COL_ANIM)

# ---------------------------------------------------------------- 世界
def make_world(name, stops, strength=0.55, sun_pos=None):
    w = bpy.data.worlds.new(name)
    w.use_nodes = True
    nt = w.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputWorld')
    bg = nt.nodes.new('ShaderNodeBackground')
    bg.inputs['Strength'].default_value = strength
    geo = nt.nodes.new('ShaderNodeNewGeometry')
    sep = nt.nodes.new('ShaderNodeSeparateXYZ')
    mr = nt.nodes.new('ShaderNodeMapRange')
    mr.inputs['From Min'].default_value = -0.10
    mr.inputs['From Max'].default_value = 0.70
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.interpolation = 'B_SPLINE'
    els = ramp.color_ramp.elements
    while len(els) < len(stops):
        els.new(0.5)
    for i, (pos, col) in enumerate(stops):
        els[i].position = pos
        els[i].color = col
    nt.links.new(geo.outputs['Incoming'], sep.inputs['Vector'])
    nt.links.new(sep.outputs['Z'], mr.inputs['Value'])
    nt.links.new(mr.outputs['Result'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], bg.inputs['Color'])
    nt.links.new(bg.outputs['Background'], out.inputs['Surface'])
    return w


def C(h):
    h = h.lstrip('#')
    v = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return (f(v[0]), f(v[1]), f(v[2]), 1)


W_DAWN = make_world('W_Dawn', [(0.0, C('#F9DEC6')), (0.14, C('#EFD3D2')), (0.42, C('#B9CBE4')), (1.0, C('#8FB0D6'))], 0.55)
W_DUSK = make_world('W_Dusk', [(0.0, C('#F8C79C')), (0.12, C('#E7A98E')), (0.36, C('#9C7F9C')), (0.72, C('#4E5478')), (1.0, C('#2C3452'))], 0.5)
W_NIGHT = make_world('W_Night', [(0.0, C('#25304E')), (0.10, C('#18223C')), (0.45, C('#101A30')), (1.0, C('#0A1122'))], 0.28)
W_DAY = scn.world


def sun_rig(scene, name, elev, azim, energy, color, size=6, fill=0.0, fillcol=(0.7, 0.8, 1.0)):
    c = bpy.data.collections.new(name)
    scene.collection.children.link(c)
    ld = bpy.data.lights.new(name + '_Sun', 'SUN')
    ld.energy = energy
    ld.color = color
    ld.angle = math.radians(size)
    o = bpy.data.objects.new(name + '_Sun', ld)
    o.rotation_euler = (math.radians(90 - elev), 0, math.radians(azim))
    c.objects.link(o)
    if fill > 0:
        fd = bpy.data.lights.new(name + '_Fill', 'AREA')
        fd.energy = fill
        fd.size = 60
        fd.color = fillcol
        fd.use_shadow = False
        fo = bpy.data.objects.new(name + '_Fill', fd)
        fo.location = (-60, 40, 45)
        fo.rotation_euler = (math.radians(-40), 0, math.radians(-150))
        c.objects.link(fo)
    return c


def new_scene(name, world, cam='CAM_01_全景'):
    s = bpy.data.scenes.new(name)
    for cn in GEO:
        s.collection.children.link(bpy.data.collections[cn])
    s.collection.children.link(COL_SH)
    s.collection.children.link(COL_ANIM)
    s.world = world
    s.render.engine = 'BLENDER_EEVEE'
    s.render.resolution_x, s.render.resolution_y = 1400, 950
    s.view_settings.view_transform = 'Standard'
    s.view_settings.look = 'None'
    s.view_settings.exposure = 0.05
    s.frame_start, s.frame_end = 1, 240
    s.render.fps = 24
    try:
        s.eevee.taa_render_samples = 64
        s.eevee.use_raytracing = True
        s.eevee.ray_tracing_method = 'SCREEN'
    except Exception:
        pass
    s.camera = bpy.data.objects[cam]
    return s


# 清理旧场景
for nm in ('02_清晨', '03_黄昏', '04_星空', '05_解剖'):
    s = bpy.data.scenes.get(nm)
    if s:
        bpy.data.scenes.remove(s)

S_DAWN = new_scene('02_清晨', W_DAWN, 'CAM_02_城门')
sun_rig(S_DAWN, 'L_Dawn', 9, 96, 2.4, (1.0, 0.82, 0.66), 9, 220, (0.72, 0.80, 1.0))
S_DUSK = new_scene('03_黄昏', W_DUSK, 'CAM_01_全景')
sun_rig(S_DUSK, 'L_Dusk', 11, 258, 3.0, (1.0, 0.63, 0.38), 6, 160, (0.55, 0.62, 0.9))
S_NIGHT = new_scene('04_星空', W_NIGHT, 'CAM_13_远景')
sun_rig(S_NIGHT, 'L_Night', 42, 30, 0.55, (0.62, 0.74, 1.0), 3, 60, (0.45, 0.55, 0.9))

# ---------------------------------------------------------------- 星空
STAR = bpy.data.materials.new('M_Star')
STAR.use_nodes = True
nt = STAR.node_tree
nt.nodes.clear()
out = nt.nodes.new('ShaderNodeOutputMaterial')
em = nt.nodes.new('ShaderNodeEmission')
em.inputs['Strength'].default_value = 4.0
nt.links.new(em.outputs['Emission'], out.inputs['Surface'])
tc = nt.nodes.new('ShaderNodeTexCoord')
vor = nt.nodes.new('ShaderNodeTexVoronoi')
vor.inputs['Scale'].default_value = 620.0
nt.links.new(tc.outputs['Generated'], vor.inputs['Vector'])
ramp = nt.nodes.new('ShaderNodeValToRGB')
ramp.color_ramp.interpolation = 'CONSTANT'
ramp.color_ramp.elements[0].position = 0.0
ramp.color_ramp.elements[0].color = (1, 1, 1, 1)
ramp.color_ramp.elements[1].position = 0.055
ramp.color_ramp.elements[1].color = (0, 0, 0, 1)
nt.links.new(vor.outputs['Distance'], ramp.inputs['Fac'])
# 密度调制
nz = nt.nodes.new('ShaderNodeTexNoise')
nz.inputs['Scale'].default_value = 3.0
nz.inputs['Detail'].default_value = 2.0
nt.links.new(tc.outputs['Generated'], nz.inputs['Vector'])
mul = nt.nodes.new('ShaderNodeMixRGB')
mul.blend_type = 'MULTIPLY'
mul.inputs['Fac'].default_value = 1.0
nt.links.new(ramp.outputs['Color'], mul.inputs['Color1'])
nt.links.new(nz.outputs['Fac'], mul.inputs['Color2'])
nt.links.new(mul.outputs['Color'], em.inputs['Color'])

C_STAR = bpy.data.collections.new('30_Stars')
S_NIGHT.collection.children.link(C_STAR)
bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=32, radius=520,
                                     location=(0, 4, -6))
dome = bpy.context.object
dome.name = 'StarDome'
dome.data.materials.append(STAR)
for c in list(dome.users_collection):
    c.objects.unlink(dome)
C_STAR.objects.link(dome)
try:
    dome.visible_shadow = False
except Exception:
    pass

# 月亮
MOON = bpy.data.materials.new('M_Moon')
MOON.use_nodes = True
nt = MOON.node_tree
nt.nodes.clear()
o_ = nt.nodes.new('ShaderNodeOutputMaterial')
e_ = nt.nodes.new('ShaderNodeEmission')
e_.inputs['Color'].default_value = C('#F2F0E4')
e_.inputs['Strength'].default_value = 3.2
nt.links.new(e_.outputs['Emission'], o_.inputs['Surface'])
bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=16, radius=16,
                                     location=(-150, -180, 120))
moon = bpy.context.object
moon.name = 'Moon'
moon.data.materials.append(MOON)
for c in list(moon.users_collection):
    c.objects.unlink(moon)
C_STAR.objects.link(moon)

# ---------------------------------------------------------------- 夜窗暖光
GLOW = bpy.data.materials.new('M_Glow')
GLOW.use_nodes = True
nt = GLOW.node_tree
nt.nodes.clear()
o_ = nt.nodes.new('ShaderNodeOutputMaterial')
e_ = nt.nodes.new('ShaderNodeEmission')
e_.inputs['Color'].default_value = C('#FFC77E')
e_.inputs['Strength'].default_value = 2.2
nt.links.new(e_.outputs['Emission'], o_.inputs['Surface'])

C_GLOW = bpy.data.collections.new('31_WindowGlow')
S_NIGHT.collection.children.link(C_GLOW)


def glow(x, y, z, rot, w=0.95, h=1.8):
    bpy.ops.mesh.primitive_plane_add(size=1, location=(x, y, z), rotation=(math.radians(90), 0, rot))
    p = bpy.context.object
    p.name = 'Glow'
    p.scale = (w, h, 1)
    p.data.materials.append(GLOW)
    for c in list(p.users_collection):
        c.objects.unlink(p)
    C_GLOW.objects.link(p)


for sx in (-1, 1):
    for z in (1.55, 5.95, 10.15, 14.35):
        for y in (2.2, 5.0, 7.8):
            glow(sx * 5.58, y, z, math.radians(90) * sx)
for z in (1.55, 5.95, 10.15, 14.35):
    for x in (-3.3, 0.0, 3.3):
        glow(x, 10.06, z, 0.0)
for i in range(3):
    yy = -0.8 + 1.6 + i * 2.6
    for sx in (-1, 1):
        glow(9.2 + sx * 2.56, yy, 2.8, math.radians(90) * sx, 0.8, 2.2)
for i in range(4):
    a = math.pi * 2 * i / 4 + 0.4
    glow(-4.3 + math.cos(a) * 2.1, -11.2 + math.sin(a) * 2.1, 4.6 + (i % 2) * 2.0, a, 0.35, 0.9)

# ---------------------------------------------------------------- 解剖动画场景
S_CUT = new_scene('05_解剖', W_DAY, 'CAM_14_剖面')
CUT = bpy.data.collections['99_Hide_For_Interior_View']
S_CUT.collection.children.unlink(CUT)

C_DUP = bpy.data.collections.new('40_CutDup')
S_CUT.collection.children.link(C_DUP)
dups = []
for o in list(CUT.objects):
    d = o.copy()
    d.name = 'CUT_' + o.name
    C_DUP.objects.link(d)
    dups.append(d)
CUT = C_DUP

wall_names = [o for o in CUT.objects if o.name.startswith(('CUT_Keep_SouthWall', 'CUT_KSW_', 'CUT_KeepDoorJ', 'CUT_KeepDoorLintel', 'CUT_KeepStep'))]
roof_names = [o for o in CUT.objects if o not in wall_names]

for o in wall_names:
    base = o.location.copy()
    o.location = base
    o.keyframe_insert('location', frame=1)
    o.location = base
    o.keyframe_insert('location', frame=26)
    o.location = (base.x, base.y - 1.2, base.z - 22.0)
    o.keyframe_insert('location', frame=96)
for o in roof_names:
    base = o.location.copy()
    o.keyframe_insert('location', frame=1)
    o.keyframe_insert('location', frame=30)
    o.location = (base.x, base.y - 5.0, base.z + 11.0)
    o.keyframe_insert('location', frame=100)

# 解剖相机
cd = bpy.data.cameras.new('CAM_Cut')
cd.lens = 42
cam = bpy.data.objects.new('CAM_Cut', cd)
S_CUT.collection.objects.link(cam)
keys = [
    (1, (31, -43, 22), (0, 5, 12)),
    (60, (26, -40, 24), (0, 5, 10)),
    (140, (10, -30, 26), (0, 5, 8)),
    (200, (2, -22, 22), (0, 5, 8.5)),
    (240, (-8, -20, 20), (0, 5, 8.5)),
]
for f, loc, tgt in keys:
    cam.location = loc
    cam.rotation_euler = (Vector(tgt) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    cam.keyframe_insert('location', frame=f)
    cam.keyframe_insert('rotation_euler', frame=f)
S_CUT.camera = cam

# 帧率与输出
for c in bpy.data.cameras:
    c.clip_end = 3000.0
for s in bpy.data.scenes:
    s.frame_start, s.frame_end = 1, 240
    s.render.fps = 24
    s.render.image_settings.file_format = 'PNG'

scn.frame_set(1)
print('SCENES', [s.name for s in bpy.data.scenes])
