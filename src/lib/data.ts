export type CategorySlug = "supplements" | "weight-loss" | "hair-care" | "dental";

export type Category = {
  slug: CategorySlug;
  title: string;
  subtitle: string;
  imageHint: string;
  /** تعريف المسار يظهر أعلى صفحة التصنيف */
  introAr: string;
  featuredProductId: string;
  /** فيديو توضيحي طويل أسفل المنتجات — استبدِل المعرف برابط فيميو الخاص بك */
  explainerVimeoId: string;
  /** عنوان يظهر فوق مشغّل الفيديو */
  explainerVideoTitleAr: string;
  /** اسم الفيديو / وصف قصير تحت العنوان */
  explainerVideoNameAr: string;
};

export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string;
  category: CategorySlug;
  name: string;
  bio: string;
  priceIQD: number;
  image: string;
  /** صور الكاروسيل — أضف المسارات هنا بعد رفع الصور إلى public/products/ */
  gallery?: string[];
  specs: ProductSpec[];
  howToUseVimeoId: string;
  /** بطاقة «قريباً» — غير قابلة للنقر */
  comingSoon?: boolean;
};

/** صور العرض: الكاروسيل إن وُجد، وإلا الصورة الرئيسية */
export function getProductGallery(product: Product): string[] {
  if (product.gallery && product.gallery.length > 0) return product.gallery;
  return [product.image];
}

export type ProductLineVariant = {
  id: string;
  name: string;
  note: string;
  priceIQD: number;
};

export type ProductLine = {
  id: string;
  category: CategorySlug;
  title: string;
  subtitle: string;
  explainerVimeoId: string;
  explainerVideoTitleAr: string;
  explainerVideoNameAr: string;
  /** أنواع / أيتمات الخط */
  variants: ProductLineVariant[];
};

export type Review = {
  id: string;
  name: string;
  comment: string;
  rating: 1 | 2 | 3 | 4 | 5;
};


/** عنوان الهيرو الرئيسي */
export const heroHeadlineAr = "SHARK TEAM - القمة في التغذية والتدريب";

/** نبذة الفريق (النص الأصلي) */
export const arabicBioPlaceholder =
  "فريق عراقي يجمع الخبرة الطبية والرياضية. أطباء ومدربون متخصصون يقدمون لك خارطة طريق لجسم مثالي عبر استشارات علمية ومكملات أصلية.";

/** معرّف فيميو افتراضي للفيديوهات التوضيحية — استبدله في الإنتاج */
export const PLACEHOLDER_VIMEO_ID = "76979871";

