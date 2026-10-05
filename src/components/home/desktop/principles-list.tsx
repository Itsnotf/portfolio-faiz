import { getTranslations } from 'next-intl/server';
import { PrincipleArt } from '@/components/principle-art';
import { principles } from '@/content/profile';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

/** How Faiz works, as five numbered habits in plain words, each linked to the real decision that shows it. */
export async function PrinciplesList({ locale }: { locale: Locale }) {
  const t = await getTranslations('approach');

  return (
    <section id="approach" className="section border-t border-garis" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <div className="md:col-span-7">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 id="approach-title" className="h-section mt-5" data-split>
              {t('title')}
            </h2>
          </div>
          <p className="lead md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal>
            {t('intro')}
          </p>
        </div>
        <ol className="mt-12 border-b border-garis">
          {principles.map((p, i) => (
            <li key={p.title.en} className="grid-12 items-start gap-y-3 border-t border-garis py-8" data-reveal>
              <div className="flex items-center gap-5 md:col-span-3 lg:col-span-2">
                <span className="font-display text-3xl font-bold text-stempel [font-stretch:120%]">{String(i + 1).padStart(2, '0')}</span>
                <PrincipleArt index={i} className="h-10 w-16 text-tinta" draw />
              </div>
              <h3 className="text-2xl md:col-span-4 lg:col-span-4">{p.title[locale]}</h3>
              <div className="md:col-span-5 lg:col-span-6">
                <p className="text-tinta-muda">{p.plain[locale]}</p>
                <p className="mt-3 text-sm">
                  <span className="font-semibold text-stempel">{t('example')}: </span>
                  <Link href={{ pathname: '/work/[slug]', params: { slug: p.example.slug }, hash: p.example.decision }} className="link tap-area font-semibold">
                    {p.example.label[locale]} →
                  </Link>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
