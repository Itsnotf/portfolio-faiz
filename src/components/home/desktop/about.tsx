import { getTranslations } from 'next-intl/server';
import { education, experience, profile, recognition } from '@/content/profile';
import type { Locale } from '@/i18n/routing';

/** About: a short personal story on the left; facts, the work timeline and recognition on the right. */
export async function DesktopAbout({ locale }: { locale: Locale }) {
  const t = await getTranslations('about');
  const facts = [
    [t('based'), profile.location[locale]],
    [t('serves'), profile.serves[locale]],
    [t('languages'), profile.languages[locale]],
    [t('education'), `${education.degree[locale]}, ${education.school} · ${education.gpa[locale]}`],
  ];

  return (
    <section id="about" className="section border-t border-garis" aria-labelledby="about-title">
      <div className="wrap grid-12 gap-y-12">
        <div className="md:col-span-5">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 id="about-title" className="h-section mt-5" data-split>
            {t('title')}
          </h2>
          <div className="mt-8 space-y-4 text-lg" data-reveal>
            <p>{t('body1')}</p>
            <p>{t('body2')}</p>
            <p>{t('body3')}</p>
          </div>
          {profile.cv ? (
            <a href={profile.cv} download className="link mt-6 inline-block font-semibold">
              {t('cv')}
            </a>
          ) : null}
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-4">
          <h3 className="text-2xl">{t('facts')}</h3>
          <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2" data-reveal>
            {facts.map(([k, v]) => (
              <div key={k} className="field">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-14 text-2xl">{t('experience')}</h3>
          <ol className="mt-6 border-l-2 border-tinta/15">
            {experience.map((e) => (
              <li key={e.org + e.period.en} className="relative pb-7 pl-6 last:pb-0" data-reveal>
                <span aria-hidden="true" className="absolute -left-[7px] top-2 size-3 rounded-full border-2 border-kertas bg-stempel" />
                <p className="text-sm text-tinta-muda">{e.period[locale]}</p>
                <p className="mt-1 font-semibold">
                  {e.role[locale]}, {e.org}
                </p>
                <p className="mt-1 text-tinta-muda">{e.short[locale]}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-14 text-2xl">{t('recognition')}</h3>
          <ul className="mt-6 space-y-4">
            {recognition.map((r) => (
              <li key={r.title.en}>
                <p className="font-semibold">{r.title[locale]}</p>
                <p className="text-tinta-muda">{r.detail[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
