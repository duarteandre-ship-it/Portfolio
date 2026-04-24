'use client';

import { useState, useRef } from 'react';

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  return {
    ref,
    onMouseDown(e: React.MouseEvent) {
      dragging.current = true;
      startX.current = e.pageX - (ref.current?.offsetLeft ?? 0);
      scrollLeft.current = ref.current?.scrollLeft ?? 0;
      if (ref.current) ref.current.style.cursor = 'grabbing';
    },
    onMouseUp() { dragging.current = false; if (ref.current) ref.current.style.cursor = 'grab'; },
    onMouseLeave() { dragging.current = false; if (ref.current) ref.current.style.cursor = 'grab'; },
    onMouseMove(e: React.MouseEvent) {
      if (!dragging.current) return;
      e.preventDefault();
      const x = e.pageX - (ref.current?.offsetLeft ?? 0);
      if (ref.current) ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
    },
  };
}
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import AboutModal from '../../components/AboutModal';
import CaseStudyController from '../../components/CaseStudyController';
import { useColorScheme } from '../../hooks/useColorScheme';
import styles from './page.module.css';

const OTHER_WORKS = [
  {
    id: 'phones',
    href: '/projects/fostering-trust',
    src: '/images/project-phones.png',
    alt: 'Fostering trust project',
    type: 'case study',
    year: '2026',
    title: 'fostering trust between users and app through an emotional approach',
    tags: ['3 min read', 'Emotional Design', 'UX/UI Design', 'Design Thinking'],
  },
  {
    id: 'galp',
    href: '/projects/onboarding',
    src: '/images/project-galp.png',
    alt: 'Galp onboarding project',
    type: 'case study',
    year: '2024',
    title: 'redesigning a broken onboarding experience',
    tags: ['2 min read', 'UI Design', 'UX Research'],
  },
];

