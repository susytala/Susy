export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve index.html for root
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const response = await env.ASSETS.fetch(request);
      const html = await response.text();
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Security-Policy': "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
