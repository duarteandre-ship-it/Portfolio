import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fostering Trust — Duarte André',
  description: 'Fostering trust between users and the Rede Expressos app through an emotional design approach — applying Don Norman\'s three levels of emotional design to improve loyalty and engagement.',
  alternates: { canonical: '/projects/fostering-trust' },
  openGraph: {
    title: 'Fostering Trust — Duarte André',
    description: 'Fostering trust between users and the Rede Expressos app through an emotional design approach.',
    url: 'https://duarte-a-c-g-a.com/projects/fostering-trust',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
