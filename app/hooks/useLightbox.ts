import { useState, useCallback } from 'react';

export interface LightboxItem {
  src: string;
  type: 'image' | 'video';
  alt?: string;
}

export function useLightbox() {
  const [item, setItem] = useState<LightboxItem | null>(null);
  const open = useCallback((i: LightboxItem) => setItem(i), []);
  const close = useCallback(() => setItem(null), []);
  return { open, close, item };
}
