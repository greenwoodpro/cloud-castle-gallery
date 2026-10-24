import bpy
from mathutils import Vector
o = bpy.data.objects['CAM_03_庭院']
o.location = (-7.5, -13.5, 9.2)
o.data.lens = 24
o.rotation_euler = (Vector((4.0, -1.0, 1.6)) - o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('ok')
