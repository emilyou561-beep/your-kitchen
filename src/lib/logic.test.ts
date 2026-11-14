import { describe, expect, it } from 'vitest'
import { INGREDIENTS, INGREDIENT_BY_ID, PANTRY_BASICS, searchIngredients } from '../data/ingredients'
import { RECIPES, RECIPE_BY_ID } from '../data/recipes'
import { buildGrocery, groceryText } from './grocery'
import type { GroceryItem } from './grocery'
import { matchRecipe, rankRecipes } from './match'
import type { Stock } from './match'
import { convert, toBuy } from './units'

const s = (ingredientId: string, qty: number, unit: string): Stock => ({ ingredientId, qty, unit })

describe('data integrity', () => {
  it('has unique ingredient and recipe ids', () => {
    expect(new Set(INGREDIENTS.map((i) => i.id)).size).toBe(INGREDIENTS.length)
    expect(new Set(RECIPES.map((r) => r.id)).size).toBe(RECIPES.length)
  })

  it('every recipe ingredient exists in the catalog (both routes)', () => {
    for (const r of RECIPES) {
      for (const ri of [...r.ingredients, ...(r.authentic?.ingredients ?? [])]) {
        expect(INGREDIENT_BY_ID[ri.id], `${r.id} → ${ri.id}`).toBeDefined()
      }
    }
  })

  it('ramen entries are complete and reference real basics', () => {
    const ramen = RECIPES.filter((r) => r.kind === 'ramen')
    expect(ramen.length).toBeGreaterThanOrEqual(35)
    for (const r of ramen) {
      expect(r.region, r.id).toBeTruthy()
      expect(r.soup, r.id).toBeTruthy()
      expect(r.art, r.id).toBeTruthy()
      for (const b of r.basics ?? []) expect(RECIPE_BY_ID[b]?.kind, `${r.id} → ${b}`).toBe('basic')
      if (r.authentic) {
        expect(r.authentic.minutes, r.id).toBeGreaterThan(r.minutes)
        expect(r.authentic.steps.length, r.id).toBeGreaterThan(0)
      }
    }
  })

  it('no duplicate ingredient lines within a route', () => {
    for (const r of RECIPES) {
      for (const list of [r.ingredients, r.authentic?.ingredients ?? []]) {
        const ids = list.map((i) => i.id)
        expect(new Set(ids).size, `${r.id}: ${ids.filter((x, i) => ids.indexOf(x) !== i)}`).toBe(ids.length)
      }
    }
  })

  it('every recipe has at least one essential ingredient and steps', () => {
    for (const r of RECIPES) {
      expect(r.ingredients.some((i) => i.essential), r.id).toBe(true)
      expect(r.steps.length, r.id).toBeGreaterThan(0)
    }
  })

  it('pantry basics are real ingredients', () => {
    for (const id of PANTRY_BASICS) expect(INGREDIENT_BY_ID[id]).toBeDefined()
  })

  it('UI text is English only (Japanese only in nameJa)', () => {
    const jp = /[぀-ヿ一-龯]/
    for (const r of RECIPES) {
      const text = [r.name, r.blurb, r.region ?? '', ...r.steps, ...(r.authentic?.steps ?? [])].join(' ')
      expect(jp.test(text), r.id).toBe(false)
    }
    for (const i of INGREDIENTS) expect(jp.test(i.name), i.id).toBe(false)
  })
})

describe('units', () => {
  it('converts within a family', () => {
    expect(convert(1, 'kg', 'g')).toBe(1000)
    expect(convert(2, 'tbsp', 'ml')).toBe(30)
    expect(convert(15, 'ml', 'tbsp')).toBe(1)
  })
  it('refuses across families', () => {
    expect(convert(1, 'g', 'ml')).toBeNull()
    expect(convert(1, 'pc', 'g')).toBeNull()
  })
  it('rounds whole items up', () => {
    expect(toBuy(1.2, 'pc')).toBe(2)
    expect(toBuy(1.25, 'g')).toBe(1.3)
  })
})

describe('search', () => {
  it('finds by English, romaji and alias', () => {
    expect(searchIngredients('negi').map((i) => i.id)).toContain('scallion')
    expect(searchIngredients('green onion').map((i) => i.id)).toContain('scallion')
    expect(searchIngredients('Tofu').map((i) => i.id)).toContain('tofu')
    expect(searchIngredients('   ')).toEqual([])
  })
})

