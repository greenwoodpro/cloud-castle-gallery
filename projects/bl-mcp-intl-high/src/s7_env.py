"""07 天空、光、相机、渲染设置"""
import math
import bpy
from mathutils import Vector, Euler, Matrix

from lib import R, coll, sph, ico, cyl, torus, empty, Batch, M
from libx import set_alpha


def _rgba(c):
    return (c[0], c[1], c[2], 1.0)


def build_world():
    w = bpy.data.worlds.get("小王子天空") or bpy.data.worlds.new("小王子天空")
    bpy.context.scene.world = w
    w.use_nodes = True
    nt = w.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputWorld"); out.location = (600, 0)
    bg = nt.nodes.new("ShaderNodeBackground"); bg.location = (400, 0)
    geo = nt.nodes.new("ShaderNodeNewGeometry"); geo.location = (-700, 0)
    sep = nt.nodes.new("ShaderNodeSeparateXYZ"); sep.location = (-500, 0)
    mr = nt.nodes.new("ShaderNodeMapRange"); mr.location = (-320, 0)
    mr.inputs["From Min"].default_value = -1.0
    mr.inputs["From Max"].default_value = 1.0
    ramp = nt.nodes.new("ShaderNodeValToRGB"); ramp.location = (-120, 0)
    nt.links.new(geo.outputs["Incoming"], sep.inputs["Vector"])
    nt.links.new(sep.outputs["Z"], mr.inputs["Value"])
    nt.links.new(mr.outputs["Result"], ramp.inputs["Fac"])
    cr = ramp.color_ramp
    cr.interpolation = "EASE"
    stops = [(0.00, "#242640"), (0.32, "#4C4A74"), (0.44, "#8E82AE"),
             (0.495, "#F6CDB4"), (0.535, "#EBBDB4"), (0.60, "#C0A6C6"),
             (0.74, "#7E74A8"), (0.88, "#514C7C"), (1.00, "#2E2A4C")]
    while len(cr.elements) > 2:
        cr.elements.remove(cr.elements[-1])
    for i, (pos, hx) in enumerate(stops):
        e = cr.elements[i] if i < 2 else cr.elements.new(pos)
        e.position = pos
        hx = hx.lstrip("#")
        e.color = tuple(int(hx[k:k + 2], 16) / 255.0 for k in (0, 2, 4)) + (1.0,)
    nt.links.new(ramp.outputs["Color"], bg.inputs["Color"])
    bg.inputs["Strength"].default_value = 0.62
    nt.links.new(bg.outputs["Background"], out.inputs["Surface"])
    return w


def build_sky_objects(c):
    """星星、月亮、远处云带"""
    b = Batch("星辰", c)
    rng = R.__class__(303)
    for i in range(320):
        a = rng.uniform(0, math.tau)
        z = rng.uniform(0.06, 1.0)
        rr = 320.0
        rad = math.sqrt(max(0.0, 1 - z * z))
        b.ico((math.cos(a) * rad * rr, math.sin(a) * rad * rr, z * rr),
              rng.uniform(0.35, 1.15), M().star, sub_=1)
    b.build()

    # 月
    mx, my, mz = 168.0, 208.0, 132.0
    sph("月亮", (mx, my, mz), 24.0, M().moon, c, seg=40, rings=24)
    b2 = Batch("月晕", c)
    for i in range(3):
        b2.ico((mx, my, mz), 26.0 + i * 5.0, M().cloud, sub_=1)
    ob = b2.build()
    set_alpha(ob.data.materials[0], 0.22)

    # 远处云带
    rng = R.__class__(404)
    b3 = Batch("云海", c)
    for i in range(46):
        a = rng.uniform(0, math.tau)
        rr = rng.uniform(60, 240)
        z = rng.uniform(-46, -14)
        n = rng.randint(3, 6)
        for k in range(n):
            b3.ico((math.cos(a) * rr + rng.uniform(-9, 9),
                    math.sin(a) * rr + rng.uniform(-9, 9),
                    z + rng.uniform(-2, 2)),
                   rng.uniform(4, 10), M().cloud, sub_=2,
                   scale=(1.0, rng.uniform(0.75, 1.25), rng.uniform(0.5, 0.78)))
    b3.build(smooth=True)


