import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RECIPES } from '../data/recipes'
import { AVAILABILITY_LABEL, ingredientName, rankRecipes } from '../lib/match'
import type { Availability, RecipeMatch } from '../lib/match'
import { RecipeImage } from '../components/RecipeImage'
import { ArrowRight, Check, Clock, Plus } from '../components/Icons'
import { useKitchen } from '../state/KitchenContext'
import './Recipes.css'

type Filter = 'all' | Availability

export function Recipes() {
  const { owned, inventory, selected, toggleRecipe, buildGroceryList, notify } = useKitchen()
  const [filter, setFilter] = useState<Filter>('all')
  const navigate = useNavigate()

  const ranked = useMemo(() => rankRecipes(RECIPES, owned), [owned])
  const counts = useMemo(() => {
    const c = { ready: 0, almost: 0, shop: 0 }
    ranked.forEach((m) => c[m.status]++)
    return c
  }, [ranked])
  const shown = filter === 'all' ? ranked : ranked.filter((m) => m.status === filter)

  const makeList = () => {
    const n = buildGroceryList()
    notify(n === 0 ? 'You have everything you need' : `${n} item${n === 1 ? '' : 's'} on your list`)
    navigate('/list')
  }

  return (
    <main id="main" className="yk-page yk-recipes">
      <div className="yk-page__head">
        <div>
          <span className="yk-page__deco" aria-hidden="true">
            献立
          </span>
          <h1 className="yk-page__title">Recipes</h1>
        </div>
        <div className="yk-filter" role="group" aria-label="Filter recipes">
          {(
            [
              ['all', 'All', ranked.length],
              ['ready', 'Ready', counts.ready],
              ['almost', 'Almost', counts.almost],
            ] as [Filter, string, number][]
          ).map(([id, label, n]) => (
            <button key={id} type="button" className="yk-tab" aria-pressed={filter === id} onClick={() => setFilter(id)}>
              {label} <span className="yk-filter__n">{n}</span>
            </button>
          ))}
        </div>
      </div>

      {inventory.length === 0 && (
        <p className="yk-recipes__hint">
          <Link to="/kitchen">Add ingredients</Link> to see what you can cook right now.
        </p>
      )}

      {shown.length === 0 ? (
        <div className="yk-empty yk-panel">
          <p className="yk-empty__title">Nothing here yet</p>
          <p>Add a few more ingredients to unlock these dishes.</p>
          <Link to="/kitchen" className="yk-btn yk-btn--secondary">
            Back to My Kitchen
          </Link>
        </div>
      ) : (
        <ul className="yk-cards">
          {shown.map((m) => (
            <li key={m.recipe.id}>
              <RecipeCard match={m} selected={selected.includes(m.recipe.id)} onToggle={() => toggleRecipe(m.recipe.id)} />
            </li>
          ))}
        </ul>
      )}

      {selected.length > 0 && (
        <div className="yk-planbar" role="region" aria-label="Selected dishes">
          <span className="yk-planbar__text">
            <strong>{selected.length}</strong> {selected.length === 1 ? 'dish' : 'dishes'} selected
          </span>
          <button type="button" className="yk-btn yk-btn--primary" onClick={makeList}>
            Make Grocery List
            <ArrowRight />
          </button>
        </div>
      )}
    </main>
  )
}

export function StatusBadge({ status }: { status: Availability }) {
  return (
    <span className={`yk-status yk-status--${status}`}>
      <span className="yk-status__dot" aria-hidden="true" />
      {AVAILABILITY_LABEL[status]}
    </span>
  )
}

function RecipeCard({ match, selected, onToggle }: { match: RecipeMatch; selected: boolean; onToggle: () => void }) {
  const { recipe, status, missingEssential } = match
  return (
    <article className="yk-card" data-selected={selected} aria-labelledby={`r-${recipe.id}`}>
      <div className="yk-card__media">
        <RecipeImage recipe={recipe} />
        <StatusBadge status={status} />
      </div>
      <div className="yk-card__body">
        <div className="yk-card__titlerow">
          <h2 id={`r-${recipe.id}`} className="yk-card__title">
            <Link to={`/recipes/${recipe.id}`} className="yk-card__link">
              {recipe.name}
            </Link>
          </h2>
          <span className="yk-card__ja" aria-hidden="true">
            {recipe.nameJa}
          </span>
        </div>
        <p className="yk-card__meta">
          <Clock size={18} />
          {recipe.minutes} min
        </p>
        {missingEssential.length > 0 ? (
          <p className="yk-card__missing">
            <span className="yk-card__missing-label">Missing:</span>{' '}
            {missingEssential.map((i) => ingredientName(i.id)).join(', ')}
          </p>
        ) : (
          <p className="yk-card__missing yk-card__missing--none">You have every essential.</p>
        )}
        <button
          type="button"
          className={`yk-btn yk-btn--sm ${selected ? 'yk-btn--navy' : 'yk-btn--secondary'} yk-card__toggle`}
          aria-pressed={selected}
          onClick={onToggle}
        >
          {selected ? <Check size={18} /> : <Plus size={18} />}
          {selected ? 'Selected' : 'Select'}
          <span className="yk-visually-hidden"> {recipe.name}</span>
        </button>
      </div>
    </article>
  )
}
