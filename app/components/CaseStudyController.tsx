'use client';

import { useState, useEffect } from 'react';
import styles from './CaseStudyController.module.css';

interface Sub {
  id: string;
  label: string;
}

interface Chapter {
  id: string;
  label: string;
  sub?: Sub[];
}

const chapters: Chapter[] = [
  { id: 'the-problem', label: 'the problem' },
  {
    id: 'the-process',
    label: 'the process',
    sub: [
      { id: 'research',    label: 'research'    },
      { id: 'positioning', label: 'positioning' },
    ],
  },
  { id: 'the-solution',  label: 'the solution'  },
  { id: 'conclusions',   label: 'conclusions'   },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function CaseStudyController() {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const allIds = chapters.flatMap(ch => [ch.id, ...(ch.sub?.map(s => s.id) ?? [])]);

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      // Detection band: top 15 % → bottom 80 % of viewport
      { rootMargin: '-15% 0px -80% 0px' },
    );

    allIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isActive = (ch: Chapter) =>
    activeId === ch.id || ch.sub?.some(s => s.id === activeId);

  return (
    <nav className={styles.controller} aria-label="Chapter navigation">
      <ul className={styles.list}>
        {chapters.map(ch => (
          <li key={ch.id} className={styles.item}>
            <button
              className={styles.chapterBtn}
              onClick={() => scrollTo(ch.id)}
            >
              {isActive(ch)
                ? <span className={styles.asterisk}>*</span>
                : '•'
              }{' '}{ch.label}
            </button>

            {ch.sub && (
              <ul className={styles.subList}>
                {ch.sub.map(s => (
                  <li key={s.id}>
                    <button
                      className={styles.subBtn}
                      onClick={() => scrollTo(s.id)}
                    >
                      → {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
