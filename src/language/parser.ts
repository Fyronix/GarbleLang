import { Instruction } from "./instruction";

export class Parser {
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
        let [operation, argString, addressString] = line.split(" ");
        if (typeof operation === 'undefined' || typeof argString === 'undefined') {
            throw Error(`Invalid instruction declaration on line ${this.lineNumber}`);
        }

        const args = this.parseArguments(argString);
        const address = this.parseAddress(addressString);

        operation = operation.trim();
        if (!operation.endsWith(";")) {
            throw Error(`Invalid syntax, expected ';' after the oepration on line ${this.lineNumber}`);
        }

        // Create the instruction object
        const instruction: Instruction = {
            operation: operation.substring(0, operation.length-1),
            args,
            address,
        };

        return instruction;
    }

    private parseArguments(argString: string): (string|number)[] {
        // Remove the brackets and split the arguments
        const argList = argString.slice(1, -1).trim().split(",");

        // Decode each argument from base64
        // TODO: if it's an adress, make it a custom type, not string
        const decodedArgs = argList.map((arg) =>
            arg.startsWith("@") ? parseInt(arg.substring(1, arg.length)) : atob(arg.trim())
        );

        if (decodedArgs.length == 1 && decodedArgs[0] === "") {
            return []
        }

        return decodedArgs;
    }

    private parseAddress(addressString: string): number | undefined {
        if (!addressString) {
            // TODO: optional adress
            return undefined;
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
