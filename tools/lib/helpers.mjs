export function esc(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function asset(path) {
  return "/assets" + (path.startsWith("/") ? path : "/" + path);
}

/** Truncate for meta title (≤60) or description (≤160); prefer word boundary. */
export function seoClip(s, maxLen) {
  const t = String(s == null ? "" : s)
    .replace(/\s+/g, " ")
    .trim();
  if (t.length <= maxLen) return t;
  const slice = t.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > Math.floor(maxLen * 0.55)) return slice.slice(0, lastSpace).trimEnd();
  return slice.trimEnd();
}

export function seoClipTitle(s, maxLen = 60) {
  return seoClip(s, maxLen);
}

export function seoClipDesc(s, maxLen = 160) {
  return seoClip(s, maxLen);
}

/** Image alt text: trim whitespace, hard cap length (SEO). */
export function clipImageAlt(s, maxLen = 120) {
  const t = String(s == null ? "" : s)
    .replace(/\s+/g, " ")
    .trim();
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen - 1).trimEnd() + "…";
}
