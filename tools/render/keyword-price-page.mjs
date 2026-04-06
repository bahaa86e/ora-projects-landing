import { renderPage, leadBudgetFieldHtml } from "../lib/layout.mjs";
import { esc, asset } from "../lib/helpers.mjs";
import { PROJECTS, projectCopyForLang, PROJECT_ORDER } from "../projects-meta.mjs";
import { faqSchema } from "./faq.mjs";
import { englishPaymentPath, englishPricesPath } from "../lib/seo-routes.mjs";
import { unitsTableHtml, paymentStepsHtml } from "./seo-money-page.mjs";
import { aeoTriadHtml, urgencyStripHtml, trustStripHtml } from "../lib/aeo.mjs";

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function paymentStepsHtmlAr(planLine) {
  return `<ol class="seo-steps">
  <li><strong>الحجز / التعاقد:</strong> دفعة تعاقدية أولى حسب إصدار أورا.</li>
  <li><strong>مرحلة ثانية:</strong> نسبة ثانية معلنة (مثلاً بعد ٩٠ يوماً أو ٣ أشهر — يثبت في عقدك).</li>
  <li><strong>ذيل الأقساط:</strong> الباقي على جدول رسمي — ${esc(planLine)}</li>
</ol>`;
}

/** English-root landings that reuse a project hub but override copy (slug → config) */
const EXTRA_LANDING = {
  "zed-west-villas-for-sale": {
    projectKey: "zed-west",
    en: {
      h1: "ZED West Villas for Sale & Luxury Residences | Sheikh Zayed, Egypt",
      title: "ZED West Villas for Sale Sheikh Zayed Egypt | ORA Prices & Payment",
      description:
        "ZED West luxury residences in Sheikh Zayed, Egypt — apartments & large-format ORA stock. Compare villa demand with Solana West; access indicative prices & request verified availability from ORA.",
      snippetQ: "Are there villas for sale at ZED West?",
      snippetA: [
        "ZED West is best known for ORA-branded towers and premium apartments in Sheikh Zayed, Egypt—not standalone villa compounds. Published apartment equity often starts near 487K EGP down on select 1BR; compare true villa inventory with Solana West in New Zayed.",
        "Only ORA countersigned offers confirm typology, price, and payment. Use this page to orient, then request private documentation.",
      ],
      openPara:
        "Serious **ZED West villas for sale** searches usually blend Sheikh Zayed tower residences with comparisons to horizontal ORA villas elsewhere. This independent page clarifies what is typically marketed at ZED West, how **ZED West price** bands read in EGP, and where to confirm **ZED West payment plan** paperwork.",
      heroLead:
        "Premium ORA residences in Sheikh Zayed — tower inventory, transparent indicative economics, and a discreet path to developer-verified availability.",
      h2Aeo: "ZED West price & payment — direct answer (Sheikh Zayed, Egypt)",
      h2PriceSec: "ZED West price overview — indicative EGP down-payment bands",
      h2PaySec: "ZED West payment plan — ORA milestones & installment shape",
      h2LocSec: "ZED West location — Greater Cairo & Sheikh Zayed corridor",
      h2FaqSec: "ZED West villas & residences — buyer FAQs",
      h2Hub: "ORA Developers Egypt projects — compare prices & payment plans",
      faqs: [
        {
          q: "Does ZED West sell standalone villas?",
          a: "Marketing emphasizes luxury apartments and large-format tower residences; horizontal ORA villas are more common in Solana West (New Zayed). Confirm live typology on ORA paperwork.",
        },
        {
          q: "What ZED West price should I model first?",
          a: "Published 1BR down payments often start near 487K EGP on select releases; larger plates step up. Net totals are binding only on countersigned ORA offers.",
        },
        {
          q: "How does the ZED West payment plan work?",
          a: "Typical published rhythm is 5% + 5% after three months, then installments up to 10 years where the release allows—verify on your ORA matrix.",
        },
        {
          q: "Where should I compare true villas for sale?",
          a: "Review Solana West for ORA horizontal villas and bungalows, then cross-check Silversands for North Coast villa stock—all linked from our projects hub.",
        },
        {
          q: "How do I get verified availability?",
          a: "Submit the lead form or request a private consultation—we reply with general ORA-aligned context within about one business day; binding stock comes from ORA only.",
        },
      ],
    },
    ar: {
      h1: "فيلات ومساكن فاخرة للبيع — زيد ويست الشيخ زايد مصر",
      title: "فيلات زيد ويست للبيع الشيخ زايد مصر | أسعار وخطط أورا",
      description:
        "مساكن فاخرة من أورا في زيد ويست الشيخ زايد — أبراج ومخططات واسعة. قارن الطلب على الفيلا مع سولانا ويست؛ أرقام استرشادية وتوثيق من أورا.",
      snippetQ: "هل توجد فيلات للبيع في زيد ويست؟",
      snippetA: [
        "زيد ويست معروف بأبراج أورا والشقق الفاخرة في الشيخ زايد وليس كمجمع فيلات مستقلة. مقدمات الشقق المعلنة قد تبدأ نحو ٤٨٧ ألف جنيه لبعض ١ غرفة؛ قارن الفيلا الحقيقية مع سولانا ويست بزايد الجديد.",
        "التأكيد فقط بعرض أورا الموقّع للنوع والسعر والجدول.",
      ],
      openPara:
        "من يبحث عن **فيلات زيد ويست للبيع** يقارن غالباً بين مساكن الأبراج الفاخرة في الشيخ زايد وبين فيلات أورا الأفقية في مشاريع أخرى. توضح هذه الصفحة ما يُسوق عادةً في زيد ويست وكيف تقرأ **سعر زيد ويست** و**خطة السداد** بسرعة.",
      heroLead:
        "مساكن أورا الراقية في الشيخ زايد — مخزون أبراج، أرقام استرشادية واضحة، ومسار سرّي للتحقق من التوفر لدى المطور.",
      h2Aeo: "سعر زيد ويست وخطة السداد — إجابة مباشرة",
      h2PriceSec: "نظرة سعر زيد ويست — نطاقات مقدم بالجنيه",
      h2PaySec: "خطة سداد زيد ويست — مراحل أورا",
      h2LocSec: "موقع زيد ويست — الشيخ زايد والقاهرة الكبرى",
      h2FaqSec: "أسئلة المشتري — فيلات ومساكن زيد ويست",
      h2Hub: "مشاريع أورا مصر — مقارنة أسعار وخطط سداد",
      faqs: [
        {
          q: "هل يُباع في زيد ويست فيلات مستقلة؟",
          a: "التسويق يركز على الشقق والمساحات الكبيرة في الأبراج؛ الفيلات الأفقية الشائعة في سولانا ويست. ثبّت النوع على أوراق أورا.",
        },
        {
          q: "ما أول سعر أسترشد به لزيد ويست؟",
          a: "غالباً مقدمات ١ غرفة من نحو ٤٨٧ ألف جنيه لبعض الإصدارات؛ الألواح الأكبر أعلى. الصافي في العرض الموقّع.",
        },
        {
          q: "كيف تعمل خطة السداد؟",
          a: "هيكل معلن غالباً ٥٪+٥٪ بعد ثلاثة أشهر ثم أقساط حتى ١٠ سنوات حسب الإصدار — راجع جدول أورا.",
        },
        {
          q: "أين أقارن فيلات للبيع؟",
          a: "راجع سولانا ويست للفيلات الأفقية وسيلفرساندز للساحل — روابط من صفحة المشاريع.",
        },
        {
          q: "كيف أحصل على توفر موثّق؟",
          a: "عبر النموذج أو الاستشارة الخاصة — نرد عادةً خلال يوم عمل بمعلومات عامة؛ التوفر الملزم من أورا.",
        },
      ],
    },
  },
};

