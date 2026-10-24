import bpy, os, sys

OUT = r"D:/OneDrive/Desktop/BL建模/国际max/renders"
os.makedirs(OUT, exist_ok=True)
cfg = r"D:/OneDrive/Desktop/BL建模/国际max/bl/_scenes.txt"
res = (1240, 840)
samples = 40
jobs = []
if os.path.exists(cfg):
    for line in open(cfg, encoding='utf-8').read().splitlines():
        p = line.strip().split()
        if not p:
            continue
        if p[0] == 'res':
            res = (int(p[1]), int(p[2]))
            continue
        if p[0] == 'samples':
            samples = int(p[1])
            continue
        jobs.append(p)

for job in jobs:
    scene_name, cam, frame, out = job[0], job[1], int(job[2]), job[3]
    s = bpy.data.scenes.get(scene_name)
    if not s:
        print('missing scene', scene_name)
        continue
    bpy.context.window.scene = s
    s.camera = bpy.data.objects.get(cam) or s.camera
    s.render.resolution_x, s.render.resolution_y = res
    try:
        s.eevee.taa_render_samples = samples
    except Exception:
        pass
    s.frame_set(frame)
    s.render.filepath = os.path.join(OUT, out)
    bpy.ops.render.render(write_still=True, scene=s.name)
    print('rendered', scene_name, frame, out)
