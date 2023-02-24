import Commands from "./commands";
import { Instruction, IntructionArgument } from "./instruction";

class VM {
    private pc: number = 0;
    private memory: Map<number, string | undefined>;
    private readonly program: Instruction[];
    private readonly instSet: Commands;

    constructor(program: Instruction[], instSet: Commands) {
        this.memory = new Map();
        this.program = program;
        this.instSet = instSet;
    }

    public run(stdout: string) {
        while (this.pc < this.program.length) {
            let inst = this.program[this.pc];

            switch (inst.operation) {
                case this.instSet.print: {
                    this.expectNArgs(1, inst.args, "print")
                    let val = this.getFinalValue(inst.args[0]);
                    stdout += `${val}\n`;
                } break;
            }
        }
    }

    private expectNArgs(n: number, args: any[], s: string) {
        if (n != args.length) {
            throw Error(`Expected ${n} argument(s) for the ${s} instruction but ${args.length} where given.`);
        }
    }

    private getFinalValue(val: IntructionArgument): string | number {
        if (typeof val === 'number') {
            let v = this.memory.get(val);
            if (typeof v === 'undefined') {
                // This cant really happen, but still...
                throw Error(`Value @${val} is not an actual value (line: ${this.pc+1}}!`);
            }

            return val;
        }

        return val;
    }
}
