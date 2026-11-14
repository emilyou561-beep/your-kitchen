# Interaction Specifications

## 1. Core flow

Home "Add Ingredients" → My Kitchen: click, search or drag to add ingredients → "See Recipes" → recipes sorted by how cookable they are → Select dishes → "Make Grocery List" → edit, check off and print on the receipt.

Data is saved in browser localStorage (key `yoru-kitchen:v1`) and survives a refresh; if storage is unavailable it falls back to memory. No accounts, no server.

## 2. Adding / removing ingredients

| Action | Result |
|---|---|
| Click an ingredient tile you don't own | Added with the default quantity/unit/location; tile turns navy + ✓; toast "Potato added" |
| Click an owned tile again | Removed; toast "Potato removed" |
| Drag a tile onto the right panel | Panel highlights with a mustard dashed outline; drop to add (an enhancement; clicking always works) |
| Stepper −/+ | Quantity ±1, minimum 0 |
| Type a quantity | Decimals accepted; negatives become 0 |
| Change unit / location | Takes effect immediately; changing location moves the row to that group |
| Delete button | Removes the row + toast |

### Quantity-aware matching
- It checks not just "do I have it" but "do I have enough": 1 egg at home and a recipe that needs 3 → shows "Egg (2 pc more)" and puts the missing amount on the grocery list.
- Compatible units convert automatically: g ↔ kg, ml ↔ L ↔ tbsp (15ml) ↔ tsp (5ml). When units can't be compared (e.g. g vs tbsp), it counts as enough rather than raising a false alarm.
- A quantity of 0 counts as not owned.
- Whole-item units like eggs, packs and bunches round up when buying.

### Other
- "Pantry basics" adds 8 staple seasonings plus rice in one tap (skipping what you already have), and can be undone. "Ramen starter" does the same for a basic ramen pantry.
- Deleting an ingredient, clearing the kitchen, deleting a list item, and clearing checked items all show a toast with **Undo**, available for 6 seconds.

## 3. Recipes and the list

- Recipes page: search box (matches dish name, blurb and ingredient names) + time filter (any / ≤15 / ≤30 min) + status filter + soup filter; "Clear filters" when nothing matches.
- Detail page: servings stepper (1–12), and every amount, missing quantity and grocery line scales with it; servings are remembered per dish. The Quick / Authentic toggle switches the ingredient list, steps and bowl art, and is remembered per dish.
- Grocery list rule: first **add up** the needs of every selected dish, then compare against stock once (two dishes each need 2 eggs and you have 3 → buy 1).
- On the list page, checking "Include optional ingredients" and clicking "Update from recipes" adds optional ingredients too; manually added items and checked state survive the update.
- After checking off what you bought, "Put bought items in My Kitchen" adds them to stock at the listed quantities (merging compatible units) and removes them from the list.
- "Copy" copies the list as plain text for pasting into notes or a chat.
- Select is a toggle button (`aria-pressed`).
- Detail page "Add missing to list" = select the dish + build the list + go to the list page.
- On the detail page, ⊕ next to a missing ingredient = "I have this": adds it straight to stock and updates the status instantly.
- Building the list only includes ingredients that are **essential and missing**; a toast reports the count, or "You have everything you need".

## 4. Tactile interactions

| Where | Interaction | Implementation |
|---|---|---|
| My Kitchen ingredient tiles | On add, the tile presses down and springs back; a small mustard tag flies along an arc **into the fridge panel on the right** (on mobile, when the fridge panel is off screen, it flies to the My Kitchen nav item at the top); on landing, the panel wobbles and the count bounces; Android phones get a 10ms vibration | `flyTo / replay / buzz` in `lib/tactile.ts`; Web Animations API |
| Recipe cards / detail page | When a ready-to-cook dish scrolls into view, a red stamp **thumps down** on it (可 / READY); the first 6 are staggered | `components/Stamp.tsx`; IntersectionObserver |
| Recipe menu boards | Wooden boards swing gently on hover | `.yk-board` |
| Grocery list | On entering the page or "Update from recipes", the receipt **prints out line by line** from a printer slot at the top | `.yk-printing`, `steps(16)` |
| Grocery list | Checking an item draws a **hand-drawn red strike** through the name | `Strike` SVG, stroke-dashoffset animation |
| Grocery list | When items are checked, a **tear-off stub** appears at the bottom of the receipt: "N bought — Pull down to tear off & put away". Dragging down more than 60px tears it off and flies it away: bought items go into My Kitchen and manual items are cleared, with Undo. Keyboard and click (Enter / Space / single click) can tear it too | `components/TearStub.tsx`; Pointer Events |

Everything respects `prefers-reduced-motion`: when on, nothing flies, wobbles or stamps; the result simply appears.

### Live photos (LivePhoto)
- Ramen with a photo (`public/images/ramen/<id>.jpg`) get it automatically: the soup ripples gently (SVG noise + displacement, limited to the soup's ellipse), a sheen drifts slowly across the surface, steam rises above the bowl, and the whole photo tilts slightly toward the pointer with a highlight.
- Plays continuously on the detail page; on the menu boards it plays only on hover or keyboard focus to save performance; pauses automatically when scrolled off screen.
- For photos where the soup isn't centered, set that image's soup area in `src/data/photoSoup.ts`.
- With "reduce motion" on, all of it is off and only the static photo shows.

## 5. Motion

| Element | Motion | Duration |
|---|---|---|
| Buttons | Sink 1–2px on hover, sink fully on press (shadow goes to zero) | 120ms |
| Ingredient tiles | Same, smaller amplitude | 120ms |
| Recipe cards | Lift 3px on hover, deeper shadow | 220ms |
| Toast | Fades in and rises from below | 220ms |

Easing `cubic-bezier(0.2, 0.7, 0.2, 1)`. No page transitions, parallax, or autoplay.

**Reduced motion** (`prefers-reduced-motion: reduce`): all transition and animation durations go to zero and position changes complete instantly; no functionality is affected.

## 6. Keyboard and focus

- The first Tab stop on every page is "Skip to content", which jumps to `#main`.
- Focus ring: 3px solid mustard, 3px offset, consistent on every interactive element.
- Tab order matches visual order: logo → nav → main page action → content.
- Mobile menu: button has `aria-expanded`; Esc closes it; it closes automatically on route change.
- Ingredient tiles, categories and Select are native `<button>`s; Enter/Space activates them.
- Receipt: Tab moves through checkbox → name → quantity → unit → delete; Enter submits the add box.
- Scroll to top on route change.

## 7. Screen readers

- All Japanese text is `aria-hidden`.
- Icon buttons must have an `aria-label` (e.g. "Remove Potato", "Less Egg").
- Ingredient tiles carry hidden hints ", press to add." / ", in your kitchen. Press to remove."
- Toasts and "Items left" use `aria-live="polite"`.
- Photos have descriptive alt text; the illustration fallback uses `role="img"` + "(photo coming soon)".

## 8. Responsive

- Touch targets ≥ 44×44 (48 in the mobile menu).
- On mobile, navigation collapses into a hamburger menu; each item is 52px tall when open.
- See PAGE_SPECIFICATIONS.md for each page's breakpoints.
