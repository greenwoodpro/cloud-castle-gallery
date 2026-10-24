import bpy, math, os, sys
from mathutils import Vector

sc = bpy.context.scene
OUT = r"D:/OneDrive/Desktop/BL建模/国际max/renders"
os.makedirs(OUT, exist_ok=True)

VIEWS = {
    'overview': ((64, -68, 40), (0, 4, 2), 46),
    'keep': ((20, -24, 12), (0, 5, 11), 50),
    'gate': ((2, -34, 8), (0, -12, 6), 42),
    'west': ((-58, -26, 26), (0, 2, 2), 48),
    'hall': ((0.0, -8.0, 3.1), (0, 7.0, 1.9), 30, True),
    'kitchen': ((-0.5, -10.0, 8.6), (-2.4, 5.0, 6.4), 34, True),
    'bed': ((-0.5, -10.0, 12.6), (-1.4, 4.5, 10.9), 34, True),
    'obs': ((0.0, -10.0, 16.6), (0.0, 5.0, 15.2), 34, True),
    'prince': ((19.0, -16.5, 3.6), (25.2, -11.2, 1.9), 58, False),
    'court': ((3.0, -22.0, 6.0), (0.0, -6.0, 2.0), 40, False),
}
name = 'overview'
res = (1000, 680)
samples = 32
if 'PV' in os.environ:
    pass

# 允许用文本文件覆盖：bl/_pv.txt 里写 viewname
cfg = r"D:/OneDrive/Desktop/BL建模/国际max/bl/_pv.txt"
if os.path.exists(cfg):
    line = open(cfg, encoding='utf-8').read().strip().split()
    if line:
        name = line[0]
    if len(line) > 2:
        res = (int(line[1]), int(line[2]))

v = VIEWS[name]
loc, tgt, lens = v[0], v[1], v[2]
hide_cut = len(v) > 3 and v[3]
for o in bpy.data.collections['99_Hide_For_Interior_View'].objects:
    o.hide_render = hide_cut
cam = bpy.data.objects.get('PreviewCam')
if not cam:
    d = bpy.data.cameras.new('PreviewCam')
    cam = bpy.data.objects.new('PreviewCam', d)
    bpy.data.collections['11_Cameras'].objects.link(cam)
cam.data.lens = lens
cam.location = loc
cam.rotation_euler = (Vector(tgt) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
sc.camera = cam
sc.view_settings.view_transform = 'AgX'
sc.view_settings.exposure = 0.3
sc.render.resolution_x, sc.render.resolution_y = res
sc.eevee.taa_render_samples = samples
sc.render.filepath = os.path.join(OUT, f'pv_{name}.png')
bpy.ops.render.render(write_still=True)
print('rendered', name)
