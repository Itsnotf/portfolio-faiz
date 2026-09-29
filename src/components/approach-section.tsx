import { getTranslations } from 'next-intl/server';
import { principles } from '@/content/profile';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { HorizontalScroller } from './motion/horizontal-scroller';

/** Line illustrations, one per principle. Strokes draw in as each card slides into view. */
const ILLUSTRATIONS = [
  // Learn the real flow: three steps, plus the shortcut nobody wrote down.
  <>
    <circle cx="16" cy="48" r="8" />
    <circle cx="60" cy="48" r="8" />
    <circle cx="104" cy="48" r="8" />
    <path d="M24 48 H52 M68 48 H96" />
    <path d="M18 40 C 34 10, 86 10, 102 40" />
  </>,
  // Rules and exceptions: a decision with two outcomes.
  <>
    <path d="M60 14 L86 42 L60 70 L34 42 Z" />
    <path d="M34 42 H12 M86 42 H108" />
    <path d="M100 30 l4 4 l8 -8" />
    <path d="M6 30 l8 8 M14 30 l-8 8" />
  </>,
  // The simplest thing that is enough: several boxes become one.
  <>
    <rect x="8" y="12" width="30" height="16" rx="3" />
    <rect x="8" y="34" width="30" height="16" rx="3" />
    <rect x="8" y="56" width="30" height="16" rx="3" />
    <path d="M46 42 H76 M70 36 l6 6 -6 6" />
    <rect x="84" y="24" width="28" height="36" rx="4" />
  </>,
  // Traceable: a total with lines back to its sources.
  <>
    <rect x="6" y="8" width="28" height="14" rx="3" />
    <rect x="46" y="8" width="28" height="14" rx="3" />
    <rect x="86" y="8" width="28" height="14" rx="3" />
    <path d="M20 22 V40 H60 M60 22 V60 M100 22 V40 H60" />
    <rect x="42" y="60" width="36" height="16" rx="3" />
  </>,
  // Lock, test, hand over.
  <>
    <path d="M48 38 V28 a12 12 0 0 1 24 0 V38" />
    <rect x="38" y="38" width="44" height="34" rx="5" />
    <path d="M50 55 l7 7 l13 -14" />
  </>,
];

export async function ApproachSection({ locale }: { locale: Locale }) {
  const t = await getTranslations('approach');
  const tu = await getTranslations('ui');

  const header = (
    <div className="grid-12 items-end gap-y-6">
      <div className="md:col-span-7">
        <p className="eyebrow">
          {t('eyebrow')}
        </p>
        <h2 id="approach-title" className="h-section mt-5" data-split>
          {t('title')}
        </h2>
      </div>
      <p className="lead md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal>
        {t('intro')}
      </p>
    </div>
  );

  return (
    <HorizontalScroller id="approach" labelledBy="approach-title" header={header} count={principles.length} hint={tu('swipe')}>
      {principles.map((p, i) => (
        <li key={p.title.en} className="w-[min(30rem,84vw)]">
          <article className="flex h-full flex-col rounded-[20px] border border-garis bg-lembar p-6 md:p-7 short:py-5">
            <div className="flex items-start justify-between gap-6">
              <span className="font-display text-4xl font-bold text-stempel [font-stretch:120%] short:text-3xl">{String(i + 1).padStart(2, '0')}</span>
              <svg viewBox="0 0 120 80" className="h-14 w-20 text-tinta short:h-10 short:w-16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-draw>
                {ILLUSTRATIONS[i]}
              </svg>
            </div>
            <h3 className="mt-5 text-2xl short:mt-3 short:text-[1.35rem]">{p.title[locale]}</h3>
            <p className="mt-3 text-[0.975rem] text-tinta-muda short:mt-2 short:text-[0.925rem] short:leading-normal">{p.body[locale]}</p>
            <div className="mt-auto pt-5 short:pt-3">
              <div className="border-t border-dashed border-tinta/30 pt-4 short:pt-3">
                <p className="text-sm font-semibold text-stempel">{t('example')}</p>
                <p className="mt-2 text-[0.925rem] short:mt-1 short:text-[0.875rem] short:leading-normal">{p.example.body[locale]}</p>
                <Link href={{ pathname: '/work/[slug]', params: { slug: p.example.slug }, hash: p.example.decision }} className="link tap-area mt-3 inline-block text-sm font-semibold short:mt-2">
                  {t('see')} →
                </Link>
              </div>
            </div>
          </article>
        </li>
      ))}
    </HorizontalScroller>
  );
}
