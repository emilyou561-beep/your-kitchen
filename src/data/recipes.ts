export interface RecipeIngredient {
  id: string
  qty: number
  unit: string
  /** Essential ingredients decide availability; optional ones never block a dish. */
  essential: boolean
}

export interface Recipe {
  id: string
  name: string
  /** Japanese name — decorative only, always aria-hidden. */
  nameJa: string
  blurb: string
  minutes: number
  serves: number
  image?: string
  /** Fallback tint for the illustrated placeholder when no photo exists yet. */
  tint: string
  ingredients: RecipeIngredient[]
  steps: string[]
}

const e = (id: string, qty: number, unit: string): RecipeIngredient => ({ id, qty, unit, essential: true })
const o = (id: string, qty: number, unit: string): RecipeIngredient => ({ id, qty, unit, essential: false })

export const RECIPES: Recipe[] = [
  {
    id: 'nikujaga',
    name: 'Nikujaga',
    nameJa: '肉じゃが',
    blurb: 'Beef and potatoes simmered sweet and savory.',
    minutes: 35,
    serves: 3,
    image: '/images/hero-nikujaga.jpg',
    tint: '#C9894A',
    ingredients: [
      e('beef-sliced', 200, 'g'), e('potato', 3, 'pc'), e('onion', 1, 'pc'), e('soy-sauce', 3, 'tbsp'),
      e('mirin', 2, 'tbsp'), e('sugar', 1, 'tbsp'), o('carrot', 1, 'pc'), o('snap-peas', 50, 'g'), o('dashi', 300, 'ml'),
    ],
    steps: [
      'Cut potatoes and carrot into large chunks; slice the onion into wedges.',
      'Brown the beef in a little oil, then add onion, potatoes and carrot.',
      'Add dashi (or water), sugar, mirin and soy sauce. Cover with a drop-lid and simmer 15–20 minutes.',
      'Add snap peas for the last 2 minutes. Rest 5 minutes so the potatoes soak up the broth.',
    ],
  },
  {
    id: 'oyakodon',
    name: 'Oyakodon',
    nameJa: '親子丼',
    blurb: 'Chicken and soft egg over rice.',
    minutes: 20,
    serves: 2,
    tint: '#E0B04A',
    ingredients: [
      e('chicken-thigh', 250, 'g'), e('egg', 3, 'pc'), e('onion', 1, 'pc'), e('rice', 2, 'bowl'),
      e('soy-sauce', 2, 'tbsp'), e('mirin', 2, 'tbsp'), o('dashi', 150, 'ml'), o('scallion', 1, 'bunch'), o('nori', 1, 'pack'),
    ],
    steps: [
      'Slice onion thinly and cut chicken into bite-size pieces.',
      'Simmer onion in dashi, soy sauce and mirin for 3 minutes; add chicken and cook through.',
      'Pour lightly beaten eggs over the top, cover for 30 seconds — keep it soft.',
      'Slide onto hot rice and finish with scallion.',
    ],
  },
  {
    id: 'miso-soup',
    name: 'Miso Soup',
    nameJa: '味噌汁',
    blurb: 'Tofu, wakame and scallion in dashi.',
    minutes: 10,
    serves: 2,
    tint: '#B98A55',
    ingredients: [
      e('miso', 2, 'tbsp'), e('dashi', 500, 'ml'), o('tofu', 1, 'pack'), o('wakame', 5, 'g'), o('scallion', 1, 'bunch'), o('aburaage', 1, 'pc'),
    ],
    steps: [
      'Warm the dashi until just below a simmer.',
      'Add cubed tofu and wakame; heat for 1 minute.',
      'Turn off the heat, dissolve the miso through a ladle, and top with scallion.',
    ],
  },
  {
    id: 'tamagoyaki',
    name: 'Tamagoyaki',
    nameJa: '玉子焼き',
    blurb: 'Rolled sweet omelette.',
    minutes: 15,
    serves: 2,
    tint: '#E8C35A',
    ingredients: [e('egg', 4, 'pc'), e('sugar', 1, 'tbsp'), o('soy-sauce', 1, 'tsp'), o('dashi', 3, 'tbsp'), o('vegetable-oil', 1, 'tsp')],
    steps: [
      'Beat eggs with sugar, soy sauce and dashi.',
      'Pour a thin layer into an oiled pan; when nearly set, roll it to one side.',
      'Repeat, rolling each new layer around the first. Rest, then slice.',
    ],
  },
  {
    id: 'teriyaki-chicken',
    name: 'Teriyaki Chicken',
    nameJa: '照り焼き',
    blurb: 'Crisp chicken thigh in a glossy glaze.',
    minutes: 20,
    serves: 2,
    tint: '#8F4A2A',
    ingredients: [
      e('chicken-thigh', 300, 'g'), e('soy-sauce', 2, 'tbsp'), e('mirin', 2, 'tbsp'), e('sugar', 1, 'tbsp'),
      o('sake', 2, 'tbsp'), o('cabbage', 1, 'pc'), o('sesame-seeds', 5, 'g'),
    ],
    steps: [
      'Pat chicken dry and cook skin-side down over medium heat until crisp.',
      'Flip, cook through, and wipe out excess fat.',
      'Add soy sauce, mirin, sake and sugar; spoon over until glossy. Serve with shredded cabbage.',
    ],
  },
  {
    id: 'shogayaki',
    name: 'Buta no Shōgayaki',
    nameJa: '生姜焼き',
    blurb: 'Ginger pork, the lunch-counter classic.',
    minutes: 15,
    serves: 2,
    tint: '#A0603A',
    ingredients: [
      e('pork-sliced', 250, 'g'), e('ginger', 1, 'pc'), e('soy-sauce', 2, 'tbsp'), e('mirin', 2, 'tbsp'),
      o('onion', 1, 'pc'), o('sake', 1, 'tbsp'), o('cabbage', 1, 'pc'),
    ],
    steps: [
      'Grate the ginger and mix with soy sauce, mirin and sake.',
      'Fry the pork and onion until browned.',
      'Pour in the ginger sauce and toss until coated. Serve with shredded cabbage and rice.',
    ],
  },
  {
    id: 'yaki-udon',
    name: 'Yaki Udon',
    nameJa: '焼きうどん',
    blurb: 'Stir-fried udon with pork and cabbage.',
    minutes: 15,
    serves: 2,
    tint: '#C7A36A',
    ingredients: [
      e('udon', 2, 'pack'), e('soy-sauce', 2, 'tbsp'), o('pork-sliced', 150, 'g'), o('cabbage', 1, 'pc'),
      o('carrot', 1, 'pc'), o('shiitake', 3, 'pc'), o('katsuobushi', 1, 'pack'), o('vegetable-oil', 1, 'tbsp'),
    ],
    steps: [
      'Loosen udon in hot water and drain.',
      'Stir-fry pork, then vegetables until just tender.',
      'Add udon and soy sauce; toss over high heat. Top with bonito flakes.',
    ],
  },
  {
    id: 'kare-raisu',
    name: 'Japanese Curry',
    nameJa: 'カレーライス',
    blurb: 'Mild, thick home-style curry over rice.',
    minutes: 45,
    serves: 4,
    tint: '#A8692C',
    ingredients: [
      e('curry-roux', 1, 'pack'), e('onion', 2, 'pc'), e('potato', 2, 'pc'), e('rice', 4, 'bowl'),
      o('carrot', 1, 'pc'), o('pork-sliced', 250, 'g'), o('pickled-ginger', 20, 'g'),
    ],
    steps: [
      'Brown the meat and onion; add potato and carrot.',
      'Cover with water and simmer 20 minutes until tender.',
      'Turn off the heat, melt in the roux, then simmer 5 more minutes. Serve over rice.',
    ],
  },
  {
    id: 'kinpira-gobo',
    name: 'Kinpira Gobō',
    nameJa: 'きんぴらごぼう',
    blurb: 'Burdock and carrot, sweet-soy sautéed.',
    minutes: 15,
    serves: 3,
    tint: '#7A5232',
    ingredients: [
      e('burdock', 1, 'pc'), e('soy-sauce', 1, 'tbsp'), e('mirin', 1, 'tbsp'), e('sesame-oil', 1, 'tbsp'),
      o('carrot', 1, 'pc'), o('sugar', 1, 'tsp'), o('sesame-seeds', 5, 'g'),
    ],
    steps: [
      'Cut burdock and carrot into matchsticks; soak burdock briefly in water.',
      'Sauté in sesame oil until slightly soft.',
      'Add soy sauce, mirin and sugar; cook until the liquid is gone. Finish with sesame.',
    ],
  },
  {
    id: 'shake-teishoku',
    name: 'Shio Salmon',
    nameJa: '塩鮭',
    blurb: 'Salt-grilled salmon, rice and pickles.',
    minutes: 20,
    serves: 2,
    tint: '#D9774E',
    ingredients: [e('salmon', 2, 'pc'), e('rice', 2, 'bowl'), o('daikon', 1, 'pc'), o('soy-sauce', 1, 'tsp'), o('cucumber', 1, 'pc')],
    steps: [
      'Salt the salmon lightly and rest 10 minutes; pat dry.',
      'Grill or pan-fry skin-side first until crisp and just cooked.',
      'Serve with rice, grated daikon and a few drops of soy sauce.',
    ],
  },
]

export const RECIPE_BY_ID: Record<string, Recipe> = Object.fromEntries(RECIPES.map((r) => [r.id, r]))
