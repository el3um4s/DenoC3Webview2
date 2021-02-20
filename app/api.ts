import { helpers, Router } from "./deps.ts";
import { calc, sanitizeParam, randomOperation, randomMessage } from "./lib/utils.ts";
import { APIParams, Results } from "./lib/interface.ts";

export const controller = new AbortController();
export const api = new Router();

api.get("/close", (context) => {
  context.response.body = "Bye!";
  controller.abort();
});

api.get("/", (ctx) => {
  const results: Results = { results: "", ok: false, operation: "", a: "", b: "" };
  const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
  if (params?.first && params?.second) {
    console.log(`/${params.first} ${params.second}`);
    results.results = `${params.first} ${params.second}`;
    results.ok = true;
  } else {
    const message: string = randomMessage();
      console.log(`/${message}`);
    results.results = `${message}`;
    results.ok = true;
  }
  ctx.response.body = results;
});

api.get("/random-operation", (ctx) => {
  console.log("/random-operation");
  const param: APIParams = helpers.getQuery(ctx, { mergeParams: true });
  const operation: string = randomOperation();

  const results: Results = {
    results: "",
    ok: false,
    operation,
    a: sanitizeParam(param.a),
    b: sanitizeParam(param.b),
  };

  if (param?.a && param?.b ) {
    const result: number = calc({ operation, a: param.a, b: param.b });
    results.results = `${result}`;
    results.ok = true;
  }
  ctx.response.body = results;
});

api.get("/calc/:operation/", (ctx) => {
  console.log("/calc/:operation/");
  const param: APIParams = helpers.getQuery(ctx, { mergeParams: true });
  const operation:string = sanitizeParam(param.operation);
 
  const results: Results = {
    results: "",
    ok: false,
    operation,
    a: sanitizeParam(param.a),
    b: sanitizeParam(param.b),
  };
  
  if (param?.a && param?.b ) {
    const result: number = calc({ operation, a: param.a, b: param.b });
    results.results = `${result}`;
    results.ok = true;
  }
  
  ctx.response.body = results;
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
