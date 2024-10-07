import React, { useEffect, useState } from 'react';
import { Handle, Position, useEdges, useReactFlow } from '@xyflow/react';
import RangeInput from '../RangeInput';

// const allowedValues = [256, 512, 2048, 4096];

const allowedValues = [256, 512, 2048, 4096]; // Predefined allowed values

function TextureNode({ data, id }: NodeProps) {
    const { updateNodeData, getNodes, setNodes } = useReactFlow();
    const [selectedValue, setSelectedValue] = useState<number>(allowedValues[0]);

    useEffect(() => {
        updateValue(selectedValue);
    }, [])

    useEffect(() => {
        if(selectedValue) {
            updateValue(selectedValue);
        }
    }, [selectedValue])

    const updateValue = (newValue) => {
        const nodes = getNodes();
        const configNode = nodes.filter(node => node.id === 'config')[0];
        console.log('configNode => ', configNode)
        const newTextureData = { ...configNode?.data?.configJson.texture, max_size: parseInt(newValue) };
        updateNodeData('config', { configJson: { ...configNode?.data?.configJson, texture: newTextureData } });
    }

    const handleDelete = (nodeId: string) => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId))
        const nodes = getNodes();
        const configNode = nodes.filter(node => node.id === 'config')[0];
        updateNodeData('config', { configJson: { ...configNode?.data?.configJson, texture: {} } });
    }

    return (
        <div>
            <Handle type="source" position={Position.Top} />
            <RangeInput selectedValue={selectedValue} setSelectedValue={setSelectedValue} allowedValues={allowedValues} handleDelete={() => handleDelete(id)} title="Max Size" isDisabled={true} />
        </div>
    );
};

export default TextureNode;