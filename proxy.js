import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Target server URL
const targetServer = "http://129.154.227.35:43210";

// Proxy handler
const handler = async (req: Request): Promise<Response> => {
  try {
    // Construct new URL based on incoming request path
    const url = new URL(req.url);
    const targetUrl = `${targetServer}${url.pathname}`;

    // Fetch the response from the target server
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
    });

    // Return response from target server
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error("Error proxying request:", error);
    return new Response("Failed to connect to target server", { status: 502 });
  }
};

// Start the server
serve(handler, { port: 8080 });
