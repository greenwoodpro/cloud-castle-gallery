"""重建整座浮空城堡（在已打开的 Blender 中执行）
用法： python bl.py run rebuild.py
"""
import sys
SRC = r"D:/OneDrive/Desktop/BL建模/国际mcp/src"
if SRC not in sys.path:
    sys.path.insert(0, SRC)
for _m in list(sys.modules):
    if _m in ("build", "lib", "libx") or _m[:3] in ("s1_", "s2_", "s3_", "s4_", "s5_", "s6_", "s7_"):
        sys.modules.pop(_m, None)
import build, bpy
build.main()
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际mcp/浮空城堡_小王子.blend")
print("rebuilt")
