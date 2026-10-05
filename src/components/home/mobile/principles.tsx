import { getTranslations } from 'next-intl/server';
import { principles } from '@/content/profile';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

/**
 * How Faiz works, on phones: five habit cards in a row to swipe through, each linking to the real decision that shows
 * it. All five are in the page; only the layout is sideways, which keeps the section about half a screen tall.
 */
export async function MobilePrinciples({ locale }: { locale: Locale }) {
  const t = await getTranslations('approach');
  const tu = await getTranslations('ui');

  return (
    <section id="approach" className="section border-t border-garis" aria-labelledby="approach-title">
      <div className="wrap">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h2 id="approach-title" className="h-section mt-4">
          {t('title')}
        </h2>
        <p className="mt-3 text-[0.975rem] text-tinta-muda">{t('intro')}</p>
      </div>
      <div role="region" aria-label={t('eyebrow')} tabIndex={0} className="m-swipe mt-6">
        <ol>
          {principles.map((p, i) => (
            <li key={p.title.en} className="flex w-[78vw] max-w-[20rem] flex-col rounded-[20px] border border-garis bg-lembar p-5">
              <span className="font-display text-2xl font-bold leading-none text-stempel [font-stretch:120%]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-[1.2rem] leading-tight">{p.title[locale]}</h3>
              <p className="mt-2 text-[0.95rem] leading-snug text-tinta-muda">{p.plain[locale]}</p>
              <Link
                href={{ pathname: '/work/[slug]', params: { slug: p.example.slug }, hash: p.example.decision }}
                className="link tap-area mt-auto self-start pt-4 text-sm font-semibold text-stempel"
              >
                {t('example')}: {p.example.label[locale]} →
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <p aria-hidden="true" className="wrap mt-3 text-sm text-tinta-muda">
        {tu('swipe')} →
      </p>
    </section>
  );
}
