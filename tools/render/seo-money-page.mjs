import { renderPage, leadBudgetFieldHtml } from "../lib/layout.mjs";
import { esc, asset } from "../lib/helpers.mjs";
import { PROJECTS, projectCopyForLang, PROJECT_ORDER } from "../projects-meta.mjs";
import { faqSchema } from "./faq.mjs";
import { ROOT_SEO_FOLDERS, englishPaymentPath, englishPricesPath } from "../lib/seo-routes.mjs";
import { aeoTriadHtml, urgencyStripHtml, trustStripHtml } from "../lib/aeo.mjs";

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function moneyHubLinks() {
  const en = projectCopyForLang("en");
  const out = [];
  for (const key of PROJECT_ORDER) {
    const m = PROJECTS[key];
    const labelBase = en[key].name.split("—")[0].trim();
    out.push({ href: englishPricesPath(m), label: `${labelBase} — prices` });
    out.push({ href: englishPaymentPath(m), label: `${labelBase} — payment plan` });
  }
  return out;
}

const HUB_LINKS = moneyHubLinks();

/** Keyword H1; meta title ≤60 & description ≤160 (layout clips as safety net) */
const SEO_META = {
  "zed-west|prices": {
    h1: "ZED West Prices 2026 | Sheikh Zayed Down Payments from 487K EGP | ORA",
    title: "ZED West price Sheikh Zayed Egypt | ORA",
    description:
      "ZED West Sheikh Zayed prices: ~487K+ 1BR down bands, payment plans on request. Independent guide — confirm documentation with ORA before booking.",
  },
  "zed-west|payment": {
    h1: "ZED West Payment Plan | 5%+5% & Up to 10 Years | ORA Sheikh Zayed",
    title: "ZED West payment plan Sheikh Zayed | ORA",
    description:
      "ZED West payment plan Egypt: 5%+5% then installments (typical published shape). Obtain your binding ORA matrix from the developer or authorized sales.",
  },
  "zed-east|prices": {
    h1: "ZED East Prices | New Cairo ORA Towers & Townhomes from ~590K Down",
    title: "ZED East price New Cairo Egypt | ORA",
    description:
      "ZED East New Cairo prices by typology — towers & townhomes. Indicative context; binding parameters appear on ORA countersigned offers.",
  },
  "zed-east|payment": {
    h1: "ZED East Payment Plan | 5%+5% After 90 Days | ORA New Cairo",
    title: "ZED East payment plan New Cairo | ORA",
    description:
      "ZED East payment plan: two 5% ORA tranches, installments to 10 years (typical). Confirm the schedule for your unit with ORA.",
  },
  "solana-west|prices": {
    h1: "Solana West Prices | Villas & Apartments New Zayed | ORA Developers",
    title: "Solana West villas for sale Egypt | ORA",
    description:
      "Solana West villas for sale, New Zayed — indicative 1BR to villa prices. Binding ORA sheets and payment architecture come from the developer.",
  },
  "solana-west|payment": {
    h1: "Solana West Payment Plan | ORA Construction-Linked Schedule | New Zayed",
    title: "Solana West payment plan Egypt | ORA",
    description:
      "Solana West payment plan: construction-linked ORA tranches by band. Request the current installment matrix from ORA for your release.",
  },
  "solana-east|prices": {
    h1: "Solana East Prices | New Cairo ORA | From ~560K EGP Down Payment",
    title: "Solana East New Cairo prices | ORA Egypt",
    description:
      "Solana East New Cairo prices — 1BR through townhomes, ORA billing. Independent summary; official quotations come from ORA only.",
  },
  "solana-east|payment": {
    h1: "Solana East Payment Plan | ORA New Cairo Installment Schedule",
    title: "Solana East payment plan New Cairo | ORA",
    description:
      "Solana East payment plan: phased ORA draws & long-tail options. Documentation-led schedules for your release — use the inquiry form for confidential follow-up.",
  },
  "silversands|prices": {
    h1: "Silversands North Coast Prices | ORA Chalets & Villas 27M–128M EGP",
    title: "Silversands North Coast Egypt prices | ORA",
    description:
      "Silversands North Coast Egypt prices — chalets & villas, 5% booking. Indicative overview; confirm calendars and frontage premiums with ORA.",
  },
  "silversands|payment": {
    h1: "Silversands North Coast Payment Plan | 5% Booking & Quarterly ORA Installments",
    title: "Silversands payment plan North Coast | ORA",
    description:
      "Silversands payment plan: 5% booking, quarterly ORA installments to handover. Pair with developer-confirmed North Coast pricing before you commit.",
  },
};

