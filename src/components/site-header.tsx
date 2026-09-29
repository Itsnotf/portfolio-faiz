import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { articles } from '@/lib/articles';
import { HeaderBehavior } from './header-behavior';
import { LanguageSwitch } from './language-switch';
import { MobileNav, type NavLink } from './mobile-nav';
import { ThemeToggle } from './theme-toggle';

/** Home-page sections in the main navigation. The archive is part of "Projects", so it has no entry of its own. */
const SECTIONS = ['services', 'approach', 'work', 'about'] as const;

export async function SiteHeader() {
  const t = await getTranslations('nav');
  const locale = (await getLocale()) as Locale;
  const target = locale === 'en' ? 'id' : 'en';
  const links: NavLink[] = SECTIONS.map((id) => ({ key: id, href: { pathname: '/', hash: id }, label: t(id) }));

  return (
    <header id="site-header" className="site-header">
      <HeaderBehavior />
      <div className="wrap flex items-center justify-between gap-6">
        <Link href="/" className="tap-area font-display text-base font-bold leading-[1.1] no-underline [font-stretch:105%] sm:whitespace-nowrap sm:text-lg sm:[font-stretch:118%]">
          Faiz Aflah <br className="sm:hidden" />
          Hafizuddin
        </Link>
        <nav aria-label={t('main')} className="hidden items-center gap-6 text-[0.95rem] lg:flex">
          {links.map((l) => (
            <Link key={l.key} href={l.href} className="link-quiet">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle labels={{ dark: t('themeDark'), light: t('themeLight') }} />
          <LanguageSwitch label={t('language')} short={t('languageShort')} target={target} />
          <Link href={{ pathname: '/', hash: 'contact' }} className="btn btn-primary btn-sm hidden lg:inline-flex" data-magnetic>
            <span className="roll" data-label={t('cta')}>
              <span>{t('cta')}</span>
            </span>
          </Link>
          <MobileNav
            links={[
              ...links,
              { key: 'faq', href: '/faq', label: t('faq') },
              ...(articles(locale).length ? [{ key: 'articles', href: '/articles' as const, label: t('articles') }] : []),
              { key: 'contact', href: { pathname: '/', hash: 'contact' }, label: t('contact') },
            ]}
            labels={{ menu: t('menu'), close: t('close'), nav: t('main') }}
          />
        </div>
      </div>
    </header>
  );
}
