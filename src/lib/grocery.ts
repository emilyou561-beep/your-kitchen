import { INGREDIENT_BY_ID } from '../data/ingredients'
import { RECIPE_BY_ID, routeOf } from '../data/recipes'
import type { RouteId } from '../data/recipes'
import { shortfall, stockMap } from './match'
import type { Stock } from './match'
import { convert, toBuy } from './units'

export interface GroceryItem {
  key: string
  name: string
  qty: string
  unit: string
  checked: boolean
  /** Recipe names this item was generated for. Empty for items added by hand. */
  forRecipes: string[]
  ingredientId?: string
}

export interface BuildOptions {
  servings?: Record<string, number>
  routes?: Record<string, RouteId>
  includeOptional?: boolean
}

/**
 * Build the grocery list for the selected recipes.
 * Needs are summed across recipes first, then compared with stock once —
 * two dishes needing 2 eggs each with 3 eggs at home means buy 1, not 4.
 * Hand-added items and existing checkmarks are kept.
 */
export function buildGrocery(
  selected: string[],
  stock: Stock[],
  previous: GroceryItem[] = [],
  { servings = {}, routes = {}, includeOptional = false }: BuildOptions = {},
): GroceryItem[] {
  const totals = new Map<string, { qty: number; unit: string; recipes: string[] }>()

  for (const rid of selected) {
    const recipe = RECIPE_BY_ID[rid]
    if (!recipe) continue
    const factor = (servings[rid] ?? recipe.serves) / recipe.serves
    for (const ri of routeOf(recipe, routes[rid]).ingredients) {
      if (!ri.essential && !includeOptional) continue
      const need = ri.qty * factor
      const t = totals.get(ri.id)
      if (!t) {
        totals.set(ri.id, { qty: need, unit: ri.unit, recipes: [recipe.name] })
        continue
      }
      const converted = convert(need, ri.unit, t.unit)
      t.qty += converted ?? 0 // inconvertible extra need: keep first unit, list the recipe
      if (!t.recipes.includes(recipe.name)) t.recipes.push(recipe.name)
    }
  }

  const map = stockMap(stock)
  const prevChecked = new Map(previous.filter((g) => g.ingredientId).map((g) => [g.ingredientId!, g.checked]))
  const generated: GroceryItem[] = []
  for (const [id, t] of totals) {
    const short = shortfall(t.qty, t.unit, map.get(id))
    if (short <= 1e-9) continue
    generated.push({
      key: `ing-${id}`,
      ingredientId: id,
      name: INGREDIENT_BY_ID[id]?.name ?? id,
      qty: String(toBuy(short, t.unit)),
      unit: t.unit,
      checked: prevChecked.get(id) ?? false,
      forRecipes: t.recipes,
    })
  }

  const manual = previous.filter((g) => !g.ingredientId)
  return [...generated, ...manual]
}

/** Plain-text version for pasting into Notes / Messages. */
export function groceryText(items: GroceryItem[]): string {
  const lines = items.map((g) => `${g.checked ? '☑' : '☐'} ${g.name}${g.qty ? ` — ${g.qty}${g.unit ? ' ' + g.unit : ''}` : ''}`)
  return ['Yoru Kitchen — Grocery List', ...lines].join('\n')
}
