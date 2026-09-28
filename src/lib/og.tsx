import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

const font = (file: string) => readFile(join(process.cwd(), 'src/fonts/og', file));

/**
 * Link-preview image in the site's own language: paper background, ink type, and the
 * yellow and pink carbon copies with a violet stamp from the hero, tidied into a stack.
 */
export async function ogImage({ eyebrow, title, body, stamp }: { eyebrow: string; title: string; body?: string; stamp: string }) {
  const [display, sans, sansBold] = await Promise.all([font('Anybody-700.woff'), font('PublicSans-400.woff'), font('PublicSans-600.woff')]);
  const long = title.length > 40;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#eef1f0', color: '#1e2a4a', padding: 64, fontFamily: 'Public Sans' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 780 }}>
          <div style={{ fontSize: 28, fontWeight: 600 }}>{eyebrow}</div>
          <div style={{ fontFamily: 'Anybody', fontSize: long ? 64 : 104, lineHeight: 1.02, marginTop: 36 }}>{title}</div>
          {body ? <div style={{ fontSize: 30, lineHeight: 1.4, color: '#4a5572', marginTop: 28 }}>{body}</div> : null}
        </div>
        <div style={{ display: 'flex', position: 'relative', flex: 1 }}>
          <div style={{ position: 'absolute', right: 10, bottom: 40, width: 230, height: 290, background: '#efa3b6', transform: 'rotate(7deg)' }} />
          <div style={{ position: 'absolute', right: 30, bottom: 50, width: 230, height: 290, background: '#f2cf3a', transform: 'rotate(-4deg)' }} />
          <div style={{ position: 'absolute', right: 50, bottom: 60, width: 230, height: 290, background: '#fbfcfb', border: '1px solid #c9cfd3', display: 'flex', flexDirection: 'column', padding: 22 }}>
            {[150, 110, 170, 90, 140].map((w, i) => (
              <div key={i} style={{ height: 10, width: w, background: '#c9cfd3', borderRadius: 5, marginBottom: 18 }} />
            ))}
          </div>
          <div style={{ position: 'absolute', right: 70, bottom: 110, display: 'flex', padding: '10px 18px', border: '4px solid #6b3fa0', color: '#6b3fa0', fontFamily: 'Anybody', fontSize: 30, letterSpacing: 2, transform: 'rotate(-12deg)' }}>
            {stamp}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Anybody', data: display, weight: 700 },
        { name: 'Public Sans', data: sans, weight: 400 },
        { name: 'Public Sans', data: sansBold, weight: 600 },
      ],
    },
  );
}
