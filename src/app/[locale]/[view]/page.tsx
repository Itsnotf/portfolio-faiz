import { setRequestLocale } from 'next-intl/server';
import { DesktopHome } from '@/components/home/desktop/home';
import { JsonLd } from '@/components/json-ld';
import type { Locale } from '@/i18n/routing';
import { graph, person, professionalService, website } from '@/lib/structured-data';
import type { View } from '@/lib/view';

export default async function Home({ params }: { params: Promise<{ locale: Locale; view: View }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Structured data is the same in both views, so search engines see one description of the page.
  return (
    <>
      <JsonLd data={graph(website(locale), person(locale), professionalService(locale))} />
      <DesktopHome locale={locale} />
    </>
  );
}
