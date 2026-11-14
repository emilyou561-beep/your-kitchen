import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RECIPES, SOUP_LABEL, formatMinutes } from '../data/recipes'
import type { Recipe, SoupType } from '../data/recipes'
import { AVAILABILITY_LABEL, formatAmount, ingredientName, rankRecipes } from '../lib/match'
import type { Availability, LineCheck, RecipeMatch } from '../lib/match'
import { RecipeImage } from '../components/RecipeImage'
import { Stamp } from '../components/Stamp'
import { ArrowRight, Check, Clock, Plus, Search } from '../components/Icons'
import { useKitchen } from '../state/KitchenContext'
import './Recipes.css'

type Filter = 'all' | Availability
type SoupFilter = 'all' | SoupType
type TimeCap = 0 | 30 | 60

const RAMEN = RECIPES.filter((r) => r.kind === 'ramen')
const BASICS = RECIPES.filter((r) => r.kind === 'basic')
const SIDES = RECIPES.filter((r) => r.kind === 'side')
const SOUPS = (Object.keys(SOUP_LABEL) as SoupType[]).filter((s) => RAMEN.some((r) => r.soup === s))

function haystack(r: Recipe): string {
  return [r.name, r.blurb, r.region ?? '', r.soup ? SOUP_LABEL[r.soup] : '', ...r.ingredients.map((i) => ingredientName(i.id))]
    .join(' ')
    .toLowerCase()
}

