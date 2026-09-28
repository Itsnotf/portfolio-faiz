import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContactSection } from '@/components/contact-section';
import { JsonLd } from '@/components/json-ld';
import { ProjectCard } from '@/components/project-card';
import { profile } from '@/content/profile';
import { serviceByKey, summary } from '@/content/services';
import { projects } from '@/content/work';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { articleBySlug, articles, translation } from '@/lib/articles';
import { pageMetadata } from '@/lib/seo';
import { blogPosting, breadcrumb, graph, person } from '@/lib/structured-data';

type Params = Promise<{ locale: Locale; slug: string }>;

// Only articles that exist (and, outside preview builds, are approved) get a page.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => articles(locale).map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = articleBySlug(locale, slug);
  if (!a) return {};
  return {
    ...pageMetadata({
      locale,
      title: a.metaTitle,
      description: a.description,
      type: 'article',
      dates: { published: a.published, updated: a.updated },
      hrefFor: (l) => ({ pathname: '/articles/[slug]', params: { slug: translation(a, l).slug } }),
    }),
    // A draft is only a preview for approval, so search engines must not keep it.
    ...(a.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const a = articleBySlug(locale, slug);
  if (!a) notFound();
  const t = await getTranslations();

  const date = (d: string) => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(d));
  const work = a.work.map((s) => projects.find((p) => p.slug === s)).filter((p) => p !== undefined);
  const related = a.services.map(serviceByKey);

  return (
    <>
      {a.draft ? null : (
        <JsonLd
          data={graph(
            blogPosting(locale, a),
            person(locale),
            breadcrumb(locale, [
              { name: t('nav.home'), href: '/' },
              { name: t('nav.articles'), href: '/articles' },
              { name: a.title, href: { pathname: '/articles/[slug]', params: { slug: a.slug } } },
            ]),
          )}
        />
      )}
      <article>
        <header className="wrap pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
          <Breadcrumbs
            trail={[{ name: t('nav.home'), href: '/' }, { name: t('nav.articles'), href: '/articles' }, { name: a.title }]}
            label={t('nav.breadcrumb')}
          />
          <div className="grid-12 mt-8">
            <div className="md:col-span-10">
              {a.draft ? (
                <p className="mb-5 inline-flex rounded-full bg-kuning px-3 py-1 text-sm font-semibold text-[#1e2a4a]">{t('articles.draft')}</p>
              ) : null}
              <h1 className="text-[clamp(2.3rem,5vw,4.25rem)] leading-[1.04]" data-split>
                {a.title}
              </h1>
              <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-tinta-muda">
                <span>{t('articles.by', { name: profile.name })}</span>
                <time dateTime={a.published}>{t('articles.published', { date: date(a.published) })}</time>
                {a.updated !== a.published ? <time dateTime={a.updated}>{t('articles.updated', { date: date(a.updated) })}</time> : null}
                <span>{t('articles.minutes', { n: a.minutes })}</span>
              </p>
            </div>
          </div>
        </header>

        <div className="wrap grid-12 mt-12 gap-y-14 md:mt-16">
          <div className="md:col-span-8">
            <div className="rounded-[20px] border border-garis bg-lembar p-6 md:p-8">
              <p className="font-semibold text-stempel">{t('articles.summary')}</p>
              <p className="mt-2 text-lg leading-relaxed">{a.summary}</p>
            </div>
            <div className="prose-article mt-12" dangerouslySetInnerHTML={{ __html: a.html }} />

            <aside aria-labelledby="author-title" className="mt-16 border-t border-garis pt-8">
              <h2 id="author-title" className="text-xl">
                {t('articles.author')}
              </h2>
              <p className="mt-3 text-tinta-muda">{profile.bio[locale]}</p>
              <Link href={{ pathname: '/', hash: 'about' }} className="link mt-4 inline-block text-sm font-semibold text-stempel">
                {t('articles.authorMore')}
              </Link>
            </aside>
          </div>

          <nav aria-labelledby="related-title" className="md:col-span-3 md:col-start-10">
            <div className="md:sticky md:top-[calc(var(--header-h)+1.5rem)]">
              <h2 id="related-title" className="text-lg">
                {t('articles.relatedServices')}
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((s) => (
                  <li key={s.key}>
                    <Link
                      href={{ pathname: '/services/[slug]', params: { slug: s.slug[locale] } }}
                      className="card block rounded-[16px] border border-garis bg-lembar p-4 no-underline"
                    >
                      <span className="block font-semibold">{s.name[locale]}</span>
                      <span className="mt-1 block text-sm text-tinta-muda">{summary(s.key, locale)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/articles" className="link mt-6 inline-block text-sm font-semibold text-stempel">
                {t('articles.all')}
              </Link>
            </div>
          </nav>
        </div>

        {work.length ? (
          <section className="section" aria-labelledby="work-title">
            <div className="wrap border-t border-garis pt-16">
              <h2 id="work-title" className="h-section" data-split>
                {t('articles.relatedWork')}
              </h2>
              <ul className={`mt-10 grid gap-5 ${work.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {work.map((p) => (
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
        ) : (
          <div className="pb-16" />
        )}
      </article>
      <ContactSection />
    </>
  );
}
