'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, motionOn, ScrollSmoother, ScrollTrigger, useGSAP } from './gsap';

const DRAW = '[data-draw] path, [data-draw] line, [data-draw] polyline, [data-draw] rect, [data-draw] circle';

interface Props {
  id: string;
  labelledBy: string;
  /** Section heading area, rendered above the track inside .wrap. */
  header: ReactNode;
  /** One <li> per card. */
  children: ReactNode;
  count: number;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * A section whose cards move sideways.
 * - Wide screens with motion: the section pins and vertical scrolling drives the track (1px down = 1px across).
 * - Phones, reduced motion or no JS: a native swipe carousel with scroll snapping.
 * In both cases the first card starts on the same left edge as every other section.
 */
export function HorizontalScroller({ id, labelledBy, header, children, count, className = '' }: Props) {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  const show = (progress: number, index: number) => {
    bar.current?.style.setProperty('--progress', String(progress));
    if (counter.current) counter.current.textContent = `${pad(index + 1)} / ${pad(count)}`;
  };

  useGSAP(
    () => {
      const vp = viewport.current!;
      const tr = track.current!;
      const items = Array.from(tr.children) as HTMLElement[];
      const padLeft = () => parseFloat(getComputedStyle(tr).paddingLeft) || 0;
      const nearest = (offset: number) =>
        items.reduce((best, el, i) => (Math.abs(el.offsetLeft - padLeft() - offset) < Math.abs(items[best].offsetLeft - padLeft() - offset) ? i : best), 0);

      // Illustrations draw once their card is actually on screen: when the section scrolls into view
      // (cards already visible) and as the track moves (cards sliding in). Checked against the real
      // position, which is more reliable than containerAnimation toggles for cards visible at the start.
      const draws = motionOn()
        ? items.map((item) => {
            const els = item.querySelectorAll(DRAW);
            return els.length ? gsap.from(els, { drawSVG: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.05, paused: true }) : null;
          })
        : [];
      const drawVisible = () =>
        items.forEach((item, i) => {
          const tl = draws[i];
          if (tl && tl.progress() === 0 && !tl.isActive() && item.getBoundingClientRect().left < innerWidth * 0.88) tl.play();
        });

      // Native carousel: progress follows the viewport's own horizontal scroll.
      const onScroll = () => {
        const max = vp.scrollWidth - vp.clientWidth;
        show(max > 0 ? vp.scrollLeft / max : 0, nearest(vp.scrollLeft));
        drawVisible();
      };
      vp.addEventListener('scroll', onScroll, { passive: true });

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        if (!motionOn()) return;
        const distance = () => Math.max(0, tr.offsetWidth - vp.clientWidth);

        const tween = gsap.to(tr, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              show(self.progress, Math.round(self.progress * (count - 1)));
              drawVisible();
            },
          },
        });

        items.forEach((item, i) => {
          // Cards after the first slide in slightly behind the track, which gives the row some depth.
          if (i > 0) {
            gsap.from(item, {
              xPercent: 12,
              opacity: 0.4,
              ease: 'none',
              scrollTrigger: { trigger: item, containerAnimation: tween, start: 'left 100%', end: 'left 60%', scrub: true },
            });
          }
        });

        // Keyboard users: tabbing to an off-screen card scrolls the page to where that card is in view.
        const onFocus = (e: FocusEvent) => {
          const item = (e.target as HTMLElement).closest('.hscroll-track > *') as HTMLElement | null;
          const st = tween.scrollTrigger;
          if (!item || !st) return;
          const p = gsap.utils.clamp(0, 1, (item.offsetLeft - padLeft()) / (distance() || 1));
          const y = st.start + p * (st.end - st.start);
          const smoother = ScrollSmoother.get();
          if (smoother) smoother.scrollTo(y, false);
          else window.scrollTo(0, y);
        };
        tr.addEventListener('focusin', onFocus);
        return () => tr.removeEventListener('focusin', onFocus);
      });

      // Cards that are already visible draw when the section itself scrolls into view.
      // Created after the pin above so its position accounts for the pin spacing.
      if (motionOn()) ScrollTrigger.create({ trigger: root.current, start: 'top 70%', once: true, onEnter: drawVisible });

      return () => vp.removeEventListener('scroll', onScroll);
    },
    { scope: root },
  );

  return (
    <section ref={root} id={id} aria-labelledby={labelledBy} className={`hscroll section ${className}`}>
      <div className="wrap">{header}</div>
      <div ref={viewport} className="hscroll-viewport mt-10">
        <ul ref={track} className="hscroll-track">
          {children}
        </ul>
      </div>
      <div className="hscroll-meta wrap mt-8 flex items-center gap-5" aria-hidden="true">
        <span ref={counter} className="font-display text-sm font-bold tabular-nums [font-stretch:110%]">
          {pad(1)} / {pad(count)}
        </span>
        <span className="hscroll-bar flex-1">
          <span ref={bar} />
        </span>
      </div>
    </section>
  );
}
