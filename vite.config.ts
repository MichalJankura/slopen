import { defineConfig, Plugin, loadEnv } from 'vite';
import { createHash } from 'crypto';
import react from '@vitejs/plugin-react';

// Simple dev-only proxy to call Google Places Web Service from the server side (avoids CORS + keeps key off client).
// Usage: create a .env (NOT committed) with GOOGLE_API_KEY=your_key. We intentionally do NOT expose it via VITE_ prefix.
// Endpoints provided while running `vite dev`:
//   /api/places/find?q=QUERY -> { status, place_id? }
//   /api/places/details?place_id=PLACE_ID -> { status, result? }
// This is lightweight and only for local development; for production deploy a proper backend / edge function with caching.
function googlePlacesProxy(): Plugin {
  let resolvedKey: string | undefined;
  return {
    name: 'google-places-proxy',
    configureServer(server) {
      // Attempt to resolve key once server is ready
      const allEnvCandidates = [
        process.env.GOOGLE_API_KEY,
        server.config.env?.GOOGLE_API_KEY,
        process.env.VITE_GOOGLE_API_KEY,
        server.config.env?.VITE_GOOGLE_API_KEY,
      ].filter(Boolean) as string[];
      resolvedKey = allEnvCandidates[0];
      // Basic debug log (dev only)
      console.log('[google-places-proxy] Env keys present:', {
        hasGOOGLE_API_KEY: !!process.env.GOOGLE_API_KEY,
        hasVITE_GOOGLE_API_KEY: !!process.env.VITE_GOOGLE_API_KEY,
        resolvedKeyLength: resolvedKey?.length,
      });

      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        if (!req.url.startsWith('/api/places/')) return next();

        const apiKey = resolvedKey || process.env.GOOGLE_API_KEY || process.env.VITE_GOOGLE_API_KEY;
        if (!apiKey || apiKey.trim().length === 0) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ERROR', message: 'Missing GOOGLE_API_KEY in .env' }));
          return;
        }

        try {
          const urlObj = new URL(req.url, 'http://localhost');
          if (urlObj.pathname === '/api/places/find') {
            const q = urlObj.searchParams.get('q') || '';
            if (!q) {
              res.statusCode = 400;
              res.end(JSON.stringify({ status: 'ERROR', message: 'Missing q param' }));
              return;
            }
            const gp = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json');
            gp.searchParams.set('input', q);
            gp.searchParams.set('inputtype', 'textquery');
            gp.searchParams.set('fields', 'place_id');
            gp.searchParams.set('key', apiKey);
            const upstream = await fetch(gp, { headers: { 'Accept': 'application/json' } }).catch(e => {
              throw new Error('Upstream fetch failed: ' + e.message);
            });
            const data = await upstream.json();
            const place_id = data?.candidates?.[0]?.place_id;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: data.status, place_id }));
            return;
          }
          if (urlObj.pathname === '/api/places/details') {
            const placeId = urlObj.searchParams.get('place_id');
            if (!placeId) {
              res.statusCode = 400;
              res.end(JSON.stringify({ status: 'ERROR', message: 'Missing place_id param' }));
              return;
            }
            const gp = new URL('https://maps.googleapis.com/maps/api/place/details/json');
            gp.searchParams.set('place_id', placeId);
            gp.searchParams.set('fields', 'name,rating,user_ratings_total');
            gp.searchParams.set('key', apiKey);
            const upstream = await fetch(gp, { headers: { 'Accept': 'application/json' } }).catch(e => {
              throw new Error('Upstream fetch failed: ' + e.message);
            });
            const data = await upstream.json();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: data.status, result: data.result }));
            return;
          }
          // Not matched
          next();
        } catch (e: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ERROR', message: e?.message || 'Proxy error' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Accept SECRET_WORD or VITE_SECRET_WORD (only hash is exposed to client)
  const secretRaw = (env.SECRET_WORD || env.VITE_SECRET_WORD || '').trim().toLowerCase();
  const secretHash = secretRaw ? createHash('sha256').update(secretRaw).digest('hex') : '';
  // FNV-1a 32-bit fallback for insecure contexts without SubtleCrypto
  const fnv1a = (s: string) => {
    let h = 0x811c9dc5 >>> 0;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      // multiply by FNV prime 16777619 (0x01000193) in 32-bit space
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(16).padStart(8, '0');
  };
  const secretFNV32 = secretRaw ? fnv1a(secretRaw) : '';
  return {
    plugins: [react(), googlePlacesProxy()],
    define: {
      // Only the hash is exposed to the client
      __SECRET_WORD_SHA256__: JSON.stringify(secretHash),
      __SECRET_WORD_FNV32__: JSON.stringify(secretFNV32),
    },
    server: {
    host: '0.0.0.0',
    port: 5176,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4181,
    strictPort: true,
  },
  build: {
    target: 'es2019',
    cssMinify: true,
    sourcemap: false,
  },
  };
});
