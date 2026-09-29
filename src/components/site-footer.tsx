import { getLocale, getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import { local, services } from '@/content/services';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { articles } from '@/lib/articles';

/** Footer with links to every service and help page: useful for visitors and tells search engines what matters. */
export async function SiteFooter() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;

  // Extra room at the bottom on phones so the floating WhatsApp button never covers the last links.
  return (
    <footer className="wrap border-t border-garis pb-24 pt-12 text-sm text-tinta-muda md:pb-8">
      <div className="grid-12 gap-y-10">
        <nav aria-label={t('footer.services')} className="md:col-span-5">
          <p className="font-semibold text-tinta">{t('footer.services')}</p>
          <ul className="mt-2 md:mt-3 md:space-y-2">
            {services.map((s) => (
              <li key={s.key}>
                <Link href={{ pathname: '/services/[slug]', params: { slug: s.slug[locale] } }} className="link-quiet inline-block py-2.5 md:py-0">
                  {s.h1[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t('footer.more')} className="md:col-span-4 md:col-start-7">
          <p className="font-semibold text-tinta">{t('footer.more')}</p>
          <ul className="mt-2 md:mt-3 md:space-y-2">
            <li>
              <Link href="/palembang" className="link-quiet inline-block py-2.5 md:py-0">
                {local.h1[locale]}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="link-quiet inline-block py-2.5 md:py-0">
                {t('nav.faq')}
              </Link>
            </li>
            {articles(locale).length ? (
              <li>
                <Link href="/articles" className="link-quiet inline-block py-2.5 md:py-0">
                  {t('nav.articles')}
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-garis pt-6">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#main" className="link-quiet tap-area inline-block py-2 font-semibold text-tinta">
          {t('footer.top')} ↑
        </a>
      </div>
    </footer>
  );
}
