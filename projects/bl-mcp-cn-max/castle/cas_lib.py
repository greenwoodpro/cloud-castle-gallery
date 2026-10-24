# -*- coding: utf-8 -*-
"""Le Petit Prince castle -- geometry / material toolkit (Blender 5.x, bmesh only)."""
import bpy, bmesh, math, random
from mathutils import Vector, Matrix, Euler
from mathutils import noise as mnoise

TAU = math.pi * 2.0
D = math.radians
RNG = random.Random(20261018)


# ---------------------------------------------------------------- scene utils
def clear_scene():
    for ob in list(bpy.data.objects):
        bpy.data.objects.remove(ob, do_unlink=True)
    for col in list(bpy.data.collections):
        bpy.data.collections.remove(col)
    for blk in (bpy.data.meshes, bpy.data.lights, bpy.data.cameras,
                bpy.data.curves):
        for d in list(blk):
            try:
                blk.remove(d)
            except Exception:
                pass
    RNG.seed(20261018)


def collection(name):
    c = bpy.data.collections.get(name)
    if not c:
        c = bpy.data.collections.new(name)
        bpy.context.scene.collection.children.link(c)
    return c


# ------------------------------------------------------------------ colour io
def H(s):
    """hex sRGB -> linear rgb tuple"""
    s = s.lstrip('#')
    out = []
    for i in (0, 2, 4):
        x = int(s[i:i + 2], 16) / 255.0
        out.append(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4)
    return tuple(out)


def _set(node, name, val):
    if name in node.inputs:
        try:
            node.inputs[name].default_value = val
        except Exception:
            pass


def _principled(nt):
    for n in nt.nodes:
        if n.type == 'BSDF_PRINCIPLED':
            return n
    raise RuntimeError('no principled node')


MATS = {}


def mat(name, hexcol, rough=0.72, metal=0.0, spec=0.25, emit=None,
        estr=0.0, alpha=1.0, sss=0.0, bmp=None):
    """cached Principled material"""
    if name in MATS:
        return MATS[name]
    ex = bpy.data.materials.get(name)
    if ex is not None:
        MATS[name] = ex
        return ex
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    bsdf = _principled(nt)
    col = H(hexcol) if isinstance(hexcol, str) else hexcol
    _set(bsdf, 'Base Color', (*col, 1.0))
    _set(bsdf, 'Roughness', rough)
    _set(bsdf, 'Metallic', metal)
    _set(bsdf, 'Specular IOR Level', spec)
    _set(bsdf, 'Alpha', alpha)
    if sss:
        _set(bsdf, 'Subsurface Weight', sss)
        _set(bsdf, 'Subsurface Radius', (0.9, 0.55, 0.4))
    if emit:
        ec = H(emit) if isinstance(emit, str) else emit
        _set(bsdf, 'Emission Color', (*ec, 1.0))
        _set(bsdf, 'Emission Strength', estr)
    if alpha < 1.0:
        for attr, val in (('blend_method', 'BLEND'), ('surface_render_method', 'BLENDED')):
            try:
                setattr(m, attr, val)
            except Exception:
                pass
        try:
            m.use_backface_culling = False
        except Exception:
            pass
    if bmp:  # procedural paper / stone speckle
        tex = nt.nodes.new('ShaderNodeTexNoise')
        tex.inputs['Scale'].default_value = 22.0
        tex.inputs['Detail'].default_value = 6.0
        ramp = nt.nodes.new('ShaderNodeValToRGB')
        ramp.color_ramp.elements[0].position = 0.38
        ramp.color_ramp.elements[1].position = 0.62
        c2 = tuple(min(1.0, c * 1.18 + 0.02) for c in col)
        ramp.color_ramp.elements[0].color = (*tuple(c * 0.82 for c in col), 1)
        ramp.color_ramp.elements[1].color = (*c2, 1)
        nt.links.new(tex.outputs['Fac'], ramp.inputs['Fac'])
        nt.links.new(ramp.outputs['Color'], bsdf.inputs['Base Color'])
        if bmp == 'paper':
            bump = nt.nodes.new('ShaderNodeBump')
            bump.inputs['Strength'].default_value = 0.08
            nt.links.new(tex.outputs['Fac'], bump.inputs['Height'])
            nt.links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    MATS[name] = m
    return m


