import bpy
from mathutils import Vector
o = bpy.data.objects['CAM_03_庭院']
o.location = (2.0, -7.0, 17.0)
o.data.lens = 22
o.rotation_euler = (Vector((0.0, -5.0, 0.2)) - o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('ok')
