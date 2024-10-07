import React, { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Node,
  Edge,
  useEdgesState,
  useNodesState,
  addEdge,
  Connection,
} from '@xyflow/react';
import CustomNode from './CustomNode'; // Import your custom node component
import '@xyflow/react/dist/style.css';

const jsonData = {
  texture: {
    max_size: 4096,
  },
  scene: {
    is_gallery: 0,
    artwork_node_count: 2,
    gallery_node_count: 4,
  },
  nodes: {
    start: 'start',
    armature: 'Armature',
    env: 'Env',
    collision: 'collision',
    geometry: 'geometry',
  },
  geometry: {
    max_polycount: 30000,
  },
  collision: {
    max_polycount: 64,
  },
};

const createNodesAndEdges = (data: any): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let nodeId = 0;

  const addNode = (key: string, label: string, position: { x: number; y: number }) => {
    const id = `node_${nodeId++}`;
    nodes.push({ id, type: 'custom', data: { label }, position });
    return id; // Return the ID of the created node
  };

  const traverse = (
    obj: any,
    parentId: string | null = null,
    position: { x: number; y: number } = { x: 0, y: 0 },
    depth: number = 0 // To manage horizontal spacing based on depth
  ) => {
    const totalKeys = Object.keys(obj).length;
    let currentY = position.y;

    Object.keys(obj).forEach((key, index) => {
      const newId = addNode(key, key, { x: position.x * (index + 1), y: currentY * (index + 1) });
      
      if (parentId) {
        // Create an edge from parent to child
        edges.push({ id: `edge_${parentId}_${newId}`, source: parentId, target: newId });
      }

      // If the value is an object, recurse into it
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const childPosition = { x: position.x + 200, y: currentY * (index + 1) };
        traverse(obj[key], newId, childPosition, depth + 1);
      }

      // Increment the Y position for the next sibling node
      currentY += 150; // Adjust this value for more or less spacing
    });
  };

  // Start the traversal from the root of the JSON data
  traverse(data);
  return { nodes, edges };
};

const NodeRenderer: React.FC = () => {
  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(jsonData); // Create nodes and edges from the JSON data
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => {
    const edge = { ...connection, animated: true };
    setEdges((previousEdges: Edge[]) => addEdge(edge, previousEdges));
  }, [setEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ custom: CustomNode }} // Register your custom node type
        style={{ width: '100%', height: '100vh' }}
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default NodeRenderer;