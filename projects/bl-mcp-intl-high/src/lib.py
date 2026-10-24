"""小王子风格浮空城堡 —— 通用构件库（bmesh 直建，无 ops 开销）"""
import math, random, bpy, bmesh
from mathutils import Vector, Euler, Matrix

R = random.Random(20261018)
TAU = math.pi * 2

# ---------------------------------------------------------------- collections
def coll(name, parent=None):
    c = bpy.data.collections.get(name)
    if c is None:
        c = bpy.data.collections.new(name)
        if parent is not None:
            parent.children.link(c)
        else:
            bpy.context.scene.collection.children.link(c)
    return c

def _move(ob, target):
    for c in list(ob.users_collection):
        c.objects.unlink(ob)
    target.objects.link(ob)

def purge_coll(name):
    c = bpy.data.collections.get(name)
    if not c:
        return
    for ob in list(c.all_objects):
        bpy.data.objects.remove(ob, do_unlink=True)
    for sub in list(c.children_recursive)[::-1]:
        if sub.name in bpy.data.collections:
            bpy.data.collections.remove(sub)
    if c.name in bpy.data.collections:
        bpy.data.collections.remove(c)

def purge_all():
    for ob in list(bpy.data.objects):
        bpy.data.objects.remove(ob, do_unlink=True)
    for c in list(bpy.data.collections):
        bpy.data.collections.remove(c)

def purge_default():
    purge_all()

