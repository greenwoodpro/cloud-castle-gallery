import bpy, math
from mathutils import Vector

for n in ('Stream', 'Waterfall'):
    o = bpy.data.objects.get(n)
    if o:
        bpy.data.objects.remove(o, do_unlink=True)
for o in list(bpy.data.objects):
    if o.name.startswith('Reed'):
        bpy.data.objects.remove(o, do_unlink=True)

def height(x, y):
    d = max(abs(x) / 17.5, abs(y - 3.0) / 16.5)
    t = max(0.0, min(1.0, (d - 0.98) / (1.30 - 0.98)))
    flat = t * t * (3 - 2 * t)
    roll = (0.55 * math.sin(x * 0.21 + 0.4) * math.cos(y * 0.18) +
            0.30 * math.sin((x + y) * 0.12 + 1.1))
    hill = 4.2 * math.exp(-(((x - 24.0) ** 2 + (y - 20.0) ** 2) / (2 * 7.5 ** 2)))
    knoll = 1.8 * math.exp(-(((x - 20.5) ** 2 + (y + 8.0) ** 2) / (2 * 4.0 ** 2)))
    ridge = 2.8 * math.exp(-(((x + 4.0) ** 2 + (y - 32.0) ** 2) / (2 * 8.0 ** 2)))
    rise = 1.4 * math.exp(-(((x - 10.0) ** 2 + (y - 27.0) ** 2) / (2 * 10.0 ** 2)))
    pond = -1.85 * math.exp(-(((x + 20.0) ** 2 + (y - 1.0) ** 2) / (2 * 3.4 ** 2)))
    return flat * (roll + hill + knoll + ridge + rise) + pond

WATER = bpy.data.materials.get('M_water')
WAT = bpy.data.materials.get('M_fall')
coll = bpy.data.collections['01_Terrain']
pts = [(-21.6, 1.4), (-24.0, 2.0), (-26.4, 2.5), (-28.8, 2.9), (-30.8, 3.2), (-32.4, 3.4)]
for i in range(len(pts) - 1):
    a, b = Vector(pts[i]), Vector(pts[i + 1])
    d = b - a
    L = d.length
    n = max(1, int(L / 0.8))
    for k in range(n):
        p1 = a + d * (k / n)
        p2 = a + d * ((k + 1) / n)
        mid = (p1 + p2) * 0.5
        z = height(mid.x, mid.y)
        ob = bpy.data.objects.new(f'StreamSeg{i}_{k}', bpy.data.meshes.new('s'))
        import bmesh
        bm = bmesh.new()
        bmesh.ops.create_cube(bm, size=1.0)
        for v in bm.verts:
            v.co.x *= (p2 - p1).length + 0.15
            v.co.y *= 1.5
            v.co.z *= 0.08
        bm.to_mesh(ob.data)
        bm.free()
        ob.location = (mid.x, mid.y, z + 0.03)
        ob.rotation_euler = (0, 0, math.atan2(d.y, d.x))
        ob.data.materials.append(WATER)
        coll.objects.link(ob)

# 瀑布：从崖口向下
bm = bmesh.new()
prof = [(-2.4, 0), (2.4, 0), (3.4, -12), (4.4, -24), (2.6, -32), (-3.2, -32), (-4.0, -24), (-2.8, -12)]
vs = [bm.verts.new((x, 0, z)) for (x, z) in prof]
f = bm.faces.new(vs)
ret = bmesh.ops.extrude_face_region(bm, geom=[f])
nv = [e for e in ret['geom'] if isinstance(e, bmesh.types.BMVert)]
bmesh.ops.translate(bm, verts=nv, vec=(0, 0.5, 0))
bmesh.ops.delete(bm, geom=[f], context='FACES')
bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
me = bpy.data.meshes.new('Waterfall')
bm.to_mesh(me)
bm.free()
ob = bpy.data.objects.new('Waterfall', me)
ob.location = (-33.2, 3.4, -0.9)
ob.rotation_euler = (0, 0, math.radians(12))
ob.data.materials.append(WAT)
coll.objects.link(ob)
print('stream rebuilt')
