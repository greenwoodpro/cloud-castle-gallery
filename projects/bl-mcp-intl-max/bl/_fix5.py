import bpy, math
from mathutils import Vector
for o in list(bpy.data.objects):
    if o.name.startswith('HighCloud'):
        bpy.data.objects.remove(o, do_unlink=True)

CAMS = {
 'CAM_07_大厅': ((0.2, 1.5, 2.5), (0.0, 8.6, 2.1), 22, True),
 'CAM_10_卧室': ((-3.9, 1.3, 11.3), (2.6, 4.2, 10.6), 24, True),
 'CAM_11_厨房': ((-4.2, 8.9, 6.7), (0.6, 2.6, 6.0), 24, True),
 'CAM_12_观星台': ((-4.2, 8.9, 15.4), (1.8, 3.0, 14.6), 24, True),
}
for n, (loc, tgt, lens, cut) in CAMS.items():
    o = bpy.data.objects.get(n)
    if not o: continue
    o.location = loc
    o.data.lens = lens
    o.rotation_euler = (Vector(tgt) - Vector(loc)).to_track_quat('-Z','Y').to_euler()
    o['hide_cutaway'] = cut
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('ok')
