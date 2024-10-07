import React, { useEffect, useState } from 'react';
import { Handle, Position, useEdges, useReactFlow } from '@xyflow/react';
import RangeInput from '../RangeInput';

// const allowedValues = [256, 512, 2048, 4096];

// const allowedValues = [256, 512, 2048, 4096]; // Predefined allowed values

function CollisionNode({ data, id }: NodeProps) {
    const { updateNodeData, getNodes, setNodes } = useReactFlow();
    const [selectedValue, setSelectedValue] = useState<number>(2048);

    useEffect(() => {
        updateValue(selectedValue);
    }, [])

    useEffect(() => {
        if (selectedValue) {
            updateValue(selectedValue);
        }
    }, [selectedValue])

    const updateValue = (newValue) => {
        const nodes = getNodes();
        const configNode = nodes.filter(node => node.id === 'config')[0];
        console.log('configNode => ', configNode)
        const newGeometryData = { ...configNode?.data?.configJson.collision, max_polycount: parseInt(newValue) };
        updateNodeData('config', { configJson: { ...configNode?.data?.configJson, collision: newGeometryData } });
    } 

    const handleDelete = (nodeId: string) => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId))
        const nodes = getNodes();
        const configNode = nodes.filter(node => node.id === 'config')[0];
        updateNodeData('config', { configJson: { ...configNode?.data?.configJson, collision: {} } });
    }

    return (
        <div>
            <Handle type="target" position={Position.Top} />
            <RangeInput
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                minValue={0}
                maxValue={4096}
                step={100}
                handleDelete={() => handleDelete(id)}
                title="Max Polycount"
            />
        </div>
    );
};

export default CollisionNode;