import { Handle, NodeProps, useReactFlow, Position, useHandleConnections, useNodesData } from '@xyflow/react';
import { useEffect, useState } from 'react';
// import './style.css';
import { Node, Edge } from '@xyflow/react';

function AddTextureBtn({ data, id }: NodeProps) {
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
                    position: { x: -187, y: 500 },
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