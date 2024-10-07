import { Handle, NodeProps, Position } from '@xyflow/react'; // Import NodeProps from ReactFlow
import "./style.css";
import CopyIcon from '../../assets/copy.svg';

function ConfigNode(props: NodeProps) {
  const { data: { configJson } } = props;
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(configJson));
  }
  return (
    <>
      <div className={`config-node custom-node main-config-node`}>
        <label htmlFor="text"><span>Config JSON:</span> <button className='close-btn' onClick={handleCopy}><img src={CopyIcon} alt="copy" /></button></label>
        <div className='json-wrapper'>
          <pre>{JSON.stringify(configJson, null, 2)}</pre>
        </div> {/* Pretty print the JSON */}
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </>
  );
}

export default ConfigNode;