import { INGREDIENT_BY_ID } from '../data/ingredients'
import type { Recipe, RecipeIngredient } from '../data/recipes'

export type Availability = 'ready' | 'almost' | 'shop'

export interface RecipeMatch {
  recipe: Recipe
  status: Availability
  have: RecipeIngredient[]
  missingEssential: RecipeIngredient[]
  missingOptional: RecipeIngredient[]
}

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  ready: 'Ready to cook',
  almost: 'Almost there',
  shop: 'Needs shopping',
}

export function matchRecipe(recipe: Recipe, owned: Set<string>): RecipeMatch {
  const have: RecipeIngredient[] = []
  const missingEssential: RecipeIngredient[] = []
  const missingOptional: RecipeIngredient[] = []
  for (const ri of recipe.ingredients) {
    if (owned.has(ri.id)) have.push(ri)
    else if (ri.essential) missingEssential.push(ri)
    else missingOptional.push(ri)
  }
  const status: Availability =
    missingEssential.length === 0 ? 'ready' : missingEssential.length <= 2 ? 'almost' : 'shop'
  return { recipe, status, have, missingEssential, missingOptional }
}

const ORDER: Record<Availability, number> = { ready: 0, almost: 1, shop: 2 }

export function rankRecipes(recipes: Recipe[], owned: Set<string>): RecipeMatch[] {
  return recipes
    .map((r) => matchRecipe(r, owned))
    .sort(
      (a, b) =>
        ORDER[a.status] - ORDER[b.status] ||
        a.missingEssential.length - b.missingEssential.length ||
        b.have.length - a.have.length ||
        a.recipe.minutes - b.recipe.minutes,
    )
}

export function ingredientName(id: string): string {
  return INGREDIENT_BY_ID[id]?.name ?? id
}
