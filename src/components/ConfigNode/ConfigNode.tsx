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
import { Handle, NodeProps, Position, useHandleConnections, useNodesData } from '@xyflow/react'; // Import NodeProps from ReactFlow
import "./style.css";

function ConfigNode({ data: { configJson } }: NodeProps) {

  const connections = useHandleConnections({
        type: 'target',
      });
      const nodesData = useNodesData<unknown>(
        connections.map((connection) => connection.target),
      );
      const nodesData2 = useNodesData<unknown>(
        connections.map((connection) => connection.source),
      );

      console.log('nodesData => ', nodesData, nodesData2);

  return (
    <>
      <div className='config-node'>
        <label htmlFor="text">Config JSON:</label>
        <pre>{JSON.stringify(configJson, null, 2)}</pre> {/* Pretty print the JSON */}
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </>
  );
}

export default ConfigNode;