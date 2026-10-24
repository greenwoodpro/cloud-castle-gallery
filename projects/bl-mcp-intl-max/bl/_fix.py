import bpy
from mathutils import Vector
cr = bpy.data.objects.get('Gate_crest')
if cr:
    cr.location = (0, -12.86, 6.35)
CAMS = {
 'CAM_02_城门': ((14, -46, 13), (0, -11, 7), 45),
 'CAM_04_主堡': ((31, -43, 22), (0, 5, 12), 50),
 'CAM_06_西侧瀑布': ((-58, -30, 15), (-22, 2, -4), 48),
 'CAM_08_礼拜堂': ((20, -29, 12), (9.2, 2.5, 5), 45),
 'CAM_09_北野': ((8, 66, 26), (0, 14, 3), 45),
}
for n, (loc, tgt, lens) in CAMS.items():
    o = bpy.data.objects.get(n)
    if not o: continue
    o.location = loc
    o.data.lens = lens
    o.rotation_euler = (Vector(tgt) - Vector(loc)).to_track_quat('-Z','Y').to_euler()
print('ok')
