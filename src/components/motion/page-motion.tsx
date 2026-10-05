'use client';

import { usePathname } from 'next/navigation';
import { hashId } from '@/lib/hash';
import { gsap, motionOn, ScrollSmoother, ScrollTrigger, scrollToTarget, SplitText, useGSAP } from './gsap';

/**
 * Page-level motion, driven by data attributes so server components stay server components:
 *   data-split            heading lines rise out of a mask
 *   data-reveal[="0.1"]   block fades up (optional delay)
 *   data-count="60.5"     number counts up (data-decimals, data-suffix)
 *   data-draw             SVG strokes draw in
 *   data-magnetic         element leans towards the pointer
 *   data-cursor="Read"    a pill with this label follows the pointer while hovering
 * Rendered as the last child inside #smooth-content, so it runs after every page component and
 * again on each navigation.
 */
export function PageMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const smoother = ScrollSmoother.get();

      // A new page starts at the top (or at its hash) instead of gliding from the old position.
      smoother?.scrollTop(0);
      const hashTarget = () => (location.hash ? document.getElementById(hashId(location.hash)) : null);
      const raf = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        const el = hashTarget();
        if (el) scrollToTarget(el, false);
      });

      if (!motionOn()) return () => cancelAnimationFrame(raf);

      const main = document.getElementById('main');
      if (!main) return;
      const all = <T extends Element>(sel: string) => Array.from(main.querySelectorAll<T & Element>(sel)) as T[];

      all<HTMLElement>('[data-split]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: 'expo.out',
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }),
        });
      });

      all<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          delay: Number(el.dataset.reveal) || 0,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      const lang = document.documentElement.lang || 'id';
      all<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals) || 0;
        const suffix = el.dataset.suffix ?? '';
        const fmt = new Intl.NumberFormat(lang, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        const state = { v: 0 };
        el.textContent = fmt.format(0) + suffix;
        gsap.to(state, {
          v: end,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = fmt.format(state.v) + suffix;
          },
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });

      all<SVGElement>('[data-draw]').forEach((svg) => {
        const paths = svg.querySelectorAll('path, line, polyline, rect, circle');
        gsap.from(paths, {
          drawSVG: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          stagger: 0.06,
          scrollTrigger: { trigger: svg, start: 'top 85%', once: true },
        });
      });

      const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
      const cleanups: (() => void)[] = [];

      if (fine) {
        document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
          const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
          const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            x((e.clientX - (r.left + r.width / 2)) * 0.25);
            y((e.clientY - (r.top + r.height / 2)) * 0.35);
          };
          const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.45)' });
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerleave', leave);
          cleanups.push(() => {
            el.removeEventListener('pointermove', move);
            el.removeEventListener('pointerleave', leave);
          });
        });

        const cursorTargets = document.querySelectorAll<HTMLElement>('[data-cursor]');
        if (cursorTargets.length) {
          const pill = document.createElement('div');
          pill.className = 'cursor-pill';
          pill.setAttribute('aria-hidden', 'true');
          document.body.appendChild(pill);
          gsap.set(pill, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
          const px = gsap.quickTo(pill, 'x', { duration: 0.35, ease: 'power3.out' });
          const py = gsap.quickTo(pill, 'y', { duration: 0.35, ease: 'power3.out' });
          const follow = (e: PointerEvent) => {
            px(e.clientX);
            py(e.clientY);
          };
          window.addEventListener('pointermove', follow);
          cursorTargets.forEach((el) => {
            const enter = () => {
              pill.textContent = el.dataset.cursor ?? '';
              gsap.to(pill, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' });
            };
            const leave = () => gsap.to(pill, { opacity: 0, scale: 0.4, duration: 0.25 });
            el.addEventListener('pointerenter', enter);
            el.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              el.removeEventListener('pointerenter', enter);
              el.removeEventListener('pointerleave', leave);
            });
          });
          cleanups.push(() => {
            window.removeEventListener('pointermove', follow);
            pill.remove();
          });
        }
      }

      return () => {
        cancelAnimationFrame(raf);
        cleanups.forEach((fn) => fn());
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
