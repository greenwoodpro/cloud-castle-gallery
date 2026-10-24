import bpy, math

# 把误移的白天 Fill 放回日光集合
c_day = bpy.data.collections['20_Light_Day']
o = bpy.data.objects.get('Fill')
if o and c_day not in o.users_collection:
    for cc in list(o.users_collection):
        cc.objects.unlink(o)
    c_day.objects.link(o)

# 重建室内补光集合
name = '23_Light_InteriorFill'
c = bpy.data.collections.get(name)
if c:
    for ob in list(c.objects):
        bpy.data.objects.remove(ob, do_unlink=True)
else:
    c = bpy.data.collections.new(name)

FL = [0.37, 4.77, 8.97, 13.17]
def fill(nm, x, y, z, size, energy, rot, col=(1.0, 0.92, 0.80)):
    ld = bpy.data.lights.new(nm, 'AREA')
    ld.energy = energy
    ld.size = size
    ld.color = col
    ld.use_shadow = False
    ob = bpy.data.objects.new(nm, ld)
    ob.location = (x, y, z)
    ob.rotation_euler = rot
    c.objects.link(ob)

for i, z in enumerate(FL):
    fill(f'IFillA{i}', -1.5, 4.0, z + 3.6, 4.5, 110, (math.pi, 0, 0))
    fill(f'IFillB{i}', 2.2, 6.5, z + 3.6, 4.0, 85, (math.pi, 0, 0))
fill('IFillHall', 0.0, 1.5, FL[0] + 2.0, 3.0, 60, (0, math.pi / 2, 0), (1.0, 0.85, 0.7))

for sn in ('01_正午', '02_清晨', '03_黄昏', '05_解剖'):
    s = bpy.data.scenes.get(sn)
    if s and c.name not in [x.name for x in s.collection.children]:
        s.collection.children.link(c)
        print('linked to', sn)
print('fill rebuilt', len(c.objects))
