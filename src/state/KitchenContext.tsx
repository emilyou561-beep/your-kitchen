import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { INGREDIENT_BY_ID, PANTRY_BASICS, RAMEN_STARTER } from '../data/ingredients'
import type { Storage } from '../data/ingredients'
import { buildGrocery } from '../lib/grocery'
import type { RouteId } from '../data/recipes'
import type { GroceryItem } from '../lib/grocery'
import { convert, tidy } from '../lib/units'

export type { GroceryItem } from '../lib/grocery'

export interface InventoryItem {
  ingredientId: string
  qty: number
  unit: string
  storage: Storage
}

interface KitchenState {
  inventory: InventoryItem[]
  selected: string[]
  /** Servings chosen per recipe; missing = recipe default. */
  servings: Record<string, number>
  /** Quick or authentic route chosen per ramen. */
  routes: Record<string, RouteId>
  includeOptional: boolean
  grocery: GroceryItem[]
}

export interface Toast {
  id: number
  message: string
  action?: { label: string; run: () => void }
}

interface KitchenApi extends KitchenState {
  owned: Set<string>
  addIngredient: (id: string, quiet?: boolean) => void
  removeIngredient: (id: string) => void
  updateIngredient: (id: string, patch: Partial<Omit<InventoryItem, 'ingredientId'>>) => void
  addPantryBasics: () => void
  clearInventory: () => void
  toggleRecipe: (id: string) => void
  setServings: (id: string, n: number) => void
  setRoute: (id: string, route: RouteId) => void
  addRamenStarter: () => void
  setIncludeOptional: (v: boolean) => void
  buildGroceryList: (alsoSelect?: string) => number
  addGroceryItem: (name: string) => void
  updateGroceryItem: (key: string, patch: Partial<GroceryItem>) => void
  removeGroceryItem: (key: string) => void
  clearChecked: () => void
  moveCheckedToKitchen: (alsoClearOthers?: boolean) => number
  toast: Toast | null
  notify: (message: string, action?: Toast['action']) => void
  dismissToast: () => void
}

const STORAGE_KEY = 'yoru-kitchen:v1'
const EMPTY: KitchenState = { inventory: [], selected: [], servings: {}, routes: {}, includeOptional: false, grocery: [] }

function load(): KitchenState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const p = JSON.parse(raw) as Partial<KitchenState>
    return {
      inventory: Array.isArray(p.inventory) ? p.inventory.filter((i) => INGREDIENT_BY_ID[i.ingredientId]) : [],
      selected: Array.isArray(p.selected) ? p.selected : [],
      servings: p.servings && typeof p.servings === 'object' ? p.servings : {},
      routes: p.routes && typeof p.routes === 'object' ? p.routes : {},
      includeOptional: !!p.includeOptional,
      grocery: Array.isArray(p.grocery) ? p.grocery : [],
    }
  } catch {
    return EMPTY
  }
}

/** Add qty to an existing stock line (converting units when possible) or create it. */
function addStock(inv: InventoryItem[], id: string, qty?: number, unit?: string): InventoryItem[] {
  const ing = INGREDIENT_BY_ID[id]
  if (!ing) return inv
  const existing = inv.find((i) => i.ingredientId === id)
  if (!existing) {
    return [...inv, { ingredientId: id, qty: qty ?? ing.defaultQty, unit: unit ?? ing.unit, storage: ing.storage }]
  }
  if (qty === undefined) return inv
  const extra = convert(qty, unit ?? existing.unit, existing.unit)
  if (extra === null) return inv
  return inv.map((i) => (i.ingredientId === id ? { ...i, qty: tidy(i.qty + extra) } : i))
}

const KitchenContext = createContext<KitchenApi | null>(null)

