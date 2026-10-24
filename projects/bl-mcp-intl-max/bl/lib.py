"""小王子风·浮空城堡 — 建模工具库 (Blender 5.1)

提供：材质（水彩斑点）、几何体、布尔开洞、曲线管、装饰构件。
"""
import bpy
import bmesh
import math
import random
from mathutils import Vector, Matrix, Euler
from mathutils import noise as mnoise

random.seed(20261020)

# ---------------------------------------------------------------- 颜色
def srgb(h):
    h = h.lstrip('#')
    v = [int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return (f(v[0]), f(v[1]), f(v[2]), 1.0)


P = {
    'stone':      '#E7DAC0',
    'stone_l':    '#F3EADA',
    'stone_d':    '#CBB794',
    'stone_grey': '#D2CBBC',
    'stone_cool': '#C6C8C0',
    'roof':       '#C97F68',
    'roof_d':     '#A65F4C',
    'roof_blue':  '#8CA3B6',
    'roof_rose':  '#D2917F',
    'wood':       '#8C6547',
    'wood_d':     '#5C4130',
    'wood_l':     '#BC9166',
    'grass':      '#A9C083',
    'grass_d':    '#87A465',
    'grass_l':    '#C4D69C',
    'leaf':       '#7FA06A',
    'leaf_d':     '#5F8055',
    'leaf_l':     '#9DBE7C',
    'leaf_y':     '#C0C36B',
    'water':      '#9FCBD3',
    'gold':       '#DDB25E',
    'rose':       '#D2706B',
    'red':        '#BF5F57',
    'blue':       '#8FA8C8',
    'cream':      '#F5EEDD',
    'ink':        '#4A3A31',
    'skin':       '#F0CFB4',
    'hair':       '#E3BE6B',
    'white':      '#F7F3E8',
    'sky':        '#BFD9E8',
    'plum':       '#8E7A96',
    'teal':       '#7FA39B',
    'orange':     '#D98F5F',
    'straw':      '#D8C08A',
    'iron':       '#6E6A66',
}

_mats = {}


def mat(key, hexcol=None, rough=0.86, metal=0.0, emit=0.0, emit_col=None,
        alpha=1.0, mottle=0.10, scale=7.0, bump=0.0, transmission=0.0,
        name=None):
    """创建/复用材质。带水彩斑点与轻微凹凸。"""
    nm = name or ('M_' + key)
    if nm in _mats:
        return _mats[nm]
    col = srgb(hexcol or P.get(key, '#CCCCCC'))
    m = bpy.data.materials.new(nm)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    out.location = (600, 0)
    bsdf = nt.nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.location = (280, 0)
    nt.links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])

    def setin(sock, val):
        try:
            bsdf.inputs[sock].default_value = val
        except Exception:
            pass

    setin('Base Color', col)
    setin('Roughness', rough)
    setin('Metallic', metal)
    setin('Alpha', alpha)
    try:
        bsdf.inputs['Specular IOR Level'].default_value = 0.25
    except Exception:
        pass
    if transmission > 0:
        try:
            bsdf.inputs['Transmission Weight'].default_value = transmission
        except Exception:
            pass
    if emit > 0:
        setin('Emission Color', srgb(emit_col) if emit_col else col)
        setin('Emission Strength', emit)

    # 水彩斑驳：噪波 -> 色阶 -> 混色
    if mottle > 0:
        tc = nt.nodes.new('ShaderNodeTexCoord')
        tc.location = (-800, 100)
        nz = nt.nodes.new('ShaderNodeTexNoise')
        nz.location = (-600, 100)
        nz.inputs['Scale'].default_value = scale
        nz.inputs['Detail'].default_value = 3.0
        nz.inputs['Roughness'].default_value = 0.55
        nt.links.new(tc.outputs['Object'], nz.inputs['Vector'])
        ramp = nt.nodes.new('ShaderNodeValToRGB')
        ramp.location = (-400, 100)
        ramp.color_ramp.elements[0].position = 0.35
        ramp.color_ramp.elements[0].color = (1, 1, 1, 1)
        ramp.color_ramp.elements[1].position = 0.72
        ramp.color_ramp.elements[1].color = (0, 0, 0, 1)
        nt.links.new(nz.outputs['Fac'], ramp.inputs['Fac'])
        mix = nt.nodes.new('ShaderNodeMixRGB')
        mix.location = (-150, 60)
        mix.blend_type = 'MIX'
        mix.inputs['Fac'].default_value = 1.0
        dark = tuple(c * (1.0 - mottle) for c in col[:3]) + (1.0,)
        light = tuple(min(1.0, c * (1.0 + mottle * 0.7)) for c in col[:3]) + (1.0,)
        mix.inputs['Color1'].default_value = dark
        mix.inputs['Color2'].default_value = light
        nt.links.new(ramp.outputs['Color'], mix.inputs['Fac'])
        nt.links.new(mix.outputs['Color'], bsdf.inputs['Base Color'])

    # 纸纹凹凸
    if bump > 0:
        nz2 = nt.nodes.new('ShaderNodeTexNoise')
        nz2.location = (-600, -260)
        nz2.inputs['Scale'].default_value = 38.0
        nz2.inputs['Detail'].default_value = 6.0
        bp = nt.nodes.new('ShaderNodeBump')
        bp.location = (-250, -260)
        bp.inputs['Strength'].default_value = bump
        bp.inputs['Distance'].default_value = 0.02
        nt.links.new(nz2.outputs['Fac'], bp.inputs['Height'])
        nt.links.new(bp.outputs['Normal'], bsdf.inputs['Normal'])

    if alpha < 1.0:
        for attr, val in (('blend_method', 'BLEND'), ('surface_render_method', 'BLENDED')):
            try:
                setattr(m, attr, val)
            except Exception:
                pass
    _mats[nm] = m
    return m