export const categories: Category[] = [
  {
    slug: "supplements",
    title: "بروتينات",
    subtitle: "بناء عضل • تعافٍ أسرع • قوة أوضح",
    imageHint: "supplements icon",
    introAr:
      "المكملات الغذائية هي مواد تُضاف للنظام الغذائي لدعم الحاجة اليومية من فيتامينات أو معادن أو بروتينات — بجرعات مناسبة وبعد استشارة، خصوصاً إن كنت تتبع تمريناً أو تعافياً بعد إرهاق. في SHARK TEAM نربط اختيار المكمل بخطة واضحة: هدفك، وقت التناول، والتناغم مع أي وضع صحي — مع منتجات أصلية وطلب عبر واتساب يتضمن استشارة قبل الشراء.",
    featuredProductId: "sup-protein",
    explainerVimeoId: PLACEHOLDER_VIMEO_ID,
    explainerVideoTitleAr: "فيديو توضيحي عن المنتج",
    explainerVideoNameAr: "نظرة عامة على المكملات الغذائية وطريقة الاختيار الآمن",
  },
  {
    slug: "weight-loss",
    title: "حوارق دهون",
    subtitle: "أيض أنشط • طاقة أوضح • تنشيف منتظم",
    imageHint: "weight loss icon",
    introAr:
      "مسار إنقاص الوزن عندنا يجمع بين فهم طاقتك اليومية، النشاط، والالتزام الغذائي — وليس وصفات سريعة مبهمة. نقدّم خيارات دعم مدروسة ضمن خطّة يمكن متابعتها، مع استشارة لتحديد ما يناسب جسمك وتوقيتك. الطلب يبقى عبر واتساب مع توجيه قبل الشراء لضمان اختيار أنسب لمسارك.",
    featuredProductId: "wl-burner",
    explainerVimeoId: PLACEHOLDER_VIMEO_ID,
    explainerVideoTitleAr: "فيديو توضيحي عن المنتج",
    explainerVideoNameAr: "شرح مبسّط لمسار إنقاص الوزن والمتابعة اليومية",
  },
  {
    slug: "hair-care",
    title: "منتجات الشعر",
    subtitle: "جذور أقوى • لمعان صحّي ومظهر أوضح",
    imageHint: "hair care icon",
    introAr:
      "العناية بالشعر تبدأ من فروة صحية وروتين مناسب لنوع شعرك وللإجهاد الحراري أو الكيميائي. نقدّم منتجات موجهة للتقوية واللمعان والدعم عند الحاجة، مع نصائح استخدام عبر الاستشارة. اختيار المنتج يتم بعد تواصل سريع على واتساب لضمان التوافق مع وضعك.",
    featuredProductId: "hair-supplement",
    explainerVimeoId: PLACEHOLDER_VIMEO_ID,
    explainerVideoTitleAr: "فيديو توضيحي عن المنتج",
    explainerVideoNameAr: "كيف تبني روتين عناية بالشعر يتناسب مع يومك",
  },
  {
    slug: "dental",
    title: "منتجات الأسنان",
    subtitle: "ابتسامة أنظف • عناية يومية ومريحة",
    imageHint: "dental icon",
    introAr:
      "العناية بالأسنان اليومية تقلل تراكم البلاك وتدعم لثة مريحة وابتسامة أوضح. نختار منتجات تدعم التنظيف أو التنعيم أو الانتعاش ضمن استخدام منتظم — دون استبدال زيارة طبيب الأسنان عند الحاجة. الطلب عبر واتساب يشمل توجيهاً قصيراً قبل الشراء لاختيار الأنسب لك.",
    featuredProductId: "dent-white",
    explainerVimeoId: PLACEHOLDER_VIMEO_ID,
    explainerVideoTitleAr: "فيديو توضيحي عن المنتج",
    explainerVideoNameAr: "نصائح ومرئيات لروتين يومي للعناية بالأسنان",
  },
];

