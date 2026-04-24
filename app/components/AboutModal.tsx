'use client';

import { useEffect } from 'react';
import styles from './AboutModal.module.css';

interface AboutModalProps {
  onClose: () => void;
  onNameCycle: () => void;
}

export default function AboutModal({ onClose, onNameCycle }: AboutModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.closeRow}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className={styles.photoWrap}>
          <div className={styles.photoFrame}>
            <img
              src="/images/about-photo.jpg"
              alt="Duarte André"
              className={styles.photo}
            />
          </div>
        </div>

        <p className={styles.highlightedWrap}><span className={styles.highlighted}>hello!</span></p>

        <p className={styles.intro}>
          Seems like you&apos;ve stumbled into my website and clicked on an animation.
        </p>

        <p className={styles.highlightedWrap}>
          <span className={styles.highlighted}>you can call me duarte. i am a designer. i come from faro, portugal. consider your hand shaken. or whatever it is your preferred greet.</span>
        </p>

        <div className={styles.body}>
          <p>
            I got into the field of design because, when picking a BA, the programme got my curiosity. How bout&apos; that, uh?
          </p>
          <p>
            Said BA was in Communication Design, from the Faculty of Fine Arts of the University of Lisbon. Currently, you can find me around Tallinn, pursuing a MA in Interaction Design at the Estonian Academy of Arts.
          </p>
          <p>
            In the meantime, I&apos;ve gathered some experience by working as the designer for a marketing department, and also went through a bootcamp for UX/UI design.
          </p>
        </div>

        <p className={styles.intro}>
          You can click down here to check my CV for more juicy details ↓
        </p>

        <div className={styles.cvRow}>
          <a href="/duarte-cv.pdf" className={styles.cvBtn} target="_blank" rel="noopener noreferrer">
            cv
          </a>
        </div>

        <p className={styles.otherNames}>
          By the way, I have other names{' '}
          <button className={styles.otherNamesBtn} onClick={onNameCycle} aria-label="Cycle name">
            <svg className={styles.asteriskIcon} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.8687 7.48125L18.2437 3.01875L13.125 5.90625V0H7.875V5.90625L2.625 3.01875L0 7.48125L5.11875 10.5L0 13.5188L2.625 17.9812L7.875 15.0938V21H13.125V15.0938L18.2437 17.9812L20.8687 13.5188L15.6187 10.5L20.8687 7.48125Z" fill="currentColor"/>
            </svg>
          </button>
        </p>
      </div>
    </div>
  );
}
