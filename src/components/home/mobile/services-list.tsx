import { getTranslations } from 'next-intl/server';
import { services } from '@/content/profile';
import { serviceByKey } from '@/content/services';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

/** Services on phones: one tappable row each, opening with the situation a visitor recognises. */
export async function MobileServices({ locale }: { locale: Locale }) {
  const t = await getTranslations('servicesSection');

  return (
    <section id="services" className="section border-t border-garis" aria-labelledby="services-title">
      <div className="wrap">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h2 id="services-title" className="h-section mt-4">
          {t('title')}
        </h2>
        <p className="mt-3 text-[0.975rem] text-tinta-muda">{t('intro')}</p>
        <ul className="mt-6 divide-y divide-garis border-y border-garis">
          {services.map((s, i) => (
            <li key={s.key} className="relative flex gap-4 py-4">
              <span aria-hidden="true" className="font-display text-lg font-bold text-stempel [font-stretch:115%]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.8125rem] font-semibold leading-snug text-stempel">{s.when[locale]}</p>
                <h3 className="mt-1.5 font-display text-[1.2rem] font-bold leading-tight">
                  <Link
                    href={{ pathname: '/services/[slug]', params: { slug: serviceByKey(s.key).slug[locale] } }}
                    className="no-underline after:absolute after:inset-0 after:content-['']"
                  >
                    {s.title[locale]}
                  </Link>
                </h3>
                {/* Clamped to two lines on screen; the whole sentence stays in the page and on the service page. */}
                <p className="mt-1 line-clamp-2 text-[0.925rem] leading-snug text-tinta-muda">{s.body[locale]}</p>
              </div>
              <span aria-hidden="true" className="self-center text-xl text-stempel">
                →
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
