import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContactSection } from '@/components/contact-section';
import { FaqList } from '@/components/faq-list';
import { JsonLd } from '@/components/json-ld';
import { ProjectCard } from '@/components/project-card';
import { principles } from '@/content/profile';
import { published, serviceBySlug, services, summary } from '@/content/services';
import { projects } from '@/content/work';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { pageMetadata, type Href } from '@/lib/seo';
import { breadcrumb, faqPage, graph, serviceEntity } from '@/lib/structured-data';

type Params = Promise<{ locale: Locale; slug: string }>;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug[locale] })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = serviceBySlug(locale, slug);
  if (!s) return {};
  return pageMetadata({
    locale,
    title: s.metaTitle[locale],
    description: s.metaDescription[locale],
    hrefFor: (l) => ({ pathname: '/services/[slug]', params: { slug: s.slug[l] } }),
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const s = serviceBySlug(locale, slug);
  if (!s) notFound();
  const t = await getTranslations();

  const self: Href = { pathname: '/services/[slug]', params: { slug: s.slug[locale] } };
  const trail = [
    { name: t('nav.home'), href: '/' as const },
    { name: t('nav.services'), href: { pathname: '/' as const, hash: 'services' } },
    { name: s.name[locale] },
  ];
  const proof = s.proof.map((p) => projects.find((x) => x.slug === p)).filter((p) => p !== undefined);
  const others = services.filter((x) => x.key !== s.key);
  const updated = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(s.updated));

  return (
    <>
      <JsonLd
        data={graph(
          serviceEntity(locale, s),
          faqPage(locale, s.faq),
          breadcrumb(locale, [
            { name: t('nav.home'), href: '/' },
            { name: s.name[locale], href: self },
          ]),
        )}
      />
      <article>
        <header className="wrap pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
          <Breadcrumbs trail={trail} label={t('nav.breadcrumb')} />
          <div className="grid-12 mt-8">
            <div className="md:col-span-10">
              <h1 className="text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]" data-split>
                {s.h1[locale]}
              </h1>
              <p className="lead measure-wide mt-6" data-reveal>
                {s.lead[locale]}
              </p>
              <p className="mt-4 text-sm text-tinta-muda">{t('service.updated', { date: updated })}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="#contact" data-magnetic>
                  <span className="roll" data-label={t('hero.primary')}>
                    <span>{t('hero.primary')}</span>
                  </span>
                </a>
                <a className="btn btn-secondary" href="#proof">
                  <span className="roll" data-label={t('service.proof')}>
                    <span>{t('service.proof')}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className="section" aria-labelledby="problems-title">
          <div className="wrap grid-12 gap-y-8">
            <h2 id="problems-title" className="text-3xl md:col-span-4" data-split>
              {t('service.problems')}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 md:col-span-8">
              {s.problems.map((p, i) => (
                <li key={p.en} className="flex gap-3 rounded-[20px] border border-garis bg-lembar p-5" data-reveal={i * 0.06}>
                  <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-stempel" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                  <span>{p[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="proof" className="section border-t border-garis" aria-labelledby="proof-title">
          <div className="wrap">
            <h2 id="proof-title" className="h-section" data-split>
              {t('service.proof')}
            </h2>
            <p className="lead measure mt-4" data-reveal>
              {t('service.proofIntro')}
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

        <section className="section border-t border-garis" aria-labelledby="process-title">
          <div className="wrap grid-12 gap-y-8">
            <div className="md:col-span-4">
              <h2 id="process-title" className="text-3xl" data-split>
                {t('service.process')}
              </h2>
              <Link href={{ pathname: '/', hash: 'approach' }} className="link mt-4 inline-block text-sm font-semibold text-stempel">
                {t('service.processLink')}
              </Link>
            </div>
            <ol className="md:col-span-8">
              {principles.map((p, i) => (
                <li key={p.title.en} className="flex gap-5 border-t border-garis py-6 first:border-t-0 first:pt-0" data-reveal>
                  <span className="font-display text-2xl font-bold text-stempel [font-stretch:115%]">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-xl">{p.title[locale]}</h3>
                    <p className="mt-1 text-tinta-muda">{p.body[locale]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section border-t border-garis" aria-labelledby="cost-title">
          <div className="wrap grid-12 gap-y-8">
            <h2 id="cost-title" className="text-3xl md:col-span-4" data-split>
              {t('service.cost')}
            </h2>
            <div className="md:col-span-8">
              <ul className="space-y-3">
                {s.costFactors.map((c) => (
                  <li key={c.en} className="flex gap-3 text-lg" data-reveal>
                    <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-stempel" />
                    <span>{c[locale]}</span>
                  </li>
                ))}
              </ul>
              <p className="measure-wide mt-6 text-tinta-muda">{t('service.costNote')}</p>
            </div>
          </div>
        </section>

        {published(s.faq).length ? (
          <section className="section border-t border-garis" aria-labelledby="faq-title">
            <div className="wrap grid-12 gap-y-8">
              <h2 id="faq-title" className="text-3xl md:col-span-4" data-split>
                {t('service.faq')}
              </h2>
              <div className="md:col-span-8">
                <FaqList items={s.faq} locale={locale} />
              </div>
            </div>
          </section>
        ) : null}

        <section className="section border-t border-garis" aria-labelledby="other-title">
          <div className="wrap">
            <h2 id="other-title" className="text-3xl" data-split>
              {t('service.other')}
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.key}>
                  <Link
                    href={{ pathname: '/services/[slug]', params: { slug: o.slug[locale] } }}
                    className="card block h-full rounded-[20px] border border-garis bg-lembar p-6 no-underline"
                  >
                    <span className="font-display text-xl font-bold">{o.h1[locale]}</span>
                    <span className="mt-2 block text-[0.975rem] text-tinta-muda">{summary(o.key, locale)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
      <ContactSection />
    </>
  );
}
