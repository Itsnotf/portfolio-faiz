import { caseStudies } from '@/content/work';
import { routing, type Locale } from '@/i18n/routing';
import { ogImage, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Case study';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => caseStudies.map((p) => ({ locale, slug: p.slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const p = caseStudies.find((c) => c.slug === slug)!;
  return ogImage({
    eyebrow: locale === 'id' ? 'Studi kasus, Faiz Aflah Hafizuddin' : 'Case study, Faiz Aflah Hafizuddin',
    title: p.title[locale],
    body: p.summary[locale],
    stamp: locale === 'id' ? 'DISETUJUI' : 'APPROVED',
  });
}
