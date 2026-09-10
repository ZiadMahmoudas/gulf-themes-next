export type ThemeItem = {
  slug: string;
  title: string;
  label: string;
  category: string;
  description: string;
  longDescription: string;
  price: string;
  status: "متاح" | "قريباً";
  features: string[];
  keywords: string[];
  accent: string;
  externalUrl?: string;
  coverImage?: string | null;
};

export const themes: ThemeItem[] = [
  {
    slug: "gulfshop",
    title: "GulfShop",
    label: "متجر خليجي",
    category: "متاجر إلكترونية",
    description: "ثيم WooCommerce عربي سريع ومصمم من البداية لتجربة شراء خليجية ممتازة.",
    longDescription:
      "GulfShop هو قالب متجر عربي Mobile‑First مناسب للملابس والعطور والجمال والإكسسوارات، مع RTL حقيقي وتجربة منتجات وشراء محسنة للموبايل.",
    price: "199 ر.س",
    status: "قريباً",
    features: ["RTL / LTR", "WooCommerce", "Mobile First", "WhatsApp CTA", "صفحات منتجات محسنة", "SEO Ready"],
    keywords: ["قالب متجر سعودي", "woocommerce عربي", "قالب ووردبريس متجر"],
    accent: "01"
  },
  {
    slug: "khidma",
    title: "Khidma",
    label: "خدمات وصيانة",
    category: "شركات الخدمات",
    description: "قالب احترافي لشركات التكييف والصيانة والنظافة والكهرباء والسباكة.",
    longDescription:
      "Khidma مبني للشركات التي تعتمد على الاتصالات وواتساب وطلبات الخدمة، مع صفحات خدمات ومناطق تغطية وحالات عمل وCTA واضح.",
    price: "199 ر.س",
    status: "قريباً",
    features: ["صفحات خدمات", "مناطق التغطية", "CTA واتساب", "أعمال سابقة", "FAQ", "Local SEO"],
    keywords: ["قالب شركة صيانة", "قالب شركة تكييف", "موقع خدمات سعودي"],
    accent: "02"
  },
  {
    slug: "diwan",
    title: "Diwan",
    label: "شركة واستشارات",
    category: "Corporate",
    description: "هوية رقمية راقية للشركات والاستشارات والمكاتب المهنية في الخليج.",
    longDescription:
      "Diwan يقدم صفحات شركة وخدمات وفريق ودراسات حالة ومقالات بتصميم هادئ وقوي يناسب الشركات الخليجية والمكاتب المهنية.",
    price: "199 ر.س",
    status: "قريباً",
    features: ["Corporate UI", "Case Studies", "Blog", "Team", "Arabic Typography", "Schema Ready"],
    keywords: ["قالب شركة سعودي", "قالب مكتب استشارات", "wordpress عربي"],
    accent: "03"
  }
];

export type PluginItem = {
  slug: string;
  title: string;
  label: string;
  category: string;
  description: string;
  longDescription: string;
  price: string;
  status: "متاح" | "قريباً";
  features: string[];
  keywords: string[];
  accent: string;
  symbol: string;
  externalUrl?: string;
  coverImage?: string | null;
};

export const plugins: PluginItem[] = [
  {
    slug: "whatsapp-pulse",
    title: "WhatsApp Pulse",
    label: "زر واتساب احترافي",
    category: "Conversion",
    description: "زر واتساب مرن بحركات Pulse وRing وتحكم منفصل في الظهور على الموبايل والتابلت والديسكتوب.",
    longDescription: "WhatsApp Pulse إضافة WordPress خفيفة لعمل أزرار واتساب احترافية مع تحكم في الحركة والموضع والظهور حسب نوع الشاشة، ومناسبة للمواقع الخدمية والمتاجر التي تعتمد على التواصل السريع.",
    price: "قريباً",
    status: "قريباً",
    features: ["Responsive Visibility", "Pulse Controls", "Custom Position", "Multiple Buttons", "Lightweight CSS", "No Elementor Pro"],
    keywords: ["إضافة واتساب ووردبريس", "زر واتساب متحرك", "wordpress whatsapp plugin"],
    accent: "P1",
    symbol: "↗"
  },
  {
    slug: "gulf-commerce-ux",
    title: "Gulf Commerce UX",
    label: "تحسين تجربة WooCommerce",
    category: "WooCommerce",
    description: "طبقة UX للمتاجر العربية تضيف عناصر شراء وموبايل وتجربة Checkout أوضح بدون ثيم ضخم.",
    longDescription: "Gulf Commerce UX إضافة موجهة للمتاجر العربية والخليجية لتحسين أجزاء محددة من WooCommerce مثل Sticky Add to Cart وعناصر الثقة وتجربة الموبايل، بدون تحميل ثيم كامل لمجرد الحصول على هذه التفاصيل.",
    price: "قريباً",
    status: "قريباً",
    features: ["Sticky Cart", "Mobile Purchase Bar", "Trust Blocks", "RTL Native", "WooCommerce Ready", "Modular Settings"],
    keywords: ["إضافة ووكومرس عربي", "تحسين متجر ووردبريس", "woocommerce الخليج"],
    accent: "P2",
    symbol: "+"
  },
  {
    slug: "smart-content-boxes",
    title: "Smart Content Boxes",
    label: "مكونات محتوى سريعة",
    category: "Content",
    description: "مكونات جاهزة للمقالات وصفحات الهبوط: FAQ وCTA وميزات ومقارنات بتصميم عربي نظيف.",
    longDescription: "Smart Content Boxes يوفر Blocks عملية للمقالات وصفحات الخدمات والهبوط مع تركيز على القراءة والـSEO والتحويل، ويمكن استخدامها بدون الاعتماد على Page Builder ثقيل.",
    price: "قريباً",
    status: "قريباً",
    features: ["FAQ Blocks", "CTA Blocks", "Comparison UI", "Arabic Typography", "Schema Friendly", "Fast Rendering"],
    keywords: ["بلجن ووردبريس عربي", "wordpress content blocks", "FAQ plugin عربي"],
    accent: "P3",
    symbol: "✦"
  }
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string[];
  sections: { heading: string; body: string }[];
};

