/** Root-level English SEO URLs (no /en/ prefix) — project prices, payment plans, buyer-intent keyword landings */

import { PROJECT_ORDER, PROJECTS } from "../projects-meta.mjs";

/** Buyer-intent keyword URLs (English root + paired /ar/{slug}/) */
export const KEYWORD_PRICE_SLUGS = [
  "zed-west-price",
  "zed-east-price",
  "solana-west-price",
  "solana-east-price",
  "silversands-price",
];

/** Extra English-root buyer-intent landings (paired with /ar/{slug}/) */
export const KEYWORD_EXTRA_SLUGS = ["zed-west-villas-for-sale"];

export const ALL_KEYWORD_LANDING_SLUGS = [...KEYWORD_PRICE_SLUGS, ...KEYWORD_EXTRA_SLUGS];

const projectRootFolders = PROJECT_ORDER.flatMap((k) => {
  const m = PROJECTS[k];
  return [m.pricesFolder, m.paymentFolder];
});

export const ROOT_SEO_FOLDERS = new Set([...projectRootFolders, ...ALL_KEYWORD_LANDING_SLUGS]);

/** Legacy paths to delete under /public if present */
export const DEPRECATED_ROOT_SEO_FOLDERS = [];

export function isRootSeoEnglishPath(pathWithoutLang) {
  if (!pathWithoutLang || pathWithoutLang === "/") return false;
  const seg = pathWithoutLang.replace(/^\/|\/$/g, "").split("/")[0];
  return ROOT_SEO_FOLDERS.has(seg);
}

export function englishPricesPath(meta) {
  if (ROOT_SEO_FOLDERS.has(meta.pricesFolder)) return `/${meta.pricesFolder}/`;
  return `/en/${meta.pricesFolder}/`;
}

export function englishPaymentPath(meta) {
  if (ROOT_SEO_FOLDERS.has(meta.paymentFolder)) return `/${meta.paymentFolder}/`;
  return `/en/${meta.paymentFolder}/`;
}

export function localePathSeoAware(langCode, pathWithoutLang) {
  if (langCode === "en" && isRootSeoEnglishPath(pathWithoutLang)) {
    return pathWithoutLang.endsWith("/") ? pathWithoutLang : `${pathWithoutLang}/`;
  }
  if (pathWithoutLang === "/") return `/${langCode}/`;
  return `/${langCode}${pathWithoutLang}`;
}
