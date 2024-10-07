import { useEffect, useState } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import RangeInput from '../RangeInput';
import { Config } from '../ConfigNode/types';

// const allowedValues = [256, 512, 2048, 4096];

const allowedValues = [256, 512, 2048, 4096]; // Predefined allowed values

function TextureNode({ id }: NodeProps) {
    const { updateNodeData, getNodes, setNodes } = useReactFlow();
    const [selectedValue, setSelectedValue] = useState<number>(allowedValues[0]);

    useEffect(() => {
        updateValue(selectedValue.toString()); // Convert number to string
    }, []);

    useEffect(() => {
        if (selectedValue) {
            updateValue(selectedValue.toString()); // Convert number to string
        }
    }, [selectedValue]);

    const updateValue = (newValue: string) => {
        const nodes = getNodes();
        const configNode = nodes.find(node => node.id === 'config');
        console.log('configNode => ', configNode);
    
        // Ensure configNode and its properties are defined
        if (configNode && configNode.data?.configJson) {
            const configJson = configNode.data.configJson as Config; // Type assertion
            const newTextureData = {
                ...(configJson.texture || {}), // Safely access texture, default to an empty object
                max_size: parseInt(newValue)
            };
    
            updateNodeData('config', {
                configJson: {
                    ...configJson,
                    texture: newTextureData
                }
            });
        }
    };
    
    const handleDelete = (nodeId: string) => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
        const nodes = getNodes();
        const configNode = nodes.find(node => node.id === 'config');
    
        // Ensure configNode and its properties are defined
        if (configNode && configNode.data?.configJson) {
            const configJson = configNode.data.configJson as Config; // Type assertion
    
            updateNodeData('config', {
                configJson: {
                    ...configJson,
                    texture: {} // Safely set texture to an empty object
                }
            });
        }
    };

    return (
        <div>
            <Handle type="source" position={Position.Top} />
            <RangeInput selectedValue={selectedValue} setSelectedValue={setSelectedValue} allowedValues={allowedValues} handleDelete={() => handleDelete(id)} title="Max Size" isDisabled={true} />
        </div>
    );
};

export default TextureNode;