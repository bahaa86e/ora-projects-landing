/** @typedef {'en'} Lang */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectMediaPath = path.join(__dirname, "data", "project-media.json");
const PROJECT_MEDIA = JSON.parse(fs.readFileSync(projectMediaPath, "utf8"));

export const PROJECT_ORDER = ["zed-west", "zed-east", "solana-west", "solana-east", "silversands"];

/** Homepage + shared assets from ingest (`npm run images`). */
export const SITE_MEDIA = PROJECT_MEDIA.site || {};

export const PROJECTS = {
  "zed-west": {
    offerDescKey: "offerDescZedWest",
    folder: "zed-west",
    pricesFolder: "zed-west-prices",
    paymentFolder: "zed-west-payment-plan",
    unitsKey: "zed-west",
    planEn: "5% down payment + 5% after 3 months, up to 10 years installments.",
    planAr: "مقدّم تعاقدي ٥٪ ومقدّم ثانٍ ٥٪ بعد ٣ أشهر، ثم أقساط حتى ١٠ سنوات وفق البرنامج المعتمد لكل إصدار.",
    delivery: "Q1 2030",
    offerPrice: 487000,
    offerCurrency: "EGP",
    seoLocationEn: "Sheikh Zayed Egypt",
    seoLocationAr: "الشيخ زايد مصر",
    aeoEn: {
      price:
        "ZED West price in Egypt: indicative 1BR down payments from ~487K EGP on select releases; larger typologies higher. Net price on ORA countersigned offers only.",
      location: "Sheikh Zayed, Greater Cairo — ORA-branded towers, retail, schools, fast arterial access.",
      payment: "ZED West payment plan: typically 5% + 5% after three months, then installments up to 10 years where the release allows — confirm on ORA paperwork.",
    },
    aeoAr: {
      price:
        "سعر زيد ويست (جنيه مصري استرشادي): مقدمات ١ غرفة نحو ٤٨٧–٦٣٥ ألف؛ ٢–٣ غرف نحو ٨٥٨ ألف–١٫٤ مليون حسب الإصدار. الإجمالي يثبت في عرض أورا الموقّع.",
      location: "الشيخ زايد، القاهرة الكبرى — محور نمو مع تجزئة ومدارس ووصول سريع للمحاور.",
      payment: "خطة سداد زيد ويست: ٥٪ تعاقد و٥٪ بعد ثلاثة أشهر ثم أقساط حتى ١٠ سنوات للمخزون المؤهل.",
    },
  },
  "zed-east": {
    offerDescKey: "offerDescZedEast",
    folder: "zed-east",
    pricesFolder: "zed-east-prices",
    paymentFolder: "zed-east-payment-plan",
    unitsKey: "zed-east",
    planEn: "5% down + 5% after 3 months, up to 10 years.",
    planAr: "٥٪ مقدّم أولي و٥٪ بعد ٩٠ يوماً، ثم أقساط حتى ١٠ سنوات بما يتوافق مع سياسة أورا لكل مرحلة.",
    delivery: "Q1 2030",
    offerPrice: 590000,
    offerCurrency: "EGP",
    seoLocationEn: "New Cairo Egypt",
    seoLocationAr: "القاهرة الجديدة مصر",
    aeoEn: {
      price:
        "ZED East price (EGP): from ~590K down on compact 1BR to multi-million equity on townhomes — indicative ORA marketing bands.",
      location: "New Cairo — park-backed ORA towers and townhomes near business districts.",
      payment: "ZED East payment plan: 5% + 5% after ~90 days, then installments up to 10 years on eligible releases — verify on SPA.",
    },
    aeoAr: {
      price:
        "سعر زيد ايست (جنيه): من نحو ٥٩٠ ألف مقدم لشقق صغيرة حتى ملايين للتاون هاوس — الجدول يعكس نطاقات أورا المعلنة.",
      location: "القاهرة الجديدة — أبراج وتاون هاوس بمحور حدائق وقرب مناطق الأعمال.",
      payment: "خطة سداد زيد ايست: دفعتان ٥٪+٥٪ بعد نحو ٩٠ يوماً ثم أقساط شهرية أو ربع سنوية حتى ١٠ سنوات.",
    },
  },
  "solana-west": {
    offerDescKey: "offerDescSolanaWest",
    folder: "solana-west",
    pricesFolder: "solana-west-prices",
    paymentFolder: "solana-west-payment-plan",
    unitsKey: "solana-west",
    planEn: "Structured down payments with ORA-backed schedules; terms confirmed per unit band.",
    planAr: "دفعات مرتبة بإشراف أورا ومربوطة بمراحل المشروع؛ الشروط النهائية تثبت عند الحجز حسب فئة الوحدة.",
    delivery: "Q2–Q3 2029",
    offerPrice: 520000,
    offerCurrency: "EGP",
    seoLocationEn: "New Zayed Egypt",
    seoLocationAr: "زايد الجديد مصر",
    aeoEn: {
      price:
        "Solana West villas for sale (EGP): from ~520K down on select apartments; villas and bungalows require higher equity — ORA sheet is binding.",
      location: "New Zayed, Egypt — horizontal ORA community: villas, bungalows, low-rise stock.",
      payment: "Solana West payment plan: construction-linked ORA tranches per unit band — request the matrix for your release.",
    },
    aeoAr: {
      price:
        "أسعار سولانا زايد الجديدة: فيلات وبنغل وشقق منخفضة — مقدمات من ~٥٢٠ ألف لبعض ١ غرفة؛ الفيلات أعلى — يثبت في عرض أورا.",
      location: "زايد الجديد — مجتمع أفقي من أورا مع خصوصية فيلا وبنية قادمة.",
      payment: "خطة سداد سولانا ويست: دفعات مرتبطة بالإنشاءات بجدول رسمي لكل فئة وحدة.",
    },
  },
  "solana-east": {
    offerDescKey: "offerDescSolanaEast",
    folder: "solana-east",
    pricesFolder: "solana-east-prices",
    paymentFolder: "solana-east-payment-plan",
    unitsKey: "solana-east",
    planEn: "Phased down payments with long-tail installments subject to release.",
    planAr: "مقدمات على مراحل مع أقساط طويلة الأجل وفق كل إطلاق؛ يتم إرفاق الجدول الرسمي مع عرض السعر.",
    delivery: "Q1 2030",
    offerPrice: 560000,
    offerCurrency: "EGP",
    seoLocationEn: "New Cairo Egypt",
    seoLocationAr: "القاهرة الجديدة مصر",
    aeoEn: {
      price:
        "Solana East price (EGP): from ~560K down on smaller apartments through townhomes — indicative until ORA countersigns.",
      location: "New Cairo — apartments and townhomes on mature grids (schools, HQ access).",
      payment: "Solana East payment plan: phased ORA draws; some releases allow post-delivery tails — matrix per unit.",
    },
    aeoAr: {
      price:
        "أسعار سولانا القاهرة الجديدة: من ~٥٦٠ ألف مقدم للوحدات الأصغر حتى تاون هاوس أوسع — استرشادي حتى التوقيع من أورا.",
      location: "القاهرة الجديدة — شقق وتاون هاوس على شبكة طرق ناضجة.",
      payment: "خطة سداد: دفعات على مراحل مع أورا وذيل تقسيط بعد التسليم في بعض الإصدارات.",
    },
  },
  silversands: {
    offerDescKey: "offerDescSilversands",
    folder: "silversands",
    pricesFolder: "silversands-prices",
    paymentFolder: "silversands-payment-plan",
    unitsKey: "silversands",
    planEn: "5% down payment with quarterly installments; values from 27M to 128M EGP depending on typology.",
    planAr: "مقدّم ٥٪ مع أقساط ربع سنوية؛ الأسعار من حوالي ٢٧ مليون إلى ١٢٨ مليون جنيه حسب نوع الوحدة والموقع على البحر أو اللاجون.",
    delivery: "Phased handovers",
    offerPrice: 27000000,
    offerCurrency: "EGP",
    seoLocationEn: "North Coast Egypt",
    seoLocationAr: "الساحل الشمالي مصر",
    aeoEn: {
      price:
        "Silversands North Coast villas price (EGP): ~27M–128M by typology and frontage; 5% booking on ORA SPAs — confirm net on offer.",
      location: "Sidi Heneish, North Coast Egypt — ORA beach & lagoon masterplan.",
      payment: "Silversands payment plan: 5% booking, then equal quarterly installments to handover — per SPA.",
    },
    aeoAr: {
      price:
        "أسعار سيلفر ساندس الساحل (جنيه): نحو ٢٧–١٢٨ مليون حسب الشاليه أو الفيلا والواجهة — حجز ٥٪ بعقود أورا.",
      location: "سيدي حنيش، الساحل — مشروع أورا شاطئي ولاجون مع بنية متنامية.",
      payment: "خطة سداد: ٥٪ حجز ثم أقساط ربع سنوية متساوية حتى مراحل التسليم.",
    },
  },
};

