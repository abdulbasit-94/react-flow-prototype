import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the configJson state
interface Texture {
    max_size: number;
}

interface Scene {
    [key: string]: any; // Use 'any' or a more specific type depending on your needs
}

interface Nodes {
    [key: string]: string; // Adjust this type based on your expected keys and values
}

interface Geometry {
    max_polycount: number;
}

interface Collision {
    max_polycount: number;
}

interface ConfigJson {
    texture: Texture;
    scene: Scene;
    nodes: Nodes;
    geometry: Geometry;
    collision: Collision;
}

// Define the context type
interface ConfigJsonContextType {
    configJson: ConfigJson;
    setTexture: (texture: Texture) => void;
    setScene: (scene: Scene) => void;
    setNodes: (nodes: Nodes) => void;
    setGeometry: (geometry: Geometry) => void;
    setCollision: (collision: Collision) => void;
    clearConfig: () => void;
}

// Create the context
const ConfigJsonContext = createContext<ConfigJsonContextType | undefined>(undefined);

// Define the provider component
export const ConfigJsonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [configJson, setConfigJson] = useState<ConfigJson>({
        texture: { max_size: 4096 },
        scene: {
            // Initialize with your default values
        },
        nodes: {
            start: 'start',
            armature: 'Armature',
            env: 'Env',
            collision: 'collision',
            geometry: 'geometry',
        },
        geometry: { max_polycount: 30000 },
        collision: { max_polycount: 64 },
    });

    const setTexture = (texture: Texture) => {
        setConfigJson((prevConfig) => ({
            ...prevConfig,
            texture,
        }));
    };

    const setScene = (scene: Scene) => {
        setConfigJson((prevConfig) => ({
            ...prevConfig,
            scene,
        }));
    };

    const setNodes = (nodes: Nodes) => {
        setConfigJson((prevConfig) => ({
            ...prevConfig,
            nodes: { ...prevConfig.nodes, ...nodes },
        }));
    };

    const setGeometry = (geometry: Geometry) => {
        setConfigJson((prevConfig) => ({
            ...prevConfig,
            geometry,
        }));
    };

    const setCollision = (collision: Collision) => {
        setConfigJson((prevConfig) => ({
            ...prevConfig,
            collision,
        }));
    };

    const clearConfig = () => {
        setConfigJson({
            texture: { max_size: 4096 },
            scene: {},
            nodes: {
                start: 'start',
                armature: 'Armature',
                env: 'Env',
                collision: 'collision',
                geometry: 'geometry',
            },
            geometry: { max_polycount: 30000 },
            collision: { max_polycount: 64 },
        });
    };

    return (
        <ConfigJsonContext.Provider
            value={{ configJson, setTexture, setScene, setNodes, setGeometry, setCollision, clearConfig }}
        >
            {children}
        </ConfigJsonContext.Provider>
    );
};

// Custom hook to use the ConfigJson context
export const useConfigJson = () => {
    const context = useContext(ConfigJsonContext);
    if (!context) {
        throw new Error('useConfigJson must be used within a ConfigJsonProvider');
    }
    return context;
};