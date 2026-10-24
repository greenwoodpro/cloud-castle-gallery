import bpy
b = bpy.data.objects.get('Balloon')
if b:
    b.location = (20.0, -40.0, 13.0)
    b.keyframe_insert('location', frame=1)
    b.location = (22.0, -38.0, 14.6)
    b.keyframe_insert('location', frame=120)
    b.location = (18.0, -42.0, 12.2)
    b.keyframe_insert('location', frame=240)

# 主场景设置
sc = bpy.data.scenes['01_正午']
bpy.context.window.scene = sc
sc.camera = bpy.data.objects['CAM_01_全景']
sc.frame_set(1)
for o in bpy.data.collections['99_Hide_For_Interior_View'].objects:
    o.hide_render = False
    o.hide_viewport = False

bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('saved', [s.name for s in bpy.data.scenes])
