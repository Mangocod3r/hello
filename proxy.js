import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const IP = "129.154.227.35";
const PORT = "43210"; // change above IP PORT ONLY 

async function handler(req) {
  const url = req.url;
  const body = await req.text();
  const path = url.substring(url.indexOf('.dev') + 4);
  const method = req.method;

  return await fetch(`http://${IP}:${PORT}${path}`, {
    method: req.method,
    body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
    headers: new Headers(req.headers),
  });
}

serve(handler);
