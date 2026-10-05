/**
 * The element id a URL fragment points at. A fragment with malformed percent-encoding (a shared link cut off after
 * a "%") falls back to its raw text instead of throwing, which would take the page down with it.
 */
export function hashId(hash: string): string {
  const raw = hash.replace(/^#/, '');
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}
