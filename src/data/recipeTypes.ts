export interface RecipeIngredient {
  id: string
  qty: number
  unit: string
  /** Essential ingredients decide availability; optional ones never block a dish. */
  essential: boolean
}

export type RecipeKind = 'ramen' | 'basic' | 'side'

export type SoupType =
  | 'shoyu'
  | 'shio'
  | 'miso'
  | 'tonkotsu'
  | 'paitan'
  | 'niboshi'
  | 'spicy'
  | 'soupless'
  | 'dipping'
  | 'chilled'

export const SOUP_LABEL: Record<SoupType, string> = {
  shoyu: 'Shoyu',
  shio: 'Shio',
  miso: 'Miso',
  tonkotsu: 'Tonkotsu',
  paitan: 'Chicken paitan',
  niboshi: 'Niboshi',
  spicy: 'Spicy',
  soupless: 'No soup',
  dipping: 'Dipping',
  chilled: 'Chilled',
}

export type Topping =
  | 'chashu'
  | 'egg'
  | 'raw-egg'
  | 'nori'
  | 'naruto'
  | 'menma'
  | 'scallion'
  | 'leek'
  | 'corn'
  | 'butter'
  | 'sprouts'
  | 'mountain'
  | 'spinach'
  | 'bok-choy'
  | 'garlic-chips'
  | 'ground-pork'
  | 'chili-oil'
  | 'sesame'
  | 'kikurage'
  | 'takana'
  | 'beni-shoga'
  | 'onion'
  | 'back-fat'
  | 'pepper'
  | 'cabbage'
  | 'seafood'
  | 'ribs'
  | 'nira'
  | 'tomato'
  | 'cheese'
  | 'chilled-strips'
  | 'mayu'
  | 'yuzu'
  | 'pork-bits'
  | 'starch-sauce'
  | 'oil'

/** Parameters for the hand-drawn bowl illustration. */
export interface RamenArtSpec {
  vessel: 'bowl' | 'dry' | 'tsuke' | 'chilled'
  /** Soup colour; omitted for soupless / chilled. */
  soup?: string
  noodle: 'thin' | 'wavy' | 'thick' | 'flat'
  top: Topping[]
}

export interface Route {
  minutes: number
  ingredients: RecipeIngredient[]
  steps: string[]
}

export type RouteId = 'quick' | 'authentic'

export interface Recipe {
  id: string
  kind: RecipeKind
  name: string
  /** Japanese name — decorative only, always aria-hidden. */
  nameJa: string
  blurb: string
  /** Quick (home) route — also the only route for sides and basics. */
  minutes: number
  serves: number
  image?: string
  tint: string
  ingredients: RecipeIngredient[]
  steps: string[]
  /** Ramen only. */
  region?: string
  soup?: SoupType
  art?: RamenArtSpec
  /** Shop-style route: separate stock, tare, oil, toppings, sometimes noodles. */
  authentic?: Route
  /** Ids of Ramen Basics the authentic route uses. */
  basics?: string[]
  /** Ramen only: a sourced fun fact shown on the detail page. */
  funFact?: { fact: string; source: string; url: string }
}

export const e = (id: string, qty: number, unit: string): RecipeIngredient => ({ id, qty, unit, essential: true })
export const o = (id: string, qty: number, unit: string): RecipeIngredient => ({ id, qty, unit, essential: false })

export function routeOf(recipe: Recipe, route: RouteId = 'quick'): Route {
  if (route === 'authentic' && recipe.authentic) return recipe.authentic
  return { minutes: recipe.minutes, ingredients: recipe.ingredients, steps: recipe.steps }
}

export function formatMinutes(m: number): string {
  if (m < 90) return `${m} min`
  const h = m / 60
  return `${Number.isInteger(h) ? h : h.toFixed(1)} hr`
}

/**
 * Illustration for a route. The authentic bowl shows what the shop-style route adds:
 * a glossy aroma-oil layer, extra homemade chashu, and an ajitama when the route makes one.
 */
export function artFor(recipe: Recipe, route: RouteId = 'quick'): RamenArtSpec | undefined {
  const base = recipe.art
  if (!base || route !== 'authentic' || !recipe.authentic) return base
  const b = recipe.basics ?? []
  const top = [...base.top]
  const add = (t: Topping) => {
    if (!top.includes(t)) top.push(t)
  }
  if (base.vessel === 'bowl' && !top.includes('back-fat') && !top.includes('mayu')) add('oil')
  if (b.includes('basic-chashu')) top.unshift('chashu')
  if (b.includes('basic-ajitama')) add('egg')
  if (b.includes('basic-aroma-oils') && !top.includes('mayu') && !top.includes('back-fat')) add('scallion')
  // Every shop-style bowl gets at least one visible upgrade: homemade chashu, then an egg.
  if (top.length === base.top.length) {
    if (top.includes('egg')) top.unshift('chashu')
    else add('egg')
  }
  return { ...base, top }
}
