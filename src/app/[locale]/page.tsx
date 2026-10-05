import { setRequestLocale } from 'next-intl/server';
import { DesktopHome } from '@/components/home/desktop/home';
import { JsonLd } from '@/components/json-ld';
import type { Locale } from '@/i18n/routing';
import { graph, person, professionalService, website } from '@/lib/structured-data';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={graph(website(locale), person(locale), professionalService(locale))} />
      <DesktopHome locale={locale} />
    </>
  );
}
