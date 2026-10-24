import bpy
from mathutils import Vector
cam = bpy.data.objects['CAM_Cut']
cam.data.lens = 44
keys = [
    (1, (38, -52, 26), (0, 5, 12)),
    (50, (34, -50, 28), (0, 5, 10)),
    (120, (20, -50, 36), (0, 5, 9)),
    (180, (4, -46, 34), (0, 5, 9)),
    (240, (-14, -40, 30), (0, 5, 9)),
]
for f, loc, tgt in keys:
    cam.location = loc
    cam.rotation_euler = (Vector(tgt) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    cam.keyframe_insert('location', frame=f)
    cam.keyframe_insert('rotation_euler', frame=f)
print('cam keys')