# ------------------------------------------------------------------ materials
def _srgb(h):
    h = h.lstrip("#")
    v = [int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4)]
    def f(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return tuple(f(c) for c in v) + (1.0,)

def _mul(c, k):
    return (c[0] * k, c[1] * k, c[2] * k, 1.0)

_MATS = {}

def wc(name, hexcol, rough=0.85, noise=0.055, scale=7.0, emit=0.0, alpha=1.0,
       metallic=0.0, bump=0.0, brick=None):
    if name in _MATS and _MATS[name].name in bpy.data.materials:
        return _MATS[name]
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial"); out.location = (560, 0)
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled"); bsdf.location = (260, 0)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metallic
    if "Alpha" in bsdf.inputs:
        bsdf.inputs["Alpha"].default_value = alpha
    base = _srgb(hexcol)
    bsdf.inputs["Base Color"].default_value = base
    if emit > 0:
        bsdf.inputs["Emission Color"].default_value = base
        bsdf.inputs["Emission Strength"].default_value = emit
    tc = nt.nodes.new("ShaderNodeTexCoord"); tc.location = (-780, 0)
    # 用共享空物体做世界坐标，保证所有构件上的石缝能对齐
    tex_obj = bpy.data.objects.get("_texspace")
    if tex_obj is not None:
        try:
            tc.object = tex_obj
        except Exception:
            pass
    src = tc.outputs["Object"] if tex_obj is not None else tc.outputs["Generated"]
    if brick:
        # 水平石缝：沿 Z 的 Wave，再用色阶压成细线
        w = nt.nodes.new("ShaderNodeTexWave"); w.location = (-520, 160)
        w.wave_type = "BANDS"
        w.bands_direction = "Z"
        w.wave_profile = "SAW"
        w.inputs["Scale"].default_value = 1.0 / max(0.05, brick.get("h", 0.3))
        w.inputs["Distortion"].default_value = 1.2
        w.inputs["Detail"].default_value = 1.0
        nt.links.new(src, w.inputs["Vector"])
        cr = nt.nodes.new("ShaderNodeValToRGB"); cr.location = (-330, 170)
        cr.color_ramp.elements[0].position = 0.0
        cr.color_ramp.elements[0].color = (0, 0, 0, 1)
        cr.color_ramp.elements[1].position = 0.06
        cr.color_ramp.elements[1].color = (1, 1, 1, 1)
        nt.links.new(w.outputs["Fac"], cr.inputs["Fac"])
        mixs = nt.nodes.new("ShaderNodeMixRGB"); mixs.location = (-140, 200)
        mixs.blend_type = "MIX"
        mixs.inputs[1].default_value = _mul(base, brick.get("mortar", 0.86))
        mixs.inputs[2].default_value = base
        nt.links.new(cr.outputs["Color"], mixs.inputs["Fac"])
        src = mixs.outputs["Color"]
    if noise > 0:
        n = nt.nodes.new("ShaderNodeTexNoise"); n.location = (-540, -160)
        n.inputs["Scale"].default_value = scale
        n.inputs["Detail"].default_value = 3.0
        n.inputs["Roughness"].default_value = 0.55
        nt.links.new(tc.outputs["Object"] if tex_obj is not None else tc.outputs["Generated"], n.inputs["Vector"])
        ramp = nt.nodes.new("ShaderNodeValToRGB"); ramp.location = (-330, -120)
        ramp.color_ramp.elements[0].position = 0.36
        ramp.color_ramp.elements[0].color = _mul(base, 1.0 - noise * 2.4)
        ramp.color_ramp.elements[1].position = 0.66
        ramp.color_ramp.elements[1].color = _mul(base, 1.0 + noise * 1.9)
        nt.links.new(n.outputs["Fac"], ramp.inputs["Fac"])
        mix = nt.nodes.new("ShaderNodeMixRGB"); mix.location = (-100, 40)
        mix.blend_type = "MULTIPLY"
        mix.inputs["Fac"].default_value = 0.5 if brick else 1.0
        if brick:
            nt.links.new(src, mix.inputs[1])
            nt.links.new(ramp.outputs["Color"], mix.inputs[2])
        else:
            nt.links.new(ramp.outputs["Color"], mix.inputs[1])
            mix.inputs[2].default_value = (1, 1, 1, 1)
        nt.links.new(mix.outputs["Color"], bsdf.inputs["Base Color"])
        if bump > 0:
            bm_ = nt.nodes.new("ShaderNodeBump"); bm_.location = (40, -300)
            bm_.inputs["Strength"].default_value = bump
            bm_.inputs["Distance"].default_value = 0.06
            nt.links.new(n.outputs["Fac"], bm_.inputs["Height"])
            nt.links.new(bm_.outputs["Normal"], bsdf.inputs["Normal"])
    elif brick:
        nt.links.new(src, bsdf.inputs["Base Color"])
    nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    m.diffuse_color = base
    _MATS[name] = m
    return m

# ------------------------------------------------------------------- palette
class _Pal(dict):
    __getattr__ = dict.__getitem__

_P = {}
def M():
    if _P:
        return _Pal(_P)
    _P.update(dict(
        paper  = wc("城墙奶白", "#F2E6CE", 0.88, 0.035, 5.0,
                    brick=dict(scale=3.2, w=0.55, h=0.26, gap=0.008, k2=0.955, mortar=0.86)),
        paper2 = wc("城墙暖白", "#E9DABC", 0.9, 0.045, 6.0,
                    brick=dict(scale=3.6, w=0.6, h=0.28, gap=0.008, k2=0.95, mortar=0.85)),
        stone3 = wc("石阴", "#D6C4A4", 0.92, 0.05, 7.0),
        rock   = wc("岩体", "#C3B098", 0.95, 0.07, 6.5),
        rock2  = wc("岩体深", "#A9947C", 0.96, 0.07, 2.5),
        dirt   = wc("泥土", "#B99A79", 0.95, 0.06, 4.0),
        grass  = wc("草甸", "#B4CB9C", 0.93, 0.075, 22.0),
        grass2 = wc("草地深", "#9CBB8C", 0.93, 0.07, 26.0),
        moss   = wc("苔绿", "#7C9C74", 0.94, 0.06, 16.0),
        water  = wc("水面", "#8FB6C6", 0.22, 0.03, 3.0),
        water2 = wc("水浅", "#A9CBD6", 0.2, 0.03, 2.0),
        roofb  = wc("青瓦", "#9AB0CC", 0.86, 0.04, 7.0),
        roofb2 = wc("青瓦深", "#88A0BF", 0.86, 0.04, 8.0),
        rose   = wc("玫红瓦", "#DFA2A1", 0.87, 0.045, 7.0),
        gold   = wc("暖金", "#E6C079", 0.55, 0.04, 4.0, metallic=0.25),
        wood   = wc("木色", "#C9A57B", 0.9, 0.05, 9.0),
        wood2  = wc("木深", "#A07E5C", 0.9, 0.05, 9.0),
        dark   = wc("窗洞", "#57506B", 0.9, 0.03, 8.0),
        glow   = wc("灯火", "#FFD79B", 0.6, 0.0, 1.0, emit=3.2),
        cream  = wc("奶白", "#FAF1DE", 0.9, 0.04, 5.0),
        cloud  = wc("云", "#FFFCF6", 1.0, 0.015, 2.0, emit=0.45),
        lav    = wc("雾紫", "#A79EBB", 0.95, 0.05, 4.0),
        red    = wc("旗帜红", "#C87C71", 0.88, 0.05, 5.0),
        teal   = wc("青绿", "#7FA8A0", 0.88, 0.05, 5.0),
        white  = wc("白", "#FFFFFF", 0.9, 0.02, 3.0),
        skin   = wc("肤色", "#F0C9A8", 0.85, 0.03, 6.0),
        cloth  = wc("衣裳", "#E8DCC2", 0.93, 0.04, 5.0),
        hair   = wc("发色", "#C8A257", 0.85, 0.04, 6.0),
        # ---- 扩展：更冷一点的石、更暖一点的木，以及人物与小物
        stone  = wc("城堡石", "#E7DAC2", 0.9, 0.04, 5.5,
                    brick=dict(scale=3.0, w=0.62, h=0.3, gap=0.01, k2=0.96, mortar=0.88)),
        stone2 = wc("城堡石阴", "#D3C3A6", 0.92, 0.05, 6.5,
                    brick=dict(scale=3.4, w=0.7, h=0.32, gap=0.01, k2=0.95, mortar=0.87)),
        stone3b= wc("基石", "#C6B79C", 0.94, 0.05, 4.0),
        cliff  = wc("崖壁", "#C2B49C", 0.96, 0.08, 3.2),
        cliff2 = wc("崖壁深", "#9C8B74", 0.97, 0.09, 2.0),
        plaster= wc("灰泥墙", "#F6EBD6", 0.94, 0.05, 9.0),
        thatch = wc("茅草", "#D9BE8C", 0.95, 0.10, 18.0),
        tile   = wc("赤陶瓦", "#D8A184", 0.9, 0.05, 10.0),
        roofg  = wc("苔绿瓦", "#93AE9C", 0.88, 0.05, 8.0),
        roofp  = wc("藕粉瓦", "#DDA9AC", 0.88, 0.05, 8.0),
        plank  = wc("地板木", "#C09A6E", 0.9, 0.05, 14.0),
        bark   = wc("树皮", "#A5825F", 0.95, 0.06, 12.0),
        leaf1  = wc("叶浅", "#A9C39A", 0.93, 0.07, 14.0),
        leaf2  = wc("叶中", "#93B189", 0.93, 0.07, 16.0),
        leaf3  = wc("叶深", "#7C9C7C", 0.94, 0.07, 16.0),
        leaf4  = wc("叶暖", "#B7C892", 0.93, 0.07, 14.0),
        sand   = wc("沙土", "#E0C9A0", 0.96, 0.06, 6.0),
        waterd = wc("深水", "#6F97A8", 0.18, 0.03, 2.4),
        foam   = wc("水雾", "#F4FAFA", 1.0, 0.02, 3.0, emit=0.25, alpha=0.45),
        glassw = wc("暖窗", "#FFC98C", 0.4, 0.0, 1.0, emit=2.6),
        glassb = wc("冷窗", "#A9C8DA", 0.35, 0.0, 1.0, emit=1.1),
        glassr = wc("玫瑰窗", "#E8919F", 0.4, 0.0, 1.0, emit=1.1),
        fire   = wc("火", "#FFB067", 0.5, 0.0, 1.0, emit=7.0),
        ember  = wc("炭火", "#E8794F", 0.6, 0.0, 1.0, emit=3.0),
        wool   = wc("羊毛", "#F7F1E3", 0.98, 0.05, 20.0),
        fox    = wc("狐狸橙", "#D98C55", 0.9, 0.04, 8.0),
        scarf  = wc("围巾金", "#E9B44C", 0.7, 0.03, 6.0),
        robe   = wc("王袍紫", "#B18CA8", 0.9, 0.04, 6.0),
        robe2  = wc("长袍青", "#7FA39C", 0.92, 0.04, 6.0),
        carpet = wc("地毯红", "#B4706E", 0.96, 0.06, 12.0),
        brass  = wc("黄铜", "#C9A25E", 0.45, 0.03, 4.0, metallic=0.6),
        iron   = wc("铁灰", "#7C7A80", 0.6, 0.04, 5.0, metallic=0.4),
        moon   = wc("月", "#FFF4DA", 0.9, 0.02, 3.0, emit=2.2),
        star   = wc("星", "#FFF8E8", 0.9, 0.0, 1.0, emit=9.0),
        night  = wc("夜蓝", "#4A4A6E", 0.95, 0.03, 3.0),
        snake  = wc("蛇绿", "#9DB089", 0.85, 0.04, 6.0),
        rosep  = wc("玫瑰红", "#D9737F", 0.8, 0.04, 8.0),
        rosep2 = wc("玫瑰深", "#B85863", 0.8, 0.04, 8.0),
        leafp  = wc("玫瑰叶", "#7E9C6E", 0.9, 0.05, 10.0),
        book1  = wc("书红", "#B5695F", 0.9, 0.04, 6.0),
        book2  = wc("书青", "#6E8F92", 0.9, 0.04, 6.0),
        book3  = wc("书金", "#C8A05E", 0.9, 0.04, 6.0),
        book4  = wc("书紫", "#8A7C9C", 0.9, 0.04, 6.0),
    ))
    return _Pal(_P)

# ---------------------------------------------------------------- primitives
def _bm_cone(seg, r1, r2, depth):
    bm = bmesh.new()
    try:
        bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=seg,
                              radius1=r1, radius2=r2, depth=depth)
    except TypeError:
        bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=seg,
                              diameter1=r1 * 2, diameter2=r2 * 2, depth=depth)
    return bm

