import { published, type Faq } from '@/content/services';
import type { Locale } from '@/i18n/routing';

/**
 * Questions and answers as native <details>: works without JavaScript and keeps every answer in the HTML, exactly
 * matching the FAQPage structured data (only confirmed answers appear in either).
 */
export function FaqList({ items, locale }: { items: Faq[]; locale: Locale }) {
  const list = published(items);
  if (!list.length) return null;
  return (
    <div className="divide-y divide-garis border-y border-garis">
      {list.map((f) => (
        <details key={f.q.en} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl font-bold [&::-webkit-details-marker]:hidden">
            <span>{f.q[locale]}</span>
            <span aria-hidden="true" className="mt-1 text-stempel transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="measure-wide mt-3 text-lg text-tinta-muda">{f.a[locale]}</p>
        </details>
      ))}
    </div>
  );
}
