import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";

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
  console.log(`websocket server is running on :8082`);
});

console.log(`Deno.cwd() `, Deno.cwd());

const { signal } = controller;
app.listen({
  port: port,
  signal,
});

Deno.run({ cmd: ["./wv.exe"] });

for await (const req of serve(`:8082`)) {
  const { conn, r: bufReader, w: bufWriter, headers } = req;
  acceptWebSocket({
    conn,
    bufReader,
    bufWriter,
    headers,
  })
    .then(handleWs)
    .catch(async (e) => {
      console.error(`failed to accept websocket: ${e}`);
      await req.respond({ status: 400 });
    });
}


async function handleWs(sock: WebSocket): Promise<void> {
  console.log("socket connected!");
  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        // text message
        console.log("ws:Text", ev);
        await sock.send("FROM DENO: " + ev + " HELLO WORLD");
      } else if (isWebSocketCloseEvent(ev)) {
        // close
        const { code, reason } = ev;
        console.log("ws:Close", code, reason);
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);

    if (!sock.isClosed) {
      await sock.close(1000).catch(console.error);
    }
  }
}



