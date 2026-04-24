'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import AboutModal from './components/AboutModal';
import FloatingProjects from './components/FloatingProjects';
import styles from './page.module.css';
import { useColorScheme } from './hooks/useColorScheme';

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const { nameIndex, goNext, goPrev } = useColorScheme('Portfolio');

  return (
    <main className={styles.main}>
      <Navbar
        onAboutClick={() => setAboutOpen(true)}
        nameIndex={nameIndex}
        onPrev={goPrev}
        onNext={goNext}
      />

      <div className={styles.spacer} />

      <section className={styles.hero}>
        <div className={styles.headline}>
          <p><span className={styles.highlightSpan}>welcome.</span></p>
          <p><span className={styles.highlightSpan}>this is the place where i share my work.</span></p>
        </div>
        <p className={styles.subtext}>
          I try to be a UX/UI / interaction / product / digital product / multidisciplinary / cool designer. The results are floating down there somewhere.
        </p>
      </section>

      <div className={styles.spacerSm} />

      <FloatingProjects />

      <div className={styles.spacer} />

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="mailto:dudas23andre@gmail.com" className={styles.footerBtn}>
            dudas23andre@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/duarte-andr%C3%A9-9a731b2a4/"
            className={styles.footerBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedIn
          </a>
        </div>
        <p className={styles.tagline}>i wireframed this whole ordeal, and then vibecoded it!</p>
      </footer>

      {aboutOpen && (
        <AboutModal
          onClose={() => setAboutOpen(false)}
          onNameCycle={goNext}
        />
      )}
    </main>
  );
}