export const products: Product[] = [
  // ── البروتينات ───────────────────────────────────────────────────
  {
    id: "sup-protein",
    category: "supplements",
    name: "بروتين",
    bio: [
      "شارك أيزو بروتين — 100% Pure Iso Protein لبناء العضل والتعافي.",
      "٢٤ غرام بروتين بمغرفة واحدة، ١١٠ سعرة حرارية فقط، بنكهة الشوكولاتة.",
    ].join(" "),
    priceIQD: 52000,
    image: "/products/shark-protein-carousel-1.png",
    gallery: [
      "/products/shark-protein-carousel-1.png",
      "/products/shark-protein-carousel-2.png",
    ],
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجرعة", value: "مغرفة واحدة" },
      { label: "التوقيت", value: "بعد التمرين أو وجبة خفيفة" },
      { label: "الهدف", value: "بناء عضل وتعافٍ" },
    ],
  },
  {
    id: "sup-creatine",
    category: "supplements",
    name: "كرياتين",
    bio: [
      "كرياتين أحادي هيدرات Micronized لرفع الطاقة والقوة وتحمل التمارين.",
      "يدعم بناء عضل نظيف — ٣ غرامات للجرعة، ٨٤ حصة بالعلبة.",
    ].join(" "),
    priceIQD: 45000,
    image: "/products/creatine-shark.png",
    gallery: ["/products/creatine-shark.png", "/products/creatine-shark-carousel-2.png"],
    howToUseVimeoId: "76979871",
    specs: [
      { label: "حجم الجرعة", value: "٥ غرامات" },
      { label: "أفضل وقت", value: "بعد التمرين أو وقت مناسب" },
      { label: "الهدف", value: "قوة واندفاع" },
    ],
  },
  {
    id: "sup-shark-sleep",
    category: "supplements",
    name: "Shark Sleep",
    bio: [
      "مكمّل يساعد على تعديل الساعة البيولوجية والنوم والاستشفاء الكامل للعضلات أثناء النوم.",
      "٦٠ علكة — جرعتان يومياً قبل النوم أو حسب توجيه الاستشارة.",
    ].join(" "),
    priceIQD: 48000,
    image: "/products/shark-sleep-1.png",
    gallery: ["/products/shark-sleep-1.png", "/products/shark-sleep-2.png"],
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الشكل", value: "علكات (Gummies)" },
      { label: "الجرعة", value: "علكتان" },
      { label: "التوقيت", value: "قبل النوم" },
      { label: "الهدف", value: "نوم أعمق واستشفاء" },
    ],
  },

  // ── حوارق الدهون ─────────────────────────────────────────────────
  {
    id: "wl-burner",
    category: "weight-loss",
    name: "شارك بيرنر",
    bio: [
      "أفضل قاطع شهية وحارق دهون تركيبياً، يعمل بطريقة مميزة تعتمد على تكاتف المكونات معاً لتنشيط الأيض وتقليل مقاومة الأنسولين وقطع الشهية وتحسين حرق الدهون.",
      "قطع الشهية يبدأ من اليوم الأول بمعدل ٧٠٪ — نسبة تعادل علاجات قوية مثل أبر التنحيف (منجارو) وعمليات قص المعدة.",
      "شارك بيرنر بمعايير طبية أكثر: قاطع شهية ممتاز وحارق دهون جيد. يمكن لأصحاب الأمراض المزمنة استخدامه لاحتوائه تراكيز أقل من شارك بيرنر الاعتيادي.",
      "⚠️ يجب الاطلاع على التحذيرات وشروط الاستخدام ومراجعة الكادر الطبي والتأكد من إمكانية الاستخدام عبر رابط الواتساب ⚠️",
    ].join("\n\n"),
    priceIQD: 42000,
    image: "/products/shark-burner.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "حجم الجرعة", value: "كبسولة واحدة" },
      { label: "أفضل وقت", value: "الصباح" },
      { label: "الهدف", value: "تنشيف وتقويم الوزن" },
    ],
  },
  {
    id: "wl-burner-medical",
    category: "weight-loss",
    name: "Shark Boiler",
    bio: "تركيبة متقدّمة بمكوّنات مدروسة لدعم برنامج إنقاص الوزن مع متابعة الاستشارة.",
    priceIQD: 55000,
    image: "/products/shark-boiler.png",
    gallery: ["/products/shark-boiler.png"],
    comingSoon: true,
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجرعة", value: "حسب التوصية" },
      { label: "التوقيت", value: "صباحاً قبل الوجبة" },
      { label: "الهدف", value: "دعم مكثّف للتنشيف" },
    ],
  },
  {
    id: "wl-x",
    category: "weight-loss",
    name: "شارك أكس",
    bio: "خيار قوي لتحفيز الأيض والنشاط ضمن برنامج غذائي ورياضي منتظم.",
    priceIQD: 48000,
    image: "/products/shark-x-carousel-1.png",
    gallery: [
      "/products/shark-x-carousel-1.png",
      "/products/shark-x-carousel-2.png",
    ],
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجرعة", value: "كبسولة يومياً" },
      { label: "التوقيت", value: "قبل التمرين" },
      { label: "الهدف", value: "تنشيف وطاقة" },
    ],
  },

  // ── العناية بالشعر ──────────────────────────────────────────────
  {
    id: "hair-supplement",
    category: "hair-care",
    name: "شارك سبلمنت",
    bio: [
      "مكمّل فيتامينات ومعادن متعددة — ٣٠ حبة.",
      "D3 بجرعة ٥٠٠٠ IU، معادن كاملة وفيتامينات لدعم الشعر والطاقة والأيض أثناء الحمية.",
    ].join(" "),
    priceIQD: 38000,
    image: "/products/shark-supplement.png",
    gallery: [
      "/products/shark-supplement.png",
      "/products/shark-supplement-carousel-2.png",
    ],
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجرعة", value: "كبسولة يومياً" },
      { label: "التوقيت", value: "مع وجبة الإفطار" },
      { label: "الهدف", value: "تغذية الشعر من الداخل" },
    ],
  },
  {
    id: "hair-loss-shampoo",
    category: "hair-care",
    name: "شامبو تساقط",
    bio: "شامبو متخصّص لتقوية بصيلات الشعر والحدّ من التساقط الموسمي.",
    priceIQD: 32000,
    image: "/placeholders/product-demo.png",
    comingSoon: true,
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الاستخدام", value: "٣–٤ مرات أسبوعياً" },
      { label: "نوع الشعر", value: "جميع الأنواع" },
      { label: "الهدف", value: "تقليل التساقط" },
    ],
  },
  {
    id: "hair-dandruff-shampoo",
    category: "hair-care",
    name: "شامبو قشرة",
    bio: "شامبو فعّال ضد القشرة لفروة نظيفة ومرتاحة مع الاستخدام المنتظم.",
    priceIQD: 30000,
    image: "/placeholders/product-demo.png",
    comingSoon: true,
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الاستخدام", value: "مرتين أسبوعياً" },
      { label: "النوع", value: "علاجي" },
      { label: "الهدف", value: "علاج القشرة" },
    ],
  },
  {
    id: "hair-conditioner",
    category: "hair-care",
    name: "مكيف قشرة",
    bio: "مكيّف مغذٍّ يمنح الشعر نعومة ولمعاناً صحياً بعد كل غسلة.",
    priceIQD: 28000,
    image: "/placeholders/product-demo.png",
    comingSoon: true,
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الاستخدام", value: "بعد الشامبو" },
      { label: "المدة", value: "٢–٣ دقائق" },
      { label: "الهدف", value: "نعومة ولمعان" },
    ],
  },
  {
    id: "dent-white",
    category: "dental",
    name: "شارك ابتسامة ناصعة",
    bio: "دعم ترطيب ومظهر أفتح للأسنان بلطف واحترام للاستخدام اليومي.",
    priceIQD: 25000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجدول", value: "مرتان يومياً" },
      { label: "الطعم", value: "نعناع منعش" },
      { label: "الهدف", value: "ابتسامة أوضح" },
    ],
  },
  {
    id: "dent-care",
    category: "dental",
    name: "شارك للعناية باللثة",
    bio: "عناية تهدّئ اللثة وترافق نظافة الفم اليومية بشكل مريح.",
    priceIQD: 22000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجدول", value: "بعد التفريش" },
      { label: "الاستخدام", value: "مضمضة ٣٠–٦٠ ثانية" },
      { label: "الهدف", value: "راحة للثة" },
    ],
  },
  {
    id: "dent-strip",
    category: "dental",
    name: "شارك شرائط تبييض لطيفة",
    bio: "شرائط منزلية لابتسامة أفتح عند الالتزام بتعليمات الاستخدام.",
    priceIQD: 18000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "المدة", value: "حسب العلبة — دقائق محددة" },
      { label: "التكرار", value: "دورة قصيرة متابعة" },
      { label: "الهدف", value: "تبييض تدريجي" },
    ],
  },
  {
    id: "dent-floss",
    category: "dental",
    name: "شارك خيط أسنان بالنعناع",
    bio: "خيط أسنان منعش لتنظيف ما بين الأسنان ضمن العناية اليومية.",
    priceIQD: 9000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الاستخدام", value: "يومياً بعد الوجبات" },
      { label: "الطول", value: "علبة عملية للحمل" },
      { label: "الهدف", value: "تنظيف بين الأسنان" },
    ],
  },
];

