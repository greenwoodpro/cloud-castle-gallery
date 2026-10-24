"""06 人物与生物：小王子、国王、点灯人、狐狸、蛇、卫兵、村民、猫"""
import math
import random
import bpy

from lib import (R, TAU, coll, box, cyl, sph, ico, cone, torus, gable, empty,
                 Batch, M, _mk)
from libx import rod, lathe
from s1_island import meadow_h
from s2_castle import WALL_Z, WALL_TOP, KEEP_C
from s3_interior import HALL_FZ, KEEP_FZ, CHAP_FZ

_rng = random.Random(3131)


def figure(c, name, x, y, z, h=2.2, cloth=None, hair=None, rot=0.0,
           pose="stand", skin=None, cape=None):
    """一个圆锥长袍的小人：站姿 / 坐姿"""
    cloth = cloth or M().cloth
    hair = hair or M().hair
    skin = skin or M().skin
    s = h / 2.2
    ca, sa = math.cos(rot), math.sin(rot)

    def P(dx, dy):
        return (x + dx * ca - dy * sa, y + dx * sa + dy * ca)

    if pose == "stand":
        cone(name + "_袍", (x, y, z + 0.62 * s), 0.34 * s, 0.19 * s, 1.24 * s, mat=cloth, target=c, seg=12)
        cyl(name + "_身", (x, y, z + 1.42 * s), 0.19 * s, 0.42 * s, mat=cloth, target=c, seg=10)
        for sx in (-1, 1):
            px, py = P(sx * 0.12 * s, -0.12 * s)
            box(name + f"_脚{sx}", (px, py, z + 0.05 * s), (0.13 * s, 0.24 * s, 0.1 * s),
                rot=(0, 0, rot), mat=M().dark, target=c, bevel=0.02)
    else:  # 坐
        cone(name + "_袍", (x, y, z + 0.42 * s), 0.36 * s, 0.22 * s, 0.84 * s, mat=cloth, target=c, seg=12)
        cyl(name + "_身", (x, y, z + 0.94 * s), 0.2 * s, 0.44 * s, mat=cloth, target=c, seg=10)
        px, py = P(0, -0.26 * s)
        box(name + "_腿", (px, py, z + 0.22 * s), (0.3 * s, 0.34 * s, 0.22 * s), rot=(0, 0, rot),
            mat=cloth, target=c, bevel=0.03)
    # 头
    hz = z + (1.78 if pose == "stand" else 1.3) * s
    sph(name + "_头", (x, y, hz), 0.16 * s, skin, c, seg=12, rings=9)
    sph(name + "_发", (x, y, hz + 0.04 * s), 0.165 * s, hair, c, seg=12, rings=9, scale=(1, 1, 0.8))
    # 手臂
    for sx in (-1, 1):
        px, py = P(sx * 0.2 * s, 0)
        ob = cyl(name + f"_臂{sx}", (px, py, z + (1.42 if pose == "stand" else 0.98) * s),
                 0.055 * s, 0.62 * s, mat=cloth, target=c, seg=8)
        ob.rotation_euler = (0, sx * 0.16, rot)
    if cape:
        px, py = P(0, 0.2 * s)
        box(name + "_披", (px, py, z + 1.2 * s), (0.44 * s, 0.1 * s, 1.0 * s), rot=(0, 0, rot),
            mat=cape, target=c, bevel=0.02)
    return hz


def prince(c):
    """小王子：站在门楼顶上，金色围巾被风吹起"""
    x, y, z = 0.0, 11.45, WALL_Z + 7.42
    hz = figure(c, "小王子", x, y, z, h=2.15, cloth=M().cream, hair=M().hair, rot=math.pi)
    # 围巾
    b = Batch("围巾", c)
    for i in range(6):
        t = i / 5
        b.box((0.16 + t * 0.55, y - 0.12 - t * 0.30, z + 1.62 - t * 0.14 + math.sin(t * 5) * 0.06),
              (0.2, 0.07, 0.1 - t * 0.02), rot=(0, 0.2, -0.5 - t * 0.5), mat=M().scarf)
    b.build()
    # 狐狸（脚边）
    fox(c, 0.95, y - 0.15, z, 0.9, rot=0.5)


