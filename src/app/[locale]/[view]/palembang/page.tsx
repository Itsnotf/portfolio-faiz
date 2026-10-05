import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContactSection } from '@/components/contact-section';
import { FaqList } from '@/components/faq-list';
import { JsonLd } from '@/components/json-ld';
import { ProjectCard } from '@/components/project-card';
import { local, published, services, summary } from '@/content/services';
import { projects } from '@/content/work';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import type { View } from '@/lib/view';
import { breadcrumb, faqPage, graph, professionalService } from '@/lib/structured-data';

type Params = Promise<{ locale: Locale; view: View }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, title: local.metaTitle[locale], description: local.metaDescription[locale], hrefFor: () => '/palembang' });
}

export default async function PalembangPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const proof = local.proof.map((p) => projects.find((x) => x.slug === p)).filter((p) => p !== undefined);

  return (
    <>
      <JsonLd
        data={graph(
          professionalService(locale),
          faqPage(locale, local.faq),
          breadcrumb(locale, [
            { name: t('nav.home'), href: '/' },
            { name: t('nav.palembang'), href: '/palembang' },
          ]),
        )}
      />
      <article>
        <header className="wrap pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
          <Breadcrumbs trail={[{ name: t('nav.home'), href: '/' }, { name: t('nav.palembang') }]} label={t('nav.breadcrumb')} />
          <div className="grid-12 mt-8">
            <div className="md:col-span-10">
              <p className="eyebrow">{t('local.eyebrow')}</p>
              <h1 className="mt-4 text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]" data-split>
                {local.h1[locale]}
              </h1>
              <p className="lead measure-wide mt-6" data-reveal>
                {local.lead[locale]}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="#contact" data-magnetic>
                  <span className="roll" data-label={t('contact.discuss')}>
                    <span>{t('contact.discuss')}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className="section" aria-labelledby="local-services">
          <div className="wrap">
            <h2 id="local-services" className="h-section" data-split>
              {t('local.services')}
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <li key={s.key} data-reveal>
                  <Link
                    href={{ pathname: '/services/[slug]', params: { slug: s.slug[locale] } }}
                    className="card flex h-full flex-col rounded-[20px] border border-garis bg-lembar p-6 no-underline"
                  >
                    <span className="font-display text-xl font-bold">{s.h1[locale]}</span>
                    <span className="mt-2 block text-[0.975rem] text-tinta-muda">{summary(s.key, locale)}</span>
                    <span className="link mt-auto self-start pt-4 text-sm font-semibold text-stempel">{t('servicesSection.more')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section border-t border-garis" aria-labelledby="local-proof">
          <div className="wrap">
            <h2 id="local-proof" className="h-section" data-split>
              {t('local.proof')}
            </h2>
            <p className="lead measure-wide mt-4" data-reveal>
              {t('local.berkala')}
            </p>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {proof.map((p) => (
                <li key={p.slug} data-reveal>
                  <ProjectCard
                    project={p}
                    locale={locale}
                    category={p.problems.map((k) => t(`archive.${k}`)).join(', ')}
                    labels={{ decision: t('archive.decision'), diagram: t('archive.title'), readCase: t('service.readCase') }}
                    sizes="(min-width: 640px) 40rem, 90vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {published(local.faq).length ? (
          <section className="section border-t border-garis" aria-labelledby="local-faq">
            <div className="wrap grid-12 gap-y-8">
              <h2 id="local-faq" className="text-3xl md:col-span-4" data-split>
                {t('local.faq')}
              </h2>
              <div className="md:col-span-8">
                <FaqList items={local.faq} locale={locale} />
                <Link href="/faq" className="link tap-area mt-6 inline-block font-semibold text-stempel">
                  {t('nav.faq')}
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </article>
      <ContactSection />
    </>
  );
}
