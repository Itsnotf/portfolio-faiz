import { getTranslations } from 'next-intl/server';
import { ProjectCover } from '@/components/project-cover';
import { archive, caseStudies } from '@/content/work';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

/**
 * Selected work on phones: one full-width card per case, the whole card one tap target. The card says who it was for
 * and what was wrong; the status line already gives the outcome, and the full brief opens the case page.
 */
export async function MobileWorkCards({ locale }: { locale: Locale }) {
  const t = await getTranslations('work');
  const ta = await getTranslations('archive');

  return (
    <section id="work" className="section border-t border-garis" aria-labelledby="work-title">
      <div className="wrap">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h2 id="work-title" className="h-section mt-3">
          {t('title')}
        </h2>
        <p className="mt-3 text-[0.975rem] text-tinta-muda">{t('intro')}</p>

        <ol className="mt-8 grid gap-4">
          {caseStudies.map((p) => {
            const brief = p.caseStudy!.brief;
            return (
              <li key={p.slug}>
                <article className="card relative rounded-[20px] border border-garis bg-lembar p-3">
                  <ProjectCover project={p} locale={locale} sizes="calc(100vw - 2.5rem)" diagramLabel={ta('title')} />
                  <div className="px-2 pb-2 pt-4">
                    <p className="text-sm text-tinta-muda">
                      {p.status[locale]} · {p.year}
                    </p>
                    <h3 className="mt-1 text-[1.6rem]">
                      <Link href={{ pathname: '/work/[slug]', params: { slug: p.slug } }} className="no-underline after:absolute after:inset-0 after:rounded-[20px] after:content-['']">
                        {p.title[locale]}
                      </Link>
                    </h3>
                    <dl className="mt-2 space-y-2 text-[0.925rem] leading-snug">
                      {(
                        [
                          ['for', brief.audience],
                          ['problem', brief.problem],
                        ] as const
                      ).map(([k, v]) => (
                        <div key={k} className={k === 'for' ? 'flex gap-1.5' : undefined}>
                          <dt className={k === 'for' ? 'shrink-0 font-semibold text-stempel' : 'text-[0.8125rem] font-semibold text-stempel'}>
                            {t(k)}
                            {k === 'for' ? ':' : null}
                          </dt>
                          <dd className={k === 'for' ? 'font-semibold' : 'text-tinta-muda'}>{v[locale]}</dd>
                        </div>
                      ))}
                    </dl>
                    <span aria-hidden="true" className="mt-3 inline-block text-sm font-semibold text-stempel">
                      {t('read')} →
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
        <a href="#archive" className="link tap-area mt-8 inline-block font-semibold text-stempel">
          {t('more', { count: archive.length })} ↓
        </a>
      </div>
    </section>
  );
}
