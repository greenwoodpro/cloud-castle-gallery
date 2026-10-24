import bpy
m = bpy.data.materials.get('M_stone')
if m:
    for n in m.node_tree.nodes:
        if n.type == 'TEX_VORONOI':
            n.inputs['Scale'].default_value = 2.7
            n.inputs['Randomness'].default_value = 0.06
    # 灰缝更清晰
    for n in m.node_tree.nodes:
        if n.type == 'VALTORGB' and abs(n.color_ramp.elements[1].position - 0.075) < 0.01:
            n.color_ramp.elements[0].position = 0.004
            n.color_ramp.elements[1].position = 0.055
for o in bpy.data.objects:
    if o.name == 'L_Night_Sun':
        o.data.energy = 0.22
print('stone ok')
