'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from './motion/gsap';

/** Adds a backdrop once the page scrolls, and tucks the header away while scrolling down. */
export function HeaderBehavior() {
  useEffect(() => {
    const header = document.getElementById('site-header');
    if (!header) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        header.classList.toggle('is-scrolled', y > 8);
        const menuOpen = header.hasAttribute('data-menu-open');
        const focused = header.contains(document.activeElement);
        header.classList.toggle('is-hidden', !menuOpen && !focused && self.direction === 1 && y > 160);
      },
    });
    return () => st.kill();
  }, []);
  return null;
}