def _bm_sphere(seg, rings, r):
    bm = bmesh.new()
    try:
        bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=r)
    except TypeError:
        bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, diameter=r * 2)
    return bm

def _bm_ico(sub, r):
    bm = bmesh.new()
    try:
        bmesh.ops.create_icosphere(bm, subdivisions=sub, radius=r)
    except TypeError:
        bmesh.ops.create_icosphere(bm, subdivisions=sub, diameter=r * 2)
    return bm

def _bm_cube(size=1.0):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=size)
    return bm

def _bevel(bm, w, seg=2):
    if w and w > 0:
        try:
            bmesh.ops.bevel(bm, geom=list(bm.verts) + list(bm.edges), offset=w,
                            segments=seg, affect="EDGES", clamp_overlap=True, profile=0.5)
        except Exception:
            pass

def _mk(name, bm, loc=(0, 0, 0), rot=(0, 0, 0), mat=None, target=None,
        smooth=None, bevel=0.0, seg=2, scale=(1, 1, 1)):
    if scale != (1, 1, 1):
        bmesh.ops.scale(bm, vec=scale, verts=bm.verts[:])
    _bevel(bm, bevel, seg)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    if smooth is not None:
        for p in me.polygons:
            p.use_smooth = bool(smooth)
    ob = bpy.data.objects.new(name, me)
    ob.location = loc
    ob.rotation_euler = rot
    if mat:
        me.materials.append(mat)
    (target or bpy.context.scene.collection).objects.link(ob)
    return ob

