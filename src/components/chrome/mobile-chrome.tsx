import { getLocale, getTranslations } from 'next-intl/server';
import { MobileTabBar } from '@/components/mobile/tab-bar';
import { MobileTopBar } from '@/components/mobile/top-bar';
import { SiteFooter } from '@/components/site-footer';
import { profile } from '@/content/profile';
import type { Locale } from '@/i18n/routing';
import { articles } from '@/lib/articles';
import { whatsappUrl } from '@/lib/contact';

/**
 * Phone pages: a compact top bar, the page, the footer and a tab bar within thumb reach. Native scrolling and no GSAP,
 * so phones download and run as little as possible.
 */
export async function MobileChrome({ children }: { children: React.ReactNode }) {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <MobileTopBar />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter view="mobile" />
      <MobileTabBar
        whatsapp={whatsappUrl(t('contact.waMessage'))}
        labels={{
          nav: t('nav.main'),
          home: t('nav.home'),
          work: t('nav.work'),
          services: t('nav.services'),
          menu: t('nav.menu'),
          close: t('nav.close'),
          whatsapp: t('nav.whatsapp'),
          whatsappLabel: t('nav.whatsappLabel'),
          sheet: t('nav.sheet'),
          pages: t('nav.pages'),
        }}
        sections={[
          { key: 'about', href: { pathname: '/', hash: 'about' }, label: t('about.eyebrow') },
          { key: 'approach', href: { pathname: '/', hash: 'approach' }, label: t('approach.eyebrow') },
          { key: 'archive', href: { pathname: '/', hash: 'archive' }, label: t('nav.archive') },
          { key: 'contact', href: { pathname: '/', hash: 'contact' }, label: t('nav.contact') },
        ]}
        pages={[
          { key: 'faq', href: '/faq', label: t('nav.faq') },
          ...(articles(locale).length ? [{ key: 'articles', href: '/articles' as const, label: t('nav.articles') }] : []),
          { key: 'palembang', href: '/palembang', label: t('nav.palembang') },
        ]}
        contact={{ email: profile.email, github: profile.github, githubLabel: t('contact.github') }}
      />
    </>
  );
}
