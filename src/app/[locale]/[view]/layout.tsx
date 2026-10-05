import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { DesktopChrome } from '@/components/chrome/desktop-chrome';
import { MobileChrome } from '@/components/chrome/mobile-chrome';
import type { Locale } from '@/i18n/routing';
import { isView, views } from '@/lib/view';

// Both views of every page are built ahead of time; src/proxy.ts picks one per request.
export const dynamicParams = false;

export function generateStaticParams() {
  return views.map((view) => ({ view }));
}

/**
 * Header, navigation, footer and motion differ per view. Never call headers() or cookies() below this folder: the view
 * comes only from the URL, which keeps every page static.
 */
export default async function ViewLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string; view: string }> }) {
  const { locale, view } = await params;
  if (!isView(view)) notFound();
  setRequestLocale(locale as Locale);

  return (
    <div className="view-root" data-view={view}>
      {view === 'mobile' ? <MobileChrome>{children}</MobileChrome> : <DesktopChrome>{children}</DesktopChrome>}
    </div>
  );
}
