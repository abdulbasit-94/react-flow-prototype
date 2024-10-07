// import React from 'react'
// import { IConfigNode } from './type';

// const ConfigNode: React.FC<IConfigNode> = ({ configJson }) => {
//     return (
//         <div>
//             {JSON.stringify(configJson)}
//         </div>
//     )    
// }

// export default ConfigNode;

// import { useCallback } from 'react';
import { Handle, NodeProps, Position } from '@xyflow/react'; // Import NodeProps from ReactFlow
import "./style.css";

function ConfigNode({ data: { configJson } }: NodeProps) {
  return (
    <>
      <div className='config-node custom-node'>
        <label htmlFor="text">Config JSON:</label>
        <pre>{JSON.stringify(configJson, null, 2)}</pre> {/* Pretty print the JSON */}
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </>
  );
}

export default ConfigNode;