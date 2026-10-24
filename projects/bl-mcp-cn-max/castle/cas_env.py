# -*- coding: utf-8 -*-
"""Dusk sky, stars, moon, lights, orbit camera rig, render settings."""
import bpy, bmesh, math
from mathutils import Vector, Euler
from cas_lib import H, mat, Batch, sph, box, bx, cyl, star, collection, RNG, TAU, D


def _socket(node, name):
    for i in node.inputs:
        if i.name == name:
            return i
    return None


def sky_material():
    m = bpy.data.materials.new('Env_SkyGradient')
    m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes):
        if n.type not in ('OUTPUT_MATERIAL',):
            nt.nodes.remove(n)
    out = [n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL'][0]
    em = nt.nodes.new('ShaderNodeEmission')
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    tex = nt.nodes.new('ShaderNodeTexCoord')
    sep = nt.nodes.new('ShaderNodeSeparateXYZ')
    nt.links.new(tex.outputs['Generated'], sep.inputs['Vector'])
    nt.links.new(sep.outputs['Z'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], em.inputs['Color'])
    em.inputs['Strength'].default_value = 0.92
    nt.links.new(em.outputs['Emission'], out.inputs['Surface'])
    cr = ramp.color_ramp
    stops = [(0.00, '#12172b'), (0.435, '#6a6796'), (0.478, '#c98da6'),
             (0.502, '#f6b98a'), (0.545, '#d593a5'), (0.62, '#85699a'),
             (0.745, '#3a4076'), (0.88, '#242b58'), (1.00, '#141933')]
    cr.elements[0].position, cr.elements[0].color = stops[0][0], (*H(stops[0][1]), 1)
    cr.elements[1].position, cr.elements[1].color = stops[-1][0], (*H(stops[-1][1]), 1)
    for p, c in stops[1:-1]:
        e = cr.elements.new(p)
        e.color = (*H(c), 1)
    return m


def build_sky():
    b = Batch('Env_Sky', 'Env')
    try:
        res = bmesh.ops.create_uvsphere(b.bm, u_segments=64, v_segments=40, radius=330)
    except TypeError:
        res = bmesh.ops.create_uvsphere(b.bm, u_segments=64, v_segments=40, diameter=660)
    for f in b.bm.faces:
        f.normal_flip()
    b.tag(res['verts'], sky_material(), True)
    ob = b.build()
    ob.visible_shadow = False
    return ob


def build_stars():
    b = Batch('Env_Stars', 'Env')
    warm = mat('Star_Warm', '#fff0cf', 0.3, emit='#fff0cf', estr=2.2)
    cold = mat('Star_Cool', '#dfe9ff', 0.3, emit='#dfe9ff', estr=1.7)
    for i in range(520):
        a = RNG.uniform(0, TAU)
        el = math.asin(RNG.uniform(0.06, 1.0))
        r = 300
        x = r * math.cos(el) * math.cos(a)
        y = r * math.cos(el) * math.sin(a)
        z = r * math.sin(el)
        s = RNG.uniform(0.30, 0.95) * (1.8 if RNG.random() < 0.05 else 1.0)
        sph(b, (x, y, z), s, warm if RNG.random() < 0.68 else cold, u=6, v=5)
    # a few four-point sparkles
    for i in range(7):
        a = RNG.uniform(0, TAU)
        el = RNG.uniform(0.35, 1.2)
        r = 298
        x, y, z = (r * math.cos(el) * math.cos(a), r * math.cos(el) * math.sin(a),
                   r * math.sin(el))
        bx(b, (x, y, z), (7.5, 7.5, 0.5), warm, rot=(0, 0, 0))
        bx(b, (x, y, z), (0.7, 0.7, 9.0), warm)
    return b.build()


def build_moon():
    b = Batch('Env_Moon', 'Env')
    mp = (-150.0, 268.0, 50.0)
    d = Vector(mp)
    d.normalize()
    r = 7.5
    sph(b, mp, r, mat('Moon', '#ffe9b8', 0.4, emit='#ffe0a4', estr=0.9), u=26, v=18)
    # soft halo shells
    halo = Batch('Env_MoonHalo', 'Env')
    for k, s in enumerate((1.35, 1.9, 2.7)):
        sph(halo, mp, r * s,
            mat('Moon_Halo%d' % k, '#ffe6c8', 1.0, alpha=0.11 - k * 0.03,
                emit='#ffd9a8', estr=0.42), u=24, v=16)
    hob = halo.build()
    hob.visible_shadow = False
    return b.build()


def build_city_lights():
    """tiny warm windows in the far clouds -- a hint of another floating world"""
    return None


# ------------------------------------------------------------------- lights
def add_light(name, kind, loc, energy, color, size=6.0, rot=None, target=None):
    ld = bpy.data.lights.new(name, kind)
    ld.energy = energy
    ld.color = H(color)
    if kind == 'AREA':
        ld.size = size
        ld.shape = 'DISK'
    if kind == 'SUN':
        ld.angle = D(8)
    ob = bpy.data.objects.new(name, ld)
    bpy.context.scene.collection.objects.link(ob)
    ob.location = loc
    if rot:
        ob.rotation_euler = Euler(tuple(D(a) for a in rot), 'XYZ')
    if target:
        tgt = bpy.data.objects.new(name + '_TGT', None)
        bpy.context.scene.collection.objects.link(tgt)
        tgt.location = target
        c = ob.constraints.new('TRACK_TO')
        c.target = tgt
        c.track_axis = 'TRACK_NEGATIVE_Z'
        c.up_axis = 'UP_Y'
    return ob


def build_lights():
    add_light('Key_Area', 'AREA', (-16.0, -21.0, 18.0), 17000.0, '#ffd2a2', size=18,
              target=(0, 1.5, 5.0))
    add_light('Fill_Area', 'AREA', (18.0, -12.0, 9.0), 3400.0, '#a6c6ee', size=17,
              target=(0, 1.5, 4.0))
    add_light('Rim_Area', 'AREA', (4.0, 22.0, 15.0), 7200.0, '#f2b0c2', size=14,
              target=(0, 2.0, 6.0))
    add_light('Bounce_Up', 'AREA', (0.0, -10.0, -24.0), 2600.0, '#a89ec6', size=26,
              target=(0.0, 0.0, -9.0))
    add_light('Under_Warm', 'AREA', (10.0, 4.0, -20.0), 900.0, '#d3a887', size=18,
              target=(2.0, 0.0, -8.0))
    # interior warmth
    add_light('Hall_Fire', 'POINT', (0.0, 2.0, 2.4), 380.0, '#ffb066')
    add_light('Tower_Glow', 'POINT', (-4.35, 3.2, 5.4), 260.0, '#ffc98a')
    add_light('Court_Lantern', 'POINT', (0.0, -5.3, 3.4), 120.0, '#ffcf9a')
    add_light('Chapel_Glow', 'POINT', (4.65, 2.6, 2.2), 260.0, '#ffc98a')
    add_light('Hall_Fill', 'AREA', (0.0, -2.2, 3.8), 110.0, '#ffd9ae', size=4,
              target=(0, 2.2, 1.6))
    add_light('Upper_Fill', 'AREA', (0.0, -3.4, 6.4), 150.0, '#ffdcb6', size=4,
              target=(0, 2.0, 5.2))
    add_light('Roof_Fill', 'AREA', (2.2, -4.2, 9.6), 300.0, '#ffe0bf', size=5,
              target=(0.6, 1.6, 8.4))


# ------------------------------------------------------------------- camera
def build_cameras():
    cen = (0.0, 1.5, -1.5)
    rig = bpy.data.objects.new('Camera_Orbit', None)
    bpy.context.scene.collection.objects.link(rig)
    rig.location = cen
    rig.empty_display_size = 2.0

    cd = bpy.data.cameras.new('Cam_Main')
    cd.lens = 48
    cam = bpy.data.objects.new('Cam_Main', cd)
    bpy.context.scene.collection.objects.link(cam)
    cam.parent = rig
    cam.location = (22.0, -66.0, 8.0)
    c = cam.constraints.new('TRACK_TO')
    c.target = rig
    c.track_axis = 'TRACK_NEGATIVE_Z'
    c.up_axis = 'UP_Y'
    bpy.context.scene.camera = cam
    return rig, cam


def build_extra_cams():
    shots = {
        'Cam_Gate': ((0.0, -23.0, 6.0), (0.0, -6.5, 4.2), 38),
        'Cam_Hall': ((1.75, -6.4, 3.35), (-0.15, 1.8, 2.35), 28),
        'Cam_Tower': ((-10.5, -6.5, 7.5), (-4.3, 3.3, 6.4), 42),
        'Cam_Side': ((20.0, -12.0, 8.0), (1.0, 2.0, 5.0), 55),
        'Cam_Top': ((2.0, -9.0, 26.0), (0.0, 1.0, 0.0), 45),
        'Cam_Far': ((-32.0, -42.0, 14.0), (0.0, 1.0, 0.5), 58),
        'Cam_Folk': ((4.9, -7.0, 11.0), (0.8, 1.5, 8.5), 90),
        'Cam_Prince': ((3.6, -6.2, 10.8), (0.95, 1.35, 8.5), 110),
        'Cam_Court': ((-2.0, -4.6, 2.6), (0.2, 1.9, 2.4), 28),
        'Cam_Island': ((30.0, -46.0, -2.0), (0.0, 0.0, -3.0), 48),
    }
    out = {}
    for name, (loc, tgt, lens) in shots.items():
        cd = bpy.data.cameras.new(name)
        cd.lens = lens
        ob = bpy.data.objects.new(name, cd)
        bpy.context.scene.collection.objects.link(ob)
        ob.location = loc
        t = bpy.data.objects.new(name + '_T', None)
        bpy.context.scene.collection.objects.link(t)
        t.location = tgt
        c = ob.constraints.new('TRACK_TO')
        c.target = t
        c.track_axis = 'TRACK_NEGATIVE_Z'
        c.up_axis = 'UP_Y'
        out[name] = ob
    return out


# ------------------------------------------------------------------- render
def setup_render(samples=48, res=(1600, 1200)):
    sc = bpy.context.scene
    for eng in ('BLENDER_EEVEE_NEXT', 'BLENDER_EEVEE'):
        try:
            sc.render.engine = eng
            break
        except Exception:
            continue
    sc.render.resolution_x, sc.render.resolution_y = res
    sc.render.resolution_percentage = 100
    sc.render.film_transparent = False
    sc.render.image_settings.file_format = 'PNG'
    try:
        sc.eevee.taa_render_samples = samples
        sc.eevee.use_gtao = True
    except Exception:
        pass
    for attr, val in (('use_raytracing', True), ('use_shadows', True),
                      ('shadow_ray_count', 2), ('use_volumetric_lights', True)):
        try:
            setattr(sc.eevee, attr, val)
        except Exception:
            pass
    try:
        sc.view_settings.view_transform = 'AgX'
        sc.view_settings.look = 'AgX - Punchy'
    except Exception:
        try:
            sc.view_settings.view_transform = 'Filmic'
        except Exception:
            pass
    try:
        sc.view_settings.exposure = 0.55
    except Exception:
        pass
    # world: subtle ambient so shadows are not pitch black
    w = bpy.data.worlds.new('Env_World')
    w.use_nodes = True
    bg = w.node_tree.nodes.get('Background')
    if bg:
        bg.inputs['Color'].default_value = (*H('#4a4f78'), 1.0)
        bg.inputs['Strength'].default_value = 0.50
    sc.world = w
    return sc