# ---------------------------------------------------------------- 场景
def clear_scene():
    for ob in list(bpy.data.objects):
        bpy.data.objects.remove(ob, do_unlink=True)
    for me in list(bpy.data.meshes):
        bpy.data.meshes.remove(me)
    for mt in list(bpy.data.materials):
        bpy.data.materials.remove(mt)
    _mats.clear()
    for c in list(bpy.data.collections):
        bpy.data.collections.remove(c)


def coll(name, parent=None):
    c = bpy.data.collections.get(name)
    if c is None:
        c = bpy.data.collections.new(name)
        (parent or bpy.context.scene.collection).children.link(c)
    return c


# ---------------------------------------------------------------- 几何
def _finish(bm, name, m, coll_, loc, rot, scale, smooth_angle=35.0, flat=False):
    if smooth_angle:
        for f in bm.faces:
            f.smooth = not flat
        if not flat:
            for e in bm.edges:
                if len(e.link_faces) == 2:
                    try:
                        if e.calc_face_angle(0.0) > math.radians(smooth_angle):
                            e.smooth = False
                    except Exception:
                        pass
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    ob.location = loc
    ob.rotation_euler = rot
    ob.scale = scale
    if m:
        ob.data.materials.append(m)
    (coll_ or bpy.context.scene.collection).objects.link(ob)
    return ob


def add_bevel(ob, width, seg=2, angle=42.0):
    if width <= 0:
        return ob
    md = ob.modifiers.new('Bevel', 'BEVEL')
    md.width = width
    md.segments = seg
    md.limit_method = 'ANGLE'
    md.angle_limit = math.radians(angle)
    md.miter_outer = 'MITER_ARC'
    return ob


def box(name, size, loc=(0, 0, 0), rot=(0, 0, 0), m=None, bevel=0.03, seg=2,
        coll_=None, scale=(1, 1, 1), flat=True):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co.x *= size[0]
        v.co.y *= size[1]
        v.co.z *= size[2]
    ob = _finish(bm, name, m, coll_, loc, rot, scale, flat=flat)
    if bevel > 0:
        add_bevel(ob, min(bevel, min(size) * 0.4), seg)
    return ob


def cyl(name, r, depth, loc=(0, 0, 0), rot=(0, 0, 0), m=None, seg=24, bevel=0.02,
        coll_=None, r2=None, cap=True, scale=(1, 1, 1)):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=cap, cap_tris=False, segments=seg,
                          radius1=r, radius2=(r if r2 is None else r2), depth=depth)
    ob = _finish(bm, name, m, coll_, loc, rot, scale)
    if bevel > 0:
        add_bevel(ob, min(bevel, r * 0.35), 2)
    return ob


def cone(name, r, depth, loc=(0, 0, 0), rot=(0, 0, 0), m=None, seg=24,
         coll_=None, r2=0.0, bevel=0.0, scale=(1, 1, 1)):
    return cyl(name, r, depth, loc, rot, m, seg, bevel, coll_, r2=r2, scale=scale)


def sphere(name, r, loc=(0, 0, 0), rot=(0, 0, 0), m=None, seg=24, ring=14,
           coll_=None, scale=(1, 1, 1)):
    bm = bmesh.new()
    try:
        bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=ring, radius=r)
    except TypeError:
        bmesh.ops.create_uvsphere(bm, segments=seg, ring_count=ring, radius=r)
    return _finish(bm, name, m, coll_, loc, rot, scale, smooth_angle=60)


