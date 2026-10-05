import { getTranslations } from 'next-intl/server';
import { ProjectCover } from '@/components/project-cover';
import { archive, caseStudies } from '@/content/work';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

const pad = (n: number) => String(n).padStart(2, '0');

/** Selected work as large stacked rows, image and text alternating sides, each told in four plain lines. */
export async function WorkRows({ locale }: { locale: Locale }) {
  const t = await getTranslations('work');
  const ta = await getTranslations('archive');

  return (
    <section id="work" className="section border-t border-garis" aria-labelledby="work-title">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <div className="md:col-span-7">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 id="work-title" className="h-section mt-5" data-split>
              {t('title')}
            </h2>
          </div>
          <p className="lead md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal>
            {t('intro')}
          </p>
        </div>

        <ol className="mt-14 space-y-[clamp(4rem,8vw,7rem)] md:mt-20">
          {caseStudies.map((p, i) => {
            const brief = p.caseStudy!.brief;
            const flip = i % 2 === 1;
            return (
              <li key={p.slug}>
                <article className="card relative grid-12 items-center gap-y-6" data-cursor={t('cursor')}>
                  <div className={`md:col-span-7 md:row-start-1 ${flip ? 'md:col-start-6' : ''}`}>
                    <ProjectCover project={p} locale={locale} sizes="(min-width: 1280px) 44rem, 58vw" priority={i === 0} diagramLabel={ta('title')} />
                  </div>
                  <div className={`md:col-span-5 md:row-start-1 ${flip ? 'md:col-start-1 lg:col-span-4' : 'md:col-start-8 lg:col-span-4 lg:col-start-9'}`} data-reveal>
                    <p className="eyebrow">
                      <b>
                        {pad(i + 1)} / {pad(caseStudies.length)}
                      </b>
                      {p.status[locale]} · {p.year}
                    </p>
                    <h3 className="mt-3 text-[clamp(1.9rem,3vw,2.6rem)]">
                      <Link href={{ pathname: '/work/[slug]', params: { slug: p.slug } }} className="no-underline after:absolute after:inset-0 after:content-['']">
                        {p.title[locale]}
                      </Link>
                    </h3>
                    <dl className="mt-5 space-y-3 text-[0.975rem]">
                      {(
                        [
                          ['for', brief.audience],
                          ['problem', brief.problem],
                          ['built', brief.built],
                          ['result', brief.result],
                        ] as const
                      ).map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-sm font-semibold text-stempel">{t(k)}</dt>
                          <dd className={k === 'for' ? 'font-semibold' : 'text-tinta-muda'}>{v[locale]}</dd>
                        </div>
                      ))}
                    </dl>
                    <span aria-hidden="true" className="btn btn-secondary mt-6">
                      <span className="roll" data-label={t('read')}>
                        <span>{t('read')}</span>
                      </span>
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <a href="#archive" className="link tap-area mt-16 inline-block font-semibold text-stempel">
          {t('more', { count: archive.length })} ↓
        </a>
      </div>
    </section>
  );
}