const PRODUCT_LINE_SUFFIXES = ["a", "b", "c"] as const;

/** عناوين الخطوط الثلاثة لكل تصنيف — تقدر تستبدلها لاحقاً من هنا */
const productLineTitlesByCategory: Record<CategorySlug, [string, string, string]> = {
  supplements: ["بروتين أ", "بروتين ب", "بروتين ج"],
  "weight-loss": ["حارق دهون أ", "حارق دهون ب", "حارق دهون ج"],
  "hair-care": ["منتج شعر أ", "منتج شعر ب", "منتج شعر ج"],
  dental: ["عناية أسنان أ", "عناية أسنان ب", "عناية أسنان ج"],
};

function buildProductLines(): ProductLine[] {
  const out: ProductLine[] = [];
  for (const cat of categories) {
    const titles = productLineTitlesByCategory[cat.slug];
    PRODUCT_LINE_SUFFIXES.forEach((suffix, idx) => {
      const title = titles[idx];
      const base = `${cat.slug}-${suffix}`;
      out.push({
        id: base,
        category: cat.slug,
        title,
        subtitle: `خط منتج ضمن «${cat.title}» — الأنواع أدناه قابلة للتعديل لاحقاً من ملف البيانات.`,
        explainerVimeoId: PLACEHOLDER_VIMEO_ID,
        explainerVideoTitleAr: `فيديو شرح — ${title}`,
        explainerVideoNameAr: "لمحة عن الأنواع المتوفرة وكيفية الاختيار مع الاستشارة.",
        variants: [
          {
            id: `${base}-v1`,
            name: "النوع ١",
            note: "وصف قصير للنوع — يُحدَّث لاحقاً حسب مخزونك الفعلي.",
            priceIQD: 36000 + idx * 2000 + (suffix === "a" ? 0 : suffix === "b" ? 1500 : 3000),
          },
          {
            id: `${base}-v2`,
            name: "النوع ٢",
            note: "يمكن ربطه بروتين مختلف أو تركيز آخر حسب خطتك.",
            priceIQD: 39000 + idx * 2000,
          },
          {
            id: `${base}-v3`,
            name: "النوع ٣",
            note: "خيار إضافي للمقارنة قبل الطلب عبر واتساب.",
            priceIQD: 42000 + idx * 1500,
          },
        ],
      });
    });
  }
  return out;
}

