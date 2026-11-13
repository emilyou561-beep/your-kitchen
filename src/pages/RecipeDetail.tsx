import { Link, useNavigate, useParams } from 'react-router-dom'
import { RECIPE_BY_ID } from '../data/recipes'
import { formatAmount, ingredientName, matchRecipe } from '../lib/match'
import { tidy } from '../lib/units'
import { RecipeImage } from '../components/RecipeImage'
import { Stamp } from '../components/Stamp'
import { ArrowRight, Check, Clock, Minus, Plus } from '../components/Icons'
import { useKitchen } from '../state/KitchenContext'
import { StatusBadge } from './Recipes'
import './RecipeDetail.css'

export function RecipeDetail() {
  const { id = '' } = useParams()
  const recipe = RECIPE_BY_ID[id]
  const { inventory, selected, servings, setServings, toggleRecipe, addIngredient, buildGroceryList, notify } = useKitchen()
  const navigate = useNavigate()

  if (!recipe) {
    return (
      <main id="main" className="yk-page">
        <div className="yk-empty yk-panel">
          <p className="yk-empty__title">Recipe not found</p>
          <Link to="/recipes" className="yk-btn yk-btn--secondary">
            All recipes
          </Link>
        </div>
      </main>
    )
  }

  const serves = servings[recipe.id] ?? recipe.serves
  const match = matchRecipe(recipe, inventory, serves)
  const isSelected = selected.includes(recipe.id)

  const makeList = () => {
    const n = buildGroceryList(recipe.id)
    notify(n === 0 ? 'You have everything you need' : `${n} item${n === 1 ? '' : 's'} on your list`)
    navigate('/list')
  }

  return (
    <main id="main" className="yk-page yk-detail">
      <Link to="/recipes" className="yk-detail__back">
        ← All recipes
      </Link>

      <div className="yk-detail__grid">
        <figure className="yk-detail__photo">
          <RecipeImage recipe={recipe} />
          <StatusBadge status={match.status} />
          {match.status === 'ready' && <Stamp key={recipe.id} />}
        </figure>

        <div className="yk-detail__info">
          <span className="yk-page__deco" aria-hidden="true">
            {recipe.nameJa}
          </span>
          <h1 className="yk-page__title">{recipe.name}</h1>
          <p className="yk-detail__blurb">{recipe.blurb}</p>
          <div className="yk-detail__meta">
            <span className="yk-detail__time">
              <Clock size={20} /> {recipe.minutes} min
            </span>
            <div className="yk-stepper" role="group" aria-label="Servings">
              <button
                type="button"
                className="yk-stepper__btn"
                aria-label="Fewer servings"
                disabled={serves <= 1}
                onClick={() => setServings(recipe.id, serves - 1)}
              >
                <Minus size={16} />
              </button>
              <span className="yk-detail__serves" aria-live="polite">
                Serves {serves}
              </span>
              <button
                type="button"
                className="yk-stepper__btn"
                aria-label="More servings"
                disabled={serves >= 12}
                onClick={() => setServings(recipe.id, serves + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="yk-detail__actions">
            <button
              type="button"
              className={`yk-btn ${isSelected ? 'yk-btn--navy' : 'yk-btn--secondary'}`}
              aria-pressed={isSelected}
              onClick={() => toggleRecipe(recipe.id)}
            >
              {isSelected ? <Check /> : <Plus />}
              {isSelected ? 'Selected' : 'Select dish'}
            </button>
            {match.missingEssential.length > 0 && (
              <button type="button" className="yk-btn yk-btn--primary" onClick={makeList}>
                Add missing to list
                <ArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="yk-detail__cols">
        <section className="yk-panel yk-detail__ings" aria-labelledby="ings-h">
          <h2 id="ings-h" className="yk-detail__h2">
            Ingredients
          </h2>
          <ul>
            {match.lines.map(({ ri, need, short }) => {
              const has = short <= 1e-9
              const partial = !has && short < need - 1e-9
              const name = ingredientName(ri.id)
              return (
                <li key={ri.id} className="yk-ing" data-has={has} data-partial={partial}>
                  <span className="yk-ing__mark" aria-hidden="true">
                    {has ? <Check size={16} /> : partial ? <Minus size={16} /> : null}
                  </span>
                  <span className="yk-ing__name">
                    {name}
                    {!ri.essential && <span className="yk-ing__opt"> (optional)</span>}
                    {partial && <span className="yk-ing__short"> · need {formatAmount(short, ri.unit)} more</span>}
                  </span>
                  <span className="yk-ing__qty">
                    {tidy(need)} {ri.unit}
                  </span>
                  <span className="yk-visually-hidden">
                    {has ? ', you have enough' : partial ? ', not enough at home' : ', missing'}
                  </span>
                  {!has && !inventory.some((i) => i.ingredientId === ri.id) ? (
                    <button
                      type="button"
                      className="yk-icon-btn yk-ing__add"
                      aria-label={`I have ${name}`}
                      title="I have this"
                      onClick={() => addIngredient(ri.id)}
                    >
                      <Plus size={18} />
                    </button>
                  ) : (
                    <span className="yk-ing__add" aria-hidden="true" />
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <section className="yk-detail__steps" aria-labelledby="steps-h">
          <h2 id="steps-h" className="yk-detail__h2">
            Steps
          </h2>
          <ol>
            {recipe.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}
