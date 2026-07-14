import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const SITE_URL = 'https://duarte-a-c-g-a.com';

export const metadata: Metadata = {
  title: 'Duarte André — Designer',
  description: 'Portfolio of Duarte André, a UX/UI and interaction designer from Faro, Portugal, currently based in Tallinn pursuing an MA in Interaction Design at the Estonian Academy of Arts.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  verification: { google: 'mMLXdyQ9JTPmy0CHOY_8SYxqfEHUH7IEZnxuU7e7ku0' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Duarte André — Designer',
    title: 'Duarte André — Designer',
    description: 'Portfolio of Duarte André, a UX/UI and interaction designer from Faro, Portugal, currently based in Tallinn pursuing an MA in Interaction Design at the Estonian Academy of Arts.',
  },
  twitter: {
    card: 'summary',
    title: 'Duarte André — Designer',
    description: 'Portfolio of Duarte André, a UX/UI and interaction designer from Faro, Portugal, currently based in Tallinn.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Duarte André',
  alternateName: ['Duarte Andre', 'duarte.andré'],
  url: SITE_URL,
  email: 'dudas23andre@gmail.com',
  jobTitle: 'UX/UI & Interaction Designer',
  description: 'Designer from Faro, Portugal, pursuing an MA in Interaction Design at the Estonian Academy of Arts in Tallinn.',
  sameAs: [
    'https://www.linkedin.com/in/duarte-andr%C3%A9-9a731b2a4/',
    'https://www.behance.net/duarteamaral1',
  ],
  knowsAbout: ['UX Design', 'UI Design', 'Interaction Design', 'Product Design', 'Service Design', 'Design Thinking'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Runs before hydration — applies stored color scheme so colors are
            correct from the very first paint with no flash. */}
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{var S=[{bg:'#efefef',ink:'#292828',shadow:'rgba(41,40,40,0.25)',overlay:'rgba(239,239,239,0.6)'},{bg:'#1E3A22',ink:'#76D6B6',shadow:'rgba(118,214,182,0.25)',overlay:'rgba(30,58,34,0.6)'},{bg:'#FE9DC7',ink:'#392759',shadow:'rgba(57,39,89,0.25)',overlay:'rgba(254,157,199,0.6)'},{bg:'#DBD145',ink:'#326AD8',shadow:'rgba(50,106,216,0.25)',overlay:'rgba(219,209,69,0.6)'},{bg:'#292828',ink:'#efefef',shadow:'rgba(239,239,239,0.25)',overlay:'rgba(41,40,40,0.6)'}];var i=parseInt(localStorage.getItem('portfolio-scheme-index')||'0',10);if(i>=0&&i<S.length){var s=S[i],r=document.documentElement;r.style.setProperty('--color-bg',s.bg);r.style.setProperty('--color-black',s.ink);r.style.setProperty('--color-shadow',s.shadow);r.style.setProperty('--color-overlay',s.overlay);}}catch(e){}})();`}</Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
