'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SCHEMES } from '../lib/schemes';
import styles from './Navbar.module.css';

interface NavbarProps {
  onAboutClick: () => void;
  nameIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

function AsteriskIcon() {
  return (
    <svg viewBox="0 0 21 21" fill="none" width={21} height={21} aria-hidden="true">
      <path
        d="M20.8687 7.48125L18.2437 3.01875L13.125 5.90625V0H7.875V5.90625L2.625 3.01875L0 7.48125L5.11875 10.5L0 13.5188L2.625 17.9812L7.875 15.0938V21H13.125V15.0938L18.2437 17.9812L20.8687 13.5188L15.6187 10.5L20.8687 7.48125Z"
        fill="var(--color-black)"
      />
    </svg>
  );
}

function CircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={24} height={24} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="var(--color-black)" />
    </svg>
  );
}

function BracketIcon() {
  return (
    <svg viewBox="0 0 12 40" fill="none" width={12} height={40} aria-hidden="true">
      <path d="M12 4V0H0V40H12V36H4V4H12Z" fill="var(--color-black)" />
    </svg>
  );
}

function ChevronIcon({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 25"
      fill="none"
      width={24}
      height={25}
      aria-hidden="true"
      style={flipped ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M0 12.5L12.341 25L15.1523 22.1524L5.62273 12.5L15.1523 2.84759L12.341 0L0 12.5ZM8.84765 12.5L21.1886 25L24 22.1524L14.4704 12.5L24 2.84759L21.1886 0L8.84765 12.5Z"
        fill="var(--color-black)"
      />
    </svg>
  );
}

export default function Navbar({ onAboutClick, nameIndex, onPrev, onNext }: NavbarProps) {
  const [winkFlipped, setWinkFlipped] = useState(false);
  const [spinLeft, setSpinLeft] = useState(false);
  const [spinRight, setSpinRight] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWinkFlipped(f => !f);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setSpinLeft(true);
    onPrev();
  };

  const handleNext = () => {
    setSpinRight(true);
    onNext();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <button
          className={`${styles.asteriskBtn}${spinLeft ? ` ${styles.spinning}` : ''}`}
          onClick={handlePrev}
          onAnimationEnd={() => setSpinLeft(false)}
          aria-label="Previous name"
        >
          <AsteriskIcon />
        </button>

        <Link href="/" className={styles.brandName}>{SCHEMES[nameIndex].name}</Link>

        <button
          className={`${styles.asteriskBtn}${spinRight ? ` ${styles.spinning}` : ''}`}
          onClick={handleNext}
          onAnimationEnd={() => setSpinRight(false)}
          aria-label="Next name"
        >
          <AsteriskIcon />
        </button>
      </div>

      <button className={styles.wink} onClick={onAboutClick} aria-label="About me">
        {winkFlipped ? <ChevronIcon flipped /> : <CircleIcon />}
        <BracketIcon />
        {winkFlipped ? <CircleIcon /> : <ChevronIcon />}
      </button>
    </nav>
  );
}
