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

const OTHER_WORKS = [
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

export default function FosteringTrust() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const { nameIndex, goNext, goPrev } = useColorScheme('fostering trust');
  const pair = useDragScroll();

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
        fostering trust between users and app through an emotional approach
      </h1>

      <p className={`${styles.body} ${styles.textBlock}`}>
        The Rede Expressos app is designed to simplify the travel experience by
        allowing users to search for routes and schedules, purchase bus tickets,
        manage bookings, and access digital tickets directly on their smartphones
        while in Portugal.
      </p>

      <div className={styles.gapMd} />

      {/* ── META ───────────────────────────────────────────── */}
      <div className={`${styles.meta} ${styles.textBlock}`}>
        <div className={styles.metaBox}>
          <ul className={styles.metaLabel}><li>timeline</li></ul>
          <p className={styles.metaValue}>5 weeks<br />feb. → mar. 2026</p>
        </div>
        <div className={styles.metaBox}>
          <ul className={styles.metaLabel}><li>tools</li></ul>
          <p className={styles.metaValue}>pencil, paper, body, figma</p>
        </div>
        <div className={styles.metaBox}>
          <ul className={styles.metaLabel}><li>leveraged skills</li></ul>
          <p className={styles.metaValue}>emotional design, ux-ui, design thinking</p>
        </div>
      </div>

      <div className={styles.gapLg} />

      {/* ── THE PROBLEM ────────────────────────────────────── */}
      <h2 id="the-problem" className={`${styles.heading} ${styles.textBlock}`}>the problem</h2>

      <p className={`${styles.body} ${styles.textBlock}`}>
        The current app is built for efficiency. The process of buying a ticket
        is, in its majority, direct, functional and fast, which is great for
        users who are buying last-minute tickets or want to get it done as fast
        as possible. But, outside of relieving momentarily the user&apos;s state
        of hurriedness, stress and anxiety, there isn&apos;t much more to it.
        It&apos;s a deeply impersonal experience.
      </p>

      <div className={styles.gapMd} />

      {/* Problem image + caption */}
      <div className={styles.imgCap}>
        <div className={styles.phoneMockup}>
          <video
            src="/videos/app_flow2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.phoneMockupVideo}
          />
        </div>
        <div className={styles.captionCol}>
          <p className={styles.captionWrap}>
            <span className={styles.caption}>
              An app that resembles a &quot;good&quot; physical ticket machine.
              But with that in mind, if another competitor has a similarly
              effective &quot;machine&quot; for a lower price, what&apos;s
              keeping them inclined to use this one?
            </span>
          </p>
        </div>
      </div>

      <div className={styles.gapLg} />

      {/* ── THE PROCESS ────────────────────────────────────── */}
      <h2 id="the-process" className={`${styles.heading} ${styles.textBlock}`}>the process</h2>

      <div id="research" className={`${styles.body} ${styles.textBlock}`}>
        <ul className={styles.bulletLabel}><li>research</li></ul>
        <p>
          I recurred to Embodied Research in order to better understand what
          kind of feelings might bring a user back to a product. For that, I
          documented my activities during one day: going to the gym, working on
          this project, going for a drink, amongst other things. I took notice
          of how I felt before, during and after, how my body felt, how I held
          certain objects.
        </p>
      </div>

      <p className={`${styles.body} ${styles.textBlock}`}>
        Going through my to-dos, even when feeling lazy or a little down, I
        reaped the benefits of it after doing them, outside of the experiences
        themselves, and that&apos;s where I felt the best, that was what I
        reaped as a reward. I felt that following through all of that was
        worthwhile, valuable and intelligent.
        <br /><br />
        This way, I found the emotions that I could potentially bring into the
        app experience.
      </p>

      <div id="positioning" className={`${styles.body} ${styles.textBlock}`}>
        <ul className={styles.bulletLabel}><li>positioning</li></ul>
        <p>
          Notifications, gamification and even an assistant were considered, but
          I decided to look deeper into what the bus experience by Rede
          Expressos could offer, and I came across everything I was looking for:
          the RFlex.
        </p>
        <p>
          RFlex is a free customer loyalty program offered by Rede Expressos
          that rewards frequent travellers with discounted ticket prices and
          special benefits across the company&apos;s bus network. The service
          works in a 365-day cycle, where the traveller has discounted prices up
          to 50 ticket purchases, with the discount rising to different
          &quot;ranks&quot;, up to 65%.
        </p>
        <p>
          This was the perfect opportunity to completely transform the Rede
          Expressos app experience by asking:
        </p>
      </div>

      <p className={`${styles.hmwWrap} ${styles.textBlock}`}>
        <span className={styles.hmw}>
          How might we increase hurried users&apos; awareness of available
          discounts in order to make them feel like smarter consumers?
        </span>
      </p>

      <div className={styles.gapLg} />

      {/* ── THE SOLUTION ───────────────────────────────────── */}
      <h2 id="the-solution" className={`${styles.heading} ${styles.textBlock}`}>the solution</h2>

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>The most impactful changes in the app would be:</p>
        <br />
        <ol className={styles.numberedList}>
          <li>Designing an Onboarding</li>
          <li>Rearranging the My Profile Section</li>
          <li>Change a few details in the Search and My Tickets Sections</li>
          <li>A small tinker in the Ticket Purchasing journey</li>
        </ol>
      </div>

      <div className={styles.gapMd} />

      {/* 1. Onboarding — phone left, caption right */}
      <div className={styles.imgCap}>
        <div className={styles.phoneMockup}>
          <img
            src="/images/fostering-trust/onboarding.gif"
            alt="Onboarding screen"
            className={styles.phoneMockupImg}
          />
        </div>
        <div className={styles.captionCol}>
          <p className={styles.captionWrap}>
            <span className={styles.caption}>
              1. an onboarding was a must, since it was non-existent, and so an
              onboarding experience was created where the user would be aware of
              the RFlex advantages since the first screen, and invite them
              through a fluid and quick sign up for the loyalty service. Since
              the RFlex is completely free and has no strings attached other than
              filling the data, I took advantage of that to reinforce its low
              friction.
            </span>
          </p>
        </div>
      </div>

      <div className={styles.gapMd} />

      {/* 2. My Profile — text then two phones */}
      <ol
        className={`${styles.body} ${styles.textBlock} ${styles.numberedList}`}
        start={2}
      >
        <li>
          I reworked it, by changing its icon in the navigation bar at the
          bottom, breaking down all the menu items into categories, where the
          features would exist inside a submenu, and come up with a new way to
          present the users&apos; progress in the programme, by highlighting the
          current active discount and adding a dropdown with information about
          progress, time left in the yearly cycle, and how much money was saved
          so far.
        </li>
      </ol>

      <div className={styles.phonePair} ref={pair.ref} onMouseDown={pair.onMouseDown} onMouseUp={pair.onMouseUp} onMouseLeave={pair.onMouseLeave} onMouseMove={pair.onMouseMove}>
        <div className={styles.phoneMockup}>
          <img
            src="/images/fostering-trust/profile-1.png"
            alt="My Profile — before"
            className={styles.phoneMockupImg}
          />
        </div>
        <div className={styles.phoneMockup}>
          <img
            src="/images/fostering-trust/profile-2.png"
            alt="My Profile — after"
            className={styles.phoneMockupImg}
          />
        </div>
      </div>

      <div className={styles.gapMd} />

      {/* 3. Search & Tickets — text then caption+phone */}
      <p className={`${styles.body} ${styles.textBlock}`}>
        3. Search and My Tickets sections were a bit more discreet, but changes
        were made in order to keep RFlex&apos;s presence and some form of its
        benefits always visible. For the first, the change happened in the
        &quot;Suggested Trips&quot; the original version had. They were
        disconnected from the user&apos;s reality, basically a selection of
        random trips across the country. Since the app can save trip history, I
        turned it into a &quot;Trip History&quot; style of section, where the
        most recurrent trips are shown in form of one-click search, showing its
        lowest RFlex price in the card.
      </p>

      <p className={`${styles.body} ${styles.textBlock}`}>
        As for the My Ticket section, it is a section that the user consults
        while boarding the bus, so I saw it as a great opportunity to place the
        partner&apos;s discounts inside the ticket itself, as a reminder that
        the benefits go beyond the bus ticket.
        <br /><br />
        Since there&apos;s over 20 partnerships with discounts, it is difficult
        to give this information to the user without being forgettable or
        overwhelming, and so I added a coupon-like snippet to the ticket, where
        one partner, geographically relevant to that ticket&apos;s destination,
        is shown.
      </p>

      <div className={styles.gapMd} />

      {/* Tickets — caption left, phone right */}
      <div className={`${styles.imgCap} ${styles.imgCapFlip}`}>
        <div className={styles.captionCol}>
          <p className={styles.captionWrap}>
            <span className={styles.caption}>
              Since there&apos;s over 20 partnerships with discounts, it is
              difficult to give this information to the user without being
              forgettable or overwhelming, and so I added a coupon-like snippet
              to the ticket, where one partner, geographically relevant to that
              ticket&apos;s destination, is shown.
            </span>
          </p>
        </div>
        <div className={styles.phoneMockup}>
          <img
            src="/images/fostering-trust/tickets.png"
            alt="Ticket with partner discount"
            className={styles.phoneMockupImg}
          />
        </div>
      </div>

      <div className={styles.gapMd} />

      {/* 4. Purchasing — text then single phone */}
      <p className={`${styles.body} ${styles.textBlock}`}>
        4. The purchasing journey, given how effective it is, was something that
        I refrained from tampering with, but I couldn&apos;t stop experimenting
        with the trip option cards. The prices vary, and in the original app,
        when logged into RFlex, the price is affected, but it is not shown to
        the user. The changes here are to show the service working visibly, by
        highlighting the price into a blue colour, accompanied by the designed
        logo.
      </p>

      <div className={styles.phoneMockup}>
        <img
          src="/images/fostering-trust/purchasing.png"
          alt="Purchasing journey with RFlex price"
          className={styles.phoneMockupImg}
        />
      </div>

      <div className={styles.gapLg} />

      {/* ── CONCLUSIONS ────────────────────────────────────── */}
      <h2 id="conclusions" className={`${styles.heading} ${styles.textBlock}`}>conclusions</h2>

      <div className={`${styles.body} ${styles.textBlock}`}>
        <p>
          To evaluate the impact of this proposal, I looked into Emotional
          Design&apos;s three main components of Delight:
        </p>
        <br />
        <ol className={styles.numberedList}>
          <li>
            <span className={styles.underlinedTerm}>Visceral</span> — With a
            little cleanup to the app&apos;s layouts, changing the electric
            light blue to a more eye-friendly blue, and adding some animated and
            interactive elements provide a more pleasurable experience and
            impression on the user.
          </li>
          <li>
            <span className={styles.underlinedTerm}>Behavioural</span> — By
            having a copy that refers to the user, bringing up elements that are
            somewhat gamified, and granting a sense of progress towards a bigger
            reward (a bigger discount, or the feature that shows how much you
            save in total for buying as a RFlex member), motivates the user to
            keep following it through.
          </li>
          <li>
            <span className={styles.underlinedTerm}>Reflective</span> — The
            benefits go beyond bus trips, and the user, every time they look at
            their ticket, are reminded of, for example, the 25% discount they
            have in one of Lisbon&apos;s biggest museums. These moments of
            benefit that are unrelated to bus trips will remind them of the
            benefits they get from using the Rede Expressos app and the RFlex
            service.
          </li>
        </ol>
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
