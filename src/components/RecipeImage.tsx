import { useState } from 'react'
import type { Recipe, RouteId } from '../data/recipes'
import { DishArt } from './DishArt'
import { LivePhoto } from './LivePhoto'
import { SOUP_AREAS } from '../data/photoSoup'

/**
 * Dish image. Ramen and side dishes try their matching generated photo first; if it
 * is missing (or fails to load) the hand-drawn illustration shows instead.
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
  const photo = recipe.kind === 'ramen'
    ? `${import.meta.env.BASE_URL}images/ramen/${recipe.id}.jpg`
    : recipe.kind === 'side'
      ? `${import.meta.env.BASE_URL}images/sides/${recipe.id}.jpg`
      : recipe.image
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
