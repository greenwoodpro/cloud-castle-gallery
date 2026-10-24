import bpy, math, random
from mathutils import Vector, Matrix
import bmesh, sys
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
from lib import _finish

C = bpy.data.collections['08_Clouds']
for o in list(C.objects):
    if o.name.startswith(('Cloud', 'HighCloud', 'NearCloud', 'MidCloud')):
        bpy.data.objects.remove(o, do_unlink=True)

CLOUD = bpy.data.materials['M_cloud']

def merged(name, parts, m, coll_, seg=14, ring=9, smooth=70):
    bm = bmesh.new()
    for (r, loc, sc) in parts:
        mtx = Matrix.Translation(Vector(loc)) @ Matrix.Diagonal(Vector((sc[0], sc[1], sc[2], 1.0)))
        bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=ring, radius=r, matrix=mtx)
    return _finish(bm, name, m, coll_, (0, 0, 0), (0, 0, 0), (1, 1, 1), smooth_angle=smooth)

def cloud(name, x, y, z, s, n=7, seed=0):
    rnd = random.Random(seed)
    parts = []
    for i in range(n):
        a = rnd.uniform(0, 6.28)
        rr = rnd.uniform(0, s * 1.4)
        parts.append((rnd.uniform(0.5, 1.0) * s,
                      (x + math.cos(a) * rr, y + math.sin(a) * rr * 0.7,
                       z + rnd.uniform(-0.2, 0.35) * s), (1.25, 1.0, 0.7)))
    merged(name, parts, CLOUD, C)

random.seed(33)
# 岛下云海（远、低）
for i in range(18):
    a = 6.28 * i / 18 + random.uniform(-0.08, 0.08)
    rr = random.uniform(62, 95)
    cloud(f'Cloud{i}', math.cos(a) * rr, 4 + math.sin(a) * rr, random.uniform(-80, -62),
          random.uniform(5, 9), 7, i)
# 极远处高层云（只在远景做背景）
for i in range(7):
    a = 6.28 * i / 7 + 0.5
    rr = random.uniform(150, 215)
    cloud(f'HighCloud{i}', math.cos(a) * rr, 4 + math.sin(a) * rr, random.uniform(-45, -18),
          random.uniform(9, 14), 6, 40 + i)

cam = bpy.data.objects['CAM_01_全景']
cam.data.lens = 42
cam.location = (90, -96, 58)
cam.rotation_euler = (Vector((0, 4, -12)) - cam.location).to_track_quat('-Z','Y').to_euler()
print('clouds rebuilt')