def fox(c, x, y, z, s=1.0, rot=0.0):
    sph("狐狸_身", (x, y, z + 0.3 * s), 0.24 * s, M().fox, c, seg=10, rings=7, scale=(1.5, 0.8, 0.8))
    sph("狐狸_头", (x + 0.34 * s, y, z + 0.44 * s), 0.16 * s, M().fox, c, seg=10, rings=7)
    cone("狐狸_吻", (x + 0.47 * s, y, z + 0.4 * s), 0.07 * s, 0.0, 0.2 * s, rot=(0, math.pi / 2, 0),
         mat=M().fox, target=c, seg=6)
    for sy in (-1, 1):
        cone(f"狐狸_耳{sy}", (x + 0.34 * s, y + sy * 0.08 * s, z + 0.58 * s), 0.06 * s, 0.0, 0.18 * s,
             mat=M().fox, target=c, seg=5)
    ob = cyl("狐狸_尾", (x - 0.42 * s, y, z + 0.34 * s), 0.13 * s, 0.5 * s, mat=M().wool, target=c, seg=8, r2=0.05)
    ob.rotation_euler = (0, 0.5, rot)
    for sx in (-1, 1):
        for sy in (-1, 1):
            cyl(f"狐狸_腿{sx}{sy}", (x + sx * 0.16 * s, y + sy * 0.12 * s, z + 0.1 * s),
                0.035 * s, 0.2 * s, mat=M().fox, target=c, seg=5)


def king(c):
    """国王：坐在王座上，紫袍、王冠、权杖"""
    kx, ky = KEEP_C
    z = KEEP_FZ + 0.62 + 0.44
    figure(c, "国王", kx, ky - 2.92, z, h=2.35, cloth=M().robe, hair=M().cream, pose="sit", rot=0.0)
    # 王冠
    torus("王冠", (kx, ky - 2.92, z + 2.02), 0.16, 0.035, mat=M().gold, target=c, maj=12, mnr=5)
    for i in range(6):
        a = TAU * i / 6
        cone(f"冠尖{i}", (kx + math.cos(a) * 0.16, ky - 2.92 + math.sin(a) * 0.16, z + 2.12),
             0.035, 0.0, 0.14, mat=M().gold, target=c, seg=4)
    # 权杖
    rod("权杖", (kx + 0.42, ky - 2.85, z + 0.7), (kx + 0.5, ky - 2.85, z + 1.95), 0.028, M().gold, c, seg=6)
    sph("权杖头", (kx + 0.5, ky - 2.85, z + 2.0), 0.08, M().gold, c, seg=8, rings=6)
    # 白胡子
    sph("胡须", (kx, ky - 3.06, z + 1.55), 0.11, M().cream, c, seg=8, rings=6, scale=(1, 0.7, 1.5))


def lamplighter(c):
    """点灯人：提灯站在村口"""
    x, y = 4.2, 16.2
    z = meadow_h(x, y)
    figure(c, "点灯人", x, y, z, h=2.2, cloth=M().robe2, hair=M().dark, rot=-2.4)
    cyl("灯杆", (x - 0.34, y - 0.1, z + 1.5), 0.035, 2.6, mat=M().iron, target=c, seg=6)
    box("提灯", (x - 0.34, y - 0.1, z + 2.85), (0.26, 0.26, 0.34), mat=M().glassw, target=c, bevel=0.02)
    box("灯帽", (x - 0.34, y - 0.1, z + 3.06), (0.34, 0.34, 0.08), mat=M().iron, target=c, bevel=0.01)
    d = bpy.data.lights.new("提灯光", "POINT")
    d.energy = 40
    d.color = (1.0, 0.78, 0.48)
    d.shadow_soft_size = 0.3
    ob = bpy.data.objects.new("提灯光", d)
    c.objects.link(ob)
    ob.location = (x - 0.34, y - 0.1, z + 2.85)


