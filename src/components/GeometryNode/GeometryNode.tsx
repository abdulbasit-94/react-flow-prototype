import { useEffect, useState } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import RangeInput from '../RangeInput';
import { Config } from '../ConfigNode/types';

function GeometryNode(props: NodeProps) {
    const { id, dragging } = props;
    const { updateNodeData, getNodes, setNodes } = useReactFlow();
    const [selectedValue, setSelectedValue] = useState<number>(500000);

    useEffect(() => {
        updateValue(selectedValue);
    }, [])

    useEffect(() => {
        if (selectedValue) {
            updateValue(selectedValue);
        }
    }, [selectedValue])

    const updateValue = (newValue: string | number) => {
        // Get all nodes and find the config node
        const nodes = getNodes();
        const configNode = nodes.find(node => node.id === 'config');
    
        if (!configNode) {
            console.error('Config node not found!');
            return;
        }
    
        // Safely access configJson and geometry with type checks or fallback
        const configJson = configNode.data?.configJson 
            ? configNode.data.configJson as Config
            : {};
    
        const newGeometryData = {
            ...(configJson.geometry && typeof configJson.geometry === 'object' ? configJson.geometry : {}),
            max_polycount: parseInt(newValue as string),
        };
    
        // Update node data
        updateNodeData('config', {
            configJson: { ...configJson, geometry: newGeometryData },
        });
    };
    
    const handleDelete = (nodeId: string) => {
        // Update nodes state by filtering out the node
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
    
        const nodes = getNodes();
        const configNode = nodes.find(node => node.id === 'config');
    
        if (!configNode) {
            console.error('Config node not found!');
            return;
        }
    
        // Safely access configJson and set geometry to an empty object
        const configJson = configNode.data?.configJson && typeof configNode.data.configJson === 'object'
            ? configNode.data.configJson
            : {};
    
        // Update node data to clear geometry
        updateNodeData('config', {
            configJson: { ...configJson, geometry: {} },
        });
    };

    return (
        <div className={`custom-node ${dragging ? 'dragging' : ''}`}>
            <Handle type="target" position={Position.Top} />
            <RangeInput
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                minValue={0}
                maxValue={1000000}
                // step={100}
                handleDelete={() => handleDelete(id)}
                title="Max Polycount"
            />
        </div>
    );
};

export default GeometryNode;