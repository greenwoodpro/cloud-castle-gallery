import bpy, re

# 1) 删除重复灯光（多次重跑脚本产生）
dup = [o for o in bpy.data.objects if o.type == 'LIGHT' and re.search(r'\.\d{3}$', o.name)]
for o in dup:
    bpy.data.objects.remove(o, do_unlink=True)
print('dup lights removed', len(dup))

# 2) 室内补光单独成集合，只给白天场景
FILL_NAMES = [o for o in bpy.data.objects if o.type == 'LIGHT'
              and (o.name.startswith('Fill') or o.name == 'ChapelLight2')]
c = bpy.data.collections.get('23_Light_InteriorFill')
if not c:
    c = bpy.data.collections.new('23_Light_InteriorFill')
    bpy.data.scenes['Scene'].collection.children.link(c)
for o in FILL_NAMES:
    for cc in list(o.users_collection):
        cc.objects.unlink(o)
    c.objects.link(o)
print('fill lights', len(FILL_NAMES))

for sn in ('04_星空',):
    s = bpy.data.scenes[sn]
    try:
        s.collection.children.unlink(c)
        print('unlinked from', sn)
    except Exception as e:
        print('unlink skip', e)

# 3) 夜景月光更弱
for o in bpy.data.objects:
    if o.name == 'L_Night_Sun':
        o.data.energy = 0.30
    if o.name == 'L_Night_Fill':
        o.data.energy = 22

# 4) 晨昏天空：暖带抬高
for wn, top in (('W_Dawn', 0.48), ('W_Dusk', 0.46)):
    w = bpy.data.worlds.get(wn)
    if not w:
        continue
    for n in w.node_tree.nodes:
        if n.type == 'MAP_RANGE':
            n.inputs['From Max'].default_value = top

# 5) 主场景改名
bpy.data.scenes['Scene'].name = '01_正午'
print('ok')
