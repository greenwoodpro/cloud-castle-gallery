import bpy
c = bpy.data.objects['CAM_01_全景']
c.data.lens = 52
c.location = (82, -88, 52)
from mathutils import Vector
c.rotation_euler = (Vector((0, 4, -8)) - c.location).to_track_quat('-Z', 'Y').to_euler()
c2 = bpy.data.objects['CAM_13_远景']
c2.data.lens = 72
c2.location = (132, -122, 66)
c2.rotation_euler = (Vector((0, 6, -9)) - c2.location).to_track_quat('-Z', 'Y').to_euler()
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('ok')
