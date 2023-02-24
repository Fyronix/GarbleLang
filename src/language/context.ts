import { makeid } from "../utils";
import Commands from "./commands";

export class Context {
    public readonly commands: Commands;

    constructor() {
        // TODO: already defined instructions
        this.commands = {
            print: makeid(),
            input: makeid(),

            while: makeid(),
            endWhile: makeid(),

            increment: makeid(),
            decrement: makeid(),
        }
    }
}
