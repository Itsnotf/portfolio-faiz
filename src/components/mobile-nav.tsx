'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { gsap, motionOn } from './motion/gsap';

export interface NavLink {
  key: string;
  href: Parameters<typeof Link>[0]['href'];
  label: string;
}

interface Props {
  links: NavLink[];
  labels: { menu: string; close: string; nav: string };
}

/** Full-screen menu for small screens. Links stagger in when motion is allowed. */
export function MobileNav({ links, labels }: Props) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    const header = document.getElementById('site-header');
    header?.toggleAttribute('data-menu-open', open);
    header?.classList.remove('is-hidden');
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;

    if (motionOn() && panel.current) {
      gsap.fromTo(panel.current.querySelectorAll('li'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.05 });
    }
    panel.current?.querySelector('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="relative z-50 inline-flex min-h-10 items-center gap-2 rounded-full border border-tinta/30 px-4 text-sm font-semibold"
      >
        <span aria-hidden="true" className="relative block h-2.5 w-4">
          <span className={`absolute left-0 h-0.5 w-4 bg-current transition-transform duration-300 ${open ? 'top-1 rotate-45' : 'top-0'}`} />
          <span className={`absolute left-0 h-0.5 w-4 bg-current transition-transform duration-300 ${open ? 'top-1 -rotate-45' : 'top-2'}`} />
        </span>
        {open ? labels.close : labels.menu}
      </button>
      <div
        ref={panel}
        id={id}
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-kertas pb-10 pt-[calc(var(--header-h)+2rem)]"
      >
        <nav aria-label={labels.nav} className="wrap">
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.key} className="overflow-hidden border-b border-garis">
                <Link
                  href={l.href}
                  onClick={() => {
                    // Release the scroll lock now, before the page scrolls to the section.
                    document.documentElement.style.overflow = '';
                    setOpen(false);
                  }}
                  className="block py-3 font-display text-[clamp(1.75rem,8vw,2.75rem)] font-bold no-underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
