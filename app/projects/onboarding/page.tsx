'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import AboutModal from '../../components/AboutModal';
import CaseStudyController from '../../components/CaseStudyController';
import { useColorScheme } from '../../hooks/useColorScheme';
import styles from './page.module.css';

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
    onMouseUp() {
      dragging.current = false;
      if (ref.current) ref.current.style.cursor = 'grab';
    },
    onMouseLeave() {
      dragging.current = false;
      if (ref.current) ref.current.style.cursor = 'grab';
    },
    onMouseMove(e: React.MouseEvent) {
      if (!dragging.current) return;
      e.preventDefault();
      const x = e.pageX - (ref.current?.offsetLeft ?? 0);
      const walk = (x - startX.current) * 1.5;
      if (ref.current) ref.current.scrollLeft = scrollLeft.current - walk;
    },
  };
}

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
    id: 'heritage',
    href: '/projects/heritage-homeowners',
    src: '/images/project-laptop.png',
    alt: 'Heritage Homeowners project',
    type: 'case study',
    year: '2025',
    title: 'helping heritage homeowners start their complex renovation projects',
    tags: ['2 min read', 'Service Design', 'UX Research'],
  },
];

export default function Onboarding() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const { nameIndex, goNext, goPrev } = useColorScheme('onboarding');
  const gallery = useDragScroll();
  const phones = useDragScroll();

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
        redesigning a broken onboarding experience
      </h1>

      <p className={`${styles.body} ${styles.textBlock}`}>
        Galp is a leading energy company operating on a global scale, known for
        its innovative work in the energy sector and its commitment to
        sustainability. Within that, they run a digital onboarding platform
        called 3 minutes — designed to let users subscribe to gas and
        electricity supply quickly and entirely online.
      </p>

      <div className={styles.gapMd} />

      {/* ── META ───────────────────────────────────────────── */}
      <div className={`${styles.meta} ${styles.textBlock}`}>
        <div className={styles.metaBox}>
          <ul className={styles.metaLabel}><li>timeline</li></ul>
          <p className={styles.metaValue}>5 weeks<br />jan. → feb. 2024</p>
        </div>
        <div className={styles.metaBox}>
          <ul className={styles.metaLabel}><li>tools</li></ul>
          <p className={styles.metaValue}>pencil, paper, google forms, figma</p>
        </div>
        <div className={styles.metaBox}>
          <ul className={styles.metaLabel}><li>leveraged skills</li></ul>
          <p className={styles.metaValue}>ux-ui, design thinking, visual design</p>
        </div>
      </div>

      <div className={styles.gapLg} />

      {/* ── THE PROBLEM ────────────────────────────────────── */}
      <h2 id="the-problem" className={`${styles.heading} ${styles.textBlock}`}>
        the problem
      </h2>

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>
          We were challenged by Galp, to reimagine the 3 minutes service in
          order to improve B2C conversion. The name promised speed and simplicity.
        </p>
        <p>The experience, as we found out, delivered neither.</p>
      </div>

      <div className={styles.gapMd} />

      {/* Problem image + caption below */}
      <div className={`${styles.imgStack} ${styles.textBlock}`}>
        <div className={styles.landscapeFrame}>
          <img
            src="/images/3minutes.png"
            alt="3 minutes service interface"
            className={styles.landscapeImg}
          />
        </div>
        <p className={styles.captionWrap}>
          <span className={styles.caption}>
            The 3 minutes service is complex and not intuitive. This causes a
            frustrating experience, which leads users to withdraw from the
            process entirely.
          </span>
        </p>
      </div>

      <div className={styles.gapLg} />

      {/* ── THE PROCESS ────────────────────────────────────── */}
      <h2 id="the-process" className={`${styles.heading} ${styles.textBlock}`}>
        the process
      </h2>

      <div id="research" className={`${styles.body} ${styles.textBlock}`}>
        <ul className={styles.bulletLabel}><li>research</li></ul>
        <p>
          The research phase combined 220 surveys, 6 interviews and 5 usability
          tests, which gave us both the scale and the texture we needed to
          understand what was going wrong.
        </p>
      </div>

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>
          The surveys revealed something striking right away: 98% of respondents
          had never heard of the 3 minutes service. And while Galp is a
          well-known brand, only 29% associated it with energy supply at all —
          4 out of 5 people linked it exclusively to fuel. The service was
          invisible, and the brand wasn&apos;t helping it be seen.
        </p>
        <p>
          But awareness was only part of the problem. Once users actually
          encountered the platform, things got worse. Every single person who
          went through the usability tests found the service complex and not
          intuitive. The average time to complete the onboarding was five times
          longer than the promised 3 minutes. Two out of five users considered
          quitting mid-way, and one abandoned the process entirely.
        </p>
      </div>

      <div className={styles.gapMd} />

      {/* Research — caption only, no image */}
      <p className={`${styles.captionWrap} ${styles.textBlock}`}>
        <span className={styles.caption}>
          &ldquo;I&apos;m starting to doubt my capabilities.&rdquo; That&apos;s
          not a reaction a product should provoke.
        </span>
      </p>

      <div className={styles.gapMd} />

      <div id="positioning" className={`${styles.body} ${styles.textBlock}`}>
        <ul className={styles.bulletLabel}><li>positioning</li></ul>
        <p>
          The five core insights that emerged were: Knowledge, Complexity, Time,
          Withdrawal, and Price — with price proving to be a decisive factor,
          cited by 61% of survey respondents and 5 out of 6 interviewees as the
          most important variable in choosing a Galp package.
        </p>
        <p>
          Two perspectives crystallised from this work, one who&apos;s tired of
          complex processes and needs services that are easy to navigate, and
          another who prioritises physical interaction and finds online processes
          that feel risky or difficult simply not worth the effort. Both were
          being failed, just in different ways.
        </p>
        <p>
          The 3 minutes service is complex and not intuitive. This causes a
          frustrating experience, which leads users to withdraw from the process
          entirely. Evidently, something had to change.
        </p>
        <p>Which brought us to the question that drove everything that followed:</p>
      </div>

      <p className={`${styles.hmwWrap} ${styles.textBlock}`}>
        <span className={styles.hmw}>
          How can we turn this process into a more simple and intuitive
          experience?
        </span>
      </p>

      <div className={styles.gapLg} />

      {/* ── THE SOLUTION ───────────────────────────────────── */}
      <h2 id="the-solution" className={`${styles.heading} ${styles.textBlock}`}>
        the solution
      </h2>

      <p className={`${styles.body} ${styles.textBlock}`}>
        The answer became CONNECT — an experience that simplifies and connects
        users to the Galp energy service in a brand new way. The name itself was
        intentional: connecting, creating connection, moving beyond the
        transactional promise of a specific time and focusing instead on
        simplicity and efficiency across the whole journey.
      </p>

      <div className={styles.gapMd} />

      {/* CONNECT — horizontal scrollable gallery */}
      <div
        className={styles.gallery}
        ref={gallery.ref}
        onMouseDown={gallery.onMouseDown}
        onMouseUp={gallery.onMouseUp}
        onMouseLeave={gallery.onMouseLeave}
        onMouseMove={gallery.onMouseMove}
      >
        <div className={styles.galleryTrack}>
          <div className={styles.galleryFrame}>
            <img src="/images/Energia galp.png" alt="CONNECT energy overview" className={styles.galleryImg} />
          </div>
          <div className={styles.galleryFrame}>
            <img src="/images/Faturação.png" alt="CONNECT billing screen" className={styles.galleryImg} />
          </div>
          <div className={styles.galleryFrame}>
            <img src="/images/Resumo.png" alt="CONNECT summary screen" className={styles.galleryImg} />
          </div>
        </div>
      </div>

      <div className={styles.gapMd} />

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>The most significant changes came through two core features.</p>
        <p>
          The first was an omnichannel system. One of the clearest sources of
          friction was the rigidity of the original platform — users were locked
          into finishing where they started, on whatever device they had to hand.
          CONNECT removed that constraint entirely, letting users begin the
          process on one channel and complete it on another, with all information
          carried seamlessly across devices. For ones who might start online but
          want to confirm at a physical store, this was the kind of flexibility
          that makes a process feel trustworthy rather than risky.
        </p>
        <p>
          The second was a connected simulator, integrated directly into the
          onboarding flow. Given that price was the single most important factor
          in users&apos; decisions, surfacing it early — clearly, honestly,
          before asking for any commitment — was essential.
        </p>
      </div>

      <div className={styles.gapMd} />

      {/* Simulator — phone left, caption right */}
      <div className={styles.imgCap}>
        <video
          src="/videos/app_flow.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={styles.simulatorVideo}
        />
        <div className={styles.captionCol}>
          <p className={styles.captionWrap}>
            <span className={styles.caption}>
              Rather than presenting packages in the abstract, the simulator let
              users understand what they&apos;d actually be paying before they
              were anywhere near a form.
            </span>
          </p>
        </div>
      </div>

      <div className={styles.gapMd} />

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>But the solution didn&apos;t stop there.</p>
        <p>
          Knowing that Galp&apos;s relationship with its users shouldn&apos;t end
          at the moment of subscription, we also designed a loyalty programme: an
          ecological challenges section within the existing Mundo Galp app, where
          users could complete sustainability-driven challenges and earn points
          convertible into discounts on Galp products. It gave the brand a reason
          to stay present in users&apos; lives, and users a reason to stay engaged
          with Galp beyond the bill.
        </p>
      </div>

      <div className={styles.gapMd} />

      {/* Three phone screens */}
      <div
        className={styles.phoneTriple}
        ref={phones.ref}
        onMouseDown={phones.onMouseDown}
        onMouseUp={phones.onMouseUp}
        onMouseLeave={phones.onMouseLeave}
        onMouseMove={phones.onMouseMove}
      >
        <div className={styles.phoneMockup}>
          <img
            src="/images/mundogalp - 1.png"
            alt="Mundo Galp loyalty screen 1"
            className={styles.phoneMockupImg}
          />
        </div>
        <div className={styles.phoneMockup}>
          <img
            src="/images/mundogalp - 2.png"
            alt="Mundo Galp loyalty screen 2"
            className={styles.phoneMockupImg}
          />
        </div>
        <div className={styles.phoneMockup}>
          <img
            src="/images/mundogalp - 3.png"
            alt="Mundo Galp loyalty screen 3"
            className={styles.phoneMockupImg}
          />
        </div>
      </div>

      <div className={styles.gapLg} />

      {/* ── CONCLUSIONS ────────────────────────────────────── */}
      <h2 id="conclusions" className={`${styles.heading} ${styles.textBlock}`}>
        conclusions
      </h2>

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>
          Galp CONNECT represents the concept of a genuine shift in how an energy company can
          relate to its customers digitally — one built on innovation,
          sustainability and connection. By stripping back the complexity that was
          causing users to doubt themselves and walk away, and replacing it with a
          process that respects their time, their need for clarity, and their
          right to choose how and where they engage, the redesign turned a broken
          promise into one the product could actually keep.
        </p>
        <p>
          You can also find this project in detail on my{' '}
          <a
            href="https://www.behance.net/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.underlinedTerm}
          >
            Behance
          </a>{' '}
          page.
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
        </div>
        <p className={styles.tagline}>
          i wireframed this whole ordeal, and then vibecoded it!
        </p>
        <p className={styles.tagline}>2026</p>
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
