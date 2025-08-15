import { useEffect, useState } from 'react';

const KEY = 'slopen:favourites:v1';

export function useLocalFavourites() {
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favourites));
    } catch {
      // ignore
    }
  }, [favourites]);

  function toggleFavourite(id: string) {
    setFavourites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function isFavourite(id: string) {
    return favourites.includes(id);
  }

  return { favourites, toggleFavourite, isFavourite };
}
