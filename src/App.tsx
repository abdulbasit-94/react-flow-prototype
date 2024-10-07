import './App.css';
// import ReactFlow from './components/ReactFlow';
// import SceneFlow from './components/SceneFlow';
// import WorkFlow from './components/WorkFlow';
import {
  ReactFlowProvider
} from '@xyflow/react';
import WorkFlow from './components/WorkFlow';
// import TextureNode from './components/TextureNode';
// import JsonFormater from './components/';
// import JsonEditor from './components/JsonEditor';

function App() {
  return (
    <ReactFlowProvider>
      <WorkFlow />
      {/* <TextureNode /> */}
    </ReactFlowProvider>
  )
}

export default App
