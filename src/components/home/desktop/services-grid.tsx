import { getTranslations } from 'next-intl/server';
import { services } from '@/content/profile';
import { serviceByKey } from '@/content/services';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

/** What Faiz can help with, each card opening with the situation a visitor recognises. */
export async function ServicesGrid({ locale }: { locale: Locale }) {
  const t = await getTranslations('servicesSection');

  return (
    <section id="services" className="section border-t border-garis" aria-labelledby="services-title">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <div className="md:col-span-7">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 id="services-title" className="h-section mt-5" data-split>
              {t('title')}
            </h2>
          </div>
          <p className="lead md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal>
            {t('intro')}
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li key={s.key} data-reveal={i * 0.08}>
              <article className="card relative flex h-full flex-col rounded-[20px] border border-garis bg-lembar p-5 md:p-6">
                <p className="text-sm font-semibold text-stempel">{s.when[locale]}</p>
                <h3 className="mt-3 font-display text-xl font-bold">
                  <Link
                    href={{ pathname: '/services/[slug]', params: { slug: serviceByKey(s.key).slug[locale] } }}
                    className="no-underline after:absolute after:inset-0 after:rounded-[20px] after:content-['']"
                  >
                    {s.title[locale]}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.975rem] text-tinta-muda">{s.body[locale]}</p>
                <span aria-hidden="true" className="link mt-auto self-start pt-4 text-sm font-semibold text-stempel">
                  {t('more')}
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
