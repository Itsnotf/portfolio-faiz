import { getTranslations } from 'next-intl/server';
import { caseStudies } from '@/content/work';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { HorizontalScroller } from './motion/horizontal-scroller';
import { ProjectCover } from './project-cover';

export async function CaseGallery({ locale }: { locale: Locale }) {
  const t = await getTranslations('work');
  const ta = await getTranslations('archive');

  const header = (
    <div className="grid-12 items-end gap-y-6">
      <div className="md:col-span-7">
        <p className="eyebrow">
          {t('eyebrow')}
        </p>
        <h2 id="work-title" className="h-section mt-5" data-split>
          {t('title')}
        </h2>
      </div>
      <p className="lead md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal>
        {t('intro')}
      </p>
    </div>
  );

  return (
    <HorizontalScroller id="work" labelledBy="work-title" header={header} count={caseStudies.length} className="border-t border-garis">
      {caseStudies.map((p, i) => (
        <li key={p.slug} className="w-[min(68rem,88vw,140svh)]">
          <article
            className="card relative grid h-full gap-3 rounded-[20px] border border-garis bg-lembar p-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] short:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
            data-cursor={t('cursor')}
          >
            <ProjectCover project={p} locale={locale} sizes="(min-width: 768px) 42rem, 88vw" priority={i === 0} diagramLabel={ta('title')} />
            <div className="flex flex-col px-3 pb-3 pt-4 md:px-5 md:py-5 short:py-3">
              <p className="text-sm font-semibold text-tinta-muda">
                {p.status[locale]} ({p.year})
              </p>
              <h3 className="mt-3 text-[clamp(1.9rem,3vw,2.6rem)] short:mt-2 short:text-[1.75rem]">
                <Link href={{ pathname: '/work/[slug]', params: { slug: p.slug } }} className="no-underline after:absolute after:inset-0 after:rounded-[20px] after:content-['']">
                  {p.title[locale]}
                </Link>
              </h3>
              <p className="mt-3 text-tinta-muda short:mt-2 short:text-[0.95rem] short:leading-normal">{p.problem[locale]}</p>
              <p className="mt-5 text-sm font-semibold text-stempel short:mt-3">{t('decisions')}</p>
              <ul className="mt-2 space-y-1.5">
                {p.caseStudy!.decisions.slice(0, 2).map((d) => (
                  <li key={d.id} className="flex gap-2 text-[0.95rem] font-semibold short:text-[0.9rem] short:leading-snug">
                    <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-stempel" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7" />
                    </svg>
                    {d.title[locale]}
                  </li>
                ))}
              </ul>
              <span aria-hidden="true" className="btn btn-secondary mt-6 self-start md:mt-auto short:min-h-10 short:pt-0">
                <span className="roll" data-label={t('read')}>
                  <span>{t('read')}</span>
                </span>
              </span>
            </div>
          </article>
        </li>
      ))}
    </HorizontalScroller>
  );
}
