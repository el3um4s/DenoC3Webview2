import { Router, Context } from "./deps.ts";
import * as words from "./controllers/words.ts";
import * as calculator from "./controllers/calculator.ts";

export const controller: AbortController = new AbortController();
export const api: Router = new Router();

api.get("/close", (ctx: Context) => { controller.abort(); });

api.get("/", words.message);
api.get("/random-operation", calculator.randomOperation);
api.get("/calc/:operation/", calculator.calc);
api.get("/addition/", calculator.addition);
api.get("/subtraction/", calculator.subtraction);
api.get("/multiplication/", calculator.multiplication);
api.get("/division/", calculator.division);
api.get("/remainder/", calculator.remainder);
api.get("/exponent/", calculator.exponent);
