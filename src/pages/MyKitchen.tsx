import { useMemo, useRef, useState } from 'react'
import type { DragEvent, PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, INGREDIENTS, INGREDIENT_BY_ID, STORAGE_LABEL, UNITS, searchIngredients } from '../data/ingredients'
import type { Category, Storage } from '../data/ingredients'
import { ArrowRight, Check, Minus, Plus, Search, Trash } from '../components/Icons'
import { ChopsticksCursor } from '../components/ChopsticksCursor'
import { ingredientPhoto, isSoftIngredient } from '../data/ingredientPhotos'
import { useKitchen } from '../state/KitchenContext'
import { buzz, flyTo, replay } from '../lib/tactile'
import './MyKitchen.css'

const STORAGES: Storage[] = ['fridge', 'freezer', 'pantry']
const DRAG_TYPE = 'application/x-yoru-ingredient'

export function MyKitchen() {
  const { inventory, owned, addIngredient, removeIngredient, updateIngredient, addPantryBasics, addRamenStarter, clearInventory } = useKitchen()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('ramen')
  const [dropActive, setDropActive] = useState(false)
  const [heldIngredient, setHeldIngredient] = useState<string | null>(null)
  const [cursorVisible, setCursorVisible] = useState(false)
  const panelRef = useRef<HTMLElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const heldRef = useRef<HTMLDivElement>(null)
  const suppressClickRef = useRef(false)
  const pointerDragRef = useRef<{
    id: string
    name: string
    tile: HTMLButtonElement
    pointerId: number
    startX: number
    startY: number
    moved: boolean
  } | null>(null)

  /** Add with a little throw: tile squishes, chip arcs onto the board, board wobbles. */
  const throwIn = (id: string, name: string, tile: HTMLElement) => {
    addIngredient(id, true)
    replay(tile, 'yk-squish')
    buzz()
    flyTo(tile, [boardRef.current, countRef.current, document.querySelector('[data-nav="kitchen"]')], name, (landed) => {
      replay(boardRef.current, 'yk-board-land')
      replay(panelRef.current, 'yk-wobble')
      replay(landed, 'yk-pop')
    })
  }

  const isOverBoard = (x: number, y: number) => {
    const rect = boardRef.current?.getBoundingClientRect()
    return !!rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
  }

  const movePointer = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
      setCursorVisible(true)
    }
    cursorRef.current?.style.setProperty('left', `${e.clientX}px`)
    cursorRef.current?.style.setProperty('top', `${e.clientY}px`)
    heldRef.current?.style.setProperty('left', `${e.clientX}px`)
    heldRef.current?.style.setProperty('top', `${e.clientY}px`)

    const drag = pointerDragRef.current
    if (!drag) return
    const distance = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY)
    if (distance > 8) drag.moved = true
    if (drag.moved) setDropActive(isOverBoard(e.clientX, e.clientY))
  }

  const startPointerDrag = (e: PointerEvent<HTMLButtonElement>, id: string, name: string) => {
    if (owned.has(id) || e.button !== 0) return
    e.preventDefault()
    e.currentTarget.setPointerCapture?.(e.pointerId)
    pointerDragRef.current = {
      id,
      name,
      tile: e.currentTarget,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    }
    setHeldIngredient(id)
    setCursorVisible(true)
  }

  const finishPointerDrag = (e: PointerEvent<HTMLElement>) => {
    const drag = pointerDragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    pointerDragRef.current = null
    setHeldIngredient(null)
    setDropActive(false)
    if (drag.tile.hasPointerCapture?.(drag.pointerId)) drag.tile.releasePointerCapture(drag.pointerId)

    const landed = drag.moved && isOverBoard(e.clientX, e.clientY)
    suppressClickRef.current = true
    if (landed || !drag.moved) throwIn(drag.id, drag.name, drag.tile)
    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 0)
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
    <main
      id="main"
      className="yk-page yk-kitchen"
      onPointerMove={movePointer}
      onPointerLeave={() => setCursorVisible(false)}
      onPointerUp={finishPointerDrag}
    >
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
          See Ramen
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
                      data-soft={isSoftIngredient(ing.id)}
                      data-held={heldIngredient === ing.id}
                      aria-pressed={has}
                      aria-label={has ? `${ing.name}, in your kitchen` : `Add ${ing.name}`}
                      onPointerDown={(e) => startPointerDrag(e, ing.id, ing.name)}
                      onClick={(e) => {
                        if (suppressClickRef.current) return
                        if (has) removeIngredient(ing.id)
                        else throwIn(ing.id, ing.name, e.currentTarget)
                      }}
                    >
                      <span className="yk-tile__photo" aria-hidden="true">
                        <img src={ingredientPhoto(ing)} alt="" />
                      </span>
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

        {/* ── Chopping board / inventory ── */}
        <section
          ref={panelRef}
          className="yk-fridge-list yk-workbench yk-panel"
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
            <div>
              <span className="yk-workbench__eyebrow">取材台 · TAKE OUT</span>
              <h2 id="fridge-h">Chopping board</h2>
            </div>
            <span ref={countRef} className="yk-fridge-list__count">
              {inventory.length}
            </span>
          </div>
          <p className="yk-workbench__hint">Pick up an ingredient from the fridge and place it here.</p>
          <div
            ref={boardRef}
            className="yk-chopping-board"
            data-drop={dropActive}
            onDragOver={(e) => {
              if (e.dataTransfer.types.includes(DRAG_TYPE)) {
                e.preventDefault()
                setDropActive(true)
              }
            }}
            onDragLeave={() => setDropActive(false)}
            onDrop={(e) => {
              e.stopPropagation()
              onDrop(e)
            }}
          >
            <span className="yk-chopping-board__grain" aria-hidden="true" />
            <span className="yk-chopping-board__stamp" aria-hidden="true">
              よる
              <small>YORU KITCHEN</small>
            </span>
            {inventory.length === 0 ? (
              <div className="yk-chopping-board__empty">
                <span className="yk-chopping-board__knife" aria-hidden="true">✦</span>
                <strong>Drop ingredients here</strong>
                <span>The board is waiting for your first pick.</span>
              </div>
            ) : (
              <ul className="yk-board__items" aria-label="Ingredients on the chopping board">
                {inventory.map((item) => {
                  const ing = INGREDIENT_BY_ID[item.ingredientId]
                  if (!ing) return null
                  return (
                    <li key={ing.id} className="yk-board__item" data-soft={isSoftIngredient(ing.id)}>
                      <img src={ingredientPhoto(ing)} alt="" />
                      <span>{ing.name}</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <div className="yk-inventory__head">
            <div>
              <span className="yk-workbench__eyebrow">储藏柜 · INVENTORY</span>
              <h3>Your kitchen</h3>
            </div>
          </div>
          <div className="yk-fridge-list__tools">
            <button type="button" className="yk-btn yk-btn--secondary yk-btn--sm" onClick={addRamenStarter}>
              <Plus size={18} /> Ramen starter
            </button>
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
              <p>Tap an ingredient to add it, or start with the ramen starter set.</p>
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
      {heldIngredient && INGREDIENT_BY_ID[heldIngredient] && (
        <div ref={heldRef} className="yk-held-ingredient" data-soft={isSoftIngredient(heldIngredient)} aria-hidden="true">
          <div className="yk-held-ingredient__food">
            <img src={ingredientPhoto(INGREDIENT_BY_ID[heldIngredient])} alt="" />
            {isSoftIngredient(heldIngredient) && (
              <>
                <span className="yk-held-ingredient__pinch yk-held-ingredient__pinch--left" />
                <span className="yk-held-ingredient__pinch yk-held-ingredient__pinch--right" />
              </>
            )}
          </div>
          <span className="yk-held-ingredient__label">{INGREDIENT_BY_ID[heldIngredient].name}</span>
        </div>
      )}
      <ChopsticksCursor ref={cursorRef} holding={heldIngredient !== null} visible={cursorVisible} />
    </main>
  )
}
