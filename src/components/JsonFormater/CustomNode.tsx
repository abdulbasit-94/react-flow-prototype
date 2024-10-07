import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode: React.FC<any> = ({ data }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '5px', backgroundColor: 'white' }}>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default CustomNode;