def torus(name, R, r, loc=(0, 0, 0), rot=(0, 0, 0), m=None, maj=24, mi=8,
          coll_=None, scale=(1, 1, 1)):
    bm = bmesh.new()
    rings = []
    for i in range(maj):
        a = 2 * math.pi * i / maj
        ring = []
        for j in range(mi):
            b = 2 * math.pi * j / mi
            x = (R + r * math.cos(b)) * math.cos(a)
            y = (R + r * math.cos(b)) * math.sin(a)
            z = r * math.sin(b)
            ring.append(bm.verts.new((x, y, z)))
        rings.append(ring)
    for i in range(maj):
        for j in range(mi):
            bm.faces.new((rings[i][j], rings[(i + 1) % maj][j],
                          rings[(i + 1) % maj][(j + 1) % mi], rings[i][(j + 1) % mi]))
    return _finish(bm, name, m, coll_, loc, rot, scale, smooth_angle=70)


def chunk(name, loc, size, seed=0, m=None, coll_=None, seg=18, ring=12,
          stretch=1.5, amp=0.28, smooth=45):
    """不规则岩块：噪声球体，下部拉长。"""
    bm = bmesh.new()
    try:
        bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=ring, radius=1.0)
    except TypeError:
        bmesh.ops.create_uvsphere(bm, segments=seg, ring_count=ring, radius=1.0)
    for v in bm.verts:
        n = mnoise.noise(Vector((v.co.x * 1.7 + seed * 3.3, v.co.y * 1.7, v.co.z * 1.7)))
        v.co *= 1.0 + n * amp
        if v.co.z < 0:
            v.co.z *= stretch
    return _finish(bm, name, m, coll_, loc, (0, 0, 0), size, smooth_angle=smooth)


def prism(name, profile, depth, loc=(0, 0, 0), rot=(0, 0, 0), m=None, coll_=None,
          bevel=0.0, axis='Y'):
    """把 XZ 平面上的多边形沿 Y 轴挤出。"""
    bm = bmesh.new()
    vs = [bm.verts.new((x, -depth * 0.5, z)) for (x, z) in profile]
    f = bm.faces.new(vs)
    ret = bmesh.ops.extrude_face_region(bm, geom=[f])
    nv = [e for e in ret['geom'] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=nv, vec=(0, depth, 0))
    bmesh.ops.delete(bm, geom=[f], context='FACES')
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    ob = _finish(bm, name, m, coll_, loc, rot, (1, 1, 1))
    if bevel > 0:
        add_bevel(ob, bevel, 2)
    return ob


def tube(name, pts, r, m=None, coll_=None, cyclic=False, res=3, kind='NURBS',
         taper=None, loc=(0, 0, 0)):
    cu = bpy.data.curves.new(name, 'CURVE')
    cu.dimensions = '3D'
    cu.resolution_u = 8
    cu.bevel_depth = r
    cu.bevel_resolution = res
    cu.fill_mode = 'FULL'
    sp = cu.splines.new(kind)
    sp.points.add(len(pts) - 1)
    for i, p in enumerate(pts):
        sp.points[i].co = (p[0], p[1], p[2], 1.0)
    sp.use_cyclic_u = cyclic
    if kind == 'NURBS':
        sp.order_u = 3
        sp.use_endpoint_u = True
    ob = bpy.data.objects.new(name, cu)
    ob.location = loc
    if m:
        ob.data.materials.append(m)
    (coll_ or bpy.context.scene.collection).objects.link(ob)
    return ob


def dup(src, name, loc=None, rot=None, scale=None, coll_=None):
    ob = src.copy()
    ob.name = name
    if loc is not None:
        ob.location = loc
    if rot is not None:
        ob.rotation_euler = rot
    if scale is not None:
        ob.scale = scale
    (coll_ or src.users_collection[0]).objects.link(ob)
    return ob


# ---------------------------------------------------------------- 布尔
def _bm_arch(bm, w, h, d, mtx, seg=14):
    r = w * 0.5
    spring = max(h - r, 0.02)
    prof = [(-r, 0.0), (-r, spring)]
    for i in range(1, seg + 1):
        a = math.pi - math.pi * i / seg
        prof.append((r * math.cos(a), spring + r * math.sin(a)))
    prof.append((r, 0.0))
    vs = [bm.verts.new(mtx @ Vector((x, -d * 0.5, z))) for (x, z) in prof]
    try:
        f = bm.faces.new(vs)
    except ValueError:
        return
    ret = bmesh.ops.extrude_face_region(bm, geom=[f])
    nv = [e for e in ret['geom'] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=nv, vec=mtx.to_3x3() @ Vector((0, d, 0)))
    bmesh.ops.delete(bm, geom=[f], context='FACES')


def _bm_box(bm, size, mtx):
    ret = bmesh.ops.create_cube(bm, size=1.0)
    for v in ret['verts']:
        v.co.x *= size[0]
        v.co.y *= size[1]
        v.co.z *= size[2]
        v.co = mtx @ v.co


