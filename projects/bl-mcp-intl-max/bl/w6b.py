import bpy
from mathutils import Vector
cam = bpy.data.objects['CAM_Cut']
cam.data.lens = 48
keys = [
    (1, (40, -54, 28), (0, 5, 12)),
    (55, (36, -52, 32), (0, 5, 10)),
    (125, (18, -48, 45), (0, 5, 9)),
    (185, (2, -44, 42), (0, 5, 9)),
    (240, (-16, -40, 38), (0, 5, 9)),
]
for f, loc, tgt in keys:
    cam.location = loc
    cam.rotation_euler = (Vector(tgt) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    cam.keyframe_insert('location', frame=f)
    cam.keyframe_insert('rotation_euler', frame=f)
print('ok')
