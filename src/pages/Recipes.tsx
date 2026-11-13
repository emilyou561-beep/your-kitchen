import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RECIPES } from '../data/recipes'
import { AVAILABILITY_LABEL, formatAmount, ingredientName, rankRecipes } from '../lib/match'
import type { Availability, LineCheck, RecipeMatch } from '../lib/match'
import { RecipeImage } from '../components/RecipeImage'
import { ArrowRight, Check, Clock, Plus, Search } from '../components/Icons'
import { useKitchen } from '../state/KitchenContext'
import './Recipes.css'

type Filter = 'all' | Availability
type TimeCap = 0 | 15 | 30

export function Recipes() {
  const { inventory, selected, toggleRecipe, buildGroceryList, notify } = useKitchen()
  const [filter, setFilter] = useState<Filter>('all')
  const [time, setTime] = useState<TimeCap>(0)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const ranked = useMemo(() => rankRecipes(RECIPES, inventory), [inventory])

  const searched = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ranked.filter((m) => {
      if (time && m.recipe.minutes > time) return false
      if (!q) return true
      const hay = [m.recipe.name, m.recipe.blurb, ...m.recipe.ingredients.map((i) => ingredientName(i.id))]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [ranked, query, time])

  const counts = useMemo(() => {
    const c = { ready: 0, almost: 0, shop: 0 }
    searched.forEach((m) => c[m.status]++)
    return c
  }, [searched])

  const shown = filter === 'all' ? searched : searched.filter((m) => m.status === filter)

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
        <div className="yk-filter" role="group" aria-label="Filter by availability">
          {(
            [
              ['all', 'All', searched.length],
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

      <div className="yk-recipes__tools">
        <div className="yk-search yk-recipes__search">
          <Search className="yk-search__icon" />
          <label htmlFor="recipe-search" className="yk-visually-hidden">
            Search recipes
          </label>
          <input
            id="recipe-search"
            type="search"
            placeholder="Search dishes or ingredients"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="yk-filter" role="group" aria-label="Cooking time">
          {(
            [
              [0, 'Any time'],
              [15, '≤ 15 min'],
              [30, '≤ 30 min'],
            ] as [TimeCap, string][]
          ).map(([v, label]) => (
            <button key={v} type="button" className="yk-tab" aria-pressed={time === v} onClick={() => setTime(v)}>
              {label}
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
          <p className="yk-empty__title">No dishes match</p>
          <p>{query || time ? 'Try a different search or time filter.' : 'Add a few more ingredients to unlock these dishes.'}</p>
          {query || time || filter !== 'all' ? (
            <button
              type="button"
              className="yk-btn yk-btn--secondary"
              onClick={() => {
                setQuery('')
                setTime(0)
                setFilter('all')
              }}
            >
              Clear filters
            </button>
          ) : (
            <Link to="/kitchen" className="yk-btn yk-btn--secondary">
              Back to My Kitchen
            </Link>
          )}
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

/** "Egg (2 more)" when some is at home, "Egg" when none. */
export function missingLabel(l: LineCheck): string {
  const name = ingredientName(l.ri.id)
  return l.short < l.need - 1e-9 ? `${name} (${formatAmount(l.short, l.ri.unit)} more)` : name
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
            <span className="yk-card__missing-label">Missing:</span> {missingEssential.map(missingLabel).join(', ')}
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
