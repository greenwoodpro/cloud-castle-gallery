import bpy
sc = bpy.data.scenes['01_正午']
bpy.context.window.scene = sc
sc.camera = bpy.data.objects['CAM_01_全景']
sc.frame_set(1)
for o in bpy.data.collections['99_Hide_For_Interior_View'].objects:
    o.hide_render = False
    o.hide_viewport = False
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('final save', len(bpy.data.objects), [s.name for s in bpy.data.scenes])
