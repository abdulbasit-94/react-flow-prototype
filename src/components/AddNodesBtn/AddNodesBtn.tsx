import { Handle, NodeProps, useReactFlow, Position } from '@xyflow/react';
import { Edge } from '@xyflow/react';

function AddNodesBtn({ id }: NodeProps) {
    const { setNodes, setEdges, getNodes } = useReactFlow();

    const handleAddNode = () => {
        const newNodeId = `${Date.now()}`;
        const length = getNodes().filter(node => node.type === 'NodeNode').length;
        setNodes(previousNodes => [
            ...previousNodes,
            {
                id: newNodeId,
                data: {}, // Pass initial empty data
                type: 'NodeNode',
                position: { x: -560, y: 100 * (length - 1) },
                parentNode: id,
            },
        ]);

        setEdges(previousEdges => [
            ...previousEdges,
            {
                id: `edge-${id}-${newNodeId}`,
                target: id,
                source: newNodeId,
                animated: true,
                parentNode: id
            } as Edge,
        ]);

        // setNodeCount(prev => prev + 1);
    };


    return (
        <>
            <button className='button button-blue' onClick={handleAddNode}>Node +</button>
            <Handle type="source" position={Position.Right} />
            <Handle type="target" position={Position.Left} />
        </>
    );
}

export default AddNodesBtn;