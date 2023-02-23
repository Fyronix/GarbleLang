import { useState } from 'react'
import { AppWrapper } from './appStyles'
import Button from './components/Button';
import {CodeEditor} from './components/CodeEditor'
import { OutputScreen } from './components/OutputScreen';

const DEFAULT_CODE = `% Hello, world! Type something and click "Run" to execute`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");

  const onChange = (action: string, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      case "output": {
        setOutput(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  return (
    <AppWrapper>
      <CodeEditor code={code} onChange={onChange}  />
      <div style={{ width: 'calc(40% - 4rem)', marginLeft: '3rem' }}>
        <OutputScreen output={output}></OutputScreen>
        <Button style={{ float: 'right', margin: '17px 2px' }}>Compile and Execute</Button>
      </div>
    </AppWrapper>
  )
}

export default App
