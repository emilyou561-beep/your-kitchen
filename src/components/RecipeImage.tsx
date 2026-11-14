import type { Recipe, RouteId } from '../data/recipes'
import { DishArt } from './DishArt'

/** Illustrated dish card art with the decorative Japanese name sign. */
export function RecipeImage({ recipe, route = 'quick', className = '' }: { recipe: Recipe; route?: RouteId; className?: string }) {
  return (
    <div
      className={`yk-recipe-img yk-recipe-img--art ${className}`}
      role="img"
      aria-label={`Illustration of ${recipe.name}${route === 'authentic' && recipe.authentic ? ', authentic version' : ''}`}
    >
      <DishArt id={recipe.id} recipe={recipe} route={route} />
      {route === 'authentic' && recipe.authentic && (
        <span className="yk-recipe-img__route" aria-hidden="true">
          Authentic
        </span>
      )}
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