/** projectKey → buyer-intent copy (EN + AR) */
const KEYWORD_COPY = {
  "zed-west": {
    slug: "zed-west-price",
    en: {
      h1: "ZED West Price",
      title: "ZED West Price Sheikh Zayed Egypt | ORA",
      description:
        "ZED West price in Egypt: published down payments from ~487K EGP on select 1BR. Indicative ORA-style bands — confirm binding terms with the developer.",
      snippetQ: "What is the price of ZED West?",
      snippetA: [
        "ZED West price entry points start near 487,000 EGP down on select one-bedroom releases, with typical 1BR bands up to roughly 635,000 EGP down before installments; larger apartments step into higher equity tickets.",
        "Net totals are binding only on countersigned ORA quotations—use a consultation or ORA sales to obtain the authoritative price and payment matrix for your floor plan.",
      ],
      openPara:
        "If you are searching **ZED West price**, this page summarizes published ORA bands in Sheikh Zayed, Egypt, and how to confirm the official figure for your unit. ZED West price marketing is indicative until the developer countersigns your offer.",
    },
    ar: {
      h1: "سعر زد ويست",
      title: "سعر زيد ويست الشيخ زايد مصر | أورا",
      description:
        "سعر زيد ويست في مصر: مقدمات معلنة من ~٤٨٧ ألف جنيه لبعض ١ غرفة. ملخص استرشادي — ثبّت الشروط مع المطوّر.",
      snippetQ: "كم سعر زيد ويست؟",
      snippetA: [
        "سعر زيد ويست يبدأ استرشادياً من نحو ٤٨٧ ألف جنيه مقدّماً لبعض وحدات غرفة نوم واحدة، مع نطاقات ١ غرفة غالباً حتى نحو ٦٣٥ ألفاً قبل الأقساط؛ الشقق الأكبر تتطلب مقدّمات أعلى.",
        "الصافي النهائي يثبت فقط في عرض أورا الموقّع — راجع مبيعات أورا أو استخدم الاستشارة للحصول على السعر والجدول الملزمين.",
      ],
      openPara:
        "إذا كنت تبحث عن **سعر زيد ويست**، تلخّص هذه الصفحة النطاقات المعلنة من أورا في الشيخ زايد، مصر، وكيفية تثبيت الرقم الرسمي لوحدتك. التسويق استرشادي حتى توقيع أورا.",
    },
  },
  "zed-east": {
    slug: "zed-east-price",
    en: {
      h1: "ZED East Price",
      title: "ZED East Price New Cairo Egypt | ORA",
      description:
        "ZED East price: towers & townhomes from ~590K EGP down on published stock. Summary of common ORA marketing bands — verify with the developer before booking.",
      snippetQ: "What is the price of ZED East?",
      snippetA: [
        "ZED East price levels open near 590,000 EGP down on compact one-bedroom layouts and rise materially for park-facing towers and townhomes, with multi-million down payments on larger typologies.",
        "Only countersigned ORA documentation fixes your payable schedule—use this page as orientation, then confirm the ZED East price for your unit with ORA or an authorized channel.",
      ],
      openPara:
        "Buyers comparing **ZED East price** against other New Cairo launches use published down-payment bands as a first filter. ZED East price figures stay indicative until ORA issues a signed quotation for your release.",
    },
    ar: {
      h1: "سعر زد ايست",
      title: "سعر زيد ايست القاهرة الجديدة مصر | أورا",
      description:
        "سعر زيد ايست: أبراج وتاون هاوس من ~٥٩٠ ألف جنيه مقدّماً. ملخص للنطاقات المعلنة — تحقق مع أورا قبل الحجز.",
      snippetQ: "كم سعر زيد ايست؟",
      snippetA: [
        "سعر زيد ايست يبدأ نحو ٥٩٠ ألف جنيه مقدّماً لبعض التخطيطات الصغيرة ويرتفع بوضوح للواجهات الحديقة والأبراج والتاون هاوس، مع ملايين للأنماط الأوسع.",
        "الالتزام الكامل يثبت فقط بوثائق أورا الموقّعة — استخدم الصفحة كتوجيه ثم أكّد سعر زيد ايست الرسمي للوحدة لدى المطوّر.",
      ],
      openPara:
        "المشترون الذين يقارنون **سعر زيد ايست** مع مشاريع أخرى في القاهرة الجديدة يعتمدون على نطاقات المقدم المعلنة كخطوة أولى. الأرقام استرشادية حتى يصدر أورا عرضاً موقّعاً.",
    },
  },
  "solana-west": {
    slug: "solana-west-price",
    en: {
      h1: "Solana West Price",
      title: "Solana West Price New Zayed Egypt | ORA",
      description:
        "Solana West price: villas & apartments from ~520K EGP down on select releases. Indicative typology context — binding sheets come from ORA only.",
      snippetQ: "What is the price of Solana West?",
      snippetA: [
        "Solana West price for horizontal ORA product typically starts near 520,000 EGP down on select one-bedroom inventory, while villas and bungalows command substantially higher equity checks tied to land ratio.",
        "Confirm Solana West price and construction-linked draws on the official ORA schedule issued for your unit.",
      ],
      openPara:
        "**Solana West price** research usually spans low-rise apartments through villa bands in New Zayed, Egypt. Published Solana West price points help you shortlist; binding numbers follow ORA’s formal offer.",
    },
    ar: {
      h1: "أسعار سولانا ويست",
      title: "أسعار سولانا زايد الجديدة مصر | أورا",
      description:
        "أسعار سولانا زايد الجديدة: فيلات وشقق من ~٥٢٠ ألف مقدّماً. سياق استرشادي — الجداول الملزمة من أورا.",
      snippetQ: "كم أسعار سولانا ويست؟",
      snippetA: [
        "أسعار سولانا زايد الجديدة للمنتج الأفقي من أورا تبدأ نحو ٥٢٠ ألف جنيه مقدّماً لبعض إصدارات ١ غرفة، بينما الفيلات والبنغل تتطلب سيولة أعلى مرتبطة بنسبة الأرض.",
        "ثبّت السعر وجدول الدفعات المرتبطة بالإنشاءات على مستند أورا الرسمي الصادر لوحدتك.",
      ],
      openPara:
        "البحث عن **أسعار سولانا زايد الجديدة** يغطي غالباً الشقق المنخفضة حتى الفيلات. الأرقام المعلنة تساعدك على الاختصار؛ الأرقام الملزمة تأتي مع عرض أورا.",
    },
  },
  "solana-east": {
    slug: "solana-east-price",
    en: {
      h1: "Solana East Price",
      title: "Solana East Price New Cairo Egypt | ORA",
      description:
        "Solana East price: 1BR to townhomes from ~560K EGP down. Independent summary — request binding Solana East pricing and phasing from ORA.",
      snippetQ: "What is the price of Solana East?",
      snippetA: [
        "Solana East price bands begin around 560,000 EGP down on smaller apartments and climb through townhouse and limited villa inventory across New Cairo, Egypt.",
        "Your executable Solana East price is issued on ORA letterhead—consult ORA sales or use this site’s inquiry form for general orientation toward the matrix for your typology.",
      ],
      openPara:
        "**Solana East price** buyers balance compact apartments against larger townhomes; both sit on ORA-supervised billing. Treat every Solana East price mention as indicative until you hold a countersigned pack.",
    },
    ar: {
      h1: "أسعار سولانا إيست",
      title: "أسعار سولانا القاهرة الجديدة مصر | أورا",
      description:
        "أسعار سولانا القاهرة الجديدة: من ~٥٦٠ ألف مقدّماً حتى التاون هاوس. معلومات عامة — التسعير الملزم من أورا.",
      snippetQ: "كم أسعار سولانا إيست في القاهرة الجديدة؟",
      snippetA: [
        "أسعار سولانا القاهرة الجديدة تبدأ نحو ٥٦٠ ألف جنيه مقدّماً للشقق الأصغر وتصعد عبر التاون هاوس والفيلات المحدودة ضمن محفظة أورا.",
        "التسعير التنفيذي يصدر بختم أورا — راجع مبيعات أورا أو استخدم الاستشارة لتوجيهك نحو المصفوفة المناسبة لنوع وحدتك.",
      ],
      openPara:
        "مشترو **أسعار سولانا القاهرة الجديدة** يقارنون الشقق الصغيرة بالتاون هاوس؛ الجميع على تحصيل بإشراف أورا. اعتبر كل أرقام أسعار سولانا القاهرة الجديدة استرشادية حتى تحصل على العرض الموقّع.",
    },
  },
  silversands: {
    slug: "silversands-price",
    en: {
      h1: "Silversands Price",
      title: "Silversands North Coast Villas Price Egypt | ORA",
      description:
        "Silversands North Coast villas price (EGP): ~27M–128M indicative by typology; 5% booking & quarterly ORA plans. Request verified availability — binding terms on developer SPA only.",
      snippetQ: "What is the price of Silversands?",
      snippetA: [
        "Silversands price spans roughly 27,000,000 to 128,000,000 EGP depending on chalet versus villa positioning, lagoon rows versus direct sea frontage, and interior scale across ORA’s North Coast masterplan.",
        "You typically enter with a 5% booking tranche on ORA SPAs, then follow equal quarterly installments—request the Silversands price sheet that matches your lot from ORA or via consultation for general guidance.",
      ],
      openPara:
        "**Silversands price** and **Silversands North Coast Egypt prices** are quoted in EGP for ORA’s Sidi Heneish pipeline. High-intent buyers use published bands to model equity calls, then confirm Silversands price on official documentation.",
    },
    ar: {
      h1: "أسعار سيلفر ساندس",
      title: "أسعار سيلفر ساندس الساحل مصر | أورا",
      description:
        "أسعار سيلفر ساندس الساحل نحو ٢٧–١٢٨ مليون جنيه حسب النوع، حجز ٥٪. نظرة عامة استرشادية — ثبّت السعر والأقساط مع أورا.",
      snippetQ: "كم أسعار سيلفر ساندس؟",
      snippetA: [
        "أسعار سيلفر ساندس الساحل تمتد نحو ٢٧ إلى ١٢٨ مليون جنيه بحسب الشاليه مقابل الفيلا وصف اللاجون مقابل الواجهة البحرية ومساحة الوحدة في مشروع أورا بسيدي حنيش.",
        "غالباً تدخل بحجز ٥٪ بعقود أورا ثم أقساط ربع سنوية — اطلب إحاطة خاصة بورقة أسعار سيلفر ساندس لمخططك.",
      ],
      openPara:
        "**أسعار سيلفر ساندس الساحل** تُقتبس بالجنيه لخط أنابيب أورا في سيدي حنيش. المشترون الجادون يستخدمون النطاقات المعلنة ثم يثبّتون أسعار سيلفر ساندس الساحل على الوثائق الرسمية.",
    },
  },
};