export function unitsTableHtml(units, L) {
  if (!units.length) return "";
  const head = `<thead><tr><th>${esc(L.unitsPrice.split(" ")[0])} type</th><th>Size</th><th>${esc(L.unitsPrice)}</th><th>${esc(L.unitsDp)}</th><th>${esc(L.unitsInst)}</th><th>${esc(L.unitsDelivery)}</th></tr></thead>`;
  const rows = units
    .map(
      (u) =>
        `<tr><td>${esc(u.type)}</td><td>${esc(u.area)}</td><td>${esc(u.price)}</td><td>${esc(u.dp)}</td><td>${esc(u.inst)}</td><td>${esc(u.delivery)}</td></tr>`
    )
    .join("");
  return `<div class="table-wrap"><table class="seo-data-table"><caption class="sr-only">Indicative unit pricing</caption>${head}<tbody>${rows}</tbody></table></div>`;
}

export function paymentStepsHtml(planLine) {
  return `<ol class="seo-steps">
  <li><strong>Booking / contract:</strong> initial contractual tranche per ORA release.</li>
  <li><strong>Second milestone:</strong> second published percentage (e.g. after 90 days or 3 months — confirm on your SPA).</li>
  <li><strong>Installment tail:</strong> remaining balance spread per official calendar — ${esc(planLine)}</li>
</ol>`;
}

function buildSeoFaqs(lang, pc, meta, mode, pricesPath, paymentPath, L, siteUrl) {
  const plan = lang === "ar" ? meta.planAr || meta.planEn : meta.planEn;
  const loc = stripHtml(pc.locP);
  const why = stripHtml(pc.whyP);
  const payPageUrl = siteUrl.replace(/\/$/, "") + paymentPath;
  const priceAns =
    mode === "prices"
      ? `${stripHtml(pc.pricesP)} For net payable on a specific typology, consult ORA sales or request general orientation via this site — binding numbers are on developer paperwork only.`
      : `${pc.direct.slice(0, 320)} See also our dedicated ${pc.name} price page for typology tables.`;
  const payAns =
    mode === "payment"
      ? `${stripHtml(pc.paymentP)} Timeline summary: ${plan}`
      : `ORA publishes a structured schedule (e.g. 5% + 5% milestones plus long-tail installments for qualifying buyers). Full breakdown on our payment plan page: ${payPageUrl}`;

  if (lang === "ar") {
    return [
      { q: `ما نطاق سعر ${pc.name}؟`, a: stripHtml(pc.pricesP) + " اطلب استشارة خاصة لعرض موقّع من أورا." },
      { q: `كيف تعمل خطة السداد؟`, a: stripHtml(pc.paymentP) + " " + plan },
      { q: `أين يقع المشروع؟`, a: loc },
      { q: `هل يصلح للاستثمار؟`, a: why },
      { q: `هل الأرقام رسمية من أورا؟`, a: "التسويق استرشادي؛ العرض والعقد الموقّع من أورا هما المرجعان." },
    ];
  }
  const shortName = pc.name.split("—")[0].trim();
  return [
    {
      q: `What is the ${pc.name} price today?`,
      a: priceAns,
    },
    {
      q: `How does the ${pc.name} payment plan work?`,
      a: payAns,
    },
    {
      q: `Where is ${pc.name} located — and who buys there?`,
      a: `${loc} Investors mix end-users, rental plays, and capital preservation buyers depending on typology.`,
    },
    {
      q: `Is ${pc.name} a strong investment vs other ORA launches?`,
      a: `${why} Always align any underwriting with your own yield model and the countersigned ORA contract.`,
    },
    {
      q: `Do published ${shortName} prices include upgrades or premiums?`,
      a: "Marketing figures cover published base bands; upgrades, parking, or premium facings adjust totals. Request an itemized ORA quotation.",
    },
  ];
}

