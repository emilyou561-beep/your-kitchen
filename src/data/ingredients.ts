export type Storage = 'fridge' | 'freezer' | 'pantry'

export type Category =
  | 'ramen'
  | 'vegetables'
  | 'meat-fish'
  | 'tofu-eggs'
  | 'rice-noodles'
  | 'seasonings'
  | 'extras'

export interface Ingredient {
  id: string
  name: string
  /** Romanized Japanese name, shown as secondary text only. */
  romaji?: string
  category: Category
  storage: Storage
  unit: string
  /** Default quantity when added with one click. */
  defaultQty: number
  aliases?: string[]
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'ramen', label: 'Ramen Pantry' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'meat-fish', label: 'Meat & Fish' },
  { id: 'tofu-eggs', label: 'Tofu & Eggs' },
  { id: 'rice-noodles', label: 'Rice & Noodles' },
  { id: 'seasonings', label: 'Seasonings' },
  { id: 'extras', label: 'Extras' },
]

export const STORAGE_LABEL: Record<Storage, string> = {
  fridge: 'Fridge',
  freezer: 'Freezer',
  pantry: 'Pantry',
}

export const UNITS = ['pc', 'g', 'kg', 'ml', 'L', 'tbsp', 'tsp', 'cup', 'pack', 'bunch', 'bowl']

