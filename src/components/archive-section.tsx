'use client';

import { useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { archive, PROBLEMS, type Problem, type Project } from '@/content/work';
import type { Locale } from '@/i18n/routing';
import { Flip, gsap, motionOn, ScrollTrigger, useGSAP } from './motion/gsap';
import { ProjectCard } from './project-card';

type Filter = Problem | 'all';

export function ArchiveSection() {
  const t = useTranslations('archive');
  const locale = useLocale() as Locale;
  const root = useRef<HTMLElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const mounted = useRef(false);
  const [filter, setFilter] = useState<Filter>('all');

  const visible = (p: Project) => filter === 'all' || p.problems.includes(filter);
  const used = PROBLEMS.filter((k) => archive.some((p) => p.problems.includes(k)));
  const count = (f: Filter) => (f === 'all' ? archive.length : archive.filter((p) => p.problems.includes(f)).length);

  function choose(f: Filter) {
    if (f === filter) return;
    if (motionOn()) flipState.current = Flip.getState(root.current!.querySelectorAll('[data-flip-id]'));
    setFilter(f);
  }

  // After React re-renders with the new filter, glide the remaining cards into place.
  useGSAP(
    () => {
      if (!flipState.current) {
        // Reduced motion: no Flip, but the page height still changed.
        if (mounted.current) ScrollTrigger.refresh();
        mounted.current = true;
        return;
      }
      Flip.from(flipState.current, {
        duration: 0.6,
        ease: 'power3.inOut',
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.2 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
      flipState.current = null;
    },
    { dependencies: [filter], scope: root },
  );

  return (
    <section ref={root} id="archive" aria-labelledby="archive-title" className="section border-t border-garis">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <div className="md:col-span-7">
            <p className="eyebrow">
              {t('eyebrow')}
            </p>
            <h2 id="archive-title" className="h-section mt-5" data-split>
              {t('title')}
            </h2>
          </div>
          <p className="lead md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal>
            {t('intro')}
          </p>
        </div>

        <div role="group" aria-label={t('filterLabel')} className="mt-12 flex flex-wrap gap-2">
          {(['all', ...used] as Filter[]).map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => choose(f)} className="chip">
              {t(f)} <small>{count(f)}</small>
            </button>
          ))}
        </div>
        <p aria-live="polite" className="sr-only">
          {t('count', { count: archive.filter(visible).length })}
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {archive.map((p) => (
            <li key={p.slug} data-flip-id={p.slug} hidden={!visible(p)}>
              <ProjectCard
                project={p}
                locale={locale}
                category={p.problems.map((k) => t(k)).join(', ')}
                labels={{ decision: t('decision'), diagram: t('title'), readCase: '' }}
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
