'use client';

import { useEffect } from 'react';
import styles from './Lightbox.module.css';
import type { LightboxItem } from '../hooks/useLightbox';

interface LightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        {item.type === 'image' ? (
          <img src={item.src} alt={item.alt ?? ''} className={styles.media} />
        ) : (
          <video src={item.src} controls autoPlay className={styles.media} />
        )}
      </div>
    </div>
  );
}
