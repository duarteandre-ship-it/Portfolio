'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Lightbox.module.css';
import type { LightboxItem } from '../hooks/useLightbox';

interface LightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function Lightbox({ item, onClose }: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragOrigin = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const pinchOrigin = useRef<{ dist: number; scale: number } | null>(null);
  const currentScale = useRef(1);

  const reset = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
    currentScale.current = 1;
  }, []);

  useEffect(() => {
    reset();
  }, [item, reset]);

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

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    const factor = e.deltaY < 0 ? 1.12 : 0.9;
    setScale(s => {
      const next = clamp(s * factor, MIN_SCALE, MAX_SCALE);
      currentScale.current = next;
      if (next === MIN_SCALE) setPos({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (currentScale.current <= 1) return;
    e.stopPropagation();
    isDragging.current = true;
    hasDragged.current = false;
    dragOrigin.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  }, [pos]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    hasDragged.current = true;
    setPos({
      x: dragOrigin.current.px + (e.clientX - dragOrigin.current.mx),
      y: dragOrigin.current.py + (e.clientY - dragOrigin.current.my),
    });
  }, []);

  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

  const onDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    reset();
  }, [reset]);

  const getTouchDist = (e: React.TouchEvent) => {
    const [a, b] = [e.touches[0], e.touches[1]];
    return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
  };

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchOrigin.current = { dist: getTouchDist(e), scale: currentScale.current };
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchOrigin.current) {
      const next = clamp(pinchOrigin.current.scale * (getTouchDist(e) / pinchOrigin.current.dist), MIN_SCALE, MAX_SCALE);
      currentScale.current = next;
      setScale(next);
      if (next === MIN_SCALE) setPos({ x: 0, y: 0 });
    }
  }, []);

  const onTouchEnd = useCallback(() => { pinchOrigin.current = null; }, []);

  const onOverlayClick = useCallback(() => {
    if (!hasDragged.current) onClose();
  }, [onClose]);

  if (!item) return null;

  const zoomed = scale > 1;

  return (
    <div
      className={styles.overlay}
      onClick={onOverlayClick}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
    >
      <button className={styles.closeBtn} onClick={e => { e.stopPropagation(); onClose(); }} aria-label="Close">×</button>

      {zoomed && (
        <button
          className={styles.resetBtn}
          onClick={e => { e.stopPropagation(); reset(); }}
          aria-label="Reset zoom"
        >
          {Math.round(scale * 100)}% ↺
        </button>
      )}

      <div
        className={styles.content}
        onClick={e => e.stopPropagation()}
        onDoubleClick={onDoubleClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
          cursor: isDragging.current ? 'grabbing' : zoomed ? 'grab' : 'default',
          userSelect: 'none',
        }}
      >
        {item.type === 'image' ? (
          <img src={item.src} alt={item.alt ?? ''} className={styles.media} draggable={false} />
        ) : (
          <video src={item.src} controls autoPlay className={styles.media} />
        )}
      </div>
    </div>
  );
}