# --------------------------------------------------------------------- batch
class Batch:
    """accumulate geometry into one bmesh, one object, multi-material"""

    def __init__(self, name, coll='Castle'):
        self.name = name
        self.bm = bmesh.new()
        self.mats = []
        self.idx = {}
        self.coll = coll

    def _mi(self, m):
        if m.name not in self.idx:
            self.idx[m.name] = len(self.mats)
            self.mats.append(m)
        return self.idx[m.name]

    def tag(self, verts, m, smooth=False):
        i = self._mi(m)
        faces = set()
        for v in verts:
            for f in v.link_faces:
                faces.add(f)
        for f in faces:
            f.material_index = i
            f.smooth = smooth
        return verts

    def build(self, coll=None, shadow=True):
        me = bpy.data.meshes.new(self.name)
        self.bm.to_mesh(me)
        self.bm.free()
        for m in self.mats:
            me.materials.append(m)
        ob = bpy.data.objects.new(self.name, me)
        (collection(coll or self.coll)).objects.link(ob)
        ob.visible_shadow = shadow
        return ob


# ------------------------------------------------------------------ primitives
def _m4(loc=(0, 0, 0), rot=None, scale=None):
    m = Matrix.Translation(loc)
    if rot:
        m = m @ Euler(tuple(D(a) for a in rot), 'XYZ').to_matrix().to_4x4()
    if scale:
        m = m @ Matrix.Diagonal((scale[0], scale[1], scale[2], 1.0))
    return m


def box(b, c, s, m, rot=None, smooth=False):
    """axis box. c = (x,y,z) of the BOTTOM centre; s = full size"""
    r = bmesh.ops.create_cube(b.bm, size=1.0)
    vs = r['verts']
    bmesh.ops.transform(b.bm, matrix=_m4((c[0], c[1], c[2] + s[2] * 0.5), rot, s),
                        verts=vs)
    return b.tag(vs, m, smooth)


def bx(b, c, s, m, rot=None, smooth=False):
    """box centred on c"""
    r = bmesh.ops.create_cube(b.bm, size=1.0)
    vs = r['verts']
    bmesh.ops.transform(b.bm, matrix=_m4(c, rot, s), verts=vs)
    return b.tag(vs, m, smooth)


def cyl(b, c, r1, r2, h, m, seg=20, rot=None, smooth=True, caps=True):
    """cone/cylinder from bottom centre c upwards"""
    try:
        r = bmesh.ops.create_cone(b.bm, cap_ends=caps, cap_tris=False, segments=seg,
                                  radius1=r1, radius2=r2, depth=h)
    except TypeError:
        r = bmesh.ops.create_cone(b.bm, cap_ends=caps, cap_tris=False, segments=seg,
                                  diameter1=r1 * 2, diameter2=r2 * 2, depth=h)
    vs = r['verts']
    bmesh.ops.transform(b.bm, matrix=_m4((c[0], c[1], c[2] + h * 0.5), rot), verts=vs)
    return b.tag(vs, m, smooth)


def sph(b, c, r, m, u=18, v=12, scale=None, smooth=True, amp=0.0, freq=3.0, seed=0.0):
    try:
        res = bmesh.ops.create_uvsphere(b.bm, u_segments=u, v_segments=v, radius=r)
    except TypeError:
        res = bmesh.ops.create_uvsphere(b.bm, u_segments=u, v_segments=v, diameter=r * 2)
    vs = res['verts']
    if amp:
        for vv in vs:
            n = vv.co.normalized()
            d = 1.0 + amp * mnoise.noise(n * freq + Vector((seed, seed * 1.7, seed * 0.3)))
            vv.co = n * r * d
    bmesh.ops.transform(b.bm, matrix=_m4(c, None, scale), verts=vs)
    return b.tag(vs, m, smooth)


def dome(b, c, r, m, seg=20, rings=6, squash=1.0, smooth=True):
    """half sphere sitting on c"""
    verts = []
    bm = b.bm
    top = bm.verts.new((c[0], c[1], c[2] + r * squash))
    for i in range(1, rings + 1):
        th = (i / rings) * (math.pi / 2)
        row = []
        rr = r * math.cos(th)
        zz = c[2] + r * squash * math.sin(th)
        for j in range(seg):
            a = TAU * j / seg
            row.append(bm.verts.new((c[0] + rr * math.cos(a), c[1] + rr * math.sin(a), zz)))
        verts.append(row)
    for j in range(seg):
        j2 = (j + 1) % seg
        bm.faces.new((top, verts[0][j], verts[0][j2]))
    for i in range(len(verts) - 1):
        for j in range(seg):
            j2 = (j + 1) % seg
            bm.faces.new((verts[i][j], verts[i + 1][j], verts[i + 1][j2], verts[i][j2]))
    flat = [top] + [v for row in verts for v in row]
    return b.tag(flat, m, smooth)


