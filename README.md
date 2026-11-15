# Yoru Kitchen

Tell it what's in your fridge and it shows which Japanese ramen you can make tonight. There are 41 regional styles, from Sapporo miso to Hakata tonkotsu, and each one has a quick version (store-bought stock, about 30 minutes) and a shop-style version (stock, tare and oil from scratch). It checks quantities, not just whether you have something, then turns whatever's missing into a grocery receipt you can edit, check off and print.

![React](https://img.shields.io/badge/React-19-00274C?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-5-00274C?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-8-00274C?style=flat-square) ![tests](https://img.shields.io/badge/tests-vitest-00274C?style=flat-square)

## Run it

You'll need [Node.js](https://nodejs.org) 20.19 or newer.

```bash
git clone https://github.com/emilyou561-beep/your-kitchen.git
cd your-kitchen
npm install
npm run dev
```

Then open http://localhost:5180.

Everything runs in the browser. There's no account or server, and your fridge is saved in localStorage.

## How matching works

Each recipe marks its ingredients as essential or optional. A dish is **Ready** when you have enough of every essential, **Almost** when one or two are short, and **Needs shopping** otherwise. Optional ingredients never change the status.

Units convert where it makes sense (g and kg, ml, tbsp and tsp). If two units can't be compared, it assumes you have enough instead of flagging a false shortage. The grocery list adds up what every selected dish needs first and only then subtracts what you have, so two dishes that each need 2 eggs with 3 at home means buying 1, not 2.

## Tests

```bash
npm test
```

Covers unit conversion, matching, grocery totals, both recipe routes, and data checks (every ingredient id exists, every photo is there, UI text is English).

## Notes

- Recipe steps are my own; regional details were cross-checked against the sources in [docs/RAMEN_SOURCES.md](docs/RAMEN_SOURCES.md).
- The ramen photos were generated for this project, not taken at real shops.
- Design notes: [design system](docs/DESIGN_SYSTEM.md), [pages](docs/PAGE_SPECIFICATIONS.md), [interactions](docs/INTERACTIONS.md), [visual QA](docs/VISUAL_QA.md).
