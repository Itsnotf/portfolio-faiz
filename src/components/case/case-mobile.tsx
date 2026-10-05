import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ContactCta } from '@/components/contact-cta';
import { ProjectCover } from '@/components/project-cover';
import { services } from '@/content/services';
import type { Project } from '@/content/work';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { BriefBox } from './brief-box';
import { HashDetails } from './hash-details';

/**
 * Case study, phones: the short version first ("Ringkasnya"), screenshots to swipe, then the story with each decision
 * as a <details> that opens on tap. Every text is in the HTML (folded, not removed), the same as on desktop.
 */
export async function CaseMobile({ project: p, next, locale }: { project: Project; next: Project; locale: Locale }) {
  const cs = p.caseStudy!;
  const t = await getTranslations('case');
  const ta = await getTranslations('archive');
  const tu = await getTranslations('ui');
  const related = services.filter((s) => s.proof.includes(p.slug));
  const updated = p.updated ? new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(p.updated)) : null;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <article className="pb-16">
      <HashDetails />
      <header className="wrap pt-[calc(var(--header-h)+1.25rem)]">
        <Link href={{ pathname: '/', hash: 'work' }} className="link-quiet tap-area inline-block text-sm font-semibold text-stempel">
          ← {t('back')}
        </Link>
        <p className="mt-5 text-sm text-tinta-muda">
          {p.status[locale]} · {p.year}
        </p>
        <h1 className="mt-2 text-[clamp(2rem,9vw,2.5rem)] leading-[1.05]">{p.title[locale]}</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-tinta-muda">{p.summary[locale]}</p>
        {updated ? <p className="mt-3 text-[0.8125rem] text-tinta-muda">{t('updated', { date: updated })}</p> : null}

        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-[0.95rem]">
          <div className="field col-span-2">
            <dt>{t('role')}</dt>
            <dd>{p.role[locale]}</dd>
          </div>
          <div className="field">
            <dt>{t('year')}</dt>
            <dd>{p.year}</dd>
          </div>
          <div className="field">
            <dt>{t('status')}</dt>
            <dd>{p.status[locale]}</dd>
          </div>
        </dl>
        <BriefBox brief={cs.brief} locale={locale} className="mt-8" />
      </header>

      {/* Screenshots side by side, swiped with the thumb; the next one peeks in to show there is more. */}
      <figure className="mt-10">
        {p.shots.length ? (
          <div role="region" aria-label={`${t('shots')} (${p.shots.length})`} tabIndex={0} className="m-shots">
            <ul>
              {p.shots.map((s, i) => (
                <li key={s.src} className={s.kind === 'mobile' ? 'm-shot-phone' : 'm-shot-desktop'}>
                  <Image
                    src={s.src}
                    alt={s.alt[locale]}
                    width={s.width}
                    height={s.height}
                    sizes={s.kind === 'mobile' ? '58vw' : '86vw'}
                    priority={i === 0}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="wrap">
            <ProjectCover project={p} locale={locale} sizes="calc(100vw - 2.5rem)" diagramLabel={ta('title')} />
          </div>
        )}
        <figcaption className="wrap mt-3 text-[0.8125rem] text-tinta-muda">
          {t('sample')}
          {p.shots.length > 1 ? ` ${tu('swipe')} →` : null}
        </figcaption>
      </figure>

      <div className="wrap mt-12 space-y-12">
        <section aria-labelledby="problem">
          <h2 id="problem" className="eyebrow">
            {t('problem')}
          </h2>
          <p className="mt-3 font-display text-[1.45rem] font-bold leading-tight">{p.problem[locale]}</p>
        </section>

        {cs.stats ? (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-6 border-y border-garis py-6">
            {cs.stats.map((s) => (
              <div key={s.label.en} className="flex flex-col-reverse">
                <dt className="mt-1.5 text-[0.8125rem] text-tinta-muda">{s.label[locale]}</dt>
                <dd className="font-display text-[2rem] font-bold leading-none text-stempel">
                  {new Intl.NumberFormat(locale, { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 }).format(s.value)}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <section aria-labelledby="context">
          <h2 id="context" className="text-[1.6rem]">
            {t('context')}
          </h2>
          {cs.context.map((para, i) => (
            <p key={i} className="mt-4">
              {para[locale]}
            </p>
          ))}
        </section>

        <section aria-labelledby="decisions">
          <h2 id="decisions" className="text-[1.6rem]">
            {t('decisions')}
          </h2>
          <ol className="mt-4 divide-y divide-garis border-y border-garis">
            {cs.decisions.map((d, i) => (
              <li key={d.id}>
                <details id={d.id} className="m-acc case-decision group">
                  <summary>
                    <h3 className="font-display text-[1.1rem] font-bold leading-snug">
                      <span className="mr-2 text-sm text-stempel">{pad(i + 1)}</span>
                      {d.title[locale]}
                    </h3>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p className="mb-5 text-tinta-muda">{d.body[locale]}</p>
                </details>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="state">
          <h2 id="state" className="text-[1.6rem]">
            {t('state')}
          </h2>
          <p className="mt-4">{cs.status[locale]}</p>
        </section>

        {cs.reflection ? (
          <section aria-labelledby="reflection" className="border-l-4 border-stempel pl-5">
            <h2 id="reflection" className="text-[1.6rem]">
              {t('reflection')}
            </h2>
            <p className="mt-4">{cs.reflection[locale]}</p>
          </section>
        ) : null}
      </div>

      <ContactCta />

      <div className="wrap mt-12 space-y-12">
        {related.length ? (
          <section aria-labelledby="related">
            <h2 id="related" className="text-[1.6rem]">
              {t('related')}
            </h2>
            <ul className="mt-3 divide-y divide-garis border-y border-garis">
              {related.map((r) => (
                <li key={r.key}>
                  <Link
                    href={{ pathname: '/services/[slug]', params: { slug: r.slug[locale] } }}
                    className="flex min-h-14 items-center justify-between gap-4 py-3 font-semibold text-stempel no-underline"
                  >
                    {r.h1[locale]}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <Link href={{ pathname: '/work/[slug]', params: { slug: next.slug } }} className="card flex items-center gap-4 rounded-[20px] border border-garis bg-lembar p-4 no-underline">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-tinta-muda">{t('next')}</p>
            <p className="mt-1 font-display text-[1.5rem] font-bold leading-tight">{next.title[locale]}</p>
            <p className="mt-1 text-[0.9rem] leading-snug text-tinta-muda">{next.problem[locale]}</p>
          </div>
          <span aria-hidden="true" className="text-2xl text-stempel">
            →
          </span>
        </Link>

        {/* For technical readers, kept out of the way of clients. */}
        <section aria-labelledby="stack" className="border-t border-garis pt-5">
          <h2 id="stack" className="text-sm font-semibold text-tinta-muda [font-family:inherit]">
            {t('stack')}
          </h2>
          <p className="mt-2 text-sm text-tinta-muda">{p.stack.join(', ')}</p>
        </section>
      </div>
    </article>
  );
}
