# -*- coding: utf-8 -*-
"""Build entry point. Run:  exec(open(BUILD).read(), g); g['main']()"""
import sys, os, importlib, bpy

DIR = r'D:\OneDrive\Desktop\BL建模\mcp\castle'
if DIR not in sys.path:
    sys.path.insert(0, DIR)
for _k in ('cas_lib', 'cas_island', 'cas_castle', 'cas_env', 'cas_interior', 'cas_folks'):
    if _k in sys.modules:
        del sys.modules[_k]

import cas_lib as L
import cas_island as ISL
import cas_castle as CST
import cas_env as ENV


def main(do_render=True, res=(1600, 1200), samples=48, cam='Cam_Main',
         out='preview.png', stage='full'):
    L.clear_scene()
    L.MATS.clear()
    for _m in list(bpy.data.materials):
        bpy.data.materials.remove(_m)
    M = ISL.mats()
    CM = CST.castle_mats()

    ISL.build_island(M)
    ISL.build_meadow(M)
    ISL.build_terrace(M)
    ISL.build_pond(M)
    ISL.build_waterfall(M)
    ISL.build_cloudsea(M)
    ISL.build_flora(M)
    ISL.build_garden(M)
    objs = CST.build_all(M, CM)

    if stage != 'shell':
        try:
            import cas_interior as INT
            INT.build_all(M, CM)
        except Exception as e:
            print('interior skipped:', type(e).__name__, e)
        try:
            import cas_folks as FLK
            FLK.build_all(M, CM)
        except Exception as e:
            print('folks skipped:', type(e).__name__, e)

    ENV.build_sky()
    ENV.build_stars()
    ENV.build_moon()
    ENV.build_lights()
    rig, camob = ENV.build_cameras()
    ENV.build_extra_cams()
    ENV.setup_render(samples=samples, res=res)

    if do_render:
        sc = bpy.context.scene
        target = bpy.data.objects.get(cam)
        if target:
            sc.camera = target
        sc.render.filepath = os.path.join(DIR, 'render', out)
        bpy.ops.render.render(write_still=True)
        print('RENDERED', sc.render.filepath)
    tot = sum(len(o.data.polygons) for o in bpy.data.objects
              if o.type == 'MESH' and o.data)
    print('objects=%d  faces=%d' % (len(bpy.data.objects), tot))
    return True