for (const key of PROJECT_ORDER) {
  const m = PROJECT_MEDIA[key];
  if (!m?.hero?.length) {
    throw new Error(`tools/data/project-media.json: missing hero images for "${key}". Run: npm run images`);
  }
  PROJECTS[key].hero = m.hero;
  PROJECTS[key].amenities = m.amenities || [];
  PROJECTS[key].gallery = m.gallery || [];
}

/** Project page copy (English only) */
export const COPY = {
  en: {
    "zed-west": {
      name: "ZED West Sheikh Zayed",
      h1: {
        main: "ZED West Sheikh Zayed Prices & Payment Plan – 5% Down Payment",
        prices: "ZED West Price 2026 — From ~487K EGP Down (1BR Bands)",
        payment: "ZED West Payment Plan — 5% + 5% & Up to 10 Years",
      },
      metaTitle: {
        main: "ZED West Price Sheikh Zayed Egypt | ORA Developers Projects",
        prices: "ZED West Price Egypt | Down Payments & Villas Search | ORA",
        payment: "ZED West Payment Plan Egypt | 5%+5% Installments | ORA",
      },
      metaDesc: {
        main:
          "ZED West Sheikh Zayed: explore prices, payment plans, and apartments for sale in Egypt. Independent guide — confirm terms with ORA.",
        prices:
          "ZED West price bands in Egypt — indicative down payments by typology. Binding figures come from ORA countersigned offers only.",
        payment:
          "ZED West payment plan in Egypt: 5%+5% milestones and installments (typical published structure). Confirm your schedule on developer documents.",
      },
      sub: "From ~487K EGP down on select 1BR — typical published structure: 5% + 5% then installments up to 10 years (verify with ORA)",
      direct:
        "Searching “ZED West price”? Published down payments on selected 1-bedroom inventory start near 487,000 EGP and can reach roughly 635,000 EGP depending on view and floor, while larger typologies scale toward 858,000–1,400,000 EGP down. ORA structures the deal with 5% + 5% (after three months) plus installment programs up to 10 years where the release allows—ideal for end-users and Sheikh Zayed investors who want transparent entry tickets.",
      pricesP: `<p><strong>ZED West price clarity:</strong> use the unit cards for live typologies. Expect ~487K–635K EGP down on entry 1BR stock, stepping up for 2–3BR plates. Premium facings move the number—confirm the countersigned ORA offer before you reserve.</p>`,
      paymentP: `<p><strong>ZED West payment plan:</strong> 5% on contract, another 5% at the three-month milestone, then extended installments across up to a decade for qualifying buyers. Request the matrix for your unit band from ORA; this site summarizes common published patterns only.</p>`,
      locP: `<p>ZED West sits on Sheikh Zayed’s growth spine with fast access to arterials, retail, and international schools—strong for rental demand and long-term capital story.</p>`,
      amenP: `<p>Activated podiums, lagoon-inspired water features, jogging tracks, coworking lounges, and 24/7 security across a gated ORA masterplan.</p>`,
      whyP: `<p><strong>Investor lens:</strong> branded ORA towers in Sheikh Zayed have historically held secondary liquidity, supported by professional property management and predictable handovers—pair that with published ZED West price transparency to underwrite your entry.</p>`,
    },
    "zed-east": {
      name: "ZED East New Cairo",
      h1: {
        main: "ZED East New Cairo Prices & Payment Plan – 5% + 5% Down",
        prices: "ZED East Price — Apartments & Townhouses (from ~590K EGP Down)",
        payment: "ZED East Payment Plan — 5% + 5% After 90 Days, Up to 10 Years",
      },
      metaTitle: {
        main: "ZED East Price New Cairo Egypt | ORA Developers Projects",
        prices: "ZED East Price Egypt | Apartments & Townhomes | ORA",
        payment: "ZED East Payment Plan | New Cairo ORA Installments",
      },
      metaDesc: {
        main:
          "ZED East New Cairo: payment plan context, prices, and townhomes — independent orientation. Verify documentation with ORA before booking.",
        prices:
          "ZED East price snapshot in Egypt — apartments and townhomes. Indicative bands only; binding levels appear on ORA countersigned offers.",
        payment:
          "ZED East payment plan: two 5% ORA tranches and long-tail installments (typical). Confirm the schedule for your unit with the developer.",
      },
      sub: "From ~590K EGP down on published stock — 5% + 5% after ~90 days, then installments up to 10 years",
      direct:
        "If you are comparing ZED East prices against the ZED East payment plan, start here: published down payments open near 590,000 EGP on a ~75 sqm one-bedroom and climb past 1.9M EGP on ~200 sqm townhomes. ORA’s public playbook is 5% + 5% (after 90 days) with installment tails up to 10 years—strong for families upgrading in New Cairo and for investors who want park-backed inventory with documented milestones.",
      pricesP: `<p><strong>ZED East price check:</strong> scroll the unit matrix for typology, size, and indicative totals. Corners, park links, and release waves adjust the payable deposit—WhatsApp us to freeze the band that fits your strategy.</p>`,
      paymentP: `<p><strong>ZED East payment plan detail:</strong> expect two contractual tranches (5% + 5% after 90 days) then quarterly or monthly installments across as much as a decade, subject to ORA approval. Request the official schedule for the exact unit you want.</p>`,
      locP: `<p>Park-spine living in New Cairo with quick hops to business districts—appealing for executives and rental investors targeting East Cairo demand.</p>`,
      amenP: `<p>Park promenades, sports courts, kids’ clusters, and clubhouse assets sit inside the same master deed to protect service levels.</p>`,
      whyP: `<p><strong>Investor angle:</strong> documented ZED East payment plan mechanics plus diversified unit mix help you model cash flow and equity step-ups versus other East Cairo launches.</p>`,
    },
    "solana-west": {
      name: "Solana West New Zayed",
      h1: {
        main: "Solana West New Zayed Prices & Payment Plan – From ~520K EGP Down",
        prices: "Solana West Villas Price — Bungalows & Low-Rise ORA Stock",
        payment: "Solana West Payment Plan — Phased ORA Schedule",
      },
      metaTitle: {
        main: "Solana West Villas for Sale Egypt | ORA Developers New Zayed",
        prices: "Solana West Villas for Sale | Price Egypt | ORA",
        payment: "Solana West Payment Plan Egypt | ORA Phased Schedule",
      },
      metaDesc: {
        main:
          "Solana West villas for sale in New Zayed, Egypt: prices and phased ORA payment plans — independent summary. Confirm offers with ORA.",
        prices:
          "Solana West villas for sale — indicative New Zayed prices by typology. Binding sheets and staging come from ORA only.",
        payment:
          "Solana West payment plan: construction-linked ORA draws by unit band. Request current matrices from ORA or use this site’s inquiry form for general guidance.",
      },
      sub: "Villas, bungalows & low-rise — from ~520K EGP down on select 1BR; construction-linked ORA tranches per band",
      direct:
        "Looking for Solana West villas? This ORA community blends low-rise apartments, villas, and bungalows in New Zayed. Published entry points start near 520,000 EGP down on select one-bedroom releases, while villa and bungalow bands jump into multi-million equity checks that buy larger plots and privacy. Payment follows ORA’s phased, construction-linked collection—message us to match a villa typology to your capital plan.",
      pricesP: `<p><strong>Solana West villas & horizontal pricing:</strong> cards below break down indicative down payments by typology. Expect higher equity for villa and bungalow inventory in exchange for land ratio and outdoor living—confirm net payable on the official ORA sheet.</p>`,
      paymentP: `<p><strong>Solana West payment plan:</strong> staggered tranches tied to construction milestones, with optional extended tails for qualified buyers. Investors use these schedules to align equity deployment with delivery risk.</p>`,
      locP: `<p>New Zayed’s westward growth corridor keeps Solana West close to mature compounds and upcoming infrastructure—positive for long-term absorption.</p>`,
      amenP: `<p>Club tracks, landscaped buffers, and cycling lanes reinforce a resort-style daily experience.</p>`,
      whyP: `<p><strong>Why investors buy Solana West villas:</strong> horizontal ORA product captures privacy and land value while staying inside Greater Cairo’s demand pool—pair with transparent installment staging to size your exposure.</p>`,
    },
    "solana-east": {
      name: "Solana East New Cairo",
      h1: {
        main: "Solana East New Cairo Prices & Payment Plan – From ~560K EGP Down",
        prices: "Solana East Prices — 1BR to Townhouse (from ~560K EGP Down)",
        payment: "Solana East Installment Schedule — ORA Phasing",
      },
      metaTitle: {
        main: "Solana East Price & Payment Plan | New Cairo ORA",
        prices: "Solana East New Cairo Price | ORA Egypt",
        payment: "Solana East Payment Plan New Cairo | ORA Schedule",
      },
      metaDesc: {
        main:
          "Solana East New Cairo prices, apartments, and payment plans — independent guide. Explore typologies; verify guidance with ORA.",
        prices:
          "Solana East New Cairo prices by unit type — from compact apartments to townhomes. Figures are indicative until ORA countersigns your offer.",
        payment:
          "Solana East payment plan: phased ORA draws and tailored schedules. Confirm timing and percentages on developer-issued documentation.",
      },
      sub: "1BR through townhomes — phased ORA draws; obtain the binding payment matrix from ORA or an authorized channel",
      direct:
        "“Solana East prices” break down clearly in our unit cards: compact one-bedroom homes start near 560,000 EGP down, while larger townhomes and limited villas step into seven-figure equity tickets. The community mixes apartments, townhouses, and select villas for upgraders in New Cairo, all billed on ORA’s supervised schedule—strong for end-users and yield investors who want predictable payment rails.",
      pricesP: `<p><strong>Solana East prices at a glance:</strong> compare 1BR through townhouse cards for indicative totals and down payments. Corners, park frontage, and release timing can shift the deposit—get a countersigned quote before you commit capital.</p>`,
      paymentP: `<p><strong>Solana East payment rhythm:</strong> phased draws track construction, with moderated post-delivery tails on certain releases. Ask for the matrix that matches your unit band and investor horizon.</p>`,
      locP: `<p>Mature New Cairo road grids keep school and HQ commutes predictable—supporting rental demand if you are buying to let.</p>`,
      amenP: `<p>Tree-lined drives, shared workspaces, and wellness loops shorten daily errands on foot.</p>`,
      whyP: `<p><strong>Investor note:</strong> sustained East Cairo end-user demand plus disciplined service-charge frameworks help underwrite Solana East prices relative to peer compounds.</p>`,
    },
    silversands: {
      name: "Silversands North Coast",
      h1: {
        main: "Silversands North Coast Prices & Payment Plan – 5% Down Payment",
        prices: "Silversands North Coast Price — 27M–128M EGP Beach & Lagoon Stock",
        payment: "Silversands Payment Plan — 5% Down, Quarterly Installments",
      },
      metaTitle: {
        main: "Silversands North Coast Villas Price Egypt | ORA Beach Stock",
        prices: "Silversands North Coast Price | Villas & Chalets | ORA",
        payment: "Silversands Payment Plan | North Coast ORA Quarterly",
      },
      metaDesc: {
        main:
          "Silversands North Coast Egypt prices, villas, chalets, and 5% booking plans — independent overview. Confirm with ORA before committing.",
        prices:
          "Silversands North Coast Egypt prices — lagoon and beach stock. Indicative marketing bands; net payable is on ORA countersigned documentation.",
        payment:
          "Silversands payment plan: 5% booking plus quarterly ORA installments. Align schedules and pricing with your SPA and ORA sales channel.",
      },
      sub: "~27M–128M EGP by typology — 5% booking on ORA SPA, then equal quarterly installments to handover",
      direct:
        "Tracking “Silversands North Coast price”? ORA’s flagship coast line spans roughly 27M to 128M EGP depending on beach proximity, lagoon frontage, and villa scale. You enter with a 5% booking tranche, then follow equal quarterly installments through handover milestones—structured for investors targeting summer yield as well as buyers securing legacy beach homes.",
      pricesP: `<p><strong>Silversands North Coast price ladder:</strong> chalets anchor the entry band (~27M+), while signature beach villas approach the top (~128M). Lagoon rows and direct sea orientation command premiums—use the cards, then WhatsApp us to validate the exact lot.</p>`,
      paymentP: `<p><strong>Silversands payment plan:</strong> after the 5% booking payment, ORA’s SPAs stack equal quarterly installments with calendars attached to each contract—ideal for modeling cash calls on a North Coast investment.</p>`,
      locP: `<p>Sidi Heneish infrastructure keeps deepening while the masterplan preserves generous beach setbacks—supporting rental narratives and long-term asset quality.</p>`,
      amenP: `<p>Crystal lagoons, beach clubs, marina-ready services, and hospitality tie-ins elevate the experiential premium.</p>`,
      whyP: `<p><strong>Investor thesis:</strong> Silversands North Coast price transparency plus quarterly installment discipline help GCC and Egyptian capital allocate confidently into ORA’s Mediterranean pipeline.</p>`,
    },
  },
  ar: {
    "zed-west": {
      name: "زيد ويست — الشيخ زايد",
      h1: {
        main: "أسعار زيد ويست الشيخ زايد وخطة السداد — مقدم ٥٪",
        prices: "سعر زيد ويست ٢٠٢٦ — مقدم من ~٤٨٧ ألف جنيه (نطاق ١ غرفة)",
        payment: "خطة سداد زيد ويست — ٥٪ + ٥٪ حتى ١٠ سنوات",
      },
      metaTitle: {
        main: "سعر زيد ويست الشيخ زايد مصر | أورا",
        prices: "سعر زيد ويست مصر الشيخ زايد | أورا",
        payment: "خطة سداد زيد ويست الشيخ زايد | أورا",
      },
      metaDesc: {
        main:
          "سعر زيد ويست وشقق وفيلات للبيع في الشيخ زايد مصر — دليل مستقل؛ ثبّت الشروط مع أورا.",
        prices:
          "سعر زيد ويست في مصر: نطاقات مقدمات استرشادية حسب النمط. الأرقام الملزمة في عرض أورا الموقّع فقط.",
        payment:
          "خطة سداد زيد ويست في مصر: دفعتان ٥٪+٥٪ وأقساط (هيكل شائع معلن). أكّد جدولك على وثائق المطوّر.",
      },
      sub: "من ~٤٨٧ ألف جنيه مقدّماً لبعض ١ غرفة — هيكل معلن غالباً: ٥٪+٥٪ ثم أقساط حتى ١٠ سنوات (تحقق مع أورا)",
      direct:
        "إذا كنت تبحث عن «سعر زيد ويست»، الأرقام المعلنة تبدأ قرب ٤٨٧ ألف جنيه مقدّماً لبعض وحدات غرفة نوم واحدة وقد تمتد إلى نحو ٦٣٥ ألفاً حسب الواجهة والدور، بينما ٢–٣ غرف نوم تصعد نحو ٨٥٨ ألف — ١٫٤ مليون جنيه مقدّماً. أورا تربط العرض بهيكل ٥٪ + ٥٪ بعد ثلاثة أشهر وتقسيط حتى ١٠ سنوات حسب الإصدار — مناسب للسكن أو للمستثمر الذي يريد دخولاً واضحاً في الشيخ زايد.",
      pricesP: `<p><strong>وضوح سعر زيد ويست:</strong> استخدم بطاقات الوحدات للمساحات الحية. توقّع مقدّماً تقريباً ٤٨٧–٦٣٥ ألف جنيه لدخول ١ غرفة، مع صعود منطقي للألواح الأكبر. الواجهات المميزة ترفع السعر — ثبّت عرض أورا الموقّع قبل الحجز.</p>`,
      paymentP: `<p><strong>خطة سداد زيد ويست:</strong> ٥٪ عند التعاقد و٥٪ عند شهر الثالث، ثم أقساط ممتدة حتى عشر سنوات للملاءات المؤهلة. اطلب الجدول الرسمي للوحدة التي تستهدفها.</p>`,
      locP: `<p>موقع على محور نمو الشيخ زايد مع وصول سريع للمحاور والتجزئة والمدارس — جاذب للإيجار وللقيمة طويلة الأمد.</p>`,
      amenP: `<p>بوديمات، لاجون، ممرات جري، مساحات عمل مشتركة، وأمن ٢٤/٧ داخل مجتمع مسوّر.</p>`,
      whyP: `<p><strong>نظرة مستثمر:</strong> أبراج أورا في الشيخ زايد تحافظ تاريخياً على سيولة ثانوية مع إدارة موحّدة — اجمع ذلك مع شفافية سعر زيد ويست لتقدير نقطة دخولك.</p>`,
    },
    "zed-east": {
      name: "زيد إيست — القاهرة الجديدة",
      h1: {
        main: "أسعار زيد إيست القاهرة الجديدة وخطة السداد — ٥٪ + ٥٪ مقدم",
        prices: "سعر زيد إيست — شقق وتاون هاوس (مقدم من ~٥٩٠ ألف جنيه)",
        payment: "خطة سداد زيد إيست — ٥٪ + ٥٪ بعد ٩٠ يوماً حتى ١٠ سنوات",
      },
      metaTitle: {
        main: "سعر زيد ايست القاهرة الجديدة مصر | أورا",
        prices: "سعر زيد ايست مصر القاهرة الجديدة | أورا",
        payment: "خطة سداد زيد ايست القاهرة الجديدة | أورا",
      },
      metaDesc: {
        main:
          "سعر زيد ايست وخطة السداد وشقق وتاون هاوس — معلومات توجيهية مستقلة؛ تحقق من الوثائق مع أورا قبل الحجز.",
        prices:
          "سعر زيد ايست في مصر — لقطة استرشادية للشقق والتاون هاوس. المستويات الملزمة في عرض أورا الموقّع.",
        payment:
          "خطة سداد زيد ايست: دفعتان ٥٪ من أورا وأقساط طويلة. أكّد الجدول الخاص بوحدتك لدى المطوّر.",
      },
      sub: "من ~٥٩٠ ألف جنيه مقدّماً — ٥٪+٥٪ بعد ~٩٠ يوماً ثم أقساط حتى ١٠ سنوات",
      direct:
        "عند مقارنة أسعار زيد إيست بخطة سداد زيد إيست، ابدأ بالأرقام المعلنة: مقدمات من نحو ٥٩٠ ألف جنيه لشقة ~٧٥ م² غرفة نوم واحدة، وتتجاوز ١٫٩ مليون جنيه لتاون هاوس ~٢٠٠ م². المشروع يدور حول محور حدائق مع شقق وتاون هاوس وفيلات، ضمن برنامج أورا ٥٪+٥٪ بعد ٩٠ يوماً وأقساط حتى عشر سنوات — مناسب للترقي العائلي وللمستثمر الذي يريد جدولاً مفصلاً.",
      pricesP: `<p><strong>أسعار زيد إيست:</strong> راجع بطاقات الوحدات من ١ غرفة حتى التاون هاوس. الزوايا والواجهات الحديقة والموجة البيعية تعدّل المقدم — راسلنا لواتساب لتثبيت النطاق.</p>`,
      paymentP: `<p><strong>تفاصيل خطة سداد زيد إيست:</strong> دفعتان تعاقديتان (٥٪ + ٥٪ بعد ٩٠ يوماً) ثم أقساط شهرية أو ربع سنوية حتى عقد من الزمن بحسب الموافقة. اطلب الجدول الرسمي للوحدة المحددة.</p>`,
      locP: `<p>قرب محاور الأعمال مع مساحات خضراء واسعة — يدعم طلب الإيجار والسكن التنفيذي.</p>`,
      amenP: `<p>ممشى حدائق، ملاعب، أطفال، ونادي ضمن سند موحّد للصيانة.</p>`,
      whyP: `<p><strong>لمستثمر العقار:</strong> شفافية خطة سداد زيد إيست مع تنوع الوحدات يسهّل نمذجة التدفقات مقارنة بمشاريع أخرى في شرق القاهرة.</p>`,
    },
    "solana-west": {
      name: "سولانا ويست — زايد الجديد",
      h1: {
        main: "أسعار سولانا ويست زايد الجديد وخطة السداد — من ~٥٢٠ ألف جنيه مقدم",
        prices: "سعر فيلا سولانا ويست — بنغل وأورا زايد الجديد",
        payment: "خطة سداد سولانا ويست — مراحل إنشاء أورا",
      },
      metaTitle: {
        main: "أسعار سولانا زايد الجديدة فيلات مصر | أورا",
        prices: "فيلات سولانا ويست للبيع مصر | أورا",
        payment: "خطة سداد سولانا ويست مصر | أورا",
      },
      metaDesc: {
        main:
          "أسعار سولانا زايد الجديدة وفيلات وخطط سداد أورا — ملخص مستقل؛ أكّد العروض مع أورا.",
        prices:
          "أسعار سولانا زايد الجديدة — تسعير استرشادي للفيلات والبنغل. الجداول الملزمة تصدر من أورا.",
        payment:
          "خطة سداد سولانا ويست: دفعات مرتبطة بالإنشاءات من أورا. اطلب المصفوفة الحالية من أورا أو عبر نموذج الاستفسار هنا للمعلومات العامة.",
      },
      sub: "فيلات وبنغل وشقق منخفضة — من ~٥٢٠ ألف مقدّماً لبعض ١ غرفة؛ دفعات مرتبطة بالإنشاءات",
      direct:
        "يبحث المشترون عن «فيلات سولانا ويست» ضمن مجتمع أورا يجمع شققاً منخفضة وفيلات وبنغل في زايد الجديد. المقدمات المعلنة تبدأ نحو ٥٢٠ ألف جنيه لبعض إصدارات غرفة نوم واحدة، وتصعد بقوة مع الفيلات والبنغل مقابل مساحات أرض وأماكن معيشة أوسع. التحصيل يتبع مراحل أورا المرتبطة بالإنشاءات — راسلنا لمطابقة نوع الفيلا مع خطتك الرأسمالية.",
      pricesP: `<p><strong>تسعير فيلات سولانا ويست والأفقي:</strong> البطاقات توضح المقدم التقريبي لكل فئة. الفيلا والبنغل يتطلبان سيولة أعلى مقابل نسبة أرض وتجربة خصوصية — ثبّت العرض الرسمي من أورا.</p>`,
      paymentP: `<p><strong>خطة سداد سولانا ويست:</strong> دفعات على مراحل مرتبطة بالإنشاءات، مع إمكان تمديد لبعض الملاءات. المستثمر يستخدم الجدول لمواءمة الدفعات مع مخاطر التسليم.</p>`,
      locP: `<p>محور التوسع غرب القاهرة يربطك بمراكز جاهزة وبنية قادمة — داعم لاستيعاب الطلب.</p>`,
      amenP: `<p>مسارات مشي، حدائق عازلة، ودراجات بإيقاع منتجعي.</p>`,
      whyP: `<p><strong>لماذا فيلات سولانا ويست للاستثمار:</strong> منتج أفقي من أورا يجمع الخصوصية والأرض مع بقاء الطلب ضمن جاذبية القاهرة الكبرى.</p>`,
    },
    "solana-east": {
      name: "سولانا إيست — القاهرة الجديدة",
      h1: {
        main: "أسعار سولانا إيست القاهرة الجديدة وخطة السداد — من ~٥٦٠ ألف جنيه مقدم",
        prices: "أسعار سولانا إيست — من ١ غرفة حتى تاون هاوس (مقدم من ~٥٦٠ ألف جنيه)",
        payment: "جدول أقساط سولانا إيست — مراحل أورا",
      },
      metaTitle: {
        main: "أسعار سولانا القاهرة الجديدة مصر | أورا",
        prices: "أسعار سولانا القاهرة الجديدة | أورا مصر",
        payment: "خطة سداد سولانا إيست القاهرة | أورا",
      },
      metaDesc: {
        main:
          "أسعار سولانا القاهرة الجديدة وشقق وخطط سداد — دليل مستقل؛ راجع الأنماط وثبّت التفاصيل مع أورا.",
        prices:
          "أسعار سولانا القاهرة الجديدة حسب نوع الوحدة — من الشقق الصغيرة للتاون هاوس. الأرقام استرشادية حتى توقيع أورا.",
        payment:
          "خطة سداد سولانا إيست: دفعات على مراحل من أورا. أكّد النسب والمواعيد على وثائق المطوّر الرسمية.",
      },
      sub: "من ١ غرفة حتى تاون هاوس — دفعات على مراحل؛ الجدول الملزم من أورا أو قناة معتمدة",
      direct:
        "عند البحث عن «أسعار سولانا إيست»، البطاقات توضح المقدم التقريبي: يبدأ نحو ٥٦٠ ألف جنيه للوحدات الأصغر، ويتصاعد إلى ملايين للتاون هاوس الأوسع والفيلات المحدودة. المشروع يمزج شققاً وتاون هاوس وفيلات لعائلات تترقى في القاهرة الجديدة، مع تقويم تحصيل بإشراف أورا — مناسب للسكن وللمستثمر الذي يريد مسار دفعات واضحاً.",
      pricesP: `<p><strong>لمحة أسعار سولانا إيست:</strong> قارن ١ غرفة حتى التاون هاوس في الجدول. الزوايا والواجهات الحديقة تغيّر المقدم — احصل على عرض موقّع قبل الالتزام.</p>`,
      paymentP: `<p><strong>إيقاع سداد سولانا إيست:</strong> دفعات متزامنة مع الإنشاءات، مع ذيل تقسيط معتدل بعد التسليم في بعض الإصدارات. اطلب المصفوفة المناسبة لأفقك الاستثماري.</p>`,
      locP: `<p>شبكة طرق ناضجة تخدم المدارس والمقرات — داعم لطلب التأجير.</p>`,
      amenP: `<p>شوارع مزروعة، عمل مشترك، ومسارات عافية.</p>`,
      whyP: `<p><strong>للمستثمر:</strong> طلب المستخدم النهائي المستمر في شرق القاهرة وهيكلة رسوم معقولة تدعم تسعير أسعار سولانا إيست مقارنة بالأقران.</p>`,
    },
    silversands: {
      name: "سيلفرساندز — الساحل الشمالي",
      h1: {
        main: "أسعار سيلفرساندز الساحل الشمالي وخطة السداد — مقدم حجز ٥٪",
        prices: "سعر سيلفرساندز الساحل — ٢٧–١٢٨ مليون جنيه شاليهات وفيلات",
        payment: "خطة سداد سيلفرساندز — ٥٪ مقدم وأقساط ربع سنوية",
      },
      metaTitle: {
        main: "أسعار سيلفر ساندس الساحل مصر | أورا",
        prices: "سعر سيلفر ساندس الساحل مصر | أورا",
        payment: "خطة سداد سيلفرساندز الساحل | أورا",
      },
      metaDesc: {
        main:
          "أسعار سيلفر ساندس الساحل وفيلات وشاليهات وخطط حجز ٥٪ — نظرة عامة مستقلة؛ أكّد مع أورا قبل الالتزام.",
        prices:
          "أسعار سيلفر ساندس الساحل — مخزون لاجون وشاطئ. نطاقات تسويقية؛ الصافي في وثائق أورا الموقّعة.",
        payment:
          "خطة سداد سيلفرساندز: حجز ٥٪ وأقساط ربع سنوية من أورا. ثبّت الجدول مع عقدك وقنوات مبيعات أورا.",
      },
      sub: "~٢٧–١٢٨ مليون جنيه حسب النوع — حجز ٥٪ بعقد أورا ثم أقساط ربع سنوية حتى التسليم",
      direct:
        "من يتابع «سعر سيلفرساندز الساحل الشمالي» يجد محفظة أورا المتوسطية بين نحو ٢٧ و١٢٨ مليون جنيه بحسب القرب من البحر، صف اللاجون، ومساحة الفيلا. الدخول بمقدّم حجز ٥٪ ثم أقساط ربع سنوية متساوية حتى مراحل التسليم — يناسب باحثي عائد صيفي وراغبي حيازة شاطئية فاخرة.",
      pricesP: `<p><strong>سلم سعر سيلفرساندز:</strong> الشاليهات عند الطرف الأدنى (~٢٧ مليون+) والفيلات التوقيعية نحو الطرف الأعلى (~١٢٨ مليون). صفوف اللاجون والبحر المباشر تحمل علاوة — راسلنا لتثبيت اللوت.</p>`,
      paymentP: `<p><strong>خطة سداد سيلفرساندز:</strong> بعد ٥٪ الحجز، عقود أورا تعتمد أقساطاً ربع سنوية متساوية مع جداول مرفقة بكل عقد — مفيدة لنمذجة الاستدعاءات النقدية لمحفظة ساحلية.</p>`,
      locP: `<p>سيدي حنيش يستفيد من تطوير البنية مع عمق شاطئ سخي — يدعم جودة الأصل على المدى الطويل.</p>`,
      amenP: `<p>لاجون، نوادي شاطئية، خدمات بحرية، وشراكات ضيافة ترفع القيمة التجربية.</p>`,
      whyP: `<p><strong>أطروحة استثمار:</strong> وضوح سعر سيلفرساندز الساحل مع انضباط الأقساط الربعية يساعد رؤوس أموال الخليج ومصر على تخصيص السيولة في خط أنابيب أورا المتوسطي.</p>`,
    },
  },
};

export const PROJECT_COPY = COPY.en;

export function projectCopyForLang(lang) {
  return COPY[lang] || COPY.en;
}
