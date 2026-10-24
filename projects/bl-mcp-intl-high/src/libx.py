"""libx —— 在 castlelib 之上补的构件：多边形棱柱、C 形墙、缎带路面、旋转体等"""
import math
import bmesh
import bpy
from mathutils import Vector, Euler, Matrix

from lib import (R, TAU, _mk, _bm_cube, _bm_cone, _bm_sphere, box, cyl, sph, ico,
                 torus, cone, gable, arch, join, empty, Batch, _bevel, wc, M)


# ------------------------------------------------------------------ 工具
def arc_pts(cx, cy, r, a0, a1, seg):
    """返回一段圆弧上的点（度）"""
    a0, a1 = math.radians(a0), math.radians(a1)
    return [(cx + math.cos(a0 + (a1 - a0) * i / seg) * r,
             cy + math.sin(a0 + (a1 - a0) * i / seg) * r) for i in range(seg + 1)]


def ring_pts(cx, cy, r, n=16, jitter=0.05, seed=1):
    """不规则多边形轮廓"""
    rr = R.__class__(seed)
    out = []
    for i in range(n):
        a = TAU * i / n
        rad = r * (1.0 + rr.uniform(-jitter, jitter))
        out.append((cx + math.cos(a) * rad, cy + math.sin(a) * rad))
    return out


def prism(name, pts_bot, pts_top, mat=None, target=None, bevel=0.0, caps=True, smooth=False):
    """上下两个多边形之间放样"""
    bm = bmesh.new()
    b = [bm.verts.new((x, y, z)) for x, y, z in pts_bot]
    t = [bm.verts.new((x, y, z)) for x, y, z in pts_top]
    n = len(pts_bot)
    for i in range(n):
        j = (i + 1) % n
        try:
            bm.faces.new([b[i], b[j], t[j], t[i]])
        except ValueError:
            pass
    if caps:
        try:
            bm.faces.new(list(reversed(b)))
        except ValueError:
            pass
        try:
            bm.faces.new(t)
        except ValueError:
            pass
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return _mk(name, bm, (0, 0, 0), (0, 0, 0), mat, target, smooth, bevel)


def poly_prism(name, pts, z0, z1, mat=None, target=None, bevel=0.0,
               top_scale=1.0, cx=None, cy=None, top_z=None):
    """平面多边形 -> 棱柱（top_scale<1 时收分）"""
    if cx is None:
        cx = sum(p[0] for p in pts) / len(pts)
        cy = sum(p[1] for p in pts) / len(pts)
    zt = z1 if top_z is None else top_z
    bot = [(x, y, z0) for x, y in pts]
    top = [(cx + (x - cx) * top_scale, cy + (y - cy) * top_scale, zt) for x, y in pts]
    return prism(name, bot, top, mat, target, bevel)


