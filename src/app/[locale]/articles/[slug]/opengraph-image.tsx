import { routing, type Locale } from '@/i18n/routing';
import { articleBySlug, articles } from '@/lib/articles';
import { ogImage, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Article';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => articles(locale).map((a) => ({ locale, slug: a.slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const a = articleBySlug(locale, slug)!;
  return ogImage({
    eyebrow: locale === 'id' ? 'Artikel, Faiz Aflah Hafizuddin' : 'Article, Faiz Aflah Hafizuddin',
    title: a.title,
    stamp: locale === 'id' ? 'CATATAN' : 'NOTES',
  });
}
