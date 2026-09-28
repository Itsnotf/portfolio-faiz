import type { Project } from '@/content/work';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { ProjectCover } from './project-cover';

interface Props {
  project: Project;
  locale: Locale;
  /** Problem categories already translated, e.g. "Pencatatan & laporan". */
  category: string;
  labels: { decision: string; diagram: string; readCase: string };
  sizes: string;
}

/**
 * One project as a card: cover in a fixed 16:10 frame, category, title, the client's problem and the key decision.
 * Case studies link to their page; archive projects show their data diagram instead of a screenshot.
 * No hooks, so it renders in both the client archive section and server pages.
 */
export function ProjectCard({ project: p, locale, category, labels, sizes }: Props) {
  const isCase = Boolean(p.caseStudy);
  return (
    <article className="card relative flex h-full flex-col rounded-[20px] border border-garis bg-lembar p-3">
      <ProjectCover project={p} locale={locale} prefer={isCase ? 'shot' : 'diagram'} sizes={sizes} diagramLabel={labels.diagram} />
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <p className="text-sm font-semibold text-stempel">{category}</p>
        <h3 className="mt-2 text-2xl">
          {isCase ? (
            <Link
              href={{ pathname: '/work/[slug]', params: { slug: p.slug } }}
              className="no-underline after:absolute after:inset-0 after:rounded-[20px] after:content-['']"
            >
              {p.title[locale]}
            </Link>
          ) : (
            p.title[locale]
          )}
        </h3>
        <p className="mt-2 text-[0.975rem] text-tinta-muda">{p.problem[locale]}</p>
        {p.keyDecision ? (
          <div className="mt-4 border-l-2 border-stempel pl-3">
            <p className="text-sm font-semibold text-stempel">{labels.decision}</p>
            <p className="mt-1 text-[0.95rem]">{p.keyDecision[locale]}</p>
          </div>
        ) : null}
        <p className="mt-auto pt-5 text-sm text-tinta-muda">{p.stack.join(', ')}</p>
        {isCase ? (
          <span aria-hidden="true" className="link mt-3 self-start text-sm font-semibold text-stempel">
            {labels.readCase}
          </span>
        ) : null}
      </div>
    </article>
  );
}
