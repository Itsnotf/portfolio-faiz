'use client';

import { useParams } from 'next/navigation';
import { useSyncExternalStore, type MouseEvent } from 'react';
import { getPathname, usePathname } from '@/i18n/navigation';

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

/**
 * Links to the same page in the other language with a full page load, on purpose.
 * The locale is the top URL segment, so a client-side switch remounts the root layout and React then
 * strips every attribute it did not render from <html>, including the motion flag and the chosen theme
 * that the inline head script sets before paint. A fresh load runs that script again.
 *
 * Service and article slugs differ per language, so the exact counterpart is read from the page's own
 * hreflang link (built from the same slug data as the canonical URL). It is read again on click, so it is
 * never stale after a client-side navigation.
 */
export function LanguageSwitch({ label, short, target }: { label: string; short: string; target: Target }) {
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();

  let computed: string;
  switch (pathname) {
    case '/work/[slug]':
      computed = getPathname({ locale: target, href: { pathname, params: { slug: params.slug ?? '' } } });
      break;
    case '/services/[slug]':
    case '/articles/[slug]':
      // Slug differs per language; until the head is readable, fall back to the other language's home.
      computed = getPathname({ locale: target, href: '/' });
      break;
    default:
      computed = getPathname({ locale: target, href: pathname });
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
      className="inline-flex min-h-10 items-center rounded-full border border-tinta/30 px-3 text-sm font-semibold no-underline transition-colors hover:border-tinta"
    >
      {short}
      {/* The visible code stays at the start of the accessible name, so voice control can say what it sees. */}
      <span className="sr-only"> {label}</span>
    </a>
  );
}
