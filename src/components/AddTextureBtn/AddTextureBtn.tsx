import { Handle, NodeProps, useReactFlow, Position } from '@xyflow/react';
import { Edge } from '@xyflow/react';

function AddTextureBtn({ id }: NodeProps) {
    const { setNodes, setEdges, getNodes } = useReactFlow();

    const handleAddTexture = () => {
        const length = getNodes().filter(node => node.type === 'TextureNode').length;
        if(length === 0) {
            const newNodeId = `${Date.now()}`;
            setNodes(previousNodes => [
                ...previousNodes,
                {
                    id: newNodeId,
                    data: {}, // Pass initial empty data
                    type: 'TextureNode',
                    position: { x: -200, y: 500 },
                    parentNode: id,
                    dragHandle: '.drag-handle'
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
        }

        // setNodeCount(prev => prev + 1);
    };


    return (
        <>
            <button className='button button-blue' onClick={handleAddTexture}>Set Texture</button>
            <Handle type="source" position={Position.Top} />
            <Handle type="target" position={Position.Bottom} />
        </>
    );
}

export default AddTextureBtn;