describe('matchRecipe', () => {
  const oyako = RECIPE_BY_ID['oyakodon']

  it('is ready when every essential is covered', () => {
    const stock = [s('chicken-thigh', 300, 'g'), s('egg', 6, 'pc'), s('onion', 2, 'pc'), s('rice', 5, 'cup'), s('soy-sauce', 500, 'ml'), s('mirin', 300, 'ml')]
    const m = matchRecipe(oyako, stock)
    expect(m.status).toBe('ready')
    expect(m.missingEssential).toHaveLength(0)
    expect(m.missingOptional.map((l) => l.ri.id)).toEqual(['dashi', 'scallion', 'nori'])
  })

  it('flags a quantity shortfall, not just absence', () => {
    const stock = [s('chicken-thigh', 300, 'g'), s('egg', 1, 'pc'), s('onion', 2, 'pc'), s('rice', 5, 'cup'), s('soy-sauce', 500, 'ml'), s('mirin', 300, 'ml')]
    const m = matchRecipe(oyako, stock)
    expect(m.status).toBe('almost')
    const egg = m.missingEssential.find((l) => l.ri.id === 'egg')!
    expect(egg.short).toBe(2)
  })

  it('compares across convertible units', () => {
    // 2 tbsp = 30 ml needed; 20 ml at home → 10 ml (⅔ tbsp) short, reported in the recipe's unit
    const stock = [s('chicken-thigh', 1, 'kg'), s('egg', 6, 'pc'), s('onion', 2, 'pc'), s('rice', 5, 'cup'), s('soy-sauce', 20, 'ml'), s('mirin', 300, 'ml')]
    const m = matchRecipe(oyako, stock)
    const soy = m.missingEssential.find((l) => l.ri.id === 'soy-sauce')!
    expect(soy.short).toBeCloseTo(10 / 15)
  })

  it('treats zero quantity as missing', () => {
    const m = matchRecipe(RECIPE_BY_ID['hiyayakko'], [s('tofu', 0, 'pack'), s('soy-sauce', 100, 'ml')])
    expect(m.missingEssential.map((l) => l.ri.id)).toEqual(['tofu'])
  })

  it('scales with servings', () => {
    const m = matchRecipe(oyako, [], 4)
    expect(m.lines.find((l) => l.ri.id === 'egg')!.need).toBe(6)
  })

  it('needs shopping with 3+ missing essentials', () => {
    expect(matchRecipe(oyako, []).status).toBe('shop')
  })
})

describe('rankRecipes', () => {
  it('puts ready dishes first', () => {
    const stock = [s('tofu', 1, 'pack'), s('soy-sauce', 500, 'ml')]
    const ranked = rankRecipes(RECIPES, stock)
    expect(ranked[0].status).toBe('ready')
    expect(ranked[0].recipe.id).toBe('hiyayakko')
    const order = ranked.map((r) => r.status)
    expect(order.indexOf('shop')).toBeGreaterThan(order.lastIndexOf('ready'))
  })
})

describe('buildGrocery', () => {
  it('sums needs across dishes before subtracting stock', () => {
    // oyakodon 3 eggs + tamagoyaki 4 eggs = 7; have 3 → buy 4
    const list = buildGrocery(['oyakodon', 'tamagoyaki'], [s('egg', 3, 'pc')])
    const egg = list.find((g) => g.ingredientId === 'egg')!
    expect(egg.qty).toBe('4')
    expect(egg.forRecipes).toEqual(['Oyakodon', 'Tamagoyaki'])
    expect(list.filter((g) => g.ingredientId === 'egg')).toHaveLength(1)
  })

  it('skips optional ingredients unless asked', () => {
    const without = buildGrocery(['miso-soup'], [])
    expect(without.map((g) => g.ingredientId)).toEqual(['miso', 'dashi'])
    const withOpt = buildGrocery(['miso-soup'], [], [], { includeOptional: true })
    expect(withOpt.map((g) => g.ingredientId)).toContain('tofu')
  })

  it('omits things already covered', () => {
    const list = buildGrocery(['hiyayakko'], [s('tofu', 1, 'pack'), s('soy-sauce', 500, 'ml')])
    expect(list).toHaveLength(0)
  })

  it('keeps hand-added items and existing checkmarks', () => {
    const prev: GroceryItem[] = [
      { key: 'm-1', name: 'Matcha', qty: '1', unit: '', checked: false, forRecipes: [] },
      { key: 'ing-tofu', ingredientId: 'tofu', name: 'Tofu', qty: '1', unit: 'pack', checked: true, forRecipes: ['Hiyayakko'] },
    ]
    const list = buildGrocery(['hiyayakko'], [], prev)
    expect(list.find((g) => g.name === 'Matcha')).toBeDefined()
    expect(list.find((g) => g.ingredientId === 'tofu')!.checked).toBe(true)
  })

  it('applies servings', () => {
    const list = buildGrocery(['oyakodon'], [], [], { servings: { oyakodon: 4 } })
    expect(list.find((g) => g.ingredientId === 'egg')!.qty).toBe('6')
  })

  it('ignores unknown recipe ids', () => {
    expect(buildGrocery(['nope'], [])).toEqual([])
  })

  it('exports plain text', () => {
    const txt = groceryText([{ key: 'a', name: 'Egg', qty: '2', unit: 'pc', checked: false, forRecipes: [] }])
    expect(txt).toContain('☐ Egg — 2 pc')
  })
})

describe('routes', () => {
  it('authentic route uses its own ingredient list and time', () => {
    const r = RECIPE_BY_ID['hakata-tonkotsu']
    const q = matchRecipe(r, [], r.serves, 'quick')
    const a = matchRecipe(r, [], r.serves, 'authentic')
    expect(q.lines.map((l) => l.ri.id)).toContain('tonkotsu-base')
    expect(a.lines.map((l) => l.ri.id)).toContain('pork-bones')
    expect(a.minutes).toBeGreaterThan(q.minutes)
  })
  it('falls back to quick when a dish has no authentic route', () => {
    const r = RECIPE_BY_ID['hiyashi-chuka']
    expect(matchRecipe(r, [], r.serves, 'authentic').route).toBe('quick')
  })
  it('grocery list follows the chosen route', () => {
    const quick = buildGrocery(['hakata-tonkotsu'], []).map((g) => g.ingredientId)
    const auth = buildGrocery(['hakata-tonkotsu'], [], [], { routes: { 'hakata-tonkotsu': 'authentic' } }).map((g) => g.ingredientId)
    expect(quick).toContain('tonkotsu-base')
    expect(auth).toContain('pork-bones')
    expect(auth).not.toContain('tonkotsu-base')
  })
})
