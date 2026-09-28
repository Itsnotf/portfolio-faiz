import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CaseIndex } from '@/components/case-index';
import { JsonLd } from '@/components/json-ld';
import { ProjectCover } from '@/components/project-cover';
import { services } from '@/content/services';
import { caseStudies } from '@/content/work';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { ogImagePath, pageMetadata } from '@/lib/seo';
import { breadcrumb, caseStudyEntity, graph } from '@/lib/structured-data';

type Params = Promise<{ locale: Locale; slug: string }>;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => caseStudies.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata({
    locale,
    title: project.seoTitle?.[locale] ?? project.title[locale],
    description: project.seoDescription?.[locale] ?? project.problem[locale],
    hrefFor: () => ({ pathname: '/work/[slug]', params: { slug } }),
    type: 'article',
    image: ogImagePath(locale, `/work/${slug}`),
  });
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const index = caseStudies.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const p = caseStudies[index];
  const cs = p.caseStudy!;
  const next = caseStudies[(index + 1) % caseStudies.length];
  const t = await getTranslations('case');
  const ta = await getTranslations('archive');

  const tn = await getTranslations('nav');
  const related = services.filter((s) => s.proof.includes(p.slug));
  const updated = p.updated ? new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(p.updated)) : null;

  const phones = p.shots.filter((s) => s.kind === 'mobile');
  const desktops = p.shots.filter((s) => s.kind === 'desktop');

  return (
    <article className="pb-24">
      <JsonLd
        data={graph(
          caseStudyEntity(locale, p),
          breadcrumb(locale, [
            { name: tn('home'), href: '/' },
            { name: p.title[locale], href: { pathname: '/work/[slug]', params: { slug: p.slug } } },
          ]),
        )}
      />
      <header className="wrap pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <Link href={{ pathname: '/', hash: 'work' }} className="link-quiet text-sm font-semibold text-stempel">
          ← {t('back')}
        </Link>
        <div className="grid-12 mt-8">
          <div className="md:col-span-9">
            <h1 className="text-[clamp(2.8rem,7vw,6rem)] leading-[1.02]" data-split>
              {p.title[locale]}
            </h1>
            <p className="lead measure-wide mt-6" data-reveal>
              {p.summary[locale]}
            </p>
            {updated ? <p className="mt-4 text-sm text-tinta-muda">{t('updated', { date: updated })}</p> : null}
          </div>
        </div>
        <dl className="grid-12 mt-12 gap-y-6" data-reveal>
          <div className="field md:col-span-3">
            <dt>{t('role')}</dt>
            <dd>{p.role[locale]}</dd>
          </div>
          <div className="field md:col-span-2">
            <dt>{t('year')}</dt>
            <dd>{p.year}</dd>
          </div>
          <div className="field md:col-span-3">
            <dt>{t('status')}</dt>
            <dd>{p.status[locale]}</dd>
          </div>
          <div className="field md:col-span-4">
            <dt>{t('stack')}</dt>
            <dd>{p.stack.join(', ')}</dd>
          </div>
        </dl>
      </header>

      <figure className="wrap mt-16">
        {phones.length ? (
          <ProjectCover project={p} locale={locale} sizes="(min-width: 1280px) 80rem, 100vw" priority diagramLabel={ta('title')} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {desktops.map((s, i) => (
              <div key={s.src} className={`frame ${i === 0 ? 'sm:col-span-2' : ''}`}>
                <Image src={s.src} alt={s.alt[locale]} width={s.width} height={s.height} sizes={i === 0 ? '(min-width: 1280px) 80rem, 100vw' : '(min-width: 640px) 40rem, 100vw'} priority={i === 0} />
              </div>
            ))}
          </div>
        )}
        <figcaption className="mt-4 text-sm text-tinta-muda">{t('sample')}</figcaption>
      </figure>

      <div className="wrap grid-12 mt-20 gap-y-16">
        <div id="case-body" className="space-y-20 md:col-span-8">
          <section aria-labelledby="problem" data-reveal>
            <h2 id="problem" className="eyebrow">
              {t('problem')}
            </h2>
            <p className="measure-wide mt-4 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-tight">{p.problem[locale]}</p>
          </section>

          {cs.stats ? (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-garis py-8 lg:grid-cols-4">
              {cs.stats.map((s) => (
                <div key={s.label.en}>
                  <dt className="sr-only">{s.label[locale]}</dt>
                  <dd>
                    <span
                      className="block font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold leading-none text-stempel"
                      data-count={s.value}
                      data-decimals={s.decimals ?? 0}
                      data-suffix={s.suffix ?? ''}
                    >
                      {new Intl.NumberFormat(locale, { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 }).format(s.value)}
                      {s.suffix}
                    </span>
                    <span aria-hidden="true" className="mt-2 block text-sm text-tinta-muda">
                      {s.label[locale]}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <section aria-labelledby="context">
            <h2 id="context" className="text-3xl" data-split>
              {t('context')}
            </h2>
            {cs.context.map((para, i) => (
              <p key={i} className="measure-wide mt-5 text-lg" data-reveal>
                {para[locale]}
              </p>
            ))}
          </section>

          <section aria-labelledby="decisions">
            <h2 id="decisions" className="text-3xl" data-split>
              {t('decisions')}
            </h2>
            <ol className="mt-6">
              {cs.decisions.map((d, i) => (
                <li key={d.id} id={d.id} className="case-decision border-t border-garis py-8 md:grid md:grid-cols-8 md:gap-8" data-reveal>
                  <h3 className="font-display text-xl font-bold md:col-span-3">
                    <span className="mb-2 block text-sm text-stempel">{String(i + 1).padStart(2, '0')}</span>
                    {d.title[locale]}
                  </h3>
                  <p className="mt-3 text-tinta-muda md:col-span-5 md:mt-0">{d.body[locale]}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="state" data-reveal>
            <h2 id="state" className="text-3xl">
              {t('state')}
            </h2>
            <p className="measure-wide mt-5 text-lg">{cs.status[locale]}</p>
          </section>

          {cs.reflection ? (
            <section aria-labelledby="reflection" className="border-l-4 border-stempel pl-6" data-reveal>
              <h2 id="reflection" className="text-3xl">
                {t('reflection')}
              </h2>
              <p className="measure-wide mt-5 text-lg">{cs.reflection[locale]}</p>
            </section>
          ) : null}

          {related.length ? (
            <section aria-labelledby="related" data-reveal>
              <h2 id="related" className="text-3xl">
                {t('related')}
              </h2>
              <ul className="mt-5 space-y-2">
                {related.map((r) => (
                  <li key={r.key}>
                    <Link href={{ pathname: '/services/[slug]', params: { slug: r.slug[locale] } }} className="link text-lg font-semibold text-stempel">
                      {r.h1[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="hidden md:col-span-3 md:col-start-10 md:block">
          <CaseIndex title={t('index')} items={cs.decisions.map((d) => ({ id: d.id, label: d.title[locale] }))} />
        </aside>
      </div>

      <div className="wrap mt-24">
        <Link href={{ pathname: '/work/[slug]', params: { slug: next.slug } }} className="card group block rounded-[20px] border border-garis bg-lembar p-6 no-underline md:p-10" data-cursor={t('next')}>
          <p className="eyebrow">{t('next')}</p>
          <p className="mt-4 flex items-end justify-between gap-6 font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-none">
            <span className="roll" data-label={next.title[locale]}>
              <span>{next.title[locale]}</span>
            </span>
            <span aria-hidden="true" className="text-stempel transition-transform duration-500 group-hover:translate-x-2">
              →
            </span>
          </p>
          <p className="measure-wide mt-4 text-tinta-muda">{next.problem[locale]}</p>
        </Link>
      </div>
    </article>
  );
}
