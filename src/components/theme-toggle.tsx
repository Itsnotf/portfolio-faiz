'use client';

import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

function current(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Light/dark switch. Until the visitor chooses, the site follows the system setting; a choice is
 * remembered in localStorage and applied before paint by the inline script in the layout.
 * Which icon shows is pure CSS keyed on the theme, so the first render never flashes the wrong one.
 */
function subscribe(onChange: () => void) {
  const mq = matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', onChange);
  window.addEventListener('themechange', onChange);
  return () => {
    mq.removeEventListener('change', onChange);
    window.removeEventListener('themechange', onChange);
  };
}

export function ThemeToggle({ labels }: { labels: { dark: string; light: string } }) {
  // null on the server: the theme is only known in the browser.
  const theme = useSyncExternalStore<Theme | null>(subscribe, current, () => null);

  function toggle() {
    const next: Theme = current() === 'dark' ? 'light' : 'dark';
    const html = document.documentElement;
    html.classList.add('theme-switching');
    html.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    window.dispatchEvent(new Event('themechange'));
    window.setTimeout(() => html.classList.remove('theme-switching'), 450);
  }

  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme ? dark : undefined}
      aria-label={labels.dark}
      title={dark ? labels.light : labels.dark}
      className="theme-toggle group inline-grid size-10 place-items-center rounded-full border border-tinta/30 transition-colors hover:border-tinta"
    >
      <svg viewBox="0 0 24 24" className="icon-moon size-[18px] transition-transform duration-500 group-hover:-rotate-12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
      </svg>
      <svg viewBox="0 0 24 24" className="icon-sun size-[18px] transition-transform duration-700 group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
    </button>
  );
}
