import type { Recipe } from '../data/recipes'
import { DishArt } from './DishArt'

/** Illustrated dish card art with the decorative Japanese name sign. */
export function RecipeImage({ recipe, className = '' }: { recipe: Recipe; className?: string }) {
  return (
    <div className={`yk-recipe-img yk-recipe-img--art ${className}`} role="img" aria-label={`Illustration of ${recipe.name}`}>
      <DishArt id={recipe.id} />
      <span
        className="yk-recipe-img__ja"
        aria-hidden="true"
        style={recipe.nameJa.length > 7 ? { fontSize: 12, letterSpacing: 0 } : recipe.nameJa.length > 5 ? { fontSize: 15 } : undefined}
      >
        {recipe.nameJa}
      </span>
    </div>
  )
}