export const INGREDIENTS: Ingredient[] = [
  // Ramen pantry — noodles, stocks, toppings and seasonings ramen relies on
  { id: 'ramen-noodles', name: 'Fresh ramen noodles', romaji: 'nama-men', category: 'ramen', storage: 'fridge', unit: 'pack', defaultQty: 2, aliases: ['ramen', 'noodles', 'chukamen', 'wavy noodles'] },
  { id: 'thin-ramen-noodles', name: 'Thin straight noodles', romaji: 'hosomen', category: 'ramen', storage: 'fridge', unit: 'pack', defaultQty: 2, aliases: ['hakata noodles', 'ramen', 'noodles'] },
  { id: 'thick-ramen-noodles', name: 'Thick ramen noodles', romaji: 'futomen', category: 'ramen', storage: 'fridge', unit: 'pack', defaultQty: 2, aliases: ['tsukemen noodles', 'ramen', 'noodles'] },
  { id: 'chicken-stock', name: 'Chicken stock', romaji: 'torigara sūpu', category: 'ramen', storage: 'pantry', unit: 'ml', defaultQty: 1000, aliases: ['broth', 'stock', 'bouillon'] },
  { id: 'tonkotsu-base', name: 'Tonkotsu soup concentrate', romaji: 'tonkotsu no moto', category: 'ramen', storage: 'pantry', unit: 'ml', defaultQty: 200, aliases: ['pork bone soup', 'ramen base'] },
  { id: 'chicken-carcass', name: 'Chicken carcass', romaji: 'torigara', category: 'ramen', storage: 'freezer', unit: 'pc', defaultQty: 2, aliases: ['chicken bones', 'chicken frame'] },
  { id: 'chicken-wings', name: 'Chicken wings', romaji: 'tebasaki', category: 'ramen', storage: 'freezer', unit: 'g', defaultQty: 500, aliases: ['wing tips'] },
  { id: 'pork-bones', name: 'Pork bones', romaji: 'tonkotsu', category: 'ramen', storage: 'freezer', unit: 'kg', defaultQty: 1.5, aliases: ['pork femur', 'pork trotters', 'genkotsu'] },
  { id: 'pork-back-fat', name: 'Pork back fat', romaji: 'seabura', category: 'ramen', storage: 'freezer', unit: 'g', defaultQty: 200, aliases: ['fatback', 'lard'] },
  { id: 'pork-belly-block', name: 'Pork belly block', romaji: 'buta bara burokku', category: 'ramen', storage: 'fridge', unit: 'g', defaultQty: 500, aliases: ['chashu pork', 'pork belly'] },
  { id: 'chashu', name: 'Ready-made chashu', romaji: 'chāshū', category: 'ramen', storage: 'fridge', unit: 'pack', defaultQty: 1, aliases: ['roast pork', 'char siu'] },
  { id: 'menma', name: 'Menma', romaji: 'menma', category: 'ramen', storage: 'fridge', unit: 'g', defaultQty: 100, aliases: ['bamboo shoots'] },
  { id: 'naruto', name: 'Naruto fish cake', romaji: 'narutomaki', category: 'ramen', storage: 'fridge', unit: 'pc', defaultQty: 1, aliases: ['kamaboko', 'fish cake'] },
  { id: 'kombu', name: 'Kombu', romaji: 'konbu', category: 'ramen', storage: 'pantry', unit: 'g', defaultQty: 50, aliases: ['kelp'] },
  { id: 'niboshi', name: 'Dried sardines', romaji: 'niboshi', category: 'ramen', storage: 'pantry', unit: 'g', defaultQty: 100, aliases: ['iriko', 'dried anchovies'] },
  { id: 'dried-shiitake', name: 'Dried shiitake', romaji: 'hoshi shiitake', category: 'ramen', storage: 'pantry', unit: 'pc', defaultQty: 6, aliases: ['mushroom'] },
  { id: 'kikurage', name: 'Wood ear mushroom', romaji: 'kikurage', category: 'ramen', storage: 'pantry', unit: 'g', defaultQty: 20, aliases: ['black fungus'] },
  { id: 'takana', name: 'Pickled mustard greens', romaji: 'karashi takana', category: 'ramen', storage: 'fridge', unit: 'g', defaultQty: 100, aliases: ['takana'] },
  { id: 'corn', name: 'Sweet corn', romaji: 'kōn', category: 'ramen', storage: 'pantry', unit: 'g', defaultQty: 200, aliases: ['canned corn'] },
  { id: 'lard', name: 'Lard', romaji: 'rādo', category: 'ramen', storage: 'fridge', unit: 'g', defaultQty: 200, aliases: ['pork fat'] },
  { id: 'sesame-paste', name: 'Sesame paste', romaji: 'neri goma', category: 'ramen', storage: 'pantry', unit: 'g', defaultQty: 100, aliases: ['tahini'] },
  { id: 'chili-oil', name: 'Chili oil', romaji: 'rāyu', category: 'ramen', storage: 'pantry', unit: 'ml', defaultQty: 100, aliases: ['rayu', 'la-yu'] },
  { id: 'sichuan-pepper', name: 'Sichuan pepper', romaji: 'kajō sanshō', category: 'ramen', storage: 'pantry', unit: 'g', defaultQty: 20, aliases: ['hua jiao'] },
  { id: 'black-pepper', name: 'Black pepper', romaji: 'kuro koshō', category: 'ramen', storage: 'pantry', unit: 'g', defaultQty: 50, aliases: ['pepper'] },
  { id: 'white-pepper', name: 'White pepper', romaji: 'shiro koshō', category: 'ramen', storage: 'pantry', unit: 'g', defaultQty: 50, aliases: ['pepper'] },
  { id: 'nira', name: 'Garlic chives', romaji: 'nira', category: 'ramen', storage: 'fridge', unit: 'bunch', defaultQty: 1, aliases: ['chinese chives'] },
  { id: 'bok-choy', name: 'Bok choy', romaji: 'chingensai', category: 'ramen', storage: 'fridge', unit: 'pc', defaultQty: 2, aliases: ['pak choi'] },
  { id: 'soy-milk', name: 'Unsweetened soy milk', romaji: 'tōnyū', category: 'ramen', storage: 'fridge', unit: 'ml', defaultQty: 1000, aliases: ['soymilk'] },
  { id: 'oyster-sauce', name: 'Oyster sauce', romaji: 'oisutā sōsu', category: 'ramen', storage: 'fridge', unit: 'ml', defaultQty: 200 },
  { id: 'bread-flour', name: 'Bread flour', romaji: 'kyōrikiko', category: 'ramen', storage: 'pantry', unit: 'g', defaultQty: 1000, aliases: ['strong flour', 'high-gluten flour'] },
  { id: 'baking-soda', name: 'Baking soda', romaji: 'jūsō', category: 'ramen', storage: 'pantry', unit: 'g', defaultQty: 200, aliases: ['kansui substitute', 'bicarbonate'] },
  { id: 'seafood-mix', name: 'Seafood mix', romaji: 'shīfūdo mikkusu', category: 'ramen', storage: 'freezer', unit: 'g', defaultQty: 300, aliases: ['squid', 'shrimp', 'clams'] },
  { id: 'pork-ribs', name: 'Pork spare ribs', romaji: 'sōki', category: 'ramen', storage: 'freezer', unit: 'g', defaultQty: 500, aliases: ['soki', 'ribs'] },
  { id: 'ham', name: 'Sliced ham', romaji: 'hamu', category: 'ramen', storage: 'fridge', unit: 'pack', defaultQty: 1 },
  { id: 'cheese', name: 'Grated cheese', romaji: 'chīzu', category: 'ramen', storage: 'fridge', unit: 'g', defaultQty: 100, aliases: ['parmesan'] },
  { id: 'japanese-mustard', name: 'Japanese mustard', romaji: 'karashi', category: 'ramen', storage: 'fridge', unit: 'g', defaultQty: 40, aliases: ['karashi'] },
  { id: 'yuzu', name: 'Yuzu peel', romaji: 'yuzu', category: 'ramen', storage: 'fridge', unit: 'pc', defaultQty: 1, aliases: ['citrus', 'lemon'] },

  // Vegetables
  { id: 'potato', name: 'Potato', romaji: 'jagaimo', category: 'vegetables', storage: 'pantry', unit: 'pc', defaultQty: 3 },
  { id: 'onion', name: 'Onion', romaji: 'tamanegi', category: 'vegetables', storage: 'pantry', unit: 'pc', defaultQty: 2 },
  { id: 'carrot', name: 'Carrot', romaji: 'ninjin', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 2 },
  { id: 'scallion', name: 'Scallion', romaji: 'negi', category: 'vegetables', storage: 'fridge', unit: 'bunch', defaultQty: 1, aliases: ['green onion', 'spring onion', 'leek'] },
  { id: 'cabbage', name: 'Cabbage', romaji: 'kyabetsu', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 1 },
  { id: 'napa-cabbage', name: 'Napa cabbage', romaji: 'hakusai', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 1, aliases: ['chinese cabbage'] },
  { id: 'daikon', name: 'Daikon', romaji: 'daikon', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 1, aliases: ['radish'] },
  { id: 'shiitake', name: 'Shiitake', romaji: 'shiitake', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 4, aliases: ['mushroom'] },
  { id: 'ginger', name: 'Ginger', romaji: 'shōga', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 1 },
  { id: 'garlic', name: 'Garlic', romaji: 'ninniku', category: 'vegetables', storage: 'pantry', unit: 'pc', defaultQty: 1 },
  { id: 'snap-peas', name: 'Snap peas', romaji: 'kinusaya', category: 'vegetables', storage: 'fridge', unit: 'g', defaultQty: 50, aliases: ['snow peas'] },
  { id: 'spinach', name: 'Spinach', romaji: 'hōrensō', category: 'vegetables', storage: 'fridge', unit: 'bunch', defaultQty: 1 },
  { id: 'burdock', name: 'Burdock root', romaji: 'gobō', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 1, aliases: ['gobo'] },
  { id: 'cucumber', name: 'Cucumber', romaji: 'kyūri', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 2 },
  { id: 'eggplant', name: 'Eggplant', romaji: 'nasu', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 2, aliases: ['aubergine'] },
  { id: 'bean-sprouts', name: 'Bean sprouts', romaji: 'moyashi', category: 'vegetables', storage: 'fridge', unit: 'pack', defaultQty: 1 },
  { id: 'green-pepper', name: 'Green pepper', romaji: 'pīman', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 3, aliases: ['bell pepper', 'piman'] },
  { id: 'kabocha', name: 'Kabocha squash', romaji: 'kabocha', category: 'vegetables', storage: 'pantry', unit: 'g', defaultQty: 400, aliases: ['pumpkin', 'squash'] },
  { id: 'tomato', name: 'Tomato', romaji: 'tomato', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 2 },

  // Meat & fish
  { id: 'chicken-thigh', name: 'Chicken thigh', romaji: 'tori momo', category: 'meat-fish', storage: 'fridge', unit: 'g', defaultQty: 300, aliases: ['chicken'] },
  { id: 'ground-chicken', name: 'Ground chicken', romaji: 'tori hikiniku', category: 'meat-fish', storage: 'fridge', unit: 'g', defaultQty: 200, aliases: ['minced chicken'] },
  { id: 'beef-sliced', name: 'Thin-sliced beef', romaji: 'gyū koma', category: 'meat-fish', storage: 'fridge', unit: 'g', defaultQty: 200, aliases: ['beef'] },
  { id: 'pork-sliced', name: 'Thin-sliced pork', romaji: 'buta bara', category: 'meat-fish', storage: 'fridge', unit: 'g', defaultQty: 250, aliases: ['pork', 'pork belly'] },
  { id: 'pork-loin', name: 'Pork loin cutlet', romaji: 'buta rōsu', category: 'meat-fish', storage: 'fridge', unit: 'pc', defaultQty: 2, aliases: ['pork chop'] },
  { id: 'ground-meat', name: 'Ground beef & pork', romaji: 'aibiki', category: 'meat-fish', storage: 'fridge', unit: 'g', defaultQty: 300, aliases: ['minced meat', 'ground beef', 'ground pork'] },
  { id: 'salmon', name: 'Salmon fillet', romaji: 'sake', category: 'meat-fish', storage: 'freezer', unit: 'pc', defaultQty: 2, aliases: ['fish'] },
  { id: 'mackerel', name: 'Mackerel fillet', romaji: 'saba', category: 'meat-fish', storage: 'freezer', unit: 'pc', defaultQty: 2, aliases: ['fish', 'saba'] },
  { id: 'shrimp', name: 'Shrimp', romaji: 'ebi', category: 'meat-fish', storage: 'freezer', unit: 'g', defaultQty: 200, aliases: ['prawn'] },
  { id: 'chikuwa', name: 'Chikuwa', romaji: 'chikuwa', category: 'meat-fish', storage: 'fridge', unit: 'pc', defaultQty: 4, aliases: ['fish cake'] },

  // Tofu & eggs
  { id: 'egg', name: 'Egg', romaji: 'tamago', category: 'tofu-eggs', storage: 'fridge', unit: 'pc', defaultQty: 6, aliases: ['eggs'] },
  { id: 'tofu', name: 'Tofu', romaji: 'tōfu', category: 'tofu-eggs', storage: 'fridge', unit: 'pack', defaultQty: 1 },
  { id: 'aburaage', name: 'Fried tofu pouch', romaji: 'aburaage', category: 'tofu-eggs', storage: 'freezer', unit: 'pc', defaultQty: 2 },
  { id: 'natto', name: 'Natto', romaji: 'nattō', category: 'tofu-eggs', storage: 'fridge', unit: 'pack', defaultQty: 3, aliases: ['fermented soybeans'] },
  { id: 'konnyaku', name: 'Konnyaku', romaji: 'konnyaku', category: 'tofu-eggs', storage: 'fridge', unit: 'pack', defaultQty: 1, aliases: ['konjac'] },
  { id: 'milk', name: 'Milk', romaji: 'gyūnyū', category: 'tofu-eggs', storage: 'fridge', unit: 'ml', defaultQty: 1000 },
  { id: 'butter', name: 'Butter', romaji: 'batā', category: 'tofu-eggs', storage: 'fridge', unit: 'g', defaultQty: 200 },

  // Rice & noodles
  { id: 'rice', name: 'Short-grain rice', romaji: 'kome', category: 'rice-noodles', storage: 'pantry', unit: 'cup', defaultQty: 5, aliases: ['rice'] },
  { id: 'udon', name: 'Udon noodles', romaji: 'udon', category: 'rice-noodles', storage: 'freezer', unit: 'pack', defaultQty: 2 },
  { id: 'soba', name: 'Soba noodles', romaji: 'soba', category: 'rice-noodles', storage: 'pantry', unit: 'g', defaultQty: 200, aliases: ['buckwheat'] },
  { id: 'yakisoba-noodles', name: 'Yakisoba noodles', romaji: 'mushi-men', category: 'rice-noodles', storage: 'fridge', unit: 'pack', defaultQty: 2 },
  { id: 'flour', name: 'Flour', romaji: 'komugiko', category: 'rice-noodles', storage: 'pantry', unit: 'g', defaultQty: 500 },
  { id: 'panko', name: 'Panko', romaji: 'panko', category: 'rice-noodles', storage: 'pantry', unit: 'g', defaultQty: 200, aliases: ['breadcrumbs'] },
  { id: 'potato-starch', name: 'Potato starch', romaji: 'katakuriko', category: 'rice-noodles', storage: 'pantry', unit: 'g', defaultQty: 200, aliases: ['cornstarch', 'starch'] },

  // Seasonings
  { id: 'soy-sauce', name: 'Soy sauce', romaji: 'shōyu', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 500 },
  { id: 'mirin', name: 'Mirin', romaji: 'mirin', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 300 },
  { id: 'sake', name: 'Cooking sake', romaji: 'ryōrishu', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 300 },
  { id: 'sugar', name: 'Sugar', romaji: 'satō', category: 'seasonings', storage: 'pantry', unit: 'g', defaultQty: 500 },
  { id: 'salt', name: 'Salt', romaji: 'shio', category: 'seasonings', storage: 'pantry', unit: 'g', defaultQty: 500 },
  { id: 'miso', name: 'Miso paste', romaji: 'miso', category: 'seasonings', storage: 'fridge', unit: 'g', defaultQty: 300 },
  { id: 'dashi', name: 'Dashi stock', romaji: 'dashi', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 1000, aliases: ['stock', 'broth'] },
  { id: 'rice-vinegar', name: 'Rice vinegar', romaji: 'su', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 300, aliases: ['vinegar'] },
  { id: 'sesame-oil', name: 'Sesame oil', romaji: 'goma abura', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 200 },
  { id: 'vegetable-oil', name: 'Vegetable oil', romaji: 'sarada abura', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 500, aliases: ['oil'] },
  { id: 'curry-roux', name: 'Curry roux', romaji: 'karē rū', category: 'seasonings', storage: 'pantry', unit: 'pack', defaultQty: 1 },
  { id: 'mayonnaise', name: 'Japanese mayonnaise', romaji: 'mayonēzu', category: 'seasonings', storage: 'fridge', unit: 'g', defaultQty: 300, aliases: ['mayo', 'kewpie'] },
  { id: 'tonkatsu-sauce', name: 'Tonkatsu sauce', romaji: 'tonkatsu sōsu', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 300, aliases: ['okonomi sauce', 'brown sauce'] },
  { id: 'ketchup', name: 'Ketchup', romaji: 'kechappu', category: 'seasonings', storage: 'fridge', unit: 'g', defaultQty: 300 },
  { id: 'doubanjiang', name: 'Chili bean paste', romaji: 'tōbanjan', category: 'seasonings', storage: 'fridge', unit: 'g', defaultQty: 100, aliases: ['doubanjiang'] },

  // Extras
  { id: 'nori', name: 'Nori', romaji: 'nori', category: 'extras', storage: 'pantry', unit: 'pack', defaultQty: 1, aliases: ['seaweed'] },
  { id: 'wakame', name: 'Wakame', romaji: 'wakame', category: 'extras', storage: 'pantry', unit: 'g', defaultQty: 20, aliases: ['seaweed'] },
  { id: 'katsuobushi', name: 'Bonito flakes', romaji: 'katsuobushi', category: 'extras', storage: 'pantry', unit: 'pack', defaultQty: 1 },
  { id: 'sesame-seeds', name: 'Sesame seeds', romaji: 'goma', category: 'extras', storage: 'pantry', unit: 'g', defaultQty: 50 },
  { id: 'pickled-ginger', name: 'Pickled ginger', romaji: 'beni shōga', category: 'extras', storage: 'fridge', unit: 'g', defaultQty: 50 },
  { id: 'umeboshi', name: 'Pickled plum', romaji: 'umeboshi', category: 'extras', storage: 'fridge', unit: 'pc', defaultQty: 6 },
  { id: 'aonori', name: 'Green laver flakes', romaji: 'aonori', category: 'extras', storage: 'pantry', unit: 'pack', defaultQty: 1 },
]

/** One-tap "I have the basics" set for My Kitchen. */
export const PANTRY_BASICS = ['soy-sauce', 'mirin', 'sake', 'sugar', 'salt', 'dashi', 'vegetable-oil', 'rice']

/** One-tap "ramen night starter": stock, noodles and the toppings most bowls share. */
export const RAMEN_STARTER = ['ramen-noodles', 'chicken-stock', 'soy-sauce', 'scallion', 'egg', 'nori', 'menma', 'garlic', 'ginger', 'sesame-oil']

export const INGREDIENT_BY_ID: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((i) => [i.id, i]),
)

export function searchIngredients(query: string): Ingredient[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return INGREDIENTS.filter((i) =>
    [i.name, i.romaji ?? '', ...(i.aliases ?? [])].some((s) => s.toLowerCase().includes(q)),
  )
}