def box(name, loc, size, rot=(0, 0, 0), mat=None, target=None, bevel=0.03):
    bm = _bm_cube(1.0)
    bmesh.ops.scale(bm, vec=size, verts=bm.verts[:])
    return _mk(name, bm, loc, rot, mat, target, None, bevel)

def cyl(name, loc, r, h, rot=(0, 0, 0), mat=None, target=None, seg=24, r2=None, bevel=0.02):
    bm = _bm_cone(seg, r, r if r2 is None else r2, h)
    return _mk(name, bm, loc, rot, mat, target, True, bevel)

def cone(name, loc, r1, r2, h, rot=(0, 0, 0), mat=None, target=None, seg=20):
    bm = _bm_cone(seg, r1, r2, h)
    return _mk(name, bm, loc, rot, mat, target, True, 0.0)

def sph(name, loc, r, mat=None, target=None, seg=20, rings=12, scale=(1, 1, 1)):
    bm = _bm_sphere(seg, rings, r)
    return _mk(name, bm, loc, (0, 0, 0), mat, target, True, 0.0, scale=scale)

def ico(name, loc, r, mat=None, target=None, sub=2, scale=(1, 1, 1)):
    bm = _bm_ico(sub, r)
    return _mk(name, bm, loc, (0, 0, 0), mat, target, True, 0.0, scale=scale)

