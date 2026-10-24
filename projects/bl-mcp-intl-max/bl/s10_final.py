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
sc = bpy.context.scene

# 清理旧相机
for o in list(C['11_Cameras'].objects):
    bpy.data.objects.remove(o, do_unlink=True)
for o in list(C['10_Lights'].objects):
    if o.name.startswith('Key_'):
        bpy.data.objects.remove(o, do_unlink=True)

# ---------------- 色彩
sc.view_settings.view_transform = 'Standard'
sc.view_settings.look = 'None'
sc.view_settings.exposure = 0.05
try:
    sc.view_settings.gamma = 1.0
except Exception:
    pass

# ---------------- 光
sun = bpy.data.objects.get('Sun')
if sun:
    sun.data.energy = 3.3
    sun.data.color = (1.0, 0.95, 0.86)
    sun.data.angle = math.radians(5.5)
    sun.rotation_euler = (math.radians(46), math.radians(6), math.radians(38))
fill = bpy.data.objects.get('Fill')
if fill:
    fill.data.energy = 300
    fill.data.color = (0.70, 0.82, 1.0)
w = sc.world
if w and w.use_nodes:
    for n in w.node_tree.nodes:
        if n.type == 'BACKGROUND':
            n.inputs['Strength'].default_value = 0.62
# 暖色轮廓光
kd = bpy.data.lights.new('Key_Rim', 'AREA')
kd.energy = 900
kd.size = 45
kd.color = (1.0, 0.86, 0.68)
ko = bpy.data.objects.new('Key_Rim', kd)
ko.location = (-70, -60, 25)
ko.rotation_euler = (math.radians(78), 0, math.radians(-50))
C['10_Lights'].objects.link(ko)

# ---------------- 渲染
sc.render.engine = 'BLENDER_EEVEE'
sc.render.resolution_x = 1400
sc.render.resolution_y = 950
sc.render.resolution_percentage = 100
sc.render.image_settings.file_format = 'PNG'
try:
    sc.eevee.taa_render_samples = 64
    sc.eevee.use_raytracing = True
    sc.eevee.ray_tracing_method = 'SCREEN'
    sc.eevee.use_shadows = True
except Exception as e:
    print(e)
sc.render.film_transparent = False

# ---------------- 相机
def cam(name, loc, tgt, lens=50, cut=False, ortho=None):
    d = bpy.data.cameras.new(name)
    d.lens = lens
    if ortho:
        d.type = 'ORTHO'
        d.ortho_scale = ortho
    o = bpy.data.objects.new(name, d)
    o.location = loc
    o.rotation_euler = (Vector(tgt) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    C['11_Cameras'].objects.link(o)
    o['hide_cutaway'] = cut
    return o


cam('CAM_01_全景', (74, -80, 48), (0, 4, -5), 50)
cam('CAM_02_城门', (7.5, -33, 11), (0, -11, 6.5), 42)
cam('CAM_03_庭院', (1.5, -22, 8.5), (0, -4, 2.5), 38)
cam('CAM_04_主堡', (19, -23, 15), (0, 5, 12), 50)
cam('CAM_05_小王子', (19.0, -16.5, 3.6), (25.2, -11.2, 1.9), 58)
cam('CAM_06_西侧瀑布', (-56, -30, 20), (-6, 2, 0), 45)
cam('CAM_07_大厅', (0.0, -8.0, 3.1), (0, 7.0, 1.9), 30, cut=True)
cam('CAM_08_礼拜堂', (9.2, -16, 7.5), (9.2, 2.5, 4.5), 45)
cam('CAM_09_北野', (6, 62, 26), (0, 12, 3), 50)
cam('CAM_10_卧室', (-0.5, -10.0, 12.6), (-1.4, 4.5, 10.9), 34, cut=True)
cam('CAM_11_厨房', (-0.5, -10.0, 8.6), (-2.4, 5.0, 6.4), 34, cut=True)
cam('CAM_12_观星台', (0.0, -10.0, 16.6), (0.0, 5.0, 15.2), 34, cut=True)
cam('CAM_13_远景', (120, -110, 55), (0, 6, -8), 60)

sc.camera = bpy.data.objects['CAM_01_全景']

# ---------------- 集合整理
for cn in ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
           '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
           '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']:
    bpy.data.collections[cn].hide_render = False
    bpy.data.collections[cn].hide_viewport = False

path = r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend"
bpy.ops.wm.save_as_mainfile(filepath=path)
print('SAVED', path, len(bpy.data.objects))
