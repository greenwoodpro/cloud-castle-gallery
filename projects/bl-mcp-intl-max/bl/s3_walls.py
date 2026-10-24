import sys, os, math, importlib
sys.path.insert(0, r"D:/OneDrive/Desktop/BL建模/国际max/bl")
import lib
importlib.reload(lib)
from lib import *
from lib import _finish
from mathutils import Vector

C = {n: bpy.data.collections[n] for n in
     ['00_Island', '01_Terrain', '02_Walls', '03_Keep', '04_Keep_Interior',
      '05_Chapel', '06_Courtyard', '07_Nature', '08_Clouds', '09_Characters',
      '10_Lights', '11_Cameras', '99_Hide_For_Interior_View']}
for cn in ['02_Walls']:
    for o in list(C[cn].objects):
        bpy.data.objects.remove(o, do_unlink=True)

# ---------------------------------------------------------------- 材质
def stone_mat(name, base='#E4D5BA', dark='#D2BF9E', mortar='#BBA684'):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    bsdf = nt.nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Roughness'].default_value = 0.9
    nt.links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    geo = nt.nodes.new('ShaderNodeNewGeometry')
    # 3D 不规则砌块
    vor = nt.nodes.new('ShaderNodeTexVoronoi')
    vor.feature = 'DISTANCE_TO_EDGE'
    vor.inputs['Scale'].default_value = 2.3
    vor.inputs['Randomness'].default_value = 0.75
    nt.links.new(geo.outputs['Position'], vor.inputs['Vector'])
    edge = nt.nodes.new('ShaderNodeValToRGB')
    edge.color_ramp.elements[0].position = 0.005
    edge.color_ramp.elements[0].color = (0, 0, 0, 1)
    edge.color_ramp.elements[1].position = 0.075
    edge.color_ramp.elements[1].color = (1, 1, 1, 1)
    nt.links.new(vor.outputs['Distance'], edge.inputs['Fac'])
    # 石块颜色变化
    cell = nt.nodes.new('ShaderNodeTexVoronoi')
    cell.inputs['Scale'].default_value = 2.3
    cell.inputs['Randomness'].default_value = 0.75
    nt.links.new(geo.outputs['Position'], cell.inputs['Vector'])
    ccol = nt.nodes.new('ShaderNodeValToRGB')
    ccol.color_ramp.elements[0].color = srgb(dark)
    ccol.color_ramp.elements[1].color = srgb(base)
    nt.links.new(cell.outputs['Color'], ccol.inputs['Fac'])
    # 砂浆缝
    mix = nt.nodes.new('ShaderNodeMixRGB')
    mix.blend_type = 'MIX'
    nt.links.new(edge.outputs['Color'], mix.inputs['Fac'])
    mix.inputs['Color1'].default_value = srgb(mortar)
    nt.links.new(ccol.outputs['Color'], mix.inputs['Color2'])
    # 大范围斑驳
    nz = nt.nodes.new('ShaderNodeTexNoise')
    nz.inputs['Scale'].default_value = 0.35
    nz.inputs['Detail'].default_value = 4.0
    nt.links.new(geo.outputs['Position'], nz.inputs['Vector'])
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].color = (0.82, 0.82, 0.82, 1)
    ramp.color_ramp.elements[1].color = (1.0, 1.0, 1.0, 1)
    nt.links.new(nz.outputs['Fac'], ramp.inputs['Fac'])
    mix2 = nt.nodes.new('ShaderNodeMixRGB')
    mix2.blend_type = 'MULTIPLY'
    mix2.inputs['Fac'].default_value = 0.5
    nt.links.new(mix.outputs['Color'], mix2.inputs['Color1'])
    nt.links.new(ramp.outputs['Color'], mix2.inputs['Color2'])
    nt.links.new(mix2.outputs['Color'], bsdf.inputs['Base Color'])
    bp = nt.nodes.new('ShaderNodeBump')
    bp.inputs['Strength'].default_value = 0.35
    bp.inputs['Distance'].default_value = 0.05
    nt.links.new(edge.outputs['Color'], bp.inputs['Height'])
    nt.links.new(bp.outputs['Normal'], bsdf.inputs['Normal'])
    return m


