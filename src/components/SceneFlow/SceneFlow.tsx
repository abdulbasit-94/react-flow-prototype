import {
    addEdge,
    Background,
    Connection,
    Controls,
    Edge,
    MiniMap,
    Node,
    ReactFlow,
    useEdgesState,
    useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';

const initialNodes: Node[] = [
    {
        id: '1',
        data: {
            label: 'Node 1',
        },
        position: { x: 0, y: 0 }
    },
    {
        id: '2',
        data: {
            label: 'Node 2',
        },
        position: { x: 100, y: 100 }
    },
    {
        id: '3',
        data: {
            label: 'Node 3',
        },
        position: { x: 100, y: 200 }
    },
]

const initialEdges: Edge[] = [
    {
        id: '1-2',
        source: '1',
        target: '2',
        animated: true
    }
]

const SceneFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection: Connection) => {
        const edge = {...connection, animated: true}
        setEdges((previousEdges: Edge[]) => addEdge(edge, previousEdges));
    }, [setEdges])

    // const onConnect = useCallback(
    //     (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    //     [setEdges],
    // );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges} fitView onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}>
                <Background />
                <Controls />
                {/* <MiniMap /> */}
            </ReactFlow>
        </div>
    )
}

export default SceneFlow;