export function KitchenProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<KitchenState>(load)
  const [toast, setToast] = useState<Toast | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable — keep working in memory */
    }
  }, [state])

  const dismissToast = useCallback(() => {
    window.clearTimeout(timer.current)
    setToast(null)
  }, [])

  const notify = useCallback((message: string, action?: Toast['action']) => {
    window.clearTimeout(timer.current)
    setToast({ id: Date.now(), message, action })
    // Undo toasts stay longer so keyboard / screen-reader users can reach them.
    timer.current = window.setTimeout(() => setToast(null), action ? 6000 : 2400)
  }, [])

  const owned = useMemo(
    () => new Set(state.inventory.filter((i) => i.qty > 0).map((i) => i.ingredientId)),
    [state.inventory],
  )

  const addIngredient = useCallback(
    (id: string, quiet = false) => {
      const ing = INGREDIENT_BY_ID[id]
      if (!ing) return
      setState((s) => ({ ...s, inventory: addStock(s.inventory, id) }))
      if (!quiet) notify(`${ing.name} added`)
    },
    [notify],
  )

  const removeIngredient = useCallback(
    (id: string) => {
      const prev = state.inventory
      const item = prev.find((i) => i.ingredientId === id)
      if (!item) return
      setState((s) => ({ ...s, inventory: s.inventory.filter((i) => i.ingredientId !== id) }))
      notify(`${INGREDIENT_BY_ID[id]?.name ?? 'Item'} removed`, {
        label: 'Undo',
        run: () =>
          setState((s) =>
            s.inventory.some((i) => i.ingredientId === id) ? s : { ...s, inventory: [...s.inventory, item] },
          ),
      })
    },
    [notify, state.inventory],
  )

  const updateIngredient = useCallback((id: string, patch: Partial<Omit<InventoryItem, 'ingredientId'>>) => {
    setState((s) => ({
      ...s,
      inventory: s.inventory.map((i) => (i.ingredientId === id ? { ...i, ...patch } : i)),
    }))
  }, [])

  const addPantryBasics = useCallback(() => {
    const missing = PANTRY_BASICS.filter((id) => !state.inventory.some((i) => i.ingredientId === id))
    if (missing.length === 0) {
      notify('You already have the pantry basics')
      return
    }
    const prev = state.inventory
    setState((s) => ({ ...s, inventory: missing.reduce((inv, id) => addStock(inv, id), s.inventory) }))
    notify(`${missing.length} pantry basics added`, {
      label: 'Undo',
      run: () => setState((s) => ({ ...s, inventory: prev })),
    })
  }, [notify, state.inventory])

  const clearInventory = useCallback(() => {
    const prev = state.inventory
    setState((s) => ({ ...s, inventory: [] }))
    notify('Kitchen cleared', { label: 'Undo', run: () => setState((s) => ({ ...s, inventory: prev })) })
  }, [notify, state.inventory])

  const toggleRecipe = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      selected: s.selected.includes(id) ? s.selected.filter((x) => x !== id) : [...s.selected, id],
    }))
  }, [])

  const setServings = useCallback((id: string, n: number) => {
    const v = Math.min(12, Math.max(1, Math.round(n)))
    setState((s) => ({ ...s, servings: { ...s.servings, [id]: v } }))
  }, [])

  const setRoute = useCallback((id: string, route: RouteId) => {
    setState((s) => ({ ...s, routes: { ...s.routes, [id]: route } }))
  }, [])

  const addRamenStarter = useCallback(() => {
    const missing = RAMEN_STARTER.filter((id) => !state.inventory.some((i) => i.ingredientId === id))
    if (missing.length === 0) {
      notify('You already have the ramen starter set')
      return
    }
    const prev = state.inventory
    setState((s) => ({ ...s, inventory: missing.reduce((inv, id) => addStock(inv, id), s.inventory) }))
    notify(`${missing.length} ramen basics added`, { label: 'Undo', run: () => setState((s) => ({ ...s, inventory: prev })) })
  }, [notify, state.inventory])

  const setIncludeOptional = useCallback((v: boolean) => setState((s) => ({ ...s, includeOptional: v })), [])

  const buildGroceryList = useCallback(
    (alsoSelect?: string): number => {
      const selected =
        alsoSelect && !state.selected.includes(alsoSelect) ? [...state.selected, alsoSelect] : state.selected
      const grocery = buildGrocery(selected, state.inventory, state.grocery, {
        servings: state.servings,
        routes: state.routes,
        includeOptional: state.includeOptional,
      })
      setState((s) => ({ ...s, selected, grocery }))
      return grocery.filter((g) => g.ingredientId).length
    },
    [state],
  )

  const addGroceryItem = useCallback((name: string) => {
    const clean = name.trim()
    if (!clean) return
    setState((s) => ({
      ...s,
      grocery: [
        ...s.grocery,
        { key: `m-${Date.now().toString(36)}`, name: clean, qty: '1', unit: '', checked: false, forRecipes: [] },
      ],
    }))
  }, [])

  const updateGroceryItem = useCallback((key: string, patch: Partial<GroceryItem>) => {
    setState((s) => ({ ...s, grocery: s.grocery.map((g) => (g.key === key ? { ...g, ...patch } : g)) }))
  }, [])

  const removeGroceryItem = useCallback(
    (key: string) => {
      const idx = state.grocery.findIndex((g) => g.key === key)
      const item = state.grocery[idx]
      if (!item) return
      setState((s) => ({ ...s, grocery: s.grocery.filter((g) => g.key !== key) }))
      notify(`${item.name} removed`, {
        label: 'Undo',
        run: () =>
          setState((s) => {
            if (s.grocery.some((g) => g.key === key)) return s
            const g = [...s.grocery]
            g.splice(Math.min(idx, g.length), 0, item)
            return { ...s, grocery: g }
          }),
      })
    },
    [notify, state.grocery],
  )

  const clearChecked = useCallback(() => {
    const prev = state.grocery
    setState((s) => ({ ...s, grocery: s.grocery.filter((g) => !g.checked) }))
    notify('Checked items cleared', { label: 'Undo', run: () => setState((s) => ({ ...s, grocery: prev })) })
  }, [notify, state.grocery])

  const moveCheckedToKitchen = useCallback((alsoClearOthers = false): number => {
    const moving = state.grocery.filter((g) => g.checked && g.ingredientId)
    const others = alsoClearOthers ? state.grocery.filter((g) => g.checked && !g.ingredientId) : []
    if (moving.length === 0 && others.length === 0) return 0
    let inv = state.inventory
    for (const g of moving) {
      const q = Number(g.qty)
      inv = addStock(inv, g.ingredientId!, Number.isFinite(q) && q > 0 ? q : undefined, g.unit || undefined)
    }
    const movedKeys = new Set([...moving, ...others].map((g) => g.key))
    const prev = { inventory: state.inventory, grocery: state.grocery }
    setState((s) => ({ ...s, inventory: inv, grocery: s.grocery.filter((g) => !movedKeys.has(g.key)) }))
    notify(
      moving.length > 0 ? `${moving.length} item${moving.length === 1 ? '' : 's'} put away in My Kitchen` : 'Bought items cleared',
      { label: 'Undo', run: () => setState((s) => ({ ...s, ...prev })) },
    )
    return moving.length
  }, [notify, state.grocery, state.inventory])

  const api: KitchenApi = {
    ...state,
    owned,
    addIngredient,
    removeIngredient,
    updateIngredient,
    addPantryBasics,
    clearInventory,
    toggleRecipe,
    setServings,
    setRoute,
    addRamenStarter,
    setIncludeOptional,
    buildGroceryList,
    addGroceryItem,
    updateGroceryItem,
    removeGroceryItem,
    clearChecked,
    moveCheckedToKitchen,
    toast,
    notify,
    dismissToast,
  }

  return <KitchenContext.Provider value={api}>{children}</KitchenContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useKitchen(): KitchenApi {
  const ctx = useContext(KitchenContext)
  if (!ctx) throw new Error('useKitchen must be used inside <KitchenProvider>')
  return ctx
}
