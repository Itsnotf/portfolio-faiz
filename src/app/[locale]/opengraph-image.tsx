import { hero, profile } from '@/content/profile';
import { routing, type Locale } from '@/i18n/routing';
import { ogImage, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Faiz Aflah Hafizuddin';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return ogImage({
    eyebrow: `${profile.name}, ${profile.jobTitle[locale]}`,
    title: `${hero.greeting[locale]} ${hero.headline[locale]}`,
    stamp: locale === 'id' ? 'DISETUJUI' : 'APPROVED',
  });
}
