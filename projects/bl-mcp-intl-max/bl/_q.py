import bpy
print('scenes', [(s.name, s.frame_start, s.frame_end) for s in bpy.data.scenes])
sc = bpy.context.scene
print('active', sc.name, 'camera', sc.camera.name)
sw = bpy.data.objects['Keep_SouthWall']
print('southwall hide_render', sw.hide_render)
print('anim', len([o for o in bpy.data.objects if o.animation_data]), 'animated objects')
print('windmill', bpy.data.objects['ANIM_Windmill'].animation_data is not None)
print('objects', len(bpy.data.objects))