def ring(b, c, r_out, r_in, h, m, seg=24, rot=None, smooth=True):
    """flat annulus (thin washer) from c upwards"""
    bm = b.bm
    verts = []
    for k, rr in ((0, r_out), (1, r_in)):
        row = []
        for j in range(seg):
            a = TAU * j / seg
            row.append(bm.verts.new((rr * math.cos(a), rr * math.sin(a), c[2] + (0 if k == 0 else 0))))
        verts.append(row)
    top = []
    for rr in (r_out, r_in):
        row = []
        for j in range(seg):
            a = TAU * j / seg
            row.append(bm.verts.new((rr * math.cos(a), rr * math.sin(a), c[2] + h)))
        top.append(row)
    for j in range(seg):
        j2 = (j + 1) % seg
        bm.faces.new((verts[0][j], verts[0][j2], verts[1][j2], verts[1][j]))
        bm.faces.new((top[0][j], top[1][j], top[1][j2], top[0][j2]))
        bm.faces.new((verts[0][j], top[0][j], top[0][j2], verts[0][j2]))
        bm.faces.new((verts[1][j], verts[1][j2], top[1][j2], top[1][j]))
    flat = [v for row in verts + top for v in row]
    bmesh.ops.translate(bm, vec=(c[0], c[1], 0), verts=flat)
    return b.tag(flat, m, smooth)


def arcwall(b, c, r, a0, a1, h, th, m, seg=None, rot_z=0.0):
    """curved wall segment (annulus extruded), c = bottom centre of the arc circle"""
    seg = seg or max(3, int(abs(a1 - a0) / 6))
    bm = b.bm
    rings = []
    for k, (rr, zz) in enumerate(((r - th / 2, 0), (r + th / 2, 0),
                                  (r - th / 2, h), (r + th / 2, h))):
        row = []
        for j in range(seg + 1):
            a = D(a0 + (a1 - a0) * j / seg) + rot_z
            row.append(bm.verts.new((rr * math.cos(a), rr * math.sin(a), zz)))
        rings.append(row)
    for j in range(seg):
        bm.faces.new((rings[0][j], rings[0][j + 1], rings[2][j + 1], rings[2][j]))
        bm.faces.new((rings[1][j], rings[3][j], rings[3][j + 1], rings[1][j + 1]))
        bm.faces.new((rings[2][j], rings[2][j + 1], rings[3][j + 1], rings[3][j]))
        bm.faces.new((rings[0][j], rings[1][j], rings[1][j + 1], rings[0][j + 1]))
    flat = [v for row in rings for v in row]
    cz = c[2] if len(c) > 2 else 0.0
    bmesh.ops.translate(bm, vec=(c[0], c[1], cz), verts=flat)
    return b.tag(flat, m)


def archway(b, c, w, h, depth, m, thick=0.35, seg=9, rot_z=0.0):
    """open gothic-ish arch: two jambs + semicircle of voussoirs, hole is real"""
    bm = b.bm
    r = w / 2.0
    zs = h - r
    verts = []
    allv = []
    for j in range(seg + 1):
        a = math.pi * j / seg
        cx, cz = math.cos(a) * r, zs + math.sin(a) * r
        # outer voussoir block
        for (rr, zz) in ((cx, cz),):
            pass
    # jamb blocks
    for sx in (-1, 1):
        x = c[0] + sx * (r + thick / 2)
        v = box(b, (x, c[1], c[2]), (thick, depth, zs), m)
        allv += v
    # voussoir ring
    for j in range(seg):
        a0 = math.pi * j / seg
        a1 = math.pi * (j + 1) / seg
        am = (a0 + a1) / 2
        cx = c[0] + math.cos(am) * (r + thick / 2)
        cz = c[2] + zs + math.sin(am) * (r + thick / 2)
        ln = (r + thick) * (a1 - a0) * 1.12
        v = bx(b, (cx, c[1], cz), (ln, depth, thick), m, rot=(0, 0, 0))
        bmesh.ops.rotate(bm, cent=(cx, c[1], cz),
                         matrix=Euler((0, -am + math.pi / 2, 0), 'XYZ').to_matrix(), verts=v)
        allv += v
    return allv


