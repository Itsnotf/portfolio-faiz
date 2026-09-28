import { education, profile } from '@/content/profile';
import { published, services, type Faq, type Service } from '@/content/services';
import type { Project } from '@/content/work';
import type { Article } from '@/lib/articles';
import type { Locale } from '@/i18n/routing';
import { siteUrl, urlFor, type Href } from '@/lib/seo';

/**
 * Schema.org data for search engines and AI assistants, built in one place so every page describes Faiz, his
 * service and his work with the same identifiers. Entities reference each other by @id.
 */
const PERSON_ID = `${siteUrl}/#person`;
const SERVICE_ID = `${siteUrl}/#service`;
const WEBSITE_ID = `${siteUrl}/#website`;

const inLanguage = (locale: Locale) => (locale === 'id' ? 'id-ID' : 'en');

const knowsAbout = [
  'Custom business software',
  'Business information systems',
  'Web application development',
  'Mobile app development',
  'Payroll systems',
  'Approval workflows',
  'Procurement and inventory systems',
  'Face recognition',
  'Machine learning',
  'Laravel',
  'React',
  'Next.js',
  'React Native',
];

const areaServed = [
  { '@type': 'City', name: 'Palembang' },
  { '@type': 'State', name: 'Sumatera Selatan' },
  { '@type': 'Country', name: 'Indonesia' },
  { '@type': 'Place', name: 'Worldwide (remote)' },
];

const address = { '@type': 'PostalAddress', addressLocality: 'Palembang', addressRegion: 'Sumatera Selatan', addressCountry: 'ID' };

export function person(locale: Locale) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    jobTitle: profile.jobTitle[locale],
    description: profile.bio[locale],
    url: urlFor(locale, '/'),
    email: `mailto:${profile.email}`,
    ...(profile.photo ? { image: `${siteUrl}${profile.photo}` } : {}),
    address,
    knowsAbout,
    knowsLanguage: ['id', 'en'],
    alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
    worksFor: { '@type': 'Organization', name: 'Loranet Technologies PLT', address: { '@type': 'PostalAddress', addressCountry: 'MY' } },
    founder: { '@type': 'Organization', name: 'Berkala Digital', address },
    sameAs: [profile.github, profile.linkedin].filter(Boolean),
  };
}

export function professionalService(locale: Locale) {
  return {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: profile.name,
    description:
      locale === 'id'
        ? 'Jasa pembuatan sistem informasi, aplikasi web dan mobile, serta AI dan otomasi untuk bisnis di Palembang, seluruh Indonesia, dan klien jarak jauh.'
        : 'Custom business systems, web and mobile apps, and AI and automation for companies in Palembang, across Indonesia and remote clients worldwide.',
    url: urlFor(locale, '/'),
    email: profile.email,
    telephone: profile.whatsapp.replace(/\s/g, ''),
    address,
    areaServed,
    availableLanguage: ['Indonesian', 'English'],
    founder: { '@id': PERSON_ID },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'id' ? 'Layanan' : 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.h1[locale], url: urlFor(locale, { pathname: '/services/[slug]', params: { slug: s.slug[locale] } }) },
      })),
    },
  };
}

export function website(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: profile.name,
    url: urlFor(locale, '/'),
    inLanguage: inLanguage(locale),
    publisher: { '@id': PERSON_ID },
  };
}

export function breadcrumb(locale: Locale, trail: { name: string; href: Href }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: urlFor(locale, t.href) })),
  };
}

export function faqPage(locale: Locale, items: Faq[]) {
  const list = published(items);
  if (!list.length) return null;
  return {
    '@type': 'FAQPage',
    inLanguage: inLanguage(locale),
    mainEntity: list.map((f) => ({ '@type': 'Question', name: f.q[locale], acceptedAnswer: { '@type': 'Answer', text: f.a[locale] } })),
  };
}

export function serviceEntity(locale: Locale, s: Service) {
  return {
    '@type': 'Service',
    name: s.h1[locale],
    serviceType: s.name[locale],
    description: s.metaDescription[locale],
    url: urlFor(locale, { pathname: '/services/[slug]', params: { slug: s.slug[locale] } }),
    provider: { '@id': SERVICE_ID },
    areaServed,
    availableLanguage: ['Indonesian', 'English'],
  };
}

export function caseStudyEntity(locale: Locale, p: Project) {
  const shot = p.shots[0];
  return {
    '@type': 'CreativeWork',
    name: p.seoTitle?.[locale] ?? p.title[locale],
    headline: p.title[locale],
    description: p.problem[locale],
    abstract: p.summary[locale],
    url: urlFor(locale, { pathname: '/work/[slug]', params: { slug: p.slug } }),
    inLanguage: inLanguage(locale),
    author: { '@id': PERSON_ID },
    ...(p.updated ? { dateModified: p.updated } : {}),
    ...(shot ? { image: `${siteUrl}${shot.src}` } : {}),
    keywords: p.stack.join(', '),
  };
}

export function blogPosting(locale: Locale, a: Article) {
  const url = urlFor(locale, { pathname: '/articles/[slug]', params: { slug: a.slug } });
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: a.title,
    description: a.summary,
    datePublished: a.published,
    dateModified: a.updated,
    inLanguage: inLanguage(locale),
    timeRequired: `PT${a.minutes}M`,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    about: a.services.map((k) => services.find((s) => s.key === k)?.name.en).filter(Boolean),
    mainEntityOfPage: url,
  };
}

/** Wraps entities in a single @graph so they can reference each other. Null entries are dropped. */
export function graph(...nodes: (object | null)[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}
