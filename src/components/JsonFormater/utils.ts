interface Node {
    id: string;
    type: string;
    data: { label: string };
    position: { x: number; y: number };
}

interface Edge {
    id: string;
    source: string;
    target: string;
}

export const createNodesAndEdges = (data: any): { nodes: Node[]; edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let nodeId = 0;

    const addNode = (key: string, label: string, position: { x: number; y: number }) => {
        const id = `node_${nodeId++}`;
        nodes.push({ id, type: 'custom', data: { label }, position });
        return id; // Return the ID of the created node
    };

    const traverse = (obj: any, parentId: string | null = null, position: { x: number; y: number } = { x: 0, y: 0 }) => {
        Object.keys(obj).forEach((key, index) => {
            const newId = addNode(key, key, { x: position.x, y: position.y + index * 100 });
            if (parentId) {
                edges.push({ id: `edge_${parentId}_${newId}`, source: parentId, target: newId });
            }

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                traverse(obj[key], newId, { x: position.x + 200, y: position.y + index * 100 });
            }
        });
    };

    traverse(data);
    return { nodes, edges };
};