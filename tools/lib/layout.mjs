import { esc, asset, seoClipTitle, seoClipDesc } from "./helpers.mjs";
import { localePathSeoAware, englishPricesPath, englishPaymentPath } from "./seo-routes.mjs";
import { PROJECT_ORDER, PROJECTS, projectCopyForLang } from "../projects-meta.mjs";

function localePath(langCode, pathWithoutLang) {
  return localePathSeoAware(langCode, pathWithoutLang);
}

function localeAbsoluteUrl(siteUrl, langCode, pathWithoutLang) {
  const base = siteUrl.replace(/\/$/, "");
  return base + localePath(langCode, pathWithoutLang);
}

/** Optional EGP bandwidth for lead qualification (`name="budget"`). */
export function leadBudgetFieldHtml(lang, L, idPrefix, layoutMode = "stacked") {
  const id = `${idPrefix}-budget-${lang}`;
  const pairs = [
    ["", L.budgetOptUnspecified],
    ["20m-30m", L.budgetOpt20_30],
    ["30m-50m", L.budgetOpt30_50],
    ["50m-plus", L.budgetOpt50_plus],
  ];
  const opts = pairs.map(([v, t]) => `<option value="${esc(v)}">${esc(t)}</option>`).join("");
  const hint =
    layoutMode === "stacked" && L.formBudgetHint
      ? `<p class="form-hint form-hint--budget">${esc(L.formBudgetHint)}</p>`
      : "";
  if (layoutMode === "compact") {
    return `<div class="form-group form-group--budget top-lead__budget">
    <label class="sr-only" for="${id}">${esc(L.labelBudget)}</label>
    <select id="${id}" name="budget" class="top-lead__select" autocomplete="off">${opts}</select>
  </div>`;
  }
  return `<div class="form-group form-group--budget">
    <label for="${id}">${esc(L.labelBudget)}</label>
    <select id="${id}" name="budget" autocomplete="off">${opts}</select>
    ${hint}
  </div>`;
}

export function topForm(lang, L) {
  return `<div class="top-lead">
  <div class="container top-lead__inner">
    <p class="top-lead__title">${esc(L.topFormTitle)}</p>
    <p class="top-lead__fast">${esc(L.formFastResponse)}</p>
    <form class="js-lead-form top-lead__form" action="#" method="get" novalidate>
      <div class="form-group">
        <label class="sr-only" for="top-name-${lang}">${esc(L.labelName)}</label>
        <input id="top-name-${lang}" name="name" type="text" autocomplete="name" required placeholder="${esc(L.labelName)}" />
      </div>
      <div class="form-group">
        <label class="sr-only" for="top-phone-${lang}">${esc(L.labelPhone)}</label>
        <input id="top-phone-${lang}" name="phone" type="tel" autocomplete="tel" inputmode="tel" required placeholder="${esc(L.labelPhone)}" />
      </div>
      ${leadBudgetFieldHtml(lang, L, "top", "compact")}
      <button class="btn btn-primary btn--top-submit" type="submit">${esc(L.ctaSubmit)}</button>
    </form>
    <p class="top-lead__trust">${esc(L.formPrivacyShort)} <a href="/${lang}/privacy-policy/">${esc(L.navPrivacy)}</a>.</p>
  </div>
</div>`;
}

export function langSwitch(lang, pathWithoutLang) {
  const toEn = localePath("en", pathWithoutLang);
  const toAr = localePath("ar", pathWithoutLang);
  return `<div class="lang-switch" role="navigation" aria-label="Language">
  <a href="${esc(toEn)}" class="lang-switch__link${lang === "en" ? " is-active" : ""}" hreflang="en">EN</a>
  <span class="lang-switch__sep" aria-hidden="true">|</span>
  <a href="${esc(toAr)}" class="lang-switch__link${lang === "ar" ? " is-active" : ""}" hreflang="ar">AR</a>
</div>`;
}

function adsDisclaimerBar(L) {
  return `<aside class="ads-disclaimer" role="note" aria-label="${esc(L.adsDisclaimerAria)}"><div class="container"><p class="ads-disclaimer__text">${esc(L.adsDisclaimerBanner)}</p></div></aside>`;
}

export function header(lang, L, pathWithoutLang) {
  const base = `/${lang}`;
  return `<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="${base}/">${esc(L.brandShort)} <span>${esc(L.brandDev)}</span> ${esc(L.brandGeo)}</a>
    ${langSwitch(lang, pathWithoutLang)}
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-${lang}" aria-label="${esc(L.openMenu)}">
      <span></span><span></span><span></span>
    </button>
    <nav class="nav-primary" id="nav-${lang}" aria-label="Primary">
      <a href="${base}/">${esc(L.navHome)}</a>
      <a href="${base}/projects/">${esc(L.navProjects)}</a>
      <a href="${base}/about/">${esc(L.navAbout)}</a>
      <a href="${base}/blog/">${esc(L.navBlog)}</a>
      <a href="${base}/faq/">${esc(L.navFaq)}</a>
      <a href="${base}/contact/">${esc(L.navContact)}</a>
      <a class="btn btn-primary nav-cta" href="${base}/contact/">${esc(L.ctaGetPrices)}</a>
    </nav>
  </div>
</header>`;
}

