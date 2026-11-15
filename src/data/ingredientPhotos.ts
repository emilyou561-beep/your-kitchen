import type { Category, Ingredient } from './ingredients'

const PHOTO_ROOT = '/images/ingredients'

/**
 * A small library of tactile ingredient cutouts. Similar ingredients share a
 * source so the whole catalogue still feels photographic without loading a
 * hundred separate images.
 */
export const INGREDIENT_PHOTOS: Record<string, string> = {
  'ramen-noodles': `${PHOTO_ROOT}/fresh-ramen-noodles.png`,
  'thin-ramen-noodles': `${PHOTO_ROOT}/thin-ramen-noodles.png`,
  'thick-ramen-noodles': `${PHOTO_ROOT}/thick-ramen-noodles.png`,
  'chicken-stock': `${PHOTO_ROOT}/chicken-stock.png`,
  'tonkotsu-base': `${PHOTO_ROOT}/chicken-stock.png`,
  'chicken-carcass': `${PHOTO_ROOT}/chicken-carcass.png`,
  'chicken-wings': `${PHOTO_ROOT}/chicken-wings.png`,
  'pork-bones': `${PHOTO_ROOT}/pork-bones.png`,
  'pork-back-fat': `${PHOTO_ROOT}/pork-back-fat.png`,
  'pork-belly-block': `${PHOTO_ROOT}/pork-belly.png`,
  chashu: `${PHOTO_ROOT}/chashu.png`,
  menma: `${PHOTO_ROOT}/menma.png`,
  naruto: `${PHOTO_ROOT}/narutomaki.png`,
  kombu: `${PHOTO_ROOT}/kombu.png`,
  niboshi: `${PHOTO_ROOT}/dried-sardines.png`,
  'dried-shiitake': `${PHOTO_ROOT}/shiitake.png`,
  kikurage: `${PHOTO_ROOT}/wood-ear.png`,
  takana: `${PHOTO_ROOT}/pickled-greens.png`,
  corn: `${PHOTO_ROOT}/corn.png`,
  scallion: `${PHOTO_ROOT}/scallion.png`,
  nira: `${PHOTO_ROOT}/scallion.png`,
  egg: `${PHOTO_ROOT}/egg.png`,
  nori: `${PHOTO_ROOT}/nori.png`,
  'bok-choy': `${PHOTO_ROOT}/bok-choy.png`,
  tofu: `${PHOTO_ROOT}/tofu.png`,
  'seafood-mix': `${PHOTO_ROOT}/seafood-mix.png`,
  'oyster-sauce': `${PHOTO_ROOT}/sauce-bottle.png`,
  'japanese-mustard': `${PHOTO_ROOT}/sauce-bottle.png`,
  'chili-oil': `${PHOTO_ROOT}/sauce-bottle.png`,
  'sesame-paste': `${PHOTO_ROOT}/sauce-bottle.png`,
  'soy-milk': `${PHOTO_ROOT}/milk-bottle.png`,
  'sichuan-pepper': `${PHOTO_ROOT}/peppercorns.png`,
  'black-pepper': `${PHOTO_ROOT}/peppercorns.png`,
  'white-pepper': `${PHOTO_ROOT}/peppercorns.png`,
  'bread-flour': `${PHOTO_ROOT}/flour-bowl.png`,
  'baking-soda': `${PHOTO_ROOT}/flour-bowl.png`,
  'pork-ribs': `${PHOTO_ROOT}/pork-bones.png`,
  ham: `${PHOTO_ROOT}/chashu.png`,
  cheese: `${PHOTO_ROOT}/cheese.png`,
  yuzu: `${PHOTO_ROOT}/yuzu.png`,
  lard: `${PHOTO_ROOT}/lard.png`,
  udon: `${PHOTO_ROOT}/thick-ramen-noodles.png`,
  soba: `${PHOTO_ROOT}/thin-ramen-noodles.png`,
  'yakisoba-noodles': `${PHOTO_ROOT}/fresh-ramen-noodles.png`,
  flour: `${PHOTO_ROOT}/flour-bowl.png`,
  panko: `${PHOTO_ROOT}/flour-bowl.png`,
  'potato-starch': `${PHOTO_ROOT}/flour-bowl.png`,
}

const CATEGORY_PHOTOS: Record<Category, string> = {
  ramen: `${PHOTO_ROOT}/fresh-ramen-noodles.png`,
  vegetables: `${PHOTO_ROOT}/bok-choy.png`,
  'meat-fish': `${PHOTO_ROOT}/pork-belly.png`,
  'tofu-eggs': `${PHOTO_ROOT}/tofu.png`,
  'rice-noodles': `${PHOTO_ROOT}/tofu.png`,
  seasonings: `${PHOTO_ROOT}/sauce-bottle.png`,
  extras: `${PHOTO_ROOT}/nori.png`,
}

/** Ingredients that visibly squish, flex, or wobble while held. */
export const SOFT_INGREDIENTS = new Set([
  'ramen-noodles',
  'thin-ramen-noodles',
  'thick-ramen-noodles',
  'chicken-stock',
  'tonkotsu-base',
  'pork-back-fat',
  'chashu',
  'menma',
  'naruto',
  'takana',
  'lard',
  'sesame-paste',
  'chili-oil',
  'soy-milk',
  'oyster-sauce',
  'seafood-mix',
  'ham',
  'cheese',
  'tofu',
  'natto',
  'konnyaku',
  'milk',
  'butter',
  'udon',
  'yakisoba-noodles',
  'miso',
  'mayonnaise',
  'ketchup',
])

export function ingredientPhoto(ingredient: Ingredient): string {
  return INGREDIENT_PHOTOS[ingredient.id] ?? CATEGORY_PHOTOS[ingredient.category]
}

export function isSoftIngredient(id: string): boolean {
  return SOFT_INGREDIENTS.has(id)
}