def build_lights(c):
    sc = bpy.context.scene

    def sun(name, energy, color, direction, angle=12.0):
        d = bpy.data.lights.new(name, "SUN")
        d.energy = energy
        d.color = color
        d.angle = math.radians(angle)
        ob = bpy.data.objects.new(name, d)
        c.objects.link(ob)
        ob.rotation_euler = Vector(direction).normalized().to_track_quat("-Z", "Y").to_euler()
        return ob

    sun("主阳", 5.4, (1.0, 0.86, 0.70), (0.58, -0.46, -0.60), 8.0)
    sun("天光", 0.75, (0.70, 0.76, 1.0), (-0.45, 0.55, -0.70), 30.0)
    sun("轮廓光", 1.5, (1.0, 0.72, 0.76), (-0.55, -0.62, -0.28), 18.0)

    # 区域补光，压住暗部
    for name, loc, rot, energy, color, size in (
            ("补光_左", (-30, 26, 24), (1.05, 0, -0.9), 900, (0.86, 0.88, 1.0), 34),
            ("补光_右", (34, 34, 16), (1.2, 0, 0.75), 700, (1.0, 0.9, 0.86), 30)):
        d = bpy.data.lights.new(name, "AREA")
        d.energy = energy
        d.color = color
        d.size = size
        ob = bpy.data.objects.new(name, d)
        c.objects.link(ob)
        ob.location = loc
        ob.rotation_euler = rot


def build_cameras(c, pivot_loc=(0, 2, 9)):
    pivot = empty("视角旋转台", pivot_loc, c, 3.0)
    specs = [
        ("CAM_全景", (66, 88, 40), (0, 0, -2), 38),
        ("CAM_城堡", (26, 44, 34), (0, 2, 16), 62),
        ("CAM_内景", (0.3, 10.2, 13.4), (0, -3.2, 12.2), 34),
        ("CAM_俯瞰", (2, 10, 96), (0, 2, 6), 50),
        ("CAM_低角", (72, 94, -30), (0, 0, -8), 40),
        ("CAM_瀑布", (44, 36, 2), (19, 11, -6), 40),
        ("CAM_城门", (1.0, 31.0, 12.4), (0, 12.0, 11.6), 50),
        ("CAM_村庄", (3, 40, 17), (2, 18, 4), 45),
        ("CAM_剖视", (-6.4, 8.9, 12.2), (-6.4, 4.2, 10.9), 21),
    ]
    cams = []
    for name, loc, tgt, lens in specs:
        d = bpy.data.cameras.new(name)
        d.lens = lens
        d.clip_start = 0.4
        d.clip_end = 1200
        ob = bpy.data.objects.new(name, d)
        c.objects.link(ob)
        ob.location = loc
        foc = empty("焦点_" + name, tgt, c, 0.5)
        con = ob.constraints.new("TRACK_TO")
        con.target = foc
        con.track_axis = "TRACK_NEGATIVE_Z"
        con.up_axis = "UP_Y"
        inv = Matrix.Translation(-Vector(pivot_loc))
        ob.parent = pivot
        ob.matrix_parent_inverse = inv
        foc.parent = pivot
        foc.matrix_parent_inverse = inv
        cams.append(ob)
    bpy.context.scene.camera = cams[0]

    # 缓慢环绕：240 帧转一圈
    pivot.rotation_mode = "XYZ"
    pivot.rotation_euler = (0, 0, 0)
    pivot.keyframe_insert("rotation_euler", frame=1)
    pivot.rotation_euler = (0, 0, math.tau)
    pivot.keyframe_insert("rotation_euler", frame=241)
    bpy.context.scene.frame_start = 1
    bpy.context.scene.frame_end = 240
    bpy.context.scene.frame_set(1)
    return cams


def build_render():
    sc = bpy.context.scene
    r = sc.render
    r.engine = "BLENDER_EEVEE"
    r.resolution_x = 1600
    r.resolution_y = 1000
    r.resolution_percentage = 100
    r.film_transparent = False
    r.image_settings.file_format = "PNG"
    ee = sc.eevee
    ee.taa_render_samples = 64
    ee.taa_samples = 16
    ee.use_shadows = True
    ee.shadow_ray_count = 2
    ee.shadow_step_count = 8
    try:
        ee.use_fast_gi = True
        ee.fast_gi_distance = 3.0
        ee.fast_gi_quality = 0.5
    except Exception:
        pass
    sc.view_settings.view_transform = "Standard"
    sc.view_settings.look = "None"
    sc.view_settings.exposure = 0.05
    sc.view_settings.gamma = 1.0
    sc.display_settings.display_device = "sRGB"


def build():
    c = coll("00 天空与光")
    build_world()
    build_sky_objects(c)
    build_lights(c)
    build_cameras(c)
    build_render()
    return c
