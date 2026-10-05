import { getTranslations } from 'next-intl/server';
import { education, experience, profile, recognition } from '@/content/profile';
import type { Locale } from '@/i18n/routing';

/** About on phones: the story and facts stay visible; the work timeline and recognition fold into <details>. */
export async function MobileAbout({ locale }: { locale: Locale }) {
  const t = await getTranslations('about');
  const facts = [
    [t('based'), profile.location[locale]],
    [t('serves'), profile.serves[locale]],
    [t('languages'), profile.languages[locale]],
    [t('education'), `${education.degree[locale]}, ${education.school} · ${education.gpa[locale]}`],
  ];
  const role = (e: (typeof experience)[number]) => (
    <li key={e.org + e.period.en} className="relative pb-5 pl-5 last:pb-0">
      <span aria-hidden="true" className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-kertas bg-stempel" />
      <p className="text-[0.8125rem] text-tinta-muda">{e.period[locale]}</p>
      <p className="font-semibold leading-snug">
        {e.role[locale]}, {e.org}
      </p>
      <p className="mt-0.5 text-[0.95rem] text-tinta-muda">{e.short[locale]}</p>
    </li>
  );

  return (
    <section id="about" className="section border-t border-garis" aria-labelledby="about-title">
      <div className="wrap">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h2 id="about-title" className="h-section mt-4">
          {t('title')}
        </h2>
        <div className="mt-5 space-y-3">
          <p>{t('body1')}</p>
          <p>{t('body2')}</p>
          <p>{t('body3')}</p>
        </div>
        {profile.cv ? (
          <a href={profile.cv} download className="link tap-area mt-4 inline-block font-semibold">
            {t('cv')}
          </a>
        ) : null}

        <h3 className="mt-8 text-xl">{t('facts')}</h3>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 text-[0.95rem]">
          {facts.map(([k, v], i) => (
            <div key={k} className={`field ${i === facts.length - 1 ? 'col-span-2' : ''}`}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 divide-y divide-garis border-y border-garis">
          <details className="m-acc group">
            <summary>
              {t('experienceCount', { count: experience.length })}
              <span aria-hidden="true">+</span>
            </summary>
            <ol className="mb-5 ml-1.5 mt-1 border-l-2 border-tinta/15">{experience.map(role)}</ol>
          </details>
          <details className="m-acc group">
            <summary>
              {t('recognition')}
              <span aria-hidden="true">+</span>
            </summary>
            <ul className="mb-5 mt-1 space-y-3">
              {recognition.map((r) => (
                <li key={r.title.en}>
                  <p className="font-semibold">{r.title[locale]}</p>
                  <p className="text-[0.95rem] text-tinta-muda">{r.detail[locale]}</p>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}
