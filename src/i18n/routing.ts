import { defineRouting } from 'next-intl/routing';

// Indonesian is the default and lives at the root (/), English at /en.
// Most clients are Indonesian businesses, so they land in their own language without choosing.
// Public URLs are localised where it helps search: Indonesian visitors search for "layanan", "tanya jawab",
// "jasa pembuatan aplikasi Palembang"; the route folders stay in English.
export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  localePrefix: 'as-needed',
  localeDetection: false,
  // The pages render complete hreflang links themselves. next-intl's Link header reused the same slug in both languages
  // (a 404 for services) and pointed x-default at Indonesian, contradicting the HTML.
  alternateLinks: false,
  pathnames: {
    '/': '/',
    '/work/[slug]': '/work/[slug]',
    '/services/[slug]': { id: '/layanan/[slug]', en: '/services/[slug]' },
    '/faq': { id: '/tanya-jawab', en: '/faq' },
    '/palembang': { id: '/jasa-pembuatan-aplikasi-palembang', en: '/software-developer-palembang' },
    '/articles': { id: '/artikel', en: '/articles' },
    '/articles/[slug]': { id: '/artikel/[slug]', en: '/articles/[slug]' },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
