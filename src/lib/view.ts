/**
 * Every page exists twice, built separately for phones and for larger screens, at the same public URL.
 * `src/proxy.ts` picks one per request and rewrites to /<locale>/<view>/…; pages read the view from their params.
 * Kept free of server-only imports so client components can use it too.
 */
export const views = ['desktop', 'mobile'] as const;
export type View = (typeof views)[number];

export const isView = (value: unknown): value is View => value === 'desktop' || value === 'mobile';

/** Cookie set by the "Versi desktop / Versi mobile" link; it wins over device detection. */
export const VIEW_COOKIE = 'view';
/** Query parameter that sets (desktop|mobile) or clears (auto) that cookie: /?view=desktop. */
export const VIEW_PARAM = 'view';
