'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useArchiveFilter, type ArchiveFilter } from '@/components/use-archive-filter';
import { archive } from '@/content/work';
import type { Locale } from '@/i18n/routing';

/** Cards shown before the visitor asks for more (choice overload, cognitive load). */
const PREVIEW = 3;

/**
 * Smaller projects on phones: three cards, then all of them on request with the filter as one swipeable row.
 * Every project stays in the HTML (hidden until asked for), so search engines see the same list as on desktop.
 * No animation library: filtering simply re-renders.
 */
export function MobileArchive() {
  const t = useTranslations('archive');
  const locale = useLocale() as Locale;
  const { filter, setFilter, visible, used, count, shown } = useArchiveFilter();
  const [expanded, setExpanded] = useState(false);
  const list = useRef<HTMLUListElement>(null);

  // Keyboard and screen-reader users land on the first newly revealed card.
  useEffect(() => {
    if (expanded) (list.current?.children[PREVIEW] as HTMLElement | undefined)?.focus();
  }, [expanded]);

  return (
    <section id="archive" aria-labelledby="archive-title" className="section border-t border-garis">
      <div className="wrap">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h2 id="archive-title" className="h-section mt-4">
          {t('title')}
        </h2>
        <p className="mt-3 text-[0.975rem] text-tinta-muda">{t('intro')}</p>

        {expanded ? (
          <div role="group" aria-label={t('filterLabel')} className="m-chips mt-6">
            {(['all', ...used] as ArchiveFilter[]).map((f) => (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className="chip shrink-0">
                {t(f)} <small>{count(f)}</small>
              </button>
            ))}
          </div>
        ) : null}
        <p aria-live="polite" className="sr-only">
          {t('count', { count: shown })}
        </p>

        <ul ref={list} className="mt-6 divide-y divide-garis border-y border-garis">
          {archive.map((p, i) => (
            <li key={p.slug} hidden={!visible(p) || (!expanded && i >= PREVIEW)} tabIndex={-1} className="py-4 outline-none">
              <p className="text-[0.8125rem] font-semibold text-stempel">{p.problems.map((k) => t(k)).join(', ')}</p>
              <h3 className="mt-1 text-[1.2rem] leading-tight">{p.title[locale]}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-snug text-tinta-muda">{p.problem[locale]}</p>
              {/* The key decision is in the page for everyone, shown once the visitor opens the full list. */}
              {p.keyDecision ? (
                <p hidden={!expanded} className="mt-2 border-l-2 border-stempel pl-3 text-[0.9rem] leading-snug">
                  <span className="font-semibold text-stempel">{t('decision')}: </span>
                  {p.keyDecision[locale]}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
        {expanded ? null : (
          <button type="button" onClick={() => setExpanded(true)} className="btn btn-secondary mt-6 w-full justify-center">
            {t('showAll', { count: archive.length - PREVIEW })}
          </button>
        )}
      </div>
    </section>
  );
}
