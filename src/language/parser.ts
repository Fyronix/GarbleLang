import { Instruction } from "./instruction";

export class Parser {
  private sourceCode: string;
  private lineNumber = 0;

  constructor(sourceCode: string) {
    this.sourceCode = sourceCode;
  }

  public parse(): Instruction[] {
    const instructions: Instruction[] = [];
    const lines = this.sourceCode.split("\n");

    for (const line of lines) {
      this.lineNumber++;

      if (line.trim().startsWith("%")) {
        continue;
      }

      try {
        const instruction = this.parseInstruction(line.trim());
        instructions.push(instruction);
      } catch (error) {
        throw new Error(`Error on line ${this.lineNumber}: ${error.message}`);
      }
    }

    return instructions;
  }

  private parseInstruction(line: string): Instruction {
    const [operation, argString, addressString] = line.split(" ");

    if (!operation || !argString) {
      throw new Error("Invalid instruction declaration");
    }

    if (!operation.endsWith(";")) {
      throw new Error("Expected ';' after the operation");
    }

    const args = this.parseArguments(argString);
    const address = this.parseAddress(addressString);

    return {
      operation: operation.slice(0, -1),
      args,
      address,
    };
  }

  private parseArguments(argString: string): (string | number)[] {
    const trimmedArgString = argString.trim();
    if (!trimmedArgString.startsWith("[") || !trimmedArgString.endsWith("]")) {
      throw new Error("Invalid argument format");
    }

    const argList = trimmedArgString
      .slice(1, -1)
      .split(",")
      .map((arg) => arg.trim());

    if (argList.length === 1 && argList[0] === "") {
      return [];
    }

    return argList.map((arg) => {
      if (arg.startsWith("@")) {
        const address = parseInt(arg.slice(1));
        if (isNaN(address)) {
          throw new Error("Invalid address reference");
        }
        return address;
      } else {
        const decodedArg = atob(arg);
        return isNaN(+decodedArg) ? decodedArg : +decodedArg;
      }
    });
  }

  private parseAddress(addressString: string): number | undefined {
    if (!addressString) {
      return undefined;
    }

    if (addressString.startsWith("@")) {
      const referencedAddress = parseInt(addressString.slice(1));
      if (isNaN(referencedAddress)) {
        throw new Error("Invalid address reference");
      }
      return referencedAddress;
    } else {
      const address = parseInt(addressString);
      if (isNaN(address)) {
        throw new Error("Invalid address");
      }
      return address;
    }
  }
}
