import bpy
sc = bpy.data.scenes['01_正午']
bpy.context.window.scene = sc
sc.camera = bpy.data.objects['CAM_01_全景']
sc.frame_set(1)
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('active', bpy.context.scene.name)