function footerMoneyDesk(lang, L) {
  const copy = projectCopyForLang(lang);
  let li = "";
  for (const key of PROJECT_ORDER) {
    const m = PROJECTS[key];
    const pc = copy[key];
    const ph = lang === "en" ? englishPricesPath(m) : `/${lang}/${m.pricesFolder}/`;
    const pm = lang === "en" ? englishPaymentPath(m) : `/${lang}/${m.paymentFolder}/`;
    li += `<li><a href="${esc(ph)}">${esc(pc.name)} — ${esc(L.sectionPrices)}</a></li>`;
    li += `<li><a href="${esc(pm)}">${esc(pc.name)} — ${esc(L.sectionPayment)}</a></li>`;
  }
  return `<div class="footer-money">
      <p class="footer-col-title">${esc(L.footerMoneyDesk)}</p>
      <ul>${li}</ul>
    </div>`;
}

export function footer(lang, L) {
  const base = `/${lang}`;
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <p class="footer-brand">${esc(L.brandFull)}</p>
      <p style="margin:0;opacity:.85;max-width:36ch">${esc(L.footerBlurb)}</p>
      <p class="footer-disclaimer">${esc(L.adsDisclaimerFooter)}</p>
    </div>
    <div>
      <p class="footer-col-title">${esc(L.footerExplore)}</p>
      <ul>
        <li><a href="${base}/projects/">${esc(L.navProjects)}</a></li>
        <li><a href="${base}/blog/">${esc(L.navBlog)}</a></li>
        <li><a href="${base}/zed-west/">ZED West</a></li>
        <li><a href="${base}/zed-east/">ZED East</a></li>
        <li><a href="${base}/solana-west/">Solana West</a></li>
        <li><a href="${base}/solana-east/">Solana East</a></li>
        <li><a href="${base}/silversands/">Silversands</a></li>
      </ul>
    </div>
    ${footerMoneyDesk(lang, L)}
    <div>
      <p class="footer-col-title">${esc(L.footerLegal)}</p>
      <ul>
        <li><a href="${base}/privacy-policy/">${esc(L.navPrivacy)}</a></li>
        <li><a href="${base}/contact/">${esc(L.navContact)}</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom"><p class="mt-0">&copy; <span id="y"></span> ${esc(L.brandFull)}</p></div>
</footer>`;
}

export function stickyWa(lang, L, waHref) {
  return `<div class="sticky-cta sticky-cta--conversion" role="region" aria-label="${esc(L.stickyRegion)}">
  <a class="btn btn-primary btn--sticky-main" href="/${lang}/contact/">${esc(L.ctaGetPrices)}</a>
  <a class="btn btn--whatsapp-sticky" href="${esc(waHref)}" target="_blank" rel="noopener noreferrer">${esc(L.ctaBookWhatsApp)}</a>
</div>
<a class="wa-float" href="${esc(waHref)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(L.ctaBookWhatsApp)}">${waSvg()}</a>`;
}

function waSvg() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
}

export function renderPage({
  siteUrl,
  lang,
  dir,
  title,
  description,
  canonicalPath,
  pathWithoutLang,
  preloadImage,
  ogImage,
  waHref,
  L,
  breadcrumbItems,
  main,
  schemas,
}) {
  const canonical = siteUrl.replace(/\/$/, "") + canonicalPath;
  const pageTitle = seoClipTitle(title, 60);
  const pageDesc = seoClipDesc(description, 160);
  const og =
    siteUrl.replace(/\/$/, "") +
    (ogImage || asset("/images/silversands-north-coast-beachfront-crystal-lagoon-sidi-heneish.webp"));
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: L.brandFull,
    url: siteUrl.replace(/\/$/, ""),
    logo: siteUrl.replace(/\/$/, "") + "/favicon.svg",
  };
  const web = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: L.brandFull,
    url: siteUrl.replace(/\/$/, ""),
    publisher: org,
    inLanguage: lang,
  };
  const schemaScripts = [org, web, ...(schemas || [])]
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n");

  const crumbs =
    breadcrumbItems && breadcrumbItems.length
      ? `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${breadcrumbItems
          .map(
            (c, i) =>
              `<li>${i === breadcrumbItems.length - 1 ? esc(c.name) : `<a href="${esc(c.href)}">${esc(c.name)}</a>`}</li>`
          )
          .join("")}</ol></nav>`
      : "";

  const preload = preloadImage
    ? `<link rel="preload" as="image" href="${esc(preloadImage)}" fetchpriority="high" />`
    : "";

  const altEn = localeAbsoluteUrl(siteUrl, "en", pathWithoutLang);
  const altAr = localeAbsoluteUrl(siteUrl, "ar", pathWithoutLang);
  const altDefault = altEn;

  return `<!DOCTYPE html>
<html lang="${esc(lang)}" dir="${esc(dir || "ltr")}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(pageDesc)}" />
<link rel="canonical" href="${esc(canonical)}" />
<link rel="alternate" hreflang="en" href="${esc(altEn)}" />
<link rel="alternate" hreflang="ar" href="${esc(altAr)}" />
<link rel="alternate" hreflang="x-default" href="${esc(altDefault)}" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
${preload}
<meta property="og:type" content="website" />
<meta property="og:title" content="${esc(pageTitle)}" />
<meta property="og:description" content="${esc(pageDesc)}" />
<meta property="og:url" content="${esc(canonical)}" />
<meta property="og:image" content="${esc(og)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(pageTitle)}" />
<meta name="twitter:description" content="${esc(pageDesc)}" />
<meta name="twitter:image" content="${esc(og)}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${asset("/css/app.min.css")}" />
${schemaScripts}
</head>
<body>
<a class="sr-only" href="#main">${esc(L.skipContent)}</a>
${topForm(lang, L)}
${header(lang, L, pathWithoutLang)}
${adsDisclaimerBar(L)}
<main id="main">
${crumbs}
${main}
</main>
${footer(lang, L)}
${stickyWa(lang, L, waHref)}
<script src="${asset("/js/app.min.js")}" defer></script>
</body>
</html>`;
}
