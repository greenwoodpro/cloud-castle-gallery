import bpy

def C(h):
    h = h.lstrip('#')
    v = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]
    f = lambda c: c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4
    return (f(v[0]), f(v[1]), f(v[2]), 1)

sets = {
 'W_Dusk': [(0.0, '#FFC98F'), (0.18, '#F2AE7E'), (0.45, '#C98E86'), (0.75, '#6E6688'), (1.0, '#3A3E62')],
 'W_Dawn': [(0.0, '#FFE2C4'), (0.20, '#FFD0B4'), (0.50, '#DCC4CE'), (0.78, '#9FB4D4'), (1.0, '#7FA0CC')],
 'W_Night': [(0.0, '#3A4A6E'), (0.14, '#243252'), (0.5, '#131C34'), (1.0, '#080E1E')],
}
for wn, stops in sets.items():
    w = bpy.data.worlds.get(wn)
    if not w:
        continue
    for n in w.node_tree.nodes:
        if n.type == 'MAP_RANGE':
            n.inputs['From Max'].default_value = 0.55
        if n.type == 'VALTORGB':
            els = n.color_ramp.elements
            while len(els) < len(stops):
                els.new(0.5)
            for i, (pos, col) in enumerate(stops):
                els[i].position = pos
                els[i].color = C(col)
            n.color_ramp.interpolation = 'B_SPLINE'

for o in bpy.data.objects:
    if o.name == 'L_Night_Sun':
        o.data.energy = 0.12
    if o.name == 'L_Dusk_Fill':
        o.data.energy = 260
print('sky tuned')
