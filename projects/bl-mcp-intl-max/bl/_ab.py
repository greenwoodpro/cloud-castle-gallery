import bpy
from mathutils import Vector
sc = bpy.context.scene
cam = bpy.data.objects['PreviewCam']
cam.data.lens = 50
cam.location = (72, -78, 46)
cam.rotation_euler = (Vector((0, 4, -4)) - cam.location).to_track_quat('-Z','Y').to_euler()
sc.camera = cam
sc.render.resolution_x = 760; sc.render.resolution_y = 520
sc.eevee.taa_render_samples = 24
for o in bpy.data.collections['99_Hide_For_Interior_View'].objects:
    o.hide_render = False
for look, exp, tag in [('AgX - Punchy', 0.6, 'p06'), ('AgX - Punchy', 0.85, 'p085')]:
    sc.view_settings.view_transform = 'AgX'
    sc.view_settings.look = look
    sc.view_settings.exposure = exp
    sc.render.filepath = rf"D:/OneDrive/Desktop/BL建模/国际max/renders/ab_{tag}.png"
    bpy.ops.render.render(write_still=True)
    print(tag)
