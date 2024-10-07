import { Handle, NodeProps, useReactFlow, Position } from '@xyflow/react';
import { Edge } from '@xyflow/react';

function AddCollisionBtn({ id }: NodeProps) {
    const { setNodes, setEdges, getNodes } = useReactFlow();

    const handleAddCollision = () => {
        const length = getNodes().filter(node => node.type === 'CollisionNode').length;
        if(length === 0) {
            const newNodeId = `${Date.now()}`;
            setNodes(previousNodes => [
                ...previousNodes,
                {
                    id: newNodeId,
                    data: {}, // Pass initial empty data
                    type: 'CollisionNode',
                    position: { x: 17, y: 570 },
                    parentNode: id,
                    dragHandle: '.drag-handle'
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
        }

        // setNodeCount(prev => prev + 1);
    };


    return (
        <>
            <button className='button button-blue' onClick={handleAddCollision}>Set Collision</button>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
}

export default AddCollisionBtn;