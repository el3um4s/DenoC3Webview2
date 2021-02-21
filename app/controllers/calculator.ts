import { helpers, Context } from "../deps.ts";
import { APIParams, APIcalculator, Results } from "../lib/interface.ts";
import * as utils from "../lib/utils.ts";

export function randomOperation (ctx: Context) {
    console.log("/random-operation");
    const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
    const paramWithoutOperation: APIcalculator = sanitizeParams(params);
    const param = addOperation(chooseRandomOperation(), paramWithoutOperation);
    const results: Results = calculate(param);
    ctx.response.body = results;
}

export function calc (ctx: Context) {
    console.log("/calc/:operation/");
    const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
    const param: APIcalculator = sanitizeParams(params);
    const results: Results = calculate(param);
    ctx.response.body = results;
}

export function addition (ctx: Context)  {
    console.log("/addition/");
    const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
    const paramWithoutOperation: APIcalculator = sanitizeParams(params);
    const param = addOperation("addition", paramWithoutOperation);
    const results: Results = calculate(param);
    ctx.response.body = results;
  }

  export function subtraction (ctx: Context)  {
    console.log("/subtraction/");
    const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
    const paramWithoutOperation: APIcalculator = sanitizeParams(params);
    const param = addOperation("subtraction", paramWithoutOperation);
    const results: Results = calculate(param);
    ctx.response.body = results;
  }

  export function multiplication (ctx: Context)  {
    console.log("/multiplication/");
    const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
    const paramWithoutOperation: APIcalculator = sanitizeParams(params);
    const param = addOperation("multiplication", paramWithoutOperation);
    const results: Results = calculate(param);
    ctx.response.body = results;
  }

  export function division (ctx: Context)  {
    console.log("/division/");
    const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
    const paramWithoutOperation: APIcalculator = sanitizeParams(params);
    const param = addOperation("division", paramWithoutOperation);
    const results: Results = calculate(param);
    ctx.response.body = results;
  }

  export function remainder (ctx: Context)  {
    console.log("/remainder/");
    const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
    const paramWithoutOperation: APIcalculator = sanitizeParams(params);
    const param = addOperation("remainder", paramWithoutOperation);
    const results: Results = calculate(param);
    ctx.response.body = results;
  }

  export function exponent (ctx: Context)  {
    console.log("/exponent/");
    const params: APIParams = helpers.getQuery(ctx, { mergeParams: true });
    const paramWithoutOperation: APIcalculator = sanitizeParams(params);
    const param = addOperation("exponent", paramWithoutOperation);
    const results: Results = calculate(param);
    ctx.response.body = results;
  }




function addOperation(operation:string, param: APIcalculator): APIcalculator {
    const result: APIcalculator = {...param};
    result.operationPresent = true;
    result.operation = operation;
    return result;
}

function chooseRandomOperation () : string {
    const operation:string = utils.choose(
      "addition",
      "subtraction",
      "multiplication",
      "division",
      "remainder",
      "exponent",
    );
    return operation;
  }

  function calculate(param: APIcalculator): Results {
    const results: Results = {
        results: "",
        ok: false,
        operation: param.operation,
        a: param.a,
        b: param.b,
      };

      if (param.aPresent && param.bPresent && param.operationPresent ) {
        const result: number = utils.calc({ operation: param.operation, a: param.a, b: param.b });
        results.results = `${result}`;
        results.ok = true;
      }
    
    return results;
}

function sanitizeParams(param: APIParams): APIcalculator{
    // TODO: check operation name
    const operationPresent = utils.paramIsString(param.operation);
    const operation = utils.sanitizeParam(param.operation);
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
        b
    };
    return result;
}
