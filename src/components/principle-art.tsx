/** Line illustrations, one per principle (same order as `principles`). Strokes draw in on desktop via data-draw. */
export const PRINCIPLE_ART = [
  // Learn the real flow: three steps, plus the shortcut nobody wrote down.
  <>
    <circle cx="16" cy="48" r="8" />
    <circle cx="60" cy="48" r="8" />
    <circle cx="104" cy="48" r="8" />
    <path d="M24 48 H52 M68 48 H96" />
    <path d="M18 40 C 34 10, 86 10, 102 40" />
  </>,
  // Rules and exceptions: a decision with two outcomes.
  <>
    <path d="M60 14 L86 42 L60 70 L34 42 Z" />
    <path d="M34 42 H12 M86 42 H108" />
    <path d="M100 30 l4 4 l8 -8" />
    <path d="M6 30 l8 8 M14 30 l-8 8" />
  </>,
  // The simplest thing that is enough: several boxes become one.
  <>
    <rect x="8" y="12" width="30" height="16" rx="3" />
    <rect x="8" y="34" width="30" height="16" rx="3" />
    <rect x="8" y="56" width="30" height="16" rx="3" />
    <path d="M46 42 H76 M70 36 l6 6 -6 6" />
    <rect x="84" y="24" width="28" height="36" rx="4" />
  </>,
  // Traceable: a total with lines back to its sources.
  <>
    <rect x="6" y="8" width="28" height="14" rx="3" />
    <rect x="46" y="8" width="28" height="14" rx="3" />
    <rect x="86" y="8" width="28" height="14" rx="3" />
    <path d="M20 22 V40 H60 M60 22 V60 M100 22 V40 H60" />
    <rect x="42" y="60" width="36" height="16" rx="3" />
  </>,
  // Lock, test, hand over.
  <>
    <path d="M48 38 V28 a12 12 0 0 1 24 0 V38" />
    <rect x="38" y="38" width="44" height="34" rx="5" />
    <path d="M50 55 l7 7 l13 -14" />
  </>,
];

export function PrincipleArt({ index, className, draw }: { index: number; className: string; draw?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-draw={draw ? '' : undefined}
    >
      {PRINCIPLE_ART[index]}
    </svg>
  );
}
