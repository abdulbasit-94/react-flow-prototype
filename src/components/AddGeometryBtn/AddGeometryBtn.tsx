import { Handle, NodeProps, useReactFlow, Position, useHandleConnections, useNodesData } from '@xyflow/react';
import { useEffect, useState } from 'react';
import { Edge } from '@xyflow/react';

function AddGeometryBtn({ data, id }: NodeProps) {
    const { setNodes, setEdges, getNodes } = useReactFlow();

    const handleAddGeometry = () => {
        const length = getNodes().filter(node => node.type === 'GeometryNode').length;
        if(length === 0) {
            const newNodeId = `${Date.now()}`;
            setNodes(previousNodes => [
                ...previousNodes,
                {
                    id: newNodeId,
                    data: {}, // Pass initial empty data
                    type: 'GeometryNode',
                    position: { x: 220, y: 500 },
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
        }

        // setNodeCount(prev => prev + 1);
    };


    return (
        <>
            <button className='button button-blue' onClick={handleAddGeometry}>Set Geometry</button>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
}

export default AddGeometryBtn;