function openParaHtml(para) {
  const bolded = para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return `<p>${bolded}</p>`;
}

function internalMoneyHubHtml(L, lang, hubHeading) {
  const items = [];
  for (const key of PROJECT_ORDER) {
    const m = PROJECTS[key];
    const pc = projectCopyForLang(lang)[key];
    const labelBase = pc.name.split("—")[0].trim();
    const ph = lang === "en" ? englishPricesPath(m) : `/${lang}/${m.pricesFolder}/`;
    const pm = lang === "en" ? englishPaymentPath(m) : `/${lang}/${m.paymentFolder}/`;
    items.push(
      `<li><a href="${esc(ph)}">${esc(labelBase)} — ${esc(L.sectionPrices)}</a> · <a href="${esc(pm)}">${esc(L.sectionPayment)}</a></li>`
    );
  }
  const contact = `/${lang}/contact/`;
  const projects = `/${lang}/projects/`;
  const faq = `/${lang}/faq/`;
  const hubH = hubHeading || L.sectionMoneyHub;
  return `<section class="section section--white" aria-labelledby="kw-hub-h"><div class="container"><h2 id="kw-hub-h" class="section-head" style="text-align:start;max-width:none;margin-bottom:1rem">${esc(hubH)}</h2><ul class="seo-internal-grid">${items.join("")}</ul><p class="seo-internal-more cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="${esc(contact)}">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg" href="${esc(projects)}">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg" href="${esc(contact)}">${esc(L.ctaRequestPlan)}</a></p><p class="cta-band__note" style="text-align:center;margin-top:0.75rem"><a href="${esc(faq)}">${esc(L.navFaq)}</a></p></div></section>`;
}

