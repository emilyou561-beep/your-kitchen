import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Printer, Trash } from '../components/Icons'
import { TearStub } from '../components/TearStub'
import { groceryText } from '../lib/grocery'
import { buzz } from '../lib/tactile'
import { useKitchen } from '../state/KitchenContext'
import { RECIPE_BY_ID } from '../data/recipes'
import './GroceryList.css'

/** Hand-drawn pen stroke across a bought item. */
function Strike({ seed }: { seed: number }) {
  const w = 3 + (seed % 3)
  return (
    <svg className="yk-strike" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={`M1 ${7 + (seed % 2)} C 18 ${w}, 36 ${10 - w}, 55 6 S 86 ${4 + (seed % 3)}, 99 6`} pathLength={1} />
    </svg>
  )
}

export function GroceryList() {
  const {
    grocery,
    selected,
    includeOptional,
    setIncludeOptional,
    buildGroceryList,
    updateGroceryItem,
    removeGroceryItem,
    addGroceryItem,
    clearChecked,
    moveCheckedToKitchen,
    notify,
  } = useKitchen()
  const [draft, setDraft] = useState('')
  // Bumped whenever the list is (re)printed so the receipt animation replays.
  const [printKey, setPrintKey] = useState(0)
  const left = grocery.filter((g) => !g.checked).length
  const done = grocery.length - left
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

  const refresh = () => {
    const n = buildGroceryList()
    setPrintKey((k) => k + 1)
    notify(n === 0 ? 'You have everything for the selected dishes' : `List updated — ${n} item${n === 1 ? '' : 's'} to buy`)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(groceryText(grocery))
      notify('List copied')
    } catch {
      notify('Copy is not available in this browser')
    }
  }

  return (
    <main id="main" className="yk-page yk-grocery">
      <div className="yk-page__head yk-grocery__head">
        <div>
          <span className="yk-page__deco" aria-hidden="true">
            買い物
          </span>
          <h1 className="yk-page__title">Grocery List</h1>
        </div>
        <div className="yk-grocery__tools">
          <button type="button" className="yk-btn yk-btn--secondary yk-btn--sm" onClick={copy} disabled={grocery.length === 0}>
            Copy
          </button>
          <button type="button" className="yk-btn yk-btn--secondary yk-btn--sm" onClick={() => window.print()} disabled={grocery.length === 0}>
            <Printer size={18} /> Print
          </button>
        </div>
      </div>

      <div className="yk-printer" aria-hidden="true">
        <span className="yk-printer__slot" />
        <span className="yk-printer__light" />
      </div>

      <div className="yk-receipt yk-printing" key={printKey}>
        <div className="yk-receipt__top" aria-hidden="true">
          <span className="yk-receipt__shop">YORU KITCHEN</span>
          <span className="yk-receipt__jp">夜の台所 · 買い物メモ</span>
          <span className="yk-receipt__date">{today}</span>
        </div>

        {selected.length > 0 && (
          <div className="yk-receipt__for">
            <p>For: {selected.map((id) => RECIPE_BY_ID[id]?.name).filter(Boolean).join(', ')}</p>
            <div className="yk-receipt__opts">
              <label className="yk-check">
                <input type="checkbox" checked={includeOptional} onChange={(e) => setIncludeOptional(e.target.checked)} />
                Include optional ingredients
              </label>
              <button type="button" className="yk-btn yk-btn--secondary yk-btn--sm" onClick={refresh}>
                Update from recipes
              </button>
            </div>
          </div>
        )}

        {grocery.length === 0 ? (
          <div className="yk-receipt__empty">
            <p className="yk-empty__title">Your list is empty</p>
            <p>Select dishes and we’ll list what’s missing.</p>
            <Link to="/recipes" className="yk-btn yk-btn--primary">
              Browse Recipes
            </Link>
          </div>
        ) : (
          <ul className="yk-receipt__items" aria-label="Items to buy">
            {grocery.map((g, i) => (
              <li key={g.key} className="yk-line" data-checked={g.checked}>
                <input
                  id={`chk-${g.key}`}
                  type="checkbox"
                  className="yk-line__check"
                  checked={g.checked}
                  onChange={(e) => {
                    if (e.target.checked) buzz(8)
                    updateGroceryItem(g.key, { checked: e.target.checked })
                  }}
                />
                <label htmlFor={`chk-${g.key}`} className="yk-visually-hidden">
                  Bought {g.name}
                </label>
                <div className="yk-line__main">
                  <span className="yk-line__namewrap">
                    <label htmlFor={`name-${g.key}`} className="yk-visually-hidden">
                      Item name
                    </label>
                    <input
                      id={`name-${g.key}`}
                      className="yk-line__name"
                      value={g.name}
                      onChange={(e) => updateGroceryItem(g.key, { name: e.target.value })}
                    />
                    {g.checked && <Strike seed={i} />}
                  </span>
                  {g.forRecipes.length > 0 && <span className="yk-line__for">{g.forRecipes.join(', ')}</span>}
                </div>
                <span className="yk-line__dots" aria-hidden="true" />
                <label htmlFor={`qty-${g.key}`} className="yk-visually-hidden">
                  {g.name} quantity
                </label>
                <input
                  id={`qty-${g.key}`}
                  className="yk-line__qty"
                  inputMode="decimal"
                  value={g.qty}
                  onChange={(e) => updateGroceryItem(g.key, { qty: e.target.value })}
                />
                <label htmlFor={`unit-${g.key}`} className="yk-visually-hidden">
                  {g.name} unit
                </label>
                <input
                  id={`unit-${g.key}`}
                  className="yk-line__unit"
                  value={g.unit}
                  placeholder="unit"
                  onChange={(e) => updateGroceryItem(g.key, { unit: e.target.value })}
                />
                <button type="button" className="yk-line__remove" aria-label={`Remove ${g.name}`} onClick={() => removeGroceryItem(g.key)}>
                  <Trash size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <form
          className="yk-receipt__add"
          onSubmit={(e) => {
            e.preventDefault()
            addGroceryItem(draft)
            setDraft('')
          }}
        >
          <label htmlFor="add-item" className="yk-visually-hidden">
            Add an item
          </label>
          <input id="add-item" placeholder="Add an item…" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <button type="submit" className="yk-icon-btn" aria-label="Add item" disabled={!draft.trim()}>
            <Plus size={20} />
          </button>
        </form>

        <div className="yk-receipt__total">
          <span>Items left</span>
          <span aria-live="polite">{left}</span>
        </div>
        <p className="yk-receipt__thanks" aria-hidden="true">
          ありがとうございました
        </p>
      </div>

      {done > 0 && (
        <>
          <TearStub count={done} onTear={() => moveCheckedToKitchen(true)} />
          <div className="yk-grocery__after">
            <button type="button" className="yk-btn yk-btn--secondary yk-btn--sm" onClick={clearChecked}>
              <Trash size={18} /> Just clear checked
            </button>
          </div>
        </>
      )}
    </main>
  )
}
