import bpy, math
w = bpy.context.scene.world
for n in w.node_tree.nodes:
    if n.type == 'VALTORGB':
        els = n.color_ramp.elements
        while len(els) < 4:
            els.new(0.5)
        data = [(0.0, (0.93, 0.86, 0.74, 1)),
                (0.12, (0.80, 0.86, 0.88, 1)),
                (0.34, (0.52, 0.70, 0.83, 1)),
                (1.0, (0.33, 0.56, 0.76, 1))]
        for i, (pos, col) in enumerate(data):
            els[i].position = pos
            els[i].color = col
        n.color_ramp.interpolation = 'B_SPLINE'
        print('sky patched', len(els))

for o in list(bpy.data.objects):
    if o.name.startswith(('Reed', 'Terr', 'Wheat')):
        bpy.data.objects.remove(o, do_unlink=True)

wf = bpy.data.objects.get('Waterfall')
if wf:
    wf.scale.x = 1.9
    wf.location.x = -33.0

mt = bpy.data.materials.get('M_terrain')
if mt:
    for n in mt.node_tree.nodes:
        if n.type == 'TEX_NOISE':
            n.inputs['Scale'].default_value = 1.15
            n.inputs['Detail'].default_value = 7.0
print('done')
