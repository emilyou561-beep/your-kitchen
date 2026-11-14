# Page Specifications

Routes: `/` Home · `/kitchen` My Kitchen · `/recipes` Recipes · `/recipes/:id` Detail · `/list` Grocery List.
Every page shares the Header (awning stripes + logo + 3 nav items). UI text is English; text in quotes below is the actual copy.

---

## 1. Home `/`

**Goal:** within 3 seconds, the user understands there is only one thing to do: add ingredients.

**Complete list of above-the-fold text (do not add more):** logo "Yoru Kitchen", 3 nav items, the question "What's in your fridge?", the button "Add Ingredients", the note "egg · tofu · scallion", and the photo label.

### Desktop (≥1101px)
- Navy background + paper grain + mustard sunburst in the top right.
- Two-column grid: fridge door on the left (400–520px); photo card on the right, tucked 24px under the fridge door.
- Fridge door: freezer section 168px (note + "night" magnet + short handle); fridge section: 72px Shrikhand vermilion question → mustard underline → 72px-tall primary button.
- Photo card: 12px paper frame, rotated 1.4°, vermilion label in the bottom right.
- Seigaiha waves at the bottom, 130px.
- Above-the-fold height = viewport height; no scrolling needed.

### Mobile (≤720px)
- Order: photo (250px tall, full width) → fridge door (shifted up 40px to overlap the photo) → seigaiha waves 96px.
- 18px margin around the fridge door; full-width 60px-tall button.
- Sunburst hidden; "night" magnet hidden at ≤360px.

### Dynamic
- Once the user has ingredients, the note shows their first 3 ingredient names so the fridge feels alive.

---

## 2. My Kitchen `/kitchen`

**Goal:** the fastest possible way to enter what's at home.

- Page header: Japanese "fridge" decoration + title "My Kitchen" + "See Recipes →" on the right (disabled when there are no ingredients).
- Desktop two columns (1.15 : 1); single column at ≤960px with the ingredient market on top.

### Left: ingredient market
1. Search box "Search ingredients" (matches English name, romaji, and aliases, e.g. negi / scallion / green onion).
2. Category buttons (hidden while searching): Ramen / Vegetables / Meat & Fish / Tofu & Eggs / Rice & Noodles / Seasonings / Extras.
3. Ingredient tiles (auto-fit columns, min 150px): English name + small romaji + ⊕ on the right. Owned: navy background + mustard ✓; click again to remove.
4. No results: "No match for "…". Try another name, like "negi" or "scallion"."

### Right: In your kitchen (sticky on desktop)
- Title + count badge.
- Grouped by Fridge / Freezer / Pantry.
- Each row: name (first line); stepper (− qty +), unit dropdown, storage dropdown (second line); delete on the right.
- Empty state: "Your fridge is empty" / "Tap an ingredient to add it."
- While dragging, a dashed mustard outline shows where to drop.

---

## 3. Ramen `/recipes`

- Page header: Japanese decoration + title + filters All / Ready / Almost (with counts) and soup-type filters.
- With no ingredients: "Add ingredients to see what you can cook right now."
- Ramen are shown as wooden menu boards that swing on hover. Ramen with photos come first; then Ready → Almost → Needs shopping; ties broken by missing count, owned count, and time.
- Ramen Basics have their own section; the original home dishes live in a collapsible "Sides" drawer.
- Each card/board: photo → status badge → dish name (Shrikhand) + Japanese decoration → ⏱ minutes → "Missing: …" (vermilion tags) or "You have every essential." → Select / Selected button.
- The whole card links to the detail page; the Select button sits above the link layer.
- Selected card: mustard outer outline.
- With ≥1 dish selected, a sticky bar appears: "N dishes selected" + "Make Grocery List →".

### Status rules
- Every recipe ingredient is either essential or optional.
- Ready = all essentials owned; Almost = missing 1–2 essentials; Needs shopping = missing 3 or more.
- Optional ingredients never affect status.

---

## 4. Recipe detail `/recipes/:id`

- "← All recipes" back link.
- Desktop two columns: photo on the left (frame rotated −1°, status badge, photo credit); on the right: Japanese decoration, dish name, "Did you know?" fun fact with source, region and soup tags, Quick / Authentic route toggle, ⏱ time · servings stepper, buttons (Select dish / Add missing to list →).
- Below, two columns: Ingredients panel (✓ owned / empty box missing; missing ones in bold, with ⊕ "I have this" on the right; "Uses:" links to Ramen Basics); Steps (vermilion circular numbers).
- Single column at ≤860px.
- Unknown recipe: "Recipe not found" + back button.

---

## 5. Grocery List `/list`

- Page header: Japanese "shopping" decoration + "Grocery List" + Print / Clear checked.
- Receipt: zigzag top and bottom edges, store name "YORU KITCHEN", Japanese decoration, date → "For: dish names…" → items → add input → "Items left N" → Japanese "thank you" decoration.
- Each row: checkbox · name (editable, with the source dish in small text below) · dotted leader · quantity · unit · delete. Checked rows get struck through and greyed out.
- When several dishes need the same ingredient, the lines merge; same units add up.
- Rebuilding the list keeps manually added items and checked state.
- Empty state: "Your list is empty" / "Select dishes and we'll list what's missing." + "Browse Recipes".
- Print: hide the header, buttons, delete keys and inputs; white background.

---

## Shared states

| State | Handling |
|---|---|
| Empty | Every page has a dedicated empty state + next-step button |
| Loading | All data is local, no network loading; photos use `loading="lazy"` and show a navy background until loaded |
| Error | If local storage is unavailable, silently fall back to memory; unknown routes go home; unknown recipes show not found |
