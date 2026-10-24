import sys, os, math, importlib
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
import lib
importlib.reload(lib)
from lib import *
from mathutils import Vector

clear_scene()
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.unit_settings.system = 'METRIC'
scene.render.use_compositing = False
scene.render.use_freestyle = False

C = {}
for n in ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
          '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
          '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']:
    C[n] = coll(n)

# ---------------- 天空
w = bpy.data.worlds.new('Sky')
scene.world = w
w.use_nodes = True
nt = w.node_tree
nt.nodes.clear()
out = nt.nodes.new('ShaderNodeOutputWorld')
bg = nt.nodes.new('ShaderNodeBackground')
bg.inputs['Strength'].default_value = 0.55
geo = nt.nodes.new('ShaderNodeNewGeometry')
sep = nt.nodes.new('ShaderNodeSeparateXYZ')
mr = nt.nodes.new('ShaderNodeMapRange')
mr.inputs['From Min'].default_value = -0.10
mr.inputs['From Max'].default_value = 0.70
ramp = nt.nodes.new('ShaderNodeValToRGB')
ramp.color_ramp.interpolation = 'B_SPLINE'
els = ramp.color_ramp.elements
els[0].position = 0.0
els[0].color = srgb('#F8E9CF')
els[1].position = 0.26
els[1].color = srgb('#EADFC8')
e2 = ramp.color_ramp.elements.new(0.60)
e2.color = srgb('#BFD8E7')
e3 = ramp.color_ramp.elements.new(1.0)
e3.color = srgb('#8FB8D8')
nt.links.new(geo.outputs['Incoming'], sep.inputs['Vector'])
nt.links.new(sep.outputs['Z'], mr.inputs['Value'])
nt.links.new(mr.outputs['Result'], ramp.inputs['Fac'])
nt.links.new(ramp.outputs['Color'], bg.inputs['Color'])
nt.links.new(bg.outputs['Background'], out.inputs['Surface'])

# ---------------- 光
sun_d = bpy.data.lights.new('Sun', 'SUN')
sun_d.energy = 4.4
sun_d.color = (1.0, 0.94, 0.83)
sun_d.angle = math.radians(4.5)
sun = bpy.data.objects.new('Sun', sun_d)
sun.rotation_euler = (math.radians(48), math.radians(4), math.radians(42))
C['10_Lights'].objects.link(sun)

fill_d = bpy.data.lights.new('Fill', 'AREA')
fill_d.energy = 420
fill_d.size = 55
fill_d.color = (0.70, 0.82, 1.0)
fill = bpy.data.objects.new('Fill', fill_d)
fill.location = (-55, 60, 40)
fill.rotation_euler = (math.radians(-38), 0, math.radians(-135))
C['10_Lights'].objects.link(fill)

bounce_d = bpy.data.lights.new('Bounce', 'AREA')
bounce_d.energy = 1100
bounce_d.size = 70
bounce_d.color = (1.0, 0.90, 0.80)
bounce = bpy.data.objects.new('Bounce', bounce_d)
bounce.location = (10, -20, -70)
bounce.rotation_euler = (math.radians(180), 0, 0)
C['10_Lights'].objects.link(bounce)

# ---------------- 渲染
scene.render.resolution_x = 1280
scene.render.resolution_y = 860
scene.render.resolution_percentage = 100
scene.render.film_transparent = False
try:
    scene.eevee.taa_render_samples = 64
    scene.eevee.use_raytracing = True
    scene.eevee.use_shadows = True
    scene.eevee.ray_tracing_method = 'SCREEN'
    scene.eevee.use_fast_gi = True
except Exception as e:
    print('eevee', e)

for vt in ('AgX', 'Standard'):
    try:
        scene.view_settings.view_transform = vt
        break
    except Exception:
        pass
try:
    scene.view_settings.look = 'AgX - Medium Low Contrast'
except Exception:
    pass
scene.view_settings.exposure = 0.30

print('SCENE READY', scene.view_settings.view_transform, scene.render.engine)
