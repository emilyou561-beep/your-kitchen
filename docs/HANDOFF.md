# Handoff Notes

> Code, comments and UI copy are all in English. Japanese appears only as `aria-hidden` decoration.

## Current state

A working local MVP: Vite + React 19 + TypeScript + react-router. All five pages and the full flow are implemented; see `docs/PAGE_SPECIFICATIONS.md`.
No backend, accounts, paid APIs or deployment. Data lives in localStorage.

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # type check + bundle
npm test         # unit tests (vitest)
```

## Layout

```
src/
  styles/tokens.css      design tokens (single source of truth)
  index.css              global styles + shared components
  data/ingredients.ts    ingredient table (English name / romaji / aliases / default unit and location)
  data/recipeTypes.ts    recipe types (kind / soup / illustration params / two routes)
  data/ramen.ts          ramen catalog + Ramen Basics
  data/recipes.ts        sides + combined export
  data/funFacts.ts       sourced fun fact for each ramen
  data/photoCredits.ts   photo credits
  data/photoSoup.ts      per-photo soup area overrides for LivePhoto
  lib/units.ts           unit conversion and rounding
  lib/match.ts           quantity-aware cookability and sorting
  lib/grocery.ts         grocery list totals (merged across dishes, minus stock)
  lib/tactile.ts         fly / replay / vibrate helpers
  lib/logic.test.ts      unit tests
  state/KitchenContext   global state + localStorage
  components/            Header, Icons, Waves, RecipeImage, LivePhoto, RamenArt, Stamp, TearStub, Magnets
  pages/                 Home, MyKitchen, Recipes, RecipeDetail, GroceryList (each with its own .css)
public/images/           photos and paper grain
docs/                    design specs
```

## To do (by priority)

**P1**
1. Playwright screenshot tests at the four sizes in `VISUAL_QA.md`.
2. Automated axe accessibility check with 0 serious/critical issues.
3. Check `mask` support for the receipt's zigzag edge in Safari.
4. React component tests (Testing Library).

**P2**
5. Currently 109 ingredients; 41 ramen (most with Quick + Authentic routes), 11 Ramen Basics, 27 sides (see docs/RAMEN_SOURCES.md). When adding more, keep essential flags accurate; the tests automatically check that ingredient ids exist and that UI text is English.
6. Group the receipt by store section (produce / meat / seasonings).

## Rules

- Don't change the visual direction; ask Emily first if it needs to change.
- Claude owns the design specs and visual sign-off; Codex owns implementation and tests. Don't edit the same file at the same time.
- New copy must be English; Japanese is decoration only and must be `aria-hidden`.
- Add new colors, type sizes and spacing to `tokens.css` first.