function buildKeywordFaqs(lang, kc, pc, meta, snippetQ, snippetAJoined, pricesPath, paymentPath) {
  const plan = lang === "ar" ? meta.planAr || meta.planEn : meta.planEn;
  const priceAns = snippetAJoined;
  if (lang === "ar") {
    return [
      { q: snippetQ, a: priceAns },
      { q: `ما الذي يغيّر ${kc.h1} بين الوحدات؟`, a: `النوع، المساحة، الواجهة، وموجة الإصدار. ${plan}` },
      { q: `هل ${kc.h1} قابل للتفاوض؟`, a: "الأرقام الرسمية من أورا؛ أي خصم يظهر فقط في العرض الموقّع." },
      { q: "كيف أحصل على عرض سعر رسمي؟", a: "عبر النموذج أو واتساب لمعلومات عامة؛ العرض الملزم يصدر من أورا أو قناة مبيعات معتمدة." },
      { q: "هل التسعير بالجنيه؟", a: "نعم، ما لم ينص عقدك على خلاف ذلك." },
    ];
  }
  return [
    { q: snippetQ, a: priceAns },
    { q: `What changes ${kc.h1} between unit types?`, a: `Typology, size, view band, and release wave all move the payable deposit. ${plan}` },
    { q: `Is ${kc.h1} negotiable?`, a: "ORA publishes structured economics; any concession appears only on countersigned developer documentation." },
    { q: "How do I receive an official price quote?", a: "Use the lead form or WhatsApp for general information; binding quotes are issued only by ORA or an authorized sales channel." },
    { q: "Are buyer-intent prices shown in Egyptian pounds (EGP)?", a: "Yes—ORA marketing bands and standard SPAs are denominated in EGP unless your contract states otherwise." },
  ];
}

