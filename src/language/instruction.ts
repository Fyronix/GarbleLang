
export type IntructionArgument = string | number;

export interface Instruction {
    operation: string;
    args: IntructionArgument[];
    address: number | undefined;
}
