import { Context } from "./context";
import { IntructionArgument } from "./instruction"

export type CommandFunction = (a: IntructionArgument[], c: Context) => void;
export default interface Commands {
    print:     string;
    input:     string;

    while:     string;
    endWhile:  string;

    increment: string;
    decrement: string;
}
