import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

// NEXT_PUBLIC_SITE_URL is set to the real .com domain on Vercel.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com').replace(/\/$/, '');

/** A typed in-app link, exactly what next-intl's Link and getPathname accept. */
export type Href = Parameters<typeof getPathname>[0]['href'];

/** Public path of a page in a given language (localised segments, no prefix for Indonesian). */
export function pathFor(locale: Locale, href: Href): string {
  return getPathname({ locale, href });
}

/** Absolute URL of a page in a given language. */
export function urlFor(locale: Locale, href: Href): string {
  const path = pathFor(locale, href);
  return `${siteUrl}${path === '/' ? '' : path}` || siteUrl;
}

/**
 * Canonical URL plus hreflang alternates. `hrefFor` returns the page's href in each language, because slugs of
 * services and articles differ per language. The language switch reads these alternates from <head>.
 */
export function alternates(locale: Locale, hrefFor: (l: Locale) => Href) {
  return {
    canonical: pathFor(locale, hrefFor(locale)),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, pathFor(l, hrefFor(l))])),
      // Visitors whose language matches neither get English.
      'x-default': pathFor('en', hrefFor('en')),
    } as Record<Locale | 'x-default', string>,
  };
}

/**
 * Metadata for one page: keyword-first title, description, canonical, hreflang and Open Graph, all consistent.
 * `absoluteTitle` skips the "— Faiz Aflah Hafizuddin" suffix (used where the title already carries the name).
 */
export function pageMetadata(opts: {
  locale: Locale;
  title: string;
  description: string;
  hrefFor: (l: Locale) => Href;
  type?: 'website' | 'article';
  /** Dates shown to social networks for articles. */
  dates?: { published: string; updated: string };
  absoluteTitle?: boolean;
}): Metadata {
  const alt = alternates(opts.locale, opts.hrefFor);
  // Pages without their own opengraph-image file share the site image. A route's own image file still wins.
  const home = pathFor(opts.locale, '/');
  const images = [{ url: `${home === '/' ? '' : home}/opengraph-image`, width: 1200, height: 630, alt: opts.title }];
  const base = {
    title: opts.title,
    description: opts.description,
    url: alt.canonical,
    siteName: 'Faiz Aflah Hafizuddin',
    locale: opts.locale === 'id' ? 'id_ID' : 'en_US',
    images,
  };
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: alt,
    openGraph:
      opts.type === 'article'
        ? {
            ...base,
            type: 'article',
            authors: ['Faiz Aflah Hafizuddin'],
            ...(opts.dates ? { publishedTime: opts.dates.published, modifiedTime: opts.dates.updated } : {}),
          }
        : { ...base, type: 'website' },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description, images },
  };
}
