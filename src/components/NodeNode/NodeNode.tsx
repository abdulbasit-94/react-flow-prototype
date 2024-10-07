import React, { useState, memo } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react'; // Import NodeProps from ReactFlow
import { Config } from '../ConfigNode/types';

function NodeNode({ data, id }: NodeProps) {
    const { updateNodeData, getNodes, setNodes } = useReactFlow();

    const [key, setKey] = useState<string>(typeof data.key === 'string' ? data.key : '');
    const [value, setValue] = useState<string>(typeof data.value === 'string' ? data.value : '');

    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newKey = event.target.value;
        setKey(newKey);

        if (newKey === "") {
            // Remove the old key's value
            updateNodeData(id, { [key]: undefined } as Record<string, unknown>);
        } else {
            // Update node data with the new key-value pair
            updateNodeData(id, { [newKey]: value } as Record<string, unknown>);
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
        const configNode = nodes.find(node => node.id === 'config');
    
        if (!configNode) {
            console.error('Config node not found!');
            return;
        }
    
        // Safely cast configNode.data.configJson to ConfigJson
        const configJson = configNode.data?.configJson as Config || {};
    
        // Safely access nodes, providing an empty object if it doesn't exist
        const newNodesData = { ...configJson.nodes, [key]: newValue };
    
        // Update node data with the new nodes data
        updateNodeData('config', {
            configJson: { ...configJson, nodes: newNodesData },
        });
    };
    
    const handleDelete = (nodeId: string) => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
    
        const nodes = getNodes();
        const configNode = nodes.find(node => node.id === 'config');
    
        if (!configNode) {
            console.error('Config node not found!');
            return;
        }
    
        // Safely cast configJson to ConfigJson
        const configJson = configNode.data?.configJson as Config || {};
    
        // Safely access nodes
        const nodesData = { ...configJson.nodes };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        delete nodesData[key];
    
        // Update node data with the updated nodes data
        updateNodeData('config', {
            configJson: { ...configJson, nodes: nodesData },
        });
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