export function Recipes() {
  const { inventory, selected, routes, toggleRecipe, buildGroceryList, notify } = useKitchen()
  const [filter, setFilter] = useState<Filter>('all')
  const [soup, setSoup] = useState<SoupFilter>('all')
  const [time, setTime] = useState<TimeCap>(0)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const q = query.trim().toLowerCase()
  const keep = (m: RecipeMatch) => (!time || m.minutes <= time) && (!q || haystack(m.recipe).includes(q))

  const ramen = useMemo(() => rankRecipes(RAMEN, inventory, routes).filter(keep), [inventory, routes, q, time]) // eslint-disable-line react-hooks/exhaustive-deps
  const bySoup = soup === 'all' ? ramen : ramen.filter((m) => m.recipe.soup === soup)
  const counts = useMemo(() => {
    const c = { ready: 0, almost: 0, shop: 0 }
    bySoup.forEach((m) => c[m.status]++)
    return c
  }, [bySoup])
  const shown = filter === 'all' ? bySoup : bySoup.filter((m) => m.status === filter)

  const basics = useMemo(() => rankRecipes(BASICS, inventory).filter(keep), [inventory, q, time]) // eslint-disable-line react-hooks/exhaustive-deps
  const sides = useMemo(() => rankRecipes(SIDES, inventory).filter(keep), [inventory, q, time]) // eslint-disable-line react-hooks/exhaustive-deps

  const makeList = () => {
    const n = buildGroceryList()
    notify(n === 0 ? 'You have everything you need' : `${n} item${n === 1 ? '' : 's'} on your list`)
    navigate('/list')
  }

  const clearFilters = () => {
    setQuery('')
    setTime(0)
    setFilter('all')
    setSoup('all')
  }

  return (
    <main id="main" className="yk-page yk-recipes">
      <div className="yk-page__head">
        <div>
          <span className="yk-page__deco" aria-hidden="true">
            ラーメン
          </span>
          <h1 className="yk-page__title">Ramen</h1>
        </div>
        <div className="yk-filter" role="group" aria-label="Filter by availability">
          {(
            [
              ['all', 'All', bySoup.length],
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
            Search ramen
          </label>
          <input
            id="recipe-search"
            type="search"
            placeholder="Search style, region or ingredient"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="yk-filter" role="group" aria-label="Cooking time">
          {(
            [
              [0, 'Any time'],
              [30, '≤ 30 min'],
              [60, '≤ 1 hr'],
            ] as [TimeCap, string][]
          ).map(([v, label]) => (
            <button key={v} type="button" className="yk-tab" aria-pressed={time === v} onClick={() => setTime(v)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="yk-filter yk-recipes__soups" role="group" aria-label="Soup style">
        <button type="button" className="yk-tab" aria-pressed={soup === 'all'} onClick={() => setSoup('all')}>
          All styles
        </button>
        {SOUPS.map((s) => (
          <button key={s} type="button" className="yk-tab" aria-pressed={soup === s} onClick={() => setSoup(s)}>
            {SOUP_LABEL[s]}
          </button>
        ))}
      </div>

      {inventory.length === 0 && (
        <p className="yk-recipes__hint">
          <Link to="/kitchen">Add ingredients</Link> to see which bowls you can make tonight.
        </p>
      )}

      {shown.length === 0 ? (
        <div className="yk-empty yk-panel">
          <p className="yk-empty__title">No bowls match</p>
          <p>Try a different style, search or time filter.</p>
          <button type="button" className="yk-btn yk-btn--secondary" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="yk-cards">
          {shown.map((m, i) => (
            <li key={m.recipe.id}>
              <RecipeCard match={m} index={i} selected={selected.includes(m.recipe.id)} onToggle={() => toggleRecipe(m.recipe.id)} />
            </li>
          ))}
        </ul>
      )}

      {basics.length > 0 && (
        <section className="yk-recipes__section" aria-labelledby="basics-h">
          <div className="yk-recipes__section-head">
            <span className="yk-page__deco" aria-hidden="true">
              基本
            </span>
            <h2 id="basics-h" className="yk-recipes__h2">
              Ramen Basics
            </h2>
            <p>Stocks, tare, oils, chashu, eggs and noodles for the authentic route.</p>
          </div>
          <ul className="yk-cards yk-cards--compact">
            {basics.map((m, i) => (
              <li key={m.recipe.id}>
                <RecipeCard match={m} index={i} selected={selected.includes(m.recipe.id)} onToggle={() => toggleRecipe(m.recipe.id)} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {sides.length > 0 && (
        <details className="yk-recipes__section yk-sides">
          <summary>
            <span className="yk-page__deco" aria-hidden="true">
              一品
            </span>
            <span className="yk-recipes__h2">Sides</span>
            <span className="yk-filter__n">{sides.length}</span>
          </summary>
          <ul className="yk-cards yk-cards--compact">
            {sides.map((m, i) => (
              <li key={m.recipe.id}>
                <RecipeCard match={m} index={i} selected={selected.includes(m.recipe.id)} onToggle={() => toggleRecipe(m.recipe.id)} />
              </li>
            ))}
          </ul>
        </details>
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

/** "Egg (2 pc more)" when some is at home, "Egg" when none. */
export function missingLabel(l: LineCheck): string {
  const name = ingredientName(l.ri.id)
  return l.short < l.need - 1e-9 ? `${name} (${formatAmount(l.short, l.ri.unit)} more)` : name
}

function RecipeCard({ match, index, selected, onToggle }: { match: RecipeMatch; index: number; selected: boolean; onToggle: () => void }) {
  const { recipe, status, missingEssential, minutes, route } = match
  const shown = missingEssential.slice(0, 4)
  return (
    <article className="yk-card" data-selected={selected} aria-labelledby={`r-${recipe.id}`}>
      <div className="yk-card__media">
        <RecipeImage recipe={recipe} route={route} />
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
        {recipe.region && (
          <p className="yk-card__tags">
            <span>{recipe.region}</span>
            {recipe.soup && <span>{SOUP_LABEL[recipe.soup]}</span>}
          </p>
        )}
        <p className="yk-card__meta">
          <Clock size={18} />
          {formatMinutes(minutes)}
          {recipe.authentic && (
            <span className="yk-card__route">{route === 'authentic' ? 'Authentic' : `Authentic ${formatMinutes(recipe.authentic.minutes)}`}</span>
          )}
        </p>
        {missingEssential.length > 0 ? (
          <p className="yk-card__missing">
            <span className="yk-card__missing-label">Missing:</span> {shown.map(missingLabel).join(', ')}
            {missingEssential.length > shown.length && ` +${missingEssential.length - shown.length} more`}
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
      {status === 'ready' && <Stamp delay={Math.min(index, 5) * 140} />}
    </article>
  )
}
