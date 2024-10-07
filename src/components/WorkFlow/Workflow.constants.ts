import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
    {
        id: 'config',
        data: {
            configJson: {
                "texture": {
                    // "max_size": 4096
                },
                "scene": {
                    // "is_gallery": 0,
                    // "artwork_node_count": 2,
                    // "gallery_node_count": 4
                },
                "nodes": {
                    // "start": "start",
                    // "armature": "Armature",
                    // "env": "Env",
                    // "collision": "collision",
                    // "geometry": "geometry"
                },
                "geometry": {
                    // "max_polycount": 30000
                },
                "collision": {
                    // "max_polycount": 64
                }
            }
        },
        position: { x: 0, y: -100 },
        type: 'configNode'
    },
    {
        id: 'add_scene_btn_id',
        data: {
        },
        position: { x: 300, y: 150 },
        type: 'AddSceneBtnNode',
    },
    {
        id: 'add_node_btn_id',
        data: {
        },
        position: { x: -170, y: 150 },
        type: 'AddNodesBtnNode',
    },
    {
        id: 'add_texture_btn_id',
        data: {
        },
        position: { x: -150, y: 350 },
        type: 'AddTextureBtn',
    },
    {
        id: 'add_geometry_btn_id',
        data: {
        },
        position: { x: 250, y: 350 },
        type: 'AddGeometryBtn',
    },
    {
        id: 'add_collision_btn_id',
        data: {
        },
        position: { x: 50, y: 420 },
        type: 'AddCollisionBtn',
    },

]

export const initialEdges: Edge[] = [
    {
        id: 'config-add_scene_btn_id',
        source: 'config',
        target: 'add_scene_btn_id',
        animated: true
    },
    {
        id: 'config-add_node_btn_id',
        source: 'add_node_btn_id',
        target: 'config',
        animated: true
    },
    {
        id: 'config-add_texture_btn_id',
        source: 'add_texture_btn_id',
        target: 'config',
        animated: true
    },
    {
        id: 'config-add_geometry_btn_id',
        source: 'config',
        target: 'add_geometry_btn_id',
        animated: true
    },
    {
        id: 'config-add_collision_btn_id',
        source: 'config',
        target: 'add_collision_btn_id',
        animated: true
    },
    
]