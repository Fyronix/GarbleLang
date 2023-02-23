
export type IntructionArgument = string;

export interface Instruction {
    operation: string;
    args: IntructionArgument[];
    address: number;
}
