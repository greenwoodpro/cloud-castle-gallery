import bpy
for o in list(bpy.data.objects):
    if o.name.startswith('MidCloud'):
        bpy.data.objects.remove(o, do_unlink=True)
print('midcloud removed')
