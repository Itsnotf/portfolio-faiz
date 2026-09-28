import type { MetadataRoute } from 'next';
import { services } from '@/content/services';
import { caseStudies } from '@/content/work';
import { publishedArticles, translation } from '@/lib/articles';
import { routing, type Locale } from '@/i18n/routing';
import { urlFor, type Href } from '@/lib/seo';

interface Entry {
  hrefFor: (l: Locale) => Href;
  updated: string;
  priority: number;
}

/** Latest content date on the site, used for pages that summarise everything (home, FAQ). */
const posts = publishedArticles('id');
const latest = [...services.map((s) => s.updated), ...caseStudies.map((p) => p.updated ?? ''), ...posts.map((a) => a.updated)].sort().at(-1)!;

const entries: Entry[] = [
  { hrefFor: () => '/', updated: latest, priority: 1 },
  ...services.map((s) => ({
    hrefFor: (l: Locale): Href => ({ pathname: '/services/[slug]', params: { slug: s.slug[l] } }),
    updated: s.updated,
    priority: 0.9,
  })),
  { hrefFor: () => '/palembang', updated: latest, priority: 0.8 },
  { hrefFor: () => '/faq', updated: latest, priority: 0.7 },
  ...caseStudies.map((p) => ({
    hrefFor: (): Href => ({ pathname: '/work/[slug]', params: { slug: p.slug } }),
    updated: p.updated ?? latest,
    priority: 0.8,
  })),
  // Articles appear only once Faiz approves them (draft: false).
  ...(posts.length ? [{ hrefFor: (): Href => '/articles', updated: posts.map((a) => a.updated).sort().at(-1)!, priority: 0.6 }] : []),
  ...posts.map((a) => ({
    hrefFor: (l: Locale): Href => ({ pathname: '/articles/[slug]', params: { slug: translation(a, l).slug } }),
    updated: a.updated,
    priority: 0.7,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  // One entry per language, each listing all language versions, as Google recommends for hreflang sitemaps.
  return entries.flatMap((e) =>
    routing.locales.map((locale) => ({
      url: urlFor(locale, e.hrefFor(locale)),
      lastModified: new Date(e.updated),
      changeFrequency: 'monthly' as const,
      priority: e.priority,
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, urlFor(l, e.hrefFor(l))])) },
    })),
  );
}
