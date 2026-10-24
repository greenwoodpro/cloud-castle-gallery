import bpy
from mathutils import Vector
o = bpy.data.objects['CAM_03_庭院']
o.location = (0.6, -9.0, 7.0)
o.data.lens = 21
o.rotation_euler = (Vector((0.0, 1.6, 2.0)) - o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('ok')
