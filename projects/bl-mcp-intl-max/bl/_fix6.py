import bpy, sys, math
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
from lib import chunk, mat
import random
ROCK = mat('rock', '#C6A882', rough=0.95, mottle=0.16, scale=2.2, bump=0.12)
coll = bpy.data.collections['00_Island']
random.seed(5)
data = [(-6, -6, -30, 7.5, 1.9), (9, -2, -27, 6.0, 1.7), (-14, 4, -24, 5.5, 1.6),
        (4, 12, -31, 6.8, 1.8), (14, -12, -22, 4.8, 1.5), (-2, -18, -26, 6.2, 1.7)]
for i, (dx, dy, z, s, st) in enumerate(data):
    chunk(f'UnderRock{i}', (dx, 4 + dy, z), (s, s * 0.9, s * 1.15), seed=200 + i,
          m=ROCK, coll_=coll, stretch=st, amp=0.34)
bpy.ops.wm.save_as_mainfile(filepath=r"D:/OneDrive/Desktop/BL建模/国际max/浮空城堡_小王子.blend")
print('chunks added')
