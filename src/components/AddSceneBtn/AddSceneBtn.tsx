import { Handle, NodeProps, useReactFlow, Position } from '@xyflow/react';
import { Edge } from '@xyflow/react';

function Controls({ id }: NodeProps & { onDataChange: (id: string, data: { key: string; value: string }) => void }) {
    // const [nodeCount, setNodeCount] = useState(1);
    
    const { setNodes, setEdges, getNodes } = useReactFlow();
    //   const textNodes = nodesData.filter(isTextNode);

    const handleAddScene = () => {
        const newNodeId = `${Date.now()}`;
        // const length = getNodes().length;
        const length = getNodes().filter(node => node.type === 'SceneNode').length;
        setNodes(previousNodes => [
            ...previousNodes,
            {
                id: newNodeId,
                data: {}, // Pass initial empty data
                type: 'SceneNode',
                position: { x: 450, y: 100 * (length - 1) },
                parentNode: id,
            },
        ]);

        setEdges(previousEdges => [
            ...previousEdges,
            {
                id: `edge-${id}-${newNodeId}`,
                target: newNodeId,
                source: id,
                animated: true,
                parentNode: id
            } as Edge,
        ]);

        // setNodeCount(prev => prev + 1);
    };


    return (
        <>
            <button className='button button-blue' onClick={handleAddScene}>Scene +</button>
            <Handle type="source" position={Position.Right} />
            <Handle type="target" position={Position.Left} />
        </>
    );
}

export default Controls;