def wall_band(name, cx, cy, r_in, r_out, a0, a1, z0, z1, mat=None, target=None, seg=48):
    """C 形（或整圈）厚墙：内外两个弧之间拉起来，两端封口"""
    inner = arc_pts(cx, cy, r_in, a0, a1, seg)
    outer = arc_pts(cx, cy, r_out, a0, a1, seg)
    bm = bmesh.new()
    ib = [bm.verts.new((x, y, z0)) for x, y in inner]
    it = [bm.verts.new((x, y, z1)) for x, y in inner]
    ob = [bm.verts.new((x, y, z0)) for x, y in outer]
    ot = [bm.verts.new((x, y, z1)) for x, y in outer]
    for i in range(len(inner) - 1):
        bm.faces.new([ob[i], ob[i + 1], ot[i + 1], ot[i]])      # 外皮
        bm.faces.new([it[i], it[i + 1], ib[i + 1], ib[i]])      # 内皮
        bm.faces.new([ib[i], ib[i + 1], ob[i + 1], ob[i]])      # 底
        bm.faces.new([ot[i], ot[i + 1], it[i + 1], it[i]])      # 顶
    # 端面
    bm.faces.new([ib[0], it[0], ot[0], ob[0]])
    bm.faces.new([ob[-1], ot[-1], it[-1], ib[-1]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return _mk(name, bm, (0, 0, 0), (0, 0, 0), mat, target, False, 0.0)


def ribbon(name, path, width, z, mat=None, target=None, thick=0.06, wobble=0.0, seed=3):
    """沿路径铺一条带厚度的带子（路 / 水渠 / 地毯）"""
    rr = R.__class__(seed)
    pts = []
    for i, (x, y) in enumerate(path):
        if i == 0:
            dx, dy = path[1][0] - x, path[1][1] - y
        elif i == len(path) - 1:
            dx, dy = x - path[-2][0], y - path[-2][1]
        else:
            dx, dy = path[i + 1][0] - path[i - 1][0], path[i + 1][1] - path[i - 1][1]
        L = math.hypot(dx, dy) or 1.0
        nx, ny = -dy / L, dx / L
        w = width * (1.0 + (rr.uniform(-wobble, wobble) if wobble else 0.0)) * 0.5
        pts.append(((x + nx * w, y + ny * w, z), (x - nx * w, y - ny * w, z)))
    bm = bmesh.new()
    left = [bm.verts.new((p[0][0], p[0][1], p[0][2])) for p in pts]
    right = [bm.verts.new((p[1][0], p[1][1], p[1][2])) for p in pts]
    for i in range(len(pts) - 1):
        bm.faces.new([left[i], left[i + 1], right[i + 1], right[i]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    if thick:
        res = bmesh.ops.extrude_face_region(bm, geom=bm.faces[:])
        vs = [e for e in res["geom"] if isinstance(e, bmesh.types.BMVert)]
        bmesh.ops.translate(bm, verts=vs, vec=(0, 0, -thick))
    return _mk(name, bm, (0, 0, 0), (0, 0, 0), mat, target, False, 0.0)


def lathe(name, profile, seg=24, mat=None, target=None, loc=(0, 0, 0), smooth=True):
    """profile: [(r, z), ...] 自下而上"""
    bm = bmesh.new()
    rings = []
    for r, z in profile:
        if r <= 1e-5:
            rings.append([bm.verts.new((0, 0, z))])
        else:
            rings.append([bm.verts.new((math.cos(TAU * i / seg) * r,
                                        math.sin(TAU * i / seg) * r, z)) for i in range(seg)])
    for k in range(len(rings) - 1):
        A, B = rings[k], rings[k + 1]
        if len(A) == 1 and len(B) > 1:
            for i in range(seg):
                bm.faces.new([A[0], B[i], B[(i + 1) % seg]])
        elif len(B) == 1 and len(A) > 1:
            for i in range(seg):
                bm.faces.new([A[i], A[(i + 1) % seg], B[0]])
        elif len(A) > 1 and len(B) > 1:
            for i in range(seg):
                bm.faces.new([A[i], A[(i + 1) % seg], B[(i + 1) % seg], B[i]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return _mk(name, bm, loc, (0, 0, 0), mat, target, smooth, 0.0)


def rod(name, p0, p1, r, mat=None, target=None, seg=10, r2=None):
    """两点之间的圆柱"""
    p0, p1 = Vector(p0), Vector(p1)
    d = p1 - p0
    L = d.length
    ob = cyl(name, ((p0.x + p1.x) / 2, (p0.y + p1.y) / 2, (p0.z + p1.z) / 2),
             r, L, mat=mat, target=target, seg=seg, r2=r2, bevel=0.0)
    q = Vector((0, 0, 1)).rotation_difference(d.normalized())
    ob.rotation_mode = "QUATERNION"
    ob.rotation_quaternion = q
    return ob


def set_alpha(mat, a):
    mat.blend_method = "BLEND"
    try:
        mat.surface_render_method = "BLENDED"
    except Exception:
        pass
    for n in mat.node_tree.nodes:
        if n.type == "BSDF_PRINCIPLED" and "Alpha" in n.inputs:
            n.inputs["Alpha"].default_value = a
    return mat


def strata(ob, mats, bands):
    """按高度给岩体分层上色（bands 为 (z_threshold, mat_index) 列表）"""
    me = ob.data
    me.materials.clear()
    for m in mats:
        me.materials.append(m)
    for p in me.polygons:
        z = p.center.z
        idx = 0
        for thr, mi in bands:
            if z <= thr:
                idx = mi
        p.material_index = min(idx, len(mats) - 1)
    return ob
