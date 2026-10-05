import { proof } from '@/content/profile';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

/**
 * The short proof under the hero. A plain list, not chips: `.chip` is a toggle button on this site, so pill styling
 * would look tappable. Desktop shows every item in a strip; phones show the shorter stack.
 */
export function ProofList({ locale, label, variant, className = '' }: { locale: Locale; label: string; variant: 'strip' | 'stack'; className?: string }) {
  const items = variant === 'stack' ? proof.filter((p) => !p.desktopOnly) : proof;
  return (
    <ul aria-label={label} className={`proof proof-${variant} ${className}`}>
      {items.map((p) => (
        <li key={p.label.en}>
          <span className="font-semibold">
            {p.slug ? (
              <Link href={{ pathname: '/work/[slug]', params: { slug: p.slug } }} className="link">
                {p.label[locale]}
              </Link>
            ) : (
              p.label[locale]
            )}
          </span>
          <span className="block text-[0.875rem] text-tinta-muda">{p.detail[locale]}</span>
        </li>
      ))}
    </ul>
  );
}
