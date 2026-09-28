'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Flip, useGSAP);

// Development only: lets the browser console inspect running triggers.
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  (window as unknown as { __gsap: object }).__gsap = { gsap, ScrollTrigger, ScrollSmoother };
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Flip, useGSAP };

/** True when the visitor has not asked for reduced motion (set by the inline script in the layout). */
export function motionOn() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('motion');
}

/**
 * Scroll to a y position or element, through ScrollSmoother when it is running.
 * Elements are measured by layout position: their own reveal offset (y) is ignored, a pinned
 * section is measured by its pin spacer (where the pin starts), and CSS scroll-margin-top is honoured.
 */
export function scrollToTarget(target: number | Element, smooth = true) {
  const smoother = ScrollSmoother.get();
  let y = typeof target === 'number' ? target : 0;
  if (typeof target !== 'number') {
    const spacer = target.parentElement?.classList.contains('pin-spacer') ? target.parentElement : null;
    const box = spacer ?? target;
    const current = smoother ? smoother.scrollTop() : window.scrollY;
    const ownY = spacer ? 0 : Number(gsap.getProperty(target, 'y')) || 0;
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    y = Math.max(0, box.getBoundingClientRect().top + current - ownY - margin);
  }
  if (smoother) smoother.scrollTo(y, smooth);
  else window.scrollTo({ top: y, behavior: smooth && motionOn() ? 'smooth' : 'auto' });
}
