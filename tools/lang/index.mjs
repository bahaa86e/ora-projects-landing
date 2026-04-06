import en from "./en.mjs";
import ar from "./ar.mjs";

export const locales = { en, ar };
export const LANGS = ["en", "ar"];

export function getLocale(lang) {
  return locales[lang] || locales.en;
}
