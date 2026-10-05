'use client';

import { useId, useRef } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import type { NavLink } from '../mobile-nav';
import { WhatsAppIcon } from '../whatsapp-icon';

interface Props {
  whatsapp: string;
  labels: {
    nav: string;
    home: string;
    work: string;
    services: string;
    menu: string;
    close: string;
    whatsapp: string;
    whatsappLabel: string;
    sheet: string;
    pages: string;
  };
  /** Home-page sections listed first in the menu sheet. */
  sections: NavLink[];
  /** Other pages, listed under "Halaman lain". */
  pages: NavLink[];
  contact: { email: string; github: string; githubLabel: string };
}

const icon = {
  className: 'size-6',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/**
 * Bottom tab bar for phones (thumb reach): Beranda, Karya, WhatsApp, Layanan, Menu. The active tab comes from the route
 * tree (useSelectedLayoutSegment), never from usePathname: pages are prerendered under /<locale>/<view>/… and the browser
 * URL differs, so a pathname would render differently on the server and the client.
 * Menu opens a native <dialog>: the page behind becomes inert, Esc closes it and focus returns to the button.
 */
export function MobileTabBar({ whatsapp, labels, sections, pages, contact }: Props) {
  const segment = useSelectedLayoutSegment();
  const sheet = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const close = () => sheet.current?.close();
  const current = (match: boolean, kind: 'page' | 'true' = 'true') => (match ? kind : undefined);
  const pageActive = pages.some((p) => p.key === segment);

  return (
    <>
      <nav aria-label={labels.nav} className="m-tabbar">
        <ul>
          <li>
            <Link href="/" aria-current={current(segment === null, 'page')}>
              <svg {...icon}>
                <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />
              </svg>
              <span>{labels.home}</span>
            </Link>
          </li>
          <li>
            <Link href={{ pathname: '/', hash: 'work' }} aria-current={current(segment === 'work')}>
              <svg {...icon}>
                <rect x="3.5" y="4.5" width="17" height="12" rx="2" />
                <path d="M8 20h8M12 16.5V20" />
              </svg>
              <span>{labels.work}</span>
            </Link>
          </li>
          <li>
            <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={labels.whatsappLabel} className="m-tab-wa">
              <span className="m-tab-wa-pill">
                <WhatsAppIcon className="size-[22px]" />
              </span>
              <span aria-hidden="true">{labels.whatsapp}</span>
            </a>
          </li>
          <li>
            <Link href={{ pathname: '/', hash: 'services' }} aria-current={current(segment === 'services' || segment === 'palembang')}>
              <svg {...icon}>
                <path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.4-.4-2.6z" />
              </svg>
              <span>{labels.services}</span>
            </Link>
          </li>
          <li>
            <button type="button" aria-haspopup="dialog" onClick={() => sheet.current?.showModal()} data-active={pageActive || undefined}>
              <svg {...icon}>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <span>{labels.menu}</span>
            </button>
          </li>
        </ul>
      </nav>

      <dialog
        ref={sheet}
        aria-labelledby={titleId}
        className="m-sheet"
        onClick={(e) => {
          // A click on the backdrop lands on the dialog itself, outside the panel.
          if (e.target === sheet.current) close();
        }}
      >
        <div className="m-sheet-panel">
          <div className="flex items-center justify-between gap-4">
            <h2 id={titleId} className="font-display text-2xl font-bold">
              {labels.menu}
            </h2>
            <button type="button" onClick={close} className="m-sheet-close" aria-label={labels.close}>
              <svg {...icon}>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label={labels.sheet} className="mt-4">
            <ul>
              {sections.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} onClick={close} className="m-sheet-link">
                    {l.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold text-tinta-muda">{labels.pages}</p>
            <ul className="mt-1">
              {pages.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} onClick={close} aria-current={current(segment === l.key, 'page')} className="m-sheet-link">
                    {l.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <a href={`mailto:${contact.email}`} className="link tap-area inline-block py-2 [overflow-wrap:anywhere]">
              {contact.email}
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" className="link tap-area inline-block py-2">
              {contact.githubLabel}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
