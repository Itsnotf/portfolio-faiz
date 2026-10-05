'use client';

import { useEffect } from 'react';
import { hashId } from '@/lib/hash';

/**
 * Opens the <details> a URL points at (/work/sipeg#pro-rata), so links from "Cara saya bekerja" land on an open
 * decision. Runs on mount, because a client-side navigation fires no hashchange, and again on hashchange.
 */
export function HashDetails() {
  useEffect(() => {
    const open = () => {
      const id = hashId(location.hash);
      const target = id ? document.getElementById(id) : null;
      const details = target?.closest('details');
      if (!details) return;
      details.open = true;
      details.querySelector('summary')?.focus({ preventScroll: true });
      target!.scrollIntoView({ block: 'start' });
    };
    open();
    // The URL can update just after this page mounts during a client-side navigation.
    const frame = requestAnimationFrame(open);
    window.addEventListener('hashchange', open);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', open);
    };
  }, []);
  return null;
}
