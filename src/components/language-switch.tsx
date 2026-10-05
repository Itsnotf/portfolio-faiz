'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import { useSyncExternalStore, type MouseEvent } from 'react';
import { getPathname } from '@/i18n/navigation';

type Target = 'en' | 'id';

/** Path of this page in the other language, from the hreflang link every page renders in <head>. */
function alternateFromHead(target: Target): string | null {
  const href = document.querySelector(`link[rel="alternate"][hreflang="${target}"]`)?.getAttribute('href');
  if (!href) return null;
  try {
    return new URL(href, location.href).pathname;
  } catch {
    return null;
  }
}

const noSubscription = () => () => {};

/** Pages without a slug, by their route folder. */
const SINGLE = { faq: '/faq', palembang: '/palembang', articles: '/articles' } as const;

/**
 * Links to the same page in the other language with a full page load, on purpose.
 * The locale is the top URL segment, so a client-side switch remounts the root layout and React then
 * strips every attribute it did not render from <html>, including the motion flag and the chosen theme
 * that the inline head script sets before paint. A fresh load runs that script again.
 *
 * Service and article slugs differ per language, so the exact counterpart is read from the page's own
 * hreflang link (built from the same slug data as the canonical URL). It is read again on click, so it is
 * never stale after a client-side navigation.
 *
 * The page is read from the route tree (useSelectedLayoutSegments, relative to the view layout), not from
 * usePathname: pages are prerendered at /<locale>/<view>/…, so a pathname differs between server and browser and the
 * server-rendered link would point at a page that does not exist.
 */
export function LanguageSwitch({ label, short, target }: { label: string; short: string; target: Target }) {
  const [section, slug] = useSelectedLayoutSegments();

  let computed: string;
  if (section === 'work' && slug) {
    computed = getPathname({ locale: target, href: { pathname: '/work/[slug]', params: { slug } } });
  } else if (!slug && section && section in SINGLE) {
    computed = getPathname({ locale: target, href: SINGLE[section as keyof typeof SINGLE] });
  } else {
    // Home, or a service or article whose slug differs per language: until the head is readable, the other home.
    computed = getPathname({ locale: target, href: '/' });
  }

  const fromHead = useSyncExternalStore(noSubscription, () => alternateFromHead(target), () => null);
  const href = fromHead ?? computed;

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const fresh = alternateFromHead(target);
    if (fresh && fresh !== href) {
      e.preventDefault();
      window.location.assign(fresh);
    }
  };

  return (
    <a
      href={href}
      onClick={onClick}
      hrefLang={target}
      lang={target}
      className="inline-flex min-h-10 items-center justify-center m:min-h-11 m:min-w-11 rounded-full border border-tinta/30 px-3 text-sm font-semibold no-underline transition-colors hover:border-tinta"
    >
      {short}
      {/* The visible code stays at the start of the accessible name, so voice control can say what it sees. */}
      <span className="sr-only"> {label}</span>
    </a>
  );
}