export default function HeritageHomeowners() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const solutionGallery = useDragScroll();
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const { nameIndex, goNext, goPrev } = useColorScheme('heritage homeowners');

  return (
    <main className={styles.main}>
      <Navbar
        onAboutClick={() => setAboutOpen(true)}
        nameIndex={nameIndex}
        onPrev={goPrev}
        onNext={goNext}
      />

      <CaseStudyController />

      <div className={styles.gapLg} />

      {/* ── HEADER ─────────────────────────────────────────── */}
      <h1 className={`${styles.heading} ${styles.textBlock}`}>
        helping heritage homeowners start their complex renovation projects
      </h1>

      <p className={`${styles.body} ${styles.textBlock}`}>
        Estonia has over 12,000 protected heritage buildings. It also has
        significant ambition and funding behind renovating them — the BuildEST
        programme is rewriting the country&apos;s long-term renovation strategy
        for all existing buildings toward 2050, with a total budget of €16.3
        million; the LIFE Heritage Home project, running from 2023 to 2026 with
        €1.5 million, is developing a user-specific toolkit for deep energy
        renovations of heritage homes.
      </p>

      <div className={styles.gapMd} />

      {/* ── META ───────────────────────────────────────────── */}
      <div className={`${styles.meta} ${styles.textBlock}`}>
        <div className={styles.metaBox}>
          <ul className={styles.metaLabel}><li>timeline</li></ul>
          <p className={styles.metaValue}>5 weeks<br />oct. → dec. 2025</p>
        </div>
        <div className={styles.metaBox}>
          <ul className={styles.metaLabel}><li>tools</li></ul>
          <p className={styles.metaValue}>pencil, paper, figma, lovable</p>
        </div>
        <div className={styles.metaBox}>
          <ul className={styles.metaLabel}><li>leveraged skills</li></ul>
          <p className={styles.metaValue}>service design, ux writing</p>
        </div>
      </div>

      <div className={styles.gapLg} />

      {/* ── THE PROBLEM ────────────────────────────────────── */}
      <h2 id="the-problem" className={`${styles.heading} ${styles.textBlock}`}>
        the problem
      </h2>

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>The ambition is real. The homeowner-facing experience of that ambition is not.</p>
        <p>
          We were briefed, as part of a collaboration between EKA&apos;s IxD.ma
          programme and the Estonian Climate Ministry, to approach the entities
          and homeowners of Estonian heritage homes and facilitate access to the
          procedures and information they need to renovate houses that — given
          their protected status — come with rigid norms on what can and cannot
          be altered.
        </p>
      </div>

      <div className={styles.gapMd} />

      {/* Problem image — affinity map */}
      <img
        src="/images/heritage-affinity.png"
        alt="Research affinity map"
        className={styles.affinityImg}
      />

      <div className={styles.gapLg} />

      {/* ── THE PROCESS ────────────────────────────────────── */}
      <h2 id="the-process" className={`${styles.heading} ${styles.textBlock}`}>
        the process
      </h2>

      <div id="research" className={`${styles.body} ${styles.textBlock}`}>
        <ul className={styles.bulletLabel}><li>research</li></ul>
        <p>
          The research phase was a team effort. We began by mapping the terrain.
          Estonia&apos;s heritage renovation space is layered — from individuals
          and neighbourhoods up through industries, local municipalities, the
          national government and the European Union — and each layer contributes
          rules, funding, or friction to the same process.
        </p>
      </div>

      <div className={styles.gapMd} />

      {/* Research caption — no image */}
      <p className={`${styles.captionWrap} ${styles.textBlock}`}>
        <span className={styles.caption}>
          Programmes like BuildEST and LIFE Heritage Home carry real intent and
          real money (€9.5M of BuildEST&apos;s budget is a European grant), but
          on the homeowner side, that ambition lands as fragmented PDFs,
          inconsistent guidance, and an approval process that bends under its own
          weight.
        </span>
      </p>

      <div className={styles.gapMd} />

      <p className={`${styles.body} ${styles.textBlock}`}>
        Public opinion wasn&apos;t helping. Construction in Estonia carries an
        added tax of 30–40%, and Tallinners we spoke to and read about tend to
        treat homes through the lens of investment rather than long-term dwelling
        — many don&apos;t see the logic in deep-energy renovations if a house
        isn&apos;t going to be resold. That mindset works against both the
        climate goals and the comfort of the people who actually do want to live
        in their homes.
      </p>

      <div id="positioning" className={`${styles.body} ${styles.textBlock}`}>
        <ul className={styles.bulletLabel}><li>positioning</li></ul>
        <p>
          From the interviews, the perspective of the unaware homeowner took
          shape, that of someone who doesn&apos;t know what they don&apos;t
          know, and the one the system most reliably loses.
        </p>
      </div>

      <div className={styles.gapMd} />

      {/* Positioning quote — no image */}
      <p className={`${styles.captionWrap} ${styles.textBlock}`}>
        <span className={styles.caption}>
          &ldquo;We wrote to the city government to get everything approved, but
          it turned out to be a bureaucratic nightmare: if you change one thing,
          you have to reapprove all the engineering systems — heating,
          ventilation, water, electricity… In the end we gave up — we are doing
          it without permits.&rdquo;
        </span>
      </p>

      <div className={styles.gapMd} />

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>
          Unaware homeowners don&apos;t need more information — they&apos;re
          already drowning in it, in forms, PDFs, permit categories, and
          construction vocabulary. They need less of the wrong kind and more of
          the right kind, shaped around what they actually care about.
        </p>
        <p>The question consolidated itself as:</p>
      </div>

      <p className={`${styles.hmwWrap} ${styles.textBlock}`}>
        <span className={styles.hmw}>
          How might we push unaware heritage homeowners to discover, learn and
          take action on their heritage home&apos;s energy efficiency, without
          overwhelming them?
        </span>
      </p>

      <div className={styles.gapLg} />

      {/* ── THE SOLUTION ───────────────────────────────────── */}
      <h2 id="the-solution" className={`${styles.heading} ${styles.textBlock}`}>
        the solution
      </h2>

      <p className={`${styles.body} ${styles.textBlock}`}>
        The solution phase was an individual effort. The last part of that last
        question did most of the work. Unaware homeowners don&apos;t need more
        information — they&apos;re already drowning in it, in forms, PDFs,
        permit categories, and construction vocabulary. They need less of the
        wrong kind and more of the right kind, shaped around what they actually
        care about.
      </p>

      <div className={styles.gapMd} />

      {/* Solution image + caption below */}
      <div className={`${styles.imgStack} ${styles.textBlock}`}>
        <video
          src="/videos/app_flow3.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={styles.landscapeVideo}
        />
        <p className={styles.captionWrap}>
          <span className={styles.caption}>
            The answer became My Home Renovation Check — a starter-plan
            generator that sits at the front door of the homeowner&apos;s
            renovation journey, before commitment, before cost, before
            bureaucracy.
          </span>
        </p>
      </div>

      <div className={styles.gapMd} />

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>
          The core design move was reframing. The existing landscape treats
          energy efficiency as a technical problem: construction materials, how
          to work them, who can work them, how much things cost, how to finance
          them. Each of those is a legitimate question, but none of them is what
          actually pulls an unaware homeowner into action. What pulls them is
          what the renovation will do for their life — more comfort, a more
          valuable home, lower bills, and a sense that what they&apos;re doing
          aligns with their values around sustainability. The tool leads with
          those, and threads the technical answers through them instead of the
          other way around.
        </p>
      </div>

      <div className={styles.gapMd} />

      <div className={styles.solutionGallery} ref={solutionGallery.ref} onMouseDown={solutionGallery.onMouseDown} onMouseUp={solutionGallery.onMouseUp} onMouseLeave={solutionGallery.onMouseLeave} onMouseMove={solutionGallery.onMouseMove}>
        <div className={styles.solutionGalleryTrack}>
          <div className={styles.solutionFrame}>
            <img src="/images/heritage-home-landing.png" alt="Heritage Home Check landing" className={styles.solutionImg} />
          </div>
          <div className={styles.solutionFrame}>
            <img src="/images/heritage-question.png" alt="Heritage Home Check questionnaire" className={styles.solutionImg} />
          </div>
        </div>
      </div>

      <div className={styles.gapMd} />

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>
          The result is a Renovation Report, covering priorities, possible
          limitations, potential environmental impact, funding options, creating
          an overall starter plan for the homeowner. Each renovation that is
          found as a priority is tagged with a cost tier, a heritage-compliance
          label (&ldquo;Heritage Safe&rdquo; or &ldquo;Permit May Be
          Required&rdquo;), an estimated cost range, expected yearly savings,
          and yearly CO₂ reduction. Each also carries a short &ldquo;Why this
          helps&rdquo; rationale and a heritage note explaining what the
          protection status means for this particular action.
        </p>
      </div>

      <div className={styles.gapMd} />

      <img
        src="/images/Final Result.png"
        alt="Heritage renovation report mockup"
        className={styles.reportImg}
      />

      <div className={styles.gapLg} />

      {/* ── CONCLUSIONS ────────────────────────────────────── */}
      <h2 id="conclusions" className={`${styles.heading} ${styles.textBlock}`}>
        conclusions
      </h2>

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>
          The measure of this redesign isn&apos;t whether it teaches homeowners
          everything about heritage renovation. It&apos;s whether it removes the
          moment where people decide the process isn&apos;t worth it.
        </p>
        <p>
          Unaware homeowners don&apos;t give up because they don&apos;t care —
          they give up because the first honest look at what they&apos;re being
          asked to do tells them they&apos;re not equipped, and nothing in the
          current system contradicts that. My Home Renovation Check is an attempt
          to contradict it, early, and in their own terms.
        </p>
      </div>

      <div className={styles.gapLg} />

      {/* ── OTHER WORKS ────────────────────────────────────── */}
      <h2 className={`${styles.heading} ${styles.textBlock}`}>
        give other works a check
      </h2>

      <div className={styles.gapLg} />

      <div className={styles.otherWorks}>
        {OTHER_WORKS.map(work => (
          <div
            key={work.id}
            className={styles.otherWorkItem}
            onMouseEnter={() => setHoveredWork(work.id)}
            onMouseLeave={() => setHoveredWork(null)}
          >
            <Link href={work.href} className={styles.otherWorkLink}>
              <img src={work.src} alt={work.alt} className={styles.otherWorkImg} />
            </Link>
            {hoveredWork === work.id && (
              <div className={styles.otherWorkCard}>
                <p className={styles.cardMeta}>{work.type} ({work.year})</p>
                <p className={styles.cardTitleWrap}>
                  <span className={styles.cardTitle}>{work.title}</span>
                </p>
                <ul className={styles.cardTags}>
                  {work.tags.map(tag => <li key={tag}>• {tag}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.gapLg} />

      {/* ── FOOTER ─────────────────────────────────────────── */}
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
          <a
            href="/duarte-cv.pdf"
            className={styles.footerBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
        </div>
        <p className={styles.tagline}>
          i wireframed this whole ordeal, and then vibecoded it!
        </p>
        <p className={styles.tagline}>2026
        </p>
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
