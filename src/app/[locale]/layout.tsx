import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { siteUrl, alternates } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/next';
import '../globals.css';

const display = localFont({
  src: '../../fonts/Anybody-Variable.woff2',
  variable: '--font-anybody',
  weight: '100 900',
  display: 'swap',
  // The width-matched fallback faces live in globals.css (the automatic one is sized for regular weight).
  adjustFontFallback: false,
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

// Applies a remembered light/dark choice before paint; without one, CSS follows the system setting.
const themeFlag = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export const viewport: Viewport = {
  // Lets the phone tab bar sit above the home indicator (env(safe-area-inset-bottom) is 0 without it).
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef1f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1526' },
  ],
};

// Adds `motion` to <html> before first paint when the visitor has not asked for reduced motion; all animation is
// keyed on it, so without JS or with reduced motion the page is simply static and fully readable.
const motionFlag = `try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

// Some hosts inject a comment into <head> (Netlify adds "This site is hosted on Netlify…" after <meta charset>).
// React renders <head> itself, so that stray comment and its whitespace break hydration; React then re-renders the
// whole page on the client and drops the classes above, which switches the animations off. React never puts
// comments or whitespace in <head>, so removing them before hydration is safe.
const headCleanup = `try{for(var n=document.head.firstChild,x;n;n=x){x=n.nextSibling;if(n.nodeType===8||(n.nodeType===3&&!n.nodeValue.trim()))n.remove()}}catch(e){}`;

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    // data-scroll-behavior: the phone pages scroll smoothly to anchors via CSS; Next turns that off during route changes.
    <html lang={locale} className={`${display.variable} ${sans.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headCleanup + themeFlag + motionFlag }} />
      </head>
      <body>
        <a href="#main" className="skip-link">{t('skip')}</a>
        {/* Header, main, footer and motion are rendered per view by src/app/[locale]/[view]/layout.tsx. */}
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        {/* Only on Vercel: shows visits referred by chatgpt.com, perplexity.ai, gemini and search engines. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