function resolveKeywordSlug(slugParam) {
  const raw = String(slugParam || "").replace(/\/$/g, "");
  const pageSlug = raw.includes("/") ? raw.split("/").filter(Boolean).pop() : raw;
  if (EXTRA_LANDING[pageSlug]) {
    return { pageSlug, projectKey: EXTRA_LANDING[pageSlug].projectKey, kcBase: EXTRA_LANDING[pageSlug] };
  }
  const projectKey = Object.keys(KEYWORD_COPY).find((k) => KEYWORD_COPY[k].slug === pageSlug);
  if (!projectKey) throw new Error(`renderKeywordPricePage: unknown slug ${pageSlug}`);
  return { pageSlug, projectKey, kcBase: KEYWORD_COPY[projectKey] };
}

export function renderKeywordPricePage({ siteUrl, lang, dir, L, slug, waHref, units }) {
  const { pageSlug, projectKey, kcBase } = resolveKeywordSlug(slug);
  const kc = lang === "ar" ? kcBase.ar : kcBase.en;
  const meta = PROJECTS[projectKey];
  const pc = projectCopyForLang(lang)[projectKey];
  const triad = lang === "ar" ? meta.aeoAr : meta.aeoEn;
  const idSafe = pageSlug.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "kw";

  const pricesPath = lang === "en" ? `/${meta.pricesFolder}/` : `/${lang}/${meta.pricesFolder}/`;
  const paymentPath = lang === "en" ? englishPaymentPath(meta) : `/${lang}/${meta.paymentFolder}/`;
  const hubPath = `/${lang}/${meta.folder}/`;
  const keywordPagePath = lang === "en" ? `/${pageSlug}/` : `/ar/${pageSlug}/`;
  const pathWithoutLang = `/${pageSlug}/`;

  const canonicalPath = keywordPagePath;
  const title = kc.title;
  const description = kc.description;

  const heroItems = meta.hero || [];
  const primary = heroItems[0];
  const firstImg = asset("/images/" + primary.file);
  const planLine = lang === "ar" ? meta.planAr || meta.planEn : meta.planEn;

  const table = units.length ? `<h3>${lang === "ar" ? "لمحة أنماط (استرشادية)" : "Typology snapshot (indicative)"}</h3>${unitsTableHtml(units, L)}` : "";
  const steps = lang === "ar" ? paymentStepsHtmlAr(planLine) : paymentStepsHtml(planLine);

  const snippetAJoined = kc.snippetA.join(" ");
  const faqs = Array.isArray(kc.faqs)
    ? kc.faqs
    : buildKeywordFaqs(lang, kc, pc, meta, kc.snippetQ, snippetAJoined, pricesPath, paymentPath);

  const shortName = pc.name.split("—")[0].trim();
  const h2Aeo = kc.h2Aeo || (lang === "ar" ? `إجابة مباشرة — سعر ودفع ${shortName}` : `Direct answer — ${shortName} price & payment (Egypt)`);
  const h2PriceSec = kc.h2PriceSec || (lang === "ar" ? `نظرة أسعار ${shortName}` : `${shortName} price overview — indicative EGP bands`);
  const h2PaySec = kc.h2PaySec || (lang === "ar" ? `خطة سداد ${shortName}` : `${shortName} payment plan — ORA schedule`);
  const h2LocSec = kc.h2LocSec || (lang === "ar" ? `موقع ${shortName} في مصر` : `${shortName} location — Egypt`);
  const h2FaqSec = kc.h2FaqSec || (lang === "ar" ? `أسئلة شائعة — ${shortName}` : `${shortName} buyer FAQs — price & availability`);
  const h2Hub = kc.h2Hub || L.sectionMoneyHub;
  const heroLead = kc.heroLead ?? pc.sub;

  const kwPriceHref = lang === "en" ? `/${KEYWORD_COPY[projectKey]?.slug || pageSlug}/` : `/ar/${KEYWORD_COPY[projectKey]?.slug || pageSlug}/`;
  const navBits = [
    `<a href="${esc(pricesPath)}">${esc(L.sectionPrices)}</a>`,
    `<a href="${esc(paymentPath)}">${esc(L.sectionPayment)}</a>`,
    `<a href="${esc(hubPath)}">${esc(pc.name)}</a>`,
    `<a href="/${lang}/projects/">${esc(L.navProjects)}</a>`,
  ];
  if (projectKey === "zed-west" && pageSlug !== "zed-west-price" && KEYWORD_COPY["zed-west"]) {
    const zwp = lang === "en" ? "/zed-west-price/" : "/ar/zed-west-price/";
    navBits.push(`<a href="${esc(zwp)}">${lang === "ar" ? "سعر زيد ويست" : "ZED West price"}</a>`);
  }
  if (pageSlug !== "zed-west-villas-for-sale" && projectKey === "zed-west") {
    const zwv = lang === "en" ? "/zed-west-villas-for-sale/" : "/ar/zed-west-villas-for-sale/";
    navBits.push(`<a href="${esc(zwv)}">${lang === "ar" ? "فيلات زيد ويست" : "ZED West villas"}</a>`);
  }
  const internalNav = `<p class="seo-inline-nav">${navBits.join(" · ")}</p>`;

  const snippetBlock = `<section class="section section--white section--top-answer" id="featured-price-answer"><div class="container"><h2 class="snippet-question">${esc(kc.snippetQ)}</h2><div class="aeo-answer"><p>${esc(kc.snippetA[0])}</p><p>${esc(kc.snippetA[1])}</p></div></div></section>`;

  const main = `<section class="hero" aria-labelledby="kw-h1"><div class="hero__bg" aria-hidden="true"><img src="${esc(firstImg)}" alt="${esc(primary.alt)}" width="1920" height="1080" sizes="100vw" fetchpriority="high" decoding="async" loading="eager" /><div class="hero__overlay"></div></div><div class="container hero-grid"><div><h1 id="kw-h1">${esc(kc.h1)}</h1><p class="hero-lead">${esc(heroLead)}</p>${trustStripHtml(L)}<div class="cta-row hero-cta-row"><a class="btn btn-primary btn--lg btn--hero-primary" href="#lead-form">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg hero-cta-row__ghost" href="${esc(hubPath)}#units">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg hero-cta-row__ghost" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></div></div><aside class="lead-card" id="lead-form"><h2>${esc(L.leadCardTitle)}</h2><p class="lead-card__sub">${esc(L.topFormTitle)}</p><p class="form-fast">${esc(L.formFastResponse)}</p><form class="js-lead-form" action="#" novalidate><div class="form-group"><label for="kw-pn-${lang}-${idSafe}">${esc(L.labelName)}</label><input id="kw-pn-${lang}-${idSafe}" name="name" type="text" autocomplete="name" required /></div><div class="form-group"><label for="kw-pp-${lang}-${idSafe}">${esc(L.labelPhone)}</label><input id="kw-pp-${lang}-${idSafe}" name="phone" type="tel" autocomplete="tel" required /></div>${leadBudgetFieldHtml(lang, L, `kw-${idSafe}`, "stacked")}<button class="btn btn-primary btn-block btn--lg" type="submit">${esc(L.ctaSubmit)}</button></form><p class="form-note form-note--privacy">${esc(L.formPrivacyShort)} <a href="/${lang}/privacy-policy/">${esc(L.navPrivacy)}</a>.</p></aside></div></section>
${snippetBlock}
<section class="section section--white" id="keyword-intro"><div class="container"><h2>${esc(h2Aeo)}</h2>${aeoTriadHtml(L, triad)}<div class="aeo-answer aeo-answer--narrative prose">${openParaHtml(kc.openPara)}${internalNav}</div></div></section>
<section class="section section--white" id="pricing"><div class="container prose"><h2>${esc(h2PriceSec)}</h2>${urgencyStripHtml(L)}${pc.pricesP}${table}<p class="seo-cta-inline"><a class="btn btn-primary" href="${esc(pricesPath)}">${esc(L.ctaGetPrices)}</a> <a class="btn btn-outline" href="${esc(paymentPath)}">${esc(L.unitsLinkPayment)}</a></p></div></section>
<section class="section" id="payment-breakdown"><div class="container prose"><h2>${esc(h2PaySec)}</h2>${pc.paymentP}<h3>${lang === "ar" ? "المراحل والجدول" : "Timeline & milestones"}</h3>${steps}<p class="seo-cta-inline"><a class="btn btn-primary" href="${esc(waHref)}" target="_blank" rel="noopener noreferrer">${esc(L.ctaBookWhatsApp)}</a></p></div></section>
<section class="section section--white"><div class="container prose"><h2>${esc(h2LocSec)}</h2>${pc.locP}</div></section>
<section class="section section--white" id="faq"><div class="container"><h2>${esc(h2FaqSec)}</h2><div class="faq-list">${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div></div></section>
${internalMoneyHubHtml(L, lang, h2Hub)}
<section class="cta-band"><div class="container"><h2>${esc(L.sectionFinalCta)}</h2><p>${esc(L.finalCtaText)}</p><div class="cta-row cta-row--spread"><a class="btn btn-primary btn--lg" href="#lead-form">${esc(L.ctaGetPrices)}</a><a class="btn btn-outline btn--lg cta-band__outline" href="${esc(hubPath)}#units">${esc(L.ctaViewUnits)}</a><a class="btn btn-outline btn--lg cta-band__outline" href="/${lang}/contact/">${esc(L.ctaRequestPlan)}</a></div><p class="cta-band__note"><a href="${esc(pricesPath)}">${esc(L.sectionPrices)}</a> · <a href="${esc(paymentPath)}">${esc(L.sectionPayment)}</a> · <a href="${esc(hubPath)}">${lang === "ar" ? "صفحة المشروع" : "Project hub"}</a>${pageSlug === "zed-west-villas-for-sale" ? ` · <a href="${esc(kwPriceHref)}">${lang === "ar" ? "سعر زيد ويست" : "ZED West price page"}</a>` : ""}</p></div></section>`;

  const baseUrl = siteUrl.replace(/\/$/, "");
  const pageUrl = baseUrl + canonicalPath;
  const offerDesc = L[meta.offerDescKey] || "";

  const breadcrumbItems = [
    { name: L.breadcrumbHome, href: `/${lang}/` },
    { name: L.navProjects, href: `/${lang}/projects/` },
    { name: pc.name, href: hubPath },
    { name: kc.h1, href: canonicalPath },
  ];

  const faqEntities = faqSchema(faqs.map((f) => ({ q: f.q, a: stripHtml(f.a) })));

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: pageUrl,
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
    faqEntities,
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
        url: pageUrl,
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

export function projectKeyForKeywordSlug(slug) {
  const raw = String(slug || "").replace(/\/$/g, "");
  const s = raw.includes("/") ? raw.split("/").filter(Boolean).pop() : raw;
  if (EXTRA_LANDING[s]) return EXTRA_LANDING[s].projectKey;
  for (const key of Object.keys(KEYWORD_COPY)) {
    if (KEYWORD_COPY[key].slug === s) return key;
  }
  return null;
}
