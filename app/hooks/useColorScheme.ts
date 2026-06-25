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

      const svg = `<svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="21" height="21" fill="${s.bg}"/><path d="M20.8687 7.48125L18.2437 3.01875L13.125 5.90625V0H7.875V5.90625L2.625 3.01875L0 7.48125L5.11875 10.5L0 13.5188L2.625 17.9812L7.875 15.0938V21H13.125V15.0938L18.2437 17.9812L20.8687 13.5188L15.6187 10.5L20.8687 7.48125Z" fill="${s.ink}"/></svg>`;
      const url = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      document.querySelectorAll('link[rel~="icon"]').forEach(el => el.remove());
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      link.href = url;
      document.head.appendChild(link);
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
