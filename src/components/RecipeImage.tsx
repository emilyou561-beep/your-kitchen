import { useState } from 'react'
import type { Recipe, RouteId } from '../data/recipes'
import { DishArt } from './DishArt'

/**
 * Dish image. Ramen first try a photo at /images/ramen/<id>.jpg; if it is missing
 * (or fails to load) the hand-drawn illustration shows instead — so dropping a photo
 * into public/images/ramen/ is all it takes to upgrade a bowl.
 */
export function RecipeImage({ recipe, route = 'quick', className = '' }: { recipe: Recipe; route?: RouteId; className?: string }) {
  const photo = recipe.kind === 'ramen' ? `/images/ramen/${recipe.id}.jpg` : recipe.image
  const [failed, setFailed] = useState(false)
  const showPhoto = !!photo && !failed
  const authentic = route === 'authentic' && !!recipe.authentic
  return (
    <div
      className={`yk-recipe-img yk-recipe-img--art${showPhoto ? ' yk-recipe-img--photo' : ''} ${className}`}
      role="img"
      aria-label={`${showPhoto ? 'Photo' : 'Illustration'} of ${recipe.name}${authentic ? ', authentic version' : ''}`}
    >
      {showPhoto ? (
        <img src={photo} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <DishArt id={recipe.id} recipe={recipe} route={route} />
      )}
      {authentic && (
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
