import Image from 'next/image';
import type { Project } from '@/content/work';
import type { Locale } from '@/i18n/routing';
import { EntityDiagram } from './entity-diagram';

interface Props {
  project: Project;
  locale: Locale;
  sizes: string;
  /** Archive cards show the data diagram even when screenshots exist. */
  prefer?: 'shot' | 'diagram';
  priority?: boolean;
  diagramLabel: string;
}

/** Every project image is shown in the same 16:10 frame, whatever the source size. */
export function ProjectCover({ project, locale, sizes, prefer = 'shot', priority, diagramLabel }: Props) {
  const phones = project.shots.filter((s) => s.kind === 'mobile');
  const desktop = project.shots.find((s) => s.kind === 'desktop');

  if (prefer === 'diagram' && project.diagram) {
    return (
      <div className="frame grid place-items-center bg-[color-mix(in_oklab,var(--accent)_5%,var(--surface))] p-3">
        <EntityDiagram diagram={project.diagram} locale={locale} label={diagramLabel} />
      </div>
    );
  }

  if (phones.length) {
    return (
      <div className="frame frame-phones">
        {phones.slice(0, 3).map((s, i) => (
          <div key={s.src} className="phone" style={{ marginBottom: i === 1 ? '0' : '-6%' }}>
            <Image src={s.src} alt={s.alt[locale]} width={s.width} height={s.height} sizes="(min-width: 768px) 12rem, 28vw" priority={priority} />
          </div>
        ))}
      </div>
    );
  }

  if (desktop) {
    return (
      <div className="frame">
        <Image src={desktop.src} alt={desktop.alt[locale]} width={desktop.width} height={desktop.height} sizes={sizes} priority={priority} />
      </div>
    );
  }

  if (project.diagram) {
    return (
      <div className="frame grid place-items-center bg-[color-mix(in_oklab,var(--accent)_5%,var(--surface))] p-3">
        <EntityDiagram diagram={project.diagram} locale={locale} label={diagramLabel} />
      </div>
    );
  }

  return (
    <div className="frame grid place-items-center bg-[color-mix(in_oklab,var(--accent)_5%,var(--surface))]">
      <span className="font-display text-3xl font-bold text-tinta/30 [font-stretch:120%]">{project.title[locale]}</span>
    </div>
  );
}
