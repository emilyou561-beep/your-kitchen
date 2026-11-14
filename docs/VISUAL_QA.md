# Visual QA Checklist

After every change, take screenshots at these sizes: **1440×900, 1024×768, 390×844, 360×740**.
Screenshot naming: `<page>-<width>.png`, e.g. `home-1440.png`.

## A. Home page (most important)

- [ ] Above the fold there is only: logo, 3 nav items, the question, 1 button, the note, and the photo label. No instruction strip, categories, or feature list.
- [ ] At 1440×900 there is no scrollbar and the seigaiha waves are fully visible.
- [ ] "Add Ingredients" is the only solid vermilion button on screen and is visible at a glance.
- [ ] The photo is sharp, not stretched or blurry (source width ≥ 2× rendered width).
- [ ] The photo label is not covered by the fridge door.
- [ ] Mobile: photo on top, fridge door overlaps the photo's bottom edge by about 40px; full-width button; no horizontal scroll.
- [ ] Japanese appears only in decorative positions.

## B. General visuals

- [ ] Only token colors; no gradient backgrounds, no blurred shadows, no emoji.
- [ ] All outlines are 2–3px ink; shadows are blur-free offsets.
- [ ] Shrikhand titles and Zen Maru Gothic body load correctly (no fallback to a system serif).
- [ ] Paper grain is visible but not dirty: at 100% zoom you have to lean in to see it.
- [ ] No truncated or overlapping text (especially My Kitchen rows and cards with long dish names).

## C. Accessibility

- [ ] Body contrast ≥ 4.5:1, large text ≥ 3:1 (see the color table in DESIGN_SYSTEM).
- [ ] The full flow works with the keyboard only: add ingredients → select dishes → build list → check off → delete.
- [ ] Every focusable element shows a visible mustard focus ring.
- [ ] Every icon button has an accessible name (check with axe or Lighthouse: 0 serious issues).
- [ ] With "reduce motion" on, there is no animation at all.
- [ ] The page is still usable at 200% zoom with no lost content.
- [ ] State is not conveyed by color alone (badges have text).

## D. States

- [ ] Empty states: My Kitchen, empty recipe filter, grocery list each have a hint and a next-step button.
- [ ] Recipes without a photo show the illustration fallback, never a broken image.
- [ ] After clearing localStorage, every page loads without errors.
- [ ] Visiting `/recipes/xxx` shows "Recipe not found".
- [ ] Print preview shows only the receipt.

## E. Functional checks

- [ ] With the ramen starter in My Kitchen, at least one ramen shows Ready.
- [ ] Select two dishes that both need the same missing ingredient: it appears only once on the list.
- [ ] Manually add "Matcha", rebuild the list, and "Matcha" is still there.
- [ ] After a refresh, inventory, selected dishes, and the list are all still there.

## Issue report format

```
[P0/P1/P2] Page · size · screenshot name
Observed: …
Expected: … (cite the item number in this file)
```
P0 = blocks the flow or is inaccessible; P1 = clearly breaks the design; P2 = polish.
