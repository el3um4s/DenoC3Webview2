import { helpers, Router } from "./deps.ts";

export const controller = new AbortController();
export const api = new Router();

api.get("/", (ctx) => {
  console.log("/");
  const results = { results: "", ok: false };
  const a = helpers.getQuery(ctx, { mergeParams: true });
  console.log(a);
  console.log(ctx.params);
  console.log(a.id, a.message);
  results.results = `${a.id} ${a.message}`;
  results.ok = true;
  ctx.response.body = results;
});

api.get("/close", (context) => {
  context.response.body = "Bye!";
  controller.abort();
});

api.get("/random-operation", (ctx) => {
  console.log("/random-operation");
  const param = helpers.getQuery(ctx, { mergeParams: true });
  const operation: string = choose(
    "addition",
    "subtraction",
    "multiplication",
    "division",
    "remainder",
    "exponent",
  );
  const operator = {
    addition: "+",
    subtraction: "-",
    multiplication: "*",
    division: "/",
    remainder: "%",
    exponent: "**",
  };

  const a: number = parseInt(param.a);
  const b: number = parseInt(param.b);
  const results = { results: "", ok: false, operation, operator, a, b };

  function calc(
    { operation, a, b }: { operation: string; a: number; b: number },
  ) {
    return match(operation)
      .on((op) => op === "addition", () => a + b)
      .on((op) => op === "subtraction", () => a - b)
      .on((op) => op === "multiplication", () => a * b)
      .on((op) => op === "division", () => a / b)
      .on((op) => op === "remainder", () => a % b)
      .on((op) => op === "exponent", () => a ** b)
      .otherwise((op) => () => 0);
  }
  const result = calc({ operation, a, b });
  console.log(result);
  results.results = `${result}`;
  results.ok = true;
  ctx.response.body = results;

  function choose(...args: string[]): string {
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
});

api.get("/addition/", (ctx) => {
  console.log("/addition/");
  const param = helpers.getQuery(ctx, { mergeParams: true });
  const results = {
    results: "",
    ok: false,
    operation: "addition",
    a: param.a,
    b: param.b,
  };
  results.results = `${parseInt(param.a) + parseInt(param.b)}`;
  results.ok = true;
  ctx.response.body = results;
});

api.get("/subtraction/", (ctx) => {
  console.log("/subtraction/");
  const param = helpers.getQuery(ctx, { mergeParams: true });
  const results = {
    results: "",
    ok: false,
    operation: "subtraction",
    a: param.a,
    b: param.b,
  };
  results.results = `${parseInt(param.a) - parseInt(param.b)}`;
  results.ok = true;
  ctx.response.body = results;
});

api.get("/multiplication/", (ctx) => {
  console.log("/multiplication/");
  const param = helpers.getQuery(ctx, { mergeParams: true });
  const results = {
    results: "",
    ok: false,
    operation: "multiplication",
    a: param.a,
    b: param.b,
  };
  results.results = `${parseInt(param.a) * parseInt(param.b)}`;
  results.ok = true;
  ctx.response.body = results;
});

api.get("/division/", (ctx) => {
  console.log("/division/");
  const param = helpers.getQuery(ctx, { mergeParams: true });
  const results = {
    results: "",
    ok: false,
    operation: "division",
    a: param.a,
    b: param.b,
  };
  results.results = `${parseInt(param.a) / parseInt(param.b)}`;
  results.ok = true;
  ctx.response.body = results;
});

api.get("/remainder/", (ctx) => {
  console.log("/remainder/");
  const param = helpers.getQuery(ctx, { mergeParams: true });
  const results = {
    results: "",
    ok: false,
    operation: "remainder",
    a: param.a,
    b: param.b,
  };
  results.results = `${parseInt(param.a) % parseInt(param.b)}`;
  results.ok = true;
  ctx.response.body = results;
});

api.get("/exponent/", (ctx) => {
  console.log("/exponent/");
  const param = helpers.getQuery(ctx, { mergeParams: true });
  const results = {
    results: "",
    ok: false,
    operation: "exponent",
    a: param.a,
    b: param.b,
  };
  results.results = `${parseInt(param.a) ** parseInt(param.b)}`;
  results.ok = true;
  ctx.response.body = results;
});
