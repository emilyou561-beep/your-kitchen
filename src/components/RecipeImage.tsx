import type { Recipe } from '../data/recipes'

/**
 * Recipe photo with a printed-card frame. Until a real photo exists, renders an
 * illustrated bowl placeholder tinted for the dish (never a broken image).
 */
export function RecipeImage({ recipe, className = '' }: { recipe: Recipe; className?: string }) {
  if (recipe.image) {
    return (
      <img
        className={`yk-recipe-img ${className}`}
        src={recipe.image}
        alt={`${recipe.name} in a Japanese ceramic bowl`}
        loading="lazy"
      />
    )
  }
  return (
    <div className={`yk-recipe-img yk-recipe-img--placeholder ${className}`} role="img" aria-label={`${recipe.name} (photo coming soon)`}>
      <svg viewBox="0 0 200 120" aria-hidden="true" focusable="false">
        <rect width="200" height="120" fill="#234D76" />
        <circle cx="100" cy="140" r="110" fill="none" stroke="#D6A642" strokeOpacity="0.25" strokeWidth="18" strokeDasharray="4 10" />
        <ellipse cx="100" cy="66" rx="58" ry="12" fill={recipe.tint} stroke="#28251F" strokeWidth="2.5" />
        <path d="M42 66h116a58 40 0 0 1-116 0z" fill="#F5E8CD" stroke="#28251F" strokeWidth="2.5" />
        <path d="M58 82c10 6 20 6 30 0s20-6 30 0 20 6 30 0" fill="none" stroke="#234D76" strokeWidth="2.5" />
        <path d="M84 46c0-6 6-6 6-12M104 46c0-6 6-6 6-12" fill="none" stroke="#F5E8CD" strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="yk-recipe-img__ja" aria-hidden="true">
        {recipe.nameJa}
      </span>
    </div>
  )
}
