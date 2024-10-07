import React, { useState, memo } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react'; // Import NodeProps from ReactFlow
import './style.css'; // Ensure you include your styles
import { Config } from '../ConfigNode/types';

function SceneNode({ data, id }: NodeProps) {
    const { updateNodeData, getNodes, setNodes } = useReactFlow();

    const [key, setKey] = useState<string>(typeof data.key === 'string' ? data.key : ''); // Initialize with data.key if available
    const [value, setValue] = useState<string>(typeof data.value === 'string' ? data.value : ''); // Initialize with data.value if available

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

        // Update node data immediately when the value changes
        if (key) {
            updateNodeData(id, { [key]: newValue }); // Use the existing key, update the value
        }

        const nodes = getNodes();
        const configNode = nodes.find(node => node.id === 'config');

        if (configNode && configNode.data?.configJson) {
            const configJson = configNode.data.configJson as Config; // Assert the type of configJson
            const newSceneData = {
                ...(configJson.scene || {}), // Initialize with an empty object if scene is undefined
                [key]: parseInt(newValue) // Safely assign the value
            };

            console.log('newSceneData => ', newSceneData);
            updateNodeData('config', {
                configJson: {
                    ...configJson,
                    scene: newSceneData // Update the scene data
                }
            });
        }
    };

    const handleDelete = (nodeId: string) => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));

        const nodes = getNodes();
        const configNode = nodes.find(node => node.id === 'config');

        if (configNode && configNode.data?.configJson) {
            const configJson = configNode.data.configJson as Config; // Assert the type of configJson
            const sceneData = { ...(configJson.scene || {}) }; // Initialize with an empty object if scene is undefined

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete sceneData[key]; // Safely delete the dynamic key

            updateNodeData('config', {
                configJson: {
                    ...configJson,
                    scene: sceneData // Update the scene data after deletion
                }
            });
        }
    };

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