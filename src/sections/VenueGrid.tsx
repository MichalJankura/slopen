import React, { useEffect, useMemo, useState } from 'react';
import { VenueCard } from '../components/VenueCard';
import { useLocalFavourites } from '../hooks/useLocalFavourites';
import { useVenues } from '../hooks/useVenues';
import { computeStatusForWeekly, attachKitchenStatus } from '../utils/time';
import VenueDetailModal from '../components/VenueDetailModal';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

export const VenueGrid: React.FC = () => {
  const { venues, loading, error } = useVenues();
  const { favourites, toggleFavourite, isFavourite } = useLocalFavourites();
  const [filter, setFilter] = useState<string>('all');
  const [onlyOpen, setOnlyOpen] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<any | null>(null);
  const [secretMatch, setSecretMatch] = useState(false);
  
  // Debug log
  console.log('VenueGrid Debug:', { venues, loading, error, venuesCount: venues.length });
  
  // [DISABLED - hidden link trigger]
  // const SECRET_SHA = (typeof __SECRET_WORD_SHA256__ !== 'undefined' && __SECRET_WORD_SHA256__) || 'd3cb1332b2feea151354857f36eb38c02efaed2dd72b9dd106d820215ae400e7';
  // const SECRET_FNV = (typeof __SECRET_WORD_FNV32__ !== 'undefined' && __SECRET_WORD_FNV32__) || '';

  // Lock body scroll when a venue is selected (modal open)
  useLockBodyScroll(!!selected);
  // Toggle body class to allow hiding navbar when modal active
  useEffect(() => {
    if (selected) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [selected]);

  const enriched = useMemo(() => {
    console.log('VenueGrid enriched: Processing venues:', venues.length);
    const result = venues.map((v, index) => {
      console.log(`Processing venue ${index}:`, v.name, 'weeklyHours:', v.weeklyHours);
      const status = computeStatusForWeekly(v.weeklyHours || {});
      console.log(`Status for ${v.name}:`, status);
      const withKitchen = attachKitchenStatus(status, v.weeklyKitchenHours);
      console.log(`Final status for ${v.name}:`, withKitchen);
      return { ...v, ...withKitchen };
    });
    console.log('Enriched venues result:', result);
    return result;
  }, [venues]);

  const filtered = useMemo(() => {
    const norm = (s: string) => s
      .toLowerCase()
      .normalize('NFD')
      // strip combining diacritical marks
      .replace(/[\u0300-\u036f]/g, '');
    const q = norm(query.trim());
    return enriched
      .filter(v => (filter === 'all' ? true : (v.types || []).includes(filter as any)))
      .filter(v => (onlyOpen ? v.isOpen : true))
      .filter(v => {
        if (!q) return true;
        const base = norm(v.name);
        if (base.includes(q)) return true;
        const alts: string[] = (v.altNames || []).map(norm);
        return alts.some((a: string) => a.includes(q));
      });
  }, [filter, onlyOpen, query, enriched]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const af = favourites.includes(a.id) ? 1 : 0;
      const bf = favourites.includes(b.id) ? 1 : 0;
      if (af !== bf) return bf - af; // favourites first
  // Sort by rating count desc then rating desc (if available), fallback to name
  const aRC = a.ratingCount ?? -1;
  const bRC = b.ratingCount ?? -1;
  if (aRC !== bRC) return bRC - aRC;
  const aR = a.rating ?? -1;
  const bR = b.rating ?? -1;
  if (aR !== bR) return bR - aR;
  return a.name.localeCompare(b.name, 'sk');
    });
  }, [filtered, favourites]);

  // [DISABLED] Hashing + trigger effect
  // useEffect(() => {
  //   let cancelled = false;
  //   const doHash = async () => {
  //     const norm = query.trim().toLowerCase();
  //     if (!norm) {
  //       if (!cancelled) setSecretMatch(false);
  //       return;
  //     }
  //     let shaHex = '';
  //     try {
  //       if (crypto?.subtle) {
  //         const enc = new TextEncoder().encode(norm);
  //         const buf = await crypto.subtle.digest('SHA-256', enc);
  //         const hashArray = Array.from(new Uint8Array(buf));
  //         shaHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  //       }
  //     } catch {}
  //     const fnv32 = (() => {
  //       let h = 0x811c9dc5 >>> 0;
  //       for (let i = 0; i < norm.length; i++) { h ^= norm.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  //       return h.toString(16).padStart(8, '0');
  //     })();
  //     const match = false; // force disabled
  //     if (!cancelled) setSecretMatch(match);
  //   };
  //   doHash();
  //   return () => { cancelled = true; };
  // }, [query]);

  return (
    <section id="miesta" className="py-16 md:py-24 bg-gradient-to-b from-black to-neutral-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Podniky v meste</h2>
            <p className="text-neutral-400 mt-2 text-sm max-w-xl">Prehľad miestnych prevádzok. Pridaj si obľúbené a zobraz ich hore. Nepotrebujeme tvoje prihlásenie.</p>
          </div>
          {!loading && !error && (
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Hľadať..."
                value={query}
              onChange={e => setQuery(e.target.value)}
              className="bg-neutral-800/80 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder-neutral-500"
            />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-neutral-800/80 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Všetko</option>
              <option value="restaurant">Reštaurácie</option>
              <option value="cafe">Kaviarne</option>
              <option value="pub">Puby</option>
              <option value="club">Kluby</option>
            </select>
            <label className="flex items-center gap-2 text-xs bg-neutral-800/80 px-3 py-2 rounded cursor-pointer select-none">
              <input type="checkbox" checked={onlyOpen} onChange={e => setOnlyOpen(e.target.checked)} />
              Len otvorené
            </label>
            {/* [DISABLED] Secret link + debug badge */}
            {false && (
              <a href="#" className="text-xs text-neutral-500">CHCEM VYHRAŤ</a>
            )}
            </div>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-neutral-400">Načítavam podniky...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-950/50 border border-red-500/50 rounded-lg p-4 text-red-200 mb-6">
            <p className="font-semibold">Chyba pri načítaní:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sorted.map(v => {
            let statusNote: string | undefined;
            if (v.isOpen && v.closesInMinutes != null) {
              if (v.closesInMinutes <= 60) statusNote = `zatvára za ${v.closesInMinutes} min`;
            } else if (!v.isOpen && v.opensInMinutes != null && v.opensInMinutes <= 180) {
              statusNote = `otvára o ${Math.round(v.opensInMinutes / 60)}h`;
              if (v.opensInMinutes < 60) statusNote = `otvára za ${v.opensInMinutes} min`;
            }
            // Kitchen close urgency
            if (v.kitchenClosesInMinutes != null && v.kitchenClosesInMinutes <= 45) {
              const k = v.kitchenClosesInMinutes;
              const kMsg = k < 60 ? `kuchyňa ${k <= 5 ? 'sa čoskoro zatvára' : 'končí za ' + k + ' min'}` : '';
              if (kMsg) statusNote = statusNote ? statusNote + ' • ' + kMsg : kMsg;
            }
            return <VenueCard key={v.id} venue={v} favourite={isFavourite(v.id)} onToggleFavourite={toggleFavourite} isOpen={v.isOpen} statusNote={statusNote} onSelect={setSelected} />;
          })}
        </div>
        )}
      </div>
      {selected && <VenueDetailModal venue={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};
