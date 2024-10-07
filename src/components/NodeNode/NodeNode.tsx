import React, { useState, useEffect, memo } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react'; // Import NodeProps from ReactFlow

function NodeNode({ data, id }: NodeProps) {
    const { updateNodeData, getNodes, setNodes } = useReactFlow();

    const [key, setKey] = useState(data.key || ''); // Initialize with data.key if available
    const [value, setValue] = useState(data.value || ''); // Initialize with data.value if available

    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newKey = event.target.value;
        setKey(newKey);

        // If the key is empty, clear out any associated data
        if (newKey === "") {
            updateNodeData(id, { [key]: undefined }); // Remove the old key's value
        } else {
            updateNodeData(id, { [newKey]: value }); // Use the new key
        }
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);

        // Update the node data immediately when the value changes
        if (key) {
            updateNodeData(id, { [key]: newValue }); // Use the existing key, update the value
        }

        const nodes = getNodes();
        const configNode = nodes.filter(node => node.id === 'config')[0];
        console.log('configNode => ', configNode)
        const newNodesData = { ...configNode?.data?.configJson.nodes, [key]: newValue };
        updateNodeData('config', { configJson: { ...configNode?.data?.configJson, nodes: newNodesData } });
    };

    const handleDelete = (nodeId: string) => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId))
        const nodes = getNodes();
        const configNode = nodes.filter(node => node.id === 'config')[0];
        const nodesData = { ...configNode?.data?.configJson.nodes };
        delete nodesData[key];
        updateNodeData('config', { configJson: { ...configNode?.data?.configJson, nodes: nodesData } });
    }

    return (
        <div className='config-node'>
            <div className='input-group'>
                <input
                    type='text'
                    value={key}
                    onChange={handleKeyChange}
                    placeholder='Key'
                    className='input-key'
                />
                :
                <input
                    type='text'
                    value={value}
                    onChange={handleValueChange}
                    placeholder='Value'
                    disabled={!key} // Disable if the key is not filled
                />
                <button onClick={() => handleDelete(id)}>X</button>
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default memo(NodeNode);