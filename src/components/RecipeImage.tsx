import { useState } from 'react'
import type { Recipe, RouteId } from '../data/recipes'
import { DishArt } from './DishArt'
import { LivePhoto } from './LivePhoto'
import { SOUP_AREAS } from '../data/photoSoup'

/**
 * Dish image. Ramen first try a photo at /images/ramen/<id>.jpg; if it is missing
 * (or fails to load) the hand-drawn illustration shows instead — so dropping a photo
 * into public/images/ramen/ is all it takes to upgrade a bowl.
 */
export function RecipeImage({
  recipe,
  route = 'quick',
  className = '',
  live = 'hover',
  aspect = 0.6,
}: {
  recipe: Recipe
  route?: RouteId
  className?: string
  live?: 'always' | 'hover'
  aspect?: number
}) {
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
        <LivePhoto src={photo} soup={SOUP_AREAS[recipe.id]} aspect={aspect} mode={recipe.soup && !['soupless', 'chilled'].includes(recipe.soup) ? live : 'hover'} onError={() => setFailed(true)} />
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
