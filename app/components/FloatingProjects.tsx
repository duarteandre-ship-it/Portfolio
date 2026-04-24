'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FloatingProjects.module.css';

interface Project {
  id: string;
  src: string;
  w: number;       // visual render width
  h: number;       // visual render height
  physW: number;   // physics box width  (smaller → more room to move)
  physH: number;   // physics box height
  initXRatio: number;
  initYRatio: number;
  vx: number;
  vy: number;
  type: string;
  year: string;
  title: string;
  tags: string[];
  href: string;
}

interface PhysicsItem {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  renderOffsetX: number; // centres the visual image over the smaller physics box
  renderOffsetY: number;
  paused: boolean;
  el: HTMLElement | null;
}

const PROJECTS: Project[] = [
  {
    id: 'phones',
    src: '/images/project-phones.png',
    w: 330, h: 288, physW: 160, physH: 140,
    initXRatio: 0.08, initYRatio: 0.14,
    vx: 35, vy: 22,
    type: 'case study', year: '2026',
    title: 'fostering trust between users and app through an emotional approach',
    tags: ['3 min read', 'Emotional Design', 'UX/UI Design', 'Design Thinking'],
    href: '/projects/fostering-trust',
  },
  {
    id: 'laptop',
    src: '/images/project-laptop.png',
    w: 319, h: 340, physW: 155, physH: 165,
    initXRatio: 0.44, initYRatio: 0.04,
    vx: -30, vy: 38,
    type: 'case study', year: '2025',
    title: 'helping heritage homeowners start their complex renovation projects',
    tags: ['2 min read', 'Service Design', 'UX Research'],
    href: '/projects/heritage-homeowners',
  },
  {
    id: 'galp',
    src: '/images/project-galp.png',
    w: 449, h: 267, physW: 220, physH: 130,
    initXRatio: 0.55, initYRatio: 0.50,
    vx: -22, vy: -32,
    type: 'case study', year: '2024',
    title: 'redesigning a broken onboarding experience',
    tags: ['2 min read', 'UI Design', 'UX Research'],
    href: '/projects/onboarding',
  },
  // txt-magazine hidden until page is ready

];

function overlap(a: PhysicsItem, b: PhysicsItem) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function separate(a: PhysicsItem, b: PhysicsItem) {
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  if (ox < oy) {
    const s = a.x < b.x ? -1 : 1;
    a.x += s * ox / 2;
    b.x -= s * ox / 2;
  } else {
    const s = a.y < b.y ? -1 : 1;
    a.y += s * oy / 2;
    b.y -= s * oy / 2;
  }
}

export default function FloatingProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<PhysicsItem[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const elRefs = useRef<(HTMLElement | null)[]>(Array(PROJECTS.length).fill(null));

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cardPos, setCardPos] = useState<{ x: number; y: number } | null>(null);

  const setElRef = useCallback((el: HTMLElement | null, index: number) => {
    elRefs.current[index] = el;
    if (physicsRef.current[index]) {
      physicsRef.current[index].el = el;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let initialized = false;
    let running = false;

    const reset = () => {
      initialized = false;
      physicsRef.current = [];
      lastTimeRef.current = 0;
    };

    const start = () => {
      if (running) return;
      running = true;
      rafRef.current = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };

    const loop = (ts: number) => {
      if (!running) return;

      const W = container.clientWidth;
      const H = container.clientHeight;

      // Wait until the container has real layout dimensions
      if (!initialized) {
        if (W === 0 || H === 0) {
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
        physicsRef.current = PROJECTS.map((p, i) => ({
          id: p.id,
          x: Math.max(0, Math.min(p.initXRatio * W, W - p.physW)),
          y: Math.max(0, Math.min(p.initYRatio * H, H - p.physH)),
          vx: p.vx,
          vy: p.vy,
          w: p.physW,
          h: p.physH,
          renderOffsetX: (p.physW - p.w) / 2, // negative → shifts left to centre
          renderOffsetY: (p.physH - p.h) / 2,
          paused: false,
          el: elRefs.current[i],
        }));
        physicsRef.current.forEach(item => {
          if (item.el) item.el.style.transform = `translate(${item.x + item.renderOffsetX}px, ${item.y + item.renderOffsetY}px)`;
        });
        initialized = true;
        lastTimeRef.current = ts;
      }

      const dt = Math.min((ts - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = ts;

      const items = physicsRef.current;

      for (const item of items) {
        if (item.paused) continue;
        item.x += item.vx * dt;
        item.y += item.vy * dt;
        if (item.x <= 0) { item.x = 0; item.vx = Math.abs(item.vx); }
        if (item.x + item.w >= W) { item.x = W - item.w; item.vx = -Math.abs(item.vx); }
        if (item.y <= 0) { item.y = 0; item.vy = Math.abs(item.vy); }
        if (item.y + item.h >= H) { item.y = H - item.h; item.vy = -Math.abs(item.vy); }
      }

      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          if (overlap(items[i], items[j])) {
            [items[i].vx, items[j].vx] = [items[j].vx, items[i].vx];
            [items[i].vy, items[j].vy] = [items[j].vy, items[i].vy];
            separate(items[i], items[j]);
          }
        }
      }

      for (const item of items) {
        if (item.el) item.el.style.transform = `translate(${item.x + item.renderOffsetX}px, ${item.y + item.renderOffsetY}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    // Restart after bfcache restore (browser back/forward)
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        stop();
        reset();
        start();
      }
    };

    // Pause when tab hidden, resume cleanly when visible again
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        lastTimeRef.current = 0; // prevent dt spike after long absence
        start();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    start();

    return () => {
      stop();
      reset();
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleMouseEnter = (id: string, index: number) => {
    const item = physicsRef.current[index];
    if (!item) return;
    item.paused = true;
    const container = containerRef.current;
    if (container) {
      const W = container.clientWidth;
      const H = container.clientHeight;
      const cardWidth = 320;
      const cardHeight = 180; // approx max card height
      const gap = 20;
      let cx = item.x + item.w + gap;
      if (cx + cardWidth > W) cx = Math.max(0, item.x - cardWidth - gap);
      let cy = item.y;
      if (cy + cardHeight > H) cy = Math.max(0, H - cardHeight);
      setCardPos({ x: cx, y: cy });
    }
    setHoveredId(id);
  };

  const handleMouseLeave = (index: number) => {
    const item = physicsRef.current[index];
    if (item) item.paused = false;
    setHoveredId(null);
    setCardPos(null);
  };

  const hoveredProject = PROJECTS.find(p => p.id === hoveredId);

  return (
    <div ref={containerRef} className={styles.container}>
      {PROJECTS.map((project, index) => (
        <div
          key={project.id}
          ref={el => setElRef(el, index)}
          className={styles.project}
          style={{ width: project.w, height: project.h }}
          onMouseEnter={() => handleMouseEnter(project.id, index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <Link href={project.href} className={styles.projectLink}>
            <Image
              src={project.src}
              alt={project.title}
              fill
              style={{ objectFit: 'contain' }}
              sizes={`${project.w}px`}
            />
          </Link>
        </div>
      ))}

      {hoveredProject && cardPos && (
        <div className={styles.hoverCard} style={{ left: cardPos.x, top: cardPos.y }}>
          <p className={styles.cardMeta}>{hoveredProject.type} ({hoveredProject.year})</p>
          <p className={styles.cardTitleWrap}><span className={styles.cardTitle}>{hoveredProject.title}</span></p>
          <ul className={styles.cardTags}>
            {hoveredProject.tags.map(tag => (
              <li key={tag}>• {tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
