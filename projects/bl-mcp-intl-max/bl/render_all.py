import bpy, os, sys

sc = bpy.context.scene
OUT = r"D:/OneDrive/Desktop/BL建模/国际max/renders"
os.makedirs(OUT, exist_ok=True)
CUT = bpy.data.collections['99_Hide_For_Interior_View']

names = sys.argv[-1] if False else None
cfg = r"D:/OneDrive/Desktop/BL建模/国际max/bl/_render.txt"
cams = []
res = (1280, 870)
samples = 48
if os.path.exists(cfg):
    for line in open(cfg, encoding='utf-8').read().splitlines():
        p = line.split()
        if not p:
            continue
        if p[0] == 'res':
            res = (int(p[1]), int(p[2]))
            continue
        if p[0] == 'samples':
            samples = int(p[1])
            continue
        cams.append(p[0])
if not cams:
    cams = ['CAM_01_全景']

sc.render.resolution_x, sc.render.resolution_y = res
sc.eevee.taa_render_samples = samples

for name in cams:
    o = bpy.data.objects.get(name)
    if not o:
        print('missing', name)
        continue
    hide = bool(o.get('hide_cutaway', False))
    for ob in CUT.objects:
        ob.hide_render = hide
    sc.camera = o
    sc.render.filepath = os.path.join(OUT, f'{name}.png')
    bpy.ops.render.render(write_still=True)
    print('rendered', name)
