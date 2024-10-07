import { useEffect, useState } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import RangeInput from '../RangeInput';


function CollisionNode({ id }: NodeProps) {
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

    const updateConfigNode = (updateFn: (collisionData: unknown) => unknown) => {
        // Get all nodes and find the config node only once
        const nodes = getNodes();
        const configNode = nodes.find(node => node.id === 'config');
    
        if (!configNode) {
            console.error('Config node not found!');
            return;
        }
    
        // Ensure configNode.data and configJson exist and are objects
        const configJson = configNode.data?.configJson && typeof configNode.data.configJson === 'object' 
            ? configNode.data.configJson 
            : {};
    
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const newCollisionData = updateFn(configJson.collision || {});
        
        // Update the node data safely
        const updatedConfigJson = {
            ...configJson,
            collision: newCollisionData
        };
    
        updateNodeData('config', { configJson: updatedConfigJson });
    };
    
    const updateValue = (newValue: number | string) => {
        updateConfigNode((collisionData) => ({
            ...collisionData as object,
            max_polycount: parseInt(newValue as string) || 0 // Ensure valid number parsing
        }));
    };
    
    const handleDelete = (nodeId: string) => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
        
        updateConfigNode(() => ({})); // Clears collision data entirely
    };

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