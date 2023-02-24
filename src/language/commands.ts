import { IntructionArgument } from "./instruction";

export default interface Commands {
    print:     string;
    input:     string;

    while:     string;
    endWhile:  string;

    increment: string;
    decrement: string;
}
