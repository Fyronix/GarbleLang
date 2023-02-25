import { Context } from "./context";
import { Parser } from "./parser";
import { VM } from "./vm";

export class GarbleLang {
    public readonly ctx: Context;

    constructor() {
        // TODO: instruction already defined!
        this.ctx = new Context();
    }

    public run(sourceCode: string, stdout: (i: string, v: string) => void) {
        const changeOutput = (s: string) => stdout("output", s);
        stdout("resetOutput", "");

        try {
            let parser = new Parser(sourceCode);
            let nodes = parser.parse();

            let vm = new VM(nodes, this.ctx.commands);
            vm.run(changeOutput);
        } catch (e: any) {
            changeOutput(`<br/><span style="color: red;">${e.message}</span>`)
        }
    }
}
