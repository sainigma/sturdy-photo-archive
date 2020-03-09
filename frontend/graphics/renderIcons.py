import bpy
import os
scene  = bpy.context.scene

icons = [
    'null',
    'edit',
    'view',
    'close',
    'angledown',
    'angleup',
    'angleright',
    'angleleft',
    'back',
    'hamburger',
    'key',
    'upload',
    'user',
    'arrowup',
]
output='//output/'
filetype='.png'

filemap = [[i+1,name+filetype] for i,name in enumerate(icons)]


for file in filemap:
    scene.frame_set(file[0])
    scene.render.filepath = os.path.join(output, file[1])
    bpy.ops.render.render(write_still=True)