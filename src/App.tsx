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
      <div style={{ width: '50%', height: '100vh' }}>
        <CodeEditor code={code} onChange={onChange}  />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          <Button style={{ float: 'right', margin: '17px 2px' }}>Compile and Execute</Button>
        </div>
      </div>
      <div style={{ width: 'calc(50% - 4rem)', marginLeft: '3rem' }}>
        <OutputScreen output={output}></OutputScreen>
        <div>
          <table border={1}>
            <thead>
              <th>Instruction</th>
              <th>Identification</th>
              <th>Arguments</th>
              <th>Description</th>
            </thead>

            <tr>
              <td>Print Inst.</td>
              <td>{compiler.ctx.commands.print}</td>
              <td>[String] | [Number] | [Adress containing a value]</td>
              <td>Append a value to the output. (no return value)</td>
            </tr>
            <tr>
              <td>Input Inst.</td>
              <td>{compiler.ctx.commands.input}</td>
              <td></td>
              <td>Get a string from the input.</td>
            </tr>

            <tr>
              <td>While</td>
              <td>{compiler.ctx.commands.while}</td>
              <td>Value with number</td>
              <td>Iterate until the number hits "0"</td>
            </tr>
            <tr>
              <td>End while loop</td>
              <td>{compiler.ctx.commands.endWhile}</td>
              <td>No arguments</td>
              <td>It's a marker for where the while loop ends</td>
            </tr>
            <tr>
              <td>Increment Inst.</td>
              <td>{compiler.ctx.commands.increment}</td>
              <td>[Number] | [Adress containing a value]</td>
              <td>Increment a value by 1.</td>
            </tr>
            <tr>
              <td>Decrement Inst.</td>
              <td>{compiler.ctx.commands.decrement}</td>
              <td>[Number] | [Adress containing a value]</td>
              <td>Decrement a value by 1.</td>
            </tr>
          </table>
        </div>
      </div>
    </AppWrapper>
  )
}

export default App