function internalHubHtml(currentFolder, L) {
  const items = HUB_LINKS.filter((l) => {
    const seg = l.href.replace(/^\/|\/$/g, "");
    return seg !== currentFolder.replace(/^\/|\/$/g, "");
  })
    .map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)
    .join("");
  return `<section class="section section--white" aria-labelledby="seo-hub-h"><div class="container"><h2 id="seo-hub-h" class="section-head" style="text-align:start;max-width:none;margin-bottom:1rem">${esc(L.sectionMoneyHub)}</h2><ul class="seo-internal-grid">${items}</ul><p class="seo-internal-more cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="/en/contact/">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg" href="/en/projects/">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg" href="/en/contact/">${esc(L.ctaRequestPlan)}</a></p><p class="cta-band__note" style="text-align:center;margin-top:0.75rem"><a href="/en/faq/">${esc(L.navFaq)}</a></p></div></section>`;
}

export function renderRootSeoPage({ siteUrl, L, projectKey, mode, units, waHref }) {
  const lang = "en";
  const dir = "ltr";
  const meta = PROJECTS[projectKey];
  const pc = projectCopyForLang(lang)[projectKey];
  const folder = mode === "prices" ? meta.pricesFolder : meta.paymentFolder;
  if (!ROOT_SEO_FOLDERS.has(folder)) {
    throw new Error(`renderRootSeoPage: folder not in ROOT_SEO set: ${folder}`);
  }

  const canonicalPath = `/${folder}/`;
  const pathWithoutLang = `/${folder}/`;
  const pricesPath = `/${meta.pricesFolder}/`;
  const paymentPath = englishPaymentPath(meta);
  const hubPath = `/en/${meta.folder}/`;

  const metaKey = `${projectKey}|${mode}`;
  const seo = SEO_META[metaKey];
  const h1 = seo.h1;
  const title = seo.title;
  const description = seo.description;
  const triad = meta.aeoEn;

  const heroItems = meta.hero || [];
  const primary = heroItems[0];
  const firstImg = asset("/images/" + primary.file);
  const planLine = meta.planEn;

  const table = unitsTableHtml(units, L);
  const typologyBlock = units.length ? `<h3>Typology snapshot (indicative)</h3>${table}` : "";

  const pricingCta =
    mode === "payment"
      ? `<a class="btn btn-primary" href="${esc(pricesPath)}">${esc(L.ctaGetPrices)} — ${esc(pc.name)}</a>`
      : `<a class="btn btn-primary" href="${esc(paymentPath)}">${esc(L.unitsLinkPayment)}</a>`;

  const paymentCta =
    mode === "prices"
      ? `<a class="btn btn-outline" href="${esc(paymentPath)}">${esc(L.unitsLinkPayment)}</a> `
      : `<a class="btn btn-outline" href="${esc(pricesPath)}">${esc(L.ctaGetPrices)}</a> `;

  const pricingBlock = `<section class="section section--white" id="pricing"><div class="container prose"><h2>${esc(L.sectionPrices)}</h2>${urgencyStripHtml(L)}${pc.pricesP}${typologyBlock}<p class="seo-cta-inline">${pricingCta}</p></div></section>`;

  const paymentBlock = `<section class="section" id="payment-breakdown"><div class="container prose"><h2>${esc(L.sectionPayment)}</h2>${pc.paymentP}<h3>Timeline & milestones</h3>${paymentStepsHtml(planLine)}<p class="seo-cta-inline">${paymentCta}<a class="btn btn-primary" href="${esc(waHref)}" target="_blank" rel="noopener noreferrer">${esc(L.ctaBookWhatsApp)}</a></p></div></section>`;

  const faqs = buildSeoFaqs(lang, pc, meta, mode, pricesPath, paymentPath, L, siteUrl);

  const internalSeoNav = `<p class="seo-inline-nav">${[
    `<a href="${esc(pricesPath)}">${esc(L.sectionPrices)}</a>`,
    `<a href="${esc(paymentPath)}">${esc(L.sectionPayment)}</a>`,
    `<a href="${esc(hubPath)}">${esc(pc.name)}</a>`,
    `<a href="/en/projects/">${esc(L.navProjects)}</a>`,
  ].join(" · ")}</p>`;

  const ctaBandSecondaryHref = mode === "payment" ? pricesPath : paymentPath;
  const ctaBandSecondaryLabel = mode === "payment" ? L.ctaGetPrices : L.unitsLinkPayment;

  const main = `<section class="hero" aria-labelledby="seo-h1"><div class="hero__bg" aria-hidden="true"><img src="${esc(firstImg)}" alt="${esc(primary.alt)}" width="1920" height="1080" sizes="100vw" fetchpriority="high" decoding="async" loading="eager" /><div class="hero__overlay"></div></div><div class="container hero-grid"><div><h1 id="seo-h1">${esc(h1)}</h1><p class="hero-lead">${esc(pc.sub)}</p>${trustStripHtml(L)}<div class="cta-row hero-cta-row"><a class="btn btn-primary btn--lg btn--hero-primary" href="#lead-form">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg hero-cta-row__ghost" href="${esc(hubPath)}#units">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg hero-cta-row__ghost" href="/en/contact/">${esc(L.ctaRequestPlan)}</a></div></div><aside class="lead-card" id="lead-form"><h2>${esc(L.leadCardTitle)}</h2><p class="lead-card__sub">${esc(L.topFormTitle)}</p><p class="form-fast">${esc(L.formFastResponse)}</p><form class="js-lead-form" action="#" novalidate><div class="form-group"><label for="seo-pn">${esc(L.labelName)}</label><input id="seo-pn" name="name" type="text" autocomplete="name" required /></div><div class="form-group"><label for="seo-pp">${esc(L.labelPhone)}</label><input id="seo-pp" name="phone" type="tel" autocomplete="tel" required /></div>${leadBudgetFieldHtml(lang, L, "seo", "stacked")}<button class="btn btn-primary btn-block btn--lg" type="submit">${esc(L.ctaSubmit)}</button></form><p class="form-note form-note--privacy">${esc(L.formPrivacyShort)} <a href="/en/privacy-policy/">${esc(L.navPrivacy)}</a>.</p></aside></div></section>
<section class="section section--white" id="answer"><div class="container"><h2>${esc(L.sectionDirect)}</h2>${aeoTriadHtml(L, triad)}<div class="aeo-answer aeo-answer--narrative"><p>${esc(pc.direct)}</p>${internalSeoNav}</div></div></section>
${pricingBlock}
${paymentBlock}
<section class="section section--white"><div class="container prose"><h2>${esc(L.sectionLocation)}</h2>${pc.locP}</div></section>
<section class="section"><div class="container prose"><h2>${esc(L.sectionWhy)} — investment view</h2>${pc.whyP}</div></section>
<section class="section section--white" id="faq"><div class="container"><h2>${esc(L.sectionFaq)}</h2><div class="faq-list">${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div></div></section>
${internalHubHtml(folder, L)}
<section class="cta-band"><div class="container"><h2>${esc(L.sectionFinalCta)}</h2><p>${esc(L.finalCtaText)}</p><div class="cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="#lead-form">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg cta-band__outline" href="${esc(hubPath)}#units">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg cta-band__outline" href="/en/contact/">${esc(L.ctaRequestPlan)}</a></div><p class="cta-band__note"><a class="cta-band__outline" href="${esc(ctaBandSecondaryHref)}">${esc(ctaBandSecondaryLabel)}</a> · <a class="cta-band__outline" href="${esc(waHref)}" target="_blank" rel="noopener noreferrer">${esc(L.ctaBookWhatsApp)}</a></p></div></section>`;

  const breadcrumbItems = [
    { name: L.breadcrumbHome, href: `/en/` },
    { name: L.navProjects, href: `/en/projects/` },
    { name: pc.name, href: hubPath },
    { name: mode === "prices" ? L.sectionPrices : L.sectionPayment, href: canonicalPath },
  ];

  const offerDesc = L[meta.offerDescKey] || "";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: siteUrl.replace(/\/$/, "") + canonicalPath,
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
        item: siteUrl.replace(/\/$/, "") + b.href,
      })),
    },
    faqSchema(faqs.map((f) => ({ q: f.q, a: stripHtml(f.a) }))),
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
        url: siteUrl.replace(/\/$/, "") + canonicalPath,
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
    main,
    schemas,
  });
}
