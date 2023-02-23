interface Instruction {
    operation: string;
    args: string[];
    address: number;
}

class Parser {
    private sourceCode: string;
    private lineNumber: number;

    constructor(sourceCode: string) {
        this.sourceCode = sourceCode;
        this.lineNumber = 0;
    }

    parse(): Instruction[] {
        const instructions: Instruction[] = [];

        // Split the source code into separate lines
        const lines = this.sourceCode.split("\n");

        // Parse each line
        for (const line of lines) {
            this.lineNumber++;

            // Skip comments
            if (line.trim().startsWith("%")) {
                continue;
            }

            // Parse the instruction
            const instruction = this.parseInstruction(line.trim());

            // Add the instruction to the list
            instructions.push(instruction);
        }

        return instructions;
    }

    private parseInstruction(line: string): Instruction {
        // Extract the operation name and arguments
        const [operation, argString, addressString] = line.split(" ");
        const args = this.parseArguments(argString);
        const address = this.parseAddress(addressString);

        // Create the instruction object
        const instruction: Instruction = {
            operation,
            args,
            address,
        };

        return instruction;
    }

    private parseArguments(argString: string): string[] {
        // Remove the brackets and split the arguments
        const argList = argString.slice(1, -1).split(",");

        // Decode each argument from base64
        // TODO: if it's an adress, make it a custom type, not string
        const decodedArgs = argList.map((arg) =>
            arg.startsWith("@") ? arg : atob(arg.trim())
        );

        return decodedArgs;
    }

    private parseAddress(addressString: string): number {
        if (!addressString) {
            // TODO: optional adress
            throw new Error(
                `Error on line ${this.lineNumber}: Missing address`
            );
        }

        if (addressString.startsWith("@")) {
            // Reference to another instruction's address
            const referencedAddress = parseInt(addressString.slice(1));
            if (isNaN(referencedAddress)) {
                throw new Error(
                    `Error on line ${this.lineNumber}: Invalid address reference`
                );
            }
            return referencedAddress;
        } else {
            // Numeric address
            const address = parseInt(addressString);
            if (isNaN(address)) {
                throw new Error(
                    `Error on line ${this.lineNumber}: Invalid address`
                );
            }
            return address;
        }
    }
}

const sourceCode = `hEUsSj9ZLPz0ZTtT; [dGVzdA==] 1
eM0sFryUTLbJjN7V; [@1] 2`;

const parser = new Parser(sourceCode);
const instructions = parser.parse();

console.log(instructions);
