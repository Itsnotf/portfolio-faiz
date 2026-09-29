import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';

type LinkHref = ComponentProps<typeof Link>['href'];

/** Visible breadcrumb trail; the same trail is also given to search engines as BreadcrumbList data. */
export function Breadcrumbs({ trail, label }: { trail: { name: string; href?: LinkHref }[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
        {trail.map((c, i) => (
          <li key={c.name} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="text-tinta-muda">
                /
              </span>
            ) : null}
            {c.href && i < trail.length - 1 ? (
              <Link href={c.href} className="link-quiet tap-area inline-block text-stempel">
                {c.name}
              </Link>
            ) : (
              <span aria-current={i === trail.length - 1 ? 'page' : undefined} className="text-tinta-muda">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
