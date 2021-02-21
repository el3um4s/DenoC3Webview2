import { Application } from "./deps.ts";
import { api, controller } from "./api.ts";

const app = new Application();
const port = 8081;

app.use((ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  return next();
});

app.use(api.routes());
app.use(api.allowedMethods());

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(`Start listening on ${hostname}:${port}`);
});

console.log(`Deno.cwd() `, Deno.cwd());

const { signal } = controller;
app.listen({
  port: port,
  signal,
});

Deno.run({ cmd: ["./wv.exe"] });
