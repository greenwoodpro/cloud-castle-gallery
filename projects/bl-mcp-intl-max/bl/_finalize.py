import bpy
CUT = bpy.data.collections['99_Hide_For_Interior_View']
for o in CUT.objects:
    o.hide_render = False
    o.hide_viewport = False
CUT.hide_render = False
CUT.hide_viewport = False
sc = bpy.context.scene
sc.camera = bpy.data.objects['CAM_01_全景']
sc.render.filepath = r"D:/OneDrive/Desktop/BL建模/国际max/renders/"
# 视口设置：材质预览 + 透视
for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
        for sp in area.spaces:
            if sp.type == 'VIEW_3D':
                sp.shading.type = 'MATERIAL'
                sp.shading.use_scene_lights = True
                sp.shading.use_scene_world = True
                sp.overlay.show_floor = False
                sp.clip_end = 500
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('final saved', len(bpy.data.objects))
