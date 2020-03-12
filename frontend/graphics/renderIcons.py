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
    'keybutton',
    'upload',
    'userbutton',
    'arrowup',
    'thumbsup',
    'map-marker',
    'user',
    'users',
    'tag',
    'tags',
    'file',
    'save',
    'mail',
    'calendar',
    'options',
    'key',
    'fist',
]
output='//output/'
filetype='.png'

filemap = [[i+1,name+filetype] for i,name in enumerate(icons)]


for file in filemap:
    scene.frame_set(file[0])
    scene.render.filepath = os.path.join(output, file[1])
    bpy.ops.render.render(write_still=True)