def torus(name, loc, r, minor, rot=(0, 0, 0), mat=None, target=None, maj=24, mnr=10):
    bm = bmesh.new()
    rings = []
    for i in range(maj):
        a = TAU * i / maj
        ca, sa = math.cos(a), math.sin(a)
        ring = []
        for j in range(mnr):
            b = TAU * j / mnr
            rr = r + math.cos(b) * minor
            ring.append(bm.verts.new((ca * rr, sa * rr, math.sin(b) * minor)))
        rings.append(ring)
    for i in range(maj):
        A, B = rings[i], rings[(i + 1) % maj]
        for j in range(mnr):
            k = (j + 1) % mnr
            bm.faces.new([A[j], A[k], B[k], B[j]])
    return _mk(name, bm, loc, rot, mat, target, True, 0.0)

def gable(name, loc, w, d, h, rot=(0, 0, 0), mat=None, target=None, bevel=0.0):
    bm = bmesh.new()
    v = [bm.verts.new(p) for p in [
        (-w / 2, -d / 2, 0), (w / 2, -d / 2, 0), (w / 2, d / 2, 0), (-w / 2, d / 2, 0),
        (0, -d / 2, h), (0, d / 2, h)]]
    bm.faces.new([v[0], v[1], v[2], v[3]])
    bm.faces.new([v[0], v[1], v[4]])
    bm.faces.new([v[3], v[2], v[5]])
    bm.faces.new([v[0], v[4], v[5], v[3]])
    bm.faces.new([v[1], v[2], v[5], v[4]])
    return _mk(name, bm, loc, rot, mat, target, None, bevel)

def arch(name, loc, w, h, depth, rot=(0, 0, 0), mat=None, target=None, r=None):
    r = w / 2 if r is None else r
    hs = max(0.0, h - r)
    pts = [(-w / 2, 0.0), (w / 2, 0.0), (w / 2, hs)]
    steps = 12
    for i in range(1, steps):
        a = math.pi * i / steps
        pts.append((math.cos(a) * w / 2, hs + math.sin(a) * r))
    pts.append((-w / 2, hs))
    bm = bmesh.new()
    front = [bm.verts.new((x, 0, z)) for x, z in pts]
    bm.faces.new(front)
    bm.normal_update()
    res = bmesh.ops.extrude_face_region(bm, geom=bm.faces[:])
    verts = [e for e in res["geom"] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=verts, vec=(0, depth, 0))
    return _mk(name, bm, loc, rot, mat, target, None, 0.0)

def merlons(prefix, center, radius, z, count, w=0.55, h=0.85, d=0.5, mat=None,
            target=None, jitter=0.0):
    out = []
    cx, cy = center
    for i in range(count):
        a = TAU * i / count
        rr = radius + (R.uniform(-jitter, jitter) if jitter else 0)
        out.append(box(f"{prefix}_{i}", (cx + math.cos(a) * rr, cy + math.sin(a) * rr, z + h / 2),
                       (w, d, h), rot=(0, 0, a), mat=mat, target=target, bevel=0.02))
    return out

def join(objs, name, target=None):
    objs = [o for o in objs if o and o.name in bpy.data.objects]
    if not objs:
        return None
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    ob = bpy.context.object
    ob.name = name
    return ob

