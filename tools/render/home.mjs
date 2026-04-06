import { renderPage, leadBudgetFieldHtml } from "../lib/layout.mjs";
import { esc, asset, clipImageAlt } from "../lib/helpers.mjs";
import { PROJECT_ORDER, PROJECTS, projectCopyForLang, SITE_MEDIA } from "../projects-meta.mjs";
import { englishPricesPath, englishPaymentPath } from "../lib/seo-routes.mjs";
import { faqSchema } from "./faq.mjs";
import { aeoTriadHtml, urgencyStripHtml, trustStripHtml } from "../lib/aeo.mjs";

function homeMoneyHubHtml(lang, L) {
  const copy = projectCopyForLang(lang);
  let items = "";
  for (const key of PROJECT_ORDER) {
    const m = PROJECTS[key];
    const pc = copy[key];
    const ph = lang === "en" ? englishPricesPath(m) : `/${lang}/${m.pricesFolder}/`;
    const pm = lang === "en" ? englishPaymentPath(m) : `/${lang}/${m.paymentFolder}/`;
    items += `<li><strong>${esc(pc.name)}</strong> — <a href="${esc(ph)}">${esc(L.sectionPrices)}</a> · <a href="${esc(pm)}">${esc(L.sectionPayment)}</a> · <a href="/${lang}/${m.folder}/#units">${esc(L.ctaViewUnits)}</a></li>`;
  }
  return `<section class="section section--white" id="money-hub"><div class="container"><h2>${esc(L.sectionMoneyHub)}</h2><ul class="seo-internal-grid">${items}</ul><p class="seo-internal-more cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="#lead-form">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg" href="/${lang}/projects/">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></p></div></section>`;
}

export function renderHome({ siteUrl, lang, dir, L, waHref }) {
  const homeHero = SITE_MEDIA.homeHero;
  const hero = homeHero?.file
    ? asset("/images/" + homeHero.file)
    : asset("/images/silversands-north-coast-beachfront-crystal-lagoon-sidi-heneish.webp");
  const heroAlt =
    homeHero?.alt ||
    clipImageAlt(
      "ZED, Solana, Silversands in Egypt: apartments and villas for sale — independent price and payment guide."
    );
  const canonicalPath = `/${lang}/`;
  const copy = projectCopyForLang(lang);

  const homeTriad = {
    price: L.homeAeoPrice,
    location: L.homeAeoLocation,
    payment: L.homeAeoPayment,
  };

  const faqs = L.homeFaqs || [];
  const whyItems = L.whyItems || [];
  const whyHtml = whyItems
    .map(
      (it) =>
        `<div class="why-item"><div class="why-item__icon">◎</div><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></div>`
    )
    .join("");

  let cards = "";
  for (const key of PROJECT_ORDER) {
    const m = PROJECTS[key];
    const pc = copy[key];
    const thumb = m.hero[0];
    const img = asset("/images/" + thumb.file);
    const priceHref = lang === "en" ? englishPricesPath(m) : `/${lang}/${m.pricesFolder}/`;
    cards += `<article class="project-card"><div class="project-card__media"><img src="${esc(img)}" alt="${esc(thumb.alt)}" width="640" height="480" sizes="(max-width: 680px) 100vw, (max-width: 1120px) 33vw, 360px" loading="lazy" decoding="async" fetchpriority="low" /></div><div class="project-card__body"><h3>${esc(pc.name)}</h3><p>${esc(pc.direct.slice(0, 120))}…</p><div class="project-card__cta-row"><a class="btn btn-primary btn--lg" href="${esc(priceHref)}">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg" href="/${lang}/${m.folder}/#units">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></div></div></article>`;
  }

  const main = `<section class="hero" aria-labelledby="h1home"><div class="hero__bg" aria-hidden="true"><img src="${esc(hero)}" alt="${esc(heroAlt)}" width="1920" height="1080" sizes="100vw" fetchpriority="high" decoding="async" loading="eager" /><div class="hero__overlay"></div></div><div class="container hero-grid"><div><h1 id="h1home">${esc(L.homeH1)}</h1><p class="hero-lead">${esc(L.homeLead)}</p>${trustStripHtml(L)}<div class="cta-row hero-cta-row"><a class="btn btn-primary btn--lg btn--hero-primary" href="#lead-form">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg hero-cta-row__ghost" href="/${lang}/projects/">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg hero-cta-row__ghost" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></div></div><aside class="lead-card" id="lead-form"><h2>${esc(L.leadCardTitle)}</h2><p class="lead-card__sub">${esc(L.topFormTitle)}</p><p class="form-fast">${esc(L.formFastResponse)}</p><form class="js-lead-form" novalidate><div class="form-group"><label for="hn-${lang}">${esc(L.labelName)}</label><input id="hn-${lang}" name="name" type="text" required autocomplete="name" /></div><div class="form-group"><label for="hp-${lang}">${esc(L.labelPhone)}</label><input id="hp-${lang}" name="phone" type="tel" required autocomplete="tel" /></div>${leadBudgetFieldHtml(lang, L, "home", "stacked")}<button class="btn btn-primary btn-block btn--lg" type="submit">${esc(L.ctaSubmit)}</button></form><p class="form-note form-note--privacy">${esc(L.formPrivacyShort)} <a href="/${lang}/privacy-policy/">${esc(L.navPrivacy)}</a>.</p></aside></div></section>
<section class="section section--white" id="home-answer"><div class="container"><h2>${esc(L.sectionDirect)}</h2>${aeoTriadHtml(L, homeTriad)}<div class="aeo-answer aeo-answer--narrative"><p>${esc(L.homeLead)}</p></div>${urgencyStripHtml(L)}</div></section>
<section class="section"><div class="container"><div class="section-head"><h2>${esc(L.navProjects)}</h2><p>${esc(L.projectsLead)}</p></div><div class="card-grid card-grid--3">${cards}</div></div></section>
${homeMoneyHubHtml(lang, L)}
<section class="section section--white"><div class="container"><div class="section-head"><h2>${esc(L.sectionWhy)}</h2></div><div class="why-grid">${whyHtml}</div></div></section>
<section class="section" id="faq"><div class="container"><h2>${esc(L.sectionFaq)}</h2><div class="faq-list">${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div></div></section>
<section class="cta-band"><div class="container"><h2>${esc(L.sectionFinalCta)}</h2><p>${esc(L.finalCtaText)}</p><div class="cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="#lead-form">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg cta-band__outline" href="/${lang}/projects/">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg cta-band__outline" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></div><p class="cta-band__note"><a href="/${lang}/faq/">${esc(L.navFaq)}</a></p></div></section>`;

  const description = `${L.metaHomeDesc} ${L.metaCtaSuffix}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: L.metaHomeTitle,
      description,
      url: siteUrl.replace(/\/$/, "") + canonicalPath,
      inLanguage: lang,
    },
    faqSchema(faqs),
  ];

  return renderPage({
    siteUrl,
    lang,
    dir,
    title: `${L.metaHomeTitle} | ${L.brandShort}`,
    description,
    canonicalPath,
    pathWithoutLang: "/",
    preloadImage: hero,
    ogImage: hero,
    waHref,
    L,
    breadcrumbItems: [],
    main,
    schemas,
  });
}
