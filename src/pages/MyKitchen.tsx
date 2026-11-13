import { useMemo, useRef, useState } from 'react'
import type { DragEvent } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, INGREDIENTS, INGREDIENT_BY_ID, STORAGE_LABEL, UNITS, searchIngredients } from '../data/ingredients'
import type { Category, Storage } from '../data/ingredients'
import { ArrowRight, Check, Minus, Plus, Search, Trash } from '../components/Icons'
import { useKitchen } from '../state/KitchenContext'
import { buzz, flyTo, replay } from '../lib/tactile'
import './MyKitchen.css'

const STORAGES: Storage[] = ['fridge', 'freezer', 'pantry']
const DRAG_TYPE = 'application/x-yoru-ingredient'

export function MyKitchen() {
  const { inventory, owned, addIngredient, removeIngredient, updateIngredient, addPantryBasics, clearInventory } = useKitchen()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('vegetables')
  const [dropActive, setDropActive] = useState(false)
  const panelRef = useRef<HTMLElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  /** Add with a little throw: tile squishes, chip arcs into the fridge, fridge wobbles. */
  const throwIn = (id: string, name: string, tile: HTMLElement) => {
    addIngredient(id, true)
    replay(tile, 'yk-squish')
    buzz()
    flyTo(tile, [countRef.current, document.querySelector('[data-nav="kitchen"]')], name, (landed) => {
      replay(panelRef.current, 'yk-wobble')
      replay(landed, 'yk-pop')
    })
  }

  const results = useMemo(
    () => (query.trim() ? searchIngredients(query) : INGREDIENTS.filter((i) => i.category === category)),
    [query, category],
  )

  const grouped = useMemo(
    () => STORAGES.map((s) => ({ storage: s, items: inventory.filter((i) => i.storage === s) })),
    [inventory],
  )

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDropActive(false)
    const id = e.dataTransfer.getData(DRAG_TYPE)
    if (id) {
      addIngredient(id, true)
      buzz()
      replay(panelRef.current, 'yk-wobble')
      replay(countRef.current, 'yk-pop')
    }
  }

  return (
    <main id="main" className="yk-page yk-kitchen">
      <div className="yk-page__head">
        <div>
          <span className="yk-page__deco" aria-hidden="true">
            冷蔵庫
          </span>
          <h1 className="yk-page__title">My Kitchen</h1>
        </div>
        <Link
          to="/recipes"
          className="yk-btn yk-btn--primary"
          aria-disabled={inventory.length === 0}
          onClick={(e) => inventory.length === 0 && e.preventDefault()}
          data-disabled={inventory.length === 0}
        >
          See Recipes
          <ArrowRight />
        </Link>
      </div>

      <div className="yk-kitchen__grid">
        {/* ── Market: search + browse ── */}
        <section className="yk-market yk-panel" aria-labelledby="market-h">
          <h2 id="market-h" className="yk-visually-hidden">
            Add ingredients
          </h2>
          <div className="yk-search">
            <Search className="yk-search__icon" />
            <label htmlFor="ing-search" className="yk-visually-hidden">
              Search ingredients
            </label>
            <input
              id="ing-search"
              type="search"
              placeholder="Search ingredients"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {!query.trim() && (
            <div className="yk-tabs" role="group" aria-label="Ingredient categories">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={category === c.id}
                  className="yk-tab"
                  onClick={() => setCategory(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {results.length === 0 ? (
            <p className="yk-market__none" role="status">
              No match for “{query}”. Try another name, like “negi” or “scallion”.
            </p>
          ) : (
            <ul className="yk-tiles" aria-label={query.trim() ? 'Search results' : 'Ingredients'}>
              {results.map((ing) => {
                const has = owned.has(ing.id)
                return (
                  <li key={ing.id}>
                    <button
                      type="button"
                      className="yk-tile"
                      data-owned={has}
                      aria-pressed={has}
                      aria-label={has ? `${ing.name}, in your kitchen` : `Add ${ing.name}`}
                      draggable={!has}
                      onDragStart={(e) => {
                        e.dataTransfer.setData(DRAG_TYPE, ing.id)
                        e.dataTransfer.effectAllowed = 'copy'
                      }}
                      onClick={(e) => (has ? removeIngredient(ing.id) : throwIn(ing.id, ing.name, e.currentTarget))}
                    >
                      <span className="yk-tile__name">{ing.name}</span>
                      {ing.romaji && <span className="yk-tile__romaji">{ing.romaji}</span>}
                      <span className="yk-tile__mark" aria-hidden="true">
                        {has ? <Check size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        {/* ── Your fridge ── */}
        <section
          ref={panelRef}
          className="yk-fridge-list yk-panel"
          aria-labelledby="fridge-h"
          data-drop={dropActive}
          onDragOver={(e) => {
            if (e.dataTransfer.types.includes(DRAG_TYPE)) {
              e.preventDefault()
              setDropActive(true)
            }
          }}
          onDragLeave={() => setDropActive(false)}
          onDrop={onDrop}
        >
          <div className="yk-fridge-list__head">
            <h2 id="fridge-h">In your kitchen</h2>
            <span ref={countRef} className="yk-fridge-list__count">
              {inventory.length}
            </span>
          </div>
          <div className="yk-fridge-list__tools">
            <button type="button" className="yk-btn yk-btn--secondary yk-btn--sm" onClick={addPantryBasics}>
              <Plus size={18} /> Pantry basics
            </button>
            {inventory.length > 0 && (
              <button type="button" className="yk-btn yk-btn--secondary yk-btn--sm" onClick={clearInventory}>
                <Trash size={18} /> Clear all
              </button>
            )}
          </div>

          {inventory.length === 0 ? (
            <div className="yk-empty yk-fridge-list__empty">
              <p className="yk-empty__title">Your fridge is empty</p>
              <p>Tap an ingredient to add it, or start with the pantry basics.</p>
            </div>
          ) : (
            grouped.map(
              ({ storage, items }) =>
                items.length > 0 && (
                  <div key={storage} className="yk-shelf">
                    <h3 className="yk-shelf__label">{STORAGE_LABEL[storage]}</h3>
                    <ul className="yk-shelf__items">
                      {items.map((item) => {
                        const ing = INGREDIENT_BY_ID[item.ingredientId]
                        if (!ing) return null
                        const qtyId = `qty-${ing.id}`
                        return (
                          <li key={ing.id} className="yk-row">
                            <span className="yk-row__name">{ing.name}</span>
                            <div className="yk-stepper" role="group" aria-label={`${ing.name} quantity`}>
                              <button
                                type="button"
                                className="yk-stepper__btn"
                                aria-label={`Less ${ing.name}`}
                                onClick={() => updateIngredient(ing.id, { qty: Math.max(0, +(item.qty - 1).toFixed(2)) })}
                              >
                                <Minus size={16} />
                              </button>
                              <label htmlFor={qtyId} className="yk-visually-hidden">
                                {ing.name} amount
                              </label>
                              <input
                                id={qtyId}
                                className="yk-stepper__input"
                                type="number"
                                inputMode="decimal"
                                min={0}
                                step="any"
                                value={item.qty}
                                onChange={(e) => updateIngredient(ing.id, { qty: Math.max(0, Number(e.target.value)) })}
                              />
                              <button
                                type="button"
                                className="yk-stepper__btn"
                                aria-label={`More ${ing.name}`}
                                onClick={() => updateIngredient(ing.id, { qty: +(item.qty + 1).toFixed(2) })}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <label className="yk-visually-hidden" htmlFor={`unit-${ing.id}`}>
                              {ing.name} unit
                            </label>
                            <select
                              id={`unit-${ing.id}`}
                              className="yk-select"
                              value={item.unit}
                              onChange={(e) => updateIngredient(ing.id, { unit: e.target.value })}
                            >
                              {(UNITS.includes(item.unit) ? UNITS : [item.unit, ...UNITS]).map((u) => (
                                <option key={u} value={u}>
                                  {u}
                                </option>
                              ))}
                            </select>
                            <label className="yk-visually-hidden" htmlFor={`store-${ing.id}`}>
                              {ing.name} storage
                            </label>
                            <select
                              id={`store-${ing.id}`}
                              className="yk-select"
                              value={item.storage}
                              onChange={(e) => updateIngredient(ing.id, { storage: e.target.value as Storage })}
                            >
                              {STORAGES.map((s) => (
                                <option key={s} value={s}>
                                  {STORAGE_LABEL[s]}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              className="yk-icon-btn yk-row__remove"
                              aria-label={`Remove ${ing.name}`}
                              onClick={() => removeIngredient(ing.id)}
                            >
                              <Trash size={20} />
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ),
            )
          )}
        </section>
      </div>
    </main>
  )
}
