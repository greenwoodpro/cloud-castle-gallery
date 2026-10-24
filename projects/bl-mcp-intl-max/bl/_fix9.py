import bpy
from mathutils import Vector
o = bpy.data.objects['CAM_03_庭院']
o.location = (0.4, -10.6, 8.6)
o.data.lens = 22
o.rotation_euler = (Vector((0.0, 0.8, 2.2)) - o.location).to_track_quat('-Z','Y').to_euler()

# 剖面相机
c = bpy.data.objects.get('CAM_14_剖面')
if not c:
    d = bpy.data.cameras.new('CAM_14_剖面')
    c = bpy.data.objects.new('CAM_14_剖面', d)
    bpy.data.collections['11_Cameras'].objects.link(c)
c.location = (3.5, -25.0, 19.5)
c.data.lens = 46
c.rotation_euler = (Vector((0.0, 5.0, 9.2)) - c.location).to_track_quat('-Z','Y').to_euler()
c['hide_cutaway'] = True
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('ok')
