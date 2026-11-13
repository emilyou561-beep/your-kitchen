export type Storage = 'fridge' | 'freezer' | 'pantry'

export type Category =
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
  // Vegetables
  { id: 'potato', name: 'Potato', romaji: 'jagaimo', category: 'vegetables', storage: 'pantry', unit: 'pc', defaultQty: 3 },
  { id: 'onion', name: 'Onion', romaji: 'tamanegi', category: 'vegetables', storage: 'pantry', unit: 'pc', defaultQty: 2 },
  { id: 'carrot', name: 'Carrot', romaji: 'ninjin', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 2 },
  { id: 'scallion', name: 'Scallion', romaji: 'negi', category: 'vegetables', storage: 'fridge', unit: 'bunch', defaultQty: 1, aliases: ['green onion', 'spring onion'] },
  { id: 'cabbage', name: 'Cabbage', romaji: 'kyabetsu', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 1 },
  { id: 'daikon', name: 'Daikon', romaji: 'daikon', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 1, aliases: ['radish'] },
  { id: 'shiitake', name: 'Shiitake', romaji: 'shiitake', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 4, aliases: ['mushroom'] },
  { id: 'ginger', name: 'Ginger', romaji: 'shōga', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 1 },
  { id: 'snap-peas', name: 'Snap peas', romaji: 'kinusaya', category: 'vegetables', storage: 'fridge', unit: 'g', defaultQty: 50, aliases: ['snow peas'] },
  { id: 'spinach', name: 'Spinach', romaji: 'hōrensō', category: 'vegetables', storage: 'fridge', unit: 'bunch', defaultQty: 1 },
  { id: 'burdock', name: 'Burdock root', romaji: 'gobō', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 1, aliases: ['gobo'] },
  { id: 'cucumber', name: 'Cucumber', romaji: 'kyūri', category: 'vegetables', storage: 'fridge', unit: 'pc', defaultQty: 2 },

  // Meat & fish
  { id: 'chicken-thigh', name: 'Chicken thigh', romaji: 'tori momo', category: 'meat-fish', storage: 'fridge', unit: 'g', defaultQty: 300, aliases: ['chicken'] },
  { id: 'beef-sliced', name: 'Thin-sliced beef', romaji: 'gyū koma', category: 'meat-fish', storage: 'fridge', unit: 'g', defaultQty: 200, aliases: ['beef'] },
  { id: 'pork-sliced', name: 'Thin-sliced pork', romaji: 'buta bara', category: 'meat-fish', storage: 'fridge', unit: 'g', defaultQty: 250, aliases: ['pork'] },
  { id: 'salmon', name: 'Salmon fillet', romaji: 'sake', category: 'meat-fish', storage: 'freezer', unit: 'pc', defaultQty: 2, aliases: ['fish'] },

  // Tofu & eggs
  { id: 'egg', name: 'Egg', romaji: 'tamago', category: 'tofu-eggs', storage: 'fridge', unit: 'pc', defaultQty: 6, aliases: ['eggs'] },
  { id: 'tofu', name: 'Tofu', romaji: 'tōfu', category: 'tofu-eggs', storage: 'fridge', unit: 'pack', defaultQty: 1 },
  { id: 'aburaage', name: 'Fried tofu pouch', romaji: 'aburaage', category: 'tofu-eggs', storage: 'freezer', unit: 'pc', defaultQty: 2 },

  // Rice & noodles
  { id: 'rice', name: 'Short-grain rice', romaji: 'kome', category: 'rice-noodles', storage: 'pantry', unit: 'cup', defaultQty: 3, aliases: ['rice'] },
  { id: 'udon', name: 'Udon noodles', romaji: 'udon', category: 'rice-noodles', storage: 'freezer', unit: 'pack', defaultQty: 2 },

  // Seasonings
  { id: 'soy-sauce', name: 'Soy sauce', romaji: 'shōyu', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 500 },
  { id: 'mirin', name: 'Mirin', romaji: 'mirin', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 300 },
  { id: 'sake', name: 'Cooking sake', romaji: 'ryōrishu', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 300 },
  { id: 'sugar', name: 'Sugar', romaji: 'satō', category: 'seasonings', storage: 'pantry', unit: 'g', defaultQty: 500 },
  { id: 'miso', name: 'Miso paste', romaji: 'miso', category: 'seasonings', storage: 'fridge', unit: 'g', defaultQty: 300 },
  { id: 'dashi', name: 'Dashi stock', romaji: 'dashi', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 500, aliases: ['stock'] },
  { id: 'sesame-oil', name: 'Sesame oil', romaji: 'goma abura', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 200 },
  { id: 'curry-roux', name: 'Curry roux', romaji: 'karē rū', category: 'seasonings', storage: 'pantry', unit: 'pack', defaultQty: 1 },
  { id: 'vegetable-oil', name: 'Vegetable oil', category: 'seasonings', storage: 'pantry', unit: 'ml', defaultQty: 500, aliases: ['oil'] },

  // Extras
  { id: 'nori', name: 'Nori', romaji: 'nori', category: 'extras', storage: 'pantry', unit: 'pack', defaultQty: 1, aliases: ['seaweed'] },
  { id: 'wakame', name: 'Wakame', romaji: 'wakame', category: 'extras', storage: 'pantry', unit: 'g', defaultQty: 20, aliases: ['seaweed'] },
  { id: 'katsuobushi', name: 'Bonito flakes', romaji: 'katsuobushi', category: 'extras', storage: 'pantry', unit: 'pack', defaultQty: 1 },
  { id: 'sesame-seeds', name: 'Sesame seeds', romaji: 'goma', category: 'extras', storage: 'pantry', unit: 'g', defaultQty: 50 },
  { id: 'pickled-ginger', name: 'Pickled ginger', romaji: 'beni shōga', category: 'extras', storage: 'fridge', unit: 'g', defaultQty: 50 },
]

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
