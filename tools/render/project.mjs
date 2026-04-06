import { renderPage, leadBudgetFieldHtml } from "../lib/layout.mjs";
import { esc, asset, seoClipTitle, seoClipDesc, clipImageAlt } from "../lib/helpers.mjs";
import { PROJECTS, projectCopyForLang, PROJECT_ORDER } from "../projects-meta.mjs";
import { englishPricesPath, englishPaymentPath } from "../lib/seo-routes.mjs";
import { faqSchema, projectFaqs } from "./faq.mjs";
import { aeoTriadHtml, urgencyStripHtml, trustStripHtml } from "../lib/aeo.mjs";

function projectPricesHref(lang, meta) {
  return lang === "en" ? englishPricesPath(meta) : `/${lang}/${meta.pricesFolder}/`;
}
function projectPaymentHref(lang, meta) {
  return lang === "en" ? englishPaymentPath(meta) : `/${lang}/${meta.paymentFolder}/`;
}

function folderForVariant(meta, variant) {
  if (variant === "prices") return meta.pricesFolder;
  if (variant === "payment") return meta.paymentFolder;
  return meta.folder;
}

const SZ_GALLERY = "(max-width: 640px) 50vw, (max-width: 1120px) 33vw, 373px";
const SZ_UNIT = "(max-width: 680px) 100vw, (max-width: 1120px) 33vw, 373px";
const SZ_HERO_THUMB = "(max-width: 700px) 50vw, 440px";

function galleryFigures(items) {
  return items
    .map((item) => {
      const src = asset("/images/" + item.file);
      return `<figure><img src="${esc(src)}" alt="${esc(item.alt)}" width="600" height="375" sizes="${SZ_GALLERY}" loading="lazy" decoding="async" fetchpriority="low" /></figure>`;
    })
    .join("");
}

function siblingHubLinksHtml(lang, currentKey) {
  const copy = projectCopyForLang(lang);
  const parts = [];
  for (const key of PROJECT_ORDER) {
    if (key === currentKey) continue;
    const m = PROJECTS[key];
    const label = copy[key].name.split("—")[0].trim();
    parts.push(`<a href="/${lang}/${m.folder}/">${esc(label)}</a>`);
  }
  return parts.join(" · ");
}

function projectCrossLinksHtml(lang, L, currentKey, waHref, crossHeading) {
  const copy = projectCopyForLang(lang);
  const lis = [];
  for (const key of PROJECT_ORDER) {
    if (key === currentKey) continue;
    const m = PROJECTS[key];
    const pcx = copy[key];
    const mainHref = `/${lang}/${m.folder}/`;
    const pr = projectPricesHref(lang, m);
    const pm = projectPaymentHref(lang, m);
    lis.push(
      `<li><a href="${esc(mainHref)}">${esc(pcx.name)}</a> — <a href="${esc(pr)}">${esc(L.sectionPrices)}</a> · <a href="${esc(pm)}">${esc(L.sectionPayment)}</a></li>`
    );
  }
  const h2x = crossHeading || L.sectionCrossLinks;
  return `<section class="section section--white" id="explore-communities"><div class="container"><h2>${esc(h2x)}</h2><ul class="seo-internal-grid">${lis.join("")}</ul><p class="seo-internal-more cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="#lead-form">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg" href="/${lang}/projects/">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></p></div></section>`;
}

function unitCards(lang, L, units, projectName, waPrefix) {
  const base = "https://wa.me/201208986606?text=";
  return units
    .map((u) => {
      const msg = encodeURIComponent(
        `${waPrefix}${projectName} — ${u.type} (${u.area}) — ${u.price} EGP — DP: ${u.dp}`
      );
      const src = asset("/images/" + u.img);
      const alt =
        u.alt ||
        clipImageAlt(
          `${projectName}, Egypt: ${u.type} (${u.area}) for sale — see indicative price and payment band.`
        );
      return `<article class="unit-card">
  <div class="unit-card__media"><img src="${esc(src)}" alt="${esc(alt)}" width="640" height="400" sizes="${SZ_UNIT}" loading="lazy" decoding="async" fetchpriority="low" /></div>
  <div class="unit-card__body">
    <h3>${esc(u.type)}</h3>
    <p class="unit-meta">${esc(u.area)}</p>
    <p class="unit-price"><strong>${esc(L.unitsPrice)} (EGP):</strong> ${esc(u.price)}</p>
    <p class="unit-meta"><strong>${esc(L.unitsDp)}:</strong> ${esc(u.dp)}</p>
    <p class="unit-meta"><strong>${esc(L.unitsInst)}:</strong> ${esc(u.inst)}</p>
    <p class="unit-meta"><strong>${esc(L.unitsDelivery)}:</strong> ${esc(u.delivery)}</p>
    <a class="btn btn-primary btn-block btn--unit-cta" href="${esc(base + msg)}" target="_blank" rel="noopener noreferrer">${esc(L.unitsCta)}</a>
  </div>
</article>`;
    })
    .join("");
}

