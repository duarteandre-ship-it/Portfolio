import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galp CONNECT — Duarte André',
  description: 'Redesigning Galp\'s broken 3 minutes onboarding experience to improve B2C conversion — simplifying a complex energy subscription flow through research, usability testing, and an omnichannel design system.',
  alternates: { canonical: '/projects/onboarding' },
  openGraph: {
    title: 'Galp CONNECT — Duarte André',
    description: 'Redesigning Galp\'s broken 3 minutes onboarding experience to improve B2C conversion.',
    url: 'https://duarte-a-c-g-a.com/projects/onboarding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
