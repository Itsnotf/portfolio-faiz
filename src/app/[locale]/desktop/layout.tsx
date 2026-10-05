import { setRequestLocale } from 'next-intl/server';
import { DesktopChrome } from '@/components/chrome/desktop-chrome';
import type { Locale } from '@/i18n/routing';

/**
 * Desktop pages: full header, smooth scrolling, page motion.
 * src/proxy.ts rewrites each public URL here or to the other view; the route files below re-export the shared screens
 * in src/screens, so each view only ships its own client code. Never call headers() or cookies() below this folder.
 */
export default async function DesktopLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className="view-root" data-view="desktop">
      <DesktopChrome>{children}</DesktopChrome>
    </div>
  );
}
