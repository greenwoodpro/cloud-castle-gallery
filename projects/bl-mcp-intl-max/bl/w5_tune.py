import bpy

# 石材：更规整的砌块，减少马赛克感
m = bpy.data.materials.get('M_stone')
if m:
    for n in m.node_tree.nodes:
        if n.type == 'TEX_VORONOI':
            n.inputs['Scale'].default_value = 3.4
            n.inputs['Randomness'].default_value = 0.35

# 夜景更暗
for o in bpy.data.objects:
    if o.name == 'L_Night_Sun':
        o.data.energy = 0.075
        o.data.color = (0.58, 0.70, 1.0)
    if o.name == 'L_Night_Fill':
        o.data.energy = 5.0

# 晨光更暖更强
for o in bpy.data.objects:
    if o.name == 'L_Dawn_Sun':
        o.data.energy = 3.4
        o.data.color = (1.0, 0.74, 0.52)
        o.data.angle = 0.14
    if o.name == 'L_Dawn_Fill':
        o.data.energy = 260
        o.data.color = (0.78, 0.80, 1.0)

# 黄昏更暖
for o in bpy.data.objects:
    if o.name == 'L_Dusk_Sun':
        o.data.energy = 3.8
        o.data.color = (1.0, 0.54, 0.26)
    if o.name == 'L_Dusk_Fill':
        o.data.energy = 190
        o.data.color = (0.60, 0.58, 0.88)

for wn, st in (('W_Dawn', 0.72), ('W_Dusk', 0.55), ('W_Night', 0.22)):
    w = bpy.data.worlds.get(wn)
    if w and w.use_nodes:
        for n in w.node_tree.nodes:
            if n.type == 'BACKGROUND':
                n.inputs['Strength'].default_value = st
print('tuned')
