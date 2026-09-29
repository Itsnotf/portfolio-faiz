'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { whatsappUrl } from '@/lib/contact';
import { WhatsAppIcon } from './whatsapp-icon';

/**
 * Phones only: a WhatsApp button within thumb reach, so getting in touch never needs a long scroll (Fitts's law).
 * It appears once the visitor has scrolled past the opening screen and steps aside while a contact block with the
 * same button is on screen, so there are never two identical buttons in view. It sits below the menu panel, which
 * covers it when the menu is open.
 */
export function WhatsAppFloat() {
  const t = useTranslations('contact');
  const pathname = usePathname();
  const [pastStart, setPastStart] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastStart(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const zones = document.querySelectorAll('[data-contact-zone]');
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setAtContact(visible.size > 0);
    });
    zones.forEach((z) => io.observe(z));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, [pathname]);

  const shown = pastStart && !atContact;

  return (
    <a
      href={whatsappUrl(t('waMessage'))}
      target="_blank"
      rel="noreferrer"
      inert={!shown}
      aria-hidden={!shown}
      className={`wa-float fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold no-underline shadow-lg transition-[opacity,translate] duration-300 motion-reduce:transition-none md:hidden ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppIcon className="size-5 text-[#25d366]" />
      {t('float')}
    </a>
  );
}
