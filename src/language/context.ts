import { makeid } from "../utils";
import Commands from "./commands";
import { condBrInstr, decrInstr, gotoInstr, incrInstr, inputInstr, labelInstr, printInstr } from "./instructions";

export class Context {
    public readonly commands: Commands;

    constructor() {
        // TODO: already defined instructions
        this.commands = {
            print: [makeid(), printInstr],
            input: [makeid(), inputInstr],
            
            label: [makeid(), labelInstr],
            goto: [makeid(), gotoInstr],
            condBr: [makeid(), condBrInstr],
            
            increment: [makeid(), incrInstr],
            decrement: [makeid(), decrInstr],
        }
    }
}
