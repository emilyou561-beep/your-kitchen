import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { INGREDIENT_BY_ID } from '../data/ingredients'
import type { Storage } from '../data/ingredients'
import { RECIPE_BY_ID } from '../data/recipes'
import { matchRecipe } from '../lib/match'

export interface InventoryItem {
  ingredientId: string
  qty: number
  unit: string
  storage: Storage
}

export interface GroceryItem {
  key: string
  name: string
  qty: string
  unit: string
  checked: boolean
  /** Recipe names this item was generated for. Empty for items added by hand. */
  forRecipes: string[]
  ingredientId?: string
}

interface KitchenState {
  inventory: InventoryItem[]
  selected: string[]
  grocery: GroceryItem[]
}

interface KitchenApi extends KitchenState {
  owned: Set<string>
  addIngredient: (id: string) => void
  removeIngredient: (id: string) => void
  updateIngredient: (id: string, patch: Partial<Omit<InventoryItem, 'ingredientId'>>) => void
  clearInventory: () => void
  toggleRecipe: (id: string) => void
  buildGroceryList: (alsoSelect?: string) => number
  addGroceryItem: (name: string) => void
  updateGroceryItem: (key: string, patch: Partial<GroceryItem>) => void
  removeGroceryItem: (key: string) => void
  clearChecked: () => void
  toast: string | null
  notify: (msg: string) => void
}

const STORAGE_KEY = 'yoru-kitchen:v1'
const EMPTY: KitchenState = { inventory: [], selected: [], grocery: [] }

function load(): KitchenState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<KitchenState>
    return {
      inventory: Array.isArray(parsed.inventory) ? parsed.inventory : [],
      selected: Array.isArray(parsed.selected) ? parsed.selected : [],
      grocery: Array.isArray(parsed.grocery) ? parsed.grocery : [],
    }
  } catch {
    return EMPTY
  }
}

const KitchenContext = createContext<KitchenApi | null>(null)

export function KitchenProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<KitchenState>(load)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable — keep working in memory */
    }
  }, [state])

  const notify = useCallback((msg: string) => {
    setToast(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2400)
  }, [])

  const owned = useMemo(() => new Set(state.inventory.map((i) => i.ingredientId)), [state.inventory])

  const addIngredient = useCallback(
    (id: string) => {
      const ing = INGREDIENT_BY_ID[id]
      if (!ing) return
      setState((s) =>
        s.inventory.some((i) => i.ingredientId === id)
          ? s
          : {
              ...s,
              inventory: [...s.inventory, { ingredientId: id, qty: ing.defaultQty, unit: ing.unit, storage: ing.storage }],
            },
      )
      notify(`${ing.name} added`)
    },
    [notify],
  )

  const removeIngredient = useCallback(
    (id: string) => {
      setState((s) => ({ ...s, inventory: s.inventory.filter((i) => i.ingredientId !== id) }))
      notify(`${INGREDIENT_BY_ID[id]?.name ?? 'Item'} removed`)
    },
    [notify],
  )

  const updateIngredient = useCallback((id: string, patch: Partial<Omit<InventoryItem, 'ingredientId'>>) => {
    setState((s) => ({
      ...s,
      inventory: s.inventory.map((i) => (i.ingredientId === id ? { ...i, ...patch } : i)),
    }))
  }, [])

  const clearInventory = useCallback(() => setState((s) => ({ ...s, inventory: [] })), [])

  const toggleRecipe = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      selected: s.selected.includes(id) ? s.selected.filter((x) => x !== id) : [...s.selected, id],
    }))
  }, [])

  const buildGroceryList = useCallback((alsoSelect?: string): number => {
    const s = alsoSelect && !state.selected.includes(alsoSelect) ? { ...state, selected: [...state.selected, alsoSelect] } : state
    {
      const ownedNow = new Set(s.inventory.map((i) => i.ingredientId))
      const manual = s.grocery.filter((g) => !g.ingredientId)
      const prevByIng = new Map(s.grocery.filter((g) => g.ingredientId).map((g) => [g.ingredientId!, g]))
      const merged = new Map<string, GroceryItem>()
      for (const rid of s.selected) {
        const recipe = RECIPE_BY_ID[rid]
        if (!recipe) continue
        for (const ri of matchRecipe(recipe, ownedNow).missingEssential) {
          const existing = merged.get(ri.id)
          if (existing) {
            if (existing.unit === ri.unit) existing.qty = String(Number(existing.qty) + ri.qty)
            existing.forRecipes.push(recipe.name)
          } else {
            merged.set(ri.id, {
              key: `ing-${ri.id}`,
              ingredientId: ri.id,
              name: INGREDIENT_BY_ID[ri.id]?.name ?? ri.id,
              qty: String(ri.qty),
              unit: ri.unit,
              checked: prevByIng.get(ri.id)?.checked ?? false,
              forRecipes: [recipe.name],
            })
          }
        }
      }
      setState({ ...s, grocery: [...merged.values(), ...manual] })
      return merged.size
    }
  }, [state])

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

  const removeGroceryItem = useCallback((key: string) => {
    setState((s) => ({ ...s, grocery: s.grocery.filter((g) => g.key !== key) }))
  }, [])

  const clearChecked = useCallback(() => {
    setState((s) => ({ ...s, grocery: s.grocery.filter((g) => !g.checked) }))
  }, [])

  const api: KitchenApi = {
    ...state,
    owned,
    addIngredient,
    removeIngredient,
    updateIngredient,
    clearInventory,
    toggleRecipe,
    buildGroceryList,
    addGroceryItem,
    updateGroceryItem,
    removeGroceryItem,
    clearChecked,
    toast,
    notify,
  }

  return <KitchenContext.Provider value={api}>{children}</KitchenContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useKitchen(): KitchenApi {
  const ctx = useContext(KitchenContext)
  if (!ctx) throw new Error('useKitchen must be used inside <KitchenProvider>')
  return ctx
}
