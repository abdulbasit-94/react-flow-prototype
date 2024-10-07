/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    addEdge,
    Background,
    Connection,
    Controls,
    Edge,
    ReactFlow,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';
import { initialEdges, initialNodes } from './Workflow.constants';
import AddSceneBtnNode from '../AddSceneBtn/AddSceneBtn';
import AddNodesBtnNode from '../AddNodesBtn';
import NodeNode from '../NodeNode';
import ConfigNode from '../ConfigNode';
import SceneNode from '../SceneNode';
import AddTextureBtn from '../AddTextureBtn';
import TextureNode from '../TextureNode';
import AddGeometryBtn from '../AddGeometryBtn';
import GeometryNode from '../GeometryNode';
import AddCollisionBtn from '../AddCollisionBtn';
import CollisionNode from '../CollisionNode';

const nodeTypes = {
    'configNode': ConfigNode,
    'AddSceneBtnNode': AddSceneBtnNode,
    'SceneNode': SceneNode,
    'AddNodesBtnNode': AddNodesBtnNode,
    'NodeNode': NodeNode,
    'AddTextureBtn': AddTextureBtn,
    'TextureNode': TextureNode,
    'AddGeometryBtn': AddGeometryBtn,
    'GeometryNode': GeometryNode,
    'AddCollisionBtn': AddCollisionBtn,
    'CollisionNode': CollisionNode,
}

const SceneFlow = () => {
    // @ts-ignore
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection: Connection) => {
        const edge = {...connection, animated: true}
        setEdges((previousEdges: Edge[]) => addEdge(edge, previousEdges));
    }, [setEdges])

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {/* @ts-expect-error */}
            <ReactFlow nodes={nodes} edges={edges} fitView onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default SceneFlow;