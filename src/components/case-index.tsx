'use client';

import { useRef, useState } from 'react';
import { gsap, motionOn, ScrollTrigger, useGSAP } from './motion/gsap';

interface Props {
  title: string;
  items: { id: string; label: string }[];
}

/**
 * "On this page" list beside a case study. It follows the reader down the article and marks the
 * decision currently in view. position: sticky does not work inside ScrollSmoother, so with motion
 * it is pinned by ScrollTrigger; without motion the CSS sticky fallback applies.
 */
export function CaseIndex({ title, items }: Props) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(items[0]?.id);

  useGSAP(
    () => {
      const offset = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) * 16 + 24;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        if (!motionOn()) return;
        // An element, not a selector: useGSAP's scope would look for '#case-body' inside this nav only.
        const body = document.getElementById('case-body');
        if (!body) return;
        ScrollTrigger.create({
          trigger: root.current,
          pin: true,
          pinSpacing: false,
          start: () => `top top+=${offset()}`,
          endTrigger: body,
          end: () => `bottom top+=${offset() + (root.current?.offsetHeight ?? 0)}`,
          invalidateOnRefresh: true,
        });
      });
      items.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 25%',
          end: 'bottom 25%',
          onToggle: (self) => self.isActive && setActive(id),
        });
      });
    },
    { scope: root },
  );

  return (
    <nav ref={root} aria-label={title} className="case-index">
      <p className="text-sm font-semibold text-tinta-muda">{title}</p>
      <ol className="mt-4 space-y-1 border-l border-garis">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? 'true' : undefined}
              className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[0.92rem] leading-snug text-tinta-muda no-underline transition-colors hover:text-tinta aria-[current=true]:border-stempel aria-[current=true]:font-semibold aria-[current=true]:text-tinta"
            >
              <span className="mr-2 font-display text-[0.8125rem] font-bold text-stempel">{String(i + 1).padStart(2, '0')}</span>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