def guards(c):
    for sx in (-1, 1):
        x, y = sx * 1.85, 10.6
        figure(c, f"卫兵{sx}", x, y, 9.1, h=2.3, cloth=M().robe2, hair=M().dark,
               cape=M().red, rot=0.0 if sx > 0 else math.pi)
        # 长矛
        rod(f"长矛{sx}", (x + sx * 0.34, y - 0.1, 9.1), (x + sx * 0.34, y - 0.1, 9.1 + 3.0),
            0.03, M().wood2, c, seg=6)
        cone(f"矛尖{sx}", (x + sx * 0.34, y - 0.1, 9.1 + 3.15), 0.07, 0.0, 0.3, mat=M().iron, target=c, seg=6)
        # 盾
        cyl(f"盾{sx}", (x + sx * 0.1, y - 0.26, 9.1 + 1.3), 0.34, 0.07,
            rot=(math.pi / 2, 0, 0), mat=M().rose, target=c, seg=14)


def hall_guards(c):
    """王座两侧的卫士"""
    for sx in (-1, 1):
        x, y = sx * 2.7, -2.9
        figure(c, f"王座卫{sx}", x, y, KEEP_FZ, h=2.3, cloth=M().robe2, hair=M().dark,
               cape=M().red, rot=0.0)
        rod(f"王座矛{sx}", (x + sx * 0.3, y - 0.1, KEEP_FZ), (x + sx * 0.3, y - 0.1, KEEP_FZ + 2.9),
            0.025, M().wood2, c, seg=6)


def villagers(c):
    spots = [("妇人", 1.0, 19.0, 0.0, M().rose), ("老人", -1.4, 18.2, 1.2, M().teal),
             ("孩子", 3.4, 18.6, -0.8, M().gold), ("男人", 5.6, 20.4, 2.2, M().robe2)]
    for name, x, y, rot, cloth in spots:
        z = meadow_h(x, y)
        hh = 1.45 if name == "孩子" else 2.15
        figure(c, name, x, y, z, h=hh, cloth=cloth, rot=rot)


def diners(c):
    """主厅里围坐的三个人"""
    tx, cy = -6.7, 4.95
    for i, (dx, mt) in enumerate(((-1.0, M().teal), (0.3, M().rose), (1.35, M().gold))):
        figure(c, f"食客{i}", tx + dx, cy + 0.62, HALL_FZ, h=2.0, cloth=mt, pose="sit", rot=math.pi)


def monk(c):
    x, y = 6.5, 3.2
    figure(c, "修士", x, y, CHAP_FZ, h=2.1, cloth=M().wood2, hair=M().dark, rot=0.4)


def blacksmith(c):
    x, y = -8.3, 1.1
    figure(c, "铁匠", x, y, WALL_Z + 0.1, h=2.15, cloth=M().iron, hair=M().dark, rot=1.4)


def cat(c):
    x, y, z = 5.9, 12.0, WALL_TOP + 0.02
    sph("猫身", (x, y, z + 0.16), 0.16, M().thatch, c, seg=8, rings=6, scale=(1.5, 0.85, 0.8))
    sph("猫头", (x + 0.2, y, z + 0.28), 0.11, M().thatch, c, seg=8, rings=6)
    for sy in (-1, 1):
        cone(f"猫耳{sy}", (x + 0.2, y + sy * 0.05, z + 0.38), 0.04, 0.0, 0.1, mat=M().thatch, target=c, seg=4)
    ob = cyl("猫尾", (x - 0.24, y, z + 0.2), 0.03, 0.36, mat=M().thatch, target=c, seg=5)
    ob.rotation_euler = (0.9, 0, 0)


def snake(c):
    x, y = 12.4, 9.6
    z = meadow_h(x, y)
    for i in range(4):
        torus(f"蛇身{i}", (x + i * 0.1, y, z + 0.06 + i * 0.05), 0.3 - i * 0.05, 0.045,
              mat=M().snake, target=c, maj=14, mnr=5)
    sph("蛇头", (x + 0.42, y, z + 0.26), 0.09, M().snake, c, seg=8, rings=6, scale=(1.4, 0.9, 0.8))


def build():
    c = coll("06 人物")
    prince(c)
    king(c)
    lamplighter(c)
    guards(c)
    hall_guards(c)
    villagers(c)
    diners(c)
    monk(c)
    blacksmith(c)
    cat(c)
    snake(c)
    return c
