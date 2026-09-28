import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SmootherInit } from '@/components/motion/smooth-scroll';
import { PageMotion } from '@/components/motion/page-motion';
import { siteUrl, alternates } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/next';
import '../globals.css';

const display = localFont({
  src: '../../fonts/Anybody-Variable.woff2',
  variable: '--font-anybody',
  weight: '100 900',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '50% 150%' }],
});

const sans = localFont({
  src: [
    { path: '../../fonts/PublicSans-Variable.woff2', style: 'normal', weight: '100 900' },
    { path: '../../fonts/PublicSans-Variable-Italic.woff2', style: 'italic', weight: '100 900' },
  ],
  variable: '--font-public-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale: loc, namespace: 'meta' });
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;
  return {
    metadataBase: new URL(siteUrl),
    // The home title is keyword-first and already carries the name; inner pages get the name as a suffix.
    title: { default: t('title'), template: '%s — Faiz Aflah Hafizuddin' },
    description: t('description'),
    applicationName: 'Faiz Aflah Hafizuddin',
    authors: [{ name: 'Faiz Aflah Hafizuddin', url: siteUrl }],
    creator: 'Faiz Aflah Hafizuddin',
    alternates: alternates(loc, () => '/'),
    openGraph: { type: 'website', siteName: 'Faiz Aflah Hafizuddin', locale: loc === 'id' ? 'id_ID' : 'en_US' },
    twitter: { card: 'summary_large_image' },
    // Long snippets and large previews help search results and AI overviews quote the page.
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 } },
    ...(google || bing ? { verification: { ...(google ? { google } : {}), ...(bing ? { other: { 'msvalidate.01': bing } } : {}) } } : {}),
  };
}

// Adds `motion` to <html> before first paint when the visitor has not asked for reduced motion.
// The hero's scattered starting state is pure CSS keyed on this class, so there is no flash of
// the tidy layout jumping into chaos, and without JS or with reduced motion the page is simply tidy.
// Failsafe: if the hero script has not reported in after a few seconds (blocked or failed JS), tidy it.
// Applies a remembered light/dark choice before paint; without one, CSS follows the system setting.
const themeFlag = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef1f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1526' },
  ],
};

const motionFlag = `try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches){document.documentElement.classList.add('motion');setTimeout(function(){var h=document.querySelector('.hero');if(h&&!h.hasAttribute('data-ready'))h.classList.add('is-tidy')},3500)}}catch(e){}`;

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeFlag + motionFlag }} />
      </head>
      <body>
        <a href="#main" className="skip-link">{t('skip')}</a>
        <NextIntlClientProvider>
          <SiteHeader />
          {/* ScrollSmoother moves #smooth-content; fixed UI (header, menu, cursor) must stay outside it. */}
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <SmootherInit />
              <main id="main" tabIndex={-1} className="outline-none">
                {children}
              </main>
              <SiteFooter />
              <PageMotion />
            </div>
          </div>
        </NextIntlClientProvider>
        {/* Only on Vercel: shows visits referred by chatgpt.com, perplexity.ai, gemini and search engines. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
