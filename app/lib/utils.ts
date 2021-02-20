export function randomOperation () : string {
  const operation:string = choose(
    "addition",
    "subtraction",
    "multiplication",
    "division",
    "remainder",
    "exponent",
  );
  return operation;
}

export function randomMessage() : string {
  const message: string = choose(
    "Hello world",
    "Hola món",
    "Hallo Welt",
    "Bonjour le monde",
    "Ciao Mondo"
    );
  return message;
}

export function sanitizeParam(param: string | undefined): string {
  const result: string = param ? param : "";
  return result;
}

export function calc ( { operation, a, b }: {operation:string, a:string, b:string}): number {
  const result: number = calculate({ operation, a: parseInt(a), b: parseInt(b) });
  return result;
}

export function calculate( { operation, a, b }: { operation: string; a: number; b: number }): number {
    return match(operation)
      .on((op) => op === "addition", () => a + b)
      .on((op) => op === "subtraction", () => a - b)
      .on((op) => op === "multiplication", () => a * b)
      .on((op) => op === "division", () => a / b)
      .on((op) => op === "remainder", () => a % b)
      .on((op) => op === "exponent", () => a ** b)
      .otherwise((op) => () => 0);
  }
  
 export function choose(...args: string[]): string {
    return args[Math.floor(Math.random() * args.length)];
  }
  
  function matched(x: any) {
    return ({
      on: () => matched(x),
      otherwise: () => x,
    });
  }
  
  function match(x: any) {
    return ({
      on: (
        pred: (arg0: any) => any,
        fn: (arg0: any) => any,
      ) => (pred(x) ? matched(fn(x)) : match(x)),
      otherwise: (fn: (arg0: any) => any) => fn(x),
    });
  }