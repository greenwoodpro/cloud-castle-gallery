import bpy
from mathutils import Vector
o = bpy.data.objects['CAM_02_城门']
o.location = (22, -60, 17)
o.data.lens = 50
o.rotation_euler = (Vector((0, -11, 7)) - o.location).to_track_quat('-Z', 'Y').to_euler()

b = bpy.data.objects.get('Balloon')
if b:
    b.location = (-26, -22, 24)
    b.keyframe_insert('location', frame=1)
    b.location = (-24, -20, 25.4)
    b.keyframe_insert('location', frame=120)
    b.location = (-28, -24, 23.2)
    b.keyframe_insert('location', frame=240)

sc = bpy.data.scenes['01_正午']
bpy.context.window.scene = sc
sc.camera = bpy.data.objects['CAM_01_全景']
sc.frame_set(1)
for ob in bpy.data.collections['99_Hide_For_Interior_View'].objects:
    ob.hide_render = False
    ob.hide_viewport = False
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('saved')
