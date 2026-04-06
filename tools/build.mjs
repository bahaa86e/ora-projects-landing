import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { LANGS, getLocale } from "./lang/index.mjs";
import { renderProjectPage } from "./render/project.mjs";
import { renderHome } from "./render/home.mjs";
import { renderPage, leadBudgetFieldHtml } from "./lib/layout.mjs";
import { esc } from "./lib/helpers.mjs";
import { PROJECT_ORDER, PROJECTS, projectCopyForLang } from "./projects-meta.mjs";
import {
  ROOT_SEO_FOLDERS,
  DEPRECATED_ROOT_SEO_FOLDERS,
  englishPricesPath,
  englishPaymentPath,
  ALL_KEYWORD_LANDING_SLUGS,
} from "./lib/seo-routes.mjs";
import { renderKeywordPricePage, projectKeyForKeywordSlug } from "./render/keyword-price-page.mjs";
import { renderRootSeoPage } from "./render/seo-money-page.mjs";
import { SLUGS, getBlogPost } from "./blog-data.mjs";
import { faqSchema } from "./render/faq.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public");
const SITE_URL = (process.env.SITE_URL || "https://www.oradevelopers.eg").replace(/\/$/, "");

const units = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "units.json"), "utf8"));

for (const f of ROOT_SEO_FOLDERS) {
  const staleEn = path.join(OUT, "en", f);
  if (fs.existsSync(staleEn)) fs.rmSync(staleEn, { recursive: true, force: true });
}
for (const f of DEPRECATED_ROOT_SEO_FOLDERS) {
  const staleRoot = path.join(OUT, f);
  if (fs.existsSync(staleRoot)) fs.rmSync(staleRoot, { recursive: true, force: true });
}

const ROOT_SEO_PAGES = PROJECT_ORDER.flatMap((key) => [
  { key, mode: "prices" },
  { key, mode: "payment" },
]);

function waHomeFloatHref(L) {
  return `https://wa.me/201208986606?text=${encodeURIComponent(L.waFloatHomeSubject)}`;
}

function waProjectFloatHref(L, projectDisplayName) {
  const t = encodeURIComponent(L.waFloatPrefix + projectDisplayName + L.waFloatSuffix);
  return `https://wa.me/201208986606?text=${t}`;
}

function write(rel, html) {
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html, "utf8");
}

function thankYouHtml(lang, dir, L) {
  const canonicalPath = `/${lang}/thank-you/`;
  const main = `<section class="thank-panel section section--white"><div class="container"><h1>${esc(L.thankYouTitle)}<span id="thank-you-greet"></span></h1>${L.seoSrOnlyThankYou}<p>${esc(L.thankYouLead)}</p><p>${esc(L.thankYouWa)} <a href="${esc(waHomeFloatHref(L))}" target="_blank" rel="noopener noreferrer">${esc(L.ctaBookWhatsApp)}</a>.</p><p class="cta-row"><a class="btn btn-primary" href="/${lang}/">${esc(L.thankYouHome)}</a><a class="btn btn-outline" href="/${lang}/projects/">${esc(L.thankYouProjects)}</a></p></div></section>`;
  return renderPage({
    siteUrl: SITE_URL,
    lang,
    dir,
    title: L.thankYouTitle + " | " + L.brandShort,
    description: L.thankYouLead.slice(0, 155),
    canonicalPath,
    pathWithoutLang: "/thank-you/",
    L,
    waHref: waHomeFloatHref(L),
    breadcrumbItems: [],
    main,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: L.thankYouTitle,
        url: SITE_URL + canonicalPath,
        inLanguage: lang,
      },
    ],
  });
}

function simplePage({ lang, dir, L, title, description, canonicalPath, pathWithoutLang, h1, inner, faqs, breadcrumbItems: bc, leadAnswer }) {
  const leadBlock = leadAnswer
    ? `<section class="section section--white section--top-answer"><div class="container"><h2 class="sr-only">${esc(L.sectionDirect)}</h2><div class="aeo-answer">${leadAnswer}</div></div></section>`
    : "";
  const main = `${leadBlock}<section class="page-hero" style="min-height:220px"><div class="page-hero__bg" aria-hidden="true"><div class="page-hero__overlay"></div></div><div class="container"><h1>${esc(h1)}</h1></div></section><section class="section section--white"><div class="container prose article-body">${inner}</div></section>${
    faqs
      ? `<section class="section" id="faq"><div class="container"><h2>${esc(L.sectionFaq)}</h2><div class="faq-list">${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div></div></section>`
      : ""
  }`;
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: SITE_URL + canonicalPath, inLanguage: lang },
  ];
  if (faqs) schemas.push(faqSchema(faqs));
  const breadcrumbItems = bc || [
    { name: L.breadcrumbHome, href: `/${lang}/` },
    { name: h1, href: canonicalPath },
  ];
  return renderPage({
    siteUrl: SITE_URL,
    lang,
    dir,
    title,
    description,
    canonicalPath,
    pathWithoutLang,
    L,
    waHref: waHomeFloatHref(L),
    breadcrumbItems,
    main,
    schemas,
  });
}

