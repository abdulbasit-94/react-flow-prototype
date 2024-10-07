import { useEffect, useState } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { Config } from '../ConfigNode/types';
import SelectBox from '../SelectBox';

// const allowedValues = [256, 512, 2048, 4096];

const TEXTURE_MAX_SIZES = [256, 512, 2048, 4096]; // Predefined allowed values

function TextureNode(props: NodeProps) {
    const { id, dragging } = props;
    const { updateNodeData, getNodes, setNodes } = useReactFlow();
    const [selectedValue, setSelectedValue] = useState<number>(TEXTURE_MAX_SIZES[0]);

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
        <div className={`custom-node ${dragging ? 'dragging' : ''}`}>
            <Handle type="source" position={Position.Top} className="drag-handle" />
            {/* <RangeInput selectedValue={selectedValue} setSelectedValue={setSelectedValue} allowedValues={allowedValues} handleDelete={() => handleDelete(id)} title="Max Size" isDisabled={true} /> */}
            {/* <p>Max Size:</p> */}
            <SelectBox selectedValue={selectedValue} options={TEXTURE_MAX_SIZES} onChange={setSelectedValue} handleDelete={() => handleDelete(id)} title="Max Size"  />
        </div>
    );
};

export default TextureNode;