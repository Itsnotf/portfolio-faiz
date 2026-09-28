import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContactSection } from '@/components/contact-section';
import { FaqList } from '@/components/faq-list';
import { JsonLd } from '@/components/json-ld';
import { generalFaq, services } from '@/content/services';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { breadcrumb, faqPage, graph } from '@/lib/structured-data';

type Params = Promise<{ locale: Locale }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  return pageMetadata({ locale, title: t('metaTitle'), description: t('metaDescription'), hrefFor: () => '/faq' });
}

export default async function FaqPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <JsonLd
        data={graph(
          faqPage(locale, generalFaq),
          breadcrumb(locale, [
            { name: t('nav.home'), href: '/' },
            { name: t('nav.faq'), href: '/faq' },
          ]),
        )}
      />
      <article>
        <header className="wrap pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
          <Breadcrumbs trail={[{ name: t('nav.home'), href: '/' }, { name: t('nav.faq') }]} label={t('nav.breadcrumb')} />
          <div className="grid-12 mt-8">
            <div className="md:col-span-10">
              <h1 className="text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]" data-split>
                {t('faqPage.title')}
              </h1>
              <p className="lead measure-wide mt-6" data-reveal>
                {t('faqPage.lead')}
              </p>
            </div>
          </div>
        </header>

        <section className="section" aria-label={t('faqPage.title')}>
          <div className="wrap grid-12 gap-y-12">
            <div className="md:col-span-8">
              <FaqList items={generalFaq} locale={locale} />
            </div>
            <nav aria-label={t('footer.services')} className="md:col-span-3 md:col-start-10">
              <p className="font-semibold">{t('footer.services')}</p>
              <ul className="mt-3 space-y-2">
                {services.map((s) => (
                  <li key={s.key}>
                    <Link href={{ pathname: '/services/[slug]', params: { slug: s.slug[locale] } }} className="link-quiet text-stempel">
                      {s.name[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </article>
      <ContactSection />
    </>
  );
}