for (const lang of LANGS) {
  const L = getLocale(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const w = waHomeFloatHref(L);
  const copy = projectCopyForLang(lang);

  write(`${lang}/index.html`, renderHome({ siteUrl: SITE_URL, lang, dir, L, waHref: w }));

  write(
    `${lang}/about/index.html`,
    simplePage({
      lang,
      dir,
      L,
      title: `${L.aboutH1} | ORA Developers Egypt | ${L.brandShort}`,
      description: `${L.metaHomeDesc.slice(0, 120)} ${L.metaCtaSuffix}`.slice(0, 158),
      canonicalPath: `/${lang}/about/`,
      pathWithoutLang: "/about/",
      h1: L.aboutH1,
      leadAnswer: `<p>${esc(L.aboutQuickAnswer)}</p>`,
      inner: `${L.aboutHtml}<h2>${esc(lang === "ar" ? "الخطوة التالية" : "Next steps")}</h2><p><a href="/${lang}/projects/">${esc(L.navProjects)}</a> · <a href="/${lang}/blog/">${esc(L.navBlog)}</a> · <a href="/${lang}/contact/">${esc(L.navContact)}</a></p>`,
      faqs: L.aboutFaqs || null,
    })
  );

  let plist = "";
  for (const key of PROJECT_ORDER) {
    const m = PROJECTS[key];
    const pc = copy[key];
    const ph = lang === "en" ? englishPricesPath(m) : `/${lang}/${m.pricesFolder}/`;
    const mh = lang === "en" ? englishPaymentPath(m) : `/${lang}/${m.paymentFolder}/`;
    plist += `<li><a href="/${lang}/${m.folder}/">${esc(pc.name)}</a> — <a href="${esc(ph)}">${esc(L.sectionPrices)}</a> · <a href="${esc(mh)}">${esc(L.sectionPayment)}</a></li>`;
  }
  write(
    `${lang}/projects/index.html`,
    simplePage({
      lang,
      dir,
      L,
      title: `${L.projectsH1} | ORA Developers Egypt | ${L.brandShort}`,
      description: `${L.projectsLead.slice(0, 110)} ${L.metaCtaSuffix}`.slice(0, 158),
      canonicalPath: `/${lang}/projects/`,
      pathWithoutLang: "/projects/",
      h1: L.projectsH1,
      leadAnswer: `<p>${esc(L.projectsLead)}</p>`,
      inner: `${L.seoSrOnlyProjects}<h2>${esc(L.projectsCommunitiesH2)}</h2><ul>${plist}</ul><h2>${esc(L.projectsCompareH2)}</h2><p class="cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="/${lang}/contact/">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg" href="/${lang}/projects/">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></p><h2>${esc(lang === "ar" ? "أدلة ومقالات" : "Guides & blog")}</h2><p><a href="/${lang}/blog/">${esc(L.navBlog)}</a> · <a href="/${lang}/faq/">${esc(L.navFaq)}</a></p>`,
      faqs: L.projectsFaqs || null,
    })
  );

  write(
    `${lang}/contact/index.html`,
    simplePage({
      lang,
      dir,
      L,
      title: `${L.contactH1} | ORA Developers Egypt | ${L.brandShort}`,
      description: `${L.finalCtaText.slice(0, 110)} ${L.metaCtaSuffix}`.slice(0, 158),
      canonicalPath: `/${lang}/contact/`,
      pathWithoutLang: "/contact/",
      h1: L.contactH1,
      leadAnswer: `<p>${esc(L.contactQuickAnswer)}</p>`,
      inner: `${L.seoSrOnlyContact}<p>${esc(L.finalCtaText)}</p><div class="lead-card" style="max-width:480px;margin-top:1.5rem"><p class="form-fast">${esc(L.formFastResponse)}</p><form class="js-lead-form" novalidate><div class="form-group"><label for="cn-${lang}">${esc(L.labelName)}</label><input id="cn-${lang}" name="name" type="text" required autocomplete="name" /></div><div class="form-group"><label for="cp-${lang}">${esc(L.labelPhone)}</label><input id="cp-${lang}" name="phone" type="tel" required autocomplete="tel" /></div>${leadBudgetFieldHtml(lang, L, "contact", "stacked")}<button class="btn btn-primary btn-block btn--lg" type="submit">${esc(L.ctaSubmit)}</button></form><p class="form-note form-note--privacy">${esc(L.formPrivacyShort)} <a href="/${lang}/privacy-policy/">${esc(L.navPrivacy)}</a>.</p></div><p class="cta-row cta-row--spread" style="margin-top:1.25rem"><a class="btn btn-outline btn--lg" href="${esc(w)}" target="_blank" rel="noopener noreferrer">${esc(L.ctaBookWhatsApp)}</a><a class="btn btn-outline btn--lg" href="/${lang}/projects/">${esc(L.navProjects)}</a><a class="btn btn-outline btn--lg" href="/${lang}/blog/">${esc(L.navBlog)}</a></p>`,
      faqs: L.contactFaqs || null,
    })
  );

  const gfaq =
    lang === "ar"
      ? [
          { q: "ما سعر زيد ويست التقريبي؟", a: "نطاقات معلنة من المقدم؛ اطلب استشارة خاصة لعرض أورا الموقّع لنوع الوحدة." },
          { q: "كيف أحصل على خطة سداد زيد إيست؟", a: "عبر الاستشارة الخاصة أو خط واتساب السري — نرسل جدول أورا الرسمي بسرية وعادةً خلال يوم عمل." },
          { q: "ما أسعار سولانا زايد الجديدة مقابل سولانا القاهرة الجديدة؟", a: "الأفقي في زايد الجديد يختلف في هيكل الدفعات عن شرق القاهرة؛ نرسل لك مقارنة بأرقام أورا." },
          { q: L.navProjects + "؟", a: L.projectsLead },
          { q: L.ctaRequestPlan + "؟", a: L.finalCtaText },
        ]
      : [
          { q: "What is the typical ZED West price entry?", a: "Published down payments start near 487K EGP on select 1BR bands — request a private consultation for the exact net on your typology." },
          { q: "How do I get a ZED East payment plan PDF?", a: "Request a consultation or WhatsApp with your typology — we share general ORA-structured information where available and remind you to confirm with the developer." },
          { q: "Solana West villas for sale vs Solana East New Cairo prices?", a: "New Zayed horizontal product uses villa-land economics; New Cairo stock is denser park product — we send side-by-side ORA sheets." },
          { q: L.navProjects + "?", a: L.projectsLead },
          { q: L.ctaRequestPlan + "?", a: L.finalCtaText },
        ];
  write(
    `${lang}/faq/index.html`,
    simplePage({
      lang,
      dir,
      L,
      title: `${L.faqH1} | ORA Developers Egypt | ${L.brandShort}`,
      description: `${L.finalCtaText.slice(0, 110)} ${L.metaCtaSuffix}`.slice(0, 158),
      canonicalPath: `/${lang}/faq/`,
      pathWithoutLang: "/faq/",
      h1: L.faqH1,
      leadAnswer: `<p>${esc(L.contactQuickAnswer)}</p>`,
      inner: `${L.seoSrOnlyFaq}<p>${esc(L.finalCtaText)}</p><p class="cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="/${lang}/contact/">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg" href="/${lang}/projects/">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></p><p style="margin-top:0.75rem;font-size:0.85rem"><a href="${esc(waHomeFloatHref(L))}" target="_blank" rel="noopener noreferrer">${esc(L.ctaBookWhatsApp)}</a></p>`,
      faqs: gfaq,
    })
  );

  let blogLinks = "";
  for (const slug of SLUGS) {
    const p = getBlogPost(slug, lang);
    blogLinks += `<li><a href="/${lang}/blog/${slug}/">${esc(p.title)}</a></li>`;
  }
  write(
    `${lang}/blog/index.html`,
    simplePage({
      lang,
      dir,
      L,
      title: `${L.blogH1} | ORA Developers Egypt | ${L.brandShort}`,
      description: L.metaHomeDesc.slice(0, 150),
      canonicalPath: `/${lang}/blog/`,
      pathWithoutLang: "/blog/",
      h1: L.blogH1,
      inner: `<p>${esc(L.blogIntro)}</p>${L.seoSrOnlyBlog}<h2>${esc(L.blogHubH2)}</h2><p>${L.blogHubP}</p><h2>${esc(L.blogLatestH2)}</h2><ul>${blogLinks}</ul><p style="margin-top:1rem"><a href="/${lang}/projects/">${esc(L.navProjects)}</a> · <a href="/${lang}/contact/">${esc(L.navContact)}</a></p>`,
      faqs: null,
    })
  );

  for (const slug of SLUGS) {
    const p = getBlogPost(slug, lang);
    const cf =
      lang === "ar"
        ? [
            { q: "هل هذا التسعير الرسمي من أورا؟", a: "لا يغني المقال عن عرض أسعار موقّع من أورا." },
            { q: "أين أتحقق من المخزون؟", a: "تصفح صفحات المشاريع للوحدات المعروضة، ثم أكد التوفر لدى أورا أو القنوات المعتمدة." },
            { q: "ما سرعة الرد؟", a: "نرد عادةً خلال يوم عمل واحد بتوجيه عام؛ العروض الملزمة من المطوّر." },
            { q: "هل يمكن التمويل من الخارج؟", a: "يخضع لسياسة أورا لكل إصدار؛ استشر المستشار." },
            { q: "ما الخطوة التالية؟", a: "أرسل نموذج التواصل من أي صفحة." },
          ]
        : [
            { q: "Is this official ORA pricing?", a: "No article replaces a countersigned quotation." },
            { q: "Where to verify inventory?", a: "Browse project pages for listed typologies, then confirm live stock with ORA or authorized sales." },
            { q: "How fast do you reply?", a: "We typically reply within about one business day with general guidance; binding offers come from the developer." },
            { q: "Can I finance offshore?", a: "Depends on ORA policy per release; ask advisors." },
            { q: "Next step?", a: "Use the lead form or request a private consultation from any page." },
          ];
    write(
      `${lang}/blog/${slug}/index.html`,
      simplePage({
        lang,
        dir,
        L,
        title: p.title,
        description: p.desc,
        canonicalPath: `/${lang}/blog/${slug}/`,
        pathWithoutLang: `/blog/${slug}/`,
        h1: p.h1,
        inner: `${p.body}<p><a href="/${lang}/blog/">${esc(L.blogH1)}</a> · <a href="/${lang}/contact/">${esc(L.navContact)}</a></p>`,
        faqs: Array.isArray(p.faqs) && p.faqs.length ? p.faqs : cf,
      })
    );
  }

  write(
    `${lang}/privacy-policy/index.html`,
    simplePage({
      lang,
      dir,
      L,
      title: `${L.privacyH1} | ORA Developers Egypt | ${L.brandShort}`,
      description: lang === "ar" ? "كيف تتعامل هذه المنصة المستقلة مع البيانات الشخصية." : "How this independent platform handles personal data.",
      canonicalPath: `/${lang}/privacy-policy/`,
      pathWithoutLang: "/privacy-policy/",
      h1: L.privacyH1,
      inner: `${L.seoSrOnlyPrivacy}${L.privacyHtml}<p><a href="/${lang}/contact/">${esc(L.navContact)}</a> · <a href="/${lang}/projects/">${esc(L.navProjects)}</a></p>`,
      faqs: L.privacyFaqs || null,
    })
  );

  write(`${lang}/thank-you/index.html`, thankYouHtml(lang, dir, L));

  write(
    `${lang}/404/index.html`,
    simplePage({
      lang,
      dir,
      L,
      title: `404 | ${L.brandShort}`,
      description: L.notFoundLead,
      canonicalPath: `/${lang}/404/`,
      pathWithoutLang: "/404/",
      h1: L.notFoundH1,
      inner: `${L.seoSrOnly404}<p>${esc(L.notFoundLead)}</p><p><a class="btn btn-primary" href="/${lang}/">${esc(L.thankYouHome)}</a></p>`,
      faqs: null,
    })
  );

  for (const key of PROJECT_ORDER) {
    const meta = PROJECTS[key];
    const list = units[meta.unitsKey] || [];
    const pc = copy[key];
    const variants = [
      ["main", meta.folder],
      ["prices", meta.pricesFolder],
      ["payment", meta.paymentFolder],
    ];
    for (const [variant, folder] of variants) {
      if (lang === "en" && ROOT_SEO_FOLDERS.has(folder)) continue;
      write(
        `${lang}/${folder}/index.html`,
        renderProjectPage({
          siteUrl: SITE_URL,
          lang,
          dir,
          L,
          projectKey: key,
          variant,
          units: list,
          waHref: waProjectFloatHref(L, pc.name),
        })
      );
    }
  }
}

const LEn = getLocale("en");
for (const item of ROOT_SEO_PAGES) {
  const meta = PROJECTS[item.key];
  const list = units[meta.unitsKey] || [];
  const pcEn = projectCopyForLang("en")[item.key];
  const outFolder = item.mode === "prices" ? meta.pricesFolder : meta.paymentFolder;
  write(
    `${outFolder}/index.html`,
    renderRootSeoPage({
      siteUrl: SITE_URL,
      L: LEn,
      projectKey: item.key,
      mode: item.mode,
      units: list,
      waHref: waProjectFloatHref(LEn, pcEn.name),
    })
  );
}

const LAr = getLocale("ar");
for (const slug of ALL_KEYWORD_LANDING_SLUGS) {
  const projectKey = projectKeyForKeywordSlug(slug);
  if (!projectKey) continue;
  const meta = PROJECTS[projectKey];
  const list = units[meta.unitsKey] || [];
  const pcEn = projectCopyForLang("en")[projectKey];
  const pcAr = projectCopyForLang("ar")[projectKey];
  write(
    `${slug}/index.html`,
    renderKeywordPricePage({
      siteUrl: SITE_URL,
      lang: "en",
      dir: "ltr",
      L: LEn,
      slug,
      units: list,
      waHref: waProjectFloatHref(LEn, pcEn.name),
    })
  );
  write(
    `ar/${slug}/index.html`,
    renderKeywordPricePage({
      siteUrl: SITE_URL,
      lang: "ar",
      dir: "rtl",
      L: LAr,
      slug,
      units: list,
      waHref: waProjectFloatHref(LAr, pcAr.name),
    })
  );
}

write(
  "index.html",
  `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta http-equiv="refresh" content="0;url=/en/"/><link rel="canonical" href="${SITE_URL}/en/"/><title>Independent ORA project guide | Egypt</title></head><body><p><a href="/en/">Continue</a></p></body></html>`
);

const urls = [];
for (const lang of LANGS) {
  const paths = ["", "about/", "projects/", "contact/", "faq/", "blog/", "privacy-policy/", "thank-you/", "404/"];
  for (const p of paths) urls.push(`${SITE_URL}/${lang}/${p}`);
  for (const slug of SLUGS) urls.push(`${SITE_URL}/${lang}/blog/${slug}/`);
  for (const key of PROJECT_ORDER) {
    const m = PROJECTS[key];
    urls.push(`${SITE_URL}/${lang}/${m.folder}/`);
    if (!(lang === "en" && ROOT_SEO_FOLDERS.has(m.pricesFolder))) urls.push(`${SITE_URL}/${lang}/${m.pricesFolder}/`);
    if (!(lang === "en" && ROOT_SEO_FOLDERS.has(m.paymentFolder))) urls.push(`${SITE_URL}/${lang}/${m.paymentFolder}/`);
  }
}
for (const f of ROOT_SEO_FOLDERS) urls.push(`${SITE_URL}/${f}/`);
for (const ks of ALL_KEYWORD_LANDING_SLUGS) urls.push(`${SITE_URL}/ar/${ks}/`);
urls.push(`${SITE_URL}/`);
const sm = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${u}</loc><changefreq>weekly</changefreq></url>`).join("")}</urlset>`;
write("sitemap.xml", sm);

write(
  "robots.txt",
  `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`
);

const fav = path.join(ROOT, "favicon.svg");
if (fs.existsSync(fav)) fs.copyFileSync(fav, path.join(OUT, "favicon.svg"));

for (const folder of ["ar", "de", "fr", "it", "zed-west", "zed-east", "solana-west", "solana-east", "silversands", "blog", "about", "projects", "contact", "faq", "privacy-policy", "thank-you", "404"]) {
  const legacy = path.join(OUT, folder);
  if (fs.existsSync(legacy) && !LANGS.includes(folder)) {
    const stat = fs.statSync(legacy);
    if (stat.isDirectory()) {
      const hasLangSub = fs.existsSync(path.join(legacy, "index.html")) && folder.length <= 3;
      if (folder === "blog" || ["zed-west", "zed-east", "solana-west", "solana-east", "silversands"].includes(folder)) {
        fs.rmSync(legacy, { recursive: true, force: true });
      } else if (!["en", "ar"].includes(folder) && ["about", "projects", "contact", "faq", "privacy-policy", "thank-you", "404"].includes(folder)) {
        fs.rmSync(legacy, { recursive: true, force: true });
      }
    }
  }
}

console.log("Built static site to", OUT);
