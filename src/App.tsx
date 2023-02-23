import { useEffect, useRef, useState } from 'react'
import { AppWrapper } from './appStyles'
import Button from './components/Button';
import {CodeEditor} from './components/CodeEditor'
import { OutputScreen } from './components/OutputScreen';
import { GarbleLang } from './language';

const DEFAULT_CODE = `% Hello, world! Type something and click "Run" to execute`;
var compiler = new GarbleLang();

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
        <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          <Button style={{ float: 'right', margin: '17px 2px' }}>Compile and Execute</Button>
        </div>
        <div>
          Language Specs:
          <div>
            <ul>
              <li>Print Instruction: <u>{compiler.ctx.commands.print[0]}</u></li>
              <li>Input Instruction: <u>{compiler.ctx.commands.input[0]}</u></li>
              <li>Label Creation: <u>{compiler.ctx.commands.label[0]}</u></li>
              <li>Goto Instruction: <u>{compiler.ctx.commands.goto[0]}</u></li>
              <li>Conditional goto: <u>{compiler.ctx.commands.condBr[0]}</u></li>
              <li>Increment: <u>{compiler.ctx.commands.increment[0]}</u></li>
              <li>Decrement: <u>{compiler.ctx.commands.decrement[0]}</u></li>
            </ul>
          </div>
        </div>
      </div>
    </AppWrapper>
  )
}

export default App