export const productLines: ProductLine[] = buildProductLines();

export function getProductLinesByCategory(slug: CategorySlug) {
  return productLines.filter((l) => l.category === slug);
}

export function getProductLine(categorySlug: CategorySlug, lineId: string) {
  return productLines.find((l) => l.category === categorySlug && l.id === lineId);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}

export function getProductById(productId: string) {
  return products.find((p) => p.id === productId);
}

export const seededReviews: Review[] = Array.from({ length: 52 }).map((_, i) => {
  const names = [
    "علي",
    "حيدر",
    "زهراء",
    "نور",
    "محمد",
    "حسن",
    "سجاد",
    "فاطمة",
    "زينب",
    "مرتضى",
    "مصطفى",
    "عباس",
  ];
  const comments = [
    "الصراحة فرق وياي، شغل مرتب.",
    "تعاملهم كلش راقي واستشارة مفيدة.",
    "وصل بسرعة والتغليف يجنّن.",
    "منتج أصلي ونتيجته تبين ويا الاستمرار.",
    "جربته أسبوعين وحسّيت فرق بالطاقة.",
    "نصيحتهم على الواتساب كلش ساعدتني أختار الصح.",
    "طعم لطيف وما يسببلي تعب.",
    "ممتاز للروتين اليومي، أنصح.",
    "خدمة سريعة وحلوة، ما قصّروا.",
    "خيار قوي إذا ملتزم بالأكل والتمرين.",
  ];
  const name = names[i % names.length];
  const comment = comments[i % comments.length];
  const rating = ((i % 5) + 1) as Review["rating"];
  const boosted = rating < 4 ? (4 as Review["rating"]) : rating;
  return {
    id: `seed-${i + 1}`,
    name,
    comment: i % 7 === 0 ? `${comment} والله خوش تجربة.` : comment,
    rating: boosted,
  };
});
