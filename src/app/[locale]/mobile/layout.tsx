import type { Viewport } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { MobileChrome } from '@/components/chrome/mobile-chrome';
import type { Locale } from '@/i18n/routing';

// Lets the tab bar sit above the home indicator (env(safe-area-inset-bottom) is 0 without it). Phone pages only:
// the desktop pages do not pad for the notch, so they keep the default viewport.
export const viewport: Viewport = { viewportFit: 'cover' };

/**
 * Phone pages: compact top bar, bottom tab bar, native scrolling, no GSAP.
 * src/proxy.ts rewrites each public URL here or to the other view; the route files below re-export the shared screens
 * in src/screens, so each view only ships its own client code. Never call headers() or cookies() below this folder.
 */
export default async function MobileLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className="view-root" data-view="mobile">
      <MobileChrome>{children}</MobileChrome>
    </div>
  );
}
