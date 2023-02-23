import { Context } from "./context";
import { IntructionArgument } from "./instruction"

export type CommandFunction = (a: IntructionArgument, c: Context) => void;
export default interface Commands {
    print:     [n: string, f: CommandFunction];
    input:     [n: string, f: CommandFunction];
    
    label:     [n: string, f: CommandFunction];
    goto:      [n: string, f: CommandFunction];
    
    condBr:    [n: string, f: CommandFunction];
    
    increment: [n: string, f: CommandFunction];
    decrement: [n: string, f: CommandFunction];
}