def cutter(name, shapes, coll_=None):
    """shapes: [(kind,w,h,d,loc,rot)] kind in {'arch','box'}"""
    bm = bmesh.new()
    for kind, w, h, d, loc, rot in shapes:
        mtx = Matrix.Translation(Vector(loc)) @ Euler(rot, 'XYZ').to_matrix().to_4x4()
        if kind == 'arch':
            _bm_arch(bm, w, h, d, mtx)
        else:
            _bm_box(bm, (w, h, d), mtx @ Matrix.Translation((0, h * 0.5, 0)))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    (coll_ or bpy.context.scene.collection).objects.link(ob)
    ob.hide_viewport = True
    ob.hide_render = True
    return ob


def boolean_cut(target, cutters):
    """用 cutter 对象差集，并应用。"""
    if not isinstance(cutters, (list, tuple)):
        cutters = [cutters]
    for c in cutters:
        md = target.modifiers.new('cut', 'BOOLEAN')
        md.operation = 'DIFFERENCE'
        md.solver = 'EXACT'
        md.object = c
    dg = bpy.context.evaluated_depsgraph_get()
    ev = target.evaluated_get(dg)
    me = bpy.data.meshes.new_from_object(ev)
    old = target.data
    target.modifiers.clear()
    target.data = me
    try:
        bpy.data.meshes.remove(old)
    except Exception:
        pass
    for c in cutters:
        try:
            bpy.data.objects.remove(c, do_unlink=True)
        except Exception:
            pass
    return target


def jitter(ob, amt=0.015, seed=1):
    rnd = random.Random(seed)
    me = ob.data
    for v in me.vertices:
        v.co.x += rnd.uniform(-amt, amt)
        v.co.y += rnd.uniform(-amt, amt)
        v.co.z += rnd.uniform(-amt, amt)
    return ob


# ---------------------------------------------------------------- 装饰
def merlons(name, p1, p2, z, h=0.9, w=0.85, d=0.55, gap=0.95, m=None,
            coll_=None, bevel=0.02):
    p1 = Vector((p1[0], p1[1], 0))
    p2 = Vector((p2[0], p2[1], 0))
    L = (p2 - p1).length
    if L < 0.1:
        return []
    ang = math.atan2(p2.y - p1.y, p2.x - p1.x)
    step = w + gap
    n = max(1, int((L - w) / step) + 1)
    off = (L - (n * w + (n - 1) * gap)) * 0.5
    out = []
    for i in range(n):
        t = off + i * step + w * 0.5
        p = p1 + (p2 - p1).normalized() * t
        ob = box(f'{name}_{i}', (w, d, h), (p.x, p.y, z + h * 0.5),
                 (0, 0, ang), m, bevel, 2, coll_)
        out.append(ob)
    return out


def arch_window(name, loc, rot, w=1.1, h=2.2, m_frame=None, m_glass=None,
                coll_=None, frame=0.16, depth=0.3):
    """窗框 + 玻璃（贴在墙上，不挖洞时用）"""
    objs = []
    g = box(name + '_glass', (w, depth * 0.4, h), loc, rot, m_glass, 0.0, 1, coll_)
    objs.append(g)
    # 竖棂
    objs.append(box(name + '_bar', (0.07, depth * 0.55, h * 0.95),
                    (loc[0], loc[1], loc[2]), rot, m_frame, 0.0, 1, coll_))
    objs.append(box(name + '_bar2', (w * 0.95, depth * 0.55, 0.07),
                    (loc[0], loc[1], loc[2]), rot, m_frame, 0.0, 1, coll_))
    return objs


def banner(name, loc, rot, w=1.0, h=3.2, m=None, m_pole=None, coll_=None, tail=True):
    """垂挂旗帜：上宽下尖"""
    prof = [(-w / 2, 0), (w / 2, 0), (w / 2, -h * 0.78), (0, -h), (-w / 2, -h * 0.78)]
    ob = prism(name, prof, 0.06, loc, rot, m, coll_, bevel=0.01)
    if m_pole:
        cyl(name + '_pole', 0.05, w * 1.15, (loc[0], loc[1], loc[2]),
            (0, math.pi / 2, rot[2] + math.pi / 2), m_pole, 10, 0.0, coll_)
    return ob


def flag(name, loc, rot, w=1.6, h=1.0, m=None, coll_=None, wave=0.18):
    """飘动的旗（用曲线轮廓的三角旗）"""
    prof = [(0, 0), (w, h * 0.12), (w * 0.72, -h * 0.15), (w, -h * 0.42), (0, -h * 0.5)]
    ob = prism(name, prof, 0.04, loc, rot, m, coll_, bevel=0.005)
    return ob
