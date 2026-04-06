export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

/**
 * Exactly five FAQs per project page, tuned by URL variant (main | prices | payment).
 */
export function projectFaqs(lang, pc, meta, variant = "main") {
  const n = pc.name;
  const plan = lang === "ar" ? meta.planAr || meta.planEn : meta.planEn;
  const del = meta.delivery;

  if (lang === "ar") {
    if (variant === "prices") {
      return [
        { q: `ما الذي يحدد المقدم في ${n}؟`, a: `النوع، المساحة، الواجهة، والدور وموجة الإصدار. ${plan}` },
        { q: `هل أرقام ${n} على الموقع ملزمة؟`, a: "لا — التسويق استرشادي حتى يصدر عرض أسعار موقّع من أورا أو قناة معتمدة." },
        { q: `كيف أقارن بين الشقق والفيلات في ${n} من حيث السعر؟`, a: "راجع بطاقات الوحدات والجداول في صفحة الأسعار؛ ثم اطلب عرضاً موقّعاً للنمط الذي يهمك." },
        { q: `أين أجد خطة السداد المرتبطة بسعر ${n}؟`, a: `صفحة خطة السداد المخصّصة للمشروع توضح المراحل؛ الجدول الملزم يُرفق بعرض أورا.` },
        { q: `هل الأسعار بالجنيه المصري؟`, a: "نعم في التسويق المعتاد؛ راجع عملة عقدك إن اختلفت." },
      ];
    }
    if (variant === "payment") {
      return [
        { q: `كيف تُقسّط ${n} عادةً؟`, a: `${plan} التفاصيل الدقيقة تختلف حسب الإصدار والوحدة.` },
        { q: `متى تستحق الدفعة الثانية في ${n}؟`, a: "غالباً بعد مرحلة تعاقدية محددة (مثلاً نحو ٩٠ يوماً) — يثبت ذلك في عقدك وعرض أورا." },
        { q: `هل يمكن تقسيط حتى ١٠ سنوات في ${n}؟`, a: "بعض المخزون قد يسمح بذلك وفق سياسة أورا والموافقة عند الحجز؛ ليس تلقائياً لكل الوحدات." },
        { q: `أين صفحة الأسعار لمراجعة المقدم مع خطة ${n}؟`, a: "افتح صفحة الأسعار الخاصة بالمشروع لمقارنة المقدمات الاسترشادية مع المراحل." },
        { q: `ما المرجع الملزم لجدول ${n}؟`, a: "الجدول الموقّع من أورا مع عرض السعر أو عقد البيع — لا يكفي لقطة شاشة من الموقع." },
      ];
    }
    return [
      { q: `كم المقدم المطلوب في ${n}؟`, a: `يختلف حسب النوع والإصدار. ${plan}` },
      { q: `كيف تعمل خطة السداد في ${n}؟`, a: `${plan} الجدول النهائي في وثائق أورا الموقّعة.` },
      { q: `أين يقع ${n}؟`, a: "ضمن محفظة أورا في مصر؛ راجع قسم الموقع في الصفحة وثبّت على خرائط المطوّر." },
      { q: `هل ${n} مناسب لمحافظ عائلية أو استثمارية؟`, a: "يعتمد على الأفق والسيولة ومخاطر التسليم؛ استخدم الأرقام الاسترشادية ثم نمذج مع مستشارك وعقد أورا." },
      { q: `متى التسليم المتوقع لـ ${n}؟`, a: `الإرشاد الحالي ${del}، مع خضوع المواعيد لتقدم البناء وتعميمات أورا.` },
    ];
  }

  if (variant === "prices") {
    return [
      { q: `What shapes the down payment at ${n}?`, a: `Typology, scale, view band, floor plate, and release wave. ${plan}` },
      { q: `Are ${n} prices on this site binding?`, a: "No — marketing is indicative until ORA or an authorized channel issues a countersigned quotation." },
      { q: `How should I compare apartments versus villas at ${n}?`, a: "Use the typology cards and dedicated prices URL, then request a formal offer for the band you are underwriting." },
      { q: `Where is the payment plan that matches ${n} pricing?`, a: "Open this project’s payment plan page for milestone context; the enforceable calendar ships with your ORA pack." },
      { q: `Are ${n} figures quoted in EGP?`, a: "Yes for standard ORA marketing; confirm currency clauses if your SPA differs." },
    ];
  }
  if (variant === "payment") {
    return [
      { q: `How is ${n} typically installmentized?`, a: `${plan} Exact percentages follow the release tied to your unit.` },
      { q: `When is the second contractual tranche due at ${n}?`, a: "Usually after a defined post-signing milestone (often ~90 days) — your countersigned ORA schedule is the clock." },
      { q: `Can ${n} extend installments up to 10 years?`, a: "Select inventory may, subject to ORA credit policy at booking — not automatic for every typology." },
      { q: `Where do I cross-check equity entry with this ${n} schedule?`, a: "Use the project prices page for published down-payment bands alongside these milestones." },
      { q: `What document finalizes my ${n} payment plan?`, a: "The countersigned ORA matrix attached to your quotation or SPA — not a blog or third-party summary." },
    ];
  }
  return [
    { q: `What down payment should I expect at ${n}?`, a: `Equity entry moves by typology and release. ${plan}` },
    { q: `How does the ${n} payment plan work?`, a: `${plan} Binding cadence appears on developer-issued, countersigned paperwork.` },
    { q: `Where is ${n} located?`, a: "Within ORA’s Egypt portfolio — review the location section here and validate on official collateral." },
    { q: `Is ${n} appropriate for private wealth or family-office capital?`, a: "Many buyers pair flagship ORA product with long hold periods; underwrite liquidity, service charges, and delivery risk with your advisors." },
    { q: `When is delivery expected at ${n}?`, a: `Current guidance is ${del}, subject to construction progress and ORA notices.` },
  ];
}
