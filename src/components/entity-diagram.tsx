import type { Diagram } from '@/content/work';
import type { Locale } from '@/i18n/routing';

const W = 360;
const H = 225;
const FONT = 13;
const LINE = 15;
const CHAR = 7.4; // average glyph width at FONT, used to size boxes
const PAD_X = 12;

/** Splits a long label into two lines at the space closest to the middle. */
function wrap(text: string, maxChars: number): string[] {
  if (text.length <= maxChars || !text.includes(' ')) return [text];
  const mid = text.length / 2;
  let best = -1;
  for (let i = text.indexOf(' '); i !== -1; i = text.indexOf(' ', i + 1)) {
    if (best === -1 || Math.abs(i - mid) < Math.abs(best - mid)) best = i;
  }
  return [text.slice(0, best), text.slice(best + 1)];
}

/**
 * A small sketch of how a project's data fits together, drawn from data so every archive card has the
 * same 16:10 shape and follows the colour theme. Boxes sit on a grid (col/row). Relations are plain lines;
 * pipeline steps ('flow') end in an arrow at the edge of the next box. No cardinality notation, so the
 * sketch reads for non-technical visitors too. Strokes draw in via [data-draw].
 */
export function EntityDiagram({ diagram, locale, label }: { diagram: Diagram; locale: Locale; label: string }) {
  const cols = Math.max(...diagram.nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...diagram.nodes.map((n) => n.row)) + 1;
  const cw = W / cols;
  const ch = H / rows;
  const maxW = cw - 10;
  const maxChars = Math.floor((maxW - PAD_X * 2) / CHAR);

  const boxes = new Map(
    diagram.nodes.map((n, i) => {
      const lines = wrap(n.label[locale], maxChars);
      const longest = Math.max(...lines.map((l) => l.length));
      const w = Math.min(Math.max(longest * CHAR + PAD_X * 2, 64), maxW);
      const h = 18 + lines.length * LINE;
      return [n.id, { x: cw * (n.col + 0.5), y: ch * (n.row + 0.5), w, h, lines, primary: i === 0 }];
    }),
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="h-full w-full" data-draw>
      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-tinta/40">
        {diagram.edges.map(([a, b, kind]) => {
          const p = boxes.get(a)!;
          const q = boxes.get(b)!;
          if (kind !== 'flow') return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />;
          // Stop the arrow just outside the target box.
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const len = Math.hypot(dx, dy) || 1;
          const ux = dx / len;
          const uy = dy / len;
          const exit = Math.min(ux ? q.w / 2 / Math.abs(ux) : Infinity, uy ? q.h / 2 / Math.abs(uy) : Infinity);
          const ex = q.x - ux * (exit + 3);
          const ey = q.y - uy * (exit + 3);
          const head = `${ex},${ey} ${ex - ux * 8 - uy * 4.5},${ey - uy * 8 + ux * 4.5} ${ex - ux * 8 + uy * 4.5},${ey - uy * 8 - ux * 4.5}`;
          return (
            <g key={`${a}-${b}`}>
              <line x1={p.x} y1={p.y} x2={ex - ux * 6} y2={ey - uy * 6} />
              <polygon points={head} fill="currentColor" stroke="none" />
            </g>
          );
        })}
      </g>
      {diagram.nodes.map((n) => {
        const b = boxes.get(n.id)!;
        const top = b.y - ((b.lines.length - 1) * LINE) / 2;
        return (
          <g key={n.id}>
            <rect
              x={b.x - b.w / 2}
              y={b.y - b.h / 2}
              width={b.w}
              height={b.h}
              rx="8"
              strokeWidth="1.5"
              className={b.primary ? 'fill-lembar stroke-stempel' : 'fill-lembar stroke-tinta/50'}
            />
            <text textAnchor="middle" className={`font-semibold ${b.primary ? 'fill-stempel' : 'fill-tinta'}`} style={{ fontSize: FONT }}>
              {b.lines.map((l, i) => (
                <tspan key={i} x={b.x} y={top + i * LINE} dominantBaseline="central">
                  {l}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
