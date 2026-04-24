import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Duarte — Portfolio',
  description: 'UX/UI / interaction / product / digital product / multidisciplinary / cool designer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        {/* Runs before hydration — applies stored color scheme so colors are
            correct from the very first paint with no flash. */}
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{var S=[{bg:'#efefef',ink:'#292828',shadow:'rgba(41,40,40,0.25)',overlay:'rgba(239,239,239,0.6)'},{bg:'#1E3A22',ink:'#76D6B6',shadow:'rgba(118,214,182,0.25)',overlay:'rgba(30,58,34,0.6)'},{bg:'#FE9DC7',ink:'#392759',shadow:'rgba(57,39,89,0.25)',overlay:'rgba(254,157,199,0.6)'},{bg:'#DBD145',ink:'#326AD8',shadow:'rgba(50,106,216,0.25)',overlay:'rgba(219,209,69,0.6)'},{bg:'#292828',ink:'#efefef',shadow:'rgba(239,239,239,0.25)',overlay:'rgba(41,40,40,0.6)'}];var i=parseInt(localStorage.getItem('portfolio-scheme-index')||'0',10);if(i>=0&&i<S.length){var s=S[i],r=document.documentElement;r.style.setProperty('--color-bg',s.bg);r.style.setProperty('--color-black',s.ink);r.style.setProperty('--color-shadow',s.shadow);r.style.setProperty('--color-overlay',s.overlay);}}catch(e){}})();`}</Script>
        {children}
      </body>
    </html>
  );
}