def leaf(b, c, r, m, rot=None, n=7, droop=0.35):
    """simple pointed leaf, c = stem base"""
    bm = b.bm
    vs = []
    for i in range(n):
        t = i / (n - 1)
        w = math.sin(t * math.pi) * 0.5 + 0.05
        vs.append((bm.verts.new((-w * r, t * r * 1.8, -droop * r * t * t)),
                   bm.verts.new((w * r, t * r * 1.8, -droop * r * t * t))))
    tip = bm.verts.new((0, r * 2.0, -droop * r * 1.15))
    for i in range(n - 1):
        bm.faces.new((vs[i][0], vs[i + 1][0], vs[i + 1][1], vs[i][1]))
    bm.faces.new((vs[-1][0], tip, vs[-1][1]))
    flat = [p for pair in vs for p in pair] + [tip]
    if rot:
        bmesh.ops.rotate(bm, cent=(0, 0, 0),
                         matrix=Euler(tuple(D(a) for a in rot), 'XYZ').to_matrix(), verts=flat)
    bmesh.ops.translate(bm, vec=c, verts=flat)
    return b.tag(flat, m, True)


def quadstrip(b, pts, widths, m, up=(0, 0, 1), smooth=True, close=False):
    """ribbon along a polyline: pts list of Vector, widths list"""
    bm = b.bm
    rows = []
    up = Vector(up)
    for i, p in enumerate(pts):
        if i < len(pts) - 1:
            t = (Vector(pts[i + 1]) - Vector(p)).normalized()
        else:
            t = (Vector(p) - Vector(pts[i - 1])).normalized()
        side = t.cross(up)
        if side.length < 1e-4:
            side = Vector((1, 0, 0))
        side.normalize()
        w = widths[i] if hasattr(widths, '__len__') else widths
        rows.append((bm.verts.new(Vector(p) - side * w * 0.5),
                     bm.verts.new(Vector(p) + side * w * 0.5)))
    n = len(rows) if close else len(rows) - 1
    for i in range(n):
        a, bb = rows[i], rows[(i + 1) % len(rows)]
        bm.faces.new((a[0], a[1], bb[1], bb[0]))
    flat = [p for r in rows for p in r]
    return b.tag(flat, m, smooth)


def ribbon_v(b, pts, widths, m, smooth=True):
    """vertical ribbon (curtain/scarf) hanging in XZ, thickness in Y"""
    bm = b.bm
    rows = []
    for i, p in enumerate(pts):
        w = widths[i] if hasattr(widths, '__len__') else widths
        rows.append((bm.verts.new((p[0] - w / 2, p[1], p[2])),
                     bm.verts.new((p[0] + w / 2, p[1], p[2]))))
    for i in range(len(rows) - 1):
        a, bb = rows[i], rows[i + 1]
        bm.faces.new((a[0], a[1], bb[1], bb[0]))
    flat = [p for r in rows for p in r]
    return b.tag(flat, m, smooth)


def star(b, c, r, m, rot=None, inner=0.42, depth=0.06):
    bm = b.bm
    vs = []
    for i in range(10):
        a = math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * inner
        vs.append(bm.verts.new((rr * math.cos(a), 0, rr * math.sin(a))))
    vs2 = [bm.verts.new((v.co.x, depth, v.co.z)) for v in vs]
    bm.faces.new(vs)
    bm.faces.new(list(reversed(vs2)))
    for i in range(10):
        j = (i + 1) % 10
        bm.faces.new((vs[i], vs[j], vs2[j], vs2[i]))
    flat = vs + vs2
    if rot:
        bmesh.ops.rotate(bm, cent=(0, 0, 0),
                         matrix=Euler(tuple(D(a) for a in rot), 'XYZ').to_matrix(), verts=flat)
    bmesh.ops.translate(bm, vec=c, verts=flat)
    return b.tag(flat, m)


def mirror_x(b, verts):
    """duplicate tagged geometry across x=0"""
    geom = list(verts)
    faces = set()
    for v in geom:
        for f in v.link_faces:
            faces.add(f)
    ret = bmesh.ops.duplicate(b.bm, geom=list(faces) + geom)
    newv = [g for g in ret['geom'] if isinstance(g, bmesh.types.BMVert)]
    for v in newv:
        v.co.x = -v.co.x
    for f in ret['geom']:
        if isinstance(f, bmesh.types.BMFace):
            f.normal_flip()
    return newv
