import bpy
from mathutils import Vector
o = bpy.data.objects['CAM_03_庭院']
o.location = (-8.6, -10.2, 6.4)
o.data.lens = 26
o.rotation_euler = (Vector((3.0, 3.0, 2.6)) - o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('ok')
