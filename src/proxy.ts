import createMiddleware from 'next-intl/middleware';
import { NextResponse, userAgent, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { isView, VIEW_COOKIE, VIEW_PARAM, type View } from './lib/view';

const intl = createMiddleware(routing);

/**
 * Kill switch: set to 'desktop' to serve the desktop pages to everyone (for example if the mobile pages misbehave
 * after a deploy). The desktop pages keep their responsive rules, so they still work on phones.
 */
const FORCE_VIEW: View | null = null;

// Share images exist once per locale, outside the [view] folder, so they are never rewritten.
const METADATA_ROUTE = /\/(?:opengraph-image|twitter-image|icon|apple-icon)(?:[-/][\w-]+)?$/;

// One URL serves two different pages (dynamic serving), so caches must key on the device signals too. Netlify replaces
// the origin's Vary with this one, which is why Next's own values are repeated.
const VARY =
  'RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Accept-Encoding, User-Agent, Sec-CH-UA-Mobile, Cookie';

const locales: readonly string[] = routing.locales;

/** Phones get the mobile pages; tablets (including iPads, which report a Mac browser) and computers get desktop. */
function detectView(request: NextRequest): View {
  if (FORCE_VIEW) return FORCE_VIEW;
  const chosen = request.cookies.get(VIEW_COOKIE)?.value;
  if (isView(chosen)) return chosen;
  // Chromium browsers send this client hint on every request; tablets send ?0.
  const hint = request.headers.get('sec-ch-ua-mobile');
  if (hint === '?1') return 'mobile';
  if (hint === '?0') return 'desktop';
  const { device, ua } = userAgent(request);
  if (device.type === 'mobile') return 'mobile';
  if (device.type) return 'desktop';
  return /Mobi|iPhone|iPod/i.test(ua) ? 'mobile' : 'desktop';
}

export default function proxy(request: NextRequest) {
  // "Versi desktop / Versi mobile": ?view=desktop|mobile remembers the choice, ?view=auto forgets it. Works without JS.
  const asked = request.nextUrl.searchParams.get(VIEW_PARAM);
  if (asked !== null && request.method === 'GET') {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete(VIEW_PARAM);
    const response = NextResponse.redirect(clean, 303);
    if (isView(asked)) {
      response.cookies.set(VIEW_COOKIE, asked, { path: '/', maxAge: 60 * 60 * 24 * 180, sameSite: 'lax', secure: clean.protocol === 'https:' });
    } else {
      response.cookies.delete(VIEW_COOKIE);
    }
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  }

  // Locale handling as before: redirect (/id/… → /…), rewrite (/layanan/x → /id/services/x) or pass through (/en/…).
  const response = intl(request);
  if (response.headers.has('location')) return response;

  // Insert the view after the locale, whether next-intl rewrote the request or let it through.
  const rewrite = response.headers.get('x-middleware-rewrite');
  const target = rewrite ? new URL(rewrite) : request.nextUrl.clone();
  const [, locale, ...rest] = target.pathname.split('/');
  if (!locales.includes(locale) || METADATA_ROUTE.test(target.pathname)) return response;

  // A request for /id/mobile/… itself becomes /id/<view>/mobile/…, which matches no page: the internal URLs are not public.
  target.pathname = ['', locale, detectView(request), ...rest].join('/');
  response.headers.delete('x-middleware-next');
  response.headers.set('x-middleware-rewrite', target.toString());
  response.headers.set('Vary', VARY);
  return response;
}

export const config = {
  // Everything except API routes, Next internals and files with an extension. Client-side navigation and prefetch
  // requests use the same page URLs, so they pass through here too and land on the same view.
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
