"""总装：按顺序生成整座浮空城堡"""
import os
import sys
import importlib

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

ORDER = ["island", "castle", "interior", "village", "nature", "people", "env"]
MODS = {
    "island": "s1_island",
    "castle": "s2_castle",
    "interior": "s3_interior",
    "village": "s4_village",
    "nature": "s5_nature",
    "people": "s6_people",
    "env": "s7_env",
}


def _reset():
    """彻底清掉上一次的模块，避免旧类对象残留"""
    for name in ["lib", "libx"] + list(MODS.values()):
        sys.modules.pop(name, None)
    for name in [m for m in list(sys.modules) if m.startswith(("s1_", "s2_", "s3_", "s4_", "s5_", "s6_", "s7_"))]:
        sys.modules.pop(name, None)


def main(parts=None, purge=True):
    import bpy
    if purge:
        for ob in list(bpy.data.objects):
            bpy.data.objects.remove(ob, do_unlink=True)
        for c in list(bpy.data.collections):
            bpy.data.collections.remove(c)
    _reset()
    # 共享材质坐标空物体（让石缝在世界空间里对齐）
    if "_texspace" not in bpy.data.objects:
        e = bpy.data.objects.new("_texspace", None)
        bpy.context.scene.collection.objects.link(e)
        e.location = (0, 0, 0)
        e.empty_display_size = 0.3
    parts = parts or ORDER
    for p in parts:
        mod = importlib.import_module(MODS[p])
        mod.build()
        print("built", p)
    return True
