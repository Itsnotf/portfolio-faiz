'use client';

import { motionOn, ScrollSmoother, ScrollTrigger, scrollToTarget, useGSAP } from './gsap';

/**
 * Creates the ScrollSmoother. Rendered as the first child inside #smooth-content so its effect runs
 * before any page component creates a ScrollTrigger (GSAP requires the smoother to exist first).
 * Touch-only devices get no smoother at all: they would not be smoothed anyway, and native
 * scrolling keeps every ScrollTrigger reading the real scroll position. Reduced motion: native too.
 */
export function SmootherInit() {
  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (motionOn() && ScrollTrigger.isTouch !== 1) {
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.1,
        effects: false,
        smoothTouch: false,
      });
    }

    // Same-page hash links go through the smoother; a native jump would land in the wrong place
    // because the content is transformed.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank') return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      history.pushState(null, '', url.hash);
      // Next tick: lets other click handlers (e.g. the mobile menu releasing its scroll lock) run first.
      setTimeout(() => scrollToTarget(el), 0);
      // Move focus for keyboard and screen-reader users without a second jump.
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