def stair(name, loc, steps, rise, run, width, rot=0, mat=None, target=None, spiral=False):
    out = []
    for i in range(steps):
        if spiral:
            a = i * 0.34
            x = loc[0] + math.cos(a) * run * 2.2
            y = loc[1] + math.sin(a) * run * 2.2
            out.append(box(f"{name}_{i}", (x, y, loc[2] + i * rise),
                           (width, run, rise), rot=(0, 0, a), mat=mat, target=target, bevel=0.01))
        else:
            out.append(box(f"{name}_{i}", (loc[0], loc[1] + run * i, loc[2] + i * rise),
                           (width, run, rise), mat=mat, target=target, bevel=0.01))
    return out

def empty(name, loc, target=None, size=0.6):
    ob = bpy.data.objects.new(name, None)
    ob.empty_display_size = size
    ob.location = loc
    (target or bpy.context.scene.collection).objects.link(ob)
    return ob

def smoothstep(t):
    return t * t * (3 - 2 * t)

def noise_disp(ob, strength=0.6, scale=0.35, seed=1):
    from mathutils import noise as N
    me = ob.data
    for v in me.vertices:
        p = v.co
        n = N.noise(Vector((p.x * scale + seed * 3.1, p.y * scale, p.z * scale)))
        v.co += Vector((0, 0, n * strength))
    me.update()

# ---------------------------------------------------------------- batch build
class Batch:
    """把大量小装饰合并进一个网格，避免对象爆炸"""

    def __init__(self, name, target, bevel=0.0):
        self.name = name
        self.target = target
        self.bm = bmesh.new()
        self.mats = []
        self.bevel = bevel

    def _mi(self, mat):
        if mat is None:
            return 0
        for i, mm in enumerate(self.mats):
            if mm == mat:
                return i
        self.mats.append(mat)
        return len(self.mats) - 1

    def _append(self, sub, mat, matrix=None):
        mi = self._mi(mat)
        if matrix is not None:
            bmesh.ops.transform(sub, matrix=matrix, verts=sub.verts[:])
        vmap = {}
        for v in sub.verts:
            vmap[v] = self.bm.verts.new(v.co)
        self.bm.verts.index_update()
        for f in sub.faces:
            try:
                nf = self.bm.faces.new([vmap[v] for v in f.verts])
                nf.material_index = mi
            except ValueError:
                pass
        sub.free()

    def box(self, loc, size, rot=(0, 0, 0), mat=None):
        sub = _bm_cube(1.0)
        bmesh.ops.scale(sub, vec=size, verts=sub.verts[:])
        _bevel(sub, self.bevel)
        mtx = Matrix.Translation(Vector(loc)) @ Euler(rot).to_matrix().to_4x4()
        self._append(sub, mat, mtx)

    def cone(self, loc, r1, r2, h, rot=(0, 0, 0), mat=None, seg=8):
        sub = _bm_cone(seg, r1, r2, h)
        mtx = Matrix.Translation(Vector(loc)) @ Euler(rot).to_matrix().to_4x4()
        self._append(sub, mat, mtx)

    def cyl(self, loc, r, h, rot=(0, 0, 0), mat=None, seg=8, r2=None):
        sub = _bm_cone(seg, r, r if r2 is None else r2, h)
        mtx = Matrix.Translation(Vector(loc)) @ Euler(rot).to_matrix().to_4x4()
        self._append(sub, mat, mtx)

    def sphere(self, loc, r, mat=None, seg=10, rings=7, scale=(1, 1, 1)):
        sub = _bm_sphere(seg, rings, r)
        bmesh.ops.scale(sub, vec=scale, verts=sub.verts[:])
        self._append(sub, mat, Matrix.Translation(Vector(loc)))

    def ico(self, loc, r, mat=None, sub_=1, scale=(1, 1, 1), rot=(0, 0, 0)):
        sub = _bm_ico(sub_, r)
        bmesh.ops.scale(sub, vec=scale, verts=sub.verts[:])
        mtx = Matrix.Translation(Vector(loc)) @ Euler(rot).to_matrix().to_4x4()
        self._append(sub, mat, mtx)

    def build(self, smooth=False):
        me = bpy.data.meshes.new(self.name)
        self.bm.to_mesh(me)
        self.bm.free()
        for mm in self.mats:
            me.materials.append(mm)
        for p in me.polygons:
            p.use_smooth = smooth
        ob = bpy.data.objects.new(self.name, me)
        self.target.objects.link(ob)
        return ob