export const posts: Post[] = [
  {
    slug: "best-wordpress-theme-saudi-store",
    title: "كيف تختار قالب ووردبريس مناسب لمتجر سعودي؟",
    excerpt: "اختيار القالب لا يتوقف على الشكل؛ السرعة، تجربة الموبايل، العربية وWooCommerce أهم من كثرة المؤثرات.",
    date: "2026-09-10",
    readTime: "5 دقائق",
    category: "WordPress",
    keywords: ["قالب ووردبريس متجر سعودي", "قالب متجر إلكتروني", "WooCommerce السعودية"],
    sections: [
      { heading: "ابدأ من تجربة الموبايل", body: "معظم قرارات الشراء تبدأ من الهاتف، لذلك يجب أن تكون صفحة المنتج والسلة والتنقل واضحة وسريعة قبل التفكير في المؤثرات البصرية." },
      { heading: "العربية ليست مجرد RTL", body: "القالب العربي الجيد يهتم بأحجام الخطوط، المسافات، الأرقام، اتجاه الأيقونات وترتيب عناصر الشراء وليس فقط قلب اتجاه الصفحة." },
      { heading: "راقب الأداء", body: "اختر بنية خفيفة، صوراً محسنة ومكونات لا تحمل JavaScript بلا داعٍ. السرعة تؤثر في تجربة المستخدم وفي قابلية الموقع للنمو." }
    ]
  },
  {
    slug: "elementor-vs-coded-wordpress-theme",
    title: "Elementor أم قالب WordPress مبرمج؟ أيهما أنسب لمشروعك؟",
    excerpt: "المقارنة العملية بين سهولة التعديل في Elementor والأداء والمرونة في القوالب المبرمجة.",
    date: "2026-09-09",
    readTime: "6 دقائق",
    category: "Elementor",
    keywords: ["Elementor عربي", "قالب Elementor", "قالب ووردبريس مبرمج"],
    sections: [
      { heading: "متى تختار Elementor؟", body: "إذا كان صاحب الموقع يحتاج لتغيير الأقسام والنصوص بصرياً بدون مطور، فـElementor يوفر مرونة ممتازة بشرط بناء الصفحات بعناية." },
      { heading: "متى تختار القالب المبرمج؟", body: "عندما تكون الأولوية القصوى للأداء أو هناك تجربة مخصصة ومتكررة تحتاج تحكماً أدق في المكونات والكود." },
      { heading: "الحل الهجين", body: "يمكن بناء Core قوي للقالب ثم توفير أجزاء قابلة للتحرير في Elementor، فتجمع سهولة الاستخدام مع أداء أفضل." }
    ]
  },
  {
    slug: "rtl-wordpress-theme-checklist",
    title: "Checklist قبل شراء قالب WordPress عربي RTL",
    excerpt: "قائمة قصيرة تساعدك تكتشف إذا كان القالب عربي فعلاً أم مجرد نسخة مترجمة من تصميم أجنبي.",
    date: "2026-09-08",
    readTime: "4 دقائق",
    category: "دليل شراء",
    keywords: ["قالب RTL", "قالب ووردبريس عربي", "WordPress الخليج"],
    sections: [
      { heading: "اختبر الهيدر والقوائم", body: "تأكد من أن اتجاه الأسهم والقوائم المنسدلة والبحث وحركات الـhover منطقية في RTL وليست مجرد انعكاس تلقائي." },
      { heading: "اختبر صفحات WooCommerce", body: "صفحة المنتج، السلة، Checkout والحساب أهم من الصفحة الرئيسية. راقب المحاذاة وسهولة الضغط ووضوح الأسعار." },
      { heading: "راجع الخط العربي", body: "الخط العربي يحتاج line-height ومسافات مختلفة عن الإنجليزية، خصوصاً على الشاشات الصغيرة." }
    ]
  }
];
