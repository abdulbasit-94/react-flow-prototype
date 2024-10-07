// Type for texture object
type Texture = {
    max_size: 256 | 512 | 2048 | 4096;  // must be one of these values
};

// Type for scene object
type Scene = {
    is_gallery: number;  // assuming 0 or 1 for boolean-like values
    artwork_node_count: number;
    gallery_node_count: number;
};

// Type for nodes object
type Nodes = {
    start: string;
    armature: string;
    env: string;
    collision: string;
    geometry: string;
};

// Type for geometry object
type Geometry = {
    max_polycount: number;  // integer, must not exceed 1,000,000
};

// Type for collision object
type Collision = {
    max_polycount: number;  // integer, must not exceed 4096
};

// Final Config type
type Config = {
    texture?: Texture;       // texture is optional
    scene?: Scene;           // scene is optional
    nodes?: Nodes;           // nodes is optional
    geometry?: Geometry;     // geometry is optional
    collision?: Collision;   // collision is optional
}


export interface IConfigNode {
    configJson: Config;
}