export function renderProjectPage({
  siteUrl,
  lang,
  dir,
  L,
  projectKey,
  variant,
  units,
  waHref,
}) {
  const meta = PROJECTS[projectKey];
  const pc = projectCopyForLang(lang)[projectKey];
  const sn = pc.name.split("—")[0].trim();
  const Hz = pc.h2 || {};
  const h2Direct =
    Hz.direct ??
    (lang === "ar"
      ? `إجابة مباشرة — تسعير ودفع ${sn} (مصر)`
      : `${sn} price, payment & ORA context — direct answer (Egypt)`);
  const h2Units = Hz.units ?? L.unitsTitle;
  const h2PricesMain = Hz.pricesMain ?? (lang === "ar" ? `نظرة أسعار ${sn}` : `${sn} price overview — indicative EGP bands`);
  const h2PaymentMain = Hz.paymentMain ?? (lang === "ar" ? `خطة سداد ${sn}` : `${sn} payment plan — ORA milestones`);
  const h2PricesPage = Hz.pricesPage ?? (lang === "ar" ? `تفاصيل أسعار ${sn}` : `${sn} price detail — ORA Egypt`);
  const h2PriceSnapshot =
    Hz.priceSnapshot ??
    (lang === "ar" ? `لمحة أسعار ${sn} ضمن محفظة أورا` : `${sn} price snapshot — ORA Developers Egypt projects`);
  const h2PayMilestones = Hz.paymentMilestones ?? (lang === "ar" ? `مراحل سداد ${sn}` : `${sn} payment plan — contractual milestones`);
  const h2PayTimeline = Hz.paymentTimeline ?? (lang === "ar" ? `جدول سداد ${sn}` : `${sn} payment timeline — ORA schedule`);
  const h2Loc = Hz.location ?? (lang === "ar" ? `موقع ${sn} — مصر` : `${L.sectionLocation} — ${sn}, Egypt`);
  const h2Amen = Hz.amenities ?? (lang === "ar" ? `مرافق ${sn}` : `${L.sectionAmenities} — ${sn} lifestyle`);
  const h2Gal = Hz.gallery ?? (lang === "ar" ? `معرض ${sn}` : `${L.sectionGallery} — ${sn} residences for sale`);
  const h2Why = Hz.why ?? (lang === "ar" ? `منطق استثمار ${sn}` : `${L.sectionWhy} — ${sn} vs peer ORA launches`);
  const h2Cross =
    Hz.cross ??
    (lang === "ar" ? `مشاريع أورا الأخرى في مصر — روابط داخلية` : `Other ORA Developers Egypt projects — compare prices & plans`);
  const h2Faq = Hz.faq ?? (lang === "ar" ? `أسئلة شائعة — ${sn}` : `${L.sectionFaq} — ${sn} price & availability`);
  const h2Final = Hz.final ?? L.sectionFinalCta;
  const folder = folderForVariant(meta, variant);
  const canonicalPath = `/${lang}/${folder}/`;
  const pathWithoutLang = "/" + folder + "/";

  const h1key = variant === "prices" ? "prices" : variant === "payment" ? "payment" : "main";
  const h1 = pc.h1[h1key];
  const locLabel = lang === "ar" ? meta.seoLocationAr : meta.seoLocationEn;
  const vkey = h1key;
  const title = seoClipTitle(
    pc.metaTitle?.[vkey] ?? `${h1} | ${locLabel} | ${L.brandShort}`,
    60
  );
  const description = seoClipDesc(
    pc.metaDesc?.[vkey] ?? `${pc.direct.slice(0, 118)} ${L.metaCtaSuffix}`,
    160
  );
  const pricesHref = projectPricesHref(lang, meta);
  const paymentHref = projectPaymentHref(lang, meta);
  const hubHref = `/${lang}/${meta.folder}/`;
  const internalSeoNav = `<p class="seo-inline-nav">${[
    `<a href="${esc(pricesHref)}">${esc(L.sectionPrices)}</a>`,
    `<a href="${esc(paymentHref)}">${esc(L.sectionPayment)}</a>`,
    `<a href="${esc(hubHref)}">${esc(pc.name)}</a>`,
    `<a href="/${lang}/projects/">${esc(L.navProjects)}</a>`,
  ].join(" · ")} · ${esc(L.navAlsoExplore)}: ${siblingHubLinksHtml(lang, projectKey)}</p>`;

  const triad = lang === "ar" ? meta.aeoAr : meta.aeoEn;
  const faqs = projectFaqs(lang, pc, meta, h1key);
  const heroItems = meta.hero || [];
  const primary = heroItems[0];
  const firstImg = asset("/images/" + primary.file);
  const heroThumbs = heroItems.slice(1);
  const heroThumbsHtml =
    heroThumbs.length > 0
      ? `<div class="container hero-thumbs" role="group" aria-label="Views"><div class="hero-thumbs__grid">${heroThumbs
          .map(
            (t) =>
              `<div class="hero-thumbs__item"><img src="${esc(asset("/images/" + t.file))}" alt="${esc(t.alt)}" width="720" height="450" sizes="${SZ_HERO_THUMB}" loading="lazy" decoding="async" fetchpriority="low" /></div>`
          )
          .join("")}</div></div>`
      : "";

  let sections = "";

  sections += `<section class="hero" aria-labelledby="ph1"><div class="hero__bg" aria-hidden="true"><img src="${esc(firstImg)}" alt="${esc(primary.alt)}" width="1920" height="1080" sizes="100vw" fetchpriority="high" decoding="async" loading="eager" /><div class="hero__overlay"></div></div><div class="container hero-grid"><div><h1 id="ph1">${esc(h1)}</h1><p class="hero-lead">${esc(pc.sub)}</p>${trustStripHtml(L)}<div class="cta-row hero-cta-row"><a class="btn btn-primary btn--lg btn--hero-primary" href="#lead-form">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg hero-cta-row__ghost" href="#units">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg hero-cta-row__ghost" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></div></div><aside class="lead-card" id="lead-form"><h2>${esc(L.leadCardTitle)}</h2><p class="lead-card__sub">${esc(L.topFormTitle)}</p><p class="form-fast">${esc(L.formFastResponse)}</p><form class="js-lead-form" action="#" novalidate><div class="form-group"><label for="pn-${lang}">${esc(L.labelName)}</label><input id="pn-${lang}" name="name" type="text" autocomplete="name" required /></div><div class="form-group"><label for="pp-${lang}">${esc(L.labelPhone)}</label><input id="pp-${lang}" name="phone" type="tel" autocomplete="tel" required /></div>${leadBudgetFieldHtml(lang, L, "proj", "stacked")}<button class="btn btn-primary btn-block btn--lg" type="submit">${esc(L.ctaSubmit)}</button></form><p class="form-note form-note--privacy">${esc(L.formPrivacyShort)} <a href="/${lang}/privacy-policy/">${esc(L.navPrivacy)}</a>.</p></aside></div>${heroThumbsHtml}</section>`;

  sections += `<section class="section section--white" id="answer"><div class="container"><h2>${esc(h2Direct)}</h2>${aeoTriadHtml(L, triad)}<div class="aeo-answer aeo-answer--narrative"><p>${esc(pc.direct)}</p>${internalSeoNav}</div></div></section>`;

  const unitsGrid =
    units.length > 0
      ? `<div class="unit-grid unit-grid--3">${unitCards(lang, L, units, pc.name, L.waInterest)}</div>`
      : `<p class="units-empty">${esc(L.unitsEmpty)}</p>`;
  const unitsActions = `<div class="units-actions cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="${esc(projectPricesHref(lang, meta))}">${esc(L.unitsLinkPrices)}</a><a class="btn btn-outline btn--lg" href="${esc(projectPaymentHref(lang, meta))}">${esc(L.unitsLinkPayment)}</a><a class="btn btn-outline btn--lg" href="/${lang}/contact/">${esc(L.unitsLinkQuote)}</a></div>`;
  sections += `<section class="section section--units" id="units" aria-labelledby="units-heading"><div class="container"><div class="section-head"><h2 id="units-heading">${esc(h2Units)}</h2><p>${esc(L.unitsLead)}</p></div>${urgencyStripHtml(L)}${unitsGrid}${units.length > 0 ? unitsActions : ""}</div></section>`;

  if (variant === "main") {
    sections += `<section class="section section--white" id="pricing-payment-deep"><div class="container prose"><h2 id="h-prices">${esc(h2PricesMain)}</h2>${pc.pricesP}<h2 id="h-payment">${esc(h2PaymentMain)}</h2>${pc.paymentP}</div></section>`;
  } else if (variant === "prices") {
    sections += `<section class="section section--white" id="pricing-detail"><div class="container prose"><h2 id="h-prices-page">${esc(h2PricesPage)}</h2>${pc.pricesP}<h2 id="h-price-snapshot">${esc(h2PriceSnapshot)}</h2><p>${esc(pc.direct)}</p></div></section>`;
  } else {
    const planLine = lang === "ar" ? meta.planAr || meta.planEn : meta.planEn;
    sections += `<section class="section section--white" id="payment-detail"><div class="container prose"><h2 id="h-payment-milestones">${esc(h2PayMilestones)}</h2>${pc.paymentP}<h2 id="h-payment-timeline">${esc(h2PayTimeline)}</h2><p>${esc(planLine)}</p></div></section>`;
  }

  sections += `<section class="section" id="location"><div class="container prose"><h2>${esc(h2Loc)}</h2>${pc.locP}</div></section>`;

  sections += `<section class="section section--white" id="amenities"><div class="container"><h2>${esc(h2Amen)}</h2><div class="gallery">${galleryFigures(meta.amenities || [])}</div></div></section>`;

  sections += `<section class="section" id="gallery"><div class="container"><h2>${esc(h2Gal)}</h2><div class="gallery">${galleryFigures(meta.gallery || [])}</div></div></section>`;

  sections += `<section class="section section--white" id="why-invest"><div class="container prose"><h2>${esc(h2Why)}</h2>${pc.whyP}</div></section>`;

  sections += projectCrossLinksHtml(lang, L, projectKey, waHref, h2Cross);

  sections += `<section class="section" id="faq"><div class="container"><h2>${esc(h2Faq)}</h2><div class="faq-list">${faqs
    .map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join("")}</div></div></section>`;

  sections += `<section class="cta-band"><div class="container"><h2>${esc(h2Final)}</h2><p>${esc(L.finalCtaText)}</p><div class="cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="#lead-form">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg cta-band__outline" href="#units">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg cta-band__outline" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></div></div></section>`;

  const breadcrumbItems = [
    { name: L.breadcrumbHome, href: `/${lang}/` },
    { name: L.navProjects, href: `/${lang}/projects/` },
    { name: pc.name, href: `/${lang}/${meta.folder}/` },
  ];
  if (variant === "prices") breadcrumbItems.push({ name: L.sectionPrices, href: canonicalPath });
  else if (variant === "payment") breadcrumbItems.push({ name: L.sectionPayment, href: canonicalPath });

  const offerDesc = L[meta.offerDescKey] || "";
  const baseUrl = siteUrl.replace(/\/$/, "");

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: h1,
      description,
      url: baseUrl + canonicalPath,
      inLanguage: lang,
      isPartOf: { "@type": "WebSite", name: L.brandFull, url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: baseUrl + b.href,
      })),
    },
    faqSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: pc.name,
      description: offerDesc,
      brand: { "@type": "Brand", name: L.brandFull },
      offers: {
        "@type": "Offer",
        priceCurrency: meta.offerCurrency,
        price: meta.offerPrice,
        availability: "https://schema.org/InStock",
        url: baseUrl + canonicalPath,
        priceValidUntil: "2027-12-31",
      },
    },
  ];

  return renderPage({
    siteUrl,
    lang,
    dir,
    title,
    description,
    canonicalPath,
    pathWithoutLang,
    preloadImage: firstImg,
    ogImage: firstImg,
    waHref,
    L,
    breadcrumbItems,
    main: sections,
    schemas,
  });
}
