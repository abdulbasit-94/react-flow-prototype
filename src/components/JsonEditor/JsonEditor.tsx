/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SetStateAction, useState } from 'react';
// @ts-expect-error
import { JsonEditor as Editor } from 'jsoneditor-react';
import "./style.css";
// import 'jsoneditor-react/es/editor.min.css';

const Example = () => {
  const [json, setJson] = useState({ name: 'John', age: 30 });

  console.log('json => ', json);

  return (
    <Editor
      value={json}
      onChange={(updatedJson: SetStateAction<{ name: string; age: number; }>) => setJson(updatedJson)}
      mode="code" // Change mode to code for a text-like editor
      history={false} // Disable history
      navigationBar={false} // Hide the navigation bar
      enableSort={false} // Disable sorting
      enableEdit={true} // Allow editing
      enableAdd={false} // Disable adding new properties
      enableDelete={false} // Disable deleting properties
      indentation={2} // Set indentation for better readability
      schema={{}} // Optional: Disable schema if you don't need it
    />
  );
};

export default Example;