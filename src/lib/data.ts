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
  specs: ProductSpec[];
  howToUseVimeoId: string;
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
    title: "مكملات غذائية",
    subtitle: "أداء أعلى • تعافٍ أسرع • قوة أوضح",
    imageHint: "supplements icon",
    introAr:
      "المكملات الغذائية هي مواد تُضاف للنظام الغذائي لدعم الحاجة اليومية من فيتامينات أو معادن أو بروتينات — بجرعات مناسبة وبعد استشارة، خصوصاً إن كنت تتبع تمريناً أو تعافياً بعد إرهاق. في SHARK TEAM نربط اختيار المكمل بخطة واضحة: هدفك، وقت التناول، والتناغم مع أي وضع صحي — مع منتجات أصلية وطلب عبر واتساب يتضمن استشارة قبل الشراء.",
    featuredProductId: "sup-omega",
    explainerVimeoId: PLACEHOLDER_VIMEO_ID,
    explainerVideoTitleAr: "فيديو توضيحي عن المنتج",
    explainerVideoNameAr: "نظرة عامة على المكملات الغذائية وطريقة الاختيار الآمن",
  },
  {
    slug: "weight-loss",
    title: "إنقاص الوزن",
    subtitle: "وزن أنسب • طاقة أوضح • خطة تمشي وياك يومياً",
    imageHint: "weight loss icon",
    introAr:
      "مسار إنقاص الوزن عندنا يجمع بين فهم طاقتك اليومية، النشاط، والالتزام الغذائي — وليس وصفات سريعة مبهمة. نقدّم خيارات دعم مدروسة ضمن خطّة يمكن متابعتها، مع استشارة لتحديد ما يناسب جسمك وتوقيتك. الطلب يبقى عبر واتساب مع توجيه قبل الشراء لضمان اختيار أنسب لمسارك.",
    featuredProductId: "wl-burn",
    explainerVimeoId: PLACEHOLDER_VIMEO_ID,
    explainerVideoTitleAr: "فيديو توضيحي عن المنتج",
    explainerVideoNameAr: "شرح مبسّط لمسار إنقاص الوزن والمتابعة اليومية",
  },
  {
    slug: "hair-care",
    title: "العناية بالشعر",
    subtitle: "جذور أقوى • لمعان صحّي ومظهر أوضح",
    imageHint: "hair care icon",
    introAr:
      "العناية بالشعر تبدأ من فروة صحية وروتين مناسب لنوع شعرك وللإجهاد الحراري أو الكيميائي. نقدّم منتجات موجهة للتقوية واللمعان والدعم عند الحاجة، مع نصائح استخدام عبر الاستشارة. اختيار المنتج يتم بعد تواصل سريع على واتساب لضمان التوافق مع وضعك.",
    featuredProductId: "hair-growth",
    explainerVimeoId: PLACEHOLDER_VIMEO_ID,
    explainerVideoTitleAr: "فيديو توضيحي عن المنتج",
    explainerVideoNameAr: "كيف تبني روتين عناية بالشعر يتناسب مع يومك",
  },
  {
    slug: "dental",
    title: "العناية بالأسنان",
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
  {
    id: "sup-omega",
    category: "supplements",
    name: "شارك أوميغا+",
    bio: "خليط أوميغا مختار بعناية لدعم الصحة اليومية والتعافي والتركيز.",
    priceIQD: 39000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "حجم الجرعة", value: "كبسولتان" },
      { label: "أفضل وقت", value: "بعد الطعام" },
      { label: "الهدف", value: "تعافٍ وعناية عامة" },
    ],
  },
  {
    id: "sup-creatine",
    category: "supplements",
    name: "شارك كرياتين أحادي",
    bio: "كرياتين أحادي هيدرات نقي لدعم القوة والأداء الرياضي.",
    priceIQD: 45000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "حجم الجرعة", value: "٥ غرامات" },
      { label: "أفضل وقت", value: "بعد التمرين أو وقت مناسب" },
      { label: "الهدف", value: "قوة واندفاع" },
    ],
  },
  {
    id: "sup-whey",
    category: "supplements",
    name: "شارك واي بروتين",
    bio: "بروتين مصل لبن عالي الجودة لدعم التعافي وبناء الكتلة بعد التمرين.",
    priceIQD: 52000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجرعة", value: "مغرفة واحدة" },
      { label: "التوقيت", value: "بعد التمرين أو وجبة خفيفة" },
      { label: "الهدف", value: "تعافٍ وبروتين يومي" },
    ],
  },
  {
    id: "sup-multivitamin",
    category: "supplements",
    name: "شارك مالتي فيتامين",
    bio: "مزيج فيتامينات ومعادن لدعم الطاقة والمناعة ضمن نظام غذائي متوازن.",
    priceIQD: 34000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجرعة", value: "كبسولة يومياً" },
      { label: "التوقيت", value: "مع وجبة الإفطار" },
      { label: "الهدف", value: "دعم عام يومي" },
    ],
  },
  {
    id: "wl-burn",
    category: "weight-loss",
    name: "شارك كُتْ بْرِنَر",
    bio: "تركيبة متوازنة لدعم الطاقة والتحكم الشعوري بالجوع ضمن خطّة مدروسة.",
    priceIQD: 42000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "حجم الجرعة", value: "كبسولة واحدة" },
      { label: "أفضل وقت", value: "الصباح" },
      { label: "الهدف", value: "تنشيف وتقويم الوزن" },
    ],
  },
  {
    id: "wl-fiber",
    category: "weight-loss",
    name: "شارك فايبر كلِنس",
    bio: "دعم بالألياف اليومي لراحة أفضل لهضم ومتابعة أكثر انتظاماً.",
    priceIQD: 28000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "حجم الجرعة", value: "معيار واحدة (ملعقة)" },
      { label: "أفضل وقت", value: "المساء" },
      { label: "الهدف", value: "دعم الهضم" },
    ],
  },
  {
    id: "wl-green",
    category: "weight-loss",
    name: "شارك حرق أخضر",
    bio: "تركيبة نباتية مركّزة لدعم الأيض والنشاط ضمن برنامج غذائي منتظم.",
    priceIQD: 36000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجرعة", value: "كبسولتان يومياً" },
      { label: "التوقيت", value: "قبل الوجبات" },
      { label: "الهدف", value: "تنشيط الروتين" },
    ],
  },
  {
    id: "wl-meta",
    category: "weight-loss",
    name: "شارك ميتابوليك",
    bio: "دعم لليوم الطويل مع التركيز على الترطيب والانتظام في الحركة.",
    priceIQD: 31000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجرعة", value: "كبسولة مع الماء" },
      { label: "التوقيت", value: "منتصف النهار" },
      { label: "الهدف", value: "متابعة اليوم" },
    ],
  },
  {
    id: "hair-growth",
    category: "hair-care",
    name: "شارك لتسريع نمو الشعر",
    bio: "مزيج عناية بالفروة لتقوية مظهر الشعر وحسّه مع الالتزام.",
    priceIQD: 37000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجدول", value: "٣–٤ مرات بالأسبوع" },
      { label: "القوام", value: "سيروم خفيف" },
      { label: "الهدف", value: "مظهر أكثر كثافة" },
    ],
  },
  {
    id: "hair-keratin",
    category: "hair-care",
    name: "شارك إصلاح بالكيراتين",
    bio: "عناية تعويضية للشعر المتضرر والمتعب من الحرارة والتصفيف.",
    priceIQD: 33000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الجدول", value: "بعد الاستحمام" },
      { label: "النوع", value: "بدون شطف" },
      { label: "الهدف", value: "نعومة ولمعان" },
    ],
  },
  {
    id: "hair-oil",
    category: "hair-care",
    name: "شارك زيت تغذية الفروة",
    bio: "زيت خفيف للتدليك المرتب لتهدئة الفروة ودعم بيئة أفضل للشعر.",
    priceIQD: 29000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "الاستخدام", value: "مرتين أسبوعياً" },
      { label: "الكمية", value: "عدّ قطرات حسب الطول" },
      { label: "الهدف", value: "تغذية الفروة" },
    ],
  },
  {
    id: "hair-mask",
    category: "hair-care",
    name: "شارك ماسك إصلاح",
    bio: "قناع أسبوعي يعيد النعومة للأطراف المتقصفة.",
    priceIQD: 32000,
    image: "/placeholders/product-demo.png",
    howToUseVimeoId: "76979871",
    specs: [
      { label: "المدة", value: "١٠–١٥ دقيقة" },
      { label: "التكرار", value: "مرة أسبوعياً" },
      { label: "الهدف", value: "ترطيب عميق" },
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

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
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
