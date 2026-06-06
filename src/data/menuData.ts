export interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  category: string;
  images: string[];
  calories: number;
  available: boolean;
  popular?: boolean;
}

export const menuCategories = [
  "المشاوي المشكلة",
  "الدجاج المشوي",
  "الكفتة",
  "السندويتشات",
  "الوجبات العائلية",
  "البطاطس المقلية",
  "المشروبات",
  "الحلويات"
];

export const menuData: MenuItem[] = [
  {
    id: "mix-grill-1",
    name: "مشاوي مشكلة ممتازة",
    description: "تشكيلة فاخرة من اللحم، الدجاج، الكفتة والنقانق المشوية على الفحم.",
    ingredients: ["قطع لحم الغنم", "دجاج", "كفتة", "توابل خاصة"],
    price: 350,
    category: "المشاوي المشكلة",
    images: ["https://images.unsplash.com/photo-1544025162-811114215b3a?auto=format&fit=crop&w=800&q=80"],
    calories: 1200,
    available: true,
    popular: true
  },
  {
    id: "chicken-1",
    name: "نصف دجاج مشوي على الفحم",
    description: "دجاج متبل بأعشابنا السرية، مشوي ببطء ليحافظ على طراوته.",
    ingredients: ["دجاج طازج", "ثوم", "ليمون", "زيت زيتون", "أعشاب"],
    price: 120,
    category: "الدجاج المشوي",
    images: ["https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80"],
    calories: 850,
    available: true,
    popular: true
  },
  {
    id: "kefta-1",
    name: "كفتة مشوية",
    description: "لحم مفروم طازج متبل بأجود التوابل المغربية الأصيلة، مشوي بعناية.",
    ingredients: ["لحم بقر مفروم", "بقدونس", "بصل", "كمون", "بابريكا"],
    price: 140,
    category: "الكفتة",
    images: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"],
    calories: 600,
    available: true
  },
  {
    id: "sandwich-1",
    name: "سندويتش المشاوي الخاص",
    description: "خبز طازج محشو بقطع اللحم المشوي، سلطة منعشة وصلصة الثوم.",
    ingredients: ["خبز أرتيزان", "لحم مشوي", "سلطة", "صلصة"],
    price: 60,
    category: "السندويتشات",
    images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"],
    calories: 750,
    available: true,
    popular: true
  },
  {
    id: "family-1",
    name: "وليمة رضا الله",
    description: "وجبة عائلية متكاملة تكفي لـ 4 أشخاص. تشمل المشاوي، السلطات والمشروبات.",
    ingredients: ["1كغ مشاوي مشكلة", "بطاطس", "4 سلطات", "مشروب عائلي"],
    price: 600,
    category: "الوجبات العائلية",
    images: ["https://images.unsplash.com/photo-1544025162-811114215b3a?auto=format&fit=crop&w=800&q=80"],
    calories: 3500,
    available: true
  },
  {
    id: "dessert-1",
    name: "تحلية الزعفران والفستق",
    description: "بانا كوتا بنكهة الفانيليا والزعفران مزينة بالفستق المطحون.",
    ingredients: ["كريمة", "فانيليا", "زعفران", "فستق"],
    price: 65,
    category: "الحلويات",
    images: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80"],
    calories: 400,
    available: true
  }
];
