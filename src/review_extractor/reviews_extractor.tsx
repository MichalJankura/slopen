import React, { useCallback, useEffect, useRef, useState } from 'react';

// IMPORTANT: Move your API key to a Vite env variable (VITE_GOOGLE_API_KEY) – do NOT hard‑code secrets in the repo.
// Create a .env file with: VITE_GOOGLE_API_KEY=your_key_here
// In dev we use a local proxy (vite dev middleware). In production (static hosting) that proxy does NOT exist.
// We therefore use the Google Maps JavaScript PlacesService (which is CORS-safe) instead of Web Service fetch calls.
// Provide BOTH keys locally if desired: GOOGLE_API_KEY (server side) and VITE_GOOGLE_API_KEY (browser key restricted by HTTP referrer).
const BROWSER_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string | undefined;
const USE_PROXY = import.meta.env.DEV; // proxy only present during `vite dev`.
const CLIENT_KEY_PRESENT = !!BROWSER_KEY;

// --- Google Maps JS SDK loader (used only in production fallback) -----------------
let gmapsLoading: Promise<void> | null = null;
function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if ((window as any).google && (window as any).google.maps) return Promise.resolve();
  if (gmapsLoading) return gmapsLoading;
  gmapsLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=sk`;
    script.async = true;
    script.onerror = () => reject(new Error('Failed to load Google Maps JS SDK'));
    (script.onload as any) = () => resolve();
    document.head.appendChild(script);
  });
  return gmapsLoading;
}

// Original raw URLs list
const RAW_URLS = [
    "https://www.google.com/maps/search/?api=1&query=Bistro%20%C5%A0telka",
    "https://www.google.com/maps/search/?api=1&query=Castle%20DISTILLERY",
    "https://www.google.com/maps/place/Marianna/@49.2996626,20.6853231,17z/data=!4m10!1m2!2m1!1zQ3VrcsOhcmXFiCBNYXJpYW5uYQ",
    "https://www.google.com/maps/search/?api=1&query=Damask%20Kebab",
    "https://www.google.com/maps/search/?api=1&query=E%C4%8CKO%20Bar",
    "https://www.google.com/maps/search/?api=1&query=Chaluj%20Burger%20%26%20Beer",
    "https://www.google.com/maps/place/Kebabing/@49.3019611,20.6908742,17z",
    "https://www.google.com/maps/search/?api=1&query=Motorest%20Sala%C5%A1%20u%20Franka",
    "https://www.google.com/maps/search/?api=1&query=Na%C5%A1a%20k%C3%A1va",
    "https://www.google.com/maps/place/Penzi%C3%B3n+Koliba/@49.3062612,20.6932143,17z",
    "https://www.google.com/maps/search/?api=1&query=PH%E1%BB%9E%20%C4%90%C3%8AM%20Star%C3%A1%20%C4%BDubov%C5%88a",
    "https://www.google.com/maps/search/?api=1&query=Piv%C3%A1re%C5%88%20Nept%C3%BAn",
    "https://www.google.com/maps/search/?api=1&query=Pizza%20Palma",
    "https://www.google.com/maps/search/?api=1&query=Pizzeria%20Da%20Fofo",
    "https://www.google.com/maps/search/?api=1&query=Re%C5%A1taur%C3%A1cia%20Kolk%C3%A1re%C5%88",
    "https://www.google.com/maps/search/?api=1&query=Re%C5%A1taur%C3%A1cia%20Panorama",
    "https://www.google.com/maps/place/Re%C5%A1taur%C3%A1cia+Shang+Hai/@49.2992977,20.6852435,16.44z/data=!4m10!1m2!2m1!1sRe%C5%A1taur%C3%A1cia+Shang+Hai!3m6!1s0x473e12a825417139:0x625c132fc2645ea6!8m2!3d49.3013149!4d20.6893426!15sChZSZcWhdGF1csOhY2lhIFNoYW5naGFpWhgiFnJlxaF0YXVyw6FjaWEgc2hhbmdoYWmSARJjaGluZXNlX3Jlc3RhdXJhbnSaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUTJkM015VGw5QlJSQUKqAVsQASoaIhZyZcWhdGF1csOhY2lhIHNoYW5naGFpKEQyHxABIhviNESWCau3_jiA-Og7a3hUXaONxd_8dNR6GVkyGhACIhZyZcWhdGF1csOhY2lhIHNoYW5naGFp4AEA-gEECAAQPQ!16s%2Fg%2F1z44b9hdd?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    "https://www.google.com/maps/search/?api=1&query=SO%C5%A0KA%20-%20coffee-market-beauty",
    "https://www.google.com/maps/search/?api=1&query=%C5%A0%C3%ADpka%20Klub",
    "https://www.google.com/maps/search/?api=1&query=%C5%A0RC%20Kaviare%C5%88",
    "https://www.google.com/maps/place/Tenisov%C3%BD+Klub+Star%C3%A1+%C4%BDubov%C5%88a,+S.r.o./@49.3078326,20.6789012,17z/data=!4m10!1m2!2m1!1zVGVuaXNvdsO9IEtsdWIgU3RhcsOhIMS9dWJvdsWIYSBTcG9ydCBCYXI!3m6!1s0x473e0d59539c0ea3:0x4a7f7cca0e7acd11!8m2!3d49.3078326!4d20.6836648!15sCilUZW5pc292w70gS2x1YiBTdGFyw6EgxL11Ym92xYhhIFNwb3J0IEJhclorIil0ZW5pc292w70ga2x1YiBzdGFyw6EgxL51Ym92xYhhIHNwb3J0IGJhcpIBCnJlc3RhdXJhbnSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblRVTjNOa3hEZGxKbkVBRaoBgQEQASotIil0ZW5pc292w70ga2x1YiBzdGFyw6EgxL51Ym92xYhhIHNwb3J0IGJhcihEMh8QASIb3W4x9ZYzlhiuAptPAVdumB506KqFY8XVcLjJMi0QAiIpdGVuaXNvdsO9IGtsdWIgc3RhcsOhIMS-dWJvdsWIYSBzcG9ydCBiYXLgAQD6AQQIABAM!16s%2Fg%2F12mkvnhts?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    "https://www.google.com/maps/place/U+Jele%C5%88a/@49.301869,20.6854971,17z/data=!4m13!1m2!2m1!1zVSBKZWxlxYhh!3m9!1s0x473e0d57d7acfe07:0x635c91fdf3a739e!5m2!4m1!1i2!8m2!3d49.301869!4d20.6902607!15sCglVIEplbGXFiGFaCyIJdSBqZWxlxYhhkgEHbG9kZ2luZ6oBQRABKg0iCXUgamVsZcWIYShEMh8QASIbz_pD7QFiFTwEJs-dPFDHXvcad89Btjv5qGNlMg0QAiIJdSBqZWxlxYhh4AEA!16s%2Fg%2F1thly6h9?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D"
]

// extrakcia query z URL
function extractQuery(rawUrl: string): string {
  const parsed = new URL(rawUrl);
  const queryParam = parsed.searchParams.get("query");
  if (queryParam) {
    return decodeURIComponent(queryParam.replace(/\+/g, " ")).trim();
  }

  const parts = parsed.pathname.split("/");
  const idx = parts.indexOf("place");
  if (idx >= 0 && idx + 1 < parts.length) {
    return decodeURIComponent(parts[idx + 1].replace(/\+/g, " ")).trim();
  }
  return rawUrl;
}

const TEXT_QUERIES = RAW_URLS.map(extractQuery);

async function findPlaceId(query: string): Promise<string | null> {
  if (USE_PROXY) {
    const resp = await fetch(`/api/places/find?q=${encodeURIComponent(query)}`);
    if (!resp.ok) {
      let msg = `HTTP ${resp.status}`;
      try { const j = await resp.json(); if (j?.message) msg += ` – ${j.message}`; } catch {}
      throw new Error(msg);
    }
    const data = await resp.json();
    if (data.status === 'OK' && data.place_id) return data.place_id;
    return null;
  } else {
    if (!BROWSER_KEY) throw new Error('Missing VITE_GOOGLE_API_KEY for browser PlacesService');
    await loadGoogleMapsScript(BROWSER_KEY);
    const svc = new (window as any).google.maps.places.PlacesService(document.createElement('div'));
    return new Promise<string | null>((resolve) => {
      svc.findPlaceFromQuery({ query, fields: ['place_id'] }, (results: any, status: any) => {
        if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && results && results[0]?.place_id) {
          resolve(results[0].place_id);
        } else {
          resolve(null);
        }
      });
    });
  }
}

async function fetchDetails(placeId: string) {
  if (USE_PROXY) {
    const resp = await fetch(`/api/places/details?place_id=${encodeURIComponent(placeId)}`);
    if (!resp.ok) {
      let msg = `HTTP ${resp.status}`;
      try { const j = await resp.json(); if (j?.message) msg += ` – ${j.message}`; } catch {}
      throw new Error(msg);
    }
    const data = await resp.json();
    if (data.status === 'OK') return data.result;
    return null;
  } else {
    if (!BROWSER_KEY) throw new Error('Missing VITE_GOOGLE_API_KEY for browser PlacesService');
    await loadGoogleMapsScript(BROWSER_KEY);
    const svc = new (window as any).google.maps.places.PlacesService(document.createElement('div'));
    return new Promise<any | null>((resolve) => {
      svc.getDetails({ placeId, fields: ['name', 'rating', 'user_ratings_total'] }, (res: any, status: any) => {
        if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && res) {
          resolve(res);
        } else {
          resolve(null);
        }
      });
    });
  }
}

type ReviewInfo = {
  query: string;
  name?: string;
  rating?: number;
  total?: number;
  status: 'pending' | 'ok' | 'skip' | 'error';
  message?: string;
};

export const ReviewsExtractor: React.FC<{ autoStart?: boolean }> = ({ autoStart = false }) => {
  const [items, setItems] = useState<ReviewInfo[]>(() => TEXT_QUERIES.map(q => ({ query: q, status: 'pending' })));
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setFinished(false);
    abortRef.current = new AbortController();

    for (let i = 0; i < TEXT_QUERIES.length; i++) {
      const q = TEXT_QUERIES[i];
      if (abortRef.current.signal.aborted) break;
      try {
        const placeId = await findPlaceId(q);
        if (!placeId) {
          setItems(prev => prev.map(it => it.query === q ? { ...it, status: 'skip', message: 'place_id nenájdené' } : it));
          continue;
        }
        const details = await fetchDetails(placeId);
        if (!details) {
          setItems(prev => prev.map(it => it.query === q ? { ...it, status: 'error', message: 'Detaily nezískané' } : it));
          continue;
        }
        const name = details.name ?? q;
        const rating = details.rating;
        const total = details.user_ratings_total;
        setItems(prev => prev.map(it => it.query === q ? { ...it, status: 'ok', name, rating, total } : it));
        // slight delay to stay polite & visually paced
        await new Promise(r => setTimeout(r, 180));
      } catch (err: any) {
        setItems(prev => prev.map(it => it.query === q ? { ...it, status: 'error', message: err?.message || 'Chyba (fetch)' } : it));
      }
    }
    setRunning(false);
    setFinished(true);
  }, [running]);

  const stop = () => {
    abortRef.current?.abort();
    setRunning(false);
  };

  useEffect(() => {
    if (autoStart) run();
  }, [autoStart, run]);

  const reset = () => {
    setItems(TEXT_QUERIES.map(q => ({ query: q, status: 'pending' })));
    setFinished(false);
  };

  return (
    <section id="reviews" className="max-w-5xl mx-auto px-4 mt-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Google Reviews (Live Fetch)</h2>
        <div className="flex gap-2">
          {!running && !finished && <button onClick={run} className="px-3 py-1 rounded bg-primary text-black text-sm font-semibold">Spustiť</button>}
          {running && <button onClick={stop} className="px-3 py-1 rounded bg-amber-500 text-black text-sm font-semibold">Stop</button>}
          {finished && <button onClick={run} className="px-3 py-1 rounded bg-primary text-black text-sm font-semibold">Znova</button>}
          {(finished || running) && <button onClick={reset} className="px-3 py-1 rounded bg-neutral-700 text-sm">Reset</button>}
        </div>
      </div>
      <div className="overflow-x-auto rounded border border-white/10 bg-black/30 backdrop-blur">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="px-3 py-2 font-medium">Query</th>
              <th className="px-3 py-2 font-medium">Názov</th>
              <th className="px-3 py-2 font-medium">Rating</th>
              <th className="px-3 py-2 font-medium">Počet</th>
              <th className="px-3 py-2 font-medium">Stav</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => {
              const color = it.status === 'ok' ? 'text-emerald-400' : it.status === 'error' ? 'text-red-400' : it.status === 'skip' ? 'text-amber-400' : 'text-neutral-400';
              return (
                <tr key={it.query} className="border-t border-white/5">
                  <td className="px-3 py-2 align-top whitespace-nowrap max-w-[220px] truncate" title={it.query}>{it.query}</td>
                  <td className="px-3 py-2 align-top">{it.name ?? '—'}</td>
                  <td className="px-3 py-2 align-top">{it.rating !== undefined ? it.rating.toFixed(1) : '—'}</td>
                  <td className="px-3 py-2 align-top">{it.total ?? '—'}</td>
                  <td className={`px-3 py-2 align-top ${color}`}>{it.status}{it.message ? ` – ${it.message}` : ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-neutral-500 leading-relaxed">
        Dáta sa získavajú priamo z Google Places API (Find Place + Details). Pre produkčné použitie odporúčané spraviť serverové proxy / cache aby ste neodhalili kľúč a neprekročili kvóty. Tento nástroj je len pre vývoj a rýchly prehľad.
      </p>
  {!CLIENT_KEY_PRESENT && <p className="mt-2 text-xs text-amber-400">Chýba VITE_GOOGLE_API_KEY (potrebné pre produkčný fallback bez proxy). V dev môžeš použiť aj serverový GOOGLE_API_KEY.</p>}
    </section>
  );
};

export default ReviewsExtractor;
