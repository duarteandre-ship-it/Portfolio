import { useState, useEffect, useCallback } from 'react';
import { SCHEMES } from '../lib/schemes';

const STORAGE_KEY = 'portfolio-scheme-index';

/**
 * Persists the active color scheme across page navigations via localStorage.
 * Pass a titleSuffix so the <title> updates correctly per page.
 */
export function useColorScheme(titleSuffix = 'Portfolio') {
  // Always start at 0 to match SSR — the sync effect below corrects
  // it to the stored value immediately after mount.
  const [nameIndex, setNameIndex] = useState<number>(0);

  const applyScheme = useCallback(
    (index: number) => {
      const s = SCHEMES[index];
      const root = document.documentElement;
      root.style.setProperty('--color-bg', s.bg);
      root.style.setProperty('--color-black', s.ink);
      root.style.setProperty('--color-shadow', s.shadow);
      root.style.setProperty('--color-overlay', s.overlay);
      try { localStorage.setItem(STORAGE_KEY, String(index)); } catch {}
      const cap = s.name.charAt(0).toUpperCase() + s.name.slice(1);
      document.title = `${cap} — ${titleSuffix}`;
    },
    [titleSuffix],
  );

  // After hydration, sync nameIndex with localStorage in case SSR returned 0.
  // This also corrects the navbar name on page transitions.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const idx = parseInt(stored, 10);
        if (idx >= 0 && idx < SCHEMES.length && idx !== nameIndex) {
          setNameIndex(idx);
          return; // applyScheme will fire via the effect below once state updates
        }
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-apply whenever the index changes (including the initial mount)
  useEffect(() => {
    applyScheme(nameIndex);
  }, [nameIndex, applyScheme]);

  const goNext = useCallback(
    () => setNameIndex(i => (i + 1) % SCHEMES.length),
    [],
  );
  const goPrev = useCallback(
    () => setNameIndex(i => (i - 1 + SCHEMES.length) % SCHEMES.length),
    [],
  );

  return { nameIndex, goNext, goPrev };
}
