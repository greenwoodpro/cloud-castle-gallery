import bpy
from mathutils import Vector
CAMS = {
 'CAM_03_庭院': ((0.0, -9.6, 3.4), (0.0, 3.0, 3.0), 24),
 'CAM_08_礼拜堂': ((11.2, -7.6, 4.4), (9.2, 2.6, 4.0), 30),
}
for n, (loc, tgt, lens) in CAMS.items():
    o = bpy.data.objects[n]
    o.location = loc
    o.data.lens = lens
    o.rotation_euler = (Vector(tgt) - Vector(loc)).to_track_quat('-Z','Y').to_euler()
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('ok')
