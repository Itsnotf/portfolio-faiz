import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContactSection } from '@/components/contact-section';
import { JsonLd } from '@/components/json-ld';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { articles } from '@/lib/articles';
import { pageMetadata } from '@/lib/seo';
import { breadcrumb, graph } from '@/lib/structured-data';

type Params = Promise<{ locale: Locale }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'articles' });
  const list = articles(locale);
  return {
    ...pageMetadata({ locale, title: t('metaTitle'), description: t('metaDescription'), hrefFor: () => '/articles' }),
    ...(list.every((a) => a.draft) ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function ArticlesPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const list = articles(locale);
  // No page until at least one article is visible, so there is never an empty list for search engines.
  if (!list.length) notFound();
  const t = await getTranslations();
  const date = (d: string) => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(d));

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumb(locale, [
            { name: t('nav.home'), href: '/' },
            { name: t('nav.articles'), href: '/articles' },
          ]),
        )}
      />
      <header className="wrap pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <Breadcrumbs trail={[{ name: t('nav.home'), href: '/' }, { name: t('nav.articles') }]} label={t('nav.breadcrumb')} />
        <div className="grid-12 mt-8">
          <div className="md:col-span-10">
            <h1 className="text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]" data-split>
              {t('articles.title')}
            </h1>
            <p className="lead measure-wide mt-6" data-reveal>
              {t('articles.lead')}
            </p>
          </div>
        </div>
      </header>

      <section className="section" aria-label={t('nav.articles')}>
        <ul className="wrap border-t border-garis">
          {list.map((a) => (
            <li key={a.slug} className="border-b border-garis" data-reveal>
              <Link
                href={{ pathname: '/articles/[slug]', params: { slug: a.slug } }}
                className="card grid-12 gap-y-3 py-8 no-underline md:py-10"
              >
                <div className="text-sm text-tinta-muda md:col-span-3">
                  {a.draft ? <span className="mb-2 mr-2 inline-flex rounded-full bg-kuning px-2.5 py-0.5 font-semibold text-[#1e2a4a]">{t('articles.draft')}</span> : null}
                  <time dateTime={a.published} className="block">
                    {date(a.published)}
                  </time>
                  <span className="block">{t('articles.minutes', { n: a.minutes })}</span>
                </div>
                <div className="md:col-span-8">
                  <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.12]">{a.title}</h2>
                  <p className="mt-3 text-tinta-muda">{a.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <ContactSection />
    </>
  );
}
