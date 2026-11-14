import { INGREDIENT_BY_ID } from '../data/ingredients'
import type { Storage } from '../data/ingredients'
import { routeOf } from '../data/recipes'
import type { Recipe, RecipeIngredient, RouteId } from '../data/recipes'
import { convert, toBuy } from './units'

export type Availability = 'ready' | 'almost' | 'shop'

/** Minimal inventory shape the matcher needs. */
export interface Stock {
  ingredientId: string
  qty: number
  unit: string
  storage?: Storage
}

export interface LineCheck {
  ri: RecipeIngredient
  /** Amount the recipe needs at the chosen servings, in ri.unit. */
  need: number
  /** Amount still to buy, in ri.unit. 0 = covered. */
  short: number
}

export interface RecipeMatch {
  recipe: Recipe
  servings: number
  route: RouteId
  minutes: number
  status: Availability
  lines: LineCheck[]
  have: LineCheck[]
  missingEssential: LineCheck[]
  missingOptional: LineCheck[]
}

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  ready: 'Ready to cook',
  almost: 'Almost there',
  shop: 'Needs shopping',
}

export function stockMap(stock: Stock[]): Map<string, Stock> {
  return new Map(stock.map((s) => [s.ingredientId, s]))
}

/**
 * How much of `need` (in `unit`) is not covered by stock.
 * Unknown/inconvertible units count as covered — we only flag what we can measure.
 */
export function shortfall(need: number, unit: string, item: Stock | undefined): number {
  if (!item || item.qty <= 0) return need
  const have = convert(item.qty, item.unit, unit)
  if (have === null) return 0
  return Math.max(0, need - have)
}

export function matchRecipe(
  recipe: Recipe,
  stock: Stock[] | Map<string, Stock>,
  servings = recipe.serves,
  route: RouteId = 'quick',
): RecipeMatch {
  const map = stock instanceof Map ? stock : stockMap(stock)
  const factor = servings / recipe.serves
  const r = routeOf(recipe, route)
  const lines: LineCheck[] = r.ingredients.map((ri) => {
    const need = ri.qty * factor
    return { ri, need, short: shortfall(need, ri.unit, map.get(ri.id)) }
  })
  const have = lines.filter((l) => l.short <= 1e-9)
  const missingEssential = lines.filter((l) => l.short > 1e-9 && l.ri.essential)
  const missingOptional = lines.filter((l) => l.short > 1e-9 && !l.ri.essential)
  const status: Availability =
    missingEssential.length === 0 ? 'ready' : missingEssential.length <= 2 ? 'almost' : 'shop'
  return {
    recipe,
    servings,
    route: recipe.authentic && route === 'authentic' ? 'authentic' : 'quick',
    minutes: r.minutes,
    status,
    lines,
    have,
    missingEssential,
    missingOptional,
  }
}

const ORDER: Record<Availability, number> = { ready: 0, almost: 1, shop: 2 }

export function rankRecipes(recipes: Recipe[], stock: Stock[], routes: Record<string, RouteId> = {}): RecipeMatch[] {
  const map = stockMap(stock)
  return recipes
    .map((r) => matchRecipe(r, map, r.serves, routes[r.id]))
    .sort(
      (a, b) =>
        ORDER[a.status] - ORDER[b.status] ||
        a.missingEssential.length - b.missingEssential.length ||
        b.have.length - a.have.length ||
        a.minutes - b.minutes,
    )
}

export function ingredientName(id: string): string {
  return INGREDIENT_BY_ID[id]?.name ?? id
}

/** "2 pc" / "150 g" — amount still to buy, rounded sensibly. */
export function formatAmount(n: number, unit: string): string {
  return `${toBuy(n, unit)} ${unit}`.trim()
}
