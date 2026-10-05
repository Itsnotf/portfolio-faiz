import { setRequestLocale } from 'next-intl/server';
import { JsonLd } from '@/components/json-ld';
import type { Locale } from '@/i18n/routing';
import { graph, person, professionalService, website } from '@/lib/structured-data';

/** The home page with the given sections (src/components/home/desktop or mobile). Structured data is the same in both. */
export function homePage(Sections: (props: { locale: Locale }) => React.ReactNode) {
  return async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
      <>
        <JsonLd data={graph(website(locale), person(locale), professionalService(locale))} />
        <Sections locale={locale} />
      </>
    );
  };
}