STONE = stone_mat('M_stone', '#E4D5BA', '#D3C0A0', '#B9A382')
STONE_L = mat('stone_l', '#F3EADA', rough=0.88, bump=0.05)
STONE_D = mat('stone_d', '#CBB794', rough=0.9, bump=0.05)
ROOF = mat('roof', '#C4715B', rough=0.8, mottle=0.12, scale=4)
ROOF_B = mat('roof_blue', '#8299AE', rough=0.8, mottle=0.12, scale=4)
ROOF_R = mat('roof_rose', '#C98A78', rough=0.8, mottle=0.12, scale=4)
WOOD = mat('wood', '#8C6547', rough=0.85, bump=0.06)
WOOD_D = mat('wood_d', '#5C4130', rough=0.85, bump=0.06)
IRON = mat('iron', '#6E6A66', rough=0.55, metal=0.6)
GOLD = mat('gold', '#DDB25E', rough=0.35, metal=0.7)


def ring_wall(name, r_out, r_in, h, loc, m, coll_, seg=40):
    bm = bmesh.new()
    top_o, top_i, bot_o, bot_i = [], [], [], []
    for i in range(seg):
        a = 2 * math.pi * i / seg
        c, s = math.cos(a), math.sin(a)
        top_o.append(bm.verts.new((c * r_out, s * r_out, h * 0.5)))
        top_i.append(bm.verts.new((c * r_in, s * r_in, h * 0.5)))
        bot_o.append(bm.verts.new((c * r_out, s * r_out, -h * 0.5)))
        bot_i.append(bm.verts.new((c * r_in, s * r_in, -h * 0.5)))
    for i in range(seg):
        j = (i + 1) % seg
        bm.faces.new((top_o[i], top_o[j], top_i[j], top_i[i]))
        bm.faces.new((bot_o[i], bot_i[i], bot_i[j], bot_o[j]))
        bm.faces.new((top_o[i], bot_o[i], bot_o[j], top_o[j]))
        bm.faces.new((top_i[i], top_i[j], bot_i[j], bot_i[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _finish(bm, name, m, coll_, loc, (0, 0, 0), (1, 1, 1))


# ---------------------------------------------------------------- 城墙
H_WALL = 7.2
TH = 1.55
WALK = 6.15

POLY = [(-5, -11.5), (-12, -7.5), (-13.5, 2), (-10, 10), (-3, 13.5),
        (6, 13), (12.5, 7), (13, -2), (9, -9), (5, -11.5)]
TOWERS = {1: (12.6, 2.5), 2: (9.2, 1.85), 3: (13.2, 2.5), 4: (9.6, 1.85),
          5: (12.6, 2.5), 6: (9.2, 1.85), 7: (13.4, 2.5), 8: (9.6, 1.85)}
ROOFS = {1: ROOF, 2: ROOF_B, 3: ROOF, 4: ROOF_R, 5: ROOF, 6: ROOF_B, 7: ROOF, 8: ROOF_R}


def wall_seg(idx, p1, p2):
    p1, p2 = Vector((p1[0], p1[1], 0)), Vector((p2[0], p2[1], 0))
    d = p2 - p1
    L = d.length
    ang = math.atan2(d.y, d.x)
    mid = (p1 + p2) * 0.5
    nrm = Vector((d.y, -d.x, 0.0)).normalized()
    box(f'Wall{idx}', (L + 0.3, TH, H_WALL), (mid.x, mid.y, H_WALL * 0.5),
        (0, 0, ang), STONE, 0.06, 2, C['02_Walls'])
    box(f'Wall{idx}_walk', (L, TH * 0.78, 0.14), (mid.x, mid.y, WALK),
        (0, 0, ang), STONE_L, 0.02, 1, C['02_Walls'])
    outer = mid + nrm * (TH * 0.5 - 0.16)
    inner = mid - nrm * (TH * 0.5 - 0.16)
    box(f'Wall{idx}_par', (L, 0.34, 1.12), (outer.x, outer.y, WALK + 0.56),
        (0, 0, ang), STONE, 0.03, 1, C['02_Walls'])
    box(f'Wall{idx}_inpar', (L, 0.30, 0.52), (inner.x, inner.y, WALK + 0.26),
        (0, 0, ang), STONE, 0.03, 1, C['02_Walls'])
    merlons(f'Wall{idx}_mer', (outer.x - nrm.x * 0.0, outer.y),
            (outer.x + d.x, outer.y + d.y), WALK + 1.12, h=0.72, w=0.62, d=0.40,
            gap=0.72, m=STONE, coll_=C['02_Walls'])
    # 挑檐石托
    n = max(2, int(L / 1.15))
    for k in range(n):
        t = (k + 0.5) / n
        p = p1 + d * t + nrm * (TH * 0.5 + 0.06)
        box(f'Wall{idx}_corb{k}', (0.22, 0.34, 0.30), (p.x, p.y, WALK - 0.18),
            (0, 0, ang), STONE_D, 0.02, 1, C['02_Walls'])


for i in range(len(POLY) - 1):
    wall_seg(i, POLY[i], POLY[i + 1])


def tower(name, x, y, r, h, roof_h, rm, windows=4, door=False):
    cyl(name + '_plinth', r * 1.14, 0.9, (x, y, 0.45), m=STONE_D, seg=36,
        coll_=C['02_Walls'], bevel=0.04)
    cyl(name + '_shaft', r, h, (x, y, h * 0.5), m=STONE, seg=36,
        coll_=C['02_Walls'], r2=r * 0.955, bevel=0.03)
    cyl(name + '_belt', r * 1.03, 0.28, (x, y, h * 0.58), m=STONE_L, seg=36,
        coll_=C['02_Walls'], bevel=0.03)
    cyl(name + '_corbel', r * 1.16, 0.55, (x, y, h - 0.25), m=STONE_D, seg=36,
        coll_=C['02_Walls'], bevel=0.04)
    ring_wall(name + '_par', r * 1.18, r * 0.86, 1.15, (x, y, h + 0.45), STONE,
              C['02_Walls'], seg=40)
    # 城齿
    cnt = max(8, int(2 * math.pi * r * 1.14 / 1.05))
    for i in range(cnt):
        a = 2 * math.pi * i / cnt
        box(f'{name}_m{i}', (0.55, 0.36, 0.62),
            (x + math.cos(a) * r * 1.14, y + math.sin(a) * r * 1.14, h + 1.33),
            (0, 0, a), STONE, 0.02, 1, C['02_Walls'])
    # 屋顶
    cone(name + '_roof', r * 1.24, roof_h, (x, y, h + 1.0 + roof_h * 0.5),
         m=rm, seg=36, coll_=C['02_Walls'], bevel=0.02)
    sphere(name + '_finial', 0.17, (x, y, h + 1.0 + roof_h + 0.1), m=GOLD,
           coll_=C['02_Walls'], seg=12, ring=8)
    cyl(name + '_pole', 0.045, 1.5, (x, y, h + 1.0 + roof_h + 0.75), m=WOOD_D,
        seg=8, coll_=C['02_Walls'], bevel=0.0)
    # 窗
    for i in range(windows):
        a = 2 * math.pi * i / windows + 0.4
        zz = h * (0.35 + 0.16 * (i % 3))
        bx = x + math.cos(a) * (r * 0.985)
        by = y + math.sin(a) * (r * 0.985)
        box(f'{name}_w{i}', (0.26, 0.34, 0.95), (bx, by, zz), (0, 0, a),
            mat('window', '#6E6252', rough=0.6, mottle=0.05), 0.02, 1, C['02_Walls'])
        box(f'{name}_ws{i}', (0.34, 0.46, 0.14), (bx, by, zz + 0.55), (0, 0, a),
            STONE_L, 0.02, 1, C['02_Walls'])
        box(f'{name}_wt{i}', (0.30, 0.44, 0.12), (bx, by, zz - 0.52), (0, 0, a),
            STONE_L, 0.02, 1, C['02_Walls'])
    if door:
        box(name + '_door', (0.9, 0.4, 1.9), (x, y - r * 0.97, 0.95), (0, 0, 0),
            WOOD_D, 0.03, 1, C['02_Walls'])


for idx, (h, r) in TOWERS.items():
    p = POLY[idx]
    tower(f'Tower{idx}', p[0], p[1], r, h, 3.4 + (h % 3) * 0.3, ROOFS[idx],
          windows=3, door=(idx in (2, 6)))

# ---------------------------------------------------------------- 门楼
GX, GY = 0.0, -11.5
box('Gate_block', (10.6, 2.6, 8.6), (GX, GY, 4.3), m=STONE, bevel=0.06,
    coll_=C['02_Walls'])
cut = cutter('GateCut', [('arch', 3.6, 5.2, 3.4, (GX, GY, 0.0), (0, 0, 0))],
             C['02_Walls'])
boolean_cut(bpy.data.objects['Gate_block'], cut)
# 门洞地面
box('Gate_floor', (3.6, 3.2, 0.16), (GX, GY, 0.08), m=STONE_L, bevel=0.02,
    coll_=C['02_Walls'])
# 拱券装饰
for i, dz in enumerate([0.0, 0.34]):
    arch_pts = []
    for k in range(13):
        a = math.pi * k / 12
        arch_pts.append((math.cos(a) * (1.9 + dz), 0, 5.2 - 1.9 + math.sin(a) * (1.9 + dz)))
    tube(f'Gate_arch{i}', [(p[0], GY - 1.31, p[2]) for p in arch_pts], 0.10,
         STONE_L, C['02_Walls'], res=2)
# 闸门
for i in range(7):
    box(f'Portcullis{i}', (0.10, 0.10, 4.3), (GX - 1.5 + i * 0.5, GY - 0.1, 3.0),
        m=IRON, bevel=0.01, coll_=C['02_Walls'])
for i in range(5):
    box(f'PortBar{i}', (3.4, 0.08, 0.08), (GX, GY - 0.1, 1.1 + i * 0.95),
        m=IRON, bevel=0.01, coll_=C['02_Walls'])
# 木门（向内开）
for s in (-1, 1):
    box(f'GateDoor{s}', (0.14, 1.55, 4.3), (GX + s * 1.75, GY + 1.35, 2.15),
        (0, 0, s * 0.42), WOOD, 0.03, 1, C['02_Walls'])
    box(f'GateDoorB{s}', (0.10, 0.16, 4.0), (GX + s * 1.9, GY + 0.62, 2.1),
        (0, 0, s * 0.42), IRON, 0.01, 1, C['02_Walls'])
# 门楼双塔
tower('GateTowerW', GX - 4.3, GY + 0.3, 2.15, 13.2, 4.0, ROOF, windows=4)
tower('GateTowerE', GX + 4.3, GY + 0.3, 2.15, 13.2, 4.0, ROOF_B, windows=4)
# 上部突廊
for i in range(11):
    box(f'Mach{i}', (0.26, 0.5, 0.55), (GX - 4.2 + i * 0.84, GY - 1.35, 6.7),
        m=STONE_D, bevel=0.02, seg=1, coll_=C['02_Walls'])
box('Mach_wall', (10.0, 0.42, 1.05), (GX, GY - 1.55, 7.5), m=STONE, bevel=0.03,
    coll_=C['02_Walls'])
merlons('Mach_mer', (GX - 4.8, GY - 1.72), (GX + 4.8, GY - 1.72), 8.0, h=0.6,
        w=0.6, d=0.34, gap=0.7, m=STONE, coll_=C['02_Walls'])
# 门楼上的小窗
box('Gate_win', (1.1, 0.4, 1.5), (GX, GY - 1.5, 6.0),
    m=mat('dark', '#3B3028', rough=0.9, mottle=0.02), bevel=0.02, seg=1,
    coll_=C['02_Walls'])
# 纹章
sphere('Gate_crest', 0.62, (GX, GY - 1.36, 4.55), m=GOLD, seg=20, ring=12,
       coll_=C['02_Walls'], scale=(1, 0.25, 1.1))

# ---------------------------------------------------------------- 桥
BY0, BY1 = -17.2, -27.4
BL = BY1 - BY0
box('Bridge_deck', (3.5, abs(BL), 4.5), (0, (BY0 + BY1) * 0.5, -1.9), m=STONE,
    bevel=0.04, coll_=C['02_Walls'])
box('Bridge_road', (2.9, abs(BL), 0.08), (0, (BY0 + BY1) * 0.5, 0.36), m=STONE_L,
    bevel=0.02, coll_=C['02_Walls'])
# 拱洞
for i, cy in enumerate([-20.2, -24.6]):
    hole = cyl(f'BridgeHole{i}', 1.32, 4.4, (0, cy, -2.15), (0, math.pi / 2, 0),
               m=STONE, seg=28, coll_=C['02_Walls'], bevel=0.0)
    boolean_cut(bpy.data.objects['Bridge_deck'], hole)
# 桥栏
for s in (-1, 1):
    box(f'Bridge_par{s}', (0.36, abs(BL), 1.05), (s * 1.62, (BY0 + BY1) * 0.5, 0.85),
        m=STONE, bevel=0.03, coll_=C['02_Walls'])
    merlons(f'Bridge_mer{s}', (s * 1.62, BY0 + 0.3), (s * 1.62, BY1 - 0.3), 1.37,
            h=0.55, w=0.5, d=0.34, gap=0.75, m=STONE, coll_=C['02_Walls'])
# 桥墩基座
for cy in [-19.1, -22.4, -25.7]:
    box(f'Pier_{cy}', (3.1, 0.9, 1.2), (0, cy, -4.6), m=STONE_D, bevel=0.04,
        coll_=C['02_Walls'])

# ---------------------------------------------------------------- 崖外平台（浮岩）
plat = chunk('DockRock', (0, -30.5, -9.2), (7.4, 6.6, 9.0), seed=7,
             m=mat('rock', '#C6A882', rough=0.95, mottle=0.16, scale=2.2, bump=0.12),
             coll_=C['02_Walls'], stretch=1.5, amp=0.26)
cyl('Dock_top', 4.3, 0.7, (0, -30.5, -0.1), m=STONE, seg=40, coll_=C['02_Walls'],
    bevel=0.05)
cyl('Dock_floor', 4.0, 0.1, (0, -30.5, 0.28), m=STONE_L, seg=40,
    coll_=C['02_Walls'], bevel=0.02)
ring_wall('Dock_par', 4.25, 3.85, 0.85, (0, -30.5, 0.7), STONE, C['02_Walls'], seg=40)
# 系泊柱 + 灯
cyl('Moor_post', 0.22, 2.6, (0, -33.6, 1.7), m=WOOD_D, seg=12, coll_=C['02_Walls'])
sphere('Moor_ball', 0.3, (0, -33.6, 3.05), m=IRON, coll_=C['02_Walls'], seg=14, ring=10)
for i in range(3):
    a = math.radians(200 + i * 55)
    box(f'DockCrate{i}', (0.9, 0.9, 0.8), (math.cos(a) * 2.6, -30.5 + math.sin(a) * 2.6, 0.75),
        (0, 0, a), WOOD, 0.03, 1, C['02_Walls'])

print('WALLS DONE', len(C['02_Walls'].objects))
