import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import type { ServiceKey } from '@/content/services';
import { routing, type Locale } from '@/i18n/routing';

/**
 * Articles live as Markdown in content/articles/<locale>/<slug>.md and are read at build time. The two language
 * versions of one article share a `key`, which is how canonical, hreflang and the language switch find each other.
 */
export interface Article {
  key: string;
  locale: Locale;
  slug: string;
  title: string;
  /** Search-result title, kept short enough for the " — Faiz Aflah Hafizuddin" suffix. */
  metaTitle: string;
  description: string;
  /** The direct answer shown first on the page, the part search engines and AI assistants quote. */
  summary: string;
  published: string;
  updated: string;
  services: ServiceKey[];
  work: string[];
  /** Drafts wait for Faiz's approval and never reach the sitemap, llms files or search results. */
  draft: boolean;
  markdown: string;
  html: string;
  minutes: number;
}

const root = path.join(process.cwd(), 'content', 'articles');
const md = new Marked({ gfm: true });

/** Drafts show in development and in preview builds made with SHOW_DRAFTS=1, marked as drafts and not indexed. */
export const showDrafts = process.env.NODE_ENV === 'development' || process.env.SHOW_DRAFTS === '1';

// YAML turns 2026-09-28 into a Date; keep plain ISO days everywhere.
const day = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v));

function read(): Article[] {
  const list = routing.locales.flatMap((locale) => {
    const dir = path.join(root, locale);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((file): Article => {
        const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
        for (const field of ['key', 'title', 'description', 'summary', 'published']) {
          if (!data[field]) throw new Error(`content/articles/${locale}/${file} is missing "${field}"`);
        }
        return {
          key: data.key,
          locale,
          slug: file.replace(/\.md$/, ''),
          title: data.title,
          metaTitle: data.metaTitle ?? data.title,
          description: data.description,
          summary: data.summary,
          published: day(data.published),
          updated: day(data.updated ?? data.published),
          services: data.services ?? [],
          work: data.work ?? [],
          draft: data.draft === true,
          markdown: content.trim(),
          html: md.parse(content) as string,
          minutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
        };
      });
  });
  // Every article must exist in every language, or its hreflang links would point nowhere.
  for (const a of list) {
    for (const l of routing.locales) {
      if (!list.some((x) => x.key === a.key && x.locale === l)) throw new Error(`Article "${a.key}" has no ${l} version`);
    }
  }
  return list;
}

let cache: Article[] | undefined;
const all = () => (process.env.NODE_ENV === 'development' ? read() : (cache ??= read()));

/** Articles in one language, newest first. Drafts are included only where `showDrafts` allows, unless asked. */
export function articles(locale: Locale, opts: { drafts?: boolean } = {}): Article[] {
  const drafts = opts.drafts ?? showDrafts;
  return all()
    .filter((a) => a.locale === locale && (drafts || !a.draft))
    .sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title));
}

/** Approved articles only, for the sitemap, llms files and anything else search engines read. */
export const publishedArticles = (locale: Locale) => articles(locale, { drafts: false });

export const articleBySlug = (locale: Locale, slug: string) => articles(locale).find((a) => a.slug === slug);

/** The same article in another language. */
export const translation = (a: Article, locale: Locale) => all().find((x) => x.key === a.key && x.locale === locale)!;
