import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heritage Homeowners — Duarte André',
  description: 'Helping Estonian heritage homeowners start their complex renovation projects — a service design project creating a starter-plan generator that guides unaware homeowners through energy efficiency renovations without overwhelming them.',
  alternates: { canonical: '/projects/heritage-homeowners' },
  openGraph: {
    title: 'Heritage Homeowners — Duarte André',
    description: 'Helping Estonian heritage homeowners start their complex renovation projects through a starter-plan generator.',
    url: 'https://duarte-a-c-g-a.com/projects/heritage-homeowners',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
