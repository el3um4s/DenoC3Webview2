import { Context, helpers } from "../deps.ts";
import { APIcalculator, APIParams, Results } from "../lib/interface.ts";
import * as utils from "../lib/utils.ts";

const operationList: Array<string> = [
  "addition",
  "subtraction",
  "multiplication",
  "division",
  "remainder",
  "exponent",
];

export function randomOperation(ctx: Context) {
  console.log("/random-operation");
  const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
  const paramWithoutOperation: APIcalculator = sanitizeParams(params);
  const param = addOperation(chooseRandomOperation(), paramWithoutOperation);
  const results: Results = calculateFromAPIcalculator(param);
  ctx.response.body = results;
}

export function calc(ctx: Context) {
  console.log("/calc/:operation/");
  const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
  const param: APIcalculator = sanitizeParams(params);
  const results: Results = calculateFromAPIcalculator(param);
  ctx.response.body = results;
}

export function addition(ctx: Context) {
  const results: Results = calculateFromContextWithOperation(ctx, "addition");
  ctx.response.body = results;
}

export function subtraction(ctx: Context) {
  const results: Results = calculateFromContextWithOperation(
    ctx,
    "subtraction",
  );
  ctx.response.body = results;
}

export function multiplication(ctx: Context) {
  const results: Results = calculateFromContextWithOperation(
    ctx,
    "multiplication",
  );
  ctx.response.body = results;
}

export function division(ctx: Context) {
  const results: Results = calculateFromContextWithOperation(ctx, "division");
  ctx.response.body = results;
}

export function remainder(ctx: Context) {
  const results: Results = calculateFromContextWithOperation(ctx, "remainder");
  ctx.response.body = results;
}

export function exponent(ctx: Context) {
  const results: Results = calculateFromContextWithOperation(ctx, "exponent");
  ctx.response.body = results;
}

function addOperation(operation: string, param: APIcalculator): APIcalculator {
  const result: APIcalculator = { ...param };
  result.operationPresent = checkOperationName(operation);
  result.operation = operation;
  return result;
}

function chooseRandomOperation(): string {
  const operation: string = utils.choose(...operationList);
  return operation;
}

export function calculateFromContextWithOperation(
  ctx: Context,
  operation: string,
): Results {
  console.log(`/${operation}`);
  const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
  const paramWithoutOperation: APIcalculator = sanitizeParams(params);
  const param = addOperation(operation, paramWithoutOperation);
  const results: Results = calculateFromAPIcalculator(param);
  return results;
}

function calculateFromAPIcalculator(param: APIcalculator): Results {
  const results: Results = {
    results: "",
    ok: false,
    operation: param.operation,
    a: param.a,
    b: param.b,
  };

  if (param.aPresent && param.bPresent && param.operationPresent) {
    const result: number = utils.calc({
      operation: param.operation,
      a: param.a,
      b: param.b,
    });
    results.results = `${result}`;
    results.ok = true;
  }

  return results;
}

function sanitizeParams(param: APIParams): APIcalculator {
  let operationPresent = utils.paramIsString(param.operation);
  const operation = utils.sanitizeParam(param.operation);
  operationPresent = checkOperationName(operation);
  const aPresent = utils.paramIsString(param.a);
  const a = utils.sanitizeParam(param.a);
  const bPresent = utils.paramIsString(param.b);
  const b = utils.sanitizeParam(param.b);
  const result: APIcalculator = {
    operationPresent,
    operation,
    aPresent,
    a,
    bPresent,
    b,
  };
  return result;
}

function checkOperationName(operation: string): boolean {
  const result: boolean = operationList.includes(operation);
  return result;
}
