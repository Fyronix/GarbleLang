import { useState } from 'react'
import { AppWrapper } from './appStyles'
import {CodeEditor} from './components/CodeEditor'

const DEFAULT_CODE = `% Hello, world! Type something and click "Run" to execute`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);

  const onChange = (action: string, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
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
    </AppWrapper>
  )
}

export default App
