import React, { useState, useEffect, memo } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react'; // Import NodeProps from ReactFlow
import './style.css'; // Ensure you include your styles

function SceneNode({ data, id }: NodeProps) {
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
        const newSceneData = { ...configNode?.data?.configJson.scene, [key]: parseInt(newValue) };
        console.log('newSceneData => ', newSceneData);
        updateNodeData('config', { configJson: { ...configNode?.data?.configJson, scene: newSceneData } });
    };

    const handleDelete = (nodeId: string) => {

        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId))
        const nodes = getNodes();
        const configNode = nodes.filter(node => node.id === 'config')[0];
        const sceneData = { ...configNode?.data?.configJson.scene };
        delete sceneData[key];
        updateNodeData('config', { configJson: { ...configNode?.data?.configJson, scene: sceneData } });

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
                    type='number'
                    value={value}
                    onChange={handleValueChange}
                    placeholder='Value'
                    disabled={!key} // Disable if the key is not filled
                />
                <button onClick={() => handleDelete(id)}>X</button>
            </div>
            <Handle type="target" position={Position.Left} />
        </div>
    );
}

export default memo(SceneNode);