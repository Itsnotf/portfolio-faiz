'use client';

import { useState } from 'react';
import { archive, PROBLEMS, type Problem, type Project } from '@/content/work';

export type ArchiveFilter = Problem | 'all';

/** Filter state for the archive of smaller projects, shared by the desktop and phone archive sections. */
export function useArchiveFilter() {
  const [filter, setFilter] = useState<ArchiveFilter>('all');
  const visible = (p: Project) => filter === 'all' || p.problems.includes(filter);
  const used = PROBLEMS.filter((k) => archive.some((p) => p.problems.includes(k)));
  const count = (f: ArchiveFilter) => (f === 'all' ? archive.length : archive.filter((p) => p.problems.includes(f)).length);
  return { filter, setFilter, visible, used, count, shown: archive.filter(visible).length };
}
