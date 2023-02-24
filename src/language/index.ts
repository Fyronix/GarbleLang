import { Context } from "./context";
import { Parser } from "./parser";
import { VM } from "./vm";

export class GarbleLang {
    public readonly ctx: Context;

    constructor() {
        // TODO: instruction already defined!
        this.ctx = new Context();
    }

    public run(sourceCode: string, stdout: (v: string) => void) {
        try {
            let parser = new Parser(sourceCode);
            let nodes = parser.parse();

            let vm = new VM(nodes, this.ctx.commands);
            vm.run(stdout);
        } catch (e: any) {
            stdout(`<span style="color: red;">${e.message}</span>`)
        }
    }
}
