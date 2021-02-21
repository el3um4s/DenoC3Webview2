import { Context, helpers } from "../deps.ts";
import { APIParams, Results } from "../lib/interface.ts";
import { choose } from "../lib/utils.ts";

export function message(ctx: Context) {
  const results: Results = {
    results: "",
    ok: false,
    operation: "",
    a: "",
    b: "",
  };
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
}

function randomMessage(): string {
  const message: string = choose(
    "Hello world",
    "Hola món",
    "Hallo Welt",
    "Bonjour le monde",
    "Ciao Mondo",
  );
  return message;
}
