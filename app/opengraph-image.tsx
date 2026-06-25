import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const alt = 'Duarte André — Designer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const fontBold = await readFile(join(process.cwd(), 'public/fonts/jetjanemono-bold.ttf'));
  const fontPlain = await readFile(join(process.cwd(), 'public/fonts/jetjanemono-plain.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#efefef',
          padding: '80px',
        }}
      >
        {/* Asterisk */}
        <svg viewBox="0 0 21 21" fill="none" width={64} height={64}>
          <path
            d="M20.8687 7.48125L18.2437 3.01875L13.125 5.90625V0H7.875V5.90625L2.625 3.01875L0 7.48125L5.11875 10.5L0 13.5188L2.625 17.9812L7.875 15.0938V21H13.125V15.0938L18.2437 17.9812L20.8687 13.5188L15.6187 10.5L20.8687 7.48125Z"
            fill="#292828"
          />
        </svg>

        {/* Name + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: 96, fontWeight: 700, color: '#292828', fontFamily: 'JetJaneMono', lineHeight: 1 }}>
            duarte andré
          </div>
          <div style={{ fontSize: 36, fontWeight: 400, color: '#292828', fontFamily: 'JetJaneMono' }}>
            ux/ui &amp; interaction designer
          </div>
        </div>

        {/* URL */}
        <div style={{ fontSize: 24, fontWeight: 400, color: '#292828', fontFamily: 'JetJaneMono', opacity: 0.5 }}>
          duarte-a-c-g-a.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'JetJaneMono', data: fontBold, weight: 700 },
        { name: 'JetJaneMono', data: fontPlain, weight: 400 },
      ],
    },
  );
}
