import { principles, profile } from '@/content/profile';
import { generalFaq, local, published, services } from '@/content/services';
import { archive, caseStudies } from '@/content/work';
import type { Locale } from '@/i18n/routing';
import { publishedArticles } from '@/lib/articles';
import { siteUrl, urlFor } from '@/lib/seo';

/**
 * llms.txt (https://llmstxt.org): a Markdown summary for AI agents and assistants, generated from the same content
 * as the pages so it never drifts. Machine-facing, so it follows the llms.txt format rather than the site's copy style.
 */

const serviceUrl = (l: Locale, slug: string) => urlFor(l, { pathname: '/services/[slug]', params: { slug } });
const caseUrl = (l: Locale, slug: string) => urlFor(l, { pathname: '/work/[slug]', params: { slug } });
const articleUrl = (l: Locale, slug: string) => urlFor(l, { pathname: '/articles/[slug]', params: { slug } });

function intro() {
  return [
    `# ${profile.name}`,
    '',
    '> Software engineer based in Palembang, Indonesia. Builds custom business systems, web and mobile apps, and AI features for companies in Palembang, across Indonesia and for remote clients worldwide. Works in Indonesian and English.',
    '',
    'Currently a software developer at Loranet Technologies PLT (Malaysia), reading existing system flows and building features for web and mobile apps, while running Berkala Digital, a creative digital agency in Palembang founded in 2025.',
    '',
    `How he works: ${principles.map((p) => p.title.en.toLowerCase()).join(', ')}.`,
    '',
  ];
}

function contact() {
  return [
    '## Contact',
    '',
    `- Email: ${profile.email}`,
    `- WhatsApp: ${profile.whatsapp}`,
    `- GitHub: ${profile.github}`,
    ...(profile.linkedin ? [`- LinkedIn: ${profile.linkedin}`] : []),
    `- Website (Indonesian): ${urlFor('id', '/')}`,
    `- Website (English): ${urlFor('en', '/')}`,
    '',
  ];
}

export function llmsTxt() {
  return [
    ...intro(),
    '## Services',
    '',
    ...services.map((s) => `- [${s.h1.en}](${serviceUrl('en', s.slug.en)}): ${s.metaDescription.en}`),
    `- [${local.h1.en}](${urlFor('en', '/palembang')}): ${local.metaDescription.en}`,
    '',
    '## Case studies',
    '',
    ...caseStudies.map((p) => `- [${p.seoTitle?.en ?? p.title.en}](${caseUrl('en', p.slug)}): ${p.problem.en}`),
    '',
    '## Other projects',
    '',
    ...archive.map((p) => `- ${p.title.en}: ${p.problem.en}`),
    '',
    ...(publishedArticles('en').length
      ? ['## Articles', '', ...publishedArticles('en').map((a) => `- [${a.title}](${articleUrl('en', a.slug)}): ${a.summary}`), '']
      : []),
    '## Answers',
    '',
    `- [Frequently asked questions](${urlFor('en', '/faq')}): process, cost factors, languages and how to prepare.`,
    `- [Full text for AI assistants](${siteUrl}/llms-full.txt): every service, case study and answer in one file.`,
    '',
    '## Halaman berbahasa Indonesia',
    '',
    ...services.map((s) => `- [${s.h1.id}](${serviceUrl('id', s.slug.id)})`),
    `- [${local.h1.id}](${urlFor('id', '/palembang')})`,
    `- [Tanya jawab](${urlFor('id', '/faq')})`,
    ...publishedArticles('id').map((a) => `- [${a.title}](${articleUrl('id', a.slug)})`),
    '',
    ...contact(),
  ].join('\n');
}

export function llmsFullTxt() {
  const out: string[] = [...intro()];
  for (const l of ['en', 'id'] as const) {
    out.push(l === 'en' ? '# Services' : '# Layanan', '');
    for (const s of services) {
      out.push(`## ${s.h1[l]}`, '', `URL: ${serviceUrl(l, s.slug[l])}`, '', s.lead[l], '');
      out.push(l === 'en' ? 'Problems it solves:' : 'Masalah yang diselesaikan:', ...s.problems.map((p) => `- ${p[l]}`), '');
      out.push(l === 'en' ? 'What affects the cost:' : 'Yang memengaruhi biaya:', ...s.costFactors.map((c) => `- ${c[l]}`), '');
      for (const f of published(s.faq)) out.push(`Q: ${f.q[l]}`, `A: ${f.a[l]}`, '');
    }
    out.push(l === 'en' ? '# Case studies' : '# Studi kasus', '');
    for (const p of caseStudies) {
      const cs = p.caseStudy!;
      out.push(`## ${p.seoTitle?.[l] ?? p.title[l]}`, '', `URL: ${caseUrl(l, p.slug)}`, '', p.problem[l], '', ...cs.context.map((c) => c[l]), '');
      for (const d of cs.decisions) out.push(`- ${d.title[l]}. ${d.body[l]}`);
      out.push('', cs.status[l], '');
    }
    out.push(l === 'en' ? '# Other projects' : '# Proyek lain', '');
    for (const p of archive) out.push(`- ${p.title[l]}. ${p.problem[l]}${p.keyDecision ? ` ${p.keyDecision[l]}` : ''}`);
    out.push('', l === 'en' ? '# Frequently asked questions' : '# Tanya jawab', '');
    for (const f of [...published(generalFaq), ...published(local.faq)]) out.push(`Q: ${f.q[l]}`, `A: ${f.a[l]}`, '');
    const posts = publishedArticles(l);
    if (posts.length) out.push(l === 'en' ? '# Articles' : '# Artikel', '');
    for (const a of posts) {
      // Article headings drop one level so they sit under the article title.
      out.push(`## ${a.title}`, '', `URL: ${articleUrl(l, a.slug)}`, `Updated: ${a.updated}`, '', a.summary, '', a.markdown.replace(/^(#{2,5}) /gm, '#$1 '), '');
    }
  }
  out.push(...contact());
  return out.join('\n');
}
