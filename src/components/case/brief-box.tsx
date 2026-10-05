import { getTranslations } from 'next-intl/server';
import type { Brief } from '@/content/work';
import type { Locale } from '@/i18n/routing';

/** "Ringkasnya": the case in four plain lines, at the top of the case page in both views. */
export async function BriefBox({ brief, locale, className = '' }: { brief: Brief; locale: Locale; className?: string }) {
  const t = await getTranslations('work');
  const tc = await getTranslations('case');
  const rows = [
    ['for', brief.audience],
    ['problem', brief.problem],
    ['built', brief.built],
    ['result', brief.result],
  ] as const;

  return (
    <section aria-labelledby="brief" className={`rounded-[20px] border border-garis bg-lembar p-5 md:p-7 ${className}`}>
      <h2 id="brief" className="eyebrow">
        {tc('brief')}
      </h2>
      <dl className="mt-4 grid gap-4 md:grid-cols-2 md:gap-x-8">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-sm font-semibold text-stempel">{t(k)}</dt>
            <dd className="mt-0.5">{v[locale]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
